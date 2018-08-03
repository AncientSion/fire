function Ship(data){
	//id, name, x, y, facing, faction, mass, cost, profile, size, userid, available, baseHitChance, baseImpulse

	this.id = data.id;
	this.name = data.name;
	this.display = data.display;
	this.notes = data.notes;
	this.x = data.x || 0;
	this.y = data.y || 0;
	this.facing = data.facing || 0;
	this.faction = data.faction;
	this.mass = data.mass;
	this.cost = data.cost;
	this.profile = data.profile;
	this.stringHitChance = "";
	this.size = data.size * 0.7;
	this.userid = data.userid;
	this.available = data.available;
	this.baseHitChance = data.baseHitChance || 0;
	this.baseImpulse = data.baseImpulse || 0;
	this.traverse = data.traverse;
	this.status = data.status;
	this.rolling = data.rolling;
	this.rolled = data.rolled;
	this.flipping = data.flipping;
	this.flipped = data.flipped;
	this.actions = data.actions || [];
	this.morale = data.morale;
	this.baseFocusRate = data.baseFocusRate;
	this.modFocusRate = data.modFocusRate;
	this.cc = [];
	this.index = 0;

	this.totalCost = 0;
	this.upgrades = [];

	this.slipAngle = data.slipAngle || 0;
	this.turnAngle = data.turnAngle || 0;
	this.turnStep = data.turnStep || 0;
	this.turnMod = 1;
	this.baseTurnDelay = data.baseTurnDelay || 0;
	this.baseImpulseCost = data.baseImpulseCost || 0;
	this.curImp = data.curImp || 0;
	this.remImp = data.remImp || 0;
	this.remDelay = data.remDelay || 0;

	this.turnAngles = {};
	this.moveAngles = {};
	this.attachAnims = [];

	this.ship = data.ship;
	this.flight = data.flight;
	this.salvo = data.salvo;
	this.squad = data.squad;
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

	this.highlight = false;
	this.destroyed = false;
	this.disabled = data.disabled;
	this.selected = false;
	this.element;

	this.hitTable;
	this.img;
	this.structures = [];
	this.primary = {};
	this.drawImg;
	this.deployAnim = [0, 0];
	this.doDraw = 1;
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

Ship.prototype.canDeployHere = function(pos){
	var valid = false;		
	
	/*
	if (game.turn >= 2){
		if (getDistance({x: 0, y: 0}, pos) >= 750){
			return false;
		} return true;
	}
	else {
		for (var i = 0; i < game.deploys.length; i++){
			if (game.deploys[i].userid != this.userid){continue;}

			if (getDistance(game.deploys[i], pos) + this.size/2 < game.deploys[i].s){
				for (var j = 0; j < game.ships.length; j++){
					if (game.ships[j].deployed && game.ships[j].id != this.id && game.ships[j].userid == this.userid){ // different ship, different owners
						var step = game.ships[j].getGamePos();
						if (getDistance(pos, step) <= (game.ships[j].size/2 + this.size/2)){
						popup("The selected position is too close to the position or planned position of vessel (#"+game.ships[i].id+")");
							return false;
						}
					}
				}
				return true;
			}
		}

		return false;
	}
	*/

	if (game.turn == 1){
		for (var i = 0; i < game.deployArea.length; i++){
			if (game.deployArea[i].id != game.userid){continue;}
			if (game.deployArea[i].x > 0){
				if (pos.x >= game.deployArea[i].x && pos.x <= game.deployArea[i].x + game.deployArea[i].w){
					if (pos.y >= game.deployArea[i].y && pos.y <= game.deployArea[i].y + game.deployArea[i].h){
						valid = true; break;
					}
				}
			}
			else if (pos.x <= game.deployArea[i].x && pos.x >= game.deployArea[i].x + game.deployArea[i].w){
				if (pos.y >= game.deployArea[i].y && pos.y <= game.deployArea[i].y + game.deployArea[i].h){
					valid = true; break;
				}
			}
			else if (pos.x > game.deployArea[i].x && pos.x < game.deployArea[i].x + game.deployArea[i].w){
				if (pos.y > game.deployArea[i].y && pos.y < game.deployArea[i].y + game.deployArea[i].h){
					valid = true; break;
				}
			}
		}
		if (valid){
			for (var i = 0; i < game.ships.length; i++){
				if (game.ships[i].deployed && game.ships[i].id != this.id && game.ships[i].userid == this.userid){ // different ship, different owners
					var step = game.ships[i].getGamePos();
					if (getDistance(pos, step) <= (game.ships[i].size/2 + this.size/2)){
					popup("The selected position is too close to the position or planned position of vessel (#"+game.ships[i].id+")");
						return false;
					}
				}
			}
			return true;
		}

		return false;
	}
	else if (game.turn > 1){
		//console.log(game.deployArea);
		var d = getDistance(pos, {x: game.deployArea[0].x, y: game.deployArea[0].y});
		if (d > game.deployArea[0].b && d < game.deployArea[0].s){
			return true;
		}
		return false;
	}
	else {
		for (var i = 0; i < game.deployArea.length; i++){
			if (game.deployArea[i].id != this.userid){continue;}

			if (getDistance(game.deployArea[i], pos) < game.deployArea[i].s){
				return true;
			}
		}

		return false;
	}
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
		this.actions.push(new Move(-1, "deploy", 0, pos.x, pos.y, this.drawFacing, 0, 0, 1, 1, 0));
		this.deployed = 1;
		this.isReady = 1;
		this.x = pos.x;
		this.y = pos.y;
		this.drawX = pos.x;
		this.drawY = pos.y;

		var shipId = this.id;
		var table = $("#deployTable").find("tr").each(function(i){
			if ($(this).data("shipid") == shipId){
				$(this).remove();
				return;
			}
		})
		$(this.element).css("left", res.x - 450).css("top", 50);
	}
	this.select();

	ui.deployOverlay.hide();
	$("#deployWrapper")
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

Ship.prototype.doHover = function(){
	this.drawEW();

	if (this.ship || this.squad){
		this.setMoveTranslation();

		if (!this.isDestroyed()){
			this.drawMoveArea();
			this.drawTurnArcs();
		}
		
		this.drawVectorIndicator();
		this.resetMoveTranslation();
	}

	this.drawMovePlan();
	this.drawIncomingMovePlan();
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

Ship.prototype.getRealActionCost = function(type){
	return Math.ceil(this.getActionCost(type) / this.getImpulseMod());
}

Ship.prototype.getImpulseChangeCost = function(){
	return this.baseImpulseCost;
	return Math.ceil(this.baseImpulseCost * (1-((this.getImpulseMod()-1)/2)) * this.getImpulseMod());
	return Math.floor(this.baseImpulseCost * this.getBaseEP() / this.getImpulseMod()/100);
	return Math.floor(this.baseImpulseCost*(1-(1-this.getImpulseMod())/2) / this.getEffectiveEP() * this.getEP());
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

	var facing = this.getDrawFacing();
	var center = {x: this.drawX, y: this.drawY};
	var p1 = getPointInDir(this.size/2 + 10 + 15, facing + 180, center.x, center.y);

	if (this.canDoAction(0)){
		var roll = getPointInDir(80, facing -220, p1.x, p1.y);
		var ox = roll.x * cam.z + cam.o.x - 20;
		var oy = roll.y * cam.z + cam.o.y - 20;
		if (this.isRolling()){
			$($("#roll").children()[1]).show();
		} else $($("#roll").children()[1]).hide();
		$("#roll").css("left", ox).css("top", oy).removeClass("disabled");
	} else $("#roll").addClass("disabled");

	
	if (this.canDoAction(1)){
		var roll = getPointInDir(80, facing -140, p1.x, p1.y);
		var ox = roll.x * cam.z + cam.o.x - 20;
		var oy = roll.y * cam.z + cam.o.y - 20;
		$("#flip").css("left", ox).css("top", oy).removeClass("disabled");
	} else $("#flip").addClass("disabled");
	

	if (this.canUndoLastAction()){
		var ox = p1.x * cam.z + cam.o.x - 15;
		var oy = p1.y * cam.z + cam.o.y - 15;
		$("#doUndoLastAction").css("left", ox).css("top", oy).removeClass("disabled");
	} else $("#doUndoLastAction").addClass("disabled");

	if (this.canIncreaseImpulse()){
		var pPlus = getPointInDir(50, facing +90, p1.x, p1.y);
		var ox = pPlus.x * cam.z + cam.o.x - 15;
		var oy = pPlus.y * cam.z + cam.o.y - 15;
		$("#plusImpulse").css("left", ox).css("top", oy).removeClass("disabled");
	} else $("#plusImpulse").addClass("disabled");

	if (this.canDecreaseImpulse()){
		var mMinus = getPointInDir(50, facing -90, p1.x, p1.y);
		var ox = mMinus.x * cam.z + cam.o.x - 15;
		var oy = mMinus.y * cam.z + cam.o.y - 15;
		$("#minusImpulse").css("left", ox).css("top", oy).removeClass("disabled");
	} else $("#minusImpulse").addClass("disabled");
}

Ship.prototype.issueMove = function(pos, dist){
	if (this.actions.length && this.actions[this.actions.length-1].type == "move" && this.actions[this.actions.length-1].turn == game.turn){
		this.actions[this.actions.length-1].dist+= dist;	
		this.actions[this.actions.length-1].x = pos.x;
		this.actions[this.actions.length-1].y = pos.y;
	} else this.actions.push(new Move(-1, "move", dist, pos.x, pos.y, 0, 0, 0, 1, 1, 0));	
	
	this.turnAngles = {}
	$("#popupWrapper").hide();
	this.unsetMoveMode();
	if (!this.getRemSpeed()){this.doAutoShorten();}
	this.setMoveMode();
	game.updateIntercepts(this.id);
	game.redraw();
	//game.drawShipOverlays();
}


Ship.prototype.doAutoShorten = function(){
	var delay = this.getRemDelay();
	if (!delay){return;}

	var turn = this.getLastTurn();
	var ep = this.getRemEP();
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

	return;	




	if (!speed && delay){
		while (this.canShortenOldTurn(move)){
			move.cost = move.cost / move.costmod * (move.costmod + turn.step);
			move.delay = move.delay * move.costmod / (move.costmod + turn.step);
			move.costmod = round(move.costmod + turn.step, 1);
			//console.log(move.cost, move.delay, move.costmod);
		}
	}
	else if (speed && delay){
		while (this.canShortenOldTurn(move)){
			delay -= move.delay;
			move.cost = move.cost / move.costmod * (move.costmod + turn.step);
			move.delay = move.delay * move.costmod / (move.costmod + turn.step);
			move.costmod = round(move.costmod + turn.step, 1);
			delay += move.delay;
			if (delay <= 0){
				break;
			}
		}
	}

	move.cost = Math.round(move.cost);
	move.delay = Math.round(move.delay);
	this.setTurnData();
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

	//return b * a * (m+s) * turn.a * (1+turn.step));
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
	if (this.actions[this.actions.length-1].type == "speed"){
		this.actions[this.actions.length-1].dist *= -1;
	}
	else if (this.actions[this.actions.length-1].type == "move"){
		this.actions[this.actions.length-1].dist *= -1;
		update = true;
	}
	else if (this.actions[this.actions.length-1].type == "turn"){
		this.actions[this.actions.length-1].delay *= -1;
		setEW = true;
	}
	else if (this.actions[this.actions.length-1].type == "roll"){
		this.rolling = !this.rolling;
		this.setNotes();
	}
	else if (this.actions[this.actions.length-1].type == "flip"){
		this.flipping = !this.flipping;
		this.setNotes();
	}

	this.actions.splice(this.actions.length-1, 1);
	if (update){game.updateIntercepts(this.id);}
	if (setEW){this.getSystemByName("Sensor").setTempEW();}
	if (game.turnMode){this.switchTurnMode();}
	this.turnAngles = {}
	game.redraw();
	//game.drawShipOverlays();
}

Ship.prototype.moveInVector = function(dist){
	var pos = this.getPlannedPos();
	var goal = getPointInDir(dist, this.getPlannedFacing(), pos.x, pos.y);
		this.issueMove(goal, dist);
}

Ship.prototype.moveToMaxVector = function(){
	var pos = this.getPlannedPos();
	var dist = this.getRemSpeed();
	var goal = getPointInDir(dist, this.getPlannedFacing(), pos.x, pos.y);
		this.issueMove(goal, dist);
}

Ship.prototype.moveToMaxTurnVector = function(){
	var pos = this.getPlannedPos();
	var dist = this.getRemDelay();
	var impulse = this.getRemSpeed();
	var goal = getPointInDir(dist, this.getPlannedFacing(), pos.x, pos.y);
	this.issueMove(goal, dist);
}	

Ship.prototype.moveToMaCutVector = function(){
	var pos = this.getPlannedPos();
	var dist = this.getRemDelay();
	var impulse = this.getRemSpeed();
	var goal = getPointInDir(dist, this.getPlannedFacing(), pos.x, pos.y);
	this.issueMove(goal, dist);
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
	turn.a = a;
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
		a = addAngle(this.getPlannedFacing(), a);
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
		//this.actions[0].a += Math.round(a);
		this.actions[0].a += a;
		if (this.actions[0].a > 360){
			this.actions[0].a -= 360;
		} else if (this.actions[0].a < 0){this.actions[0].a += 360;}
		this.drawFacing = this.actions[0].a;
	}
	else {
		var o = this.getPlannedPos();
		this.actions.push(
		/*	new Move(-1, "turn", 0, o.x, o.y, 
				Math.round(a),
				Math.ceil(this.getTurnDelay()*Math.abs(a)),
				Math.ceil(this.getTurnCost()*Math.abs(a)),
				round(turn.mod, 1), 1, 0
			)
		*/	new Move(-1, "turn", 0, o.x, o.y, 
				a,
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
	else game.setShortenInfo(false, this, 0);
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
	if (system.disabled || system.destroyed){
		return false;
	}
	else if (system instanceof Weapon && !system.disabled && !system.destroyed && (system.getLoadLevel() >= 1 || system.getBoostEffect("Reload") && system.getLoadLevel() < 1)){
		if (system instanceof Launcher){
			if (system.getOutput() < system.getMaxoutput()){
				if (system.getRemAmmo() > system.getOutput()){
					return true;
				} else popup("There is not enough ammunition left");
			} else popup("The launcher is already at maximum capacity");
		}
		else {
			if (system.getBoostLevel() < system.maxBoost){
				var avail = this.getUnusedPower();
				var need = system.getEffiency();
				if (avail >= need){
					return true;
				} else popup("You have insufficient power remaining");
			} else popup("The selected system cant be boosted further.");
		}
	}
	else if (!(system instanceof Weapon)){
		if (this.getUnusedPower() >= system.getEffiency()){
			return true;
		} else popup("You have insufficient power remaining");
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
	if (this.salvo || this.flight){return;}
	else if (this.focus> game.phase && game.phase > -1){instruct("Focus Unit!");}
	else if (this.focus== 0 && game.phase == 1){return;}
	//console.log("ding!");
	game.mode = 1;
	turn.set(this);
	this.setTurnData();
	this.setMoveTranslation();

	if ((this.available == game.turn && game.turn == 1 || this.id < 0) && game.phase == -1){
		this.drawTurnUI();
		this.drawTurnArcs();
	}
	else if (game.phase == -1){
		this.drawMoveUI();
	}
	else if (game.phase == 0 || game.phase == 1){
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
	game.mode = 0;
	$("#vectorDiv").addClass("disabled");
	$("#impulseGUI").addClass("disabled");
	$(".turnEle").addClass("disabled");

	/*$("#maxVector").addClass("disabled");
	$("#maxTurnVector").addClass("disabled");
	$("#maxCutVector").addClass("disabled");
	$("#plusImpulse").addClass("disabled");
	$("#minusImpulse").addClass("disabled");
	$("#doUndoLastAction").addClass("disabled");
	*/
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
	return isInArc(getCompassHeadingOfPoint(origin,  target, this.getPlannedFacing()), start, end);
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

Ship.prototype.getPowerOrders = function(){
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

Ship.prototype.switchDiv = function(){
	if (this.selected){
		game.zIndex++;
		$(this.element).removeClass("disabled").css("zIndex", game.zIndex);
	}
	else if ($(this.element).hasClass("disabled")){
		game.zIndex++;
		$(this.element).removeClass("disabled").css("zIndex", game.zIndex);
	}
	else {
		game.zIndex--;
		$(this.element).addClass("disabled").css("zIndex", 10);
	}
}

Ship.prototype.setPreMoveFacing = function(){
	this.drawFacing = this.facing;
	if (this.available == game.turn){
		for (var i = 0; i < this.actions.length; i++){
			if (this.actions[i].type == "deploy" || this.actions[i].type == "jumpIn"){
				this.drawFacing += this.actions[i].a;
			}
		}
	}
}

Ship.prototype.setPostMoveFacing = function(){
	this.drawFacing = this.facing;
	for (var i = 0; i < this.actions.length; i++){
		//if (this.actions[i].type == "turn"){
			this.drawFacing += this.actions[i].a;
		//}
	}
}

Ship.prototype.setPreMovePosition = function(){
	//console.log("setPreMovePosition");
	this.drawX = this.x;
	this.drawY = this.y;
}

Ship.prototype.setPostMovePosition = function(){
	//console.log("setPostMovePosition");
	//this.setPreMovePosition(); return;
	if (!this.actions.length){
		//this.actions.push(new Move(0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
		return;
	}
	this.drawX = this.actions[this.actions.length-1].x;
	this.drawY = this.actions[this.actions.length-1].y;
}

Ship.prototype.needsAnimationNow = function(){
	if (!this.toAnimate){return false;}
	if ((this.ship || this.squad) && !game.animShip){return false;}
	if (this.flight && !game.animFlight || this.salvo && !game.animSalvo){return false;}
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
			this.setPostMoveFacing();
			return;
		}
	}

	if (game.phase == -1 || game.phase == 0){
		this.setPreMovePosition();
		this.setPreMoveFacing();
	}
	else if (this.focus == game.phase-1){
		this.setPreMovePosition();
		this.setPreMoveFacing();
	}
	else if (this.focus == game.phase){
		this.setPreMovePosition();
		this.setPreMoveFacing();
	}
	else if (this.focus < game.phase){
		this.setPostMovePosition();
		this.setPostMoveFacing();
	}
	else if (game.phase > 2){
		this.setPostMovePosition();
		this.setPostMoveFacing();
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

Ship.prototype.drawMovePlan = function(){
	//console.log("draw moves for #" + this.id);
	if (!this.selected && (!this.actions.length || !this.deployed || !game.drawMoves)){return;}

	this.setMoveTranslation();

	planCtx.strokeStyle = "#00ea00";
	if (!this.friendly){planCtx.strokeStyle = "red";}

	planCtx.globalAlpha = 0.7;
	planCtx.beginPath();
	planCtx.moveTo(this.x, this.y);

	for (var i = 0; i < this.actions.length; i++){
		if (this.actions[i].type == "move"){
			planCtx.lineTo(this.actions[i].x, this.actions[i].y);
			planCtx.stroke();
		}
	}
		
	for (var i = 0; i < this.actions.length; i++){
		if (this.actions[i].type == "turn"){
			planCtx.beginPath();
			planCtx.arc(this.actions[i].x, this.actions[i].y, 5, 0, 2*Math.PI, false);
			planCtx.closePath();
			planCtx.stroke();
		}
	}
		
	planCtx.closePath();
	planCtx.lineWidth = 1;
//	planCtx.stroke();
	planCtx.strokeStyle = "black";
	planCtx.globalAlpha = 1;
	this.drawPlanMarker();
	this.resetMoveTranslation();
}

Ship.prototype.getHeader = function(){
	var header = this.name + " #" + this.id;
	if (this.command){header += "<font color='yellow'> - CMD - </font>";}
	if (this.focus){header += "<font color='yellow'> (FOCUS)</font>";}
	return header;
}

Ship.prototype.getShortInfo = function(){
	var ele = ui.shortInfo;
	if (this.userid == game.userid){
		$(ele).attr("class", "friendly");
	} else $(ele).attr("class", "hostile");

	var impulse = this.getCurSpeed();
	var header = this.getHeader();

	var table = document.createElement("table");
		table.insertRow(-1).insertCell(-1).innerHTML = header;
		//table.insertRow(-1).insertCell(-1).innerHTML = this.name + " #" + this.id + " ("+this.traverse+")";
		if (this.isRolled()){table.insertRow(-1).insertCell(-1).innerHTML = "<span class='yellow'>!-ROLLED-!</span>";}
		if (this.isRolling()){table.insertRow(-1).insertCell(-1).innerHTML = "<span class='yellow'>!-ROLLING-!</span>";}
		if (this.isFlipping()){table.insertRow(-1).insertCell(-1).innerHTML = "<span class='yellow'>!-FLIPPING-!</span>";}
		table.insertRow(-1).insertCell(-1).innerHTML =  "Speed: " + impulse + " (" + round(impulse / this.getBaseImpulse(), 2) + ")";
		table.insertRow(-1).insertCell(-1).innerHTML = "Base To-Hit: " + this.getStringHitChance();
	return table;
}

Ship.prototype.getParent = function(){
	return this;
}

Ship.prototype.setUnitState = function(){
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

Ship.prototype.setTarget = function(){
	return;
}

Ship.prototype.select = function(){
	if (!this.selected){
		this.doSelect();
	} else this.switchDiv();
}

Ship.prototype.doSelect = function(){
	console.log(this);
	aUnit = this.id;
	this.selected = true;
	this.setUnitSelector();
	game.redraw()
	this.switchDiv();
	this.setMoveMode();
}

Ship.prototype.doUnselect = function(){
	this.unselectSystems();
	aUnit = false;
	this.selected = false;
	this.setUnitSelector();
	if (game.deploying){game.disableDeploy();}
	else if (game.flightDeploy){game.flightDeploy = false;}
	else if (game.mission){this.disableMissionMode()}
	this.switchDiv();
	this.unsetMoveMode();
	$("#hangarDiv").addClass("disabled");
	$("#popupWrapper").hide()
	$("#instructWrapper").hide()
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
		//console.log("highlight on");
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

		//this.drawMovePlan();
		//this.drawIncomingMovePlan();
		//this.drawTargetMovePlan();
		//this.drawTrajectory();
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

Ship.prototype.create = function(){
	//this.setHitTable();

	this.setStringHitChance();

	if (game.turn > 1 && game.phase == -1 && this.available == game.turn){
		this.x = this.actions[0].x;
		this.y = this.actions[0].y;
		this.drawX = this.actions[0].x;
		this.drawY = this.actions[0].y;
	}
}

Ship.prototype.setSubSystemState = function(){
	for (var i = 0; i < this.primary.systems.length; i++){
		this.primary.systems[i].setState();
	}
	for (var i = 0; i < this.structures.length; i++){
		this.structures[i].setBonusNegation();
		for (var j = 0; j < this.structures[i].systems.length; j++){
			this.structures[i].systems[j].setState();
			this.structures[i].systems[j].setBonusNegation(this.structures[i].bonusNegation);
		}
	}
}

Ship.prototype.setStringHitChance = function(){
	if (this.squad){return Mixed.prototype.setStringHitChance.call(this); }
	this.stringHitChance = Math.floor(this.baseHitChance * this.profile[0]) + " - " + Math.floor(this.baseHitChance * this.profile[1]) + "%"
}

Ship.prototype.getStringHitChance = function(){
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
	return;
}

Ship.prototype.getCodeColor = function(){
	if (this.friendly){return "#27e627"}
	else return "#ff3d00";
}

Ship.prototype.attachLogEntry = function(html){
	$("#combatLog").find("tbody")
		.append($("<tr>")
			.data("shipid", this.id)
			.hover(
				function(){
					var data = $(this).data();
					game.getUnit($(this).data("shipid")).doHighlight()
				},
				function(){
					var data = $(this).data();
					game.getUnit($(this).data("shipid")).highlight = 0;
					game.redraw();
				}
			)
			.html(html));
	ui.combatLogWrapper.find("#combatLogInnerWrapper").scrollTop(function(){return this.scrollHeight});
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
	if (!this.notes || this.flight || this.salvo){return false;}
	var data = this.notes.slice(0, this.notes.length-1).split(";");
	var morale = "";
	for (var i = 0; i < data.length; i++){if (data[i][0] == "m"){morale = data[i].slice(1, data[i].length); break;}}

	 //Math.floor(fire.damages[i].notes[1].slice(1, fire.damages[i].notes[1].length)) + ", ";


	console.log(morale);
	
	var html = "<td colSpan=9 style='padding: 5px'><span style='font-size: 12px; font-weight: bold'>Due to severe damage, " + this.getLogTitleSpan() + " fails its morale check check and rolls a " + morale + " on a D100.</br>";

	//console.log(this.notes);


	if (this.status == "jumpOut"){
		html += "The unit <span class='yellow'> is routed</span>.</td>";
	}
	else {
		var command = this.getSystemByName("Command");
		for (var i = 0; i < command.crits.length; i++){
			if (command.crits[i].turn != game.turn || command.crits[i].duration != -1){continue;}
			html += "The unit suffers a permanent <span class='yellow'>" + command.crits[i].value + "% Morale penalty</span>.</td>";
		}
	}



	// else html += "The unit <span class='yellow'>passes</span> (roll: " + this.notes + ").</td>";
	
	
	//var html = "<td colSpan=9><span style='font-size: 12px; font-weight: bold'>" + this.getLogTitleSpan() + "</span> is routed (and prepares to flee to hyperspace (Chance to rout: " + this.morale.effChance + "%, roll: " + this.notes + ")</td>";
	
	this.attachLogEntry(html);
	return true;
}

Ship.prototype.getCallSign = function(){
	if (this.display.length > 3){
		return " - " + this.display + " - ";
	}
	return this.display;
}

Ship.prototype.getLogTitleSpan = function(){
	return "<span style='color: " + this.getCodeColor() + "'>" + this.name + " #" + this.id + this.getLogNameEntry() + " </span>";
}

Ship.prototype.getLogNameEntry = function(){
	if (this.display.length > 3){
		return this.getCallSign();
	}
	return "";
}

Ship.prototype.createDeployEntry = function(){
	this.attachLogEntry("<th colSpan=9><span>" + this.getLogTitleSpan() + " jumps into local space.</span></th>");
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

Ship.prototype.createActionEntry = function(move){
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

Ship.prototype.animateSelfJumpIn = function(){
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

Ship.prototype.animateSelfJumpOut = function(){
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
	//drawCircle(this.drawX, this.drawY, this.size*0.8*sin, "source-over", "orange");
	//drawCircle(this.drawX, this.drawY, this.size*0.3*sin/2, "lighter", "yellow");


	if (fraction > 0.5){
		ctx.globalAlpha = 1;
	} else ctx.globalAlpha = fraction * 2

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

	//console.log("draw #" + this.id);
 	if (this.doDraw){
		this.drawSelf();
	}

	this.drawEscort();
	ctx.rotate(-this.getDrawFacing() * Math.PI/180);
	ctx.translate(-this.drawX, -this.drawY);
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

Ship.prototype.drawPlanMarker = function(){
	for (var i = this.actions.length-1; i >= 0; i--){
		if (!this.actions[i].resolved){
			var color = "green";
			if (!this.friendly){color = "red";}
			this.drawMarker(this.actions[i].x, this.actions[i].y, color, planCtx);
			return;
		} else return;
	}
}

Ship.prototype.drawMarker = function(x, y, c, context){
	context.beginPath();
	context.arc(x, y, (this.size-2)/2, 0, 2*Math.PI, false);
	context.closePath();
	context.lineWidth = 1 + (this.salvo *1) + Math.floor(this.selected*2 + (this.focus == 1)*2);
	context.globalAlpha = 0.7 + (this.focus == 1) * 0.1;
	context.globalCompositeOperation = "source-over";
	context.strokeStyle = c;
	context.stroke();
	context.globalAlpha = 1;
	context.lineWidth = 1;
	context.strokeStyle = "black";
}

Ship.prototype.getPlannedFacing = function(){
	var angle = 0;

	for (var i = 0; i < this.actions.length; i++){
		angle += this.actions[i].a;
	}
	return this.facing + angle;
}

Ship.prototype.getDrawFacing = function(){
	return this.drawFacing;
}

Ship.prototype.getImpulseMod = function(){
	return this.getCurSpeed() / this.getBaseImpulse();
}

Ship.prototype.getBaseHitChance = function(){
	return this.baseHitChance;
}

Ship.prototype.getAngledHitChance = function(angle){
	console.log(angle);
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


Ship.prototype.getDmgByFire = function(fire){
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
			lookup--;
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

Ship.prototype.getSystemLocation = function(i, name){
	var p;
	if (i == -1){
		switch (name){
			case "Main Structure": p = getPointInDir(this.size/6, this.getDrawFacing()+range(0, 359), 0, 0); break;
			case "Command": p = getPointInDir(this.size/6, this.getDrawFacing()+range(-10, 10), 0, 0); break;
			case "Reactor": p = getPointInDir(-this.size/4, this.getDrawFacing()+range(-15, 15), 0, 0); break;
			case "Sensor": p = getPointInDir(this.size/3, this.getDrawFacing()+range(-15, 15), 0, 0); break;
			case "Engine": p = getPointInDir(-this.size/4, this.getDrawFacing()+range(-15, 15), 0, 0); break;
		}
	}
	else {
		p = getPointInDir(this.size/4, getSystemArcDir(this.structures[i]) + this.getDrawFacing(), 0, 0);
	}
	p.x += range(-8, 8);
	p.y += range(-8, 8);
	return p;
}

Ship.prototype.getWeaponOrigin = function(id){
	for (var i = 0; i < this.structures.length; i++){
		if (i == this.structures.length-1 || id > this.structures[i].id && id < this.structures[i+1].id){
			var devi = this.size / 2;
			return getPointInDir(this.size/4 + range (-devi, devi), (getSystemArcDir(this.structures[i]) + this.getDrawFacing()), 0, 0);
		}
	}
	console.log("lacking gun origin");
	return this.getSystem(id);
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

Ship.prototype.getFlasHitSection = function(fire){
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
		var a = getAngleFromTo(o, t) + range(-5, 5);
		var d = this.size * (10-(range(-1, 1)*3))/10;
		return getPointInDir(d, a, 0, 0);
	}

	if (!isHit){
		return {
			x: ((this.size/2 + (range (0, this.size/6))) * (1-(range(0, 1)*2))),
			y: ((this.size/2 + (range (0, this.size/6))) * (1-(range(0, 1)*2)))
		}
	}
	return fire.damages[num].loc;
}

Ship.prototype.getHitSection = function(fire){
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
	var angle = this.getPlannedFacing();
	var slipAngle = this.getSlipAngle();	
	this.moveAngles = {start: addAngle(0 + slipAngle, angle), end: addAngle(360 - slipAngle, angle)};
}

Ship.prototype.drawMoveArea = function(){
	this.setMoveAngles();

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
/*
		var turn = this.getLastTurn();

		if (delay > turn.delay/2){

			var min = turn.delay/2 - turn.delay + delay;
			var delayRad1 = degreeToRadian(this.moveAngles.start-45);
			var delayRad2 = degreeToRadian(this.moveAngles.end+45);
			moveCtx.beginPath();			
			moveCtx.arc(center.x, center.y, min, delayRad1, delayRad2, false);
			moveCtx.closePath();
			moveCtx.strokeStyle = "yellow";
			moveCtx.lineWidth = 2
			moveCtx.stroke();
			moveCtx.strokeStyle = "black";	
			moveCtx.arc(center.x, center.y, Math.max(0, min), 0, 2*Math.PI, false);
			moveCtx.globalCompositeOperation = "destination-out";
			moveCtx.fill();
			moveCtx.globalCompositeOperation = "source-over";
		}
*/		
		
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

Ship.prototype.drawMoveArcs = function(center, rem){
	for (var i in this.moveAngles){
		var p = getPointInDir(rem, this.moveAngles[i], center.x, center.y);
		moveCtx.beginPath();
		moveCtx.moveTo(center.x, center.y);
		moveCtx.lineTo(p.x, p.y);
		moveCtx.closePath();
		moveCtx.strokeStyle = "white"
		moveCtx.stroke();
	}
}

Ship.prototype.getEffectiveEP = function(){
	var ep = 0;

	for (var i = 0; i < this.primary.systems.length; i++){
		if (this.primary.systems[i].name == "Engine"){
			ep += this.primary.systems[i].getOutput();
		}
	}
	return ep;
}

Ship.prototype.getBaseEP = function(){
	var ep = 0;

	for (var i = 0; i < this.primary.systems.length; i++){
		if (this.primary.systems[i].name == "Engine"){
			ep += this.primary.systems[i].output;
		}
	}
	return ep;
}

Ship.prototype.getEP = function(){
	return Math.floor(this.getEffectiveEP() / this.getImpulseMod());
}

Ship.prototype.getRemEP = function(){
	var ep = this.getEP();
	
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

Ship.prototype.getNextPosition = function(){
	return this.getPlannedPos();
}

Ship.prototype.getTurnStartPos = function(){
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

Ship.prototype.getWeaponPosition = function(){
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].id == fire.weaponid){
				var a = range(this.structures[i].start, this.structures[i].end);
				return getPointInDir(range(-size/3, size / 3), a, 0, 0);
			}
		}
	}
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

Ship.prototype.showMoraleDiv = function(e){
	$(document.body)
	.append($("<div>")
		.css("left", e.clientX - 90)
		.css("top", e.clientY + 40)
		.attr("id", "sysDiv")
		.append($("<table>")
			.append($("<tr>")
				.append($("<th>").attr("colSpan", 2).html("Morale Overview")))
			.append($("<tr>")
				.append($("<td>").html("Base Morale"))
				.append($("<td>").html("100%")))
			.append($("<tr>")
				.append($("<td>").html("Flagship Bonus"))
				.append($("<td>").addClass("moraleFlagship").html(this.getFlagshipMoraleBonus())))
			.append($("<tr>")
				.append($("<td>").html("Officer Bonus"))
				.append($("<td>").html(this.getOfficerMoraleBonus())))
			.append($("<tr>")
				.append($("<td>").html("Critical Malus"))
				.append($("<td>").addClass("moraleCrit").html(this.getCriticalMoraleMalus())))
			.append($("<tr>")
				.append($("<td>").html("Damage Malus"))
				.append($("<td>").addClass("moraleDamage").html(this.getDamageMoraleMalus())))
			.append($("<tr>")
				.append($("<td>").attr("colSpan", 2).css("height", 6)))
			.append($("<tr>")
				.append($("<th>").html("Final Morale"))
				.append($("<th>").addClass("moraleFinal").html(this.getCurrentMorale() + "%")))
/*			.append($("<tr>")
				.append($("<td>").attr("colSpan", 2).css("height", 6)))
			.append($("<tr>")
				.append($("<td>").attr("colSpan", 2).html("Check required @ Morale < " + this.getMoraleTrigger() + "%")))
			.append($("<tr>")
				.append($("<td>").attr("colSpan", 2).css("height", 6)))
			.append($("<tr>")
				.append($("<td>").html("Start Chance to Rout"))
				.append($("<td>").html(this.getModifiedRoutChance())))
			.append($("<tr>")
				.append($("<td>").html("Current Rout Chance"))
				.append($("<th>").html(this.getEffectiveRoutChance() + "%")))
*/		)
	)
}

Ship.prototype.hideMoraleDiv = function(){
	$("#sysDiv").remove();
}

Ship.prototype.getMoraleTrigger = function(){
	return this.morale.trigger;
}

Ship.prototype.getFlagshipMoraleBonus = function(){
	if (this.command){
		return "+10%";
	} return "";
}

Ship.prototype.getOfficerMoraleBonus = function(){
	var mod = this.getCrewLevel(0) * this.getSystemByName("Command").crewEffect;
	if (mod){return "+" + mod + "%";}
	return "";
}

Ship.prototype.getCriticalMoraleMalus = function(){
	if (!this.ship){return ""};

	var mod = this.getSystemByName("Command").getCritMod("Morale")*-1;
	if (mod){return mod + "%";}
	return "";
}

Ship.prototype.getDamageMoraleMalus = function(){
	var dmg = (100 - Math.floor(this.primary.remaining / this.primary.integrity * 100))*-1;
	if (!dmg){return ""}
	return dmg + "%";
}

Ship.prototype.getCurrentMorale = function(){
	var cmd = this.getSystemByName("Command");
	var base = 100;
	var flagship = this.command == true ? 10 : 0;
	var upgrade = this.getCrewLevel(0) * cmd.crewEffect;
	var crits = cmd.getCritMod("Morale")*-1;
	var dmg = this.getDamageMoraleMalus();
	if (dmg){dmg = Math.floor(dmg.slice(0, dmg.length-1))}

	return Math.floor(base + flagship + upgrade + crits + dmg);
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

Ship.prototype.getMoraleDiv = function(){
	//if (!this.ship){return false}
	return ($("<tr>")
			.append($("<td>").html("Morale"))
			.append($("<td>").attr("colSpan", 1).addClass("Morale")
				.append($("<div>").addClass("moraleFull"))
				.append($("<div>").addClass("moraleTrigger").css("width", (this.getMoraleTrigger() + "%")))
				.append($("<div>").addClass("moraleNow").css("width", (Math.min(100, this.getCurrentMorale()) + "%")))
				.hover(
					function(e){
						game.getUnit($(this).parent().parent().parent().parent().parent().parent().data("shipId")).showMoraleDiv(e);
					},
					function(e){
						game.getUnit($(this).parent().parent().parent().parent().parent().parent().data("shipId")).hideMoraleDiv();
					}))
				)
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
			.append($("<th>").html(this.getHeader()).attr("colSpan", 2).addClass(headerC)))
		.append($("<tr>")
			.append($("<th>").html(this.getCallSign()).attr("colSpan", 2).addClass(headerC)))
		.append($("<tr>")
			.append($("<td>").html("Type / Size").css("width", "50%"))
			.append($("<td>").html(getUnitType(this.traverse) + " / " + this.traverse)))
		.append($("<tr>")
			.append($("<td>").html("Targeting Profile"))
			.append($("<td>").html(this.getStringHitChance()).addClass("profile")))
		//.append($("<tr>")
		//	.append($("<td>").html("Focus Gain"))
		//	.append($("<td>").addClass("focusGain").html((this.getFocusString()))))
		.append(this.getMoraleDiv())
		.append($("<tr>")
			.append($("<td>").html("Speed"))
			.append($("<td>").html(this.getRemSpeed() + " / " + this.getCurSpeed()).addClass("speed")))
		.append($("<tr>")
			.append($("<td>").html("Maneuverability"))
			.append($("<td>").html(this.getRemEP() + " / " + this.getEP()).addClass("ep")))
		.append($("<tr>")
			.append($("<td>").html("Accel, Roll, Flip"))
			.append($("<td>").html(this.getImpulseChangeCost() + ", " + this.getActionCost(0) + ", " + this.getActionCost(1)).addClass("change")))
		//.append($("<tr>")
		//	.append($("<td>").html("Delay / 1\xB0"))
		//	.append($("<td>").html(round(this.getTurnDelay(), 2) + " px")))
		.append($("<tr>")
			.append($("<td>").html("Active Turn Delay"))
			.append($("<td>").html(this.getRemDelay()).addClass("delay")))

	subDiv.append(table);
	topDiv.append(subDiv)
	div.append(topDiv);

	$(this.expandDiv($(div[0])))
		.find(".structContainer")
			.contextmenu(function(e){e.stopPropagation(); e.preventDefault()})
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

Ship.prototype.addFocusDiv = function(div){
	if (this.isJumpingOut()){return;}
	if (this.isDestroyed()){return;}
	if (game.phase == -2){return;}

	div.append(
		$("<div>")
		.addClass("focusContainer")
		.append(
			$("<input>")
			.attr("type", "button")
			.attr("value", "Assign Focus (" + this.getFocusCost()+")")
			.hide()
			.click(function(){
				game.getUnit($(this).parent().parent().data("shipId")).setUnitFocus();
			})
		)
		.append(
			$("<div>")
			.html("Has Focus (" + this.getFocusCost()+")")
			.addClass("focusEntry")
			.hide()
			.click(function(){
				game.getUnit($(this).parent().parent().data("shipId")).unsetUnitFocus();
			})
		)
	)

	if (game.phase != 3){div.find(".focusContainer input").addClass("inactive")}
	if (this.focus){$(this.element).find(".focusContainer .focusEntry").show();}
	else $(this.element).find(".focusContainer input").show();
}

Ship.prototype.addCommandDiv = function(div){
	if (this.isJumpingOut()){return;}
	if (this.isDestroyed()){return;}
	if (!this.friendly){return;}
	if (game.phase == -2){return;}
	//if (game.phase != 3){return;}
	if (!game.hasNoCommandUnit()){return;}
	if (!game.canSetNewCommandUnit()){return;}

	$(div).append(
		$("<div>")
		.addClass("commandContainer")
		.append(
			$("<input>")
			.attr("type", "button")
			.attr("value", "Assign Fleet Command ( +" + this.getFocusIfCommand() + " / Turn)")
			.hide()
			.click(function(){
				game.getUnit($(this).parent().parent().data("shipId")).setCommand();
			})
		)
		.append(
			$("<div>")
			.html("Acts as Fleet Command")
			.addClass("commandEntry")
			.hide()
		)
	)

	if (this.command){div.find(".commandContainer .commandEntry").show();}
	else if (game.phase == 3 && game.canSetNewCommandUnit()){div.find(".commandContainer input").show();}
	else div.find(".commandContainer").hide();
}

Ship.prototype.getUnmoddedFocusGain = function(){
	return this.baseFocusRate + "% / " + Math.floor(game.settings.pv / 100 * (this.baseFocusRate + this.modFocusRate));
}

Ship.prototype.getFocusIfCommand = function(){
	var bridge = this.getSystemByName("Command");
	bridge.output = 100;
	var gain = Math.floor(game.settings.pv / 100 * bridge.getOutput() / 100 * (this.baseFocusRate + this.modFocusRate));
	bridge.output = 0;
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

Ship.prototype.setCommand = function(){
	//console.log("setCommand");

	if (this.destroyed || this.isJumpingOut()){return;}

	for (var i = 0; i < game.ships.length; i++){
		if (!game.ships[i].friendly || game.ships[i].flight || game.ships[i].salvo){continue;}
		game.ships[i].command = 0;
		game.commandChange.old = game.ships[i].id;
		$(game.ships[i].element).find(".commandContainer")
		.find("input").show().end()
		.find(".commandEntry").hide().end();
	}

	this.command = game.turn + 1;
	game.commandChange.new = this.id;
	$(this.element)
		.find(".commandContainer")
		.find("input").hide().end()
		.find(".commandEntry").show();

	for (let i = 0; i < game.playerstatus.length; i++){
		if (game.playerstatus[i].userid == game.userid){
			game.playerstatus[i].gainFocus = Math.floor(game.settings.pv / 100 * game.settings.focusMod / 10 * (this.baseFocusRate + this.modFocusRate));
			game.playerstatus[i].maxFocus = game.playerstatus[i].gainFocus * 4;
			break;
		}
	}

	game.setFocusInfo()
}

Ship.prototype.getFocusCost = function(){
	return Math.ceil(this.cost);
}

Ship.prototype.setUnitFocus = function(){
	if (!this.friendly){return;}
	if (game.phase != 3){popup("Focus can only be issued in Phase 3 - Damage Control"); return;}
	if (this.isJumpingOut()){popup("This unit is jumping to hyperspace, it cant be issued focus."); return;}
	if (!this.canAffordFocus()){popup("You are lacking focus ressources for this action.</br>Have: " + game.getRemFocus() + "</br>Spending: " + game.getFocusSpending() + "</br>Need: " + this.getFocusCost()); return;}
	if (!this.focus){
		this.focus = 1;
		$(this.element).find(".focusContainer").find("input").hide().end().find(".focusEntry").show();
		//game.setFocusInfo();
	}
}

Ship.prototype.unsetUnitFocus = function(){
	if (this.focus){
		this.focus = 0;
		$(this.element).find(".focusContainer").find("input").show().end().find(".focusEntry").hide();
		//game.setFocusInfo();
	}
}

Ship.prototype.canAffordFocus = function(){
	if (game.getRemFocus() - game.getFocusSpending() - this.getFocusCost() >= 0){
		return true;
	} return false;
}

Ship.prototype.expandDiv = function(div){

	div
	.find(".topDiv")
	.append($("<div>")
		.addClass("iconContainer")
			.hover(function(e){
				if (!game.turn){return;}
				if (aUnit){
					var shooter = game.getUnit(aUnit);
					var target = game.getUnit($(this).parent().parent().data("shipId"));
					if (shooter.id != target.id && shooter.hasWeaponsSelected()){
						handleWeaponAimEvent(shooter, target, e);
					}
				}
			}).
			click(function(e){
				if (!game.turn){return;}
				var shooter = game.getUnit(aUnit);
				var target = game.getUnit($(this).parent().parent().data("shipId"));
				if (shooter && target){
					firePhase({x: 0, y: 0}, shooter, target.id);
				}
			}));


	$(document.body).append(div);
	
	//$(div).css("position", "absolute").css("top", 300);

	structContainer = $("<div>").addClass("structContainer");
	div.append(structContainer);

	var noFront = true;
	var noAft = true;
	var sides = 0;
	var widen = 0;

	for (var i = 0; i < this.structures.length; i++){
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

		var structDiv = $("<div>").addClass("structDiv")
		structContainer.append(structDiv);
			
		var structTable = $("<table>").addClass("structTable")
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
					armour.css("width", 80);
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

			var td = this.structures[i].systems[j].getTableData(false);
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
				offsetX += 40;
			}
		}
		else if (this.structures.length == 5 && (a == 78 || a == 282)){
			offsetX += 25; offsetY -= 30;
		}
		else if (a == 60 || a == 300 || noAft){
			if (sides > 1){offsetX += 10;}
			else offsetX += 20;
		}
		
		var pos = getPointInDir(135 - offsetX, a-90, conWidth/2, conHeight/2-40);
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
		else if (!noFront && !noAft){
			offsetY -= 30;
		}
		
		$(structDiv)
			.data("id", this.structures[i].id)
			.css("left", pos.x + -w/2)
			.css("top", pos.y + offsetY)
	}






	// PRIMARY
	var primaryDiv = document.createElement("div");
		primaryDiv.className = "primaryDiv";
	var primaryTable = document.createElement("table");
		primaryTable.className = "PrimaryTable";
		primaryTable.appendChild(this.primary.getTableData());

		var systems = 0;
		var max = 2;
		primaryTable.childNodes[0].childNodes[0].colSpan = max;

		for (var i = 0; i < this.primary.systems.length; i++){
			if (systems == 0){
				var tr = document.createElement("tr");
			}

			var td = this.primary.systems[i].getTableData(false);
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
	var primY = conHeight/2 - h/2 + offsetY
	$(primaryDiv)
		.css("left", primX)
		.css("top", primY);







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

	structContainer.css("height", Math.max($(primaryDiv).position().top + $(primaryDiv).height(), height) + 20);


	//$(structContainer).append($("<div>").addClass("mainPower").html(this.getSystemByName("Reactor").getOutput()));

	var top = 0;
	var left = structContainer.width() - 55;
	if (this.structures.length == 3 && this.structures[0].start == 0){
		top = structContainer.height() - 65;
	}
	// POWER
	structContainer
		.append($("<div>").addClass("info").css("top", top + 5)
			.append($("<img>").attr("src", "varIcons/mainPower.png")
				.addClass("mainPowerIcon"))
			.append($("<div>")
				.addClass("mainPower")
				.html(this.getSystemByName("Reactor").getOutput())))
		//console.log($(structContainer).width());

	// JUMP OUT
	if (!this.destroyed && game.turn && game.phase == 3){
		var jumpDiv = 
		$("<div>").addClass("info").css("top", top + 5).css("left", left)
			.append($("<img>").addClass("jumpOut")
				.attr("src", "varIcons/redVortex.png"));

		if (this.canBeIssuedToJumpOut()){
			jumpDiv.find("img")
			.click(function(){game.getUnit($(this).parent().parent().parent().data("shipId")).requestJumpOut();
			});
		}
		else if (this.isJumpingOut()){
			jumpDiv.find("img").addClass("selected");
		}

		$(structContainer).append(jumpDiv);
	}


	// System options positioning
	for (var i = 0; i < this.structures.length; i++){
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
				.css("border-left", "1px solid white")
				//.css("width", goal)
				//.css("height", goal)
				//.css("margin-left", (conW - goal)/2)
		)
		.append($("<div>")
			.addClass("notes")
				.hide())

	//rolling ?

	this.setNotes();


	$(div).addClass("disabled");
	return div;
}

Ship.prototype.setNotes = function(){
	$(this.element).find(".notes").children().remove();
	if (this.isRolled()){this.addNoteEntry("ROLLED");}
	if (this.isRolling()){this.addNoteEntry("ROLLING");}
	if (this.isFlipping()){this.addNoteEntry("FLIPPING");}
}

Ship.prototype.canBeIssuedToJumpOut = function(){
	if (game.phase == 3 && this.friendly && this.status != "jumpOut"){return true;}
	return false;
}

Ship.prototype.isJumpingOut = function(){
	if (this.status == "jumpOut"){return true;}
	return false;
}

Ship.prototype.requestJumpOut = function(){
	if (!this.friendly){return;}
	else if (this.destroyed){popup("Nice try, but you cant order this unit to withdraw.");}
	else if (game.phase != 3){popup("You can only order withdrawal in </br>Phase 3 / Damage Control.");}
	else if (this.status == "jumpOut"){this.doJumpOut();}
	else instruct("Confirm if you really want to withdraw this unit from combat</p></p><div class='popupEntry buttonTD' style='font-size: 20px; width: 200px' onclick='game.getUnit(" + this.id + ").doJumpOut()'>Confirm Withdrawal</div>");
}

Ship.prototype.doJumpOut = function(){
	if (this.status == "bought"){
		this.status = "jumpOut";
	} else this.status = "bought";

	if (this.hasFocus()){this.unsetUnitFocus();}
	$(this.element).find(".jumpOut").toggleClass("selected");
	$("#instructWrapper").hide();
}

Ship.prototype.setFlipState = function(){
}

Ship.prototype.addNoteEntry = function(val){
	$(this.element).find(".notes")
		.show()
		.append($("<span>").html(val + "</br>"));
}

Ship.prototype.doOffset = function(){
	if (this.ship || this.squad){return;}
	if (!this.doDraw){return;}
	//console.log("doOffset #" + this.id);
	var o = this.getPlannedPos();
	var t = this.getTarget();
	var a = 0;
	if (t){
		a = addAngle(range(30, 45) * (1-(range(0, 1))), getAngleFromTo(o, this.getTarget().getPlannedPos()));
	} else a = range(0, 360);
	
	var p = getPointInDir(Math.max(25, this.size/3), a, o.x, o.y);

	this.drawX = p.x;
	this.drawY = p.y;

	for (var i = 0; i < this.cc.length; i++){
		var s = game.getUnit(this.cc[i]);
			s.drawX = p.x;
			s.drawY = p.y;
	}
}

Ship.prototype.doRandomOffset = function(shift){
	if (this.ship || this.squad){return;}
	if (!this.doDraw){return;}
	if (this.mission.arrived){return;}
	//console.log("doOffset #" + this.id);
	var o = this.getPlannedPos();
	var t = this.getTarget();
	var tPos;
	if (t){
		var tPos = t.getPlannedPos();
	} else tPos = {x: this.mission.x, y: this.mission.y};

	var a = getAngleFromTo(o, tPos);
	if (t){
		//a = addAngle(range(-90, 90), getAngleFromTo(o, this.getTarget().getPlannedPos()));
		a += 90 * shift;
	} else a = range(0, 360);
	
	var p = getPointInDir(20, a, o.x, o.y);
	//console.log(p);

	this.drawX = p.x;
	this.drawY = p.y;
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
		.find(".ep").html(this.getRemEP() + " / " + this.getEP()).end()
		.find(".change").html(this.getRealImpulseChangeCost() + ", " + this.getRealActionCost(0) + ", " + this.getRealActionCost(1)).end()
		.find(".delay").html(this.getRemDelay()).end()
}

Ship.prototype.doDestroy = function(){
	this.doDraw = 0;
	this.destroyed = 1;
	/*for (var i = this.cc.length-1; i >= 0; i--){
		var attach = game.getUnit(this.cc[i]);
		if (attach.flight){
			attach.doDraw = 1;
		}
		this.cc.splice(i, 1);
	}
	this.setSupportImage();
	*/

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
	if (this.salvo){return;}
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
			if (!u.structures[j].doDraw){;continue;}
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


Ship.prototype.readyForAnim = function(){
	this.setPreMovePosition();
	this.setPreMoveFacing();	

	var frameMod = 1000 / window.fpsTicks / this.getCurSpeed();
	//console.log(frameMod)
	for (var i = 0; i < this.actions.length; i++){
		var action = this.actions[i];
		this.actions[i].animated = 0;

		if (action.type == "speed" || action.type == "deploy" || action.type == "jumpIn"){
			this.actions[i].animated = 1;
		}
		else if (action.type == "turn"){

			this.actions[i].t = [0, Math.abs(this.actions[i].a*3), this.actions[i].a/Math.abs(this.actions[i].a*3)];
			//console.log(this.actions[i].t)

		}
		else {
			if (i == 0){
				var v = new Vector({x: this.x, y: this.y}, {x: action.x, y: action.y});
					v.t = [0, action.dist * frameMod];
			}
			else {
				var v = new Vector({x: this.actions[i-1].x, y: this.actions[i-1].y}, {x: action.x, y: action.y});
					v.t = [0, action.dist * frameMod];
			}

			this.actions[i].v = v;
		}
	}
}

Ship.prototype.getLockEffect = function(target){
	var sensor = this.getSystemByName("Sensor");
	var ew = sensor.getEW();
	if (sensor.disabled || sensor.destroyed || ew.type == 1){return 0;}

	var tPos = target.getPlannedPos();
	var origin = this.getPlannedPos();
	var d = getDistance(origin, tPos);
	var multi = 0;

	if (target.ship || target.squad){
		multi = 0.5;
		multi += (0.6 / 10 * this.traverse);
	}
	else if (target.flight){
		multi = 1.5;
	}
	else if (target.salvo){
		multi = 3;
	}

	if (game.isCloseCombat(this, target)){
		if (target.salvo && this.isInEWArc(origin, target.getTrajectory(), sensor, ew)){
			return multi;
		}
		else if (target.flight){
			if (ew.angle == -1){return multi;}
			else return Math.round(multi / 180 * (Math.min(180, game.const.ew.len * Math.pow(sensor.getOutput()/ew.dist, game.const.ew.p)))*100)/100;
		}
	}
	else if (d <= ew.dist && this.isInEWArc(origin, tPos, sensor, ew)){
		return multi;
	}
	else return 0;
}

Ship.prototype.getMaskEffect = function(shooter){
	if (this.flight || this.salvo || shooter.flight){return 0;}

	var sensor = this.getSystemByName("Sensor");
	var ew = sensor.getEW();
	if (sensor.disabled || sensor.destroyed || ew.type == 0){return 0;}

	var tPos = shooter.getPlannedPos();
	var origin = this.getPlannedPos();
	var d = getDistance(origin, tPos);
	var multi = 0;

	if (shooter.ship || shooter.squad){
		multi = 0.5;
		multi += (0.6 / 10 * this.traverse);
	}
	else if (shooter.flight){
		return 0;
	}
	else if (shooter.salvo){
		multi = 0.5;
	}	

	if (d == 0 && game.isCloseCombat(this, shooter) && this.isInEWArc(origin, shooter.getTrajectory(), sensor, ew)){
		if (shooter.salvo){
			return multi;
		}
	}
	else if (d <= ew.dist && this.isInEWArc(origin, tPos, sensor, ew)){
		return multi;
	}
	else return 0;
}


Ship.prototype.drawTargetMovePlan = function(){
	return;
}

Ship.prototype.drawIncomingMovePlan = function(){
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
		if (this.structures[i].id == id){
			return this.structures[i];
		}

		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].id == id){
				return this.structures[i].systems[j];
			}
		}
	}
	for (var j = 0; j < this.primary.systems.length; j++){
		if (this.primary.systems[j].id == id){
			return this.primary.systems[j];
		}
	}
}

Ship.prototype.getPrimarySection = function(){
	return this.primary;
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
	for (var i = 0; i < this.primary.systems.length; i++){
		if (!this.primary.systems[i].cost){continue;}
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
			.append($("<td>").html(this.upgrades[i].text))
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
	var reactor = this.getSystemByName("Reactor");
	var s = reactor.getOutput();
	$(reactor.element).find(".outputMask").html(s);
	$(this.element).find(".mainPower").html(s).end();
	system.update();

	if (system instanceof Engine){
		$(this.element).find(".ep").html(this.getRemEP() + " / " + this.getEP()).end();
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

Ship.prototype.showCrew = function(e, bridge){
	if (bridge.selected){
		game.system = 0;
		bridge.selected = false;
		this.disableCrewPurchase(e);
	}
	else {
		bridge.selected = true;
		game.system = bridge.id;
		this.enableCrewPurchase(e, bridge);
	}
	bridge.setSystemBorder();
}

Ship.prototype.handleCrew = function(e, bridge){
	if (bridge.selected){
		game.system = 0;
		bridge.selected = false;
		this.disableCrewPurchase(e);
	}
	else {
		bridge.selected = true;
		game.system = bridge.id;
		this.enableCrewPurchase(e, bridge);
	}
	bridge.setSystemBorder();
}

Ship.prototype.enableCrewPurchase = function(e, bridge){
	var div = $("#crewDiv");
	var table = div.find("#crewTable").empty();

	table
		.append(
			$($("<tr>")
				.append($("<th>").html("Type").css("width", "18%"))
				.append($("<th>").html("Effect / lvl").css("width", "40%"))
				.append($("<th>").html("Cost").css("width", "8%"))
				.append($("<th>").attr("colSpan", 3).html("Level").css("width", "15%"))
				.append($("<th>").html("Total Cost"))
			)
		)

	for (var i = 0; i < bridge.loads.length; i++){
		table
		.append(
			$($("<tr>")
				.append($("<td>").html(bridge.loads[i].name + "</br>Officer"))
				.append($("<td>").html(this.getCrewEffect(i)))
				.append($("<td>").html(this.getCrewAddCost(i)))
				.append($("<td>")
					.append($("<img>")
						.attr("src", "varIcons/plus.png").addClass("size20")
						.data("type", i)
						.click(function(){game.getUnit(aUnit).plusCrewLevel($(this).data("type"))})
					)
				)
				.append($("<td>").html(this.getCrewLevel(i)))
				.append($("<td>")
					.append($("<img>")
						.attr("src", "varIcons/minus.png").addClass("size20")
						.data("type", i)
						.click(function(){game.getUnit(aUnit).minusCrewLevel($(this).data("type"))})
					)
				)
				.append($("<td>").html(this.getTotalCrewCost(i)))
			)
		)
	}

	if (game.phase == -2){
	table
		.append(
			$($("<tr>")
				.append($("<th>").attr("colSpan", 3).html(""))
				.append($("<th>").attr("colSpan", 3).html("Grand Total"))
				.append($("<th>").html(bridge.cost))
			)
		)
	}
	$(div).data("systemid", this.id).css("left", 650).css("top", 400).removeClass("disabled");
}


Ship.prototype.disableCrewPurchase = function(e){
	$("#crewDiv").addClass("disabled");
	if (game.phase == -2){game.setUnitTotal(this);}
}

Ship.prototype.plusCrewLevel = function(i){
	var bridge = this.getSystemByName("Command");
	if (bridge.loads[i].amount == 3){return;}
	bridge.loads[i].amount++;
	bridge.loads[i].cost = this.getTotalCrewCost(i);
	var system = this.getSystemByName(bridge.loads[i].name);
		system.powers.push({
			id: system.powers.length+1, unitid: system.parentId, systemid: system.id,
			turn: game.turn,type: 2, cost: 0, new: 1
		})
		system.update();
	this.updateCrewDiv(i);
}

Ship.prototype.minusCrewLevel = function(i){
	var bridge = this.getSystemByName("Command");
	if (!bridge.loads[i].amount){return;}
	bridge.loads[i].amount--;
	bridge.loads[i].cost = this.getTotalCrewCost(i);
	var system = this.getSystemByName(bridge.loads[i].name);
		system.doUnboost();
		system.update();
	this.updateCrewDiv(i);
}

Ship.prototype.updateCrewDiv = function(i){
	var tr = $($("#crewDiv").find("#crewTable").children().find("tr")[i+1]);
	$(tr.children()[2]).html(this.getCrewAddCost(i));
	$(tr.children()[4]).html(this.getCrewLevel(i));
	$(tr.children()[6]).html(this.getTotalCrewCost(i));

	if (i == 0){ // Command upgrade
		$(this.element).find(".focusGain").html(this.getFocusString());
	}
	this.updateCrewTotals();
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
	var add = 0.5;
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
	var add = 0.5;

	for (j = 0; j < level; j++){
		cost += baseCost * (1 + add*j)
	}
	return Math.ceil(cost);
}

Ship.prototype.updateCrewTotals = function(){
	var bridge = this.getSystemByName("Command");
	var total = 0;
	for (var i = 0; i < bridge.loads.length; i++){
		total += this.getTotalCrewCost(i);
	}
	bridge.cost = total;	
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
			//console.log("click");
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

Ship.prototype.checkUnboostEngine = function(){
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
	//var center = this.getPlannedPos();
	//var angle = this.getPlannedFacing();

	var center = {x: this.x, y: this.y};
	var angle = this.getDrawFacing();
	var p1 = getPointInDir(150/cam.z, addToDirection(angle, -90), center.x, center.y);
	$(ui.turnButton)
		.removeClass("disabled")
		.css("left", p1.x * cam.z + cam.o.x - $(ui.turnButton).width()/2)
		.css("top", p1.y * cam.z + cam.o.y - $(ui.turnButton).height()/2)
		.find("#impulseMod").html("x " +turn.dif).end()
		//.find("#remEP").html(this.getRemEP() + " / " + this.getEP()).addClass("green").end()
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
	if (this.getRemEP() >= this.getRealActionCost(type)){
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
Ship.prototype.canIncreaseImpulse = function(){
	if (this.getRemEP() >= this.getImpulseChangeCost() / this.getImpulseMod()){
		if (!this.actions.length || this.available == game.turn && this.actions.length == (1 + this.ship + this.squad)){
			return true;
		}
		else if (this.actions[this.actions.length-1].type == "speed" && this.actions[this.actions.length-1].dist == 1){
			return true;
		}
		else if (this.actions[0].type == "deploy" && this.actions.length == 1 && game.turn > 1 && this.available == game.turn){
			return true;
		}
	}
	else if (this.actions.length && this.actions[this.actions.length-1].type == "speed" && this.actions[this.actions.length-1].dist == -1){
		return true;
	}

	return false;
}

Ship.prototype.canDecreaseImpulse = function(){
	if (this.getCurSpeed() <= 30){return false;}
	else if (this.getRemEP() >= this.getImpulseChangeCost() / this.getImpulseMod()){
		if (!this.actions.length || this.available == game.turn && this.actions.length == (1 + this.ship + this.squad)){
			return true;
		}
		else if (this.actions[this.actions.length-1].type == "speed" && this.actions[this.actions.length-1].dist == -1){
			return true;
		}
		else if (this.actions[0].type == "deploy" && this.actions.length == 1 && game.turn > 1 && this.available == game.turn){
			return true;
		}
	}
	else if (this.actions.length && this.actions[this.actions.length-1].type == "speed" && this.actions[this.actions.length-1].dist == 1){
		return true;
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
			.find("#remEP").html(this.getRemEP() + " / " + this.getEP()).addClass("green").end()
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
		this.drawVectorIndicator();
		this.resetMoveTranslation();
	}
}

Ship.prototype.canDoAnotherTurn = function(){
	var i = 0;
	if (!this.getRemSpeed()){
		return false;
	}
	else if (this.turns[i].cost * (this.turns[i].costmod + 0.2) + this.getTurnCost() < this.getRemEP()){
		return true;
	}
	else return false;
}

Ship.prototype.doRoll = function(){
	var shipPos = this.getPlannedPos();
	this.actions.push(new Move(-1, "roll", 1, shipPos.x, shipPos.y, 0, 0, this.getActionCost(0), 1, 1, 0));
	this.rolling = !this.rolling;
	this.setNotes();
	this.resetMoveMode();
	game.redraw();
}

Ship.prototype.doFlip = function(){
	var shipPos = this.getPlannedPos();
	this.actions.push(new Move(-1, "flip", 1, shipPos.x, shipPos.y, 0, 0, this.getActionCost(1), 1, 1, 0));
	this.flipping = !this.flipping;
	this.setNotes();
	this.resetMoveMode();
	game.redraw();
}

Ship.prototype.doIncreaseImpulse = function(){
	var shipPos = this.getPlannedPos();
	if (this.actions.length && this.actions[this.actions.length-1].type == "speed" && this.actions[this.actions.length-1].dist == -1){
		this.actions.splice(this.actions.length-1, 1);
	}
	else {
		var action = new Move(-1, "speed", 1, shipPos.x, shipPos.y, 0, 0, this.getImpulseChangeCost(), 1, 1, 0);
		this.actions.push(action);
	}
	this.resetMoveMode();
	game.redraw();
}

Ship.prototype.doDecreaseImpulse = function(){
	var shipPos = this.getPlannedPos();
	if (this.actions.length && this.actions[this.actions.length-1].type == "speed" && this.actions[this.actions.length-1].dist == 1){
		this.actions.splice(this.actions.length-1, 1);
	}
	else {
		var action = new Move(-1, "speed", -1, shipPos.x, shipPos.y, 0, 0, this.getImpulseChangeCost(), 1, 1, 0);
		this.actions.push(action);
	}
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
			.data("shipid", this.id)
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
	var angle = this.getPlannedFacing();
	var remSpeed = this.getRemSpeed();
	var remDelay = this.getRemDelay();
	var ele;

	if (remSpeed){
		ele = document.getElementById("maxVector");
		var p = getPointInDir(remSpeed + 90, angle, center.x, center.y);
		var left = p.x * cam.z  + cam.o.x - $(ele).width()/2;
		var top = p.y * cam.z  + cam.o.y - $(ele).height()/2;

		$(ele)
			.data("shipid", this.id)
			.data("dist", remSpeed)
			//.html("<div style='margin-left: 4px; margin-top: 7px'>"+rem+"<div>")
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
			.data("shipid", this.id)
			.data("dist", remSpeed)
			//.html("<div style='margin-left: 4px; margin-top: 7px'>"+rem+"<div>")
			.html("<div>"+remDelay+"</div>")
			.css("left", left)
			.css("top", top)
			.removeClass("disabled");
	}
}

Ship.prototype.drawVectorIndicator = function(){
	var center = this.getPlannedPos();
	var angle = this.getPlannedFacing();
	var p = getPointInDir(200, angle, center.x, center.y);
	
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
	//var angle = this.getPlannedFacing();
	//var turnAngle = this.getMaxTurnAngle();
	//this.turnAngles = {start: addAngle(0 + turnAngle, angle), end: addAngle(360 - turnAngle, angle)};

	var turnAngle = this.getMaxTurnAngle();
	var angle = this.getPlannedFacing();
	
	this.turnAngles = {start: addAngle(0 + turnAngle, angle), end: addAngle(360 - turnAngle, angle)};

	//return;

	var center = this.getPlannedPos();
	//var angle = this.getPlannedFacing();
	//var turnAngle = this.getMaxTurnAngle();
	var w = this.getTurnStep();

	//this.turnAngles = {start: addAngle(0 + turnAngle, angle), end: addAngle(360 - turnAngle, angle)};
	
	for (var j = 1; j >= -1; j = j-2){
		for (var i = 1; i <= w; i++){			
			var modAngle = turnAngle * i * j;
			var newAngle = addToDirection(angle, modAngle);
			//var p = getPointInDir(Math.max(this.getBaseImpulse(), this.getRemSpeed()*2), newAngle, center.x, center.y);
			var p = getPointInDir(100, newAngle, center.x, center.y);
			if (turnAngle != 180){
				moveCtx.beginPath();
				moveCtx.moveTo(center.x, center.y);
				moveCtx.lineTo(p.x, p.y);
				moveCtx.closePath();
				moveCtx.globalAlpha = 0.25;
				moveCtx.strokeStyle = "yellow";
				moveCtx.lineWidth = 1;
				moveCtx.stroke();
				moveCtx.globalAlpha = 1;
			}
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
	var delay = turn.a * this.getTurnDelay();
	if (delay){
		var angle = this.getPlannedFacing();
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

Ship.prototype.getAllResolvingFireOrders = function(){
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
		done: 0,
		animating: 0,
		id: this.id,
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

		var amount = 22 + (this.traverse * 8);

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

Ship.prototype.disableMissionMode = function(){
	game.flightDeploy = 0;
	game.mission = 0;
	$(this.element)
		.find("input[name=mission]:checked").each(function(){$(this).prop("checked", false)}).end()
		.find(".missionOption").addClass("disabled");
}

Ship.prototype.enableMissionMode = function(){
	game.flightDeploy = 1;
	$(this.element).find(".missionOption").removeClass("disabled");
}

Ship.prototype.getPurchaseHeader = function(){
	//return "this";
	return "<span style='font-size: 16px;'>" + this.name + "</span>" + (this.display ? "<span class='green'> -- " + this.display + " -- </span>" : "<span class='green'></span>");
}

Ship.prototype.getIncomingHeader = function(){
	return this.name + (this.notes ? "</br>" + this.notes : "");
}