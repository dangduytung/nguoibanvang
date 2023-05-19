
const log = require('winston-log-lite')(module)
const ConstantsGF = require('../config/ConstantsGF')
const GFServices = require('../services/GFServices')
const ATServices = require('../services/ATServices')

exports.home = async (req, res, next) => {
    res.send("Helo, My name is App :D");
}

/** Listening GF callback */
exports.postGFWebhook = async (req, res, next) => {
    /** Filter event order.approved */
    let event = req.body.event
    const event_check = ConstantsGF.WEBHOOK_EVENT_ORDER_APPROVED
    if (event != event_check) {
        res.status(401).json({
            error: new Error('Ignore this event: ' + event).message
        });
        return
    }

    let order_id = req.body['data[order_id]']
    let order_code = req.body['data[order_code]']
    log.info('order_id ' + order_id)
    log.info('order_code ' + order_code)

    let order = await GFServices.GF_order_getDetail(order_id)
    log.info('order: ' + JSON.stringify(order))

    const customer_id = order?.order_info?.account_id
    log.info('customer_id: ' + customer_id)

    let customer = await GFServices.GF_customer_getDetail(customer_id)
    log.info('customer: ' + JSON.stringify(customer))

    let AT_req = {}
    AT_req.conversion_id = "NBV_" + customer?.info?.account_code + "_" + order_code
    AT_req.conversion_result_id = "30"
    AT_req.tracking_id = customer?.info?.tracking_idat
    AT_req.transaction_id = order_code
    AT_req.transaction_time = customer?.info?.created_at
    AT_req.transaction_value = order?.order_info?.amount
    AT_req.status = 1 //0: new, 1: approved, 2: rejected
    AT_req.is_cpql = 1
    AT_req.extra = {}
    AT_req.extra.customer_type = "NEW" //KH moi
    AT_req.extra.offer = "Nguon: " + customer?.info?.account_source
    log.info('AT_req: ' + JSON.stringify(AT_req))

    let AT_res = await ATServices.AT_postback_conversations_post(AT_req)
    log.info('AT_res: ' + JSON.stringify(AT_res))

    res.send({ status: "Flow is ok :D", event });
}




