const sql = require("../config/database.js");

//곡의 정보로
//song title, album title, album number, release date, embed code
//좌표, 별 이미지, 추천 수(별의 크기)
//들을 가져와야하지 않을까?
//아니지. 좌표, 별 이미지, 추천 수(별의 크기)는 화면에서 처음부터 볼 수 있는거고
//song title, album title, album number, release date는 검색해야만 볼 수 있음

const Information = function (songInformation) {
	this.songtitle = songInformation.songtitle;
	this.albumtitle = songInformation.albumtitle;
	this.albumnumber = songInformation.albumnumber;
	this.releasedate = songInformation.releasedate;
	this.embedCode = songInformation.embedCode;
}

//검색창에 입력된 단어 일부를 가지고, 노래 검색을 함
//첫단어부터 검색할 수 있도록 함
//Ex, B라고 검색하면 B도 시작하는 노래 제목을 모두 검색함
//검색창으로 검색하는 경우, 해당 함수를 사용함
Information.findBysearchbar = (SEsonginfo, result) => {

  //첫문자부터, 해당 문자 포함한 노래 제목 | 발음 | 번안 검색
	let query_to_find_title = `SELECT * FROM total_songs_information
                               WHERE song_title like '${SEsonginfo}%'
                               OR pronunciation like '${SEsonginfo}%'
                               OR translation like '${SEsonginfo}%'`;

  sql.init().query(query_to_find_title, (err, res) => {
    if (err) {
    	console.log("error: ", err);
    	result(err, null);
    	return;
    }

    if (res.length) {
    	console.log("found information: ", res);
    	result(null, res);
    	return;
    }

    //not found
    console.log("not found");
    result(null);

    sql.init().end();
  })
}

module.exports = Information;
