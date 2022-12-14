const express = require('express');
const router = express.Router();
const select = require('../model/select');


// http://localhost:8080/select/title=:SEtitle
router.get('/title=:SEtitle', (req, res) => {

    // let pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;
    select.selectBytitle(req.params.SEtitle, (err, data) => {
        
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