const axios = require('axios');
const log = require('winston-log-lite')(module)

exports.postGetFlyWebhook = (req, res, next) => {
    const { event } = req.body;
    const event_check = 'order.created'
    if (event != event_check) {
        res.status(401).json({
            error: new Error('Ignore this event: ' + event).message
        });
        return
    }

    makeRequest()

    res.send({ status: "Receive data successfully", event });
}


async function makeRequest() {

    const config = {
        method: 'get',
        url: 'http://webcode.me',
        headers: { 'User-Agent': 'Axios - console app' }
    }

    let res = await axios(config)

    console.log(res.request._header);
    console.log(res.status)
}