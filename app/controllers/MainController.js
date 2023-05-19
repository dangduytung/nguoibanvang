const axios = require('axios');
const log = require('winston-log-lite')(module)
const Config = require('../config/Config')
const ConstantsGF = require('../config/ConstantsGF')

exports.home = async (req, res, next) => {
    res.send("Helo, My name is App :D");
}

exports.postGFWebhook = async (req, res, next) => {
    let event = req.body.event
    const event_check = ConstantsGF.WEBHOOK_EVENT_CHECK
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

    let order = await GF_order_getDetail(order_id)
    log.info('order: ' + JSON.stringify(order))

    const customer_id = order?.order_info?.account_id
    log.info('customer_id: ' + customer_id)

    let customer = await GF_customer_getDetail(customer_id)
    log.info('customer: ' + JSON.stringify(customer))

    res.send({ status: "Receive data successfully", event });
}

async function test_GF_Request() {
    const config = {
        method: 'get',
        url: 'https://demo.getflycrm.com/api/v3/account/123',
        headers: {
            "X-API-KEY": Config.GF_API_KEY
        }
    }
    let res = await axios(config)
    console.log(res.request._header);
    console.log(res.status)
    console.log(res.data)
}

async function GF_customer_getDetail(id) {

    const config = {
        method: 'get',
        url: ConstantsGF.ACCOUNT_DETAIL_API_URL(id),
        headers: {
            "X-API-KEY": Config.GF_API_KEY
        }
    }

    let res = await axios(config)

    // console.log(res.request._header);
    // console.log(res.status)
    // console.log(res.data)

    return res.data
}

async function GF_order_getDetail(id) {
    const config = {
        method: 'get',
        url: ConstantsGF.ORDER_DETAIL_API_URL(id),
        headers: {
            "X-API-KEY": Config.GF_API_KEY
        }
    }

    let res = await axios(config)

    // console.log(res.request._header);
    // console.log(res.status)
    // console.log(res.data)

    return res.data
}