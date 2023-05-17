const express = require("express");
const bodyParser = require("body-parser");
// const cors = require('cors');

const router = express.Router();
const app = express();

const port = 3001;

// app.use(cors())

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(bodyParser.text())
// app.use(bodyParser.raw())

const auth = require('./middleware/auth');

const mainCtrl = require('./controllers/MainController');
router.post('', auth, mainCtrl.postGetFlyWebhook)

const testCtrl = require('./controllers/TestController');
router.get('/test', auth, testCtrl.getTest);
router.post('/test', auth, testCtrl.postTest);
router.post('/test1', auth, testCtrl.postTest1);

// Add router in the Express app.
app.use("/", router);

// Listen on port
app.listen(port, () => {
  console.log(`Server is running on port ${port}
  Visit http://localhost:${port}`);
});