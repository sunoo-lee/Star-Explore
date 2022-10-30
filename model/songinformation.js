const { resourceLimits } = require("worker_threads");
const sql = require("../cofing/database.js");

const SongInformation = function(songInformation) {
    this.songtitle = songInformation.songtitle;
    this.albumtitle = songInformation.albumtitle;
    this.albumnumber = songInformation.albumnumber;
    this.releasedate = songInformation.releasedate;
};

SongInformation.findByTitle = (SEsongtitle, result) => {
    sql.query(  `SELECT * FROM 'MUSIC INFORMATION'
                where 'song title' = '${SEsongtitle}%'`, (err, res) => { //첫문자부터, 해당 문자 포함한 노래 제목 검색
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
