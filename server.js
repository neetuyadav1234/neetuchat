const express = require('express');
const bodyParser = require('body-parser');
const router = require('./app/router/router');
const app = express();
const port = 4300;
const db = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router);

app.listen(port, () => {
    db.dbConnection()
    console.log(`server is running on port ${port}`)
})