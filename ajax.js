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
			success: console.log,
			error: ajax.error,
		});
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
	
	postSectors: function(sectors){
	
		sectors = JSON.stringify(sectors);
	//	console.log(sectors);
	
		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {sectors: sectors},	
			error: ajax.error,
			success: ajax.success,
		});
	},

	getSectors: function(){
	
		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
				userid: userid,
				gameid: gameid,
				type: "sectors"
				},		
			error: ajax.error,
			success: ajax.parseSectors,
		});
	},

	parseSectors: function(list){
		list = JSON.parse(list);

		if (list){		
			for (var i = 0; i < list.length; i++){
				var data = list[i];
				var icon;
				
				for (var j = 0; j < grid.hexes.length; j++){
					if (data.x == grid.hexes[j].x && data.y == grid.hexes[j].y){
					//	console.log(grid.hexes[j].id);
						grid.hexes[j].specials.push(data);

						if (data.type == "Black Hole"){
							icon = special_icons[0];
						}
						else if (data.type == "Nebula"){
							icon = special_icons[1];
						}
						else if (data.type == "Supernova"){
							icon = special_icons[2];
						}
						else if (data.type == "Radiation Cloud"){
							icon = special_icons[3];
						}
						else if (data.type == "Vortex"){
							icon = special_icons[4];
						}
						else if (data.type == "Hyperspace Waveforms"){
							icon = special_icons[5];
						}
						else {
							icon = undefined;
						}

						grid.hexes[j].specials[grid.hexes[j].specials.length-1].icon = icon;
						break;

					}
				}
			}
		}
	},
	
	postPlanets: function(planets){
	
		planets = JSON.stringify(planets);
	//	console.log(planets);
	
		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {planets: planets},	
			error: ajax.error,
			success: ajax.success,
		});
	},
	
	getPlanets: function(){
	
		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
				userid: userid,
				gameid: gameid,
				type: "planets"
				},		
			error: ajax.error,
			success: ajax.parsePlanets,
		});
	},
	
	parsePlanets: function(list){
		list = JSON.parse(list);


		if (list){		
			for (var i = 0; i < list.length; i++){
				var data = list[i];
				
				for (var j = 0; j < grid.hexes.length; j++){
					if (data.x == grid.hexes[j].x && data.y == grid.hexes[j].y){

						var icon;
						
						var planet = new Planet(
												data.id,
												data.owner,
												data.name,
												[grid.hexes[j].x, grid.hexes[j].y],
												data.level,
												data.baseIncome,
												data.baseTrade,
												data.type,
												data.enviroment,
												data.notes_1,
												data.notes_2,
												data.notes_3
												);

					//	console.log(planet);
						grid.hexes[j].contains.push(planet);

						break;
					}
				}
			}
		}

		ajax.getGatesAndLanes()
	},

	postGates: function(gates){
		var item = {
			gameid: gameid,
			gates: gates,
			type: "create"
		};

		item = JSON.stringify(item);

		//console.log(item);

		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {gates: item},	
			error: ajax.error,
			success: ajax.success,
		});
	},

	killLane: function(id){
		var item = {
			gameid: gameid,
			laneid: id,
			type: "destroy"
		};

		item = JSON.stringify(item);

		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {gates: item},
			error: ajax.error,
			success: ajax.echoReturn
		})
	},

	postGateAndLane: function(items){
		items = JSON.stringify(items);

		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {
				gateLaneItem: items,
			},	
			error: ajax.error,
			success: ajax.echoReturn
		});		
	},

	postLanes: function(lanes, gates){
	//	console.log(lanes)
	//	console.log(gates)
		lanes = JSON.stringify(lanes);
		gates = JSON.stringify(lanes);
	
		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {
				gates: gates,
				lanes: lanes
			},	
			error: ajax.error,
			success: ajax.echoReturn
		});
		

	},

	getGatesAndLanes: function(){
		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
				userid: userid,
				gameid: gameid,
				type: "gates"
				},		
			error: ajax.error,
			success: ajax.createGatesAndLanes
		});
	},

	createGatesAndLanes: function(data){

		var list = JSON.parse(data);
		var items = [];

		if (list){
			for (var i = 0; i < list.length; i++){
				var route = list[i].lane.path;


				var lane = new Lane();
					lane.id = list[i].lane.id;
				for (var j = 0; j < route.length; j++){
					lane.path.push(route[j]);
				}

				var phpGate = list[i]["startGate"];
				var gate = new Jumpgate(
					phpGate.id,
					phpGate.owner,
					[phpGate.x, phpGate.y],
					0, 
					1,
					lane
				)
				items.push(gate);




				var lane = new Lane();
					lane.id = list[i].lane.id;
				for (var j = route.length-1; j >= 0; j--){
					lane.path.push(route[j]);
				}

				var phpGate = list[i]["endGate"];
				var gate = new Jumpgate(
					phpGate.id,
					phpGate.owner,
					[phpGate.x, phpGate.y],
					0, 
					1,
					lane
				)
				items.push(gate);

				
			}
		}

		ajax.parseGates(items);
		ajax.getFleets();


	},

	parseGates: function(gates){

		for (var i = 0; i < gates.length; i++){
			for (var j = 0; j < grid.hexes.length; j++){
				if (isEqual (gates[i].location, grid.hexes[j].id) ) {
					grid.hexes[j].hasJumpgate = true;
					grid.hexes[j].contains.push(gates[i]);
					break;
				}
			}
		}
	},

	postFleets: function(fleets){
		fleets = JSON.stringify(fleets);
		//console.log(fleets);
	
		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {fleets: fleets},	
			error: ajax.error,
			success: ajax.echoReturn
		});
	},
	
	getFleets: function(){
		
		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
				type: "fleets"
				},		
			error: ajax.error,
			success: ajax.getShips
		});
	},
	
	getShips: function(fleets){

	//	console.log(fleets);
		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
				type: "ships"
				},		
			error: ajax.error,
//			success: function(ships){
//					ajax.createFleets(fleets, ships);
//			}
			success: function(ships){
					ajax.getMoves(fleets, ships);
			}
		});
	},

	getMoves: function(fleets, ships){
		$.ajax({
			type: "GET",
			url: "getGameData.php",
			datatype: "json",
			data: {
				type: "moves"
				},		
			error: ajax.error,
			success: function(moves){
					ajax.getValidLanes(fleets, ships, moves);
			}
		});
	},

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
	},

	createFleets: function(fleetlist, shiplist, movelist, lanelist){
	
	//	console.time("start");

	//	console.log(lanelist)
		var fleets = [];
		var ships = [];
		var moves = [];
		var lanes = []
		
		var userFleets = [];
		
		// Create Fleets
		fleetlist = JSON.parse(fleetlist);
		lanelist = JSON.parse(lanelist);
		
		if (fleetlist){
			for (var i = 0; i < fleetlist.length; i++){
				var data = fleetlist[i];
				
				var fleet = new Fleet(data.id, data.playerid, [data.x, data.y], data.name);
				if (data.id == 3){
				}

					var found = false;
					for (var j = 0; j < lanelist.length; j++){
						if (fleet.id == lanelist[j].fleetid){
							found = true;


							var lane = grid.getHexByIndex( [lanelist[j].x, lanelist[j].y] ).getLaneById(lanelist[j].jumplaneid).lane;

							fleet.validLanes.push( lane );
						}
						else if (found == true & fleet.id != lanelist[j].fleetid){
							found = false;
							break;
						}
					}

					fleets.push(fleet);

					
					if (fleet.owner == userid){
						userFleets.push(fleet.id);
					}
			}
		}

		// Create Ships
		shiplist = JSON.parse(shiplist);
		if (shiplist){
			for (var i in shiplist){
				var data = shiplist[i];

				var ship = new Ship(
						data.id,
						data.fleetid,
						data.size,
						data.model,
						data.name,
						data.elint,
						data.scanner,
						data.jumpdrive,
						data.notes
					);

					ships.push(ship);
			}
		}

		// put Ships into Fleets
		for (var i in fleets){
			for (var j in ships){
				if (fleets[i].id == ships[j].fleetid){
					fleets[i].ships.push(ships[j]);
				}
			}
		}


		// create MovementOrder out of movelist		
		movelist = JSON.parse(movelist);

		if (movelist){

			var orders = [];
			
			var resolved = [];
			//console.log(movelist);
				
			for (var i = 0; i < userFleets.length; i++){
			
				var	movement = new MovementOrder();
					movement.fleetid = userFleets[i];
					movement.moves = [];
					movement.hmp = [];
					movement.steps = [];
					movement.resolvd = [];
						
				for (var j = 0; j < movelist.length; j++){			
				
					if (userFleets[i] == movelist[j].fleetid){
						if (movelist[j].resolved){
							movement.resolved.push(movelist[j]);
						}
						else {
							movement.turn = movelist[j].turn;
							movement.moves.push( [movelist[j].x, movelist[j].y] );
							movement.hmp.push(movelist[j].hmp);
							movement.steps.push(movelist[j].step);
						}
					}
					else if (userFleets[i] < movelist[j].fleetid){
						orders.push(movement);
						break;
					}

				}
			}
			

			// put moves into fleets
			for (var i = 0; i < fleets.length; i++){
			
				fleets.currentOrder = new MovementOrder();
			
				for (var j = 0; j < orders.length; j++){
					orders[j].getTotalHMP = function(){
						total = 0;
						for (var i = 0; i < this.hmp.length; i++){
							total += this.hmp[i];
						}
						return total;
					}

					if (fleets[i].id == orders[j].fleetid){
						orders[j].origin = fleets[i].location;
						fleets[i].currentOrder = orders[j];
					//	console.log(fleets[i]);
						break;
					}
				}
			}
			// put moves into moveManager
			moveManager.orders = orders;
		}
		
		
		// put Fleets into Hexes
		for (var i = 0; i < fleets.length; i++){
			for (var j = 0; j < grid.hexes.length; j++){
				if ( isEqual(fleets[i].location, grid.hexes[j].id) ){						
					grid.hexes[j].contains.push(fleets[i]);
				}
			}
		}
		
		cam.initialSetup();
		grid.setVisibility();
		drawHexGrid();

	},

	issueFleetMovement: function(order){

		if (order.turn == currentTurn){
			console.log(order);
			order = JSON.stringify(order);
			

			$.ajax({
				type: "POST",
				url: "postGameData.php",
				datatype: "json",
				data: {moveOrder: order},	
				error: ajax.error,
				success: ajax.echoReturn
			});
		}
		else {
			console.log("no moves");
		}
	},

	confirmEndTurn: function(){

		console.log("confirmEndTurn");

		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {order: "endTurn"},
			error: ajax.error,
			success: ajax.echoReturn
		});		
	},

	changeElementName: function(type, id, newName){

		var obj = {};
			obj.gameid = gameid;
			obj.type = type;
			obj.id = id;
			obj.newName = newName;

		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {nameChange: obj},
			error: ajax.error,
			success: ajax.echoReturn
		});
	},

	shipTransfer: function(items){
		var obj = {
			items: items,
			gameid: gameid
		}

		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {shipTransfer: obj},
			error: ajax.error,
			success: ajax.echoReturn
		})
	},

	createMarker: function(note, loc){

		var obj = {
			gameid: gameid,
			playerid: userid,
			note: note,
			loc: loc,
			type: "create"
		}

		obj = JSON.stringify(obj);

		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {marker: obj},
			error: ajax.error,
			success: ajax.echoReturn
		})
	},

	deleteMarker: function(ele){

		var obj = {
			id: Math.floor(ele.parentNode.getElementsByTagName("span")[0].innerHTML),
			type: "delete"
		}

		obj = JSON.stringify(obj);

		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {marker: obj},
			error: ajax.error,
			success: ajax.echoReturn
		})
	},

	createNewFleet: function(fleet){
		fleet = JSON.stringify(fleet);
	//	console.log(fleet);
	
		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {
				fleets: fleet,
				type: "create"
				},	
			error: ajax.error,
			success: function(id){
				transfer.finishNewFleetCreation(id, fleet);
			}
		});
	},

	deleteEmptyFleet: function(fleet){
		fleet = JSON.stringify(fleet);
	//	console.log(fleet);
	
		$.ajax({
			type: "POST",
			url: "postGameData.php",
			datatype: "json",
			data: {
				fleets: fleet,
				type: "delete"
				},	
			error: ajax.error,
			success: ajax.echoReturn
		});
	}
}



