
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

Obstacle.prototype.getMaxInterference = function(){
	//return this.interference;
	return Math.round(this.interference / 100 * this.size);
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
	console.log(this);
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
		//console.log("ding");
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
	.append($("<div>").html("Size " + this.size))
	.append($("<div>").html(this.getMaxInterference() + "% Interference"))
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
			.append($("<td>").html(this.getMaxInterference() + "% (" + this.interference + "% per 100px)")))
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
			trB.append($("<td>").html(Math.round(baseCol * game.getCollisionMod(i)) + "%"));
		}

		table.append($("<tr>")
			.append($("<td>").attr("colSpan", 2)
				.append($("<table>").addClass("collisionTable")
					.append($("<tr>").append($("<td>").attr("colSpan", 7).html("<span class='yellow'>Collision Chance)</span>")))
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

AsteroidField.prototype.setTrueImage = function(info){

	var amount = Math.round(Math.pow(this.size, 2) / 2000 * this.density / this.rockSize);

	var t = document.createElement("canvas");
		t.width = this.size*2;
		t.height = this.size*2;
	var ctx = t.getContext("2d");
		ctx.translate(t.width/2, t.height/2);

	var randoms = 0;

	for (var i = 0; i < amount; i++){

		var rota = range(0, 360);
		var d = range(30, this.size* 0.9);
		var loc = getPointInDir(d, range(0, 360), 0, 0);

		var size = range(3, 5) + (this.rockSize*4);

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
	
	if (info){

		ctx.clearRect(-40, -60, 80, 105);

		ctx.fillStyle = "yellow";
		ctx.font = "24px Arial";
		ctx.textAlign = "center";
		ctx.fillText(this.getMaxInterference() + "%", 0, 0 - 35)

		//ctx.clearRect(-40, -40, 80, 80);
		
		ctx.fillStyle = "yellow";
		ctx.font = "24px Arial";
		ctx.textAlign = "center";
		ctx.fillText(this.collision + "%", 0, 12);
		var wpn = this.primary.systems[0];
		ctx.fillText(wpn.shots + "x " + Math.round((wpn.minDmg + wpn.maxDmg)/2), 0, 37);
	}

	ctx.setTransform(1,0,0,1,0,0);
	this.img = t;
}

AsteroidField.prototype.testObstruction = function(oPos, tPos){
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
			else { // out
				dist = getDistance(oPos, test[0]);
			}
		}
	}
	else {
		dist += isWithinCircle(oPos, tPos, this);
	}
	return dist;
}


function NebulaCloud(data){
	Obstacle.call(this, data);


	this.points = [];
	this.points.push(new Point(this.x, this.y));

	var dimA = range(20, 40);
	var dimB = dimA * 2.5
	var w = 0; var h = 0;

	if (dimA % 2){
		w  = dimA;
		h = dimB;
	}
	else {
		w = dimB;
		h = dimA;
	}

	//var w = 30; var h = 80;

	w = -50;
	h = 50;

	var rota = range(0, 360);
	var rota = 80
	//	r = 0;


	var b = getPointInDir(h, rota, this.x, this.y);
	var c = getPointInDir(w, rota-90, b.x, b.y);
	var d = getPointInDir(h, rota-180, c.x, c.y);

	this.points.push(b);
	this.points.push(c);
	this.points.push(d);
}
NebulaCloud.prototype = Object.create(Obstacle.prototype);

NebulaCloud.prototype.testObstruction = function(oPos, tPos){
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
			else { // out
				dist = getDistance(oPos, test[0]);
			}
		} 
	}
	else if (isWithinRect(oPos, this.points) && isWithinRect(tPos, this.points)){
		dist += getDistance(oPos, tPos);
	}
	
	return dist;
}

NebulaCloud.prototype.getShortInfo = function(){
	var ele = ui.shortInfo.attr("class", "hostile");

	ele
	.append($("<div>").html("Size " + this.size))
	.append($("<div>").html(this.getMaxInterference() + "% Interference"))
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
			.append($("<td>").html(this.getMaxInterference() + "% (" + this.interference + "% per 100px)")))

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
		.append(graphics.images.rocks[range(0, graphics.images.rocks.length-1)].cloneNode(true)));	
		//.append(this.structures[0].getBaseImage().cloneNode(true)))


	$(div).addClass("disabled");
	return div;
}

NebulaCloud.prototype.drawMarker = function(x, y, c, ctx){
	ctx.globalCompositeOperation = "source-over";
	ctx.strokeStyle = c;

	for (var i = 0; i < this.points.length-1; i++){
		ctx.beginPath();
		ctx.moveTo(this.points[i].x, this.points[i].y);
		ctx.lineTo(this.points[i+1].x, this.points[i+1].y);
		ctx.closePath();

		ctx.globalAlpha = 0.25 + (i*0.2);
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

NebulaCloud.prototype.setTrueImage = function(info){
	var t = document.createElement("canvas");
		t.width = this.size*2;
		t.height = this.size*2;
	var ctx = t.getContext("2d");
		ctx.translate(t.width/2, t.height/2);
		ctx.globalAlpha = 1;
	
	if (info){
		ctx.clearRect(-30, -18, 60, 36);

		ctx.fillStyle = "yellow";
		ctx.font = "24px Arial";
		ctx.textAlign = "center";
		ctx.fillText(this.getMaxInterference() + "%", 3, 7)
	}

	ctx.setTransform(1,0,0,1,0,0);
	this.img = t;
}

NebulaCloud.prototype.setTrueImageA = function(info){
	var t = document.createElement("canvas");
		t.width = this.size*2;
		t.height = this.size*2;
	var ctx = t.getContext("2d");
		ctx.translate(t.width/2, t.height/2);
		ctx.globalAlpha = 1;

	var rota = range(0, 360);

		ctx.rotate(rota * (Math.PI/180))
		//ctx.drawImage(
			graphics.images.nebula[range(0, graphics.images.nebula.length-1)],
			-this.size,
			-this.size,
			this.size*2, 
			this.size*2
		//)
		ctx.rotate(-rota * (Math.PI/180))
	
	if (info){
		ctx.clearRect(-30, -18, 60, 36);

		ctx.fillStyle = "yellow";
		ctx.font = "24px Arial";
		ctx.textAlign = "center";
		ctx.fillText(this.getMaxInterference() + "%", 3, 7)
	}

	ctx.setTransform(1,0,0,1,0,0);
	this.img = t;
}