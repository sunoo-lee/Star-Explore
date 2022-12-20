const express = require('express');
const router = express.Router();
const X_mas = require('../model/christmas');


// http://localhost:8080/graphics
router.get('/', (req, res) => {
    X_mas.getAll((err, data) => {
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