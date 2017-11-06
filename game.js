
function Game(data, userid){
	this.id = data.id;
	this.name = data.name;
	this.status = data.status;
	this.userid = userid;
	this.turn = data.turn;
	this.phase = data.phase;
	this.ships = data.ships || [];
	this.reinforcements = data.reinforcements;
	this.incoming = data.incoming;
	this.const = data.const;
	this.fireOrders = []
	this.mode = false;
	this.deploying = false;
	this.flightDeploy = false;
	this.adjustMission = false;
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
	this.turnMode = 0;
	this.zIndex = 10;
	this.sensorMode = 0;
	this.target = 0;
	this.deploys = data.deploys;
	this.animShip = 0;
	this.animFlight = 0;
	this.animSalvo = 0;
	this.mission;

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

	this.getNewMissions = function(){
		var data = [];
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].flight && this.ships[i].available < game.turn){
				if (this.ships[i].mission.new){
					data.push(this.ships[i].mission);
				}
			}
		}
		return data;
	}

	this.isCloseCombat = function(a, b){
		for (var i = 0; i < a.cc.length; i++){
			if (a.cc[i] == b.id){
				return true;
			}
		}
		return false;
	}

	this.getMissionTypeString = function(val){
		switch (val){
			case 1: return "PATROL";
			case 2: return "STRIKE / ESCORT";
			default: return "ERROR";
		}
	}

	this.getMissionTargetString = function(mission){
		if (mission.targetid){
			var t = game.getUnitById(mission.targetid);
			return t.name + " #" + t.id;
		}
		else return "";
	}

	this.enableFlightDeployment = function(){
		this.flightDeploy = this.getUnitById(aUnit).getSystemById($("#hangarLoadoutDiv").data("systemid"));
		var mission = this.getMissionTypeString(this.flightDeploy.mission);

		instruct("Please select the offensive or defensive target for the flight");
		$("#game").find("#deployOverlay").find("#deployType").html("Select target for </br>" + mission + "</br></span>");
	}

	this.handleFlightDeployMouseMove = function(e, pos, unit){
		var valid = false;
		if (this.flightDeploy.mission == 1){ // patrol
			valid = true;
			var s = 0;
			for (var i = 0; i < this.flightDeploy.loads.length; i++){
				s += this.flightDeploy.loads[i].launch;
			}
			s = 35 + s*8;
			s = Math.floor(s/2);

			salvoCtx.clearRect(0, 0, res.x, res.y);
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

	this.issueMission = function(pos){
		var valid = false;
		var t = 0;
		var dest;

		if (this.mission.new == 1){
			console.log("PATROL");
			dest = pos;		
			valid = true;
		}
		else if (this.shortInfo){
			t = game.getUnitById(this.shortInfo);
			if (t.ship){
				valid = true;
				dest = t.getPlannedPos();
			}
		}

		if (!valid){
			return false;
		}

		var s = this.getUnitById(aUnit);
		if (s.cc.length){
			var free = 0;
			for (var i = 0; i < this.ships.length; i++){
				if (this.ships[i].ship){
					for (var j = 0; j < s.cc.length; j++){
						if (s.cc[j] == this.ships[i].id){
							this.ships[i].detachFlight(s.id);
							free = 1;
							s.doDraw = 1;
							break;
						}
					}
					if (free){break;}
				}
			}
		}

		var o = s.getPlannedPos();
		var mission = {unitid: aUnit, turn: this.turn, type: this.mission.new, targetid: t.id || 0, x: dest.x, y: dest.y, arrived: 0, new: 1};

		if (t && o.x == dest.x && o.y == dest.y){
			mission.arrived = game.turn-1;
			mission.turn = game.turn-1;
			s.doDraw = 0;
			t.attachFlight(s.id);
		}
		else {
			s.mission = mission;
			s.facing = getAngleFromTo(o, dest);
			s.setTarget();
			s.setSize();
			s.setLayout();
			s.setImage();
		}

		s.disableMissionMode();
		game.draw();
		game.drawShipOverlays();
		$("#game").find("#deployOverlay").hide();
	}

	this.doDeployFlight = function(pos){
		var valid = false;
		var t = 0;
		var dest;

		if (this.flightDeploy.mission == 1){ // Patrol
			//console.log("PATROL");
			dest = pos;		
			valid = true;
		}
		else if (this.shortInfo){
			t = game.getUnitById(this.shortInfo);
			if (t && t.ship){
				valid = true;
				dest = t.getPlannedPos();
			}
		}

		if (!valid){
			return false;
		}

		var s = this.getUnitById(aUnit);
		var hangar = s.getSystemById(this.flightDeploy.id)
		var o = s.getPlannedPos();
		var facing = getAngleFromTo(o, dest);
		var p = getPointInDirection(s.size/2, facing, o.x, o.y);
		var mission = {unitid: aUnit, turn: this.turn, type: this.flightDeploy.mission, targetid: t.id || 0, x: dest.x, y: dest.y, arrived: 0, new: 1};

		if (t.id == aUnit){
			p = dest;
			mission.arrived = 1//game.turn;
		}

		var flight = new Flight(
			{id: -this.ships.length-20, name: "Flight", shipType: "Flight", mission: mission,
			x: p.x, y: p.y, mass: 0, facing: facing, ep: 0, baseImpulse: 0, currentImpulse: 0, fSize: 15, baseSize: 30, unitSize: 6, userid: this.userid, available: this.turn}
		);

		flight.deployed = 1;
		flight.friendly = 1;
		flight.primary = new Primary(0, flight.id, 0, 0, 0);
		flight.actions.push(new Move(-1, "deploy", 0, p.x, p.y, facing, 0, 1, 1, 0));
		flight.launchData = {
			shipid: aUnit,
			systemid: this.flightDeploy.id,
			loads: this.flightDeploy.loads,
			x: dest.x,
			y: dest.y
		};

		for (var i = 0; i < this.flightDeploy.loads.length; i++){
			for (var j = 1; j <= this.flightDeploy.loads[i].launch; j++){
				var f = new Fighter({id: j, name: this.flightDeploy.loads[i].name, ep: 0, mass: this.flightDeploy.loads[i].mass, integrity: this.flightDeploy.loads[i].integrity, value: 0, negation: 0, crits: 0, destroyed: 0})
					f.baseHitChance = 0;
				flight.structures.push(f);
			}
		}

		flight.create();
		flight.setPreMovePosition();
		flight.setPreMoveImage();
		flight.createBaseDiv();
		flight.setTarget();
		game.ships.push(flight);

		this.hideInstruct();
		$("#deployOverlay").hide();
		hangar.setFireOrder(t.id).select();
		game.flightDeploy = false;
		//flight.disableMissionMode();

		$(flight.element).css("top", 600).css("left", 0);

		if (t.id == aUnit){
			game.getUnitById(aUnit).attachFlight(flight.id);
		}
		this.draw();
	}

	this.hideInstruct = function(){
		$("#instructWrapper").hide();
	}
	
	this.hidePopup = function(){
	}
	
	this.getDeployedFlights = function(){
		var ret = [];
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].userid == this.userid){
				if (this.ships[i].flight && this.ships[i].available == this.turn){
					var flight = {
						type: "Flight",
						name: "Flight",
						mission: this.ships[i].mission,
						launchData: this.ships[i].launchData,
						actions: this.ships[i].actions,
						turn: this.turn,
						eta: 0,
						upgrades: []
					}

					for (var j = flight.launchData.loads.length-1; j >= 0; j--){
						if (flight.launchData.loads[j].amount == 0){
							flight.launchData.loads.splice(j, 1);
						}
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
								data.push(this.ships[i]);
							}
						}
					}
				}
			}
		}
		if (data.length){
			this.clickablePop(data, "The following units have only basic sensor settings:");
			return true;
		}
		return false;
	}

	this.hasOpenMoves = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].userid == this.userid){
				if ((game.phase == 0 && this.ships[i].ship) || (game.phase == 1 && this.ships[i].flight)){
					if (this.ships[i].getRemainingImpulse() > 0){
						if (aUnit){
							this.getUnitById(aUnit).doUnselect();
						}
						popup("You have units with unused Impulse (#" + this.ships[i].id + ")");
						this.ships[i].doHover();
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
				if (this.ships[i].salvo){continue;}
				if (this.ships[i].flight){
					if (!this.ships[i].cc.length){continue;}
					else {
						var doTest = false;
						test:
						for (var j = 0; j < this.ships[i].cc.length; j++){
							for (var k = 0; k < this.ships.length; k++){
								if (this.ships[i].cc[j] == this.ships[k].id){
									if (this.ships[k].userid != this.ships[i].userid){
										doTest = true;
										break test;
									}
								}
							}
						}
						if (!doTest){continue;}
					}
				}
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
					data.push((this.ships[i]));
				}
			}
		}

		if (data.length){
			this.clickablePop(data, "The following units have no fireorders:");
			return true;
		}
		return false;
	}

	this.clickablePop = function(data, msg){
		for (var i = 0; i < data.length; i++){
			msg += "<div class='popupEntry buttonTD' onclick='game.selectFromPopup(" + data[i].id + ")'>" + data[i].name + " #" + data[i].id + "</div>"; 
		}
		msg += "</p><div class='popupEntry buttonTD' style='font-size: 20px; width: 200px' onclick='game.doConfirmOrders()'>Confirm Orders</div>";
		popup(msg);
	}

	this.doConfirmOrders = function(){
		switch (this.phase){
			case -1: ajax.confirmDeployment(goToLobby); return;
			case 0: ajax.confirmMovement(goToLobby); return;
			case 1: ajax.confirmMovement(goToLobby); return;
			case 2: ajax.confirmFiringOrders(goToLobby); return;
			case 3: ajax.confirmDamageControl(goToLobby); return;
			default: popup("FATAL ERROR - PHASE UNSET"); return;
		}
	}

	this.selectFromPopup = function(id){
		$("#popupWrapper").hide();
		if (aUnit){
			game.getUnitById(aUnit).doUnselect();
		}
		var ship = game.getUnitById(id);
			ship.doHover();
			ship.doSeelct();
	}

	this.endPhase = function(){
		if (this.canSubmit){
			if (aUnit){game.getUnitById(aUnit).select();}
			if (this.phase == -1){
				if (this.hasInvalidDeploy() || this.hasInvalidPower() || this.hasBasicEW()){return;}
				else this.doConfirmOrders();
			}
			else if (this.phase == 0 || this.phase == 1){ // SHIP MOVEMENT
				if (this.hasOpenMoves()){return;}
				else this.doConfirmOrders();
			}
			else if (this.phase == 2){
				if (this.hasNoFires()){return;}
				else this.doConfirmOrders();
			}
			else if (this.phase == 3){
				this.doConfirmOrders();
			}
		}
		else popup("You have already confirmed your orders");
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
						return false;
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

			//td.appendChild(window.shipImages[this.name.toLowerCase()].cloneNode(true))


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
		game.draw();
		//cam.setFocus()
		$("#deployWrapper").removeClass("disabled");
	}

	this.movementResolved = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].flight && this.animFlight || this.ships[i].salvo && this.animSalvo){
				if (this.ships[i].mission.arrived){
					if (this.ships[i].mission.type == 1){
						this.ships[i].setPostMoveSize();
						this.ships[i].setPostMoveImage();
					}
					else if (this.ships[i].mission.type > 1){
						this.ships[i].doDraw = 0;
					}
				}
				//this.ships[i].setPostMoveSize();
				//this.ships[i].setPostMoveImage();
			}
		}
		for (var i = 0; i < this.ships.length; i++){
			//if (this.ships[i].ship){
				this.ships[i].setEscortImage();
			//}
		}
		//game.draw();
	}

	this.initDamageControl = function(){
		this.resolveFire();
	}

	this.fireResolved = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (!this.ships[i].ship){
				this.ships[i].setPostFireImage();
			}
		}
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].ship){
				this.ships[i].setEscortImage();
			}
		}
		this.draw();
		console.log("fireResolved");
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
					game.resolveUnitMovement();
					$(this).hide()
				//	$(this).fadeOut(200);
				});
		}
		else if (n == 2){
				$("#phaseSwitchDiv").click(function(){
					game.resolveUnitMovement();
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

		//this.ships.sort(function(a, b){
			//return a.ship-b.ship || a.flight - b.flight || a.salvo - b.salvo;
		//	return a.salvo - b.salvo || a.flight - b.flight || a.ship-b.ship ;
		//})

		for (var i = 0; i < this.ships.length; i++){
			var ship = window.initiateUnit(this.ships[i]);
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
			this.ships[i] = ship;
			this.ships[i].create();
		}

		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].setDrawData();
			this.ships[i].createBaseDiv();
			this.ships[i].setTarget();
			this.ships[i].setImage();
			this.ships[i].setEscortImage();
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

	this.updateIntercepts = function(){
		var stack = [];
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].flight && (this.ships[i].mission.type == 2 || this.ships[i].mission.type == 3)){
				if (this.ships[i].mission.targetid == aUnit){
					stack.push(this.ships[i]);
				}
			}
		}

		for (var i = 0; i < stack.length; i++){
			stack[i].setTarget();
			if (stack[i].mission.arrived){continue;}
			stack[i].setImage();
		}

		if (stack.length){
			game.redraw();
		}
	}

	this.handleHoverEvent = function(unit){
		if (unit.id == game.shortInfo){
			return;
		} else if (game.shortInfo && game.shortInfo != unit.id){
			game.redraw();
		}

		game.shortInfo = unit.id;

		var ele = $("#shortInfo");
		$(ele).children().remove().end().append($(unit.getShortInfo()).css("width", "100%"));

		var oX = $(ele).width()/2;
		var pos = unit.getBaseOffsetPos();
		var top = (pos.y * cam.z) + cam.o.y + 60;
		var left = (pos.x * cam.z) + cam.o.x - oX;
		$(ele).css("top", top).css("left", left).show();

		if (unit.id != aUnit){
			unit.doHover();
		}
	}

	this.resetHover = function(){

		if (game.deploying){
			game.drawDeploymentZone();
		}
		$("#shortInfo").html("").hide();
		if (aUnit != game.shortInfo){
			salvoCtx.clearRect(0, 0, res.x, res.y);
			moveCtx.clearRect(0, 0, res.x, res.y);
		}
		if (!aUnit){
			planCtx.clearRect(0, 0, res.x, res.y);
		}

		if (aUnit != game.shortInfo){
			var u = game.getUnitById(aUnit);
			if (u.ship){
				u.getSystemByName("Sensor").drawEW();
				u.setMoveTranslation();
				u.drawMoveArea();
				u.drawVectorIndicator();
				u.drawTurnArcs();
				u.resetMoveTranslation();
			}
		}
		game.shortInfo = false;
	}
	
	this.draw = function(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		this.drawShips();
		
		if (game.deploying){
			game.drawDeploymentZone();
		}
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

				if (unit.ship){
					unit.getSystemByName("Sensor").drawEW();
					unit.setMoveTranslation();
					unit.drawMoveArea();
					unit.drawVectorIndicator();
					unit.drawTurnArcs();
					unit.resetMoveTranslation();
				}
				else if (unit.flight){unit.drawMovePlan()}
			}
			this.drawMixedMoves();
		}
		game.draw();
		//game.drawShipOverlays();
	}

	this.drawMixedMoves = function(){
		for (var i = 0; i < this.ships.length; i++){
			//if (this.ships[i].flight && this.ships[i].mission.arrived){continue;}
			//else if (!this.ships[i].ship){
				this.ships[i].drawMovePlan();
			//}
		}
	}

	this.drawShipOverlays = function(){
		var sensor = 0;
		var moves = 0;

		if (game.phase == -1){
			sensor = 1;
		} else if (game.phase == 0){
			moves = 1;
		}

		if (!game.deploying && !game.animating){
			salvoCtx.clearRect(0, 0, res.x, res.y);
			planCtx.clearRect(0, 0, res.x, res.y);
			for (var i = 0; i < this.ships.length; i++){
				if (this.ships[i].flight && this.ships[i].mission.arrived){continue;}
				else if (!this.ships[i].ship || moves && ships[i].friendly){
					this.ships[i].drawMovePlan();
				}
				else if (sensor && game.ships[i].friendly){
					this.ships[i].drawEW();
				}
			}
		}
	}

	this.drawAllSensorSettings = function(friendly){
		salvoCtx.clearRect(0, 0, res.x, res.y);
		for (var i = 0; i < this.ships.length; i++){
			if (!this.ships[i].ship || !this.ships[i].deployed){continue;}
			if (this.ships[i].friendly != friendly){continue;}
			
			var sensor = this.ships[i].getSystemByName("Sensor");
			if (!sensor.ew.length){continue;}
			var loc = this.ships[i].getPlannedPos();
			var facing = this.ships[i].getPlannedFacing();
			var ew = sensor.ew[sensor.ew.length-1];
			var str = sensor.getOutput();
			var d = ew.dist;
			var a = ew.angle;
			var w;
			if (ew.angle == -1){
				w = 180;
			}
			else w = Math.min(180, game.const.ew.len * Math.pow(str/ew.dist, game.const.ew.p));

			salvoCtx.translate(cam.o.x, cam.o.y)
			salvoCtx.scale(cam.z, cam.z)
			salvoCtx.beginPath();
			var color = "";
			var opacity = 1;
			switch (sensor.ew[sensor.ew.length-1].type){
				case 0: color = "red"; break;
				case 1: color = "blue"; break;
				case 2: color = "blue"; opacity = 0.1; break;
				case 3: color = "blue"; opacity = 0.1; break;
			}

			//salvoCtx.clearRect(0, 0, res.x, res.y);
			//salvoCtx.translate(cam.o.x, cam.o.y);
			//salvoCtx.scale(cam.z, cam.z);

			w = Math.ceil(w);	
			if (w == 180){
				salvoCtx.beginPath();
				salvoCtx.arc(loc.x, loc.y, d, 0, 2*Math.PI, false);
				salvoCtx.closePath();
			}
			else {
				var start = addAngle(0 + w-facing, a);
				var end = addAngle(360 - w-facing, a);
				var p1 = getPointInDirection(str, start, loc.x, loc.y);
				var rad1 = degreeToRadian(start);
				var rad2 = degreeToRadian(end);
				salvoCtx.beginPath();			
				salvoCtx.moveTo(loc.x, loc.y);
				salvoCtx.lineTo(p1.x, p1.y); 
				salvoCtx.arc(loc.x, loc.y, d, rad1, rad2, false);
				salvoCtx.closePath();
			}

			//drawCtx.strokeStyle = "white";
			//drawCtx.lineWidth = 1;
			//drawCtx.stroke();
			salvoCtx.fillStyle = color;
			salvoCtx.globalAlpha = 0.2;
			salvoCtx.fill();
			salvoCtx.setTransform(1,0,0,1,0,0);
		};

	/*	salvoCtx.clearRect(0, 0, res.x, res.y);
		salvoCtx.globalAlpha = 0.2;
		salvoCtx.drawImage(drawCanvas, 0, 0);
		salvoCtx.globalAlpha = 1;
		drawCtx.clearRect(0, 0, res.x, res.y);
	*/	return;
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

	this.getDeployingUnit = function(){
		return this.getUnitById(this.deploying);
	}

	this.getUnitById = function(id){
		return this.getReinforcementById(id) || this.getShipById(id) || this.getIncomingById(id) || false;
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

	this.getFireDistance = function(a, b){
		if (a.ship && b.ship){
			return Math.floor(getDistance(a.getPlannedPos(), b.getPlannedPos()));
		}
		else if (this.isCloseCombat(a, b)){
			return 0;
			if (a.ship){
				return Math.floor(a.size/2);
			} else if (b.ship){
				return Math.floor(b.size/2);
			}
			else return a.getParent().size/2;
		}
		else if (a.ship){
			return Math.floor(getDistance(a.getPlannedPos(), b.getPlannedPos()));
		}
		return 666;
	}

	this.resolveDeployment = function(){
		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].deployed = true;
			if (this.ships[i].available == game.turn){
				if (this.ships[i].ship){
					this.ships[i].deployAnim = [0, 30];
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

		$("#combatlogWrapper")
		.width(250)
		.show()
		.find(".combatLogHeader").html("Deployment Log").end()
		.find("#combatLog").children().children().remove();

		//this.logDeployment();
	}

	this.animateDeployment = function(){
		anim = window.requestAnimationFrame(game.animateDeployment.bind(this));
		window.now = Date.now();		
		window.elapsed = window.now - window.then;
		if (elapsed > window.fpsInterval){
			window.then = window.now - (window.elapsed % window.fpsInterval);
			ctx.clearRect(0, 0, res.x, res.y);

			var doing = 0;

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
						//game.createDeployLogEntry(i);
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
		game.createFlightDeployEntries();
		console.log("deployDone");
	}

	this.resolveUnitMovement = function(){
		if (aUnit){
			game.getUnitById(aUnit).select();
		}

		this.animShip = 1;
		this.animFlight = 0;
		this.animSalvo = 0;
		this.setUnitMovementFocus();
		this.setUnitMoveDetails();
		this.animateUnitMovement();
	}

	this.setUnitMovementFocus = function(){
		window.then = Date.now();
		window.startTime = then;
		cam.setZoom(1);
		setFPS(60);

		var minX = 0;
		var minY = 0;
		var maxX = 0;
		var maxY = 0;
		var amount = 0;
		var endX = 0;
		var endY = 0;

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].ship){
				minX = Math.min(minX, this.ships[i].x);
				minY = Math.min(minY, this.ships[i].y);
				maxX = Math.max(maxX, this.ships[i].x);
				maxY = Math.max(maxY, this.ships[i].y);
			}
		}

		endX = (minX + maxX) / 2;
		endY = (minY + maxY) / 2;

		cam.setFocusToPos({x: endX, y: endY});

	}

	this.setUnitMoveDetails = function(){
		var toDo;
		for (var i = 0; i < this.ships.length; i++){
			var frameMod;
			var toDo = true;
			if (!this.ships[i].deployed){
				toDo = false;
			}
			else if (this.ships[i].flight && this.ships[i].mission.arrived && this.ships[i].mission.arrived < game.turn){
				for (var j = 0; j < this.ships[i].actions.length; j++){
					this.ships[i].actions[j].animated = true;
				}
			}

			if (! toDo){
				continue;
			}

			if (this.ships[i].cc.length){
				if (this.ships[i].ship){
					for (var j = 0; j < this.ships[i].cc.length; j++){
						var attach = this.getUnitById(this.ships[i].cc[j]);
						if (attach.mission.arrived < game.turn){
							this.ships[i].attachAnims.push(attach);
						}
					}
				} else if (this.ships[i].flight){
					var attach = this.getUnitById(this.ships[i].cc[j]);
					if (attach.salvo){
						this.ships[i].attachAnims.push(attach);
					}
				}
			}

			this.ships[i].animationSetupMove();

			if (this.ships[i].ship){
				frameMod = window.fps / this.ships[i].getCurrentImpulse();
			} else frameMod = window.fps / this.ships[i].actions[this.ships[i].actions.length-1].dist;

			for (var j = 0; j < this.ships[i].actions.length; j++){
				if (this.ships[i].actions[j].turn == game.turn){
					var action = this.ships[i].actions[j];

					if (action.type == "speed" || action.type == "deploy" || action.type == "jump"){
						this.ships[i].actions[j].animated = 1;
					}
					else {
						this.ships[i].actions[j].animated = 0;
						if (j == 0){
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
		}
	}


	this.animateUnitMovement = function(){
		anim = window.requestAnimationFrame(game.animateUnitMovement.bind(this));
		window.now = Date.now();		
		window.elapsed = window.now - window.then;
		if (elapsed > window.fpsInterval){
			//console.log("DRAW");
			//frameCounter++;
			//console.log(frameCounter);
			window.then = window.now - (window.elapsed % window.fpsInterval);
			fxCtx.clearRect(0, 0, res.x, res.y);
			ctx.clearRect(0, 0, res.x, res.y);

			ctx.translate(cam.o.x, cam.o.y);
			ctx.scale(cam.z, cam.z);
		
			for (var i = 0; i < game.ships.length; i++){
				if (game.ships[i].deployed){
					if (this.ships[i].ship && !this.animShip || this.ships[i].flight && !this.animFlight || this.ships[i].salvo && !this.animSalvo){
						game.ships[i].draw();
						continue;
					}

					for (var j = 0; j < game.ships[i].actions.length; j++){
						if (game.ships[i].actions[j].turn == game.turn && !game.ships[i].actions[j].animated){
							var action = game.ships[i].actions[j];
							if (action.type == "move"){
								//	console.log(game.ships[i].actions[j].v);
								game.ships[i].actions[j].v.t[0] += 1;
								game.ships[i].drawX += action.v.x * 1 / action.v.t[1];
								game.ships[i].drawY += action.v.y * 1 / action.v.t[1];
								if (game.ships[i].actions[j].v.t[0] >= action.v.t[1]){
								//	console.log("anim true");
									game.ships[i].actions[j].animated = true;
									game.ships[i].drawX = action.x;
									game.ships[i].drawY = action.y;
								}
							}
							else if (action.type == "turn"){
								var step = 1;
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
							else if (action.type == "patrol"){
								game.ships[i].actions[j].animated = true;
							}

							//for (var k = 0; k < game.ships[i].attachAnims.length; k++){
							//		game.ships[i].attachAnims[k].drawX = game.ships[i].drawX;
							//ame.ships[i].attachAnims[k].drawY = game.ships[i].drawY;
							//}
							
							break;
						}
					}
					game.ships[i].draw();
				}
			}

			ctx.setTransform(1,0,0,1,0,0);
			
			var done = true;
			
			for (var i = 0; i < game.ships.length; i++){
				if (!done){
					break;
				}
				else if (this.ships[i].ship && this.animShip || this.ships[i].flight && this.animFlight || this.ships[i].salvo && this.animSalvo){
					for (var j = 0; j < game.ships[i].actions.length; j++){
						if (game.ships[i].actions[j].turn == game.turn){
							if (! game.ships[i].actions[j].animated){
								done = false;
								break;
							}
						}
					}
				}
			}
			
			if (done){
				if (game.animShip){
					console.log("flight moves");
					game.animShip = 0;
					game.animFlight = 1;
				}
				else if (game.animFlight){
					game.movementResolved();
					console.log("salvo moves");
					game.animFlight = 0;
					game.animSalvo = 1;
				}
				else {
					window.cancelAnimationFrame(anim);
					game.movementResolved();
					game.draw();
					console.log("movementResolved");
				}
			}
		}
	}

	this.resolveFire = function(){
		this.resetImageData();
		this.getResolvingFireOrders();
		this.getShotDetails();
		this.getFireAnimationDetails();
		this.getUnitExplosionDetails();

		$("#combatlogWrapper").show();
		setFPS(40);
		window.then = Date.now();
		window.startTime = then;
		
		fxCtx.clearRect(0, 0, res.x, res.y);
		ctx.clearRect(0, 0, res.x, res.y);

		this.animateFire = true;
		this.drawShips();
		this.animateFireOrders();
	}

	this.resetImageData = function(){
		for (var i = 0; i < this.ships.length; i++){
			 if (!this.ships[i].ship){this.ships[i].setPreFireImage();}
		}
		for (var i = 0; i < this.ships.length; i++){
			 if (this.ships[i].ship){this.ships[i].setEscortImage();}
		}
	}

	this.getResolvingFireOrders= function(){
		this.fireOrders = [];
		for (var i = 0; i < this.ships.length; i++){
			for (var j = 0; j < this.ships[i].structures.length; j++){
				for (var k = 0; k < this.ships[i].structures[j].systems.length; k++){
					if (this.ships[i].structures[j].systems[k].launcher || this.ships[i].structures[j].systems[k].hangar){continue;}
					for (var l = 0; l < this.ships[i].structures[j].systems[k].fireOrders.length; l++){
						if (this.ships[i].structures[j].systems[k].fireOrders[l].turn == this.turn){
							this.fireOrders.push(this.ships[i].structures[j].systems[k].fireOrders[l]);
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
			this.fireOrders[i].weapon = this.fireOrders[i].shooter.getSystemById(this.fireOrders[i].weaponid).getActiveSystem();
			//this.fireOrders[i].hits = [this.fireOrders[i].hits];
			this.fireOrders[i].damages = this.fireOrders[i].target.getDamageEntriesByFireId(this.fireOrders[i]);
			this.fireOrders[i].systems.push(this.fireOrders[i].weaponid);
		}

		for (var i = 0; i < this.fireOrders.length; i++){
			if (this.fireOrders[i].guns){
				for (var j = i+1; j < this.fireOrders.length; j++){
					if (this.fireOrders[j].guns){
						if (this.fireOrders[i].shooterid == this.fireOrders[j].shooterid){
							if (this.fireOrders[i].targetid == this.fireOrders[j].targetid){
								if (this.fireOrders[i].weapon.name == this.fireOrders[j].weapon.name){
									this.fireOrders[i].guns += this.fireOrders[j].guns;
									this.fireOrders[i].systems.push(this.fireOrders[j].weaponid);
									for (var k = 0; k < this.fireOrders[j].damages.length; k++){
										this.fireOrders[i].damages.push(this.fireOrders[j].damages[k])
									}
									this.fireOrders[i].hits.push(this.fireOrders[j].hits[0]);
									this.fireOrders[j].guns = 0;

									this.fireOrders[i].req.push(this.fireOrders[j].req[0]);

									/*
									if (this.fireOrders[j].req > this.fireOrders[i].max){
										this.fireOrders[i].max = this.fireOrders[j].req;
									}
									else if (this.fireOrders[j].req != -1 && this.fireOrders[j].req < this.fireOrders[i].min){
										this.fireOrders[i].min = this.fireOrders[j].req;
									}
									*/

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
				this.fireOrders[i].type = "Regular";
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
				//this.fireOrders[i].focus = {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2}
				//this.fireOrders[i].focus = {x: b.x, y: b.y}
			}
		}

		/*for (var i = 0; i < this.fireOrders.length; i++){
			if (this.fireOrders[i].shooter.flight){
				var j = 1;
				while (this.fireOrders[i].hits[0] > 1){
					this.fireOrders[i].hits[0+j] = 1;
					this.fireOrders[i].hits[0]--;
					j++;
				}
			}
		}*/
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
				//a.shooter.flight - b.target.ship ||
				a.shooter.salvo - b.shooter.salvo ||
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

	this.getUnitExplosionDetails = function(){
		window.animations = [];

		for (var i = 0; i < game.ships.length; i++){
			if (!game.ships[i].deployed){continue;}

			var color = "#ff3d00";
			if (game.ships[i].friendly){
				color = "#27e627";
			}

			var anim = {
				anims: [],
				done: 0,
				animating: 0,
				id: game.ships[i].id,
				html: ""
			}

			var base = game.ships[i].getPlannedPos();

			if (!game.ships[i].ship){
				var counter = 0;
				var rota = game.ships[i].getDrawFacing()+90;
				for (var j = 0; j < game.ships[i].structures.length; j++){
					if (game.ships[i].structures[j].isDestroyedThisTurn()){
						counter++;

						var pos = rotate(0, 0,game.ships[i].structures[j].layout, rota);
						anim.anims.push({
							a: game.ships[i].facing+90,
							t: [0-30*anim.anims.length, 70],
							s: game.ships[i].getExplosionSize(j),
							x: base.x + pos.x,
							y: base.y + pos.y
						})
					}
				}
				anim.html += "A total of <font color='" + color + "'>" + counter + "</font> elements from <font color='" + color + "'>Unit #" + anim.id + "</font> were destroyed or disengaged";
			}
			else if (game.ships[i].ship && game.ships[i].isDestroyedThisTurn()){
				anim.html += "<font color='" + type + "'>Unit #" + anim.id + "</font> ";
				if (game.ships[i].getSystemByName("Reactor").destroyed){
					anim.html +=  " suffered critical reactor damage and was destroyed.";
				}
				else anim.html +=  " suffered catastrophic hull damage and was destroyed.";
				anim.anims.push({
					a: game.ships[i].facing,
					t: [0, 100],
					s: game.ships[i].getExplosionSize(0),
					x: base.x,
					y: base.y
				})
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
				if (!game.fireOrders[i].animated){
					if (!game.fireOrders[i].animating){
						game.fireOrders[i].animating = 1;
						//cam.setFocus(game.fireOrders[i].focus.x, game.fireOrders[i].focus.y);
						cam.setFireFocus(game.fireOrders[i]);
						//cam.setFocusToPos(game.fireOrders[i].target);
						game.draw();
					}
					else {
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
								else if (game.fireOrders[i].weapon.animation == "explo"){
									if (game.fireOrders[i].anim[j][k].n < game.fireOrders[i].anim[j][k].m){ // still to animate
										game.fireOrders[i].anim[j][k].n += 1;
										if (game.fireOrders[i].anim[j][k].n > 0){ // t valid, now animate
											drawExplosion(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k], 30); // EXPLO
											if (game.fireOrders[i].anim[j][k].n >= game.fireOrders[i].anim[j][k].m){
												game.fireOrders[i].anim[j][k].done = true;
											}
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
				game.animateUnitExplosions();
			}
		}
	}

	this.animateUnitExplosions = function(){
		anim = window.requestAnimationFrame(game.animateUnitExplosions.bind(this));
		window.now = Date.now();		
		window.elapsed = window.now - window.then;
		if (elapsed > window.fpsInterval){
			window.then = window.now - (window.elapsed % window.fpsInterval);
			fxCtx.clearRect(0, 0, res.x, res.y);

			var allDone = 1;
			for (var i = 0; i < window.animations.length; i++){
				if (!window.animations[i].done){
					if (!window.animations[i].animating){
						window,animations[i].animating = 1;
						cam.setFocusToPos(game.getUnitById(window.animations[i].id).getPlannedPos());
						game.redraw();
					}

					var done = 1;

					for (var j = 0; j < window.animations[i].anims.length; j++){
						if (window.animations[i].anims[j].t[0] < window.animations[i].anims[j].t[1]){
							window.animations[i].anims[j].t[0]++;
							done = 0;
						}

						if (window.animations[i].anims[j].t[0] > 0){
							drawUnitExplosion(
								window.animations[i].anims[j].x,
								window.animations[i].anims[j].y,
								window.animations[i].anims[j].s,
								window.animations[i].anims[j].t[0],
								window.animations[i].anims[j].t[1]
							)
						}
					}

					if (!done){
						allDone = 0;
						break;
					}
					else {
						window.animations[i].done = 1;
						window.animations[i].animating = 0;
						game.createMiscLogEntry(i);
					}
				}
			}


			if (allDone){
				window.cancelAnimationFrame(anim);
				fxCtx.clearRect(0, 0, res.x, res.y);
				game.fireResolved();
			}
		}
	}

	this.createMiscLogEntry = function(i){
		$("#combatLog").find("tbody").append(
			$("<tr>")
				.append($("<td>").attr("colSpan", 9).css("font-size", 14).html(window.animations[i].html))
				.data("shipid", window.animations[i].id)
				.hover(function(){
					var data = $(this).data();
					game.getUnitById($(this).data("shipid")).doHighlight()
				}));
	}

	this.createFlightDeployEntries = function(){

		var color = "#ff3d00";
		var html = "";

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].available == game.turn){
				if (this.ships[i].flight){
					if (this.ships[i].friendly){
						color = "#27e627";
					}
					html = "<span><font color='" + color + "'>Flight #" + this.ships[i].id + "</font> was deployed</span>";

					$("#combatLog").find("tbody").append($("<tr>")
						.append($("<td>").html(html))
						.data("shipid", this.ships[i].id)
						.hover(
							function(){
							var data = $(this).data();
							game.getUnitById($(this).data("shipid")).doHighlight()
							},
							function(){
								var data = $(this).data();
								game.getUnitById($(this).data("shipid")).highlight = 0;
								game.redraw();
							}
						));
				}
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
		//var rolls = fire.rolls.slice();
		var req = fire.req.slice();
		
		if (fire.shooter.salvo){
			shots = fire.shooter.getShots();
			hits = fire.hits.reduce((a, b) => a+b, 0);
		}
		else {
			for (var i = 0; i < fire.guns; i++){
				shots += fire.weapon.getShots();
				hits += fire.hits[i];
			}
		}

		for (var i = 0; i < fire.damages.length; i++){
			armour += fire.damages[i].armourDmg;
			struct += fire.damages[i].overkill;

			if (fire.damages[i].systemid == -1){
				struct += fire.damages[i].structDmg;
			} else system += fire.damages[i].structDmg;
		}

		//rolls.sort(function(a, b){return a-b});
		req.sort(function(a, b){return a-b});


		var chance = req[0];
		if (req.length > 1 && req[0] != req[req.length-1]){
			chance = req[0] + " - " + req[req.length-1] + " %";
		} else chance + " %";


		var tr = document.createElement("tr");

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
			tr.insertCell(-1).innerHTML = system ? system : "";
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
		var s = 35;

		this.ships.sort(function(a, b){
			return a.userid - b.userid || b.cost- a.cost
		});
	
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].isReady()){
				var name = "friendly";
				if (this.ships[i].userid != game.userid){
					name = "hostile";
				}
				l++;

				if (this.ships[i].ship){
					className = "rotate270 size" + s;
				} else className = "size" + s;

				ele.append(
				($(this.ships[i].getBaseImage().cloneNode(true))
					.data("id", this.ships[i].id))
					.addClass(className)
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
							if (ship && vessel){
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
					.hover(
						function(e){
							var vessel = game.getUnitById($(this).data("id"));
								vessel.doHighlight();
							if (vessel.highlight){game.handleHoverEvent(vessel);}						
							if (aUnit && aUnit != vessel.id){
								var	ship = game.getUnitById(aUnit);
								if (ship.salvo){return;}
								var shipLoc = ship.getPlannedPos();
								var facing = ship.getPlannedFacing();
								if (ship.hasWeaponsSelected()){
									if (ship.id != vessel.id){
										handleWeaponAimEvent(ship, vessel, e);
									}// else $("#weaponAimTableWrapper").hide();
								}
							} else {
								game.target = 0;
								$("#weaponAimTableWrapper").hide();
							}
						},
						function(e){
							var vessel = game.getUnitById($(this).data("id"));
								vessel.doHighlight();
							game.resetHover();
						}
					)
				)
			}
		}

		if (l){
			var w = l*(s+3*2);

			ele.width(Math.min(600, w)).css("top", 0).css("left", 300)//.drag();
		} else ele.hide();
	}
}




Game.prototype.posIsOccupied = function(ship, pos){
	var dist = getDistance(ship, step) 
	if (ship.getRemainingImpulse()){return false;}
	if (ship.ship){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].ship && this.ships[i].id != ship.id && this.ships[i].userid == ship.userid){ // different ship, different owners
				var step = this.ships[i].getPlannedPos();

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
				var step = this.ships[i].getPlannedPos();

				if ((this.ships[i].ship || !step.resolved) && getDistance(pos, step) <= 0.66*(this.ships[i].size/2 + ship.size/2)){
				popup("The selected position is too close to the position or planned position of a vessel (#"+this.ships[i].id+" - " + this.ships[i].name +")");
					return true;
				}
			}
		}
	}
	return false;
}

Game.prototype.getUnitByClick = function(pos){
	var pick = 0;
	var max = 100;

	for (var i = 0; i < this.ships.length; i++){
		var r = this.ships[i].size/3;
		if (! this.ships[i].destroyed){
			if (this.ships[i].isReady()){
				var shipPos = this.ships[i].getBaseOffsetPos();
				if (pos.x < shipPos.x + r && pos.x > shipPos.x - r){
					if (pos.y > shipPos.y - r && pos.y < shipPos.y + r){
						var dist = getDistance(shipPos, pos);
						if (dist < max){
							pick = this.ships[i].id;
						}
					}
				}
			}
		}
	}
	//return false;

	if (!pick){
		return false;
	}
	return this.getUnitById(pick).getParent();

	//					return this.ships[i].getParent();
}