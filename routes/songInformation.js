//const express = require('express');
//const router = express.Router();
const db = require('../config/database');
const mysql = require('mysql');
const { appendFile } = require('fs');


//노래제목 검색
//http://localhost:8080~....;