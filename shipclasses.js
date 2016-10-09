function Ship(id, shipClass, x, y, facing, userid, color){
	this.id = id;
	this.shipClass = shipClass;
	this.x = x || false;
	this.y = y || false;
	this.facing = facing;
	this.userid = userid;
	this.id = id;
	this.color = color;
	this.weapons = [];
	this.img;
	this.turns = [];
	this.actions = [];
	this.validMoveArcs = [];
	this.impulseAdjust = [];
	this.maxVector = false;
	this.undoOrderButton = false;
	
	this.startNewTurn = function(){
		this.turns = [];
		this.validMoveArcs = [];
		this.impulseAdjust = [];
		this.maxVector = false;
		this.undoOrderButton = false;
		
		this.unsetWeapons();
	}
	
	this.add = function (add){
		var current = this.facing;
		var ret = 0
        add = add % 360;
		
		if (current + add > 360){
			ret = 0 + (add-(360-current));
		}
		else if (current + add < 0){
			ret = 360 + (current + add);
		}
		else {	
			ret = current + add;
		}
		this.facing = ret;
	}

	this.preview = function(){
		this.createDiv();
		
		if (! this.img){
			window.img = new Image();
			window.img.src = this.shipClass.toLowerCase() + ".png";
			window.img.onload = function(){
				game.ships[0].img = window.img;
				game.ships[0].drawShipForPreview();
			}
		}
		else {
			this.drawShipForPreview();
		}
	}

	this.drawShipForPreview = function(){
		shipCtx.clearRect(0, 0, res.x, res.y);
		shipCtx.save();
		shipCtx.translate(this.x, this.y);
		shipCtx.rotate(this.facing*(Math.PI/180));
		shipCtx.drawImage(this.img, -30, -30, 60, 60);
		shipCtx.restore();
	}

	this.draw = function(){
		var size = this.size*cam.z * 0.8;

		if (this.deployed){			
			if (anim){
			//	console.log("draw while anim");
				ctx.save();
				ctx.translate(this.x + cam.o.x, this.y + cam.o.y);
				ctx.rotate(this.facing * (Math.PI/180));
				ctx.drawImage(this.img, -size/2, -size/2, size, size);
				ctx.restore();
			}
			else {
				var drawPos;

				if (game.phase == 2){
					drawPos = this.getTurnStartPosition();
				} else drawPos = this.getBaseOffsetPos();

				var facing = this.getTurnStartFacing();
				ctx.save();
				ctx.translate(this.x + cam.o.x, this.y + cam.o.y);
				ctx.rotate(facing * (Math.PI/180));
				ctx.drawImage(this.img, -size/2, -size/2, size, size);
				ctx.restore();
			}
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
			this.actions[0].x = pos.x;
			this.actions[0].y = pos.y;
			this.unselect();
			this.select();
		}
		else {
			this.actions.push(new Move("deploy", 0, pos.x, pos.y, 0, 0, 0));
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
		game.draw();
	}

	this.getRealPos = function(){
		if (this.actions.length){
			var last = this.actions[this.actions.length-1];
			return {x: last.x, y: last.y};
		}
		else {
			return {x: this.x, y: this.y};
		}
	}
	
	this.getBaseOffsetPos = function(){
		for (var i = this.actions.length-1; i >= 0; i--){
			if (this.actions[i].resolved == 1){
				return {x: this.actions[i].x + cam.o.x, y: this.actions[i].y + cam.o.y};
			}
		}
	}
	
	this.getOffsetPos = function(){
		return {x: this.actions[this.actions.length-1].x + cam.o.x, y: this.actions[this.actions.length-1].y + cam.o.y};
	}
	
	this.create = function(){
		this.img = window.shipImages[this.shipClass];
		this.facing = addAngle(0, this.facing);
		this.addWeapons();

		if (!window.preview){
			this.createShortInfo();
			this.createDiv();
			return;
		}
	}

	this.hasWeaponsSelected = function(){		
		for (var i = 0; i < this.weapons.length; i++){
			if (this.weapons[i].selected){
				return true;
			}
		}
	}
	
	this.weaponHoverIn = function(weaponId, ele){
		for (var i = 0; i < this.weapons.length; i++){
			if (this.weapons[i].id == weaponId){
				this.weapons[i].highlight = true;
				this.weapons[i].showInfoDiv(ele);
			}
		}
		this.highlightAllSelectedWeapons();
	}
	
	this.weaponHoverOut = function(weaponId){
		for (var i = 0; i < this.weapons.length; i++){
			if (this.weapons[i].id == weaponId){
				if (this.weapons[i].highlight){
					this.weapons[i].highlight = false;
					this.weapons[i].hideInfoDiv();
				}
			}
		}		
		this.highlightAllSelectedWeapons();
	}	
	
	this.highlightAllSelectedWeapons = function(){
		fxCtx.clearRect(0, 0, res.x, res.y);
		
		for (var i = 0; i < this.weapons.length; i++){
			if (this.weapons[i].highlight || this.weapons[i].selected){
				var angle = this.getPlannedFacingToMove(this.actions.length-1);
				var shipPos = this.getOffsetPos();
				this.weapons[i].drawArc(angle, shipPos);
			}
		}
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
				
				moveCtx.beginPath();
				moveCtx.arc(turn.clickX -20, turn.clickY, 7, 0, 2*Math.PI);
				moveCtx.closePath(); moveCtx.fillStyle = "white"; moveCtx.fill(); moveCtx.stroke();
				moveCtx.beginPath();
				moveCtx.arc(turn.clickX +20, turn.clickY, 7, 0, 2*Math.PI);
				moveCtx.closePath(); moveCtx.fillStyle = "white"; moveCtx.fill(); moveCtx.stroke();
				
				drawText(moveCtx, "black", "+", 12, {x: turn.clickX-20, y: turn.clickY});
				drawText(moveCtx, "black", "-", 12, {x: turn.clickX+20, y: turn.clickY});
				
				drawText(moveCtx, "blue", "cost: " + Math.ceil(turn.cost*turn.costmod), 10, turn.thrustTextLoc);
				drawText(moveCtx, "blue", "delay; " + Math.ceil(turn.delay/turn.costmod), 10, {x: turn.thrustTextLoc.x, y: turn.thrustTextLoc.y+15});
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
	
	this.getWeaponById = function(id){
		for (var i = 0; i < this.weapons.length; i++){
			if (this.weapons[i].id == id){
				return this.weapons[i];
			}
		}
	}
		
	this.getRemainingImpulse = function(){	
		var base = this.getBaseImpulse();		
		for (var i = 1; i < this.actions.length; i++){
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
		
		this.validMoveArcs = {start: start, end: end};
		
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
			if (this.actions[i].turn == game.turn){
				if (this.actions[i].cost != 0){
					ep -= this.actions[i].cost * this.actions[i].costmod;
				}
			}
		}
		
		return Math.ceil(ep);
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
		return delay;
	}
		
	this.drawImpulseIndicator = function(){
		var center;
		
		if (this.actions.length){
			center = new Point(this.actions[this.actions.length-1].x + cam.o.x, this.actions[this.actions.length-1].y + cam.o.y);
		}
		else {
			center = new Point(this.x + cam.o.x, this.y + cam.o.y);
		}
		
		var angle = this.getPlannedFacingToMove(this.actions.length-1)
		var p1 = getPointInDirection(this.getRemainingImpulse() + 30, angle, center.x, center.y);
		
		moveCtx.beginPath();			
		moveCtx.moveTo(center.x, center.y);
		moveCtx.lineTo(p1.x, p1.y); 
		moveCtx.closePath();
		moveCtx.stroke();
		
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
	
	this.canShortenTurn = function(){
		return true;
	}
	
	this.canUndoShortenTurn = function(){
		return true;
	}
	
	this.issueShortenTurnDelay = function(i){
		//console.log("issueShortenTurnDelay")
		this.turns[i].mod = (this.turns[i].mod * 10 + 2) / 10;
		this.unsetMoveMode();
		this.setMoveMode();
	}
	
	this.cancelShortenTurnDelay = function(i){
		//console.log("cancelShortenTurnDelay")
		this.turns[i].mod = (this.turns[i].mod * 10 - 2) / 10;
		this.unsetMoveMode();
		this.setMoveMode();
	}
	
	this.doAdjustImpulse = function(obj){

		var shipPos = this.getOffsetPos();

		if (obj.type == "+"){
			if (this.actions.length && this.actions[this.actions.length-1].type == "speedChange" && this.actions[this.actions.length-1].dist == -1){
				this.actions.splice(this.actions.length-1, 1);
			}
			else {
				var action = new Move("speedChange", 1, shipPos.x, shipPos.y, false, 0, obj.cost)
				this.actions.push(action);
			}
		}
		else if (obj.type == "-"){
			if (this.actions.length && this.actions[this.actions.length-1].type == "speedChange" && this.actions[this.actions.length-1].dist == 1){
				this.actions.splice(this.actions.length-1, 1);
			}
			else {
				var action = new Move("speedChange", -1, shipPos.x, shipPos.y, false, 0, obj.cost)
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
		else {
			this.undoOrderButton = false;
			return false;
		}
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
			if (this.getRemainingEP() >= this.getTurnCost()){
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

		this.unsetMoveMode();
		this.setMoveMode();
		game.draw();
	}

	this.getBaseHitChance = function(){
		return Math.ceil(Math.pow(this.mass, 0.5));
	}

	this.getHitChanceFromAngle = function(angle){
		//console.log(angle);
		var a, b, c, base;

		if (angle < 0){
			angle *= -1;
		}

		while (angle > 90){
			angle /= 2;
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
			
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "pos: " + this.x + " / " + this.y;
			td.className = "pos"; tr.appendChild(td);
		var td = document.createElement("td"); tr.appendChild(td); table.appendChild(tr);
			
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "rem. impulse: " + this.getRemainingImpulse() + " / " + this.getTotalImpulse();
			td.className = "impulse"; tr.appendChild(td); table.appendChild(tr);
			
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "accel / deccel cost in EP: " + this.getImpulseChangeCost(); tr.appendChild(td);  table.appendChild(tr);
			td.className = "accel"; tr.appendChild(td); table.appendChild(tr);
			
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "ship mass : " + this.mass; tr.appendChild(td); table.appendChild(tr);
			
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "rem. enginepower : " + this.ep;
			td.className = "ep"; tr.appendChild(td); table.appendChild(tr);
			
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "rem. delay: " + this.getRemainingDelay() + " pixels";
			td.className = "remDelay"; tr.appendChild(td); table.appendChild(tr);	
			
		div.appendChild(table);
		
		var table = document.createElement("table");
		
		this.weapons.sort(function(a, b){
			if (a.name == b.name){
				if (a.id > b.id){
					return 1;
				}
			} else return -1;
		})
		
		for (var i = 0; i < this.weapons.length; i++){
			var tr = this.weapons[i].getTableRow();
			
			table.appendChild(tr);
		}
		
		div.appendChild(table);
		$(div).draggable();
	//		div.style.left = this.x - res.x + cam.o.x + 100 + "px";
	//		div.style.top = this.y + cam.o.y + 100 + "px";
		
		document.getElementById("game").appendChild(div);
	}
	
	this.updateDiv = function(){
		var divs = document.getElementsByClassName("shipDiv");
		
		for (var i = 0; i < divs.length; i++){
			if ($(divs[i]).data("shipId") == this.id){
				var divs = divs[i];
				break;
			}
		}
		
		$(divs).find(".pos").html("pos: " + this.x + " / " + this.y);
		$(divs).find(".impulse").html("rem. impulse: " + this.getRemainingImpulse() + " / " + this.getTotalImpulse());
		$(divs).find(".accel").html("accel / deccel cost in EP: " + this.getImpulseChangeCost());
		$(divs).find(".ep").html("rem. engine power: " + this.getRemainingEP());
		$(divs).find(".remDelay").html("rem. delay: " + this.getRemainingDelay() + " pixels");
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
			ele.style.left = (opos.x - 30) + "px";
			ele.style.top = (opos.y + 10) + "px";
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
				
		if (div.className == "shipDiv disabled ui-draggable ui-draggable-handle"){
			div.className = "shipDiv ui-draggable ui-draggable-handle";
			
			if (shortInfo){
				document.getElementById(shortInfo + "shortInfo").className = "shortInfo disabled";
				shortInfo = false;
			}
		}
		else {
			div.className = "shipDiv disabled ui-draggable ui-draggable-handle";
		}
	}
	
	this.setMoveMode = function(){
		game.mode = 1;
		this.drawSelector();


		if (game.phase == -1){ // DEPLOYMENT
			this.drawTurnControl();
			this.updateDiv();
		}
		else if (game.phase == 1){
			this.drawMoveRange();
			this.drawImpulseIndicator();
			this.drawImpulseUI();

			if (this.canTurn()){
				this.drawTurnControl()
				this.updateDiv();
				this.drawMovePlan();
			}
		}

		this.updateDiv();
		this.drawMovePlan();
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
			
			for (var i = 0; i < this.weapons.length; i++){
				this.weapons[i].highlight = false;
				this.weapons[i].selected = false;
			}
			
			$("#weaponAimTableWrapper").hide();
		}
	}
	
	
	this.unsetWeapons = function(){	
		var divs = document.getElementsByClassName("shipDiv");
		for (var i = 0; i < divs.length; i++){
			if ($(divs[i]).data("shipId") == this.id){
				divs = divs[i];
				break;
			}				
		}
	
		var buttons = $(divs).find(".weapon");			
		for (var i = 0; i < buttons.length; i++){
			buttons[i].className = "weapon";
		}
		
		for (var i = 0; i < this.weapons.length; i++){
			this.weapons[i].highlight = false;
			this.weapons[i].selected = false;
		}
		
		$("#weaponAimTableWrapper").hide();
	}
	
	
	this.create();
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

function Sharlin(id, shipClass, x, y, facing, userid, color){
	this.faction = "Minbari Federation";
	this.crew = 245;
	this.pv = 2000;
	this.ep = 850;
	this.size = 100;
	this.mass = 19000;
	this.profile = [0.90, 1.15];
	
	this.addWeapons = function(){
		this.weapons.push(new NeutronLaser(this.id, 300, 60));
		this.weapons.push(new NeutronLaser(this.id, 300, 60));
		this.weapons.push(new NeutronLaser(this.id, 300, 60));
		this.weapons.push(new FusionCannon(this.id, 0, 120));
		this.weapons.push(new FusionCannon(this.id, 0, 120));
		this.weapons.push(new FusionCannon(this.id, 240, 360));
		this.weapons.push(new FusionCannon(this.id, 240, 360));
	}
		
	Capital.call(this, id, shipClass, x, y, facing, userid, color);
}
Sharlin.prototype = Object.create(Capital.prototype);

function Omega(id, shipClass, x, y, facing, userid, color){
	this.faction = "Earth Alliance";
	this.crew = 640;
	this.pv = 1200;
	this.ep = 550;
	this.size = 80;
	this.mass = 15000;
	this.profile = [0.85, 1.10];
	
	this.addWeapons = function(){
		this.weapons.push(new MediumLaser(this.id, 0, 180));
		this.weapons.push(new MediumLaser(this.id, 0, 180));
		this.weapons.push(new MediumLaser(this.id, 180, 360));
		this.weapons.push(new MediumLaser(this.id, 180, 360));
		this.weapons.push(new HeavyLaser(this.id, 300, 360));
		this.weapons.push(new HeavyLaser(this.id, 300, 360));
		this.weapons.push(new HeavyLaser(this.id, 0, 60));
		this.weapons.push(new HeavyLaser(this.id, 0, 60));
	}
		
	Capital.call(this, id, shipClass, x, y, facing, userid, color);
}
Omega.prototype = Object.create(Capital.prototype);

function Hyperion(id, shipClass, x, y, facing, userid, color){
	this.faction = "Earth Alliance";
	this.crew = 356;
	this.pv = 900;
	this.ep = 220;
	this.size = 60;
	this.mass = 8000;
	
	this.addWeapons = function(){
		this.weapons.push(new StandardParticleBeam(this.id, 0, 360));
		this.weapons.push(new StandardParticleBeam(this.id, 0, 360));
		this.weapons.push(new StandardParticleBeam(this.id, 0, 360));
		this.weapons.push(new HeavyLaser(this.id, 300, 360));
		this.weapons.push(new HeavyLaser(this.id, 0, 60));
	}
		
	HeavyAttack.call(this, id, shipClass, x, y, facing, userid, color);
}
Hyperion.prototype = Object.create(HeavyAttack.prototype);

function Artemis(id, shipClass, x, y, facing, userid, color){
	this.faction = "Earth Alliance";
	this.crew = 120;
	this.pv = 500;
	this.ep = 90;
	this.size = 50;
	this.mass = 3000;
	this.faction = "Earth Alliance";
	
	this.addWeapons = function(){
		this.weapons.push(new StandardParticleBeam(this.id, 0, 180));
		this.weapons.push(new StandardParticleBeam(this.id, 0, 180));
		this.weapons.push(new StandardParticleBeam(this.id, 180, 360));
		this.weapons.push(new StandardParticleBeam(this.id, 180, 360));
		this.weapons.push(new ParticleCannon(this.id, 240, 360));
		this.weapons.push(new ParticleCannon(this.id, 0, 120));
		this.weapons.push(new ParticleCannon(this.id, 0, 360));
	}
		
	Escort.call(this, id, shipClass, x, y, facing, userid, color);
}
Artemis.prototype = Object.create(Escort.prototype);

function Primus(id, shipClass, x, y, facing, userid, color){
	this.faction = "Centauri Republic";
	this.crew = 550;
	this.pv = 1300;
	this.ep = 550;
	this.size = 70;
	this.mass = 12500;
	
	this.addWeapons = function(){
		this.weapons.push(new ParticleAccelerator(this.id, 240, 30));
		this.weapons.push(new ParticleAccelerator(this.id, 240, 30));
		this.weapons.push(new ParticleAccelerator(this.id, 240, 30));
		this.weapons.push(new ParticleAccelerator(this.id, 330, 120));
		this.weapons.push(new ParticleAccelerator(this.id, 330, 120));
		this.weapons.push(new ParticleAccelerator(this.id, 330, 120));
	}
		
	Capital.call(this, id, shipClass, x, y, facing, userid, color);
}
Primus.prototype = Object.create(Capital.prototype);

function Demos(id, shipClass, x, y, facing, userid, color){
	this.faction = "Centauri Republic";
	this.crew = 84;
	this.pv = 600;
	this.ep = 70;
	this.size = 45;
	this.mass = 2250;
	
	this.addWeapons = function(){
		this.weapons.push(new ParticleAccelerator(this.id, 300, 120));
		this.weapons.push(new LightParticleAccelerator(this.id, 240, 120));
		this.weapons.push(new ParticleAccelerator(this.id, 240, 60));
	}
		
	Escort.call(this, id, shipClass, x, y, facing, userid, color);
}
Demos.prototype = Object.create(Escort.prototype);

function Haven(id, shipClass, x, y, facing, userid, color){
	this.faction = "Centauri Republic";
	this.crew = 40;
	this.pv = 300;
	this.ep = 25;
	this.size = 45;
	this.mass = 800;
	
	this.addWeapons = function(){
		this.weapons.push(new LightParticleAccelerator(this.id, 0, 270))
		this.weapons.push(new LightParticleAccelerator(this.id, 90, 360));
		this.weapons.push(new LightParticleAccelerator(this.id, 180, 90));
		this.weapons.push(new LightParticleAccelerator(this.id, 270, 180));
	}
		
	Patrol.call(this, id, shipClass, x, y, facing, userid, color);
}
Haven.prototype = Object.create(Patrol.prototype);

