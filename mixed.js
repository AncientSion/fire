function Mixed(data){
	Ship.call(this, data);
	this.ship = 0;
	this.primary = false;
	this.mission = data.mission || {};
	this.oldMission = 0;
	this.finalStep = false;
	this.layout = [];
}

Mixed.prototype = Object.create(Ship.prototype);

Mixed.prototype.getPlannedFacing = function(){
	return this.facing;
}

Mixed.prototype.getCameraStartPos = function(){
	if (game.phase == 2){
		return new Point(this.x, this.y);
	}
	return this.getPlannedPos();
}

Mixed.prototype.getDrawFacing = function(){
	return this.facing;
}

Mixed.prototype.canDeploy = function(){
	return false;
}

Mixed.prototype.getAllPowerOrders = function(){
	if (this.flight && game.phase != 2){return [];}
	var powers = [];

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (!this.structures[i].systems[j].hasUnresolvedFireOrder()){continue;}
			powers = powers.concat(this.structures[i].systems[j].getPowerOrders());
		}
	}
	return powers;
}

Mixed.prototype.hasHangarSelected = function(){
	return false;
}

Mixed.prototype.launchedThisTurn = function(){
	if (this.available == game.turn){
		return true;
	}
	return false;
}

Mixed.prototype.resetMoveMode = function(){
	return;
}

Mixed.prototype.getCurSpeed = function(){
	return this.curImp;
}

Mixed.prototype.getMaxSpeed = function(){
	return this.baseImpulse*3;
}

Mixed.prototype.setBaseImpulse = function(){
	baseImpulse = 1000;
	for (var i = 0; i < this.structures.length; i++){
		this.baseImpulse = Math.min(baseImpulse, this.structures[i].baseImpulse)
	}
}

Mixed.prototype.drawNextMove = function(){
	if (this.mission.arrived && this.mission.type == 1){return;}
	planCtx.translate(cam.o.x, cam.o.y);
	planCtx.scale(cam.z, cam.z);

	var nextMove = this.getPlannedPos();
	var color = (this.friendly ? "#00ea00" : "red");
	planCtx.strokeStyle = color;

	planCtx.beginPath();
	planCtx.moveTo(this.x, this.y);

//for (var i = 0; i < this.actions.length - (game.phase < 2 ? 0 : 1); i++){
	for (var i = 0; i < this.actions.length; i++){
		if (this.actions[i].type == "move"){
			planCtx.lineTo(this.actions[i].x, this.actions[i].y);
		}
	}
	planCtx.stroke();
	planCtx.closePath();

	if (this.actions[this.actions.length-1].x != this.finalStep.x && this.actions[this.actions.length-1].y != this.finalStep.y){
		planCtx.beginPath();
		planCtx.moveTo(this.actions[this.actions.length-1].x, this.actions[this.actions.length-1].y);
		planCtx.lineTo(this.finalStep.x, this.finalStep.y);
		planCtx.strokeStyle = "white";
		planCtx.stroke();
		planCtx.closePath();
	}

	planCtx.globalAlpha = 1;
	planCtx.strokeStyle = "black";
	planCtx.setTransform(1,0,0,1,0,0);
}

Mixed.prototype.drawMovePlan = function(){
	if (!this.deployed || game.animating){return;}
	this.drawNextMove();
}

Mixed.prototype.drawTargetMovePlan = function(){
	var t = this.getTarget();
	if (!t || t.ship || t.squad){return;}
	t.drawMovePlan();
}

Mixed.prototype.isDestroyed = function(){
	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].destroyed && !this.structures[i].disabled){
			return false;
		}
	}
	return true;
}

Mixed.prototype.getImpulseMod = function(){
	return 1;
}

Mixed.prototype.getArmourString = function(a){
	return this.structures[0].negation;
}

Mixed.prototype.setStringHitChance = function(){
	if (!this.structures.length){
		this.stringHitChance = "";
	}
	var min = 1000; var max = 0;
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}
		min = Math.min(min, this.structures[i].baseHitChance);
		max = Math.max(max, this.structures[i].baseHitChance);
	}
	if (min == max){
		this.stringHitChance = (min + "%");
	} else this.stringHitChance = (min + " - " + max + "%");
}

Mixed.prototype.getAngledHitSection = function(){
	for (var i = 0; i < this.structures.length; i++){
		if (isInArc(a, this.structures[i].start, this.structures[i].end)){
			return this.structures[i];
		}
	}
}

Mixed.prototype.getAngledHitChance = function(angle){
	return Math.ceil(this.getBaseHitChance());
}

Mixed.prototype.getBaseHitChance = function(){
	var chance = 0;
	var amount = 0;

	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}
		amount++;
		chance += this.structures[i].baseHitChance;
	}

	return Math.ceil(chance/amount);
}

Mixed.prototype.setCurSpeed = function(){
	if (this.mission.type == 1 && this.mission.arrived){
		this.curImp = this.baseImpulse; return;
	}
	
	var start = game.turn;

	if (this.mission.type == 2 && this.mission.targetid == this.oldMission.targetid && this.mission.type == this.oldMission.type){
		start = this.oldMission.turn;
	}

	this.curImp = Math.min(this.getMaxSpeed(), Math.floor(this.baseImpulse * ((game.turn - start)+1)));
	$(this.element).find(".speedStats").html(this.getCurSpeed() + " (max: " + this.getMaxSpeed() + ")");
}


Mixed.prototype.getWeaponPosition = function(){
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].id == fire.weaponid){
				return {x: this.layout[i].x, y: this.layout[i].y};
			}
		}
	}
}

Mixed.prototype.getTargetPos = function(){
	if (this.mission.targetid){
		return this.getTarget().getPlannedPos();
	} else return this.mission;
}

Mixed.prototype.contactImminent = function(){
	//if (this.torpedo && this.actions[this.actions.length-1].type == "move" && this.actions[this.actions.length-1].turn == game.turn){return false;}
	var t = this.getTarget();

	if (t.flight && t.mission.targetid == this.id){
		if (getDistance(t.getPlannedPos(), this.getGamePos()) <= this.getCurSpeed() + t.getCurSpeed()){
			return true;
		}
	}
	else if (getDistance(this.getTargetPos(), this.getGamePos()) <= this.getCurSpeed()){
		return true;
	}
	return false;
}

Mixed.prototype.getTarget = function(){
	return game.getUnit(this.mission.targetid);	
}

Mixed.prototype.setNextMove = function(){
	var s = this.getCurSpeed();
	var d = 0;
	var p = this.getGamePos();
	var next;

	if (this.mission.arrived && game.phase >= 2){return;}

	if (this.mission.type == 1){  // patrol goal
		this.finalStep = {x: this.mission.x, y: this.mission.y};
		this.facing = getAngleFromTo(this, this.finalStep);
		d = getDistance(p, this.finalStep);
		if (d < s){
			next = this.finalStep;
		} else next = getPointInDir(s, this.facing, p.x, p.y);
	}
	else {
		if (this.mission.type == 2){
			var target = this.getTarget();
			if (target.ship || target.squad){
				this.finalStep = target.getPlannedPos();
				this.facing = getAngleFromTo(this, this.finalStep);
				d = getDistance(p, this.finalStep);
				if (d < s){
					next = this.finalStep;
				} else next = getPointInDir(s, getAngleFromTo(p, this.finalStep), p.x, p.y);
			}
			else if (target.flight){
				if (target.mission.targetid == this.id){
					if (s > target.getCurSpeed() || s == target.getCurSpeed() && this.id > target.id){
						popup("Flight #" + this.id + " (targeting Flight #" + target.id + ") has the advantage (is faster) and will move last");
						target.setNextMove();
					}

					this.finalStep = target.getPlannedPos();
					this.facing = getAngleFromTo(p, this.finalStep);

					d = getDistance(p, this.finalStep);

					next = getPointInDir(Math.min(d, s), this.facing, p.x, p.y);
				}
				else if (target.finalStep == undefined){
					target.setNextMove();
				}
				this.finalStep = target.getPlannedPos();
				//this.facing = getAngleFromTo(p, target.getPlannedPos());
				this.facing = getAngleFromTo(p, this.finalStep);
				d = getDistance(p, this.finalStep);
				if (d < s){
					next = target.getPlannedPos();
				} else next = getPointInDir(s, getAngleFromTo(p, this.finalStep), p.x, p.y);
			}
			else if (target.salvo){
			}
		}
	}

	if (this.actions.length && this.actions[this.actions.length-1].type == "move" && this.actions[this.actions.length-1].resolved == 0){
		this.actions[this.actions.length-1].x = next.x;
		this.actions[this.actions.length-1].y = next.y;
	}
	else this.actions.push(new Move(-1, this.id, "move", 0, this.getCurSpeed(), next.x, next.y, 0, 0, 0, 1, 1, 0));
	game.setCollisionData(this);

}

Mixed.prototype.setPreMoveFacing = function(){
	//console.log("setPreMoveFacing");
	//if (this.salvo){console.log("setPreMoveFacing");}
	if (this.mission.turn == game.turn){
		if (game.phase == 2){
			this.facing = getAngleFromTo({x: this.x, y: this.y}, this.getTargetPos());
		}
		else {
			this.facing = getAngleFromTo(this.getPlannedPos(), this.getTargetPos());
		}
		return;
	}

	if (this.actions.length){
		this.facing = getAngleFromTo(this, this.actions[this.actions.length-1]);
	}
	else this.facing = getAngleFromTo(this.getGamePos(), this.getPlannedPos());
}

Mixed.prototype.setPostMoveFacing = function(){
	if (!this.finalStep){return;}
	this.facing = getAngleFromTo(this.getGamePos(), this.finalStep);
}

Mixed.prototype.canShortenTurn = function(){
	return false;
}	

Mixed.prototype.getLockEffect = function(target){
	if (!this.mission.arrived){return 0;}

	var multi = 0;
	if (target.ship || target.squad){
		return 0.25;
	}
	else if (target.flight){
		multi = 1;
	}
	else if (target.salvo){
		multi = 2;
	}	

	if (target.flight){
		if (this.mission.targetid == target.id){ // intercept
			return multi;
		} else if (target.mission.targetid == this.mission.targetid && this.userid == this.getTarget().userid){ // flight escorting flight vs enemy flight
			return multi;
		}
		else if (this.mission.type == 1 && this.mission.arrived){
			return multi;
		}
	}
	else if (target.salvo){
		if (this.mission.type == 1){return multi;} // patrol flight vs salvo
		else if (target.mission.targetid != this.id){return multi;} // escorting" flight vs salvo
	}
	else return 0;
}

Mixed.prototype.getMaskEffect = function(shooter){
	return 0;
	if (this.flight /*&& this.mission.arrived*/ && this.mission.targetid == shooter.id && !shooter.flight){
		return 0.5;
	}
	return 0;
}

Mixed.prototype.canUndoShortenTurn = function(){
	return false;
}

Mixed.prototype.setSubSystemState = function(){
	//	console.log("setStatus")
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].crits.length; j++){
			if (this.structures[i].crits[j].type == "Disabled"){
				this.structures[i].destroyed = true;
			}
		}

		if (this.structures[i].destroyed){
			this.structures[i].doDraw = 0;
			for (var k = 0; k < this.structures[i].systems.length; k++){
				this.structures[i].systems[k].destroyed = true;
			}
		}
	}
}

Mixed.prototype.setPreMovePosition = function(){
	if (this.available == game.turn && game.phase <= 2){
		this.drawX = this.actions[0].x;
		this.drawY = this.actions[0].y;
	}
	else {
		this.drawX = this.x;
		this.drawY = this.y;
	}
}

Mixed.prototype.setDrawData = function(){
	//console.log("MIXED setDrawData");
	if (this.available > game.turn || !this.available || game.turn == 1 && game.phase == -1){
		if (this.friendly && this.isReady){
			this.setPostMovePosition();
			this.setPostMoveFacing();
			return;
		}
	}

	this.setPostMoveFacing();

	if (game.phase < 2){
		this.setPreMovePosition();
	}
	else {
		this.setPostMovePosition();
	}
}

Mixed.prototype.getSystemByName = function(name){
	return false;
}

Mixed.prototype.getParent = function(){
	if (!this.cc.length){return this;}

	var valid = [];

	// look for SHIP parent
	for (var j = 0; j < this.cc.length; j++){
		for (var i = 0; i < game.ships.length; i++){
			if ((game.ships[i].ship || game.ships[i].squad) && game.ships[i].id == this.cc[j]){
				return game.ships[i];
			}
		}
	}

	// maybe im a salvo hitting a flight ?
	if (this.salvo){
		for (var j = 0; j < this.cc.length; j++){
			for (var i = 0; i < game.ships.length; i++){
				if (game.ships[i].id == this.cc[j]){
					return game.ships[i];
				}
			}
		}
	}

	// so its flight on flight
	for (var j = 0; j < this.cc.length; j++){
		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].friendly && game.ships[i].id == this.cc[j]){
				return game.ships[i];
			}
		}
	}

	return this;
}

Mixed.prototype.setPreFireImage = function(){
	//console.log("Mixed setPreFireImage");
	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].doDraw){
			if (this.structures[i].isDestroyedThisTurn()){
				this.structures[i].doDraw = true;
			}
		}
	}
	this.setPreFireSize();
	this.resetImage();
}

Mixed.prototype.setPreFireSize = function(){
	return;
}

Mixed.prototype.hasPatrolLayout = function(){
	//console.log("Mixed hasPatrolLayout");
	if (this.patrolLayout){return true;}

	if (this.mission.arrived && this.mission.type == 1){
		if (game.phase == 1 || game.phase == 3){
			return true;
		}
		else if (game.phase == 2 && this.actions[this.actions.length-1].type[0] == "p"){
			return true;
		}	
	}
	

	if (this.mission.arrived && this.mission.arrived < game.turn || (this.mission.arrived == game.turn && game.phase == 3)){
		if (this.mission.type == 1){return true;}
		else {
			var target = this.getTarget();
			if (!target.flight){return false;}
			if (game.phase == 2 && game.subPhase == 1){return false;} // mvoe animation
			if (target.mission.arrived < game.turn){
				return true;
			}
			else if (target.mission.arrived && this.cc.length == 1 && target.cc.length == 1){
				return true;
			}
		}
	}
	else if (this.mission.type == 2 && game.subPhase == 2 && this.cc.length && this.mission.arrived){
		var can = 1;
		for (var i = 0; i < this.cc.length; i++){
			var unit = game.getUnit(this.cc[i]);
			if (!unit.flight || !unit.mission.arrived){
				can = 0;
			}
		}
		if (can){
			return true;
		}
	}
	return false;
}

Mixed.prototype.setLayout = function(){
	//console.log("setLayout: "+this.id);
	
	if (this.hasPatrolLayout()){
		this.setPatrolLayout();
	}
	else this.setBaseLayout();
}

Mixed.prototype.setPatrolLayout = function(){
	//console.log("setPatrolLayout " + this.id);
	for (var i = 0; i < this.structures.length; i++){
		var p = getPointInDir(range(0, this.size*0.9), range(0, 360), 0, 0);
		this.structures[i].layout.x = p.x;
		this.structures[i].layout.y = p.y;
	}
	this.patrolLayout = 1;
}

Mixed.prototype.getWeaponOrigin = function(id){
	for (i = this.structures.length-1; i >= 0; i--){
		if (id > this.structures[i].id){
			return this.getUnitPos(i);
		}
	}
}

Mixed.prototype.getUnitPos = function(j){
	var x = this.structures[j].layout.x * 0.5;
	var y = this.structures[j].layout.y * 0.5;
	return rotate(0, 0, {x: x, y: y}, this.getParent().getDrawFacing());
}

Mixed.prototype.getFireDest = function(fire, isHit, num){
	var t;

	if (!isHit){t = getPointInDir((this.size/2 + range(-5, 5)), range(0, 360), 0, 0);}
	else {t = this.getSystem(fire.damages[num].systemid).layout;}

	var base = this.getPlannedPos();
	var x = t.x * 0.5;
	var y = t.y * 0.5;
	return rotate(0, 0, {x: x, y: y}, this.getParent().getDrawFacing());
}

Mixed.prototype.getTrajectory = function(){
	return {x: this.x, y: this.y};
}

Mixed.prototype.getDmgByFire = function(fire){
	var dmgs = [];
	var lookup = 0;

	for (var i = 0; i < fire.hits.length; i++){
		lookup += fire.hits[i] * fire.weapon.getDmgsPerShot(fire);
	}

	if (!lookup){
		return dmgs;
	}

	for (var i = 0; i < this.structures.length; i++){
		for (var j = this.structures[i].damages.length-1; j >= 0; j--){
			if (this.structures[i].damages[j].fireid == fire.id){
				dmgs.push(this.structures[i].damages[j]);
				dmgs[dmgs.length-1].system = this.structures[i].name;
				lookup--;
				if (!lookup){return dmgs};
			}
			else if (this.structures[i].damages[j].turn < fire.turn){
				break;
			}
		}
	}
	return dmgs;
}

Mixed.prototype.drawMoveArea = function(){
	return;
}

Mixed.prototype.checkSensorHighlight = function(){
	return;
}

Mixed.prototype.highlightAllSelectedWeapons = function(){
	return;
}

Mixed.prototype.getSectionString = function(angle){
	return "";
}

Mixed.prototype.getBaseImage = function(){
	return this.structures[0].getBaseImage();
}

Mixed.prototype.getRemSpeed = function(){
	return 0;
}

Mixed.prototype.createDeployEntry = function(){
	var html = this.flight ? " is being deployed" : " is launched";
	this.attachLogEntry("<th colSpan=9><span><font color='" + this.getCodeColor()+ "'>" + this.name + " #" + this.id + "</font> " + html + " (" + this.structures.length + " units).</span></th>");

	$("#combatLog").find("tbody tr").last()
		.hover(
			function(){game.getUnit($(this).data("shipid")).handleHovering();},
			function(){game.resetHover()}
		)
}

Mixed.prototype.animateSelfDeployIn = function(){
	this.deployAnim[0] = this.deployAnim[1];

	if (this.deployAnim[0] == this.deployAnim[1]){
		this.deployed = 1;
		this.isReady = 1;
		this.draw();
		this.createDeployEntry();
		return;
	}
}

Mixed.prototype.attachDivClickFunction = function(){
	if (aUnit){
		var shooter = game.getUnit(aUnit);
		if (shooter.hasWeaponsSelected()){
			var target = game.getUnit($(this).data("id"));
			firePhase({x: 0, y: 0}, shooter, target.id);
		} 
		else {
			shooter.doUnselect();
			shooter.switchDiv();
			game.getUnit($(this).data("id")).select();
		}
	}
	else game.getUnit($(this).data("id")).select();
}

Mixed.prototype.getSelfExplo = function(){
	//console.log(this.id);

	var base = this.getDrawPos();

	var data = {
		entries: [],
		animated: 0,
		animating: 0,
		id: this.id,
		pos: base,
		html: ""
	}

	var color = "#ff3d00";
	if (this.friendly){
		color = "#27e627";
	}

	var counter = 0;
	for (var j = 0; j < this.structures.length; j++){
		if (!this.structures[j].isDestroyedThisTurn()){continue;}

		var explo = {u: this.structures[j], anims: []};

		counter++;
		var real = this.getUnitPos(j);
		//console.log(real);
		for (var k = 0; k < 1; k++){
			explo.anims.push({
				t: [0 - k*6 - counter*20, 50],
				s: this.getExploSize(j), 
				x: base.x + real.x,
				y: base.y + real.y,
			});
		}
		data.entries.push(explo);
	}
	
	data.html += "A total of <font color='" + "yellow" + "'>" + counter + "</font> elements from <font weight='bold' color='" + color + "'>Unit #" + this.id + "</font> were destroyed or disengaged.";
	if (this.isDestroyed()){data.html += " The unit is completly wiped."}

	return data;
}

Mixed.prototype.readyForAnim = function(){
	this.setPreMovePosition();
	this.setPreMoveFacing();	

	if (this.actions[this.actions.length-1].dist == 0){
		this.actions[this.actions.length-1].animated = 1;
		return;
	}
	
	var frameMod = 1000 / window.fpsTicks / this.actions[this.actions.length-1].dist;

	for (var i = 0; i < this.actions.length; i++){
		if (this.actions[i].turn == game.turn){
			var action = this.actions[i];

			if (action.dist == 0 || action.type == "deploy" || action.type == "patrol"){
				this.actions[i].animated = 1;
			}
			else {
				this.actions[i].animated = 0;
				if (i == 0 && action.type == "move"){
					var v = new MoveVector({x: this.x, y: this.y}, {x: action.x, y: action.y});
					v.t = [0, action.dist * frameMod];
					this.actions[i].v = v;
				}
				else if (action.type == "move"){
					var v = new MoveVector({x: this.actions[i-1].x, y: this.actions[i-1].y}, {x: action.x, y: action.y});
						v.t = [0, action.dist * frameMod];
					this.actions[i].v = v;
				}
			}
		}
	}
}

Mixed.prototype.isRolled = function(){
	return false;
}

Mixed.prototype.isRolling = function(){
	return false;
}

Mixed.prototype.hasStoppedRolling = function(){
	return false;
}

Mixed.prototype.isFlipping = function(){
	return false;
}

Mixed.prototype.hasFlipped = function(){
	return false;
}

Mixed.prototype.doesContinueRolling = function(){
	return false;
}