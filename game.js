
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
	this.confirmedReinforcments = false;
	this.animating = false;
	this.deployArea = false;
	this.deployBlock = [];
	this.vector = false;
	this.opacity = false;
	this.markers = [];
	this.ballistics = [];
	this.antiBallistics = [];
	this.shortInfo = false;
	this.flightPath = false;

	this.doDeployFlight = function(e, pos){
		//id, classname, shipType, x, y, facing, faction, mass, cost, profile, size, userid, available
		var facing = Math.floor(getAngleFromTo(game.getUnitById(aUnit).getOffsetPos(), {x: pos.x, y: pos.y}))

		var flight = new Flight(
			-game.ships.length,
			"Flight",
			"Flight",
			pos.x,
			pos.y,
			facing,
			false,
			false, 
			false, 
			0,
			0,
			this.userid,
			this.turn
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
				//function Fighter(id, classname, name, ep, mass, integrity, value, negation, crits, destroyed){
				flight.structures.push(new Fighter(j, this.flightDeploy.loads[i].classname, 0, 0, 0, 0, 0, 0, 0, 0));
			}
		}

		flight.create();
		flight.createBaseDiv();
		game.ships.push(flight);

		$("#instructWrapper").hide();
		$("#deployOverlay").hide();
		game.getUnitById(aUnit).getSystemById(this.flightDeploy.id).select(e);
		game.flightDeploy = false;
		this.draw();
	}

	this.getDeployedFlights = function(){
		var ret = [];
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].userid == this.userid){
				if (this.ships[i].flight && this.ships[i].actions[0].turn == this.turn){
					var flight = {
						classname: "Flight",
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

	this.enableDeployment = function(shipid){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].id == shipid){
				this.deploying = shipid;
				fxCanvas.style.opacity = 0.3;
				this.setupDeploymentDiv()
				this.setupDeploymentZone();
				this.drawDeploymentZone();
				return;
			}
		}
	}

	this.disableDeployment = function(){
		this.deploying = false;
		this.deployArea = false;
		this.deployBlock = false;
		moveCtx.clearRect(0, 0, res.x, res.y);
		fxCtx.clearRect(0, 0, res.x, res.y);
		$("#deployOverlay").hide();
		fxCanvas.style.opacity = 1;
	}

	this.setupDeploymentDiv = function(){
		var ele = ("#deployOverlay");
		if (game.flightDeploy){
			//img.src = game.getUnitById(game.flightDeploy).img.src;
			$(ele).find("span").html("Deploy Flight");
			$(ele).find(".img").html("");
		}
		else if (game.deploying){
			var img = new Image();
				img.className = "img80";
				img.src = game.getUnitById(game.deploying).img.src;
			$(ele).find("span").html("Deploy Ship");
			$(ele).find(".img").html("").append(img);
		}
	}

	this.setupDeploymentZone = function(){
		var valid;
		var step = -1;
		if (this.playerindex % 2 == 0){
			step = 1;
		}

		if (game.turn == 1){
			var h = 700;
			var w = 200;
			var x = 600;
			var y = h/2;
			valid = {
				x: 0 + (x * step),
				y: y/2*-1,
				w: w * step,
				h: h
			};
		}
		else {
			valid = {
				x: -800,
				y: -800,
				w: 1600,
				h: 1600
			};
		}
		this.deployArea = valid;
	}

	this.drawDeploymentZone = function(){
		fxCtx.clearRect(0, 0, res.x, res.y);
		fxCtx.translate(cam.o.x, cam.o.y)
		fxCtx.scale(cam.z, cam.z)
		fxCtx.beginPath();
		fxCtx.rect(this.deployArea.x, this.deployArea.y, this.deployArea.w, this.deployArea.h);
		fxCtx.closePath();
		fxCtx.fillStyle = "green";
		fxCtx.fill();

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].id != game.deploying){
				var inValid = this.ships[i].getControlArea();
				if (inValid){
					fxCtx.beginPath();
					fxCtx.arc(inValid.pos.x, inValid.pos.y, inValid.s, 0, 2*Math.PI, false);
					fxCtx.closePath();
					fxCtx.fillStyle = "red";
					fxCtx.fill();
				}
			}
		}
		fxCtx.setTransform(1,0,0,1,0,0);
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
		$("#deployWrapper").removeClass("disabled");
	}

	this.movementResolved = function(){
		console.log("movementResolved");
	}

	this.initDamageControl = function(){
		this.resolveFire();
	}

	this.fireResolved = function(){
		console.log("fireResolved");
	}
	
	this.initPhase = function(n){
		$("#turnDiv").html("Turn: " + this.turn);
		this.createDeploymentTable();

		if (n == -1){
			this.phase = n;
				$("#phaseDiv").html("Deployment and Initial")
				$("#phaseSwitchDiv").fadeIn(200);
				$("#phaseSwitchDiv").click(function(){
				$(this).fadeOut(200);
				$("#deployWrapper").fadeIn(200);
				});
		}
		else if (n == 0){
			this.phase = n;
				$("#deployWrapper").hide();
				$("#phaseDiv").html("Capital Movement")
				$("#phaseSwitchDiv").fadeIn(200);
				$("#phaseSwitchDiv").click(function(){
					game.resolveDeployment();
					$(this).hide()
					//$(this).fadeOut(200);
				});
		}
		else if (n == 1){
			this.phase = n;
				$("#deployWrapper").hide();
				$("#phaseDiv").html("Flight Movement")
				$("#phaseSwitchDiv").fadeIn(200);
				$("#phaseSwitchDiv").click(function(){
					game.resolveShipMovement();
					$(this).hide()
				//	$(this).fadeOut(200);
				});
		}
		else if (n == 2){
			this.phase = n;
				$("#deployWrapper").hide();
				$("#phaseDiv").html("Firing")
				$("#phaseSwitchDiv").fadeIn(200);
				$("#phaseSwitchDiv").click(function(){
					game.resolveShipMovement();
					$(this).hide()
				//	$(this).fadeOut(200);
				});
		}
		else if (n == 3){
			this.phase = n;
				$("#deployWrapper").hide();
				$("#phaseDiv").html("Damage Control")
				$("#phaseSwitchDiv").fadeIn(200);
				$("#phaseSwitchDiv").click(function(){
					$(this).hide()
					game.initDamageControl();
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

			//(id, userid, targetid, classname, display, amount, status, destroyed, actions){

			var salvo = new Salvo(
					window.ballistics[i].id,
					window.ballistics[i].userid,
					window.ballistics[i].targetid,
					window.ballistics[i].classname,
					window.ballistics[i].amount,
					window.ballistics[i].status,
					window.ballistics[i].destroyed,
					window.ballistics[i].actions
					);

			for (var j = 0; j < window.ballistics[i].structures.length; j++){
				salvo.structures.push(
					new Ammo(
						window.ballistics[i].structures[j].id,
						window.ballistics[i].structures[j].name,
						window.ballistics[i].structures[j].display,
						window.ballistics[i].structures[j].minDmg,
						window.ballistics[i].structures[j].maxDmg,
						window.ballistics[i].structures[j].impulse,
						window.ballistics[i].structures[j].mass,
						window.ballistics[i].structures[j].integrity,
						window.ballistics[i].structures[j].armour,
						window.ballistics[i].structures[j].fc,
						window.ballistics[i].structures[j].damages,
						window.ballistics[i].structures[j].crits,
						window.ballistics[i].structures[j].destroyed
					)
				)
				for (var k = 0; k < window.ballistics[i].structures[j].fireOrders.length; k++){
					salvo.structures[j].fireOrders.push(
						new FireOrder(
							window.ballistics[i].structures[j].fireOrders[k].id,
							window.ballistics[i].structures[j].fireOrders[k].turn,
							window.ballistics[i].structures[j].fireOrders[k].shooterid,
							window.ballistics[i].structures[j].fireOrders[k].targetid,
							window.ballistics[i].structures[j].fireOrders[k].weaponid,
							window.ballistics[i].structures[j].fireOrders[k].shots,
							window.ballistics[i].structures[j].fireOrders[k].req,
							window.ballistics[i].structures[j].fireOrders[k].notes,
							window.ballistics[i].structures[j].fireOrders[k].hits,
							window.ballistics[i].structures[j].fireOrders[k].resolved
						)
					)
				}
			}
			salvo.create();
			game.ballistics.push(salvo);
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
	


	//    var gameX = parseInt((this.x - cam.o.x) / cam.z);
	//    var gameY = parseInt((this.y - cam.o.y) / cam.z);
	//    console.log(this.x +"/" +  this.y + " -> " + gameX + "/"+ gameY);
	//	console.log({x: cam.scale.x(this.x - cam.o.x), y: cam.scale.y(this.y - cam.o.y)});
	//	return { x: (this.x - cam.o.x) / cam.z, y: (this.y - cam.o.y) / cam.z}


	this.unitHover = function(elements){
		if (elements){
			var ele = $("#shortInfo");
				ele.html("");
			for (var i = 0; i < elements.length; i++){
				table = elements[i].getShortInfo();
				ele.append(table);
				var balls = elements[i].getIncomingBallistics();
				if (balls.length){
					for (var j = 0; j < balls.length; j++){
						balls[j].drawFlightPath();
					}
				}
				if  (elements[i] instanceof Salvo){
					elements[i].drawFlightPath();
				}
			}

			var oX = $(ele).width()/2;
			var pos = elements[0].getBaseOffsetPos();
			var top = (pos.y * cam.z) + cam.o.y + 40;
			var left =(pos.x * cam.z) + cam.o.x - oX;

			$(ele).css("top", top).css("left", left).show();
		}
	}

	this.resetHover = function(){
		if (game.flightPath){
			mouseCtx.clearRect(0, 0, res.x, res.y);
			game.flightPath = false;
		}
		if (game.deploying){
			game.drawDeploymentZone();
		}
		$("#shortInfo").html("").hide();
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
		var r = 12;
		//pos = new Point(pos.x, pos.y).getOffset();

		for (var i = 0; i < this.ships.length; i++){
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
		var r = 12;
		for (var i = 0; i < this.ships.length; i++){
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
		planCtx.clearRect(0, 0, res.x, res.y);
		moveCtx.clearRect(0, 0, res.x, res.y)
		mouseCtx.clearRect(0, 0, res.x, res.y)
		game.draw();

		$("#shortInfo").hide();

		if (aUnit){
			var unit = game.getUnitById(aUnit);
			if (unit instanceof Ship){
				if (unit.hasWeaponsSelected()){
					unit.highlightAllSelectedWeapons();
				}
				unit.unsetMoveMode();
				unit.setMoveMode();
			}
		}
	}
	
	this.draw = function(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		this.drawShips();
		this.drawBallistics();

		if (this.deploying){
			this.drawDeploymentZone();
		}
	}
	
	this.drawShips = function(){
		ctx.translate(cam.o.x, cam.o.y);
		ctx.scale(cam.z, cam.z);
		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].draw();
		}
		ctx.setTransform(1,0,0,1,0,0);
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
					game.ships[i].deployAnim.t[0] += 20;
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

		console.log("animShip: "+animShip);
		console.log("animFlight: "+animFlight);

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
						if (game.ships[i].actions[j].turn == game.turn){
							var action = game.ships[i].actions[j];
							if (! action.animated){
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
									var step = 3;
									//	console.log("turn");
										if (action.a > 0){
											game.ships[i].facing = addToDirection(game.ships[i].facing, step);
											game.ships[i].actions[j].angle -= step;
										}
										else {
											game.ships[i].facing = addToDirection(game.ships[i].facing, -step);
											game.ships[i].actions[j].angle += step;
										}
										
										if (game.ships[i].actions[j].angle <= 0){
											game.ships[i].facing += game.ships[i].actions[j].angle;
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
								else if (action.type == "deploy"){
								}
								else if (action.type == "speedChange"){
								}
								
								break;
							}
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
		this.getAnimationDetails();
		this.getBallisticMovementDetails();
		this.getShipExplosionDetails();

		$("#combatlogWrapper").show();
		window.then = Date.now();
		window.startTime = then;
		//fxCtx.clearRect(0, 0, res.x, res.y);
		//ctx.clearRect(0, 0, res.x, res.y);

		this.animateFire = true;
		this.draw();
		this.animateFireOrders();
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
			this.fireOrders[i].weapon = this.fireOrders[i].shooter.getSystemById(this.fireOrders[i].weaponid);
			this.fireOrders[i].hits = [this.fireOrders[i].hits];
			this.fireOrders[i].damages = this.fireOrders[i].target.getDamageEntriesByFireId(this.fireOrders[i].id);
		}

		for (var i = 0; i < this.fireOrders.length; i++){
			var a = this.fireOrders[i];
			if (this.fireOrders[i].guns){
				for (var j = i+1; j < this.fireOrders.length; j++){
					var b = this.fireOrders[j];
					if (this.fireOrders[j].guns){
						if (a.shooterid == b.shooterid){
							if (a.targetid == b.targetid){
								if (a.weapon.name == b.weapon.name){
									this.fireOrders[i].guns += this.fireOrders[j].guns;
									for (var k = 0; k < this.fireOrders[j].damages.length; k++){
										this.fireOrders[i].damages.push(this.fireOrders[j].damages[k])
									}
									this.fireOrders[i].hits.push(this.fireOrders[j].hits[0]);
									this.fireOrders[j].guns = 0;
								}
							}
						}
					}
				}
			}
		}

		//console.log(this.fireOrders);
		for (var i = this.fireOrders.length-1; i >= 0; i--){
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
				this.fireOrders[i].type = "Fire";
			}
		}
	}

	this.getAnimationDetails = function(){
		for (var i = 0; i < this.fireOrders.length; i++){
			for (var j = 0; j < this.fireOrders[i].guns; j++){

				var hasHit = false;
				if (this.fireOrders[i].hits[j] >= 1){
					hasHit = true;
				}

				var ox = this.fireOrders[i].shooter.x + range(this.fireOrders[i].shooter.size * 0.2 * -1, this.fireOrders[i].shooter.size * 0.2); // WEAPON origin
				var oy = this.fireOrders[i].shooter.y + range(this.fireOrders[i].shooter.size * 0.2 * -1, this.fireOrders[i].shooter.size * 0.2); // WEAPON origin
				
				var anims = [];
				
				for (var k = 0; k < this.fireOrders[i].weapon.shots; k++){						

					var tx; var ty;
					var hit = true;
					var subAnim = {};
					var explo = false;

					if (!hasHit){
						tx = this.fireOrders[i].target.x + range(this.fireOrders[i].target.size * 0.5 * -1, this.fireOrders[i].target.size * 0.5); // salvo missed
						ty = this.fireOrders[i].target.y + range(this.fireOrders[i].target.size * 0.5 * -1, this.fireOrders[i].target.size * 0.5);
					}
					else {
						tx = this.fireOrders[i].target.x + range(this.fireOrders[i].target.size * 0.2 * -1, this.fireOrders[i].target.size * 0.2); // at least 1 hit
						ty = this.fireOrders[i].target.y + range(this.fireOrders[i].target.size * 0.2 * -1, this.fireOrders[i].target.size * 0.2);
					}
					
					if (this.fireOrders[i].weapon.animation == "projectile"){
						if (k >= this.fireOrders[i].hits[j]){ // is a MISS
							hit = false;
						}

						var dist = getDistance( {x: ox, y: oy}, {x: tx, y: ty} );
						var gunInterval = 50;
						var shotInterval = 10;
						if (this.fireOrders[i].shooter instanceof Flight){
							gunInterval = 10;
							shotInterval = 10;
						}
						else if (this.fireOrders[i].weapon.shots == 4){
							var gunInterval = 30;
							var shotInterval = 10;
						}

						if (hit){
							explo = {t: [0, 80], s: this.fireOrders[i].weapon.exploSize};
						}

						subAnim = {
							ox: ox,
							oy: oy,
							tx: tx,
							ty: ty,
							t: [0 - (j*gunInterval + k*shotInterval), dist / this.fireOrders[i].weapon.projSpeed / speedMod],
							hit: hit,
							v: new Vector({x: ox, y: oy}, {x: tx, y: ty}),
							explo: explo,
							animated: false
						}
					}
					else if (this.fireOrders[i].weapon.animation == "beam"){
						var tx; 
						var ty;
						var a;
						var tb;

						if (k >= this.fireOrders[i].hits[j]){ // MISS
							hit = false;
							tx = this.fireOrders[i].target.x + range(-this.fireOrders[i].target.size * 0.6, this.fireOrders[i].target.size * 0.6); // BEAM swipe begin on MISS
							ty = this.fireOrders[i].target.y + range(-this.fireOrders[i].target.size * 0.6, this.fireOrders[i].target.size * 0.6);
							a = getAngleFromTo( {x: tx, y: ty}, {x: this.fireOrders[i].target.x, y: this.fireOrders[i].target.y} );
							a = addToDirection(a, range(-60, 60));
							tb = getPointInDirection(this.fireOrders[i].weapon.rakeTime/2, a, tx, ty); // BEAM swipe END on HIT	
						}
						else {
							tx = this.fireOrders[i].target.x + range(-this.fireOrders[i].target.size * 0.45, this.fireOrders[i].target.size * 0.45); // BEAM swipe begin on HIT
							ty = this.fireOrders[i].target.y + range(-this.fireOrders[i].target.size * 0.45, this.fireOrders[i].target.size * 0.45);
							a = getAngleFromTo( {x: tx, y: ty}, {x: this.fireOrders[i].target.x, y: this.fireOrders[i].target.y} );
							a = addToDirection(a, range(-10, 10));
							tb = getPointInDirection(this.fireOrders[i].weapon.rakeTime/2, a, tx, ty); // BEAM swipe END on HIT	
						}

						var grouping = 1;
						var delay = 30;

						subAnim = {
							ox: ox,
							oy: oy,
							tax: tx,
							tay: ty,
							tbx: tb.x,
							tby: tb.y,
							t: [0 - (range(-5, 5)) - (Math.floor(j / grouping) * delay), this.fireOrders[i].weapon.rakeTime],
							hit: hit,
							v: new Vector({x: tx, y: ty}, {x: tb.x, y: tb.y}),
							explo: false,
							animated: false
						}
						//console.log(subAnim);
					}
				
				anims.push(subAnim);
				}
				this.fireOrders[i].anim.push(anims);
			}
		}

		this.fireOrders.sort(function(a, b){
			return (
				a.shooter.flight - b.shooter.flight ||
				a.targetid - b.targetid ||
				a.weapon.priority - b.weapon.priority ||
				a.shooterid - b.shooterid
			)
		});

      return;
    }

	this.animateFireOrders = function(){
		//this.animateShipExplosions(); return;
		anim = window.requestAnimationFrame(game.animateFireOrders.bind(this));
		window.now = Date.now();		
		window.elapsed = window.now - window.then;
		if (elapsed > window.fpsInterval){
			window.then = window.now - (window.elapsed % window.fpsInterval);
			fxCtx.clearRect(0, 0, res.x, res.y);

			for (var i = 0; i  < game.fireOrders.length; i++){ 
				if (! game.fireOrders[i].animated){
					//cam.setFocus(game.fireOrders[i].focus.x, game.fireOrders[i].focus.y);
					var x, y;					
					for (var j = 0; j < game.fireOrders[i].anim.length; j++){
						for (var k = 0; k < game.fireOrders[i].anim[j].length; k++){
							if (game.fireOrders[i].weapon.animation == "projectile"){
								if (game.fireOrders[i].anim[j][k].t[0] < game.fireOrders[i].anim[j][k].t[1]){ // still to animate
									game.fireOrders[i].anim[j][k].t[0] += 1;
									if (game.fireOrders[i].anim[j][k].t[0] > 0){ // t valid, now animate
										x = game.fireOrders[i].anim[j][k].ox + (game.fireOrders[i].anim[j][k].v.x * game.fireOrders[i].anim[j][k].t[0] / game.fireOrders[i].anim[j][k].t[1]);
										y = game.fireOrders[i].anim[j][k].oy + (game.fireOrders[i].anim[j][k].v.y * game.fireOrders[i].anim[j][k].t[0] / game.fireOrders[i].anim[j][k].t[1]);
										drawProjectile(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k].ox, game.fireOrders[i].anim[j][k].oy, x, y, game.fireOrders[i].anim[j][k].t[0], game.fireOrders[i].anim[j][k].t[1]);
									}
								}
								else {// animate EXPLO
									if (game.fireOrders[i].anim[j][k].explo){
										if (game.fireOrders[i].anim[j][k].explo.t[0] < game.fireOrders[i].anim[j][k].explo.t[1]){
											game.fireOrders[i].anim[j][k].explo.t[0] += 5;
											x = game.fireOrders[i].anim[j][k].ox + game.fireOrders[i].anim[j][k].v.x;
											y = game.fireOrders[i].anim[j][k].oy + game.fireOrders[i].anim[j][k].v.y;	
											drawExplosion(x, y, game.fireOrders[i].anim[j][k].explo.s, game.fireOrders[i].anim[j][k].explo.t[0], game.fireOrders[i].anim[j][k].explo.t[1]); // EXPLO
										}
										else {
											game.fireOrders[i].anim[j][k].animated = true;
										}
									}
									else {
										game.fireOrders[i].anim[j][k].animated = true;
									}
								}
							}
							else if (game.fireOrders[i].weapon.animation == "beam"){
								if (game.fireOrders[i].anim[j][k].t[0] < game.fireOrders[i].anim[j][k].t[1]){ // still to animate
									game.fireOrders[i].anim[j][k].t[0] += 1;
									if (game.fireOrders[i].anim[j][k].t[0] > 0){ // t valid, now animate
										x = game.fireOrders[i].anim[j][k].tax + (game.fireOrders[i].anim[j][k].v.x * game.fireOrders[i].anim[j][k].t[0] / game.fireOrders[i].anim[j][k].t[1]);
										y = game.fireOrders[i].anim[j][k].tay + (game.fireOrders[i].anim[j][k].v.y * game.fireOrders[i].anim[j][k].t[0] / game.fireOrders[i].anim[j][k].t[1]);
										drawBeam(
											game.fireOrders[i].weapon, 
											game.fireOrders[i].anim[j][k].ox, 
											game.fireOrders[i].anim[j][k].oy,
										 	x,
									 		y,
											game.fireOrders[i].anim[j][k].t[0],
											game.fireOrders[i].anim[j][k].t[1],
											game.fireOrders[i].anim[j][k].hit
								 		);

								 		if (game.fireOrders[i].anim[j][k].t[0] >= game.fireOrders[i].anim[j][k].t[1]){
											game.fireOrders[i].anim[j][k].animated = true;
										}
									}
								}
							}
						}
					}
					
					var allAnimated = true;
					for (var j = 0; j < game.fireOrders[i].anim.length; j++){
						for (var k = 0; k < game.fireOrders[i].anim[j].length; k++){
							if (! game.fireOrders[i].anim[j][k].animated){
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
						game.createLogEntry(game.fireOrders[i]);
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
				game.animateBallisticMovement();
			}
		}
		else {
		}
	}

	this.getBallisticMovementDetails = function(){
		for (var i = 0; i < game.ballistics.length; i++){

			var start = game.ballistics[i].actions[game.ballistics[i].actions.length-2];
			var end = game.ballistics[i].actions[game.ballistics[i].actions.length-1];

			game.ballistics[i].v = new Vector(start, end);
			game.ballistics[i].v.t = [0, getDistance(end, start) * window.fps / this.ballistics[i].structures[0].impulse];
			game.ballistics[i].x = start.x;
			game.ballistics[i].y = start.y;
			game.ballistics[i].animated = false;
			game.ballistics[i].moveAnimated = false;
			game.ballistics[i].intercepts = [];
			game.ballistics[i].interceptAnimated = false;
			game.ballistics[i].exploAnimated = false;
			game.ballistics[i].goal = game.getUnitById(game.ballistics[i].targetid).getBaseOffsetPos();
			game.ballistics[i].explo = false;

			if (end.type == "impact"){
				game.ballistics[i].type = "Impact";			
				for (var j = 0; j < game.ballistics[i].structures.length; j++){
					if (game.ballistics[i].structures[j].destroyed){
						continue;
					}
					if (game.ballistics[i].structures[j].fireOrders[0].hits){
						var step = range(0, (j+1)*60);
						var exploSize = ((game.ballistics[i].getMinDmg() + game.ballistics[i].getMaxDmg()) / 2) / 7;
						game.ballistics[i].structures[j].fireOrders[0].explo = {t: [0+step, 120+step], s: exploSize + range(-exploSize/3, exploSize/3)};
						game.ballistics[i].structures[j].fireOrders[0].exploAnimated = false;
						game.ballistics[i].structures[j].fireOrders[0].ox = range(-16, 16);
						game.ballistics[i].structures[j].fireOrders[0].oy = range(-16, 16);
					} else {
						game.ballistics[i].structures[j].fireOrders[0].explo = false;
					}
				}
			}
			else {
				game.ballistics[i].type = "Move";
			}

			//	t: [0 - (j*30 + k*10), this.fireOrders[i].dist / this.fireOrders[i].weapon.projSpeed],

			for (var j = 0; j < animate.intercepts.length; j++){
				if (game.ballistics[i].id == animate.intercepts[j].targetid){
					//console.log("shots: " + animate.intercepts[j].guns * animate.intercepts[j].weapon.shots)
					//console.log("hits: " + animate.intercepts[j].hits.length);
					//console.log(game.ballistics[i].v);

					for (var k = 1; k <= animate.intercepts[j].guns; k++){
						var ox = animate.intercepts[j].shooter.x + range(animate.intercepts[j].shooter.size * 0.3 * -1, animate.intercepts[j].shooter.size * 0.3); // WEAPON origin
						var oy = animate.intercepts[j].shooter.y + range(animate.intercepts[j].shooter.size * 0.3 * -1, animate.intercepts[j].shooter.size * 0.3); // WEAPON origin

						for (var l = 1; l <= animate.intercepts[j].weapon.shots; l++){
							var tx;
							var ty;				
							var explo = false;			
							var hit = false;
							if (l <= animate.intercepts[j].hits[k-1]){
								hit = true;
								explo = true;
								explo = {t: [0, 80], s: animate.intercepts[j].weapon.exploSize};
								tx = start.x + game.ballistics[i].v.x * 0.5 + range(-8, 8);
								ty = start.y + game.ballistics[i].v.y * 0.5 + range(-8, 8);
							}
							else {
								tx = start.x + game.ballistics[i].v.x * 0.5 + range(-16, 16);
								ty = start.y + game.ballistics[i].v.y * 0.5 + range(-16, 16);
							}

							subAnim = {
								ox: ox,
								oy: oy,
								tx: tx,
								ty: ty,
								t: [0 - l*8, getDistance( {x: ox, y: oy}, {x: tx, y: ty} ) / animate.intercepts[j].weapon.projSpeed],
								hit: hit,
								v: new Vector( {x: ox, y: oy}, {x: tx, y: ty} ),
								explo: explo,
								animated: false
							}

							animate.intercepts[j].anim.push(subAnim);
						}
					}

					game.ballistics[i].intercepts.push(animate.intercepts[j]);
					//console.log(game.ballistics[i].intercepts);
				}
			}
		
			if (! game.ballistics[i].intercepts.length){
				game.ballistics[i].interceptAnimated = true;
			}
		}
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
								s: game.ships[i].structures[j].mass / 4,
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

	this.animateBallisticMovement = function(){
		anim = window.requestAnimationFrame(game.animateBallisticMovement.bind(this));
		window.now = Date.now();		
		window.elapsed = window.now - window.then;
		if (elapsed > window.fpsInterval){
			window.then = window.now - (window.elapsed % window.fpsInterval);
			ctx.clearRect(0, 0, res.x, res.y);
			fxCtx.clearRect(0, 0, res.x, res.y);
			game.drawShips();

			ctx.translate(cam.o.x, cam.o.y);
			ctx.scale(cam.z, cam.z);

			for (var i = 0; i < game.ballistics.length; i++){
				game.ballistics[i].draw() 
				ctx.beginPath();
				ctx.moveTo(game.ballistics[i].x, game.ballistics[i].y);
				ctx.lineTo(game.ballistics[i].goal.x, game.ballistics[i].goal.y);
				ctx.closePath();
				ctx.globalAlpha = 0.2;
				ctx.strokeStyle = "white";
				ctx.stroke();
				ctx.globalAlpha = 1;

				if (! game.ballistics[i].animated){
					if (! game.ballistics[i].moveAnimated){
						if (game.ballistics[i].v.t[0] < game.ballistics[i].v.t[1]){
							game.ballistics[i].v.t[0] += 1;
							game.ballistics[i].x += game.ballistics[i].v.x * 1 / game.ballistics[i].v.t[1];
							game.ballistics[i].y += game.ballistics[i].v.y * 1 / game.ballistics[i].v.t[1];
						}
						else {
							game.ballistics[i].moveAnimated = true;
						}
					}

					if (! game.ballistics[i].interceptAnimated){
						allInterceptAnimated = true;

						for (var j = 0; j < game.ballistics[i].intercepts.length; j++){
							if (! game.ballistics[i].intercepts[j].animated){
								for (var k = 0; k < game.ballistics[i].intercepts[j].anim.length; k++){
									//if (game.ballistics[i].intercepts[j].anim[k].explo == false){continue;}
									if (! game.ballistics[i].intercepts[j].anim[k].animated){	
										allInterceptAnimated = false;

										var x = game.ballistics[i].intercepts[j].anim[k].ox + (game.ballistics[i].intercepts[j].anim[k].v.x * game.ballistics[i].intercepts[j].anim[k].t[0] / game.ballistics[i].intercepts[j].anim[k].t[1]); 
										var y = game.ballistics[i].intercepts[j].anim[k].oy + (game.ballistics[i].intercepts[j].anim[k].v.y * game.ballistics[i].intercepts[j].anim[k].t[0] / game.ballistics[i].intercepts[j].anim[k].t[1]); 

										if (game.ballistics[i].intercepts[j].anim[k].t[0] <= 0){
											game.ballistics[i].intercepts[j].anim[k].t[0] += 1;										
										}
										else if (game.ballistics[i].intercepts[j].anim[k].t[0] > 0 && game.ballistics[i].intercepts[j].anim[k].t[0] <= game.ballistics[i].intercepts[j].anim[k].t[1]){
											game.ballistics[i].intercepts[j].anim[k].t[0] += 1;										
											drawProjectile(
												game.ballistics[i].intercepts[j].weapon,
												game.ballistics[i].intercepts[j].anim[k].ox,
												game.ballistics[i].intercepts[j].anim[k].oy, 
												x, y,
												game.ballistics[i].intercepts[j].anim[k].t[0],
												game.ballistics[i].intercepts[j].anim[k].t[1]
											);
										}
										else if (game.ballistics[i].intercepts[j].anim[k].explo && game.ballistics[i].intercepts[j].anim[k].t[0] >= game.ballistics[i].intercepts[j].anim[k].t[1]){
											game.ballistics[i].intercepts[j].anim[k].explo.t[0] += 5;
											if (game.ballistics[i].intercepts[j].anim[k].explo.t[0] <= game.ballistics[i].intercepts[j].anim[k].explo.t[1]){
												drawExplosion(
													x,
													y,
													game.ballistics[i].intercepts[j].anim[k].explo.s,
													game.ballistics[i].intercepts[j].anim[k].explo.t[0],
													game.ballistics[i].intercepts[j].anim[k].explo.t[1]
												);
											}
											else {
												game.ballistics[i].intercepts[j].anim[k].animated = true;
											}
										}
										else  if (game.ballistics[i].intercepts[j].anim[k].t[0] >= game.ballistics[i].intercepts[j].anim[k].t[1]){
											game.ballistics[i].intercepts[j].anim[k].animated = true;
										}
									}
								}
							}
							if (allInterceptAnimated){
								game.createLogEntry(game.ballistics[i].intercepts[j]);
							}
						}
						game.ballistics[i].interceptAnimated = allInterceptAnimated;
					}

					if (game.ballistics[i].type == "Impact"){
						if (! game.ballistics[i].exploAnimated){
							if (game.ballistics[i].moveAnimated){
								for (var j = 0; j < game.ballistics[i].structures.length; j++){
									if (!game.ballistics[i].structures[j].destroyed){
										if (game.ballistics[i].structures[j].fireOrders[0].explo){
											if (game.ballistics[i].structures[j].fireOrders[0].explo.t[0] < game.ballistics[i].structures[j].fireOrders[0].explo.t[1]){
												game.ballistics[i].structures[j].fireOrders[0].explo.t[0] += 2;
												drawExplosion(
													game.ballistics[i].x + game.ballistics[i].structures[j].fireOrders[0].ox,
													game.ballistics[i].y + game.ballistics[i].structures[j].fireOrders[0].oy,
													game.ballistics[i].structures[j].fireOrders[0].explo.s,
													game.ballistics[i].structures[j].fireOrders[0].explo.t[0],
													game.ballistics[i].structures[j].fireOrders[0].explo.t[1]
												);
											}
											else {
												game.ballistics[i].structures[j].fireOrders[0].exploAnimated = true;
											}
										}
									}
								}
							}
						}
					}

					var done = true;

					if (game.ballistics[i].type == "Impact"){
						for (var j = 0; j < game.ballistics[i].structures.length; j++){
							if (!game.ballistics[i].structures[j].destroyed){
								if (game.ballistics[i].structures[j].fireOrders[0].explo){
									if (!game.ballistics[i].structures[j].fireOrders[0].exploAnimated){
										done = false;
										break;
									}
								}
							}
							else {
								if (!game.ballistics[i].moveAnimated){
									done = false;
									break;
								}
							}
						}
					}
					else {
						if (!game.ballistics[i].moveAnimated || !game.ballistics[i].interceptAnimated){
							done = false;
							break;
						}
					}

					if (done){
						game.ballistics[i].animated = true;
						if (game.ballistics[i].type == "Impact"){
							game.createBallisticLogEntry(game.ballistics[i]);
						}
					}
				
					if (! game.ballistics[i].animated){
						break;
					}
				}
			}

			ctx.setTransform(1,0,0,1,0,0);

			var done = true;
			for (var i = 0; i < game.ballistics.length; i++){
				if (! game.ballistics[i].animated){
					done = false;
					break;
				}
			}

			if (done){
				window.cancelAnimationFrame(anim);
				for (var i = 0; i < game.ballistics.length; i++){
					game.ballistics[i].x = game.ballistics[i].actions[game.ballistics[i].actions.length-1].x;
					game.ballistics[i].y = game.ballistics[i].actions[game.ballistics[i].actions.length-1].y;
				}
				game.draw();
				game.animateShipExplosions();
			}
		}
	}

	this.animateShipExplosions = function(){
		anim = window.requestAnimationFrame(game.animateShipExplosions.bind(this));
		window.now = Date.now();		
		window.elapsed = window.now - window.then;
		if (elapsed > window.fpsInterval){
			window.then = window.now - (window.elapsed % window.fpsInterval);
			fxCtx.clearRect(0, 0, res.x, res.y);

			var allDone = true;
			for (var i = 0; i < window.animations.length; i++){
				if (!window.animations[i].done){

					fxCtx.translate(window.animations[i].base.x + cam.o.x, window.animations[i].base.y + cam.o.y);
					fxCtx.scale(cam.z, cam.z)
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
				game.animateFire = false;
				game.draw();
				game.fireResolved();
			}
		}
	}

	this.createBallisticLogEntry = function(ball){
		var struct = 0;
		var armour = 0;
		var target = game.getUnitById(ball.targetid);
		var hits = 0;
		var req = 100;
		var log = document.getElementById("combatLog");
		var summary = {
			target: target,
			damages: []
		}

		for (var i = 0; i < ball.structures.length; i++){
			if (ball.structures[i].destroyed){
				continue;
			}
			else if (ball.structures[i].fireOrders.length){
				req = Math.min(req, ball.structures[i].fireOrders[0].req);
				if (ball.structures[i].fireOrders[0].hits){
					ball.structures[i].fireOrders[0].damages = target.getDamageEntriesByFireId(ball.structures[i].fireOrders[0].id);
					for (var j = 0; j < ball.structures[i].fireOrders[0].damages.length; j++){
						summary.damages.push(ball.structures[i].fireOrders[0].damages[j]);
						struct += ball.structures[i].fireOrders[0].damages[j].structDmg;
						armour += ball.structures[i].fireOrders[0].damages[j].armourDmg;
						hits++;
					}
				}
			}
		}

		var tr = document.createElement("tr"); tr.style.border = "1px solid white";
		$(tr)
			.data("shooterid", ball.id)
			.data("targetid", ball.targetid)
			.hover(function(){
				var data = $(this).data();
				game.getUnitById(data.shooterid).doHighlight();
				game.getUnitById(data.targetid).doHighlight();
			})
		tr.insertCell(-1).innerHTML = ball.type + ":" + ball.id;
		var td = document.createElement("td"); td.colSpan = 2;
			td.innerHTML = "Salvo of " + ball.amount + "x " + ball.name; tr.appendChild(td);
		tr.insertCell(-1).innerHTML = target.name + " #" + target.id;
		tr.insertCell(-1).innerHTML = req + "%";
		tr.insertCell(-1).innerHTML = hits;
		tr.insertCell(-1).innerHTML = armour;
		tr.insertCell(-1).innerHTML = struct;
		
		log.appendChild(tr);


		if (hits){
			this.setDamageDetails(summary, log, tr);
		}
	}

	this.createLogEntry = function(fire){
		var shots = 0;
		var hits = 0;
		var struct = 0;
		var armour = 0;
		var rolls = [];
		var log = document.getElementById("combatLog");
		
		for (var i = 0; i < fire.guns; i++){
			shots += fire.weapon.shots;
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

		var tr = document.createElement("tr"); tr.style.border = "1px solid white";

		$(tr)
			.data("shooterid", fire.shooter.id)
			.data("targetid", fire.target.id)
			.hover(function(){
				var data = $(this).data();
				game.getUnitById(data.shooterid).doHighlight();
				game.getUnitById(data.targetid).doHighlight();
			})

		tr.insertCell(-1).innerHTML = fire.type + ":" + fire.id;
		tr.insertCell(-1).innerHTML = fire.shooter.name + " #" + fire.shooter.id;
		tr.insertCell(-1).innerHTML = fire.target.name + " #" + fire.target.id;
		tr.insertCell(-1).innerHTML = fire.weapon.display;
		tr.insertCell(-1).innerHTML = fire.req + "%";
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

		for (var i = 0; i < fire.damages.length; i++){
			var name;
			if (fire.damages[i].systemid == -1){
				name = "Primary";
			}
			else name = fire.target.getSystemById(fire.damages[i].systemid).name;

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
	
		log.appendChild(details);

		$(parent).click(function(){
			if ($(this).hasClass("red")){
				$(this).removeClass("red").next().hide();
			}
			else {
				$(this).addClass("red").next().show();
			}

		})
		return log;
	}
}