const express = require('express');
const router = express.Router();
const Keyword = require('../model/keywords');


// http://localhost:8080/keywords
// router.get('/', (req, res) => {
//     Keyword.getAll((err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.status(404).send({
//                     message: 'Not found song with search result.'
//                 });
//             }
//             else {
//                 res.status(500).send({
//                     message: 'Error retrieving song with search result'
//                 });
//             }
//         }
//         else
//             res.json(data);
//     })
// })

// router.get('/test/:temp1/:temp2', (req, res) => {

//     // let selected_keywords = {};

//     // for (let count = 0; count < 6; count++) {
//     //     selected_keywords['keyword' + 1] = req.body.keyword;
//     // }

//     Keyword.find_keyword_index_multi(req.params.temp1, req.params.temp2, (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.status(404).send({
//                     message: 'attribute Not found song with search result.'
//                 });
//             }
//             else {
//                 res.status(500).send({
//                     message: 'attribute Error retrieving song with search result'
//                 });
//             }
//         }

//         Keyword.filter_out_songs_by_keyword_test(data[0].attribute, data[1].attribute, data[0].keyword, data[1].keyword, (err, data) => {
//             if (err) {
//                 if (err.kind === "not_found") {
//                     res.status(404).send({
//                         message: 'song Not found song with keyword search result.'
//                     });
//                 }
//                 else {
//                     res.status(500).send({
//                         message: 'song Error retrieving song with keyword search result'
//                     });
//                 }
//             }
//             else
//                 res.json(data);
//         })
//     })
// })

// http://localhost:8080/keywords/test

// router.get('/:selected_keyword1,', (req, res) => {

//     Keyword.find_keyword_index(req.params.selected_keyword, (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.status(404).send({
//                     message: 'attribute Not found song with search result.'
//                 });
//             }
//             else {
//                 res.status(500).send({
//                     message: 'attribute Error retrieving song with search result'
//                 });
//             }
//         }
//         else {
//             let atb = data[0].attribute;
//             Keyword.filter_out_songs_by_keyword(atb, req.params.selected_keyword, (err, data) => {
//                 if (err) {
//                     if (err.kind === "not_found") {
//                         res.status(404).send({
//                             message: 'song Not found song with keyword search result.'
//                         });
//                     }
//                     else {
//                         res.status(500).send({
//                             message: 'song Error retrieving song with keyword search result'
//                         });
//                     }
//                 }
//                 else
//                     res.json(data);
//             })
//         }

//     })
// })

// http://localhost:8080/keywords/list
// 사용방법
// http://localhost:8080/keywords/list?{attribute}={keyword}
// ex, http://localhost:8080/keywords/list?emotion1=시원한&emotion2=벅차는&genre=J-POP
router.get('/list', (req, res) => {

    // console.log(Object.keys(req.query));
    // console.log(Object.values(req.query));
    // console.log(Object.keys(req.query).length);

    Keyword.filter_out_songs_by_keyword(req.query, (err, data) => {
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
    //res.json(req.query);
})

module.exports = router;