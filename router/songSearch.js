const express = require('express');
const router = express.Router();
const search = require('../model/search');


// http://localhost:8080/search/SE=:SEsonginfo
router.get('/SE=:SEsonginfo', (req, res) => {

    // let pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;

    search.searchBybar(req.params.SEsonginfo, (err, data) => {
        
        // if(pattern_spc.test(req.params.SEsonginfo) != true)
        //     return res.end();
        
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found song with search result ${req.params.SEsonginfo}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving song with search result " + req.params.SEsonginfo
                });
            }
        }
        else
            res.json(data);
    })
})

module.exports = router;