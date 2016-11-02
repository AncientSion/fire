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

	confirmFleetPurchase: function(userid, gameid, ships, factions, callback){
		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {
					type: "buyInitialFleet",
					gameid: gameid,
					userid: userid,
					gameturn: game.turn,
					gamephase: game.phase,
					ships: ships,
					faction: factions
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
					deployedShips: deployedShips,
					reinforcements: game.reinforcements
					},
			//success: goToLobby,
			success: goToLobby,
			error: ajax.error,
		});
	},

	confirmMovement: function(callback){
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
			success: callback,
			error: ajax.error,
		});
	},

	confirmFiringOrders: function(){
		var fires = [];
		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].userid == game.userid){
				var fire = game.ships[i].getFireOrders();
				for (var j = 0; j < fire.length; j++){
					fires.push(fire[j]);
				}
			}
		}
		
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
					fire: fires
					},
			success: callback,
			error: ajax.error,
		});
	},

	confirmDamageControl: function(){
		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {
					type: "damageControl",
					gameid: game.id,
					userid: game.userid,
					gameturn: game.turn,
					gamephase: game.phase,
					orders: false
					},
			success: callback,
			error: ajax.error,
		});
	},

	checkGameState: function(callback){

		console.log("ding");
		callback();
	},

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
	}
	


	
}



