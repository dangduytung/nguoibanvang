const Config = require("./Config");

// https://developer.getfly.vn
const ORDER_TYPE_BUY = 1
const ORDER_TYPE_SELL = 2

const ORDER_STATUS_NEW = 1
const ORDER_STATUS_APPROVED = 2
const ORDER_STATUS_REJECTED = 5

const WEBHOOK_EVENT_ORDER_CREATED = 'order.created'
const WEBHOOK_EVENT_ORDER_APPROVED = 'order.approved'

const API_BASE_URL = Config.GF_API_BASE_URL;

const ACCOUNT_DETAIL_API_URL = (id) => `${API_BASE_URL}/api/v3/account/${id}`;
const ORDER_DETAIL_API_URL = (id) => `${API_BASE_URL}/api/v3/orders/detail?order_id=${id}`;

module.exports = {
    ORDER_TYPE_BUY,
    ORDER_TYPE_SELL,
    ORDER_STATUS_NEW,
    ORDER_STATUS_APPROVED,
    ORDER_STATUS_REJECTED,
    WEBHOOK_EVENT_ORDER_CREATED,
    WEBHOOK_EVENT_ORDER_APPROVED,
    API_BASE_URL,
    ACCOUNT_DETAIL_API_URL,
    ORDER_DETAIL_API_URL
};