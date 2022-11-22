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

// http://localhost:8080/keywords/test
router.get('/:selected_keyword', (req, res) => {
    
    Keyword.find_keyword_index(req.params.selected_keyword, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: 'attribute Not found song with search result.'
                });
            }
            else {
                res.status(500).send({
                    message: 'attribute Error retrieving song with search result'
                });
            }
        }
        else {
            let atb = data[0].attribute;
            Keyword.filter_out_songs_by_keyword(atb, req.params.selected_keyword, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: 'song Not found song with keyword search result.'
                        });
                    }
                    else {
                        res.status(500).send({
                            message: 'song Error retrieving song with keyword search result'
                        });
                    }
                }
                else
                    res.json(data);
            })
        }

    })
})

module.exports = router;