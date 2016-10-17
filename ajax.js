window.ajax = {

	createGame: function(name, callback){
		$.ajax({
			type: "POST",
			url: "createGame.php",
			datatype: "json",
			data: {data: name},
			success: callback,
			error: ajax.error,
		});
	},

	joinGame: function(userid, gameid, callback){
		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {
					type: "joinGame",
					userid: userid,
					gameid: gameid
					},
			success: callback,		
			error: ajax.error,
		});
	},

	leaveGame: function(userid, gameid, callback){
		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {
					type: "leaveGame",
					userid: userid,
					gameid: gameid
					},
			success: callback,
			error: ajax.error,
		});
	},

	confirmFleetPurchase: function(userid, gameid, ships, callback){
		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {
					type: "buyFleet",
					gameid: gameid,
					userid: userid,
					gameturn: game.turn,
					gamephase: game.phase,
					ships: ships
					},
			success: callback,
			error: ajax.error,
		});
	},

	confirmDeployment: function(){
		var deployedShips = [];
		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].userid = game.userid){
				for (var j = 0; j < game.ships[i].actions.length; j++){
					if (game.ships[i].actions[j].type == "deploy"){
						if (game.ships[i].actions[j].turn == game.turn){
							var ship = {
								id: game.ships[i].id,
								actions: [ game.ships[i].actions[j] ]
							}
							deployedShips.push(ship);
						}
					}
				}
			}
		}

		//	console.log(deployedShips); return;

		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {
					type: "deployment",
					gameid: game.id,
					userid: game.userid,
					gameturn: game.turn,
					gamephase: game.phase,
					deployedShips: deployedShips
					},
			success: ajax.finishDeploy,
			error: ajax.error,
		});
	},

	finishDeploy: function(data){
		console.log(data);
		console.log("deploy finished");

		$("#deployWrapper").hide();		
	},

	confirmMovement: function(){

		var myShips = [];

		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].userid == game.userid){
				var ship = {
					id: game.ships[i].id,
					actions: []
				}
				for (var j = 0; j < game.ships[i].actions.length; j++){
					if (game.ships[i].actions[j].turn == game.turn && game.ships[i].actions[j].type != "deploy"){
						ship.actions.push(game.ships[i].actions[j]);
					}
				}

				myShips.push(ship);
			}
		}

	//	console.log(myShips);
	//	return;

		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {
					type: "movement",
					gameid: game.id,
					userid: game.userid,
					gameturn: game.turn,
					gamephase: game.phase,
					ships: myShips
					},
			success: refresh,
			error: ajax.error,
		});
	},

	confirmFiringOrders: function(){
		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {
					type: "firing",
					gameid: game.id,
					userid: game.userid,
					gameturn: game.turn,
					gamephase: game.phase,
					fire: game.fireOrders
					},
			success: refresh,
			error: ajax.error,
		});
	},


	checkGameState: function(callback){

		console.log("ding");
		callback();
	},


/*
	getValidLanes: function(fleets, ships, moves){
		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
				type: "validLanes",
				turn: currentTurn
				},		
			error: ajax.error,
			success: function(lanes){
					ajax.createFleets(fleets, ships, moves, lanes);
			}
		});
*/


	startGame: function(gameid, callback){
		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {
					type: "start",
					gameid: gameid
					},
			success: callback,
			error: ajax.error,
		});
	},
	
	getGames: function(){
			
		$.ajax({
			type: "GET",
			url: "getGames.php",
			datatype: "json",
			data: {id: 3},
			success: ajax.getGamesSuccess,			
			error: ajax.error,
		});			
	},
	
	createGameSuccess: function(){
		console.log("createGameSuccess");
	},
	
	getGamesSuccess: function(){
		console.log("getGamesSuccess");
	},
	
	success: function(){
		console.log("success");
	},
	
	error: function(data){
		console.log("error");
	},
	
	echoReturn: function (data){
		if (data){
			console.log(data);
		}
		else {
			console.log("no data");
		}
	},
	
	getGameData: function(userid, gameid){
		ajax.getGameStatus(userid, gameid);
		ajax.getSectors();
		ajax.getPlanets();
		ajax.getMarkers(userid, gameid);
	},

	getMarkers: function(userid, gameid){
		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
				userid: userid,
				gameid: gameid,
				type: "markers"
				},		
			error: ajax.error,
			success: ajax.parseMarkers,
		});
	},

	parseMarkers: function(markers){
		list = JSON.parse(markers);

		if (list){		
			for (var i = 0; i < list.length; i++){
				var data = list[i];
				
				for (var j = 0; j < grid.hexes.length; j++){
					if (data.x == grid.hexes[j].x && data.y == grid.hexes[j].y){
						grid.hexes[j].markers.push(data);
					//	console.log(grid.hexes[j].id);
					//	console.log(grid.hexes[j].markers);
						break;
					}
				}
			}
		}
	},

	getGameStatus: function(userid, gameid){

		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
				userid: userid,
				gameid: gameid,
				currentTurn: currentTurn,
				type: "status"
				},		
			error: ajax.error,
			success: function(ret){
				if (ret){
					ret = JSON.parse(ret);
					console.log(ret);

					if (ret.status == "ready"){
						gamedata.canCommit = false;

						var div = document.createElement("div");
							div.shipClass = "popup";
							div.addEventListener("click", function(){
								this.parentNode.removeChild(this);
							})

						var span = document.createElement("span");
							span.innerHTML = "You have already commited your turn.</br></br>";
							div.appendChild(span);

						var span = document.createElement("span");
							span.innerHTML = "You can look at the gamedata, but cant commit anew.";
							div.appendChild(span);

							document.body.appendChild(div);
					}
					else {
						gamedata.canCommit = true;
					}
				}
			}
		});
	},



	
}



