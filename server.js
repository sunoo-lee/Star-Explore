const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const DBconfig = require(__dirname + '/config/database.js');
const connect = DBconfig.init();
const test = require('./controller/test');
DBconfig.connect(connect);

const app = express();

app.set('port', process.env.PORT || 8080);

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'star-explore/build')));



app.use('/', test);

// app.get('/', (req, res) =>{
    
//     let test = "hello, react";
//     res.json(test);
// });

app.listen(app.get('port'), () => {
    console.log(app.get('port'), "빈 포트에서 대기");
});