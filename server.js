const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const DBconfig = require(__dirname + '/config/database.js');
const connect = DBconfig.init();

DBconfig.connect(connect);

const testRouter = require('./router/test');
const songInformationRouter= require('./router/songInformation');

const app = express();

app.set('port', process.env.PORT || 8080);

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'star-explore/build')));

app.use('/', testRouter);

app.use('/songInformation', songInformationRouter);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), "빈 포트에서 대기");
});