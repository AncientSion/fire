function Obstacle(data){
	Mixed.call(this, data);
	this.size = data.size;
	this.block = data.block;
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
	if (!game.drawMoves || game.turn == 1 && game.phase < 2){return;}

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
	planCtx.moveTo(this.x, this.y);

	var target = getPointInDir(this.getCurSpeed(), this.facing, this.x, this.y);

	planCtx.lineTo(target.x, target.y);
	planCtx.stroke();
	planCtx.closePath();
	planCtx.lineWidth = 1;
	planCtx.strokeStyle = "black";
	planCtx.globalAlpha = 1;

	this.drawMarker(target.x, target.y, "red", planCtx);

	this.resetMoveTranslation();
}

Obstacle.prototype.getShortInfo = function(){
	var ele = ui.shortInfo;
	if (this.userid == game.userid){
		$(ele).attr("class", "friendly");
	} else $(ele).attr("class", "hostile");

	ele
	.append(this.getHeader())
	.append($("<div>").html("Obfuscation " + this.block + "%"))
	.append($("<div>").html("Speed " + this.getCurSpeed() + " / " + this.facing + " degree"));
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
	var div = $("<div>").addClass("obstacleDiv hostile").data("shipId", this.id)

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
			.append($("<td>").html("Center Obfuscation"))
			.append($("<td>").html(this.block + "%")))

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
		.css("width", width/2)
		.css("height", height/2)
		.css("left", width/2 - iconWidth/2)
		.css("top", height/2 - iconHeight/2)
		.append(this.structures[0].getBaseImage().cloneNode(true)))


	$(div).addClass("disabled");
	return div;
}
Obstacle.prototype.create = function(){
	this.setUnitState();
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
		var dist = range(this.size/5, this.size*1.5);
		this.structures[i].layout = getPointInDir(dist, range(0, 360), 0, 0)
		//this.structures[i].layout = getPointInDir(range(30, this.size), 360/this.structures.length*i, 0, 0)
	}
}

Obstacle.prototype.setImage = function(){
	//console.log("Obstacle setImage");
	var t = document.createElement("canvas");
		t.width = this.size*2;
		t.height = this.size*2;
	var ctx = t.getContext("2d");
		ctx.translate(t.width/2, t.height/2);

	for (var i = 0; i < this.structures.length; i++){

		var rota = range(0, 360);

		if (!this.structures[i].doDraw){continue;}

	//	var x = this.structures[i].layout.x/2 / this.size/2 * this.size;
	//	var y = this.structures[i].layout.y/2 / this.size/2 * this.size;

		var x = this.structures[i].layout.x /2;
		var y = this.structures[i].layout.y /2;

		ctx.translate(x, y);

		ctx.rotate(rota * (Math.PI/180))
		ctx.drawImage(
			this.structures[i].getBaseImage(),
			0 -this.structures[i].size/2,
			0 -this.structures[i].size/2,
			this.structures[i].size, 
			this.structures[i].size
		)
		ctx.rotate(-rota * (Math.PI/180))
		ctx.translate(-this.structures[i].layout.x/2, -this.structures[i].layout.y/2);
	}

	//ctx.save();
	//ctx.setTransform(1,0,0,1,0,0);

	//var vectorSize = Math.min(this.size/1.5, 120);
	var vectorSize = 80;
	var vectorPos = getPointInDir(this.size - vectorSize/2, this.facing, 0, 0);

	ctx.translate(vectorPos.x, vectorPos.y);
	//ctx.globalAlpha = 0.8;

	ctx.rotate(this.facing * (Math.PI/180));
	ctx.drawImage(
		graphics.images.vector,
		0 -vectorSize/2,
		0 -vectorSize/2,
		vectorSize, 
		vectorSize
	);

	ctx.rotate(-this.facing * (Math.PI/180));
	//ctx.globalAlpha = 1;
	ctx.setTransform(1,0,0,1,0,0);
	this.img = t;
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
	this.img = graphics.images.rocks[range(0, graphics.images.rocks.length-1)].cloneNode(true);
}

Asteroid.prototype.getBaseImage = function(){
	return this.img;
}

Asteroid.prototype.isDestroyedThisTurn = function(){
	return false;
}