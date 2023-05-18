const WEBHOOK_EVENT_CHECK = 'order.approved'

const API_BASE_URL = process.env.GF_API_BASE_URL;

const ACCOUNT_DETAIL_API_URL = (id) => `${API_BASE_URL}/api/v3/account/${id}`;

module.exports = {
    WEBHOOK_EVENT_CHECK,
    API_BASE_URL,
    ACCOUNT_DETAIL_API_URL
};