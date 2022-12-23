const express = require('express');
const router = express.Router();
const select = require('../model/select');


// http://localhost:8080/select/title=:song_title
router.get('/title=:song_title', (req, res) => {

    console.log(req.params.song_title);
    // let pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;
    select.selectBytitle(req.params.song_title, (err, data) => {
        
        // if(pattern_spc.test(req.params.SEsonginfo) != true)
        //     return res.end();

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found song with search result.` 
                });
            }
            else {
                res.status(500).send({
                    message: `Error retrieving song with search result.`
                });
            }
        }
        else
            res.json(data);
    })
})

module.exports = router;