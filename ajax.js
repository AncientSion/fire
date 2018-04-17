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
				console.log("success");
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

	doChat: function(){
		var msg = $(".chatWrapper").find(".sendWrapper").find("#msg").val();
		if (!msg.length || (msg.length == 2 && msg.substring(0, 1) == '"' && msg.substring(1, 2) == '"')){return;}

		$(".chatWrapper").find(".sendWrapper").find("#msg").val("");

		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {
					type: "chat",
					username: username,
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
						for (var i = 0; i < data.length; i++){
							var t = new Date(data[i]["time"]*1000);
							var s = t.toLocaleTimeString();
							chat.append($("<span>").html((s+" - "+data[i].username+": "+data[i].msg))).append("</br>");
						}

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
		//console.log(ships);
		//return;
		/*for (var i = 0; i < ships.length; i++){
			for (var j = ships[i].upgrades.length-1; j >= 0; j--){
				if (ships[i].upgrades[j].loads.length == 0){
					ships[i].upgrades.splice(j, 1);
				}
			}

			for (var j = 0; j < ships[i].upgrades.length; j++){
				for (var k = ships[i].upgrades[j].loads.length-1; k >= 0; k--){
					if (ships[i].upgrades[j].loads[k].amount == 0){
						ships[i].upgrades[j].loads.splice(k, 1);
					}
				}
			}

			for (var j = 0; j < ships[i].upgrades.length; j++){
				if (ships[i].upgrades[j].name == "Hangar"){
					for (var k = ships[i].upgrades[j].loads.length-1; k >= 0; k--){
						ships[i].upgrades[j].loads[k] = {
							name: ships[i].upgrades[j].loads[k].name,
							amount: ships[i].upgrades[j].loads[k].amount
						}
					}
				}
			}
		}*/

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
			error: ajax.error,
		});
	},

	confirmDeploy: function(callback){
		var initial = [];
		var reinforce = [];
		var fireOrders = [];
		var powers = [];
		var deployedFlights = [];
			deployedFlights = game.getDeployedFlights();
		var missions = game.getNewMissions();

		var ew = game.getEWSettings();

		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].userid != game.userid){continue;}
			if (game.ships[i].flight || game.ships[i].salvo){continue;}
			if (game.turn > 1 && (game.ships[i].available < game.turn || game.ships[i].available == game.turn)){continue;}

			var ship;
			for (var j = 0; j < game.ships[i].actions.length; j++){
				if (game.ships[i].actions[j].manual){
					if (game.ships[i].available == game.turn){
						ship = {
							actions: [ game.ships[i].actions[j] ],
							id: game.ships[i].id,
						};
						initial.push(ship);
					}
					else {
						ship = {
							actions: [ game.ships[i].actions[j] ],
							id: game.ships[i].id * -1,
							available: game.ships[i].available,
							cost: game.ships[i].cost
						};
						reinforce.push(ship);
					}
					break;
				}
			}
		}


		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].userid != game.userid){continue;}
			if (game.ships[i].flight || game.ships[i].salvo){continue;}

			var power = game.ships[i].getPowerOrders();
			for (var j = 0; j < power.length; j++){
				powers.push(power[j]);
			}
		}

		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].userid != game.userid){continue;}
			var fires = game.ships[i].getFireOrders();
			for (var j = 0; j < fires.length; j++){
				fireOrders.push(fires[j]);
			}
		}

		//console.log(missions);
		//return;

		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {
					type: "Deploy",
					gameid: game.id,
					userid: game.userid,
					turn: game.turn,
					phase: game.phase,
					initial: initial,
					reinforce: reinforce,
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
		var myShips = [];
		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].userid != game.userid){continue;}
			if (game.ships[i].salvo || game.ships[i].flight){continue;}
			if (game.ships[i].move > game.phase){continue;}

			var ship = {
				id: game.ships[i].id,
				actions: []
			}
			for (var j = 0; j < game.ships[i].actions.length; j++){
				if (game.ships[i].actions[j].resolved){continue;}
				ship.actions.push(game.ships[i].actions[j]);
			}

			myShips.push(ship);
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
					ships: myShips
				},
			success: callback,
			error: ajax.error,
		});
	},

	confirmFiringOrders: function(callback){
		//console.log("ding"); return;
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
					turn: game.turn,
					phase: game.phase,
					fireOrders: fireOrders
					},
			success: callback,
			error: ajax.error,
		});
	},

	confirmDamageControl: function(callback){
	
		var jumpout = [];
		var command = [];

		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].userid == game.userid){
				if (game.ships[i].status == "jumpOut"){
					jumpout.push({id: game.ships[i].id, status: "jumpOut"});
				}
				if (game.ships[i].command){
					command.push(game.ships[i].id);
				}
			}
		}
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
				jumpout: jumpout,
				command: command
				},
			success: callback,
			error: ajax.error,
		});
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



