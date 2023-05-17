require('dotenv').config()
// const jwt = require('jsonwebtoken');
const log = require('winston-log-lite')(module)

const GETFLY_API_KEY = process.env.GETFLY_API_KEY
const GETFLY_DOMAIN = process.env.GETFLY_DOMAIN
const GETFLY_WEBHOOK_SECRET_KEY = process.env.GETFLY_WEBHOOK_SECRET_KEY

module.exports = (req, res, next) => {
  try {

    /// Print logs (for test)
    log.info('headers ' + JSON.stringify(req.headers))
    console.log('body', req.body)
    log.info('body ' + JSON.stringify(req.body))

    /// Check X-API-KEY
    const api_key = req.headers['x-api-key']
    log.info('x-api-key ' + api_key)
    if (api_key != GETFLY_API_KEY) {
      res.status(401).json({
        error: new Error('Invalid x-api-key').message
      });
      return
    }

    /// Check domain, secret_key
    const { domain, secret_key } = req.body
    log.info('domain ' + domain)
    log.info('secret_key ' + secret_key)
    if (domain != GETFLY_DOMAIN || secret_key != GETFLY_WEBHOOK_SECRET_KEY) {
      res.status(401).json({
        error: new Error('Invalid domain or secret_key').message
      });
      return
    }

    next();

  } catch {
    res.status(401).json({
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