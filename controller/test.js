const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    
    let test = "hello, react";
    res.json(test);
});

module.exports = router;