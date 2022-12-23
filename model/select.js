const db = require("../config/database.js");

//곡의 정보로
//song title, album title, album number, release date, embed code
//좌표, 별 이미지, 추천 수(별의 크기)
//들을 가져와야하지 않을까?
//아니지. 좌표, 별 이미지, 추천 수(별의 크기)는 화면에서 처음부터 볼 수 있는거고
//song title, album title, album number, release date는 검색해야만 볼 수 있음

//album_number, release_date, recommend ,embedcode
const select = function (SEsong) {
	this.song_title = SEsong.songtitle;
	this.album_title = SEsong.album_title;
	this.album_number = SEsong.release_date;
    this.recommend = SEsong.recommend;
    this.embedcode = SEsong.embedcode;
}

select.selectBytitle = (data, result) => {

	db.getConnection(function (err, connection) {
	
		if (!err) {
			let query_to_find_title = `SELECT song_title, album_title, album_number, release_date, recommend ,embedcode FROM total_songs_information
									   WHERE song_title like "${data}"`;

			connection.query(query_to_find_title, (err, res) => {
				
				connection.release();
				
				if (err) {
					console.log("error: ", err);
					result(err, null);
					return;
				}

				if (res.length) {
					//console.log("found information: ", res);
					result(null, res);
					return;
				}
				//not found
				console.log("not found");
				result(null);
			})
		}
		else {
			console.error('mysql connection error ' + err);
			throw err;
		}
	})
}



module.exports = select;
