
function Obstacle(data){
	Mixed.call(this, data);
	this.primary = {"systems": []};
	this.points = data.points;
	this.size = data.size;
	this.density = data.density;
	this.interference = data.interference;
	this.rockSize = data.rockSize;
	this.collision = data.collision * game.const.collision.baseMulti;
	this.height = data.height;
	this.width = data.width;
	this.rota = data.rota;
	this.imageId = data.imageId;
}

Obstacle.prototype = Object.create(Mixed.prototype);

Obstacle.prototype.getInterference = function(){
	return this.interference;
}

Obstacle.prototype.setPostMoveFaceHead = function(){
	return;
}

Obstacle.prototype.handleHovering = function(){
	return;
}

Obstacle.prototype.getAngledHitChance = function(angle){
	return "-";
}

Obstacle.prototype.drawNextMove = function(){
	return;
}

Obstacle.prototype.drawNextMarker = function(x, y, c, context){
	return;
}

Obstacle.prototype.setNextMove = function(){
	return;
}

Obstacle.prototype.getCollisionPctVsUnit = function(unitSize){
	return Math.round(this.getBaseCollisionPct() / game.const.collision.baseMulti * (game.const.collision.baseMulti - (game.const.collision.hitMod * (4 - unitSize))));
}

Obstacle.prototype.getBaseCollisionPct = function(){
	return this.collision;
}

Obstacle.prototype.getHeader = function(){
	return $("<div>")
	.append($("<div>")
		.append($("<div>").css("display", "inline").html(this.display + " #" + this.id)));
}

Obstacle.prototype.getCurSpeed = function(){
	return false;
}

Obstacle.prototype.doSelect = function(){
	debug(this);
	this.switchDiv();
	return;
	aUnit = this.id;
	this.selected = true;
	this.setUnitSelector();
	this.switchDiv();
	game.redraw()
}

Obstacle.prototype.doUnselect = function(){
	this.switchDiv();
	return;
	aUnit = false;
	this.selected = false;
	this.setUnitSelector();
	this.switchDiv();
}

Obstacle.prototype.unitGetAllResolvingFireOrders = function(){
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
}

Obstacle.prototype.willBeAnimated = function(){
	return false;
}

Obstacle.prototype.setUnitState = function(){
	this.friendly = 0;
	this.deployed = 1;
	this.isReady = 1;
	this.drawX = this.x;
	this.drawY = this.y;
}

Obstacle.prototype.setDrawData = function(){
	return;
}

Obstacle.prototype.setLayout = function(){
	return;
}

Obstacle.prototype.setPreFireImage = function(){
	this.setTrueImage(false);
}

Obstacle.prototype.setPostFireImage = function(){
	this.setTrueImage(true);
}

Obstacle.prototype.getCodeColor = function(){
	return "white";
}

Obstacle.prototype.setImage = function(){
	var info = true;
	if ((game.phase == 1 || game.phase == 2) && game.subPhase < 3){
		//debug("ding");
		info = false;
	}
	this.setTrueImage(info);
}

Obstacle.prototype.getDamageString = function(){
	var wpn = this.primary.systems[0];
	return (wpn.minDmg + " - " + wpn.maxDmg);
}

Obstacle.prototype.getBaseAttacks = function(){
	var wpn = this.primary.systems[0];
	return wpn.shots;
}

Obstacle.prototype.getAvgDmg = function(){
	return Math.round((this.primary.systems[0].minDmg + this.primary.systems[0].maxDmg)/2);
}

Obstacle.prototype.getRealAttacks = function(dist){
	var wpn = this.primary.systems[0];
	return Math.ceil(wpn.shots / 100 * dist);
}

Obstacle.prototype.getRealCollisionPct = function(traverse){
	return Math.round(this.collision * game.getCollisionMod(traverse));
}

Obstacle.prototype.getBaseImage = function(){
	return this.img;
}

Obstacle.prototype.setPreMovePosition = function(){
	this.drawX = this.x;
	this.drawY = this.y;
}

Obstacle.prototype.setPostMovePosition = function(){
	this.drawX = this.x;
	this.drawY = this.y;
}







function AsteroidField(data){
	Obstacle.call(this, data);
}
AsteroidField.prototype = Object.create(Obstacle.prototype);


AsteroidField.prototype.getShortInfo = function(){
	var ele = ui.shortInfo.attr("class", "hostile");

	ele
	//.append(this.getHeader())
	//.append($("<div>").html("Size " + this.size))
	.append($("<div>").html(this.getInterference() + "% Interference"))
	.append($("<div>").html(this.getBaseCollisionPct() + "% Collision"))
	.append($("<div>").html("(" + this.rockSize + ")  "+ this.getDamageString() + " / " + this.getBaseAttacks() + " Strikes"))
}

AsteroidField.prototype.createBaseDiv = function(){
	var div = $("<div>")
		.addClass("obstacleDiv hostile")
		.data("shipId", this.id)
		.contextmenu(function(e){
			e.stopImmediatePropagation(); e.preventDefault();
			game.zIndex--;
			$(this).addClass("disabled");
		});

	this.element = div[0];

	var table = $("<table>")//.contextmenu(function(e){e.stopPropagation()})
	var baseCol = this.getBaseCollisionPct();

	$(table)
		.append($("<tr>")
			.append($("<th>").html(this.display.toUpperCase() + " #" + this.id).attr("colSpan", 2)))
		.append($("<tr>")
			.append($("<td>").html("Size"))
			.append($("<td>").html(this.size)))
		.append($("<tr>")		
			.append($("<td>").html("Interference"))
			.append($("<td>").html(this.interference + "% per 100px")))
				.append($("<tr>")
			.append($("<td>").html("Collision Attacks"))
			.append($("<td>").html(this.getBaseAttacks() + " per 100px")))
		.append($("<tr>")
			.append($("<td>").html("Damage Potential"))
			.append($("<td>").html("(" + this.rockSize + ") " + this.getDamageString())))
		.append($("<tr>")
			.append($("<td>").attr("colSpan", 2).css("height", 10)))


		var units = ["Salvo", "Flight", "", "Squadron", "Medium", "Heavy", "SuperHeavy"];

		var trA = $("<tr>");
		var trB = $("<tr>");
		for (var i = 0; i < units.length; i++){
			if (units[i] == ""){continue;}
			trA.append($("<td>").html(units[i]));
			trB.append($("<td>").html(this.getCollisionPctVsUnit(i) + "%"));
		}

		table.append($("<tr>")
			.append($("<td>").attr("colSpan", 2)
				.append($("<table>").addClass("collisionTable")
					.append($("<tr>").append($("<td>").attr("colSpan", 7).html("<span class='yellow'>Collision Chance</span>")))
					.append(trA)
					.append(trB))))
		.append($("<tr>")
			.append($("<td>").attr("colSpan", 2).css("height", 10)))

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

AsteroidField.prototype.expandDiv = function(div){
	var structContainer = $("<div>").addClass("structContainer");
	$(div).append(structContainer);
	$(document.body).append(div);

	var height = structContainer.height();
	var width = structContainer.width();

	var iconWidth = 75;
	var iconHeight = 75;
	$(structContainer)
	.append($("<div>")
		.addClass("obstacle")
		.append(graphics.images.rocks[range(0, graphics.images.rocks.length-1)].cloneNode(true)));	
		//.append(this.structures[0].getBaseImage().cloneNode(true)))


	$(div).addClass("disabled");
	return div;
}

AsteroidField.prototype.getObstructionPoint = function(oPos, tPos){
	return lineRectIntersect(oPos, tPos, this.points);
}

AsteroidField.prototype.getMaxInterference = function(){
	return Math.round(this.height > this.width ? this.interference / 100 * this.height : this.interference / 100 * this.width);

	return Math.round(this.interference / 100 * this.size);
}

AsteroidField.prototype.testObstruction = function(oPos, tPos){
	var test = lineRectIntersect(oPos, tPos, this.points);
	var dist = 0;

	if (test.length){
		if (test.length == 2){
			dist = getDistance(test[0], test[1]);
		}
		else {
			if (test[0].type == 0){ // in
				dist = getDistance(test[0], tPos);
			}
			else dist = getDistance(oPos, test[0]);
		} 
	}
	else if (isWithinRect(oPos, this.points) && isWithinRect(tPos, this.points)){
		dist = getDistance(oPos, tPos);
	}
	
	return dist;
}

AsteroidField.prototype.drawMarker = function(x, y, c, ctx){
	ctx.globalCompositeOperation = "source-over";
	ctx.strokeStyle = c
	ctx.globalAlpha = 0.25;
	for (var i = 0; i < this.points.length-1; i++){
		ctx.beginPath();
		ctx.moveTo(this.points[i].x, this.points[i].y);
		ctx.lineTo(this.points[i+1].x, this.points[i+1].y);
		ctx.closePath();

		//ctx.globalAlpha = 0.25 + (i*0.2);
		ctx.stroke();
	}

	ctx.beginPath();
	ctx.moveTo(this.points[3].x, this.points[3].y);
	ctx.lineTo(this.points[0].x, this.points[0].y);
	ctx.closePath();

	ctx.globalAlpha = 1;
	ctx.stroke();

	//ctx.rect(x, y, this.width, this.height);
	ctx.globalAlpha = 1;
	ctx.lineWidth = 1;
	ctx.strokeStyle = "black";
}

AsteroidField.prototype.draw = function(){
	this.drawPositionMarker();
	ctx.translate(this.points[0].x, this.points[0].y);
	//ctx.translate(-this.img.width/4,- this.img.height/4);
	ctx.rotate((this.rota-90) * Math.PI/180);
	this.drawSelf();
	ctx.rotate(-(this.rota-90) * Math.PI/180);
	//ctx.translate(this.img.width/4, this.img.height/4);
	ctx.translate(-this.points[0].x, -this.points[0].y);
}

AsteroidField.prototype.drawSelf = function(){
	ctx.drawImage(this.img, 0, 0, this.img.width/2, this.img.height/2);
	//ctx.drawImage(this.img, -this.img.width/4, -this.img.height/4, this.img.width, this.img.height);
}

AsteroidField.prototype.setTrueImage = function(info){
	var ctx;

	if (this.img == undefined || !this.img){
		var t = document.createElement("canvas");
			t.width = this.width*2;
			t.height = this.height*2;

		ctx = t.getContext("2d");

		var size = 10 + (this.rockSize -2) * 4;
		var amount = Math.sqrt(this.width * this.height) / this.density * 10;

		for (i = 0; i < amount; i++){
			var x = range(10, t.width-5) - size;
			var y = range(10, t.height-5) - size;

			ctx.translate(x, y);
			//ctx.rotate(this.rota * (Math.PI/180));
			ctx.drawImage(
				graphics.images.rocks[range(0, graphics.images.rocks.length-1)],
				x,
				y,
				size*2,
				size*2,
			)
			//ctx.rotate(-this.rota * (Math.PI/180));
			ctx.translate(-x, -y);
		}
		this.img = t;
	}
	
	if (info){
		if (this.img){
			ctx = this.img.getContext("2d");
		}

		ctx.translate(this.img.width/2, this.img.height/2);
		ctx.rotate(-(this.rota-90) * (Math.PI/180))

		ctx.fillStyle = "black";
		ctx.rect(-29, -37, 58, 80);
		ctx.fill();

		ctx.fillStyle = "yellow";
		ctx.font = "20px Arial";
		ctx.textAlign = "center";
		ctx.fillText(this.getInterference() + "%", 0, -15);
		ctx.fillText(this.getBaseAttacks()+"x"+this.getAvgDmg(), 0, +14);
		ctx.fillText(this.getBaseCollisionPct() + "%", 0, +37);
		ctx.setTransform(1,0,0,1,0,0);
	}
}

function NebulaCloud(data){
	Obstacle.call(this, data);
}
NebulaCloud.prototype = Object.create(Obstacle.prototype);

NebulaCloud.prototype.getMaxInterference = function(){
	return Math.round(this.interference / 100 * this.size);
}

NebulaCloud.prototype.getShortInfo = function(){
	ui.shortInfo
	.attr("class", "hostile")
	.append($("<div>").html("Size " + this.size))
	.append($("<div>").html(this.getInterference() + "% Interference"))
}

NebulaCloud.prototype.createBaseDiv = function(){
	var div = $("<div>")
		.addClass("obstacleDiv hostile")
		.data("shipId", this.id)
		.contextmenu(function(e){
			e.stopImmediatePropagation(); e.preventDefault();
			game.zIndex--;
			$(this).addClass("disabled");
		});

	this.element = div[0];

	var table = $("<table>")//.contextmenu(function(e){e.stopPropagation()})
	var baseCol = this.getBaseCollisionPct();

	$(table)
		.append($("<tr>")
			.append($("<th>").html(this.display.toUpperCase() + " #" + this.id).attr("colSpan", 2)))
		.append($("<tr>")
			.append($("<td>").html("Size"))
			.append($("<td>").html(this.size)))
		.append($("<tr>")
			.append($("<td>").html("Interference"))
			.append($("<td>").html(this.interference + "% per 100px")))

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

NebulaCloud.prototype.expandDiv = function(div){
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
		//.append(graphics.images.nebula[this.imageId].cloneNode(true)));	
		.append($(this.img).addClass("size100")))


	$(div).addClass("disabled");
	return div;
}

NebulaCloud.prototype.setTrueImage = function(info){
	var t = document.createElement("canvas");
		t.width = this.size*2;
		t.height = this.size*2;
	var ctx = t.getContext("2d");
		ctx.translate(t.width/2, t.height/2);
		ctx.globalAlpha = 1;

		ctx.rotate(this.rota * (Math.PI/180));
		ctx.drawImage(
			graphics.images.nebula[this.imageId],
			-this.size,
			-this.size,
			this.size*2, 
			this.size*2
		)
		ctx.rotate(-this.rota * (Math.PI/180));
	
	if (info){
		ctx.rect(-30, -18, 60, 36);
		ctx.fillStyle= "black;"
		ctx.fill();

		ctx.fillStyle = "yellow";
		ctx.font = "24px Arial";
		ctx.textAlign = "center";
		ctx.fillText(this.getInterference() + "%", 3, 7)
	}

	ctx.setTransform(1,0,0,1,0,0);
	this.img = t;
}

NebulaCloud.prototype.testObstruction = function(oPos, tPos){
	var test = lineCircleIntersect(oPos, tPos, this.getGamePos(), this.size/2);
	var dist = 0;

	if (test.length){
		if (test.length == 2){
			dist = getDistance(test[0], test[1]);
		}
		else {
			if (test[0].type == 0){ // in
				dist = getDistance(test[0], tPos);
			}
			else dist = getDistance(oPos, test[0]);
		}
	}
	else dist = isWithinCircle(oPos, tPos, this);
	
	return dist;
}

NebulaCloud.prototype.getObstructionPoint = function(oPos, tPos){
	return lineCircleIntersect(oPos, tPos, this.getGamePos(), this.size/2);
}