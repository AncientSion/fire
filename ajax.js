window.ajax = {

	getGameData: function(gameid, userid){
		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
					type: "gamedata",
					gameid: gameid,
					userid: userid
					},
			success: function(data){
				if (!JSON.parse(data)){window.location = "lobby.php"; return;}
				//console.log("success");
				init(JSON.parse(data));
			},
			error: ajax.error,
		});
	},

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

	doChat: function(e){
		e.preventDefault();
		var msg = $(".chatWrapper").find(".sendWrapper").val();
		if (!msg.length || (msg.length == 2 && msg.substring(0, 1) == '"' && msg.substring(1, 2) == '"')){return;}

		$(".chatWrapper").find(".sendWrapper").val("");

		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {
					type: "chat",
					username: window.username,
					userid: userid,
					msg: msg,
					time: Math.round(Date.now()/1000),
					},
			//success: function(ret){
			//	console.log(ret);
			//},
			//error: ajax.error,
		});
	},

	checkChat: function(){
		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
					type: "chat",
					time: window.time
					},
			success: function(ret){
				var data = JSON.parse(ret);
				if (!data.length){
					return;
				}
				else {
					var chat = $(".chatWrapper").find(".chatBox");					
					if (data.length){
						old = chat.val();

						for (var i = 0; i < data.length; i++){
							var t = new Date(data[i]["time"]*1000);
							var s = t.toLocaleTimeString();
							old += (s+" - "+data[i].username+": "+data[i].msg+"\n");
						}

						chat.val(old);
						window.time = data[data.length-1]["time"];

						chat.scrollTop(function(){return this.scrollHeight});
					}
				}
			},
			error: ajax.error,
		});
	},

	concedeMatch: function(callback){
		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {
					type: "concede",
					gameid: gameid,
					userid: userid,
					turn: game.turn,
					phase: game.phase,
					},
			success: callback,
			error: ajax.error,
		});
	},

	getStats: function(){
		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
					type: "unitStats",
					gameid: game.id,
					userid: game.userid,
					},
			success: game.showStats,
			error: ajax.error,
		});
	},

	checkGameState: function(){
		if (!window.check.length){return;}

		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
					type: "gameState",
					time: window.time,
					data: window.check
					},
			success: function(ret){
				//console.log("return");
				var data = JSON.parse(ret);
				if (!data.length){
					//console.log("no change")
				}
				else {
					for (var i = 0; i < window.check.length; i++){
						for (var j = 0; j < data.length; j++){
							if (window.check[i][0] == data[j][0]){
								var change = 0;
								if (window.check[i][1] != data[j][1]){ // TURN
									change = 1;
									$("#activeGames").find("#" + data[j][0]).children().each(function(i){
										if (i == 1){
											$(this).html(data[j][1]);
										}
										else if (i == 2){
											$(this).html(getPhaseString(-1));
										}
										else if (i == 3){
											$(this).html("Awaiting Orders").removeClass("ready").addClass("waiting");
										}
									})
								}
								else if (window.check[i][2] != data[j][2]){ // PHASE
									change = 1;
									$("#activeGames").find("#" + data[j][0]).children().each(function(i){
										if (i == 2){
											$(this).html(getPhaseString(data[j][2]));
										}
										else if (i == 3){
											$(this).html("Awaiting Orders").removeClass("ready").addClass("waiting");
										}
									})
								}

								if (change){
									window.check[i][1] = data[j][1];
									window.check[i][2] = data[j][2];
									instruct("One of your ongoing games awaits new orders.");
								}
							}
						}
					}
				}
			},
			error: function(){console.log("error checkGameState")},
		});
	},

	confirmFleetPurchase: function(userid, gameid, ships, callback){
		
		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {
					type: "buyInitialFleet",
					gameid: gameid,
					userid: userid,
					turn: game.turn,
					phase: game.phase,
					ships: ships,
					faction: game.faction
				},
			success: callback,
			//success: function(data){console.log(data)},
			error: ajax.error,
		});
	},

	confirmDeploy: function(callback){
		var deployedShips = [];
		var requestReinforce = [];
		var plannedMoves = [];
		var fireOrders = [];
		var powers = [];
		var deployedFlights = [];
			deployedFlights = game.getDeployedFlights();
		var missions = game.getNewMissions();

		var ew = game.getEWSettings();

		for (var i = 0; i < game.ships.length; i++){
			//if (game.turn > 1 && game.ships[i].available <= game.turn){continue;}
			if (game.ships[i].userid != game.userid){continue;}
			if (game.ships[i].flight || game.ships[i].salvo){continue;}
			if (game.ships[i].available == game.turn && game.turn > 1){continue;}

			var	ship = {actions: [], id: game.ships[i].id};

			for (var j = 0; j < game.ships[i].actions.length; j++){
				if (!game.ships[i].actions[j].manual){continue;}
				ship.actions.push(game.ships[i].actions[j]);
			}

			if (!ship.actions.length){continue;}

			if (game.ships[i].available == game.turn){
				deployedShips.push(ship);
			}
			else if (game.ships[i].available > game.turn){
				ship.id *= -1;
				ship.actions[0].turn = game.ships[i].available;
				ship.cost = game.ships[i].cost;
				requestReinforce.push(ship);
			}
			else if (game.ships[i].available < game.turn){
				plannedMoves.push(ship);
			}
		}

		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].userid != game.userid){continue;}
			fireOrders = fireOrders.concat(game.ships[i].getFireOrders());
			powers = powers.concat(game.ships[i].getAllPowerOrders());
		}

		//console.log(missions);
		//return;

		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {
					type: "deploy",
					gameid: game.id,
					userid: game.userid,
					turn: game.turn,
					phase: game.phase,
					deployedShips: deployedShips,
					requestReinforce: requestReinforce,
					plannedMoves: plannedMoves,
					deployedFlights: deployedFlights,
					powers: powers,
					missions: missions,
					fireOrders: fireOrders,
					ew: ew
					},
			success: callback,
			//success: console.log,
			error: ajax.error,
		});
	},

	confirmMovement: function(callback){
		var ships = [];
		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].userid != game.userid){continue;}
			if (game.ships[i].salvo || game.ships[i].flight){continue;}
			if (game.ships[i].focus != game.phase){continue;}

			var ship = {
				id: game.ships[i].id,
				actions: []
			}

			for (var j = 0; j < game.ships[i].actions.length; j++){
				if (game.ships[i].actions[j].resolved){continue;}
				ship.actions.push(game.ships[i].actions[j]);
			}

			ships.push(ship);
		}

		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {
					type: "movement",
					gameid: game.id,
					userid: game.userid,
					turn: game.turn,
					phase: game.phase,
					ships: ships
				},
			success: callback,
			//success: function(echo){console.log(echo)},
			error: ajax.error,
		});
	},

	confirmFiringOrders: function(callback){
		//console.log("ding"); return;
		var fireOrders = [];
		var powers = [];
		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].userid != game.userid){continue;}
			fireOrders = fireOrders.concat(game.ships[i].getFireOrders());

			if (game.ships[i].flight){
				powers = powers.concat(game.ships[i].getAllPowerOrders());
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
					turn: game.turn,
					phase: game.phase,
					fireOrders: fireOrders,
					powers: powers
					},
			success: callback,
			error: ajax.error,
		});
	},

	confirmDamageControl: function(callback){
	
		var plannedMoves = [];
		var focus = [];

		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].userid != game.userid){continue;}
			if (game.ships[i].actions.length){
				var action = game.ships[i].actions[game.ships[i].actions.length-1];
				if (action.type == "jumpOut" && !action.forced){
					plannedMoves.push({
						actions: [action],
						id: game.ships[i].id
					});
				}
			}
			if (game.ships[i].focus){
				focus.push(game.ships[i].id);
			}
		}
		//return;
		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {
				type: "damageControl",
				gameid: game.id,
				userid: game.userid,
				turn: game.turn,
				phase: game.phase,
				plannedMoves: plannedMoves,
				focus: focus,
				commandChange: game.commandChange
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



