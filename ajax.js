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

		for (var i = 0; i < ships.length; i++){
			if (ships[i].upgrades.length == 0){
				delete ships[i].upgrades;
			}
			else {
				for (var j = 0; j < ships[i].upgrades.length; j++){
					for (var k = ships[i].upgrades[j].loads.length-1; k >= 0; k--){
						if (ships[i].upgrades[j].loads[k].amount == 0){
							ships[i].upgrades[j].loads.splice(k, 1);
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
					type: "buyInitialFleet",
					gameid: gameid,
					userid: userid,
					gameturn: game.turn,
					gamephase: game.phase,
					ships: ships,
					},
			success: callback,
			error: ajax.error,
		});
	},

	confirmDeployment: function(callback){
		var deployedShips = [];
		var fireOrders = [];
		var powers = [];
		var deployedFlights = [];
			deployedFlights = game.getDeployedFlights();

		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].userid == game.userid){
				if (! game.ships[i].flight){
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
					var power = game.ships[i].getPowerOrders();
					for (var j = 0; j < power.length; j++){
						powers.push(power[j]);
					}
				}

				var fires = game.ships[i].getFireOrders();
				for (var j = 0; j < fires.length; j++){
					fireOrders.push(fires[j]);
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
					deployedFlights: deployedFlights,
					powers: powers,
					fireOrders: fireOrders,
					reinforcements: game.reinforcements
					},
			success: callback,
			error: ajax.error,
		});
	},

	confirmMovement: function(callback){
		var myShips = [];
		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].userid == game.userid){
				if (game.phase == 0 && !game.ships[i].flight || game.phase == 1 && game.ships[i].flight){
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
		}
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

	confirmFiringOrders: function(callback){
		var fireOrders = [];
		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].userid == game.userid){
				var fire = game.ships[i].getFireOrders();
				for (var j = 0; j < fire.length; j++){
					fireOrders.push(fire[j]);
				}
			}
		}
		//return;
		
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
					fireOrders: fireOrders
					},
			success: callback,
			error: ajax.error,
		});
	},

	confirmDamageControl: function(callback){
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



