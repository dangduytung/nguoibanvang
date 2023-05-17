const log = require('winston-log-lite')(module)
const TextUtils = require('../utils/TextUtils');

exports.getTest = (req, res, next) => {
    res.json([
        { name: "William", location: "Abu Dhabi" },
        { name: "Chris", location: "Vegas" },
    ]);
}

exports.postTest = (req, res, next) => {
    const { name, location } = req.body;
    res.send({ status: "Post data successfully", name, location });
}

exports.postTest1 = (req, res, next) => {
    const data = TextUtils.splitParams(req.body);
    
    log.info('', data['data[order_code]'])

    res.send({ status: "Ok" });
}