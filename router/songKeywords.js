const express = require('express');
const router = express.Router();
const Keyword = require('../model/keywords');


// http://localhost:8080/keywords
router.get('/', (req, res) => {
    Keyword.getAll((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: 'Not found song with search result.'
                });
            }
            else {
                res.status(500).send({
                    message: 'Error retrieving song with search result'
                });
            }
        }
        else
            res.json(data);
    })
})

module.exports = router;