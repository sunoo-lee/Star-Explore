const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
// const DBconfig = require(__dirname + '/config/database.js');
// const connect = DBconfig.init();

// DBconfig.connect(connect);

//const testRouter = require('./router/test');
const songSearchRouter= require('./router/songSearch');
const songGraphicsInformationRouter = require('./router/songGraphics');
const songKeywordsInformationRouter = require('./router/songKeywords');
const songTitleRouter = require('./router/songSelect');
const X_masSongRouter = require('./router/eventChristmas');

const app = express();

app.set('port', process.env.PORT || 8080);

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.use('/search', songSearchRouter);
app.use('/graphics', songGraphicsInformationRouter);
app.use('/keywords', songKeywordsInformationRouter);
app.use('/select', songTitleRouter);
app.use('/event/X_MAS', X_masSongRouter);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), "빈 포트에서 대기");
});

app.use('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});