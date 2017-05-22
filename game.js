
function Game(id, name, status, userid, turn, phase){
	this.id = id;
	this.name = name;
	this.status = status;
	this.userid = userid;
	this.turn = turn;
	this.phase = phase;
	this.ships = [];
	this.fireOrders = []
	this.mode = false;
	this.deploying = false;
	this.flightDeploy = false;
	this.canSubmit = false;
	this.index = 1;
	this.reinforcePoints = 0;
	this.reinforcements = [];
	this.animating = false;
	this.deployArea = [];
	this.deployBlock = [];
	this.vector = false;
	this.opacity = false;
	this.markers = [];
	this.ballistics = [];
	this.antiBallistics = [];
	this.shortInfo = false;
	this.flightPath = false;

	this.doDeployFlight = function(e, pos){
		var facing = Math.floor(getAngleFromTo(game.getUnitById(aUnit).getOffsetPos(), {x: pos.x, y: pos.y}))

	//id, name, shipType, x, y, facing, faction, mass, cost, profile, size, userid, available, baseHitChance, baseImpulse
		var flight = new Flight(
			{id: -game.ships.length, name: "Flight", shipType: "Flight", x: pos.x, y: pos.y, facing: facing, 
			faction: false, mass: false, cost: false, profile: false, size: 0, userid: this.userid, available: this.turn, baseHitChance: 0, baseImpulse: 0}
		)

		flight.deployed = 1;
		flight.friendly = 1;
		flight.primary = new Primary(0, flight.id, 0, 0, 0);
		flight.actions.push(new Move("deploy", 0, pos.x, pos.y, facing, 0, 0));
		flight.launchdata = {
			shipid: aUnit,
			systemid: this.flightDeploy.id,
			loads: this.flightDeploy.loads
		}

		for (var i = 0; i < this.flightDeploy.loads.length; i++){
			for (var j = 1; j <= this.flightDeploy.loads[i].launch; j++){
				var f = new Fighter({id: j, name: this.flightDeploy.loads[i].name, ep: 0, mass: 0, integrity: 0, value: 0, negation: 0, crits: 0, destroyed: 0})
				flight.structures.push(f);
			}
		}
		flight.size = 32 + (flight.structures.length-1)*5;
		flight.create();
		flight.createBaseDiv();
		game.ships.push(flight);

		$("#instructWrapper").hide();
		$("#deployOverlay").hide();
		game.getUnitById(aUnit).getSystemById(this.flightDeploy.id).setFireOrder().select(e);
		game.flightDeploy = false;
		this.draw();
	}
	
	this.getDeployedFlights = function(){
		var ret = [];
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].userid == this.userid){
				if (this.ships[i].flight && this.ships[i].actions[0].turn == this.turn){
					var flight = {
						name: "Flight",
						launchdata: this.ships[i].launchdata,
						actions: this.ships[i].actions,
						turn: this.turn,
						arrival: 0,
						upgrades: []
					}
					ret.push(flight);
				}
			}
		}
		return ret;
	}

	this.getEWSettings = function(){
		var ret = [];
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].ship && this.ships[i].userid == this.userid){
				ret.push(this.ships[i].getEWSettings());
			}
		}
		return ret;
	}

	this.checkDeployment = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].userid == this.userid){
				if (! this.ships[i].deployed){
					if (this.ships[i].available <= this.turn){
						popup("You need to deploy all arriving vessels.");
						return true;
					}
				}
			}
		}
		return false;
	}

	this.checkPower = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].userid == this.userid){
				if (this.ships[i].ship){
					for (var j = 0; j < this.ships[i].primary.systems.length; j++){
						if (this.ships[i].primary.systems[j].name == "Reactor"){
							if (this.ships[i].primary.systems[j].getOutput() < 0){
								popup("You have units with invalid Reactor settings (#" + this.ships[i].id + ")"); 
								return true;
							}
						}
					}
				}
			}
		}
		return false;
	}

	this.checkMoves = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].userid == this.userid){
				if ((game.phase == 0 && this.ships[i].ship) || (game.phase == 1 && this.ships[i].flight)){
					if (this.ships[i].getRemainingImpulse() > 0){
						popup("You have units with unused Impulse (#" + this.ships[i].id + ")"); 
						return true;
					}
				}
			}
		}
		return false;
	}
	
	this.endPhase = function(){
		if (this.canSubmit){
			if (this.phase == -1){
				if (this.checkDeployment()){return;}
				else if (this.checkPower()){return;}
				else {ajax.confirmDeployment(goToLobby);
				}
			}
			else if (this.phase == 0 || this.phase == 1){ // SHIP MOVEMENT
				if (this.checkMoves()){return;}
				else {ajax.confirmMovement(goToLobby);}
			}
			else if (this.phase == 2){ajax.confirmFiringOrders(goToLobby);
			}
			else if (this.phase == 3){ajax.confirmDamageControl(goToLobby);
			}
		}
		else {
			popup("You have already confirmed your orders");
		}
	}

	this.drawBallisticFlightPaths = function(){
		for (var i = 0; i < game.ballistics.length; i++){
			if (game.ballistics[i].targetid == game.ballistics[i].id){}
		}
	}

	this.enableDeployment = function(shipid){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].id == shipid){
				this.deploying = shipid;
				this.setupDeploymentDiv()
				this.setupDeploymentZone();
				this.drawDeploymentZone();
				return;
			}
		}
	}

	this.disableDeployment = function(){
		this.deploying = false;
		this.deployArea = [];
		this.deployBlock = false;
		moveCtx.clearRect(0, 0, res.x, res.y);
		mouseCtx.clearRect(0, 0, res.x, res.y);
		$("#deployOverlay").hide();
	}

	this.setupDeploymentDiv = function(){
		var ele = ("#deployOverlay");
		if (game.flightDeploy){
			//img.src = game.getUnitById(game.flightDeploy).img.src;
			$(ele).find("span").html("Deploy Flight").end().find(".img").html("");
		}
		else if (game.deploying){
			var img = new Image();
				img.className = "img80";
				img.src = game.getUnitById(game.deploying).img.src;
			$(ele).find("span").html("Deploy Ship").end().find(".img").html("").append(img);
		}
	}

	this.setupDeploymentZone = function(){

		if (game.turn == 1){
			for (var i = 0; i < window.playerstatus.length; i++){

				var step;
				var h = 700;
				var w = 200;
				var x = 600;
				var y = h/2;

				if (i % 2 == 0){
					step = -1;
				}
				else {
					step = 1;
				}

				if (window.playerstatus[i].userid == this.userid){
					var id = this.userid;
					var color = "green";
				}
				else {
					var id = 0;
					var color = "red";
				}

				this.deployArea.push({
					id: id,
					x: 0 + (x * step),
					y: y/2*-1,
					w: w * step,
					h: h,
					c: color
				});
			}
		}
		else {
			this.deployArea.push({
				id: this.userid,
				x: -800,
				y: -800,
				w: 1600,
				h: 1600,
				c: "green"
			});
		}
	}

	this.drawDeploymentZone = function(){
		planCtx.clearRect(0, 0, res.x, res.y);
		planCtx.globalAlpha = 0.3;
		for (var i = 0; i < this.deployArea.length; i++){
			planCtx.translate(cam.o.x, cam.o.y)
			planCtx.scale(cam.z, cam.z)
			planCtx.beginPath();
			planCtx.rect(this.deployArea[i].x, this.deployArea[i].y, this.deployArea[i].w, this.deployArea[i].h);
			planCtx.closePath();
			planCtx.fillStyle = this.deployArea[i].c;
			planCtx.fill();
			planCtx.setTransform(1,0,0,1,0,0);
		}

		for (var i = 0; i < this.ships.length; i++){
			var zone = this.ships[i].getControlZone();
			this.drawControlZone(zone);
		}
		planCtx.globalAlpha = 1;
	}

	this.drawControlZone = function(zone){
		if (zone){
			planCtx.translate(cam.o.x, cam.o.y)
			planCtx.scale(cam.z, cam.z)
			planCtx.beginPath();
			planCtx.arc(zone.pos.x, zone.pos.y, zone.s, 0, 2*Math.PI, false);
			planCtx.closePath();
			planCtx.fillStyle = "red";
			planCtx.fill();
			planCtx.setTransform(1,0,0,1,0,0);
		}
	}

	this.createDeploymentTable = function(){
		var toDo = [];
		var table;
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].deployed == false){
				if (this.ships[i].userid == this.userid){
					toDo.push(this.ships[i]);
				}
			}
		}
		for (var i = 0; i < window.incoming.length; i++){
			if (window.incoming[i].userid == this.userid){
				toDo.push(window.incoming[i]);
			}
		}

		if (toDo.length){
			table = document.getElementById("deployTable");

			for (var i = 0; i < toDo.length; i++){
				var available = false;
				if (toDo[i].available <= this.turn){
					available = true;
				}

				var tr = document.createElement("tr");

				if (available){
					$(tr).data("shipid", toDo[i].id).click(function(e){
						//console.log($(this).data());
						e.preventDefault();
						e.stopPropagation();
						if (! aUnit){
							if (game.deploying == $(this).data("shipid")){
								$(this).toggleClass("selected");
								game.disableDeployment();
							}
							else if (!game.deploying){
								$(this).toggleClass("selected");
								game.enableDeployment($(this).data("shipid"));
							}
							else {
								return;
							}
						}
					});
				}

				var td = document.createElement("td");
					td.innerHTML = "<img class='img50' src='shipIcons/"+toDo[i].name.toLowerCase() + ".png'>";
				//	td.appendChild(img);
				tr.appendChild(td);

				var td = document.createElement("td");
					td.innerHTML = toDo[i].name;
				tr.appendChild(td);

				var td = document.createElement("td");
					td.colSpan = 2;

					if (toDo[i].available - this.turn == 0){
						td.innerHTML = "NOW";
						td.className = "shipAvailable"
					}
					else if (toDo[i].available - this.turn == 1){
						td.innerHTML = toDo[i].available - this.turn + " turn";
						td.className = "shipUnavailable";
					}
					else {
						td.innerHTML = toDo[i].available - this.turn + " turns";
						td.className = "shipUnavailable";
					}
					
				tr.appendChild(td);
				table.appendChild(tr);
			}
		}
	}

	this.initDeployment = function(){
		cam.setZoom(0.6);
		//cam.setFocus()
		$("#deployWrapper").removeClass("disabled");
	}

	this.movementResolved = function(){
		console.log("movementResolved");
	}

	this.initDamageControl = function(){
		this.resolveFire();
	}

	this.fireResolved = function(){
		this.draw();
		console.log("fireResolved");
	}

	this.setShipDivs = function(){
		var x = 100;
		var y = 400;
		for (var i = 0; i < this.ships.length; i++){
			var ele = $(this.ships[i].element);
			var w = $(ele).width();
			var h = $(ele).height();

			if (x + w/2 > res.x){
				x = 100;
				y += 400;
			}
			else {
				x += w/2;
				y += h/2;
			}

			$(ele)
				.css("left", x)
				.css("top", y);
		}

		for (var i = 0; i < this.ballistics.length; i++){
			var ele = $(this.ballistics[i].element);
			var h = $(ele).height();
			/*
			var w = $(ele).width();
			var h = $(ele).height();
			var x = this.ships[i].x + cam.o.x + w/2;
			var y = this.ships[i].y + cam.o.y;
			*/

			$(ele)
				.css("left",res.x - 400)
				.css("top", res.y/2 - h/2 + 200);
		}
	}

Game.prototype.getUnitType = function (val){
	switch (val){
		case 3: return "Ultra Heavy";
		case 2: return "Super Heavy";
		case 1: return "Heavy";
		case 0: return "Medium";
		case -1: return "Light";
		case -2: return "SuperLight";
		case -3: return "Flight";
		case -4: return "Salvo";
	}
}
/*		var w = $(div).width();
		var h = $(div).height();
		var left = 50;
		if (this.facing < 90 || this.facing > 270){
			left = res.x - w - 50;
		}
		var x = this.x +cam.o.x - w/2;
		var y = this.y +cam.o.y + 150;

		$(div).css("left", x).css("top", y);
	}*/

	
	this.initPhase = function(n){
		$("#turnDiv").html("Turn: " + this.turn);
		this.createDeploymentTable();
		this.setShipDivs();
		game.draw();

		if (n == -1){
			this.phase = n;
				$("#phaseDiv").html("Deployment and Initial")
				$("#phaseSwitchDiv").click(function(){
					game.initDeployment();
					//$("#deployWrapper").find("#reinforceTable").show();
					$(this).hide();
				});
		}
		else if (n == 0){
			this.phase = n;
				$("#phaseDiv").html("Capital Movement")
				$("#phaseSwitchDiv").click(function(){
					game.resolveDeployment();
					$(this).hide()
					//$(this).fadeOut(200);
				});
		}
		else if (n == 1){
			this.phase = n;
				$("#phaseDiv").html("Flight Movement")
				$("#phaseSwitchDiv").click(function(){
					game.resolveShipMovement();
					$(this).hide()
				//	$(this).fadeOut(200);
				});
		}
		else if (n == 2){
				$("#phaseDiv").html("Firing")
				$("#phaseSwitchDiv").click(function(){
					game.resolveShipMovement();
					$(this).hide()
				//	$(this).fadeOut(200);
				});
		}
		else if (n == 3){
			this.phase = n;
				$("#phaseDiv").html("Damage Control")
				$("#phaseSwitchDiv").click(function(){
					game.initDamageControl();
					$(this).hide()
					//$(this).fadeOut(200);
				});
			
		}
	}
	
	this.create = function(){
		$("#phaseSwitchDiv").show();

		for (var i = 0; i < window.ships.length; i++){
			var ship = window.initiateShip(i);
			var deployed = false;
			var friendly = false;

			if (window.ships[i].userid == this.userid){
				friendly = true;
			}
			
			if (friendly && window.ships[i].actions.length && window.ships[i].actions[0].turn == this.turn){
				deployed = true;
			}
			else if (window.ships[i].actions.length && window.ships[i].actions[0].resolved == 1){
				deployed = true;
			}

			ship.friendly = friendly;
			ship.deployed = deployed;

			if (! friendly){
				if (deployed){
					for (var j = 0; j < window.ships[i].actions.length; j++){
						if (window.ships[i].actions[j].resolved){
							ship.actions.push(window.ships[i].actions[j]);
						}
						else {
							break;
						}
					}
				}
			}
			else {
				for (var j = 0; j < window.ships[i].actions.length; j++){
					ship.actions.push(window.ships[i].actions[j]);
				}
			}

			ship.create();
			this.ships.push(ship);
			ship.createBaseDiv();
		}

		for (var i = 0; i < window.ballistics.length; i++){
			game.ballistics.push(window.initiateBallistic(i));
		}

		var canSubmit = false;
		var isPlaying = false;
		for (var i = 0; i < playerstatus.length; i++){
			if (playerstatus[i].userid == userid){
				isPlaying = true;
				this.reinforcePoints = $("#reinforce").html();
				if (playerstatus[i].status == "waiting"){
					canSubmit = true;
					break;
				}
			}
		}

		this.canSubmit = canSubmit;
		cam.setFocus(0, 0);
		this.initPhase(this.phase);
	}

	this.unitHover = function(elements){
		if (elements[0].id == game.shortInfo){
			return;
		}
		if (elements){
			var ele = $("#shortInfo");
				$(ele).children().remove();

			for (var i = 0; i < elements.length; i++){
				table = elements[i].getShortInfo();
				$(ele).append($(table).css("width", "100%"));
				game.shortInfo = elements[i].id;

				var balls = this.getRelevantBallistics(elements[i]);

				for (var j = 0; j < balls.length; j++){
					if (balls[j].destroyed){continue;}
					balls[j].drawFlightPath();
				}

				elements[i].drawHoverElements();
			}

			var oX = $(ele).width()/2;
			var pos = elements[0].getBaseOffsetPos();
			var top = (pos.y * cam.z) + cam.o.y + 40;
			var left =(pos.x * cam.z) + cam.o.x - oX;

			$(ele).css("top", top).css("left", left).show();
		}
	}

	this.getRelevantBallistics = function(unit){
		var ret = [];
		for (var i = 0; i < this.ballistics.length; i++){
			if (this.ballistics[i].id == unit.id || this.ballistics[i].targetid == unit.id || this.ballistics[i].id == unit.targetid){
				ret.push(this.ballistics[i]);
				for (var j = i+1; j < this.ballistics.length; j++){
					if (this.ballistics[i].id == this.ballistics[j].targetid){
						ret.push(this.ballistics[j]);
					}
				}
			}
		}
		return ret;
	}

	this.resetHover = function(){
		if (game.flightPath){
			salvoCtx.clearRect(0, 0, res.x, res.y);
			game.flightPath = false;
		}
		if (game.deploying){
			game.drawDeploymentZone();
		}
		$("#shortInfo").html("").hide();
		mouseCtx.clearRect(0, 0, res.x, res.y);
		//moveCtx.clearRect(0, 0, res.x, res.y);
		game.shortInfo = false;
	}
	
	this.posIsOccupied = function(ship, pos){
		return false;
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].x < pos.x + this.ships[i].size/2 && this.ships[i].x > pos.x - this.ships[i].size/2){
				if (this.ships[i].y > pos.y - this.ships[i].size/2 && this.ships[i].y < pos.y + this.ships[i].size/2){
					if (this.ships[i].id != ship.id);
					return true;
				}
			}
		}	
		return false;
	}

	this.hasShipOnPos = function(pos){
		var ret = [];
		for (var i = 0; i < this.ships.length; i++){
			var r = this.ships[i].size/4;
			if (! this.ships[i].destroyed){
				if (this.ships[i].deployed){
					var shipPos = this.ships[i].getBaseOffsetPos();
					if (shipPos.x < pos.x + r && shipPos.x > pos.x - r){
						if (shipPos.y > pos.y - r && shipPos.y < pos.y + r){
							ret.push(this.ships[i]);
							break;
						}
					}
				}
			}
		}	
		if (ret.length){return ret;}else return false;
	}

	this.hasAmmoOnPos = function(pos){
		var ret = [];
		var r = 7;
		for (var i = 0; i < this.ballistics.length; i++){
			var x = this.ballistics[i].actions[this.ballistics[i].actions.length-1].x;
			var y = this.ballistics[i].actions[this.ballistics[i].actions.length-1].y;
			if (x < pos.x + r && x > pos.x - r){
				if (y > pos.y - r && y < pos.y + r){
					ret.push(this.ballistics[i]);
					break;
				}
			}
		}
		if (ret.length){return ret;}else return false;
	}

	this.getShipByClick = function(pos){
		for (var i = 0; i < this.ships.length; i++){
			var r = this.ships[i].size/4;
			if (! this.ships[i].destroyed){
				if (this.ships[i].deployed){
					var shipPos = this.ships[i].getBaseOffsetPos();
					if (pos.x < shipPos.x + r && pos.x > shipPos.x - r){
						if (pos.y > shipPos.y - r && pos.y < shipPos.y + r){
							return this.ships[i];
						}
					}
				}
			}
		}
	}

	this.getAmmoByClick = function(pos){
		var r = 7;
		for (var i = 0; i < this.ballistics.length; i++){
			var ammoPos = this.ballistics[i].getBaseOffsetPos();
			if (pos.x < ammoPos.x + r && pos.x > ammoPos.x - r){
				if (pos.y > ammoPos.y - r && pos.y < ammoPos.y + r){
					return this.ballistics[i];
				}
			}
		}
	}

	this.getUnitByClick = function(pos){
		return this.getAmmoByClick(pos) || this.getShipByClick(pos) || false;
	}

	this.redraw = function(){
		//console.log("ding");
		planCtx.clearRect(0, 0, res.x, res.y);
		moveCtx.clearRect(0, 0, res.x, res.y)
		salvoCtx.clearRect(0, 0, res.x, res.y)
		mouseCtx.clearRect(0, 0, res.x, res.y)

		$("#shortInfo").hide();

		if (aUnit){
			var unit = game.getUnitById(aUnit);
			if (unit instanceof Ship){
				if (unit.hasWeaponsSelected()){
					unit.highlightAllSelectedWeapons();
				}
				//if (game.phase == -1 || game.phase == 0 || game.phase == 1){
					unit.unsetMoveMode();
					unit.setMoveMode();
				//}
			}
		}
		game.draw();
	}
	
	this.draw = function(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		this.drawShips();
		this.drawBallistics();

		if (game.flightDeploy){
			game.flightDeploy.drawArc();
		} else if (game.deploying){
			game.drawDeploymentZone();
		}
	}

	this.setShipTransform = function(){
		ctx.translate(cam.o.x, cam.o.y);
		ctx.scale(cam.z, cam.z);
	}

	this.resetShipTransform = function(){
		ctx.setTransform(1,0,0,1,0,0);
	}
	
	this.drawShips = function(){
		this.setShipTransform();
		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].draw();
		}
		this.resetShipTransform();
	}

	this.drawBallistics = function(){
		ctx.translate(cam.o.x, cam.o.y);
		ctx.scale(cam.z, cam.z);
		for (var i = 0; i < this.ballistics.length; i++){
			this.ballistics[i].draw();
		}
		ctx.setTransform(1,0,0,1,0,0);
	}
	
	this.drawOtherShips = function(id){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].id != id){
				this.ships[i].draw();
			}
		}
	}

	this.getShipById = function(id){	
		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].id == id){
				return game.ships[i];
			}
		}
		return false;
	}

	this.getBallById = function(id){
		for (var i = 0; i < game.ballistics.length; i++){
			if (game.ballistics[i].id == id){
				return game.ballistics[i];
			}
		}
		return false;
	}

	this.getUnitById = function(id){
		var unit = this.getShipById(id);
		if (unit){
			return unit;
		}
		else {
			return this.getBallById(id);
		}
	}
	
	this.getActiveShip = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].selected){
				return this.ships[i];
			}
		}
	}

	this.getCurrentReinforceCost = function(){
		var cost = 0;
		if (this.reinforcements.length){
			for (var i = 0; i < this.reinforcements.length; i++){
				cost += this.reinforcements[i].cost;
			}
		}

		return cost;
	}

	this.selectReinforcements = function(id){
		var found = false;

		for (var i = this.reinforcements.length-1; i >= 0; i--){
			if (this.reinforcements[i].id == id){
				found = true;
				this.reinforcements.splice(i, 1);
			}
		}
		if (! found){
			for (var i = 0; i < window.reinforcements.length; i++){
				if (window.reinforcements[i].id == id){
					this.reinforcements.push(window.reinforcements[i]);
					break;
				}
			}
		}
		$("#totalRequestCost").html(this.getCurrentReinforceCost());
	}

	this.showReinforcementsPreview = function(id){
		found = 0;
		for (var i = 0; i < window.reinforcements.length; i++){
			if (window.reinforcements[i].id == id){
				found = i;
				break;
			}
		}
		console.log(window.reinforcements[i]);
	}

	this.resolveDeployment = function(){
		console.log("resolveDeployment");
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].available == game.turn){
				if (this.ships[i].actions[0].turn == this.turn){
					if (this.ships[i].ship){
						this.ships[i].deployAnim = {done: false, t: [0, 200]};
						this.ships[i].deployed = false;
					}
				}
			}
		}
		setFPS(60);
		window.then = Date.now();
		window.startTime = then;
		this.animating = true;
		cam.setZoom(0.7);
		this.animateDeployment();
	}

	this.animateDeployment = function(){
		anim = window.requestAnimationFrame(game.animateDeployment.bind(this));
		window.now = Date.now();		
		window.elapsed = window.now - window.then;
		if (elapsed > window.fpsInterval){
			window.then = window.now - (window.elapsed % window.fpsInterval);
			ctx.clearRect(0, 0, res.x, res.y);

			for (var i = 0; i < game.ships.length; i++){
				ctx.translate(cam.o.x, cam.o.y);
				ctx.scale(cam.z, cam.z);

				if (game.ships[i].deployAnim == undefined || game.ships[i].deployAnim.done){
					game.ships[i].drawSelf();
				}
				else {
					game.ships[i].deployAnim.t[0] += 3;
					var fraction = game.ships[i].deployAnim.t[0] / game.ships[i].deployAnim.t[1];

					if (fraction >= 1){
						game.ships[i].deployAnim.done = true;
						game.ships[i].drawSelf();
					}
					else {
						var sin = Math.sin(Math.PI*fraction);
						drawCircle(game.ships[i].x, game.ships[i].y, game.ships[i].size*0.55*sin, "source-over", "blue");
						drawCircle(game.ships[i].x, game.ships[i].y, game.ships[i].size*0.2*sin/2, "lighter", "lightBlue");

						if (fraction >= 0.3){
							ctx.globalAlpha = fraction;
							game.ships[i].drawSelf();
							game.ships[i].deployed = true;
							ctx.globalAlpha = 1;
						}
						ctx.setTransform(1,0,0,1,0,0);
						break;
					}
				}
				ctx.setTransform(1,0,0,1,0,0);
			}

			var done = true;
			for (var i = 0; i < game.ships.length; i++){
				if (game.ships[i].deployAnim != undefined && ! game.ships[i].deployAnim.done){
					done = false;
					break;
				}
			}
			if (done){
				window.cancelAnimationFrame(anim);
				game.deployDone()
			}
		}
	}

	this.deployDone = function(){
		game.animating = false;
		game.draw();
		console.log("deployDone");
	}
	
	this.resolveShipMovement = function(){
		if (aUnit){
			game.getUnitById(aUnit).select();
		}

		setFPS(120);
		window.animShip = false;
		window.animFlight = false;
		if (game.phase == 1){
			animShip = true;
		}
		else if (game.phase == 2){ // check if its firing phase and we animate fighters OR ships (skipped flight pa)
			animShip = true;
			animFlight = false;
			for (var i = 0; i < this.ships.length; i++){
				if (this.ships[i].flight){
					animShip = false;
					animFlight = true;
					break;
				}
			}
		}

		//console.log("animShip: "+animShip);
		//console.log("animFlight: "+animFlight);

		var toDo;
		for (var i = 0; i < this.ships.length; i++){
			var toDo = true;
			if (! this.ships[i].deployed){
				toDo = false;
			}
			else if (this.ships[i].flight && !animFlight || this.ships[i].ship && !animShip){
				for (var j = this.ships[i].actions.length-1; j >= 0; j--){
					this.ships[i].actions[j].animated = true;
				}
				toDo = false;
			}


			/*else if ((game.phase == 1 && this.ships[i].flight) || (game.phase == 2 && !this.ships[i].flight)){
				for (var j = this.ships[i].actions.length-1; j >= 0; j--){
					this.ships[i].actions[j].animated = true;
				}
				toDo = false;
			}*/

			if (! toDo){
				continue;
			}

			this.ships[i].animationSetup();

			var frameMod = window.fps / this.ships[i].getTotalImpulse();

			for (var j = 0; j < this.ships[i].actions.length; j++){
				if (this.ships[i].actions[j].turn == game.turn){
					var action = this.ships[i].actions[j];

					if (action.type == "deploy" || action.type == "speedChange"){
						this.ships[i].actions[j].animated = true;
					}
					else if (j == 0){
						if (action.type == "move"){
							var v = new Vector(this.ships[i].getBaseOffsetPos(), {x: action.x, y: action.y});
								v.t = [0, action.dist * frameMod];
							this.ships[i].actions[j].v = v;
						}
						else if (action.type == "turn"){
							this.ships[i].actions[j].angle = this.ships[i].actions[j].a;
						}
					}
					else {
						if (action.type == "move"){
							var v = new Vector({x: this.ships[i].actions[j-1].x, y: this.ships[i].actions[j-1].y}, {x: action.x, y: action.y});
								v.t = [0, action.dist * frameMod];
							this.ships[i].actions[j].v = v;
							//console.log(v);
						}
						else if (action.type == "turn"){
							this.ships[i].actions[j].angle = this.ships[i].actions[j].a;
						}
					}
				}
			}
		}

		window.then = Date.now();
		window.startTime = then;
		game.animateShipMovement();
	}

	this.animateShipMovement = function(){
		anim = window.requestAnimationFrame(game.animateShipMovement.bind(this));
		window.now = Date.now();		
		window.elapsed = window.now - window.then;
		if (elapsed > window.fpsInterval){
			//frameCounter++;
			//console.log(frameCounter);
			window.then = window.now - (window.elapsed % window.fpsInterval);
			fxCtx.clearRect(0, 0, res.x, res.y);
			ctx.clearRect(0, 0, res.x, res.y);
			game.drawBallistics();

			ctx.translate(cam.o.x, cam.o.y);
			ctx.scale(cam.z, cam.z);
		
			for (var i = 0; i < game.ships.length; i++){
				if (game.ships[i].deployed){
					if (this.ships[i].flight && !animFlight || this.ships[i].ship && !animShip){
						game.ships[i].draw();
						continue;
					}

					for (var j = 0; j < game.ships[i].actions.length; j++){
						if (game.ships[i].actions[j].turn == game.turn && !game.ships[i].actions[j].animated){
							var action = game.ships[i].actions[j];
							if (action.type == "move"){
								//	console.log(game.ships[i].actions[j].v);
								game.ships[i].actions[j].v.t[0] += 1;
								game.ships[i].x += action.v.x * 1 / game.ships[i].actions[j].v.t[1];
								game.ships[i].y += action.v.y * 1 / game.ships[i].actions[j].v.t[1];
								if (game.ships[i].actions[j].v.t[0] >= game.ships[i].actions[j].v.t[1]){
								//	console.log("anim true");
									game.ships[i].actions[j].animated = true;
									game.ships[i].x = game.ships[i].actions[j].x;
									game.ships[i].y = game.ships[i].actions[j].y;
								}
							}
							else if (action.type == "turn"){
								var step = 1;
								//	console.log("turn");
									if (action.a > 0){
										game.ships[i].facing = addToDirection(game.ships[i].facing, step);
										game.ships[i].actions[j].angle -= step;
									}
									else {
										game.ships[i].facing = addToDirection(game.ships[i].facing, -step);
										game.ships[i].actions[j].angle += step;
									}
									
									if (game.ships[i].actions[j].angle == 0){
										game.ships[i].actions[j].animated = true;
									}
								
							/*	if (action.a > 0){
									game.ships[i].add(action.a);
									game.ships[i].actions[j].a = 0;
								}
								else if (action.a < 0) {
									game.ships[i].add(action.a);
									game.ships[i].actions[j].a = 0;
								}
								if (game.ships[i].actions[j].a == 0){
								//	console.log("turn done")
									game.ships[i].actions[j].animated = true;
								}*/
							}
							/*else if (action.type == "deploy"){
							}
							else if (action.type == "speedChange"){
							}*/
							
							break;
						}
					}
					game.ships[i].draw();
				}
			}

			ctx.setTransform(1,0,0,1,0,0);
			
			var done = true;
			
			for (var i = 0; i < game.ships.length; i++){
				if (! done){
					break;
				}
				
				for (var j = 0; j < game.ships[i].actions.length; j++){
					if (game.ships[i].actions[j].turn == game.turn){
						if (! game.ships[i].actions[j].animated){
							done = false;
							break;
						}
					}
				}
			}
			
			if (done){
				window.cancelAnimationFrame(anim);
				game.draw();
				game.movementResolved();
			}
		}
	}

	this.resolveFire = function(){
		this.getResolvingFireOrders();
		this.getShotDetails();
		this.getFireAnimationDetails();
		this.getBallDetails();
		this.getShipExplosionDetails();

		$("#combatlogWrapper").show();
		setFPS(45);
		window.then = Date.now();
		window.startTime = then;
		
		fxCtx.clearRect(0, 0, res.x, res.y);
		ctx.clearRect(0, 0, res.x, res.y);

		this.animateFire = true;
		this.drawShips();
		//this.animateBallistics()
		this.animateFireOrders();

		//this.animateFire = true; this.fireResolved();
	}

	this.getResolvingFireOrders= function(){
		this.fireOrders = [];
		for (var i = 0; i < this.ships.length; i++){
			for (var j = 0; j < this.ships[i].structures.length; j++){
				for (var k = 0; k < this.ships[i].structures[j].systems.length; k++){
					if (this.ships[i].structures[j].systems[k].weapon){
						if (!(this.ships[i].structures[j].systems[k] instanceof Launcher)){
							for (var l = 0; l < this.ships[i].structures[j].systems[k].fireOrders.length; l++){
								if (this.ships[i].structures[j].systems[k].fireOrders[l].turn == this.turn){
									this.fireOrders.push(this.ships[i].structures[j].systems[k].fireOrders[l]);
								}
							}
						}
					}
				}
			}
		}
	}

	this.getShotDetails = function(){
		for (var i = 0; i < this.fireOrders.length; i++){
			this.fireOrders[i].target = game.getUnitById(this.fireOrders[i].targetid);
			this.fireOrders[i].shooter = game.getUnitById(this.fireOrders[i].shooterid);
			this.fireOrders[i].weapon = this.fireOrders[i].shooter.getSystemById(this.fireOrders[i].weaponid).getActiveWeapon();
			this.fireOrders[i].hits = [this.fireOrders[i].hits];
			this.fireOrders[i].damages = this.fireOrders[i].target.getDamageEntriesByFireId(this.fireOrders[i].id);
		}

		for (var i = 0; i < this.fireOrders.length; i++){
			if (this.fireOrders[i].guns){
				this.fireOrders[i].min = this.fireOrders[i].req;
				this.fireOrders[i].max = this.fireOrders[i].req;
				for (var j = i+1; j < this.fireOrders.length; j++){
					if (this.fireOrders[j].guns){
						if (this.fireOrders[i].shooterid == this.fireOrders[j].shooterid){
							if (this.fireOrders[i].targetid == this.fireOrders[j].targetid){
								if (this.fireOrders[i].weapon.name == this.fireOrders[j].weapon.name){
									this.fireOrders[i].guns += this.fireOrders[j].guns;
									for (var k = 0; k < this.fireOrders[j].damages.length; k++){
										this.fireOrders[i].damages.push(this.fireOrders[j].damages[k])
									}
									this.fireOrders[i].hits.push(this.fireOrders[j].hits[0]);
									this.fireOrders[j].guns = 0;

									if (this.fireOrders[j].req > this.fireOrders[i].max){
										this.fireOrders[i].max = this.fireOrders[j].req;
									}
									else if (this.fireOrders[j].req != -1 && this.fireOrders[j].req < this.fireOrders[i].min){
										this.fireOrders[i].min = this.fireOrders[j].req;
									}
								}
							}
						}
					}
				}
			}
		}

		//console.log(this.fireOrders);
		for (var i = this.fireOrders.length-1; i >= 0; i--){
				this.fireOrders[i].type = "Regular Fire";
			if (! this.fireOrders[i].guns){
				this.fireOrders.splice(i, 1);
				continue;
			}
			else {
				var a = this.fireOrders[i].shooter.getBaseOffsetPos();
				var b = this.fireOrders[i].target.getBaseOffsetPos();
				this.fireOrders[i].dist = getDistance(
					{
						x: a.x,
						y: a.y
					},
					{	x: b.x,
						y: b.y
					}
				);
				this.fireOrders[i].focus = {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2}
			}

			if (this.fireOrders[i].target instanceof Salvo){
				this.fireOrders[i].type = "Intercept";
				window.animate.intercepts.push(this.fireOrders[i]);
				this.fireOrders.splice(i, 1);
			}
			else {
			}
		}
	}

	this.getFireAnimationDetails = function(){
		for (var i = 0; i < this.fireOrders.length; i++){
			this.fireOrders[i].anim = this.fireOrders[i].weapon.getAnimation(this.fireOrders[i]);
		}

		this.fireOrders.sort(function(a, b){
			return (
				a.shooter.flight - b.shooter.flight ||
				a.targetid - b.targetid ||
				a.weapon.priority - b.weapon.priority ||
				a.shooterid - b.shooterid
			)
		});
		//console.log(this.fireOrders)
    }

	this.getShipExplosionDetails = function(){
		window.animations = [];

		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].deployed){
				var anim = {
						anims: [],
						base: {x: game.ships[i].x, y: game.ships[i].y},
						done: false
				}

				if (game.ships[i].flight){
					for (var j = 0; j < game.ships[i].structures.length; j++){
						if (game.ships[i].structures[j].isDestroyedThisTurn()){
							anim.anims.push({
								a: game.ships[i].facing+90,
								id: game.ships[i].id,
								t: [0-30*anim.anims.length, 70],
								s: game.ships[i].structures[j].mass / 3,
								x: game.ships[i].layout[j].x,
								y: game.ships[i].layout[j].y
							})
						}
					}
				}
				else if (game.ships[i].ship && game.ships[i].isDestroyedThisTurn()){
					anim.anims.push({
						a: game.ships[i].facing,
						id: game.ships[i].id,
						t: [0, 100],
						s: game.ships[i].structures[j].mass / 400,
						x: range(-20, 20),
						y: range(-20, 20)
					})
				}
			}
		
			if (anim.anims.length){
				animations.push(anim);
			}
		}
	}

	this.animateFireOrders = function(){
		anim = window.requestAnimationFrame(game.animateFireOrders.bind(this));
		window.now = Date.now();		
		window.elapsed = window.now - window.then;
		if (elapsed > window.fpsInterval){
			window.then = window.now - (window.elapsed % window.fpsInterval);
			fxCtx.clearRect(0, 0, res.x, res.y);

			//if (game.fireOrders[1].anim[0][0].n){console.log("Ding");}


			for (var i = 0; i  < game.fireOrders.length; i++){ 
				if (! game.fireOrders[i].animated){
					//cam.setFocus(game.fireOrders[i].focus.x, game.fireOrders[i].focus.y);
					for (var j = 0; j < game.fireOrders[i].anim.length; j++){
						for (var k = 0; k < game.fireOrders[i].anim[j].length; k++){
							if (game.fireOrders[i].anim[j][k].done){continue;}
							if (game.fireOrders[i].weapon.animation == "projectile"){
								if (game.fireOrders[i].anim[j][k].n < game.fireOrders[i].anim[j][k].m){ // still to animate
									game.fireOrders[i].anim[j][k].n += 1;
									if (game.fireOrders[i].anim[j][k].n > 0){ // valid, now animate
										drawProjectile(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k]);
									}
								}
								else if (game.fireOrders[i].anim[j][k].h){ // shot animated, does it explode ?
									game.fireOrders[i].anim[j][k].n += 1;
									drawExplosion(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k].tx, game.fireOrders[i].anim[j][k].ty, game.fireOrders[i].anim[j][k].n, game.fireOrders[i].anim[j][k].m, 30); // EXPLO
									//drawExplosion(game.fireOrders[i].weapon, game.fireOrders[i].shooter, game.fireOrders[i].anim[j][k]);
									if (game.fireOrders[i].anim[j][k].n >= game.fireOrders[i].anim[j][k].m+30){
										game.fireOrders[i].anim[j][k].done = true;
									}
								}
								else {
									game.fireOrders[i].anim[j][k].done = true;
								}
							}
							else if (game.fireOrders[i].weapon.animation == "beam"){
								if (game.fireOrders[i].anim[j][k].n < game.fireOrders[i].anim[j][k].m){ // still to animate
									game.fireOrders[i].anim[j][k].n += 1;
									if (game.fireOrders[i].anim[j][k].n > 0){ // t valid, now animate
										drawBeam(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k]);

								 		if (game.fireOrders[i].anim[j][k].n >= game.fireOrders[i].anim[j][k].m){
											game.fireOrders[i].anim[j][k].done = true;
										}
									}
								}
							}
						}
					}
					
					var allAnimated = true;
					for (var j = 0; j < game.fireOrders[i].anim.length; j++){
						for (var k = 0; k < game.fireOrders[i].anim[j].length; k++){
							if (! game.fireOrders[i].anim[j][k].done){
								allAnimated = false;
								break;
							}
						}
						if (!allAnimated){
							break;
						}
					}
					
					if (allAnimated){
						game.fireOrders[i].animated = allAnimated;
						game.createCombatLogEntry(game.fireOrders[i]);
					}
				
					break;
				}
			}
			
			var done = true
			
			for (var i = 0; i  < game.fireOrders.length; i++){
				if (! game.fireOrders[i].animated){
					done = false;
				}
			}

			if (done){
				window.cancelAnimationFrame(anim);
				fxCtx.clearRect(0, 0, res.x, res.y);
				game.animateBallistics();
			}
		}
	}

	/*		this.fireOrders.push(
			{id: 0, turn: game.turn, shooterid: this.parentId, targetid: targetid, weaponid: this.id, 
			shots: this.getShots(), req: -1, notes: "", hits: -1, resolved: 0}
		);
*/

	this.getBallDetails = function(){
		for (var i = 0; i < game.ballistics.length; i++){
			if (game.ballistics[i].actions[game.ballistics[i].actions.length-1].type == "impact" && game.ballistics[i].status != "intercepted"){
				game.ballistics[i].fireOrder.type = "Ballistic";
				game.ballistics[i].fireOrder.weapon = game.ballistics[i].structures[0];
				game.ballistics[i].fireOrder.shooter = game.ballistics[i];
				game.ballistics[i].fireOrder.target = game.getUnitById(game.ballistics[i].targetid);
				game.ballistics[i].fireOrder.damages = game.getUnitById(game.ballistics[i].targetid).getDamageEntriesByFireId(game.ballistics[i].fireOrder.id);
				game.ballistics[i].fireOrder.hits = [game.ballistics[i].fireOrder.hits];
				var guns = 0;
				for (var j = 0; j < game.ballistics[i].structures.length; j++){
					if (!game.ballistics[i].structures[j].destroyed){
						game.ballistics[i].fireOrder.hits.push(0);
						guns++;
					}
				}
				game.ballistics[i].fireOrder.guns = guns;

			}

			game.ballistics[i].found = false;
			if (!game.getUnitById(game.ballistics[i].targetid).salvo){
				game.ballistics[i].found = true;
				animate.ballAnims.push({"done": false,"anims": [game.ballistics[i]]});
			}
		}

		for (var i = 0; i < animate.ballAnims.length; i++){
			for (var j = 0; j < animate.intercepts.length; j++){
				if (!animate.intercepts[j].found && animate.ballAnims[i].anims[0].id == animate.intercepts[j].targetid){
					//console.log(animate.intercepts[j]);
					animate.intercepts[j].found = true;
					animate.ballAnims[i].anims.push(animate.intercepts[j]);
				}
			}
			for (var j = 0; j < game.ballistics.length; j++){
				if (game.ballistics[j].found){continue;}
				else if (animate.ballAnims[i].anims[0].id == game.ballistics[j].targetid){
					game.ballistics[j].found = true;
					animate.ballAnims[i].anims.push(game.ballistics[j]);
				}
			}
		}

		for (var i = 0; i < animate.ballAnims.length; i++){
			for (var j = 0; j < animate.ballAnims[i].anims.length; j++){
				if (animate.ballAnims[i].anims[j] instanceof Salvo){
					var hit = false;
					if (animate.ballAnims[i].anims[j].fireOrder != undefined && animate.ballAnims[i].anims[j].fireOrder.damages.length){
						hit = true;
					}
					animate.ballAnims[i].anims[j].anim.push(
						new BallVector(
							animate.ballAnims[i].anims[j].actions[animate.ballAnims[i].anims[j].actions.length-2],
							animate.ballAnims[i].anims[j].actions[animate.ballAnims[i].anims[j].actions.length-1],
							animate.ballAnims[i].anims[j].getTotalImpulse() / animate.ballAnims[i].anims[0].getTotalImpulse(),
							hit
						)
					);
				}
				else if (animate.ballAnims[i].anims[j] instanceof FireOrder){
					var targetMove = new Vector(
						animate.ballAnims[i].anims[j].target.actions[animate.ballAnims[i].anims[j].target.actions.length-2],
						animate.ballAnims[i].anims[j].target.actions[animate.ballAnims[i].anims[j].target.actions.length-1]
					);

					if (!(animate.ballAnims[i].anims[j].weapon instanceof Laser)){
						var interceptPos = getProjIntercept(
							animate.ballAnims[i].anims[j].shooter,
							animate.ballAnims[i].anims[j].target.actions[animate.ballAnims[i].anims[j].target.actions.length-2],
							targetMove,
							animate.ballAnims[i].anims[j].weapon.projSpeed/2
						);
						for (var k = 0; k < animate.ballAnims[i].anims[j].guns; k++){
							for (var l = 0; l < animate.ballAnims[i].anims[j].shots; l++){
								var hit = false;
								if (l < animate.ballAnims[i].anims[j].hits[k]){
									hit = true;
								}
								var interceptVector = new BallVector(
									animate.ballAnims[i].anims[j].shooter,
									randomize(interceptPos, 6, 6),
									animate.ballAnims[i].anims[j].weapon.projSpeed/2,
									hit
								);
								interceptVector.n -= l*15;
								animate.ballAnims[i].anims[j].anim.push(interceptVector);
							}
						}
					}
					else {
						var interceptPos = getBeamIntercept(
							animate.ballAnims[i].anims[j].shooter,
							animate.ballAnims[i].anims[j].target.actions[animate.ballAnims[i].anims[j].target.actions.length-2],
							targetMove
						);
						for (var k = 0; k < animate.ballAnims[i].anims[j].guns; k++){
							for (var l = 0; l < animate.ballAnims[i].anims[j].shots; l++){
								var hit = false;
								if (l < animate.ballAnims[i].anims[j].hits[k]){
									hit = true;
								}
								var interceptVector = new BallVector(
									animate.ballAnims[i].anims[j].shooter,
									randomize(interceptPos, 8, 8),
									1,
									hit
								);
								interceptVector.ox = animate.ballAnims[i].anims[j].shooter.x + range(-15, 15);
								interceptVector.oy = animate.ballAnims[i].anims[j].shooter.y + range(-15, 15);
								interceptVector.n -= 5*k;
								interceptVector.m *= 0.5;
								interceptVector.nx = 0;
								interceptVector.ny = 0;
								interceptVector.tax = interceptPos.x
								interceptVector.tay = interceptPos.y
								animate.ballAnims[i].anims[j].anim.push(interceptVector);
							}
						}
					}
				}
			}
		}
	}

	this.animateBallistics = function(){
		anim = window.requestAnimationFrame(game.animateBallistics.bind(this));

		ctx.clearRect(0, 0, res.x, res.y);
		fxCtx.clearRect(0, 0, res.x, res.y);
		game.drawShips();
		ctx.translate(cam.o.x, cam.o.y);
		ctx.scale(cam.z, cam.z);

		for (var i = 0; i < animate.ballAnims.length; i++){
			if (!animate.ballAnims[i].done){
				animate.ballAnims[i].done = true;
				for (var j = 0; j < animate.ballAnims[i].anims.length; j++){
					if (animate.ballAnims[i].anims[j].animated){
						animate.ballAnims[i].anims[j].drawSelf();
					}
					else {
						var done = true;
						for (var k = 0; k < animate.ballAnims[i].anims[j].anim.length; k++){
							if (animate.ballAnims[i].anims[j].anim[k].done){continue;}
							else if (animate.isDone(i, j, k)){
								animate.ballAnims[i].anims[j].anim[k].done = true;
								//animate.doAnimate(i, j, k);
							}
							else if (animate.isReady(i, j, k)){
								animate.doAnimate(i, j, k);
								done = false;
							}
							else {
								animate.doAdvance(i, j, k);
								done = false;
							}
						}
						if (done){
							animate.doLog(i, j);
							animate.ballAnims[i].anims[j].animated = true;
						} else animate.ballAnims[i].done = false;
					}
				}
				if (!animate.ballAnims[i].done){
					break;
				}
			}
			else {
				for (var j = 0; j <= i; j++){
					for (var k = 0; k < animate.ballAnims[j].anims.length; k++){
						animate.ballAnims[j].anims[k].drawSelf();
					}
				}
			}
		}

		ctx.setTransform(1,0,0,1,0,0);

		allDone = true;
		for (var i = 0; i < animate.ballAnims.length; i++){
			if (!animate.ballAnims[i].done){
				allDone = false;
				break;
			}
		}

		//allDone = true;
		if (allDone){
			window.cancelAnimationFrame(anim);
			game.animateFire = false;
			game.animateShipExplosions();
		}
	}

	this.animateShipExplosions = function(){
		anim = window.requestAnimationFrame(game.animateShipExplosions.bind(this));
		window.now = Date.now();		
		window.elapsed = window.now - window.then;
		if (elapsed > window.fpsInterval){
			window.then = window.now - (window.elapsed % window.fpsInterval);
			fxCtx.clearRect(0, 0, res.x, res.y);
			fxCtx.translate(cam.o.x, cam.o.y);
			fxCtx.scale(cam.z, cam.z);

			var allDone = true;
			for (var i = 0; i < window.animations.length; i++){
				if (!window.animations[i].done){

					fxCtx.translate(window.animations[i].base.x, window.animations[i].base.y);
					fxCtx.rotate(window.animations[i].anims[0].a * (Math.PI/180));

					var done = true;

					for (var j = 0; j < window.animations[i].anims.length; j++){
						if (window.animations[i].anims[j].t[0] < window.animations[i].anims[j].t[1]){
							window.animations[i].anims[j].t[0]++;
							done = false;
						}

						if (window.animations[i].anims[j].t[0] > 0){
							drawFighterExplosion(
								window.animations[i].anims[j].x,
								window.animations[i].anims[j].y, 
								window.animations[i].anims[j].s,
								window.animations[i].anims[j].t[0],
								window.animations[i].anims[j].t[1]
							)
						}
					}
					fxCtx.setTransform(1,0,0,1,0,0);

					if (!done){
						allDone = false;
						break;
					}
					else window.animations[i].done = true;
				}
			}


			if (allDone){
				window.cancelAnimationFrame(anim);
				fxCtx.setTransform(1,0,0,1,0,0);
				fxCtx.clearRect(0, 0, res.x, res.y);
				game.fireResolved();
			}
		}
	}

	this.createCombatLogEntry = function(fire){
		if (fire == undefined){return;}
		var shots = 0;
		var hits = 0;
		var struct = 0;
		var armour = 0;
		var rolls = [];
		var log = document.getElementById("combatLog");
		
		for (var i = 0; i < fire.guns; i++){
			shots += fire.weapon.getShots();
			hits += fire.hits[i];
		}
		for (var i = 0; i < fire.damages.length; i++){
			struct += fire.damages[i].structDmg;
			armour += fire.damages[i].armourDmg;
			rolls.push(fire.damages[i].roll);
		}

		rolls.sort(function(a, b){return a-b});

		if (fire.weapon.linked > 1){
			shots *= fire.weapon.linked;
			hits *= fire.weapon.linked;
		}
		if (fire.weapon.output){
			hits /= fire.weapon.output;
		}

		var chance = ""
		if (fire.min != fire.max){
			chance = fire.min + " - " + fire.max;
		} else chance = fire.req;

		var tr = document.createElement("tr"); tr.style.border = "1px solid white";

		$(tr)
			.data("shooterid", fire.shooter.id)
			.data("targetid", fire.target.id)
			.hover(function(){
				var data = $(this).data();
				game.getUnitById(data.shooterid).doHighlight();
				game.getUnitById(data.targetid).doHighlight();
			})

		var shooterClass = "red";
		var targetClass = "green";

		if (fire.shooter.friendly){
			shooterClass = "green";
			targetClass = "red";
		}

		tr.insertCell(-1).innerHTML = fire.type //+ ":" + fire.id;
		tr.insertCell(-1).innerHTML = "<span class='" + shooterClass + "'>" + fire.shooter.name + " #" + fire.shooter.id + "</span>";
		tr.insertCell(-1).innerHTML = "<span class='" + targetClass + "'>" + fire.target.name + " #" + fire.target.id + "</span>";
		tr.insertCell(-1).innerHTML = fire.weapon.display;
		tr.insertCell(-1).innerHTML = chance + "%";
		tr.insertCell(-1).innerHTML = hits + " / " + shots;
		tr.insertCell(-1).innerHTML = armour;
		tr.insertCell(-1).innerHTML = struct;
	
		log.appendChild(tr);

		if (hits){
			this.setDamageDetails(fire, log, tr);
		}
	}

	this.setDamageDetails = function(fire, log, parent){
		var details = document.createElement("tr"); details.style.border = "1px solid white"; details.style.display = "none";
		var td = details.insertCell(-1)
			td.colSpan = 8;

		var dmgs = {};
		var destroyed = 0

		for (var i = 0; i < fire.damages.length; i++){
			if (fire.damages[i].destroyed){
				destroyed++;
			}
			var name;
			if (fire.damages[i].systemid == -1){
				name = "Main Structure";
			}
			else name = fire.target.getSystemById(fire.damages[i].systemid).display;

			if (dmgs.hasOwnProperty(name)){
				dmgs[name]++;
			}
			else {
				dmgs[name] = 1;
			}
		}

		for (var i in dmgs){
			td.innerHTML += dmgs[i] + "x " + i + ";  ";
		}

		if (fire.target.flight || fire.target.salvo){
			td.innerHTML += " (Kills: " + destroyed + ")";
		} else {
			td.innerHTML += " (Kills: " + destroyed + ")";
		}
	
		log.appendChild(details);

		$(parent).click(function(){
			if ($(this).hasClass("selected")){
				$(this).removeClass("selected").next().hide();
			}
			else {
				$(this).addClass("selected").next().show();
			}

		})
		return log;
	}
}