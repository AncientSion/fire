function Obstacle(data){
	Mixed.call(this, data);
	this.primary = {"systems": []};
	this.size = data.size;
	this.density = data.density;
	this.interference = data.interference;
	this.rockSize = data.rockSize;
	this.scale = data.scale;
	this.collision = data.collision;
}
Obstacle.prototype = Object.create(Mixed.prototype);

Obstacle.prototype.setPostMoveFacing = function(){
	this.drawFacing = this.facing;
	for (var i = 0; i < this.actions.length; i++){
		//if (this.actions[i].type == "turn"){
			this.drawFacing += this.actions[i].a;
		//}
	}
}

Obstacle.prototype.doHover = function(){
	this.drawMovePlan();
	this.drawNextMove();
}

Obstacle.prototype.drawMovePlan = function(){return;
	if (!game.phase!= 3 || !game.drawMoves || !game.showObstacleMoves){return;}

	this.setMoveTranslation();

	planCtx.strokeStyle = "#00ea00";

	planCtx.globalAlpha = 0.7;
	planCtx.beginPath();
	planCtx.moveTo(this.x, this.y);

	for (var i = 0; i < this.actions.length; i++){
		planCtx.lineTo(this.actions[i].x, this.actions[i].y);
		planCtx.stroke();
	}
		
	for (var i = 0; i < this.actions.length; i++){
		if (this.actions[i].type == "turn"){
			planCtx.beginPath();
			planCtx.arc(this.actions[i].x, this.actions[i].y, 5, 0, 2*Math.PI, false);
			planCtx.closePath();
			planCtx.stroke();
		}
	}
		
	planCtx.closePath();
	planCtx.lineWidth = 1;
	planCtx.strokeStyle = "black";
	planCtx.globalAlpha = 1;
	this.drawPlanMarker();
	this.resetMoveTranslation();
}

Obstacle.prototype.drawNextMove = function(){
	if (!game.drawMoves){return;}

	this.setMoveTranslation();

	planCtx.strokeStyle = "#00ea00";

	planCtx.globalAlpha = 0.7;
	planCtx.beginPath();
	planCtx.moveTo(this.drawX, this.drawY);

	var nextMove = this.getPlannedPos();

	planCtx.lineTo(nextMove.x, nextMove.y);
	planCtx.stroke();
	planCtx.closePath();
	planCtx.lineWidth = 1;
	planCtx.strokeStyle = "black";
	planCtx.globalAlpha = 1;

	this.drawMarker(nextMove.x, nextMove.y, "red", planCtx);

	this.resetMoveTranslation();
}

Obstacle.prototype.setNextMove = function(){
	var p;

	if (this.actions.length){
		p = this.getPlannedPos();
		p = getPointInDir(this.getCurSpeed(), this.facing, p.x, p.y);
	}
	else {
		p = getPointInDir(this.getCurSpeed(), this.facing, this.x, this.y);
	}
	this.actions.push(new Move(-1, this.id, "move", 0, this.getCurSpeed(), p.x, p.y, 0, 0, 0, 1, 1, 0));
}

Obstacle.prototype.getMaxInterference = function(){
	return Math.round(this.interference / 100 * this.size);
}

Obstacle.prototype.getMaxCollision = function(){
	return Math.round(this.collision / 100 * this.size/2);
}

Obstacle.prototype.getShortInfo = function(){
	var ele = ui.shortInfo.attr("class", "hostile");

	ele
	//.append(this.getHeader())
	.append($("<div>").html("Size " + this.size + " / Speed " + this.getCurSpeed()))
	.append($("<div>").html(this.getMaxInterference() + "% Interference"))
	.append($("<div>").html(this.getMaxCollision() + "% Base Collision"))
	.append($("<div>").html(this.getDamageString()))
}

Obstacle.prototype.getHeader = function(){
	return $("<div>")
	.append($("<div>")
		.append($("<div>").css("display", "inline").html(this.display + " #" + this.id)));
}

Obstacle.prototype.getCurSpeed = function(){
	return this.curImp;
}

Obstacle.prototype.select = function(){
	console.log(this);
	return;
}

Obstacle.prototype.createBaseDiv = function(){
	var div = $("<div>")
		.addClass("obstacleDiv hostile")
		.data("shipId", this.id)
		.contextmenu(function(e){
			e.stopImmediatePropagation(); e.preventDefault();
			game.zIndex--;
			$(this).addClass("disabled");
		});

	this.element = div[0];

	var table = $("<table>")

	$(table)
		.append($("<tr>")
			.append($("<th>").html(this.display.toUpperCase() + " #" + this.id).attr("colSpan", 2)))
		.append($("<tr>")
			.append($("<td>").html("Size"))
			.append($("<td>").html(this.size)))
		//.append($("<tr>")
		//	.append($("<td>").html("Vector"))
		//	.append($("<td>").html(this.facing + " degree")))
		.append($("<tr>")
			.append($("<td>").html("Speed"))
			.append($("<td>").html(this.getCurSpeed())))
		.append($("<tr>")
			//.append($("<td>").html("Base Interference Chance"))
			//.append($("<td>").html(this.interference + "% per 100px")))
			.append($("<td>").html("Interference Chance"))
			.append($("<td>").html(this.getMaxInterference() + "% (" + this.interference + "% per 100px)")))
		.append($("<tr>")
			.append($("<td>").html("Max Collision Chance"))
			.append($("<td>").html(this.getMaxCollision() + "% (" + this.collision + "% per 100px)")))
		.append($("<tr>")
			.append($("<td>").html("Damage Potential"))
			.append($("<td>").html(this.getDamageString())))

	div.append(table);

	$(this.expandDiv($(div[0])))
		.find(".structContainer")
			//.contextmenu(function(e){e.stopPropagation(); e.preventDefault()})
			.end()
		.find(".header")
			.contextmenu(function(e){
				//e.stopImmediatePropagation(); e.preventDefault();
				$(this).parent().find($(".structContainer")).toggle();
			})
			.end()
		.find(".iconContainer")
			.contextmenu(function(e){
				e.stopImmediatePropagation(); e.preventDefault();
				if ($(this).parent().parent().data("shipId") != aUnit){
					game.zIndex--;
					$(this).parent().parent().addClass("disabled");
				}
			})

	if (game.turn){div.drag();}

	if (game.phase == 2){
		$(div).find(".structContainer").show();
	}
}

Obstacle.prototype.expandDiv = function(div){
	var structContainer = $("<div>").addClass("structContainer");
	$(div).append(structContainer);
	$(document.body).append(div);

	var height = structContainer.height();
	var width = structContainer.width();

	var iconWidth = 100;
	var iconHeight = 100;
	$(structContainer)
	.append($("<div>")
		.addClass("obstacle")
		.append(graphics.images.rocks[range(0, graphics.images.rocks.length-1)].cloneNode(true)));	
		//.append(this.structures[0].getBaseImage().cloneNode(true)))


	$(div).addClass("disabled");
	return div;
}

Obstacle.prototype.getAllResolvingFireOrders = function(){
	var fires = [];

	for (var i = 0; i < this.primary.systems.length; i++){
		var fire = this.primary.systems[i].getResolvingFireOrders();
		if (fire){fires.push(fire);}
	}
	return fires;
}

Obstacle.prototype.getEvents = function(){
	var data = [];
	for (var i = 0; i < this.primary.systems.length; i++){
		for (var j = 0; j < this.primary.systems.length; j++){
			if (this.primary.systems[i].hasEvent()){
				data.push(this.primary.systems[i]);
			}
		}
	}
	return data;
}

Obstacle.prototype.create = function(){
	this.setUnitState();
	if (game.phase == 2 || game.phase == 3){return;}
	this.setNextMove();
}

Obstacle.prototype.setUnitState = function(){
	this.friendly = 0;
	this.deployed = 1;
	this.isReady = 1;
}

Obstacle.prototype.setDrawData = function(){
	console.log("Obstacle setDrawData");

	if (game.phase < 2){
		this.setPreMovePosition();
	}
	else {
		this.setPostMovePosition();
	}
}

Obstacle.prototype.setPreMovePosition = function(){
	this.drawX = this.x;
	this.drawY = this.y;
}

Obstacle.prototype.setPostMovePosition = function(){
	this.drawX = this.x;
	this.drawY = this.y;
}

Obstacle.prototype.setPreMoveFacing = function(){
}

Obstacle.prototype.setPreMoveFacing = function(){
}

Obstacle.prototype.draw = function(){
	this.drawPositionMarker();
	ctx.translate(this.drawX, this.drawY);
 	if (this.doDraw){this.drawSelf();}
	ctx.translate(-this.drawX, -this.drawY);
}

Obstacle.prototype.drawPositionMarker = function(){
	if (!game.drawCircle){return;}
	this.drawMarker(this.drawX, this.drawY, "", ctx);
}

Obstacle.prototype.drawMarker = function(x, y, c, context){
	context.beginPath();
	context.arc(x, y, (this.size/2)-1, 0, 2*Math.PI, false);
	context.closePath();
	context.lineWidth = 1;
	context.globalAlpha = 0.7;
	context.globalCompositeOperation = "source-over";
	context.strokeStyle = "Bisque";
	context.stroke();
	context.globalAlpha = 1;
	context.lineWidth = 1;
	context.strokeStyle = "black";
}

Obstacle.prototype.setLayout = function(){
	for (var i = 0; i < this.structures.length; i++){
		//this.structures[i].layout.x = range(0, max/2) * (1 - (range(0, 1)*2));
		//this.structures[i].layout.y = range(0, max/2)* (1 - (range(0, 1)*2));
		var dist = range(this.size/3, this.size*1.5);
		this.structures[i].layout = getPointInDir(dist, range(0, 360), 0, 0)
		//this.structures[i].layout = getPointInDir(range(30, this.size), 360/this.structures.length*i, 0, 0)
	}
}

Obstacle.prototype.setImage = function(){

	var amount = Math.round(Math.pow(this.size, 2) / 2000 * this.interference / (this.rockSize/2)/5);
	console.log(this.id+"/"+amount);

	var t = document.createElement("canvas");
		t.width = this.size*2;
		t.height = this.size*2;
	var ctx = t.getContext("2d");
		ctx.translate(t.width/2, t.height/2);

	var rockSize = this.rockSize/2;
	var randoms = 0;

	for (var i = 0; i < amount; i++){

		var rota = range(0, 360);
		var d = range(0, this.size* 0.9);
		var loc = getPointInDir(d, range(0, 360), 0, 0);

		var size = range(7, 10) + (rockSize)*15;

		if (range(0, 100) <= 20){
			randoms++;
			size *= range(5, 20)/10
		}


		ctx.translate(loc.x, loc.y);
		ctx.rotate(rota * (Math.PI/180))
		ctx.drawImage(
			graphics.images.rocks[range(0, graphics.images.rocks.length-1)],
			-size/2,
			-size/2,
			size, 
			size
		)
		ctx.rotate(-rota * (Math.PI/180))
		ctx.translate(-loc.x, -loc.y);
	}

	console.log(amount-randoms + " / " + randoms);

	/*var vectorSize = 80;
	var vectorPos = getPointInDir(this.size - vectorSize/2, this.facing, 0, 0);

	ctx.translate(vectorPos.x, vectorPos.y);
	ctx.rotate(this.facing * (Math.PI/180));
	ctx.drawImage(
		graphics.images.vector,
		0 -vectorSize/2,
		0 -vectorSize/2,
		vectorSize, 
		vectorSize
	);

	ctx.rotate(-this.facing * (Math.PI/180));
	ctx.translate(-vectorPos.x, -vectorPos.y);
	*/

	var vectorPos = getPointInDir(this.size-3, this.facing, 0, 0);

	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(vectorPos.x, vectorPos.y);
	ctx.closePath();
	ctx.lineWidth = 5;
	ctx.strokeStyle = "green";
	ctx.stroke();
	
	ctx.clearRect(-34, -25, 68, 50);
	
	ctx.fillStyle = "yellow";
	ctx.font = "24px Arial";
	ctx.textAlign = "center";
	ctx.fillText(this.getMaxInterference() + "%", 0, -2);
	ctx.fillText(this.getMaxCollision() + "%", 0, 20);
	

	ctx.setTransform(1,0,0,1,0,0);
	this.img = t;
}

Obstacle.prototype.getDamageString = function(){
	var wpn = this.primary.systems[0];
	return wpn.shots + "x " + wpn.minDmg + " - " + wpn.maxDmg;
}

Obstacle.prototype.getBaseImage = function(){
	return this.img;
}

function Asteroid(data){
	this.layout = data.layout;
	this.systems = data.systems;
	this.size = data.size;
	this.doDraw = 1;
	this.img;

	this.setBaseImage();
}

Asteroid.prototype.setBaseImage = function(){
	//this.img = graphics.images.rocks[range(0, graphics.images.rocks.length-1)].cloneNode(true);
}

Asteroid.prototype.getBaseImage = function(){
	return this.img;
}

Asteroid.prototype.isDestroyedThisTurn = function(){
	return false;
}