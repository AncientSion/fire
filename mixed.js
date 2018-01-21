function Mixed(data){
	Ship.call(this, data);
	this.ship = 0;
	this.primary = false;
	this.mission = data.mission || {};
	this.nextStep;
	this.finalStep;
	this.layout = [];
}

Mixed.prototype = Object.create(Ship.prototype);

Mixed.prototype.getNextPosition = function(){
	return this.nextStep;
}

Mixed.prototype.getPlannedFacing = function(){
	return this.facing;
	if (game.phase < 2){
		return this.facing;
		//return getAngleFromTo(this, this.nextStep);
	}
	return this.actions[this.actions.length-1].a;
}

Mixed.prototype.getDrawFacing = function(){
	return this.facing;
}

Mixed.prototype.canDeploy = function(){
	return false;
}

Mixed.prototype.getPowerOrders = function(){
	return [];
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

Mixed.prototype.getCurrentImpulse = function(){
	return this.currentImpulse;
}

Mixed.prototype.getPostMovePos = function(){
	return this.nextStep;
}

Mixed.prototype.drawMovePlan = function(){
	if (this.mission.arrived){return;}
	var target = this.getTarget();
	var tPos;
	var origin = this.getPlannedPos();
	if (this.mission.type > 1){
		tPos = target.getNextPosition();
		if (tPos.x == origin.x && tPos.y == origin.y){
			tPos = target.getPlannedPos();
		}
	} else tPos = {x: this.mission.x, y: this.mission.y};

	var dist = getDistance(origin, tPos);
	var impulse = this.getCurrentImpulse();
	var color = "red";

	planCtx.globalAlpha = 0.5;
	planCtx.translate(cam.o.x, cam.o.y);
	planCtx.scale(cam.z, cam.z);
	planCtx.beginPath();
	planCtx.moveTo(origin.x, origin.y);

	if (impulse < dist){ // does not reach
		var a = getAngleFromTo(origin, tPos);
		var step = getPointInDirection(impulse, a, origin.x, origin.y);
			color = "white";

		planCtx.lineTo(step.x, step.y);
		planCtx.closePath();
		if (!this.friendly){
		planCtx.strokeStyle = "red";
		} else planCtx.strokeStyle = "#00ea00";
		planCtx.stroke();
		planCtx.beginPath();
		planCtx.moveTo(step.x, step.y);
	}

	planCtx.lineTo(tPos.x, tPos.y);
	planCtx.closePath();
	planCtx.strokeStyle = color;
	planCtx.stroke();
	planCtx.setTransform(1,0,0,1,0,0);}

	if (this.flight){this.drawMissionArea();
}

Mixed.prototype.drawTargetMovePlan = function(){
	var t = this.getTarget();
	if (!t || t.ship || t.squad){return;}
	t.drawMovePlan();
}

Mixed.prototype.drawTrajectory = function(){
	if (!this.salvo || !this.mission.arrived){return;}
	planCtx.globalAlpha = 1;
	planCtx.translate(cam.o.x, cam.o.y);
	planCtx.scale(cam.z, cam.z);
	planCtx.beginPath();
	planCtx.moveTo(this.x, this.y);
	planCtx.lineTo(this.mission.x, this.mission.y);
	planCtx.closePath();
	planCtx.strokeStyle = "red";
	planCtx.stroke();
	planCtx.setTransform(1,0,0,1,0,0);
}

Mixed.prototype.isDestroyed = function(){
	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].destroyed && !this.structures[i].disabled){
			return false;
		}
	}
	return true;
}

Mixed.prototype.setStatus = function(){
	//	console.log("setStatus")
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].crits.length; j++){
			if (this.structures[i].crits[j].type == "Disabled"){
				this.structures[i].disabled = true;
			}
		}

		if (this.structures[i].destroyed){
			this.structures[i].draw = 0;
			for (var k = 0; k < this.structures[i].systems.length; k++){
				this.structures[i].systems[k].destroyed = true;
			}
		}
		else if (this.structures[i].disabled){
			this.structures[i].draw = 0;
			for (var k = 0; k < this.structures[i].systems.length; k++){
				this.structures[i].systems[k].disabled = true;
			}
		}
	}
}

Mixed.prototype.hasLockOnUnit = function(){
	return false;
}

Mixed.prototype.isMaskedFromUnit = function(){
	return false;
}

Mixed.prototype.getImpulseMod = function(){
	return 1;
}

Mixed.prototype.getArmourString = function(a){
	return this.structures[0].negation;
}

Mixed.prototype.getStringHitChance = function(){
	var min = 1000; var max = 0;
	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].destroyed){
			min = Math.min(min, this.structures[i].baseHitChance);
			max = Math.max(max, this.structures[i].baseHitChance);
		}
	}
	if (min == max){
		return ("Base Hit: " + min + "%");
	} else return ("Base Hit: " + min + " - " + max + "%");
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

Mixed.prototype.getWeaponPosition = function(){
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].id == fire.weaponid){
				return {x: this.layout[i].x, y: this.layout[i].y};
			}
		}
	}
}

Mixed.prototype.getTargetPosition = function(){
	if (this.mission.targetid){
		return this.getTarget().getPlannedPos();
	} else return this.mission;
}

Mixed.prototype.inRange = function(){
	if (getDistance(this.getTargetPosition(), this.getPlannedPos()) <= this.getCurrentImpulse()){
		return true;
	} else return false;
}

Mixed.prototype.getTarget = function(){
	return game.getUnit(this.mission.targetid);	
}

Mixed.prototype.setTarget = function(){
	var i = this.getCurrentImpulse();
	var d = 0;
	var p = this.getPlannedPos();
	if (this.mission.type == 1){  // patrol goal
		this.finalStep = {x: this.mission.x, y: this.mission.y};
		this.facing = getAngleFromTo(this, this.finalStep);
		d = getDistance(p, this.finalStep);
		if (d < i){
			this.nextStep = this.finalStep;
		} else this.nextStep = getPointInDirection(i, this.facing, p.x, p.y);
	}
	else {
		if (this.mission.type == 2){
			var target = this.getTarget();
			if (target.ship || target.squad){
				this.finalStep = target.getPlannedPos();
				this.facing = getAngleFromTo(this, this.finalStep);
				d = getDistance(p, this.finalStep);
				if (d < i){
					this.nextStep = this.finalStep;
				} else this.nextStep = getPointInDirection(i, getAngleFromTo(p, this.finalStep), p.x, p.y);
			}
			else if (target.flight){
				if (target.mission.targetid == this.id){
				/*	target.finalStep = this.getPlannedPos();
					target.facing = getAngleFromTo(target.getPlannedPos(), target.finalStep);
					this.finalStep = target.getPlannedPos();
					this.facing = getAngleFromTo(p, target.finalStep);

					d = getDistance(target.finalStep, this.finalStep);

					this.nextStep = getPointInDirection(Math.min(d, i), this.facing, p.x, p.y);
					var tPos = target.getPlannedPos();
					target.nextStep = getPointInDirection(Math.min(d, target.getCurrentImpulse()), target.facing, tPos.x, tPos.y);
					return;
				*/
					this.finalStep = target.getPlannedPos();
					this.facing = getAngleFromTo(p, this.finalStep);

					d = getDistance(p, this.finalStep);

					this.nextStep = getPointInDirection(Math.min(d, i), this.facing, p.x, p.y);
					return;
				
				}
				else if (target.finalStep == undefined){
					target.setTarget();
				}
				this.finalStep = target.nextStep;
				//this.facing = getAngleFromTo(p, target.getPlannedPos());
				this.facing = getAngleFromTo(p, this.finalStep);
				d = getDistance(p, this.finalStep);
				if (d < i){
					this.nextStep = target.nextStep;
				} else this.nextStep = getPointInDirection(i, getAngleFromTo(p, this.finalStep), p.x, p.y);
			}
			else if (target.salvo){
			}
		}
	}
}

Mixed.prototype.setPreMoveFacing = function(){
	///console.log("setPreMoveFacing");
	//if (this.salvo){console.log("setPreMoveFacing");}
	//if (this.mission.turn == game.turn){
	//	this.facing = getAngleFromTo(this.getPlannedPos(), this.getTargetPosition());
	//}

	if (this.actions.length){
		this.facing = getAngleFromTo(this, this.actions[this.actions.length-1]);
	}
	else this.facing = getAngleFromTo(this.getPlannedPos(), this.nextStep);
}

Mixed.prototype.setPostMoveFacing = function(){
	//console.log("setPostMoveFacing");
	//if (this.salvo){console.log("setPostMoveFacing");}
	//if (this.mission.turn == game.turn){
		this.facing = getAngleFromTo(this.getPlannedPos(), this.finalStep);
	//}
}

Mixed.prototype.canShortenTurn = function(){
	return false;
}	

Mixed.prototype.getLockEffect = function(target){
	if (!this.mission.arrived){return 0;}

	var multi = 0;
	if (target.ship || target.squad){
		return multi;
	}
	else if (target.flight){
		multi = 1;
	}
	else if (target.salvo){
		multi = 1;
	}	

	if (target.flight){
		if (this.mission.targetid == target.id){ // intercept
			return multi;
		} else if (target.mission.targetid == this.mission.targetid && this.userid == this.getTarget().userid){ // flight escorting flight vs enemy flight
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
	if (this.flight && this.mission.targetid == shooter.id){
		return 0.5;
	}
	return 0;
}

Mixed.prototype.canUndoShortenTurn = function(){
	return false;
}

Mixed.prototype.create = function(){
	this.setStatus();
	if (this.id < 0){
		this.setMaxMass();
		this.setImpulse();
	}
}

Mixed.prototype.hasSystemSelected = function(){
	return false;
}

Mixed.prototype.getSystem = function(id){
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
	//	console.log("setPreFireImage");
	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].draw){
			if (this.structures[i].isDestroyedThisTurn()){
				this.structures[i].draw = true;
			}
		}
	}
	this.resetImage();
}

Mixed.prototype.setLayout = function(){
	if (!this.mission.arrived){
		this.setBaseLayout();
	}
	else if (this.mission.type == 1){ // patrol arrived
		if (this.mission.arrived < game.turn || this.mission.arrived == game.turn && game.phase > 2){
			this.setPatrolLayout();
		}
	}
	else if (this.mission.type == 2){ // strike arrived
		if (this.mission.arrived == game.turn){
			this.setBaseLayout();
		}
		else {
			var roam = 1;
			for (var i = 0; i < this.cc.length; i++){
				var u = game.getUnit(this.cc[i]);
				if (u.ship || u.squad){roam = 0; break;}
			}
			if (roam){this.setPatrolLayout();}
		}
	}
	else this.setBaseLayout();
}

Mixed.prototype.setBaseLayout = function(){
	var osx = 16;
	var osy = 12;

	//var num = Math.ceil(this.structures.length/3);
	//this.size = num*10;

	var reach = 15 + Math.max(0, (Math.floor(this.structures.length-3)/3)*12);

	for (var i = 0; i < this.structures.length/3; i++){

		var a = 360/Math.ceil(this.structures.length/3)*i;
		//var o = getPointInDirection(0 + this.unitSize*15, a-90, 0, 0);
		var o = getPointInDirection(reach, a, 0, 0);

		for (var j = 0; j < Math.min(this.structures.length-i*3, 3); j++){
			var ox = o.x;
			var oy = o.y;

			switch (j){
				case 0: oy -= osy; break;
				case 1: ox -= osx; oy += osy; break;
				case 2: ox += osx; oy += osy; break;
				default: break;
			}
			this.structures[(i*3)+j].layout = {x: ox, y: oy};
		}
	}
}

Mixed.prototype.setPatrolLayout = function(){
	for (var i = 0; i < this.structures.length; i++){
		var p = getPointInDirection(range(0, this.size*1), range(0, 360), 0, 0);
		this.structures[i].layout.x = p.x;
		this.structures[i].layout.y = p.y;
		//this.structures[i].layout.x = Math.round(range(-this.size/3, this.size/3));
		//this.structures[i].layout.y = Math.round(range(-this.size/3, this.size/3));
	}
}

Mixed.prototype.setPatrolImage = function(){
	console.log("setPatrolImage " + this.id);
	var size = 26;
	var t = document.createElement("canvas");
		t.width = this.size*2;
		t.height = this.size*2;
	var ctx = t.getContext("2d");
		ctx.translate(t.width/2, t.height/2);

	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].draw){
			ctx.translate(this.structures[i].layout.x, this.structures[i].layout.y);
			ctx.rotate((360/this.structures.length*i) * (Math.PI/180));
			ctx.drawImage(
				this.structures[i].getBaseImage(),
				0 -size/2,
				0 -size/2,
				size, 
				size
			);
			ctx.rotate(-(360/this.structures.length*i) * (Math.PI/180));
			ctx.translate(-this.structures[i].layout.x, -this.structures[i].layout.y);
		}
	}

	ctx.translate(-t.width/2, -t.height/2);
	this.img = t;
	//console.log(this.img.toDataURL());
}

Mixed.prototype.setPreMoveImage = function(){
	//console.log("setPreMoveImage " + this.id);
	var size = 26;
	var t = document.createElement("canvas");
		t.width = this.size*2;
		t.height = this.size*2;
	var ctx = t.getContext("2d");
		ctx.translate(t.width/2, t.height/2);

	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].draw){continue;}

		ctx.translate(this.structures[i].layout.x, this.structures[i].layout.y);
		ctx.drawImage(
			this.structures[i].getBaseImage(),
			0 -size/2,
			0 -size/2,
			size, 
			size
		)
		ctx.translate(-this.structures[i].layout.x, -this.structures[i].layout.y);
	}		
	ctx.setTransform(1,0,0,1,0,0);
	this.img = t;
	//console.log(this.img.toDataURL());
}

Mixed.prototype.setPostMoveImage = function(){
	console.log("setPostMoveImage " + this.id);
	var size = 26;
	var t = document.createElement("canvas");
		t.width = this.size*2;
		t.height = this.size*2;
	var ctx = t.getContext("2d");
		ctx.translate(t.width/2, t.height/2);

	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].draw){continue;}

		ctx.save();
		ctx.translate(this.structures[i].layout.x, this.structures[i].layout.y);
		ctx.rotate((360/this.structures.length*i) * (Math.PI/180));
		ctx.drawImage(
		this.structures[i].getBaseImage(),
			0 -size/2,
			0 -size/2,
			size, 
			size
		);
		ctx.restore();
	}
	ctx.setTransform(1,0,0,1,0,0);
	this.img = t;
	//console.log(this.drawImg.toDataURL());
}

Mixed.prototype.getWeaponOrigin = function(id){
	for (i = this.structures.length-1; i >= 0; i--){
		if (id > this.structures[i].id){
			return this.getUnitPosition(i);
		}
	}
}

Mixed.prototype.getUnitPosition = function(j){
	if (this.mission.arrived && this.mission.type != 1){
		var x = this.structures[j].layout.x * 0.5;
		var y = this.structures[j].layout.y * 0.5;
		return rotate(0, 0, {x: x, y: y}, this.getParent().getDrawFacing());
	}
	else {
		var x = this.structures[j].layout.x * 0.5;
		var y = this.structures[j].layout.y * 0.5;
		return rotate(0, 0, {x: x, y: y}, this.getParent().getDrawFacing());
	}
}

Mixed.prototype.getRandomUnitPos = function(){
	var t = this.structures[range(0, this.structures.length-1)].layout;
		//t.x += range(10, 20) * (1-(range(0, 1)*2));
		//t.y += range(10, 20) * (1-(range(0, 1)*2));
		t.x += range(-30, 30)
		t.y += range(-30, 30)
	return t;
}

Mixed.prototype.getFireDest = function(fire, isHit, num){
	var t;

	if (!isHit){
		t = this.getRandomUnitPos();
	}
	else {
		t = this.getSystem(fire.damages[num].systemid).layout;
	}

	if (this.mission.arrived){
		var x = t.x * 0.5;
		var y = t.y * 0.5;
		//var x = t.x;
		//var y = t.y;
		return rotate(0, 0, {x: x, y: y}, this.getParent().getDrawFacing());
	}
	else {
		//var x = t.x * (this.size / 200);
		//var y = t.y * (this.size / 200);
		var x = t.x * (this.size / 100);
		var y = t.y * (this.size / 100);
		var x = t.x * 0.5;
		var y = t.y * 0.5;
		return rotate(0, 0, {x: x, y: y}, this.getDrawFacing());
	}
}

Mixed.prototype.getTrajectory = function(gun){
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
				dmgs[dmgs.length-1].system = this.structures[i].display;
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

Mixed.prototype.getRemainingImpulse = function(){
	return 0;
}

Mixed.prototype.animateSelfJumpIn = function(){
	this.deployAnim[0] = this.deployAnim[1];

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