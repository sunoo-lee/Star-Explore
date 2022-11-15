//graphics의 정보를 가지고 화면이 구성이 됨

const Graphics = function (songGraphics) {
	this.songtitle = songGraphics.songtitle;
	this.coordinate = songGraphics.coordinate;
	this.starDesign = songGraphics.starDesign;
	this.recommend = songGraphics.recommend;
}

//곡 그래픽 정보를 모두 가져옴
Graphics.findAll = result => {
	let query_to_find_all_graphic_info = "SELECT * FROM graphic";

	sql.init().query(query_to_find_all_graphic_info, (err, res) => {
		if (err) {
			consolg.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("songs: ", res);
		result(null, res);
	})
}

module.exports = Graphics;