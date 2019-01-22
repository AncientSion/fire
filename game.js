function Game(data){
	this.settings = data.settings;
	this.id = data.settings.id;
	this.name = data.settings.name;
	this.status = data.settings.status;
	this.userid = data.userid;
	this.turn = data.settings.turn;
	this.phase = data.settings.phase;
	this.playerstatus = data.playerstatus;
	this.const = data.const;
	this.ships = [];
	this.incoming = [];
	this.obstacles = [];
	this.reinforcements = [];
	this.ships = [];
	this.reinforcements = [];
	this.fireOrders = []
	this.mode = false;
	this.deploying = false;
	this.flightDeploy = false;
	this.deploySpeed = 0;
	this.mission = 0;
	this.index = 1;
	this.reinforcePoints = 0;
	this.animating = false; // movement 1, cam 2, fire 3
	this.animateAllFire = false;
	this.deployArea = [];
	this.vector = false;
	this.opacity = false;
	this.markers = [];
	this.ballistics = [];
	this.fighters = [];
	this.unitExploAnims = [];
	this.shortInfo = false;
	this.turnMode = 0;
	this.moveArea = 0;
	this.zIndex = 10;
	this.sensorMode = 0;
	this.target = 0;
	this.deploys = data.deploys;
	this.callback = ["", 0];

	this.animShip = 0;
	this.animFlight = 0;
	this.animSalvo = 0;
	this.animObstacles = 0;
	this.animFocus = 0;

	this.animForcedMoves = 0;
	this.drawingEvents = 1;
	this.mission;
	this.timeout = 0;
	this.canSubmit = 0;
	this.canConfirm = 1;

	this.drawCircle = 1;
	this.drawPlans = 1;
	this.showFriendlyEW = 0;
	this.showHostileEW = 0;
	this.showObstacleMoves = 1;
	this.movingObstacles = 0;

	this.snapTurn = 0;
	this.events = [];
	this.wave = data.wave;
	this.arcRange = 1200;
	this.phaseDelay = 500;
	this.animData = {jump: 30};
	this.commandChange = {old: 0, new: 0, original: 0}
	this.subPhase = 1;
	this.animMoves = 0;
	this.exclusiveSystem = false;
	this.obstacleDataSet = 0;
	this.deployImage = false;

	this.initAnimateMovement = function(){
		this.drawingEvents = 0;
		this.animating = 1;
		this.animMoves = 1;
		this.doAnimateMovement();
	}

	this.doAnimateMovement = function(){
		anim = window.requestAnimationFrame(game.doAnimateMovement.bind(this));
		window.now = Date.now();		
		window.elapsed = window.now - window.then;
		if (elapsed < window.fpsTicks){return;}

		window.then = window.now - (window.elapsed % window.fpsTicks);
		ctx.clearRect(0, 0, res.x, res.y);
		fxCtx.clearRect(0, 0, res.x, res.y);
		salvoCtx.clearRect(0, 0, res.x, res.y);

		ctx.translate(cam.o.x, cam.o.y);
		ctx.scale(cam.z, cam.z);

		//game.drawEvents();

		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].deployed){
				if (!game.ships[i].animatesThisSegment()){game.ships[i].draw(); continue;}

				for (var j = 0; j < game.ships[i].actions.length; j++){
					if (game.ships[i].actions[j].turn == game.turn && !game.ships[i].actions[j].animated){
						var action = game.ships[i].actions[j];

						if (action.forced && !game.animForcedMoves || action.t[1] == 0){
							action.animated = 1;
							continue;
						}

						if (action.type[0] == "m"){ // move
							action.t[0] += 1;
							game.ships[i].drawX += action.v.x * 1 / action.t[1];
							game.ships[i].drawY += action.v.y * 1 / action.t[1];
							if (action.t[0] >= action.t[1]){
								game.ships[i].drawX = action.x;
								game.ships[i].drawY = action.y;
								if (game.ships[i].doesContinueRolling()){game.ships[i].createStillRollingEntry();}
							}
						}
						else {
							if (action.type[0] == "t"){ // turn
								action.t[0]++;
								game.ships[i].drawFacing = addToDirection(game.ships[i].drawFacing, action.t[2]);
							}
							else if (action.type == "pivot"){ // pivot
								action.t[0]++;
								game.ships[i].drawFacing = addToDirection(game.ships[i].drawFacing, action.t[2]);
							}
							else if (action.type == "rotate"){ // pivot
								action.t[0]++;
								game.ships[i].drawFacing = addToDirection(game.ships[i].drawFacing, action.t[2]);
							}
							else if (action.type[0] == "r"){//roll
							}
							else if (action.type[0] == "f"){//flip
							}
							else if (action.type[0] == "p"){//patrol
							}
							else if (action.type[0] == "d"){//deploy
							}
							else if (action.type[0] == "j"){//jumpIn/Out
							}
						}

						if (action.t[0] >= action.t[1]){
							action.animated = true;
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
			if (!done){break;}
			else if (game.ships[i].animatesThisSegment()){
				for (var j = 0; j < game.ships[i].actions.length; j++){
					if (game.ships[i].actions[j].turn == game.turn){
						if (!game.ships[i].actions[j].animated){
							done = false;
							break;
						}
					}
				}
			}
		}
		
		if (done){
			window.cancelAnimationFrame(anim);
			game.finishMoveSubPhase(game.phaseDelay);
		}
	}

	this.hasSnapCenterline = function(shooter, shooterAngle, target){
		if (game.phase > 0){
			if (shooter.focus && target && !target.focus && !shooter.getRemSpeed()){
				//debug("angle to target: " + shooterAngle);
				if (shooterAngle == 0 || shooterAngle == 360 || (shooterAngle > 0 && shooterAngle < 0.2)|| (shooterAngle < 360 && shooterAngle > 359.8)){
					//debug("snap!");
					return true;
				}
			}
		}
		else if (game.phase == -1){
			if (Math.round(shooterAngle) == 360 || Math.round(shooterAngle) == 0){
				//debug("snap!");
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
			if (!this.ships[i].flight || !this.ships[i].friendly || !this.ships[i].mission.new){continue;}
			data.push(this.ships[i].mission);
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

	this.doAbortMission = function(){
		var flight = game.getUnit(aUnit);

		if (!flight.friendly){return;}
		if (flight.oldMission.id != flight.mission.id){
			game.UndoAbortMission(flight); return;
		}

		game.flightDeploy = 1;
		game.mission = 1;

		game.issueMission(flight.getGamePos());
		flight.mission.arrived = game.turn;

		if (!flight.actions[flight.actions.length-1].resolved){
			flight.actions.splice(flight.actions.length-1, 1);
		}

		game.mission = 0;
		game.flightDeploy = 0;
		
		flight.setPatrolLayout();
		flight.setPatrolImage();
		game.redraw();
		//flight.setNextMove();

		$(flight.element).find("input").attr("value", "Re-engage Mission");
		//flight.doUnselect();
	}

	this.UndoAbortMission = function(flight){
		flight.mission = flight.oldMission;
		flight.patrolLayout = 0;
		flight.setLayout();
		flight.setImage();
		flight.setCurSpeed();
		flight.setNextMove();
		game.updateSingleIntercept(flight);
		$(flight.element).find("input").attr("value", "Abort Mission");
		game.redraw();
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
			if (!t.salvo && aUnit != this.shortInfo){
				valid = true;
				dest = t.getPlannedPos();
			}
		}

		if (!valid){
			return false;
		}

		var s = this.getUnit(aUnit);
		var o = s.getGamePos();
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

		if (s.oldMission && t.id == s.oldMission && s.oldMission.targetid){
			mission = s.oldMission;
		}
		else {
			mission = {id: -1, unitid: s.id, turn: this.turn, phase: this.phase, type: this.mission, targetid: t.id || 0, x: dest.x, y: dest.y, arrived: 0, new: 1};
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
			s.heading = a;
			s.setCurSpeed();
			s.setNextMove();

		s.setBaseLayout();
		s.setSize();
		s.resetImage();
		//s.drawX = p.x;
		//s.drawY = p.y;
		s.setSupportImage();
		s.getAttachDivs();
		s.disableMissionMode();
		this.updateSingleIntercept(s);
		this.redraw();
		ui.deployOverlay.hide();
		this.checkUnitOffsetting();
	}

	this.doDeployFlight = function(pos){

		if (game.mission == 1 && !pos || game.mission == 2 && !game.shortInfo){return false;}

		var s = this.getUnit(aUnit);
		var mission = game.mission;
		var flightDeploy = game.flightDeploy;
		var hangar = s.getSystem(this.flightDeploy.id);
			hangar.setFireOrder(0, pos).select();
		var o = s.getGamePos();
		var facing = 0;
		var p = getPointInDir(0, facing, o.x, o.y);
		var id = range(0, -100);

		var move = new Move(-1, id, this.turn, "deploy", 0, 0, o.x, o.y, facing, 0, 0, 0, 0, 1, 1);

		var flight = new Flight(
			{id: id, name: "Flight", mission: false, traverse: 1, actions: [move], index: 0,
			x: o.x, y: o.y, mass: 0, facing: facing, ep: 0, baseImpulse: 0, curImp: 0, size: 0, fSize: 15, baseSize: 25, unitSize: 4, userid: this.userid, available: this.turn}
		);
		flight.launch = {
			unitid: aUnit,
			systemid: flightDeploy.id,
			loads: flightDeploy.loads
		};
		for (var i = 0; i < flightDeploy.loads.length; i++){
			for (var j = 1; j <= flightDeploy.loads[i].launch; j++){
				flight.index++;
				var fighter = new Fighter(flightDeploy.loads[i]);
					fighter.id = flight.index;
				for (var k = 0; k < fighter.systems.length; k++){
					flight.index++;
					fighter.systems[k].id = flight.index;
				}
				flight.structures.push(fighter);
			}
		}

		flight.setCallSign();
		flight.setBaseImpulse();
		flight.setUnitState();
		flight.isReady = 1;
		flight.doDraw = 0;
		flight.create();
		flight.setPreMovePosition();
		flight.setBaseLayout();
		flight.setSize();
		this.ships.push(flight);


		s.doUnselect();
		flight.doDraw = 1;
		this.mission = mission;
		flight.selected = 1;
		aUnit = flight.id;
		this.issueMission(pos);

		flight.createBaseDiv();

		this.hideInstruct();
		ui.deployOverlay.hide();
		this.flightDeploy = false;
		this.deploySpeed = 0;
		aUnit = false;
		flight.selected = 0;

		$(flight.element).css("top", 600).css("left", 0);
		this.checkUnitOffsetting();
		this.draw();
	}

	this.doDeploySalvo = function(launcher, targetid, pos){
		var s = game.getUnit(aUnit);
		var o = s.getGamePos();
		var facing = 0;
		var p = getPointInDir(0, facing, o.x, o.y);
		var id = range(0, -100);

		var mission = {id: 0, unitid: id, type: 2, targetid: targetid, turn: game.turn, x: pos.x, y: pos.y, arrivd: 0, new: 1, target: false};

		var id = range(0, -100);
		var deploy = new Move(-1, id, this.turn, "deploy", 0, 0, o.x, o.y, facing, 0, 0, 0, 0, 1, 1);

		var salvo = new Salvo (
			{id: id, name: "Salvo", mission: mission, traverse: 0, flight: 0, salvo: 1, ship: 0, squad: 0, obstacle: 0, notes: (aUnit + ";" + launcher.id), focus: 0, disabled: 0, command: 0, 
			x: p.x, y: p.y, mass: 0, facing: facing, ep: 0, baseImpulse: 0, curImp: 0, size: 50, fSize: 0, baseSize: 0, unitSize: 0, userid: this.userid, available: this.turn, actions: [deploy]}
		);

		var shots = launcher.getShots();
		for (var i = 1; i <= shots; i++){
			salvo.structures.push(new Ballistic(launcher.loads[launcher.ammo]));
		}

		salvo.setBaseImpulse();
		salvo.setUnitState();
		salvo.isReady = 1;
		salvo.doDraw = 1;
		salvo.create();
		this.ships.push(salvo);
		salvo.setPreMovePosition();
		salvo.setCurSpeed();
		salvo.setLayout();
		salvo.setSize();
		salvo.setDrawData();
		salvo.setImage();
		salvo.createBaseDiv();
		salvo.setVarious();
		salvo.setNextMove();
		game.checkSalvoOffset(salvo.id);
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

	this.offsetAllSalvo = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].salvo){this.checkSalvoOffset(this.ships[i].id);}
		}
	}

	this.checkSalvoOffset = function(id){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].id != id){continue;}
			var aPos = this.ships[i].getDrawPos();

			for (var j = 0; j < this.ships.length; j++){
				if (!this.ships[i].doDraw || this.ships[i].id == this.ships[j].id){continue;}

				var bPos = this.ships[j].getDrawPos();

				if (aPos.x == bPos.x && aPos.y == bPos.y){
					this.ships[i].doRandomOffset(0);
				}
			}
		}
	}

	this.checkUnitOffsetting = function(){
		//debug("checkUnitOffsetting");
		this.offsetFlightFlight();
		this.offsetFlightShip();
		this.offsetAllSalvo();
	}

	this.offsetFlightFlight = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (!this.ships[i].flight || !this.ships[i].doDraw){continue;}
			var aPos = this.ships[i].getDrawPos();

			for (var j = i+1; j < this.ships.length; j++){
				if (!this.ships[j].flight || !this.ships[j].doDraw){continue;}
				var bPos = this.ships[j].getDrawPos();

				if (aPos.x == bPos.x && aPos.y == bPos.y){
					this.ships[i].doRandomOffset(1);
					this.ships[j].doRandomOffset(-1);
				}
			}
		}
	}

	this.offsetFlightShip = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (!this.ships[i].ship || !this.ships[i].doDraw){continue;}
			var aPos = this.ships[i].getDrawPos();

			for (var j = 0; j < this.ships.length; j++){
				if (!this.ships[j].flight || !this.ships[i].doDraw){continue;}
				if (game.phase != 0 && this.subPhase == 1 && (!(game.phase == -1 && this.ships[j].available == game.turn))){continue;}
				var bPos = this.ships[j].getDrawPos();

				if (aPos.x == bPos.x && aPos.y == bPos.y){
					this.ships[j].doRandomOffset(0);
				}
			}
		}
	}

	this.updateSingleIntercept = function(update){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].ship || this.ships[i].squad){continue;}
			if (this.ships[i].mission.targetid == update.id){
				this.ships[i].setNextMove();
			}
		}
	}

	this.hideInstruct = function(){
		$("#instructWrapper").hide();
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
					callsign: this.ships[i].callsign,
					display: "",
					totalCost: this.ships[i].getCost(),
					moraleCost: this.ships[i].getCost(),
					mission: this.ships[i].mission,
					loadAdjust: this.ships[i].getLoadAdjustment(),
					upgrades: this.ships[i].getLaunchData(),
					actions: this.ships[i].getLaunchAction(),
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
			//if (game.turn != this.ships[i].available){continue;}

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
			data.push({data: power, msg: (ew.length ? "</br></br>" : "") + "The following units have unspent power:"});
		}

		if (data.length){
			this.clickablePop(data);
			return true;
		}
		return false;
	}

	this.handleMoveWarnings = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].ship || this.ships[i].squad){

			}
		}
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
			if (this.ships[i].getRemSpeed()){
				if (aUnit){
					this.getUnit(aUnit).doUnselect();
				}
				popup("You have units with unused speed (#" + this.ships[i].id + ")");
				this.ships[i].handleHovering();
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
	
	this.handleFleetCommandWarning = function(){
		var hasCommand = this.userHasCommandUnit(this.getPlayerStatus().userid);
		var canHaveCommand = this.userCanHaveCommandUnit(this.getPlayerStatus().userid);
		if (canHaveCommand && !hasCommand){
			popup("There is no legal Fleet Command for the next turn.</br>Please select a unit to act as Fleet Command.");
			return true;
		}
		return false;
	}

	this.hasNoFocus = function(){
		var noFocus = 1;
		var data = [];

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].userid != this.userid){continue}
			if (this.ships[i].focus){noFocus = 0;break;}
		}

		if (noFocus){
			var html = "You have not issued Focus for any unit.";
			html += "<input type='button' class='popupEntryConfirm' value='Confirm Orders' onclick='game.doConfirmOrders()'>";
			popup(html);
			return true;
		}
		return false;
	}

	this.userHasCommandUnit = function(userid){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].userid != userid){continue;}
			if (this.ships[i].jumpIsImminent() || this.ships[i].isDestroyed()){continue;}
			if (this.ships[i].command){return true;}
		}
		return false;
	}

	this.userCanHaveCommandUnit = function(userid){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].userid != userid){continue;}
			if (this.ships[i].jumpIsImminent() || this.ships[i].isDestroyed()){continue;}
			if (this.ships[i].flight || this.ships[i].salvo){continue;}
			return true;
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
		//debug("doConfirmOrders"); return;
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
			ship.handleHovering();
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
				if (this.handleMoveWarnings()){return;}
				this.doConfirmOrders();
			}
			else if (this.phase == 2){
				if (this.handleFireWarnings()){return;}
				this.doConfirmOrders();
			}
			else if (this.phase == 3){
				if (this.handleFleetCommandWarning()){return;}
				if (this.hasNoFocus()){return;}
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

	this.disableDeployment = function(){
		if (aUnit){game.getUnit(aUnit).select();}
		this.deploying = false;
		this.deployArea = [];
		this.deployBlock = false;
		//this.deployImage = false;
		moveCtx.clearRect(0, 0, res.x, res.y);
		planCtx.clearRect(0, 0, res.x, res.y);
		mouseCtx.clearRect(0, 0, res.x, res.y);
		ui.deployOverlay.hide();
		//if (aUnit){game.getUnit(aUnit).doUnselect();}
		game.draw();
	}

	this.enableDeployment = function(id){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].id == id){
				this.deploying = this.ships[i];
				ui.deployOverlay.css("top", res.y - 100).css("left", 10).show().find("#deployType").html("Deploy unit here");
				this.setupDeployZone();
				this.drawDeployZone();
				$("#leftUnitWrapper").find("#reinforceBody").find(".requestReinforcements").each(function(){
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
		if (!hangar.canFire()){popup("The selected Hangar is not ready yet"); return false;}

		var hasFighters = 0;
		var speed = 1000;
		for (var i = 0; i < hangar.loads.length; i++){
			if (hangar.loads[i].launch >= 1){
				speed = Math.min(speed, hangar.loads[i].baseImpulse);
				hasFighters = 1;
			}
		}

		if (!hasFighters){popup("No fighter amount selected"); return false;}

		var value = Math.floor($($("#hangarDiv")).find("input[name=mission]:checked").val());
		if (!value){popup("No mission selected"); return false;}
		game.mission = value;

		this.flightDeploy = hangar;
		this.deploySpeed = speed;
		//var mission = this.getMissionTypeString(this.flightDeploy.mission);

		//instruct("Please select the target unit/location target for the flight");
		instruct("Select mission target for the Flight");
		ui.deployOverlay.css("top", res.y - 100).css("left", 10).show().find("#deployType").html(game.getMissionType(value)).end();
	}

	this.handleFlightDeployMouseMove = function(e, origin, target, color, speed){
		$(ui.deployOverlay).css("top", e.clientY + 100).css("left", e.clientX - 50)

		drawFlightVector(origin, target, color, speed);
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
		for (var i = 0; i < this.playerstatus.length; i++){

			var step = !(i % 2) ? -1 : 1;
			var d = 500;
			var center = {x: 0 , y: 0};
			var userid;
			var color;

			//debug(center);


			if (this.playerstatus[i].userid == this.userid){
				userid = this.userid;
				color = "green";
			}
			else {
				userid = 0;
				color = "red";
			}

			if (game.turn > 1){
				var count = 0;
				for (var j = 0; j < this.ships.length; j++){
					if (this.ships[j].flight || this.ships[j].salvo || this.ships[j].obstacle){continue;}
					if (this.ships[j].available > game.turn){continue;}
					d = Math.max(d, getDistance(this.ships[j], center));
					center.x += this.ships[j].x;
					center.y += this.ships[j].y;
					count++;
				}

				center.x /= count;
				center.y /= count;
				//debug(center);

				center.x = Math.round(center.x);
				center.y = Math.round(center.y);
			}

			this.deployArea.push({
				userid: userid,
				c: color,
				x: center.x,
				y: center.y,
				s: 800 + (game.turn > 1)*200,
				b: Math.min(550 + (game.turn > 1)*200, Math.round(d*2.5)),
				deleteW: 850 + (game.turn > 1)*200,
				start: step == -1 ? 90 : 270,
				end: step == -1 ? 270 : 90,
				pick: ""
			});
		}
	}

	this.rgbToHex = function(r, g, b, a) {
    if (r > 255 || g > 255 || b > 255 || a > 255){
        throw "Invalid color component";
    }
   return ((r << 16) | (g << 8) | b).toString(16);
	}

	this.drawDeployZone = function(){
		for (var i = 0; i < this.deployArea.length; i++){
			drawCtx.translate(cam.o.x, cam.o.y)
			drawCtx.scale(cam.z, cam.z)
			drawCtx.beginPath();
			drawCtx.arc(this.deployArea[i].x, this.deployArea[i].y, this.deployArea[i].s, degreeToRadian(this.deployArea[i].start), degreeToRadian(this.deployArea[i].end));
			drawCtx.closePath();
			drawCtx.fillStyle = this.deployArea[i].c;
			drawCtx.fill();
			drawCtx.setTransform(1,0,0,1,0,0);
		}

		for (var i = 0; i < this.deployArea.length; i++){
			var remove = {x: this.deployArea[i].x, y: this.deployArea[i].y, b: this.deployArea[i].b, w: this.deployArea[i].deleteW};

			drawCtx.translate(cam.o.x, cam.o.y);
			drawCtx.scale(cam.z, cam.z);
			drawCtx.beginPath();
			drawCtx.arc(remove.x, remove.y, remove.b, degreeToRadian(this.deployArea[i].start), degreeToRadian(this.deployArea[i].end));
			drawCtx.closePath();
			drawCtx.globalCompositeOperation = "destination-out";
			drawCtx.fill();
			drawCtx.setTransform(1,0,0,1,0,0);
		}

		var center = {x: (this.deployArea[0].x + this.deployArea[1].x)/2, y: (this.deployArea[0].y + this.deployArea[1].y)/2};
		var deleteW = (this.deployArea[0].deleteW + this.deployArea[0].deleteW)/2;

		drawCtx.translate(cam.o.x, cam.o.y);
		drawCtx.scale(cam.z, cam.z);
		drawCtx.beginPath();
		drawCtx.rect(center.x - deleteW/2, center.y - 2000/2, deleteW, 2000);
		drawCtx.closePath();
		drawCtx.globalCompositeOperation = "destination-out";
		drawCtx.fill();

		drawCtx.setTransform(1,0,0,1,0,0);
		drawCtx.globalCompositeOperation = "source-over";

	//	this.deployImage = new Image();
	//	this.deployImage.src = drawCanvas.toDataURL();
	//	debug(drawCanvas.toDataURL());
	//	return;

		planCtx.clearRect(0, 0, res.x, res.y);
		planCtx.globalAlpha = 0.3;
		planCtx.drawImage(drawCanvas, 0, 0);
		drawCtx.clearRect(0, 0, res.x, res.y);
	}

	this.redrawDeploymentZone = function(){
		planCtx.clearRect(0, 0, res.x, res.y);
		planCtx.translate(cam.o.x, cam.o.y);
		planCtx.scale(cam.z, cam.z);
		planCtx.globalAlpha = 0.3;
		planCtx.drawImage(this.deployImage, -this.deployImage/2, -this.deployImage/2, this.deployImage.width, this.deployImage.height);
		planCtx.globalAlpha = 1;
		planCtx.setTransform(0,0,1,0,0,1);
	}

	this.getDeployArea = function(){
		for (var i = 0; i < this.deployArea.length; i++){
			if (this.deployArea[i].userid == this.userid){return this.deployArea[i];}
		}
	}

	this.initDeploy = function(){
		this.setCallback("resolveDamageControl");
		this.setObstacleCam();
	}

	this.createCommandTransferEntries = function(){
		if (game.phase == 1){return false;}

		var show = 0;
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].command == game.turn){
				show = 1;
				this.ships[i].createCommandTransferEntry();
			}
		}

		if (show){return true;}
		return false;
	}

	this.resetFireOrders = function(){
		for (let i = 0; i < this.fireOrders.length; i++){
			if (this.fireOrders[i].animated){
				this.fireOrders[i].animated = 0;
				this.fireOrders[i].animating = 0;
			}
		}
	}

	this.setAllObstaclesNextMoves = function(){
		debug("setAllObstaclesNextMoves");
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].obstacle){this.ships[i].setNextMove();}
		}
	}

	this.setAllObstaclesImages = function(){
		debug("setAllObstaclesImages");
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].obstacle){this.ships[i].setTrueImage(true);}
		}
	}

	this.endMoveSubPhase = function(){
		//debug("endMoveSubPhase")
		for (var i = 0; i < this.ships.length; i++){
			if (!this.ships[i].toAnimate){continue;}

			if (this.ships[i].flight && this.animFlight || this.ships[i].salvo && this.animSalvo){
				this.ships[i].setPostMovePosition();
				this.ships[i].setPostMoveFaceHead();

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
				this.ships[i].setPostMovePosition();
				this.ships[i].setPostMoveFaceHead();
			}
			else if (this.ships[i].obstacle && this.animObstacles){
				this.ships[i].setPostMovePosition();
				this.ships[i].setPostMoveFaceHead();
			}
		}
	}


	this.moveResolved = function(){
		debug("moveResolved");

		this.subPhase = 2;
		this.animating = 0;
		this.animMoves = 0;
		this.setPostMoveCC();
		this.setAllCollisionData();

		if (this.phase == 2){
			for (var i = 0; i < this.ships.length; i++){
				this.ships[i].setSupportImage();
				this.ships[i].getAttachDivs();
				if (this.ships[i].flight){
					if (!this.ships[i].patrolLayout && this.ships[i].hasPatrolLayout()){
						this.ships[i].setPatrolLayout();
						this.ships[i].setImage();
					}
					else if (this.ships[i].hasAbortedMission()){
						this.ships[i].createMissionAbortEntry();
					}
				}
			}
		}
		else if (this.phase == -1){
			for (var i = 0; i < this.ships.length; i++){
				if (!this.ships[i].obstacle){continue;}
				this.ships[i].setPostMoveFaceHead();
				this.ships[i].setPostMovePosition();
				this.ships[i].setNextMove();
			}
		}

		for (var i = 0; i < this.ships.length; i++){
			if (!this.ships[i].hasMoved()){continue;}
			this.ships[i].setPostMoveFaceHead();
			this.ships[i].setPostMovePosition();
			if (this.ships[i].flight || this.ships[i].salvo){this.ships[i].setNextMove();}
		}

		for (var i = 0; i < this.ships.length; i++){
			for (var j = this.ships[i].actions.length-1; j >= 0; j--){
				if (this.ships[i].actions[j].type == "roll" || this.ships[i].actions[j].type == "flip"){
					this.ships[i].createActionEntry(); break;
				}
			}
		}

		this.checkUnitOffsetting();
		this.createLogEntry("-- Movement concluded --");

		if (this.events.length){
			if (this.phase == 2){ // emines AFTER moving anim
				game.timeout = setTimeout(function(){
					game.showUI(800);
					game.resolvePostMoveFires();
				}, game.phaseDelay*4);
			}
			else if (this.phase == 1){ // firing eMine
				this.showUI(500);
				this.setAllObstaclesImages();
				this.logWeaponEvents();
				this.drawingEvents = 1;
			}
		}
		else {
			if (this.phase == -1){
				this.DamageControlResolved();
				this.drawingEvents = 1;
			}
			else if (this.phase == 1){
				this.showUI(500);
				this.drawingEvents = 1;
			}
			else if (this.phase == 2){ // player control now, setup fire
				this.showUI(500);
				this.setAllObstaclesImages();
				this.setInterferenceData();
				this.autoIssueFireOrders();
			}
			else if (this.phase == 3){
				this.showUI(800);
				this.fireResolved();
			}



		}
		this.draw();
	}

	this.autoIssueFireOrders = function(){
		debug("autoIssueFireOrders");

		for (var i = 0; i < this.ships.length; i++){
			if (!this.ships[i].friendly || !this.ships[i].flight){continue;}
			if (!this.ships[i].cc.length){continue;}

			var hostiles = [];

			for (var j = 0; j < this.ships[i].cc.length; j++){
				var unit = game.getUnit(this.ships[i].cc[j]);
				if (unit.friendly){continue;}
				//if (unit.salvo){hostiles += 5; continue;}
				hostiles.push(unit);
			}

			if (hostiles.length != 1){continue;}
			//if (hostiles[0].ship || hostiles[0].squad){continue;}

			var weapons = [];

			for (var j = 0; j < this.ships[i].structures.length; j++){
				if (this.ships[i].structures[j].destroyed){continue;}
				for (var k = 0; j < this.ships[i].structures[j].systems[k].length; k++){
					if (this.ships[i].structures[j].systems[k].reload > 1 || !this.ships[i].structures[j].systems[k].canFire()){continue;}
				}
				weapons.push(this.ships[i].structures[j].systems[k]);
			}
			//debug(weapons);

			var target = hostiles[0].id;
			var pos = hostiles[0].getPlannedPos();

			var desired = 0;

			if (hostiles[0].ship || hostiles[0].squad){
				desired = 1;
			}

			for (var j = 0; j < weapons.length; j++){
				var state = weapons[j].getActiveState();
				if (state != desired){
					weapons[j].switchMode();
				}
			}
			$("#sysDiv").remove();

			for (var j = 0; j < weapons.length; j++){
				weapons[j].getActiveSystem().odds = 1;
				weapons[j].getActiveSystem().validTarget = 1;
				weapons[j].setFireOrder(target, pos);
			}
		}

	}

	this.initDamageControl = function(){
		this.setInterferenceData();
		this.doResolveFire();
	}

	this.fireResolved = function(){
		debug("fireResolved");

		this.animating = 0;
		this.animateAllFire = 0;
		this.subPhase = 3;

		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].setPostFireImage();
			this.ships[i].setSize();
		}

		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].setSupportImage();
		}

		//this.drawingEvents = 1;
		
		$(fxCanvas).css("opacity", 0.25);

		this.createCritLogEntries();
		this.createDeathLogEntries();
		this.createUnitMoraleLogEntries();
		this.createFleetMoraleLogEntries();
		this.createPlaceHolderEntry();
		this.createLogEntry("-- Fire Events concluded --");

		this.showUI(800);

		if (this.phase == 2){
			this.autoIssueFireOrders();
		}

		this.setGlobalCam();
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

	this.createUnitMoraleLogEntries = function(){
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

	this.createDeathLogEntries = function(){
		if (game.unitExploAnims.length){
			this.createPlaceHolderEntry();
			
			for (var i = 0; i < game.unitExploAnims.length; i++){
				ui.combatLogWrapper.find("#combatLog")
					.find("tbody")
						.append(
						$("<tr>")
							.append($("<th>").attr("colSpan", 9).html(game.unitExploAnims[i].html))
							.data("unitid", game.unitExploAnims[i].id)
							.hover(
								function(){
									var data = $(this).data();
									game.getUnit($(this).data("unitid")).doHighlight()
								}
							)
						)
			}
		}
	}

	this.createFleetMoraleLogEntries = function(){
		var entries = 0;

		this.createPlaceHolderEntry();

		for (let i = 0; i < this.playerstatus.length; i++){
			var globals = this.playerstatus[i].globals;
			var html = "";

			for (let j = 0; j < globals.length; j++){ // then by crit rolling
				if (globals[j].turn != game.turn || globals[j].scope != 2){continue;}
				entries = 1;

				var type = globals[j].notes[0];
				var numbers = globals[j].notes.slice(2, globals[j].notes.length).split(";");

				var html = "<td colSpan=9 style='padding: 10px'><span style='font-size: 12px; font-weight: bold'><span class='yellow'>" + this.playerstatus[i].username + "'</span> is subject to a fleetwide morale check.</br>";
					html += "Chance to fail: " + numbers[0] + "%, rolled: " + numbers[1] + ".</br>"

					html += "<span class='yellow'>" + ((type == "p") ? " Passed ! (-30 on final severity)" : " Failed !") +"</span></br>";

				if (globals[j].type == "Rout" || globals[j].type == "Morale" && globals[j].value != 0){
					html += "The fleet is subject to <span class='yellow'>" + (globals[j].type == "Rout" ? "a complete rout" : globals[j].value + " % " + globals[j].type) + ".</span>";
				}
				else {
					html += "The fleet suffers no effect.</span>";
				}
				html += "</br><span>(D100: " + numbers[2] + ", modified by current moral loss (" + (numbers[3]-numbers[2]) + ") to a total effect value of <span class='yellow'>" + numbers[3] +"</span>)</span></br>";
			}

			if (html.length > 2){
				$("#combatLog").find("tbody")
				.append($("<tr>").html(html))
			}
		}

		if (!entries){
			ui.combatLogWrapper.find("tr").last().remove();
		}
	}

	this.createPlaceHolderEntry = function(){
		$("#combatLog").find("tbody").append($("<tr>")
			.append($("<td>").css("height", 15).attr("colSpan", 9)));
	}

	this.createLogEntry = function(html){
		$("#combatLog").find("tbody").append($("<tr>")
			.append($("<th>").attr("colSpan", 9).html(html)));
	}
	
	this.startPhase = function(n){
		this.setShipDivs();
		this.phase = n;
		game.redraw();

		if (this.phase == -1){
			$("#phaseSwitchDiv").click(function(){
				$(this).hide();
				game.timeout = setTimeout(function(){
					game.initDeploy();
				}, game.phaseDelay);
			});
		}
		else if (this.phase == 0){
			ctx.clearRect(0, 0, res.x, res.y);
			$("#phaseSwitchDiv").click(function(){
				game.initMovement();
				//window.timeout = setTimeout(function(){
				//	debug("hide");
					$("#phaseSwitchDiv").hide()
				///}, 250);
			});
		}
		else if (this.phase == 1){
			$("#phaseSwitchDiv").click(function(){
				$(this).hide();
				game.prepResolveMovement();
				game.timeout = setTimeout(function(){
					game.animShip = 1;
					game.doResolveMovement();
				}, game.phaseDelay);
			});
		}
		else if (this.phase == 2){
			$("#phaseSwitchDiv").click(function(){
				$(this).hide();
				game.prepResolveMovement();
				game.timeout = setTimeout(function(){
					game.animShip = 1;
					game.doResolveMovement();
				}, game.phaseDelay);
			});
		}
		else if (this.phase == 3){
			$("#phaseSwitchDiv").click(function(){
				game.draw();
				$(this).hide();
				ui.upperGUI.find(".playerInfoWrapper").hide();
				game.resetImageData();
				game.redraw();
				game.timeout = setTimeout(function(){
					game.initDamageControl();
				}, game.phaseDelay);
			});
		};
	}

	this.setLeftWrapperVisibility = function(){	

		var wrapper = $("#leftUnitWrapper");
			wrapper.show();
		var incoming = wrapper.find("#deployTable");
		var reinforce = wrapper.find(".reinforceWrapper");

		if (game.turn == game.settings.reinforceTurn && game.phase == -1){
			reinforce.show();
		}
		else {
			reinforce.hide();
		}

		if (incoming.find("tbody").children().length > 1){
			incoming.show();
		} else incoming.hide();

		if (!reinforce.is(":visible") && !incoming.is(":visible")){
			wrapper.hide();
		} else wrapper.show();

	}

	this.showStats = function(data){
		data = JSON.parse(data);

		var wrapper = $("<div>")
			.attr("id", "statsWrapper")
			.append($("<div>").html("Statistics")
				.css("margin-bottom", 10)
				.css("font-size", 22)
				.css("text-align", "center")
				.css("margin", "auto"))
			.drag();

		var units = [];
		var salvos = [];

		for (let i = 0; i < game.playerstatus.length; i++){
			units.push([]);
			salvos.push([]);

			for (let j = 0; j < data.length; j++){
				if (game.playerstatus[i].userid != data[j].userid){continue;}
				if (data[j].name == "Salvo"){salvos[i].push(data[j]); continue;}
				units[i].push(data[j]);
			}
		}

		for (let i = 0; i < units.length; i++){

			var div;
			var armourTotal = 0;
			var nonArmourTotal = 0;
			var salvoArmourTotal = 0;
			var salvoSystemTotal = 0;
			var salvoHullTotal = 0;

			div = $("<div>").addClass("statsOverview").addClass(game.userid == game.playerstatus[i].userid ? "friendly" : "hostile")
			wrapper.append(div);

			for (j = 0; j < units[i].length; j++){
				armourTotal += units[i][j].armourDmg;
				nonArmourTotal += units[i][j].systemDmg;
				nonArmourTotal += units[i][j].hullDmg
			}
			for (j = 0; j < salvos[i].length; j++){
				salvoArmourTotal += salvos[i][j].armourDmg;
				salvoSystemTotal += salvos[i][j].systemDmg;
				salvoHullTotal += salvos[i][j].hullDmg
			}

			div.append($("<div>").addClass("totalDmgDiv")
				.append($("<div>").html("Damage dealt"))
				.append($("<div>").html("to Armour: " + (armourTotal + salvoArmourTotal)))
				.append($("<div>").html("to System & Hull: " + (nonArmourTotal + salvoSystemTotal + salvoHullTotal))))

			if (salvoArmourTotal || salvoSystemTotal || salvoHullTotal){
				var table = $("<table>")
					.addClass("unitStats ballistic")
					.append($("<tr>")
						.append($("<th>")
							.attr("colSpan", 3)
							.css("font-size", 15)
							.html("Combined Salvo Damage")))
					.append($("<tr>")
						.append($("<td>")
							.css("color", "lightBlue")
							.html(salvoArmourTotal))
						.append($("<td>")
							.css("color", "yellow")
							.html(salvoSystemTotal))
						.append($("<td>")
							.css("color", "red")
							.html(salvoHullTotal)))

					div.append(table);
			}


			for (j = 0; j < units[i].length; j++){
				var callSign = "";
				var table = $("<table>")
					.addClass("unitStats")
					.append($("<tr>")
						.append($("<th>")
							.addClass("header")
							.attr("colSpan", 3)
							.append($("<div>").html(units[i][j].name + " #" + units[i][j].id))
							.append($("<div>").html(units[i][j].callsign.length ? "'"+units[i][j].callsign+"'" : ""))
							.append($("<div>").html("("+units[i][j].moraleCost+")"))))

				if (units[i][j].subunits.length){
					var html = "";
					for (var k = 0; k < units[i][j].subunits.length; k++){
						html += (units[i][j].subunits[k].amount + "x " + units[i][j].subunits[k].name + ", ");
					}
					table.append($("<tr>").append($("<th>")	.attr("colSpan", 3)	.html(html.slice(0, html.length -2))))
				}

				table
				.append($("<tr>")
					.append($("<td>")
						.css("color", "lightBlue")
						.html(units[i][j].armourDmg))
					.append($("<td>")
						.css("color", "yellow")
						.html(units[i][j].systemDmg))
					.append($("<td>")
						.css("color", "red")
						.html(units[i][j].hullDmg)))

				div.append(table);
			}

			$(document.body).append(wrapper)
		}
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

	this.setCC = function(){
		//debug("setCC");
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
		//debug("setPostMoveCC");
		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].cc = [];
		}

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].status == "jumpOut" && game.phase == -1){continue;}
			var a = this.ships[i].getGamePos();
			for (var j = i+1; j < this.ships.length; j++){
				if (this.ships[j].status == "jumpOut" && game.phase == -1){continue;}
				var b = this.ships[j].getGamePos();
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
			stack[i].setNextMove();
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

		//if (shooter.flight && hostileUnit && !this.isCloseCombat(shooter, target)){return;}

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

		$("#aimDiv").hide()
		shooter.highlightAllSelectedWeapons();
	}

	this.handleHoverEvent = function(e, onMap, unit){
		if (unit.id == this.shortInfo){return;}
		else if (this.shortInfo && this.shortInfo != unit.id){this.redraw();}

		this.shortInfo = unit.id;

		ui.shortInfo.empty();
		unit.getShortInfo();
		//var ele = ui.shortInfo;
		//$(ele).children().remove().end().append($(unit.getShortInfo()).css("width", "100%"));

		var oX = $(ui.shortInfo).width()/2;
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

		$(ui.shortInfo).css("left", left).css("top", top).show();

		if (unit.id != aUnit){unit.handleHovering();}
	}

	this.resetHover = function(){
		ui.shortInfo.html("").hide();
		this.shortInfo = false;
		game.moveArea = 0;
		game.redraw();
	}

	this.draw = function(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		this.setUnitTransform();
		if (0){
			ctx.beginPath(); ctx.arc(0, 0, 5, 0, 2*Math.PI); ctx.fillStyle = "yellow"; ctx.fill(); ctx.closePath();
		}
		if (0){
			ctx.beginPath(); ctx.rect(-400, -500, 800, 1000); ctx.strokeStyle = "yellow"; ctx.stroke(); ctx.closePath();
		}
		this.drawShips();
		this.drawBorders();
		this.resetUnitTransform();
		this.drawEvents();

		if (this.deploying){game.drawDeployZone();}
	}

	this.redraw = function(){
		//debug("redraw");
		planCtx.clearRect(0, 0, res.x, res.y);
		moveCtx.clearRect(0, 0, res.x, res.y)
		salvoCtx.clearRect(0, 0, res.x, res.y)
		mouseCtx.clearRect(0, 0, res.x, res.y)

		ui.shortInfo.hide();

		if (this.deploying){game.drawDeployZone();}

		if (aUnit){
			var unit = this.getUnit(aUnit);
			if (unit.status == "jumpOut"){

			}
			else if (!unit.salvo){
				unit.resetMoveMode();

				if (unit.hasWeaponsSelected()){
					unit.highlightAllSelectedWeapons();
					game.mode = 2;
				}

				if (unit.ship || unit.squad){
					unit.setMoveTranslation();
					unit.drawMoveArea();
					unit.drawDirectionIndicator();
					unit.drawTurnArcs();
					unit.resetMoveTranslation();
				}
			}
			this.drawAllMovePlans();
		}
		this.draw();
		this.drawAllEW();
	}

	this.drawAllMovePlans = function(){
		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].drawMovePlan();
		}
	}

	this.getUnitMaxPos = function(){
		var minX = 0;
		var minY = 0;
		var maxX = 0;
		var maxY = 0;

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].flight || this.ships[i].salvo){continue;}
			if (this.ships[i].obstacle && this.phase != -1){continue;}
			minX = Math.min(minX, this.ships[i].x);
			maxX = Math.max(maxX, this.ships[i].x);
			minY = Math.min(minY, this.ships[i].y);
			maxY = Math.max(maxY, this.ships[i].y);
		}

		return {minX: minX, minY: minY, maxX: maxX, maxY: maxY};

	}

	this.getObstacleMaxPos = function(){
		var minX = 0;
		var minY = 0;
		var maxX = 0;
		var maxY = 0;

		for (var i = 0; i < this.ships.length; i++){
		if (!this.ships[i].obstacle){continue;}
			minX = Math.min(minX, this.ships[i].x);
			maxX = Math.max(maxX, this.ships[i].x);
			minY = Math.min(minY, this.ships[i].y);
			maxY = Math.max(maxY, this.ships[i].y);
		}

		return {minX: minX, minY: minY, maxX: maxX, maxY: maxY};

	}
}

Game.prototype.showHoverElement = function($element, e){
	var h = $element.height();
	var pY = $element.position().top;

	var x = e.clientX - 90;
	var y = e.clientY + 50;

	if (y + h + 10 > res.y){
		x += 150;
		y = res.y - 20 - h;
		//debug($element.closest(".shipDiv"));
	}
	$element.css("left", x).css("top", y).show();

}

Game.prototype.appendSysDiv = function($element, e){
	$(document.body).append($element);
	this.showHoverElement($element, e);
}

Game.prototype.hideSysDiv = function(){
	$("#sysDiv").remove();
}

Game.prototype.doPositionChat = function(){
	$chat = $(".chatWrapper");
	var chatW = $chat.width();
	var chatH = $chat.height();

	//$log = $("#combatLogWrapper");
	//var logW = $chat.width();
	//var logH = $chat.height();

	//var w = 600;

	$chat
		.css("top", 3)
		.css("left", res.x - chatW - 3)
		.css("position", "absolute")
		.css("width", chatW)
		.removeClass("disabled")

	if (!this.userid){
		$chat.find(".sendWrapper").remove();
	}
}

Game.prototype.initOptionsUI = function(){

	this.buildCheatSheet();

	$(".optionsWrapper").css("top", res.y - 50).css("left", 2)
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
			$(this)
				.addClass("selected")
				.hover(
					function(){game.forceDrawAllObstacleMoves();},
					function(){game.redraw();
				})
				.click(function(){
					game.toggleShowNextObstacleMoves();
			})
			if (game.phase == 2){
				game.toggleShowNextObstacleMoves();
			}
		}
		else if (i == 3){
			$(this)
				.hover(
					function(){if (aUnit){return;} game.drawAllMovePlans();},
					function(){if (aUnit){return;} game.redraw();
				})
			//	.click(function(){
			//		game.toggleDrawAllPlans();
			//})
			//game.toggleDrawAllPlans();
		}
		else if (i == 4){
			$(this).click(function(){game.toggleDistMeter();});
		}
		else if (i == 5){
			$(this).click(function(){game.toggleCheatSheet();});
		}
	}).end().drag();
}

Game.prototype.buildCheatSheet = function(){
	$("#cheatSheet")
		.css("top", res.y - 400)
		.addClass("disabled")
		.append($("<table>")
			.append($("<thead>"))
		/*		.append($("<tr>")
					.append($("<th>")
						.attr("colSpan", 4)
						.html("Cheat Sheet")))
				.append($("<tr>")
					.append($("<th>")
						.attr("colSpan", 4)
						.html("EW effect")))
		*/		.append($("<tr>")
					.append($("<th>").css("width", 60).html("Shooter"))
					.append($("<th>").css("width", 60).html("Type"))
					.append($("<th>").css("width", 60).html("Target"))
					.append($("<th>").css("width", 120).html("Effect")))
			.append($("<tbody>")
				.append($("<tr>")
					.append($("<td>").attr("colSpan", 4).css("height", 20)))
				.append($("<tr>")
					.append($("<td>").html("Ship"))
					.append($("<td>").html("OEW"))
					.append($("<td>").html("Ship"))
					.append($("<td>").html("+0.50 / +0.06")))
				.append($("<tr>")
					.append($("<td>"))
					.append($("<td>"))
					.append($("<td>")
						.html("Flight"))
					.append($("<td>")
						.html("+1.00")))
				.append($("<tr>")
					.append($("<td>"))
					.append($("<td>"))
					.append($("<td>")
						.html("Salvo"))
					.append($("<td>")
						.html("+3.00")))
				.append($("<tr>")
					.append($("<td>"))
					.append($("<td>")
						.html("DEW"))
					.append($("<td>")
						.html("Ship"))
					.append($("<td>")
						.html("-0.50 / -0.06")))
				.append($("<tr>")
					.append($("<td>"))
					.append($("<td>"))
					.append($("<td>")
						.html("Flight"))
					.append($("<td>")
						.html("No effect")))
				.append($("<tr>")
					.append($("<td>"))
					.append($("<td>"))
					.append($("<td>")
						.html("Salvo"))
					.append($("<td>")
						.html("-0.50")))
				.append($("<tr>")
					.append($("<td>").attr("colSpan", 4).css("height", 20)))
				.append($("<tr>")
					.append($("<td>").html("Flight"))
					.append($("<td>").html("Attack Mission Target"))
					.append($("<td>").html("Ship"))
					.append($("<td>").html("+0.25")))
				.append($("<tr>")
					.append($("<td>").html(""))
					.append($("<td>").html(""))
					.append($("<td>").html("Flight"))
					.append($("<td>").html("+1.00")))
				.append($("<tr>")
					.append($("<td>").html(""))
					.append($("<td>").html(""))
					.append($("<td>").html("Salvo"))
					.append($("<td>").html("+2.00")))
			))
		.append($("<div>").css("height", 30))
		.append($("<table>")
			.append($("<tr>")
				.append($("<td>")
					.html("Flight / Salvo max speed: 3x Acceleration Value"))))
}


Game.prototype.toggleCheatSheet = function(){
	$(".optionsWrapper .cheatSheet").toggleClass("selected");
	$("#cheatSheet").toggleClass("disabled");
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
		if (this.ships[i].destroyed || !this.ships[i].isReady){continue;}

		var r = Math.max(10, this.ships[i].obstacle ? this.ships[i].size/10 : this.ships[i].size/5);
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

	if (!pick){return false;}
	return this.getUnit(pick).getParent();
}

Game.prototype.getCollisionMod = function(traverse){
	return game.const.collision.baseMulti - (game.const.collision.hitMod * (4 - traverse));
}

Game.prototype.getObstructionPoint = function(fire){
	var valid = [];
	for (var i = 0; i < fire.target.blocks.length; i++){
		if (fire.target.blocks[i].id == fire.shooter.id){
			valid.push(fire.target.blocks[i]);
		}
	}

	var pick = valid[range(0, valid.length-1)];
	var test = game.getUnit(pick.obstacleId).getObstructionPoint(fire.shooter.getGamePos(), fire.target.getGamePos());

	return test[0];

	debug(test);



	var pick = valid[range(0, valid.length-1)].path;
	var dist;
	var origin;

	if (pick.points[0].onLine && pick.points[1].onLine){
		dist = range(0, getDistance(pick.points[0], pick.points[1])*0.9);
		origin = pick.points[0];
	}
	else if (pick.points[0].onLine){
		dist = range(0, getDistance(pick.points[0], fire.target.getGamePos())*1.0);
		origin = pick.points[0];
	}
	else if (pick.points[1].onLine){
		dist = range(0, getDistance(fire.shooter.getGamePos(), pick.points[1])*0.7);
		origin = pick.points[0];
	}

	var impact = getPointInDir(dist, fire.angle, origin.x, origin.y);
	return impact;
}

Game.prototype.setInterferenceData = function(){
	debug("setInterferenceData");
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].obstacle){continue;}
		//debug("check " + this.ships[i].id);
		var oPos = this.ships[i].getGamePos();

		for (var j = i+1; j < this.ships.length; j++){
		if (this.ships[j].obstacle){continue;}
			if (this.ships[i].userid == this.ships[j].userid){continue;}
			//debug("versus " + this.ships[j].id);
			var tPos = this.ships[j].getGamePos();

			for (var k = 0; k < this.ships.length; k++){
				if (!this.ships[k].obstacle){continue;}
				//debug("obs " + this.ships[k].id);

				var dist = this.ships[k].testObstruction(oPos, tPos);

				if (!dist){break;}

				var EffInterference = Math.round(this.ships[k].interference / 100 * dist);

				this.ships[i].blocks.push({id: this.ships[j].id, obstacleId: this.ships[k].id, EffInterference: EffInterference});
				this.ships[j].blocks.push({id: this.ships[i].id, obstacleId: this.ships[k].id, EffInterference: EffInterference});

			}
		}
	}

	this.obstacleDataSet = 1;
}

Game.prototype.setCollisionData = function (unit){
	if (unit.obstacle){return;}
	//if (unit.flight || unit.salvo){debug("ding");}
	//debug("___setCollisionData for unit " + unit.id);

	unit.collisions = [];
	var unitPos = unit.getGamePos();

	for (var i = 0; i < this.ships.length; i++){
		if (!this.ships[i].obstacle || !this.ships[i].collision){continue;}

		var totalDist = 0;
		
		for (var j = 0; j < unit.actions.length; j++){
			var action = unit.actions[j];
			if (action.type != "move"){continue;}
			var oPos = j == 0 ? unitPos : unit.actions[j-1];

			var dist = this.ships[i].testObstruction(oPos, action);
			if (!dist){continue;}
			//debug(dist);

			totalDist += dist;
		}

		//debug("total travel inside " + totalDist);

		if (!totalDist){continue;}
		unit.collisions.push({
			obstacleId: this.ships[i].id,
			totalDist: Math.round(totalDist),
			baseCol: this.ships[i].collision,
			realCol: this.ships[i].getRealCollisionPct(unit.traverse),
			baseAttacks: this.ships[i].getBaseAttacks(),
			realAttacks: this.ships[i].getRealAttacks(totalDist),
			damage: this.ships[i].getDamageString()
		})
	}
}

Game.prototype.hasObstacleInVector = function(oPos, tPos, unit){

	var inPath = [];
	for (var i = 0; i < this.ships.length; i++){
		if (!this.ships[i].obstacle){continue;}
		//if (this.ships[i].id == 17){continue;}
		//if (this.ships[i].id == 15){continue;}

		var dist = this.ships[i].testObstruction(oPos, tPos);

		//sdebug(result);
		//return false;
		if (!dist){continue;}
		//debug("testing vs " + this.ships[i].display);
		//debug(result);


		inPath.push({
			display: this.ships[i].display,
			obstacleId: this.ships[i].id, 
			dist: Math.round(dist),
			size: this.ships[i].size,
			EffInterference: Math.round(this.ships[i].interference / 100 * dist),
			exposure: Math.round(round((1-(dist / (this.ships[i].size/2))), 2)*100),
			interference: this.ships[i].interference,
		})

	}

	return inPath;
}

Game.prototype.snapByTurnAttempt = function(pos){
	var pick = 0;
	var max = 100;

	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].destroyed){continue;}
		if (!this.ships[i].isReady){continue;}
		var r = 5;

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

		//debug(this.ships[i].id);
		//debug(x, y);

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

	if (this.phase == -1){
		sensor = 1;
	} else if (this.phase == 0 || this.phase == 1){
		moves = 1;
	}

	if (!this.deploying && !this.animating){
		salvoCtx.clearRect(0, 0, res.x, res.y);
		planCtx.clearRect(0, 0, res.x, res.y);
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].flight && this.ships[i].mission.arrived){continue;}
			else if (!this.ships[i].ship || moves && ships[i].friendly){
				this.ships[i].drawMovePlan();
			}
			else if (sensor && this.ships[i].friendly){
				this.ships[i].drawEW();
			}
		}
	}
}

Game.prototype.toggleDrawAllPlans = function(){
	if (this.animating){return;}
	this.drawPlans = !this.drawPlans;
	$(".optionsWrapper .drawPlans").toggleClass("selected");
	salvoCtx.clearRect(0, 0, res.x, res.y);
	this.drawAllMovePlans();

}

Game.prototype.toggleFriendlyEW = function(){
	if (this.animating || this.sensorMode){return;}
	this.showFriendlyEW = !this.showFriendlyEW;
	$(".optionsWrapper .drawFriendlyEW").toggleClass("selected");
	salvoCtx.clearRect(0, 0, res.x, res.y);
	this.drawAllEW();
}

Game.prototype.toggleHostileEW = function(){
	if (this.animating || this.sensorMode){return;}
	this.showHostileEW = !this.showHostileEW;
	$(".optionsWrapper .drawHostileEW").toggleClass("selected");
	salvoCtx.clearRect(0, 0, res.x, res.y);
	this.drawAllEW();
}

Game.prototype.toggleShowNextObstacleMoves = function(){
	if (this.animating){return;}
	this.showObstacleMoves = !this.showObstacleMoves;
	$(".optionsWrapper .drawObstaclesMoves").toggleClass("selected");
	salvoCtx.clearRect(0, 0, res.x, res.y);
}

Game.prototype.drawAllEW = function(){
	if (this.animating || this.sensorMode){return;}
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].flight || this.ships[i].salvo || !this.ships[i].deployed){continue;}
		this.ships[i].drawEW();
	}
}

Game.prototype.drawFriendlyEW = function(){
	if (this.animating || this.sensorMode || this.showFriendlyEW){return;}
	this.showFriendlyEW = 1;
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].flight || this.ships[i].salvo || !this.ships[i].deployed){continue;}
		if (!this.ships[i].friendly){continue;}
		this.ships[i].drawEW();
	}
	this.showFriendlyEW = 0;
}

Game.prototype.drawHostileEW = function(){
	if (this.animating || this.sensorMode || this.showHostileEW){return;}
	this.showHostileEW = 1;
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].flight || this.ships[i].salvo || !this.ships[i].deployed){continue;}
		if (this.ships[i].friendly){continue;}
		this.ships[i].drawEW();
	}
	this.showHostileEW = 0;
}

Game.prototype.forceDrawAllObstacleMoves = function(){
	if (this.animating){return;}
	var preset = this.showObstacleMoves;
	this.showObstacleMoves = 1;
	for (var i = 0; i < this.ships.length; i++){
		if (!this.ships[i].obstacle){continue;}
		this.ships[i].drawNextMove();
	}
	this.showObstacleMoves = preset;
}

Game.prototype.setUnitTransform = function(){
	ctx.translate(cam.o.x, cam.o.y);
	ctx.scale(cam.z, cam.z);
}

Game.prototype.resetUnitTransform = function(){
	ctx.setTransform(1,0,0,1,0,0);
}

Game.prototype.drawShips = function(){
	for (var i = 0; i < this.ships.length; i++){
		this.ships[i].draw();
	}

	if (game.animating == 1){return;} // 2 -> cam, 1 move/fire -> dont draw
	
	for (var i = 0; i < this.incoming.length; i++){
		this.incoming[i].drawIncomingPreview();
	}
}

Game.prototype.drawEvents = function(){
	if (!game.drawCircle){return;}
	else if (!game.drawingEvents){return;}
	for (var i = 0; i < this.events.length; i++){
		this.events[i].drawSingleEvent();
	}
}

Game.prototype.drawBorders = function(){
	ctx.beginPath();
	ctx.arc(0, 0, 1000, 0, 2*Math.PI);
	ctx.closePath();

	ctx.strokeStyle = "yellow";
	ctx.lineWidth = 20;
	ctx.globalAlpha = 0.3;
	ctx.stroke();

	ctx.globalAlpha = 1;
	ctx.strokeStyle = "black";
	ctx.lineWidth = 1;
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

Game.prototype.getActiveUnit = function(){
	return this.getUnit(aUnit);
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

	$("#leftUnitWrapper").find("#reinforceBody").find(".green").each(function(i){
		cost += $(this).data("totalCost");
	})

	return Math.floor(cost);
}

Game.prototype.getRemainingReinforcePoints = function(){
	var avail = this.reinforcePoints;
	var cost = this.getCurrentReinforceCost();

	return Math.floor(avail-cost);
}

Game.prototype.initMovement = function(){
	debug("initMovement");
	this.setCallback("resolveDeploy");
	this.setGlobalCam();
}

Game.prototype.resolveDeploy = function(){
	debug("resolveDeploy");
	var show = 0;
	for (var i = 0; i < this.ships.length; i++){
		this.ships[i].deployed = true;
		if (this.ships[i].obstacle){continue;}
		if (this.ships[i].available == this.turn){
			this.ships[i].deployAnim = [0, game.animData.jump];
			this.ships[i].deployed = false;
			show = 1;
		}
	}
	

	if (!show){
		this.initialPhaseResolutionDone();
	}
	else {
		this.initDeployIn();
	}
}

Game.prototype.initDeployIn = function(){
	debug("initDeployIn");
	this.hideUI();
	setFPS(30);
	window.then = Date.now();
	window.startTime = then;
	this.animating = 1;
	this.animateDeployIn();
}

Game.prototype.setObstacleCam = function(){

	var data = this.getObstacleMaxPos();

	var endX = (data.minX + data.maxX) / 2;
	var endY = (data.minY + data.maxY) / 2;

	var min = 0;
	var maxD = 0;
	var center = {x: endX, y: endY}

	for (var i = 0; i < this.ships.length; i++){
		if (!this.ships[i].obstacle){continue;}
		var d = getDistance(center, this.ships[i].getCameraStartPos());
		maxD = Math.max(d, maxD);
	}

	cam.z = Math.max(0.5, 1.5 - (Math.ceil(maxD / 100)/10));

	var shiftX = 0;

	if (ui.reinforceWrapper.is(":visible")){
		shiftX = 200;
	}

	cam.setCamFocus({x: endX - shiftX, y: endY}, false);
}

Game.prototype.setGlobalCam = function(){
	var data = this.getUnitMaxPos();

	var endX = (data.minX + data.maxX) / 2;
	var endY = (data.minY + data.maxY) / 2;

	var min = 0;
	var maxD = 0;
	var center = {x: endX, y: endY}

	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].obstacle && this.phase != -1){continue;}
		var d = getDistance(center, this.ships[i].getCameraStartPos());
		maxD = Math.max(d, maxD);
	}

	cam.z = Math.max(0.5, 1.5 - (Math.ceil(maxD / 100)/10));

	var shiftX = 0;

	if (ui.reinforceWrapper.is(":visible")){
		shiftX = 200;
	}

	cam.setCamFocus({x: endX - shiftX, y: endY}, false);
}

Game.prototype.shiftCam = function(){
	anim = window.requestAnimationFrame(game.shiftCam);

	window.now = Date.now();		
	window.elapsed = window.now - window.then;

	if (elapsed > window.fpsTicks){
		window.then = window.now - (window.elapsed % window.fpsTicks);

		if (cam.isDone()){
			window.cancelAnimationFrame(anim);
			game.getCallback();
		}
		else cam.doProgress();
	}
}

Game.prototype.hasAutomatedStartMoves = function(){
	return false;
	if (!this.hasMovingObstacles() && !this.hasVreePresent()){
		return false;
	}
	return true;

}

Game.prototype.resolveTurnStartMoves = function(){
	if (this.hasAutomatedStartMoves()){
		this.handleTurnStartMoves();
	}
	else this.DamageControlResolved();
}

Game.prototype.handleTurnStartMoves = function(){
	debug("handleTurnStartMoves");

	this.prepResolveMovement();
	game.timeout = setTimeout(function(){
		if (game.hasMovingObstacles()){
			game.animObstacles = 1;
		}
		if (game.hasVreePresent()){
			game.animShip = 1;
		}
		game.doResolveMovement();
	}, game.phaseDelay);
}

Game.prototype.hasMovingObstacles = function(){
	if (!this.movingObstacles){return false;}
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].obstacle){return true;}
	}
	return false;
}

Game.prototype.hasVreePresent = function(){
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].faction[0] == "V"){return true;}
	}
	return false;
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

Game.prototype.animateDeployIn = function(){
	anim = window.requestAnimationFrame(game.animateDeployIn.bind(this));
	window.now = Date.now();		
	window.elapsed = window.now - window.then;

	if (elapsed > window.fpsTicks){
		//debug("animateDeployIn");

		var done = 1;
		var doing = 0;

		window.then = window.now - (window.elapsed % window.fpsTicks);

		ctx.clearRect(0, 0, res.x, res.y);		
		ctx.translate(cam.o.x, cam.o.y);
		ctx.scale(cam.z, cam.z);

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].available < game.turn || this.ships[i].deployed){
				this.ships[i].draw();
				continue;
			}
		}

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].deployAnim[1] && !this.ships[i].deployed){
				doing = 1; done = 0;
				this.ships[i].animateSelfDeployIn();
				break;
			}
		}

		ctx.setTransform(1,0,0,1,0,0);

		if (done){
			window.cancelAnimationFrame(anim);
			game.animating = 0;
			this.initialPhaseResolutionDone();
		}
	}
}

Game.prototype.setAllCollisionData = function(){
	debug("setAllCollisionData");
	for (var i = 0; i < this.ships.length; i++){
		this.setCollisionData(this.ships[i]);
	}
}

Game.prototype.initialPhaseResolutionDone = function(){
	debug("initialPhaseResolutionDone");
	var newUnit = 0;
	var newMission = 0;

	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].available == this.turn){newUnit = 1;
		} else if (this.ships[i].flight && this.ships[i].mission.turn == game.turn){newMission = 1;}
	}

	if (newUnit){
		ui.unitSelector.empty();
		this.initSelectionWrapper();
		this.createPlaceHolderEntry();
		//this.timeout = setTimeout(function(){game.initSelectionWrapper();})
	}

	if (newMission){
		this.logMissionChanges();
		this.createPlaceHolderEntry();
	}

	if (this.logWeaponEvents()){
		this.createPlaceHolderEntry();
	}
	//this.createPlaceHolderEntry();
	this.createLogEntry("-- Initial Events concluded --");
	this.showUI(400);
	this.draw();
}

Game.prototype.logMissionChanges = function(){
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].flight && this.ships[i].available < this.turn && this.ships[i].mission.turn == game.turn){
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
				.append($("<th>")
					.attr("colSpan", 9)
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
			return true;
		}
	}
}

Game.prototype.prepResolveMovement = function(){
	this.resetImageData();
	this.setUnitMoveDetails();
	this.redraw();
}

Game.prototype.doResolveMovement = function(){
	if (aUnit){this.getUnit(aUnit).select();}
	this.hideUI();
	this.setCallback("initAnimateMovement");
	this.setGlobalCam();
}

Game.prototype.setCallback = function(name, args){
	debug("SET " + name);
	this.callback = [name, args];
}

Game.prototype.getCallback = function(){
	debug("GET " + this.callback[0]);
	if (this.callback[0] == ""){
		debug("no callback set!"); return;
	}

	var name = this.callback[0];
	var arg = this.callback[1];
	this.setCallback("", 0);
	window.game[name](arg);
}

Game.prototype.setPhaseSwitchDiv = function(){
	$("#phaseSwitchDiv").find("#phaseSwitchInnerDiv")
		.append($("<div>").html("Turn: " + this.turn))
		.append($("<div>").html(getPhaseString(this.phase)))
		.show();
}

Game.prototype.setGameInfo = function(){
	$("#upperGUI").find(".overview").find("tbody")
		.append($("<tr>")
			.append($("<td>").html(this.turn))
			.append($("<td>").html(getPhaseString(this.phase)))
			.append($("<td>").html(this.getPlayerStatus().value)))
}

Game.prototype.setFocusInfo = function(){
	for (let i = 0; i < this.playerstatus.length; i++){
		var ele = $("#upperGUI .playerInfo .focusInfo" + this.playerstatus[i].userid);

		if (game.turn == 1 && game.phase == -1 && this.playerstatus[i].userid != this.userid){
			ele.find(".focusIncome").html("Unknown"); continue;
		}

		var html = "<span class='yellow'>" + this.getUserCurFocus(i) + "</span> + " + this.getUserFocusGain(i) + " / turn";

		ele
			.hover(
				function(e){game.showFocusInfo(e, $(this).parent().data("userid"));},
				function(){game.hideFocusInfo();}
			)
			.find(".focusIncome")
				.html(html)
				.data("userid", this.playerstatus[i].userid)
			.end()
			.find(".focusSpend")
				.html("(0)");

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
	//var units = [];
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].userid != userid){continue;}
		//if (this.ships[i].command){units.push(this.ships[i]);}
		if (this.ships[i].command){return this.ships[i];}
	}

	//units.sort(function(b, a){return a.command - b.command});
	//return units[0];

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

Game.prototype.showFleetMorale = function(e, userid){

	var i;
	for (i = 0; i < this.playerstatus.length; i++){
		if (this.playerstatus[i].userid == userid){break;}
	}

	var table = $("<table>")
		.append($("<tr>").append($("<th>").html("Fleet Morale Overview - " + this.playerstatus[i].username).attr("colSpan", 2)))
		.append($("<tr>").append($("<td>").attr("colSpan", 2).css("height", 10)))
		.append($("<tr>")
			.append($("<td>").html("Initial Morale / " + this.playerstatus[i].morale))
			.append($("<td>").css("width", 40).html(this.playerstatus[i].globals[0].value))
		)

	// scope 0 start, 1 unit loss/gain, 2 morale test, 3 non trigger manual withdrawal
	for (var j = 1; j < this.playerstatus[i].globals.length; j++){
		var crit = this.playerstatus[i].globals[j];
		var descrip = "";
		var val = "";

		if (crit.text){
			descrip = crit.text;
			val = crit.value > 0 ? ("+" + crit.value) : crit.value;
		}
		else {
			descrip = "Morale Test";
			val = crit.value != 0 ? crit.value > 0 ? ("+" + crit.value) : crit.value : "/";
		}

		table.append($("<tr>")
			.append($("<td>").html(descrip + " (Turn " + crit.turn+")"))
			.append($("<td>").html(val)))
			//.append($("<td>").html(crit.value ? crit.notes : crit.value > 0 ? "+" + crit.value : crit.value)))
	}

	table
	.append($("<tr>")
		.append($("<tr>").append($("<td>").attr("colSpan", 2).css("height", 10))))
	.append($("<tr>")
		.append($("<td>").html("Remaining Morale"))
		.append($("<td>").addClass("yellow").html(this.playerstatus[i].globals.map(x => x.value).reduce((l,r) => l+r, 0))))
	.append($("<tr>")
		.append($("<td>").attr("colSpan", 2).css("height", 12)))
	.append($("<tr>")
		.append($("<td>").attr("colSpan", 2).html("Morale Test triggered upon unit loss.</br>Rolls D100, adds 100, subtracts morale.")))
	.append($("<tr>")
		.append($("<td>").attr("colSpan", 2).css("height", 6)))

	var div = $("<div>").attr("id", "sysDiv")
		.css("top", e.clientY + 30).css("left", e.clientX - 50)
		.css("width", 280)
		.append(table);

	for (var i = 0; i < this.const.fleetMoraleEffects.length; i++){
		div
		.append($("<table>")	
			.append($("<tr>")
				.append($("<td>").html(">= " + this.const.fleetMoraleEffects[i][1]))
				.append($("<td>").css("width", 100).html(this.const.fleetMoraleEffects[i][0] + " " + (this.const.fleetMoraleEffects[i][3] ? this.const.fleetMoraleEffects[i][3] : "")))))
	}
	$(document.body).append(div);
}

Game.prototype.hideFleetMorale = function(){
	$("#sysDiv").css("width", 240).remove();
}

Game.prototype.showFocusInfo = function(e, userid){
	var i;
	for (i = 0; i < this.playerstatus.length; i++){
		if (this.playerstatus[i].userid == userid){break;}
	}

	var flagship = game.getCommandUnit(userid);
	var command = flagship ? flagship.getSystemByName("Command") : 0;

	$(document.body)
	.append(
		$("<div>").attr("id", "sysDiv")
		.css("top", e.clientY + 30).css("left", e.clientX - 50)
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
				.append($("<td>").html((flagship ? flagship.baseFocusRate : 0) + " %" ))
			)
			.append($("<tr>")
				.append($("<td>").html("Base Focus Generation"))
				.append($("<td>").html((flagship ? Math.floor(game.settings.pv / 10 * game.settings.focusMod) / 100 * flagship.baseFocusRate : 0)))
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
				.append($("<td>").html( (command ? (command.getCritMod("Focus") + "%") : "0%")))
			)
			.append($("<tr>")
				.append($("<td>").attr("colSpan", 2).css("height", 10))
			)
			.append($("<tr>")
				.append($("<th>").html("Final Focus Gain"))
				.append($("<th>").html(this.playerstatus[i].gainFocus))
			)
			.append($("<tr>")
				.append($("<td>").html("Max Focus"))
				.append($("<td>").html(this.playerstatus[i].maxFocus))
			)
		))
	return;
}

Game.prototype.hideFocusInfo = function(){
	$("#sysDiv").remove();
}

Game.prototype.getTotalFocusSpending = function(){
	var spend = 0;
	for (let i = 0; i < this.ships.length; i++){
		if (!this.ships[i].friendly){continue;}
		if (this.ships[i].focus){spend += this.ships[i].getFocusCost();}
	}
	return spend;
}

Game.prototype.setFocusSpendingInfo = function(userid){
	$("#upperGUI .playerInfo .focusInfo" + userid + " .focusSpend").html("(" + this.getTotalFocusSpending() + ")");
}

Game.prototype.getPlayerStatus = function(userid){
	if (userid == undefined){
		userid = this.userid;
	}

	for (let i = 0; i < this.playerstatus.length; i++){
		if (this.playerstatus[i].userid == userid){return this.playerstatus[i];}
	}
	return false;
}

Game.prototype.addPlayerInfo = function(){
	for (let i = 0; i < this.playerstatus.length; i++){
		var start = this.playerstatus[i].globals[0].value;
		for (let j = 1; j < this.playerstatus[i].globals.length; j++){
			if (this.playerstatus[i].globals[j].type == "Morale"){
				start += this.playerstatus[i].globals[j].value;
			}
		}
		//var reduce = this.playerstatus[i].globals.map(x => x.value).reduce((l,r) => l+r, 0)


		var playerInfo = $("<div>").addClass("playerInfo").data("userid", this.playerstatus[i].userid)
			playerInfo.append($("<div>").addClass("name").html(this.playerstatus[i].username).addClass((this.playerstatus[i].userid == game.userid) ? "green" : "red")) //header
			playerInfo.append($("<div>") // morale
				.addClass("fleetMorale")
				.append($("<div>").addClass("fleetMorale" + this.playerstatus[i].userid).html(round(start)))
				.hover(
					function(e){game.showFleetMorale(e, $(this).parent().data("userid"))},
					function(){game.hideFleetMorale()}
				)
			)

			playerInfo.append($("<div>")
				.addClass("focusInfo" + this.playerstatus[i].userid)
				.append($("<div>")
					.addClass("focusIncome"))
				.append($("<div>")
					.addClass("focusSpend")))
			$(".playerInfoWrapper").append(playerInfo);
	}

	this.setFocusInfo();
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

	
	$("#upperGUI").find(".overview").find("tbody")
	.append($("<tr>").append(td));

	if (this.phase == 3 && this.getPlayerStatus().status == "waiting"){
		$("#upperGUI").find(".overview").find("tbody")
		.append($("<tr>").append($("<td>").css("height", 5)))
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

Game.prototype.setGameSpeed = function(){
	if (0){
		this.animData.jump = 3;
		this.phaseDelay = 100;
	}
}

Game.prototype.create = function(data){

	this.initUI();
	setFPS(90);
	this.setPhaseSwitchDiv();
	this.setGameInfo();
	this.setConfirmInfo();
	window.username = this.getPlayerStatus().username;

	for (var i = 0; i < data.ships.length; i++){
		this.ships.push(window.initUnit(data.ships[i]));
		this.ships[i].create();
	}

	this.setCC();

	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].obstacle && game.phase != -1 || ((this.ships[i].flight || this.ships[i].salvo) && game.phase != 2)){
			this.ships[i].setNextMove();
		}
		this.ships[i].setLayout();
		this.ships[i].setSize();
		this.ships[i].setDrawData();
	}

	this.setCommandUnits();

	for (var i = 0; i < this.ships.length; i++){
		this.ships[i].setImage();
		this.ships[i].createBaseDiv();
		this.ships[i].getAttachDivs();
		this.ships[i].setSupportImage();
		this.ships[i].setVarious();
	}

	for (var i = 0; i < data.reinforcements.length; i++){
		this.reinforcements[i] = window.initUnit(data.reinforcements[i]);
		this.reinforcements[i].create();
		this.reinforcements[i].setLayout();
		this.reinforcements[i].setImage();
		this.reinforcements[i].setSubSystemState();
		this.reinforcements[i].createBaseDiv();
		this.reinforcements[i].friendly = 1;
		this.reinforcements[i].deployed = 0;
	}

	for (var i = 0; i < data.incoming.length; i++){
		this.incoming[i] = window.initUnit(data.incoming[i]);
		this.incoming[i].create();
		this.incoming[i].setLayout();
		this.incoming[i].setImage();
		//this.incoming[i].setSubSystemState();
		//this.incoming[i].createBaseDiv();

		this.incoming[i].drawX = this.incoming[i].actions[0].x;
		this.incoming[i].drawY = this.incoming[i].actions[0].y;
		this.incoming[i].drawFacing = this.incoming[i].actions[0].h;

		//this.incoming[i].friendly = 1;
		//this.incoming[i].deployed = 0;
	}

	if (game.turn == 1 && game.phase == -1){this.setInitialFacing(this.ships);}
	if (this.reinforcements.length){this.setInitialFacing(this.reinforcements);}
	if (game.phase != 2){this.checkUnitOffsetting();}

	this.extractPlayerStatusData();
	this.addPlayerInfo();
	this.initIncomingTable();
	this.createReinforcementsTable();
	this.initReinforceTable();
	this.setLeftWrapperVisibility();
	this.doPositionChat();
	this.initSelectionWrapper();
	this.initOptionsUI();
	this.initEvents();
	this.setAllCollisionData();
	this.setGameSpeed();
	cam.z = 0.5;
	cam.setCamFocus({x: 0, y:0}, true);
	this.startPhase(this.phase);

}

Game.prototype.setCommandUnits = function(){
	for  (var i = 0; i < this.playerstatus.length; i++){
		var units = [];
		for (var j = 0; j < this.ships.length; j++){
			if (this.ships[j].userid == this.playerstatus[i].userid){
				if (this.ships[j].command){
					units.push(this.ships[j]);
				}
			}
		}
		units.sort(function(a, b){return b.command - a.command});
		for (var j = 1; j < units.length; j++){
			units[j].command = 0;
		}
	}
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

Game.prototype.userHasTransferedCommand = function(){
	for (let i = 0; i < this.ships.length; i++){
		if (this.ships[i].friendly && this.ships[i].command == game.turn +1){
			return true;
		}
	} return false;
}

Game.prototype.doCloneSquaddie = function(){
	return;
}

Game.prototype.setUnitMoveDetails = function(){

	for (var i = 0; i < this.ships.length; i++){
		this.ships.toAnimate = false;
		if (!this.ships[i].actions.length || !this.ships[i].deployed){continue;}
		if (!this.ships[i].willBeAnimated()){continue;}
		this.ships[i].toAnimate = true;
		this.ships[i].readyForAnim();
	}
}

Game.prototype.handleAllUnitExplos = function(){
	debug("handleAllUnitExplos");
	for (var i = 0; i < this.unitExploAnims.length; i++){
		if (!game.unitExploAnims[i].animated){
			debug(this.unitExploAnims[i]);
			this.handleSingleUnitExplos(i);
			return;
		}
	}

	fxCtx.clearRect(0, 0, res.x, res.y);
	this.fireResolved()
}

Game.prototype.handleSingleUnitExplos = function(i){
	debug("handleSingleUnitExplos");
	this.unitExploAnims[i].animating = 1;
	this.setCallback("animateSingleUnitExplo", i);
	cam.z = 2;
	cam.setCamFocus(this.unitExploAnims[i].pos, false);
}

Game.prototype.handleForcedMoves = function(){
	debug("handleForcedMoves");

	var need = 0;

	for (var i = 0; i < this.ships.length; i++){
		if (!this.ships[i].deployed){continue;}
		for (var j = 0; j < this.ships[i].actions.length; j++){
			if (!this.ships[i].actions[j].forced || this.ships[i].actions[j].type == "jumpOut"){continue;}
			need = 1;
			this.ships[i].toAnimate = 1;
			this.ships[i].actions[j].animated = 0;
		}
	}

	if (need){
		this.animShip = 1;
		this.animFlight = 1;
		this.animSalvo = 1;
		this.animForcedMoves = 1;
		this.initAnimateMovement();
	}
	else this.handleAllUnitExplos();
}

Game.prototype.finishMoveSubPhase = function(time){
	if (this.animForcedMoves){ // phase 2 post fire / g-mine ? 
		this.animShip = 0;
		this.animFlight = 0;
		this.animSalvo = 0;
		this.animObstacles = 0;
		this.animForcedMoves = 0;
		this.handleAllUnitExplos();
	}
	else if (this.animObstacles){ // phase -1
		game.timeout = setTimeout(function(){
			game.animShip = 0;
			game.animFlight = 0;
			game.animSalvo = 0;
			game.animObstacles = 0;
			game.moveResolved();
		}, time);
	}
	else {
		if (this.animShip && !this.animFocus){
			game.timeout = setTimeout(function(){
				game.animShip = 1; game.animFocus = 1; game.animFlight = 0;
				game.initAnimateMovement();
			}, time);
		}
		else if (this.animFocus){
			game.timeout = setTimeout(function(){
				game.animShip = 0; game.animFocus = 0; game.animFlight = 1;
				game.initAnimateMovement();
			}, time);
		}
		else if (this.animFlight){
			game.timeout = setTimeout(function(){
				game.animFlight = 0; game.animSalvo = 1;
				game.initAnimateMovement();
			}, time);
		}
		else if (this.animSalvo){
			this.animSalvo = 0;
			game.timeout = setTimeout(function(){
			game.moveResolved();
			}, time);
		}
	}
}

Game.prototype.resolveDamageControl = function(){
	var toDo = false;
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].withdraw == this.turn){
			this.ships[i].deployAnim = [0, game.animData.jump];
			toDo = true;
		}
		else if (this.ships[i].isPreparingJump()){
			this.ships[i].createPrepareJumpEntry();
		}
	}

	if (toDo){
		setFPS(30);
		window.then = Date.now();
		window.startTime = then;
		this.animating = 1;
		this.handleAllDeployOut();
	} else this.resolveTurnStartMoves();
}

Game.prototype.handleAllDeployOut = function(){
	debug("handleAllDeployOut");
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].deployAnim[1] && this.ships[i].deployAnim[0] != this.ships[i].deployAnim[1]){
			this.handleSingleDeployOut(i);
			return;
		}
	}

	this.resolveTurnStartMoves();
}

Game.prototype.handleSingleDeployOut = function(i){
	debug("handleSingleDeployOut");
	//this.unitExploAnims[i].animating = 1;
	this.setCallback("initAnimateSingleDeployOut", i);
	cam.z = 1.5;
	cam.setCamFocus(this.ships[i].getDrawPos(), false);
}

Game.prototype.initAnimateSingleDeployOut = function(i){
	game.animating = 1;
	this.animateSingleDeployOut(i);
}

Game.prototype.animateSingleDeployOut = function(j){
	anim = window.requestAnimationFrame(game.animateSingleDeployOut.bind(this));
	window.now = Date.now();		
	window.elapsed = window.now - window.then;
	if (elapsed <= window.fpsTicks){return;}

	window.then = window.now - (window.elapsed % window.fpsTicks);

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
				this.ships[i].animateDeployOut();
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
		game.handleAllDeployOut();
	}
}

Game.prototype.DamageControlResolved = function(){
	debug("DamageControlResolved");

	var show = 0;
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].obstacle){continue;}
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

	if (this.createCommandTransferEntries()){this.createPlaceHolderEntry();}

	if (this.reinforcements.length){
		//this.createPlaceHolderEntry();
		this.createLogEntry("Reinforcements are being hailed.");
		this.createPlaceHolderEntry();
		$("#leftUnitWrapper").show();
		ui.reinforceWrapper.show();
	}
	this.createLogEntry("-- Initial Events concluded --");
	this.showUI(500);
}

Game.prototype.resolvePostMoveFires = function(){
	debug("resolvePostMoveFires");
	this.doResolveFire();
}

Game.prototype.doResolveFire = function(){
	this.getAllResolvingFireOrders();
	this.getShotDetails();
	(this.phase == 3 ? this.sortNormalFires() : this.sortPostMoveFires());
	this.getFireAnimationDetails();
	this.adjustAreaFires();	
	this.getAllUnitExplos();
	this.hideUI();
	this.setFireGlobals();
	this.handleAllFireOrders();
}

Game.prototype.hideUI = function(){
	ui.upperGUI.find(".playerInfoWrapper").hide();
	ui.combatLogWrapper.hide();
	ui.unitSelector.hide();
	$(".chatWrapper").hide();
	$("#leftUnitWrapper").hide();
	$(".optionsWrapper").hide();

}

Game.prototype.showUI = function(width){

	ui.upperGUI.find(".playerInfoWrapper").show();
	ui.unitSelector.show();
	ui.combatLogWrapper.show();
	this.setLeftWrapperVisibility();
	$(".chatWrapper").show();
	$(".optionsWrapper").show();

	this.doSizeLog(width);
	//if (game.turn == 1 && game.phase == -1){ui.combatLogWrapper.hide();}

	if (game.turn == 1 && game.phase == -1){
		ui.unitSelector.remove();
		ui.combatLogWrapper.css("top", 5).css("left", 300).find("#combatLog tr").each(function(i){
			$(this).remove()
		}).end().find("th").addClass("yellow").html("The match starts. Fleets are deployed.");
	}
}

Game.prototype.doSizeLog = function(width){
	//debug("doSizeLog")

	var header = "";
	if (game.phase == -1){header = "Damage Control Resolution Log";}
	else if (game.phase == 0){header = "Initial Orders Resolution Log";}
	else if (game.phase == 1){header = "Base Movement Resolution Log";}
	else if (game.phase == 2){header = "Focus Movement Resolution Log";}


	if (game.phase < 2){
	ui.combatLogWrapper
		.find(".combatLogHeader thead tr").last().remove().end()
		.html("<th>" + header + "</th>").end().find("#combatLog tr").first().remove();
	}

	if (ui.combatLogWrapper.find("#combatLog tr").length < 2){
		ui.combatLogWrapper.css("width", 400).find(".combatLogHeader").remove();
	} else if (width){
		ui.combatLogWrapper.css("width", width)
	}

	if ($("#leftUnitWrapper").is(":visible")){
		ui.combatLogWrapper.css("top", 80).css("left", 240);
	}

	var top = ui.combatLogWrapper.css("top");
		top = Math.floor(top.slice(0, top.length-2));

	var h = ui.combatLogWrapper.height();

	if (top + h > res.y - 10){
		ui.combatLogWrapper.css("overflow", "auto").css("max-height", 500);
	}
}

Game.prototype.setFireGlobals = function(){
	setFPS(40);
	window.then = Date.now();
	window.startTime = then;

	$(fxCanvas).css("opacity", 1);

	ctx.clearRect(0, 0, res.x, res.y);
	salvoCtx.clearRect(0, 0, res.x, res.y);
	fxCtx.clearRect(0, 0, res.x, res.y);

	this.setUnitTransform();
	this.drawShips();
	this.resetUnitTransform();

	this.animateAllFire = 1;
	this.animating = 1;
}

Game.prototype.resetImageData = function(){
	if (this.phase == -1){return;}
	//debug("resetImageData");
	for (var i = 0; i < this.ships.length; i++){
		this.ships[i].setPreFireImage();
	}
	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].salvo){continue;}
		this.ships[i].setSupportImage();
	}
}

Game.prototype.getAllResolvingFireOrders = function(){
	this.fireOrders = [];
	for (var i = 0; i < this.ships.length; i++){
		var fires = this.ships[i].unitGetAllResolvingFireOrders();
		if (fires.length){
			for (var j = 0; j < fires.length; j++){
				this.fireOrders = this.fireOrders.concat(fires[j]);
			}
		}
	}
	debug(this.fireOrders);
}

Game.prototype.getAreaShotDetails = function(){
	for (var i = 0; i < this.fireOrders.length; i++){
		this.fireOrders[i].target = {name: "", id: ""};
		this.fireOrders[i].shooter = game.getUnit(this.fireOrders[i].shooterid);
		this.fireOrders[i].weapon = this.fireOrders[i].shooter.getSystem(this.fireOrders[i].weaponid).getActiveSystem();
		this.fireOrders[i].damages = this.getAreaDmgs(this.fireOrders[i]);
		this.fireOrders[i].systems.push(this.fireOrders[i].weaponid);

		var origin = this.fireOrders[i].shooter.getTurnStartPos();
		var target = {x: this.fireOrders[i].rolls[0], y: this.fireOrders[i].rolls[1]};
		this.fireOrders[i].focus = {x:  (target.x + origin.x) / 2, y:  (target.y + origin.y) / 2}
		this.fireOrders[i].dist = getDistance({x: origin.x,	y: origin.y}, {x: target.x,	y: target.y});
	}
}

Game.prototype.getAreaDmgs = function(fire){
	var impact = {x: fire.rolls[0], y: fire.rolls[1]};
	var dmgs = [];
	var hits = fire.hits.concat();
	for (var i = 0; i < fire.hits.length; i++){fire.hits[i] = 20;}
	for (var i = 0; i < this.ships.length; i++){
		var unitPos = this.ships[i].getPlannedPos();
		var dist = getDistance(impact, unitPos);
		var color = this.ships[i].getCodeColor();

		if (dist < fire.weapon.aoe){
			var subDmgs = this.ships[i].getDmgsByFire(fire);
			for (var j = 0; j < subDmgs.length; j++){
				subDmgs[j].system = this.ships[i].getLogTitleSpan();
			}
			dmgs = dmgs.concat(subDmgs);
		}
	}
	fire.hits = hits;
	return dmgs;
}

Game.prototype.getShotDetails = function(){

	for (var i = 0; i < this.fireOrders.length; i++){
		this.fireOrders[i].shooter = game.getUnit(this.fireOrders[i].shooterid);
		this.fireOrders[i].weapon = this.fireOrders[i].shooter.getSystem(this.fireOrders[i].weaponid).getActiveSystem();
	//	this.fireOrders[i].target = game.getUnit(this.fireOrders[i].targetid);
		this.fireOrders[i].setShotTarget();
		//this.fireOrders[i].damages = this.fireOrders[i].target.getDmgsByFire(this.fireOrders[i]);
		this.fireOrders[i].setDamages();
		this.fireOrders[i].systems.push(this.fireOrders[i].weaponid);
		//this.fireOrders[i].angle = getAngleFromTo(this.fireOrders[i].shooter.getGamePos(), this.fireOrders[i].target.getGamePos());
		
		//this.fireOrders[i].setShots();
	/*	this.fireOrders[i].setTarget() = game.getUnit(this.fireOrders[i].targetid);
		this.fireOrders[i].setShooter() = game.getUnit(this.fireOrders[i].shooterid);
		this.fireOrders[i].setWeapon() = this.fireOrders[i].shooter.getSystem(this.fireOrders[i].weaponid).getActiveSystem();
		this.fireOrders[i].setDamages() = this.fireOrders[i].target.getDmgsByFire(this.fireOrders[i]);
		this.fireOrders[i].setSystems() systems.push(this.fireOrders[i].weaponid);
		this.fireOrders[i].setAngle() angle = getAngleFromTo(this.fireOrders[i].shooter.getGamePos(), this.fireOrders[i].target.getGamePos());
	*/
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

	//debug(this.fireOrders);
	for (var i = this.fireOrders.length-1; i >= 0; i--){
			this.fireOrders[i].type = "Reg."// + this.fireOrders[i].id;
		if (!this.fireOrders[i].guns){
			this.fireOrders.splice(i, 1);
			continue;
		}
		else {
			this.fireOrders[i].setCamAndAngle();
			this.fireOrders[i].setShots();
		}
	}
}

Game.prototype.getFireAnimationDetails = function(){
	for (var i = 0; i < this.fireOrders.length; i++){
		this.fireOrders[i].anim = this.fireOrders[i].weapon.getAnimation(this.fireOrders[i]);
		this.fireOrders[i].createCombatLogEntry();
		this.fireOrders[i].setNumberAnim();
		//debug(this.fireOrders[i].weapon.priority);
	}
}

Game.prototype.adjustAreaFires = function(){	
	if (game.phase != 2){return;}
	for (var i = 0; i < this.fireOrders.length; i++){
		if (!this.fireOrders[i].weapon.aoe){continue;}	
		for (var j = i+1; j < this.fireOrders.length; j++){
			if (!this.fireOrders[i].weapon.aoe){continue;}

			if (this.fireOrders[i].shooterid != this.fireOrders[j].shooterid){continue;}
			if (this.fireOrders[i].weaponid != this.fireOrders[j].weaponid){continue;}

			debug("same !");
			this.fireOrders[i].numbers = this.fireOrders[i].numbers.concat(this.fireOrders[j].numbers);

			this.fireOrders[j].numbers = [];
			this.fireOrders[j].anim = [[], []];
			this.fireOrders[j].animating = 1;
			this.fireOrders[j].animated = 1;
		}
	}
}

Game.prototype.sortNormalFires = function(){
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
}

Game.prototype.sortPostMoveFires = function(){
	this.fireOrders.sort(function(a, b){
		return (
			a.weapon.aoe - b.weapon.aoe ||
			a.shooterid - b.shooterid ||
			a.obstacle - b.obstacle
		)
	});
}

Game.prototype.getRandomExplo = function(){
	return graphics.explos[range(0, 2)];
	return graphics.explos[range(0, graphics.explos.length-1)];
}

Game.prototype.getAllUnitExplos = function(){
	debug("getAllUnitExplos");

	for (var i = 0; i < this.ships.length; i++){
		if (!this.ships[i].deployed){continue;}
		var data = this.ships[i].getSelfExplo();
	
		if (data.entries.length){
			this.unitExploAnims.push(data);
		}
	}
	return true;
}

Game.prototype.handlePostFireMoves = function(){
	this.createLogEntry("-- Fireorder animation completed --");

	if (this.phase == 2){
		this.handleForcedMoves();
	} else this.handleAllUnitExplos();
}

Game.prototype.handleAllFireOrders = function(){
	debug(this.fireOrders);
	for (var i = 0; i < this.fireOrders.length; i++){
		this.fireOrders[i].tr.show();

		var doAnim = false;
		for (var j = 0; j < this.fireOrders[i].anim.length; j++){
			if (this.fireOrders[i].anim[j].length > 0){
				doAnim = true;
			}
		}

		if (!doAnim){
			this.fireOrders[i].animated = true;
		}


		if (!this.fireOrders[i].animated){
			debug(game.fireOrders[i]);
			this.handleSingleFireOrder(i);
			return;
		}
	}
	fxCtx.clearRect(0, 0, res.x, res.y);
	this.handlePostFireMoves()
}

Game.prototype.handleSingleFireOrder = function(i){
	this.fireOrders[i].animating = 1;
	this.setCallback("initAnimateSingleFireOrder", i);
	cam.setZoom(game.fireOrders[i]);
	cam.setCamFocus(game.fireOrders[i].focus, false);
}

Game.prototype.initAnimateSingleFireOrder = function(i){
	game.animating = 1;
	this.animateSingleFireOrder(i);
}

Game.prototype.animateSingleFireOrder = function(i){
	anim = window.requestAnimationFrame(game.animateSingleFireOrder.bind(this, i));
	window.now = Date.now();		
	window.elapsed = window.now - window.then;
	if (elapsed <= window.fpsTicks){return;}

	window.then = window.now - (window.elapsed % window.fpsTicks);
	fxCtx.setTransform(1,0,0,1,0,0)
	fxCtx.clearRect(0, 0, res.x, res.y);
	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z);		

	for (var j = 0; j < game.fireOrders[i].anim.length; j++){
		for (var k = 0; k < game.fireOrders[i].anim[j].length; k++){
			if (game.fireOrders[i].anim[j][k].done){continue;}

			if (game.fireOrders[i].weapon.animation[0] == "e"){ // em
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
			else if (game.fireOrders[i].weapon.animation[0] == "p"){ //proj
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
			else if (game.fireOrders[i].weapon.animation[0] == "b"){ //beam
				if (game.fireOrders[i].anim[j][k].n < game.fireOrders[i].anim[j][k].m){ // still to animate
					game.fireOrders[i].anim[j][k].n += 1;
					if (game.fireOrders[i].anim[j][k].n > 0){ // t valid, now animate
						drawBeam(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k]);
						//if (game.fireOrders[i].anim[j][k].h){
						//	drawExplosion(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k]);
						//}

						drawExplosion(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k]);
						if (game.fireOrders[i].anim[j][k].n >= game.fireOrders[i].anim[j][k].m){
							game.fireOrders[i].anim[j][k].done = true;
						}
					}
				}
			}
			else if (game.fireOrders[i].weapon.animation[0] == "c"){ //impact
				if (game.fireOrders[i].anim[j][k].n < game.fireOrders[i].anim[j][k].m){ // still to animate
					game.fireOrders[i].anim[j][k].n += 1;
					if (game.fireOrders[i].anim[j][k].n > 0){ // t valid, now animate
						if (game.fireOrders[i].anim[j][k].h == 0){
							game.fireOrders[i].anim[j][k].done = true;
						}
						else {
							drawExplosion(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k]); // EXPLO
							if (game.fireOrders[i].anim[j][k].n >= game.fireOrders[i].anim[j][k].m){
								game.fireOrders[i].anim[j][k].done = true;
							}
						}
					}
				}
			}
			else if (game.fireOrders[i].weapon.animation[0] ==  "a"){ //area
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
		if (!allAnimated){break;}
	}

	
	if (allAnimated){
		for (var j = 0; j < game.fireOrders[i].numbers.length; j++){
			if (!game.fireOrders[i].numbers[j].done){
				drawDamageNumbers(game.fireOrders[i].weapon, game.fireOrders[i].numbers[j]);
				allAnimated = 0;
			}
		}
	}
;
	
	if (!allAnimated){return;}
	else {
		window.cancelAnimationFrame(anim);
		fxCtx.clearRect(0, 0, res.x, res.y);
		game.fireOrders[i].animated = allAnimated;

		if (game.animateAllFire){
			game.timeout = setTimeout(function(){
				game.handleAllFireOrders();
			}, 750);
		}
		else {
			$(fxCanvas).css("opacity", 0.3)
		}
	}
}

Game.prototype.animateSingleUnitExplo = function(i){
	anim = window.requestAnimationFrame(game.animateSingleUnitExplo.bind(this, i));
	window.now = Date.now();		
	window.elapsed = window.now - window.then;
	if (elapsed <= window.fpsTicks){return;}

	window.then = window.now - (window.elapsed % window.fpsTicks);
	fxCtx.clearRect(0, 0, res.x, res.y);

	var allAnimated = 1;

	game.draw();

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
				if (game.unitExploAnims[i].entries[j].u.doDraw){
					game.unitExploAnims[i].entries[j].u.doDestroy();
				}
	/*			ctx.translate(cam.o.x, cam.o.y);
				ctx.scale(cam.z, cam.z)
				ctx.globalAlpha = 1;
				ctx.beginPath();
				ctx.arc(
					game.unitExploAnims[i].entries[j].anims[k].x,
					game.unitExploAnims[i].entries[j].anims[k].y,
					game.unitExploAnims[i].entries[j].anims[k].s/2, 0, 2*Math.PI, true
				)
				ctx.closePath();
				ctx.globalCompositeOperation = "destination-out";
				ctx.fill();
				ctx.globalCompositeOperation = "source-over";
				ctx.setTransform(1,0,0,1,0,0);
	*/		}

			if (game.unitExploAnims[i].entries[j].anims[k].t[0] < game.unitExploAnims[i].entries[j].anims[k].t[1]){
				game.unitExploAnims[i].entries[j].anims[k].t[0]++;
				allAnimated = 0;
			}
		}
	}

	//game.draw();

	if (!allAnimated){
		return;
	}
	else {
		game.unitExploAnims[i].animated = 1;
		game.unitExploAnims[i].animating = 0;
		window.cancelAnimationFrame(anim);
		game.handleAllUnitExplos();
	}
}

Game.prototype.initIncomingTable = function(){
	if (game.turn != 1 || game.phase != -1){return};
	var wrapper = $("#deployTable");
	//	wrapper.hide(); return;

	for (var i = 0; i < this.ships.length; i++){
		if (this.ships[i].salvo || this.ships[i].flight || this.ships[i].obstacle){continue;}
		else if (this.ships[i].available != this.turn){continue;}
		else if (this.ships[i].available == this.turn && this.phase > 0){continue;}

		if (this.ships[i].friendly || game.phase == 0){
			var color = "green";
			wrapper
			.append($("<tr>").addClass("deployNow")
				.data("unitid", this.ships[i].id)
				.append($("<td>")
					.append($(this.ships[i].getUnitSelectorIcon().cloneNode(true))
						.addClass("size40")
					)
				)
				.append($("<td>")
					.addClass(color + " font14")
					.html(this.ships[i].getIncomingHeader())
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
				.data("unitid", this.ships[i].id)
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
							game.disableDeployment();
						}
						else if (!game.deploying && !aUnit && game.getUnit($(this).data("unitid")).canDeploy()){
							$(this).addClass("selected");
							game.enableDeployment($(this).data("unitid"));
						}
					}
				})
				.contextmenu(function(e){
					e.preventDefault(); e.stopPropagation();
				})	
		})
	}

	for (var i = 0; i < this.incoming.length; i++){
		var html = "";
		var eta = this.incoming[i].available - game.turn;

		if (this.incoming[i].userid === game.userid){
			if (eta == 0){html = "NOW";}
			else html = (eta + " Turn/s");

			wrapper
			.append($("<tr>").addClass("deployNow")
				.data("unitid", this.incoming[i].id)
				.append($("<td>")
					.append($(graphics.images[this.incoming[i].name.toLowerCase()].cloneNode(true))
						.addClass("size40")
					)
				)
				.append($("<td>")
					.addClass("green font14")
					.html(this.incoming[i].name + " " + this.incoming[i].callsign)
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
				.data("unitid", this.incoming[i].id)
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


Game.prototype.createReinforcementsTable = function(){
	if (!this.reinforcements.length){return;}

	var tbody = $("#leftUnitWrapper").find("#reinforceBody").find("tbody");
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
					$(this.reinforcements[i].getUnitSelectorIcon().cloneNode(true)).addClass("img50")
				)
			)
			.append($("<td>").html(this.reinforcements[i].name + "</br>" + this.reinforcements[i].notes))
			.append($("<td>").html(this.reinforcements[i].available - this.turn))
			.append($("<td>").addClass("cost").html(this.reinforcements[i].totalCost))
		)
	}
}

Game.prototype.initReinforceTable = function(){
	//debug("initReinforceTable");
	$("#leftUnitWrapper").find("#reinforceBody").find(".requestReinforcements").each(function(i){
		$(this)
		.data("id", game.reinforcements[i]["id"])
		.data("totalCost", game.reinforcements[i]["totalCost"])
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
						var rem = game.getCurrentReinforceCost();
						if (!$(this).hasClass("green") && Math.floor(game.reinforcePoints) >= $(this).data("totalCost") + rem){
							$(this).addClass("selected");
							game.enableDeployment($(this).data("id"));
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
				$("#leftUnitWrapper").find("#totalRequestCost").html("(" + game.getRemainingReinforcePoints() + " points left)");
				game.draw();
			}
		});
	})

	$("#totalRequestCost").html("(" + game.getRemainingReinforcePoints() + " points left)");

}


Game.prototype.initSelectionWrapper = function(){
	var l = 0;
	var s = 50;
	var className = "rotate270 size" + s

	this.ships.sort(function(a, b){
		return a.userid - b.userid || b.ship - a.ship || b.squad - a.squad || b.flight - a.flight || b.salvo - a.salvo || b.cost- a.cost
	});

	for (var i = 0; i < this.ships.length; i++){
		if (!this.ships[i].isReady || this.ships[i].obstacle){continue}

		var type = "friendly";
		if (this.ships[i].userid != game.userid){type = "hostile";}
		l++;

		ui.unitSelector
		.append($("<div>")
			.append($(this.ships[i].getUnitSelectorIcon().cloneNode(true)).addClass(className))
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
							}// else $("#aimDiv").hide();
						}
					} else {
						game.target = 0;
						$("#aimDiv").hide();
					}
				},
				function(e){
					var vessel = game.getUnit($(this).data("id"));
						vessel.doHighlight();
					game.resetHover();
				}
			)
		)
	}

	if (!l){return;}

	//debug("l " + l);

	var widthNeed = (l)*(s+6) + 2;
	var widthAvail = res.x - 245 - 40 - $(".chatWrapper").width();

	//debug("need " + widthNeed);
	//debug("avail " + widthAvail);

	if (widthNeed < widthAvail){
		//debug("need < avail");
		ui.unitSelector.width(widthNeed).removeClass("disabled");
	} 
	else {
		//debug("need > avail");
		widthNeed = Math.floor(widthAvail / (s+6)) * (s+6)+2;
		//debug("need " + widthNeed);
		ui.unitSelector.width(widthNeed).removeClass("disabled");
	}

	//ui.unitSelector.width(Math.min(res.x - 240 - 20 - $(".chatWrapper").width(), w)).removeClass("disabled");
}

Game.prototype.initUI = function(){
	$("#mouseCanvas").on("mouseleave", function(){
		$("#aimDiv").hide();
	})

	$(".missionOption").mousedown(function(e){
		e.stopPropagation();
	})

	$("input[type=button").mousedown(function(e){
		e.stopPropagation();
	})

	$("input[type=radio").mousedown(function(e){
		e.stopPropagation();
	})

	ui.combatLogWrapper
		.find("#combatLog")
			.contextmenu(function(e){
				e.preventDefault(); e.stopPropagation();
			}).end()
			.find(".combatLogHeader").contextmenu(function(e){
				e.preventDefault(); e.stopPropagation();
				$(this).parent().find("#combatLog").toggleClass("disabled");
			});

	ui.combatLogWrapper.drag();

	$("#upperGUI").removeClass("disabled")
	$("#canvasDiv").removeClass("disabled")

	ui.deployOverlay.hide();

	$("#roll")
	.click(function(){
		game.getUnit(aUnit).doRoll()
	});
	
	$("#flip")
	.click(function(){
		game.getUnit(aUnit).doFlip()
	});

	$("#doUndoLastAction")
	.click(function(){
		game.getUnit(aUnit).doUndoLastAction()
	});


	$("#plusImpulse")
	.click(function(){
		game.getUnit(aUnit).doAccel();
	});

	$("#minusImpulse")
	.click(function(){
		game.getUnit(aUnit).doDeccel();
	});

	$("#turnButton")
	.click(function(){
		game.getUnit(aUnit).switchTurnMode();
	})

	$("#maxCutVector")
	.click(function(){
		//debug("maxVector")
		game.getActiveUnit().moveInVector();
		//game.getUnit($(this).data("unitid")).moveInVector($(this).data("dist"));
	})	
	$("#maxTurnVector")
	.click(function(){
		//debug("maxVector")
		game.getActiveUnit().moveToMaxTurnVector();
		//game.getUnit($(this).data("unitid")).moveToMaxTurnVector();
	})	
	$("#maxVector")
	.click(function(){
		//debug("maxVector")
		game.getActiveUnit().moveToMaxVector();
		//game.getUnit($(this).data("unitid")).moveToMaxVector();
	})

	$("#popupWrapper")
		.contextmenu(function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).hide();
		});

	$("#instructWrapper")
		.contextmenu(function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).hide();
		});

	$("#collideWrapper")
		.contextmenu(function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).hide();
		});
}