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

				//console.log("found information: ", res);
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
// Keyword.find_keyword_index = (selected_keywords, result) => {

// 	console.log(selected_keywords[0]);

// 	db.getConnection(function (err, connection) {
		
// 		if (!err) {
// 			//console.log(selected_keyword);

// 			let query_to_select_keyword = `SELECT * FROM keyword_list`;

// 			let sub_query_to_select_keyword = ` WHERE keyword like '${selected_keywords[0]}'`;


// 			let completed_query = query_to_select_keyword + sub_query_to_select_keyword;

// 			connection.query(completed_query, (err, res) => {
				
// 				connection.release();
				
// 				if (err) {
// 					console.log("error: ", err);
// 					result(err, null);
// 					return;
// 				}

// 				if (res.length) {
// 					//console.log("found information: ", res);
// 					result(null, res);
// 					return;
// 				}
// 				//not found
// 				console.log("attribute not found");
// 				result(null);
// 			})
// 		}
// 		// else {
// 		// 	console.error('mysql connection error ' + err);
// 		// 	throw err;
// 		// }
// 	})
// }

//서브쿼리 만드는 함수
let make_sub_query_to_select_keyword = (data) => {
	
	let sub_query_to_select_keyword = {};
	let index;
	let result;

	//버튼이 하나만 선택됐을 때
	if (Object.keys(data).length === 1)	{
		
		sub_query_to_select_keyword['_' + index] = ` WHERE ${Object.keys(data)[0]} like '${Object.values(data)[0]}'`;
		return sub_query_to_select_keyword;
	}
	//버튼이 여러개 입력됐을 때
	else	{
		for(index = 0; index < Object.keys(data).length; index++)	{
			//첫번째 버튼
			if(index == 0)
				sub_query_to_select_keyword['_' + index] = ` WHERE ${Object.keys(data)[index]} like '${Object.values(data)[index]}'`;
			//그 외 버튼
			else	{
				sub_query_to_select_keyword['_' + index] = ` AND ${Object.keys(data)[index]} like '${Object.values(data)[index]}'`;
			}

		}
		//console.log(sub_query_to_select_keyword);
		result = Object.values(sub_query_to_select_keyword).join(' ') + ';';
		//console.log("result :" + result);

		return result
	}


}

//선택된 키워드'들'로 노래를 검색해옴
Keyword.filter_out_songs_by_keyword = (data, result) => {
    
	db.getConnection(function (err, connection) {
		
		if (!err) {

			let query_to_filter_out_songs_by_keyword = `SELECT * FROM total_songs_keyword_information`;
			let whole_sub_query = make_sub_query_to_select_keyword(data);

			//let sub_query_to_select_keyword = ` WHERE ${Object.keys(data)[0]} like '${Object.values(data)[0]}'`;

			connection.query(query_to_filter_out_songs_by_keyword + whole_sub_query, (err, res) => {
				
				//console.log(query_to_filter_out_songs_by_keyword + sub_query_to_select_keyword);
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

// Keyword.find_keyword_index_multi = (selected_keyword1, selected_keyword2, result) => {
	
// 	db.getConnection(function (err, connection) {
		
// 		if (!err) {

// 			let query_to_select_keyword = `SELECT * FROM keyword_list
// 										   WHERE keyword like '${selected_keyword1}'
// 										   OR keyword like '${selected_keyword2}'`;

// 			connection.query(query_to_select_keyword, (err, res) => {
				
// 				connection.release();
				
// 				if (err) {
// 					console.log("error: ", err);
// 					result(err, null);
// 					return;
// 				}

// 				if (res.length) {
// 					console.log("found information: ", res);
// 					result(null, res);
// 					return;
// 				}
// 				//not found
// 				console.log("attribute not found");
// 				result(null);
// 			})
// 		}
// 		else {
// 			console.error('mysql connection error ' + err);
// 			throw err;
// 		}
// 	})
// }

// Keyword.filter_out_songs_by_keyword_test = (attribute1, attribute2, selected_keyword1, selected_keyword2, result) => {
    


// 	db.getConnection(function (err, connection) {
		
// 		console.log('error!!!!!!!!');

// 		// let attribute1 = keywords[0].attribute;
// 		// let attribute2 = keywords[1].attribute;

// 		// let selected_keyword1 = keywords[0].keyword;
// 		// let selected_keyword2 = keywords[0].keyword;

// 		if (!err) {

// 			let query_to_filter_out_songs_by_keyword = `SELECT * FROM total_songs_keyword_information
// 														WHERE ${attribute1} like '${selected_keyword1}'
// 														AND ${attribute2} like '${selected_keyword2}'`;

// 			connection.query(query_to_filter_out_songs_by_keyword, (err, res) => {
				
// 				//console.log(query_to_filter_out_songs_by_keyword + sub_query_to_select_keyword);
// 				connection.release();
				
// 				if (err) {
// 					console.log("error: ", err);
// 					result(err, null);
// 					return;
// 				}

// 				if (res.length) {
// 					console.log("found information: ", res);
// 					result(null, res);
// 					return;
// 				}
// 				//not found
// 				console.log("song not found");
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