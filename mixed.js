function Mixed(data){
	Ship.call(this, data);
	this.ship = false;
	this.primary = false;
	this.mission = data.mission;
	this.nextStep;
	this.finalStep;
	this.layout = [];
}

Mixed.prototype = Object.create(Ship.prototype);

Mixed.prototype.isReady = function(){
	if (this.available < game.turn){
		return true;
	}
	else if (this.available == game.turn && !(game.phase == 0 && game.animating && !this.deployed)){
		if (this.userid == game.userid && this.actions.length || game.phase >= 0){
			return true;
		}
	} else if (this.available > game.turn && this.actions.length == 1 && !this.actions[0].resolved){
		return true;
	}
	return false;
}

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
	return this.facing+90;
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
	var target;
	var origin = this.getPlannedPos();
	if (this.mission.type > 1){
		//target = this.getTarget().getPostMovePos();
		target = this.getTarget().getNextPosition();
	} else target = {x: this.mission.x, y: this.mission.y};


	var dist = getDistance(origin, target);
	var impulse = this.getCurrentImpulse();
	var color = "red";

	planCtx.globalAlpha = 0.7;
	planCtx.translate(cam.o.x, cam.o.y);
	planCtx.scale(cam.z, cam.z);
	planCtx.beginPath();
	planCtx.moveTo(origin.x, origin.y);

	if (impulse < dist){ // does not reach
		var a = getAngleFromTo(this, target);
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

	planCtx.lineTo(target.x, target.y);
	planCtx.closePath();
	planCtx.strokeStyle = color;
	planCtx.stroke();
	planCtx.setTransform(1,0,0,1,0,0);}

	if (this.flight){this.drawMissionArea();
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
	var min = 0; var max = 0;
	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].destroyed){
			min = Math.max(min, this.structures[i].baseHitChance);
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
		if (!this.structures[i].destroyed){
			amount++;
			chance += this.structures[i].baseHitChance;
		}
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
	if (getDistance(this.getTargetPosition(), this.getBaseOffsetPos()) <= this.getCurrentImpulse()){
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
		//this.facing = getAngleFromTo(p, this.finalStep);
		d = getDistance(p, this.finalStep);
		if (d < i){
			this.nextStep = this.finalStep;
		} else this.nextStep = getPointInDirection(i, this.facing, p.x, p.y);
	}
	else {
		if (this.mission.type == 2){
			var target = this.getTarget();
			if (target.ship){
				this.finalStep = target.getPlannedPos();
				this.facing = getAngleFromTo(this, this.finalStep);
				d = getDistance(p, this.finalStep);
				if (d < i){
					this.nextStep = this.finalStep;
				} else this.nextStep = getPointInDirection(i, getAngleFromTo(p, this.finalStep), p.x, p.y);
			}
			else if (target.flight){
				if (target.finalStep == undefined){
					target.setTarget();
				}
				this.finalStep = target.nextStep;
				//this.facing = getAngleFromTo(p, target.getPlannedPos());
				this.facing = getAngleFromTo(this, this.finalStep);
				d = getDistance(p, target.nextStep);
				if (d < i){
					this.nextStep = target.nextStep;
				} else this.nextStep = getPointInDirection(i, getAngleFromTo(p, target.nextStep), p.x, p.y);
			}
			else if (target.salvo){
			}
		}
	}
}

Ship.prototype.getBaseImage = function(){
	if (this.ship){
		return window.shipImages[this.name.toLowerCase()];
	}
	else return window.shipImages[this.structures[0].name.toLowerCase()];
}

Mixed.prototype.setPreMoveFacing = function(){
	//if (this.salvo){console.log("setPreMoveFacing");}
	if (this.mission.turn == game.turn){
		this.facing = getAngleFromTo(this.getPlannedPos(), this.getTargetPosition());
	}
}

Mixed.prototype.setPostMoveFacing = function(){
	//if (this.salvo){console.log("setPostMoveFacing");}
	if (this.mission.turn == game.turn){
		this.facing = getAngleFromTo(this.getPlannedPos(), this.getTargetPosition());
	}
}

Mixed.prototype.canShortenTurn = function(){
	return false;
}

Mixed.prototype.canUndoShortenTurn = function(){
	return false;
}

Mixed.prototype.setDrawStatus = function(){
	if (this.mission.arrived){
		if (this.mission.type == 1){return;}
		else if (this.id < 0 && this.mission.arrived){
			this.doDraw = 0;
		}
		else if (this.mission.arrived < game.turn){
			this.doDraw = 0;
		} else if (game.phase > 2 && this.mission.arrived == game.turn){
			this.doDraw = 0;
		}
	}
}
Mixed.prototype.create = function(){
	this.setRawImage();
	this.setStatus();
	this.setDrawStatus()
	this.setSize();
	this.setLayout();
	//this.setDrawData();
	if (this.id < 0){
		this.setMaxMass();
		this.setImpulse();
	}
}

Mixed.prototype.hasSystemSelected = function(){
	return false;
}

Mixed.prototype.getSystemById = function(){
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].id == id){
			return this.structures[i];
		}
	}
}

Mixed.prototype.getParent = function(){
	if (!this.cc.length){return this;}

	for (var j = 0; j < this.cc.length; j++){
		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].ship && game.ships[i].id == this.cc[j]){
				return game.ships[i];
			}
		}
	}
	
	for (var j = 0; j < this.cc.length; j++){
		for (var i = 0; i < game.ships.length; i++){
			if (this.salvo && game.ships[i].id == this.cc[j]){
				return game.ships[i];
			}
		}
	}

	return this;
}

Mixed.prototype.setPreFireImage = function(){
	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].draw){
			if (this.structures[i].isDestroyedThisTurn()){
				this.structures[i].draw = true;
			}
		}
	}
	this.setImage();
}

Mixed.prototype.getLockMultiplier = function(){
	return 1.0;
}

Mixed.prototype.setPatrolLayout = function(){
	for (var i = 0; i < this.structures.length; i++){
		var p = getPointInDirection(range(0, this.size*1.5), range(0, 360), 0, 0);
		this.structures[i].layout.x = p.x;
		this.structures[i].layout.y = p.y;
		//this.structures[i].layout.x = Math.round(range(-this.size/3, this.size/3));
		//this.structures[i].layout.y = Math.round(range(-this.size/3, this.size/3));
	}
}

Mixed.prototype.setPatrolImage = function(){
	var size = 36;
	var t = document.createElement("canvas");
		t.width = 200;
		t.height = 200;
	var ctx = t.getContext("2d");
		ctx.translate(t.width/2, t.height/2);

	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].draw){
			ctx.translate(this.structures[i].layout.x, this.structures[i].layout.y);
			ctx.rotate((360/this.structures.length*i) * (Math.PI/180));
			ctx.drawImage(
				window.shipImages[this.structures[i].name.toLowerCase()],
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
	var size = 36;
	var t = document.createElement("canvas");
		t.width = 200;
		t.height = 200;
	var ctx = t.getContext("2d");
		ctx.translate(t.width/2, t.height/2);

	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].draw){
			ctx.translate(this.structures[i].layout.x, this.structures[i].layout.y);
			ctx.drawImage(
				window.shipImages[this.structures[i].name.toLowerCase()],
				0 -size/2,
				0 -size/2,
				size, 
				size
			)
			ctx.translate(-this.structures[i].layout.x, -this.structures[i].layout.y);
		;}
	}	
		ctx.translate(-t.width/2, -t.height/2);

	this.img = t;
}

Mixed.prototype.setPostMoveImage = function(){
	var size = 36;
	var t = document.createElement("canvas");
		t.width = 200;
		t.height = 200;
	var ctx = t.getContext("2d");
		ctx.translate(t.width/2, t.height/2);

	if (this.mission.type == 1){ // patrol
		for (var i = 0; i < this.structures.length; i++){
			if (this.structures[i].draw){
				ctx.save();
				ctx.translate(this.structures[i].layout.x, this.structures[i].layout.y);
				ctx.rotate((360/this.structures.length*i) * (Math.PI/180));
				ctx.drawImage(
				window.shipImages[this.structures[i].name.toLowerCase()],
					0 -size/2,
					0 -size/2,
					size, 
					size
				);
				ctx.restore();
			}
		}
	}
	ctx.setTransform(1,0,0,1,0,0);
	this.img = t;
	//console.log(this.drawImg.toDataURL());
}

Mixed.prototype.setPostFireImage = function(){
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].draw && this.structures[i].destroyed || this.structures[i].disabled){
			this.structures[i].draw = 0;
		}
	}
	this.setImage();
}

Mixed.prototype.getGunOrigin = function(id){
	if (this.id == 24){
		console.log("ding");
	}
	for (i = this.structures.length-1; i >= 0; i--){
		if (id > this.structures[i].id){
			return this.getUnitPosition(i);
			//return this.structures[i].layout;
			var t = this.structures[i].layout;
			var x = t.x * 0.5;
			var y = t.y * 0.5;
		var x = t.x * (this.size / 200);
		var y = t.y * (this.size / 200);
			return rotate(0, 0, {x: x, y: y}, this.getParent().getDrawFacing());
			return rotate(0, 0, {x: x, y: y}, this.getDrawFacing()+90);
		}
	}
}

Mixed.prototype.getUnitPosition = function(j){
	if (this.mission.arrived && this.mission.type != 1){
		var x = this.structures[j].layout.x * 0.5;
		var y = this.structures[j].layout.y * 0.5;
		//console.log("#" + this.id);
		//console.log(this.structures[j].layout);
		return rotate(0, 0, {x: x, y: y}, this.getParent().getDrawFacing());
	}
	else {
		var x = this.structures[j].layout.x * (this.size / 200);
		var y = this.structures[j].layout.y * (this.size / 200);
		//console.log("#" + this.id);
		//console.log(this.structures[j].layout);
		return rotate(0, 0, {x: x, y: y}, this.getParent().getDrawFacing()+90);
	}
}

Mixed.prototype.getFireDest = function(fire, isHit, nbrHit){
	if (!isHit){
		return {
			x: range(10, 25) * (1-range(0, 1)*2),
			y: range(10, 25) * (1-range(0, 1)*2)
		}
	}
	//return this.getSystemById(fire.damages[nbrHit].systemid).layout

	var t = this.getSystemById(fire.damages[nbrHit].systemid).layout;

	if (this.mission.arrived){
		var x = t.x * 0.5;
		var y = t.y * 0.5;
		//var x = t.x;
		//var y = t.y;
		return rotate(0, 0, {x: x, y: y}, this.getParent().getDrawFacing());
	}
	else {
		var x = t.x * (this.size / 200);
		var y = t.y * (this.size / 200);
		return rotate(0, 0, {x: x, y: y}, this.getDrawFacing()+90);
	}
}

Mixed.prototype.getTrajectory = function(gun){
	return {x: this.x, y: this.y};
}

Mixed.prototype.getDmgByFire = function(fire){
	if (fire.shooter.salvo && this.id == 25){
		return this.getNew(fire);
	}
	var dmgs = [];
	var lookup = 0;

	for (var i = 0; i < fire.hits.length; i++){
		lookup += fire.hits[i]
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

Mixed.prototype.getNew = function(fire){
	var dmgs = [];
	var lookup = 0;

	for (var i = 0; i < fire.hits.length; i++){
		lookup += fire.hits[i]
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

Mixed.prototype.getExplosionSize = function(j){
	if (this.flight){
		return this.structures[j].mass / 3;
	}
	else if (this.salvo){
		return this.structures[j].mass * 2;
	}
}

Mixed.prototype.drawMoveArea = function(){
	return;
}