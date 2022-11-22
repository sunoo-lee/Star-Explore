const db = require("../config/database.js");

const Keyword = function(keyword_location) {
    this.keyword = keyword_location.keyword;
    this.column_name = keyword_location.column_name;
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

//선택된 키워드의 column 알아보기
Keyword.find_keyword_index = (selected_keyword, result) => {

	db.getConnection(function (err, connection) {
		
		if (!err) {
			//console.log(selected_keyword);

			let query_to_select_keyword = `SELECT attribute FROM keyword_list
										   WHERE keyword like '${selected_keyword}'`;

			connection.query(query_to_select_keyword, (err, res) => {
				
				connection.release();
				
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
				console.log("attribute not found");
				result(null);
			})
		}
		else {
			console.error('mysql connection error ' + err);
			throw err;
		}
	})
}

//특정 컬럼에서 해당 키워드로 검색하기
Keyword.filter_out_songs_by_keyword = (attribute, selected_keyword, result) => {
    
    db.getConnection(function (err, connection) {
		
		if (!err) {

			let query_to_filter_out_songs_by_keyword = `SELECT * FROM total_songs_keyword_information
														WHERE ${attribute} like '${selected_keyword}'`;

			connection.query(query_to_filter_out_songs_by_keyword, (err, res) => {
				
				connection.release();
				
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
				console.log("song not found");
				result(null);
			})
		}
		else {
			console.error('mysql connection error ' + err);
			throw err;
		}
	}) 
}



module.exports = Keyword;