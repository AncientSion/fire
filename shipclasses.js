function Ship(id, name, shipType, x, y, facing, faction, mass, cost, profile, size, userid, available){
	this.id = id;
	this.name = name;
	this.shipType = shipType;
	this.x = x;
	this.y = y;
	this.facing = facing;
	this.faction = faction;
	this.mass = mass;
	this.cost = cost;
	this.profile = profile;
	this.size = size;
	this.userid = userid;
	this.shipType = shipType;
	this.baseHitChance = Math.ceil(Math.pow(this.mass, 0.55));
	this.friendly;
	this.deployed;
	this.available = available;
	this.primary;
	this.ship = true;
	this.flight = false;
	this.highlight = false;
	this.destroyed = false;

	this.img;
	this.turns = [];
	this.actions = [];
	this.validMoveArcs = [];
	this.impulseAdjust = [];
	this.structures = [];

	this.getDamageEntriesByFireId = function(fireid){
		var ret = [];
		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].damages.length; j++){
				if (this.structures[i].damages[j].fireid == fireid){
					ret.push(this.structures[i].damages[j]);
				}
			}
		}
		return ret;
	}

	this.draw = function(){
		if (this.deployed){
			this.drawSelf();
			this.drawIndicator();
			//this.drawCenterPoint();
		}
	}

	this.drawSelf = function(){
		var a = this.facing * Math.PI/180;
		ctx.save();
		ctx.translate(this.x, this.y)
		ctx.rotate(a);
		ctx.drawImage(this.img, -this.size/2, -this.size/2, this.size, this.size);
		ctx.restore();
	}

	this.drawIndicator = function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size/2, 0, 2*Math.PI, false);
		ctx.closePath();

		ctx.lineWidth = 2;
		ctx.globalAlpha = 0.8;
		if (this.friendly){ctx.strokeStyle = "green";}
		else {ctx.strokeStyle = "red";}
		ctx.stroke();
		ctx.lineWidth = 1;
		ctx.globalAlpha = 1;
		ctx.strokeStyle = "black";
		return true;
	}

	this.drawCenterPoint = function(){
		ctx.beginPath();
		ctx.arc(0, 0, 2, 0, 2*Math.PI, false);
		ctx.closePath();
		ctx.fillStyle = "red";
		ctx.fill();
	}

	this.animationSetup = function(){
		var start = this.getTurnStartPosition();
		this.facing = this.getTurnStartFacing();

		this.x = start.x;
		this.y = start.y;
	}

	this.getFiringPosition = function(){
		return new Point(
			this.x + range(this.size * 0.3 * -1, this.size * 0.3),
			this.y + range(this.size * 0.3 * -1, this.size * 0.3)
		)
	}

	this.getTargettingPos = function(){
		return new Point(
			this.x + range(this.size * 0.3 * -1, this.size * 0.3),
			this.y + range(this.size * 0.3 * -1, this.size * 0.3)
		)		
	}

	this.getTurnStartPosition = function(){
		for (var i = this.actions.length-1; i >= 0; i--){
			if (this.actions[i].turn == game.turn-1){
				return this.actions[i];
			}
		}
		return this.actions[0];
	}

	this.getTurnEndPosition = function(){
		return this.actions[this.actions.length-1];
	}


	this.getTurnStartFacing = function(){
		var angle = 0;
		var index = 0;

		for (var i = 0; i < this.actions.length; i++){
			if (this.actions[i].type == "deploy"){
				angle += this.actions[i].a;
			}
			else if (this.actions[i].turn >= game.turn){
				break;
			}
			else {
				angle += this.actions[i].a;
			}
		}

		return angle;
	}

	this.getFacing = function(){
		var angle = 0;
		for (var i = 0; i < this.actions.length; i++){
			if (this.actions[i].resolved == 1){
				angle += this.actions[i].a;
			}
		}
		return angle;
	}

	this.getControlArea = function(){
		if (this.actions.length){
			var pos = this.getBaseOffsetPos();
			return {pos: pos, s: this.size*2};
		}
		else return false;
	}

	this.canDeployHere = function(pos){
		//console.log(pos);
		var valid = false;
		if (game.deployArea.x > 0){
			if (pos.x >= game.deployArea.x && pos.x <= game.deployArea.x + game.deployArea.w){
				if (pos.y >= game.deployArea.y && pos.y <= game.deployArea.y + game.deployArea.h){
					valid = true;
				}
			}
		}
		else if (pos.x <= game.deployArea.x && pos.x >= game.deployArea.x + game.deployArea.w){
			if (pos.y >= game.deployArea.y && pos.y <= game.deployArea.y + game.deployArea.h){
				valid = true;
			}
		}
		else if (pos.x > game.deployArea.x && pos.x < game.deployArea.x + game.deployArea.w){
			if (pos.y > game.deployArea.y && pos.y < game.deployArea.y + game.deployArea.h){
				valid = true;
			}
		}

		if (valid){
			for (var i = 0; i < game.ships.length; i++){
				if (game.ships[i].id != this.id){
					var area = game.ships[i].getControlArea();
					if (area){
						var dist = getDistance(pos, area.pos);
						if (dist <= area.s){
							popup("The selected entry point is subject to gravitic distortions and cant be chosen");
							return false;
						}
					}
				}
			}
			return true;
		}
		return false;
	}

	this.doDeploy = function(pos){
		if (this.actions.length){
			this.actions[0].x = pos.x;
			this.actions[0].y = pos.y;
			this.select();
		}
		else {
			var facing = 0;
			if (this.userid == 1){facing = 0;}else {facing = 180};
			this.actions.push(new Move("deploy", 0, pos.x, pos.y, facing, 0, 0));
			this.deployed = true;

			var shipId = this.id;
			var table = $("#deployTable").find("tr").each(function(i){
				if ($(this).data("shipid") == shipId){
					$(this).remove();
					return;
				}
			})
		}
		this.setPosition();
		this.setFacing();
		game.disableDeployment();
		game.draw();
	}

	this.canDeployFlightHere = function(pos){
		var dist = getDistance({x: this.x, y: this.y}, {x: pos.x, y: pos.y})
		if (dist <= game.flightDeploy.range){
			var a = getAngleFromTo( {x: this.x, y: this.y}, {x: pos.x, y: pos.y} );
				a = addAngle(this.facing, a);
			if (isInArc(a, game.flightDeploy.start, game.flightDeploy.end)){
				return true;
			}
		}
		return false;
	}
	
	this.getBaseOffsetPos = function(){
		if (this.actions.length == 1){
			return {x: this.actions[0].x, y: this.actions[0].y};
		}
		else {
			for (var i = this.actions.length-1; i >= 0; i--){
				if (this.actions[i].resolved == 1){
					return {x: this.actions[i].x, y: this.actions[i].y};
				}
			}
		}
	}
	
	this.getOffsetPos = function(){
		return {x: this.actions[this.actions.length-1].x, y: this.actions[this.actions.length-1].y};
	}
	
	this.getOnsetPos = function(){
		return {x: this.actions[this.actions.length-1].x, y: this.actions[this.actions.length-1].y};
	}

	this.setPosition = function(){
		if (this.deployed){
			if (this.actions.length == 1){
				this.x = this.actions[0].x;
				this.y = this.actions[0].y;
				return;
			}
			for (var i = this.actions.length-1; i >= 0; i--){
				if (this.actions[i].resolved){
					this.x = this.actions[i].x;
					this.y = this.actions[i].y;
					return;
				}
			}
		}
	}

	this.setFacing = function(){
		var facing = 0;
		if (this.deployed){
			if (this.actions.length == 1){
				this.facing = this.actions[0].a;
				return;
			}
			for (var i = 0; i < this.actions.length; i++){
				if (this.actions[i].resolved){
					facing += this.actions[i].a;
				}
			}	
		}

		this.facing = facing;
	}

	this.getWeaponPosition = function(fire){
		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].systems.length; j++){
				if (this.structures[i].systems[j].id == fire.weaponid){
					var a = range(this.structures[i].start, this.structures[i].end);
					return getPointInDirection(range(0, this.size / 4), a, 0, 0);
				}
			}
		}
	}
	
	this.create = function(){
		this.img = window.shipImages[this.name.toLowerCase()];
		this.setPosition();
		this.setFacing()
	}

	this.isDestroyed = function(){
		if (this.primary.destroyed){
			return true;
		}
		return false;
	}

	this.isDestroyedThisTurn = function(){
		if (this.primary.destroyed && this.primary.damages[this.primary.damages.length-1].turn == game.turn){
			return true;
		}
		return false;
	}

	this.hasHangarSelected = function(){		
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


	this.hasSystemsSelected = function(){		
		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].systems.length; j++){
				if (this.structures[i].systems[j].selected){
					return true;
				}
			}
		}

		return false;
	}

	this.hasWeaponsSelected = function(){		
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

	this.getStructureById = function(id){
		for (var i = 0; i < this.structures.length; i++){
			if (this.structures[i].id == id){
				return this.structures[i];
			}
		}
	}

	this.getSystemById = function(id){
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

	this.getPrimarySection = function(){
		return this.primary;
	}

	this.highlightSingleSystem = function(system){
		var angle = this.getPlannedFacingToMove(this.actions.length-1);
		var pos = this.getOffsetPos();
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
	
	this.highlightAllSelectedWeapons = function(){
		fxCtx.clearRect(0, 0, res.x, res.y);
		fxCtx.translate(cam.o.x, cam.o.y);
		fxCtx.scale(cam.z, cam.z);

		$(fxCanvas).css("opacity", 0.2);
		var angle = this.getPlannedFacingToMove(this.actions.length-1);
		var pos = this.getOffsetPos();

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

	this.drawStructureAxis = function(struct){
		fxCtx.clearRect(0, 0, res.x, res.y);
		fxCtx.translate(cam.o.x, cam.o.y);
		fxCtx.scale(cam.z, cam.z);

		$(fxCanvas).css("opacity", 1);
		var angle = this.getPlannedFacingToMove(this.actions.length-1);
		var pos = this.getOffsetPos();
		var p1 = getPointInDirection(res.x, struct.start + angle, pos.x, pos.y);
		var p2 = getPointInDirection(res.y, struct.end + angle, pos.x, pos.y)
		var dist = getDistance( {x: pos.x, y: pos.y}, p1);
		var rad1 = degreeToRadian(struct.start + angle);
		var rad2 = degreeToRadian(struct.end + angle);
		
		fxCtx.beginPath();			
		fxCtx.moveTo(pos.x, pos.y);
		fxCtx.arc(pos.x, pos.y, dist, rad1, rad2, false);
		fxCtx.closePath();
		fxCtx.globalAlpha = 0.3;			
		fxCtx.fillStyle = "lightBlue";
		fxCtx.fill();
		fxCtx.globalAlpha = 1;
		fxCtx.strokeStyle = "black";
		fxCtx.stroke();

		fxCtx.setTransform(1,0,0,1,0,0);
	}

	this.showHangarLaunchAxis = function(hangar){
		fxCtx.clearRect(0, 0, res.x, res.y);
		fxCtx.translate(cam.o.x, cam.o.y);
		fxCtx.scale(cam.z, cam.z);

		$(fxCanvas).css("opacity", 1);
		var angle = this.getPlannedFacingToMove(this.actions.length-1);
		var pos = this.getOffsetPos();
		var p1 = getPointInDirection(hangar.range, hangar.start + angle, pos.x, pos.y);
		var p2 = getPointInDirection(hangar.range, hangar.end + angle, pos.x, pos.y)
		var dist = getDistance( {x: pos.x, y: pos.y}, p1);
		var rad1 = degreeToRadian(hangar.start + angle);
		var rad2 = degreeToRadian(hangar.end + angle);
		
		fxCtx.beginPath();			
		fxCtx.moveTo(pos.x, pos.y);
		fxCtx.arc(pos.x, pos.y, dist, rad1, rad2, false);
		fxCtx.closePath();
		fxCtx.globalAlpha = 0.3;			
		fxCtx.fillStyle = "lightBlue";
		fxCtx.fill();
		fxCtx.globalAlpha = 1;
		fxCtx.strokeStyle = "black";
		fxCtx.stroke();

		fxCtx.setTransform(1,0,0,1,0,0);
	}
	
	this.weaponHighlight = function(weapon){
		if (weapon.highlight){
			$("#weaponTable" + weapon.id).addClass("disabled");
			fxCtx.clearRect(0, 0, res.x, res.y);	
			weapon.highlight = false;
		}
		else {
			$("#weaponTable" + weapon.id).removeClass("disabled");	
			var angle = this.getPlannedFacingToMove(this.actions.length-1);
			var shipPos = this.getOffsetPos();
			weapon.highlight = true;		
			weapon.drawArc(angle, shipPos);
		}
	}

	this.getRemainingImpulse = function(){	
		var impulse = this.getTotalImpulse();

		if (game.phase > 1){
			return impulse;
		}
		else if (this.flight && this.dogfights.length){
			return 0;
		}
		else {
			for (var i = 0; i < this.actions.length; i++){
				if (this.actions[i].turn == game.turn){
					if (this.actions[i].type == "move"){
						impulse -= this.actions[i].dist;
					}
				}
			}
			return impulse;
		}
	}
	
	this.getImpulseChangeCost = function(){
		var cost = Math.ceil((Math.pow(this.mass, 1.25))*this.getImpulseMod() / 500);	
		return cost;
	}

	this.getTotalImpulse = function(){	
		var base = this.getBaseImpulse();
		var change = this.getImpulseStep();
		
		for (var i = 0; i < this.actions.length; i++){
			if (this.actions[i].type == "speedChange"){
				if (this.actions[i].dist == 1){
					base += change;
				}
				else if (this.actions[i].dist == -1){
					base -= change;
				}
			}
		}
		
		return base;
	}

	this.getImpulseStep = function(){
		return 15;
		Math.floor(this.getBaseImpulse() / 10);
	}
	
	this.getImpulseMod = function(){
		return this.getTotalImpulse() / this.getBaseImpulse();
	}
	
	this.getTurnCost = function(){
		if (this.actions.length && (this.actions[0].type == "deploy" && this.actions[0].turn == game.turn && this.actions[0].resolved == 0)){
			return 0;
		}
		else return Math.ceil((Math.pow(this.mass, 1.56) / 10000) *  this.getImpulseMod());
	}
	
	this.getBaseTurnDelay = function(){
		return Math.pow(this.mass, 0.55);
	}
	
	this.getTurnDelay = function(){
		if (this.actions[0].type == "deploy" && this.actions[0].turn == game.turn && this.actions[0].resolved == 0){
			return 0;
		}
		else return Math.ceil(this.getBaseTurnDelay() * this.getImpulseMod());
	}

	this.drawArcIndicator = function(){
		return;
		var shipPos = this.getBaseOffsetPos();
		var angle = this.getPlannedFacingToMove(this.actions.length-1);

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
	
	this.drawMoveRange = function(){	

		center = new Point(this.actions[this.actions.length-1].x, this.actions[this.actions.length-1].y);
		
		var rem = this.getRemainingImpulse();
		var angle = this.getPlannedFacingToMove(this.actions.length-1);
		var start = addAngle(10, angle);
		var end = addAngle(350, angle);
		
		this.validMoveArcs = {start: 350, end: 10};

		var p1 = getPointInDirection(rem, start, center.x, center.y);
		var dist = getDistance( {x: center.x, y: center.y}, p1);
		var rad1 = degreeToRadian(start);
		var rad2 = degreeToRadian(end);
		
		var delay = this.getRemainingDelay();
		
		if (delay > 0){
			var delayRad1 = degreeToRadian(start-45);
			var delayRad2 = degreeToRadian(end+45);
			moveCtx.beginPath();			
			moveCtx.arc(center.x, center.y, delay, delayRad1, delayRad2, false);
			moveCtx.closePath();
			moveCtx.strokeStyle = "white";
			moveCtx.lineWidth = 2
			moveCtx.stroke();
			moveCtx.strokeStyle = "black";	
			moveCtx.arc(center.x, center.y, delay-3, 0, 2*Math.PI, false);
			moveCtx.globalCompositeOperation = "destination-out";
			moveCtx.fill();
			moveCtx.globalCompositeOperation = "source-over";
		}

		moveCtx.beginPath();			
		moveCtx.moveTo(center.x, center.y);
		moveCtx.lineTo(p1.x, p1.y); 
		moveCtx.arc(center.x, center.y, dist, rad1, rad2, false);
		moveCtx.closePath();
		if (game.phase == 2){
			moveCtx.globalAlpha = 0.2;
		}
		else {
			moveCtx.globalAlpha = 0.35;
		}
		moveCtx.fillStyle = "white";
		moveCtx.fill();
		moveCtx.globalAlpha = 1;

	}

	this.getEP = function(){
		var ep = 0;

		for (var i = 0; i < this.primary.systems.length; i++){
			if (this.primary.systems[i].name == "Engine"){
				ep += this.primary.systems[i].getOutput();
			}
		}

		return ep;
	}
	
	this.getRemainingEP = function(){
		var ep = this.getEP();
		
		for (var i = 1; i < this.actions.length; i++){
			if (this.actions[i].turn == window.gd.turn){
				if (this.actions[i].cost != 0){
					ep -= this.actions[i].cost * this.actions[i].costmod;
				}
			}
		}
		
		return Math.floor(ep);
	}
	
	this.getRemainingDelay = function(){
		var delay = 0;
		for (var i = 0; i < this.actions.length; i++){
			if (this.actions[i].type == "turn"){
				delay += Math.ceil(this.actions[i].delay/this.actions[i].costmod);
			}
			else if (this.actions[i].type == "move"){
				if (delay > 0){ delay -= this.actions[i].dist;}
				if (delay < 0){ delay = 0;}
			}
		}
		return Math.floor(delay);
	}

	this.getPlannedPosition = function(){
		if (this.actions.length){
			return new Point(this.actions[this.actions.length-1].x, this.actions[this.actions.length-1].y);
		}
		else {
			return new Point(this.x, this.y);
		}
	}
		
	this.getPlannedFacingToMove = function(end){
		if (end == undefined){
			end = this.actions.length-1;
		}

		var angle = 0;
		
		for (var i = 0; i <= end; i++){
			if (this.actions[i].type == "deploy" || this.actions[i].type == "turn"){
				angle += this.actions[i].a;
			}
		}
		return angle;
	}
		
	this.canIncreaseImpulse = function(){
		if (this.getRemainingEP() >= this.getImpulseChangeCost()){
			if (this.actions.length == 1){
				return true;
			}
			else if (this.actions[this.actions.length-1].turn == game.turn -1){
				return true;
			}
			if (this.actions[this.actions.length-1].type == "speedChange" && this.actions[this.actions.length-1].dist == 1){
				return true;
			}
		}
		else if (this.actions[this.actions.length-1].type == "speedChange" && this.actions[this.actions.length-1].dist == -1){
			return true;
		}
	
		return false;
	}
	
	this.canDecreaseImpulse = function(){
		if (this.getRemainingEP() >= this.getImpulseChangeCost()){
			if (this.actions.length == 1){
				return true;
			}
			else if (this.actions[this.actions.length-1].turn == game.turn -1){
				return true;
			}
			if (this.actions[this.actions.length-1].type == "speedChange" && this.actions[this.actions.length-1].dist == -1){
				return true;
			}
		}
		else if (this.actions[this.actions.length-1].type == "speedChange" && this.actions[this.actions.length-1].dist == 1){
			return true;
		}
	
		return false;
	}

	this.getShortenTurnCost = function(){
		if (this.turns.length){
			return Math.ceil(this.turns[0].cost * (this.turns[0].costmod + 0.2));
		}
		else {
			return Math.ceil(this.getTurnCost() * 1.2);
		}
	}
	
	this.canShortenTurn = function(){
		if (game.phase == 0 || game.phase == 1){
			if (this.getRemainingEP() >= this.getShortenTurnCost()){
				return true;
			}
		}

		return false;
	}
	
	this.canUndoShortenTurn = function(){
		if (game.phase == 0 || game.phase == 1){
			if (this.turns.length){
				if (this.turns[0].costmod > 1){
					return true;
				}
			}
		}
	}
	
	this.doShortenTurn = function(max){
		if (max && !this.canDoAnotherTurn()){
			while (this.canShortenTurn()){
				for (var i = 0; i < this.turns.length; i++){
					this.turns[i].costmod += 0.2;
				}
			}
		}
		else if (max){
			while (this.canDoAnotherTurn()){
				for (var i = 0; i < this.turns.length; i++){
					this.turns[i].costmod += 0.2;
				}
			}
		}
		else {
			for (var i = 0; i < this.turns.length; i++){
				this.turns[i].costmod += 0.2;
			}
		}
		this.drawDelayEstimator();
		this.updateTurnElements();
	}
	
	this.doUndoShortenTurn = function(max){
		for (var i = 0; i < this.turns.length; i++){
			if (this.turns[i].costmod > 1){
				this.turns[i].costmod -= 0.2;
			}
		}
		this.drawDelayEstimator();
		this.updateTurnElements();
	}

	this.updateTurnElements = function(){
		var canShorten = this.canShortenTurn();
		var canUndoShorten = this.canUndoShortenTurn();
		var canDoAnotherTurn = this.canDoAnotherTurn();
		var cost = Math.floor(this.turns[0].cost * this.turns[0].costmod);
		var delay = Math.floor(this.turns[0].delay / this.turns[0].costmod);

		$(".turnEle").each(function(i){
			$(this).find("#epCost").html(cost +  " EP");
			$(this).find("#turnDelay").html(delay + "px");

			if (canDoAnotherTurn){
				$(this).find("#epCost").removeClass("red").addClass("green");
			} else $(this).find("#epCost").removeClass("green").addClass("red");

			if (!canShorten && !canUndoShorten){
				$(this).find(".shortenTurn").hide(); return;
			} else {
				$(this).find(".shortenTurn").show();
			}
			if (canShorten){
				$(this).find(".doShortenTurn").find("img").show();
			} else $(this).find(".doShortenTurn").find("img").hide();
			if (canUndoShorten){
				$(this).find(".doUndoShortenTurn").find("img").show();
			} else $(this).find(".doUndoShortenTurn").find("img").hide();
		})
	}

	this.canDoAnotherTurn = function(){
		var i = 0;
		if (this.turns[i].cost * (this.turns[i].costmod + 0.2) + this.getTurnCost() < this.getRemainingEP()){
			return true;
		}
		else return false;
	}

	this.doIncreaseImpulse = function(){
		var shipPos = this.getPlannedPosition();
		if (this.actions.length && this.actions[this.actions.length-1].type == "speedChange" && this.actions[this.actions.length-1].dist == -1){
			this.actions.splice(this.actions.length-1, 1);
		}
		else {
			var action = new Move("speedChange", 1, shipPos.x, shipPos.y, false, 0, this.getImpulseChangeCost());
			this.actions.push(action);
		}
		this.unsetMoveMode();
		this.setMoveMode();
	}

	this.doDecreaseImpulse = function(){
		var shipPos = this.getPlannedPosition();
		if (this.actions.length && this.actions[this.actions.length-1].type == "speedChange" && this.actions[this.actions.length-1].dist == 1){
			this.actions.splice(this.actions.length-1, 1);
		}
		else {
			var action = new Move("speedChange", -1, shipPos.x, shipPos.y, false, 0, this.getImpulseChangeCost());
			this.actions.push(action);
		}
		this.unsetMoveMode();
		this.setMoveMode();
	}
	
	this.drawMovementPlan = function(){
		planCtx.strokeStyle = "#00ea00";
		for (var i = 0; i < this.actions.length; i++){
			if (this.actions[i].turn == game.turn){
				var action = this.actions[i];
				planCtx.beginPath();
				
				if (i == 0){
					var p = this.getBaseOffsetPos();
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
					var angle = this.getPlannedFacingToMove(i);
					
					planCtx.beginPath();
					planCtx.arc(action.x, action.y, 5, 0, 2*Math.PI, false);
					planCtx.stroke();
				}
				
				planCtx.closePath();
			}
		}		
		planCtx.strokeStyle = "black";			
	}

	this.drawMovementUI = function(){
		this.drawImpulseUI();
		this.drawVectorMovementUI();

		if (this.canTurn()){
			this.drawTurnUI();
			this.updateDiv();
		}
	}

	this.drawVectorMovementUI = function(){
		var center = this.getPlannedPosition();
		var angle = this.getPlannedFacingToMove(this.actions.length-1);
		var rem = this.getRemainingImpulse();
		var delay = this.getRemainingDelay();
		var ele;

		if (rem > 0){
			ele = document.getElementById("maxVector");
			var p = getPointInDirection(rem + 80, angle, center.x, center.y);
			var left = p.x * cam.z  + cam.o.x - $(ele).width()/2;
			var top = p.y * cam.z  + cam.o.y - $(ele).height()/2;

			$(ele)
				.data("shipid", this.id)
				.html("<div style='margin-left: 4px; margin-top: 7px'>"+rem+"<div>")
				.css("left", left)
				.css("top", top)
				.removeClass("disabled")
		}
		if (delay > 0){
			if (rem >= delay){
				ele = document.getElementById("maxTurnVector");
				var p = getPointInDirection(rem + 40, angle, center.x, center.y);
				var left = p.x  * cam.z  + cam.o.x - $(ele).width()/2;
				var top = p.y * cam.z  + cam.o.y - $(ele).height()/2;

				$(ele)
					.data("shipid", this.id)
					.html("<div style='margin-left: 4px; margin-top: 7px'>"+delay+"<div>")
					.css("left", left)
					.css("top", top)
					.removeClass("disabled")
			}
		}
	}

	this.drawVectorIndicator = function(){
		var center = this.getPlannedPosition();
		var angle = this.getPlannedFacingToMove(this.actions.length-1);
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

	this.getTurnAngle = function(){
		return 25;
	}

	this.getTurnWidth = function(){
		return 1;
	}

	this.drawTurnUI = function(){
		var center;
		var plannedAngle = this.getPlannedFacingToMove(this.actions.length-1);
		var cost = this.getTurnCost();
		var delay = this.getTurnDelay();
		
		if (this.actions.length){
			center = new Point(this.actions[this.actions.length-1].x, this.actions[this.actions.length-1].y);
		}
		else center = this.getBaseOffsetPos();

		var a = this.getTurnAngle();
		var w = this.getTurnWidth();
		
		for (var j = 1; j >= -1; j = j-2){
			for (var i = 1; i <= w; i++){
			
				var modAngle = a * i * j;
				var newAngle = addToDirection(plannedAngle, modAngle);

				var turn = {
							x: center.x,
							y: center.y, 
							a: modAngle,
							cost: cost,
							delay: delay,
							thrustUp: false,
							costmod: 1
							}
				this.turns.push(turn)

				var p = getPointInDirection(this.size*1.5*cam.z, newAngle, center.x, center.y);

				moveCtx.beginPath();
				moveCtx.moveTo(center.x, center.y);
				moveCtx.lineTo(p.x, p.y);
				moveCtx.closePath();
				moveCtx.strokeStyle = "white";
				moveCtx.stroke();

				var turnEle;

				if (modAngle < 0){turnEle = document.getElementById("turnLeft")}
				else {turnEle = document.getElementById("turnRight")}

				$(turnEle).find("#epCost").html(Math.floor(cost * turn.costmod) + " EP");
				$(turnEle).find("#turnDelay").html(Math.floor(delay / turn.costmod) + "px");

				var p1 = getPointInDirection(150/cam.z, addToDirection(newAngle, modAngle), center.x, center.y);
				
				//	return { x: (this.x - cam.o.x) / cam.z, y: (this.y - cam.o.y) / cam.z}

				var left = p1.x * cam.z + cam.o.x - $(turnEle).width()/2;
				var top = p1.y * cam.z + cam.o.y - $(turnEle).height()/2;

				$(turnEle).find(".doTurn")
					.data("a", modAngle)
					.data("shipid", this.id)

				$(turnEle)
					.css("left", left)
					.css("top", top)
					.removeClass("disabled")
			}
		}
	
		this.drawDelayEstimator();
		this.updateTurnElements();

	}

	this.drawDelayEstimator = function(){
		var delay = this.turns[0].delay / this.turns[0].costmod;
		if (delay){
			mouseCtx.clearRect(0, 0, res.x, res.y);
			mouseCtx.translate(cam.o.x, cam.o.y);
			mouseCtx.scale(cam.z, cam.z);
			var center;
			var plannedAngle = this.getPlannedFacingToMove(this.actions.length-1);
			if (this.actions.length){
				center = new Point(this.actions[this.actions.length-1].x, this.actions[this.actions.length-1].y);
			}
			else center = this.getBaseOffsetPos();

			var delayRad1 = degreeToRadian(plannedAngle-45);
			var delayRad2 = degreeToRadian(plannedAngle+45);
			mouseCtx.beginPath();			
			mouseCtx.arc(center.x, center.y, delay, delayRad1, delayRad2, false);
			mouseCtx.closePath();
			mouseCtx.strokeStyle = "red";
			mouseCtx.lineWidth = 2
			mouseCtx.stroke();
			mouseCtx.strokeStyle = "black";	
			mouseCtx.arc(center.x, center.y, delay, 0, 2*Math.PI, false);
			mouseCtx.globalCompositeOperation = "destination-out";
			mouseCtx.fill();
			mouseCtx.globalCompositeOperation = "source-over";
			mouseCtx.setTransform(1,0,0,1,0,0);
		}
	}


	this.drawImpulseUI = function(){
		var center = {x: this.x, y: this.y};
		var gui = $("#impulseGUI");
		var w = $(gui).width();
		var h = $(gui).height();
		var p = getPointInDirection((this.size/2 + w)/cam.z, this.facing + 180, center.x, center.y);

		$(gui).css("left", p.x * cam.z + cam.o.x - w/2).css("top", p.y * cam.z + cam.o.y - h/2).removeClass("disabled");
		$(gui).find("#enginePower").html(this.getRemainingEP() + " / " + this.getEP());
		$(gui).find("#impulse").html(this.getRemainingImpulse() + " / " + this.getTotalImpulse());
		$(gui).find("#remTurnDelay").html(this.getRemainingDelay());
		$(gui).find("#nextTurnDelay").html(this.getTurnDelay());
		$(gui).find("#impulseChange").html(this.getImpulseChangeCost() + " EP");
		$(gui).find("#turnCost").html("<span>" + this.getTurnCost() + " EP</span>");

		var p1 = getPointInDirection(this.size/2 + 10 + 15, this.facing + 180, center.x, center.y);

		if (this.canIncreaseImpulse()){
			var pPlus = getPointInDirection(50, this.facing +90, p1.x, p1.y);
			var ox = pPlus.x * cam.z + cam.o.x - 15;
			var oy = pPlus.y * cam.z + cam.o.y - 15;
			$("#plusImpulse").css("left", ox).css("top", oy).removeClass("disabled");
		} else $("#plusImpulse").addClass("disabled");

		if (this.canDecreaseImpulse()){
			var mMinus = getPointInDirection(50, this.facing -90, p1.x, p1.y);
			var ox = mMinus.x * cam.z + cam.o.x - 15;
			var oy = mMinus.y * cam.z + cam.o.y - 15;
			$("#minusImpulse").css("left", ox).css("top", oy).removeClass("disabled");
		} else $("#minusImpulse").addClass("disabled");

		if (this.canUndoLastAction()){
			var ox = p1.x * cam.z + cam.o.x - 15;
			var oy = p1.y * cam.z + cam.o.y - 15;
			$("#undoLastAction").css("left", ox).css("top", oy).removeClass("disabled");
		} else $("#undoLastAction").addClass("disabled");
	}

	
	this.issueMove = function(pos, dist){
		if (this.actions[this.actions.length-1].type == "move" && this.actions[this.actions.length-1].turn == game.turn){
			this.actions[this.actions.length-1].dist+= dist;	
			this.actions[this.actions.length-1].x = pos.x;
			this.actions[this.actions.length-1].y = pos.y;
		}
		else {
			this.actions.push(new Move("move", dist, pos.x, pos.y, 0, 0));	
		}
		this.turns = [];
		this.unsetMoveMode();
		this.setMoveMode();
	}
	
	this.canUndoLastAction = function(){
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
	
	this.undoLastAction = function(pos){		
		this.actions.splice(this.actions.length-1, 1);
		this.turns = [];
		this.unsetMoveMode();
		this.setMoveMode();
	}


	
	//function Move(type, dist, x, y, a, delay, cost, costmod){
	//this.issueMove = function(pos, dist){	

	this.moveToMaxVector = function(){
		var pos = this.getOffsetPos();
		var dist = this.getRemainingImpulse();
		var goal = getPointInDirection(dist, this.getPlannedFacingToMove(this.actions.length-1), pos.x, pos.y);
		this.issueMove(goal, dist);
	}
	
	this.moveToMaxTurnVector = function(){
		var pos = this.getOffsetPos();
		var dist = this.getRemainingDelay();
		var goal = getPointInDirection(dist, this.getPlannedFacingToMove(this.actions.length-1), pos.x, pos.y);
		this.issueMove(goal, dist);
	}
	
	this.canTurn = function(){
		if (this.getRemainingDelay() == 0){
			var have = this.getRemainingEP();
			var need = this.getTurnCost();
			if (have >= need){
				return true;
			}
		}
		else if (this.flight){
			if (this.actions[this.actions.length-1].type == "move"){
				if (this.getRemainingDelay() != 0){
					return false;
				}
			}
			else {
				var turns = 0;
				for (var i = this.actions.length-1; i >= 0; i--){
					if (this.actions[i].turn != game.turn){
						continue;
					}
					else  if (this.actions[i].type == "turn"){
						turns++
					}
					else break;
				}

				if (turns < this.maxTurns){
					var have = this.getRemainingEP();
					var need = this.getTurnCost();
					if (have >= need){
						return true;
					}
				}
			}
		}
		return false;
	}
	
	this.issueTurn = function(a){
		if (this.actions[0].type == "deploy" && this.actions[0].turn == game.turn && this.actions[0].resolved == 0){
			this.actions[0].a += a;
			this.facing += a;
			game.draw();
		}
		else {
			for (var i = 0; i < this.turns.length; i++){
				if (this.turns[i].a == a){
					this.actions.push(
						new Move(
							"turn",
							0,
							this.turns[i].x,
							this.turns[i].y,
							this.turns[i].a,
							this.turns[i].delay,
							this.turns[i].cost,
							this.turns[i].costmod
							)
						);
					break;
				}
			}
		}
		this.unsetMoveMode();
		this.setMoveMode();
	}

	this.getBaseHitChance = function(){
		return this.baseHitChance;
	}

	this.getHitSectionFromAngle = function(a){
		for (var i = 0; i < this.structures.length; i++){
			if (isInArc(a, this.structures[i].start, this.structures[i].end)){
				return this.structures[i];
			}
		}
	}

	this.getHitChanceFromAngle = function(angle){
		//console.log(angle);				342
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
	
	this.createBaseDiv = function(){
		var div = document.createElement("div");
			div.className = "shipDiv";
			$(div).data("shipId", this.id);

		var subDiv = document.createElement("div");
			subDiv.className = "header";
		
		var table = document.createElement("table");
			table.className = "general";
			
		var tr = document.createElement("tr");
		var th = document.createElement("th");
			th.innerHTML = this.name.toUpperCase() + " #" + this.id;
			th.colSpan = 2; th.style.textAlign = "center";
			tr.appendChild(th); table.appendChild(tr);

		/*
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "Position: "; tr.appendChild(td);
		var td = document.createElement("td"); td.className = "pos";
			td.innerHTML = this.x + " / " + this.y; tr.appendChild(td); table.appendChild(tr);
		

		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "Mass: "; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = this.mass; tr.appendChild(td); table.appendChild(tr);
		*/

		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "Impulse: "; tr.appendChild(td);
		var td = document.createElement("td"); td.className = "impulse";
			td.innerHTML = this.getRemainingImpulse() + " / " + this.getTotalImpulse(); tr.appendChild(td); table.appendChild(tr);
			
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "Active Turn Delay: "; tr.appendChild(td);
		var td = document.createElement("td"); td.className = "delay";
			td.innerHTML = this.getRemainingDelay(); tr.appendChild(td); table.appendChild(tr);

		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "Engine Power: "; tr.appendChild(td);
		var td = document.createElement("td"); td.className = "ep";
			td.innerHTML = this.getRemainingEP() + " / " + this.getEP(); tr.appendChild(td); table.appendChild(tr);

		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "Impulse Change: "; tr.appendChild(td);
		var td = document.createElement("td"); td.className = "change";
			td.innerHTML = this.getImpulseChangeCost() + " EP"; tr.appendChild(td); table.appendChild(tr);

		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "Turning: "; tr.appendChild(td);
		var td = document.createElement("td"); td.className = "turn";
			td.innerHTML = this.getTurnCost() + " EP"; tr.appendChild(td); table.appendChild(tr);
				
		subDiv.appendChild(table);
		div.appendChild(subDiv);
		div = this.extendDiv(div);

	}

	this.extendDiv = function(div){
		var iconContainer = document.createElement("div");
			iconContainer.className = "iconContainer";
		var img =  window.shipImages[this.name.toLowerCase()].cloneNode(true); img.className = "rotate270size90";
			iconContainer.appendChild(img);
		div.appendChild(iconContainer);

		$(div).drag();
		$(div).contextmenu(function(e){
			//e.preventDefault();
			e.stopPropagation();
			//$(this).addClass("disabled");
		})
			
		document.getElementById("game").appendChild(div);

		structContainer = document.createElement("div");
		structContainer.className = "structContainer";
		div.appendChild(structContainer);


		var noFront = true;
		var noAft = true;

		for (var i = 0; i < this.structures.length; i++){
			this.structures[i].direction = this.structures[i].getDirection();
			if (this.structures[i].direction == 0 || this.structures[i].direction == 360){
				noFront = false;
			}
			else if (this.structures[i].direction == 180){
				noAft = false;
			}
		}

		var conWidth = $(structContainer).width();
		var conHeight = $(structContainer).height();

		// PRIMARY
		var primaryDiv = document.createElement("div");
			primaryDiv.className = "primaryDiv";
		var primaryTable = document.createElement("table");
			primaryTable.className = "PrimaryTable";
			primaryTable.appendChild(this.primary.getTableRow());

			var systems = 0;
			var max = 3;
			primaryTable.childNodes[0].childNodes[0].colSpan = max;

			for (var i = 0; i < this.primary.systems.length; i++){
				if (systems == 0){
					var tr = document.createElement("tr");
				}

				var td = this.primary.systems[i].getTableData(false);
					td = this.attachEvent(td);

				var boostDiv = this.primary.systems[i].getBoostDiv();
				if (boostDiv){td.appendChild(boostDiv)};

				var powerDiv = this.primary.systems[i].getPowerDiv();
				if (powerDiv){
					powerDiv.style.left = 31 + "px"
					td.appendChild(powerDiv);
				}
				systems++;
				tr.appendChild(td);


				if (systems == max || i == this.primary.systems.length-1 ){
					primaryTable.appendChild(tr);
					systems = 0;
				}
			}

		var offsetX = 0;
		var offsetY = 0;
		if (noFront){
			offsetY -= 70;
		}
		else if (noAft){
			offsetY -= 40;
		}

		primaryDiv.appendChild(primaryTable);
		structContainer.appendChild(primaryDiv);
		var w = $(primaryDiv).width();
		var h = $(primaryDiv).height();
		$(primaryDiv)
			.css("left", conWidth/2 - w/2)
			.css("top", conHeight/2 - h/2 + offsetY)

		// OUTER STRUCTS
		for (var i = 0; i < this.structures.length; i++){

			var structDiv = document.createElement("div");
				structDiv.className = "structDiv";
				
			var structTable = document.createElement("table");
				structTable.className = "structTable";
				$(structDiv).data("structureId", i);

			structTable.appendChild(this.structures[i].getTableRow());

			var col = 0;
			var colWidth = 1;
			var max;
			var a = this.structures[i].direction;
			var w;
			var maxRow = 0;

			if (a == 0 || a == 180 || a == 360){ // front or aft
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

				if (this.structures[i].systems.length <= 3){
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

			if (max == 1){
				structTable.childNodes[0].childNodes[0].style.height = "62px";
			}
			else if (max == 2){
				structTable.childNodes[0].childNodes[0].style.height = "42px";
			}
			else {
				structTable.childNodes[0].childNodes[0].style.height = "23px";
			}


			for (var j = 0; j < this.structures[i].systems.length; j++){
				if (col == 0){
					tr = document.createElement("tr");
					if (this.structures[i].systems.length - j != max){
						if ((this.structures[i].systems.length - j) *2 == max){
							colWidth = 2;
						}
					}
				}

				var td = this.structures[i].systems[j].getTableData(false);
					td.colSpan = colWidth;
					td = this.attachEvent(td);

				var boostDiv = this.structures[i].systems[j].getBoostDiv();
				if (boostDiv){td.appendChild(boostDiv)};

				var powerDiv = this.structures[i].systems[j].getPowerDiv();
				if (powerDiv){
					powerDiv.style.left = colWidth * 31 + "px"
					td.appendChild(powerDiv);
				}

				col++;
				tr.appendChild(td);


				if (col == max){
					structTable.appendChild(tr);
					if (maxRow < col){
						maxRow = col;
					}
					col = 0;
				}
				if (j == this.structures[i].systems.length-1){
					structTable.appendChild(tr);
					if (maxRow < col){
						maxRow = col;
					}
					col = 0;
					$(structTable).find(".struct").attr("colSpan", maxRow);			
				}
			}

			structDiv.appendChild(structTable);
			structContainer.appendChild(structDiv);

			var offsetX = 0;
			var offsetY = -10;


			if (a == 90 || a == 270){
				if (max == 2){
					offsetX += 25;
				}
				else if (max == 1){
					offsetX += 30;
				}
			}
			else if (a == 60 || a == 300){
					offsetX += 10;
			}
			
			var pos = getPointInDirection(135 - offsetX, a-90, conWidth/2, conHeight/2-40);
			var w = $(structDiv).width();
			var h = $(structDiv).height();

			if (noFront){
				offsetY -= 60;
			}

			if (a == 0 || a == 360){
			}
			else if (noAft){
				offsetY -= 60;
			}
			else if (a == 180){
				offsetY += 40;
			}
			else if (!noFront && !noAft){
				offsetY -= 30;
			}

			
			$(structDiv)
				.data("id", this.structures[i].id)
				.data("structureId", i)
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

		$(structContainer).css("height", height + 20);

		var w = $(div).width();
		var h = $(div).height();

		$(div).css("top", 0).css("left", res.x/2 - w/2).addClass("disabled");

		return div;
	}
	
	this.updateDiv = function(){
		var divs = document.getElementsByClassName("shipDiv");
		for (var i = 0; i < divs.length; i++){
			if ($(divs[i]).data("shipId") == this.id){
				var divs = divs[i];
				break;
			}
		}
		
		$(divs).find(".pos").html(this.x + " / " + this.y);
		$(divs).find(".ep").html(this.getRemainingEP() + " / " + this.getEP());
		$(divs).find(".impulse").html(this.getRemainingImpulse() + " / " + this.getTotalImpulse());
		$(divs).find(".delay").html( this.getRemainingDelay());
		$(divs).find(".change").html(this.getImpulseChangeCost() + " EP");
		$(divs).find(".turn").html(this.getImpulseChangeCost() + " EP");
	}

	this.updateDivPower = function(system){
		/*
		if (system instanceof Launcher){
			this.updateNonPowerOutput(system);
			return;
		}
		*/

		var divs = document.getElementsByClassName("shipDiv");
		for (var i = 0; i < divs.length; i++){
			if ($(divs[i]).data("shipId") == this.id){
				var divs = divs[i];
				break;
			}
		}
		var reactor = this.getSystemByName("Reactor");
		var rFound = false;
		var sFound = false;

		$(divs).find(".system").each(
			function(){
				if ($(this).data("systemId") == reactor.id){
					$(this).find(".outputMask").html(reactor.getOutput());
					//reactor.updateSystemDetailsDiv();
					rFound = true;
					if (rFound && sFound){
						return;
					}
				}
				else if ($(this).data("systemId") == system.id){
					$(this).find(".outputMask").html(system.getOutput());
					system.update();
					sFound = true;
					if (rFound && sFound){
						return;
					}
				}
			}
		)
	}

	this.updateNonPowerOutput = function(system){
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

	this.getSystemByName = function(name){
		for (var i = 0; i < this.primary.systems.length; i++){
			if (this.primary.systems[i].name == name){
				return this.primary.systems[i];
			}
		}
		return false;
	}
	this.attachEvent = function(td){
		$(td).data("shipId", this.id);
		$(td).hover(
			function(e){
				e.stopPropagation();
				game.getUnitById($(this).data("shipId")).getSystemById($(this).data("systemId")).hover(e);
			}
		).click(
			function(e){
				e.stopPropagation();
				game.getUnitById($(this).data("shipId")).getSystemById($(this).data("systemId")).select(e);
			}
		).
		contextmenu(
			function(e){
				e.preventDefault();
				game.getUnitById($(this).data("shipId")).selectAll(e, $(this).data("systemId"));
			}
		);
		return td;
	}

	this.selectAll = function(e, id){
		var display = this.getSystemById(id).display;
		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].systems.length; j++){
				if (this.structures[i].systems[j].display == display){
					if (! this.structures[i].systems[j].destroyed){
						this.structures[i].systems[j].select(e);
					}
				}
			}
		}
		return true;
	}

	this.getShortInfo = function(){
		var ele = $("#shortInfo");
		if (game.shortInfo){
			game.shortInfo = false;
			$(ele).html("");
		}		
		game.shortInfo = this.id;

		if (this.userid == game.userid){
			$(ele).attr("class", "friendly");
		} else $(ele).attr("class", "hostile");

		var baseHit = this.getBaseHitChance();
		var table = document.createElement("table");
			table.insertRow(-1).insertCell(-1).innerHTML = this.name + " #" + this.id;
			table.insertRow(-1).insertCell(-1).innerHTML = "Base Hit: " + Math.floor(this.profile[0] * baseHit) + "% - " + Math.floor(this.profile[1] * baseHit) + "%";
		return table;
	}

	this.getIncomingBallistics = function(){
		var inc = [];
		for (var i = 0; i < game.ballistics.length; i++){
			if (game.ballistics[i].targetid == this.id){
				inc.push(game.ballistics[i])
			}
		}
		return inc;
	}

	this.switchDiv = function(){
		var self = this;
		$(".shipDiv").each(function(){
			if ($(this).data("shipId") == self.id){
				if ($(this).hasClass("disabled")){
					$(this)
					.removeClass("disabled")
				}
				else {
					$(this).addClass("disabled");
				}
				return;
			}
		})
	}

	this.canBoost = function(system){
		if (system.disabled || system.destroyed){
			return false;
		}
		else if (system instanceof Weapon && !system.disabled && !system.destroyed && system.getLoadLevel() >= 1){
			if (system instanceof Launcher){
				if (system.getOutput() < system.effiency){
					return true;
				}
			}
			else if (system.getBoostLevel() < system.maxBoost){
				console.log(system.getBoostLevel());
				if (this.getUnusedPower() >= system.getEffiency()){
					return true;
				}
			}
		}
		else if (!(system instanceof Weapon)){
			if (this.getUnusedPower() >= system.getEffiency()){
				return true;
			}
		}
		return false;
	}

	this.getUnusedPower = function(){
		for (var i = 0; i < this.primary.systems.length; i++){
			if (this.primary.systems[i] instanceof Reactor){
				return this.primary.systems[i].getUnusedPower();
			}
		}
	}
	
	this.setMoveMode = function(){

		moveCtx.translate(cam.o.x, cam.o.y);
		moveCtx.scale(cam.z, cam.z);
		planCtx.translate(cam.o.x, cam.o.y);
		planCtx.scale(cam.z, cam.z);

		game.mode = 1;
		this.turns = [];
		this.drawMoveRange();
		this.drawVectorIndicator();

		if (game.phase == -1){ // DEPLOYMENT
			if (this.actions[0].type == "deploy"  && this.actions[0].turn == game.turn && ! this.flight){
				this.drawTurnUI();
			}
		}
		else if (game.phase == 0){
			if (!this.flight){
				this.drawMovementUI();
				this.drawMovementPlan();
			}
		}
		else if (game.phase == 1){
			if (this.flight){
				if (! this.dogfights.length){
					this.drawMovementUI();
					this.drawMovementPlan();
				}
			}
		}
		else if (game.phase == 2){ // FIRE
		}
		else if (game.phase == 3){ // Dmg control
		}

		moveCtx.setTransform(1,0,0,1,0,0);
		planCtx.setTransform(1,0,0,1,0,0);

		this.updateDiv();
	}

	this.unsetMoveMode = function(){
		game.mode = false;
		$("#vectorDiv").addClass("disabled");
		$("#impulseGUI").addClass("disabled");
		$(".turnEle").addClass("disabled");
		$("#maxVector").addClass("disabled");
		$("#maxTurnVector").addClass("disabled");
		$("#plusImpulse").addClass("disabled");
		$("#minusImpulse").addClass("disabled");
		$("#undoLastAction").addClass("disabled");
		moveCtx.clearRect(0, 0, res.x, res.y);
		planCtx.clearRect(0, 0, res.x, res.y);
		mouseCtx.clearRect(0, 0, res.x, res.y);
	}
	
	this.select = function(){
		if (this.selected){
			this.doUnselect();
		}
		else {
			this.doSelect();
		}
	}

	this.doSelect = function(){
		console.log(this);
		aUnit = this.id;
		this.selected = true;
		this.switchDiv();
		this.setMoveMode();
	}
	
	this.doUnselect = function(){
		aUnit = false;
		this.selected = false;
		if (game.deploying){game.disableDeployment()}
		this.turns = [];
		this.unselectSystems();
		this.switchDiv();
		this.unsetMoveMode();
		$("#hangarLoadoutDiv").addClass("disabled");
		$("#systemDetailsDiv").remove();
		$(fxCanvas).css("opacity", 1);
	}

	this.doHighlight = function(){
		if (this.highlight){
			this.highlight = false;
			game.draw();
		}	
		else {
			this.highlight = true;
			ctx.translate(cam.o.x, cam.o.y);
			ctx.scale(cam.z, cam.z);
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size/2, 0, 2*Math.PI, false);
			ctx.closePath();
			ctx.lineWidth = 5;
			ctx.globalAlpha = 1;
			if (this.friendly){ctx.strokeStyle = "green";}
			else {ctx.strokeStyle = "red";}
			ctx.stroke();
			ctx.setTransform(1,0,0,1,0,0);
		}
	}
	
	this.unselectSystems = function(){	
		fxCtx.clearRect(0, 0, res.x, res.y);
		var divs = document.getElementsByClassName("shipDiv")
		
		for (var i = 0; i < divs.length; i++){
			if ($(divs[i]).data("shipId") == this.id){
				divs = divs[i];
				break;
			}				
		}
	
		var buttons = $(divs).find(".system.selected").each(function(){
			$(this).removeClass("selected");
		});			
		
		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].systems.length; j++){
				this.structures[i].systems[j].highlight = false;
				this.structures[i].systems[j].selected = false;
			}
		}
		
		$("#weaponAimTableWrapper").hide();
	}

	this.getFireOrders = function(){
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

	this.getPowerOrders = function(){
		var powers = [];
		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].systems.length; j++){
				for (var k = 0; k < this.structures[i].systems[j].powers.length; k++){
					if (this.structures[i].systems[j].powers[k].turn == game.turn){
						powers.push(this.structures[i].systems[j].powers[k]);
					}
				}
			}
		}
		for (var i = 0; i < this.primary.systems.length; i++){
			for (var j = 0; j < this.primary.systems[i].powers.length; j++){
				if (this.primary.systems[i].powers[j].turn == game.turn){
					powers.push(this.primary.systems[i].powers[j]);
				}
			}
		}
		return powers;
	}
}


function UltraHeavy(id, name, shipType, x, y, facing, faction, mass, cost, profile, size, userid, available){
	Ship.call(this, id, name, shipType, x, y, facing, faction, mass, cost, profile, size, userid, available);
	this.shipType = "UltraHeavy";
	
	this.getBaseImpulse = function(){
		return 115;
	}	
}
UltraHeavy.prototype = Object.create(Ship.prototype);

function SuperHeavy(id, name, shipType, x, y, facing, faction, mass, cost, profile, size, userid, available){
	Ship.call(this, id, name, shipType, x, y, facing, faction, mass, cost, profile, size, userid, available);
	this.shipType = "SuperHeavy";
	
	this.getBaseImpulse = function(){
		return 130;
	}
}
SuperHeavy.prototype = Object.create(Ship.prototype);


function Heavy(id, name, shipType, x, y, facing, faction, mass, cost, profile, size, userid, available){
	Ship.call(this, id, name, shipType, x, y, facing, faction, mass, cost, profile, size, userid, available);
	this.shipType = "Heavy";
	
	this.getBaseImpulse = function(){
		return 145;
	}
}
Heavy.prototype = Object.create(Ship.prototype);


function Medium(id, name, shipType, x, y, facing, faction, mass, cost, profile, size, userid, available){
	Ship.call(this, id, name, shipType, x, y, facing, faction, mass, cost, profile, size, userid, available);
	this.shipType = "Medium";
	
	this.getBaseImpulse = function(){
		return 165;
	}
}
Medium.prototype = Object.create(Ship.prototype);


function Light(id, name, shipType, x, y, facing, faction, mass, cost, profile, size, userid, available){
	Ship.call(this, id, name, shipType, x, y, facing, faction, mass, cost, profile, size, userid, available);
	this.shipType = "Light";
	
	this.getBaseImpulse = function(){
		return 185;
	}
}
Light.prototype = Object.create(Ship.prototype);


function SuperLight(id, name, shipType, x, y, facing, faction, mass, cost, profile, size, userid, available, primary){
	Ship.call(this, id, name, shipType, x, y, facing, faction, mass, cost, profile, size, userid, available, primary);
	this.shipType = "SuperLight";
	
	this.getBaseImpulse = function(){
		return 200;
	}
}
SuperLight.prototype = Object.create(Ship.prototype);

