const Config = require("./Config");

// https://interspacevn.atlassian.net/wiki/spaces/AI/pages/90210347/API+ACCESSTRADE+T+I+LI+U+T+CH+H+P
const ORDER_STATUS_NEW = 0
const ORDER_STATUS_APPROVED = 1
const ORDER_STATUS_REJECTED = 2

const POSTBACK_RESPONSE_CODE_SUCCESS = '00'

const API_BASE_URL = Config.AT_API_BASE_URL;

const POSTBACK_CONVERSATIONS = `${API_BASE_URL}/v1/postbacks/conversions`

module.exports = {
    ORDER_STATUS_NEW,
    ORDER_STATUS_APPROVED,
    ORDER_STATUS_REJECTED,
    POSTBACK_RESPONSE_CODE_SUCCESS,
    API_BASE_URL,
    POSTBACK_CONVERSATIONS
}