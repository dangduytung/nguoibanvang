const axios = require('axios')
const Config = require('../config/Config')
const ConstantsAT = require('../config/ConstantsAT')

async function AT_postback_conversations_post(data_inp) {
    const config = {
        method: 'post',
        url: ConstantsAT.POSTBACK_CONVERSATIONS,
        headers: {
            Authorization: "Token " + Config.AT_API_KEY
        },
        data: data_inp
    }

    let res = await axios(config)
    return res.data
}

async function AT_postback_conversations_put(data_inp) {
    const config = {
        method: 'put',
        url: ConstantsAT.POSTBACK_CONVERSATIONS,
        headers: {
            Authorization: "Token " + Config.AT_API_KEY
        },
        data: data_inp
    }

    let res = await axios(config)
    return res.data
}

module.exports.AT_postback_conversations_post = AT_postback_conversations_post;
module.exports.AT_postback_conversations_put = AT_postback_conversations_put;