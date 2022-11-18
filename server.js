const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
// const DBconfig = require(__dirname + '/config/database.js');
// const connect = DBconfig.init();

// DBconfig.connect(connect);

const testRouter = require('./router/test');
const songInformationRouter= require('./router/songInformation');
const songGraphicsInformationRouter = require('./router/songGraphics');
const songKeywordsInformationRouter = require('./router/songKeywords');

const app = express();

app.set('port', process.env.PORT || 8080);

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'star-explore/build')));

app.use('/', testRouter);
app.use('/information', songInformationRouter);
app.use('/graphics', songGraphicsInformationRouter);
app.use('/keywords', songKeywordsInformationRouter);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), "빈 포트에서 대기");
});