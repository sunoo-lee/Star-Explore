const express = require('express');
const router = express.Router();
const Graphics = require('../model/graphics');


// http://localhost:8080/songGraphicsInformationRouter
router.get('/', (req, res) => {
    Graphics.getAll((err, data) => {
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