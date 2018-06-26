function Game(data){
	this.settings = data.settings;
	this.id = data.id;
	this.name = data.name;
	this.status = data.status;
	this.userid = data.userid;
	this.turn = data.turn;
	this.phase = data.phase;
	this.playerstatus = data.playerstatus;
	this.incoming = data.incoming;
	this.const = data.const;
	this.ships = [];
	this.reinforcements = [];
	this.ships = [];
	this.reinforcements = [];
	this.fireOrders = []
	this.mode = false;
	this.deploying = false;
	this.flightDeploy = false;
	this.mission = 0;
	this.index = 1;
	this.reinforcePoints = 0;
	this.animating = false;
	this.deployArea = [];
	this.deployBlock = [];
	this.vector = false;
	this.opacity = false;
	this.markers = [];
	this.ballistics = [];
	this.fighters = [];
	this.antiBallistics = [];
	this.unitExploAnims = [];
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
	this.canSubmit = 0;
	this.canConfirm = 1;
	this.drawCircle = 1;
	this.drawMoves = 1;
	this.showFriendlyEW = 0;
	this.showHostileEW = 0;
	this.snapTurn = 0;
	this.events = [];
	this.wave = data.wave;
	this.arcRange = 1200;
	this.animData = {jump: 60};
	this.commandChange = {old: 0, new: 0}

	this.hasSnapCenterline = function(shooter, shooterAngle, target){
		if (game.phase > 0){
			if (shooter.focus && target && !target.focus && !shooter.getRemSpeed()){
				console.log("angle to target: " + shooterAngle);
				if (shooterAngle == 0 || shooterAngle == 360 || (shooterAngle > 0 && shooterAngle < 0.2)|| (shooterAngle < 360 && shooterAngle > 359.8)){
					console.log("snap!");
					return true;
				}
			}
		}
		else if (game.phase == -1){
			if (Math.round(shooterAngle) == 360 || Math.round(shooterAngle) == 0){
				console.log("snap!");
					return true;
			}
		}
		return false;
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

	this.getMissionType = function(val){
		switch (val){
			case 1: return "PATROL";
			case 2: return "STRIKE / ESCORT / INTERCEPT";
			default: return "ERROR";
		}
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
			case 2: return "STRIKE / ESCORT / INTERCEPT";
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

	this.issueMission = function(pos){
		var valid = false;
		var t = 0;
		var dest;

		if (game.mission == 1 && pos){
			valid = true;
			dest = pos;
		}
		else if (game.mission == 2 && this.shortInfo){
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
				attach.detachUnit(s.id);
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
			mission = {id: -1, unitid: s.id, turn: this.turn, type: this.mission, targetid: t.id || 0, x: dest.x, y: dest.y, arrived: 0, new: 1};
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
		//	.find(".missionTurn").html("Turn " + mission.turn).end();

	/*	if (t && t instanceof Ship && o.x == dest.x && o.y == dest.y){
			mission.arrived = this.turn-1;
			if (t.ship){
				s.doDraw = 0;
			}
			var p = t.getParent();
			if (p.id != s.id){
				p.attachUnit(s);
				p.setSupportImage(s);
			}
		}
		else {
	*/		//s.mission = mission;
			s.facing = a;
			//if (!(s.oldMission.type == 1 && s.oldMission.arrived)){s.setCurSpeed();} // reset speed only when NOT in patrol
			s.setCurSpeed();
			s.setTarget();
	//	}

		s.setBaseLayout();
		//s.setLayout();
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
		ui.deployOverlay.hide();
		this.checkUnitOffsetting();
	}

	this.doDeployFlight = function(pos){

		if (game.mission == 1 && !pos || game.mission == 2 && !game.shortInfo){return false;}

		var s = this.getUnit(aUnit);
		var hangar = s.getSystem(this.flightDeploy.id)
		var o = s.getGamePos();
		//var facing = getAngleFromTo(o, dest);
		var facing = 0;
		var p = getPointInDir(s.size/2, facing, o.x, o.y);
		//var mission = {id: -1, unitid: -this.ships.length-20, turn: this.turn, type: this.flightDeploy.mission, targetid: t.id || 0, x: dest.x, y: dest.y, arrived: 0, new: 1};

		var flight = new Flight(
			{id: range(-0, -100), name: "Flight", mission: false, traverse: -3,
			x: o.x, y: o.y, mass: 0, facing: facing, ep: 0, baseImpulse: 0, curImp: 0, fSize: 15, baseSize: 25, unitSize: 4, userid: this.userid, available: this.turn}
		);

		flight.primary = new Primary(0, flight.id, 0, 0, 0);
		flight.actions.push(new Move(-1, "deploy", 0, o.x, o.y, facing, 0, 1, 1, 0));
		flight.launch = {
			shipid: aUnit,
			systemid: this.flightDeploy.id,
			loads: this.flightDeploy.loads
		};

		for (var i = 0; i < this.flightDeploy.loads.length; i++){
			for (var j = 1; j <= this.flightDeploy.loads[i].launch; j++){
				flight.structures.push(new Fighter(this.flightDeploy.loads[i]));
			}
		}

		flight.setCallSign();
		flight.setUnitState();
		flight.isReady = 1;
		flight.create();
		flight.setTarget();
		flight.setLayout();
		flight.setSize();
		flight.finalStep = {x: o.x, y: o.y}
		flight.setDrawData();
		flight.setPreMovePosition();
		flight.setImage();
		flight.createBaseDiv();
		flight.setPostMoveFacing();
		this.ships.push(flight);

		this.hideInstruct();
		ui.deployOverlay.hide();
		hangar.setFireOrder(0, pos).select();
		this.flightDeploy = false;

		$(flight.element).css("top", 600).css("left", 0);		this.checkUnitOffsetting();
		this.draw();

		var m = game.mission;
		var f = game.flightDeploy;
		game.mission = 0;
		game.flightDeploy = 0;
		s.doUnselect();
		game.mission = m;
		game.flightDeploy = f;
		flight.doSelect();

		this.issueMission(pos);
	}

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

	this.checkUnitOffsetting = function(){
		this.offsetFromFlight();
		this.offsetFromShips();
	}

	this.offsetFromFlight = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].flight){
				if (this.ships[i].cc.length){continue;}
				var aPos = this.ships[i].getDrawPos();
				for (var j = i+1; j < this.ships.length; j++){
					if (this.ships[j].flight){
						if (this.ships[i].doDraw && this.ships[j].doDraw){
							var bPos = this.ships[j].getDrawPos();

							if (aPos.x == bPos.x && aPos.y == bPos.y){
								this.ships[i].doRandomOffset(1);
								this.ships[j].doRandomOffset(-1);
							}
						}
					}
				}
			}
		}
	}

	this.offsetFromShips = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].ship){
				var aPos = this.ships[i].getDrawPos();
				for (var j = i+1; j < this.ships.length; j++){
					if (this.ships[j].flight){
						if (this.ships[j].doDraw){
							var bPos = this.ships[j].getDrawPos();

							if (aPos.x == bPos.x && aPos.y == bPos.y){
								this.ships[j].doRandomOffset(0);
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
			if (this.ships[i].userid != this.userid){continue;}
			if (this.ships[i].flight && this.ships[i].available == this.turn){
				var flight = {
					clientId: this.ships[i].id,
					serverId: 0,
					type: "Flight",
					name: "Flight",
					call: this.ships[i].call,
					display: "",
					mission: this.ships[i].mission,
					loadAdjust: this.ships[i].getLoadAdjustment(),
					upgrades: this.ships[i].getLaunchData(),
					actions: this.ships[i].actions,
					turn: this.turn,
					eta: 0,
				}
				ret.push(flight);
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
			if (game.turn != this.ships[i].available){continue;}

			if (this.ships[i].hasInvalidPower()){
				popup("You have units with invalid Reactor settings (#" + this.ships[i].id + ")"); 
				this.ships[i].select();
				return true;
			}
		}
		return false;
	}

	this.handleDeployWarnings = function(){
		var data = [];

		var ew = this.getHasBasicEW();
		if (ew.length){
			data.push({data: ew, msg: "The following units have only basic sensor settings:"});
		}

		var power = this.getHasUnusedPower();
		if (power.length){
			data.push({data: power, msg: "The following units have unspent power:"});
		}

		if (data.length){
			this.clickablePop(data);
			return true;
		}
		return false;
	}

	this.getHasBasicEW = function(){
		var data = [];

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].flight || this.ships[i].salvo || this.ships[i].userid != this.userid){continue;}
			if (this.ships[i].available > game.turn){continue;}
			if (this.ships[i].status == "jumpOut"){continue;}
			
			if (this.ships[i].hasBasicEW()){
				data.push({id: this.ships[i].id, name: this.ships[i].name, value: 0});
			}

		}
		if (data.length){
			return data;
		}
		return false;
	}

	this.getHasUnusedPower = function(){
		var data = [];

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].flight || this.ships[i].salvo || this.ships[i].userid != this.userid){continue;}
			if (this.ships[i].available > game.turn){continue;}
			if (this.ships[i].status == "jumpOut"){continue;}

			var power = this.ships[i].getUnusedPower()

			if (power > 0){
				data.push({id: this.ships[i].id, name: this.ships[i].name, value: power});
			}
		}

		if (data.length){
			return data;
		}
		return false;
	}

	this.hasUnusedSpeed = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].userid != this.userid || this.ships[i].flight || this.ships[i].salvo){continue;}
			if (this.ships[i].focus != game.phase){continue;}
			if (this.ships[i].getRemSpeed() > 0){
				if (aUnit){
					this.getUnit(aUnit).doUnselect();
				}
				popup("You have units with unused speed (#" + this.ships[i].id + ")");
				this.ships[i].doHover();
				this.ships[i].select();
				return true;
			}
		}
		return false;
	}

	this.handleFireWarnings = function(){
		var data = [];

		var fires = this.hasNoFires();
		if (fires.length){
			data.push({data: fires, msg: "The following units have no fireorders:"});
		}

		if (data.length){
			this.clickablePop(data);
			return true;
		}
		return false;
	}
	
	this.hasNoFires = function(){
		var data = [];

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].userid != this.userid){continue}
			var hasNoFire = this.ships[i].hasNoFireOrders();

			if (hasNoFire){
				data.push({id: this.ships[i].id, name: this.ships[i].name, value: 0});
			}
		}

		if (data.length){
			return data;
		}
		return false;
	}
	
	this.handleDmgControlWarnings = function(){
		var hasCommand = this.userHasCommandUnit(this.getPlayerStatus().userid);
		if (!hasCommand){
			popup("Your fleet is lacking a Command unit.</br>Please select a unit to act as Fleet Command.");
			return true;
		}
		return false;
	}

	this.userHasCommandUnit = function(userid){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].userid != userid){continue;}
			if (this.ships[i].status == "jumpOut" || this.ships[i].isDestroyed()){continue;}
			if (this.ships[i].command){return true;}
		}
		return false;
	}

	this.clickablePop = function(data){
		var html = "";
		for (var i = 0; i < data.length; i++){
			html += "<div class='popupHeader'>";
			html += data[i].msg;
			html += "</div>";

			for (var j = 0; j < data[i].data.length; j++){
				var substring = data[i].data[j].name + " #" + data[i].data[j].id;
				if (data[i].data[j].value){substring += " (" + data[i].data[j].value + ")";}

				html += "<input type='button' class='popupEntry' value='" + substring + "' onclick='game.selectFromPopup(" + data[i].data[j].id + ")'>";
			}
		}
		html += "<input type='button' class='popupEntryConfirm' value='Confirm Orders' onclick='game.doConfirmOrders()'>";

		popup(html)
	}

	this.doConfirmOrders = function(){
		//console.log("doConfirmOrders"); return;
		if (!this.canConfirm){return;}
		this.canConfirm = 0;
		switch (this.phase){
			case -1: ajax.confirmDeploy(goToLobby); return;
			case 0: ajax.confirmMovement(goToLobby); return;
			case 1: ajax.confirmMovement(goToLobby); return;
			case 2: ajax.confirmFiringOrders(goToLobby); return;
			case 3: ajax.confirmDamageControl(goToLobby); return;
			default: popup("FATAL ERROR - PHASE UNSET"); return;
		}
	}

	this.concedeMatch = function(){
		var html = "Are you absolutely sure you want to concede the match ?";
			html += "</p>";
			html += "<input type='button' class='popupEntryConfirm' onclick='game.doConcedeMatch()' value='Yes, i concede'>";
		popup(html);
	   // $("#popupWrapper").show().find("#popupText").empty().html(html);
	}

	this.doConcedeMatch = function(){
		ajax.concedeMatch(goToLobby);
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
				if (this.hasInvalidDeploy() || this.hasInvalidPower()){return;}
				if (this.handleDeployWarnings()){return;}
				this.doConfirmOrders();
			}
			else if (this.phase == 0 || this.phase == 1){ // SHIP MOVEMENT
				if (this.hasUnusedSpeed()){return;}
				else this.doConfirmOrders();
			}
			else if (this.phase == 2){
				if (this.handleFireWarnings()){return;}
				else this.doConfirmOrders();
			}
			else if (this.phase == 3){
				if (this.handleDmgControlWarnings()){return;}
				this.doConfirmOrders();
			}
		}
		else popup("You have already confirmed your orders");
	}

	this.undoDeploy = function(id){
		for (var i = this.ships.length-1; i >= 0; i--){
			if (this.ships[i].id == id){
				this.ships.splice(i, 1);
				return;
			}
		}
	}

	this.disableDeploy = function(){
		if (aUnit){game.getUnit(aUnit).select();}
		this.deploying = false;
		this.deployArea = [];
		this.deployBlock = false;
		moveCtx.clearRect(0, 0, res.x, res.y);
		planCtx.clearRect(0, 0, res.x, res.y);
		mouseCtx.clearRect(0, 0, res.x, res.y);
		ui.deployOverlay.hide();
		//if (aUnit){game.getUnit(aUnit).doUnselect();}
		game.draw();
	}

	this.enableShipDeploy = function(id){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].id == id){
				this.deploying = this.ships[i];
				ui.deployOverlay.css("top", res.y - 100).css("left", 10).show().find("#deployType").html("Deploy unit here");
				this.setupDeployZone();
				this.drawDeployZone();
				$("#deployWrapper").find("#reinforceBody").find(".requestReinforcements").each(function(){
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
				this.deploying = this.reinforcements[i];
				ui.deployOverlay.css("top", res.y - 100).css("left", 10).show().find("#deployType").html("Deploy unit here");
				this.setupDeployZone();
				this.drawDeployZone();
				return;
			}
		}
	}

	this.enableFlightDeploy = function(){
		var hangar = game.getUnit(aUnit).getSystem($("#hangarDiv").data("systemid"));
		if (!hangar.canFire()){return false;}

		var hasFighters = 0;
		for (var i = 0; i < hangar.loads.length; i++){
			if (hangar.loads[i].launch >= 1){
				hasFighters = 1; break;
			}
		}

		if (!hasFighters){return false;}

		var value = Math.floor($($("#hangarDiv")).find("input[name=mission]:checked").val());
		if (!value){return false;}
		game.mission = value;

		this.flightDeploy = hangar;
		//var mission = this.getMissionTypeString(this.flightDeploy.mission);

		//instruct("Please select the target unit/location target for the flight");
		ui.deployOverlay.css("top", res.y - 100).css("left", 10).show().find("#deployType").html( game.getMissionType(value)).end();
	}

	this.handleFlightDeployMouseMove = function(e, pos, unit){
		$(ui.deployOverlay).css("top", e.clientY + 100).css("left", e.clientX - 50)
	}

	this.handleShipDeployMouseMove = function(e, pos){
		$(ui.deployOverlay).css("top", e.clientY + 50).css("left", e.clientX - 55)

		mouseCtx.clearRect(0, 0, res.x, res.y);
		mouseCtx.translate(cam.o.x, cam.o.y)
		mouseCtx.scale(cam.z, cam.z)
		mouseCtx.translate(pos.x, pos.y);

		this.deploying.drawMarker(0, 0, "yellow", mouseCtx);
		
		mouseCtx.rotate(this.deploying.getDrawFacing() * Math.PI/180);
		mouseCtx.drawImage(this.deploying.img, -this.deploying.size/2, -this.deploying.size/2, this.deploying.size, this.deploying.size);

		mouseCtx.setTransform(1,0,0,1,0,0);
	}

	this.setupDeployZone = function(){
		if (game.turn == 1){
			for (var i = 0; i < this.playerstatus.length; i++){

				var step = 1;
				var h = 1000;
				var w = 200;
				var dist = 600;
				var y = h/2;

				if (i % 2 == 0){step = -1;}

				if (this.playerstatus[i].userid == this.userid){
					var id = this.userid;
					var color = "green";
				}
				else {
					var id = 0;
					var color = "red";
				}

				this.deployArea.push({
					id: id,
					x: 0 + (dist * step),
					y: y/2*-1,
					w: w * step,
					h: h,
					c: color
				});
			}
		}
		else if (game.turn > 1){
			var center = {x: 0, y: 0};
			var count = 0;
			for (var i = 0; i < this.ships.length; i++){
				if (this.ships[i].flight || this.ships[i].salvo){continue;}
				if (this.ships[i].available > game.turn){continue;}
				center.x += this.ships[i].x;
				center.y += this.ships[i].y;
				count++;
			}

			center.x /= count;
			center.y /= count;
			//console.log(center);

			center.x = Math.round(center.x);
			center.y = Math.round(center.y);

			var d = 0;

			for (var i = 0; i < this.ships.length; i++){
				if (this.ships[i].flight || this.ships[i].salvo){continue;}
				if (this.ships[i].available > game.turn){continue;}
				d = Math.max(d, getDistance(this.ships[i], center));
			}
			//console.log(d);

			this.deployArea.push({
				id: this.userid,
				x: center.x,
				y: center.y,
				s: 2000,
				b: Math.round(d*2),
				c: "green"
			});
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

	this.drawDeployZone = function(){
		if (game.turn == 1){
			for (var i = 0; i < this.deployArea.length; i++){
				drawCtx.translate(cam.o.x, cam.o.y)
				drawCtx.scale(cam.z, cam.z)
				drawCtx.beginPath();
				drawCtx.rect(this.deployArea[i].x, this.deployArea[i].y, this.deployArea[i].w, this.deployArea[i].h);
				drawCtx.closePath();
				drawCtx.fillStyle = this.deployArea[i].c;
				drawCtx.fill();
				drawCtx.setTransform(1,0,0,1,0,0);
			}
		}
		else if (game.turn > 1){
			for (var i = 0; i < this.deployArea.length; i++){
				drawCtx.translate(cam.o.x, cam.o.y)
				drawCtx.scale(cam.z, cam.z)
				drawCtx.beginPath();
				drawCtx.arc(this.deployArea[i].x, this.deployArea[i].y, this.deployArea[i].s, 0, 2*Math.PI);
				drawCtx.closePath();
				drawCtx.fillStyle = this.deployArea[i].c;
				drawCtx.fill();

				drawCtx.beginPath();
				drawCtx.arc(this.deployArea[i].x, this.deployArea[i].y, this.deployArea[i].b, 0, 2*Math.PI);
				drawCtx.closePath();
				drawCtx.globalCompositeOperation = "destination-out";
				drawCtx.fillStyle = "red";
				drawCtx.fill();
				drawCtx.setTransform(1,0,0,1,0,0);
				drawCtx.globalCompositeOperation = "source-over";
			};
		}
		else {
			for (var i = 0; i < this.deployArea.length; i++){
				drawCtx.translate(cam.o.x, cam.o.y)
				drawCtx.scale(cam.z, cam.z)
				drawCtx.beginPath();
				drawCtx.arc(this.deployArea[i].x, this.deployArea[i].y, this.deployArea[i].s, 0, 2*Math.PI);
				drawCtx.closePath();
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

	this.initDeploy = function(){
		if (game.turn == 1 && game.phase == -1){
			cam.z = 0.5;
		} else this.setCamera();
		this.draw();

		if (game.turn == 1){return;}

		this.doPositionLog("Turn Beginning Log", 400);
		this.createCommandTransferEntries();
		this.resolveDamageControl();
	}

	this.createCommandTransferEntries = function(){
		if (game.phase == 1){return;}

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].command == game.turn){
				this.ships[i].createCommandTransferEntry();
			}
		}
	}

	this.endMoveSubPhase = function(){
		//console.log("endMoveSubPhase")
		for (var i = 0; i < this.ships.length; i++){
			if (!this.ships[i].toAnimate){continue;}
			if (this.ships[i].flight && this.animFlight || this.ships[i].salvo && this.animSalvo){
				this.ships[i].setPostMovePosition();
				this.ships[i].setPostMoveFacing();

				if (this.ships[i].mission.arrived){
					this.ships[i].setPostMoveSize();
					if (this.ships[i].flight && this.ships[i].mission.type == 1 && this.ships[i].mission.arrived == game.turn){
						this.ships[i].setPatrolLayout();
						this.ships[i].setPatrolImage();
					}
					this.ships[i].setImage();
				}
			}
			else if ((this.ships[i].ship || this.ships[i].squad) && this.animShip){
				//if (this.ships[i].focus){console.log("ding")}
				this.ships[i].setPostMovePosition();
				this.ships[i].setPostMoveFacing();
			}
		}
	}

	this.resetFireOrders = function(){
		for (let i = 0; i < this.fireOrders.length; i++){
			if (this.fireOrders[i].animated){
				this.fireOrders[i].animated = 0;
				this.fireOrders[i].animating = 0;
			}
		}
	}

	this.moveResolved = function(){
		console.log("moveResolved");

		this.setPostMoveCC();
		this.checkUnitOffsetting();

		if (game.phase == 2){
			for (var i = 0; i < this.ships.length; i++){
				if (this.ships[i].ship || this.ships[i].squad){this.ships[i].setSupportImage();}
				this.ships[i].getAttachDivs();
			}
		}

		this.createEndEntry("-- Movement Events concluded --");

		if (this.events.length){
			if (game.phase == 2){
				game.timeout = setTimeout(function(){
					$($("#combatLog").find("td")[0]).attr("colSpan", 8)
					game.resolvePostMoveFire();
				}, 1000);
			}
			else if (game.phase == 1){
				this.animating = 0;
				this.drawingEvents = 1;
				this.logWeaponEvents();
				this.draw();
			}
		}
		else {
			this.animating = 0;
			this.drawingEvents = 1;
			this.draw();
			if (game.phase == 2){
				this.autoDoFireOrders();
			}
		}
	}

	this.autoDoFireOrders = function(){
		console.log("autoDoFireOrders");

		for (var i = 0; i < this.ships.length; i++){
			if (!this.ships[i].friendly || !this.ships[i].flight){continue;}
			if (!this.ships[i].cc.length){continue;}

			var hostiles = [];

			for (var j = 0; j < this.ships[i].cc.length; j++){
				var unit = game.getUnit(this.ships[i].cc[j]);
				if (unit.friendly){continue;}
				hostiles.push(unit);
			}

			if (hostiles.length != 1){continue;}

			var weapons = [];

			for (var j = 0; j < this.ships[i].structures.length; j++){
				for (var k = 0; j < this.ships[i].structures[j].systems[k].length; k++){
					if (this.ships[i].structures[j].systems[k].reload > 1 || !this.ships[i].structures[j].systems[k].canFire()){continue;}
				}
				weapons.push(this.ships[i].structures[j].systems[k]);
			}
			//console.log(weapons);

			var target = hostiles[0].id;
			var pos = hostiles[0].getPlannedPos();

			for (var j = 0; j < weapons.length; j++){
				weapons[j].odds = 1;
				weapons[j].validTarget = 1;
				weapons[j].setFireOrder(target, pos);
			}
		}

	}

	this.initDamageControl = function(){
		this.resolveFire();
	}

	this.fireResolved = function(){
		console.log("fireResolved");

		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].setPostFireImage();
			this.ships[i].setSize();
		}

		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].setSupportImage();
		}

		this.animating = 0;
		this.drawingEvents = 1;
		this.draw();
		
		$(fxCanvas).css("opacity", 0.25);

		this.createCritLogEntries();
		this.createMoraleLogEntries();
		this.createPlaceHolderEntry();
		this.createEndEntry("-- Fire Events concluded --");

		$("#combatLogWrapper").find("#combatLogInnerWrapper").scrollTop(function(){return this.scrollHeight});

		if (game.phase == 2){
			this.autoDoFireOrders();
		}
	}
	
	this.createCritLogEntries = function(){
		var entries = 0;

		this.createPlaceHolderEntry();

		for (let i = 0; i < this.ships.length; i++){
			let entry = this.ships[i].createCritLogEntry();
			if (entry){entries++;}
		}

		if (!entries){
			ui.combatLogWrapper.find("tr").last().remove();
		}
	}

	this.createMoraleLogEntries = function(){
		var entries = 0;

		this.createPlaceHolderEntry();

		for (let i = 0; i < this.ships.length; i++){
			let entry = this.ships[i].createMoraleLogEntry();
			if (entry){entries++;}
		}

		if (!entries){
			ui.combatLogWrapper.find("tr").last().remove();
		}
	}

	this.createPlaceHolderEntry = function(){
		$("#combatLog").find("tbody").append($("<tr>")
			.append($("<td>").css("height", 15).attr("colSpan", 9)));
	}

	this.createEndEntry = function(html){
		$("#combatLog").find("tbody").append($("<tr>")
			.append($("<th>").attr("colSpan", 9).html(html)));
	}
	
	this.initPhase = function(n){
		this.setShipDivs();
		this.phase = n;

		if (this.phase == -1){
			$("#phaseSwitchDiv").click(function(){
				$(this).hide();
				game.draw();
				game.timeout = setTimeout(function(){
					game.initDeploy();
				}, 500);
			});
		}
		else if (this.phase == 0){
			ctx.clearRect(0, 0, res.x, res.y);
			$("#phaseSwitchDiv").click(function(){
				game.resolveDeploy();
				$(this).hide()
			});
		}
		else if (this.phase == 1){
			$("#phaseSwitchDiv").click(function(){
				setFPS(90);
				game.prepResolveMovement();
				game.draw();
				$(this).hide();
				game.timeout = setTimeout(function(){
					game.doResolveMovement();
				}, 50);
			});
		}
		else if (this.phase == 2){
			$("#phaseSwitchDiv").click(function(){
				setFPS(90);
				game.prepResolveMovement();
				game.draw();
				$(this).hide();
				game.timeout = setTimeout(function(){
					game.doResolveMovement();
				}, 500);
			});
		}
		else if (this.phase == 3){
			$("#phaseSwitchDiv").click(function(){
				game.draw();
				$(this).hide();
				game.resetImageData();
				game.draw();
				game.timeout = setTimeout(function(){
					game.initDamageControl();
				}, 500);
			});
			
		}
	}

	this.setDeployWrapperVisibility = function(){	
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
						$("#deployWrapper").find("#reinforceBody").find(".selected").each(function(){
							$(this).removeClass("selected");
							game.disableDeploy();
						})
					}
				}
			})

		var wrapper = $("#deployWrapper");
		var incoming = wrapper.find("#deployTable");
		var avail = wrapper.find(".reinforceWrapper");

		if (game.turn != game.wave){avail.hide();}
		else if (game.phase > -1){avail.hide();}
		
		if (!incoming.find("tbody").children().length){incoming.hide();}

		if (!avail.is(":visible") && !incoming.is(":visible")){
			wrapper.hide();
		}

	/*	if (incoming.children().children().length > 2 || avail.children().children().length > 3){
			return;
		} 
		else {
			$("#reinforce").data("on", 0);
			wrapper.hide()
		}
	*/}

	this.getUnitStatsNameString = function(unit){
		var html = units[i].name + " #" + units[i].id;

		if (units[i].display != ""){
			html += "  '" + units[i].display + "'";
		}
		if (units[i].destroyed){
			html += "  (MIA)";
		}
		return html;
	}

	this.showStats = function(data){
		units = JSON.parse(data);
		units.sort(function(a, b){
			return a.userid - b.userid || a.id - b.id
		});

		var wrapper = $("<div>")
			.attr("id", "statsWrapper")
			.append($("<div>").html("Match Damage-by-source Statistics")
				.css("margin-bottom", 10)
				.css("font-size", 22)
				.css("text-align", "center")
				.css("margin", "auto"))
			.drag();

		var div;
		var aTotal = 0;
		var sTotal = 0;

		for (i = 0; i < units.length; i++){
			//console.log(units[i]);

			if (!i || units[i].userid != units[i-1].userid){
				div = $("<div>")
					.addClass("statsOverview");
				wrapper.append(div);

				aTotal = 0;
				sTotal = 0;
			}

			aTotal += units[i].armourDmg;
			sTotal += units[i].structDmg;
			sTotal += units[i].overkill

			var table = $("<table>")
				.addClass("unitStats")
				.append($("<tr>")
					.append($("<th>")
						.attr("colSpan", 4)
						.css("font-size", 15)
						.html(game.getUnitStatsNameString(units[i]))
					)
				)

			if (units[i].subunits.length){
				var html = "";
				for (var j = 0; j < units[i].subunits.length; j++){
					html += (units[i].subunits[j].amount + "x " + units[i].subunits[j].name+", ");
				}
				table.append($("<tr>")
						.append($("<th>")
							.attr("colSpan", 4)
							.html(html)
						)
					)
			}


			table
				.append($("<tr>")
					.append($("<th>")
						.attr("colSpan", 4)
						.css("height", 5)
					)
				)
				.append($("<tr>")
					.append($("<td>")
						.html("Armour")
					)
					.append($("<td>")
						.html("Systems")
					)
					.append($("<td>")
						.html("Structure")
					)
					.append($("<td>")
						.html("S+S total")
					)
				)
				.append($("<tr>")
					.append($("<td>")
						.css("color", "yellow")
						.html(units[i].armourDmg)
					)
					.append($("<td>")
						.html(units[i].structDmg)
					)
					.append($("<td>")
						.html(units[i].overkill)
					)
					.append($("<td>")
						.css("color", "yellow")
						.html(units[i].structDmg + units[i].overkill)
					)
				)

				if (game.userid == units[i].userid){
					table.addClass("friendly")
				} else table.addClass("hostile");

			div.append(table);

			if (i == units.length-1 || (i && units[i+1].userid != units[i].userid)){
				div.append($("<div>").addClass("totalDmgDiv").html("Total Damage dealt: " + aTotal + " / " + sTotal))
				total = 0;
			}
		}

		$(document.body).append(wrapper)
	}

	this.setInitialFacing = function(units){
		for (var i = 0; i < units.length; i++){
			for (var j = 0; j < this.playerstatus.length; j++){
				if (this.playerstatus[j].userid == this.userid){
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
		console.log("setCC");
		if (this.turn == 1 && this.phase == -1){return;}
		if (this.phase == 1 && game.phase == 2){return;}

		if (this.phase == -1 || this.phase > 2){
			this.setPostMoveCC();
		}
		else if (this.phase == 0 || this.phase == 1){
			this.setPostDeployCC();
		}
		else if (this.phase == 2){
			this.setPreMoveCC();
		}
	}

	this.resetCC = function(){
		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].cc = [];
			this.ships[i].doDraw = 1;
			this.ships[i].setSize();
		}
	}

	this.setPreMoveCC = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (!this.ships[i].ship && !this.ships[i].squad || this.ships[i].status == "jumpOut"){continue;}
			if ((this.ships[i].ship || this.ships[i].squad) && this.ships[i].movesThisPhase()){continue;}

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

	this.setPostMoveCC = function(){
		console.log("setPostMoveCC");
		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].cc = [];
		}

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].status == "jumpOut" && game.phase == -1){continue;}
			var a = this.ships[i].getPlannedPos();
			for (var j = i+1; j < this.ships.length; j++){
				if (this.ships[j].status == "jumpOut" && game.phase == -1){continue;}
				var b = this.ships[j].getPlannedPos();
				if (a.x == b.x && a.y == b.y){
					if (this.ships[i].flight && this.ships[j].flight && this.ships[i].userid == this.ships[j].userid){
						if (this.ships[i].mission.targetid != this.ships[j].id && this.ships[j].mission.targetid != this.ships[i].id){continue;}
					}
					this.ships[i].cc.push(this.ships[j].id);
					this.ships[j].cc.push(this.ships[i].id);
				}
			}
		}
	}
	
	this.setPostDeployCC = function(){

		for (var i = 0; i < this.ships.length; i++){
			if (!this.ships[i].flight){continue;}
			if (this.ships[i].mission.arrived && this.ships[i].mission.type == 2){
				var t = this.getUnit(this.ships[i].mission.targetid);
					t.cc.push(this.ships[i].id);
					this.ships[i].cc.push(t.id);
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
				if (active[i].freeAim == 0 && hostileUnit == 1){
					active[i].setFireOrder(targetid, pos);
				}
				else if (active[i].freeAim == 1 && hostileUnit == 0){
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

		var ele = ui.shortInfo;
		$(ele).children().remove().end().append($(unit.getShortInfo()).css("width", "100%"));

		var oX = $(ele).width()/2;
		var pos;
		var top;
		var left;

		if (onMap){ 
			pos = unit.getDrawPos();
			left = (pos.x * cam.z) + cam.o.x - oX;
			top = (pos.y * cam.z) + cam.o.y + (unit.size/2)*cam.z;
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
		ui.shortInfo.html("").hide();

		if (this.deploying){game.drawDeployZone();}

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
			this.drawDeployZone();
		}
	}

	this.redraw = function(){
		planCtx.clearRect(0, 0, res.x, res.y);
		moveCtx.clearRect(0, 0, res.x, res.y)
		salvoCtx.clearRect(0, 0, res.x, res.y)
		mouseCtx.clearRect(0, 0, res.x, res.y)

		ui.shortInfo.hide();

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
		this.drawAllEW();

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

	this.getUnitMaxPos = function(){
		var minX = 0;
		var minY = 0;
		var maxX = 0;
		var maxY = 0;

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].flight || this.ships[i].salvo){continue;}
			minX = Math.min(minX, this.ships[i].x);
			maxX = Math.max(maxX, this.ships[i].x);
			minY = Math.min(minY, this.ships[i].y);
			maxY = Math.max(maxY, this.ships[i].y);
		}

		return {minX: minX, minY: minY, maxX: maxX, maxY: maxY};

	}

	this.setUnitCenterFocus = function(){

		var data = this.getUnitMaxPos();

		var endX = (data.minX + data.maxX) / 2;
		var endY = (data.minY + data.maxY) / 2;

		var distX = data.maxX - data.minX;
		var distY = data.maxY - data.minY;

		if (distX > res.x){
			cam.setZoom(res.x/distX / 1.4);
		} else if (distY > res.y){
			cam.setZoom(res.y/distY / 1.4);
		}

		cam.setFocusToPos({x: endX, y: endY});
	}

	this.setUnitMoveDetails = function(){
		var baseUnit = false;
		var focusUnit = false;
		var split = false;

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].focus){focusUnit = true;}
			else baseUnit = true;
		}

		if (baseUnit && focusUnit){
			split = true;
		}


		if (game.phase == 1){
			for (var i = 0; i < this.ships.length; i++){
				if (this.ships[i].focus || this.ships[i].flight || this.ships[i].salvo){continue;}
				this.ships[i].toAnimate = true;
			}
		}
		else if (game.phase == 2){
			if (focusUnit){
				for (var i = 0; i < this.ships.length; i++){
					if (this.ships[i].focus || this.ships[i].flight || this.ships[i].salvo){
						this.ships[i].toAnimate = true;
					}
				}
			}
			else {
				for (var i = 0; i < this.ships.length; i++){
					this.ships[i].toAnimate = true;
				}
			}
		}

		for (var i = 0; i < this.ships.length; i++){
			if (!this.ships[i].toAnimate){continue;}

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

			this.ships[i].readyForAnim();
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
					if (!game.ships[i].needsAnimationNow()){game.ships[i].draw(); continue;}

					for (var j = 0; j < game.ships[i].actions.length; j++){
						if (game.ships[i].actions[j].turn == game.turn && !game.ships[i].actions[j].animated){
							var action = game.ships[i].actions[j];
							if (action.type == "move"){
								//	console.log(action.v);
								action.v.t[0] += 1;
								game.ships[i].drawX += action.v.x * 1 / action.v.t[1];
								game.ships[i].drawY += action.v.y * 1 / action.v.t[1];
								if (action.v.t[0] >= action.v.t[1]){
									action.animated = true;
									game.ships[i].drawX = action.x;
									game.ships[i].drawY = action.y;
									if (game.ships[i].doesContinueRolling()){game.ships[i].createStillRollingEntry()}
								}
							}
							else if (action.type == "turn"){

								action.t[0]++;
								game.ships[i].drawFacing = addToDirection(game.ships[i].drawFacing, action.t[2]);
								//action.angle += action.t[2];

								if (action.t[0] >= action.t[1]){
									action.animated = true;
								}


								/*
								var step = 1;
								if (action.a > 0){
									game.ships[i].drawFacing = addToDirection(game.ships[i].drawFacing, step);
									action.angle -= step;
								}
								else {
									game.ships[i].drawFacing = addToDirection(game.ships[i].drawFacing, -step);
									action.angle += step;
								}
								
								if (action. == 0){
									action.animated = true;
								}
								*/
							}
							else if (action.type == "roll"){
								action.animated = true;
								game.ships[i].createActionEntry(action);
							}
							else if (action.type == "flip"){
								action.animated = true;
								game.ships[i].createActionEntry(action);
							}
							else if (action.type == "patrol"){
								action.animated = true;
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
				if (!done){break;}
				else if (game.ships[i].needsAnimationNow()){
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

		if (game.phase == 2){
			if (game.animShip){
				//console.log("ship done -> flight moves");
				game.timeout = setTimeout(function(){
					game.animShip = 0; game.animFlight = 1;
					game.animateUnitMovement();
				}, time);
			}
			else if (game.animFlight){
				//console.log("flight done -> salvo moves");
				game.timeout = setTimeout(function(){
					game.endMoveSubPhase();
					game.animFlight = 0; game.animSalvo = 1;
					game.animateUnitMovement();
				}, time);
			}
			else {
				game.endMoveSubPhase();
				game.animFlight = 0; game.animSalvo = 0;
				game.moveResolved();
			}
		}
		else {
			game.animShip = 0; 
			game.endMoveSubPhase();
			game.moveResolved();
		}
	}

	this.resolveDamageControl = function(){
		var toDo = false;
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].status == "jumpOut"){
				this.ships[i].deployAnim = [0, game.animData.jump];
				toDo = true;
			}
		}

		if (toDo){
			setFPS(30);
			window.then = Date.now();
			window.startTime = then;
			this.animating = 1;
			this.animateJumpOut();
		} else this.createTurnStartMoveActionEntries();
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
				this.createTurnStartMoveActionEntries();
			}
		}
	}

	this.createTurnStartMoveActionEntries = function(){
		console.log("createTurnStartMoveActionEntries");
		var show = 0;
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].isRolling()){
				show = 1;
				this.ships[i].createMoveStartEntry("roll");
			}
			else if (this.ships[i].hasFlipped()){
				show = 1;
				this.ships[i].createMoveStartEntry("flip");
			}
		}

		if (show){this.createPlaceHolderEntry();}
		this.createEndEntry("-- Initial Events concluded --")
	}

	this.resolvePostMoveFire = function(){
		console.log("resolvePostMoveFire");
		this.getAllResolvingFireOrders();
		this.getAreaShotDetails();
		this.getFireAnimationDetails();
		this.getAllUnitExplos();

		$("#combatLogWrapper")
			.find("#combatLogInnerWrapper").find("#combatLog")
				.append($("<tr>")
					.append($("<td>").attr("colSpan", 9).css("font-size", 18).html("Event Log")))
				.append($("<tr>")
				.append($("<th>").attr("colSpan", 5).html("Event Type"))
				.append($("<th>").html("Hits"))
				.append($("<th>").html("Armour"))
				.append($("<th>").html("System"))
				.append($("<th>").html("Structure")))

		this.drawingEvents = 0;
		this.setFireGlobals();


		this.timeout = setTimeout(function(){
			game.animateAllFireOrders()
		}, 500);
	}

	this.resolveFire = function(){
		this.getAllResolvingFireOrders();
		this.getShotDetails();
		this.getFireAnimationDetails();	
		this.getAllUnitExplos();

		//$("#combatLogWrapper").css("top", 0).show();
		this.doPositionLog("Combat Log", 800);

		this.setFireGlobals();

		//this.animateUnitExplos(); return;
		this.animateAllFireOrders();

	}

	this.setFireGlobals = function(){
		setFPS(40);
		window.then = Date.now();
		window.startTime = then;

		$(fxCanvas).css("opacity", 1);

		ctx.clearRect(0, 0, res.x, res.y);
		salvoCtx.clearRect(0, 0, res.x, res.y);
		fxCtx.clearRect(0, 0, res.x, res.y);

		this.drawShips();
		this.animating = 1;
	}

	this.resetImageData = function(){
		console.log("resetImageData");
		this.setPost
		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].setPreFireImage();
			// if (!this.ships[i].ship){this.ships[i].setPreFireImage();}
		}
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].salvo){continue;}
			this.ships[i].setSupportImage();
			// if (!this.ships[i].salvo){this.ships[i].setSupportImage();}
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
					subDmgs[j].system = this.ships[i].getLogTitleSpan();
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
				this.fireOrders[i].type = "Reg."// + this.fireOrders[i].id;
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
				a.shooter.salvo - b.shooter.salvo ||
				a.shooter.flight - b.shooter.flight ||
				a.shooter.flight ||
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

    this.getRandomExplo = function(){
    	return graphics.explos[range(0, 2)];
    	return graphics.explos[range(0, graphics.explos.length-1)];
    }

	this.getAllUnitExplos = function(){
		console.log("getAllUnitExplos");

		for (var i = 0; i < this.ships.length; i++){
			if (!this.ships[i].deployed){continue;}
			var data = this.ships[i].getSelfExplo();
		
			if (data.entries.length){
				this.unitExploAnims.push(data);
			}
		}
		return true;
	}

	this.animateAllFireOrders = function(){
		for (var i = 0; i < this.fireOrders.length; i++){
			//if (this.fireOrders[i].shooterid != 16){continue;}
			if (!this.fireOrders[i].animated){
				this.fireOrders[i].weapon.createCombatLogEntry(this.fireOrders[i]);
				this.animateSingleFireOrder(i, 1);
				return;
			}
		}
		fxCtx.clearRect(0, 0, res.x, res.y);

		this.handlePostFireOrderAnim();
	}

	this.handlePostFireOrderAnim = function(){
		this.createFireFinalEntry();

		if (game.unitExploAnims.length){
			this.createPlaceHolderEntry();
		}
		this.animateUnitExplos();
	}

	this.createFireFinalEntry = function(){
		if (!game.fireOrders.length){return;}
		this.createEndEntry("-- Fireorder animation completed --");
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
			if (game.phase == 3){cam.setFireFocus(game.fireOrders[i]);}
			game.draw();
			return;
		}

		for (var j = 0; j < game.fireOrders[i].anim.length; j++){
			for (var k = 0; k < game.fireOrders[i].anim[j].length; k++){								
				if (game.fireOrders[i].anim[j][k].done){continue;}

				if (game.fireOrders[i].weapon.animation == "em"){
					if (game.fireOrders[i].anim[j][k].n < game.fireOrders[i].anim[j][k].m){ // still to animate
						game.fireOrders[i].anim[j][k].n += 1;
						if (game.fireOrders[i].anim[j][k].n > 0){ // t valid, now animate
							if (game.fireOrders[i].anim[j][k].p == 0){ // still doing proj
								drawProjectile(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k]);
							}
							else if (game.fireOrders[i].anim[j][k].h){
								//drawEMSpriteExplo(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k]);
								drawExplosion(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k]);
							}

							if (game.fireOrders[i].anim[j][k].n >= game.fireOrders[i].anim[j][k].m){
								game.fireOrders[i].anim[j][k].done = true;
							}
						}
					}
				}
				else if (game.fireOrders[i].weapon.animation == "projectile"){
					if (game.fireOrders[i].anim[j][k].n < game.fireOrders[i].anim[j][k].m){ // still to animate
						game.fireOrders[i].anim[j][k].n += 1;
						if (game.fireOrders[i].anim[j][k].n > 0){ // t valid, now animate
							if (game.fireOrders[i].anim[j][k].p == 0){ // still doing proj
								drawProjectile(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k]);
							}
							else if (game.fireOrders[i].anim[j][k].h){
								//drawEMSpriteExplo(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k]);
								drawExplosion(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k]);
							}

							if (game.fireOrders[i].anim[j][k].n >= game.fireOrders[i].anim[j][k].m){
								game.fireOrders[i].anim[j][k].done = true;
							}
						}
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
				else if (game.fireOrders[i].weapon.animation == "explosive"){
					if (game.fireOrders[i].anim[j][k].n < game.fireOrders[i].anim[j][k].m){ // still to animate
						game.fireOrders[i].anim[j][k].n += 1;
						if (game.fireOrders[i].anim[j][k].n > 0){ // t valid, now animate
							drawExplosion(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k]); // EXPLO
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
								drawAreaProjectile(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k]); // projectile
							}
							else drawAreaEffect(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k]);
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
				}, 750);
			}
			else {
				$(fxCanvas).css("opacity", 0.3)
			}
		}
	}

	this.animateUnitExplos = function(){
		anim = window.requestAnimationFrame(game.animateUnitExplos.bind(this));
		window.now = Date.now();		
		window.elapsed = window.now - window.then;
		if (elapsed > window.fpsTicks){
			window.then = window.now - (window.elapsed % window.fpsTicks);
			fxCtx.clearRect(0, 0, res.x, res.y);

			var allDone = 1;
			for (var i = 0; i < game.unitExploAnims.length; i++){
				if (!game.unitExploAnims[i].done){
					if (!game.unitExploAnims[i].animating){
						game.unitExploAnims[i].animating = 1;
						cam.setZoom(2);
						cam.setFocusToPos(game.getUnit(game.unitExploAnims[i].id).getPlannedPos());
						game.redraw();
					}

					var done = 1;

					for (var j = 0; j < game.unitExploAnims[i].entries.length; j++){
						for (var k = 0; k < game.unitExploAnims[i].entries[j].anims.length; k++){
							if (game.unitExploAnims[i].entries[j].anims[k].t[0] > 0){
								drawUnitExplo(
									game.unitExploAnims[i].entries[j].anims[k].x,
									game.unitExploAnims[i].entries[j].anims[k].y,
									game.unitExploAnims[i].entries[j].anims[k].s,
									game.unitExploAnims[i].entries[j].anims[k].t[0],
									game.unitExploAnims[i].entries[j].anims[k].t[1]
								)
							}
							
							if (game.unitExploAnims[i].entries[j].anims[k].t[0] > game.unitExploAnims[i].entries[j].anims[k].t[1] * 0.7){
								game.unitExploAnims[i].entries[j].u.doDestroy();
								game.redraw();
							}

							if (game.unitExploAnims[i].entries[j].anims[k].t[0] < game.unitExploAnims[i].entries[j].anims[k].t[1]){
								game.unitExploAnims[i].entries[j].anims[k].t[0]++;
								done = 0;
							}
						}
					}

					if (!done){
						allDone = 0;
						break;
					}
					else {
						game.unitExploAnims[i].done = 1;
						game.unitExploAnims[i].animating = 0;
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
					.append($("<th>").attr("colSpan", 9).html(game.unitExploAnims[i].html))
					.data("shipid", game.unitExploAnims[i].id)
					.hover(
						function(){
							var data = $(this).data();
							game.getUnit($(this).data("shipid")).doHighlight()
						}
					)
				)
		$("#combatLogWrapper").find("#combatLogInnerWrapper").scrollTop(function(){return this.scrollHeight});
	}

	this.initIncomingTable = function(){
		var wrapper = $("#deployTable");

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].salvo || this.ships[i].flight){continue;}
			else if (this.ships[i].available != this.turn){continue;}
			else if (this.ships[i].available == this.turn && this.phase > 0){continue;}

			if (this.ships[i].friendly || game.phase == 0){
				var color = "green";
				if (!this.ships[i].friendly){color = "red"}
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
						.addClass(color + " font14")
						.html(this.ships[i].name + "</br>" + this.ships[i].notes)
					)
					.append($("<td>")
						.addClass(color + " font14")
						.html("NOW")
					)
				)
			}
			else {
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
								game.disableDeploy();
							}
							else if (!game.deploying && !game.aUnit && game.getUnit($(this).data("shipid")).canDeploy()){
								$(this).addClass("selected");
								game.enableShipDeploy($(this).data("shipid"));
							}
						}
					})
					.contextmenu(function(e){
						e.preventDefault(); e.stopPropagation();
					})	
				$(this).hover(
					function(e){
						game.drawDeployMarker($(this).data("shipid"));
					},
					function(e){
						game.redraw();
					}
				)
			})
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


	this.createReinforcementsTable = function(){
		if (!this.reinforcements.length){return;}

		var tbody = $("#deployWrapper").find("#reinforceBody").find("tbody");
			tbody.append($("<tr>")
				.append($("<td>").css("width", "25%"))
				.append($("<td>").css("width", "40%"))
				.append($("<td>"))
				.append($("<td>")))

		for (let i = 0; i < this.reinforcements.length; i++){
			if (this.reinforcements[i].userid != this.userid){continue;}

			tbody.append(
				$("<tr>")
				.addClass("requestReinforcements")
				.append(
					$("<td>")
					.append(
						$("<img>")
						.addClass("img50")
						.attr("src", "shipIcons/" + this.reinforcements[i].name.toLowerCase() + ".png")
					)
				)
				.append($("<td>").html(this.reinforcements[i].name + "</br>" + this.reinforcements[i].notes))
				.append($("<td>").html(this.reinforcements[i].available - this.turn))
				.append($("<td>").addClass("cost").html(this.reinforcements[i].cost))
			)
		}
	}

	this.initReinforceTable = function(){		
		$("#deployWrapper").find("#reinforceBody").find(".requestReinforcements").each(function(i){
			$(this)
			.data("id", game.reinforcements[i]["id"])
			.data("cost", game.reinforcements[i]["cost"])
			.click(function(e){
				e.stopPropagation();
				if (game.phase == -1){
					if (game.deploying && $(this).hasClass("selected")){
						$(this).removeClass("selected");
						game.disableDeploy();
					}
					else if (!aUnit){
						if ($(this).hasClass("green")){
							$(this).addClass("selected");
							game.enableShipDeploy($(this).data("id"));
						}
						else if (!game.deploying){
							var rem = game.getCurrentReinforceCost();
							if (!$(this).hasClass("green") && Math.floor(game.reinforcePoints) >= $(this).data("cost") + rem){
								$(this).addClass("selected");
								game.enableShipDeploy($(this).data("id"));
							} else popup("You have insufficient Reinforce Points ("+(game.reinforcePoints - rem)+") available.");
						}
					}
				} else popup("Reinforces can only be requested in Deploy/Initial Phase.");
			})
			.contextmenu(function(e){
				e.preventDefault(); e.stopPropagation();
				if (game.phase == -1 && !aUnit && $(this).hasClass("green")){
					game.undoDeploy($(this).data("id"));
					$(this).removeClass("green");
					$("#deployWrapper").find("#totalRequestCost").html(game.getCurrentReinforceCost());
					game.draw();
				}
			});
		})
	}

	this.initSelectionWrapper = function(){
		var l = 0;
		var s = 50;
		var className = "rotate270 size" + s

		this.ships.sort(function(a, b){
			return a.userid - b.userid || b.ship - a.ship || b.squad - a.squad || b.flight - a.flight || b.salvo - a.salvo || b.cost- a.cost
		});
	
		for (var i = 0; i < this.ships.length; i++){
			if (!this.ships[i].isReady){continue}

			var type = "friendly";
			if (this.ships[i].userid != game.userid){type = "hostile";}
			l++;

			ui.unitSelector
			.append($("<div>")
				.append($(this.ships[i].getBaseImage().cloneNode(true)).addClass(className))
				.data("id", this.ships[i].id)
				.addClass(type)
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
							if (game.flightDeploy){
								game.issueMission();
							}
							else if (game.flightDeploy){
								game.doDeployFlight(vessel.getPlannedPos());
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
						if (vessel.highlight){
							var x = $(this).width();
							var y = $(this).height();
							var p = $(this).offset();
							game.handleHoverEvent(e, 0, vessel);
							ui.shortInfo.css("left", p.left - x).css("top", p.top + y+20);
						}
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

		if (!l){return;}

		var w = l*(s+6);

		ui.unitSelector.width(Math.min(res.x - 400, w)).removeClass("disabled");
	}
}

Game.prototype.initOptionsUI = function(){
	$(".optionsWrapper").css("top", 2).css("left", res.x - 10 - 85)
	.find(".options").each(function(i){
		$(this).mousedown(function(e){e.preventDefault();});
		if (i == 0){
			$(this).hover(
				function(){game.drawFriendlyEW();},
				function(){game.redraw();}
			)
			$(this).click(function(){
				game.toggleFriendlyEW();
			})
		}
		else if (i == 1){
			$(this).hover(
				function(){game.drawHostileEW();},
				function(){game.redraw();}
			)
			$(this).click(function(){
				game.toggleHostileEW();
			})
		}
		else if (i == 2){
			$(this).click(function(){game.toggleDrawMovePaths();})
			$(this).addClass("selected");
		}
		else if (i == 3){
			$(this).click(function(){game.toggleDistMeter();})
		}
	}).end().drag();
}

Game.prototype.toggleDistMeter = function(){
	this.vector = !this.vector;
	$(".optionsWrapper .distMeter").toggleClass("selected");

	if (!this.vector){
		$("#vectorDiv").addClass("disabled");
		mouseCtx.clearRect(0, 0, res.x, res.y);
	}
	else $("#vectorDiv").removeClass("disabled");
}

Game.prototype.toggleDrawMovePaths = function(){
	this.drawMoves = !this.drawMoves;
	$(".optionsWrapper .drawMoves").toggleClass("selected");
	this.redraw();
}

Game.prototype.posIsOccupied = function(ship, pos){
	var dist = getDistance(ship, step) 
	if (ship.getRemSpeed()){return false;}
	if (ship.ship){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].ship && this.ships[i].id != ship.id && this.ships[i].userid == ship.userid){ // different ship, different owners
				var step = this.ships[i].getPlannedPos();

				if (!this.ships[i].getRemSpeed() && getDistance(pos, step) <= 0.66*(this.ships[i].size/2 + ship.size/2)){
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
		var r = Math.max(10, this.ships[i].size/5);
		if (this.ships[i].destroyed){continue;}
		if (!this.ships[i].isReady){continue;}

		var shipPos = this.ships[i].getDrawPos();
		if (pos.x < shipPos.x + r && pos.x > shipPos.x - r){
			if (pos.y > shipPos.y - r && pos.y < shipPos.y + r){
				var dist = getDistance(shipPos, pos);
				if (dist < max){
					pick = this.ships[i].id;
				}
			}
		}
	}

	if (!pick){
		return false;
	}
	return this.getUnit(pick).getParent();
}

Game.prototype.snapByTurnAttempt = function(pos){
	var pick = 0;
	var max = 100;

	for (var i = 0; i < this.ships.length; i++){
		var r = 5;

		if (this.ships[i].destroyed){continue;}
		if (!this.ships[i].isReady){continue;}

		var shipPos = this.ships[i].getDrawPos();
		if (pos.x < shipPos.x + r && pos.x > shipPos.x - r){
			if (pos.y > shipPos.y - r && pos.y < shipPos.y + r){
				var dist = getDistance(shipPos, pos);
				if (dist < max){
					pick = this.ships[i].id;
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

Game.prototype.drawShipOverlays = function(){
	var sensor = 0;
	var moves = 0;

	if (game.phase == -1){
		sensor = 1;
	} else if (game.phase == 0 || game.phase == 1){
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

Game.prototype.toggleFriendlyEW = function(){
	this.showFriendlyEW = !this.showFriendlyEW;
	$(".optionsWrapper .drawFriendlyEW").toggleClass("selected");
	salvoCtx.clearRect(0, 0, res.x, res.y);
	this.drawAllEW();
}

Game.prototype.toggleHostileEW = function(){
	this.showHostileEW = !this.showHostileEW;
	$(".optionsWrapper .drawHostileEW").toggleClass("selected");
	salvoCtx.clearRect(0, 0, res.x, res.y);
	this.drawAllEW();
}

Game.prototype.drawAllEW = function(){
	if (this.animating || this.sensorMode){return;}
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].flight || this.ships[i].salvo || !this.ships[i].deployed){continue;}
		if (this.ships[i].friendly && !this.showFriendlyEW){continue;}
		if (!this.ships[i].friendly && !this.showHostileEW){continue;}
		this.ships[i].getSystemByName("Sensor").drawEW();
	}
}

Game.prototype.drawFriendlyEW = function(){
	if (this.animating || this.sensorMode){return;}
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].flight || this.ships[i].salvo || !this.ships[i].deployed){continue;}
		if (!this.ships[i].friendly){continue;}
		this.ships[i].getSystemByName("Sensor").drawEW();
	}
}

Game.prototype.drawHostileEW = function(){
	if (this.animating || this.sensorMode){return;}
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].flight || this.ships[i].salvo || !this.ships[i].deployed){continue;}
		if (this.ships[i].friendly){continue;}
		this.ships[i].getSystemByName("Sensor").drawEW();
	}
}

Game.prototype.setShipTransform = function(){
	//console.log("setShipTransform");
	ctx.translate(cam.o.x, cam.o.y);
	ctx.scale(cam.z, cam.z);

	/*
	ctx.beginPath();
	ctx.arc(0, 0, 10, 0, 2*Math.PI);
	ctx.closePath();
	ctx.fillStyle = "yellow";
	ctx.fill();
	*/
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

Game.prototype.getUnit = function(id){
	return this.getShipById(id) || this.getIncomingById(id) || this.getReinforcementById(id) || false;
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

	$("#deployWrapper").find("#reinforceBody").find(".green").each(function(i){
		cost += $(this).data("cost");
	})

	return Math.floor(cost);
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

Game.prototype.resolveDeploy = function(){
	for (var i = 0; i < this.ships.length; i++){
		this.ships[i].deployed = true;
		if (this.ships[i].flight || this.ships[i].salvo){continue;}
		if (this.ships[i].available == this.turn){
			this.ships[i].deployAnim = [0, game.animData.jump];
			this.ships[i].deployed = false;
		}
	}

	this.doPositionLog("Initial Phase Log", 375);

	var show = 0;

	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].available == this.turn){show = 1; break;}
		else if (this.ships[i].flight && this.ships[i].mission.turn == this.turn){show = 1; break;}
	}
	
	game.setCamera();	

	if (!show){	
		this.initialPhaseResolutionDone();
	}
	else {
		setFPS(30);
		window.then = Date.now();
		window.startTime = then;
		this.animating = 1;
		this.animateJumpIn();
	}
}

Game.prototype.doPositionLog = function(html, length){
	var w = ui.unitSelector.width();
	var x = ui.unitSelector.css("left");
	var x = Math.floor(x.substr(0, x.length-2));

	var top;
	var left;

	if (x + w + 20 + 100 + length < res.x){
		left = x + w + 20;
		top = 0;
	}
	else {
		left = x;
		top = 80;
	}

	$("#combatLogWrapper").show()
		.width(length).css("top", top).css("left", left)
		.find(".combatLogHeader").html(html).end()
		.find("#combatLog").children().children().remove();
}

Game.prototype.setCamera = function(){
	console.log("setCamera")

	var data = this.getUnitMaxPos();

	var endX = (data.minX + data.maxX) / 2;
	var endY = (data.minY + data.maxY) / 2;

	var min = 0;
	var maxD = 0;
	var center = {x: endX, y: endY}

	for (var i = 0; i < this.ships.length; i++){
		var d = getDistance(center, this.ships[i].getCameraStartPos());
		maxD = Math.max(d, maxD);
	}

	cam.z = 1.5 - (Math.ceil(maxD / 100)/10)

	var shiftX = 0;

	if (ui.reinforceWrapper.is(":visible")){
		shiftX = 200;
	}

	cam.setFocusToPos({x: endX - shiftX, y: endY});
}

Game.prototype.getDistanceFromFocusCentre = function(){
	var min = 0;
	var max = 0;

	for (var i = 0; i < this.ships.length; i++){
		for (var j = i+1; j < this.ships.length; j++){
			var d = getDistance(cam.o, this.ships[j].getPlannedPos());
			max = Math.max(d, max);
		}
	}
	return max;
}

Game.prototype.animateJumpIn = function(){
	anim = window.requestAnimationFrame(game.animateJumpIn.bind(this));
	window.now = Date.now();		
	window.elapsed = window.now - window.then;

	if (elapsed > window.fpsTicks){
		//console.log("ding");

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
			this.initialPhaseResolutionDone();
		}
	}
}

Game.prototype.initialPhaseResolutionDone = function(){
	console.log("initialPhaseResolutionDone");
	var newUnit = 0;

	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].available == game.turn){newUnit = 1; break;
		} else if (this.ships[i].flight && this.ships[i].mission.turn == game.turn){newUnit = 1; break;}
	}

	if (newUnit){
		ui.unitSelector.empty();
		this.timeout = setTimeout(function(){
			game.initSelectionWrapper();
		})
	}

	this.logMissionChanges();
	this.logWeaponEvents();
	this.createPlaceHolderEntry();
	this.createEndEntry("-- Initial Events concluded --");
	game.draw();
}

Game.prototype.logMissionChanges = function(){
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].flight && this.ships[i].available < game.turn && this.ships[i].mission.turn == game.turn){
			this.ships[i].createMissionChangeEntry();
		}
	}
}

Game.prototype.logWeaponEvents = function(){
	var body = $("#combatLog").find("tbody");

	for (var i = 0; i < this.events.length; i++){
		if (this.events[i] instanceof Weapon){
			var shipId = this.events[i].parentId;
			var systemId = this.events[i].id;
			body.append(
			$("<tr>")
				.append($("<td>")
					.html(this.events[i].getUsageString())
					.data("shipId", shipId)
					.data("systemId", systemId)
					.hover(
						function(){
							fxCtx.clearRect(0, 0, res.x, res.y);
							fxCtx.translate(cam.o.x, cam.o.y);
							fxCtx.scale(cam.z, cam.z);
							var d = $(this).data();
							var unit = game.getUnit(d.shipId)
							unit.getSystem(d.systemId).drawSystemArc(unit.getTurnStartFacing(), unit.rolled, unit.getTurnStartPos());
							fxCtx.setTransform(1,0,0,1,0,0);
						},
						function(){
							fxCtx.clearRect(0, 0, res.x, res.y)
						}
					)
				)
			)
		}
	}
}

Game.prototype.prepResolveMovement = function(){
	this.drawingEvents = 0;
	this.resetImageData();
	this.setCamera();
	this.setUnitMoveDetails();
}

Game.prototype.doResolveMovement = function(){
	if (aUnit){game.getUnit(aUnit).select();}
	this.animating = 1;
	this.animShip = 1;
	this.animFlight = 0;
	this.animSalvo = 0;

	this.doPositionLog("Movement Resolution Log", 600);

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

Game.prototype.toggleUI = function(){
	if (aUnit){
		unit = game.getUnit(aUnit);
		if (unit.canTurn()){
			if (ui.turnButton.is(":visible")){
				$(ui.turnButton).addClass("disabled");
			} else $(ui.turnButton).removeClass("disabled");
		}
	}
}

Game.prototype.setShortenInfo = function(e, unit, dist){
	return;
	var short = "Shorten: <span class=";
	var post = "Post: ";

	var last = unit.getLastTurn();
	var remEP = unit.getRemEP();
	var remDelay = unit.getRemDelay();

	var aim = remDelay-dist;
	var multi = aim / last.delay*2;
	var cost = Math.ceil(multi * last.cost);

	var left;
	var top;

	
	if (e){
		left = e.clientX - $(ui.doShorten).width()/2;
		top = e.clientY + 50;
	} else {
		var pos = unit.getGamePos();
		var pos = getPointInDir(100, unit.getDrawFacing()-90, pos.x, pos.y);
		left = pos.x - $(ui.doShorten).width()/2;
		top = pos.y + 50;
	}

	if (cost > remEP){
		short += "'red'>";
	}
	else {
		short += "'green'>";
		post += "<span class='green'>" + (remEP - cost) + "</span> / " + unit.getEP();
	}
	
	short += cost + " TA</span>";
	
	$(ui.doShorten)
		.empty()
		.append($("<div>").html(short))
		.append($("<div>").html(post))
		.data("cost", cost)
		.data("delay", aim)
		.css("left", left)
		.css("top", top)
}


Game.prototype.setPhaseSwitchDiv = function(){
	$("#phaseSwitchDiv").find("#phaseSwitchInnerDiv")
		.append($("<div>").html("Turn: " + this.turn))
		.append($("<div>").html(getPhaseString(this.phase)))
		.show();
}

Game.prototype.setGameInfo = function(){
	$("#upperGUI").find("#overview").find("tbody")
		.append($("<tr>")
			.append($("<td>").html(this.turn))
			.append($("<td>").html(getPhaseString(this.phase)))
			.append($("<td>").html(this.getPlayerStatus().value)))
}

Game.prototype.setFocusInfo = function(){
	for (let i = 0; i < this.playerstatus.length; i++){
		if (game.turn == 1 && game.phase == -1 && this.playerstatus[i].userid != this.userid){
			$("#upperGUI").find("#overview").find(".focusInfo" + this.playerstatus[i].id).html("Unknown"); continue;
		}
		var html = "<span class='yellow'>" + this.getUserCurFocus(i) + "</span> + " + this.getUserFocusGain(i) + " / turn, max: " + this.getUserMaxFocus(i);
		$("#upperGUI").find("#overview").find(".focusInfo" + this.playerstatus[i].id)
			.html(html)
			.data("userid", this.playerstatus[i].userid)
			.hover(
				function(){game.showFocusInfo($(this).data("userid"));},
				function(){game.hideFocusInfo();}
			)

	}
}

Game.prototype.getRemFocus = function(){
	for (let i = 0; i < this.playerstatus.length; i++){
		if (this.playerstatus[i].userid == game.userid){
			return this.getUserCurFocus(i);
		}
	}
	return 0;
}

Game.prototype.userHasNoCommand = function(userid){
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].userid != userid){continue;}
		if (this.ships[i].command && this.ships[i].isDestroyed()){return true;}
	}
	return false;
}

Game.prototype.getCommandUnit = function(userid){
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].userid != userid){continue;}
		if (this.ships[i].command){return this.ships[i];}
	}
	return false;
}

Game.prototype.getUserCurFocus = function(i){
	return this.playerstatus[i].curFocus;
}

Game.prototype.getUserFocusGain = function(i){
	return this.playerstatus[i].gainFocus;
}

Game.prototype.getUserMaxFocus = function(i){
	return this.playerstatus[i].maxFocus;
}

Game.prototype.showFocusInfo = function(userid){
	var i;
	for (i = 0; i < this.playerstatus.length; i++){
		if (this.playerstatus[i].userid == userid){break;}
	}

	var flagship = game.getCommandUnit(userid);
	var command = flagship.getSystemByName("Command");

	$(document.body)
	.append(
		$("<div>").attr("id", "sysDiv")
		.css("top", 180).css("left", 0)
		.append($("<table>")
			.append($("<tr>")
				.append($("<th>").html("Focus Overview - " + this.playerstatus[i].username).attr("colSpan", 2))
			)
			.append($("<tr>")
				.append($("<td>").html("Game Point Value").css("width", "70%"))
				.append($("<td>").html(Math.floor(game.settings.pv / 10 * game.settings.focusMod)))
			)
			.append($("<tr>")
				.append($("<td>").html("Flagship Command Rating"))
				.append($("<td>").html(flagship.baseFocusRate + " %"))
			)
			.append($("<tr>")
				.append($("<td>").html("Base Focus Generation"))
				.append($("<td>").html(Math.floor(game.settings.pv / 10 * game.settings.focusMod) / 100 * flagship.baseFocusRate))
			)
			.append($("<tr>")
				.append($("<td>").attr("colSpan", 2).css("height", 10))
			)
			.append($("<tr>")
				.append($("<td>").html("Flagship Officer Modifiers"))
				.append($("<td>").html("+" + (command ? (command.getCrewEffect() * command.getCrewLevel() + "%") : "0%")))
			)
			.append($("<tr>")
				.append($("<td>").html("Flagship Crit Modifiers"))
				.append($("<td>").html( (command ? (command.getCritMod() + "%") : "0%")))
			)
			.append($("<tr>")
				.append($("<td>").attr("colSpan", 2).css("height", 10))
			)
			.append($("<tr>")
				.append($("<th>").html("Final Focus Gain"))
				.append($("<th>").html(this.playerstatus[i].gainFocus))
			)
		))
	return;
}

Game.prototype.hideFocusInfo = function(){
	$("#sysDiv").remove();
}

Game.prototype.getFocusSpending = function(){
	var spend = 0;
	for (let i = 0; i < this.ships.length; i++){
		if (!this.ships[i].friendly){continue;}
		if (this.ships[i].focus){spend += Math.ceil(this.ships[i].cost);}
	}
	return spend;
}
Game.prototype.getPlayerStatus = function(){
	for (let i = 0; i < this.playerstatus.length; i++){
		if (this.playerstatus[i].userid == this.userid){return this.playerstatus[i];}
	}
	return false;
}

Game.prototype.addFocusInfo = function(){
	var tBody = $("#upperGUI").find("#overview").find("tbody");
		tBody
			.append($("<tr>")
				.append($("<td>")
					.css("height", 10)
					.attr("colSpan", 3)))
			.append($("<tr>")
				.append($("<th>")
					.attr("colSpan", 3)
					.html("Focus Overview")))
	
	for (let i = 0; i < this.playerstatus.length; i++){
		var string = "<span class='";
		if (this.playerstatus[i].userid == this.userid){
			string += "green'";
		} else string += "red'";
		string += ">" + this.playerstatus[i].username + "</span>";

		tBody.append($("<tr>")
			.append($("<th>")
				.html(string))
			.append($("<td>")
				.attr("colSpan", 2)
				.addClass("focusInfo" + this.playerstatus[i].id)))
	}

	this.setFocusInfo()

	tBody
		.append($("<tr>")
			.append($("<td>")
				.css("height", 10)
				.attr("colSpan", 3)))
}

Game.prototype.setConfirmInfo = function(){
	var player = this.getPlayerStatus();

	var td = $("<td>")
		.attr("colSpan", 3)


	if (this.status == "closed"){
		td
		.append($("<input>")
			.attr("type", "button")
			.attr("value", "Show Statistics")
			.click(function(){
				if ($("#statsWrapper").length){return;}
				ajax.getStats();
			}))
	}
	else if (!player){
		td
		.append($("<input>")
			.attr("type", "button")
			.attr("value", "Observer Mode")
			.addClass("inactive")
			.css("background-color", "yellow")
			.click(function(){
				return;
			}))
	}
	else if (player.status == "ready"){
		td
		.append($("<input>")
			.attr("type", "button")
			.attr("value", "Waiting for Opponent")
			.addClass("inactive")
			.css("background-color", "#00ff14")
			.click(function(){
				return;
			}))
	}
	else {
		td
		.append($("<input>")
			.attr("type", "button")
			.attr("value", "Confirm Orders")
			.click(function(){
				game.endPhase();
			}))
	}

	
	$("#upperGUI").find("#overview").find("tbody")
	.append($("<tr>").append(td));

	if (this.phase == 3 && this.getPlayerStatus().status == "waiting"){
		$("#upperGUI").find("#overview").find("tbody")
		.append($("<tr>").append($("<td>").css("height", 8)))
		.append($("<tr>")
			.append($("<td>").attr("colSpan", 3)
				.append($("<input>")
					.attr("type", "button")
					.attr("value", "Concede Match")
					.click(function(){
						if (!game.canConfirm){return;}
						game.canConfirm = 0;
						game.concedeMatch(goToLobby);
					})
				)
			)
		)
	}
}


Game.prototype.create = function(data){

	this.setPhaseSwitchDiv();
	this.setGameInfo();
	this.setConfirmInfo();
	window.username = this.getPlayerStatus().username;

	for (var i = 0; i < data.ships.length; i++){
		var ship = window.initUnit(data.ships[i]);
		this.ships[i] = ship;
		this.ships[i].setUnitState();
		this.ships[i].setSubSystemState();
		this.ships[i].create();
	}

	this.setCC();

	for (var i = 0; i < this.ships.length; i++){
		this.ships[i].setTarget();
		this.ships[i].setLayout();
		this.ships[i].setSize();
		this.ships[i].setDrawData();
	}

	for (var i = 0; i < this.ships.length; i++){
		this.ships[i].setImage();
		this.ships[i].createBaseDiv();
		this.ships[i].getAttachDivs();
		this.ships[i].setSupportImage();
	}

	if (game.turn == 1 && game.phase == -1){this.setInitialFacing(this.ships);}
	this.setInitialFacing(data.reinforcements);

	for (var i = 0; i < data.reinforcements.length; i++){
		this.reinforcements[i] = window.initUnit(data.reinforcements[i]);
		this.reinforcements[i].setLayout();
		this.reinforcements[i].setImage();
		this.reinforcements[i].setSubSystemState();
		this.reinforcements[i].createBaseDiv();
		this.reinforcements[i].friendly = 1;
		this.reinforcements[i].deployed = 0;
	}

	if (game.phase != 2){this.checkUnitOffsetting();}


	this.addFocusInfo();
	this.initIncomingTable();
	this.createReinforcementsTable();
	this.initReinforceTable();
	this.setDeployWrapperVisibility();
	this.initSelectionWrapper();
	this.initOptionsUI();
	this.initEvents();
	this.extractPlayerStatusData()
	cam.setFocusToPos({x: 0, y: 0});
	this.initPhase(this.phase);
}

Game.prototype.extractPlayerStatusData = function(){
	for (var i = 0; i < this.playerstatus.length; i++){
		if (this.playerstatus[i].userid == userid){
			if (this.playerstatus[i].status == "waiting"){
				this.canSubmit = 1;
				this.reinforcePoints = this.playerstatus[i].value;
				break;
			}
		}
	}
}

Game.prototype.getSampleSubUnit = function(name){
	for (let i = 0; i < this.fighters.length; i++){
		if (this.fighters[i].name == name){return this.fighters[i];}
	}
	for (let i = 0; i < this.ballistics.length; i++){
		if (this.ballistics[i].name == name){return this.ballistics[i];}
	}
}

Game.prototype.hasNoCommandUnit = function(){
	for (let i = 0; i < this.ships.length; i++){
		if (!this.ships[i].friendly || this.ships[i].flight || this.ships[i].salvo){continue;}
		if (this.ships[i].command && (this.ships[i].isDestroyed() || this.ships[i].isJumpingOut())){return true;}
	}
	return false;
}

Game.prototype.canSetNewCommandUnit = function(){
	for (let i = 0; i < this.ships.length; i++){
		if (!this.ships[i].friendly || this.ships[i].flight || this.ships[i].salvo || this.ships[i].isDestroyed()){continue;}
		return true;
	}
	return false;
}