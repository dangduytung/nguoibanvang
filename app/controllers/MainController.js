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

    // //test
    // testRequest()

    // let id = 344
    // let data = await GF_getDetailCustomer(id)
    // log.info('data ' + JSON.stringify(data))

    let order_id = req.body['data[order_id]']
    let order_code = req.body['data[order_code]']
    log.info('order_id ' + order_id)
    log.info('order_code ' + order_code)

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

async function GF_getDetailCustomer(id) {

    const config = {
        method: 'get',
        url: ConstantsGF.ACCOUNT_DETAIL_API_URL(id),
        headers: {
            "X-API-KEY": Config.GF_API_KEY
        }
    }

    let res = await axios(config)

    console.log(res.request._header);
    console.log(res.status)
    console.log(res.data)

    return res.data
}