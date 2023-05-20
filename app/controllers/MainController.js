
const log = require('winston-log-lite')(module)
const Config = require('../config/Config')
const ConstantsGF = require('../config/ConstantsGF')
const ConstantsAT = require('../config/ConstantsAT')
const GFServices = require('../services/GFServices')
const ATServices = require('../services/ATServices')

exports.home = async (req, res, next) => {
    res.send("Helo, My name is App :D");
}

/** Listening GF callback */
exports.postGFWebhook = async (req, res, next) => {
    /** Filter event order.created or order.approved */
    let event = req.body.event
    if (event != ConstantsGF.WEBHOOK_EVENT_ORDER_CREATED && event != ConstantsGF.WEBHOOK_EVENT_ORDER_APPROVED) {
        res.status(400).json({
            error: new Error('Ignore this event: ' + event).message
        });
        return
    }

    let order_id = req.body['data[order_id]']
    let order_code = req.body['data[order_code]']
    log.info('GF order_id ' + order_id)
    log.info('GF order_code ' + order_code)

    let order = await GFServices.GF_order_getDetail(order_id)
    log.info('GF order: ' + JSON.stringify(order))
    log.info('GF order_status: ' + order?.order_info?.order_status + ', order_type: ' + order?.order_info?.order_type)

    let customer_id = order?.order_info?.account_id
    log.info('GF customer_id: ' + customer_id)

    let customer = await GFServices.GF_customer_getDetail(customer_id)
    log.info('GF customer: ' + JSON.stringify(customer))

    let account_source = customer?.info?.account_source
    let account_code = customer?.info?.account_code
    let account_name = customer?.info?.account_name
    let phone = customer?.info?.phone

    /** Filter customer source from accesstrade */
    if (!Config.GF_KEY_CUSTOMER_SOURCE) {
        log.warn('No setting GF_KEY_CUSTOMER_SOURCE')
        res.send({ status: 200, message: "No setting customer source" });
        return
    }
    if (Config.GF_KEY_CUSTOMER_SOURCE !== account_source?.trim()) {
        log.warn('GF customer source is not from ' + Config.GF_KEY_CUSTOMER_SOURCE
            + ', account_id: ' + customer_id + ', account_code: ' + account_code
            + ', account_name: ' + account_name + ', phone: ' + phone
            + ', account_source: ' + account_source)
        res.send({ status: 200, message: "Wrong customer source" });
        return
    }

    // Check setting environment params AT
    if (!Config.is_AT_PushData()) {
        res.send({ status: 200, message: "No setting to send to AT", event });
        return
    }

    let transaction_id = "NBV_" + account_code + "_" + order_code // Key for request to AT
    let AT_req
    let AT_req_method // method: post ~ order new | put ~ order approved, rejected
    if (event === ConstantsGF.WEBHOOK_EVENT_ORDER_CREATED) {
        AT_req_method = 'post'
        AT_req = {}
        AT_req.conversion_id = transaction_id
        AT_req.conversion_result_id = "30"
        AT_req.tracking_id = customer?.info?.tracking_idat
        AT_req.transaction_id = transaction_id
        AT_req.transaction_time = customer?.info?.created_at
        // AT_req.transaction_value = order?.order_info?.amount
        AT_req.transaction_value = '1' //amount: no need order amount exactly
        AT_req.status = ConstantsAT.ORDER_STATUS_NEW
        AT_req.is_cpql = 1
        AT_req.extra = {}
        AT_req.extra.customer_type = "NEW" //KH moi
        AT_req.extra.offer = "Nguon: " + customer?.info?.account_source
    } else if (event === ConstantsGF.WEBHOOK_EVENT_ORDER_APPROVED) {
        let AT_req_order_status
        if (order?.order_info?.order_status === ConstantsGF.ORDER_STATUS_APPROVED) {
            AT_req_order_status = ConstantsAT.ORDER_STATUS_APPROVED
        } else if (order?.order_info?.order_status === ConstantsGF.ORDER_STATUS_REJECTED) {
            AT_req_order_status = ConstantsAT.ORDER_STATUS_REJECTED
        }

        // If checked order status is exactly, to continue request
        if (AT_req_order_status) {
            AT_req_method = 'put'
            AT_req = {}
            AT_req.transaction_id = transaction_id
            AT_req.status = AT_req_order_status
            if (AT_req_order_status === ConstantsAT.ORDER_STATUS_REJECTED) {
                AT_req.rejected_reason = "NBV cancelled by customer"
            }
        }
    }

    // If has data, call to AT
    if (AT_req_method && AT_req) {
        let AT_res = await ATServices.AT_postback_conversations(AT_req_method, AT_req)
        if (AT_res?.code === ConstantsAT.POSTBACK_RESPONSE_CODE_SUCCESS) {
            log.info("AT push data successfully")
        } else {
            log.warn("AT push data failed: " + JSON.stringify(AT_res))
        }
    }
    log.info('<End>') // Create empty new line in file log
    res.send({ status: 200, message: "Flow is ok :D", event });
}