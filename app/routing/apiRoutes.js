var napData = require('../data/naps.js');


module.exports = function (app) {

	app.get('/api/naps', function(req, res){
		res.json(napData);
	})


	app.post('/api/naps', function(req, res){
		var newNap = req.body;

		for(var i = 0; i < newNap.scores.length; i++) {
			if(newNap.scores[i] == "1 (Strongly Disagree)") {
				newNap.scores[i] = 1;
			} else if(newNap.scores[i] == "5 (Strongly Agree)") {
				newNap.scores[i] = 5;
			} else {
				newNap.scores[i] = parseInt(newNap.scores[i]);
			}
		}

		var differencesArray = [];

		for(var i = 0; i < napData.length; i++) {

			var compareNaps = napData[i];
			var totalDifference = 0;

			for(var k = 0; k < compareNaps.scores.length; k++) {
				var differenceOneScore = Math.abs(compareNaps.scores[k] - newNap.scores[k]);
				totalDifference += differenceOneScore;
			}

			differencesArray[i] = totalDifference;
		}

		var bestNapNum = differencesArray[0];
		var bestNapArray = 0;

		for(var i = 1; i < differencesArray.length; i++) {
			if(differencesArray[i] < bestNapNum) {
				bestNapNum = differencesArray[i];
				bestNapArray = i;
			}
		}

		napData.push(newNap);

		res.json(napData[bestNapArray]);
	})
}
