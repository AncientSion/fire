function Obstacle(data){
	Mixed.call(this, data);
	this.primary = {"systems": []};
	this.size = data.size;
	this.block = data.interference;
	this.rockSize = data.rockSize;
	this.scale = data.scale;
	this.damage = data.damage;
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

Obstacle.prototype.drawMovePlan = function(){
	if (!game.drawMoves || !game.showObstacleMoves){return;}

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

Obstacle.prototype.getFullPenBlock = function(){
	return Math.round(this.block / 100 * this.size);
}

Obstacle.prototype.getShortInfo = function(){
	var ele = ui.shortInfo;
	if (this.userid == game.userid){
		$(ele).attr("class", "friendly");
	} else $(ele).attr("class", "hostile");

	ele
	.append(this.getHeader())
	.append($("<div>").html("Interference " + this.getFullPenBlock() + "%"))
	.append($("<div>").html("Collision " + this.collision + "%"))
	.append($("<div>").html("Speed " + this.getCurSpeed()));
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

Obstacle.prototype.drawMarker = function(x, y, c, context){
	context.beginPath();
	context.arc(x, y, (this.size-2)/2, 0, 2*Math.PI, false);
	context.closePath();
	context.lineWidth = 2;
	context.globalAlpha = 0.7;
	context.globalCompositeOperation = "source-over";
	context.strokeStyle = "blue";
	context.stroke();
	context.globalAlpha = 1;
	context.lineWidth = 1;
	context.strokeStyle = "black";
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
		.append($("<tr>")
			.append($("<td>").html("Vector"))
			.append($("<td>").html(this.facing + " degree")))
		.append($("<tr>")
			.append($("<td>").html("Speed"))
			.append($("<td>").html(this.getCurSpeed())))
		.append($("<tr>")
			//.append($("<td>").html("Base Interference Chance"))
			//.append($("<td>").html(this.block + "% per 100px")))
			.append($("<td>").html("Interference Chance"))
			.append($("<td>").html(this.block + "% per 100px / " + this.getFullPenBlock() + "%")))
		.append($("<tr>")
			.append($("<td>").html("Collision Chance"))
			.append($("<td>").html(this.collision + "%")))

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
		.append(graphics.images.rocks[range(0, graphics.images.rocks.length-1)]));	
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


Obstacle.prototype.setPreMovePosition = function(){
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
	//ctx.rotate(this.getDrawFacing() * Math.PI/180);

	//console.log("draw #" + this.id);
 	if (this.doDraw){this.drawSelf();}

	//this.drawEscort();
	//ctx.rotate(-this.getDrawFacing() * Math.PI/180);
	ctx.translate(-this.drawX, -this.drawY);
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

	var amount = Math.round(10*this.size / 100 * this.collision);

	if (this.id == 18){
		console.log("rock " + this.size/2);
	}

	//console.log("Obstacle setImage");
	var t = document.createElement("canvas");
		t.width = this.size*2;
		t.height = this.size*2;
	var ctx = t.getContext("2d");
		ctx.translate(t.width/2, t.height/2);


	for (var i = 0; i < amount; i++){

		//var rota = range(0, 360);
		var d = range(0, this.size/2)
	if (this.id == 18){console.log(d);}
		var loc = getPointInDir(d, range(0, 360), 0, 0);
		var size = range(8, 10) * this.rockSize;

		//ctx.translate(this.structures[i].layout.x/2, this.structures[i].layout.y/2);
		ctx.translate(loc.x, loc.y);
		//ctx.rotate(rota * (Math.PI/180))
		ctx.drawImage(
			graphics.images.rocks[range(0, graphics.images.rocks.length-1)],
			//this.structures[i].getBaseImage(),
			size/2,
			size/2,
			size, 
			size
		)
		//ctx.rotate(-rota * (Math.PI/180))
		//ctx.translate(-this.structures[i].layout.x/2, -this.structures[i].layout.y/2);
		ctx.translate(-loc.x, -loc.y);
	}

	var vectorSize = 80;
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

	ctx.fillStyle = "yellow";
	ctx.font = "20px Arial";
	ctx.textAlign = "center";
	ctx.fillText("I: " + this.getFullPenBlock() + "%", 0, -30);
	//ctx.fillText("C: " + this.structures.length + "x " + this.collision + "%", 0, 30);
	ctx.fillText("C: " + this.collision + "%", 0, 10);
	ctx.fillText("D: " + this.getDamageString(), 0, 40);
	ctx.fillText("rocks: " + amount + " / " + this.rockSize, 0, 70);

	ctx.setTransform(1,0,0,1,0,0);
	this.img = t;

	if (this.id == 18){console.log(this.img.toDataURL());}

}

Obstacle.prototype.getDamageString = function(){
	var wpn = this.primary.systems[0];
	return wpn.minDmg + " - " + wpn.maxDmg;
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