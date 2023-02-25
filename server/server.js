const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cors = require('cors')
const connectToDB = require("./config/config.js");
const { registerAdmin } = require("./Controllers/userController.js");
const port = 4000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use('/users', require('./Routes/userRoutes.js'));
app.use('/', require('./Routes/imagesRoutes.js'));

connectToDB();
registerAdmin();

app.listen(port, () => console.log(`App listening on port ${port}!`))