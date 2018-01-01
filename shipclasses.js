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
	this.size = Math.floor(data.size/2);
	this.size = data.size;
	this.userid = data.userid;
	this.available = data.available;
	this.baseHitChance = data.baseHitChance || 0;
	this.baseImpulse = data.baseImpulse || 0;
	this.traverse = data.traverse;
	this.status = data.status;
	this.actions = data.actions || [];
	this.cc = [];
	this.mapSelect = 1;
	this.index = 0;

	this.totalCost = 0;

	this.slipAngle = data.slipAngle || 0;
	this.turnAngle = data.turnAngle || 0;
	this.turnStep = data.turnStep || 0;
	this.turnMod = 1;
	this.baseTurnDelay = data.baseTurnDelay || 0;
	this.baseTurnCost = data.baseTurnCost || 0;
	this.baseImpulseCost = data.baseImpulseCost || 0;
	this.currentImpulse = data.currentImpulse || 0;
	this.remainingImpulse = data.remainingImpulse || 0;
	this.remainingDelay = data.remainingDelay || 0;

	this.turnAngles = {};
	this.moveAngles = {};
	this.attachAnims = [];

	this.ship = data.ship;
	this.flight = data.flight;
	this.salvo = data.salvo;
	this.squad = data.squad;

	this.friendly = 0;
	this.deployed = 0;
	this.isReady = 0;
	this.drawFacing = 0;
	this.drawX = 0;
	this.drawY = 0;

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
	this.doDraw = 1;
}

Ship.prototype.drawDeploymentPreview = function(pos){
	mouseCtx.clearRect(0, 0, res.x, res.y);
	mouseCtx.translate(cam.o.x, cam.o.y)
	mouseCtx.scale(cam.z, cam.z)
	mouseCtx.translate(pos.x, pos.y);
	/*mouseCtx.globalAlpha = 0.3;
	mouseCtx.beginPath();
	mouseCtx.arc(0, 0, size*1, 0, 2*Math.PI, false);
	mouseCtx.closePath();
	mouseCtx.fillStyle = "red";
	mouseCtx.fill();
*/
	this.drawMarker(0, 0, "yellow", mouseCtx);
	//mouseCtx.globalAlpha = 1;
	mouseCtx.rotate(this.getDrawFacing() * Math.PI/180);
	mouseCtx.drawImage(this.img, -this.size/2, -this.size/2, this.size, this.size);

	mouseCtx.setTransform(1,0,0,1,0,0);
	//mouseCtx.globalAlpha = 1;

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

Ship.prototype.canDeployHere = function(pos){
	
	//console.log(pos);
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
		var facing = 0;
		var index;
		for (var i = 0; i < playerstatus.length; i++){
			if (playerstatus[i].userid == this.userid){
				index = i % 2; break;
			}
		}
		facing = 0 + (180 * (index % 2));
		this.actions.push(new Move(-1, "deploy", 0, pos.x, pos.y, facing, 0, 0, 1, 1, 0));
		this.deployed = 1;
		this.isReady = 1;
		//this.facing = facing;
		this.drawFacing = facing;
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
	}
	this.select();

	$("#deployOverlay").hide();
	$("#deployWrapper")
			.find("#reinforceTable").find(".requestReinforcements").each(function(){
			if ($(this).hasClass("selected")){
				//$(this).find(".cost").addClass("green");
				$(this).addClass("green");
				return;
			}
		}).end()
		.find("#totalRequestCost").html(game.getCurrentReinforceCost());

	game.redraw();
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
	if (!game.sensorMode){
		this.drawEW();
	}
	if (this.ship || this.squad){
		this.setMoveTranslation();
		this.drawVectorIndicator();
		this.drawMoveArea();
		this.drawTurnArcs();
		//if (game.phase < 2){
		//}
		this.resetMoveTranslation();
	}
	this.drawMovePlan();
	this.drawIncomingMovePlan();
	this.drawTargetMovePlan();
}

Ship.prototype.getImpulseChangeCost = function(){
	return Math.round(this.baseImpulseCost*(1-(1-this.getImpulseMod())/2));
}

Ship.prototype.getBaseImpulse = function(){
	return this.baseImpulse;
}

Ship.prototype.getRemainingImpulses = function(){
	return this.remainingImpulse;
}

Ship.prototype.setRemainingImpulse = function(){
	return;
	this.remainingImpulse -= this.actions[this.actions.length-1].dist;
}

Ship.prototype.getImpulseStep = function(){
	//return 15;
	return Math.floor(this.getBaseImpulse() / 8);
}

Ship.prototype.getTurnCost = function(){
	if (game.phase == -2){
		return round(this.baseTurnDelay*this.getImpulseMod() / this.getTurnMod(), 2);
	}
	if (this.actions.length && (this.actions[0].type == "deploy" && this.actions[0].turn == game.turn && this.actions[0].resolved == 0)){
		return 0;
	}
	else return round(this.baseTurnCost*this.getImpulseMod() * this.getTurnMod(), 2);
	//else return this.baseTurnCost; //Math.pow(this.mass, 1.25)/10000;
	//else return Math.found((Math.pow(this.mass, 1.56) / 10000) *  this.getImpulseMod());
}

Ship.prototype.getTurnMod = function(){
	return turn.mod || 1;
}

Ship.prototype.getTurnDelay = function(){
	if (game.phase == -2){
		return round(this.baseTurnDelay*this.getImpulseMod() / this.getTurnMod());
	}
	if (this.actions.length && this.actions[0].type == "deploy" && this.actions[0].turn == game.turn && this.actions[0].resolved == 0){
		return 0;
	}
	else return round(this.baseTurnDelay*this.getImpulseMod() / (1+((this.getTurnMod()-1)*3)), 2);
	//else return round(this.baseTurnDelay*this.getImpulseMod() / this.getTurnMod());
}

Ship.prototype.drawArcIndicator = function(){
	return;
	var shipPos = this.getGamePos();
	var angle = this.getPlannedFacing();

	var p1 = getPointInDirection(80, 90+angle, shipPos.x, shipPos.y);
	var p2 = getPointInDirection(-80, 90+angle, shipPos.x, shipPos.y);
	var p3 = getPointInDirection(80, 180+angle, shipPos.x, shipPos.y);
	var p4 = getPointInDirection(-80, 180+angle, shipPos.x, shipPos.y);

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

Ship.prototype.drawImpulseUI = function(){
	var facing = this.getDrawFacing();
	var center = {x: this.drawX, y: this.drawY};
	var p1 = getPointInDirection(this.size/2 + 10 + 15, facing + 180, center.x, center.y);

	if (this.canUndoLastAction()){
		var ox = p1.x * cam.z + cam.o.x - 15;
		var oy = p1.y * cam.z + cam.o.y - 15;
		$("#undoLastAction").css("left", ox).css("top", oy).removeClass("disabled");
	} else $("#undoLastAction").addClass("disabled");

	if (this.disabled){return;}			

	if (this.canIncreaseImpulse()){
		var pPlus = getPointInDirection(50, facing +90, p1.x, p1.y);
		var ox = pPlus.x * cam.z + cam.o.x - 15;
		var oy = pPlus.y * cam.z + cam.o.y - 15;
		$("#plusImpulse").css("left", ox).css("top", oy).removeClass("disabled");
	} else $("#plusImpulse").addClass("disabled");

	if (this.canDecreaseImpulse()){
		var mMinus = getPointInDirection(50, facing -90, p1.x, p1.y);
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
	this.setRemainingImpulse();
	this.setRemainingDelay();
	this.autoShortenTurn();
	this.setMoveMode();
	game.updateIntercepts(this.id);
	game.redraw();
	//game.drawShipOverlays();
}

Ship.prototype.autoShortenTurn = function(){
	var impulse = this.getCurrentImpulse();
	var delay = this.getRemainingDelay();
	var move = this.getLastTurn();

	if (!impulse && delay){
		while (this.canShortenOldTurn(move)){
			move.cost = move.cost / move.costmod * (move.costmod + turn.step);
			move.delay = move.delay * move.costmod / (move.costmod + turn.step);
			move.costmod = round(move.costmod + turn.step, 1);
			//console.log(move.cost, move.delay, move.costmod);
		}
	}
	else if (impulse && delay){
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
	if (!this.getRemainingDelay()){return;}
	if (move.costmod < 2 && this.getRemainingEP() >= this.getShortenOldTurnCost(move)){
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

	this.undoOrderButton = false;
	return false;
}

Ship.prototype.undoLastAction = function(pos){
	var update = false;
	if (this.actions[this.actions.length-1].type == "speed"){
		this.actions[this.actions.length-1].dist *= -1;
	}
	else if (this.actions[this.actions.length-1].type == "move"){
		this.setRemainingDelay();
		this.actions[this.actions.length-1].dist *= -1;
		this.setRemainingImpulse();
		update = true;
	}
	else if (this.actions[this.actions.length-1].type == "turn"){
		this.actions[this.actions.length-1].delay *= -1;
		this.setRemainingDelay();
	}
	this.actions.splice(this.actions.length-1, 1);
	if (update){game.updateIntercepts(this.id);}
	if (game.turnMode){
		this.switchTurnMode();
	}
	this.turnAngles = {}
	game.redraw();
	//game.drawShipOverlays();
}

Ship.prototype.moveInVector = function(dist){
	var pos = this.getPlannedPos();
	var goal = getPointInDirection(dist, this.getPlannedFacing(), pos.x, pos.y);
		this.issueMove(goal, dist);
}

Ship.prototype.moveToMaxVector = function(){
	var pos = this.getPlannedPos();
	var dist = this.getRemainingImpulse();
	var goal = getPointInDirection(dist, this.getPlannedFacing(), pos.x, pos.y);
		this.issueMove(goal, dist);
}

Ship.prototype.moveToMaxTurnVector = function(){
	var pos = this.getPlannedPos();
	var dist = this.getRemainingDelay();
	var impulse = this.getRemainingImpulse();
	var goal = getPointInDirection(dist, this.getPlannedFacing(), pos.x, pos.y);
	this.issueMove(goal, dist);
}	

Ship.prototype.moveToMaCutVector = function(){
	var pos = this.getPlannedPos();
	var dist = this.getRemainingDelay();
	var impulse = this.getRemainingImpulse();
	var goal = getPointInDirection(dist, this.getPlannedFacing(), pos.x, pos.y);
	this.issueMove(goal, dist);
}

Ship.prototype.canTurn = function(){
	if (this.disabled){return false;}
	if (this.getRemainingDelay() == 0){
		var min = 5;
		var have = this.getRemainingEP();
		var need = this.getTurnCost() * min;
		if (have >= need){
			return true;
		}
	}
	return false;
}
	
Ship.prototype.switchTurnMode = function(){
	this.turnMod = 1;
	if (game.turnMode){
		turn.reset();
		game.turnMode = 0;
		this.setTempEW();
		this.drawEW();
		mouseCtx.clearRect(0, 0, res.x, res.y);
		$("#epButton").addClass("disabled");
	}	
	else {
		game.turnMode = 1;
		this.setTempEW();
		turn.set(this);
		$("#epButton").removeClass("disabled");
	}
	this.setTurnData();
}

Ship.prototype.setTempEW = function(){;
	if (game.turnMode){
		this.getSystemByName("Sensor").drawTempEW(drawCtx);
	}
	else {
		salvoCtx.clearRect(0, 0, res.x, res.y);
		this.getSystemByName("Sensor").img = undefined;
	}
}

Ship.prototype.handleTurning = function(e, o, f, pos){
	var t = {x: e.clientX - offset.x, y: e.clientY - offset.y};
	var max = this.getMaxTurnAngle();
	var a =  getAngleFromTo(o, pos);
		a = (addAngle(f, a));

	if (a > 180){a = (360-a) *-1;}

	//console.log(a)
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
		salvoCtx.setTransform(1, 0, 0, 1, 0, 0);
	}

	a = Math.min(Math.abs(a), max);
	turn.a = a;
	var c = this.getTurnCost() * a;
	$("#epButton").css("top", t.y + 75).css("left", t.x - 70).find("#impulseCost").html(Math.ceil(c, 2) + " : " + Math.floor(this.getRemainingEP() - c));

	this.drawDelay();
	this.drawMouseVector(o, t);
}

Ship.prototype.drawMouseVector = function(o, t){
	mouseCtx.beginPath();
	mouseCtx.moveTo(o.x * cam.z + cam.o.x, o.y * cam.z + cam.o.y);
	mouseCtx.lineTo(t.x, t.y);
	mouseCtx.closePath();
	mouseCtx.strokeStyle = "white";
	mouseCtx.lineWidth = 1;
	mouseCtx.stroke();
}

Ship.prototype.handleTurnAttempt = function(dest){
	var origin = this.getPlannedPos();
	var a = getAngleFromTo(origin, dest);
		a = addAngle(this.getPlannedFacing(), a);
	if (a > 180){a -= 360;}
	var max = this.getMaxTurnAngle();

	if (isInArc(getCompassHeadingOfPoint(origin, dest, 0), this.turnAngles.start, this.turnAngles.end)){
		if (Math.abs(a) >= 2){
			this.issueTurn(a);
		}
	} else if (a < 0){
		this.issueTurn(-max);
	} else this.issueTurn(max);
}

Ship.prototype.issueTurn = function(a){
	if (this.actions.length && this.actions[0].type == "deploy" && this.actions[0].turn == game.turn && this.actions[0].resolved == 0){
		this.actions[0].a += Math.round(a);
		if (this.actions[0].a > 360){
			this.actions[0].a -= 360;
		} else if (this.actions[0].a < 0){this.actions[0].a += 360;}
		console.log(this.actions[0].a);
		this.drawFacing = this.actions[0].a;
		//this.facing = this.actions[0].a;
		game.redraw()
	}
	else {
		var o = this.getPlannedPos();
		if (this.getRemainingImpulse() == 0){
			while (this.canShortenTurn()){
				this.doShortenTurn();
			}
		}
		this.actions.push(
			new Move(-1, "turn", 0, o.x, o.y, 
				Math.round(a),
				Math.ceil(this.getTurnDelay()*Math.abs(a)),
				Math.ceil(this.getTurnCost()*Math.abs(a)),
				round(turn.mod, 1), 1, 0
			)
		);
		this.setRemainingDelay();
		//console.log(this.actions[this.actions.length-1]);
		$("#turnButton")
			.find("#turnCost").html("").end()
			.find("#turnDelay").html("");
		//this.setMoveMode();
		game.redraw();
		//game.drawShipOverlays();
	}
}

Ship.prototype.switchModeAll = function(id){
	var system = this.getSystemById(id);
	var name = system.getActiveSystem().name;

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].dual && !this.structures[i].systems[j].locked){
				if (this.structures[i].systems[j].getActiveSystem().name == name){
					this.structures[i].systems[j].switchMode(id);
				}
			}
		}
	}
}

Ship.prototype.getProfileMod = function(){
	return Math.floor((1+((((this.getBaseImpulse() / this.getCurrentImpulse())-1)/3)))*100);
}

Ship.prototype.canBoost = function(system){
	if (system.disabled || system.destroyed){
		return false;
	}
	else if (system instanceof Weapon && !system.disabled && !system.destroyed && (system.getLoadLevel() >= 1 || system.getBoostEffect("Reload") && system.getLoadLevel() < 1)){
		if (system instanceof Launcher){
			if (system.getOutput() < system.getMaxoutput()){
				if (system.getRemainingAmmo() > system.getOutput()){
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
	game.mode = 1;
	turn.set(this);
	this.setTurnData();
	this.setMoveTranslation();
	//this.drawTurnGUI();		
	//this.drawMoveArea();
	//this.drawVectorIndicator();


	if (game.phase == -1 && (this.available == game.turn && game.turn == 1|| this.id < 0)){
		this.drawTurnUI();
		this.drawTurnArcs();
	}
	else if (game.phase == 0){
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
	$("#maxVector").addClass("disabled");
	$("#maxTurnVector").addClass("disabled");
	$("#maxCutVector").addClass("disabled");
	$("#plusImpulse").addClass("disabled");
	$("#minusImpulse").addClass("disabled");
	$("#undoLastAction").addClass("disabled");
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
	$("#weaponAimTableWrapper").hide();

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
			for (var k = 0; k < this.structures[i].systems[j].powers.length; k++){
				if (this.structures[i].systems[j].powers[k].new){
					powers.push(this.structures[i].systems[j].powers[k]);
				}
			}
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
			if (this.actions[i].type == "deploy" || this.actions[i].type == "jump"){
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
	this.drawX = this.actions[this.actions.length-1].x;
	this.drawY = this.actions[this.actions.length-1].y;
}

Ship.prototype.setDrawData = function(){
	if (this.available > game.turn || !this.available || game.turn == 1 && game.phase == -1){
		if (this.friendly && this.isReady){
			this.setPostMovePosition();
			this.setPostMoveFacing();
			return;
		}
	}
	
	if (game.phase > 2){
		this.setPostMovePosition();
		this.setPostMoveFacing();
	}
	else if (game.phase == 1){
		this.setPreMovePosition();
		this.setPreMoveFacing();
	}
	else {
		this.setPreMovePosition();
		if (this.ship || this.squad){
			this.setPreMoveFacing();
		}
	}
}

Ship.prototype.setUnitGUI = function(){
	var id = this.id;
	$("#unitGUI").find("img").each(function(){
		if ($(this).data("id") == id){
			$(this).toggleClass("selected"); return;
		}
	});
	$(this.element).toggleClass("selection");
}

Ship.prototype.getArmourString = function(a){
	for (var i = 0; i < this.structures.length; i++){
		if (isInArc(a, this.structures[i].start, this.structures[i].end)){
			return (this.structures[i].getArmourString());
			//return (this.structures[i].remainingNegation + " / " + this.structures[i].negation);
		}
	}
}

Ship.prototype.getSectionString = function(a){
	for (var i = 0; i < this.structures.length; i++){
		if (isInArc(a, this.structures[i].start, this.structures[i].end)){
			return (this.structures[i].type);
		}
	}
}

Ship.prototype.drawMovePlan = function(){
	//console.log("draw moves for #" + this.id);
	if (!this.actions.length || this.actions[this.actions.length-1].resolved){
		return;
	}
	else {
	//else if (true){
		this.setMoveTranslation();

		planCtx.strokeStyle = "#00ea00";
		if (!this.friendly){
			planCtx.strokeStyle = "red";
		}
		var i;
		for (i = 0; i < this.actions.length; i++){
			if (this.actions[i].turn == game.turn){
				var action = this.actions[i];
				planCtx.beginPath();
				
				if (i == 0){
					var p = this.getGamePos();
					planCtx.moveTo(p.x, p.y);
				}
				else {
					planCtx.moveTo(this.actions[i-1].x, this.actions[i-1].y);
				}
							
				if (action.type == "move"){
					planCtx.lineTo(action.x, action.y);
					planCtx.closePath();
					planCtx.stroke();
				}
				else if (action.type == "turn"){
					var angle = this.getPlannedFacing(i);
					
					planCtx.beginPath();
					planCtx.arc(action.x, action.y, 3, 0, 2*Math.PI, false);
					planCtx.stroke();
				}
				
				planCtx.closePath();
			}
		}
		planCtx.strokeStyle = "black";
		this.drawPlanMarker();
		this.resetMoveTranslation();
	}
}

Ship.prototype.getShortInfo = function(){
	var ele = $("#shortInfo");
	if (this.userid == game.userid){
		$(ele).attr("class", "friendly");
	} else $(ele).attr("class", "hostile");

	var impulse = this.getCurrentImpulse();

	var table = document.createElement("table");
		table.insertRow(-1).insertCell(-1).innerHTML = this.name + " #" + this.id + " (" +game.getUnitType(this.traverse) + ")";
		table.insertRow(-1).insertCell(-1).innerHTML =  "Thrust: " + impulse + " (" + round(impulse / this.getBaseImpulse(), 2) + ")";
		table.insertRow(-1).insertCell(-1).innerHTML = this.getStringHitChance();
	return table;
}

Ship.prototype.getStringHitChance = function(){
	var baseHit = this.getBaseHitChance();
	return ("Base Hit: " + Math.floor(this.profile[0] * baseHit) + "% - " + Math.floor(this.profile[1] * baseHit) + "%");
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
	//if (game.animating){return;}
	if (!this.selected){
		this.doSelect();
	} else this.switchDiv();
}

Ship.prototype.doSelect = function(){
	console.log(this);
	aUnit = this.id;
	this.selected = true;
	this.setUnitGUI();
	game.setShipTransform();
	this.drawPositionMarker();
	game.resetShipTransform();
	this.switchDiv();
	game.drawMixedMoves();
	if (this.ship || this.squad){this.setMoveMode();}
}

Ship.prototype.doUnselect = function(){
	this.unselectSystems();
	aUnit = false;
	this.selected = false;
	this.setUnitGUI();
	if (game.deploying){game.disableDeployment();}
	else if (game.flightDeploy){game.flightDeploy = false;}
	else if (game.mission){this.disableMissionMode()}
	//game.setShipTransform();
	//this.drawPositionMarker();
	//game.resetShipTransform();
	game.redraw();
	//game.drawShipOverlays();
	this.switchDiv();
	this.unsetMoveMode();
	$("#hangarLoadoutDiv").addClass("disabled");
	$("#popupWrapper").hide()
	$("#instructWrapper").hide()
	$("#systemDetailsDiv").remove();
	mouseCtx.clearRect(0, 0, res.x, res.y);
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
	return;
}

Ship.prototype.create = function(){
	this.setHitTable();

	if (game.turn > 1 && game.phase == -1 &&this.available == game.turn){
		this.x = this.actions[0].x;
		this.y = this.actions[0].y;
		this.drawX = this.actions[0].x;
		this.drawY = this.actions[0].y;
	}
}

Ship.prototype.setSize = function(){
	return;
}

Ship.prototype.setLayout = function(){
	return;
}

Ship.prototype.setImage = function(){
	//console.log("Ship setImage");
	this.img = window.shipImages[this.name.toLowerCase()];
	return;
}

Ship.prototype.finishDeployLogEntry = function(html){
	$("#combatLog").find("tbody")
		.append($("<tr>")
			.append($("<td>").html(html))
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
		);
}

Ship.prototype.createDeployEntry = function(){
	var color = "#ff3d00";
	if (this.friendly){color = "#27e627";}
	var html = "<span><font color='" + color + "'>" + this.name + " #" + this.id + "</font> jumps into local space.</span>";
	this.finishDeployLogEntry(html);
}


Ship.prototype.animateSelfDeployment = function(){
	if (this.deployAnim[0] == this.deployAnim[1]){
		this.deployed = 1;
		this.isReady = 1;
		this.drawSelf();
		ctx.rotate(-this.getDrawFacing() * Math.PI/180);
		ctx.translate(-this.drawX, -this.drawY);
		this.createDeployEntry();
		return;
	}

	this.deployAnim[0] += 1;

	var fraction = this.deployAnim[0] / this.deployAnim[1];
	var sin = Math.sin(Math.PI*fraction);

	drawCircle(this.drawX, this.drawY, this.size*0.55*sin, "source-over", "blue");
	drawCircle(this.drawX, this.drawY, this.size*0.2*sin/2, "lighter", "lightBlue");

	if (fraction >= 0.3){
		ctx.globalAlpha = fraction;
		this.drawSelf();
		ctx.globalAlpha = 1;
		ctx.rotate(-this.getDrawFacing() * Math.PI/180);
		ctx.translate(-this.drawX, -this.drawY);
	}
}

Ship.prototype.draw = function(){
	if (!this.doDraw){return;}

	if (this.isReady){
		//console.log("draw #" + this.id);
	 	this.drawPositionMarker();
		this.drawSelf();
		this.drawEscort();
	}
}

Ship.prototype.drawPositionMarker = function(){
	var color = "";
	if (this.selected){color = "yellow"}
	else if (this.friendly){color = "#27e627";}
	else {color = "red";}
	this.drawMarker(this.drawX, this.drawY, color, ctx);
}

Ship.prototype.drawSelf = function(){
	ctx.translate(this.drawX, this.drawY);
	ctx.rotate(this.getDrawFacing() * Math.PI/180);

	ctx.drawImage(this.img, -this.size/2, -this.size/2, this.size, this.size);
}

Ship.prototype.drawEscort = function(){
	if (this.cc.length && this.drawImg != undefined){
		var s = this.drawImg.width/2;
		ctx.drawImage(this.drawImg, -s/2, -s/2, s, s);
	}
	ctx.rotate(-this.getDrawFacing() * Math.PI/180);
	ctx.translate(-this.drawX, -this.drawY);
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
	context.lineWidth = 1 + Math.floor(this.selected*2);
	context.globalAlpha = 0.8;
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
	return this.getCurrentImpulse() / this.getBaseImpulse();
}


Ship.prototype.getBaseHitChance = function(){
	return this.baseHitChance;
}

Ship.prototype.getAngledHitChance = function(angle){
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
		lookup += fire.hits[i] * fire.weapon.getDmgsPerShot();
	}

	if (!lookup){
		return dmgs;
	}

	for (var i = this.primary.damages.length-1; i >= 0; i--){
		if (this.primary.damages[i].fireid == fire.id){					
			dmgs.push(this.primary.damages[i]);
			dmgs[dmgs.length-1].system = "Main Structure";
			dmgs[dmgs.length-1].loc = this.getSystemLocation(-1);
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
				dmgs[dmgs.length-1].system = this.primary.systems[i].display
				dmgs[dmgs.length-1].loc = this.getSystemLocation(-1);
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
					dmgs[dmgs.length-1].loc = this.getSystemLocation(i);
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

Ship.prototype.getSystemLocation = function(i){
	if (i == -1){
		return getPointInDirection(this.size/6, this.getDrawFacing()+range(0, 359), 0, 0);
	}
	var p = getPointInDirection(this.size/4, getArcDir(this.structures[i]) + this.getDrawFacing(), 0, 0);
		p.x += range(-5, 5);
		p.y += range(-5, 5);
	return p;
}

Ship.prototype.canDeploy = function(){
	if (this.userid == game.userid && (game.turn == 1 || this.id < 0)){
		return true;
	}
	return false;
}

Ship.prototype.getWeaponOrigin = function(id){
	for (var i = 0; i < this.structures.length; i++){
		if (i == this.structures.length-1 || id > this.structures[i].id && id < this.structures[i+1].id){
			var devi = this.size / 6;
			return getPointInDirection(this.size/3 + range (-devi, devi), (getArcDir(this.structures[i]) + this.getDrawFacing()), 0, 0);
		}
	}
	console.log("lacking gun origin");
	return this.getSystemById(id);
}

Ship.prototype.resetMoveMode = function(){
	var turn = game.turnMode;
	this.unsetMoveMode();
	this.setMoveMode();
	if (turn && this.canTurn()){
		this.switchTurnMode();
	}
}

Ship.prototype.getCurrentImpulse = function(){
	if (game.phase >= 1 && (this.ship || this.squad)){return this.currentImpulse;}
	var step = this.getImpulseStep();
	var amount = 0;
	for (var i = 0; i < this.actions.length; i++){
		if (this.actions[i].type != "speed"){continue;}
		amount += this.actions[i].dist;
	}
	return this.currentImpulse + step*amount;
}

Ship.prototype.getRemainingImpulse = function(){
	if (game.phase >= 1 && (this.ship || this.squad)){return 0;}	
	var impulse = this.getCurrentImpulse();
	for (var i = 0; i < this.actions.length; i++){
		if (this.actions[i].turn == game.turn){
			if (this.actions[i].type == "move"){
				impulse -= this.actions[i].dist;
			}
		}
	}
	return impulse;
}

Ship.prototype.getFireDest = function(fire, isHit, num){
	if (!isHit){
		return {
			x: ((this.size/2 + (range (0, this.size/6))) * (1-(range(0, 1)*2))),
			y: ((this.size/2 + (range (0, this.size/6))) * (1-(range(0, 1)*2)))
		}
	}
	return fire.damages[num].loc;
}

Ship.prototype.getExplosionSize = function(j){
	return this.size;
}

Ship.prototype.setMoveAngles = function(){
	var angle = this.getPlannedFacing();
	var slipAngle = this.getSlipAngle();	
	this.moveAngles = {start: addAngle(0 + slipAngle, angle), end: addAngle(360 - slipAngle, angle)};
}

Ship.prototype.drawMoveArea = function(){
	//moveCtx.clearRect(0, 0, res.x, res.y);
	this.setMoveAngles();

	if (this.moveAngles.start + this.moveAngles.end == 360){
		//return;
	}

	var center = this.getPlannedPos();	
	var rem = this.getRemainingImpulse();
	var p1 = getPointInDirection(rem, this.moveAngles.start, center.x, center.y);
	var dist = getDistance( {x: center.x, y: center.y}, p1);
	var rad1 = degreeToRadian(this.moveAngles.start);
	var rad2 = degreeToRadian(this.moveAngles.end);
	var delay = this.getRemainingDelay();

	
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

		if (delay > 5 && this.canMaxCut()){
			delay = Math.round(delay/2);
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
		var p = getPointInDirection(rem, this.moveAngles[i], center.x, center.y);
		moveCtx.beginPath();
		moveCtx.moveTo(center.x, center.y);
		moveCtx.lineTo(p.x, p.y);
		moveCtx.closePath();
		moveCtx.strokeStyle = "white"
		moveCtx.stroke();
	}
}

Ship.prototype.getEP = function(){
	var ep = 0;

	for (var i = 0; i < this.primary.systems.length; i++){
		if (this.primary.systems[i].name == "Engine"){
			ep += this.primary.systems[i].getOutput();
		}
	}

	return ep;
}

Ship.prototype.getRemainingEP = function(){
	var ep = this.getEP();
	
	for (var i = 0; i < this.actions.length; i++){
		if (this.actions[i].turn == game.turn){
			if (this.actions[i].cost != 0){
				ep -= this.actions[i].cost// * this.actions[i].costmod;
			}
		}
	}
	
	return Math.floor(ep);
}

Ship.prototype.getRemainingDelay = function(){
	var delay = this.remainingDelay;
	for (var i = 0; i < this.actions.length; i++){
		if (this.actions[i].type == "turn"){
			//delay += Math.ceil(this.actions[i].delay/this.actions[i].costmod);
			delay += this.actions[i].delay;
		}
		else if (this.actions[i].type == "move"){
			delay = Math.max(0, delay - this.actions[i].dist);
		}
	}
	return Math.ceil(delay);
}	

Ship.prototype.getRemainingDelaya = function(){
	return this.remainingDelay;
}

Ship.prototype.setRemainingDelay = function(){
	return;
	if (this.actions[this.actions.length-1].type == "move"){
		this.remainingDelay = Math.max(0, Math.max(this.remainingDelay - this.actions[this.actions.length-1].dist), this.actions[this.actions.length-1].delay);
	}
	else if (this.actions[this.actions.length-1].type == "turn"){
		this.remainingDelay = Math.max(0, this.remainingDelay + this.actions[this.actions.length-1].delay);
	}
}

Ship.prototype.getNextPosition = function(){
	return this.getPlannedPos();
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
				return getPointInDirection(range(-size/3, size / 3), a, 0, 0);
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

Ship.prototype.createBaseDiv = function(){
	var owner = "friendly";
	if (game.phase > -2 && this.userid != game.userid){owner = "hostile";}
	var div = document.createElement("div");
		div.className = "shipDiv " + owner;
		$(div).data("shipId", this.id);

	this.element = div;

	var subDiv = document.createElement("div");
		subDiv.className = "header";
	
	var table = document.createElement("table");
		table.className = "general";

	var header = "red";
	if (this.friendly){header = "green";}

	$(table)
		.append($("<tr>")
			.append($("<th>").html(this.name.toUpperCase() + " #" + this.id).attr("colSpan", 2).addClass(header)))
		.append($("<tr>")
			.append($("<td>").html("Classification"))
			.append($("<td>").html(game.getUnitType(this.traverse))))
		.append($("<tr>")
			.append($("<td>").html("Thrust"))
			.append($("<td>").html(this.getRemainingImpulse() + " / " + this.getCurrentImpulse()).addClass("Thrust")))
		.append($("<tr>")
			.append($("<td>").html("Engine Power:"))
			.append($("<td>").html(this.getRemainingEP() + " / " + this.getEP()).addClass("ep")))
		.append($("<tr>")
			.append($("<td>").html("Thrust Change:"))
			.append($("<td>").html(this.getImpulseChangeCost() + " EP").addClass("change")))
		.append($("<tr>")
			.append($("<td>").html("Turn Cost per 1"))
			.append($("<td>").html(round(this.getTurnCost(), 2) + " EP")))
		.append($("<tr>")
			.append($("<td>").html("Turn Delay per 1"))
			.append($("<td>").html(round(this.getTurnDelay(), 2) + " px")))
		.append($("<tr>")
			.append($("<td>").html("Active Turn Delay"))
			.append($("<td>").html(this.getRemainingDelay()).addClass("delay")))
			
	subDiv.appendChild(table);
	div.appendChild(subDiv);

	$(this.expandDiv(div))
		//.addClass("disabled")
		.drag()
		.find(".structContainer")
			.contextmenu(function(e){e.stopPropagation(); e.preventDefault()})
			.end()
		.find(".header")
			.contextmenu(function(e){
				e.stopImmediatePropagation(); e.preventDefault();
				$(this).parent().find($(".structContainer")).toggle();
			})
			.end()
		.find(".iconContainer")
			.contextmenu(function(e){
				e.stopImmediatePropagation(); e.preventDefault();
				if ($(this).parent().data("shipId") != aUnit){
					game.zIndex--;
					$(this).parent().addClass("disabled");
				}
			})


	if (game.phase == 2){
		$(div).find(".structContainer").show();
	}
}

Ship.prototype.expandDiv = function(div){
	$(div)
	.append($("<div>")
		.addClass("iconContainer")
			.append($(window.shipImages[this.name.toLowerCase()].cloneNode(true)).addClass("rotate270").addClass("size90"))
			.hover(function(e){
				if (aUnit){
					var shooter = game.getUnit(aUnit);
					var target = game.getUnit($(this).parent().data("shipId"));
					if (shooter.id != target.id && shooter.hasWeaponsSelected()){
						handleWeaponAimEvent(shooter, target, e);
					}
				}
			}).
			click(function(e){
				var shooter = game.getUnit(aUnit);
				var target = game.getUnit($(this).parent().data("shipId"));
				if (shooter && target){
					if (target.id != shooter.id && (target.userid != game.userid && target.userid != shooter.userid)){
						handleFireClick(shooter, target);
					} else target.switchDiv();
				}
			}));
			
		
	//document.getElementById("game").appendChild(div);
	document.body.appendChild(div);
	$(div).css("position", "absolute").css("top", 300);

	structContainer = document.createElement("div");
	structContainer.className = "structContainer";
	div.appendChild(structContainer);

	var noFront = true;
	var noAft = true;
	var sides = 0;

	for (var i = 0; i < this.structures.length; i++){
		this.structures[i].direction = getArcDir(this.structures[i]);
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

	var maxWidth = 0;
	if (this.structures.length <= 4){
		if (this.structures[1].systems.length > 4){
			maxWidth = 320;
		}
		else if (this.structures[1].systems.length  < 4){
			maxWidth = 280;
		} else maxWidth = 300;
	}
	else {
		maxWidth = 340;
	}

	$(div).css("width", maxWidth);


	var conWidth = $(structContainer).width();
	var conHeight = $(structContainer).height();

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
				var modeDiv =this.primary.systems[i].getModeDiv();
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
	}

	primaryDiv.appendChild(primaryTable);
	structContainer.appendChild(primaryDiv);
	var w = $(primaryDiv).width();
	var h = $(primaryDiv).height();
	var primX = conWidth/2 - w/2;
	var primY = conHeight/2 - h/2 + offsetY
	$(primaryDiv)
		.css("left", primX)
		.css("top", primY);

	$(structContainer).append($("<div>").addClass("mainPower").html(this.getSystemByName("Reactor").getOutput()));


	// OUTER STRUCTS
	for (var i = 0; i < this.structures.length; i++){

		var structDiv = document.createElement("div");
			structDiv.className = "structDiv";
		structContainer.appendChild(structDiv);
			
		var structTable = document.createElement("table");
			structTable.className = "structTable";
		structDiv.appendChild(structTable);


		var armour = this.structures[i].getTableData();

		if ((game.phase == -1) &&  this.structures[i].getBoostEffect("Armour")){
			{armour.appendChild(this.structures[i].getBoostDiv())};
		}

		var tr = document.createElement("tr");
			tr.appendChild(armour);
		structTable.appendChild(tr);


		var col = 0;
		var colWidth = 1;
		var max;
		var a = this.structures[i].direction; if (a == 360){a = 0;}
		var w;
		var maxRow = 0;

		if (a == 0 || a == 180){ // front or aft
			if (a == 180){
				max = Math.min(6, this.structures[i].systems.length);
			}
			else if (this.structures[i].systems.length % 4 == 0){
				max = 4;
			}
			else if (this.structures[i].systems.length % 4 == 3){
				max = 3;
			}
			else if (this.structures[i].systems.length % 3 == 0){
				max = 6;
			}
			else {
				max = 5;
			}
		}
		else { // sides
			if (sides > 1){
				max = 2;
			}
			else if (this.structures[i].systems.length <= 3){
				max = 1;
			}
			else {
				if (this.structures[i].systems.length <= 4 && noFront){
					max = 1;
				}
				else {
					max = 2;
				}
			}
		}

		//max = Math.min(max, this.structures[i].systems.length)

		var outerFill = 0; // front / aft, make a wider system in a single row
		var innerFill = 0;
		if (a == 0 || a == 180){
			if (this.structures[i].getBoostEffect("Armour") && this.structures[i].systems.length < 3){
				max = 2;
				innerFill = 1;
			}
			else if (this.structures[i].systems.length == 1 || this.structures[i].systems.length == 2 && this.structures[i].systems[0].name != this.structures[i].systems[1].name){
				max = 3;
				outerFill = 1;
			}
		}

		if (max == 1){
			if (this.structures[i].getBoostEffect("Armour")){
				structTable.childNodes[0].childNodes[0].style.height = "45px";
				structTable.childNodes[0].childNodes[0].style.width = "40px";
			} 
			else {
				structTable.childNodes[0].childNodes[0].style.height = "60px";
			}
		}
		else if (max == 2 && !innerFill){
			if (this.structures[i].getBoostEffect("Armour")){
				structTable.childNodes[0].childNodes[0].style.height = "45px";
			} 
			else {
				structTable.childNodes[0].childNodes[0].style.height = "25px";
			}
		}
		else {
			structTable.childNodes[0].childNodes[0].style.height = "25px";
		}

		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (col == 0){
				tr = document.createElement("tr");
				//structTable.appendChild(tr);
				if (this.structures[i].systems.length - j != max){
					if ((this.structures[i].systems.length - j) *2 == max){
						colWidth = 2;
					}
				}
			}

			if (outerFill){
				tr.insertCell(-1).className ="emptySystem"; col++;
			}
			else if (innerFill && (j == Math.floor(this.structures[i].systems.length / 2))){
				tr.insertCell(-1).className ="emptySystem"; col++;
			}

			var td = this.structures[i].systems[j].getTableData(false);
				td.colSpan = colWidth;
				td = this.attachEvent(td);

			col++;
			tr.appendChild(td);

			if (this.id > 0 || game.turn == 1){
				var boostDiv = this.structures[i].systems[j].getBoostDiv();
				if (boostDiv){td.appendChild(boostDiv);}

				var powerDiv = this.structures[i].systems[j].getPowerDiv();
				if (powerDiv){
					//console.log($(powerDiv).width());
					td.appendChild(powerDiv);}

				var modeDiv = this.structures[i].systems[j].getModeDiv();
				if (modeDiv){td.appendChild(modeDiv);}
			}

			if (this.structures[i].systems[j].dual && !this.structures[i].systems[j].effiency){
				$(td).find(".outputMask").hide();
			}

			if (outerFill){
				tr.insertCell(-1).className ="emptySystem"; col++;
			}

			if (col == max || j == this.structures[i].systems.length-1){
				structTable.appendChild(tr);
				if (maxRow < col){
					maxRow = col;
				}
				col = 0;
			}

			$(structTable).find(".armour").attr("colSpan", maxRow);


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
		else if (a == 60 || a == 300 || noAft){
			if (sides > 1){offsetX += 10;}
			else offsetX += 20;
		}
		
		var pos = getPointInDirection(135 - offsetX, a-90, conWidth/2, conHeight/2-40);
		var w = $(structDiv).width();
		var h = $(structDiv).height();

		// STRUCT Y
		if (noFront){
			offsetY -= 60;
		}

		if (a == 0){
			if (!noAft && this.structures[i].systems.length <= 3){
				offsetY += 10;
			} else if (outerFill){
				offsetY -= 10;
				$(primaryDiv).css("top", (primY + 20));
			}
		}
		else if (noAft){
			if (sides > 1){ // Octurion
			} else offsetY -= 60 + this.structures.length*12;
		}
		else if (a == 180){
			if (noFront){offsetY += 20;}
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

	$(structContainer).css("height", Math.max($(primaryDiv).position().top + $(primaryDiv).height(), height) + 20);

	/*
	var w = $(div).width();
	var h = $(div).height();
	var left = 50;
	if (this.facing < 90 || this.facing > 270){
	left = res.x - w - 50;
	}
	var x = this.x +cam.o.x - w/2;
	var y = this.y +cam.o.y + 150;

	$(div).css("left", x).css("top", y);
	*/	


	//if (this.id == 10){
		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].systems.length; j++){
				var s = $(this.structures[i].systems[j].element)
				var w = s.width();
				var h = s.height();

				s
				.find(".boostDiv").css("left", -14).css("top", -4).end()
				.find(".powerDiv").css("left", w-2).css("top", -4).end()
				.find(".modeDiv").css("left", w/2 - 9).css("top", h);

			}
		}
		//console.log($(this.structures[3].systems[0].element).width());
	//}

	$(div).addClass("disabled");
	return div;
}

Ship.prototype.doOffset = function(){
	if (this.ship || this.squad){return;}
	if (!this.doDraw){return;}
	//console.log("doOffset #" + this.id);
	var o = this.getPlannedPos();
	var t = this.getTarget();
	var a = 0;
	if (t){
		a = getAngleFromTo(o, this.getTarget().getPlannedPos());
	} else a = range(0, 360);
	
	var p = getPointInDirection(Math.max(25, this.size/3), a, o.x, o.y);

	this.drawX = p.x;
	this.drawY = p.y;

	for (var i = 0; i < this.cc.length; i++){
		var s = game.getUnit(this.cc[i]);
			s.drawX = p.x;
			s.drawY = p.y;
	}
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

			for (var i = 0; i < attach.length; i++){
				if (attach[i].ship || attach[i].squad){continue;}

				//if (this.flight){
				//	console.log("ding");
				//}
				ccContainer = attach[i].supplyAttachDiv(ccContainer);
			}

			$(this.element).append(ccContainer);
		}

	}
}

Ship.prototype.previewSetup = function(){
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].loadout){
				$(this.structures[i].systems[j].element).addClass("bgYellow");
			}
		}
	}
}

Ship.prototype.updateDiv = function(){
	$(this.element)
		.find(".pos").html(this.x + " / " + this.y).end()
		.find(".thrust").html(this.getRemainingImpulse() + " / " + this.getCurrentImpulse()).end()
		.find(".ep").html(this.getRemainingEP() + " / " + this.getEP()).end()
		.find(".delay").html(this.getRemainingDelay()).end()
		.find(".change").html(this.getImpulseChangeCost() + " EP").end()			
		.find(".turn").html(this.getImpulseChangeCost() + " EP").end()
}

Ship.prototype.detachFlight = function(id){
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

Ship.prototype.attachFlight = function(unit){
	$(this.element).find(".ccContainer").remove();
	this.cc.push(unit.id);
	for (var i = 0; i < unit.cc.length; i++){
		this.cc.push(unit.cc[i]);
	}
	unit.cc.push(this.id);
	this.getAttachDivs();
}

Ship.prototype.setPostFireImage = function(){
	if (this.ship || this.squad){return;}
	console.log("setPostFireImage");
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].draw && (this.structures[i].destroyed || this.structures[i].disabled)){
			this.structures[i].draw = 0;
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
	return window.shipImages[this.name.toLowerCase()];
}

Ship.prototype.setDogFightImage = function(){
	//console.log("setDogFightImage " + this.id);
	if (!this.flight){return;}
	this.doDraw = 1;
	this.setPatrolLayout();
	this.setPatrolImage();
}

Ship.prototype.setSupportImage = function(){
	//console.log("setSupportImage #" + this.id);
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
			if (!u.structures[j].draw){;continue;}
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
		
		var split = Math.floor(360/friendly.length+1);

		//ctx.rotate(rota*(Math.PI/180));
		for (var i = 0; i < friendly.length; i++){
			var a = split*i + drawFacing;
			var drawPos = getPointInDirection(size+tresh - fSize/2, a, 0, 0);
			//var aPos = getPointInDirection(size/2+tresh - fSize/2, a, 0, 0);
			//console.log(a); 
			//console.log("figher at " +(this.drawX+pos.x)+"/"+(this.drawY + pos.y));
			friendly[i].layout = drawPos;
			ctx.translate(drawPos.x, drawPos.y);
			ctx.rotate((a+90)*(Math.PI/180));
			ctx.drawImage(
				window.shipImages[friendly[i].name.toLowerCase()],
				-fSize/2,
				-fSize/2,
				fSize, 
				fSize
			);
			ctx.rotate(-((a+90)*(Math.PI/180)));
			ctx.translate(-drawPos.x, -drawPos.y);

		}
		//ctx.rotate(-rota*(Math.PI/180));
		ctx.translate(-t.width/2, -t.height/2);
		tresh *= 2
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
		
		var split = Math.floor(360/hostile.length+1)

		for (var i = 0; i < hostile.length; i++){
			var a = split*i + drawFacing;
			var drawPos = getPointInDirection(size+tresh - fSize/2, a, 0, 0);
			//var aPos = getPointInDirection(size/2+tresh - fSize/2, a, 0, 0);
			//console.log(a); 
			//console.log("figher at " +(this.drawX+pos.x)+"/"+(this.drawY + pos.y));
			hostile[i].layout = drawPos;
			ctx.translate(drawPos.x, drawPos.y);
			ctx.rotate((a-90)*(Math.PI/180));
			ctx.drawImage(
				window.shipImages[hostile[i].name.toLowerCase()],
				-fSize/2,
				-fSize/2,
				fSize, 
				fSize
			);
			ctx.rotate(-((a-90)*(Math.PI/180)));
			ctx.translate(-drawPos.x, -drawPos.y);

		}
		ctx.translate(-t.width/2, -t.height/2);
	}

	this.drawImg = t;
	ctx.setTransform(1,0,0,1,0,0);
}

Ship.prototype.animationSetupMove = function(){
	this.setPreMovePosition();
	this.setPreMoveFacing();
}

Ship.prototype.getLockEffect = function(target){
	var sensor = this.getSystemByName("Sensor");
	var ew = sensor.getEW();
	if (sensor.disabled || sensor.destroyed || ew.type == 1){return 0;}

	var tPos = target.getGamePos();
	var origin = this.getGamePos();
	var d = getDistance(origin, tPos);
	var multi = 0;

	if (target.ship || target.squad){
		multi = 0.5;
		multi += (multi / 10 * this.traverse);
	}
	else if (target.flight){
		multi = 1.5;
	}
	else if (target.salvo){
		multi = 1;
	}	

	if (d == 0 && game.isCloseCombat(this, target) && this.isInEWArc(origin, target.getTrajectory(), sensor, ew)){
		if (target.salvo){
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
	if (this.flight || this.salvo || shooter.flight | shooter.salvo){return 0;}

	var sensor = this.getSystemByName("Sensor");
	var ew = sensor.getEW();
	if (sensor.disabled || sensor.destroyed || ew.type == 0){return 0;}

	var tPos = shooter.getGamePos();
	var origin = this.getGamePos();
	var d = getDistance(origin, tPos);
	var multi = 0;

	if (shooter.ship || shooter.squad){
		multi = 0.5;
		multi += (multi / 10 * this.traverse);
	}
	else if (shooter.flight){
		return 0;
	}
	else if (shooter.salvo){
		multi = 0.33;
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
	if (this.ship || this.squad){
		this.getSystemByName("Sensor").drawEW();
	}
}

Ship.prototype.drawMoveLength = function(){
	if (this.selected){return;}
	mouseCtx.translate(cam.o.x, cam.o.y);
	mouseCtx.scale(cam.z, cam.z);

	var center = this.getPlannedPos();
	var angle = this.getPlannedFacing();
	var p = getPointInDirection(this.getCurrentImpulse(), angle, center.x, center.y);
	
	mouseCtx.beginPath();			
	mouseCtx.moveTo(center.x, center.y);
	mouseCtx.lineTo(p.x, p.y);
	mouseCtx.closePath();
	mouseCtx.lineWidth = .5;
	mouseCtx.strokeStyle = "white";
	mouseCtx.stroke();
	mouseCtx.strokeStyle = "black";

	mouseCtx.setTransform(1,0,0,1,0,0);
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

Ship.prototype.getSystemById = function(id){
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
					this.structures[i].systems[j].drawArc(angle, pos);
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
					this.structures[i].systems[j].drawArc(angle, pos);
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
		weapon.drawArc(angle, shipPos);
	}
}

Ship.prototype.setBuyData = function(){
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].totalCost > 0){
				this.upgrades.push(this.structures[i].systems[j].getUpgradeData());
			}
		}
	}
}

Ship.prototype.getLaunchData = function(){
	return [];
}

Ship.prototype.getDeployImg = function(){
	return window.shipImages[this.name.toLowerCase()].cloneNode(true);
}

Ship.prototype.updateShipPower = function(system){
	var reactor = this.getSystemByName("Reactor");
	var s = reactor.getOutput();
	$(reactor.element).find(".outputMask").html(s);
	$(this.element).find(".mainPower").html(s).end();
	system.update();

	if (system instanceof Engine){
		$(this.element).find(".ep").html(this.getRemainingEP() + " / " + this.getEP()).end();
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
			game.getUnit($(this).data("shipId")).getSystemById($(this).data("systemId")).hover(e);
		}
	).click(
		function(e){
			e.stopPropagation();
			game.getUnit($(this).data("shipId")).getSystemById($(this).data("systemId")).select(e);
		}
	).
	contextmenu(
		function(e){
			e.preventDefault();
			if (!game.sensorMode){game.getUnit($(this).data("shipId")).selectAll(e, $(this).data("systemId"));}
		}
	);
	return td;
}

Ship.prototype.selectAll = function(e, id){
	var s = this.getSystemById(id);
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
	var system = this.getSystemById(id);
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
	var system = this.getSystemById(id);
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
	var turnEle = $("#turnButton")[0];
	var p1 = getPointInDirection(150/cam.z, addToDirection(angle, -90), center.x, center.y);
	$(turnEle)
		.removeClass("disabled")
		.css("left", p1.x * cam.z + cam.o.x - $(turnEle).width()/2)
		.css("top", p1.y * cam.z + cam.o.y - $(turnEle).height()/2)
		.find("#impulseMod").html("x " +turn.dif).end()
		//.find("#remEP").html(this.getRemainingEP() + " / " + this.getEP()).addClass("green").end()
}
	
Ship.prototype.canIncreaseImpulse = function(){
	if (this.getRemainingEP() >= this.getImpulseChangeCost()){
		if (!this.actions.length || this.available == game.turn && this.actions.length == (1 + this.ship)){
			return true;
		}
		else if (this.actions[this.actions.length-1].type == "speed" && this.actions[this.actions.length-1].dist == 1){
			return true;
		}
	}
	else if (this.actions.length && this.actions[this.actions.length-1].type == "speed" && this.actions[this.actions.length-1].dist == -1){
		return true;
	}

	return false;
}

Ship.prototype.canDecreaseImpulse = function(){
	if (this.getCurrentImpulse() <= 0){return false;}
	if (this.getRemainingEP() >= this.getImpulseChangeCost()){
		if (!this.actions.length || this.available == game.turn && this.actions.length == (1 + this.ship)){
			return true;
		}
		else if (this.actions[this.actions.length-1].type == "speed" && this.actions[this.actions.length-1].dist == -1){
			return true;
		}
	}
	else if (this.actions.length && this.actions[this.actions.length-1].type == "speed" && this.actions[this.actions.length-1].dist == 1){
		return true;
	}

	return false;
}

Ship.prototype.getShortenTurnCost = function(){
	return this.getTurnCost() / turn.mod * (turn.mod + turn.step) * turn.a;

	//return b * a * (m+s) * turn.a * (1+turn.step));
}

Ship.prototype.canShortenTurn = function(){
	if (game.phase == 0 || game.phase == 1){
		if (turn.mod < 2 && this.getRemainingEP() >= this.getShortenTurnCost()){
			//console.log("can shorten")
			return true;
		}
	}
	//console.log("cant shorten")
	return false;
}

Ship.prototype.canUndoShortenTurn = function(){
	if (game.phase == 0 || game.phase == 1){
		if (turn.mod > 1){
			//console.log("can unshorten")
			return true;
		}
	}
	//console.log("cant unshorten")
	return false;
}

Ship.prototype.doShortenTurn = function(max){
	if (max){
		while (this.canShortenTurn()){
			turn.mod = round(turn.mod + turn.step, 1);
		}
		this.setTurnData();
	}
	else if (this.canShortenTurn()){
		turn.mod = round(turn.mod + turn.step, 1);
		this.setTurnData();
	}
}

Ship.prototype.doUndoShortenTurn = function(max){
	if (turn.mod > 1){
		if (max){
			turn.mod = 1;
		} else turn.mod = Math.floor((turn.mod * 10) - turn.step*10) / 10;
		this.setTurnData();
	}
}

Ship.prototype.setTurnData = function(){
	//console.log("setTurnData");
	var button = $("#turnButton");
	var vector = $("#vectorDiv")

	$(button)
		.find("#turnMode").html("ON").addClass("on").end()		.find("#turnCost").html(this.getTurnCost() + " EP").end()
		.find("#turnDelay").html(this.getTurnDelay() + " px").end()
		.find("#turnMod").html(turn.mod).end()

	if (game.turnMode){
		$(button)
			.find("#shortenTurn").removeClass("disabled");
			$("#epButton")
			.find("#remEP").html(this.getRemainingEP() + " / " + this.getEP()).addClass("green").end()
			.find("#impulseText").html("Cost : Rem").end().find("#impulseCost").html("");

		this.drawDelay();
		this.adjustMaxTurn()
	}
	else {
		$(button)
			.find("#turnMode").html("OFF").removeClass("on").end()
			.find("#shortenTurn").addClass("disabled");
		$("#epButton")
			.find("#remEP").html(this.getRemainingEP() + " / " + this.getEP()).addClass("green").end()
			.find("#impulseText").html("Cost : Rem").end().find("#impulseCost").html("");
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
	if (!this.getRemainingImpulse()){
		return false;
	}
	else if (this.turns[i].cost * (this.turns[i].costmod + 0.2) + this.getTurnCost() < this.getRemainingEP()){
		return true;
	}
	else return false;
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
	this.drawVectorMovementUI();
	if (this.canTurn()){
		this.drawTurnUI();
		this.updateDiv();
	}
}

Ship.prototype.drawVectorMovementUI = function(){
	var center = this.getPlannedPos();
	var angle = this.getPlannedFacing();
	var rem = this.getRemainingImpulse();
	var delay = this.getRemainingDelay();
	var ele;

	if (rem > 0){
		ele = document.getElementById("maxVector");
		var p = getPointInDirection(rem + 90, angle, center.x, center.y);
		var left = p.x * cam.z  + cam.o.x - $(ele).width()/2;
		var top = p.y * cam.z  + cam.o.y - $(ele).height()/2;

		$(ele)
			.data("shipid", this.id)
			.data("dist", rem)
			//.html("<div style='margin-left: 4px; margin-top: 7px'>"+rem+"<div>")
			.html("<div>"+rem+"</div>")
			.css("left", left)
			.css("top", top)
			.removeClass("disabled");
	}

	if (delay && rem >= delay){
		ele = document.getElementById("maxTurnVector");
		var p = getPointInDirection(rem + 60, angle, center.x, center.y);
		var left = p.x  * cam.z  + cam.o.x - $(ele).width()/2;
		var top = p.y * cam.z  + cam.o.y - $(ele).height()/2;

		$(ele)
			.data("shipid", this.id)
			.data("dist", delay)
			.html("<div>"+delay+"<div>")
			.css("left", left)
			.css("top", top)
			.removeClass("disabled");

		if (this.canMaxCut()){

			delay = Math.ceil(delay/2);

			ele = document.getElementById("maxCutVector");
			var p = getPointInDirection(rem + 30, angle, center.x, center.y);
			var left = p.x  * cam.z  + cam.o.x - $(ele).width()/2;
			var top = p.y * cam.z  + cam.o.y - $(ele).height()/2;

			$(ele)
				.data("shipid", this.id)
				.data("dist", delay)
				.html("<div>"+delay+"<div>")
				.css("left", left)
				.css("top", top)
				.removeClass("disabled");
		}
	}
}

Ship.prototype.canMaxCut = function(){
	var last = this.getLastTurn();
	var ep = this.getRemainingEP();

	if (last.costmod == 1 && ep && ep >= last.cost / 10){
		return true;
	}
	return false;
}

Ship.prototype.drawVectorIndicator = function(){
	var center = this.getPlannedPos();
	var angle = this.getPlannedFacing();
	var p = getPointInDirection(200, angle, center.x, center.y);
	
	moveCtx.beginPath();			
	moveCtx.moveTo(center.x, center.y);
	moveCtx.lineTo(p.x, p.y);
	moveCtx.closePath();
	moveCtx.lineWidth = 1;
	moveCtx.strokeStyle = "white";
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
	var ep = this.getRemainingEP();
	var limit = this.getTurnAngle();
	var c = this.getTurnCost();

	return Math.min(limit, Math.floor(ep/c));
}

Ship.prototype.drawTurnArcs = function(){
	var center = this.getPlannedPos();
	var angle = this.getPlannedFacing();
	var turnAngle = this.getMaxTurnAngle();
	var w = this.getTurnStep();

	this.turnAngles = {start: addAngle(0 + turnAngle, angle), end: addAngle(360 - turnAngle, angle)};
	
	for (var j = 1; j >= -1; j = j-2){
		for (var i = 1; i <= w; i++){			
			var modAngle = turnAngle * i * j;
			var newAngle = addToDirection(angle, modAngle);
			var p = getPointInDirection(Math.max(this.getBaseImpulse(), this.getRemainingImpulse()*2), newAngle, center.x, center.y);
			if (turnAngle != 180){
				moveCtx.beginPath();
				moveCtx.moveTo(center.x, center.y);
				moveCtx.lineTo(p.x, p.y);
				moveCtx.closePath();
				moveCtx.globalAlpha = 0.5;
				moveCtx.strokeStyle = "yellow";
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

Ship.prototype.getResolvingFireOrders = function(){
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