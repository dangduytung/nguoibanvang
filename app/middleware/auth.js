// const jwt = require('jsonwebtoken');
const log = require('winston-log-lite')(module)
const Config = require('../config/Config')

const GF_API_KEY = Config.GF_API_KEY
const GF_DOMAIN = Config.GF_DOMAIN
const GF_WEBHOOK_SECRET_KEY = Config.GF_WEBHOOK_SECRET_KEY

module.exports = (req, res, next) => {
  try {

    /// Print logs (for test)
    log.info('----------')
    log.info('method ' + req.method)
    log.info('headers ' + JSON.stringify(req.headers))
    log.info('body ' + JSON.stringify(req.body))
    log.info('----------')

    // console.log('body', req.body)

    /// Check X-API-KEY (no check)
    // const api_key = req.headers['x-api-key']
    // log.info('x-api-key ' + api_key)
    // if (api_key != GF_API_KEY) {
    //   res.status(401).json({
    //     error: new Error('Invalid x-api-key').message
    //   });
    //   return
    // }

    /// Check domain, secret_key
    const { domain, secret_key } = req.body
    log.info('domain ' + domain)
    log.info('secret_key ' + secret_key)
    if (domain != GF_DOMAIN || secret_key != GF_WEBHOOK_SECRET_KEY) {
      log.warn('Invalid domain or secret_key')
      res.status(401).json({
        error: new Error('Invalid domain or secret_key').message
      });
      return
    }

    next();

  } catch (error) {
    log.error('Error ' + error)
    res.status(400).json({
      error: new Error('Invalid request!').message
    });
  }
};

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     console.log('token', token)

//     const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//     console.log('decodedToken', decodedToken)

//     const userId = decodedToken.userId;
//     if (req.body.userId && req.body.userId !== userId) {
//       throw 'Invalid user ID';
//     } else {
//       next();
//     }
//   } catch {
//     res.status(401).json({
//       error: new Error('Invalid request!')
//     });
//   }
// };