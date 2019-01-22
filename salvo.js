function Salvo(data){
	Mixed.call(this, data);
	this.missile = data.missile;
	this.torpedo = data.torpedo;
	this.salvo = 1;

	this.setSize = function(){
		var max = 0;
		for (var i = 0; i < this.structures.length; i++){
			if (this.structures[i].destroyed){continue;}
			max = Math.max(max, Math.abs(this.structures[i].layout.x));
			max = Math.max(max, Math.abs(this.structures[i].layout.y));
		}
		this.size = max + 15;
	}

	this.getDamage = function(){
		var min = this.getMinDmg();
		var max = this.getMaxDmg();

		if (min == max){
			return min;
		}
		else {
			return min + " - " + max;
		}
	}

	this.getMinDmg = function(){
		return this.structures[0].systems[0].minDmg;
	}

	this.getMaxDmg = function(){
		return this.structures[0].systems[0].maxDmg;
	}

	this.getTrackingString = function(){
		var base = 80;
		var trackStep = 20;
		var target = this.getTarget();
		//var spoof = target.getMaskEffect(this);
			spoof = 0;
		var trackingLack = Math.max(0, (this.structures[0].systems[0].tracking - target.traverse));
		var final = base * (1-spoof) / 100 * (100-(trackingLack * trackStep))
		return "<span class='yellow'>" + final + "%</span>";
	}

	this.setDisplay = function(){
		this.display = this.structures[0].display;
	}

	this.getFiringPosition = function(){
		return new Point(
			this.x + range(this.size * 0.3 * -1, this.size * 0.3),
			this.y + range(this.size * 0.3 * -1, this.size * 0.3)
		)
	}
}

Salvo.prototype = Object.create(Mixed.prototype);

Salvo.prototype.createBaseDiv = function(){
	var owner = "friendly";
	if (this.userid != game.userid){owner = "hostile";}
	var div = $("<div>")
			.addClass("shipDiv ballistic " + owner + " disabled")
			.data("shipId", this.id)
			.contextmenu(function(e){
				e.stopImmediatePropagation(); e.preventDefault();
				game.zIndex--;
				$(this).addClass("disabled");
			});


	this.element = div;
	$(document.body).append(div);
	
	var topDiv = $("<div>").addClass("topDiv");
	var subDiv = $("<div>").addClass("header");
	var headerC = "red";
	if (this.friendly){headerC = "green";}

	var target = this.getTarget();
	var lacking = 0;
	//var dist = Math.ceil(getDistance(this.getPlannedPos(), target.getPlannedPos()));

	//if (target.traverse < this.structures[0].systems[0].tracking){lacking = 1;}

	var speed = this.missile ? (this.getCurSpeed() + " (max: " + this.getMaxSpeed() + ")") : this.getCurSpeed();
	var accel = this.missile ? " +" + this.baseImpulse + " per turn" : "Flat " + this.baseImpulse;

	var table = $("<table>")
		.append($("<tr>")
			.append($("<th>").html(this.structures.length + "x '" + this.structures[0].name + "' #" + this.id).attr("colSpan", 2).addClass(headerC)))
		.append($("<tr>")
			.append($("<td>").html(this.structures[0].role).addClass("yellow").css("font-size", 14).attr("colSpan", 2)))
		.append($("<tr>")
			.append($("<td>").html("Type / Size").css("width", "50%"))
			.append($("<td>").html(getUnitType(this.traverse) + " / " + this.traverse)))
		.append($("<tr>")
			.append($("<td>").html("Base To-Hit"))
			.append($("<td>").html(this.getProfileString())))
		.append($("<tr>")
			.append($("<td>").html("Current Speed"))
			.append($("<td>").addClass("speedStats").html(this.getCurSpeed() + (this.missile ? " (max: " + this.getMaxSpeed() + ")" : ""))))
		.append($("<tr>")
			.append($("<td>").html("Acceleration"))
			.append($("<td>").html(accel)))
		.append($("<tr>")
    		.append($("<td>").html("Tracking"))
			.append($("<td>").html(getUnitType(this.structures[0].systems[0].tracking) + " / " + this.structures[0].systems[0].tracking)))
		//.append($("<tr>").append($("<td>").attr("colSpan", 4).css("height", 15)))
		.append($("<tr>")
			.append($("<td>").html("Targeting"))
			.append($("<td>").html(target.name + " #" + target.id)))
		//.append($("<tr>").append($("<td>").attr("colSpan", 4).css("height", 15)))

		if (lacking){
			table
			.append($("<tr>")
				.append($("<th>").html("- Targeting unsuited units -").attr("colSpan", 2)))
		}

		table.append($("<tr>")
    		.append($("<td>").html("Hit Chance (w/o EW)"))
			.append($("<td>").html(this.getTrackingString())))
		//.append($("<tr>")
    	//	.append($("<td>").html("Damage"))
    	//	.append($("<td>").html(this.getDamage()).attr("colSpan", 3)))
		//.append($("<tr>")
    	//	.append($("<td>").html("Armour"))
    	//	.append($("<td>").html(this.structures[0].negation).attr("colSpan", 3)))

	subDiv.append(table);
	topDiv.append(subDiv)
	div.append(topDiv);


	var structContainer = $("<div>").addClass("structContainer");
	$(div).append(structContainer);

	for (var i = 0; i < this.structures.length; i++){
		var ballDiv = this.structures[i].getElement(false);
		structContainer.append(ballDiv);
	}


	$(div)/*.contextmenu(function(e){
		e.stopPropagation();
		e.preventDefault();
		if (!aUnit ||aUnit != $(this).data("shipId")){
			$(this).addClass("disabled");
		};
	})
	*/.drag();

	return;
}

Salvo.prototype.supplyAttachDiv = function(div){
	var color = "red";
	if (this.friendly){color = "green";}

	//debug(this.getTarget().getMaskEffect(this))

	var alive = 0;
	for (var j = 0; j < this.structures.length; j++){
		if (this.structures[j].destroyed || this.structures[j].disabled){continue;}
		alive++;
	}

	var attachDiv = $("<div>").addClass("attachDiv")
		.append($("<div>").css("display", "block").addClass("center15 " + color)
			.append($("<div>").html("Salvo #" + this.id))
			.append($("<div>").css("margin-left", 60).html(alive +"x " + this.structures[0].name + "</div>"))
		.append($("<div>").css("display", "block").addClass("center15 " + color)
			.html("Auto-Targetting: " + this.getTarget().name + " #" + this.mission.targetid)))
		.data("id", this.id)
		.click(Mixed.prototype.attachDivClickFunction)
		.hover(
			function(e){
				var vessel = game.getUnit($(this).data("id"));
					vessel.doHighlight();
					vessel.drawTrajectory();
				if (aUnit && aUnit != vessel.id){
					var	ship = game.getUnit(aUnit);
					if (ship.salvo){return;}
					else if (ship.hasWeaponsSelected() && ship.id != vessel.id){
						handleWeaponAimEvent(ship, vessel, e);
					}
					else {
						game.target = 0;
						$("#aimDiv").hide()
					}
				}
			},
			function(e){
				var vessel = game.getUnit($(this).data("id"));
					vessel.highlight = 0;
				game.redraw();
			}
		)
		
	for (var j = 0; j < alive; j++){
		attachDiv.append($("<div>")
			.append($(this.structures[0].getBaseImage().cloneNode(true))
				.addClass("rotate270")
				.css("width", 34)
				.css("height", 34)
			)
		)
	}

	div.append(attachDiv);
	return div;
}

Salvo.prototype.getArmourString = function(a){
	return this.structures[0].negation;
}
Salvo.prototype.setPostMoveSize = function(){
	return;
}

Salvo.prototype.getProfileString = function(){
	return this.getStringHitChance();
}

Salvo.prototype.getShortInfo = function(){
	var ele = ui.shortInfo;
	if (this.userid == game.userid){
		$(ele).attr("class", "friendly");
	} else $(ele).attr("class", "hostile");

	ele
	.append($("<div>").html("Salvo #" + this.id))
	.append($("<div>").html("Speed: " + this.getCurSpeed() + " / " + this.getIntactElements() + "x " + this.structures[0].name))
	.append($("<div>").html("Base To-Hit: " + this.getStringHitChance()))

	if (!this.mission.arrived && this.contactImminent()){
		ele.append($("<div>").html("<span class='yellow'>contact imminent</span>"));
	}	
	this.appendCollisions(ele);
}

Salvo.prototype.doSelect = function(){
	debug(this);
	this.switchDiv();
}

Salvo.prototype.doUnselect = function(){
	this.switchDiv();
	$("#vectorDiv").addClass("disabled");
	game.redraw();
}

Salvo.prototype.setBaseLayouta = function(){
	//debug("salvo setBaseLayout");

	var dist = 15;
	if (this.structures.length == 2){
		dist = 10;
	}

	for (var i = 0; i < this.structures.length; i++){
		var a = 360/Math.ceil(this.structures.length)*i;
		var o = getPointInDir(dist, a + ((this.structures.length == 2) * 90), 0, 0);
		this.structures[i].layout = o;
	}
}

Salvo.prototype.setBaseLayout = function(){
	//debug("salvo setBaseLayout");
	for (var i = 0; i < this.structures.length; i++){
		this.structures[i].layout = {x: 0, y: 0};
	}
}

Salvo.prototype.setImage = function(){
	//debug("setImage " + this.id);
	var t = document.createElement("canvas");
		t.width = this.size*2;
		t.height = this.size*2;
	var ctx = t.getContext("2d");
		ctx.translate(t.width/2, t.height/2);

	for (var i = 0; i < 1; i++){
	//for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].doDraw){continue;}

		ctx.translate(this.structures[i].layout.x, this.structures[i].layout.y);
		ctx.drawImage(
			this.structures[i].getBaseImage(),
			0 -this.structures[i].size/2,
			0 -this.structures[i].size/2,
			this.structures[i].size, 
			this.structures[i].size
		);
		ctx.translate(-this.structures[i].layout.x, -this.structures[i].layout.y);
	}

	//ctx.arc(0, 0, 2, 0, 2*Math.PI, false);
	//ctx.fillStyle = (this.friendly ? "#00ea00" : "red");
	//ctx.fill();
	ctx.setTransform(1,0,0,1,0,0);
	this.img = t;
	//debug(this.img.toDataURL());
}

Salvo.prototype.setImages = function(){
	var t = document.createElement("canvas");
		t.width = this.size*2;
		t.height = this.size*2;
	var ctx = t.getContext("2d");

	ctx.translate(t.width/2, t.height/2);
	//ctx.rotate((this.getDrawFacing()+90) * (Math.PI/180));
	ctx.drawImage(
		this.structures[0].getBaseImage(),
		0 -this.size/2,
		0 -this.size/2,
		this.size, 
		this.size
	)
	//ctx.translate(this.size/2, this.size/2);
	//ctx.rotate((this.getDrawFacing()+90) * (Math.PI/180));
	ctx.setTransform(1,0,0,1,0,0);

	//this.drawImg = t;
	this.img = t;
}

Salvo.prototype.getShots = function(){
	shots = 0;
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].isDestroyed()){continue;}
		//if (!this.structures[i].isDestroyedThisTurn()){
		shots++;
	}
	return shots;
}

Salvo.prototype.hasNoFireOrders = function(){
	return false;
}