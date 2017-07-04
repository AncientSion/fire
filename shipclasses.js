function Ship(data){
	//id, name, shipType, x, y, facing, faction, mass, cost, profile, size, userid, available, baseHitChance, baseImpulse
	this.id = data.id;
	this.name = data.name;
	this.shipType = data.shipType;
	this.x = data.x || 0;
	this.y = data.y || 0;
	this.facing = data.facing || 0;
	this.faction = data.faction;
	this.mass = data.mass;
	this.cost = data.cost;
	this.profile = data.profile;
	this.size = data.size;
	this.userid = data.userid;
	this.shipType = data.shipType;
	this.available = data.available;
	this.baseHitChance = data.baseHitChance;
	this.baseImpulse = data.baseImpulse;
	this.traverse = data.traverse
	this.status = data.status;

	this.slipAngle = data.slipAngle;
	this.turnAngle = data.turnAngle;
	this.turnStep = data.turnStep;
	this.baseTurnDelay = data.baseTurnDelay;
	this.baseTurnCost = data.baseTurnCost;
	this.baseImpulseCost = data.baseImpulseCost;

	this.turnAngles = {};
	this.moveAngles = {};

	this.ship = data.ship;
	this.flight = data.flight;
	this.salvo = data.salvo;

	this.friendly;
	this.deployed;

	this.primary;

	this.highlight = false;
	this.destroyed = false;
	this.disabled = data.disabled;
	this.element;

	this.hitTable;
	this.img;
	this.actions = [];
	this.structures = [];

	this.getDamageEntriesByFireId = function(fire){
		var dmgs = [];
		var lookup = 0;

		for (var i = 0; i < fire.hits.length; i++){
			lookup += fire.hits[i]
		}

		if (!lookup){
			return dmgs;
		}

		for (var i = this.primary.damages.length-1; i >= 0; i--){
			if (this.primary.damages[i].fireid == fire.id){					
				dmgs.push(this.primary.damages[i]);
				dmgs[dmgs.length-1].system = "Main Structure";
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

	this.drawDeploymentPreview = function(pos){
		mouseCtx.clearRect(0, 0, res.x, res.y);
		mouseCtx.translate(cam.o.x, cam.o.y)
		mouseCtx.scale(cam.z, cam.z)
		mouseCtx.translate(pos.x, pos.y);
		/*mouseCtx.globalAlpha = 0.3;
		mouseCtx.beginPath();
		mouseCtx.arc(0, 0, this.size*1, 0, 2*Math.PI, false);
		mouseCtx.closePath();
		mouseCtx.fillStyle = "red";
		mouseCtx.fill();
*/
		this.drawMarker(0, 0, "yellow", mouseCtx);
		//mouseCtx.globalAlpha = 1;
		mouseCtx.rotate(this.facing * Math.PI/180);
		mouseCtx.drawImage(this.img, -this.size/2, -this.size/2, this.size, this.size);

		mouseCtx.setTransform(1,0,0,1,0,0);
		//mouseCtx.globalAlpha = 1;

	}

	this.draw = function(){
		if (this.deployed){
			this.drawPositionMarker();
			this.drawSelf();
		}
	}

	this.drawSelf = function(){
		ctx.save();
		ctx.translate(this.x, this.y)
		ctx.rotate(this.facing * Math.PI/180);
		ctx.drawImage(this.img, -this.size/2, -this.size/2, this.size, this.size);
		ctx.restore();
	}

	this.drawPositionMarker = function(){
		var c = "";
		if (this.selected){c = "yellow"}
		else if (this.friendly){c = "green";}
		else {c = "red";}
		this.drawMarker(this.x, this.y, c, ctx);
	}

	this.drawPlanMarker = function(){
		for (var i = this.actions.length-1; i >= 0; i--){
			if (!this.actions[i].resolved){
				var c = "green";
				if (!this.friendly){c = "red";}
				this.drawMarker(this.actions[i].x, this.actions[i].y, c, planCtx);
				return;
			} else return;
		}
	}

	this.drawMarker = function(x, y, c, context){
		context.beginPath();
		context.arc(x, y, this.size/2, 0, 2*Math.PI, false);
		context.closePath();
		context.lineWidth = 2;
		context.globalAlpha = 1;
		context.globalCompositeOperation = "source-over";
		context.strokeStyle = c;
		context.stroke();
		context.lineWidth = 1;
		context.strokeStyle = "black";
	}

	this.drawCenterPoint = function(){
		ctx.beginPath();
		ctx.arc(0, 0, 2, 0, 2*Math.PI, false);
		ctx.closePath();
		ctx.fillStyle = "red";
		ctx.fill();
	}

	this.animationSetupMove = function(){
		var start = this.getTurnStartPosition();
		this.facing = this.getTurnStartFacing();
		this.x = start.x;
		this.y = start.y;
	}

	this.animationSetupDamage = function(){
		return true;
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
		if (this.id == 27){
			console.log("ding");
		}
		for (var i = this.actions.length-1; i >= 0; i--){
			if (this.actions[i].turn < game.turn || this.actions[i].type == "jump"){
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

	this.getControlZone = function(){
		if (this.actions.length){
			var pos = this.getBaseOffsetPos();
			return {pos: pos, s: this.size*1};
		}
		else return false;
	}

	this.canDeployHere = function(pos){
		//console.log(pos);
		var valid = false;
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
			/*for (var i = 0; i < game.ships.length; i++){
				if (game.ships[i].id != this.id){
					var area = game.ships[i].getControlZone();
					if (area){
						var dist = getDistance(pos, area.pos);
						if (dist <= area.s + this.size*1){
						popup("The selection position is too close to the position vessel (#"+this.ships[i].id+" - " + this.ships[i].display +")");							return false;
						}
					}
				}
			}*/
			return true;
		}
		else popup("Please deploy inside the green colored area.");

		return false;
	}

	this.doDeploy = function(pos){
		console.log(this);
		if (this.actions.length){
			this.actions[0].x = pos.x;
			this.actions[0].y = pos.y;
		}
		else {
			this.actions.push(new Move("deploy", 0, pos.x, pos.y, this.facing, 0, 0));
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
		//game.disableDeployment();
		this.select();
		//game.enableDeployment(this.id);
		//this.unsetMoveMode();
		//this.setMoveMode();
		//this.getSystemByName("Sensor").drawEW();

		$("#game")
			.find("#deployOverlay").hide().end()
			.find("#deployWrapper").find("#reinforceTable").find(".requestReinforcements").each(function(){
			if ($(this).hasClass("selected")){
				//$(this).find(".cost").addClass("green");
				$(this).addClass("green");
				return;
			}
		}).end().find("#totalRequestCost").html(game.getCurrentReinforceCost());
		game.redraw();
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

	this.setPostMoveFacing = function(){
		var facing = 0;
		for (var i = 0; i < this.actions.length; i++){
			if (this.actions[i].resolved){
				facing += this.actions[i].a;
			}
		}
		this.facing = facing;
	}

	this.setFacing = function(){
		return;
		var facing = 0;
		if (this.deployed){
			if (this.actions.length == 1){
				this.facing = this.actions[0].a;
				this.facing = facing;
				return;
			}
			return;
			for (var i = 0; i < this.actions.length; i++){
				if (this.actions[i].resolved){
					facing += this.actions[i].a;
				}
			}	
		}
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
		this.setFacing();
		this.setHitTable();
		this.setInternals();
		this.setSystems();
	}

	this.setSystems = function(){
		return;
		if (this.ship){
			if (this.disabled){
				for (var i = 0; i < this.structures.length; i++){
					for (var j = 0; j < this.structures[i].systems.length; j++){
						this.structures[i].systems[j].locked = true;
					}
				}
				for (var i = 0; i < this.primary.systems.length; i++){
					this.primary.systems[i].locked = 1;
				}
			}
		}
	}

	this.setInternals = function(){
	/*	for (var i = 0; i < this.primary.systems.length; i++){
			if (this.primary.systems[i] instanceof Reactor){
				if (this.primary.systems[i].disabled || this.primary.systems[i].destroyed){
					this.unpowerAllSystems();
				}
			}
		}*/
	}


	this.unpowerAllSystems = function(){
		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].systems.length; j++){
				if (!this.structures[i].systems[j].destroyed){
					this.structures[i].systems[j].disabled = 1;
					this.structures[i].systems[j].setTableRow();
				}
			}
		}
	}

	this.setHitTable = function(){
		//console.log("id: " + this.id);
		//this.primary.setRemainingIntegrity();
		var fraction = this.primary.remaining / this.primary.integrity;

		for (var i = 0; i < this.primary.systems.length; i++){
			if (fraction <= this.hitTable[this.primary.systems[i].name]){
				this.primary.systems[i].exposed = 1;
			}
		}
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

	this.drawHoverElements = function(){
		this.drawEW();
		//this.drawMoveLength();

		/*moveCtx.translate(cam.o.x, cam.o.y);
		moveCtx.scale(cam.z, cam.z);
		this.drawMoveRange();

		moveCtx.setTransform(1,0,0,1,0,0);
		*/
	}

	this.drawEW = function(){
		this.getSystemByName("Sensor").drawEW();
	}

	this.drawMoveLength = function(){
		if (this.selected){return;}
		mouseCtx.translate(cam.o.x, cam.o.y);
		mouseCtx.scale(cam.z, cam.z);
	
		var center = this.getPlannedPosition();
		var angle = this.getPlannedFacing(this.actions.length-1);
		var p = getPointInDirection(this.getTotalImpulse(), angle, center.x, center.y);
		
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

	this.checkSensorHighlight = function(){
		if (this.flight || this.salvo){return;}
		var sensor = this.getSystemByName("Sensor");
		if (sensor.selected || sensor.highlight){sensor.drawEW()}
	}

	this.hasSystemSelected = function(name){	
		for (var i = 0; i < this.primary.systems.length; i++){
			if (this.primary.systems[i].name == name && this.primary.systems[i].selected){
				return this.primary.systems[i];
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
		var angle = this.getPlannedFacing(this.actions.length-1);
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

		$(fxCanvas).css("opacity", 0.3);
		var angle = this.getPlannedFacing(this.actions.length-1);
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

	this.drawSystemAxis = function(system){
		var color = "";
		var alpha = 0;

		fxCtx.clearRect(0, 0, res.x, res.y);
		fxCtx.translate(cam.o.x, cam.o.y);
		fxCtx.scale(cam.z, cam.z);

		var angle = this.getPlannedFacing(this.actions.length-1);
		var pos = this.getOffsetPos();
		var p1 = getPointInDirection(system.range || res.x, system.start + angle, pos.x, pos.y);
		var p2 = getPointInDirection(system.range || res.y, system.end + angle, pos.x, pos.y)
		var dist = getDistance( {x: pos.x, y: pos.y}, p1);
		var rad1 = degreeToRadian(system.start + angle);
		var rad2 = degreeToRadian(system.end + angle);
		
		fxCtx.beginPath();			
		fxCtx.moveTo(pos.x, pos.y);
		fxCtx.arc(pos.x, pos.y, dist, rad1, rad2, false);
		fxCtx.closePath();
		switch (system.name){
			case "Hangar": color = "white"; opacity = 0.7; break;
			case "Structure": color = "lightBlue"; opacity = 0.7; break;
		}	
		fxCtx.globalAlpha = opacity;
		fxCtx.fillStyle = color;
		fxCtx.fill();
		fxCtx.globalAlpha = 1;

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
			var angle = this.getPlannedFacing(this.actions.length-1);
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
		var cost = Math.ceil(this.baseImpulseCost*this.getImpulseMod() / 500);	
		return cost;
	}

	this.getBaseImpulse = function(){
		return this.baseImpulse;
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
		//return 15;
		return Math.floor(this.getBaseImpulse() / 10);
	}
	
	this.getImpulseMod = function(){
		return this.getTotalImpulse() / this.getBaseImpulse();
	}
	
	this.getTurnCost = function(){
		if (game.phase == -2){
			return this.baseTurnCost
		}
		else if (this.actions.length && (this.actions[0].type == "deploy" && this.actions[0].turn == game.turn && this.actions[0].resolved == 0)){
			return 0;
		}
		else return this.baseTurnCost; //Math.pow(this.mass, 1.25)/10000;
		//else return Math.found((Math.pow(this.mass, 1.56) / 10000) *  this.getImpulseMod());
	}
	
	this.getBaseTurnDelay = function(){
		return this.baseTurnDelay;
		//return Math.pow(this.mass, 0.5)/10;
		//return Math.pow(this.mass, 0.55);
	}
	
	this.getTurnDelay = function(){
		if (game.phase == -2){
			return this.getBaseTurnDelay();
		}
		if (this.actions.length && this.actions[0].type == "deploy" && this.actions[0].turn == game.turn && this.actions[0].resolved == 0){
			return 0;
		}
		else return this.getBaseTurnDelay() * this.getImpulseMod();
	}

	this.drawArcIndicator = function(){
		return;
		var shipPos = this.getBaseOffsetPos();
		var angle = this.getPlannedFacing(this.actions.length-1);

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

	this.getSlipAngle = function(){
		if (!this.actions[0].resolved){
			return 180;
		}
		return this.slipAngle;
	}

	this.drawMoveRange = function(){
		var center = new Point(this.actions[this.actions.length-1].x, this.actions[this.actions.length-1].y);		
		var rem = this.getRemainingImpulse();
		var angle = this.getPlannedFacing(this.actions.length-1);
		var slipAngle = this.getSlipAngle();

		this.moveAngles = {start: addAngle(0 + slipAngle, angle), end: addAngle(360 - slipAngle, angle)};
		//console.log(this.moveAngles);
		if (slipAngle != 180){
			this.drawMoveArea(center, rem);
		}

		var modAngle = this.getMaxTurnAngle();
		var newAngle = addToDirection(angle, modAngle);
		var turnEle = $("#game").find("#epButton")[0];
		var p1 = getPointInDirection(150/cam.z, addToDirection(newAngle+30, modAngle), center.x, center.y);
		$(turnEle)
			.css("left", p1.x * cam.z + cam.o.x - $(turnEle).width()/2)
			.css("top", p1.y * cam.z + cam.o.y - $(turnEle).height()/2)
			.removeClass("disabled")
			.find("#remEP").html(this.getRemainingEP() + " / " + this.getEP()).addClass("green").end();

		//this.drawMoveArcs(center, rem);
	}
	
	this.drawMoveArea = function(center, rem){
		//if (game.phase < 0 || game.phase > 1){return;}
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
			moveCtx.strokeStyle = "red";
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
		moveCtx.globalAlpha = 0.25;
		moveCtx.fillStyle = "white";
		moveCtx.fill();
		moveCtx.globalAlpha = 1;
	}

	this.drawMoveArcs = function(center, rem){
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
			if (this.actions[i].turn == game.turn){
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
				//delay += Math.ceil(this.actions[i].delay/this.actions[i].costmod);
				delay += this.actions[i].delay;
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
		
	this.getPlannedFacing = function(end){
		if (end == undefined){
			end = this.actions.length-1;
		}

		var angle = 0;
		
		for (var i = 0; i <= end; i++){
			if (this.actions[i].type == "turn" || this.actions[i].type == "deploy" || this.actions[i].type == "jump"){
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
			else if (this.actions[this.actions.length-1].turn < game.turn){
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
			else if (this.actions[this.actions.length-1].turn < game.turn){
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
		return;
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
		if (!this.getRemainingImpulse()){
			return false;
		}
		else if (this.turns[i].cost * (this.turns[i].costmod + 0.2) + this.getTurnCost() < this.getRemainingEP()){
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
		game.drawAllPlans();
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
		game.drawAllPlans();
	}
	
	this.drawMovePlan = function(){
		if (!this.actions.length || this.actions[this.actions.length-1].resolved){
			return;
		}
		else if (this.ship && game.phase == 0 || this.flight && game.phase == 1){
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

	this.drawMoveUI = function(){
		this.drawImpulseUI();
		this.drawVectorMovementUI();
		if (this.canTurn()){
			this.drawTurnUI();
			this.updateDiv();
		}
	}

	this.drawVectorMovementUI = function(){
		var center = this.getPlannedPosition();
		var angle = this.getPlannedFacing(this.actions.length-1);
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
		var angle = this.getPlannedFacing(this.actions.length-1);
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
		if (!this.actions[0].resolved){
			return 180;
		}
		return this.turnAngle;
	}

	this.getTurnStep = function(){
		return this.turnStep;
	}

	this.getMaxTurnAngle = function(){
		var ep = this.getRemainingEP();
		var limit = this.getTurnAngle();
		var c = this.getTurnCost();

		return Math.min(limit, Math.floor(ep/c));
	}

	this.drawTurnUI = function(){
		var center;
		var angle = this.getPlannedFacing(this.actions.length-1);
		var turnAngle = this.getMaxTurnAngle();
		var w = this.getTurnStep();
		
		if (this.actions.length){
			center = new Point(this.actions[this.actions.length-1].x, this.actions[this.actions.length-1].y);
		} else center = this.getBaseOffsetPos();

		this.turnAngles = {start: addAngle(0 + turnAngle, angle), end: addAngle(360 - turnAngle, angle)};
		//console.log(this.turnAngles);
		
		for (var j = 1; j >= -1; j = j-2){
			for (var i = 1; i <= w; i++){			
				var modAngle = turnAngle * i * j;
				var newAngle = addToDirection(angle, modAngle);
				var p = getPointInDirection(this.size*1.5*cam.z, newAngle, center.x, center.y);
				if (turnAngle != 180){
					moveCtx.beginPath();
					moveCtx.moveTo(center.x, center.y);
					moveCtx.lineTo(p.x, p.y);
					moveCtx.closePath();
					moveCtx.strokeStyle = "white";
					moveCtx.stroke();
				}
			}
		}

		var turnEle = $("#game").find("#turnButton")[0];
		var p1 = getPointInDirection(150/cam.z, addToDirection(newAngle-30, modAngle), center.x, center.y);
		$(turnEle)
			.css("left", p1.x * cam.z + cam.o.x - $(turnEle).width()/2)
			.css("top", p1.y * cam.z + cam.o.y - $(turnEle).height()/2)
			.removeClass("disabled");

		this.drawDelayEstimator();
		//this.updateTurnElements();
	}


	this.drawTurnUIa = function(){
		var center;
		var plannedAngle = this.getPlannedFacing(this.actions.length-1);
		var cost = this.getTurnCost();
		var delay = this.getTurnDelay();
		var a = this.getTurnAngle();
		var w = this.getTurnStep();
		
		if (this.actions.length){
			center = new Point(this.actions[this.actions.length-1].x, this.actions[this.actions.length-1].y);
		}
		else center = this.getBaseOffsetPos();
		
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
		//var delay = this.turns[0].delay / this.turns[0].costmod;
		var delay = this.getTurnDelay();
		if (delay){
			salvoCtx.clearRect(0, 0, res.x, res.y);
			salvoCtx.translate(cam.o.x, cam.o.y);
			salvoCtx.scale(cam.z, cam.z);
			var center;
			var plannedAngle = this.getPlannedFacing(this.actions.length-1);
			if (this.actions.length){
				center = new Point(this.actions[this.actions.length-1].x, this.actions[this.actions.length-1].y);
			}
			else center = this.getBaseOffsetPos();

			var delayRad1 = degreeToRadian(plannedAngle-45);
			var delayRad2 = degreeToRadian(plannedAngle+45);
			salvoCtx.beginPath();			
			salvoCtx.arc(center.x, center.y, delay, delayRad1, delayRad2, false);
			salvoCtx.closePath();
			salvoCtx.strokeStyle = "white";
			salvoCtx.lineWidth = 2
			salvoCtx.stroke();
			salvoCtx.arc(center.x, center.y, delay, 0, 2*Math.PI, false);
			salvoCtx.globalCompositeOperation = "destination-out";
			salvoCtx.fill();
			salvoCtx.globalCompositeOperation = "source-over";
			salvoCtx.setTransform(1,0,0,1,0,0);
		}
	}


	this.drawImpulseUI = function(){
		var center = {x: this.x, y: this.y};
		var p1 = getPointInDirection(this.size/2 + 10 + 15, this.facing + 180, center.x, center.y);

		if (this.canUndoLastAction()){
			var ox = p1.x * cam.z + cam.o.x - 15;
			var oy = p1.y * cam.z + cam.o.y - 15;
			$("#undoLastAction").css("left", ox).css("top", oy).removeClass("disabled");
		} else $("#undoLastAction").addClass("disabled");


		if (this.disabled){return;}

	/*	var gui = $("#impulseGUI");
		var w = gui.width();
		var h = gui.height();
		var p = getPointInDirection((this.size/2 + w)/cam.z, this.facing + 180, center.x, center.y);

		gui.css("left", p.x * cam.z + cam.o.x - w/2).css("top", p.y * cam.z + cam.o.y - h/2).removeClass("disabled");
		gui.find("#impulse").html(this.getRemainingImpulse() + " / " + this.getTotalImpulse());
		gui.find("#remTurnDelay").html(this.getRemainingDelay());
		gui.find("#baseDelay").html(round(this.getTurnDelay(), 1));
		gui.find("#enginePower").html(this.getRemainingEP() + " / " + this.getEP());
		gui.find("#impulseChange").html(this.getImpulseChangeCost() + " EP");
		gui.find("#turnCost").html("<span>" + round(this.getTurnCost(), 1) + " EP</span>");

	*/	if (this.canIncreaseImpulse()){
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
		this.turnAngles = {}
		$("#popupWrapper").hide();
		this.unsetMoveMode();
		this.setMoveMode();
		game.redrawEW();
		game.drawAllPlans();
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
		this.turnAngles = {}
		game.redrawEW();
		game.drawAllPlans();
	}

	this.moveToMaxVector = function(){
		var pos = this.getOffsetPos();
		var dist = this.getRemainingImpulse();
		var goal = getPointInDirection(dist, this.getPlannedFacing(this.actions.length-1), pos.x, pos.y);
		if (!game.posIsOccupied(this, goal)){
			this.issueMove(goal, dist);
		}
	}
	
	this.moveToMaxTurnVector = function(){
		var pos = this.getOffsetPos();
		var dist = this.getRemainingDelay();
		var impulse = this.getRemainingImpulse();
		var goal = getPointInDirection(dist, this.getPlannedFacing(this.actions.length-1), pos.x, pos.y);
		if (dist == impulse && !game.posIsOccupied(this, goal)){
			this.issueMove(goal, dist);
		} else this.issueMove(goal, dist);
	}
	
	this.canTurn = function(){
		if (this.disabled){return false;}
		if (this.getRemainingDelay() == 0){
			var min = 5;
			var have = this.getRemainingEP();
			var need = this.getTurnCost() * min;
			if (have >= need){
				return true;
			}
		}
		else if (this.flight){
		return false;
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
					else if (this.actions[i].type == "turn"){
						var a = Math.abs(this.actions[i].a);
						while (a > 0){
							a -= this.getTurnAngle();
							turns++;
						}
						break;
					}
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
		
	this.switchTurnMode = function(){
		if (game.turnMode){
			game.turnMode = 0;
			mouseCtx.clearRect(0, 0, res.x, res.y);
			if (this.ship){this.getSystemByName("Sensor").drawEW();}
			$("#vectorDiv").addClass("disabled");
			$("#game").find("#turnButton")
				.find("#turnMode").html("OFF").removeClass("on", 0).end()
				.find("#turnCost").html("").end()
				.find("#turnDelay").html("");
		}
		else {
			game.turnMode = 1;
			$("#vectorDiv").removeClass("disabled");
			$("#game").find("#turnButton")
			.find("#turnMode").html("ON").addClass("on", 0).end()
		}
	}

	this.handleTurning = function(e, o, f, pos){
		var t = {x: e.clientX - offset.x, y: e.clientY - offset.y};
		var a =  getAngleFromTo(o, pos);
			a = addAngle(f, a);

		if (a > 180){a = (360-a) *-1;}

		$("#vectorDiv").html("Angle: " + Math.round(a))
		.css("left", t.x- 45 + "px")
		.css("top", t.y + 40 + "px")

		if (isInArc(getCompassHeadingOfPoint(this.getPlannedPosition(), pos, 0), this.turnAngles.start, this.turnAngles.end)){
			mouseCtx.clearRect(0, 0, res.x, res.y);
			mouseCtx.beginPath();
			mouseCtx.moveTo(o.x * cam.z + cam.o.x, o.y * cam.z + cam.o.y);
			mouseCtx.lineTo(t.x, t.y);
			mouseCtx.closePath();
			mouseCtx.strokeStyle = "white";
			mouseCtx.stroke();
		}

		if (a < 0){a *= -1;}
		//console.log(a)
		$("#game").find("#turnButton")
			.find("#turnCost").html(Math.round(this.getTurnCost() * Math.min(a, this.getMaxTurnAngle()), 2) + " EP").end()
			.find("#turnDelay").html(Math.round(this.getTurnDelay() * Math.min(a, this.getMaxTurnAngle()), 2) + " px");


		/*else {
			$("#game").find("#turnButton")
				.find("#turnCost").html("").end()
				.find("#turnDelay").html("");
		}*/


		//if (IsOnMovementArc(this, pos)){
		//	console.log("valid turn: " + a);
			//this.issueTurn(a);
		//}
	}

	this.handleTurnAttempt = function(dest){
		var origin = this.getPlannedPosition();
		var a = getAngleFromTo(origin, dest);
			a = addAngle(this.getPlannedFacing(), a);
		if (a > 180){a -= 360;}
		var max = this.getMaxTurnAngle();

		if (isInArc(getCompassHeadingOfPoint(origin, dest, 0), this.turnAngles.start, this.turnAngles.end)){
			if (Math.abs(a) >= 5){
				this.issueTurn(a);
			}
		} else if (a < 0){
			this.issueTurn(-max);
		} else this.issueTurn(max);
	}

	this.issueTurn = function(a){
		//console.log("turn, a: ".a);
		if (this.actions[0].type == "deploy" && this.actions[0].turn == game.turn && this.actions[0].resolved == 0){
			this.actions[0].a += Math.round(a);
			this.facing += Math.round(a);
			//this.unsetMoveMode();
			//this.setMoveMode();
			game.redraw()
		}
		else {
			var o = this.getPlannedPosition();
			this.actions.push(
				new Move(
					"turn", 0, o.x, o.y, 
					Math.round(a), Math.round(this.getTurnDelay()*Math.abs(a)), Math.round(this.getTurnCost()*Math.abs(a)), 0
				)
			);
			console.log(this.actions[this.actions.length-1]);
			$("#game").find("#turnButton")
				.find("#turnCost").html("").end()
				.find("#turnDelay").html("");
			//this.setMoveMode();
			game.redrawEW();
			game.drawAllPlans();
		}
	}

	this.issueTurna = function(a){
		console.log("turn, a: ".a);
		if (this.actions[0].type == "deploy" && this.actions[0].turn == game.turn && this.actions[0].resolved == 0){
			this.actions[0].a += a;
			this.facing += a;
			game.redraw()
		}
		else {
			for (var i = 0; i < this.turns.length; i++){
				if (this.turns[i].a == a){
					if (this.flight){
						if (this.actions[this.actions.length-1].type == "turn" && this.actions[this.actions.length-1].turn == game.turn){
							this.actions[this.actions.length-1].a += this.turns[i].a;
							this.actions[this.actions.length-1].delay += this.turns[i].delay;
							this.actions[this.actions.length-1].cost += this.turns[i].cost;
							break;
						}
					}

					if (this.getRemainingImpulse() == 0){
						this.doShortenTurn(true);
					}

					this.actions.push(
						new Move(
							"turn", 0, this.turns[i].x, this.turns[i].y, 
							this.turns[i].a, this.turns[i].delay, this.turns[i].cost, this.turns[i].costmod
						)
					);
					break;
				}
			}
			game.redrawEW();
			game.drawAllPlans();
		}
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

		var header = "red";
		if (this.friendly){header = "green";}

			$(table)
				.append($("<tr>")
					.append($("<th>").html(this.name.toUpperCase() + " #" + this.id).attr("colspan", 2).addClass(header)))
				.append($("<tr>")
					.append($("<td>").html("Classification"))
					.append($("<td>").html(game.getUnitType(this.traverse))))
				.append($("<tr>")
					.append($("<td>").html("Impulse"))
					.append($("<td>").html(this.getRemainingImpulse() + " / " + this.getTotalImpulse()).addClass("impulse")))
				.append($("<tr>")
					.append($("<td>").html("Engine Power:"))
					.append($("<td>").html(this.getRemainingEP() + " / " + this.getEP()).addClass("ep")))
				.append($("<tr>")
					.append($("<td>").html("Impulse Change:"))
					.append($("<td>").html(this.getImpulseChangeCost() + " EP").addClass("change")))
				.append($("<tr>")
					.append($("<td>").html("Turn Cost per 1°"))
					.append($("<td>").html(this.getTurnCost() + " EP")))
				.append($("<tr>")
					.append($("<td>").html("Turn Delay per 1°"))
					.append($("<td>").html(this.getTurnDelay() + " px")))
				.append($("<tr>")
					.append($("<td>").html("Active Turn Delay"))
					.append($("<td>").html(this.getRemainingDelay()).addClass("delay")))
				
		subDiv.appendChild(table);
		div.appendChild(subDiv);

		$(this.expandDiv(div))
			.addClass("disabled")
			.drag()
			.find(".structContainer")
				.contextmenu(function(e){e.stopPropagation;})
				.addClass("disabled")
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
						$(this).parent().addClass("disabled");
					}
				})


		if (game.phase == 2){
			$(div).find(".structContainer").show();
		}

		this.element = div;
	}

	this.expandDiv = function(div){
		var iconContainer = document.createElement("div");
			iconContainer.className = "iconContainer";
		var img =  window.shipImages[this.name.toLowerCase()].cloneNode(true); img.className = "rotate270size90";
			iconContainer.appendChild(img);
		div.appendChild(iconContainer);
			
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
			this.structures[i].direction = this.structures[i].getDirection();
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
			maxWidth = 320;
		}
		else {
			maxWidth = 360;
		}

		$(div).css("width", maxWidth);


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
				var modeDiv =this.primary.systems[i].getModeDiv();
				if (modeDiv){
					td.appendChild(modeDiv);
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

			if (this.structures[i].systems.length == 1){
				if (a == 0 || a == 360){
					structTable.childNodes[0].childNodes[0].style.width = "70px";
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
					powerDiv.style.left = colWidth * 31 + "px";
					td.appendChild(powerDiv);
				}

				var modeDiv = this.structures[i].systems[j].getModeDiv();
				if (modeDiv){
					td.appendChild(modeDiv);
				}

				if (this.structures[i].systems[j].dual && !this.structures[i].systems[j].effiency){
					$(td).find(".outputMask").hide();
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
				if (!noAft && this.structures[i].systems.length <= 3){
					offsetY += 30;
				}
			}
			else if (noAft){
				offsetY -= 60 + this.structures.length*12;
			}
			else if (a == 180){
				offsetY += 40;
			}
			else if (sides >= 2 && a-90 != 0 && a-90 != 180){
				offsetY += 40;
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

		$(structContainer).css("height", height + 20);

/*		var w = $(div).width();
		var h = $(div).height();
		var left = 50;
		if (this.facing < 90 || this.facing > 270){
			left = res.x - w - 50;
		}
		var x = this.x +cam.o.x - w/2;
		var y = this.y +cam.o.y + 150;

		$(div).css("left", x).css("top", y);
*/		return div;
	}

	this.previewSetup = function(){
		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].systems.length; j++){
				if (this.structures[i].systems[j].loadout){
					$(this.structures[i].systems[j].element).addClass("bgYellow");
				}
			}
		}
	}
	
	this.updateDiv = function(){
		var divs = document.getElementsByClassName("shipDiv");
		for (var i = 0; i < divs.length; i++){
			if ($(divs[i]).data("shipId") == this.id){
				var divs = divs[i];
				break;
			}
		}
		
		$(divs)
			.find(".pos").html(this.x + " / " + this.y).end()
			.find(".ep").html(this.getRemainingEP() + " / " + this.getEP()).end()
			.find(".impulse").html(this.getRemainingImpulse() + " / " + this.getTotalImpulse()).end()
			.find(".delay").html(this.getRemainingDelay())		
			.find(".change").html(this.getImpulseChangeCost() + " EP").end()			
			.find(".turn").html(this.getImpulseChangeCost() + " EP").end()
	}

	this.updateDivPower = function(system){
		var reactor = this.getSystemByName("Reactor");
		var s = reactor.getOutput();
		$(this.getSystemByName("Reactor").element).find(".outputMask").html(reactor.getOutput());

		$(system.element).find(".outputMask").html(system.getOutput());
		system.update();
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

	this.getActiveSensor = function(){
		for (var i = 0; i < this.primary.systems.length; i++){
			if (this.primary.systems[i].selected && this.primary.systems[i].name == "Sensor"){
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
		var s = this.getSystemById(id);
		var w = s.getActiveWeapon();
		var name = w.name;
		var hasFire = s.hasUnresolvedFireOrder();
		if (name == "Hangar"){return;}

		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].systems.length; j++){
				if (! this.structures[i].systems[j].destroyed){
					if (this.structures[i].systems[j].getActiveWeapon().name == name){
						if (this.structures[i].systems[j].weapon && this.structures[i].systems[j].hasUnresolvedFireOrder() == hasFire){
							this.structures[i].systems[j].select(e);
						}
					}
				}
			}
		}
		return;
	}

	this.doUnpowerAll = function(id){
		var system = this.getSystemById(id);
			$(system.element).find(".powerDiv").find(".unpower").hide().end().find(".power").show();
		var name = system.getActiveWeapon().name;

		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].systems.length; j++){
				if (this.structures[i].systems[j].isPowered()){
					if (this.structures[i].systems[j].getActiveWeapon().name == name){
						this.structures[i].systems[j].doUnpower();
					}
				}
			}
		}
	}

	this.doPowerAll = function(id){
		var system = this.getSystemById(id);
			$(system.element).find(".powerDiv").find(".power").hide().end().find(".unpower").show();
		var name = system.getActiveWeapon().name;

		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].systems.length; j++){
				if (!this.structures[i].systems[j].isPowered()){
					if (this.structures[i].systems[j].getActiveWeapon().name == name){
						this.structures[i].systems[j].doPower();
					}
				}
			}
		}
	}

	this.switchModeAll = function(id){
		var system = this.getSystemById(id);
		var name = system.getActiveWeapon().name;

		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].systems.length; j++){
				if (this.structures[i].systems[j].dual && !this.structures[i].systems[j].locked){
					if (this.structures[i].systems[j].getActiveWeapon().name == name){
						this.structures[i].systems[j].switchMode(id);
					}
				}
			}
		}
	}

	this.getShortInfo = function(){
		var ele = $("#shortInfo");
		if (this.userid == game.userid){
			$(ele).attr("class", "friendly");
		} else $(ele).attr("class", "hostile");

		var baseHit = this.getBaseHitChance();
		var impulse = this.getTotalImpulse();

		var table = document.createElement("table");
			table.insertRow(-1).insertCell(-1).innerHTML = this.name + " #" + this.id + " (" +game.getUnitType(this.traverse) + ")";
			table.insertRow(-1).insertCell(-1).innerHTML =  "Impulse: " + impulse + " (" + round(impulse / this.getBaseImpulse(), 2) + ")";
			table.insertRow(-1).insertCell(-1).innerHTML = "Base Hit: " + Math.floor(this.profile[0] * baseHit) + "% - " + Math.floor(this.profile[1] * baseHit) + "%";
		return table;
	}

	this.getProfileMod = function(){
		return Math.floor((1+((((this.getBaseImpulse() / this.getTotalImpulse())-1)/3)))*100);
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
		if (this.selected){
			$(this.element).removeClass("disabled")
		}
		else if ($(this.element).hasClass("disabled")){
			$(this.element).removeClass("disabled")
		}
		else  $(this.element).addClass("disabled");
	}

	this.canBoost = function(system){
		if (system.disabled || system.destroyed){
			return false;
		}
		else if (system instanceof Weapon && !system.disabled && !system.destroyed && system.getLoadLevel() >= 1){
			if (system instanceof Launcher){
				if (system.getOutput() < system.getEffiency()){
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

	this.getUnusedPower = function(){
		for (var i = 0; i < this.primary.systems.length; i++){
			if (this.primary.systems[i] instanceof Reactor){
				return this.primary.systems[i].getUnusedPower();
			}
		}
	}


	this.setTranslation = function(){
		for (var i = 0; i < arguments.length; i++){
			arguments[i].translate(cam.o.x, cam.o.y);
			arguments[i].scale(cam.o.x, cam.o.y);
		}
	}

	this.resetTranslation = function(){
		for (var i = 0; i < arguments.length; i++){
			arguments[i].setTransform(1,0,0,1,0,0);
		}
	}

	this.setMoveTranslation = function(){
		moveCtx.translate(cam.o.x, cam.o.y);
		moveCtx.scale(cam.z, cam.z);
		planCtx.translate(cam.o.x, cam.o.y);
		planCtx.scale(cam.z, cam.z);
	}

	this.resetMoveTranslation = function(){
		moveCtx.setTransform(1,0,0,1,0,0);
		planCtx.setTransform(1,0,0,1,0,0);
	}

	this.resetMoveMode = function(){
		var turn = game.turnMode;
		this.unsetMoveMode();
		this.setMoveMode();
		if (turn && this.canTurn()){
			this.switchTurnMode();
		}
	}

	this.setMoveMode = function(){
		game.mode = 1;
		this.turnAngles = {};
		//this.setTranslation(moveCtx, planCtx);
		this.setMoveTranslation();
		this.drawMoveRange();
		this.drawVectorIndicator();

		if (game.phase == -1){ // DEPLOYMENT
			if (!this.flight && this.actions[0].type == "deploy"  && this.actions[0].turn == game.turn){
				this.drawTurnUI();
			}
		}
		else if (game.phase == 0){
			if (!this.flight){
				this.drawMoveUI();
			//	this.drawMovePlan();
			}
		}
		else if (game.phase == 1){
			if (this.flight){
				if (! this.dogfights.length){
					this.drawMoveUI();
				//	this.drawMovePlan();
				}
			}
		}
		else if (game.phase == 2){ // FIRE
		}
		else if (game.phase == 3){ // Dmg control
		}

		this.resetMoveTranslation();
		this.checkSensorHighlight();
		this.updateDiv();
	}
	
	this.unsetMoveMode = function(){
		game.mode = 0;
		$("#vectorDiv").addClass("disabled");
		$("#impulseGUI").addClass("disabled");
		$(".turnEle").addClass("disabled");
		$("#maxVector").addClass("disabled");
		$("#maxTurnVector").addClass("disabled");
		$("#plusImpulse").addClass("disabled");
		$("#minusImpulse").addClass("disabled");
		$("#undoLastAction").addClass("disabled");
		if (game.turnMode){this.switchTurnMode();}
		moveCtx.clearRect(0, 0, res.x, res.y);
		planCtx.clearRect(0, 0, res.x, res.y);
		salvoCtx.clearRect(0, 0, res.x, res.y);
	}

	this.select = function(){
		if (!this.selected){
			this.doSelect();
		} else this.switchDiv();
	}

	this.doSelect = function(){
		console.log(this);
		aUnit = this.id;
		this.selected = true;
		game.setShipTransform();
		this.drawPositionMarker();
		game.resetShipTransform();
		game.drawAllPlans();
		this.switchDiv();
		this.setMoveMode();
	}
	
	this.doUnselect = function(){
		aUnit = false;
		this.selected = false;
		if (game.deploying){game.disableDeployment();}
		else if (game.flightDeploy){game.flightDeploy = false;}
		this.unselectSystems();
		game.setShipTransform();
		this.drawPositionMarker();
		game.resetShipTransform();
		game.drawAllPlans();
		this.switchDiv();
		this.unsetMoveMode();
		$("#hangarLoadoutDiv").addClass("disabled");
		$("#popupWrapper").hide()
		$("#instructWrapper").hide()
		$("#systemDetailsDiv").remove();
		mouseCtx.clearRect(0, 0, res.x, res.y);
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
			ctx.lineWidth = 3;
			ctx.globalAlpha = 1;
			if (this.friendly){ctx.strokeStyle = "white";}
			else {ctx.strokeStyle = "white";}
			ctx.stroke();
			ctx.setTransform(1,0,0,1,0,0);
		}
	}

	//	return isInArc(getCompassHeadingOfPoint(loc, pos, facing), start, end);

	this.getOffensiveBonus = function(t){
		var tPos;
		if (this.flight){return false;}
		if (t.salvo){
			if (t.targetid == this.id){
				if (t.nextStep == t.finalStep){
					tPos = t.getBaseOffsetPos();
				} else tPos = t.nextStep;
			}
			else return 0;
		} else tPos = t.getBaseOffsetPos();

		var sensor = this.getSystemByName("Sensor");
		var ew = sensor.getEW();
		if (sensor.disabled || sensor.destroyed || ew.type == 1 || ew.type == 3){return 0;}
		if (ew.type == 2){return 0.2}
		var origin = this.getBaseOffsetPos();
		var d = getDistance(origin, tPos);		
		if (d <= ew.dist || t.salvo && t.nextStep == t.finalStep){
			if (this.isInEWArc(origin, tPos, sensor, ew)){
				return 0.5;
			}
		}
		return 0;
	}

	this.getDefensiveBonus = function(s){
		if (this.flight || s.flight){
			return 0;
		}
		var sensor = this.getSystemByName("Sensor");
		var ew = sensor.getEW();

		if (sensor.disabled || sensor.destroyed || ew.type == 0 || ew.type == 2){return 0;}
		if (ew.type == 3){return 0.2}

		var origin = this.getBaseOffsetPos();
		var tPos = s.getBaseOffsetPos();
		var d = getDistance(origin, tPos);

		if (d <= ew.dist){
			if (this.isInEWArc(origin, tPos, sensor, ew)){
				return 0.5;
			}
		}
		return false;
	}

	this.isInEWArc = function(origin, target, sensor, ew){		
		var str = sensor.getOutput();
		var len = 20;
		var p = 1.5;
		var	w = Math.min(180, len * Math.pow(str/ew.dist, p));
		var start = addAngle(0 + w, ew.angle);
		var end = addAngle(360 - w, ew.angle);
		return isInArc(getCompassHeadingOfPoint(origin,  target, this.facing), start, end);
	}

	this.getLockString = function(lock){
		if (lock){
			return "<span class='green'>Active Lock (x 1.5)</span>";
		}
		return "<span class='red'>No Sensor Lock</span>";
	}

	this.canSetSensor = function(sensor){
		if (this.flight || this.salvo){return false;}
		if (sensor.selected && !sensor.locked){
			return true;
		} return false;
	}
	
	this.unselectSystems = function(){
		fxCtx.clearRect(0, 0, res.x, res.y);
		$("#weaponAimTableWrapper").hide();
		var buttons = $(this.element).find(".system.selected").each(function(){
			$(this).removeClass("selected");
		});	

		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].systems.length; j++){
				this.structures[i].systems[j].highlight = false;
				this.structures[i].systems[j].selected = false;
			}
		}
		
		if (this.flight || this.salvo){return;}
		
		for (var i = 0; i < this.primary.systems.length; i++){
			if (this.primary.systems[i].selected){
				this.primary.systems[i].select();
			}
		}
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

	this.getEWSettings = function(){
		return this.getSystemByName("Sensor").getEW();
	}

	this.getPowerOrders = function(){
		var powers = [];
		for (var i = 0; i < this.structures.length; i++){
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
}