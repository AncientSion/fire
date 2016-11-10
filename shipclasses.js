function Ship(id, shipclass, x, y, facing, userid){
	this.id = id;
	this.shipClass = shipclass;
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
	this.structures = [];

	this.profile = [];
	this.mass = 0;

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

	this.canDeploy = function(pos){
		if (game.deployArea.type == "rect"){
			if (pos.x >= game.deployArea.x && pos.x <= game.deployArea.x + game.deployArea.w){
				if (pos.y >= game.deployArea.y && pos.y <= game.deployArea.y + game.deployArea.h){
					return true;
				}
			}
		}
		else if (game.deployArea == "circle"){
			if (getDistance(pos, {x: game.deployArea.x, y: game.deployArea.y}) <= game.deployArea.s){
				return true;
			}
		}

		return false;
	}

	this.doDeploy = function(pos){
		if (this.actions.length){
			this.actions[0].x = pos.x - cam.o.x;
			this.actions[0].y = pos.y - cam.o.y;
			this.unselect();
		}
		else {
			var facing = 0;
			if (this.userid == 1){facing = 0;}else {facing = 180};
			this.actions.push(new Move("deploy", 0, pos.x - cam.o.x, pos.y - cam.o.y, facing, 0, 0));
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
					return;
				}
				else {
					for (var i = this.actions.length-1; i >= 0; i--){
						if (this.actions[i].resolved && this.actions[i].turn == game.turn -1){
							this.x = this.actions[i].x;
							this.y = this.actions[i].y;
							return;
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
			if (game.phase == 2){ // FIRE -> animating moves
				for (var i = 0; i < this.actions.length; i++){
					if (this.actions[i].turn < game.turn){
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

	this.getPrimarySection = function(){
		return this.primary;
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
		return Math.ceil((Math.pow(this.mass, 1.56) / 10000) *  this.getImpulseMod());
	}
	
	this.getBaseTurnDelay = function(){
		return Math.pow(this.mass, 0.55);
	}
	
	this.getTurnDelay = function(){
		return Math.ceil(this.getBaseTurnDelay() / this.getImpulseMod());
	}
	
	this.drawSelector = function(){
		var shipPos = this.getBaseOffsetPos();
		moveCtx.beginPath();			
		moveCtx.arc(shipPos.x, shipPos.y, this.size/2, 0, 2*Math.PI, false);
		moveCtx.fillStyle = 
		moveCtx.closePath();
		
		if (this.friendly){
			moveCtx.strokeStyle = "green";
		}
		else {
			moveCtx.strokeStyle = "red";
		}

		moveCtx.lineWidth = 3;
		moveCtx.stroke();
		moveCtx.lineWidth = 1;
		moveCtx.strokeStyle = "black";
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

	this.doIncreaseImpulse = function(){
		var shipPos = this.getPlannedPosition();
		if (this.actions.length && this.actions[this.actions.length-1].type == "speedChange" && this.actions[this.actions.length-1].dist == -1){
			this.actions.splice(this.actions.length-1, 1);
		}
		else {
			var action = new Move("speedChange", 1, shipPos.x - cam.o.x, shipPos.y - cam.o.y, false, 0, this.getImpulseChangeCost());
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
			var action = new Move("speedChange", -1, shipPos.x - cam.o.x, shipPos.y - cam.o.y, false, 0, this.getImpulseChangeCost());
			this.actions.push(action);
		}
		this.unsetMoveMode();
		this.setMoveMode();
	}

	this.drawMovementUI = function(){
		this.drawNewImpulseUI();
		this.drawVectorMovementUI();

		if (this.canTurn()){
			this.drawNewTurnUI();
			this.updateDiv();
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
		moveCtx.stroke();
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
			var left = p.x - $(ele).width()/2;
			var top = p.y - $(ele).height()/2;

			$(ele)
				.data("shipid", this.id)
				.html("<div style='margin-left: 5px; margin-top: 5px'>"+rem+"<div>")
				.css("left", left)
				.css("top", top)
				.removeClass("disabled")
		}
		if (delay > 0){
			if (rem >= delay){
				ele = document.getElementById("maxTurnVector");
				var p = getPointInDirection(rem + 40, angle, center.x, center.y);
				var left = p.x - $(ele).width()/2;
				var top = p.y - $(ele).height()/2;

				$(ele)
					.data("shipid", this.id)
					.html("<div style='margin-left: 5px; margin-top: 5px'>"+delay+"<div>")
					.css("left", left)
					.css("top", top)
					.removeClass("disabled")
			}
		}
	}

	this.drawNewTurnUI = function(){
		var center;
		var plannedAngle = this.getPlannedFacingToMove(this.actions.length-1);
		
		if (this.actions.length){
			center = new Point(this.actions[this.actions.length-1].x + cam.o.x, this.actions[this.actions.length-1].y + cam.o.y);
		}
		else center = this.getBaseOffsetPos();

		for (var j = 1; j >= -1; j = j-2){
			for (var i = 1; i <= 1; i++){
			
				var modAngle = 30 * i * j;
				var newAngle = addAngle(plannedAngle, modAngle);
				var turn = 
							{
								x: center.x,
								y: center.y, 
								a: modAngle,
								cost: this.getTurnCost(),
								delay: this.getTurnDelay(),
								thrustUp: false,
								costmod: 1
							}
				this.turns.push(turn)

				var p = getPointInDirection(this.getRemainingImpulse()/2+80, newAngle, center.x, center.y);

				moveCtx.beginPath();
				moveCtx.moveTo(center.x, center.y);
				moveCtx.lineTo(p.x, p.y);
				moveCtx.closePath();
				moveCtx.stroke();

				var turnEle;

				if (modAngle < 0){turnEle = document.getElementById("turnLeft")}
				else {turnEle = document.getElementById("turnRight")}

				var cost = this.getTurnCost();
				var delay = this.getTurnDelay();

				$(turnEle).find("#epCost").html(cost);
				$(turnEle).find("#turnDelay").html(delay + "px");

				var left = p.x - $(turnEle).width()/2;
				var top = p.y - $(turnEle).height()/2;

				$(turnEle)
					.data("a", modAngle)
					.data("shipid", this.id)
					.css("left", left)
					.css("top", top)
					.removeClass("disabled")
			}
		}
	}

	this.drawNewImpulseUI = function(){
		var offSetPos = this.getBaseOffsetPos();
		var w = $("#impulseGUI").width();
		var h = $("#impulseGUI").height();
		var p;

		if (this.facing > 90 && this.facing < 270){
			var p = getPointInDirection(this.size*1.25, this.getTurnStartFacing() + 180, offSetPos.x, offSetPos.y);
			$("#impulseGUI").css("left", p.x).css("top", p.y - h/2).removeClass("disabled");
		}
		else {
			var p = getPointInDirection(this.size*1.25+w/2, this.getTurnStartFacing() + 180, offSetPos.x, offSetPos.y);
			$("#impulseGUI").css("left", p.x - w/2).css("top", p.y - h/2).removeClass("disabled");
		}

		$("#impulseGUI").find("#enginePower").html(this.getRemainingEP() + " / " + this.ep);
		$("#impulseGUI").find("#impulse").html(this.getRemainingImpulse() + " / " + this.getTotalImpulse());
		$("#impulseGUI").find("#impulseChange").html(this.getImpulseChangeCost() + " EP");

		if (this.canIncreaseImpulse()){$("#impulseGUI").find("#increaseImpulse").removeClass("disabled")}
		else {$("#impulseGUI").find("#increaseImpulse").addClass("disabled")}

		if (this.canDecreaseImpulse()){$("#impulseGUI").find("#decreaseImpulse").removeClass("disabled")}
		else {$("#impulseGUI").find("#decreaseImpulse").addClass("disabled")}

		if (this.canUndoLastOrder()){$("#impulseGUI").find("#undoLastAction").removeClass("disabled")}
		else {$("#impulseGUI").find("#undoLastAction").addClass("disabled")}
	}

	
	this.issueMove = function(pos, dist){

		if (this.actions[this.actions.length-1].type == "move" && this.actions[this.actions.length-1].turn == game.turn){
			this.actions[this.actions.length-1].dist+= dist;	
			this.actions[this.actions.length-1].x = pos.x - cam.o.x;
			this.actions[this.actions.length-1].y = pos.y - cam.o.y;
		}
		else {
			this.actions.push(new Move("move", dist, pos.x - cam.o.x, pos.y - cam.o.y, 0, 0));	
		}
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
		return false;
	}
	
	this.issueTurn = function(a){
		for (var i = 0; i < this.turns.length; i++){
			if (this.turns[i].a == a){
				this.actions.push(
					new Move(
						"turn",
						0,
						this.turns[i].x - cam.o.x,
						this.turns[i].y - cam.o.y,
						this.turns[i].a,
						this.turns[i].delay,
						this.turns[i].cost,
						this.turns[i].costmod
						)
					);
				this.unsetMoveMode();
				this.setMoveMode();
				game.draw();
				return;
			}
		}
	}
	
	this.issueDeploymentTurn = function(turn){
		this.actions[0].a += turn.a;
		this.setFacing();
		this.unsetMoveMode();
		this.setMoveMode();
		game.draw();
	}

	this.getBaseHitChance = function(){
		return Math.ceil(Math.pow(this.mass, 0.5));
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
			//e.preventDefault();
			e.stopPropagation();
			//$(this).hide();
		})
			
		document.getElementById("game").appendChild(div);

		structContainer = document.createElement("div");
		structContainer.className = "structContainer";	
		div.appendChild(structContainer);

		var pWidth = $(structContainer).width();
		var pHeight = $(structContainer).height();


		// OUTER STRUCTS
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

			var entry = 0;

			for (var j = 0; j < this.structures[i].systems.length; j++){
				if (entry < 2){
					var tr = document.createElement("tr");
				}

				var ele = this.structures[i].systems[j].getTableData();
				entry++;
				tr.appendChild(ele);
				structTable.appendChild(ele);

				if (entry == 2){
					structTable.appendChild(tr);
					entry = 0;
				}
			}

			structDiv.appendChild(structTable);
			structContainer.appendChild(structDiv);

			var a = this.structures[i].getDirection();
			var pos = getPointInDirection(130, addAngle(a, -90), pWidth/2-10, pHeight/2-50);



			$(structDiv)
				.data("id", this.structures[i].id)
				.data("structureId", i)
				.css("left", pos.x - $(structTable).width() / 2 +5)
				.css("top", pos.y - $(structTable).height() /2);
		}


		// PRIMARY
		var primaryContainer = document.createElement("div");
			$(primaryContainer).addClass("primaryDiv")
				.css("left", pWidth / 2-55)
				.css("top", pHeight / 2 - 50)

				
		var primaryTable = document.createElement("table");
			primaryTable.className = "PrimaryTable";
			primaryTable.appendChild(this.primary.getTableRow());

			primaryContainer.appendChild(primaryTable);

		structContainer.appendChild(primaryContainer);

		/*
		var div = document.createElement("div");
			div.className = "iconDiv";

		var img = new Image();
			img.src = "shipIcons/" + this.shipClass.toLowerCase() + ".png";
			$(img)
				.addClass("rotate270")
				.css("width", 100)
				.css("height", 100)
			div.appendChild(img);

		structContainer.appendChild(div);
		$(div)
			.css("left", pWidth/2-50)
			.css("top", pHeight/2-50)
		*/

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
		this.drawMoveRange();
		this.drawArcIndicator();
		this.drawVectorIndicator();

		if (game.phase == -1){ // DEPLOYMENT
			if (this.actions[0].type == "deploy"  && this.actions[0].turn == game.turn){
				this.drawNewTurnUI();
			}
			else {
				console.log("deployed earlier!");
			}
		}
		else if (game.phase == 1){ // MOVE
			this.drawMovementUI();
			this.drawMovePlan();
		}
		else if (game.phase == 2){ // FIRE
		}
		else if (game.phase == 3){ // Dmg control
		}

		this.updateDiv();
	}	
	
	this.unsetMoveMode = function(){
		game.mode = false;
		$("#vectorDiv").addClass("disabled");
		$("#impulseGUI").addClass("disabled");
		$(".turnEle").addClass("disabled");
		$("#maxVector").addClass("disabled");
		$("#maxTurnVector").addClass("disabled");
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
		cam.setFocus(this.x, this.y);
		game.draw();
		console.log(this);
		aShip = this.id;
		this.selected = true;
		this.switchDiv();
		this.setMoveMode();
	}
	
	this.unselect = function(){
		aShip = false;

		this.selected = false;

		if (game.deploying){game.disableDeployment()}
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
				for (var k = this.structures[i].systems[j].fireOrders.length-1; k >= 0; k--){
					if (this.structures[i].systems[j].fireOrders[k].turn == game.turn){
						fires.push(this.structures[i].systems[j].fireOrders[k]);
					}
					else break;
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

