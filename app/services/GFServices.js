const axios = require('axios')
const Config = require('../config/Config')
const ConstantsGF = require('../config/ConstantsGF')

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
    return res.data
}

module.exports.test_GF_Request = test_GF_Request;
module.exports.GF_customer_getDetail = GF_customer_getDetail;
module.exports.GF_order_getDetail = GF_order_getDetail;