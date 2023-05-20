const GF_API_BASE_URL = process.env.GF_API_BASE_URL
const GF_API_KEY = process.env.GF_API_KEY
const GF_DOMAIN = process.env.GF_DOMAIN
const GF_WEBHOOK_SECRET_KEY = process.env.GF_WEBHOOK_SECRET_KEY
const GF_KEY_CUSTOMER_SOURCE = process.env.GF_KEY_CUSTOMER_SOURCE

const AT_API_BASE_URL = process.env.AT_API_BASE_URL
const AT_API_KEY = process.env.AT_API_KEY

function is_AT_PushData() {
    return AT_API_BASE_URL !== undefined && AT_API_KEY !== undefined
}

module.exports = {
    GF_API_BASE_URL: GF_API_BASE_URL,
    GF_API_KEY: GF_API_KEY,
    GF_DOMAIN: GF_DOMAIN,
    GF_WEBHOOK_SECRET_KEY: GF_WEBHOOK_SECRET_KEY,
    GF_KEY_CUSTOMER_SOURCE: GF_KEY_CUSTOMER_SOURCE,

    AT_API_BASE_URL: AT_API_BASE_URL,
    AT_API_KEY: AT_API_KEY,
    is_AT_PushData: is_AT_PushData
}