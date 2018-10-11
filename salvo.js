function Obstacle(data){
	Mixed.call(this, data);
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


Ship.prototype.createBaseDiv = function(){
	var className = "obstacleDiv";
	if (this.squad){className += " squad";}
	if (game.phase > -2){
		if (this.userid != game.userid){className += " hostile";}
		else className += " friendly";
	}

	var div = $("<div>").addClass(className).data("shipId", this.id)

	this.element = div[0];

	var topDiv = $("<div>").addClass("topDiv");
	var subDiv = $("<div>").addClass("header");
	var table = $("<table>")
	var headerC = "red";
	if (this.friendly){headerC = "green";}


	subDiv.append(table);
	topDiv.append(subDiv)
	div.append(topDiv);

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

	var times = 5;

	for (var i = 0; i < 5; i++){
		var x = range(0, 200);
		var y = range(0, 200);
		$(structContainer)
		.append($("<div>")
			.addClass("obstacle")
			.css("left", x)
			.css("top", y)
			.append($("<img>").attr("src", "varIcons/destroyed.png"))
		)

	}


	return div;
}





Obstacle.prototype.getElement = function(isBuy){
	var div = $("<div>")
		.addClass("singleDiv")
		.data("subId", this.id)
		.append($(this.getBaseImage().cloneNode(true))
			.addClass("rotate270 img80pct"))

	var alive = 1;
	if (this.destroyed || this.disabled){alive = 0;}
	if (!alive){
		div
			.append($("<img>")
				.attr("src", "varIcons/destroyed.png")
				.addClass("overlay"))
	}

	this.addMainDivEvents(div, alive, isBuy);

	var wrap = document.createElement("div");
		wrap.className = "iconIntegrity"; wrap.style.height = 12;

	var rem = this.getRemIntegrity();

	var bgDiv = document.createElement("div");
		bgDiv.className = "integrityAmount"; bgDiv.style.textAlign = "center"; bgDiv.style.fontSize = 12; bgDiv.style.top = 0;
		bgDiv.innerHTML = rem + " / " + this.integrity;
		wrap.appendChild(bgDiv);

	var lowerDiv = document.createElement("div");
		lowerDiv.className = "integrityNow"; lowerDiv.style.top = 0; lowerDiv.style.height = "100%";
		lowerDiv.style.width = rem/this.integrity * 100 + "%";
		wrap.appendChild(lowerDiv);
		
	var upperDiv = document.createElement("div");
		upperDiv.className = "integrityFull"; upperDiv.style.top = 0;
		wrap.appendChild(upperDiv);

	div.append(wrap);

	var s = 20;
	for (var i = 0; i < this.systems.length; i++){
		var ele = $(this.systems[i].getFighterSystemData(true));
		var modeDiv = this.systems[i].getModeDiv();
		if (modeDiv){ele.append(modeDiv);}

		this.addSysEvents(ele, isBuy)
		div.append(ele);
	}

	return div;
}










function Salvo(data){
	Mixed.call(this, data);
	this.missile = data.missile;
	this.torpedo = data.torpedo;
	this.salvo = 1;

	this.setSize = function(){
		this.size = 18;
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

	this.gettrackingStrinag = function(){
		var t = this.getTarget().tracking;
		var html = "";
		var d = Math.max(0, (this.structures[0].systems[0].tracking - t));
		html += getUnitType(this.structures[0].systems[0].tracking) + "<span class='yellow'>";

	//	if (d > 0){
	//		html += "'red'>";
	//	} else html += "'green'>";
	//	html += ""

		var base = 80;
		var final = Math.floor(base / 100 * (100 - (d*20)))
		
		return html + " (" + final + "%)</span>";
	}

	this.isBeingSpoofed = function(){
		var t = this.getTarget();
		var angle = getAngleFromTo(t.getPlannedPos(), this.getTrajectory());
			angle = addAngle(-t.getPlannedFacing(), angle);

		var ew = t.getMaskEffect(this);
		console.log(ew);

			console.log(angle);
			return angle;
	}


	this.gettrackingString = function(){
		var base = 80;
		var trackStep = 20;
		var target = this.getTarget();
		var spoof = target.getMaskEffect(this);
			spoof = 0;
		var trackingLack = Math.max(0, (this.structures[0].systems[0].tracking - target.traverse));
		var final = base * (1-spoof) / 100 * (100-(trackingLack * trackStep))

		/*
		var string = base + "% ";
		if (trackingLack){
			string += " x" + ((100-(trackingLack*trackStep))/100);
		}
		if (spoof){
			string += " x" + spoof;
		}

		if (spoof || trackingLack){
			string += " = " + final + "%";
		}
		*/


		return "<span class='yellow'>" + final + "%</span>";
	}

	this.setDisplay = function(){
		this.display = this.structures[0].display;
	}

	this.setLayouta = function(){
		if (this.structures.length == 1){
			this.layout.push({x: range(-3, 3), y: range(-3, 3)});
			return;
		}
		var size = 15;
		var r = 0; // row
		var c = 0; // col
		var d = Math.ceil(this.structures.length/4) // depth
		for (var i = 0; i < d*2; i++){
			this.layout.push(
								{
									x: -size/3 - size*c/2,
				 					y:  (d-1)*size/2 -r*size + range(-4, 4)
				 				}
			 				);
			this.layout.push(
								{
									x: size/3 + size*c/2,
				 					y: (d-1)*size/2 -r*size + range(-4, 4)
				 				}
			 				);
			if (i % 2 == 1){
				r++;
				c = 0;
			}
			c++
		}
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
			.addClass("ammoDiv " + owner + " disabled")
			.data("shipId", this.id)
			/*.contextmenu(function(e){
				e.stopImmediatePropagation(); e.preventDefault();
				if ($(this).data("shipId") != aUnit){
					game.zIndex--;
					$(this).addClass("disabled");
				}
			})*/


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
			.append($("<th>").html(this.structures.length + "x '" + this.structures[0].name + "' #" + this.id).attr("colSpan", 4).addClass(headerC)))
		.append($("<tr>")
			.append($("<td>").html(this.structures[0].role).addClass("yellow").css("font-size", 14).attr("colSpan", 4)))
		.append($("<tr>")
			.append($("<td>").html("Type / Size").css("width", "50%"))
			.append($("<td>").html(getUnitType(this.traverse) + " / " + this.traverse).attr("colSpan", 3)))
		.append($("<tr>")
			.append($("<td>").html("Base To-Hit"))
			.append($("<td>").html(this.getProfileString()).attr("colSpan", 3)))
		.append($("<tr>")
			.append($("<td>").html("Current Speed"))
			.append($("<td>").html(speed)))
		.append($("<tr>")
			.append($("<td>").html("Acceleration"))
			.append($("<td>").html(accel)))
		.append($("<tr>")
    		.append($("<td>").html("Tracking"))
			.append($("<td>").html(getUnitType(this.structures[0].systems[0].tracking)).attr("colSpan", 3)))
		//.append($("<tr>").append($("<td>").attr("colSpan", 4).css("height", 15)))
		.append($("<tr>")
			.append($("<td>").html("Targeting"))
			.append($("<td>").html(target.name + " #" + target.id).attr("colSpan", 3)))
		//.append($("<tr>").append($("<td>").attr("colSpan", 4).css("height", 15)))

		if (lacking){
			table
			.append($("<tr>")
				.append($("<th>").html("- Targeting unsuited units -").attr("colSpan", 4)))
		}

		table.append($("<tr>")
    		.append($("<td>").html("Hit Chance (w/o EW)"))
			.append($("<td>").html(this.gettrackingString()).attr("colSpan", 3)))
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

	//console.log(this.getTarget().getMaskEffect(this))

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
}

Salvo.prototype.setImage = function(){
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