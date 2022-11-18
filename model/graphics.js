const db = require("../config/database.js");
//graphics의 정보를 가지고 화면이 구성이 됨

const Graphics = function (songGraphics) {
	this.song_title = songGraphics.song_title;
	this.coordinate = songGraphics.coordinate;
	this.size = songGraphics.size;
	this.image = songGraphics.image;
}

//곡 그래픽 정보를 모두 가져옴
Graphics.getAll = (result) => {

	db.getConnection(function(err, connection) {
		
		if(!err) {
			let query_to_find_all_graphic_info = `SELECT * FROM total_songs_graphic_information
												  LIMIT 30`;

			connection.query(query_to_find_all_graphic_info, (err, res) => {
				
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

module.exports = Graphics;