function Ship(id, shipClass, x, y, facing, userid){
	this.id = id;
	this.shipClass = shipClass;
	this.x = x || false;
	this.y = y || false;
	this.facing = facing;
	this.userid = userid;
	this.id = id;
	this.img;
	this.turns = [];
	this.actions = [];
	this.validMoveArcs = [];
	this.impulseAdjust = [];
	this.maxVector = false;
	this.undoOrderButton = false;
	this.structures = [];

	this.profile = [];
	this.mass = 0;

/*	this.preview = function(){
		this.createDiv();
		
		if (! this.img){
			window.img = new Image();
			window.img.src = "shipIcons/" + this.shipClass.toLowerCase() + ".png";
			window.img.onload = function(){
				game.ships[0].img = window.img;
				game.ships[0].drawShipForPreview();
			}
		}
		else {
			this.drawShipForPreview();
		}
	}*/

	this.drawShipForPreview = function(){
		shipCtx.clearRect(0, 0, res.x, res.y);
		shipCtx.save();
		shipCtx.translate(this.x, this.y);
		shipCtx.rotate(this.actions[0].a*(Math.PI/180));
		shipCtx.drawImage(this.img, -30, -30, 60, 60);
		shipCtx.restore();
	}

	this.draw = function(){
		if (this.deployed){
			var size = this.size*cam.z * 0.8;

			ctx.save();
			ctx.translate(this.x + cam.o.x, this.y + cam.o.y);
			ctx.rotate(this.facing * (Math.PI/180));
			ctx.drawImage(this.img, -size/2, -size/2, size, size);
			ctx.restore();
		}
	}

	this.animationSetup = function(){
		var start = this.getTurnStartPosition();
		this.facing = this.getTurnStartFacing();

		this.x = start.x;
		this.y = start.y;
	}

	this.getTurnStartPosition = function(){
		var i;

		for (i = 0; i < this.actions.length; i++){
			if (this.actions[i].turn >= game.turn){
				if (i > 0){
					i = i -1;
					break;
				}
				else if (this.actions.type == "deploy"){
					break;
				}
			}
		}

		return this.actions[i];
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

	this.doDeploy = function(pos){
		if (this.actions.length){
			this.actions[0].x = pos.x - cam.o.x;
			this.actions[0].y = pos.y - cam.o.y;
			this.unselect();
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

		game.deploying = false;
		this.setPosition();
		this.setFacing();
		game.draw();
	}
	
	this.getBaseOffsetPos = function(){
		if (this.actions.length == 1){
			return {x: this.actions[0].x + cam.o.x, y: this.actions[0].y + cam.o.y};
		}
		else {
			for (var i = this.actions.length-1; i >= 0; i--){
				if (this.actions[i].resolved == 1){
					return {x: this.actions[i].x + cam.o.x, y: this.actions[i].y + cam.o.y};
				}
			}
		}
	}
	
	this.getOffsetPos = function(){
		return {x: this.actions[this.actions.length-1].x + cam.o.x, y: this.actions[this.actions.length-1].y + cam.o.y};
	}

	this.setPosition = function(){
		if (this.actions.length == 1){
			this.x = this.actions[0].x;
			this.y = this.actions[0].y;
			return;
		}

		if (this.deployed){
			if (game.phase == 2){ // FIRE -> animation of moves phase
				if (this.actions.length == 1){
					this.x = this.actions[0].x;
					this.y = this.actions[0].y;
				}
				else {
					for (var i = this.actions.length-1; i >= 0; i--){
						if (this.actions[i].resolved){
							this.x = this.actions[i].x;
							this.y = this.actions[i].y;
						}
					}
				}
			}
			else {
				for (var i = this.actions.length-1; i >= 0; i--){
					if (this.actions[i].resolved){
						this.x = this.actions[i].x;
						this.y = this.actions[i].y;
						return;
					}
					else if (i == 0){
						this.x = this.actions[0].x;
						this.y = this.actions[0].y;
						return;
					}
				}
			}
		}
	}

	this.setFacing = function(){
		var facing = 0;

		if (this.deployed){
			if (game.phase == 2){
				for (var i = 0; i < this.actions.length; i++){
					if (this.actions[i].turn <= game.turn){
						facing = addAngle(facing, this.actions[i].a);
					}
				}	
			}
			else if (game.phase == -1){
				if (this.actions.length == 1){
					facing = addAngle(facing, this.actions[0].a);
				}
				else {
					for (var i = 0; i < this.actions.length; i++){
						if (this.actions[i].resolved){
							facing = addAngle(facing, this.actions[i].a);
						}
					}
				}
			}
			else {
				for (var i = 0; i < this.actions.length; i++){
					if (this.actions[i].resolved){
						facing = addAngle(facing, this.actions[i].a);
					}
				}
			}
		}

		this.facing = facing;
	}
	
	this.create = function(){
		this.img = window.shipImages[this.shipClass.toLowerCase()];
		//this.addSystems();
		//resetIndex();
		//this.addStructures();
		this.setPosition();
		this.setFacing()

		if (!window.preview){
			this.createShortInfo();
			this.createDiv();
		}
	}

	this.hasWeaponsSelected = function(){		
		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].systems.length; j++){
				if (this.structures[i].systems[j].selected){
					return true;
				}
			}
		}

		return false;
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
	}
	
	this.highlightAllSelectedWeapons = function(){
		fxCtx.clearRect(0, 0, res.x, res.y);
		
		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].systems.length; j++){
				if (this.structures[i].systems[j].highlight || this.structures[i].systems[j].selected){
					//console.log("ding");
					var angle = this.getPlannedFacingToMove(this.actions.length-1);
					this.structures[i].systems[j].drawArc(angle, this.getOffsetPos());
				}
			}
		}
	}

	this.drawStructureAxis = function(struct){
		fxCtx.clearRect(0, 0, res.x, res.y);

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
		fxCtx.globalAlpha = 0.1;			
		fxCtx.fillStyle = "blue";
		fxCtx.fill();
		fxCtx.globalAlpha = 1;
		fxCtx.strokeStyle = "black";
		fxCtx.stroke();
	}
	
	this.weaponHighlight = function(weapon){
		if (weapon.highlight){
			weapon.highlight = false;
			fxCtx.clearRect(0, 0, res.x, res.y);	
			$("#weaponTable" + weapon.id).addClass("disabled");
		}
		else {
			$("#weaponTable" + weapon.id).removeClass("disabled");	
			weapon.highlight = true;		
			var angle = this.getPlannedFacingToMove(this.actions.length-1);
			var shipPos = this.getOffsetPos();
			
			weapon.drawArc(angle, shipPos);
		}
	}
	
	this.drawTurnControl = function(){
		var center;
		var plannedAngle = this.getPlannedFacingToMove(this.actions.length-1);
		
		if (this.actions.length){
			center = new Point(this.actions[this.actions.length-1].x + cam.o.x, this.actions[this.actions.length-1].y + cam.o.y);
		}
		else {
			center = this.getBaseOffsetPos();
		}

		if (this.turns.length){
			for (var i = 0; i < this.turns.length; i++){
				var turn = this.turns[i];
					turn.cost = this.getTurnCost();
					turn.delay = this.getTurnDelay();
				
				var p = getPointInDirection(300, addAngle(plannedAngle, turn.a), center.x, center.y);
				
				moveCtx.beginPath();
				moveCtx.moveTo(center.x, center.y);
				moveCtx.lineTo(p.x, p.y);
				moveCtx.closePath();
				moveCtx.stroke();
				
				moveCtx.beginPath();
				moveCtx.arc(turn.clickX, turn.clickY, 10, 0, 2*Math.PI);
				moveCtx.closePath();
				moveCtx.fillStyle = "white";
				moveCtx.fill(); moveCtx.stroke();
				
				/*
				moveCtx.beginPath();
				moveCtx.arc(turn.clickX -20, turn.clickY, 7, 0, 2*Math.PI);
				moveCtx.closePath(); moveCtx.fillStyle = "white"; moveCtx.fill(); moveCtx.stroke();
				moveCtx.beginPath();
				moveCtx.arc(turn.clickX +20, turn.clickY, 7, 0, 2*Math.PI);
				moveCtx.closePath(); moveCtx.fillStyle = "white"; moveCtx.fill(); moveCtx.stroke();
				*/

				var thrustTextLoc = addAngle(plannedAngle, turn.a*3);
				
				var p1 = getPointInDirection(80, thrustTextLoc, center.x, center.y);
					turn.thrustTextLoc = p1;
				
				drawText(moveCtx, "blue", "cost: " + Math.ceil(turn.cost*turn.costmod), 10, {x: p1.x, y: p1.y});
				drawText(moveCtx, "blue", "delay; " + Math.ceil(turn.delay/turn.costmod), 10, {x: p1.x, y: p1.y+15});
				
				if (this.canShortenTurn()){
					moveCtx.beginPath();
					moveCtx.arc(turn.clickX -20, turn.clickY, 7, 0, 2*Math.PI);
					moveCtx.closePath(); moveCtx.fillStyle = "white"; moveCtx.fill(); moveCtx.stroke();
					drawText(moveCtx, "black", "+", 12, {x: turn.clickX-20, y: turn.clickY});
					
					turn.thrustUp = {
									clickX: turn.clickX-20, 
									clickY: turn.clickY,
									};
				}
				else {
					turn.thrustUp = false;
				}

				if (this.canUndoShortenTurn()){
					moveCtx.beginPath();
					moveCtx.arc(turn.clickX +20, turn.clickY, 7, 0, 2*Math.PI);
					moveCtx.closePath(); moveCtx.fillStyle = "white"; moveCtx.fill(); moveCtx.stroke();
					drawText(moveCtx, "black", "-", 12, {x: turn.clickX+20, y: turn.clickY});	
					
					turn.thrustDown = {
								clickX: turn.clickX+20, 
								clickY: turn.clickY,
								}
				}
				else {
					turn.thrustDown = false;
				}
			}
		}
		else {
			for (var j = 1; j >= -1; j = j-2){
				for (var i = 1; i <= 1; i++){
				
					var modAngle = 30 * i * j;
					var newAngle = addAngle(plannedAngle, modAngle);
					var turnButton = getPointInDirection(80, newAngle, center.x, center.y);
					
					var turn = 
								{
									x: center.x,
									y: center.y, 
									clickX: turnButton.x, 
									clickY: turnButton.y,
									a: modAngle,
									cost: this.getTurnCost(),
									delay: this.getTurnDelay(),
									thrustUp: false,
									costmod: 1
								}

				var p = getPointInDirection(300, newAngle, center.x, center.y);
					moveCtx.beginPath();
					moveCtx.moveTo(center.x, center.y);
					moveCtx.lineTo(p.x, p.y);
					moveCtx.closePath();
					moveCtx.stroke();
					
					moveCtx.beginPath();
					moveCtx.arc(turnButton.x, turnButton.y, 10, 0, 2*Math.PI);
					moveCtx.closePath();
					moveCtx.fillStyle = "white";
					moveCtx.fill(); moveCtx.stroke();
					
				var thrustTextLoc = addAngle(plannedAngle, 90 * j);
				
				var p1 = getPointInDirection(80, thrustTextLoc, center.x, center.y);
					turn.thrustTextLoc = p1;
									
					drawText(moveCtx, "blue", "cost: " + Math.ceil(turn.cost*turn.costmod), 10, {x: p1.x, y: p1.y});
					drawText(moveCtx, "blue", "delay; " + Math.ceil(turn.delay/turn.costmod), 10, {x: p1.x, y: p1.y+15});
					
					if (this.canShortenTurn()){
						moveCtx.beginPath();
						moveCtx.arc(turnButton.x -20, turnButton.y, 7, 0, 2*Math.PI);
						moveCtx.closePath(); moveCtx.fillStyle = "white"; moveCtx.fill(); moveCtx.stroke();
						drawText(moveCtx, "black", "+", 12, {x: turnButton.x-20, y: turnButton.y});
						
						turn.thrustUp = {
										clickX: turnButton.x-20, 
										clickY: turnButton.y,
										};
					}
					if (this.canUndoShortenTurn()){
						moveCtx.beginPath();
						moveCtx.arc(turnButton.x +20, turnButton.y, 7, 0, 2*Math.PI);
						moveCtx.closePath(); moveCtx.fillStyle = "white"; moveCtx.fill(); moveCtx.stroke();
						drawText(moveCtx, "black", "-", 12, {x: turnButton.x+20, y: turnButton.y});	
						
						turn.thrustDown = {
									clickX: turnButton.x+20, 
									clickY: turnButton.y,
									}
					}
					this.turns.push(turn);
				}
			}
		}
	}
		
	this.getRemainingImpulse = function(){	
		var base = this.getBaseImpulse();		
		for (var i = 0; i < this.actions.length; i++){
			if (this.actions[i].turn == game.turn){
				if (this.actions[i].type == "speedChange"){
					if (this.actions[i].dist == 1){
						base += 20;
					}
					else if (this.actions[i].dist == -1){
						base -= 20;
					}
				}
				else if (this.actions[i].type == "move"){
					base -= this.actions[i].dist;
				}
			}
		}
		
		return base;
	}
	
	this.getUsedImpulse = function(){
		var impulse = 0;		
		for (var i = 0; i < this.actions.length; i++){
			if (this.actions[i].type == "move"){
				impulse += this.actions[i].dist;
			}
		}
		
		return impulse;
	}
	
	this.getImpulseChangeCost = function(){
		var cost = Math.ceil((Math.pow(this.mass, 1.25))*this.getImpulseMod() / 500);	
		return cost;
	}
	
	this.getBaseImpulse = function(){
		return 200;
	}
	
	this.getTotalImpulse = function(){	
		var base = this.getBaseImpulse();
		
		for (var i = 0; i < this.actions.length; i++){
			if (this.actions[i].type == "speedChange"){
				if (this.actions[i].dist == 1){
					base += 20;
				}
				else if (this.actions[i].dist == -1){
					base -= 20;
				}
			}
		}
		
		return base;
	}	
	
	this.getImpulseMod = function(){
		return this.getTotalImpulse() / this.getBaseImpulse();
	}
	
	this.getTurnCost = function(){
		return Math.ceil((Math.pow(this.mass, 1.55) / 10000) *  this.getImpulseMod());
	}
	
	this.getBaseTurnDelay = function(){
		return Math.ceil(Math.pow(this.mass, 0.5));
	}
	
	this.getTurnDelay = function(){
		return this.getBaseTurnDelay() / this.getImpulseMod();
	}
	
	this.drawSelector = function(){
		var shipPos = this.getBaseOffsetPos();
		moveCtx.beginPath();			
		moveCtx.arc(shipPos.x, shipPos.y, this.size/2, 0, 2*Math.PI, false);
		moveCtx.closePath();
		
		if (this.friendly){
			moveCtx.strokeStyle = "green";
		}
		else moveCtx.strokeStyle = "red";
	
		moveCtx.stroke();
		moveCtx.strokeStyle = "black";
	}
	
	this.drawMoveRange = function(){
		
		if (this.actions.length){
			center = new Point(this.actions[this.actions.length-1].x + cam.o.x, this.actions[this.actions.length-1].y + cam.o.y);
		}
		else {
			center = new Point(this.x + cam.o.x, this.y + cam.o.y);
		}
		
		var angle = this.getPlannedFacingToMove(this.actions.length-1);
		var start = addAngle(350, angle);
		var end = addAngle(10, angle);
		
		this.validMoveArcs = {start: 350, end: 10};
		
		var p1 = getPointInDirection(this.getRemainingImpulse(), start, center.x, center.y);
		var dist = getDistance( {x: center.x, y: center.y}, p1);
		var rad1 = degreeToRadian(start);
		var rad2 = degreeToRadian(end);

		moveCtx.beginPath();			
		moveCtx.moveTo(center.x, center.y);
		moveCtx.lineTo(p1.x, p1.y); 
		moveCtx.arc(center.x, center.y, dist, rad1, rad2, false);
		moveCtx.closePath();
		moveCtx.globalAlpha = 1;
		moveCtx.stroke();
		moveCtx.globalAlpha = 0.15;
		moveCtx.fillStyle = "blue";
		moveCtx.fill();
		moveCtx.globalAlpha = 1;
		
		var delay = this.getRemainingDelay();
		
		if (delay > 0){
			var p1 = getPointInDirection(delay, addAngle(start, -10), center.x, center.y);
			var dist = getDistance( {x: center.x, y: center.y}, p1);
			var rad1 = degreeToRadian(addAngle(start, -10));
			var rad2 = degreeToRadian(addAngle(end, +10));

			moveCtx.beginPath();			
			moveCtx.moveTo(center.x, center.y);
			moveCtx.lineTo(p1.x, p1.y); 
			moveCtx.arc(center.x, center.y, delay, rad1, rad2, false);
			moveCtx.lineTo(center.x, center.y); 
			moveCtx.closePath();
			moveCtx.strokeStyle = "red";
			moveCtx.stroke();
			moveCtx.strokeStyle = "black";	
			
			if (this.getRemainingImpulse() > delay){
				var last = this.actions[this.actions.length-1];
				var turnP = getPointInDirection(delay, angle, center.x, center.y);
				var arcP = getPointInDirection(this.getRemainingImpulse() + 70, angle, last.x + cam.o.x, last.y + cam.o.y);
				moveCtx.beginPath();
				moveCtx.arc(arcP.x, arcP.y, 8, 0, 2*Math.PI, false);
				moveCtx.closePath();
				moveCtx.stroke();
				
				this.maxTurnVector = {clickX: arcP.x, clickY: arcP.y, x: turnP.x, y: turnP.y};
			}
			else {
				this.maxTurnVector = false;
			}
		}
	}
	
	this.getRemainingEP = function(){
		var ep = this.ep;
		
		for (var i = 1; i < this.actions.length; i++){
			if (this.actions[i].turn == window.gd.turn){
				if (this.actions[i].cost != 0){
					ep -= this.actions[i].cost * this.actions[i].costmod;
					//console.log(ep);
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
			return new Point(this.actions[this.actions.length-1].x + cam.o.x, this.actions[this.actions.length-1].y + cam.o.y);
		}
		else {
			return new Point(this.x + cam.o.x, this.y + cam.o.y);
		}
	}
		
	this.drawImpulseIndicator = function(){
		var center = this.getPlannedPosition();
		
		var angle = this.getPlannedFacingToMove(this.actions.length-1)
		//var p1 = getPointInDirection(this.getRemainingImpulse() + 60, angle, center.x, center.y);
		var p = getPointInDirection(20, angle, center.x, center.y);
		var p1 = getPointInDirection(300, angle, center.x, center.y);
		
		moveCtx.beginPath();			
		moveCtx.moveTo(p.x, p.y);
		moveCtx.lineTo(p1.x, p1.y); 
		moveCtx.closePath();
		moveCtx.lineWidth = 1;
		moveCtx.stroke();
		moveCtx.lineWidth = 1;

		if (this.getRemainingImpulse() > 0){		
			var p2 = getPointInDirection(this.getRemainingImpulse(), angle, center.x, center.y);
			var p3 = getPointInDirection(this.getRemainingImpulse() + 40, angle, center.x, center.y);
		
			moveCtx.beginPath();	
			moveCtx.arc(p3.x, p3.y, 10, 0, 2*Math.PI, false);
			moveCtx.closePath();
			moveCtx.stroke();
			this.maxVector = {clickX: p3.x, clickY: p3.y, x: p2.x, y: p2.y};
		}
		else {
			this.maxVector = false;
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
			return this.turns[0].cost * (this.turns[0].costmod + 0.2);
		}
		else {
			return this.getTurnCost() * 1.2;
		}
	}
	
	this.canShortenTurn = function(){
		if (game.phase == 1){
			if (this.getRemainingEP() >= this.getShortenTurnCost()){
				return true;
			}
		}

		return false;
	}
	
	this.canUndoShortenTurn = function(){
		if (game.phase == 1){
			if (this.turns.length){
				if (this.turns[0].costmod > 1){
					return true;
				}
			}
		}
	}
	
	this.issueShortenTurnDelay = function(i){
		//console.log("issueShortenTurnDelay")
		for (var j = 0; j < this.turns.length; j++){
			this.turns[j].costmod = (this.turns[j].costmod * 10 + 2) / 10;
		}
		this.unsetMoveMode();
		this.setMoveMode();
	}
	
	this.cancelShortenTurnDelay = function(i){
		//console.log("cancelShortenTurnDelay")
		for (var j = 0; j < this.turns.length; j++){
			this.turns[j].costmod = (this.turns[j].costmod * 10 - 2) / 10;
		}
		this.unsetMoveMode();
		this.setMoveMode();
	}

	this.doAdjustImpulse = function(obj){
		var shipPos = this.getPlannedPosition();
		if (obj.type == "+"){
			if (this.actions.length && this.actions[this.actions.length-1].type == "speedChange" && this.actions[this.actions.length-1].dist == -1){
				this.actions.splice(this.actions.length-1, 1);
			}
			else {
				var action = new Move("speedChange", 1, shipPos.x - cam.o.x, shipPos.y - cam.o.y, false, 0, obj.cost)
				this.actions.push(action);
			}
		}
		else if (obj.type == "-"){
			if (this.actions.length && this.actions[this.actions.length-1].type == "speedChange" && this.actions[this.actions.length-1].dist == 1){
				this.actions.splice(this.actions.length-1, 1);
			}
			else {
				var action = new Move("speedChange", -1, shipPos.x - cam.o.x, shipPos.y - cam.o.y, false, 0, obj.cost)
				this.actions.push(action);
			}
		}
		
		this.unsetMoveMode();
		this.setMoveMode();
	}
	
	this.drawImpulseUI = function(){
	
		this.impulseAdjust = [];
		
		var offSetPos = this.getBaseOffsetPos();
		var shipIcon

		//console.log(offSetPos);
		var p = getPointInDirection(this.size/2 + 80, this.getTurnStartFacing() + 180, offSetPos.x, offSetPos.y);
		//console.log(p);

		moveCtx.beginPath();
		moveCtx.font = "bolder 12pt Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
		moveCtx.textAlign = "center";
		moveCtx.textBaseline = 'middle';
		moveCtx.closePath();
		
		var tp = p;
		if (tp.x > res.x-80){tp.x = res.x-80} else if (tp.x < 80){tp.x = 80};
		if (tp.y < 0){tp.y = 5} else if (tp.y > res.y){tp.y = res.y};

		//console.log(tp);

		drawText(moveCtx, "blue", "Engine Power: " + this.getRemainingEP() + " / " + this.ep, 10, tp);
		drawText(moveCtx, "blue", "Impulse: " + this.getRemainingImpulse() + " / " + this.getTotalImpulse(), 10,  {x: tp.x, y: tp.y+18});
		drawText(moveCtx, "blue", "Change Impulse: " + this.getImpulseChangeCost() + " EP", 10,  {x: tp.x, y: tp.y+36});
		
		/*var div = document.createElement("div");
			div.className = "gui";
			div.innerHTML = "Increase Impulse";
			console.log(p);
			div.style.marginLeft = p.x + "px";
			div.style.marginTop = p.y + 18 + "px";
			
			$("#game").append(div);
			*/
						
		if (this.canIncreaseImpulse()){
			var plus = {x: p.x-25, y: p.y+54};			
			this.impulseAdjust.push({clickX: plus.x, clickY: plus.y, type: "+", cost: this.getImpulseChangeCost()});
			moveCtx.beginPath();				
			moveCtx.arc(plus.x, plus.y, 8, 0, 2*Math.PI, false);
			moveCtx.closePath();
			moveCtx.stroke();
			drawText(moveCtx, "black", "+", 12, plus);
		}
		if (this.canDecreaseImpulse()){
			var minus = {x: p.x+25, y: p.y+54};
			this.impulseAdjust.push({clickX: minus.x, clickY: minus.y, type: "-", cost: this.getImpulseChangeCost()});			
			moveCtx.beginPath();	
			moveCtx.arc(minus.x, minus.y, 8, 0, 2*Math.PI, false);
			moveCtx.closePath();
			moveCtx.stroke();
			drawText(moveCtx, "black", "-", 12, minus);
		}
		if (this.canUndoLastOrder()){
			this.undoOrderButton = {clickX: p.x, clickY: p.y+55};
			moveCtx.beginPath();
			moveCtx.arc(p.x, p.y+55, 8, 0, 2*Math.PI);
			moveCtx.closePath();
			moveCtx.strokeStyle = "red";
			moveCtx.stroke();
			moveCtx.strokeStyle = "black";			
		}
	}
	
	this.issueMove = function(pos, dist){			
		this.actions.push(new Move("move", dist, pos.x - cam.o.x, pos.y - cam.o.y, 0, 0));		
		this.maxVector = false;
		this.maxTurnVector = false;
		this.turns = [];
						
		game.drawShips();
		this.unsetMoveMode();
		this.setMoveMode();
	}
	
	this.canUndoLastOrder = function(){
		if (this.actions.length){
			if (this.actions[this.actions.length-1].turn == game.turn){
				if (this.actions[this.actions.length-1].type != "deploy"){
					return true;
				}
			}
		}

		this.undoOrderButton = false;
		return false;
	}
	
	this.undoLastOrder = function(pos){		
		this.actions.splice(this.actions.length-1, 1);
		this.turns = [];
		this.unsetMoveMode();
		this.setMoveMode();
	}
	
	this.moveToMaxVector = function(){
		var dist = Math.ceil(getDistance(this.getOffsetPos(), this.maxVector));
		this.issueMove(this.maxVector, dist);
	}
	
	this.moveToMaxTurnVector = function(pos){
		var dist = Math.ceil(getDistance(this.getOffsetPos(), this.maxTurnVector));
		this.issueMove(this.maxTurnVector, dist);
	}
	
	this.canTurn = function(){
		if (this.getRemainingDelay() == 0){
			var have = this.getRemainingEP();
			var need = this.getTurnCost();
			if (have >= need){
				return true;
			}
		}
		return false;
	}
	
	this.issueTurn = function(turn){
		this.turns = [];
		this.actions.push(new Move("turn", 0, turn.x - cam.o.x, turn.y - cam.o.y, turn.a, turn.delay, turn.cost, turn.costmod));
		this.unsetMoveMode();
		this.setMoveMode();
		game.draw();
	}
	
	this.issueDeploymentTurn = function(turn){
		this.turns = [];
		
		this.actions[0].a += turn.a;
		this.setFacing();

		this.unsetMoveMode();
		this.setMoveMode();
		game.draw();
	}

	this.getBaseHitChance = function(){
		return Math.ceil(Math.pow(this.mass, 0.5));
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
		//console.log(base);
		a = base * this.profile[0];
		b = base * this.profile[1];

		sub = ((90 - angle) * a) + ((angle - 0) * b);
		sub /= (90 - 0);

		//console.log(sub);
		return Math.ceil(sub);
	}
	
	this.createDiv = function(){

		var div = document.createElement("div");
			div.className = "shipDiv disabled";
			$(div).data("shipId", this.id);
		
		var table = document.createElement("table");
			table.className = "general";
			
		var tr = document.createElement("tr");
		var th = document.createElement("th");
			th.innerHTML = this.shipClass.toUpperCase() + " #" + this.id;
			th.colSpan = 2; th.style.textAlign = "center";
			tr.appendChild(th); table.appendChild(tr);

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

		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "Engine Power: "; tr.appendChild(td);
		var td = document.createElement("td"); td.className = "ep";
			td.innerHTML = this.getRemainingEP() + " / " + this.ep; tr.appendChild(td); table.appendChild(tr);

		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "Impulse: "; tr.appendChild(td);
		var td = document.createElement("td"); td.className = "impulse";
			td.innerHTML = this.getRemainingImpulse() + " / " + this.getTotalImpulse(); tr.appendChild(td); table.appendChild(tr);
			
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "Turn Delay: "; tr.appendChild(td);
		var td = document.createElement("td"); td.className = "delay";
			td.innerHTML = this.getRemainingDelay(); tr.appendChild(td); table.appendChild(tr);

		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "Impulse Change: "; tr.appendChild(td);
		var td = document.createElement("td"); td.className = "change";
			td.innerHTML = this.getImpulseChangeCost(); tr.appendChild(td); table.appendChild(tr);
				
		div.appendChild(table);


		

		$(div).drag();
		$(div).contextmenu(function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).hide();
		})
			
		document.getElementById("game").appendChild(div);

		structContainer = document.createElement("div");
		structContainer.className = "structContainer";	
		div.appendChild(structContainer);

		var pWidth = $(structContainer).width();
		var pHeight = $(structContainer).height();

		for (var i = 0; i < this.structures.length; i++){

			var structDiv = document.createElement("div");
				structDiv.className = "structDiv";
				
			var structTable = document.createElement("table");
				structTable.className = "structTable";
				$(structDiv).data("structureId", i);
			
			/*this.weapons.sort(function(a, b){
				if (a.name == b.name){
					if (a.id > b.id){
						return 1;
					}
				} else return -1;
			})*/

			structTable.appendChild(this.structures[i].getTableRow());

			for (var j = 0; j < this.structures[i].systems.length; j++){
				var ele = this.structures[i].systems[j].getTableRow();
				structTable.appendChild(ele);
			}

			structDiv.appendChild(structTable);
			structContainer.appendChild(structDiv);

			var a = this.structures[i].getDirection();
			var pos = getPointInDirection(130, addAngle(a, -90), pWidth/2, pHeight/2);
			var w = $(structTable).width() / 2; 
			var h = $(structTable).height() /2 +45;
			//console.log("id: " + this.structures[i].id + ", a: " + a);
			//console.log(w, h);
			$(structDiv)
				.data("id", this.structures[i].id)
				.data("structureId", i)
				.css("left", pos.x - w -2)
				.css("top", pos.y - h);


			var div = document.createElement("div");
				div.className = "iconDiv";

			var img = new Image();
				img.src = "shipIcons/" + this.shipClass.toLowerCase() + ".png";
				$(img)
					.addClass("rotate270")
					.css("width", 100)
					.css("height", 100)
				div.appendChild(img);
		}

		structContainer.appendChild(div);
		$(div)
			.css("left", pWidth/2-50)
			.css("top", pHeight/2-50)
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
		$(divs).find(".ep").html(this.getRemainingEP() + " / " + this.ep);
		$(divs).find(".impulse").html(this.getRemainingImpulse() + " / " + this.getTotalImpulse());
		$(divs).find(".delay").html( this.getRemainingDelay());
		$(divs).find(".change").html(this.getImpulseChangeCost());
	}
	

	this.createShortInfo = function(){
		var div = document.createElement("div");
			div.id = this.id + "shortInfo";
			div.className = "shortInfo disabled"
		var span = document.createElement("span");
			span.innerHTML = this.shipClass + " # " + this.id;
			div.appendChild(span);
		var span = document.createElement("span");
			span.innerHTML = "</br>base hit : " + this.getBaseHitChance() + "% - " + this.profile[0] + " / "  + this.profile[1];
			div.appendChild(span);
		document.body.appendChild(div);
	}
	
	this.displayShortInfo = function(){
		var ele = document.getElementById(this.id + "shortInfo");		
		
		if (shortInfo){
			if (shortInfo != this.id){
					var oldEle  = document.getElementById(shortInfo + "shortInfo");
						oldEle.className = "shortInfo disabled";
						
					ele.className = "shortInfo";
			}
			else if (shortInfo == this.id){
				ele.className = "shortInfo";
			}
		}
		else {
			shortInfo = this.id;
			var opos = this.getBaseOffsetPos();
			ele.style.left = (opos.x - 80) + "px";
			ele.style.top = (opos.y + 40) + "px";
		}
		
		if (this.friendly){
			$("#" + this.id + "shortInfo").addClass("friendly");
		}
		else {
			$("#" + this.id + "shortInfo").addClass("hostile");
		}
	}
	
	this.switchDiv = function(){
		var div = document.getElementsByClassName("shipDiv");		
		
		for (var i = 0; i < div.length; i++){
			if (this.id == $(div[i]).data("shipId")){
				div = div[i];
				break;
			}
		}
				
		if (div.className == "shipDiv disabled"){
			div.className = "shipDiv";
			$(div).css("left", this.x + cam.o.x - 100).css("top", this.y + cam.o.y + 100);
			if (shortInfo){
				document.getElementById(shortInfo + "shortInfo").className = "shortInfo disabled";
				shortInfo = false;
			}
		}
		else {
			div.className = "shipDiv disabled";
		}
	}
	
	this.setMoveMode = function(){
		game.mode = 1;
		this.drawSelector();


		if (game.phase == -1){ // DEPLOYMENT
			if (this.actions[0].type == "deploy"  && this.actions[0].turn == game.turn){
				this.drawTurnControl();
				this.updateDiv();
			}
			else {
				console.log("deployed earlier!");
			}
		}
		else if (game.phase == 1){
			this.drawMoveRange();
			this.drawImpulseIndicator();
			this.drawImpulseUI();
			this.drawMovePlan();

			if (this.canTurn()){
				this.drawTurnControl()
				this.updateDiv();
			}
		}
		else if (game.phase == 2){
			
		}
		else if (game.phase == 3){
			this.drawMoveRange();
			this.drawImpulseIndicator();
		}

		this.updateDiv();
	}	
	
	this.unsetMoveMode = function(){
		game.mode = false;
		moveCtx.clearRect(0, 0, res.x, res.y);
		planCtx.clearRect(0, 0, res.x, res.y);
		mouseCtx.clearRect(0, 0, res.x, res.y);
	}
	
	this.drawMovePlan = function(){

		var p = this.getBaseOffsetPos();

		planCtx.strokeStyle = "red";
		
		for (var i = 0; i < this.actions.length; i++){
			if (this.actions[i].turn == game.turn){
				var action = this.actions[i];
				
				//console.log(action);
			//	console.log(cam.o);
				planCtx.beginPath();
				
				if (i == 0){
					planCtx.moveTo(p.x, p.y);
				}
				else {
					planCtx.moveTo(this.actions[i-1].x + cam.o.x, this.actions[i-1].y + cam.o.y);
				}
					
							
				if (action.type == "move"){
					planCtx.lineTo(action.x + cam.o.x, action.y + cam.o.y);
					planCtx.closePath();
					planCtx.stroke();
				}
				else if (action.type == "turn"){
					var angle = this.getPlannedFacingToMove(i);
					
					planCtx.beginPath();
					planCtx.arc(action.x + cam.o.x, action.y + cam.o.y, 5, 0, 2*Math.PI, false);
					planCtx.stroke();
				}
				
				planCtx.closePath();
			}
		}		
		planCtx.strokeStyle = "black";			
	}
	
	this.select = function(){
		console.log(this);
		aShip = this.id;
		this.selected = true;
		this.switchDiv();
		this.setMoveMode();
	}
	
	this.unselect = function(){
		aShip = false;
		$("#vectorDiv").addClass("disabled");
		this.selected = false;
		this.turns = [];
		this.unselectWeapons();
		this.switchDiv();
		this.unsetMoveMode();
	}
	
	this.unselectWeapons = function(){	
		fxCtx.clearRect(0, 0, res.x, res.y);
		
		if (this.hasWeaponsSelected()){		
			var divs = document.getElementsByClassName("shipDiv")
			
			for (var i = 0; i < divs.length; i++){
				if ($(divs[i]).data("shipId") == this.id){
					divs = divs[i];
					break;
				}				
			}
		
			var buttons = $(divs).find(".weapon.selected");			
			for (var i = 0; i < buttons.length; i++){
				buttons[i].className = "weapon";
			}
			
			for (var i = 0; i < this.structures.length; i++){
				for (var j = 0; j < this.structures[i].systems.length; j++){
					this.structures[i].systems[j].highlight = false;
					this.structures[i].systems[j].selected = false;
				}
			}
			
			$("#weaponAimTableWrapper").hide();
		}
	}

	this.getFireOrders = function(){

		var fires = [];

		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].systems.length; j++){
				if (this.structures[i].systems[j].fireOrders.length){
					for (var k = this.structures[i].systems[j].fireOrders.length-1; k >= 0; k--){
						if (this.structures[i].systems[j].fireOrders[k].turn == game.turn){
							fires.push(this.structures[i].systems[j].fireOrders[k]);
						}
						else return fires;
					}
				}
			}
		}

		return fires;
	}
}


function Capital(id, shipClass, x, y, facing, userid, color){
	Ship.call(this, id, shipClass, x, y, facing, userid, color);
	this.shipType = "Capital";
	
	this.getBaseImpulse = function(){
		return 180;
	}
}
Capital.prototype = Object.create(Ship.prototype);

function HeavyAttack(id, shipClass, x, y, facing, userid, color){
	Ship.call(this, id, shipClass, x, y, facing, userid, color);
	this.shipType = "HeavyAttack";
	
	this.getBaseImpulse = function(){
		return 210;
	}
}
HeavyAttack.prototype = Object.create(Ship.prototype);

function Escort(id, shipClass, x, y, facing, userid, color){
	Ship.call(this, id, shipClass, x, y, facing, userid, color);
	this.shipType = "Escort";
	
	
	this.getBaseImpulse = function(){
		return 240;
	}
}
Escort.prototype = Object.create(Ship.prototype);

function Patrol(id, shipClass, x, y, facing, userid, color){
	Ship.call(this, id, shipClass, x, y, facing, userid, color);
	this.shipType = "Patrol";
	
	this.getBaseImpulse = function(){
		return 270;
	}
}
Patrol.prototype = Object.create(Ship.prototype);

