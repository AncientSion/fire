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

Mixed.prototype.getPlannedFacing = function(){
	if (game.phase < 2){
		return this.facing;
		//return getAngleFromTo(this, this.nextStep);
	}
	return this.actions[this.actions.length-1].a;
}

Mixed.prototype.getDrawFacing = function(){
	return this.facing;
	return this.getPlannedFacing();
}

Mixed.prototype.getBaseImpulse = function(){
	return this.baseImpulse;
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

Mixed.prototype.doHighlight = function(){
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
		
		if (!this.mission.arrived){
			this.drawMovePlan();
		} else if (this.salvo){
			this.drawTrajectory();
		}
	}
}

Mixed.prototype.drawTrajectory = function(){
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

	if (this.mission.arrived){
		if (this.mission.type == 1){return;}
		else if (this.mission.arrived < game.turn){
			this.doDraw = 0;
		} else if (game.phase > 2 && this.mission.arrived == game.turn){
			this.doDraw = 0;
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

Mixed.prototype.drawMovePlan = function(){
	var target;
	var origin = this.getPlannedPosition();
	if (this.mission.type > 1){
		target = this.getTarget().getPlannedPosition();
	} else target = {x: this.mission.x, y: this.mission.y};


	var dist = getDistance(this.getPlannedPosition(), target);
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
		return this.getTarget().getPlannedPosition();
	} else return this.mission;
}

Mixed.prototype.inRange = function(){
	if (getDistance(this.getTargetPosition(), this.getBaseOffsetPos()) <= this.getCurrentImpulse()){
		return true;
	} else return false;
}

Mixed.prototype.getTarget = function(){
	return game.getUnitById(this.mission.targetid);	
}

Mixed.prototype.setTarget = function(){
	var i = this.getCurrentImpulse();
	if (this.mission.type == 1){  // patrol goal
		this.finalStep = {x: this.mission.x, y: this.mission.y};
		d = getDistance(this, this.finalStep);
		if (d < i){
			this.nextStep = this.finalStep;
		} else this.nextStep = getPointInDirection(i, this.facing, this.x, this.y);
	}
	else {
		if (this.mission.type == 2){
			var target = this.getTarget();
			if (target.ship){
				this.finalStep = target.getPlannedPosition();
				var d = getDistance(this, this.finalStep);
				if (d < i){
					this.nextStep = this.finalStep;
				} else this.nextStep = getPointInDirection(i, getAngleFromTo(this, this.finalStep), this.x, this.y);
			}
			else if (target.flight){
				var i = this.getCurrentImpulse();
				var d;
				if (this.mission.type == 2 || this.mission.type == 3){ // strike intercept goal
					if (target.finalStep == undefined){
						target.setTarget();
					}
					this.finalStep = target.nextStep;
					d = getDistance(this, target.nextStep);
					if (d < i){
						this.nextStep = target.nextStep;
					} else this.nextStep = getPointInDirection(i, getAngleFromTo(this, target.nextStep), this.x, this.y);
				}
			}
			else if (target.salvo){
			}
		}
	}

	this.facing = getAngleFromTo(this, this.nextStep);
}

Mixed.prototype.drawSelf = function(){
	ctx.translate(this.drawX, this.drawY)
	ctx.rotate((this.getDrawFacing()+90) * Math.PI/180);
	ctx.drawImage(this.drawImg, -this.drawImg.width/2, -this.drawImg.height/2);
	ctx.rotate(-(this.getDrawFacing()+90) * Math.PI/180);
	ctx.translate(-this.drawX, -this.drawY);
}

Mixed.prototype.drawEscort = function(){
	return;
}

Mixed.prototype.canShortenTurn = function(){
	return false;
}

Mixed.prototype.canUndoShortenTurn = function(){
	return false;
}

Mixed.prototype.create = function(){
	this.setRawImage();
	this.setStatus();
	this.setLayout();
	this.setDrawData();
	if (this.id < 0){
		this.setMaxMass();
		this.setImpulse();
	}
	this.setSize();
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
	if (this.cc.length){
		for (var j = 0; j < this.cc.length; j++){
			for (var i = 0; i < game.ships.length; i++){
				if (this.cc[j] == game.ships[i].id && game.ships[i].ship){
					return game.ships[i];
				}
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

Mixed.prototype.setImage = function(){
	if (!this.mission.arrived){
		this.setPreMoveImage();
	}
	else if (this.mission.arrived){
		if (this.mission.arrived < game.turn){
			this.setPostMoveImage();
		} 
		else if (this.mission.arrived == game.turn){
			if (game.phase < 3){
				this.setPreMoveImage();
			} else this.setPostMoveImage();

		}
	}
}

Mixed.prototype.getLockMultiplier = function(){
	return 1.0;
}

Mixed.prototype.setPreMoveImage = function(){
	var t = document.createElement("canvas");
		t.width = this.size*2;
		t.height = this.size*2;
	var ctx = t.getContext("2d");

	var size = 12;
	var rota = (this.getDrawFacing()+90) * (Math.PI/180);

	ctx.translate(t.width/2, t.height/2);
	//ctx.rotate(rot);

	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].draw){
			ctx.translate(this.structures[i].layout.x, this.structures[i].layout.y);
			//ctx.rotate(rot);
			ctx.drawImage(
				window.shipImages[this.structures[i].name.toLowerCase()],
				0 -size/2,
				0 -size/2,
				size, 
				size
			)
			//ctx.rotate(-rot);
			ctx.translate(-this.structures[i].layout.x, -this.structures[i].layout.y);
		;}
	}	
	//ctx.translate(this.size/2, this.size/2);
	//ctx.rotate((this.getDrawFacing()+90) * (Math.PI/180));
	ctx.setTransform(1,0,0,1,0,0);

	this.drawImg = t;
}


Mixed.prototype.setPreMoveImagea = function(){
	var t = document.createElement("canvas");
		t.width = this.size*2;
		t.height = this.size*2;
	var ctx = t.getContext("2d");

	var size = 12;
	ctx.translate(t.width/2, t.height/2);
	ctx.rotate((this.getDrawFacing()+90) * (Math.PI/180));

	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].draw){
			ctx.drawImage(
				window.shipImages[this.structures[i].name.toLowerCase()],
				this.structures[i].layout.x -size/2,
				this.structures[i].layout.y -size/2,
				size, 
				size
			)
		;}
	}	
	//ctx.translate(this.size/2, this.size/2);
	//ctx.rotate((this.getDrawFacing()+90) * (Math.PI/180));
	ctx.setTransform(1,0,0,1,0,0);

	this.drawImg = t;
}

Mixed.prototype.setPostMoveImage = function(){
	var size = 12;
	var t = document.createElement("canvas");
		t.width = this.size;
		t.height = this.size;
	var ctx = t.getContext("2d");

	if (this.mission.type == 1){ // patrol
		ctx.translate(this.size/2, this.size/2);
		for (var i = 0; i < this.structures.length; i++){
			if (this.structures[i].draw){
				ctx.save();
				var ox = range(-this.size/3, this.size/3);
				var oy = range(-this.size/3, this.size/3);

				ctx.translate(ox, oy);			
				ctx.rotate(range(0, 360) * (Math.PI/180));
				ctx.drawImage(
					this.smallImg,
					0 -size/2,
					0 -size/2,
					size, 
					size
				);
				ctx.restore();
			}
		}
	}
	else if (this.mission.type == 5){ // strike escort
		ctx.translate(this.size/2, this.size/2);
		for (var i = 0; i < this.structures.length; i++){
			if (this.structures[i].draw){
				ctx.save();		
				//ctx.rotate((((360/this.structures.length-1)*i)+this.getDrawFacing()) * (Math.PI/180));
				ctx.drawImage(
					this.smallImg,
					0 -size/2,
					this.size/2 -size/2 -7,
					size, 
					size
				);
				ctx.restore();
			}
		}
	}
	ctx.setTransform(1,0,0,1,0,0);
	this.drawImg = t;
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

Mixed.prototype.getGunOrigin = function(j){
	for (var i = j; i < this.structures.length; i++){
		if ( (!this.structures[i].destroyed && !this.structures[i].disabled) || this.structures[i].isDestroyedThisTurn() ) {
			return this.structures[i].layout;
		}
	}
}

Mixed.prototype.getFireDest = function(fire, isHit, nbrHit){
	if (!isHit){
		return {x: range(-30, 30), y: range(-30, 30)}
	}
	return this.getSystemById(fire.damages[nbrHit].systemid).layout;
}

Mixed.prototype.getTrajectory = function(gun){
	return {x: this.x, y: this.y};
}

Mixed.prototype.getDamageEntriesByFireId = function(fire){
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