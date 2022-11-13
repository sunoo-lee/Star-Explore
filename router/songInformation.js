const express = require('express');
const router = express.Router();
const Information = require('../model/information');


// http://localhost:8080/songInformation
router.get('/', (req, res) => {
    let schema;

    //영어 65~90, 97~122
    //한글 12592~12687

    //일본어로 검색된 경우
    //japanese_songs_information schema에서 검색이 되어야함
    //일본어 유니코드는...?

    if(req.params.song_title)
        schema = japanese_songs_information;
    else {
        //한글 혹은 영어로 검색된 경우
        //1. 일단 korean_songs_information에서 찾아봄


        //그냥 데이터를 합쳐버릴까?
    }
    Information.findByTitle()
})

module.exports = router;