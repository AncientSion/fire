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
	this.drawingEvents = 1;
	this.mission;
	this.timeout = 0;
	this.canConfirm = 1;
	this.drawCircle = 1;
	this.events = [];
	this.arcRange = 1200;
	window.username = data.username;

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

	this.getMissionTypeString = function(origin, target){
		if (!target){return "PATROL";}
		else if (origin.userid == target.userid){
			if (target.flight){return "ESCORT";}
			else if (target.ship || target.squad){return "ESCORT";}
		}
		else {
			if (target.flight){return "INTERCEPT";}
			else if (target.ship || target.squad){return "STRIKE";}
		}

		return "ERROR";


		switch (val){
			case 1: return "PATROL";
			case 2: return "STRIKE / ESCORT";
			default: return "ERROR";
		}
	}

	this.getMissionTargetString = function(mission){
		if (mission.targetid){
			var t = game.getUnit(mission.targetid);
			return t.name + " #" + t.id;
		}
		else return "";
	}

	this.enableFlightDeployment = function(){
		this.flightDeploy = this.getUnit(aUnit).getSystem($("#hangarLoadoutDiv").data("systemid"));
		//var mission = this.getMissionTypeString(this.flightDeploy.mission);

		instruct("Please select the offensive or defensive target for the flight");
		$("#deployOverlay").find("#deployType").html("Select target</span>");
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
			dest = pos;		
			valid = true;
		}
		else if (this.shortInfo){
			t = this.getUnit(this.shortInfo);
			if (!t.salvo){
				valid = true;
				dest = t.getPlannedPos();
			}
		}

		if (!valid){
			return false;
		}

		var s = this.getUnit(aUnit);
		var o = s.getPlannedPos();
		var a = getAngleFromTo(o, dest);
		var mission;
		var	p = s.getPlannedPos();
		var doOffset = 0;

		if (s.cc.length){
			s.doDraw = 1;
			for (var i = s.cc.length-1; i >= 0; i--){
				var attach = this.getUnit(s.cc[i]);
				if ( (attach.flight || attach.salvo) && attach.mission.targetid == s.id && t.id == attach.id){attach.doDraw = 1;} // skip CC targeting this
				if ( (attach.flight || attach.salvo) && attach.mission.targetid == s.id){continue;} // skip CC targeting this
				attach.detachFlight(s.id);
				s.cc.splice(i, 1);
			}
		}

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].id == s.id || !this.ships[i].doDraw || this.ships[i].flight || this.ships[i].salvo){continue;}
			var shipPos = this.ships[i].getDrawPos();
			if (s.x == shipPos.x && s.y && shipPos.y){
				doOffset = 1;
			}
		}

		if (t.id == s.oldMission.targetid){
			mission = s.oldMission;
		}
		else {
			mission = {id: -1, unitid: s.id, turn: this.turn, type: this.mission.new, targetid: t.id || 0, x: dest.x, y: dest.y, arrived: 0, new: 1};
			if (doOffset){
				p = getPointInDir(s.size/3, a, o.x, o.y);
				for (var i = s.cc.length-1; i >= 0; i--){
					var attach = this.getUnit(s.cc[i]);
						attach.drawX = p.x;
						attach.drawY = p.y;
						attach.getAttachDivs();
				}
			}
		}
		s.mission = mission;

		$(s.element).find(".header")
			.find(".missionType").html(this.getMissionTypeString(s, s.getTarget())).end()
			.find(".missionTarget").html(this.getMissionTargetString(mission)).end()
			.find(".missionTurn").html("Turn " + mission.turn).end();


		if (t && t instanceof Ship && o.x == dest.x && o.y == dest.y){
			mission.arrived = this.turn-1;
			if (t.ship){
				s.doDraw = 0;
			}
			var p = t.getParent();
			if (p.id != s.id){
				p.attachFlight(s);
				p.setSupportImage(s);
			}
		}
		else {
			//s.mission = mission;
			s.facing = a;
			s.setSpeed();
			s.setTarget();
		}

		s.setLayout();
		s.setSize();
		s.resetImage();
		s.drawX = p.x;
		s.drawY = p.y;
		s.setSupportImage();
		s.getAttachDivs();
		s.disableMissionMode();
		this.updateSingleIntercept(s);
		this.redraw();
		//this.drawShipOverlays();
		$("#deployOverlay").hide();
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
			t = this.getUnit(this.shortInfo);
			 //(t && (t.ship || (!t.friendly && t.flight))){
			if (t && (!t.salvo)){
				valid = true;
				dest = t.getPlannedPos();
			}
		}

		if (!valid){
			return false;
		}

		var s = this.getUnit(aUnit);
		var hangar = s.getSystem(this.flightDeploy.id)
		var o = s.getPlannedPos();
		var facing = getAngleFromTo(o, dest);
		var p = getPointInDir(s.size/2, facing, o.x, o.y);
		var mission = {id: -1, unitid: -this.ships.length-20, turn: this.turn, type: this.flightDeploy.mission, targetid: t.id || 0, x: dest.x, y: dest.y, arrived: 0, new: 1};

		var immediate = 0;

		if (t.id == aUnit || t.id < 0 && t.flight && t.launchData.shipid == aUnit){
			immediate = 1;
		}

		if (immediate){
			p = dest;
			mission.arrived = 1 //this.turn;
		}

		var flight = new Flight(
			{id: -this.ships.length-20, name: "Flight", mission: mission,
			x: p.x, y: p.y, mass: 0, facing: facing, ep: 0, baseImpulse: 0, currentImpulse: 0, fSize: 15, baseSize: 25, unitSize: 4, userid: this.userid, available: this.turn}
		);

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
				var f = new Fighter(
					{
						id: j, name: this.flightDeploy.loads[i].name, ep: 0, mass: this.flightDeploy.loads[i].mass, integrity: this.flightDeploy.loads[i].integrity,
						remaining: this.flightDeploy.loads[i].integrity, value: 0, negation: 0, crits: 0, destroyed: 0, damages: [], crits: [], systems: []
					}
				)

				f.baseHitChance = 0;
				flight.structures.push(f);
			}
		}

		flight.setUnitState();
		flight.isReady = 1;
		flight.create();
		flight.setTarget();
		flight.setLayout();
		flight.setSize();
		flight.setDrawData();
		flight.setPreMovePosition();
		flight.setPreMoveImage();
		flight.createBaseDiv();
		this.ships.push(flight);

		this.hideInstruct();
		$("#deployOverlay").hide();
		hangar.setFireOrder(t.id, pos).select();
		this.flightDeploy = false;
		//flight.disableMissionMode();

		$(flight.element).css("top", 600).css("left", 0);

		if (immediate){
			this.getUnit(t.id).attachFlight(flight);
			this.getUnit(t.id).setSupportImage();
		}

		this.checkDoubleLaunch();
		this.draw();
	}

	this.checkDoubleLaunch = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].flight){
				for (var j = i+1; j < this.ships.length; j++){
					if (this.ships[j].flight){
						if (this.ships[i].doDraw && this.ships[j].doDraw){
							var aPos = this.ships[i].getDrawPos();
							var bPos = this.ships[j].getDrawPos();

							if (aPos.x == bPos.x && aPos.y == bPos.y){
								this.ships[i].doRandomOffset();
								this.ships[j].doRandomOffset();
							}
						}
					}
				}
			}
		}
	}

	this.updateSingleIntercept = function(update){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].ship || this.ships[i].squad){continue;}
			if (this.ships[i].mission.targetid == update.id){
				this.ships[i].setTarget();
			}
		}
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
						clientId: this.ships[i].id,
						serverId: 0,
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
			if (this.ships[i].flight || this.ships[i].salvo || this.ships[i].userid != this.userid){continue;}

			var sensor = this.ships[i].getSystemByName("Sensor");
			for (var j = 0; j < sensor.ew.length; j++){
				if (sensor.ew[j].turn == this.turn){
					ret.push(sensor.ew[j]);
					break;
				}
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
			if (this.ships[i].flight || this.ships[i].salvo || this.ships[i].userid != this.userid){continue;}

			if (this.ships[i].hasInvalidPower()){
				popup("You have units with invalid Reactor settings (#" + this.ships[i].id + ")"); 
				this.ships[i].select();
				return true;
			}
		}
		return false;
	}

	this.hasBasicEW = function(){
		var data = [];

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].flight || this.ships[i].salvo || this.ships[i].userid != this.userid){continue;}
			if (this.ships[i].available > game.turn){continue;}
			
			if (this.ships[i].hasBasicEW()){
				data.push(this.ships[i]);
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
				if (this.ships[i].getRemainingImpulse() > 0){
					if (aUnit){
						this.getUnit(aUnit).doUnselect();
					}
					popup("You have units with unused Impulse (#" + this.ships[i].id + ")");
					this.ships[i].doHover();
					this.ships[i].select();
					return true;
				}
			}
		}
		return false;
	}
	
	this.hasNoFires = function(){
		var data = [];

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].userid == this.userid){
				var hasNoFire = this.ships[i].hasNoFireOrders();

				if (hasNoFire){
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
		if (!this.canConfirm){return;}
		this.canConfirm = 0;
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
			game.getUnit(aUnit).doUnselect();
		}
		var ship = game.getUnit(id);
			ship.doHover();
			ship.doSelect();
	}

	this.endPhase = function(){
		if (this.canSubmit){
			if (aUnit){game.getUnit(aUnit).select();}
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

	this.disableDeployment = function(){
		if (aUnit){game.getUnit(aUnit).select();}
		this.deploying = false;
		this.deployArea = [];
		this.deployBlock = false;
		moveCtx.clearRect(0, 0, res.x, res.y);
		planCtx.clearRect(0, 0, res.x, res.y);
		mouseCtx.clearRect(0, 0, res.x, res.y);
		$("#deployOverlay").hide();
		//if (aUnit){game.getUnit(aUnit).doUnselect();}
		game.draw();
	}

	this.enableDeployment = function(id){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].id == id){
				this.deploying = id;
				this.setupDeploymentDiv(this.ships[i])
				this.setupDeploymentZone();
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
				this.setupDeploymentZone();
				this.drawDeploymentZone();
				return;
			}
		}
	}

	this.setupDeploymentDiv = function(unit){
		var ele = ("#deployOverlay");
		if (game.flightDeploy){
			$(ele).find("span").html("Deploy Flight").end().find(".img").html("");
		}
		else if (game.deploying){
			var img = unit.getDeployImg();
			$(ele).find("span").html("Deploy Ship").end().find(".img").html("").append($(img).addClass("img80"));
		}
	}

	this.setupDeploymentZone = function(){

		if (game.turn == 1){
			for (var i = 0; i < window.playerstatus.length; i++){

				var step;
				var h = 1000;
				var w = 200;
				var x = 500;
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
				x: 0,
				y: 0,
				s: 750,
				c: "green"
			});
		}
	}

	this.drawDeploymentZone = function(){
		if (game.turn == 1){
			for (var i = 0; i < this.deployArea.length; i++){
				drawCtx.translate(cam.o.x, cam.o.y)
				drawCtx.scale(cam.z, cam.z)
				drawCtx.beginPath();
				drawCtx.rect(this.deployArea[i].x, this.deployArea[i].y, this.deployArea[i].w, this.deployArea[i].h);
				drawCtx.fillStyle = this.deployArea[i].c;
				drawCtx.fill();
				drawCtx.setTransform(1,0,0,1,0,0);
			}
		}
		else {
			for (var i = 0; i < this.deployArea.length; i++){
				drawCtx.translate(cam.o.x, cam.o.y)
				drawCtx.scale(cam.z, cam.z)
				drawCtx.beginPath();
				drawCtx.arc(this.deployArea[i].x, this.deployArea[i].y, this.deployArea[i].s, 0, 2*Math.PI);
				drawCtx.fillStyle = this.deployArea[i].c;
				drawCtx.fill();
				drawCtx.setTransform(1,0,0,1,0,0);
			};
		}

		planCtx.clearRect(0, 0, res.x, res.y);
		planCtx.globalAlpha = 0.3;
		planCtx.drawImage(drawCanvas, 0, 0);
		drawCtx.clearRect(0, 0, res.x, res.y);

		return;


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
				if (this.deploys[i].userid == this.userid){drawCtx.fillStyle = "green";}
				else drawCtx.fillStyle = "red";
				drawCtx.fill();
				drawCtx.setTransform(1,0,0,1,0,0);
			};
		}

		planCtx.clearRect(0, 0, res.x, res.y);
		planCtx.globalAlpha = 0.3;
		planCtx.drawImage(drawCanvas, 0, 0);
		drawCtx.clearRect(0, 0, res.x, res.y);
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

	this.initDeployment = function(){
		cam.setZoom(0.6);
		this.draw();
		$("#deployWrapper").removeClass("disabled");

		if (game.turn == 1){return;}
		$("#combatlogWrapper")
			.width(350)
			.css("top", 75).css("left", 250)
			.show()
			.find(".combatLogHeader").html("Tactical Log").end()
			.find("#combatLog").children().children().remove();
			
		this.resolveDamageControl();
	}

	this.endMoveSubPhase = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].flight && this.animFlight || this.ships[i].salvo && this.animSalvo){
				this.ships[i].setPostMovePosition();
				this.ships[i].setPostMoveFacing();

				if (this.ships[i].mission.arrived){
					this.ships[i].setPostMoveSize();
					this.ships[i].setPostMoveImage();
				}
			} else if ((this.ships[i].ship || this.ships[i].squad) && this.animShip){
				this.ships[i].setPostMovePosition();
				this.ships[i].setPostMoveFacing();
			}
		}
	}

	this.movementAnimationFinished = function(){
		console.log("movementAnimationFinished");

		if (this.events.length){
			console.log(game.events);
			this.resolvePostMoveFire();
		}
		else this.movementResolved();
	}

	this.movementResolved = function(){	
		console.log("movementResolved");	
		game.setlastPosCC()

		var table = $("#combatLog").find("tbody");

		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].setSupportImage();
			this.ships[i].getAttachDivs();
		}

		$(table)
			.append($("<tr>")
				.append($("<td>").html("Movement Resolution concluded."))
			);

		salvoCtx.clearRect(0, 0, res.x, res.y);
		this.draw();
	}

	this.initDamageControl = function(){		
		this.resolveFire();
	}

	this.fireResolved = function(){
		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].setPostFireImage();
			this.ships[i].setSize();
		}
		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].setSupportImage();
		}
		this.animating = 0;
		if (game.phase == 2){game.drawingEvents = 1;}
		this.draw();
		
		$(fxCanvas).css("opacity", 0.25);


		console.log("fireResolved");
	}
	
	this.initPhase = function(n){
		this.setShipDivs();
		//$(fxCanvas).css("opacity", 0.3);

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
				//$(fxCanvas).css("opacity", 1);
					game.initDamageControl();
					$(this).hide()
					//$(this).fadeOut(200);
				});
			
		}
	}
	
	this.create = function(){
		$("#phaseSwitchDiv").show();
		//console.log("game.create");

		//this.ships.sort(function(a, b){
			//return a.ship-b.ship || a.flight - b.flight || a.salvo - b.salvo;
		//	return a.salvo - b.salvo || a.flight - b.flight || a.ship-b.ship ;
		//})

		for (var i = 0; i < this.ships.length; i++){
			var ship = window.initiateUnit(this.ships[i]);
				ship.setUnitState();

			this.ships[i] = ship;
			this.ships[i].create();
		}

		this.setCC();

		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].setTarget();
			this.ships[i].setLayout();
			this.ships[i].setSize();
			this.ships[i].setDrawData();
		}

		this.setDrawOffset();

		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].setImage();
			this.ships[i].createBaseDiv();
			if (game.turn == 1 && game.phase == -1){continue;}
			this.ships[i].getAttachDivs();
			this.ships[i].setSupportImage();
		}

		if (game.turn == 1 && game.phase == -1){this.setInitialFacing(this.ships);}
		this.setInitialFacing(this.reinforcements);

		for (var i = 0; i < this.reinforcements.length; i++){
			this.reinforcements[i] = window.initiateUnit(this.reinforcements[i]);
			this.reinforcements[i].setLayout();
			this.reinforcements[i].setImage();
			this.reinforcements[i].createBaseDiv();
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
		this.initEvents();
		this.canSubmit = canSubmit;
		cam.setFocus(0, 0);
		this.initPhase(this.phase);
	}

	this.setInitialFacing = function(units){
		for (var i = 0; i < units.length; i++){
			for (var j = 0; j < playerstatus.length; j++){
				if (playerstatus[j].userid == this.userid){
					units[i].drawFacing = 0 + (180 * (j % 2 % 2)); 
					break;
				}
			}
		}	
	}

	this.initEvents = function(){
		for (var i = 0; i < this.ships.length; i++){
			this.events = this.events.concat(this.ships[i].getEvents());
		}
	}

	this.addEvent = function(system){
		system.initEvent();
		this.events.push(system);
		game.redraw();
	}

	this.removeEvent = function(system){
		for (var i = this.events.length-1; i >= 0; i--){
			if (this.events[i].id == system.id && this.events[i].parentId == system.parentId){
				this.events.splice(i, 1);
				game.redraw();
				return;
			}
		}
	}

	this.setDrawOffset = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].flight){
				var doOffset = 0;
				var a = this.ships[i].getPlannedPos();

				for (var j = 0; j < this.ships.length; j++){
					if (this.ships[i].id == this.ships[j].id){continue;}
					var b = this.ships[j].getPlannedPos();
					if (a.x == b.x && a.y == b.y){
						doOffset = 1;
						//console.log (this.ships[i].id + " / " + this.ships[j].id);
						for (var k = 0; k < this.ships[j].cc.length; k++){
							if (this.ships[j].cc[k] == this.ships[i].id){
								doOffset = 0; break;
							}
						}
					}
				}
				if (doOffset){this.ships[i].doOffset();}
			}
		}
	}

	this.setCC = function(){
		if (this.turn == 1 && this.phase == -1){return;}

		if (this.phase == -1 || this.phase > 2){
		 	this.setlastPosCC();
		}
		else if (this.phase == 0){
			this.setPostDeployCC();
		}
		else if (this.phase == 2){
			this.setPreMoveCC();
		}
	}


	this.setPreMoveCC = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (!this.ships[i].ship && !this.ships[i].squad){continue;}

			for (var j = 0; j < this.ships.length; j++){
				if (this.ships[j].ship || this.ships[j].squad){continue;}

				if (this.ships[j].mission.targetid == this.ships[i].id && this.ships[j].mission.arrived && this.ships[j].mission.arrived < game.turn){
					this.ships[i].cc.push(this.ships[j].id);
					this.ships[j].cc.push(this.ships[i].id);
				}
			}
		}

		for (var i = 0; i < this.ships.length; i++){
			if (!this.ships[i].ship && !this.ships[i].squad){continue;}
			if (!this.ships[i].cc.length){continue;}

			for (var j = 0; j < this.ships[i].cc.length; j++){

				for (var k = 0; k < this.ships.length; k++){
					if (this.ships[k].ship || this.ships[k].squad){continue;}

					if (this.ships[k].mission.targetid == this.ships[i].cc[j] && this.ships[k].mission.arrived && this.ships[k].mission.arrived < game.turn){
						this.ships[i].cc.push(this.ships[k].id);
						this.ships[k].cc.push(this.ships[i].id);
					}
				}
			}
		}

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].ship || this.ships[i].squad){continue;}
			if (this.ships[i].cc.length){continue;}

			for (var j = 0; j < this.ships.length; j++){
				if (this.ships[j].ship || this.ships[j].squad){continue;}
				if (this.ships[j].cc.length){continue;}

				if (this.ships[j].mission.targetid == this.ships[i].id && this.ships[j].mission.arrived && this.ships[j].mission.arrived < game.turn){
					this.ships[i].cc.push(this.ships[j].id);
					this.ships[j].cc.push(this.ships[i].id);
				}
			}
		}
	}
	
	this.setPostDeployCC = function(){

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].flight){
				if (this.ships[i].mission.arrived && this.ships[i].mission.type == 2){
					var t = this.getUnit(this.ships[i].mission.targetid);
						t.cc.push(this.ships[i].id);
						this.ships[i].cc.push(t.id);
				}
			}
		}


		for (var i = 0; i < this.ships.length; i++){
			for (var j = i+1; j < this.ships.length; j++){
				if (this.ships[i].cc.length){
					for (var k = 0; k < this.ships[i].cc.length; k++){
						if (this.ships[i].cc[k] == this.ships[j].id){
							this.ships[i].cc = [...new Set([...this.ships[i].cc ,...this.ships[j].cc])]
							this.ships[j].cc = [...new Set([...this.ships[j].cc ,...this.ships[i].cc])]
							break;
						}
					}
				}
			}
		}

		for (var i = 0; i < this.ships.length; i++){
			for (var j = this.ships[i].cc.length-1; j >= 0; j--){
				if (this.ships[i].cc[j] == this.ships[i].id){
					this.ships[i].cc.splice(j, 1);
				}
			}
		}
	}

	this.setlastPosCC = function(){
		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].cc = [];
		}

		for (var i = 0; i < this.ships.length; i++){
			var a = this.ships[i].getPlannedPos();
			//console.log("a: " + this.ships[i].id);
			for (var j = i+1; j < this.ships.length; j++){
				var b = this.ships[j].getPlannedPos();
				//console.log("b: " + this.ships[j].id);
				if (a.x == b.x && a.y == b.y){
					//if (this.ships[i].ship && !this.ships[j].ship && this.ships[j].mission.targetid != this.ships[i].id){continue;}
					this.ships[i].cc.push(this.ships[j].id);
					this.ships[j].cc.push(this.ships[i].id);
				}
			}
		}
	}

	this.getCCUnits = function(){

	}

	this.getUnitsTargetingThis = function(unit){
		var data =
				[
					[],
					[],
					[],
					[]
				];

		for (var i = 0; i < this.ships.length; i++){
			if (!this.ships[i].ship && this.ships[i].mission.arrived && this.ships[i].mission.targetid == unit.id){
				data[0].push({t: unit.id, o: this.ships[i].id, a: 1});
			}
		}

		for (var j = 0; j < data[0].length; j++){
			for (var i = 0; i < this.ships.length; i++){
				if (!this.ships[i].ship && this.ships[i].mission.arrived && this.ships[i].mission.targetid == data[0][j].o){
					data[1].push({t: data[0][j].o, o: this.ships[i].id, a: 1});
				}
			}
		}

		for (var j = 0; j < data[1].length; j++){
			for (var i = 0; i < this.ships.length; i++){
				if (!this.ships[i].ship && this.ships[i].mission.arrived && this.ships[i].mission.targetid == data[1][j].o){
					data[2].push({t: data[1][j].o, o: this.ships[i].id, a: 1});
				}
			}
		}

		for (var j = 0; j < data[2].length; j++){
			for (var i = 0; i < this.ships.length; i++){
				if (!this.ships[i].ship && this.ships[i].mission.arrived && this.ships[i].mission.targetid == data[2][j].o){
					data[3].push({t: data[2][j].o, o: this.ships[i].id});
				}
			}
		}
	}

	this.updateIntercepts = function(targetId){
		var stack = [];
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].ship || this.ships[i].squad){continue;}
			if (this.ships[i].mission.type == 2 || this.ships[i].mission.type == 3){
				if (this.ships[i].mission.targetid == targetId){
					stack.push(this.ships[i]);
				}
			}
		}

		for (var i = 0; i < stack.length; i++){
			for (var j = 0; j < this.ships.length; j++){
				if (this.ships[j].ship || this.ships[j].squad){continue;}
				if (this.ships[j].mission.type == 2 || this.ships[j].mission.type == 3){
					if (this.ships[j].mission.targetid == stack[i].id){
						stack.push(this.ships[j]);
					}
				}
			}
		}

		for (var i = 0; i < stack.length; i++){
			stack[i].setTarget();
			if (stack[i].mission.arrived){continue;}
			stack[i].setImage();
		}

		if (stack.length){this.redraw();}
	}

	this.handleFireClick = function(pos, shooter, targetid){
		if (!shooter.hasWeaponsSelected()){return;}

		var active = shooter.getSelectedWeapons();
		var hostileUnit = 0;
		var target;

		if (targetid){target = this.getUnit(targetid);}
		else target = this.getUnitByClick(pos);

		if (target){targetid = target.id;}

		if (target && shooter.id != target.id && (target.userid != this.userid && target.userid != shooter.userid)){
			hostileUnit = 1;
		}

		if (shooter.flight && hostileUnit && !this.isCloseCombat(shooter, target)){return;}

		for (var i = 0; i < active.length; i++){
			if (active[i].hasValidTarget() && active[i].canFire()){
				if (active[i].freeAim == 0 && hostileUnit == 1 || active[i].freeAim == 1 && hostileUnit == 0){
					active[i].setFireOrder(targetid, pos);
				}
			}
		}

		$("#weaponAimTableWrapper").hide()
		shooter.highlightAllSelectedWeapons();
	}

	this.handleHoverEvent = function(e, onMap, unit){
		if (unit.id == this.shortInfo){return;}
		else if (this.shortInfo && this.shortInfo != unit.id){this.redraw();}

		this.shortInfo = unit.id;

		var ele = $("#shortInfo");
		$(ele).children().remove().end().append($(unit.getShortInfo()).css("width", "100%"));

		var oX = $(ele).width()/2;
		var pos;
		var top;
		var left;

		if (onMap){ 
			pos = unit.getDrawPos();
			left = (pos.x * cam.z) + cam.o.x - oX;
			top = (pos.y * cam.z) + cam.o.y + 60;
		}
		else {
			pos = {x: e.clientX, y: e.clientY};
			left = pos.x - oX;
			top = pos.y + 30;
		}

		$(ele).css("left", left).css("top", top).show();

		if (unit.id != aUnit){unit.doHover();}
	}

	this.resetHover = function(e, loc, facing, pos){
		$("#shortInfo").html("").hide();

		if (this.deploying){game.drawDeploymentZone();}

		if (aUnit != this.shortInfo){
			moveCtx.clearRect(0, 0, res.x, res.y);
			salvoCtx.clearRect(0, 0, res.x, res.y);
			this.drawEvents();
		}
		if (!aUnit){
			planCtx.clearRect(0, 0, res.x, res.y);
		}

		if (aUnit != this.shortInfo){
			var u = this.getUnit(aUnit);

			if (u.ship || u.squad){
				if (this.turnMode){u.handleTurning(e, loc, facing, pos);}
				else {
					u.drawEW();
				}
				
				u.setMoveTranslation();
				u.drawMoveArea();
				u.drawVectorIndicator();
				u.drawTurnArcs();
				u.resetMoveTranslation();
			}
		}
		this.shortInfo = false;
	}
	
	this.draw = function(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		this.drawShips();
		this.drawEvents();
		
		if (this.deploying){
			this.drawDeploymentZone();
		}
	}

	this.redraw = function(){
		planCtx.clearRect(0, 0, res.x, res.y);
		moveCtx.clearRect(0, 0, res.x, res.y)
		salvoCtx.clearRect(0, 0, res.x, res.y)
		mouseCtx.clearRect(0, 0, res.x, res.y)

		$("#shortInfo").hide();

		if (aUnit){
			var unit = this.getUnit(aUnit);
			if (!unit.salvo){
				if (unit.hasWeaponsSelected()){
					unit.highlightAllSelectedWeapons();
				}
				unit.resetMoveMode();

				if (unit.ship || unit.squad){
					unit.drawEW();
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
		this.draw();
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

	this.setUnitMovementFocus = function(){
		window.then = Date.now();
		window.startTime = then;
		cam.setZoom(1);
		setFPS(90);

		var minX = 0;
		var minY = 0;
		var maxX = 0;
		var maxY = 0;
		var amount = 0;

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].ship || this.ships[i].squad){
				minX = Math.min(minX, this.ships[i].x);
				maxX = Math.max(maxX, this.ships[i].x);
				minY = Math.min(minY, this.ships[i].y);
				maxY = Math.max(maxY, this.ships[i].y);
			}
		}

		var endX = (minX + maxX) / 2;
		var endY = (minY + maxY) / 2;

		var distX = maxX - minX;
		var distY = maxY - minY;

		if (distX > res.x){
			cam.setZoom(res.x/distX / 1.3);
		} else if (distY > res.y){
			cam.setZoom(res.y/distY / 1.3);
		}


		cam.setFocusToPos({x: endX, y: endY});

	}

	this.setUnitMovementDetails = function(){
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
				if (this.ships[i].ship || this.ships[i].squad){
					for (var j = 0; j < this.ships[i].cc.length; j++){
						var attach = this.getUnit(this.ships[i].cc[j]);
						if (attach.mission.arrived < game.turn){
							this.ships[i].attachAnims.push(attach);
						}
					}
				} else if (this.ships[i].flight){
					var attach = this.getUnit(this.ships[i].cc[j]);
					if (attach.salvo){
						this.ships[i].attachAnims.push(attach);
					}
				}
			}

			this.ships[i].animationSetupMove();

			if (this.ships[i].ship || this.ships[i].squad){
				frameMod = 1000 / window.fpsTicks / this.ships[i].getCurrentImpulse();
			} else frameMod = 1000 / window.fpsTicks / this.ships[i].actions[this.ships[i].actions.length-1].dist;
			//frameMod = 1;
			for (var j = 0; j < this.ships[i].actions.length; j++){
				if (this.ships[i].actions[j].turn == game.turn){
					var action = this.ships[i].actions[j];

					if (action.type == "speed" || action.type == "deploy" || action.type == "jumpIn"){
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
							else if (action.type == "turn"){this.ships[i].actions[j].angle = this.ships[i].actions[j].a;}
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
		if (elapsed < window.fpsTicks){}
		else {
			window.then = window.now - (window.elapsed % window.fpsTicks);
			ctx.clearRect(0, 0, res.x, res.y);
			fxCtx.clearRect(0, 0, res.x, res.y);
			salvoCtx.clearRect(0, 0, res.x, res.y);

			ctx.translate(cam.o.x, cam.o.y);
			ctx.scale(cam.z, cam.z);

			game.drawEvents();
		
			for (var i = 0; i < game.ships.length; i++){
				if (game.ships[i].deployed){
					if ((this.ships[i].ship || this.ships[i].squad) && !this.animShip || this.ships[i].flight && !this.animFlight || this.ships[i].salvo && !this.animSalvo){
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
									game.ships[i].actions[j].animated = true;
									game.ships[i].drawX = action.x;
									game.ships[i].drawY = action.y;
									if (game.ships[i].doesContinueRolling()){game.ships[i].createStillRollingEntry()}
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
							else if (action.type == "roll"){
								game.ships[i].actions[j].animated = true;
								game.ships[i].createActionEntry(action);
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
				else if ((this.ships[i].ship || this.ships[i].squad) && this.animShip || this.ships[i].flight && this.animFlight || this.ships[i].salvo && this.animSalvo){
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
				window.cancelAnimationFrame(anim);
				game.finishMoveSubPhase();
			}
		}
	}

	this.finishMoveSubPhase = function(){
		var time = 500;
		if (game.animShip){
			console.log("ship done -> flight moves");
			game.timeout = setTimeout(function(){
				game.animShip = 0; game.animFlight = 1;
				game.animateUnitMovement();
			}, time);
		}
		else if (game.animFlight){
			console.log("flight done -> salvo moves");
			game.timeout = setTimeout(function(){
				game.endMoveSubPhase();
				game.animFlight = 0; game.animSalvo = 1;
				game.animateUnitMovement();
			}, time);
		}
		else {
			game.endMoveSubPhase();
			game.animFlight = 0; game.animSalvo = 0;
			game.movementAnimationFinished();
		}
	}

	this.resolveDamageControl = function(){

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].status == "jumpOut"){
				this.ships[i].deployAnim = [0, 50];
			}
		}

		setFPS(30);
		window.then = Date.now();
		window.startTime = then;
		this.animating = 1;
		this.animateJumpOut();

	}

	this.animateJumpOut = function(){
		anim = window.requestAnimationFrame(game.animateJumpOut.bind(this));
		window.now = Date.now();		
		window.elapsed = window.now - window.then;

		if (elapsed > window.fpsTicks){

			var done = 1;
			var doing = 0;

			window.then = window.now - (window.elapsed % window.fpsTicks);

			ctx.clearRect(0, 0, res.x, res.y);		
			ctx.translate(cam.o.x, cam.o.y);
			ctx.scale(cam.z, cam.z);

			for (var i = 0; i < this.ships.length; i++){
				if (this.ships[i].deployAnim[1]){
					if (!this.ships[i].deployed){continue;}
					else if (doing){this.ships[i].draw(); continue;}
					else {
						this.ships[i].animateSelfJumpOut();
						doing = 1;
						done = 0;
					}
				}
				else this.ships[i].draw();

			}

			ctx.setTransform(1,0,0,1,0,0);


			if (done){
				window.cancelAnimationFrame(anim);
				game.animating = 0;
				this.createDeployStartEntries();
			}
		}
	}

	this.createDeployStartEntries = function(){
		var show = 0;
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].isRolling()){
				show = 1;
				this.ships[i].createMoveStartEntry();
			}
		}

		if (!show){
			$("#combatLog").show().find("tbody")
			.append($("<tr>")
				.append($("<td>").html("No futher data available."))
			);
		}
		else {
			$("#combatLog").show().find("tbody")
		}
	}
	this.resolvePostMoveFire = function(){
		console.log("resolvePostMoveFire");
		this.resetImageData();
		this.getAllResolvingFireOrders();
		this.getAreaShotDetails();
		this.getFireAnimationDetails();
		this.getUnitExplosionDetails();

		$("#combatlogWrapper").show();
		setFPS(40);
		window.then = Date.now();
		window.startTime = then;

		$(fxCanvas).css("opacity", 1);

		ctx.clearRect(0, 0, res.x, res.y);
		salvoCtx.clearRect(0, 0, res.x, res.y);
		fxCtx.clearRect(0, 0, res.x, res.y);

		this.drawingEvents = 0;
		this.animating = 1;
		this.drawShips();

		var timeout = setTimeout(function(){
			game.animateAllFireOrders()
		}, 500);
	}

	this.resolveFire = function(){
		console.log("resolveFire");
		this.resetImageData();
		this.getAllResolvingFireOrders();
		this.getShotDetails();
		this.getFireAnimationDetails();
		this.getUnitExplosionDetails();

		$("#combatlogWrapper").show();
		setFPS(40);
		window.then = Date.now();
		window.startTime = then;

		$(fxCanvas).css("opacity", 1);
		fxCtx.clearRect(0, 0, res.x, res.y);
		ctx.clearRect(0, 0, res.x, res.y);

		this.drawShips();
		this.animating = 1;
		this.animateAllFireOrders();
	}

	this.resetImageData = function(){
		console.log("resetImageData");
		for (var i = 0; i < this.ships.length; i++){
			 if (!this.ships[i].ship){this.ships[i].setPreFireImage();}
		}
		for (var i = 0; i < this.ships.length; i++){
			 if (!this.ships[i].salvo){this.ships[i].setSupportImage();}
		}
	}

	this.getAllResolvingFireOrders = function(){
		this.fireOrders = [];
		for (var i = 0; i < this.ships.length; i++){
			var fires = this.ships[i].getAllResolvingFireOrders();
			this.fireOrders = this.fireOrders.concat(fires);
		}
	}

	this.getAreaShotDetails = function(){
		for (var i = 0; i < this.fireOrders.length; i++){
			this.fireOrders[i].target = {name: "", id: ""};
			this.fireOrders[i].shooter = game.getUnit(this.fireOrders[i].shooterid);
			this.fireOrders[i].weapon = this.fireOrders[i].shooter.getSystem(this.fireOrders[i].weaponid).getActiveSystem();
			this.fireOrders[i].damages = this.getAreaDmgs(this.fireOrders[i]);
			this.fireOrders[i].systems.push(this.fireOrders[i].weaponid);

			var origin = this.fireOrders[i].shooter.getPlannedPos();			
			this.fireOrders[i].dist = getDistance({x: origin.x, y: origin.y},{x: this.fireOrders[i].rolls[0], y: this.fireOrders[i].rolls[1]});
		}
	}

	this.getAreaDmgs = function(fire){
		var impact = {x: fire.rolls[0], y: fire.rolls[1]};
		var dmgs = [];
		var hits = fire.hits.concat();
		for (var i = 0; i < fire.hits.length; i++){fire.hits[i] = 20;}
		for (var i = 0; i < this.ships.length; i++){
			var unitPos = this.ships[i].getPlannedPos();
			var dist = getDistance(impact, unitPos);
			var color = this.ships[i].getCodeColor();

			if (dist < fire.weapon.aoe){
				var subDmgs = this.ships[i].getDmgByFire(fire);
				for (var j = 0; j < subDmgs.length; j++){
					subDmgs[j].system = "<font color='" + color + "'>" +this.ships[i].display + " #" + this.ships[i].id + "</font>  /  " + subDmgs[j].system;
				}
				dmgs = dmgs.concat(subDmgs);
			}
		}
		fire.hits = hits;
		return dmgs;
	}

	this.getShotDetails = function(){
		for (var i = 0; i < this.fireOrders.length; i++){
			this.fireOrders[i].target = game.getUnit(this.fireOrders[i].targetid);
			this.fireOrders[i].shooter = game.getUnit(this.fireOrders[i].shooterid);
			this.fireOrders[i].weapon = this.fireOrders[i].shooter.getSystem(this.fireOrders[i].weaponid).getActiveSystem();
			this.fireOrders[i].damages = this.fireOrders[i].target.getDmgByFire(this.fireOrders[i]);
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

									for (var l = 0; l < this.fireOrders[j].rolls.length; l++){
										this.fireOrders[i].rolls.push(this.fireOrders[j].rolls[l]);
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
				this.fireOrders[i].type = "Regular";
			if (!this.fireOrders[i].guns){
				this.fireOrders.splice(i, 1);
				continue;
			}
			else {
				var a = this.fireOrders[i].shooter.getGamePos();
				var b = this.fireOrders[i].target.getGamePos();
				this.fireOrders[i].dist = getDistance(
					{
						x: a.x,
						y: a.y
					},
					{	x: b.x,
						y: b.y
					}
				);
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
				//a.shooter.flight - b.target.ship ||
				a.shooter.salvo - b.shooter.salvo ||
				a.shooter.flight - b.shooter.flight ||
				a.targetid - b.targetid ||
				a.weapon.priority - b.weapon.priority ||
				//a.id - b.id ||
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
						var real = game.ships[i].getUnitPosition(j);

						anim.anims.push({
							t: [0 - counter*20, 40],
							s: game.ships[i].getExplosionSize(j),
							x: base.x + real.x,
							y: base.y + real.y,
						});

						/*for (var k = 0; k < 5; k++){
							anim.anims.push({
								t: [0 - 30*anim.anims.length - j*20, 70],
								t: [0 - range(0, 15), 70],
								s: game.ships[i].getExplosionSize(j) + range(-30, 10),
								x: base.x + real.x + (range(-1, 1) * range(0, game.ships[i].size / 10)),
								y: base.y + real.y + (range(-1, 1) * range(0, game.ships[i].size / 10)),
							});
						}*/
					}
				}
				anim.html += "A total of <font color='" + color + "'>" + counter + "</font> elements from <font color='" + color + "'>Unit #" + anim.id + "</font> were destroyed or disengaged";
			}
			else if (game.ships[i].ship && game.ships[i].isDestroyedThisTurn()){
				anim.html += "<font color='" + color + "'>Unit #" + anim.id + "</font> ";
				if (game.ships[i].getSystemByName("Reactor").destroyed){
					anim.html +=  " suffered critical reactor damage and was destroyed.";
				}
				else anim.html +=  " suffered catastrophic hull damage and was destroyed.";

				for (var j = 0; j < 5; j++){
					anim.anims.push({
						t: [0 - j-20, 100],
						s: game.ships[i].getExplosionSize(0) + range(-30, 10),
						x: base.x + (range(-1, 1) * range(0, game.ships[i].size / 10)),
						y: base.y + (range(-1, 1) * range(0, game.ships[i].size / 10)),
					})
				}
			}
		
			if (anim.anims.length){
				animations.push(anim);
			}
		}
	}

	this.animateAllFireOrders = function(){
		//this.animateUnitExplosions(); return;
		for (var i = 0; i < this.fireOrders.length; i++){
			if (!this.fireOrders[i].animated){
				this.createCombatLogEntry(i);
				this.animateSingleFireOrder(i, 1);
				return;
			}
		}
		fxCtx.clearRect(0, 0, res.x, res.y);
		game.createFireFinalEntry();
		game.animateUnitExplosions();
	}

	this.createFireFinalEntry = function(){
		$("#combatLog")
		.find("tbody")
			.append($("<tr>")
				.append($("<td>").attr("colSpan", 9).html("Fire Order Resolution concluded")));

		$("#combatlogWrapper").find("#combatlogInnerWrapper").scrollTop(function(){return this.scrollHeight});
	}

	this.animateSingleFireOrder = function(i, goOn){
		anim = window.requestAnimationFrame(game.animateSingleFireOrder.bind(this, i, goOn));
		window.now = Date.now();		
		window.elapsed = window.now - window.then;
		if (elapsed <= window.fpsTicks){return;}

		window.then = window.now - (window.elapsed % window.fpsTicks);
		fxCtx.clearRect(0, 0, res.x, res.y);

		if (!game.fireOrders[i].animating){
			game.fireOrders[i].animating = 1;
			cam.setFireFocus(game.fireOrders[i]);
			game.draw();
			return;
		}

		for (var j = 0; j < game.fireOrders[i].anim.length; j++){
			for (var k = 0; k < game.fireOrders[i].anim[j].length; k++){								
				if (game.fireOrders[i].anim[j][k].done){continue;}

				if (game.fireOrders[i].weapon.animation == "em"){
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
				else if (game.fireOrders[i].weapon.animation == "projectile"){
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
				else if (game.fireOrders[i].weapon.animation == "area"){
					if (game.fireOrders[i].anim[j][k].n < game.fireOrders[i].anim[j][k].m){ // still to animate
						game.fireOrders[i].anim[j][k].n += 1;
						if (game.fireOrders[i].anim[j][k].n > 0){ // t valid, now animate
							if (game.fireOrders[i].anim[j][k].p == 0){
								drawProjectile(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k], 30); // projectile
								if (game.fireOrders[i].anim[j][k].n >= game.fireOrders[i].anim[j][k].m){game.fireOrders[i].anim[j][k].p = 1; game.fireOrders[i].anim[j][k].n = 0; game.fireOrders[i].anim[j][k].m += 30;}
							}
							else {
								drawAreaEffect(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k], game.fireOrders[i].anim[j][k].n, game.fireOrders[i].anim[j][k].m); // mine explo
								if (game.fireOrders[i].anim[j][k].n >= game.fireOrders[i].anim[j][k].m){
									game.fireOrders[i].anim[j][k].done = true;
								}
							}
						}
					}
				}
			}
		}

		var allAnimated = 1;
		for (var j = 0; j < game.fireOrders[i].anim.length; j++){
			for (var k = 0; k < game.fireOrders[i].anim[j].length; k++){
				if (! game.fireOrders[i].anim[j][k].done){
					allAnimated = 0;
					break;
				}
			}
			if (!allAnimated){
				break;
			}
		}
		
		if (allAnimated){
			window.cancelAnimationFrame(anim);
			fxCtx.clearRect(0, 0, res.x, res.y);
			game.fireOrders[i].animated = allAnimated;

			if (goOn){
				game.timeout = setTimeout(function(){
					game.animateAllFireOrders();
				}, 1000);
			}
			else {
				$(fxCanvas).css("opacity", 0.3)
			}
		}
	}

	this.animateUnitExplosions = function(){
		anim = window.requestAnimationFrame(game.animateUnitExplosions.bind(this));
		window.now = Date.now();		
		window.elapsed = window.now - window.then;
		if (elapsed > window.fpsTicks){
			window.then = window.now - (window.elapsed % window.fpsTicks);
			fxCtx.clearRect(0, 0, res.x, res.y);

			var allDone = 1;
			for (var i = 0; i < window.animations.length; i++){
				if (!window.animations[i].done){
					if (!window.animations[i].animating){
						window,animations[i].animating = 1;
						cam.setFocusToPos(game.getUnit(window.animations[i].id).getPlannedPos());
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
		$("#combatLog")
			.find("tbody")
				.append(
				$("<tr>")
					.append($("<td>").attr("colSpan", 9).css("font-size", 14).html(window.animations[i].html))
					.data("shipid", window.animations[i].id)
					.hover(
						function(){
						var data = $(this).data();
						game.getUnit($(this).data("shipid")).doHighlight()
						}
					)
				)

			
		$("#combatlogWrapper").find("#combatlogInnerWrapper").scrollTop(function(){return this.scrollHeight});

	}

	this.createCombatLogEntry = function(i){
		this.fireOrders[i].weapon.createCombatLogEntry(this.fireOrders[i]);
	}

	this.initDeploymentWrapper = function(){

		var wrapper = $("#deployTable");

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

		if (game.phase == -1){
			for (var i = 0; i < this.ships.length; i++){
				if (this.ships[i].available == this.turn){
					if (this.ships[i].friendly){
						wrapper
						.append($("<tr>").addClass("deployNow")
							.hover(
								function(){game.drawDeployMarker($(this).data("shipid"))},
								function(){game.draw();}
							)
							.data("shipid", this.ships[i].id)
							.append($("<td>")
								.append($(this.ships[i].getBaseImage().cloneNode(true))
									.addClass("size40")
								)
							)
							.append($("<td>")
								.addClass("green font14")
								.html(this.ships[i].name)
							)
							.append($("<td>")
								.addClass("green font14")
								.html("NOW")
							)
						)
					}
					else if (!this.ships[i].friendly){
						wrapper
						.append($("<tr>").addClass("deployNow")
							.data("shipid", this.ships[i].id)
							.hover(
								function(){game.drawDeployMarker($(this).data("shipid"))},
								function(){game.draw();}
							)
							.append($("<td>")
								.append($("<img>")
									.addClass("size40")
									.attr("src", "varIcons/blueVortex.png")
								)
							)
							.append($("<td>")
								.addClass("red font14")
								.html("Unknown")
							)
							.append($("<td>")
								.addClass("red font14")
								.html("NOW")
							)
						)
					}
				}
			}

			if (game.turn == 1){
				$(wrapper)
					.find("tr")
					.each(function(i){
						if (i < 2){return;}
						$(this).click(function(e){
							e.stopPropagation();
							if (game.phase == -1){
								if (game.deploying && $(this).hasClass("selected")){
									$(this).removeClass("selected");
									game.disableDeployment();
								}
								else if (!game.deploying && !game.aUnit && game.getUnit($(this).data("shipid")).canDeploy()){
									$(this).addClass("selected");
									game.enableDeployment($(this).data("shipid"));
								}
							}
						})
						.contextmenu(function(e){
							e.preventDefault(); e.stopPropagation();
						})	
					$(this).hover(
						function(e){
							game.drawDeployMarker($(this).data("shipid"));
							//console.log("hoverIn");
						},
						function(e){
							game.redraw();
							//console.log("hoverOut");
						}
					)
				})
			}
		}

		for (var i = 0; i < this.incoming.length; i++){
			var html = "";
			var eta = this.incoming[i].available - game.turn;

			if (this.incoming[i].userid === game.userid){
				if (eta == 0){
					html = "NOW";
				} else html = (eta + " Turn/s");

				wrapper
				.append($("<tr>").addClass("deployNow")
					.data("shipid", this.incoming[i].id)
					.hover(
						function(){game.drawDeployMarker($(this).data("shipid"))},
						function(){game.draw();}
					)
					.append($("<td>")
						.append($(graphics.images[this.incoming[i].name.toLowerCase()].cloneNode(true))
							.addClass("size40")
						)
					)
					.append($("<td>")
						.addClass("green font14")
						.html(this.incoming[i].name + " " + this.incoming[i].display)
					)
					.append($("<td>")
						.addClass("green font14")
						.html(html)
					)
				)
			}
			else {
				if (eta == 0){
					html = "NOW";
				} else html = "1 Turn";

				wrapper
				.append($("<tr>").addClass("deployNow")
					.data("shipid", this.incoming[i].id)
					.hover(
						function(){game.drawDeployMarker($(this).data("shipid"))},
						function(){game.draw();}
					)
					.append($("<td>")
						.append($("<img>")
							.addClass("size40")
							.attr("src", "varIcons/blueVortex.png")
						)
					)
					.append($("<td>")
						.addClass("red font14")
						.html("???")
					)
					.append($("<td>")
						.addClass("red font14")
						.html(html)
					)
				)
			}
		}
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
		//	ele.remove() $("#deployWrapper").remove();return;
		var l = 0;
		var s = 40;
		var className = "rotate270 size" + s

		this.ships.sort(function(a, b){
			return a.userid - b.userid || b.cost- a.cost
		});
	
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].isReady){
				var name = "friendly";
				if (this.ships[i].userid != game.userid){
					name = "hostile";
				}
				l++;

				ele.append(
				($(this.ships[i].getBaseImage().cloneNode(true))
					.data("id", this.ships[i].id))
					.removeClass()
					.addClass(className + " " + name)
					.click(function(e){
						e.preventDefault(); e.stopPropagation();						
						if (!aUnit && !game.getUnit($(this).data("id")).selected){ // selecting
							game.getUnit($(this).data("id")).doSelect();
						} else if (aUnit == $(this).data("id")){ // unselecting
							game.getUnit($(this).data("id")).doUnselect();
						} else if (aUnit != $(this).data("id")){ // fireing
							var ship = game.getUnit(aUnit);
							var vessel = game.getUnit($(this).data("id"));
							if (ship && vessel){
								if (game.mission && game.mission.new){
									game.issueMission();
								}
								else if (game.flightDeploy){
									game.doDeployFlight();
								}
								else firePhase({x: 0, y: 0}, ship, vessel.id);
							}
						}
					})
					.contextmenu(function(e){
						e.preventDefault(); e.stopPropagation();
						var unit = game.getUnit($(this).data("id"));
						if (aUnit != unit.id){unit.switchDiv();}
					})
					.hover(
						function(e){
							var vessel = game.getUnit($(this).data("id"));
								vessel.doHighlight();
							if (vessel.highlight){game.handleHoverEvent(e, 0, vessel);}						
							if (aUnit && aUnit != vessel.id){
								var	ship = game.getUnit(aUnit);
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
							var vessel = game.getUnit($(this).data("id"));
								vessel.doHighlight();
							game.resetHover(e);
						}
					)
				)
			}
		}

		if (l){
			var w = l*(s+3*2);

			ele.width(Math.min(575, w)).removeClass("disabled");
		}
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
			if (this.ships[i].isReady){
				var shipPos = this.ships[i].getDrawPos();
				//if (pos.x < shipPos.drawX + r && pos.x > shipPos.drawX - r){
				//	if (pos.y > shipPos.drawY - r && pos.y < shipPos.drawY + r){
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

	if (!pick){
		return false;
	}
	return this.getUnit(pick).getParent();
}


Game.prototype.setShipDivs = function(val){
	var x = 10;
	var y = 200;
	for (var i = 0; i < this.ships.length; i++){
		$(this.ships[i].element)
			.css("left", x)
			.css("top", y);
		x += 25;
		y += 25;

		//console.log(this.ships[i].id);
		//console.log(x, y);

		if (y + 600 > res.y){
			y = 200;
			x += 100;
		}
		else if (x + 400 > res.x){
			y =+ 200;
			x = 10;
		}
	}
}

Game.prototype.getUnitType = function(val){
	switch (val){
		case 3: return "Ultra Heavy";
		case 2: return "Super Heavy";
		case 1: return "Heavy";
		case 0: return "Medium";
		case -1: return "Squadron";
		case -3: return "Flight";
		case -4: return "Salvo";
	}
}

Game.prototype.drawShipOverlays = function(){
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

Game.prototype.drawAllSensorSettings = function(friendly){
	salvoCtx.clearRect(0, 0, res.x, res.y);
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].flight || this.ships[i].salvo || !this.ships[i].deployed){continue;}
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
		switch (sensor.ew[sensor.ew.length-1].type){
			case 0: color = "red"; break;
			case 1: color = "blue"; break;
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
			var p1 = getPointInDir(str, start, loc.x, loc.y);
			var rad1 = degreeToRadian(start);
			var rad2 = degreeToRadian(end);
			salvoCtx.beginPath();			
			salvoCtx.moveTo(loc.x, loc.y);
			salvoCtx.lineTo(p1.x, p1.y); 
			salvoCtx.arc(loc.x, loc.y, d, rad1, rad2, false);
			salvoCtx.closePath();
		}
		salvoCtx.fillStyle = color;
		salvoCtx.globalAlpha = 0.2;
		salvoCtx.fill();
		salvoCtx.setTransform(1,0,0,1,0,0);
	};
	
	salvoCtx.globalAlpha = 1;
	return;
}

Game.prototype.setShipTransform = function(){
	ctx.translate(cam.o.x, cam.o.y);
	ctx.scale(cam.z, cam.z);
}

Game.prototype.resetShipTransform = function(){
	ctx.setTransform(1,0,0,1,0,0);
}

Game.prototype.drawShips = function(){
	this.setShipTransform();
	for (var i = 0; i < this.ships.length; i++){
		this.ships[i].draw();
	}
	this.resetShipTransform();
}

Game.prototype.drawEvents = function(){
	if (!game.drawCircle){return;}
	else if (!game.drawingEvents){return;}
	for (var i = 0; i < this.events.length; i++){
		this.events[i].highlightEvent();
	}
}

Game.prototype.drawOtherShips = function(id){
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].id != id){
			this.ships[i].draw();
		}
	}
}

Game.prototype.getShipById = function(id){	
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].id == id){
			return this.ships[i];
		}
	}
	return false;
}

Game.prototype.getDeployingUnit = function(){
	return this.getUnit(this.deploying);
}

Game.prototype.getUnit = function(id){
	return this.getReinforcementById(id) || this.getShipById(id) || this.getIncomingById(id) || false;
}

Game.prototype.getIncomingById = function(id){
	for (var i = 0; i < this.incoming.length; i++){
		if (this.incoming[i].id == id){
			return this.incoming[i];
		}
	}
	return false;
}

Game.prototype.getReinforcementById = function(id){
	for (var i = 0; i < this.reinforcements.length; i++){
		if (this.reinforcements[i].id == id){
			return this.reinforcements[i];
		}
	}
	return false;
}

Game.prototype.getActiveShip = function(){
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].selected){
			return this.ships[i];
		}
	}
}

Game.prototype.getCurrentReinforceCost = function(){
	var cost = 0;

	$("#deployWrapper").find("#reinforceTable").find(".green").each(function(i){
		cost += $(this).data("cost");
	})

	return cost;
}

Game.prototype.getFireDistance = function(a, b){
	if ((a.ship || a.squad) && (b.ship || b.squad)){
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
	else if (a.ship || a.squad){
		return Math.floor(getDistance(a.getPlannedPos(), b.getPlannedPos()));
	}
	return -666;
}

Game.prototype.resolveDeployment = function(){
	for (var i = 0; i < this.ships.length; i++){
		this.ships[i].deployed = true;
		if (this.ships[i].available == this.turn){
			this.ships[i].deployAnim = [0, 50];
			this.ships[i].deployed = false;
		}
	}

	$("#combatlogWrapper")
	.width(350)
	.css("top", 75).css("left", 250)
	.show()
	.find(".combatLogHeader").html("Deployment Log").end()
	.find("#combatLog").children().children().remove();

	var show = 0;

	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].available == this.turn){show = 1; break;
		} else if (this.ships[i].flight && this.ships[i].mission.turn == this.turn){show = 1; break;}
	}

	if (!show){
		$("#combatLog").find("tbody")
		.append($("<tr>")
			.append($("<td>").html("Hyperspace is stable."))
		);

		this.logEvents();
		this.draw();
	}
	else {
		setFPS(30);
		window.then = Date.now();
		window.startTime = then;
		cam.setZoom(0.7);
		this.animating = 1;
		this.animateJumpIn();
	}
}

Game.prototype.animateJumpIn = function(){
	anim = window.requestAnimationFrame(game.animateJumpIn.bind(this));
	window.now = Date.now();		
	window.elapsed = window.now - window.then;

	if (elapsed > window.fpsTicks){

		var done = 1;
		var doing = 0;

		window.then = window.now - (window.elapsed % window.fpsTicks);

		ctx.clearRect(0, 0, res.x, res.y);		
		ctx.translate(cam.o.x, cam.o.y);
		ctx.scale(cam.z, cam.z);

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].deployAnim[1]){
				if (this.ships[i].deployed){
					this.ships[i].draw();
				}
				else if (!doing){
					doing = 1; done = 0;
					this.ships[i].animateSelfJumpIn();
				} else continue;
			}
			else this.ships[i].draw();
		}

		ctx.setTransform(1,0,0,1,0,0);

		if (done){
			window.cancelAnimationFrame(anim);
			game.animating = 0;
			this.deployDone();
		}
	}
}

Game.prototype.deployDone = function(){
	game.animating = 0;
	game.draw();

	var hasEvent = 0;

	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].available == game.turn){hasEvent = 1; break;
		} else if (this.ships[i].flight && this.ships[i].mission.turn == game.turn){hasEvent = 1; break;}
	}

	this.logEvents();

	if (hasEvent){
		timeout = setTimeout(function(){
			$("#combatLog").find("tbody")
				.append($("<tr>")
					.append($("<td>").html("Deployment Resolution concluded."))
				);
			$("#unitGUI").empty();
			game.initSelectionWrapper();
		})
	}


	console.log("deployDone");
}

Game.prototype.logEvents = function(){
	var body = $("#combatLog").find("tbody");

	for (var i = 0; i < this.events.length; i++){
		if (this.events[i] instanceof Weapon){
			body.append($("<tr>").append($("<td>").html(this.events[i].getUsageString())));
		}
	}
}

Game.prototype.resolveUnitMovement = function(){
	if (aUnit){game.getUnit(aUnit).select();}

	this.animShip = 1;
	this.animFlight = 0;
	this.animSalvo = 0;
	/*
	$("#combatlogWrapper")
	.width(350)
	.css("top", 75).css("left", 250)
	.show()
	.find(".combatLogHeader").html("Movement Log").end()
	.find("#combatLog").children().children().remove();
*/
	this.setUnitMovementFocus();
	this.setUnitMovementDetails();
	this.animateUnitMovement();
}

Game.prototype.drawDeployMarker = function(id){
	var s = game.getUnit(id);

	if (s.salvo || s.flight){return;}
	if (s.ship || s.squad || s.available >= game.turn){
		this.drawJumpMarker(s);
	}
}

Game.prototype.drawJumpMarker = function(s){

	if (game.turn == 1 && game.phase == -1){return;}
	this.setShipTransform();
	var size = 50;

	ctx.beginPath();
	

	if (s.ship || s.squad){}
	ctx.arc(s.actions[0].x, s.actions[0].y, size/2, 0, 2*Math.PI, false);

	ctx.closePath();
	ctx.strokeStyle = "yellow";
	ctx.fillStyle = "blue";
	ctx.globalAlpha = 0.3;
	ctx.fill();
	ctx.lineWidth = 2;
	ctx.globalAlpha = 1;
	ctx.stroke();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "black";

	if (s.userid == game.userid){
		if (game.phase == -1){
			var p = getPointInDir(100, s.actions[0].a, s.actions[0].x, s.actions[0].y);
			ctx.moveTo(s.x, s.y);
			ctx.lineTo(p.x, p.y);
			ctx.closePath();
			ctx.strokeStyle = "white";
			ctx.stroke();
		}
		else {
			var p = getPointInDir(100, s.actions[0].a, s.actions[0].x, s.actions[0].y);
			ctx.moveTo(s.actions[0].x, s.actions[0].y);
			ctx.lineTo(p.x, p.y);
			ctx.closePath();
			ctx.strokeStyle = "white";
			ctx.stroke();
		}
	}

	/*if (s instanceof Ship && s.userid == this.userid){
		ctx.save();
		ctx.translate(s.actions[0].x, s.actions[0].y);
		ctx.rotate(s.actions[0].a * Math.PI/180);
		ctx.drawImage(s.getBaseImage(), -size/2, -size/2, size, size);
		ctx.restore();
	}
	else if (s.userid == this.userid){
		ctx.save();
		ctx.translate(s.x, s.y);
		ctx.rotate(s.a * Math.PI/180);
		ctx.drawImage(graphics.images[s.name.toLowerCase()], -size/2, -size/2, size, size);
		ctx.restore();
	}

	ctx.strokeStyle = "black";
	*/
	ctx.setTransform(1,0,0,1,0,0);
	this.resetShipTransform();
}

Game.prototype.undrawJumpMarker = function(id){
	this.setShipTransform();

	var s = game.getUnit(id);

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
	ctx.drawImage(graphics.images[s.name.toLowerCase()], -s.size/2, -s.size/2, s.size, s.size);
	ctx.restore();

	this.resetShipTransform();
}