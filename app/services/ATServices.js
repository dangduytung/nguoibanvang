const axios = require('axios')
const log = require('winston-log-lite')(module)
const Config = require('../config/Config')
const ConstantsAT = require('../config/ConstantsAT')

async function AT_postback_conversations(method, data_req) {
    log.info('AT request ~ method: ' + method)
    log.info('AT request ~ data_req: ' + JSON.stringify(data_req))

    const config = {
        method: method,
        url: ConstantsAT.POSTBACK_CONVERSATIONS,
        headers: {
            Authorization: "Token " + Config.AT_API_KEY
        },
        data: data_req
    }

    let res = await axios(config)
    let data_res = res.data

    log.info('AT response ~ data_res: ' + JSON.stringify(data_res))

    return data_res
}

module.exports.AT_postback_conversations = AT_postback_conversations;