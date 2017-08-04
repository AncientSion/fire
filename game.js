
function Game(data, userid){
	this.id = data.id;
	this.name = data.name;
	this.status = data.status;
	this.userid = userid;
	this.turn = data.turn;
	this.phase = data.phase;
	this.ships = data.ships;
	this.reinforcements = data.reinforcements;
	this.incoming = data.incoming;
	this.fireOrders = []
	this.mode = false;
	this.deploying = false;
	this.flightDeploy = false;
	this.canSubmit = false;
	this.index = 1;
	this.reinforcePoints = 0;
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
	this.turnMode = 0;
	this.zIndex = 10;
	this.sensorMode = 0;
	this.target = 0;
	this.deploys = data.deploys;

	this.doDeployShip = function(e, ship, pos){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].id == ship.id){
				this.ships[i].doDeploy(pos);
				return;
			}
		}

		this.ships.push(ship);
		this.ships[this.ships.length-1].doDeploy(pos);
	}

	this.getUniqueID = function(){
		var id = 0;
		for (var i = 0; i < this.ships.length; i++){
			id = Math.max(id, this.ships[i].id);
		}
		return id+1;
	}

	this.getMissionString = function(val){
		switch (val){
			case 1: return "PATROL";
			case 2: return "STRIKE";
			case 3: return "INTERCEPT";
			default: return "ERROR";
		}
	}

	this.enableFlightDeployment = function(){
		this.flightDeploy = this.getUnitById(aUnit).getSystemById($("#hangarLoadoutDiv").data("systemid"));

		var mission = this.getMissionString(this.flightDeploy.mission);

		$("#game").find("#deployOverlay").find("#deployType").html("Select target for </br>" + mission + "</br></span>");
	}

	this.handleFlightDeployMove = function(e, pos, unit){

		salvoCtx.clearRect(0, 0, res.x, res.y);

		if (this.shortInfo){
			this.getUnitById(this.shortInfo).drawEW();
		} else if (aUnit){
			this.getUnitById(aUnit).drawEW();
		}

		var valid = false;
		if (this.flightDeploy.mission == 1){ // patrol
			valid = true;
			var s = 0;
			for (var i = 0; i < this.flightDeploy.loads.length; i++){
				s += this.flightDeploy.loads[i].launch;
			}
			s = 35 + s*8;
			s = Math.floor(s/2);

			salvoCtx.translate(cam.o.x, cam.o.y);
			salvoCtx.scale(cam.z, cam.z);
			salvoCtx.translate(pos.x, pos.y);
			salvoCtx.beginPath();			
			salvoCtx.arc(0, 0, s, 0, 2*Math.PI, false);
			salvoCtx.closePath();
			salvoCtx.fillStyle = "green";
			salvoCtx.globalAlpha = 0.3;
			salvoCtx.fill();
			salvoCtx.globalAlpha = 1;
			salvoCtx.setTransform(1,0,0,1,0,0);
		}
		else if (this.userid != unit.userid && this.flightDeploy.mission == 2 && unit && unit.ship){ // strike
			valid = true
		} 
		else if (this.userid != unit.userid && this.flightDeploy.mission == 3 && unit && (!unit.ship)){ // int
			valid = true;
		}


		var ele = $("#deployOverlay");
		var w = $(ele).width()/2;
		var top = (e.clientY) + 50;
		var left = (e.clientX) - w;
		$(ele).css("top", top).css("left", left).show();
		/*if (valid){
			if (game.flightDeploy.mission > 1){
				ele.find("#deployTarget").html(unit.name + " #" + unit.id);
			} else ele.find("#deployTarget").html(unit.name + " #" + unit.id);
		} else ele.find("#deployTarget").html("");
		*/return;
	}

	this.doDeployFlight = function(pos){
		var valid = false;
		var t = 0;
		var dest;

		if (this.flightDeploy.mission == 1){ // Patrol
			console.log("PATROL");
			dest = pos;		
			valid = true;
		}
		else if (this.shortInfo){
			t = game.getUnitById(this.shortInfo);
			if (t && t.ship && t.userid != game.userid || t && !t.ship && t.userid != game.userid){
				dest = t.getPlannedPosition();
				t = t.id;
				console.log("STRIKE / INTERCEPT");
				valid = true;
			}
		}

		if (!valid){
			return false;
		}

		var s = this.getUnitById(aUnit);
		var o = s.getPlannedPosition();
		var facing = getAngleFromTo(o, dest);
		var p = getPointInDirection(s.size, facing, o.x, o.y);

		var flight = new Flight(
			{id: -this.ships.length-20, name: "Flight", shipType: "Flight", mission: {type: this.flightDeploy.mission, targetid: t, x: dest.x, y: dest.y},
			x: p.x, y: p.y, mass: 0, facing: facing, ep: 0, baseImpulse: 0, currentImpulse: 0, fSize: 20, baseSize: 35, unitSize: 8, userid: this.userid, available: this.turn}
		);

		flight.deployed = 1;
		flight.friendly = 1;
		flight.primary = new Primary(0, flight.id, 0, 0, 0);
		flight.actions.push(new Move(-1, "deploy", 0, p.x, p.y, facing, 0, 0));
		flight.launchData = {
			shipid: aUnit,
			systemid: this.flightDeploy.id,
			loads: this.flightDeploy.loads,
			mission: this.flightDeploy.mission,
			targetid: t,
			x: dest.x,
			y: dest.y
		}

		for (var i = 0; i < this.flightDeploy.loads.length; i++){
			for (var j = 1; j <= this.flightDeploy.loads[i].launch; j++){
				var f = new Fighter({id: j, name: this.flightDeploy.loads[i].name, ep: 0, mass: this.flightDeploy.loads[i].mass, integrity: this.flightDeploy.loads[i].integrity, value: 0, negation: 0, crits: 0, destroyed: 0})
				flight.structures.push(f);
			}
		}
		flight.size = flight.baseSize + (flight.structures.length-1)*flight.unitSize;
		flight.create();
		flight.createBaseDiv();
		game.ships.push(flight);

		$("#instructWrapper").hide();
		$("#deployOverlay").hide();
		game.getUnitById(aUnit).getSystemById(this.flightDeploy.id).setFireOrder().select();
		game.flightDeploy = false;
		this.draw();


	}
	
	this.doDeployFlighta = function(e, pos){
		var facing = Math.floor(getAngleFromTo(game.getUnitById(aUnit).getPlannedPosition(), {x: pos.x, y: pos.y}))

		//id, name, shipType, x, y, facing, faction, mass, cost, profile, size, userid, available, baseHitChance, baseImpulse
		var flight = new Flight(
			{id: this.getUniqueID(), name: "Flight", shipType: "Flight",
			x: pos.x, y: pos.y, facing: facing, ep: 0, fSize: 20, baseSize: 35, unitSize: 8, userid: this.userid, available: this.turn}
		);

		flight.deployed = 1;
		flight.friendly = 1;
		flight.primary = new Primary(0, flight.id, 0, 0, 0);
		flight.actions.push(new Move(-1, "deploy", 0, pos.x, pos.y, facing, 0, 0));
		flight.launchData = {
			shipid: aUnit,
			systemid: hangar.id,
			loads: hangar.loads
		}

		for (var i = 0; i < hangar.loads.length; i++){
			for (var j = 1; j <= hangar.loads[i].launch; j++){
				var f = new Fighter({id: j, name: hangar.loads[i].name, ep: 0, mass: 0, integrity: 0, value: 0, negation: 0, crits: 0, destroyed: 0})
				flight.structures.push(f);
			}
		}
		flight.size = flight.baseSize + (flight.structures.length-1)*flight.unitSize;
		flight.create();
		flight.createBaseDiv();
		game.ships.push(flight);

		$("#instructWrapper").hide();
		$("#deployOverlay").hide();
		game.getUnitById(aUnit).getSystemById(hangar.id).setFireOrder().select(e);
		game.flightDeploy = false;
		this.draw();
	}
	
	this.getDeployedFlights = function(){
		var ret = [];
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].userid == this.userid){
				if (this.ships[i].flight && this.ships[i].available == this.turn){
					var flight = {
						name: "Flight",
						launchData: this.ships[i].launchData,
						actions: this.ships[i].actions,
						turn: this.turn,
						eta: 0,
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

	this.hasInvalidDeploy = function(){
		if (game.turn > 1){return;}
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].userid == this.userid){
				if (this.ships[i].available <= this.turn && !this.ships[i].actions.length){
					popup("You need to deploy all arriving vessels.");
					return true;
				}
			}
		}
		return false;
	}

	this.hasInvalidPower = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].userid == this.userid && this.ships[i].available <= game.turn){
				if (this.ships[i].ship){
					for (var j = 0; j < this.ships[i].primary.systems.length; j++){
						if (this.ships[i].primary.systems[j].name == "Reactor"){
							if (this.ships[i].primary.systems[j].getOutput() < 0){
								popup("You have units with invalid Reactor settings (#" + this.ships[i].id + ")"); 
								this.ships[i].select();
								return true;
							}
						}
					}
				}
			}
		}
		return false;
	}

	this.hasBasicEW = function(){
		var data = [];

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].userid == this.userid && this.ships[i].available <= game.turn){
				if (this.ships[i].ship){
					for (var j = 0; j < this.ships[i].primary.systems.length; j++){
						if (this.ships[i].primary.systems[j].name == "Sensor" && !this.ships[i].primary.systems[j].disabled && !this.ships[i].primary.systems[j].destroyed){
							if (!this.ships[i].primary.systems[j].used){
								data.push((this.ships[i].name + " #" + this.ships[i].id));
							}
						}
					}
				}
			}
		}
		if (data.length){
			var html = "The following units have only basic sensor settings:";
			for (var i = 0; i < data.length; i++){
				html += "<p>" + data[i];
			}
			html += "</p><span style='cursor: pointer; padding: 3px; border: 1px solid white; font-size: 24px' onclick='ajax.confirmDeployment(goToLobby)'>Confirm Orders</span>";
			popup(html);
			return true;
		}
		return false;
	}

	this.hasOpenMoves = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].userid == this.userid){
				if ((game.phase == 0 && this.ships[i].ship) || (game.phase == 1 && this.ships[i].flight)){
					if (this.ships[i].getRemainingImpulse() > 0){
						popup("You have units with unused Impulse (#" + this.ships[i].id + ")");
						if (aUnit){this.getUnitById(aUnit).doUnselect();}
						this.ships[i].select();
						return true;
					}
				}
			}
		}
		return false;
	}
	
	this.hasNoFires = function(){
		var data = [];

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].userid == this.userid){
				var hasFire = false;
				
				check:
				for (var j = 0; j < this.ships[i].structures.length; j++){
					for (var k = 0; k < this.ships[i].structures[j].systems.length; k++){
						if (this.ships[i].structures[j].systems[k].weapon){
							if (this.ships[i].structures[j].systems[k].isPowered() && this.ships[i].structures[j].systems[k].getLoadLevel() >= 1){
								if (this.ships[i].structures[j].systems[k].hasFireOrder()){
									hasFire = true;
									break check;
								}
							}
						}
					}
				}
				if (!hasFire){
					data.push((this.ships[i].name + " #" + this.ships[i].id));
				}
			}
		}

		if (data.length){
			var html = "The following units have no fireorders:";
			for (var i = 0; i < data.length; i++){
				html += "<p>" + data[i];
			}
			html += "</p><span style='cursor: pointer; padding: 3px; border: 1px solid white; font-size: 24px' onclick='ajax.confirmFiringOrders(goToLobby)'>Confirm Orders</span>";
			popup(html);
			return true;
		}
		return false;
	}

	this.endPhase = function(){
		if (this.canSubmit){
			if (aUnit){game.getUnitById(aUnit).select();}
			if (this.phase == -1){
				if (this.hasInvalidDeploy() || this.hasInvalidPower() || this.hasBasicEW()){return;}
				else {ajax.confirmDeployment(goToLobby);
				}
			}
			else if (this.phase == 0 || this.phase == 1){ // SHIP MOVEMENT
				if (this.hasOpenMoves()){return;}
				else ajax.confirmMovement(goToLobby);
			}
			else if (this.phase == 2){
				if (this.hasNoFires()){return;}
				else ajax.confirmFiringOrders(goToLobby);
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

	this.undoDeployment = function(id){
		for (var i = this.ships.length-1; i >= 0; i--){
			if (this.ships[i].id == id){
				this.ships.splice(i, 1);
				return;
			}
		}
	}

	this.enableDeployment = function(id){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].id == id){
				this.deploying = id;
				//if (this.ships[i].actions.length){this.ships[i].doSelect();}
				this.setupDeploymentDiv(this.ships[i])
			//	this.setupDeploymentZone();
				this.drawDeploymentZone();
				$("#deployWrapper").find("#reinforceTable").find(".requestReinforcements").each(function(){
					if ($(this).data("id") == id){
						$(this).addClass("selected");
						return;
					}
				})
				return;
			}
		}

		for (var i = 0; i < this.reinforcements.length; i++){
			if (this.reinforcements[i].id == id){
				this.deploying = id;
				this.setupDeploymentDiv(this.reinforcements[i])
			//	this.setupDeploymentZone();
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
		planCtx.clearRect(0, 0, res.x, res.y);
		mouseCtx.clearRect(0, 0, res.x, res.y);
		$("#deployOverlay").hide();
		if (aUnit){
			game.getUnitById(aUnit).doUnselect();
		}
		game.draw();
	}

	this.setupDeploymentDiv = function(unit){
		var ele = ("#deployOverlay");
		if (game.flightDeploy){
			//img.src = game.getUnitById(game.flightDeploy).img.src;
			$(ele).find("span").html("Deploy Flight").end().find(".img").html("");
		}
		else if (game.deploying){
			//var img = new Image();
			//	img.className = "img80";
			//	img.src = window.reinforcements[i].img.src;

			//td.appendChild(window.ballImages[this.name.toLowerCase()].cloneNode(true))


			$(ele).find("span").html("Deploy Ship").end().find(".img").html("").append($(window.shipImages[unit.name.toLowerCase()].cloneNode(true)).addClass("img80"));
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

		//drawCtx.globalAlpha = 0.3;
		if (game.turn >= 2){
			drawCtx.translate(cam.o.x, cam.o.y)
			drawCtx.scale(cam.z, cam.z)
			drawCtx.beginPath();
			drawCtx.arc(0, 0, 750, 0, 2*Math.PI);
			drawCtx.fillStyle = "green";
			drawCtx.fill();
			drawCtx.setTransform(1,0,0,1,0,0);
		}
		else {
			for (var i = 0; i < this.deploys.length; i++){
				drawCtx.translate(cam.o.x, cam.o.y)
				drawCtx.scale(cam.z, cam.z)
				drawCtx.beginPath();
				drawCtx.arc(this.deploys[i].x, this.deploys[i].y, this.deploys[i].s, 0, 2*Math.PI);
				if (this.deploys[i].userid == this.userid){
					drawCtx.fillStyle = "green";
				} else drawCtx.fillStyle = "red";
				drawCtx.fill();
				drawCtx.setTransform(1,0,0,1,0,0);
			};
		}

		planCtx.clearRect(0, 0, res.x, res.y);
		planCtx.globalAlpha = 0.3;
		planCtx.drawImage(drawCanvas, 0, 0);
		drawCtx.clearRect(0, 0, res.x, res.y);
		return;


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
		planCtx.globalAlpha = 1;
		return;
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

	this.drawSelf = function(){
		ctx.save();
		ctx.translate(this.x, this.y)
		ctx.rotate(this.facing * Math.PI/180);
		ctx.drawImage(this.img, -this.size/2, -this.size/2, this.size, this.size);
		ctx.restore();
	}

	this.drawJumpMarker = function(id){
		var s = game.getUnitById(id);
		if (s.userid != this.userid && game.phase == 0){return;}
		if (game.turn == 1 && game.phase == -1){return;}
		this.setShipTransform();
		var size;

		if (s.userid == this.userid){
			size = s.size || 40;
		} else size = 100;

		ctx.beginPath();
		if (s instanceof Ship){
			ctx.arc(s.actions[0].x, s.actions[0].y, size/2, 0, 2*Math.PI, false);
		} else ctx.arc(s.x, s.y, size/2, 0, 2*Math.PI, false);
		ctx.closePath();
		ctx.strokeStyle = "white";
		ctx.fillStyle = "blue";
		ctx.globalAlpha = 0.3;
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.globalAlpha = 1;
		ctx.stroke();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "black";

		if (s instanceof Ship && s.userid == this.userid){
			ctx.save();
			ctx.translate(s.actions[0].x, s.actions[0].y);
			ctx.rotate(s.actions[0].a * Math.PI/180);
			ctx.drawImage(window.shipImages[s.name.toLowerCase()], -size/2, -size/2, size, size);
			ctx.restore();
		}
		else if (s.userid == this.userid){
			ctx.save();
			ctx.translate(s.x, s.y);
			ctx.rotate(s.a * Math.PI/180);
			ctx.drawImage(window.shipImages[s.name.toLowerCase()], -size/2, -size/2, size, size);
			ctx.restore();
		}

		ctx.strokeStyle = "black";
		this.resetShipTransform();
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
		this.setFlightSizes();
		this.draw();
		console.log("fireResolved");
	}

	this.setFlightSizes = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].flight){
				this.ships[i].size = this.ships[i].trueSize;
			}
		}
	}

	this.setShipDivs = function(){
		var x = 50;
		var y = 200;
		for (var i = 0; i < this.ships.length; i++){
			var ele = $(this.ships[i].element);
			var w = $(ele).width();
			var h = $(ele).height();


			x += 40;
			y += 50;

			$(ele)
				.css("left", x)
				.css("top", y);

			if (i == 5){
				x = 370;
				y = 150;
			}
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
		this.setShipDivs();

		if (n == -1){
			this.phase = n;
				$("#phaseSwitchDiv").click(function(){
					game.initDeployment();
					//$("#deployWrapper").find("#reinforceTable").show();
					$(this).hide();
				});
		}
		else if (n == 0){
			this.phase = n;
				ctx.clearRect(0, 0, res.x, res.y);
				$("#phaseSwitchDiv").click(function(){
					game.resolveDeployment();
					$(this).hide()
					//$(this).fadeOut(200);
				});
		}
		else if (n == 1){
			this.phase = n;
				$("#phaseSwitchDiv").click(function(){
					game.resolveShipMovement();
					$(this).hide()
				//	$(this).fadeOut(200);
				});
		}
		else if (n == 2){
				$("#phaseSwitchDiv").click(function(){
					game.resolveShipMovement();
					$(this).hide()
				//	$(this).fadeOut(200);
				});
		}
		else if (n == 3){
			this.phase = n;
				//game.draw();
				$("#phaseSwitchDiv").click(function(){
					game.initDamageControl();
					$(this).hide()
					//$(this).fadeOut(200);
				});
			
		}
	}
	
	this.create = function(){
		$("#phaseSwitchDiv").show();

		this.ships.sort(function(a, b){
			return a-b;
		});

		for (var i = 0; i < this.ships.length; i++){
			var ship = window.initiateShip(this.ships[i]);
			var deployed = 0;
			var friendly = 0;

			if (this.ships[i].userid == this.userid){
				friendly = 1;
			}

			if (this.ships[i].available < this.turn){
				deployed = 1;
			} else if (friendly && this.ships[i].actions.length){
				deployed = 1;
			} else if (!friendly && this.ships[i].actions.length && this.ships[i].actions[0].resolved){
				deployed = 1;
			}

			ship.friendly = friendly;
			ship.deployed = deployed;
			ship.create();
			this.ships[i] = ship;
			ship.createBaseDiv();
		}

		for (var i = 0; i < window.ballistics.length; i++){
			this.ballistics.push(window.initiateBallistic(i));
		}

		for (var i = 0; i < this.reinforcements.length; i++){
			this.reinforcements[i] = window.initiateShip(this.reinforcements[i]);
			this.reinforcements[i].create(); this.reinforcements[i].createBaseDiv();
			this.reinforcements[i].friendly = 1;
			this.reinforcements[i].deployed = 0;
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

		this.initDeploymentWrapper();
		this.initReinforcementWrapper();
		this.initSelectionWrapper();
		this.canSubmit = canSubmit;
		cam.setFocus(0, 0);
		this.initPhase(this.phase);
	}

	this.unitHover = function(unit){
		if (unit.id == game.shortInfo){
			return;
		}

		var ele = $("#shortInfo");
		$(ele).children().remove();
		table = unit.getShortInfo();
		$(ele).append($(table).css("width", "100%"));
		game.shortInfo = unit.id;

		unit.drawHoverElements();

		var incoming = this.getIncomingUnits(unit);

		for (var j = 0; j < incoming.length; j++){
			if (incoming[j].destroyed){continue;}
			incoming[j].drawMovePlan();
		}
		unit.drawMovePlan();

		var oX = $(ele).width()/2;
		var pos = unit.getBaseOffsetPos();
		var top = (pos.y * cam.z) + cam.o.y + 60;
		var left =(pos.x * cam.z) + cam.o.x - oX;

		$(ele).css("top", top).css("left", left).show();
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
		if (aUnit != game.shortInfo){
			salvoCtx.clearRect(0, 0, res.x, res.y);
		}
		if (!aUnit){
			planCtx.clearRect(0, 0, res.x, res.y);
		}
		//this.undrawJumpMarker(game.shortInfo);
		
		game.shortInfo = false;
		if (aUnit){
			var u = game.getUnitById(aUnit);
			if (u.ship){
				u.getSystemByName("Sensor").drawEW();
			}
		}
	}

	this.getIncomingUnits = function(target){
		var ret = [];
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].flight){
				if (this.ships[i].mission.targetid == target.id){
					ret.push(this.ships[i]);
				}
			}
		}

		for (var i = 0; i < this.ballistics.length; i++){
			if (this.ballistics[i].id == target.id || this.ballistics[i].targetid == target.id || this.ballistics[i].id == target.targetid){
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
	
	this.posIsOccupied = function(ship, pos){
		var dist = getDistance(ship, step) 
		if (ship.getRemainingImpulse()){return false;}
		if (ship.ship){
			for (var i = 0; i < this.ships.length; i++){
				if (this.ships[i].ship && this.ships[i].id != ship.id && this.ships[i].userid == ship.userid){ // different ship, different owners
					var step = this.ships[i].getPlannedPosition();

					if (!this.ships[i].getRemainingImpulse() && getDistance(pos, step) <= 0.66*(this.ships[i].size/2 + ship.size/2)){
					popup("The selected position is too close to the position or planned position of vessel (#"+this.ships[i].id+")");
						return true;
					}
				}
			}
		}
		else {
			for (var i = 0; i < this.ships.length; i++){
				if (this.ships[i].id != ship.id && (this.ships[i].ship || this.ships[i].userid == ship.userid)){ // different ship, different owners
					var step = this.ships[i].getPlannedPosition();

					if ((this.ships[i].ship || !step.resolved) && getDistance(pos, step) <= 0.66*(this.ships[i].size/2 + ship.size/2)){
					popup("The selected position is too close to the position or planned position of a vessel (#"+this.ships[i].id+" - " + this.ships[i].name +")");
						return true;
					}
				}
			}
		}
		return false;
	}

	this.getShipByClick = function(pos){
		for (var i = 0; i < this.ships.length; i++){
			var r = this.ships[i].size/3;
			if (! this.ships[i].destroyed){
				if (this.ships[i].isReady()){
					var shipPos = this.ships[i].getBaseOffsetPos();
					if (pos.x < shipPos.x + r && pos.x > shipPos.x - r){
						if (pos.y > shipPos.y - r && pos.y < shipPos.y + r){
							return this.ships[i];
						}
					}
				}
			}
		}
		return false;
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
		return false;
	}

	this.getUnitByClick = function(pos){
		return this.getAmmoByClick(pos) || this.getShipByClick(pos) || false;
	}

	this.redraw = function(){
		planCtx.clearRect(0, 0, res.x, res.y);
		moveCtx.clearRect(0, 0, res.x, res.y)
		salvoCtx.clearRect(0, 0, res.x, res.y)
		mouseCtx.clearRect(0, 0, res.x, res.y)

		$("#shortInfo").hide();

		if (aUnit){
			var unit = game.getUnitById(aUnit);
			if (!unit.salvo){
				if (unit.hasWeaponsSelected()){
					unit.highlightAllSelectedWeapons();
				}
				unit.resetMoveMode();

				if (unit.ship){unit.getSystemByName("Sensor").drawEW();}
				if (unit.flight){unit.drawMovePlan()}
			}
		}
		game.draw();
		game.drawAllPlans();
	}

	this.redrawEW = function(){
		var unit = game.getUnitById(aUnit);
			unit.resetMoveMode();
		if (unit.ship){
			unit.getSystemByName("Sensor").drawEW();
		}
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

	this.drawAllPlans = function(){
		if (game.phase < 0 || game.phase > 2){return;}
		if (aUnit && !game.animating){
			planCtx.clearRect(0, 0, res.x, res.y);
			for (var i = 0; i < this.ships.length; i++){
				this.ships[i].drawMovePlan();
			}
		}
	}

	this.setShipTransform = function(){
		ctx.translate(cam.o.x, cam.o.y);
		ctx.scale(cam.z, cam.z);
	}

	this.resetShipTransform = function(){
		ctx.setTransform(1,0,0,1,0,0);
	}
	
	this.undrawJumpMarker = function(id){
		this.setShipTransform();

		var s = game.getUnitById(id);

		ctx.beginPath();	
		ctx.arc(s.actions[0].x, s.actions[0].y, s.size/2, 0, 2*Math.PI, false);
		ctx.closePath();		
		ctx.globalCompositeOperation = "destination-out";	
		ctx.fill();

		ctx.beginPath();	
		ctx.arc(s.actions[0].x, s.actions[0].y, s.size/2, 0, 2*Math.PI, false);
		ctx.closePath();
		ctx.lineWidth = 2;
		ctx.globalAlpha = 1;
		ctx.globalCompositeOperation = "source-over";
		ctx.strokeStyle = "green";
		ctx.stroke();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "black";

		ctx.save();
		ctx.translate(s.actions[0].x, s.actions[0].y);
		ctx.rotate(s.actions[0].a * Math.PI/180);
		ctx.drawImage(window.shipImages[s.name.toLowerCase()], -s.size/2, -s.size/2, s.size, s.size);
		ctx.restore();

		this.resetShipTransform();
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
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].id == id){
				return this.ships[i];
			}
		}
		return false;
	}

	this.getBallById = function(id){
		for (var i = 0; i < this.ballistics.length; i++){
			if (this.ballistics[i].id == id){
				return this.ballistics[i];
			}
		}
		return false;
	}

	this.getDeployingUnit = function(){
		return this.getUnitById(this.deploying);
	}

	this.getUnitById = function(id){
		return this.getReinforcementById(id) || this.getShipById(id) || this.getBallById(id) || this.getIncomingById(id) || false;
	}

	this.getIncomingById = function(id){
		for (var i = 0; i < this.incoming.length; i++){
			if (this.incoming[i].id == id){
				return this.incoming[i];
			}
		}
		return false;
	}

	this.getReinforcementById = function(id){
		for (var i = 0; i < this.reinforcements.length; i++){
			if (this.reinforcements[i].id == id){
				return this.reinforcements[i];
			}
		}
		return false;
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

		$(".requestReinforcements").each(function(i){
			$(this)
			if ($(this).hasClass("green")){
				cost += $(this).data("cost");
			}
		});

		return cost;
	}

	this.showReinforcementsPreview = function(id){
		found = 0;
		for (var i = 0; i < this.reinforcements.length; i++){
			if (this.reinforcements[i].id == id){
				found = i;
				break;
			}
		}
		//console.log(window.reinforcements[i]);
	}

	this.resolveDeployment = function(){
		console.log("resolveDeployment");
		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].deployed = true;
			if (this.ships[i].available == game.turn){
				if (this.ships[i].ship){
					this.ships[i].deployAnim = [0, 5];
					this.ships[i].deployed = false;
				}
			}
		}

		setFPS(30);
		window.then = Date.now();
		window.startTime = then;
		cam.setZoom(0.7);
		this.animating = 1;
		this.animateDeployment();
	}

	this.logDeployment = function(){

	}

	this.animateDeployment = function(){
		anim = window.requestAnimationFrame(game.animateDeployment.bind(this));
		window.now = Date.now();		
		window.elapsed = window.now - window.then;
		if (elapsed > window.fpsInterval){
			window.then = window.now - (window.elapsed % window.fpsInterval);
			ctx.clearRect(0, 0, res.x, res.y);

			var doing = 0;

			game.drawBallistics();

			for (var i = 0; i < game.ships.length; i++){
				if (game.ships[i].deployed){
					ctx.translate(cam.o.x, cam.o.y);
					ctx.scale(cam.z, cam.z);
					game.ships[i].draw();
					ctx.setTransform(1,0,0,1,0,0);
				}
				else if (doing){
					continue;
				}
				else {
					ctx.translate(cam.o.x, cam.o.y);
					ctx.scale(cam.z, cam.z);
					doing = 1;
					game.ships[i].deployAnim[0] += 1;
					var fraction = game.ships[i].deployAnim[0] / game.ships[i].deployAnim[1];

					if (fraction >= 1){
						game.ships[i].deployed = true;
						game.ships[i].drawSelf();
						//game.logDeployment(i);
					}
					else {
						var sin = Math.sin(Math.PI*fraction);
						drawCircle(game.ships[i].x, game.ships[i].y, game.ships[i].size*0.55*sin, "source-over", "blue");
						drawCircle(game.ships[i].x, game.ships[i].y, game.ships[i].size*0.2*sin/2, "lighter", "lightBlue");

						if (fraction >= 0.3){
							ctx.globalAlpha = fraction;
							game.ships[i].drawSelf();
							ctx.globalAlpha = 1;
						}
						//break;
					}
					ctx.setTransform(1,0,0,1,0,0);
				}
			}

			var done = true;
			for (var i = 0; i < game.ships.length; i++){
				if (!game.ships[i].deployed){
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
		game.animating = 0;
		game.draw();
		console.log("deployDone");
	}
	
	this.resolveShipMovement = function(){
		if (aUnit){
			game.getUnitById(aUnit).select();
		}

		cam.setZoom(1);
		//cam.setFocus(this.ships[0].x, this.ships[0].y);
		setFPS(60);
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

			this.ships[i].animationSetupMove();
			var frameMod;

			if (this.ships[i].ship){
				var frameMod = window.fps / this.ships[i].getCurrentImpulse();
			} else frameMod = window.fps / this.ships[i].actions[this.ships[i].actions.length-1].dist;

			for (var j = 0; j < this.ships[i].actions.length; j++){
				if (this.ships[i].actions[j].turn == game.turn){
					var action = this.ships[i].actions[j];

					if (action.type == "speedChange" || action.type == "deploy" || action.type == "jump"){
						this.ships[i].actions[j].animated = true;
					}
					else if (j == 0){
						if (action.type == "move"){
							var v = new Vector({x: this.ships[i].x, y: this.ships[i].y}, {x: action.x, y: action.y});
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
								game.ships[i].drawX += action.v.x * 1 / game.ships[i].actions[j].v.t[1];
								game.ships[i].drawY += action.v.y * 1 / game.ships[i].actions[j].v.t[1];
								if (game.ships[i].actions[j].v.t[0] >= game.ships[i].actions[j].v.t[1]){
								//	console.log("anim true");
									game.ships[i].actions[j].animated = true;
									game.ships[i].drawX = game.ships[i].actions[j].x;
									game.ships[i].drawY = game.ships[i].actions[j].y;
								}
							}
							else if (action.type == "turn"){
								var step = 1;
								//	console.log("turn");
									if (action.a > 0){
										game.ships[i].drawFacing = addToDirection(game.ships[i].drawFacing, step);
										game.ships[i].actions[j].angle -= step;
									}
									else {
										game.ships[i].drawFacing = addToDirection(game.ships[i].drawFacing, -step);
										game.ships[i].actions[j].angle += step;
									}
									
									if (game.ships[i].actions[j].angle == 0){
										game.ships[i].actions[j].animated = true;
									}
								}
							
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

		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].animationSetupDamage();
		}

		this.getResolvingFireOrders();
		this.getShotDetails();
		this.getFireAnimationDetails();
		this.getBallDetails();
		this.getShipExplosionDetails();

		$("#combatlogWrapper").show();
		setFPS(40);
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
			this.fireOrders[i].damages = this.fireOrders[i].target.getDamageEntriesByFireId(this.fireOrders[i]);
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
									for (var l = 0; l < this.fireOrders[j].rolls.length; l++){
										this.fireOrders[i].rolls.push(this.fireOrders[j].rolls[l]);
									}
								}
							}
						}
					}
				}
				//console.log(this.fireOrders[i].rolls);
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
		}

		for (var i = 0; i < this.fireOrders.length; i++){
			if (this.fireOrders[i].shooter.flight){
				var j = 1;
				while (this.fireOrders[i].hits[0] > 1){
					this.fireOrders[i].hits[0+j] = 1;
					this.fireOrders[i].hits[0]--;
					j++;
				}
			}
		}
	}

	this.getFireAnimationDetails = function(){
		
		for (var i = 0; i < this.fireOrders.length; i++){
			this.fireOrders[i].anim = this.fireOrders[i].weapon.getAnimation(this.fireOrders[i]);
			//console.log(this.fireOrders[i].weapon.priority);
		}
		/*

		usort($this->fires, function($a, $b){
			if ($a->targetid != $b->targetid){
				return $a->targetid - $b->targetid;
			}
			else if ($a->weapon->priority != $b->weapon->priority){
				return $a->weapon->priority - $b->weapon->priority;
			}
			else return $a->shooterid - $b->shooterid;
		});
	*/

		this.fireOrders.sort(function(a, b){
			return (
				a.shooter.flight - b.shooter.flight ||
				a.targetid - b.targetid ||
				a.weapon.priority - b.weapon.priority ||
				a.shooterid - b.shooterid
			)
		});
		//for (var i = 0; i < this.fireOrders.length; i++){
		//	console.log(this.fireOrders[i].weapon.priority);
		//}
		//console.log("------------------");

    }

	this.getShipExplosionDetails = function(){
		window.animations = [];

		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].deployed){
				var anim = {
						anims: [],
						base: game.ships[i].getPlannedPosition(),
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
						s: game.ships[i].size,
						x: 0,
						y: 0
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
									//drawExplosion(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k].tx, game.fireOrders[i].anim[j][k].ty, game.fireOrders[i].anim[j][k].n, game.fireOrders[i].anim[j][k].m, 30); // EXPLO
									drawExplosion(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k], 30); // EXPLO
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
				game.ballistics[i].fireOrder.weapon = game.ballistics[i].structures[0].systems[0];
				game.ballistics[i].fireOrder.shooter = game.ballistics[i];
				game.ballistics[i].fireOrder.target = game.getUnitById(game.ballistics[i].targetid);
				game.ballistics[i].fireOrder.hits = [game.ballistics[i].fireOrder.hits];
				game.ballistics[i].fireOrder.damages = game.getUnitById(game.ballistics[i].targetid).getDamageEntriesByFireId(game.ballistics[i].fireOrder);

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
							animate.ballAnims[i].anims[j].getTrajectoryStart(),
							animate.ballAnims[i].anims[j].getBaseOffsetPos(),
							animate.ballAnims[i].anims[j].getCurrentImpulse() / animate.ballAnims[i].anims[0].getCurrentImpulse(),
							hit
						)
					);
					animate.ballAnims[i].anims[j].anim[animate.ballAnims[i].anims[j].anim.length-1].hold = 0;
					
				}
				else if (animate.ballAnims[i].anims[j] instanceof FireOrder){
					var targetMove = new Vector(
						animate.ballAnims[i].anims[j].target.getTrajectoryStart(),
						animate.ballAnims[i].anims[j].target.getBaseOffsetPos()
					);

					if (!(animate.ballAnims[i].anims[j].weapon instanceof Laser)){
						var interceptPos = getProjIntercept(
							animate.ballAnims[i].anims[j].shooter,
							animate.ballAnims[i].anims[j].target.getTrajectoryStart(),
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
									animate.ballAnims[i].anims[j].shooter.getBaseOffsetPos(),
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
							animate.ballAnims[i].anims[j].target.getTrajectoryStart(),
							targetMove
						);
						for (var k = 0; k < animate.ballAnims[i].anims[j].guns; k++){
							for (var l = 0; l < animate.ballAnims[i].anims[j].shots; l++){
								var hit = false;
								if (l < animate.ballAnims[i].anims[j].hits[k]){
									hit = true;
								}
								var interceptVector = new BallVector(
									animate.ballAnims[i].anims[j].shooter.getBaseOffsetPos(),
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
						animate.ballAnims[i].anims[j].draw();
					}
					//else if (!j && animate.ballAnims[i].anims[0].hold){
					//	animate.ballAnims[i].anims[0].drawMove();
					//	animate.ballAnims[i].done = false;
					//}
					else {
						var done = true;
						for (var k = 0; k < animate.ballAnims[i].anims[j].anim.length; k++){
							if (animate.ballAnims[i].anims[j].anim[k].done){continue;}
							else if (animate.isDone(i, j, k)){
								//if (j != 0){animate.ballAnims[i].anims[0].hold = 0;}
								animate.ballAnims[i].anims[j].anim[k].done = true;
							}
							else if (animate.isReady(i, j, k)){
								//if (j != 0){animate.ballAnims[i].anims[0].hold = 1;}
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
						animate.ballAnims[j].anims[k].draw();
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
			game.draw();
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
		var armour = 0;
		var system = 0;
		var struct = 0;
		var rolls = [];
		
		for (var i = 0; i < fire.guns; i++){
			shots += fire.weapon.getShots();
			hits += fire.hits[i];
		}
		for (var i = 0; i < fire.damages.length; i++){
			armour += fire.damages[i].armourDmg;
			struct += fire.damages[i].overkill;

			if (fire.damages[i].system == "Main Structure"){
				struct += fire.damages[i].structDmg;
			} else system += fire.damages[i].structDmg;

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

		var tr = document.createElement("tr");;

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
		tr.insertCell(-1).innerHTML = "<span class='bold " + shooterClass + "'>" + fire.shooter.name + " #" + fire.shooter.id + "</span>";
		tr.insertCell(-1).innerHTML = "<span class='bold " + targetClass + "'>" + fire.target.name + " #" + fire.target.id + "</span>";
		tr.insertCell(-1).innerHTML = fire.weapon.getDisplay();
		tr.insertCell(-1).innerHTML = chance + "%";
		tr.insertCell(-1).innerHTML = hits + " / " + shots;

		if (!hits){
			tr.insertCell(-1).innerHTML = "";
			tr.insertCell(-1).innerHTML = "";
			tr.insertCell(-1).innerHTML = "";
		}
		else {
			tr.insertCell(-1).innerHTML = armour;
			tr.insertCell(-1).innerHTML = system;
			tr.insertCell(-1).innerHTML = struct;
		}

		$("#combatLog").find("tbody").append(tr);

		if (hits){
			var add = this.getDamageDetails(fire);

			$("#combatLog").find("tbody").append($(add).hide());
			$(tr).click(function(){
				if ($(this).hasClass("selected")){
					$(this).removeClass("selected").next().hide();
				}
				else {
					$(this).addClass("selected").next().show();
				}
			})
		}
	}

	this.getDamageDetails = function(fire){

		if (fire.shooter.id == 8){
			console.log("dign");
		}
		var details = document.createElement("tr");
			details.className = "selected";
		var td = details.insertCell(-1)
			td.colSpan = 9;

		var dmgs = {};
		var kills = {};

		for (var i = 0; i < fire.damages.length; i++){
			if (dmgs.hasOwnProperty(fire.damages[i].system)){
				dmgs[fire.damages[i].system][0]++
			}
			else {
				dmgs[fire.damages[i].system] = [1, 0];
			}
			if (fire.damages[i].destroyed){
				dmgs[fire.damages[i].system][1]++;
			}
		}

		for (var i in dmgs){
			td.innerHTML += dmgs[i][0] + "x " + i;
			if (dmgs[i][1]){
				td.innerHTML += " (" + dmgs[i][1] + ")"
			}
			td.innerHTML += "; "
		}

		return details;

		if (fire.target.flight || fire.target.salvo){
			td.innerHTML += " (Kills: " + destroyed + ")";
		} else {
			td.innerHTML += " (Kills: " + destroyed + ")";
		}
	}

	this.initDeploymentWrapper = function(){
		$("#deployWrapper")	
			.removeClass("disabled")
			.contextmenu(function(e){
				e.preventDefault();
				$(this).hide();
				$("#reinforce").data("on", 0);
				if (game.phase == -1){
					$(this).find("#reinforceTable").find(".selected").each(function(){
						$(this).removeClass("selected");
						game.disableDeployment();
					})
				}
			})
			.find("#deployTable")
			.find("tr")
			.each(function(){
				var name = $(this).attr("class");
				if (name){
					$(this).data("shipid", Math.floor(name.substring(name.search(" ")+1, name.length)))
					//console.log($(this).data());

					if (game.turn == 1){
						$(this).click(function(e){
							e.stopPropagation();
							if (game.phase == -1){
								if (game.deploying && $(this).hasClass("selected")){
									$(this).removeClass("selected");
									game.disableDeployment();
								}
								else if (!game.deploying && !game.aUnit && game.getUnitById($(this).data("shipid")).canDeploy()){
									$(this).addClass("selected");
									game.enableDeployment($(this).data("shipid"));
								}
							}
						})
						.contextmenu(function(e){
							e.preventDefault(); e.stopPropagation();
						})									
					}

					$(this).hover(
						function(e){
							game.drawJumpMarker($(this).data("shipid"));
							//console.log("hoverIn");
						},
						function(e){
							game.redraw();
							//console.log("hoverOut");
						}
					)
				}
			});
	}

	this.initReinforcementWrapper = function(){
		$("#reinforce")
			.data("on", 1)
			.click(function(e){
				e.stopPropagation();
				if (!$(this).data("on")){
					$(this).data("on", 1);
					$("#deployWrapper").show();
				}
				else {
					$(this).data("on", 0);
					$("#deployWrapper").hide();
					if (game.phase == -1){
						$("#deployWrapper").find("#reinforceTable").find(".selected").each(function(){
							$(this).removeClass("selected");
							game.disableDeployment();
						})
					}
				}
			})
		
		$("#deployWrapper").find(".requestReinforcements").each(function(i){
			$(this)
			.data("id", game.reinforcements[i]["id"])
			.data("cost", game.reinforcements[i]["cost"])
			.click(function(e){
				e.stopPropagation();
				if (game.phase == -1){
					if (game.deploying && $(this).hasClass("selected")){
						$(this).removeClass("selected");
						game.disableDeployment();
					}
					else if (!aUnit){
						if ($(this).hasClass("green")){
							$(this).addClass("selected");
							game.enableDeployment($(this).data("id"));
						}
						else if (!game.deploying){
							if (!$(this).hasClass("green") && Math.floor(game.reinforcePoints) >= $(this).data("cost") + game.getCurrentReinforceCost()){
								$(this).addClass("selected");
								game.enableDeployment($(this).data("id"));
							} else popup("You have insufficient Reinforce Points ("+game.reinforcePoints+") available.");
						}
					}
				} else popup("Reinforces can only be requested in Deployment/Initial Phase.");
			})
			.contextmenu(function(e){
				e.preventDefault(); e.stopPropagation();
				if (game.phase == -1 && !aUnit && $(this).hasClass("green")){
					game.undoDeployment($(this).data("id"));
					$(this).removeClass("green");
					$("#deployWrapper").find("#reinforceTable").find("#totalRequestCost").html(game.getCurrentReinforceCost());
					game.draw();
				}
			});
		})
	}

	this.initSelectionWrapper = function(){
		var ele = $("#unitGUI");
		var l = 0;

		this.ships.sort(function(a, b){
			return a.userid - b.userid || b.cost- a.cost
		});
	
		for (var i = 0; i < this.ships.length; i++){
			console.log(this.ships[i].userid + " / " + this.ships[i].cost);
			if (this.ships[i].isReady()){
				var name = "friendly";
				if (this.ships[i].userid != game.userid){
					name = "hostile";
				}
				l++;
				ele.append(
				($(this.ships[i].img.cloneNode(true))
					.data("id", this.ships[i].id))
					.addClass("rotate270")
					.addClass("size40")
					.addClass(name)
					.click(function(e){
						e.preventDefault(); e.stopPropagation();						
						if (!aUnit && !game.getUnitById($(this).data("id")).selected){ // selecting
							game.getUnitById($(this).data("id")).doSelect();
						} else if (aUnit == $(this).data("id")){ // unselecting
							game.getUnitById($(this).data("id")).doUnselect();
						} else if (aUnit != $(this).data("id")){ // fireing
							var ship = game.getUnitById(aUnit);
							var vessel = game.getUnitById($(this).data("id"));
							if (vessel){
								if (vessel.id != ship.id && (vessel.userid != game.userid && vessel.userid != ship.userid)){
									handleFireClick(ship, vessel);
								} else vessel.switchDiv();
							}
						}
					})
					.contextmenu(function(e){
						e.preventDefault(); e.stopPropagation();
						var unit = game.getUnitById($(this).data("id"));
						if (aUnit != unit.id){unit.switchDiv();}
					})
					.hover(function(e){
							var vessel = game.getUnitById($(this).data("id"));
								vessel.doHighlight();
								game.unitHover(vessel)
							if (aUnit && aUnit != vessel.id){
								var	ship = game.getUnitById(aUnit);
								if (ship.salvo){return;}
								var shipLoc = ship.getPlannedPosition();
								var facing = ship.getPlannedFacing();
								if (ship.hasWeaponsSelected()){
									if (ship.id != vessel.id){
										handleWeaponAimEvent(ship, vessel, e);
									}// else $("#weaponAimTableWrapper").hide();
								}
							} else {
								game.target = 0;
								$("#weaponAimTableWrapper").hide()
							}
						}
					)
				)
			}
		}

		for (var i = 0; i < this.ballistics.length; i++){
			var name = "friendly";
			if (this.ballistics[i].userid != game.userid){
				name = "hostile";
			}
			l++;
			ele.append(
			($(this.ballistics[i].img.cloneNode(true))
				.data("id", this.ballistics[i].id))
				.addClass("size40")
				.addClass(name)
				.click(function(e){
					e.preventDefault(); e.stopPropagation();
					game.getUnitById($(this).data("id")).select();
				})
				.contextmenu(function(e){
					e.preventDefault(); e.stopPropagation();
					game.getUnitById($(this).data("id")).select();
				})
				.hover(function(e){
				var vessel = game.getUnitById($(this).data("id"));
					vessel.doHighlight();
				})
			)
		}

		if (l){
			ele.width(Math.min(510, l*46)).css("top", 0).css("left", 400).drag();
		} else ele.hide();
	}
}