const db = require("../config/database.js");

const X_mas = function (event) {
	this.song_title = event.song_title;
}

X_mas.getAll = (result) => {

	db.getConnection(function(err, connection) {
		
		if(!err) {
			let query_XMAS_SQL = `SELECT * FROM christmas`;

			connection.query(query_XMAS_SQL, (err, res) => {
				
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

module.exports = X_mas;