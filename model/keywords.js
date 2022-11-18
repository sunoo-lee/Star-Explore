const db = require("../config/database.js");

const Keyword = function(pos_keyword) {
    this.keyword = pos_keyword.keyword;
    this.column_name = pos_keyword.column_name;
}

Keyword.getAll = (result) => {

	db.getConnection(function(err, connection) {
		
		if(!err) {
			let query_to_find_all_keyword_info = `SELECT * FROM total_songs_keyword_information`;

			connection.query(query_to_find_all_keyword_info, (err, res) => {
				
				connection.release();

				if (err) {
					console.log("error: ", err);
					result(null, err);
					return;
				}

				console.log("found information: ", res);
				result(null, res);
				return;
			})
		}
		else {
			console.error('mysql connection error ' + err);
			throw err;
		}
	})
}




// Information.find_keyword_index = (keyword, result) => {

// 	db.getConnection(function (err, connection) {
		
// 		if (!err) {
// 			console.log(SEsonginfo);
// 			//첫문자부터, 해당 문자 포함한 노래 제목 | 발음 | 번안 검색
// 			let query_to_select_keyword = `SELECT song_title, album_title, album_number, release_date, embedcode FROM total_songs_information
// 									   WHERE song_title like '${SEsonginfo}%'
// 									   OR pronunciation like '${SEsonginfo}%'
// 									   OR translation like '${SEsonginfo}%'`;

// 			connection.query(query_to_select_keyword, (err, res) => {
				
// 				connection.release();
				
// 				if (err) {
// 					console.log("error: ", err);
// 					result(err, null);
// 					return;
// 				}

// 				//console.log(res.length);
// 				if (res.length) {
// 					console.log("found information: ", res);
// 					result(null, res);
// 					return;
// 				}
// 				//not found
// 				console.log("not found");
// 				result(null);
// 			})
// 		}
// 		else {
// 			console.error('mysql connection error ' + err);
// 			throw err;
// 		}
// 	})
// }



module.exports = Keyword;