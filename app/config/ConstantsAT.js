const Config = require("./Config");

const API_BASE_URL = Config.AT_API_BASE_URL;

const POSTBACK_CONVERSATIONS = `${API_BASE_URL}/v1/postbacks/conversions`

module.exports = {
    API_BASE_URL,
    POSTBACK_CONVERSATIONS
}