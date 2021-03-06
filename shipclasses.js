function Ship(data){
	//id, name, x, y, facing, faction, mass, cost, profile, size, userid, available, baseHitChance, baseImpulse

	this.id = data.id;
	this.name = data.name;
	this.callsign = data.callsign;
	this.display = data.display;
	this.notes = data.notes;
	this.x = data.x;
	this.y = data.y;
	this.heading = data.heading;
	this.facing = data.facing;
	this.faction = data.faction;
	this.mass = data.mass;
	this.profile = data.profile;
	this.cost = data.cost;
	this.totalCost = data.totalCost;
	this.moraleCost = data.moraleCost;
	this.size = data.size * 0.7;
	this.index = data.index;
	this.userid = data.userid;
	this.available = data.available;
	this.withdraw = data.withdraw;
	this.manual = data.manual;
	this.baseHitChance = data.baseHitChance;
	this.baseImpulse = data.baseImpulse;
	this.traverse = data.traverse;
	this.status = data.status;
	this.rolling = data.rolling;
	this.rolled = data.rolled;
	this.flipping = data.flipping;
	this.flipped = data.flipped;
	this.actions = [];
	this.morale = data.morale;
	this.baseFocusRate = data.baseFocusRate;
	this.modFocusRate = data.modFocusRate;
	this.critEffects = data.critEffects;
	this.carrier = data.carrier;
	this.cc = [];
	this.upgrades = [];
	this.stringHitChance = "";

	this.slipAngle = data.slipAngle;
	this.turnAngle = data.turnAngle;
	this.turnStep = data.turnStep;
	this.turnMod = 1;
	this.baseTurnDelay = data.baseTurnDelay;
	this.baseImpulseCost = data.baseImpulseCost;
	this.curImp = data.curImp;
	this.remImp = data.remImp;
	this.remDelay = data.remDelay;

	this.turnAngles = {};
	this.moveAngles = {};

	this.blocks = [];
	this.collisions = [];

	this.ship = data.ship;
	this.flight = data.flight;
	this.salvo = data.salvo;
	this.squad = data.squad;
	this.obstacle = data.obstacle;
	this.focus= data.move;
	this.command = data.command;
	this.focus = data.focus;

	this.friendly = 0;
	this.deployed = 0;
	this.isReady = 0;
	this.drawFacing = 0;
	this.drawX = 0;
	this.drawY = 0;
	this.toAnimate = 0;
	this.isOffset = 0;

	this.highlight = false;
	this.destroyed = false;
	this.disabled = data.disabled;
	this.selected = false;
	this.element;

	this.hitTable;
	this.img;
	this.primary = [];
	this.structures = [];
	this.drawImg;
	this.deployAnim = [0, 0];
	this.doDraw = 1;

	for (var i = 0; i < data.actions.length; i++){
		this.actions.push(new Move(
			data.actions[i].id, data.actions[i].unitid, data.actions[i].turn, data.actions[i].type, data.actions[i].forced, 
			data.actions[i].dist, data.actions[i].x, data.actions[i].y, data.actions[i].h, data.actions[i].f, 
			data.actions[i].delay, data.actions[i].cost, data.actions[i].costmod, data.actions[i].manual, data.actions[i].resolved
		));
	}
}

Ship.prototype.doRefit = function(){
	//if (!this.ship){return;}
	//console.log("doRefit");
	console.log(this);
	if (game.refit){$(game.getUnit(game.refit).tr).removeClass("selected");}
	game.refit = this.id;
	$(this.tr).addClass("selected");
	$(".shipDiv").remove();
	if (this.squad){
		for (var i = 0; i < this.structures.length; i++){
			this.structures[i].create();
			this.structures[i].previewSetup();
		}
	}
	this.createBaseDiv();
	this.previewSetup();
	doShowShipDiv(this);
}

Ship.prototype.getFiringPosition = function(){
	return new Point(
		this.x + range(size * 0.3 * -1, size * 0.3),
		this.y + range(size * 0.3 * -1, size * 0.3)
	)
}

Ship.prototype.getTargettingPos = function(){
	return new Point(
		this.x + range(size * 0.3 * -1, size * 0.3),
		this.y + range(size * 0.3 * -1, size * 0.3)
	)		
}

Ship.prototype.getTurnEndPosition = function(){
	return this.actions[this.actions.length-1];
}

Ship.prototype.getAllUpgrades = function(){
	return this.upgrades;
}

Ship.prototype.canDeployFlightHere = function(pos){
	var dist = getDistance({x: this.x, y: this.y}, {x: pos.x, y: pos.y})
	if (dist <= game.flightDeploy.range){
		var a = getAngleFromTo( {x: this.x, y: this.y}, {x: pos.x, y: pos.y} );
			a = addAngle(this.getDrawFacing(), a);
		if (isInArc(a, game.flightDeploy.start, game.flightDeploy.end)){
			return true;
		}
	}
	return false;
}

Ship.prototype.canDeploy = function(){
	if (this.userid == game.userid && game.phase == -1 && (game.turn == 1 || this.id < 0)){
		return true;
	}
	return false;
}

Ship.prototype.canDeployHere = function(e, pos){

	var p = planCtx.getImageData(e.clientX, e.clientY, 1, 1).data;
	var hex = game.rgbToHex(p[0], p[1], p[2])//.slice(-6);
	if (hex == 8100){return true;}
	return false;
	console.log(hex);
	var valid = false;	

	var deploy = game.getDeployArea();
	//console.log(deploy);

	var xDist = Math.abs(pos.x - deploy.x);
	if (xDist < deploy.deleteW/2){
		return false;
	}

	//if (pos.x > deploy.x - deploy.deleteW/2 && pos.x < deploy.x + deploy.deleteW/2){
	if (pos.x > deploy.x - deploy.deleteW/2 && pos.x < deploy.x + deploy.deleteW/2){
		return false;
	}

	var a = getCompassHeadingOfPoint(deploy, pos, 0);
	//console.log(a);
	if (isInArc(a, deploy.start, deploy.end)){
		var d = getDistance(pos, deploy);
		//console.log(d);
		if (d > deploy.b && d < deploy.s){
			return true;
		}
	}
	return false;
}

Ship.prototype.doDeploy = function(pos){
	console.log(this);
	if (this.actions.length){
		this.actions[0].x = pos.x;
		this.actions[0].y = pos.y;
		this.x = pos.x;
		this.y = pos.y;
		this.drawX = pos.x;
		this.drawY = pos.y;
	}
	else {
		this.actions.push(new Move(-1, this.id,  game.turn, "deploy", 0, 0, pos.x, pos.y, this.drawFacing, this.drawFacing, 0, 0, 1, 1, 0));
		this.deployed = 1;
		this.isReady = 1;
		this.x = pos.x;
		this.y = pos.y;
		this.drawX = pos.x;
		this.drawY = pos.y;

		var shipId = this.id;
		var table = $("#deployTable").find("tr").each(function(i){
			if ($(this).data("unitid") == shipId){
				$(this).remove();
				return;
			}
		})
		$(this.element).css("left", res.x - 450).css("top", 50);
	}
	this.select();

	ui.deployOverlay.hide();
	$("#leftUnitWrapper")
			.find("#reinforceBody").find(".requestReinforcements").each(function(){
			if ($(this).hasClass("selected")){
				//$(this).find(".cost").addClass("green");
				$(this).addClass("green");
				return;
			}
		}).end().end()
		.find("#totalRequestCost").html("(" + game.getRemainingReinforcePoints() + " points left)");

	game.redraw();
}

Ship.prototype.setHitTable = function(){
	//console.log("id: " + this.id);
	//this.primary.setRemainingIntegrity();
	var fraction = this.primary.remaining / this.primary.integrity;

	for (var i = 0; i < this.primary.systems.length; i++){
		if (fraction <= this.hitTable[this.primary.systems[i].name]){
			this.primary.systems[i].exposed = 1;
		}
	}
}

Ship.prototype.isDestroyed = function(){
	if (this.primary.destroyed){
		return true;
	}
	return false;
}

Ship.prototype.isDestroyedThisTurn = function(){
	//if (this.id == 48){return true;}
	if (this.destroyed || this.primary.destroyed || this.getSystemByName("Reactor").destroyed){
		return true;
	}
	return false;
}

Ship.prototype.hasHangarSelected = function(){		
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].display == "Hangar"){
				if (this.structures[i].systems[j].selected){
					return true;
				}	
			}
		}
	}

	return false;
}


Ship.prototype.hasSystemsSelected = function(){		
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].selected){
				return true;
			}
		}
	}
	return false;
}

Ship.prototype.hasWeaponsSelected = function(){		
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].weapon){
				if (this.structures[i].systems[j].selected){
					return true;
				}
			}
		}
	}
	return false;
}


Ship.prototype.getSelectedWeapons = function(){
	var systems = [];

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].destroyed){continue;}
			
			if (this.structures[i].systems[j].weapon){
				if (this.structures[i].systems[j].selected){
					systems.push(this.structures[i].systems[j]);
				}
			}
		}
	}
	return systems;
}

Ship.prototype.handleHovering = function(){
	this.drawEW();

	if (this.ship || this.squad){
		this.setMoveTranslation();

		if (!this.isDestroyed()){
			this.drawMoveArea();
			this.drawTurnArcs();
		}
		
		this.drawDirectionIndicator();
		this.resetMoveTranslation();
	}

	this.drawMovePlan();
	this.drawIncomingPreviewMovePlan();
	this.drawTargetMovePlan();
}

Ship.prototype.getActionCost = function(type){
	switch (type){
		case 0: return Math.ceil(this.getImpulseChangeCost()*1.5);
		case 1: return Math.ceil(this.getImpulseChangeCost()*3);
		default: return 0;
	}
	return Math.ceil(this.getImpulseChangeCost()*1.5);
	return Math.ceil(this.getSystemByName("Engine").output * 0.75)*(1-(1-this.getImpulseMod())/2);
	return 1;
}

Ship.prototype.getImpulseChangeCost = function(){
	return Math.ceil(this.baseImpulseCost);
	return Math.ceil(this.baseImpulseCost * (1 + ((this.getImpulseMod()-1) / 2)));
	return Math.ceil(this.baseImpulseCost * (1-((this.getImpulseMod()-1)/2)) * this.getImpulseMod());
}

Ship.prototype.getRealImpulseChangeCost = function(){
	return Math.ceil(this.getImpulseChangeCost() / this.getImpulseMod());
}

Ship.prototype.getBaseImpulse = function(){
	return this.baseImpulse;
}

Ship.prototype.getImpulseStep = function(){
	return Math.floor(this.getBaseImpulse() / 8);
}

Ship.prototype.getTurnCost = function(){
	if (this.canTurnFreely()){
		return 0;
	}
	return round(1*this.getImpulseMod(), 2);
}

Ship.prototype.getTurnMod = function(){
	return turn.mod || 1;
}

Ship.prototype.getTurnDelay = function(){
	if (this.canTurnFreely()){
		return 0;
	}
	return round(this.baseTurnDelay*this.getImpulseMod() / (1+((this.getTurnMod()-1)*3)), 2);
}

Ship.prototype.drawSystemArcIndicator = function(){
	return;
	var shipPos = this.getGamePos();
	var angle = this.getPlannedFacing();

	var p1 = getPointInDir(80, 90+angle, shipPos.x, shipPos.y);
	var p2 = getPointInDir(-80, 90+angle, shipPos.x, shipPos.y);
	var p3 = getPointInDir(80, 180+angle, shipPos.x, shipPos.y);
	var p4 = getPointInDir(-80, 180+angle, shipPos.x, shipPos.y);

	moveCtx.beginPath();
	moveCtx.moveTo(p1.x, p1.y);
	moveCtx.lineTo(p2.x, p2.y);
	moveCtx.moveTo(p3.x, p3.y);
	moveCtx.lineTo(p4.x, p4.y);
	moveCtx.closePath();
	moveCtx.stroke();
}

Ship.prototype.setSlipAngle = function(){
	if (this.faction[0] == "V"){
		if (this.ship){
			var graviton = this.getSystemByName("GravitonSupressor");
			if (graviton.isPowered()){
				var mod = 100;
					mod += 50;
					mod += graviton.getBoostLevel() * graviton.getBoostEffect("Output");

					this.slipAngle = Math.floor(15 / 100 * mod)
			}
		}
		else if (this.squad){
		}
	}
	else {
		this.slipAngle = 15;
	}
}

Ship.prototype.getSlipAngle = function(){
	return this.slipAngle;
}

Ship.prototype.isRolled = function(){
	if (this.rolled){return true;}
	return false;
}

Ship.prototype.isRolling = function(){
	if (this.rolling){return true;}
	return false;
}

Ship.prototype.hasStoppedRolling = function(){
	if (!this.rolling){
		for (var i = 0; i < this.actions.length; i++){
			if (this.actions[i].type == "roll"){
				return true;
			}
		}
	} return false;
}

Ship.prototype.isFlipping = function(){
	if (this.flipping){return true;}
	return false;
}

Ship.prototype.hasFlipped = function(){
	if (this.flipped && this.flipped == game.turn-1){return true;}
	return false;
}

Ship.prototype.doesContinueRolling = function(){
	if (this.rolling){
		for (var i = 0; i < this.actions.length; i++){
			if (this.actions[i].type == "roll"){return false;}
		}
		return true;
	} return false;
}

Ship.prototype.drawImpulseUI = function(){
	if (this.disabled){return;}	

	var heading = this.getRealHeading();
	var center = {x: this.drawX, y: this.drawY};
	var p1 = getPointInDir(this.size/2 + 10 + 15, heading + 180, center.x, center.y);

	if (this.canDoAction(0)){
		var roll = getPointInDir(80, heading -220, p1.x, p1.y);
		var ox = roll.x * cam.z + cam.o.x - 20;
		var oy = roll.y * cam.z + cam.o.y - 20;
		if (this.isRolling()){
			$($("#roll").children()[1]).show();
		} else $($("#roll").children()[1]).hide();
		$("#roll").css("left", ox).css("top", oy).removeClass("disabled");
	} else $("#roll").addClass("disabled");

	
	if (this.canDoAction(1)){
		var roll = getPointInDir(80, heading -140, p1.x, p1.y);
		var ox = roll.x * cam.z + cam.o.x - 20;
		var oy = roll.y * cam.z + cam.o.y - 20;
		$("#flip").css("left", ox).css("top", oy).removeClass("disabled");
	} else $("#flip").addClass("disabled");
	

	if (this.canUndoLastAction()){
		var ox = p1.x * cam.z + cam.o.x - 15;
		var oy = p1.y * cam.z + cam.o.y - 15;
		$("#doUndoLastAction").css("left", ox).css("top", oy).removeClass("disabled");
	} else $("#doUndoLastAction").addClass("disabled");

	if (this.canAccel()){
		var pPlus = getPointInDir(50, heading +90, p1.x, p1.y);
		var ox = pPlus.x * cam.z + cam.o.x - 15;
		var oy = pPlus.y * cam.z + cam.o.y - 15;
		$("#plusImpulse").css("left", ox).css("top", oy).removeClass("disabled");
	} else $("#plusImpulse").addClass("disabled");

	if (this.canDeccel()){
		var mMinus = getPointInDir(50, heading -90, p1.x, p1.y);
		var ox = mMinus.x * cam.z + cam.o.x - 15;
		var oy = mMinus.y * cam.z + cam.o.y - 15;
		$("#minusImpulse").css("left", ox).css("top", oy).removeClass("disabled");
	} else $("#minusImpulse").addClass("disabled");
}

Ship.prototype.doIssueMove = function(pos, dist){
	var remDelay = this.getRemDelay();

	this.actions.push(new Move(-1, this.id, game.turn, "move", 0, dist, pos.x, pos.y, 0, 0, 0, 0, 1, 1, 0));	
	
	$("#popupWrapper").hide();
	this.unsetMoveMode();
	this.setMoveMode();
	this.doAutoShorten();
	this.setMoveAngles();
	game.updateIntercepts(this.id);
	game.redraw();
	if (this.actions[this.actions.length-1].type == "move"){
		game.setCollisionData(this);
		this.alertCollisions();
	} else ui.collideWrapper.hide();
}

Ship.prototype.alertCollisions = function(){
	if (!this.collisions.length){ 
		ui.collideWrapper.hide();
		return;
	}
	var html = "Collision Alert for " + this.name + " #" + this.id + "</br>";
		//html += "<div>" + getUnitType(this.traverse) + ", size " + this.traverse + " - collision multiplier " + game.getCollisionMod(this.traverse) + "</div>";
		//html += "<div>" + getUnitType(this.traverse) + ", size " + this.traverse + " - collision multiplier " + game.getCollisionMod(this.traverse) + "</div>";

	for (var i = 0; i < this.collisions.length; i++){
		var col = this.collisions[i];
		html += "</br><div>Asteroid Field #" + col.obstacleId + "</br>";
		html += "<span class='obstacleWarn yellow'>" + col.totalDist + "</span>px distance: ";
		html += "<span class='obstacleWarn yellow'>" + col.realAttacks + " </span>attacks @ ";
		html += "<span class='obstacleWarn yellow'>" + col.realCol + "%</span> ";
		html += "for <span class='obstacleWarn yellow'>" + col.damage + "</span> Damage</br>";
	}
	collide(html);
}

Ship.prototype.doAutoShorten = function(){
	if (this.getRemSpeed()){return;}
	var delay = this.getRemDelay();
	if (!delay){return;}

	var ep = this.getRemEP();
	var turn = this.getLastTurn();
	var mod = this.getImpulseMod();

	var maxCut = Math.floor(ep / turn.cost * turn.delay);

	if (maxCut <= delay){
		turn.cost += ep;
		turn.delay -= maxCut;
	}
	else {
		var cost = Math.ceil(delay / turn.delay * turn.cost);
		turn.cost += cost
		turn.delay -= Math.min(delay, Math.ceil(cost * this.baseTurnDelay));
	}
}

Ship.prototype.canShortenOldTurn = function(move){
	if (!this.getRemDelay()){return;}
	if (move.costmod < 2 && this.getRemEP() >= this.getShortenOldTurnCost(move)){
		//console.log("can shorten")
		return true;
	}

	return false;
}

Ship.prototype.getShortenOldTurnCost = function(move){
	var c = this.getTurnCost();
	var a = Math.abs(move.a);
	return Math.ceil((c * a * (move.costmod + turn.step)) - (c * a * move.costmod));
	return Math.ceil(this.getTurnCost() * Math.abs(move.a) * (move.costmod + turn.step)) - move.cost;
	return (this.getTurnCost() / move.costmod * (move.costmod + turn.step)) * Math.abs(move.a) - move.cost;

	//return b * a * (m+s) * turn.h * (1+turn.step));
}

Ship.prototype.getLastTurn = function(){
	for (var i = this.actions.length-1; i >= 0; i--){
		if (this.actions[i].type == "turn"){
			return this.actions[i];
		}
	}
	return false;
}

Ship.prototype.canUndoLastAction = function(){
	if (this.actions.length){
		if (this.actions[this.actions.length-1].resolved == 0){
			if (this.actions[this.actions.length-1].type != "deploy"){
				return true;
			}
		}
	}
	return false;
}

Ship.prototype.doUndoLastAction = function(pos){
	var update = false;
	var setEW = false;
	var type = this.actions[this.actions.length-1].type
	if (type == "speed"){
		this.actions[this.actions.length-1].dist *= -1;
	}
	else if (type == "move"){
		this.actions[this.actions.length-1].dist *= -1;
		update = true;
	}
	else if (type == "turn"){
		this.actions[this.actions.length-1].delay *= -1;
		setEW = true;
	}
	else if (type == "roll"){
		this.rolling = !this.rolling;
		this.setNotes();
	}
	else if (type == "flip"){
		this.flipping = !this.flipping;
		this.setNotes();
	}

	this.actions.splice(this.actions.length-1, 1);
	if (update){game.updateIntercepts(this.id);}
	if (setEW){this.getSystemByName("Sensor").setTempEW();}
	if (game.turnMode){this.switchTurnMode();}
	this.setMoveSlipAngles();
	game.redraw();
	ui.popupWrapper.hide();
	game.setCollisionData(this);
	this.alertCollisions();
}

Ship.prototype.moveInVector = function(){
	var pos = this.getPlannedPos();
	var dist = this.getRemSpeed();
	var goal = getPointInDir(dist, this.getPlannedHeading(), pos.x, pos.y);
		this.doIssueMove(goal, dist);
}

Ship.prototype.moveToMaxVector = function(){
	var pos = this.getPlannedPos();
	var dist = this.getRemSpeed();
	var goal = getPointInDir(dist, this.getPlannedHeading(), pos.x, pos.y);
		this.doIssueMove(goal, dist);
}

Ship.prototype.moveToMaxTurnVector = function(){
	var pos = this.getPlannedPos();
	var dist = this.getRemDelay();
	var impulse = this.getRemSpeed();
	var goal = getPointInDir(dist, this.getPlannedHeading(), pos.x, pos.y);
	this.doIssueMove(goal, dist);
}	

Ship.prototype.moveToMaCutVector = function(){
	var pos = this.getPlannedPos();
	var dist = this.getRemDelay();
	var impulse = this.getRemSpeed();
	var goal = getPointInDir(dist, this.getPlannedHeading(), pos.x, pos.y);
	this.doIssueMove(goal, dist);
}

Ship.prototype.canTurn = function(){
	if (this.disabled || this.isRolling() || this.isFlipping() || this.lastActionWasTurn()){return false;}
	if (this.getRemDelay() == 0){
		var min = 3;
		var have = this.getRemEP();
		var need = this.getTurnCost() * min;
		if (have >= need){
			return true;
		}
	}
	return false;
}

Ship.prototype.lastActionWasTurn = function(){
	if (!this.actions.length){return false;}
	if (this.actions[this.actions.length-1].type == "turn"){return true;}
	return false;
}
	
Ship.prototype.switchTurnMode = function(){
	this.turnMod = 1;
	if (game.turnMode){
		turn.reset();
		game.turnMode = 0;
		salvoCtx.clearRect(0, 0, res.x, res.y);
		this.drawEW();
		mouseCtx.clearRect(0, 0, res.x, res.y);
		$("#epButton").addClass("disabled");
	}	
	else if (!this.hasSystemsSelected()){
		game.turnMode = 1;
		turn.set(this);
		$("#epButton").removeClass("disabled");
	}
	this.setTurnData();
}

Ship.prototype.hasFocus = function(){
	return this.focus;
}

Ship.prototype.handleTurning = function(e, o, f, pos){

	var unit = game.getUnitByClick(pos);
	var a = 0;
	var t;

	if (this.focus == 1 && unit && !unit.focus){
		//console.log("snap");
		a = getAngleFromTo(this.getPlannedPos(), unit.getPlannedPos());
		a = addAngle(f, a);
		t = unit.getDrawPos();
		t.x = t.x * cam.z + cam.o.x;
		t.y = t.y * cam.z + cam.o.y;
		game.snapTurn = unit.id;
	}
	else {
		//console.log("free");
		t = {x: e.clientX, y: e.clientY};
		a = getAngleFromTo(o, pos);
		a = addAngle(f, a);
		game.snapTurn = 0;
	}

	var max = this.getMaxTurnAngle();

	if (a > 180){a = (360-a) *-1;}

	if (a < -max){a = -max;}
	else if (a > max){a = max;}

	var img = this.getSystemByName("Sensor").img;
	if (img != undefined){
		salvoCtx.clearRect(0, 0, res.x, res.y);
		salvoCtx.translate(cam.o.x, cam.o.y);
		salvoCtx.scale(cam.z, cam.z);
		salvoCtx.translate(o.x, o.y);
		salvoCtx.rotate(a * Math.PI/180);
		salvoCtx.drawImage(img, -img.width/2 , -img.height/2, img.width, img.height);
		salvoCtx.setTransform(1,0,0,1,0,0);
	}

	//console.log(a)
	$("#epButton").css("top", t.y + 25).css("left", t.x - 200).find("#impulseCost").html(round(a, 2))
	a = Math.min(Math.abs(a), max);
	turn.h = a;
	//var c = 1 * a;
	//var c = this.getTurnCost() * a;
	//$("#epButton").css("top", t.y + 25).css("left", t.x - 200).find("#impulseCost").html(Math.ceil(c, 2) + " : " + Math.floor(this.getRemEP() - c));


	this.drawDelay();
	this.drawMouseVector(o, t);

	if (game.shortInfo){game.getUnit(game.shortInfo).drawEW();}

	game.drawEvents();
}

Ship.prototype.drawMouseVector = function(o, t){
	mouseCtx.beginPath();
	mouseCtx.moveTo(o.x * cam.z + cam.o.x, o.y * cam.z + cam.o.y);
	mouseCtx.lineTo(t.x, t.y);
	mouseCtx.closePath();
	mouseCtx.strokeStyle = "lightBlue";
	mouseCtx.lineWidth = 1;
	mouseCtx.stroke();
}

Ship.prototype.handleTurnAttempt = function(dest){
	if (game.snapTurn){
		dest = game.getUnit(game.snapTurn).getGamePos();
	}
	var origin = this.getPlannedPos();
	var a = getAngleFromTo(origin, dest);
		a = addAngle(this.getPlannedHeading(), a);
	if (a > 180){a -= 360;}
	var max = this.getMaxTurnAngle();

	if (isInArc(getCompassHeadingOfPoint(origin, dest, 0), this.turnAngles.start, this.turnAngles.end)){
		//if (Math.abs(a) >= 1){
			this.issueTurn(a);
		//}
	} else if (a < 0){
		this.issueTurn(-max);
	} else this.issueTurn(max);
}

Ship.prototype.hasPlannedMoves = function(){
	if (game.turn > 1 && this.available == game.turn){
		for (let i = this.actions.length-1; i >= 1; i--){
			if (!this.actions[i].resolved){return true;}
		}
		return false;
	}

	for (let i = this.actions.length-1; i >= 0; i--){
		if (!this.actions[i].resolved){return true;}
	}
	return false;
}

Ship.prototype.canTurnFreely = function(){
	//if (game.phase == -1 && this.available == game.turn && this.actions.length == 1){return true;}
	if (this.actions.length && this.actions[0].type == "deploy" && this.actions[0].turn == game.turn && this.actions[0].resolved == 0){
		if (game.turn == 1 || (this.available > game.turn)){return true;}
	}
	return false;
}

Ship.prototype.issueTurn = function(a){
	a = round(a, 2);
	//console.log(a)
	if (this.canTurnFreely()){
		//this.actions[0].h += Math.round(a);
		this.actions[0].h += a;
		this.actions[0].f += a;
		this.drawFacing += a;
	}
	else {
		var o = this.getPlannedPos();
		this.actions.push(
			new Move(-1, this.id, game.turn, "turn", 0, 0, o.x, o.y, 
				a, a,
				Math.ceil(Math.abs(this.getTurnDelay()*a)),
				Math.ceil(Math.abs(this.getTurnCost()*a)),
				round(turn.mod, 1), 1, 0
			)
		);
		$(ui.turnButton)
			.find("#turnCost").html("").end()
			//.find("#turnDelay").html("");
	}

	if (!this.getRemSpeed() && this.getRemEP()){this.doAutoShorten();}
	this.getSystemByName("Sensor").setTempEW();
	if (!this.getRemSpeed()){this.switchTurnMode();}
	this.setMoveAngles();
	game.redraw();
}

Ship.prototype.switchModeAll = function(id){
	var system = this.getSystem(id);
	var name = system.getActiveSystem().name;

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (!this.structures[i].systems[j].dual || this.structures[i].systems[j].locked || this.structures[i].systems[j].destroyed){continue;}
			if (this.structures[i].systems[j].getLoadLevel() != 1 || this.structures[i].systems[j].getActiveSystem().name != name){continue;}
			this.structures[i].systems[j].switchMode(id);
		}
	}
}

Ship.prototype.getProfileMod = function(){
	return Math.floor((1+((((this.getBaseImpulse() / this.getCurSpeed())-1)/3)))*100);
}

Ship.prototype.canBoost = function(system){
	var need = system.getEffiency();
	var avail = this.getUnusedPower();

	if (system.disabled || system.destroyed || system.tiny){
		return false;
	}
	else if (system instanceof Weapon && !system.disabled && !system.destroyed && (system.getLoadLevel() >= 1 || system.getBoostEffect("Reload") && system.getLoadLevel() < 1)){
		if (system instanceof Launcher){
			if (system.getOutput() < system.getMaxoutput()){
				if (system.getRemAmmo() > system.getOutput()){
					return true;
				} else popup("There is not enough ammunition left.");
			} else popup("The launcher is already at maximum capacity.");
		}
		else {
			if (system.getBoostLevel() < system.maxBoost){
				if (avail >= need){
					return true;
				} else popup("You have insufficient power remaining.</br>(Need " + need + ", Have " + avail +")");
			} else popup("The selected system cant be boosted further.");
		}
	}
	else if (!(system instanceof Weapon)){
		if (avail >= need){
			return true;
		} else popup("You have insufficient power remaining.</br>(Need " + need + ", Have " + avail +")");
	}
	return false;
}

Ship.prototype.getUnusedPower = function(){
	for (var i = 0; i < this.primary.systems.length; i++){
		if (this.primary.systems[i].name == "Reactor"){
			return this.primary.systems[i].getUnusedPower();
		}
	}
}

Ship.prototype.setTranslation = function(){
	for (var i = 0; i < arguments.length; i++){
		arguments[i].translate(cam.o.x, cam.o.y);
		arguments[i].scale(cam.o.x, cam.o.y);
	}
}

Ship.prototype.resetTranslation = function(){
	for (var i = 0; i < arguments.length; i++){
		arguments[i].setTransform(1,0,0,1,0,0);
	}
}

Ship.prototype.setMoveTranslation = function(){
	moveCtx.translate(cam.o.x, cam.o.y);
	moveCtx.scale(cam.z, cam.z);
	planCtx.translate(cam.o.x, cam.o.y);
	planCtx.scale(cam.z, cam.z);
}

Ship.prototype.resetMoveTranslation = function(){
	moveCtx.setTransform(1,0,0,1,0,0);
	planCtx.setTransform(1,0,0,1,0,0);
}

Ship.prototype.setMoveMode = function(){
	if (this.salvo || this.flight || this.obstacle){return;}
	else if (this.focus> game.phase && game.phase > -1){instruct("Focus Unit!");}
	else if (this.focus== 0 && game.phase == 1){return;}
	//console.log("ding!");
	game.mode = 1;

	turn.set(this);
	this.setTurnData();
	this.setMoveTranslation();

	if ((this.available == game.turn && game.turn == 1 || this.id < 0) && game.phase == -1){
		this.drawTurnUI();
		//this.drawMoveArea();
		//this.drawTurnArcs();
	}
	else if (game.phase == -1){
		//this.drawMoveArea();
		this.drawMoveUI();
	}
	else if (game.phase == 0 || game.phase == 1){
		//this.drawMoveArea();
		this.drawMoveUI();
	}
	else if (game.phase == 2){ // FIRE
	}
	else if (game.phase == 3){ // Dmg control
	}

	this.resetMoveTranslation();
	this.checkSensorHighlight();
	this.updateDiv();
}

Ship.prototype.unsetMoveMode = function(){
	//console.log("unsetMoveMode");
	game.mode = 0;
	$("#vectorDiv").addClass("disabled");
	$("#impulseGUI").addClass("disabled");
	$(".turnEle").addClass("disabled");
	$(".ui").addClass("disabled");
	if (game.turnMode){this.switchTurnMode();}
	moveCtx.clearRect(0, 0, res.x, res.y);
	planCtx.clearRect(0, 0, res.x, res.y);
	salvoCtx.clearRect(0, 0, res.x, res.y);
}

Ship.prototype.isInEWArc = function(origin, target, sensor, ew){		
	var str = sensor.getOutput();
	var	w = Math.min(180, game.const.ew.len * Math.pow(str/ew.dist, game.const.ew.p));
	var start = addAngle(0 + w, ew.angle);
	var end = addAngle(360 - w, ew.angle);
	return isInArc(getCompassHeadingOfPoint(origin,  target, this.getPlannedHeading()), start, end);
}

Ship.prototype.canSetSensor = function(sensor){
	if (this.flight || this.salvo){return false;}
	if (sensor.selected && !sensor.locked){
		return true;
	} return false;
}

Ship.prototype.unselectSystems = function(){
	fxCtx.clearRect(0, 0, res.x, res.y);
	$("#aimDiv").hide();

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].selected){
				this.structures[i].systems[j].select();
			}
		}
	}
	
	if (this.ship || this.squad){
		for (var i = 0; i < this.primary.systems.length; i++){
			if (this.primary.systems[i].selected){
				this.primary.systems[i].select();
			}
		}
	}
}

Ship.prototype.getFireOrders = function(){
	var fires = [];
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			for (var k = this.structures[i].systems[j].fireOrders.length-1; k >= 0; k--){
				if (this.structures[i].systems[j].fireOrders[k].id == 0){
					fires.push(this.structures[i].systems[j].fireOrders[k]);
				} else break;
			}
		}
	}
	return fires;
}

Ship.prototype.getAllPowerOrders = function(){
	var powers = [];
	for (var i = 0; i < this.structures.length; i++){
		for (var k = 0; k < this.structures[i].powers.length; k++){
			if (this.structures[i].powers[k].new){
				powers.push(this.structures[i].powers[k]);
			}
		}
		for (var j = 0; j < this.structures[i].systems.length; j++){
			powers = powers.concat(this.structures[i].systems[j].getPowerOrders());
		}
	}
	for (var i = 0; i < this.primary.systems.length; i++){
		for (var j = 0; j < this.primary.systems[i].powers.length; j++){
			if (this.primary.systems[i].powers[j].new){
				powers.push(this.primary.systems[i].powers[j]);
			}
		}
	}
	return powers;
}

Ship.prototype.switchDiv = function(e = false){
	var	checkPos = false;
	var $element = $(this.element);

	if (this.selected){
		game.zIndex++;
		$element.removeClass("disabled").css("zIndex", game.zIndex);
		checkPos = true;
	}
	else if ($(this.element).hasClass("disabled")){
		game.zIndex++;
		$element.removeClass("disabled").css("zIndex", game.zIndex);
		checkPos = true;
	}
	else {
		game.zIndex--;
		$element.addClass("disabled").css("zIndex", 10);
	}

	if (checkPos){
		var pos = $element.position();
		var click = {x: e.clientX, y: e.clientY};
		var w = $element.width();
		var h = $element.height();

		if (click.x > pos.left && click.x < pos.left + w &&
			click.y > pos.top && click.y < pos.top + h){
			console.log("d");

			if (click.x > w){
				$element.css("left", Math.max(10, click.x - w - 400));
			} else if (click.x < w){
				$element.css("left", Math.min(click.x + 400, res.y - 20 - w));
			}
		}
	}

}

Ship.prototype.toggleDivSize = function(){
	if ($(this.element).find(".structContainer").is(":visible")){
		$(this.element).find(".structContainer").hide();
	} else $(this.element).find(".structContainer").show();
}

Ship.prototype.setPreMoveFaceHead = function(){
	//console.log("setPreMoveFaceHead #"+this.id);
	this.drawFacing = this.facing;

	if (game.phase == -1){return;}

	if (this.available == game.turn){
		for (var i = 0; i < this.actions.length; i++){
			if (this.actions[i].type == "deploy" || this.actions[i].type == "jumpIn"){
				this.drawFacing += this.actions[i].f;
			}
		}
	}
	else if (this.faction[0] == "V"){
		for (var i = 0; i < this.actions.length; i++){
			if (this.actions[i].type == "rotate"){
				this.drawFacing += this.actions[i].f;
			}
		}
	}
}

Ship.prototype.setPostMoveFaceHead = function(){
	//console.log("setPostMoveFaceHead #"+this.id);
	//if (this.faction[0] == "V"){console.log("ding");}
	this.drawFacing = this.facing;
	for (var i = 0; i < this.actions.length; i++){
		this.drawFacing += this.actions[i].f;
	}
}

Ship.prototype.setPreMovePosition = function(){
	//console.log("setPreMovePosition #"+this.id);

	if (this.available == game.turn){
		if ((this.flight || this.salvo) && game.phase <= 2){
			this.x = this.actions[0].x;
			this.y = this.actions[0].y;
		}
		else {
			this.x = this.actions[1].x;
			this.y = this.actions[1].y;
		}
	}
	this.drawX = this.x;
	this.drawY = this.y;
}

Ship.prototype.setPostMovePosition = function(){
	//console.log("setPostMovePosition #"+this.id);
	if (!this.actions.length){return;}

	for (var i = this.actions.length-1; i >= 0; i--){
		if (this.actions[i].resolved){
			this.drawX = this.actions[i].x;
			this.drawY = this.actions[i].y;
			return;
		}
	}
	//this.drawX = this.actions[this.actions.length-1].x;
	//this.drawY = this.actions[this.actions.length-1].y;
}

Ship.prototype.animatesThisSegment = function(){
	if (!this.toAnimate){return false;}
	if (this.focus && !game.animFocus){return false;}
	if ((this.ship || this.squad) && !game.animShip){return false;}
	if (this.flight && !game.animFlight){return false;}
	if (this.salvo && !game.animSalvo){return false;}
	if (this.obstacle && !game.animObstacles){return false;}
	return true;
}

Ship.prototype.movesThisPhase = function(){
	if ((this.ship || this.squad) && game.phase > this.focus){return false;}
	if ((this.flight || this.salvo) && game.phase != 2){return false;}
	return true;
}

Ship.prototype.hasMoved = function(){
	if (this.actions.length && this.actions[this.actions.length-1].resolved){return true;}
	return false;
}

Ship.prototype.setDrawData = function(){
	//console.log("SHIP setDrawData");
	if (this.available > game.turn || !this.available || game.turn == 1 && game.phase == -1){
		if (this.friendly && this.isReady){
			this.setPostMovePosition();
			this.setPostMoveFaceHead();
			return;
		}
	}
	if (!this.deployed){return;}

	if (game.phase == -1 || game.phase == 0){
		this.setPreMovePosition();
		this.setPreMoveFaceHead();
	}
	else if (this.focus == game.phase-1){
		this.setPreMovePosition();
		this.setPreMoveFaceHead();
	}
	else if (this.focus == game.phase){
		this.setPreMovePosition();
		this.setPreMoveFaceHead();
	}
	else if (this.focus < game.phase){
		this.setPostMovePosition();
		this.setPostMoveFaceHead();
	}
	else if (game.phase > 2){
		this.setPostMovePosition();
		this.setPostMoveFaceHead();
	}
}

Ship.prototype.setUnitSelector = function(){
	var id = this.id;
	ui.unitSelector.find("div").each(function(){
		if ($(this).data("id") == id){
			$(this).toggleClass("selected"); return;
		}
	});
	$(this.element).toggleClass("selection");
}

Ship.prototype.getArmourString = function(a){
	return this.getStructureFromAngle(a).getArmourString();
}

Ship.prototype.getSectionString = function(a){
	return this.getStructureFromAngle(a).type + (this.rolled ? "<span class='yellow'> (rolled)</span>" : "");
	if (this.rolled){
		var val = this.getStructureFromAngle(a).type;
		return val + "<span class='yellow'> (rolled)</span>";
	} else return this.getStructureFromAngle(a).type;
}

Ship.prototype.getStructureFromAngle = function(a){
	for (var i = 0; i < this.structures.length; i++){
		var	start; var end;

		if (this.rolled){
			if (this.structures[i].start < this.structures[i].end){
				start = 360 - this.structures[i].end;
				end = 360 - this.structures[i].start;
			}
			else {
				end = 360 - this.structures[i].start;
				start = 360 -this.structures[i].end;
			}
		}
		else {
			start = this.structures[i].start;
			end = this.structures[i].end
		}

		if (isInArc(a, start, end)){return this.structures[i];}
	}
}

Ship.prototype.getColor = function(){
	return (this.friendly ? "#00ea00" : "red");
}

Ship.prototype.drawMovePlan = function(){
	//console.log("draw moves for #" + this.id);
	if (!this.selected && (!this.actions.length || !this.deployed)){return;}

	var color = this.getColor();
	
	planCtx.translate(cam.o.x, cam.o.y);
	planCtx.scale(cam.z, cam.z);
	planCtx.strokeStyle = color;

	planCtx.globalAlpha = 0.7;

	var start = this.getTurnStartPos();
	planCtx.beginPath();
	planCtx.moveTo(start.x, start.y);

	for (var i = 0; i < this.actions.length; i++){
		if (this.actions[i].type == "move"){
			planCtx.lineTo(this.actions[i].x, this.actions[i].y);
			planCtx.stroke();
		}
		else if (this.actions[i].type == "turn"){
			planCtx.beginPath();
			planCtx.arc(this.actions[i].x, this.actions[i].y, 5, 0, 2*Math.PI, false);
			planCtx.stroke();
			planCtx.moveTo(this.actions[i].x, this.actions[i].y);
		}
	}

	//if (!this.hasMoved() && this.actions.length){this.drawMarker(this.actions[this.actions.length-1].x, this.actions[this.actions.length-1].y, planCtx.strokeStyle, planCtx);}

	planCtx.closePath();
	planCtx.globalAlpha = 1;
	planCtx.strokeStyle = "black";
	planCtx.setTransform(1,0,0,1,0,0);


}

Ship.prototype.getHeader = function(){
	var div = $("<div>");
	div
	.append($("<div>")
		.append($("<div>").css("display", "inline").html(this.display + " #" + this.id))
		.append($("<div>").css("display", "inline").css("margin-left", 30).html("(" + this.getFocusCost() + ")")))

	var html = "";
	if (this.command && this.focus){html = "<div class='yellow'>-CMD-  &  -FOCUS-</div>";}
	else if (this.command){html = "<div class='yellow'>-CMD-</div>";}
	else if (this.focus){html = "<div class='yellow'>-FOCUS-</div>";}

	div.append($("<div>").html(html));

	return div;
}

Ship.prototype.getShortInfo = function(){
	var ele = ui.shortInfo;
	if (this.userid == game.userid){
		$(ele).attr("class", "friendly");
	} else $(ele).attr("class", "hostile");

	var impulse = this.getCurSpeed();

	ele
	.append(this.getHeader())

	if (this.isRolled()){ele.append($("<div>").addClass("yellow").html("!-ROLLED-!"));}
	if (this.isRolling()){ele.append($("<div>").addClass("yellow").html("!-ROLLING-!"));}
	if (this.isFlipping()){ele.append($("<div>").addClass("yellow").html("!-FLIPPING-!"));}

	ele
	.append($("<div>").html("Speed: " + impulse + " (" + round(impulse / this.getBaseImpulse(), 2) + ")"))
	.append($("<div>").html("Base To-Hit: " + this.getStringHitChance()))

	this.appendCollisions(ele);
}

Ship.prototype.appendCollisions = function(ele){
	if (!this.collisions.length){return;}

	ele.append($("<div>").addClass("yellow").html("Collisions"))
	for (var i = 0; i < this.collisions.length; i++){
		var html = this.collisions[i].realAttacks +"x " + this.collisions[i].damage + " @ " + this.collisions[i].realCol + "%</br>";
		ele.append($("<div>").html(html))
	}
}

Ship.prototype.getParent = function(){
	return this;
}

Ship.prototype.setUnitState = function(){
	//console.log("setUnitState " + this.id)
	if (this.userid == game.userid){
		this.friendly = 1;
	}

	if (this.available < game.turn){
		this.deployed = 1;
	} else if (this.friendly && this.actions.length){
		this.deployed = 1;
	} else if (!this.friendly && this.actions.length && this.actions[0].resolved){
		this.deployed = 1;
	}

	if (this.available < game.turn){
		this.isReady = 1;
	}
	else if (this.available == game.turn && game.turn > 1){
		this.isReady = 1;
	}
	else if (this.available == game.turn && game.phase > 0){
		this.isReady = 1;
	}
	else if (this.available > game.turn && this.actions.length == 1 && !this.actions[0].resolved){
		this.isReady = 1;
	}
}

Ship.prototype.setNextMove = function(){
	return;
}

Ship.prototype.select = function(e){
	if (!this.selected){
		this.doSelect(e);
	} else this.switchDiv(e);
}

Ship.prototype.doSelect = function(e){
	console.log(this);
	aUnit = this.id;
	this.selected = true;
	this.setUnitSelector();
	game.redraw()
	this.switchDiv(e);
	this.setMoveMode();
}

Ship.prototype.doUnselect = function(e){
	this.unselectSystems();
	aUnit = false;
	this.selected = false;
	this.setUnitSelector();
	if (game.deploying){game.disableDeployment();}
	else if (game.flightDeploy){game.flightDeploy = false;}
	else if (game.mission){this.disableMissionMode()}
	this.switchDiv(e);
	this.unsetMoveMode();
	$("#hangarDiv").addClass("disabled");
	$("#popupWrapper").hide();
	$("#instructWrapper").hide();
	$("#collideWrapper").hide();
	$("#sysDiv").remove();
	$(ui.doShorten).empty();
	mouseCtx.clearRect(0, 0, res.x, res.y);
	game.redraw();
}

Ship.prototype.doHighlight = function(){
	if (this.highlight){
		this.highlight = false;
		game.draw();
	}	
	else {
		this.highlight = true;
		ctx.translate(cam.o.x, cam.o.y);
		ctx.scale(cam.z, cam.z);
		ctx.beginPath();
		ctx.arc(this.drawX, this.drawY, this.size/2, 0, 2*Math.PI, false);
		ctx.closePath();
		ctx.lineWidth = 3;
		ctx.globalAlpha = 1;
		ctx.strokeStyle = "white";
		ctx.stroke();
		ctx.setTransform(1,0,0,1,0,0);
	}
}

Ship.prototype.drawTrajectory = function(){
	if (!this.salvo || !this.mission.arrived){return;}
	var t = this.getTarget().getPlannedPos();

	planCtx.globalAlpha = 1;
	planCtx.translate(cam.o.x, cam.o.y);
	planCtx.scale(cam.z, cam.z);
	planCtx.beginPath();
	planCtx.moveTo(this.x, this.y);
	planCtx.lineTo(t.x, t.y);
	planCtx.closePath();
	planCtx.strokeStyle = "white";
	planCtx.stroke();
	planCtx.setTransform(1,0,0,1,0,0);
}

Ship.prototype.setMoveSlipAngles = function(){
	this.setSlipAngle();
	this.setMoveAngles();
}

Ship.prototype.create = function(){
	//console.log("create "+this.id);
	this.setUnitState();
	this.setSubSystemState();
	this.setStringHitChance();
	this.setMoveSlipAngles();
}

Ship.prototype.setSubSystemState = function(){
	for (var i = 0; i < this.primary.systems.length; i++){
		this.primary.systems[i].setState();
	}
	for (var i = 0; i < this.structures.length; i++){
		this.structures[i].setStructState();
		this.structures[i].setBonusNegation();
		for (var j = 0; j < this.structures[i].systems.length; j++){
			this.structures[i].systems[j].setState();
			this.structures[i].systems[j].setBonusNegation(this.structures[i].bonusNegation);
		}

		if (this.structures[i].turret){this.structures[i].setLayout(this.size);}
	}
}

Ship.prototype.setStringHitChance = function(){
	if (this.profile[0] != this.profile[1]){
		string = Math.floor(this.baseHitChance * this.profile[0]) + " - " + Math.floor(this.baseHitChance * this.profile[1]);
	}
	else string = Math.floor(this.baseHitChance * this.profile[0]);
	this.stringHitChance = (string + "%");
}

Ship.prototype.getStringHitChance = function(){
	//console.log("getStringHitChance #" + this.id);
	return this.stringHitChance;
}

Ship.prototype.setSize = function(){
	return;
}

Ship.prototype.setLayout = function(){
	return;
}

Ship.prototype.setImage = function(){
	this.img = graphics.images[this.name.toLowerCase()];
}

Ship.prototype.getCodeColor = function(){
	if (this.friendly){return "#27e627"}
	else return "#ff3d00";
}

Ship.prototype.attachLogEntry = function(html){
	$("#combatLog").find("tbody")
		.append($("<tr>")
			.data("unitid", this.id)
			.hover(
				function(){
					var data = $(this).data();
					game.getUnit($(this).data("unitid")).doHighlight()
				},
				function(){
					var data = $(this).data();
					game.getUnit($(this).data("unitid")).highlight = 0;
					game.redraw();
				}
			)
			.html(html));
}

Ship.prototype.createCritLogEntry = function(){
	if (!this.ship){return false;}
	
	var html = "<th style='padding: 10px' colSpan=4><span style='font-size: 12px; font-weight: bold'>" + this.getLogTitleSpan() + "</span> is subject to critical effects.</th><td colSpan=5>";
	var expand = "";

	for (let i = 0; i < this.primary.systems.length; i++){
		expand += this.primary.systems[i].getCritLogString();
	}
	if (expand.length > 2){
		expand += "</td>";
		this.attachLogEntry(html + expand);
		return true;
	}
	return false;
}
Ship.prototype.createMoraleLogEntry = function(){
	if (!this.notes || this.flight || this.salvo || this.obstacle){return false;}
	//var data = this.notes.slice(0, this.notes.length-1).split(";");
	//var morale = "";
	//for (var i = 0; i < data.length; i++){if (data[i][0] == "m"){morale = data[i].slice(1, data[i].length); break;}}
	var type = this.notes[0];
	var numbers = this.notes.slice(2, this.notes.length).split(";");

	if (numbers[0] == 100){return;}

	//var html = "<td colSpan=9 style='padding: 5px'><span style='font-size: 12px; font-weight: bold'>Severe damage (> 15%) forces a morale check from " + this.getLogTitleSpan() + "</br>";
		//html += "CLIENT: " + this.getRecentMoraleCheckDamage() + " %</br>";
	var html = "<td colSpan=9 style='padding: 5px'><span style='font-size: 12px; font-weight: bold'>";
		html += this.getLogTitleSpan() + " lost " + this.getRecentMoraleCheckDamage() + "% of its remaining health, causing a morale check.</br>";
	//	html += "Initial chance to fail: " + numbers[0] + "%, rolled: " + numbers[1] + " - ";

	//	html += "<span class='yellow'>" + ((type == "p") ? " Passed ! (-30 on final severity)" : " Failed !") +"</span></br>";

	//	html +=	"The unit rolled <span class='yellow'>" + numbers[2] + "</span> for effect, in addition to its existing total penalties of <span class='yellow'>" + (numbers[3]-numbers[2]) + "</span> for a total of <span class='yellow'> " + numbers[3] +".</span></br>";

	var effect = 0;
	if (this.actions.length && this.actions[this.actions.length-1].type == "jumpOut"){
		html += "The unit <span class='yellow'> is routed</span>.";
		effect = 1;
	}
	else {
		var command = this.getSystemByName("Command");
		for (var i = 0; i < command.crits.length; i++){
			if (command.crits[i].turn != game.turn || command.crits[i].duration != -2){continue;}
			html += "The unit is subject to <span class='yellow'>" + command.crits[i].value + "% " + command.crits[i].type + "</span>.";
			effect = 1;
		}
	}

	if (!effect){
		html += "Just a normal day in space.";
	}

	html += "</td>";

	this.attachLogEntry(html);
	return true;
}

Ship.prototype.getCallSign = function(){
	if (this.callsign.length >= 3){
		return " - " + this.callsign + " - ";
	}
	return this.callsign;
}

Ship.prototype.getLogTitleSpan = function(){
	return "<span style='color: " + this.getCodeColor() + "'>" + this.name + " #" + this.id + this.getLogNameEntry() + " </span>";
}

Ship.prototype.getLogNameEntry = function(){
	if (this.callsign.length >= 3){
		return this.getCallSign();
	}
	return "";
}

Ship.prototype.createDeployEntry = function(){
	this.attachLogEntry("<th colSpan=9><span>" + this.getLogTitleSpan() + " jumps into local space.</span></th>");
	$("#combatLog").find("tbody tr").last()
		.hover(
			function(){game.getUnit($(this).data("unitid")).highlightJumpShift();},
			function(){game.redraw()}
		)
}

Ship.prototype.createPrepareJumpEntry = function(){
	this.attachLogEntry("<th colSpan=9><span>" + this.getLogTitleSpan() + " is preparing to jump into hyperspace.</span></th>");
}

Ship.prototype.createUndeployEntry = function(){
	this.attachLogEntry("<th colSpan=9><span>" + this.getLogTitleSpan() + " jumps into hyperspace and leaves the battlefield.</span></th>");
}

Ship.prototype.createCommandTransferEntry = function(){
	this.attachLogEntry("<th colSpan=9><span class='yellow'>Fleet Command</span> has been transfered to " + this.getLogTitleSpan() + "</th>");
}

Ship.prototype.createMoveStartEntry = function(type){
	switch (type){
		case "roll":
			this.attachLogEntry("<th colSpan=9><span>" + this.getLogTitleSpan() + " has completed a full roll but is still rolling.</span></th>");
			return;
		case "flip":
			this.attachLogEntry("<th colSpan=9><span>" + this.getLogTitleSpan() + " has completed a full flip.</span></th>");
			return;
	}
}

Ship.prototype.createActionEntry = function(){
	if (this.isRolling()){
		this.attachLogEntry("<th colSpan=9><span>" + this.getLogTitleSpan() + " is initiating a ROLL manover.</span></th>");
	}
	else if (this.hasStoppedRolling()){
		this.attachLogEntry("<th colSpan=9><span>" + this.getLogTitleSpan() + " has canceled its ongoing ROLL manover.</span></th>");
	}
	else if (this.isFlipping()){
		this.attachLogEntry("<th colSpan=9><span>" + this.getLogTitleSpan() + " is initiating a FLIP manover.</span></th>");
	}
}

Ship.prototype.createStillRollingEntry = function(){
	this.attachLogEntry("<th colSpan=9><span>" + this.getLogTitleSpan() + " is continueing its roll manover.</span></th>");							
}

Ship.prototype.createMoveEndEntry = function(){
	this.attachLogEntry("<th colSpan=9><span>" + this.getLogTitleSpan() + " has completed a full roll.</span></th>")
}

Ship.prototype.getCost = function(){
 	return this.structures.map(x => x.cost).reduce((a, b) => a+b, 0);
}

Ship.prototype.animateSelfDeployIn = function(){

	if (this.deployAnim[0] == this.deployAnim[1]){
		this.deployed = 1;
		this.isReady = 1;
		ctx.translate(this.drawX, this.drawY);
		ctx.rotate(this.getDrawFacing() * Math.PI/180);
		this.drawSelf();
		ctx.rotate(-this.getDrawFacing() * Math.PI/180);
		ctx.translate(-this.drawX, -this.drawY);
		this.createDeployEntry();
		return;
	}

	this.deployAnim[0] += 1;

	var fraction = this.deployAnim[0] / this.deployAnim[1];
	var sin = Math.sin(Math.PI*fraction);
	var s = this.size*2.5*sin;

	ctx.globalAlpha = sin;
	ctx.drawImage(graphics.images.blueVortex, this.drawX-s/2, this.drawY-s/2, s, s);

	if (fraction > 0.5){
		ctx.globalAlpha = fraction;
		ctx.translate(this.drawX, this.drawY);
		ctx.rotate(this.getDrawFacing() * Math.PI/180);
		this.drawSelf();
		ctx.rotate(-this.getDrawFacing() * Math.PI/180);
		ctx.translate(-this.drawX, -this.drawY);
	}
}

Ship.prototype.animateDeployOut = function(){
	if (this.deployAnim[0] == this.deployAnim[1]){
		this.deployed = 0;
		this.isReady = 0;
		this.createUndeployEntry();
		return;
	}

	this.deployAnim[0] += 1;

	var fraction = 1-this.deployAnim[0] / this.deployAnim[1];
	var sin = Math.sin(Math.PI*fraction);
	var s = this.size*2.5*sin;

	//console.log(fraction)

	ctx.globalAlpha = sin;
	ctx.drawImage(graphics.images.redVortex, this.drawX-s/2, this.drawY-s/2, s, s);

	if (fraction > 0.5){
		ctx.globalAlpha = 1;
	} else ctx.globalAlpha = fraction * 2;

	ctx.translate(this.drawX, this.drawY);
	ctx.rotate(this.getDrawFacing() * Math.PI/180);
	this.drawSelf();
	ctx.rotate(-this.getDrawFacing() * Math.PI/180);
	ctx.translate(-this.drawX, -this.drawY);
}

Ship.prototype.draw = function(){
	if (!this.isReady){return;}

 	if (this.doDraw){this.drawPositionMarker();}

	ctx.translate(this.drawX, this.drawY);
	ctx.rotate(this.getDrawFacing() * Math.PI/180);

	if (this.doDraw){this.drawSelf();}

	this.drawEscort();
	ctx.rotate(-this.getDrawFacing() * Math.PI/180);
	ctx.translate(-this.drawX, -this.drawY);
}

Ship.prototype.drawIncomingPreview = function(){
	ctx.translate(this.drawX, this.drawY);

	ctx.beginPath();
	ctx.arc(0, 0, (this.friendly ? this.size/2 : 50), 0, 2*Math.PI, false);
	ctx.closePath();

	//ctx.font = "26px Arial";
	ctx.fillStyle = "lightBlue";
	ctx.globalAlpha = 0.2;
	ctx.fill();
	ctx.globalAlpha = 1;
	ctx.textAlign = "center";

	if (this.friendly){
		ctx.rotate(this.getDrawFacing() * Math.PI/180);
		ctx.drawImage(this.img, -this.size/2, -this.size/2, this.size, this.size);
		ctx.rotate(-this.getDrawFacing() * Math.PI/180);
		ctx.fillStyle = "green";
		ctx.font = "20px Arial";
		ctx.fillText("ETA " + (this.available - game.turn), 0, +40);
		//ctx.fillText(this.available != game.turn ? "ETA " + (this.available - game.turn) : "NOW", 0, +40);
	}
	else {
		ctx.fillStyle = "red";
		ctx.font = "50px Arial";
		ctx.fillText("?", 0, 0);
		ctx.font = "20px Arial";
		ctx.fillText("ETA " + (this.available - game.turn), 0, +30);
	}
	ctx.translate(-this.drawX, -this.drawY);
}

Ship.prototype.highlightJumpShift = function(){
	ctx.translate(cam.o.x, cam.o.y);
	ctx.scale(cam.z, cam.z);
	ctx.translate(this.actions[0].x, this.actions[0].y);
	ctx.globalAlpha = 1;

	ctx.beginPath();
	ctx.arc(0, 0, 10, 0, 2*Math.PI, false);
	ctx.closePath();
	ctx.fillStyle = "yellow";
	ctx.fill();

	var p = getPointInDir(100, this.actions[0].h, 0, 0);
	//console.log(p);
	ctx.beginPath();
	ctx.moveTo(0, 0)
	ctx.lineTo(p.x, p.y);
	ctx.closePath();
	ctx.strokeStyle = "yellow";
	ctx.stroke();

	ctx.translate(-this.drawX, -this.drawY); return;
}

Ship.prototype.drawPositionMarker = function(){
	if (!game.drawCircle){return;}
	var color = "";
	if (this.selected){color = "yellow"}
	else color = this.getCodeColor();
	this.drawMarker(this.drawX, this.drawY, color, ctx);
}

Ship.prototype.drawSelf = function(){
	ctx.drawImage(this.img, -this.size/2, -this.size/2, this.size, this.size);
}

Ship.prototype.drawEscort = function(){
	if (this.cc.length && this.drawImg != undefined){
		var s = this.drawImg.width/2;
		ctx.drawImage(this.drawImg, -s/2, -s/2, s, s);
	}
}

Ship.prototype.drawMarker = function(x, y, c, context){
	context.beginPath();
	context.arc(x, y, (this.size-2)/2, 0, 2*Math.PI, false);
	context.closePath();
	context.lineWidth = 1 + Math.floor(this.selected*2 + (this.focus == 1)*2);
	context.globalAlpha = 0.7 + (this.focus == 1) * 0.1;
	context.globalCompositeOperation = "source-over";
	context.strokeStyle = c;
	context.stroke();
	context.globalAlpha = 1;
	context.lineWidth = 1;
	context.strokeStyle = "black";
}

Ship.prototype.getPlannedHeading = function(){
	var adjust = 0;

	for (var i = 0; i < this.actions.length; i++){
		adjust += this.actions[i].h;
	}
	return this.heading + adjust;
}

Ship.prototype.getPlannedFacing = function(){
	var adjust = 0;

	for (var i = 0; i < this.actions.length; i++){
		adjust += this.actions[i].f;
	}
	return this.facing + adjust;
}

Ship.prototype.getDrawFacing = function(){
	return this.drawFacing;
}

Ship.prototype.getRealHeading = function(){
	var heading = 0;

	for (var i = 0; i < this.actions.length; i++){
		if (this.actions[i].resolved){
			heading += this.actions[i].h;
		}
	}
	return this.heading + heading;
}

Ship.prototype.getImpulseMod = function(){
	return this.getCurSpeed() / this.getBaseImpulse();
}

Ship.prototype.getBaseHitChance = function(){
	return this.baseHitChance;
}

Ship.prototype.getAngledHitChance = function(angle){
	//console.log(angle);
	var a, b, c, base;
	
	while (angle > 90){
		angle -= 180;
	}
	if (angle < 0){
		angle *= -1;
	}

	base = this.getBaseHitChance();
	a = base * this.profile[0];
	b = base * this.profile[1];
	sub = ((90 - angle) * a) + ((angle - 0) * b);
	sub /= (90 - 0);
	return Math.ceil(sub);
}

Ship.prototype.getDmgsByFire = function(fire){
	//console.log(fire.hits);
	var dmgs = [];
	var lookup = 0;

	for (var i = 0; i < fire.hits.length; i++){
		lookup += fire.hits[i] * fire.weapon.getDmgsPerShot(fire);
	}

	if (!lookup){return dmgs;}

	for (var i = this.primary.damages.length-1; i >= 0; i--){
		if (this.primary.damages[i].fireid == fire.id){					
			dmgs.push(this.primary.damages[i]);
			dmgs[dmgs.length-1].system = this.primary.display;
			dmgs[dmgs.length-1].loc = this.getSystemLocation(-1, this.primary.name);
			//if (this.primary.damages[i].systemid == 1){lookup--;}
			if (!lookup){return dmgs};
		}
		else if (this.primary.damages[i].turn < fire.turn){
			break;
		}
	}

	for (var i = 0; i < this.primary.systems.length; i++){
		for (var j = this.primary.systems[i].damages.length-1; j >= 0; j--){
			if (this.primary.systems[i].damages[j].fireid == fire.id){
				dmgs.push(this.primary.systems[i].damages[j]);
				dmgs[dmgs.length-1].system = this.primary.systems[i].display;
				dmgs[dmgs.length-1].loc = this.getSystemLocation(-1, this.primary.systems[i].name);
				lookup--;
				if (!lookup){return dmgs};
			}
			else if (this.primary.systems[i].damages[j].turn < fire.turn){
				break;
			}
		}
	}

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].damages.length; j++){
			if (this.structures[i].damages[j].fireid == fire.id){
				dmgs.push(this.structures[i].damages[j]);
				dmgs[dmgs.length-1].system = this.structures[i].display;
				dmgs[dmgs.length-1].loc = this.getSystemLocation(-1, "Main Structure");
				lookup--;
				if (!lookup){return dmgs};
			}
		}
		for (var j = 0; j < this.structures[i].systems.length; j++){
			for (var k = this.structures[i].systems[j].damages.length-1; k >= 0; k--){
				if (this.structures[i].systems[j].damages[k].fireid == fire.id){
					dmgs.push(this.structures[i].systems[j].damages[k]);
					dmgs[dmgs.length-1].system = this.structures[i].systems[j].display
					dmgs[dmgs.length-1].loc = this.getSystemLocation(i, this.structures[i].systems[j].name);
					lookup--;
					if (!lookup){return dmgs};
				} else if (this.structures[i].systems[j].damages[k].turn < fire.turn){
					break;
				}
			}
		}
	}
	return dmgs;
}

Ship.prototype.getFlashHitSection = function(fire){
	var o = fire.shooter.getPlannedPos();
	var t = this.getPlannedPos();
	var a = getAngleFromTo(o, t) + range(-5, 5);
	var d = -this.size/3;
	return getPointInDir(d, a, 0, 0);
}

Ship.prototype.getFireDest = function(fire, isHit, num){
	if (isHit){return fire.damages[num].loc;}
	else {
		var o = fire.shooter.getPlannedPos();
		var t = this.getPlannedPos();
		var a = getAngleFromTo(o, t)// + range(-3, 3);
		var d = this.size * range(7, 13) / 10;
		return getPointInDir(d, a, 0, 0);
		return rotate(0, 0, getPointInDir(d, a, 0, 0), this.getDrawFacing());
	}
}

Ship.prototype.getSystemLocation = function(i, name){
	var p;
	if (i == -1){
		switch (name){
			case "Main Structure": p = getPointInDir(this.size/6, this.getDrawFacing()+range(0, 359), 0, 0); break;
			case "Command": p = getPointInDir(this.size/6, this.getDrawFacing()+range(-10, 10), 0, 0); break;
			case "Reactor": p = getPointInDir(-this.size/4, this.getDrawFacing()+range(-15, 15), 0, 0); break;
			case "Sensor": p = getPointInDir(this.size/3, this.getDrawFacing()+range(-15, 15), 0, 0); break;
			case "Engine": p = getPointInDir(-this.size/4, this.getDrawFacing()+range(-15, 15), 0, 0); break;
			case "Jammer": p = getPointInDir(-this.size/4, this.getDrawFacing()+range(-15, 15), 0, 0); break;
			case "GravitonSupressor": p = getPointInDir(-this.size/4, this.getDrawFacing()+range(-15, 15), 0, 0); break;
		}
	}
	else {
		p = getPointInDir(this.size/4, getSystemArcDir(this.structures[i]) + this.getDrawFacing() + range(-10, 10), 0, 0);
	}
	p.x += range(-8, 8);
	p.y += range(-8, 8);
	return p;
}

Ship.prototype.getWeaponOrigin = function(id){
	for (var i = 0; i < this.structures.length; i++){
		if (i == this.structures.length-1 || id > this.structures[i].id && id < this.structures[i+1].id){
			return this.structures[i].getWeaponPosition(this.size, this.getDrawFacing());
		}
	}
	console.log("lacking gun origin");
	return this.getSystem(id);
}

Ship.prototype.jumpIsImminent = function(){
	if (this.withdraw == game.turn+1){return true;}
	//if (this.actions.length && this.actions[this.actions.length-1].type == "jumpOut"){return true;}
	return false;
}

Ship.prototype.isPreparingJump = function(){
	if (this.actions.length && this.actions[this.actions.length-1].type == "jumpOut"){return true;}
	if (this.withdraw){return true;}
	return false;
}

Ship.prototype.resetMoveMode = function(){
	var turnMode = game.turnMode;

	this.unsetMoveMode();
	this.setMoveMode();
	if (turnMode && this.canTurn()){
		this.switchTurnMode();
	}
}

Ship.prototype.getCurSpeed = function(){
	if (game.phase >= 1 && (this.hasMoved())){return this.curImp;}
	var step = this.getImpulseStep();
	var amount = 0;
	for (var i = 0; i < this.actions.length; i++){
		if (this.actions[i].type != "speed"){continue;}
		amount += this.actions[i].dist;
	}
	return this.curImp + step*amount;
}

Ship.prototype.getRemSpeed = function(){
	if (game.phase > this.focus){return 0;}	
	var impulse = this.getCurSpeed();
	for (var i = 0; i < this.actions.length; i++){
		if (this.actions[i].turn == game.turn){
			if (this.actions[i].type == "flip"){
				impulse = Math.floor(impulse/2);
			}
			else if (this.actions[i].type == "move"){
				impulse -= this.actions[i].dist;
			}
		}
	}
	return impulse;
}

Ship.prototype.getFacingSectionPoint = function(fire){
	var o = fire.shooter.getPlannedPos();
	var t = this.getPlannedPos();
	var a = getAngleFromTo(o, t) + range(-5, 5);
	//var d = getDistance(o, t);
	return getPointInDir(-this.size/4, a, 0, 0);
}

Ship.prototype.getExploSize = function(i){
	if (this.ship){return this.size;}
	else if (this.squad){return this.structures[i].size/2;}
	else if (this.flight){return this.structures[i].mass*0.4;}
	else if (this.salvo){return 10;}
}

Ship.prototype.setMoveAngles = function(){
	//console.log("setMoveAngles");
	var angle = this.getPlannedHeading();
	var slipAngle = this.getSlipAngle();	
	this.moveAngles = {start: addAngle(0 + slipAngle, angle), end: addAngle(360 - slipAngle, angle)};
}

Ship.prototype.drawMoveArea = function(){
	//console.log("drawMoveArea");

	var center = this.getPlannedPos();	
	var rem = this.getRemSpeed();
	var p1 = getPointInDir(rem, this.moveAngles.start, center.x, center.y);
	var dist = getDistance( {x: center.x, y: center.y}, p1);
	var rad1 = degreeToRadian(this.moveAngles.start);
	var rad2 = degreeToRadian(this.moveAngles.end);
	var delay = this.getRemDelay();
	
	if (delay > 0){
		var delayRad1 = degreeToRadian(this.moveAngles.start-45);
		var delayRad2 = degreeToRadian(this.moveAngles.end+45);
		moveCtx.beginPath();			
		moveCtx.arc(center.x, center.y, delay, delayRad1, delayRad2, false);
		moveCtx.closePath();
		moveCtx.strokeStyle = "yellow";
		moveCtx.lineWidth = 2
		moveCtx.stroke();
		moveCtx.strokeStyle = "black";	
		moveCtx.arc(center.x, center.y, Math.max(0,delay-3), 0, 2*Math.PI, false);
		moveCtx.globalCompositeOperation = "destination-out";
		moveCtx.fill();
		moveCtx.globalCompositeOperation = "source-over";
	}

	moveCtx.beginPath();			
	moveCtx.moveTo(center.x, center.y);
	moveCtx.lineTo(p1.x, p1.y); 
	moveCtx.arc(center.x, center.y, dist, rad1, rad2, false);
	moveCtx.closePath();
	moveCtx.globalAlpha = 0.15;
	moveCtx.fillStyle = "white";
	moveCtx.fill();
	moveCtx.globalAlpha = 1;
}

Ship.prototype.getEngineOutput = function(){
	var ep = 0;

	for (var i = 0; i < this.primary.systems.length; i++){
		if (this.primary.systems[i].name == "Engine"){
			ep += this.primary.systems[i].getOutput();
		}
	}
	return ep;
}

Ship.prototype.getEffEP = function(){
	return Math.floor(this.getEngineOutput() / this.getImpulseMod());
}

Ship.prototype.getRemEP = function(){
	var ep = this.getEffEP();
	
	for (var i = 0; i < this.actions.length; i++){
		if (this.actions[i].turn == game.turn){
			if (this.actions[i].cost != 0){
				ep -= this.actions[i].cost / this.getImpulseMod() * this.actions[i].costmod;
			}
		}
	}
	
	if (ep < 0){return 0;}
	return Math.ceil(ep);
}

Ship.prototype.getRemDelay = function(){
	var delay = this.remDelay;
	for (var i = 0; i < this.actions.length; i++){
		if (this.actions[i].type == "turn"){
			delay += Math.ceil(this.actions[i].delay/this.actions[i].costmod);
			//delay += this.actions[i].delay;
		}
		else if (this.actions[i].type == "move"){
			delay = Math.max(0, delay - this.actions[i].dist);
		}
	}
	return Math.ceil(delay);
}	

Ship.prototype.getRemDelaya = function(){
	return this.remDelay;
}

Ship.prototype.getTurnStartPos = function(){
	if (this.available == game.turn){
		if (this.ship || this.squad){
			var l = game.phase == -1 ? 0 : 1;
			return {x: this.actions[l].x, y: this.actions[l].y};
		}
		else {
			return {x: this.actions[0].x, y: this.actions[0].y};
		}
	}
	return new Point(this.x, this.y);
}

Ship.prototype.getCameraStartPos = function(){
	if (this.focus && game.phase == 2){
		return new Point(this.x, this.y);
	}
	return this.getPlannedPos();
}

Ship.prototype.getTurnStartFacing = function(){
	return this.facing;
}

Ship.prototype.getPlannedPos = function(){
	if (this.actions.length){
		return new Point(this.actions[this.actions.length-1].x, this.actions[this.actions.length-1].y);
	}
	return new Point(this.x, this.y);
}
	
Ship.prototype.getGamePos = function(){
	if (this.actions.length){
		for (var i = this.actions.length-1; i >= 0; i--){
			if (this.actions[i].resolved == 1){
				return {x: this.actions[i].x, y: this.actions[i].y};
			}
		}
	}
	return {x: this.x, y: this.y};
}

Ship.prototype.getDrawPos = function(){
	return {x: this.drawX, y: this.drawY};
}

Ship.prototype.unpowerAllSystems = function(){
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (!this.structures[i].systems[j].destroyed){
				this.structures[i].systems[j].disabled = 1;
				this.structures[i].systems[j].setTableRow();
			}
		}
	}
}

Ship.prototype.getIntactElements = function(){
	var alive = 0;
	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].destroyed){
			alive++;
		}
	}
	return alive;
}

Ship.prototype.getCurMorale = function(){
	return this.morale.current;
}

Ship.prototype.getRelativeMoraleValue = function(){
	if (game.playerstatus){
		return (this.moraleCost);
	} else return "";
	
	if (game.playerstatus){
		return (this.moraleCost + " / " + Math.floor((this.moraleCost / game.getPlayerStatus(this.userid).morale)*100) + "%");
	} else return "";
}

Ship.prototype.showUnitMoraleDiv = function(e){
	var div = $("<div>")
		.css("left", e.clientX - 90)
		.css("top", e.clientY + 40)
		.attr("id", "sysDiv")
		.append($("<table>")
			.append($("<tr>")
				.append($("<th>").attr("colSpan", 2).html("Morale Overview")))
		//	.append($("<tr>")
		//		.append($("<td>").html("Morale Value"))
		//		.append($("<td>").html(this.getRelativeMoraleValue())))
			.append($("<tr>")
				.append($("<td>").html("Base Morale"))
				.append($("<td>").html(this.getBaseMorale())))
			.append($("<tr>")
				.append($("<td>").html("Flagship Bonus"))
				.append($("<td>").html(this.getFlagshipMoraleBonus())))
			.append($("<tr>")
				.append($("<td>").html("Officer Bonus"))
				.append($("<td>").html(this.getOfficerMoraleBonus())))
			.append($("<tr>")
				.append($("<td>").html("Critical Malus"))
				.append($("<td>").html(this.getCriticalMoraleMalus())))
			.append($("<tr>")
				.append($("<td>").html("Damage Malus"))
				.append($("<td>").html(this.getDamageMoraleMalus())))
			.append($("<tr>")
				.append($("<td>").attr("colSpan", 2).css("height", 6)))
			.append($("<tr>")
				.append($("<td>").html("Remaining Morale"))
				.append($("<td>").html("<span class='yellow'>"+this.getSumMoraleModifers()+"</span>")))
			.append($("<tr>")
				.append($("<td>").attr("colSpan", 2).css("height", 12)))
			.append($("<tr>")
				.append($("<td>").attr("colSpan", 2).html("Morale test triggered if damaged for more than 15% of remaining HP.</br>Rolls D100, adds 100, subtracts morale.")))
			.append($("<tr>")
				.append($("<td>").attr("colSpan", 2).css("height", 6)))
			.append($("<tr>")
				.append($("<th>").attr("colSpan", 2).html("Possible Effects"))))


		for (var i = 0; i < this.critEffects.length; i++){
			div.find("table")			
			.append($("<tr>")
				.append($("<td>").html(">= " + this.critEffects[i][1]))
				.append($("<td>").html(this.critEffects[i][0] + " " + (this.critEffects[i][3] ? this.critEffects[i][3] : ""))))
		}

	$(document.body).append(div);

}

Ship.prototype.hideMoraleDiv = function(){
	$("#sysDiv").remove();
}

Ship.prototype.getMoraleTrigger = function(){
	return this.morale.trigger;
}

Ship.prototype.getFlagshipMoraleBonus = function(){
	return this.command ? "+10" : "";
}

Ship.prototype.getOfficerMoraleBonus = function(){
	var mod = this.getCrewLevel(0) * this.getSystemByName("Command").crewEffect;
	if (mod){return "+" + mod;}
	return "";
}

Ship.prototype.getCriticalMoraleMalus = function(){
	var mod = this.getSystemByName("Command").getCritMod("Morale");
	if (mod){return mod;}
	return "";
}

Ship.prototype.getDamageMoraleMalus = function(){
	return this.morale.damage;
	var dmg = (100 - Math.floor(this.primary.remaining / this.primary.integrity * 100))*-1;
	//if (!dmg){return ""}
	return dmg;
}

Ship.prototype.getBaseMorale = function(){
	return this.morale.baseMorale;
	return 100 + (this.faction == "Narn Regime" ? 50 : 0);
}

Ship.prototype.getSumMoraleModifers = function(){
	var baseMorale = this.getBaseMorale();
	var cmd = this.getSystemByName("Command");
	var flagship = this.command ? 10 : 0;
	var upgrade = this.getCrewLevel(0) * cmd.crewEffect;
	var crits = cmd.getCritMod("Morale");
	var dmg = this.getDamageMoraleMalus();
	return baseMorale + Math.floor(flagship + upgrade + crits + dmg);
}

Ship.prototype.getRemMorale = function(){
	var baseMorale = this.getBaseMorale();
	var cmd = this.getSystemByName("Command");
	var flagship = this.command == true ? 10 : 0;
	var upgrade = this.getCrewLevel(0) * cmd.crewEffect;
	var crits = cmd.getCritMod("Morale");
	var dmg = this.getDamageMoraleMalus();

	return baseMorale + Math.floor(flagship + upgrade + crits + dmg);
}

Ship.prototype.getModifiedRoutChance = function(){
	return this.morale.baseChance + "%";
	if (this.morale.bonusChance){
		if (this.morale.bonusChance > 0){
			return this.morale.baseChance + " +" + this.morale.bonusChance + "%";
		} else return this.morale.baseChance + " " + this.morale.bonusChance + "%";
	}
	else return this.morale.baseChance + "%";
}

Ship.prototype.getEffectiveRoutChance = function(){
	if (this.morale.effChance < 1 || this.morale.current >= this.morale.trigger){
		return 0;
	}
	else return this.morale.effChance;
}

Ship.prototype.createBaseDiv = function(){
	var className = "shipDiv";
	if (this.squad){className += " squad";}
	if (game.phase > -2){
		if (this.userid != game.userid){className += " hostile";}
		else className += " friendly";
	}

	var div = $("<div>").addClass(className).data("shipId", this.id)

	this.element = div[0];

	var topDiv = $("<div>").addClass("topDiv");
	var subDiv = $("<div>").addClass("header");
	var table = $("<table>")
	var headerC = "red";
	if (this.friendly){headerC = "green";}

	$(table)
		.append($("<tr>")
			.append($("<th>").html(this.getHeader()).attr("colSpan", 2).addClass("name " + headerC)))
			.contextmenu(function(e){
				e.stopPropagation(); e.preventDefault();
				var unit = game.getUnit($(this).parent().parent().parent().data("shipId"));
				unit.toggleDivSize();
			})
		.append($("<tr>")
			.append($("<th>").html(this.getCallSign()).attr("colSpan", 2).addClass(headerC)))
		.append($("<tr>")
			.append($("<td>").html("Type / Size").css("width", "50%"))
			.append($("<td>").html(getUnitType(this.traverse) + " / " + this.traverse)))
		.append($("<tr>")
			.append($("<td>").html("Base to-Hit"))
			.append($("<td>").html(this.getStringHitChance()).addClass("profile")))
		//.append($("<tr>")
		//	.append($("<td>").html("Focus Gain"))
		//	.append($("<td>").addClass("focusGain").html((this.getFocusString()))))
		//.append(this.getMoraleDiv())
		.append($("<tr>")
			.append($("<td>").html("Current Speed"))
			.append($("<td>").html(this.getCurSpeed()).addClass("speed")))
		.append($("<tr>")
			.append($("<td>").html("Maneuverability"))
			.append($("<td>").html(this.getRemEP() + " / " + this.getEffEP()).addClass("ep")))
		.append($("<tr>")
			.append($("<td>").html("Accel, Roll, Flip"))
			.append($("<td>").html(this.getImpulseChangeCost() + ", " + this.getActionCost(0) + ", " + this.getActionCost(1)).addClass("change")))
		//.append($("<tr>")
		//	.append($("<td>").html("Delay / 1\xB0"))
		//	.append($("<td>").html(round(this.getTurnDelay(), 2) + " px")))
	//	.append($("<tr>")
	//		.append($("<td>").html("Active Turn Delay"))
	//		.append($("<td>").html(this.getRemDelay()).addClass("delay")))
		.append($("<tr>")
			.append($("<td>").html("Current Morale"))
			.append(
				$("<td>")
					.addClass("curMorale")
					.html(this.getSumMoraleModifers()))
					.hover(
						function(e){
							game.getUnit($(this).parent().parent().parent().parent().parent().data("shipId")).showUnitMoraleDiv(e);
						},
						function(e){
							game.getUnit($(this).parent().parent().parent().parent().parent().data("shipId")).hideMoraleDiv(e);
						})
					)

	subDiv.append(table);
	topDiv.append(subDiv)
	div.append(topDiv);

	$(this.expandDiv($(div[0])))
		.find(".structContainer")
			//.contextmenu(function(e){e.stopPropagation(); e.preventDefault()})
			.end()
		.find(".header")
			.contextmenu(function(e){
				//e.stopImmediatePropagation(); e.preventDefault();
				$(this).parent().find($(".structContainer")).toggle();
			})
			.end()
		.find(".iconContainer")
			.contextmenu(function(e){
				e.stopImmediatePropagation(); e.preventDefault();
				if ($(this).parent().parent().data("shipId") != aUnit){
					game.zIndex--;
					$(this).parent().parent().addClass("disabled");
				}
			})

	if (game.turn){div.drag();}

	if (game.phase == 2){
		$(div).find(".structContainer").show();
	}

	$(this.addFocusDiv($(div[0])))
	$(this.addCommandDiv($(div[0])))
}

Ship.prototype.getFocusString = function(){
	return this.baseFocusRate + "%" + " => " + this.getFocusIfCommand();
	return this.baseFocusRate + " + " + this.modFocusRate + "%" + " / " + this.getFocusIfCommand();
}

Ship.prototype.addFocusDiv = function(shipDiv){
	if (this.isJumpingOut() || this.isDestroyed() || game.phase != 3){return;}

	shipDiv.append(
		$("<div>")
		.addClass("focusContainer")
		.append(
			$("<input>")
			.attr("type", "button")
			.attr("value", "Assign Focus (" + this.getFocusCost() + " FP)")
			.hide()
			.click(function(){
				game.getUnit($(this).parent().parent().data("shipId")).toggleFocus();
			})
		)
		.append(
			$("<div>")
			.html("Has Focus (" + this.getFocusCost()+")")
			.addClass("focusEntry")
			.hide()
			.click(function(){
				game.getUnit($(this).parent().parent().data("shipId")).toggleFocus();
			})
		)
	)

	if (this.focus){$(shipDiv).find(".focusContainer .focusEntry").show();}
	else $(this.element).find(".focusContainer input").show();
}

Ship.prototype.addCommandDiv = function(shipDiv){
	if (this.isJumpingOut() || this.isDestroyed()){return;}

	$(shipDiv).append(
		$("<div>")
		.addClass("commandContainer")
			.append(
				$("<input>")
				.attr("type", "button")
				.attr("value", "Assign Fleet Command (+" + this.getFocusIfCommand() + " / turn)")
				.hide()
				.click(function(){
					game.getUnit(aUnit).trySetCommand()
				})
			)
			.append(
				$("<div>")
				.html("Active Fleet Command (+" + this.getFocusIfCommand() + " / turn)")
				.addClass("commandEntry")
				.hide()
			)
	)

	if (this.command){shipDiv.find(".commandContainer .commandEntry").show();}
	else if (game.phase == 3 && game.canSetNewCommandUnit()){shipDiv.find(".commandContainer input").show();}
	else shipDiv.find(".commandContainer").hide();
}

Ship.prototype.getUnmoddedFocusGain = function(){
	return this.baseFocusRate + "% / " + Math.floor(game.settings.pv / 100 * (this.baseFocusRate + this.modFocusRate));
}

Ship.prototype.getFocusIfCommand = function(){
	var command = this.getSystemByName("Command");
		command.output = 100;
	var gain = Math.floor(game.settings.pv / 100 * command.getOutput() / 100 * (this.baseFocusRate + this.modFocusRate) * (this.faction == "Minbari Federation" ? 1.3 : 1));
		command.output = 0;
	return gain;
}

Ship.prototype.getUnitClass = function(){
	if (this.ship){return "Ship";
	} else return "Squadron";
}

Ship.prototype.getUnitName = function(){
	if (this.ship){return this.name;
	} else return "Squadron";
}

Ship.prototype.trySetCommand = function(){
	if (!this.friendly){return false;}
	else if (this.isJumpingOut()){popup("This unit is jumping to hyperspace.");}
	else {
		var html = "Transfering Fleet Commands will void Focus generation for this turn as well as blocking any Focus setups. </br>";
			html += "Please confirm your order.</br></br><input type='button' class='popupEntryConfirm' value='Confirm Transfer' onclick='game.getUnit(aUnit).doSetCommand()'>";
			popup(html);
			//popup("Relocating Fleet Command will set saved Focus Points to 0 at end of turn</br>(after Focus is spend, before Focus is gained).</br></br>Please confirm your order.</br><input type='button' class='popupEntryConfirm' value='Confirm Transfer' onclick='game.getUnit(aUnit).doSetCommand()'>");
	}
}

Ship.prototype.doSetCommand = function(){
	//console.log("setCommand");

	for (var i = 0; i < game.ships.length; i++){
		if (!game.ships[i].friendly || game.ships[i].flight || game.ships[i].salvo || !game.ships[i].command){continue;}
		game.ships[i].command = 0;
		game.commandChange.old = game.ships[i].id;
		if (!game.commandChange.original){game.commandChange.original = game.ships[i].id;}
		$(game.ships[i].element)
			.find(".name").html(this.getHeader()).end()
			.find(".commandContainer")
			.find("input").show().end()
			.find(".commandEntry").hide().end();
	}

	for (var i = 0; i < game.ships.length; i++){
		if (!game.ships[i].friendly || game.ships[i].flight || game.ships[i].salvo || !game.ships[i].focus){continue;}
		console.log("focus for #" + game.ships[i].id);
		game.ships[i].unsetUnitFocus();
	}

	if (game.commandChange.original == this.id){
		this.command = game.turn;
		game.commandChange.old = 0; game.commandChange.new = 0; game.commandChange.original = 0; 
	}
	else {
		this.command = game.turn + 1;
		game.commandChange.new = this.id;
	}
	
	$(this.element)
		.find(".commandContainer")
		.find("input").hide().end()
		.find(".commandEntry").show();

	for (let i = 0; i < game.playerstatus.length; i++){
		if (game.playerstatus[i].userid == game.userid){
			game.playerstatus[i].gainFocus = Math.floor(game.settings.pv / 100 * game.settings.focusMod / 10 * (this.baseFocusRate + this.modFocusRate) * (game.playerstatus[i].faction == "Minbari Federation" ? 1.3 : 1));
			game.playerstatus[i].maxFocus = game.playerstatus[i].gainFocus * 4;
			break;
		}
	}

	$("#popupWrapper").hide();
	$(this.element).find(".name").html(this.getHeader());
	game.setFocusInfo();
	game.redraw();
}

Ship.prototype.getFocusCost = function(){
	return Math.ceil(this.moraleCost);
}

Ship.prototype.toggleFocus = function(){
	if (this.focus){this.unsetUnitFocus();}
	else this.setUnitFocus();
}

Ship.prototype.setUnitFocus = function(){
	if (!this.friendly){return;}
	if (game.phase != 3){popup("Focus can only be issued in Phase 3 - Damage Control"); return;}
	if (game.userHasTransferedCommand()){popup("Ongoing Fleet Command transfer prohibits Focus"); return;}
	if (this.isJumpingOut()){popup("This unit is jumping to hyperspace."); return;}
	if (!this.canAffordFocus()){popup("You are lacking focus ressources for this action.</br>Have: " + game.getRemFocus() + "</br>Spending: " + game.getTotalFocusSpending() + "</br>Need: " + this.getFocusCost()); return;}
	if (!this.focus){
		this.focus = 1;
		$(this.element).find(".focusContainer").find("input").attr("value", "Has Focus (" + this.getFocusCost() + " FP)");
		$(this.element).find(".name").html(this.getHeader());
		game.setFocusSpendingInfo(this.userid);
	}
}

Ship.prototype.unsetUnitFocus = function(){
	if (this.focus){
		this.focus = 0;
		$(this.element).find(".focusContainer").find("input").attr("value", "Assign Focus (" + this.getFocusCost() + " FP)");
		$(this.element).find(".name").html(this.getHeader());
		game.setFocusSpendingInfo(this.userid);
	}
}

Ship.prototype.canAffordFocus = function(){
	if (game.getRemFocus() - game.getTotalFocusSpending() - this.getFocusCost() >= 0){
		return true;
	} return false;
}

Ship.prototype.getJumpDiv = function(){

	var name = this.squad ? "system jumpDiv" : "jumpDiv";
	var jumpDiv = 
		$("<div>").addClass(name)
			.append($("<img>")
				.addClass("jumpOutButton")
				.attr("src", "varIcons/redVortex.png"))
			.append($("<div>")
				.addClass("outputMask")
				.attr("src", "varIcons/redVortex.png"))

	if (this.needsWithdrawClickEvent()){
		jumpDiv.find("img")
		.click(function(){game.getUnit($(this.closest(".shipDiv")).data("shipId")).requestJumpOut();
		})
	}
	else if (this.isJumpingOut()){
		jumpDiv.find("img").toggleClass("selected");
	}
	return jumpDiv.hide();
}

Ship.prototype.addQuickFireEvents = function(div){
	if (!game.turn){return;}

	div.find(".iconContainer")
		.hover(function(e){
			if (aUnit){
				var shooter = game.getUnit(aUnit);
				if (!shooter.hasWeaponsSelected()){return;}
				var target = game.getUnit($(this).parent().parent().data("shipId"));
				if (shooter.id == target.id || shooter.userid == target.userid){return;}
				handleWeaponAimEvent(shooter, target, e);
			}
		})
		.click(function(e){
			if (!game.turn){return;}
			var shooter = game.getUnit(aUnit);
			if (!shooter.hasWeaponsSelected()){return;}
			var target = game.getUnit($(this).parent().parent().data("shipId"));
			if (shooter.id == target.id || shooter.userid == target.userid){return;}
				firePhase(e, {x: 0, y: 0}, shooter, target.id);
		})
}

Ship.prototype.expandDiv = function(div){

	div
	.find(".topDiv")
	.append($("<div>")
		.addClass("iconContainer"));

	this.addQuickFireEvents(div);

	$(document.body).append(div);
	
	//$(div).css("position", "absolute").css("top", 300);

	structContainer = $("<div>").addClass("structContainer");
	div.append(structContainer);

	var noFront = true;
	var noAft = true;
	var sides = 0;
	var widen = 0;

	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].turret){continue;} // turret
		this.structures[i].direction = getLayoutDir(this.structures[i]);
		if (this.structures[i].direction == 0 || this.structures[i].direction == 360){
			noFront = false;
		}
		else if (this.structures[i].direction == 180){
			noAft = false;
		}
		else if (this.structures[i].direction > 0 && this.structures[i].direction < 180 || this.structures[i].direction > 180 && this.structures[i].direction < 360){
			sides++;
		}
	}
	sides /= 2;

	var conWidth = structContainer.width();
	var conHeight = structContainer.height();

	var globalShiftY = 0;


	// OUTER STRUCTS
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].turret){continue;}

		var structDiv = $("<div>").addClass("structDiv");
		structContainer.append(structDiv);
			
		var structTable = $("<table>").addClass("structTable");
		structDiv.append(structTable);

		var armour = this.structures[i].getTableData();

		if ((game.phase == -1) && this.structures[i].getBoostEffect("Armour")){
			{armour.append(this.structures[i].getBoostDiv())};
		}

		var tr = document.createElement("tr");
			$(tr).append(armour);
		structTable.append(tr);


		var col = 0;
		var max = this.structures[i].width;
		var w;
		var a = this.structures[i].direction; if (a == 360){a = 0;}
		var extraWidth = 0;

		if (this.structures[i].getBoostEffect("Armour")){extraWidth = 1;}

		if (max == 1){
			if (extraWidth){ // EA
				if (a == 0 || a == 180){
					armour.css("width", 40);
				}
				else {
					armour.css("width", 50);
					armour.css("height", 42);
				}
			}
			else {
				if (a == 0 || a == 180){
					armour.css("width", 55);
				}
				else {
					armour.css("width", 50);
				}
			}
		}
		else if (max == 2){
			if (extraWidth){
				if (a == 0 || a == 180){
					armour.css("width", 70);
					armour.css("height", 25);
				}
				else {
					armour.css("width", 40);
					armour.css("height", 42);
				}
			}
		}

		// SYSTEMS
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (col == 0){
				tr = document.createElement("tr");
			}

			var td = this.structures[i].systems[j].getTableData();
				td = this.attachEvent(td);

			col+= this.structures[i].systems[j].width;
			tr.appendChild(td);

			if (this.id > 0 || game.turn == 1){
				var boostDiv = this.structures[i].systems[j].getBoostDiv();
				if (boostDiv){td.appendChild(boostDiv);}

				var powerDiv = this.structures[i].systems[j].getPowerDiv();
				if (powerDiv){td.appendChild(powerDiv);}

				var modeDiv = this.structures[i].systems[j].getModeDiv();
				if (modeDiv){td.appendChild(modeDiv);}
			}

			if (this.structures[i].systems[j].dual && !this.structures[i].systems[j].effiency){
				$(td).find(".outputMask").hide();
			}

			if (col == max || j == this.structures[i].systems.length-1){
				structTable.append(tr);
				col = 0;
			}


		}

		if (!this.structures[i].systems.length){
			if (a != 0 && a != 180){
				structTable.childNodes[0].childNodes[0].style.width = "23px";
			}
		}

		var offsetX = 0;
		var offsetY = -20;

		// STRUCT X

		if (a == 90 || a == 270){
			if (max == 2){
				offsetX += 25;
				offsetY -= 20;
			}
			else if (max == 1){
				offsetX += 30;
			}
		}
		else if (this.structures.length == 5 && (a == 78 || a == 282)){
			offsetX += 25; offsetY -= 30;
		}
		else if (a == 60 || a == 300 || noAft){
			offsetX += 10;
		}

		if (this.faction[0] == "V" && i % 2 != 0 && this.structures[i].systems.length >= 5){
			offsetX -= 10;
		}
		
		var pos = getPointInDir(130 - offsetX, a-90, conWidth/2, conHeight/2-40);
		var w = $(structDiv).width();
		var h = $(structDiv).height();

		// STRUCT Y
		if (noFront){
			offsetY -= 60;
		}

		if (a == 0){
			if (!noAft && this.structures[i].systems.length <= 3){
				offsetY += 10;
			} else if (this.structures[i].systems.length > 6){
				globalShiftY = 5;
			}
		}
		else if (noAft){
			if (sides > 1){ // Octurion
			} else offsetY -= 60 + this.structures.length*12;
		}
		else if (a == 180){
			if (noFront){offsetY -= 20;}
			else if (globalShiftY){offsetY -= 20;}
			else offsetY -= 40;
		}
		else if (sides >= 2 && a-90 != 0 && a-90 != 180){
			offsetY += 0;
		}
		else if (this.faction[0] == "V" && i % 2 != 0){
			offsetY = -(structDiv.height()/2) - 10;
		}
		else if (!noFront && !noAft){
			offsetY -= 30;
		}

		
		$(structDiv)
			.data("id", this.structures[i].id)
			.css("left", pos.x + -w/2)
			.css("top", pos.y + offsetY)

		if (a >= 120 && a <= 240){
			//console.log("dign");
			let armour = $($(structTable).children().children()[0]);
			structTable.children().append(armour);
		}
	}



	// PRIMARY
	var primaryDiv = document.createElement("div");
		primaryDiv.className = "primaryDiv";
	var primaryTable = document.createElement("table");
		primaryTable.className = "PrimaryTable";
		primaryTable.appendChild(this.primary.getTableData());

		var systems = 0;
		var max = 3;
		primaryTable.childNodes[0].childNodes[0].colSpan = max;

		for (var i = 0; i < this.primary.systems.length; i++){
			if (systems == 0){
				var tr = document.createElement("tr");
			}

			var td = this.primary.systems[i].getTableData();
				td = this.attachEvent(td);

			if (this.id > 0 || game.turn == 1){
				var boostDiv = this.primary.systems[i].getBoostDiv();
				if (boostDiv){td.appendChild(boostDiv)};

				var powerDiv = this.primary.systems[i].getPowerDiv();
				if (powerDiv){
					td.appendChild(powerDiv);
				}
				var modeDiv = this.primary.systems[i].getModeDiv();
				if (modeDiv){
					td.appendChild(modeDiv);
				}
			}

			systems++;
			tr.appendChild(td);


			if (systems == max || i == this.primary.systems.length-1 ){
				primaryTable.appendChild(tr);
				systems = 0;
			}
		}

	// PRIMARY OFFSET
	var offsetX = 0;
	var offsetY = -50;
	if (noFront){
		offsetY -= 40;
	} else if (noAft){
		offsetY += 20;
	} else offsetY += globalShiftY *4;

	primaryDiv.appendChild(primaryTable);
	structContainer.append(primaryDiv);
	var w = $(primaryDiv).width();
	var h = $(primaryDiv).height();
	var primX = conWidth/2 - w/2;
	var primY = conHeight/2 - h/2 + offsetY;
	$(primaryDiv)
		.css("left", primX)
		.css("top", primY);

	this.addTurrets(div);

	var width = 0;
	var height = 0;
	$(div).find(".structDiv").each(function(){
		var x = $(this).position().left + $(this).width();
		if (x > width){
			width = x;
		}
		var y = $(this).position().top + $(this).height();
		if (y > height){
			height = y;
		}
	})

	structContainer.css("height", Math.max($(primaryDiv).position().top + $(primaryDiv).height(), height) + 10);

	var top = 0;
	var left = structContainer.width() - 45;
	if (this.structures.length == 3 && this.structures[0].start == 0){
		top = structContainer.height() - 65;
	}
	// POWER
	structContainer
		.append($("<div>").addClass("unusedPowerDiv").css("top", top + 5)
			.append($("<img>").attr("src", "varIcons/powerIcon.png")
				.addClass("unusedPowerIcon"))
			.append($("<div>")
				.addClass("unusedPower")
				.html(this.getSystemByName("Reactor").getOutput())))

	// JUMP OUT
	$(structContainer).append(this.getJumpDiv().css("top", top+5).css("left", left));


	// System options positioning
	for (var i = 0; i < this.structures.length; i++){
		//if (this.structures[i].turret){continue;}
		for (var j = 0; j < this.structures[i].systems.length; j++){
			var s = $(this.structures[i].systems[j].element)
			var w = s.width();
			var h = s.height();

			s
			.find(".boostDiv").css("left", -16).css("top", -4).end()
			.find(".powerDiv").css("left", w).css("top", -4).end()
			.find(".modeDiv").css("left", w/2 - 9).css("top", h);

		}
	}

	for (var i = 0; i < this.primary.systems.length; i++){
		var s = $(this.primary.systems[i].element)
		var w = s.width();
		var h = s.height();

		s
		.find(".boostDiv").css("left", -16).css("top", 0).end()
		.find(".powerDiv").css("left", w).css("top", 0).end()
		.find(".modeDiv").css("left", w/2 - 9).css("top", h);
	}



	var con = $(div).find(".topDiv").find(".iconContainer")
	var leftWidth = $(div).find(".header").width()
	if (widen){$(con).css("width", widen-leftWidth-4)}
	var conW = con.width()
	var conH = con.height();

	//var goal = conW * 0.8;
		
	// notes
	$(con)
		.append(
			$(this.getBaseImage().cloneNode(true))
				.addClass("rotate270")
				.css("width", "100%")
		)
		.append($("<div>")
			.addClass("notes")
				//.hide()
			)
	//rolling ?

	$(div).addClass("disabled");
	return div;
}

Ship.prototype.setNotes = function(){
	$(this.element).find(".notes").children().remove();
	if (this.isRolled()){this.addNoteEntry("ROLLED");}
	if (this.isRolling()){this.addNoteEntry("ROLLING");}
	if (this.isFlipping()){this.addNoteEntry("FLIPPING");}
	if (this.isPreparingJump()){this.addNoteEntry("Preparing Jump");}
}

Ship.prototype.needsWithdrawClickEvent = function(){
	//console.log("needsWithdrawClickEvent");
	if (!this.destroyed && game.turn && game.phase == 3 && this.friendly && this.actions[this.actions.length-1].type != "jumpOut"){return true;}
	return false;
}

Ship.prototype.isJumpingOut = function(){
	//console.log("isJumpingOut");
	if (this.actions.length && this.actions[this.actions.length-1].type == "jumpOut" || this.withdraw){return true;}
	return false;
}

Ship.prototype.requestJumpOut = function(){

	if (this.isJumpingOut()){
		var last = this.actions[this.actions.length-1];
		if (last.type == "jumpOut" && !last.forced){
			this.undoJumpOut();
		}
	}
	else instruct("Confirm if you really want to withdraw this unit from combat</p></p><div class='popupEntry buttonTD' style='font-size: 20px; width: 200px' onclick='game.getUnit(" + this.id + ").doJumpOut()'>Confirm Withdrawal</div>");
}

Ship.prototype.doJumpOut = function(){
	var p = this.getPlannedPos();
	this.actions.push(new Move(-1, this.id, game.turn,  "jumpOut", 0, 0, p.x, p.y, 0, 0, 0, 0, 1, 1, 0));
	this.withdraw = game.turn + 2;
	this.setJumpOutTimer();
	this.setNotes();
	//if (this.hasFocus()){this.unsetUnitFocus();}
	$(this.element).find(".jumpDiv").addClass("active");
	$("#instructWrapper").hide();
}

Ship.prototype.undoJumpOut = function(){
	this.actions.splice(this.actions.length-1, 1)
	this.withdraw = 0;
	this.setJumpOutTimer();
	this.setNotes();
	$(this.element).find(".jumpDiv").removeClass("active");
}

Ship.prototype.setJumpOutTimer = function(){
	$(this.element).find(".jumpDiv").find(".outputMask").html(this.withdraw ? "ETA " + (this.withdraw - game.turn) : "");
}

Ship.prototype.setFlipState = function(){
}

Ship.prototype.setVarious = function(){
	if (this.isPreparingJump()){
		if (!this.withdraw){this.withdraw = game.turn+2;}
		this.setJumpOutTimer();
		$(this.element).find(".jumpDiv").addClass("active");
	}
	this.setNotes();
}

Ship.prototype.addNoteEntry = function(val){
	$(this.element).find(".notes")
		.show()
		.append($("<span>").html(val + "</br>"));
}

Ship.prototype.doRandomOffset = function(shift){
	if (this.ship || this.squad){return;}
	if (!this.doDraw){return;}
	if (this.mission.arrived){return;}
	//console.log("doOffset #" + this.id);
	var o = this.getGamePos();
	var t = this.getTarget();
	var tPos;
	if (t){
		var tPos = t.getGamePos();
	} else tPos = {x: this.mission.x, y: this.mission.y};

	var a = getAngleFromTo(o, tPos);
	//if (t){
		//a = addAngle(range(-90, 90), getAngleFromTo(o, this.getTarget().getPlannedPos()));
		a += 90 * shift + range (-5, 5);
	//} else a = range(0, 360);
	
	var p = getPointInDir(25 + range(-5, 5), a, o.x, o.y);
	//console.log(p);

	this.drawX = p.x;
	this.drawY = p.y;
	this.isOffset = 1;
}

Ship.prototype.getAttachDivs = function(){
	if (this.cc.length){
		$(this.element).find(".ccContainer").remove();
		var attach = [];
		var valid = 0;
		if (this.ship || this.squad){valid = true;}

		for (var i = 0; i < this.cc.length; i++){
			attach.push(game.getUnit(this.cc[i]));
		}

		if (!valid){
			valid = 1;
			for (var i = 0; i < attach.length; i++){
				if (attach[i].ship || attach[i].squad){
					valid = 0;
				}
			}
		}

		if (valid){
			var ccContainer = $("<div>").addClass("ccContainer")
				.append(($("<div>").addClass("general")
					.append($("<span>").addClass("center15").html("Local Units"))));

			attach.sort(function(a, b){
				return b.friendly - a.friendly;
			});

			var pWidth = $(this.element).width();
			//console.log(pWidth);

			for (var i = 0; i < attach.length; i++){
				if (attach[i].ship || attach[i].squad){continue;}

				ccContainer = attach[i].supplyAttachDiv(ccContainer);
			}

			$(this.element).append($(ccContainer).css("width", pWidth));
		}
	}
}

Ship.prototype.previewSetup = function(){
	for (var i = 0; i < this.primary.systems.length; i++){
		if (this.primary.systems[i].loadout){
			$(this.primary.systems[i].element).addClass("hasOptions");
		}
	}

	if (!this.ship){return;}
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].loadout){
				$(this.structures[i].systems[j].element).addClass("hasOptions");
			}
		}
	}
}

Ship.prototype.updateDiv = function(){
	$(this.element)
		.find(".thrust").html(this.getRemSpeed() + " / " + this.getCurSpeed()).end()
		.find(".ep").html(this.getRemEP() + " / " + this.getEffEP()).end()
		.find(".change").html(this.getImpulseChangeCost() + ", " + this.getActionCost(0) + ", " + this.getActionCost(1)).end()
		.find(".delay").html(this.getRemDelay()).end()
}

Ship.prototype.doDestroy = function(){
	this.doDraw = false;
	this.destroyed = true;
}

Ship.prototype.detachUnit = function(id){
	for (var i = this.cc.length-1; i >= 0; i--){
		if (this.cc[i] == id){
			this.cc.splice(i, 1);
		} else {
			var attach = game.getUnit(this.cc[i]);
			if (!attach.ship && !attach.squad && attach.mission.targetid == id){
				this.cc.splice(i, 1);
			}
		}
	}

	$(this.element).find(".ccContainer").find(".attachDiv").each(function(i){
		$(this).remove();
	});

	this.getAttachDivs();
	this.setSupportImage();
}

Ship.prototype.attachUnit = function(unit){
	$(this.element).find(".ccContainer").remove();
	this.cc.push(unit.id);
	for (var i = 0; i < unit.cc.length; i++){
		this.cc.push(unit.cc[i]);
	}
	unit.cc.push(this.id);
	this.getAttachDivs();
}

Ship.prototype.setPostFireImage = function(){
	if (this.ship){return;}

	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].doDraw && (this.structures[i].destroyed || this.structures[i].disabled)){
			this.structures[i].doDraw = 0;
		}
	}
	this.resetImage();
}

Ship.prototype.resetImage = function(){
	//if (this.salvo){return;}
	this.img = undefined;
	this.setImage();
}

Ship.prototype.getBaseImage = function(){
	return graphics.images[this.name.toLowerCase()];
}

Ship.prototype.getUnitSelectorIcon = function(){
	return this.getBaseImage();
}

Ship.prototype.setPreFireImage = function(){
	return;
}

Ship.prototype.setSupportImage = function(){
	//console.log("setSupportImage #" + this.id);
	if (!this.doDraw){return;}
	var friendlies = [];
	var hostiles = [];
	var friendly = [];
	var hostile = [];

	var hasShip = 0;

	for (var i = 0; i < this.cc.length; i++){
		if (game.getUnit(this.cc[i]).ship){hasShip = 1; break;}
	}

	if (hasShip){return;}

	for (var i = 0; i < this.cc.length; i++){
		var u = game.getUnit(this.cc[i]);
		var add = 0;

		//if (!u.doDraw){continue;}
		if (this.ship || this.squad){add = 1;}
		else if (u.salvo && u.mission.arrived && u.mission.targetid == this.id){add = 1;}
		else if (!this.ship && !this.mission.arrived && u.mission.arrived && u.mission.targetid == this.id){add = 1;}

		if (!add){continue;}
		else u.doDraw = 0;

		if (this.userid == u.userid){
			friendlies.push(u);
		}
		else hostiles.push(u);
		for (var j = 0; j < u.structures.length; j++){
			//if (!u.structures[j].doDraw){continue;}
			if (this.userid == u.userid){
				friendly.push(u.structures[j]);
			} else hostile.push(u.structures[j]);
		}
	}

	if (!friendlies.length && !hostiles.length){this.drawImg = undefined; return;}
	this.setEscortImage(friendly, friendlies, hostile, hostiles);
}

Ship.prototype.setEscortImage = function(friendly, friendlies, hostile, hostiles){
	//console.log("setEscortImage #" + this.id);
	var size = this.size;
	var fSize = 26;
	var tresh = fSize-2;
	var drawFacing = 0; this.getDrawFacing() / 2;

	var t = document.createElement("canvas");
		t.width = 300;
		t.height = 300;			
	var ctx = t.getContext("2d");
	var shipFriendly = true;
	var flightFriendly = true;

	if (this.userid != game.userid){
		shipFriendly = false;
	}

	if (friendly.length){
		for (var i = 0; i < friendlies.length; i++){
			friendlies[i].size = size + tresh;
		}
		
		var color = "#27e627";
		if (!shipFriendly){color = "red";}

		ctx.translate(t.width/2, t.height/2);
		ctx.globalAlpha = 0.8;
		ctx.beginPath();
		ctx.arc(0, 0, size + tresh, 0, 2*Math.PI);
		ctx.closePath();
		ctx.strokeStyle = color;
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.globalAlpha = 1;
		ctx.lineWidth = 1;
		
		//var rota = range(0, 360);
		
		var split = Math.floor(360/friendly.length);

		//ctx.rotate(rota*(Math.PI/180));
		for (var i = 0; i < friendly.length; i++){
			if (!friendly[i].doDraw){continue;}
			var a = split*i + drawFacing;
			var drawPos = getPointInDir(size+tresh - fSize/2, a, 0, 0);
			//var aPos = getPointInDir(size/2+tresh - fSize/2, a, 0, 0);
			//console.log(a); 
			//console.log("figher at " +(this.drawX+pos.x)+"/"+(this.drawY + pos.y));
			friendly[i].layout = drawPos;
			ctx.translate(drawPos.x, drawPos.y);
			ctx.rotate((a)*(Math.PI/180));
			ctx.drawImage(
				friendly[i].getBaseImage(),
				-fSize/2,
				-fSize/2,
				fSize, 
				fSize
			);
			ctx.rotate(-((a)*(Math.PI/180)));
			ctx.translate(-drawPos.x, -drawPos.y);

		}
		//ctx.rotate(-rota*(Math.PI/180));
		ctx.translate(-t.width/2, -t.height/2);
		tresh *= 2;
	}

	if (hostile.length){
		for (var i = 0; i < hostiles.length; i++){
			hostiles[i].size = size + tresh;
		}
			
		var color = "red";
		if (!shipFriendly){color = "#27e627";}

		ctx.translate(t.width/2, t.height/2);
		ctx.globalAlpha = 0.8;
		ctx.beginPath();
		ctx.arc(0, 0, size + tresh, 0, 2*Math.PI);
		ctx.closePath();
		ctx.strokeStyle = color;
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.globalAlpha = 1;
		ctx.lineWidth = 1;
		
		var split = Math.floor(360/hostile.length);

		for (var i = 0; i < hostile.length; i++){
			if (!hostile[i].doDraw){continue;}
			var a = split*i + drawFacing;
			var drawPos = getPointInDir(size+tresh - fSize/2, a, 0, 0);
			//var aPos = getPointInDir(size/2+tresh - fSize/2, a, 0, 0);
			//console.log(a); 
			//console.log("figher at " +(this.drawX+pos.x)+"/"+(this.drawY + pos.y));
			hostile[i].layout = drawPos;
		//	if (hostile[i].isDestroyedThisTurn()){
			//	console.log(hostile[i].id)
		//		console.log(hostile[i].layout);
		//	}
			ctx.translate(drawPos.x, drawPos.y);
			ctx.rotate((a-180)*(Math.PI/180));
			ctx.drawImage(
				hostile[i].getBaseImage(),
				-fSize/2,
				-fSize/2,
				fSize, 
				fSize
			);
			ctx.rotate(-((a-180)*(Math.PI/180)));
			ctx.translate(-drawPos.x, -drawPos.y);

		}
		ctx.translate(-t.width/2, -t.height/2);
	}

	this.drawImg = t;
	ctx.setTransform(1,0,0,1,0,0);
}

Ship.prototype.willBeAnimated = function(){
	if (game.phase == -1 && this.faction[0] == "V"){
		return true;
	}
	else if (game.phase == 1){
		if (this.focus){return false;}
		return true;
	}
	else if (game.phase == 2){
		return true;
	}
	return false;
}

Ship.prototype.readyForAnim = function(){
	this.setPreMovePosition();
	this.setPreMoveFaceHead();
	var frameMod = (game.phaseDelay * 2) / window.fpsTicks / this.getCurSpeed();

	for (var i = 0; i < this.actions.length; i++){
		var t = [0, 0, 0];
		var v = false;

		if (this.actions[i].type == "roll" || this.actions[i].type == "flip" || this.actions[i].type == "deploy" || this.actions[i].type[0] == "j"){ //roll, flip, deploy, jump
		}
		else if (this.actions[i].type == "turn"){ // turn
			t = [0, Math.abs(this.actions[i].h*2), this.actions[i].h/Math.abs(this.actions[i].h*2)];
			if (game.phaseDelay == 100){t = [0, 1, this.actions[i].h];}
		}
		else if (this.actions[i].type == "pivot"){ // pivot
			t = [0, Math.abs(this.actions[i].f*2), this.actions[i].f/Math.abs(this.actions[i].f*2)];
		}
		else if (game.phase == -1 && this.actions[i].type == "rotate"){ // rotate
			t = [0, Math.abs(this.actions[i].f*2), this.actions[i].f/Math.abs(this.actions[i].f*2)];
		}
		else if (this.actions[i].type == "move"){ // move
			if (i == 0){
				var v = new MoveVector({x: this.x, y: this.y}, {x: this.actions[i].x, y: this.actions[i].y});
			}
			else {
				var v = new MoveVector({x: this.actions[i-1].x, y: this.actions[i-1].y}, {x: this.actions[i].x, y: this.actions[i].y});
			}
			//t = [0, this.actions[i].dist * frameMod];
			t = [0, this.actions[i].dist * frameMod];
		}
		//if (this.actions[i].type == "turn"){console.log(t);}
		this.actions[i].t = t;
		this.actions[i].v = v;
	}
}

Ship.prototype.getSensorSizeRating = function(){
	return (this.traverse-4);
	return (this.faction == "Minbari Federation" ? this.traverse -1 : this.traverse-4);
}

Ship.prototype.getLockEffect = function(target, targetPos, shooterPos, dist){
	var sensor = this.getSystemByName("Sensor");
	var ew = sensor.getEW();
	if (sensor.disabled || sensor.destroyed || ew.type == 1){return 0;}

	var multi = 0;

	if (target.ship || target.squad){
		multi += 0.5 + (0.6 / 10 * (this.getSensorSizeRating()));
	}
	else if (target.flight){
		multi = 1;
	}
	else if (target.salvo){
		multi = 3;
	}

	if (game.isCloseCombat(this, target)){
		if (target.salvo && this.isInEWArc(shooterPos, target.getTrajectory(), sensor, ew)){
			return multi;
		}
		else if (target.flight){
			if (ew.angle == -1){return multi;}
			else return Math.round(multi / 180 * (Math.min(180, game.const.ew.len * Math.pow(sensor.getOutput()/ew.dist, game.const.ew.p)))*100)/100;
		}
	}
	else if (dist <= ew.dist && this.isInEWArc(shooterPos, targetPos, sensor, ew)){
		return multi;
	}
	else return 0;
}

Ship.prototype.getMaskEffect = function(shooter, shooterPos, targetPos, dist){
	if (this.flight || this.salvo || shooter.flight){return 0;}

	var sensor = this.getSystemByName("Sensor");
	var ew = sensor.getEW();
	if (sensor.disabled || sensor.destroyed || ew.type == 0){return 0;}
	var multi = 0;

	if (shooter.ship || shooter.squad){
		multi = 0.5 + (0.6 / 10 * (this.getSensorSizeRating()));
	}
	else if (shooter.flight){
		return 0;
	}
	else if (shooter.salvo){
		return 0;
		multi = 0.5;
	}

	if (dist == 0 && game.isCloseCombat(this, shooter) && this.isInEWArc(shooterPos, shooter.getTrajectory(), sensor, ew)){
		if (shooter.salvo){
			return multi;
		}
	}
	else if (dist <= ew.dist && this.isInEWArc(targetPos, shooterPos, sensor, ew)){
		return multi;
	}
	else return 0;
}


Ship.prototype.drawTargetMovePlan = function(){
	return;
}

Ship.prototype.drawIncomingPreviewMovePlan = function(){
	for (var i = 0; i < game.ships.length; i++){
		if (game.ships[i].flight || game.ships[i].salvo){
			if (game.ships[i].mission.arrived){continue;}
			if (game.ships[i].mission.targetid == this.id){
				game.ships[i].drawMovePlan();
			}
		}
	}
}

Ship.prototype.drawEW = function(){
	if (game.shortInfo == this.id || this.selected || game.showFriendlyEW && this.friendly || game.showHostileEW && !this.friendly){
		var s = this.getSystemByName("Sensor");
		if (s){s.drawEW();}
	}
}

Ship.prototype.checkSensorHighlight = function(){
	var sensor = this.getSystemByName("Sensor");
	if (sensor.selected || sensor.highlight){sensor.drawEW()}
}

Ship.prototype.hasSystemSelected = function(name){	
	for (var i = 0; i < this.primary.systems.length; i++){
		if (this.primary.systems[i].name == name && this.primary.systems[i].selected){
			return this.primary.systems[i];
		}
	}
	return false;
}

Ship.prototype.getSystem = function(id){
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].id == id){return this.structures[i];}
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].id == id){
				return this.structures[i].systems[j];
			}
		}
	}
	for (var i = 0; i < this.primary.systems.length; i++){
		if (this.primary.systems[i].id == id){return this.primary.systems[i];}
	}
}

Ship.prototype.highlightSingleSystem = function(system){
	var angle = this.getPlannedFacing();
	var pos = this.getPlannedPos();
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].weapon){
				if (this.structures[i].systems[j].highlight || this.structures[i].systems[j].selected){
					this.structures[i].systems[j].drawSystemArc(angle, this.rolled, pos);
				}
			}
		}
	}
}

Ship.prototype.highlightAllSelectedWeapons = function(){
	//mouseCtx.clearRect(0, 0, res.x, res.y);
	fxCtx.clearRect(0, 0, res.x, res.y);
	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z);

	//$(fxCanvas).css("opacity", 1);
	var angle = this.getPlannedFacing();
	var pos = this.getPlannedPos();

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].weapon){
				if (this.structures[i].systems[j].highlight || this.structures[i].systems[j].selected){
					this.structures[i].systems[j].drawSystemArc(angle, this.rolled, pos);
				}
			}
		}
	}
	fxCtx.setTransform(1,0,0,1,0,0);
}

Ship.prototype.weaponHighlight = function(weapon){
	if (weapon.highlight){
		$("#weaponTable" + weapon.id).addClass("disabled");
		fxCtx.clearRect(0, 0, res.x, res.y);	
		weapon.highlight = false;
	}
	else {
		$("#weaponTable" + weapon.id).removeClass("disabled");	
		var angle = this.getPlannedFacing();
		var shipPos = this.getPlannedPos();
		weapon.highlight = true;		
		weapon.drawSystemArc(angle, this.rolled, shipPos);
	}
}

Ship.prototype.setBuyData = function(){
	this.totalCost = this.cost;
	this.moraleCost = this.cost;

	for (var i = 0; i < this.primary.systems.length; i++){
		if (!this.primary.systems[i].cost){continue;}
		this.moraleCost += this.primary.systems[i].cost;
		this.upgrades.push(this.primary.systems[i].getUpgradeData());
	}

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (!this.structures[i].systems[j].cost){continue;}
			this.upgrades.push(this.structures[i].systems[j].getUpgradeData());
		}
	}
}

Ship.prototype.getBuyTableData = function(table){
	for (var i = 0; i < this.upgrades.length; i++){
		this.totalCost += this.upgrades[i].cost;

		$(table)
		.append(
			$("<tr>")
			.append($("<td>").addClass("font14").html(this.upgrades[i].text))
			.append($("<td>").html(this.upgrades[i].cost))
			.data("systemid", this.upgrades[i].systemid)
			.hover(function(){
				$(this).toggleClass("rowHighlight");
				$(game.getUnit(aUnit).getSystem($(this).data("systemid")).element).toggleClass("borderHighlight");
			})
		)
	}
}

Ship.prototype.getDeployImg = function(){
	return graphics.images[this.name.toLowerCase()].cloneNode(true);
}

Ship.prototype.updateShipPower = function(system){
	if (this.flight){return;}
	var reactor = this.getSystemByName("Reactor");
	var s = reactor.getOutput();
	$(reactor.element).find(".outputMask").html(s);
	$(this.element).find(".unusedPower").html(s).end();
	system.update();

	if (system instanceof Engine){
		$(this.element).find(".ep").html(this.getRemEP() + " / " + this.getEffEP()).end();
	}
}

Ship.prototype.updateNonPowerOutput = function(system){
	var divs = document.getElementsByClassName("shipDiv");
	for (var i = 0; i < divs.length; i++){
		if ($(divs[i]).data("shipId") == this.id){
			var divs = divs[i];
			break;
		}
	}

	$(divs).find(".system").each(
		function(){
			if ($(this).data("systemId") == system.id){
				$(this).find(".outputMask").html(system.getOutput());
				system.update();
				return;
			}
		}
	)
}


Ship.prototype.handleCrewDiv = function(command){
	if (command.selected){
		game.system = 0;
		command.selected = false;
		this.disableCrewPurchase();
	}
	else {
		command.selected = true;
		game.system = command.id;
		this.enableCrewPurchase(command);
	}
	command.setSystemBorder();
}

Ship.prototype.disableCrewPurchase = function(){
	$("#crewDiv").addClass("disabled");
	if (game.turn == 0){game.setUnitTotal(this);}
}

Ship.prototype.enableCrewPurchase = function(command){
	var div = $("#crewDiv");
	$(div).data("systemid", this.id).css("left", 750).css("top", 400).removeClass("disabled");
	var table = div.find("#crewTable");

	table
		.empty()
		.append($("<thead>")
			.append(
				$($("<tr>")
					.append($("<th>").html("Type").css("width", "18%"))
					.append($("<th>").html("Effect / lvl").css("width", "40%"))
					.append($("<th>").html("Cost").css("width", "8%"))
					.append($("<th>").attr("colSpan", 3).html("Level").css("width", "15%"))
					.append($("<th>").html("Total Cost")))))
	
	table.append($("<tbody>"));

	for (var i = 0; i < command.loads.length; i++){
		table
		.append(
			$($("<tr>")
				.mousemove(function(e){e.stopPropagation()})
				.append($("<td>").html(command.loads[i].name + "</br>Officer"))
				.append($("<td>").html(this.getCrewEffect(i)))
				.append($("<td>").html(this.getCrewAddCost(i)))
				.append($("<td>")
					.append($("<img>")
						.attr("src", "varIcons/plus.png").addClass("size25")
						.data("type", i)
						.click(function(){game.getUnit(aUnit).plusCrewLevel($(this).data("type"))})
					)
				)
				.append($("<td>").html(this.getCrewLevel(i)))
				.append($("<td>")
					.append($("<img>")
						.attr("src", "varIcons/minus.png").addClass("size25")
						.data("type", i)
						.click(function(){game.getUnit(aUnit).minusCrewLevel($(this).data("type"))})
					)
				)
				.append($("<td>").html(this.getTotalCrewCost(i)))
			)
		)
	}

	table
		.append($("<tr>")
			.css("fontSize", 18).css("height", 30)
			.append($("<th>").attr("colSpan", 6).html("Grand Total"))
			.append($("<th>").addClass("systemTotal")));

	command.setTotalBuyData();
}

Ship.prototype.plusCrewLevel = function(i){
	var command = this.getSystemByName("Command");
	if (command.loads[i].amount == 3){return;}
	command.loads[i].amount++;
	command.loads[i].cost = this.getTotalCrewCost(i);
	var system = this.getSystemByName(command.loads[i].name);
		system.powers.push({
			id: system.powers.length+1, unitid: system.parentId, systemid: system.id,
			turn: game.turn,type: 2, cost: 0, new: 1
		})
		system.update();
	this.updateCrewDiv(i);
}

Ship.prototype.minusCrewLevel = function(i){
	var command = this.getSystemByName("Command");
	if (!command.loads[i].amount){return;}
	command.loads[i].amount--;
	command.loads[i].cost = this.getTotalCrewCost(i);
	var system = this.getSystemByName(command.loads[i].name);
		system.doUnboost();
		system.update();
	this.updateCrewDiv(i);
}

Ship.prototype.updateCrewDiv = function(i){
	var tr = $($("#crewDiv").find("#crewTable").children().find("tr")[i+1]);
	$(tr.children()[2]).html(this.getCrewAddCost(i));
	$(tr.children()[4]).html(this.getCrewLevel(i));
	$(tr.children()[6]).html(this.getTotalCrewCost(i));

	this.getSystemByName("Command").setTotalBuyData();
	//this.updateCrewTotals();
}

Ship.prototype.getCrewEffect = function(i){
	var command = this.getSystemByName("Command");
	var type = command.loads[i];
	var name = type.name;
	var value = command.crewEffect;

	if (name == "Command"){
		return "+" + value + "% Unit Morale</br>+" + value + "% Focus Generation";
	}
	else return "+" + this.getSystemByName(name).crewEffect + "% " + name + " Output";
}

Ship.prototype.getCrewAddCost = function(i){
	var type = this.getSystemByName("Command").loads[i];
	var name = type.name;

	//console.log("getCrewAddCost " + name);
	if (game.phase > -2){return "";}
	var baseCost = this.getCrewBaseCost(i);
	var level = this.getCrewLevel(i);
	var add = 0.3;
	return Math.ceil(baseCost * (1 + (level*add)));
}

Ship.prototype.getCrewBaseCost = function(i){
	return this.getSystemByName("Command").loads[i].baseCost;
}

Ship.prototype.getCrewLevel = function(i){
	return this.getSystemByName("Command").loads[i].amount;
}

Ship.prototype.getTotalCrewCost = function(i){
	var baseCost = this.getCrewBaseCost(i);
	var level = this.getCrewLevel(i);
	var cost = 0;
	var add = 0.3;

	for (j = 0; j < level; j++){
		cost += baseCost * (1 + add*j)
	}
	return Math.ceil(cost);
}

Ship.prototype.updateCrdewTotals = function(){
	var command = this.getSystemByName("Command");
	var total = 0;
	for (var i = 0; i < command.loads.length; i++){
		total += this.getTotalCrewCost(i);
	}
	command.cost = total;	
	$("#crewDiv").find("#crewTable").children().children().children().last().html(total);
}


Ship.prototype.getSystemByName = function(name){
	for (var i = 0; i < this.primary.systems.length; i++){
		if (this.primary.systems[i].name == name){
			return this.primary.systems[i];
		}
	}
	return false;
}

Ship.prototype.attachEvent = function(td){
	$(td).data("shipId", this.id);
	$(td).hover(
		function(e){
			e.stopPropagation();
			game.getUnit($(this).data("shipId")).getSystem($(this).data("systemId")).hover(e);
		}
	)
	.click(
		function(e){
			e.stopPropagation();
			game.getUnit($(this).data("shipId")).getSystem($(this).data("systemId")).select(e);
		}
	)
	.mousedown(function(e){e.stopPropagation();})
	.contextmenu(
		function(e){
			e.preventDefault();
			if (!game.sensorMode){game.getUnit($(this).data("shipId")).selectAll(e, $(this).data("systemId"));}
		}
	);
	return td;
}

Ship.prototype.attachTurretEvent = function(td){
	$(td).data("shipId", this.id);
	$(td).hover(
		function(e){
			e.stopPropagation();
			game.getUnit($(this).data("shipId")).getSystem($(this).data("systemId")).hover(e);
		}
	)
	.click(
		function(e){
			e.stopPropagation();
			game.getUnit($(this).data("shipId")).getSystem($(this).data("turretId")).select(e);
		}
	)
	.mousedown(function(e){e.stopPropagation();})
	.contextmenu(
		function(e){
			e.preventDefault();
			if (!game.sensorMode){game.getUnit($(this).data("shipId")).selectAll(e, $(this).data("systemId"));}
		}
	);
	return td;
}

Ship.prototype.undoPlannedMovement = function(){
	var redraw = 0;

	for (var i = this.actions.length-1; i >= 0; i--){
		if (this.actions[i].resolved){continue;}
		this.actions.splice(i, 1);
		redraw = 1;
	}

	if (!redraw){return;}
	game.redraw();
}

Ship.prototype.selectAll = function(e, id){
	var s = this.getSystem(id);
	if (!s.weapon){return;}
	var w = s.getActiveSystem();
	var name = w.name;
	var hasFire = s.hasUnresolvedFireOrder();
	if (name == "Hangar"){return;}

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].destroyed){continue;}
			if (this.structures[i].systems[j].getActiveSystem().name == name){
				if (this.structures[i].systems[j].hasUnresolvedFireOrder() == hasFire){
					this.structures[i].systems[j].select(e);
				}
			}
		}
	}
	return;
}

Ship.prototype.doUnpowerAll = function(id){
	var system = this.getSystem(id);
		$(system.element).find(".powerDiv").find(".unpower").hide().end().find(".power").show();
	var name = system.getActiveSystem().name;

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].isPowered()){
				if (this.structures[i].systems[j].getActiveSystem().name == name){
					this.structures[i].systems[j].doUnpower();
				}
			}
		}
	}
}

Ship.prototype.doPowerAll = function(id){
	var system = this.getSystem(id);
		$(system.element).find(".powerDiv").find(".power").hide().end().find(".unpower").show();
	var name = system.getActiveSystem().name;

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (!this.structures[i].systems[j].isPowered()){
				if (this.structures[i].systems[j].getActiveSystem().name == name){
					//this.structures[i].systems[j].highlight = 1;
					this.structures[i].systems[j].doPower();
					//this.structures[i].systems[j].highlight = 0;
				}
			}
		}
	}
}

Ship.prototype.drawTurnUI = function(){
	var center = this.getGamePos();
	//var angle = this.getPlannedFacing();

	//var center = {x: this.x, y: this.y};
	var angle = this.getDrawFacing();
	var p1 = getPointInDir(150/cam.z, addToDirection(angle, -90), center.x, center.y);
	$(ui.turnButton)
		.removeClass("disabled")
		.css("left", p1.x * cam.z + cam.o.x - $(ui.turnButton).width()/2)
		.css("top", p1.y * cam.z + cam.o.y - $(ui.turnButton).height()/2)
		.find("#impulseMod").html("x " +turn.dif).end()
		//.find("#remEP").html(this.getRemEP() + " / " + this.getEffEP()).addClass("green").end()
}

Ship.prototype.issuedActionThisTurn = function(type){
	var type = "";
	switch (type){
		case 0: type = "roll"; break;
		case 1: type = "flip"; break;
		default: return;
	}

	for (var i = 0; i < this.actions.length; i++){
		if (this.actions[i].turn == game.turn && this.actions[i].type == type){return true;}
	}
	return false;
}

Ship.prototype.canDoAction = function(type){
	if (this.getRemEP() >= this.getActionCost(type)){
		if (this.issuedActionThisTurn(type)){return false;} // instead UNDO iit
		else if (this.isRolling() && type == 1){return false;} // cant flip while you are rolling
		else {
			for (var i = 0; i < this.actions.length; i++){
				if (this.actions[i].type != "speed" && this.actions[i].type != "turn"){return false;}
			}
		}
		return true;
	}
	return false;
}

Ship.prototype.canAccel = function(){
	if (this.actions.length && this.actions[this.actions.length-1].type == "speed" && this.actions[this.actions.length-1].dist == -1){
		return true;
	}
	else if (this.getRemEP() >= this.getImpulseChangeCost() / this.getImpulseMod()){
		if (!this.actions.length || this.available == game.turn && this.actions.length == 2){ // 2- deploy, jump
			return true;
		}
		else if (this.actions[this.actions.length-1].type == "speed" && this.actions[this.actions.length-1].dist == 1){
			return true;
		}
		else if (this.actions[0].type == "deploy" && this.actions.length == 1 && game.turn > 1 && this.available == game.turn){
			return true;
		}
		else if (this.actions[0].type == "rotate" && this.actions.length == 1){
			return true;
		}
	}

	return false;
}

Ship.prototype.canDeccel = function(){
	if (this.actions.length && this.actions[this.actions.length-1].type == "speed" && this.actions[this.actions.length-1].dist == 1){
		return true;
	}
	else if (this.getCurSpeed() <= 30){return false;}
	else if (this.getRemEP() >= this.getImpulseChangeCost() / this.getImpulseMod()){
		if (!this.actions.length || this.available == game.turn && this.actions.length == 2){ // 2- deploy, jump
			return true;
		}
		else if (this.actions[this.actions.length-1].type == "speed" && this.actions[this.actions.length-1].dist == -1){
			return true;
		}
		else if (this.actions[0].type == "deploy" && this.actions.length == 1 && game.turn > 1 && this.available == game.turn){
			return true;
		}
		else if (this.actions[0].type == "rotate" && this.actions.length == 1){
			return true;
		}
	}

	return false;
}

Ship.prototype.setTurnData = function(){
	var vector = $("#vectorDiv")
	
	$(ui.turnButton)
		.find("#turnMode").html("ON").addClass("on").end().find("#turnCost").html(this.getTurnCost()).end()
		//.find("#turnDelay").html(this.getTurnDelay() + " px").end()
		.find("#turnMod").html(turn.mod).end()

	if (game.turnMode){
		$(ui.turnButton)
			$("#epButton")
			.find("#remEP").html(this.getRemEP() + " / " + this.getEffEP()).addClass("green").end()
			.find("#impulseText").find("#impulseCost").html("");

		this.drawDelay();
		this.adjustMaxTurn()
	}
	else {
		$(ui.turnButton)
			.find("#turnMode").html("OFF").removeClass("on").end()
		$("#epButton")
			.find("#remEP").html(this.getRemEP() + " / " + this.getRemEP()).addClass("green").end()
			.find("#impulseText").find("#impulseCost").html("");
		$(vector).addClass("disabled")
	}

	//this.drawEW();
}

Ship.prototype.adjustMaxTurn = function(){
	if (this.getMaxTurnAngle() < turn.max){
		moveCtx.clearRect(0, 0, res.x, res.y);
		this.setMoveTranslation();
		this.drawTurnArcs();
		this.drawDirectionIndicator();
		this.resetMoveTranslation();
	}
}

Ship.prototype.addTurrets = function(shipDiv){

	var turretDivs = [];

	//TURRETS
	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].turret){continue;}
		var width = Math.max(90, this.structures[i].systems.length*30)
		var turretDiv = $("<div>").addClass("structDiv turretDiv").css("width", width).css("height", 90);
		var turretTable = $("<table>").addClass("structTable");
		turretDiv.append(turretTable);

		var core = $(this.structures[i].getCoreData());
			core.attr("colSpan", this.structures[i].systems.length);
			core.append(this.structures[i].getPowerDiv())
		turretTable.append($("<tr>").append(core));
		var armour = $(this.structures[i].getArmourData());
			armour.attr("colSpan", this.structures[i].systems.length)
		turretTable.append($("<tr>").append(armour));

		tr = document.createElement("tr");
		for (var j = 0; j < this.structures[i].systems.length; j++){
			var td = this.structures[i].systems[j].getTableData();
				if (game.phase == -2){this.attachEvent(td);}
				else {td = this.attachTurretEvent(td);}
				$(td)
				.data("turretId", this.structures[i].id)
				.find(".integrityNow").remove().end().find(".integrityFull").remove();

			tr.appendChild(td);
			
			if (this.id > 0 || game.turn == 1){
				var boostDiv = this.structures[i].systems[j].getBoostDiv();
				if (boostDiv){td.appendChild(boostDiv);}

				var modeDiv = this.structures[i].systems[j].getModeDiv();
				if (modeDiv){td.appendChild(modeDiv);}
			}

			if (this.structures[i].systems[j].dual && !this.structures[i].systems[j].effiency){
				$(td).find(".outputMask").hide();
			}
			
		}
		turretTable.append(tr);

		turretDivs.push(turretDiv);
	}

	if (!turretDivs.length){return;} // no turrets
	var turretContainer = $("<div>").addClass("turretContainer");
	shipDiv.append(turretContainer);
	var spacing = shipDiv.width() / turretDivs.length;

	var maxHeight = 0;
	for (var i = 0; i < turretDivs.length; i++){ // set turret width
		var maxHeight = turretDivs[i].width();
		maxHeight = Math.max(maxHeight, maxHeight)
		turretDivs[i]
			.css("left", spacing*(i+1) - spacing/2 - maxHeight/2)
		turretContainer.append(turretDivs[i])
	}

	turretContainer.css("height", maxHeight+10);

	var maxHeight = 0;
	for (var i = 0; i < turretDivs.length; i++){ // adjust armour TD width
		var armour = turretDivs[i].find(".armour");
		if (armour.width() < 70){
			armour.css("width", 70);
		}

		var conWidth = turretDivs[i].width();
		var conHeight = turretDivs[i].height();

		var table = turretDivs[i].children(); // center turret table in wrapper div
		var width = table.width();
		var height = table.height();

		table
		.css("position", "absolute")
		.css("left", conWidth / 2 - width/2)
		.css("top", conHeight / 2 - height/2)
	}
}

Ship.prototype.doRoll = function(){
	var shipPos = this.getPlannedPos();
	this.actions.push(new Move(-1, this.id, game.turn, "roll", 0, 1, shipPos.x, shipPos.y, 0, 0, 0, this.getActionCost(0), 1, 1, 0));
	this.rolling = !this.rolling;
	this.setNotes();
	this.resetMoveMode();
	game.redraw();
}

Ship.prototype.doFlip = function(){
	var shipPos = this.getPlannedPos();
	this.actions.push(new Move(-1, this.id, game.turn, "flip", 0, 1, shipPos.x, shipPos.y, 0, 0, 0, this.getActionCost(1), 1, 1, 0));
	this.flipping = !this.flipping;
	this.setNotes();
	this.resetMoveMode();
	game.redraw();
}

Ship.prototype.doAccel = function(){
	var shipPos = this.getPlannedPos();
	if (this.actions.length && this.actions[this.actions.length-1].type == "speed" && this.actions[this.actions.length-1].dist == -1){
		this.actions.splice(this.actions.length-1, 1);
	}
	else {
		var action = new Move(-1, this.id, game.turn, "speed", 0, 1, shipPos.x, shipPos.y, 0, 0, 0, this.getImpulseChangeCost(), 1, 1, 0);
		this.actions.push(action);
	}
	$(this.element).find(".speed").html(this.getCurSpeed());
	this.resetMoveMode();
	game.redraw();
}

Ship.prototype.doDeccel = function(){
	var shipPos = this.getPlannedPos();
	if (this.actions.length && this.actions[this.actions.length-1].type == "speed" && this.actions[this.actions.length-1].dist == 1){
		this.actions.splice(this.actions.length-1, 1);
	}
	else {
		var action = new Move(-1, this.id, game.turn, "speed", 0, -1, shipPos.x, shipPos.y, 0, 0, 0, this.getImpulseChangeCost(), 1, 1, 0);
		this.actions.push(action);
	}
	$(this.element).find(".speed").html(this.getCurSpeed());
	this.resetMoveMode();
	game.redraw();
}

Ship.prototype.drawMoveUI = function(){
	this.drawImpulseUI();
	this.drawVectorUI();
	if (this.canTurn()){
		this.drawTurnUI();
		this.updateDiv();
	}
	this.drawShortenTurnUI();
}

Ship.prototype.drawShortenTurnUI = function(){
	return;
	//console.log("drawShortenTurnUI");
	var remDelay = this.getRemDelay();
	var remSpeed = this.getRemSpeed();
	var center = this.getPlannedPos();

	if (!remDelay || !this.getRemEP()){$(ui.doShorten).addClass("disabled");}
	else {
		var o = this.getGamePos()
		var angle = this.getPlannedFacing();
		var p = getPointInDir(100, angle-180, o.x, o.y);
		var left = p.x * cam.z  + cam.o.x - $(ui.doShorten).width()/2;
		var top = p.y * cam.z  + cam.o.y - $(ui.doShorten).height()/2;

		$(ui.doShorten)
		.css("left", left)
		.css("top", top)
		.data("shipId", this.id)
		.removeClass("disabled");;

	}

	if (remDelay && remSpeed >= remDelay){ // normal turn point
		ele = document.getElementById("maxTurnVector");
		var p = getPointInDir(remSpeed + 60, angle, center.x, center.y);
		var left = p.x  * cam.z  + cam.o.x - $(ele).width()/2;
		var top = p.y * cam.z  + cam.o.y - $(ele).height()/2;

		$(ele)
			.data("unitid", this.id)
			.data("dist", remDelay)
			.html("<div>"+remDelay+"<div>")
			.css("left", left)
			.css("top", top)
			.removeClass("disabled");
	}
}

Ship.prototype.doShortenTurn = function(){
	var data = $(ui.doShorten).data();

	if (data.shipId == this.id && data.cost <= this.getRemEP()){
		var turn = this.getLastTurn();
			turn.cost += data.cost;
			turn.delay -= data.delay;
		this.unsetMoveMode();
		this.setMoveMode();
		game.redraw();
		console.log(this.getLastTurn());
	}
}

Ship.prototype.doUndoShortenTurn = function(){
	var turn = this.getLastTurn();
	if (turn.costmod != 1){
		turn.costmod = 1;
		this.unsetMoveMode();
		this.setMoveMode();
		game.redraw();
	}
	return;
}

Ship.prototype.getShortenTurnCost = function(delay){
	var turn = this.getLastTurn();
	//var multi = ((turn.delay - delay) - turn.delay/2) / (turn.delay/2);
	//var multi = round((Math.ceil(((turn.delay - delay) / turn.delay) * 100)/100), 2);
	//var multi = round(Math.ceil(delay / turn.delay*2*100)/100, 2)
	var multi = round(Math.ceil(delay / turn.delay *100)/100, 2)*2
	console.log(multi);
	return multi;
	//var multi = (turn.delay - delay) / turn.delay;
	return 1-multi;
	return turn.cost * (1-multi);
}

Ship.prototype.drawVectorUI = function(){
	var center = this.getPlannedPos();
	var angle = this.getPlannedHeading();
	var remSpeed = this.getRemSpeed();
	var remDelay = this.getRemDelay();
	var ele;

	if (remSpeed){
		ele = document.getElementById("maxVector");
		var p = getPointInDir(remSpeed + 90, angle, center.x, center.y);
		var left = p.x * cam.z  + cam.o.x - $(ele).width()/2;
		var top = p.y * cam.z  + cam.o.y - $(ele).height()/2;

		$(ele)
			.html("<div>"+remSpeed+"</div>")
			.css("left", left)
			.css("top", top)
			.removeClass("disabled");
	}

	if (remDelay && remSpeed >= remDelay){
		ele = document.getElementById("maxTurnVector");
		var p = getPointInDir(remSpeed + 60, angle, center.x, center.y);
		var left = p.x * cam.z  + cam.o.x - $(ele).width()/2;
		var top = p.y * cam.z  + cam.o.y - $(ele).height()/2;

		$(ele)
			.html("<div>"+remDelay+"</div>")
			.css("left", left)
			.css("top", top)
			.removeClass("disabled");
	}
}

Ship.prototype.drawDirectionIndicator = function(){
	var center = this.getPlannedPos();
	var heading = this.getPlannedHeading();
	var facing = this.getPlannedFacing();
	var p = getPointInDir(this.getCurSpeed(), heading, center.x, center.y);
	
	moveCtx.beginPath();			
	moveCtx.moveTo(center.x, center.y);
	moveCtx.lineTo(p.x, p.y);
	moveCtx.closePath();
	moveCtx.lineWidth = 1;
	moveCtx.strokeStyle = "yellow";
	moveCtx.globalAlpha = 0.5;
	moveCtx.stroke();
	moveCtx.globalAlpha = 1;
	moveCtx.strokeStyle = "black";

	if (facing != heading){
		var p = getPointInDir(100, facing, center.x, center.y);
		
		moveCtx.beginPath();			
		moveCtx.moveTo(center.x, center.y);
		moveCtx.lineTo(p.x, p.y);
		moveCtx.closePath();
		moveCtx.lineWidth = 2;
		moveCtx.strokeStyle = "white";
		moveCtx.globalAlpha = 0.5;
		moveCtx.stroke();
		moveCtx.globalAlpha = 1;
		moveCtx.strokeStyle = "black";
	}
}

Ship.prototype.getTurnAngle = function(){
	if (game.phase == -1 && (game.turn == 1 || this.id < 0)){
		return 180;
	}
	return this.turnAngle;
}

Ship.prototype.getTurnStep = function(){
	return this.turnStep;
}

Ship.prototype.getMaxTurnAngle = function(){
	if (this.canTurnFreely()){return 180;}

	var ep = this.getRemEP();
	var limit = this.getTurnAngle();
	var c = this.getTurnCost();
		c = 1;

	return Math.min(limit, Math.floor(ep/c));
}

Ship.prototype.drawTurnArcs = function(){
	var turnAngle = this.hasMoved() ? this.getTurnAngle() : this.getMaxTurnAngle();
	var angle = this.getPlannedHeading();
	
	this.turnAngles = {start: addAngle(0 + turnAngle, angle), end: addAngle(360 - turnAngle, angle)};

	var center = this.getPlannedPos();
	var w = this.getTurnStep();
	
	for (var j = 1; j >= -1; j = j-2){
		for (var i = 1; i <= w; i++){			
			var modAngle = turnAngle * i * j;
			var newAngle = addToDirection(angle, modAngle);
			var p = getPointInDir(75, newAngle, center.x, center.y);
			moveCtx.beginPath();
			moveCtx.moveTo(center.x, center.y);
			moveCtx.lineTo(p.x, p.y);
			moveCtx.closePath();
			moveCtx.globalAlpha = 0.5;
			moveCtx.strokeStyle = "yellow";
			moveCtx.lineWidth = 1;
			moveCtx.stroke();
			moveCtx.globalAlpha = 1;
		}
	}
}

Ship.prototype.drawDelay = function(){
	if (game.phase == -1 && game.turn == 1){
		mouseCtx.clearRect(0, 0, res.x, res.y);
		return;
	}
	else if (this.actions.length == 1){
		mouseCtx.clearRect(0, 0, res.x, res.y);
	}
	var delay = turn.h * this.getTurnDelay();
	if (delay){
		var angle = this.getPlannedHeading();
		var center = this.getPlannedPos();
		var delayRad1 = degreeToRadian(angle-45);
		var delayRad2 = degreeToRadian(angle+45);

		mouseCtx.clearRect(0, 0, res.x, res.y);
		mouseCtx.translate(cam.o.x, cam.o.y);
		mouseCtx.scale(cam.z, cam.z);
		mouseCtx.beginPath();			
		mouseCtx.arc(center.x, center.y, delay, delayRad1, delayRad2, false);
		mouseCtx.closePath();
		mouseCtx.strokeStyle = "red";
		mouseCtx.lineWidth = 3
		mouseCtx.stroke();
		mouseCtx.arc(center.x, center.y, delay, 0, 2*Math.PI, false);
		mouseCtx.globalCompositeOperation = "destination-out";
		mouseCtx.fill();
		mouseCtx.globalCompositeOperation = "source-over";
		mouseCtx.setTransform(1,0,0,1,0,0);
	} else 
		mouseCtx.clearRect(0, 0, res.x, res.y);
}

Ship.prototype.hasNoFireOrders = function(){
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].destroyed){continue;}
			if (this.structures[i].systems[j].weapon){
				if (this.structures[i].systems[j].isPowered() && this.structures[i].systems[j].getLoadLevel() >= 1){
					if (this.structures[i].systems[j].hasFireOrder()){
						return false;
					}
				}
			}
		}
	}
	return true;
}

Ship.prototype.unitGetAllResolvingFireOrders = function(){
	var fires = [];

	for (var j = 0; j < this.structures.length; j++){
		for (var k = 0; k < this.structures[j].systems.length; k++){
			var fire = this.structures[j].systems[k].getResolvingFireOrders();
			if (fire){fires.push(fire);}
		}
	}
	return fires;
}

Ship.prototype.hasInvalidPower = function(){
	var reactor = this.getSystemByName("Reactor");
	if (reactor.getUnusedPower() < 0){
		return true;
	}
}

Ship.prototype.hasBasicEW = function(){
	var sensor = this.getSystemByName("Sensor");
	if (sensor.disabled || sensor.destroyed || sensor.used){return false;}
	return true;
}

Ship.prototype.doConfirmSystemLoadout = function(){
	var system = this.getSystem(game.system);
	if (system.launcher){system.setAmmo();}
	system.select();
}

Ship.prototype.getEvents = function(){
	var data = [];
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].hasEvent()){
				data.push(this.structures[i].systems[j]);
			}
		}
	}
	return data;
}

Ship.prototype.getSelfExplo = function(){

	var data = {
		entries: [],
		animated: 0,
		animating: 0,
		id: this.id,
		pos: this.getDrawPos(),
		html: ""
	}

	if (this.isDestroyedThisTurn()){

		var base = {x: this.drawX, y: this.drawY};

		var color = "red";
		if (this.friendly){
			color = "green";
		}

		if (this.command){
			data.html += "<span class='yellow'>Command </span>";
		}

		data.html += "<span class='" + color + "'>" + this.name + " #" + this.id + " " + this.getCallSign() + "</span>";
		if (this.getSystemByName("Reactor").destroyed){
			data.html += "<span> suffered critical reactor damage and was destroyed.";
		}
		else data.html += "<span> suffered catastrophic hull damage and was destroyed.";

		data.html += "</span>"

		var explos = {u: this, anims: []};

		var amount = 8 + (this.traverse * 3);

		for (var j = 0; j < amount; j++){
			explos.anims.push({
				t: [0 - (j*1)-40, 60 + range (-20, 20)],
				s: range (5, this.size*0.8),
				x: base.x + (range(-1, 1) * range(0, this.size / 3)),
				y: base.y + (range(-1, 1) * range(0, this.size / 3)),
			})
		}
		data.entries.push(explos);
	}

	return data;
}

Ship.prototype.hasUnsetupedSystems = function(){
	if (this.flight || this.salvo){return false;}

	var html = "";

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (!this.structures[i].systems[j].loadout){continue;}
			var set = false;
			for (var k = 0; k < this.structures[i].systems[j].loads.length; k++){
				if (this.structures[i].systems[j].loads[k].amount){
					set = true; 
					break;
				}
			}
			if (!set){
				html += this.structures[i].systems[j].display + "</br>";
			}
		}
	}


	if (html.length){
		popup ("The following systems lack a complete setup:</br></br>" + html + "<input type='button' class='popupEntryConfirm' value='Confirm Purchase' onclick='game.doConfirmUnitPurchase(game.getUnit(aUnit))'>");
		return true;
	}
	return false;
}

Ship.prototype.disableMissionMode = function(){
	game.flightDeploy = 0;
	game.mission = 0;
	game.flightDeploy = false;
	$(this.element)
		.find("input[name=mission]:checked").each(function(){$(this).prop("checked", false)}).end()
		.find(".missionOption").addClass("disabled");
}

Ship.prototype.enableMissionMode = function(){
	game.flightDeploy = 1;
	game.deploySpeed = this.baseImpulse
	$(this.element).find(".missionOption").removeClass("disabled");
}

Ship.prototype.getPurchaseHeader = function(){
	//return "this";
	return "<span style='font-size: 16px;'>" + this.name + "</span>" + (this.callsign ? "<span class='green'> -- " + this.callsign + " -- </span>" : "<span class='green'></span>");
}

Ship.prototype.getIncomingHeader = function(){
	return this.name + (this.notes ? "</br>" + this.notes : "");
}

Ship.prototype.hasPassiveJamming = function(){
	var jammer = this.getSystemByName("Jammer");
	if (!jammer || jammer.destroyed || jammer.disabled){
		return false;
	} return true;
}

Ship.prototype.getJammingString = function(){
	return ("---- Passing jamming detected (<span class='yellow'>" + this.getJammerStrength() + "% chance to miss</span>) ----");
}

Ship.prototype.getJammerStrength = function(){
	var jammer = this.getSystemByName("Jammer");
	return jammer.getOutput();
}

Ship.prototype.getRecentMoraleCheckDamage = function(){
	return this.primary.getRecentDmgInt();
}