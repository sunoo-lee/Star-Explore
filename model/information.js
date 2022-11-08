const { resourceLimits } = require("worker_threads");
const sql = require("../cofing/database.js");

//곡의 정보로
//song title, album title, album number, release date, embed code
//좌표, 별 이미지, 추천 수(별의 크기)
//들을 가져와야하지 않을까?
//아니지. 좌표, 별 이미지, 추천 수(별의 크기)는 화면에서 처음부터 볼 수 있는거고
//song title, album title, album number, release date는 검색 혹은 선택을 해야만 볼 수 있음
//어? 선택?

const Information = function(songInformation) {
    this.songtitle = songInformation.songtitle;
    this.albumtitle = songInformation.albumtitle;
    this.albumnumber = songInformation.albumnumber;
    this.releasedate = songInformation.releasedate;
    this.embedCode = songInformation.embedCode;
};

//노래 제목 일부를 가지고, 노래 검색을함
//첫단어부터 검색할 수 있도록 함
//Ex, B라고 검색하면 B도 시작하는 노래 제목을 모두 검색함
Information.findByTitle = (SEsongtitle, result) => {
    sql.query(  `SELECT * FROM Information
                where song_title = '${SEsongtitle}%'`, (err, res) => { //첫문자부터, 해당 문자 포함한 노래 제목 검색
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
      
          if (res.length) {
            console.log("found information: ", res[0]);
            result(null, res[0]);
            return;
          }
      
          //not found
          result(null);
    });
};
