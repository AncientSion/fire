function Salvo(data){
	Mixed.call(this, data);
	this.missiles = data.missile;
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

	this.getTrackingString = function(){
		var t = this.getTarget().traverse;
		var html = "";
		var d = Math.max(0, (this.structures[0].systems[0].traverse - t));
		html += game.getUnitType(this.structures[0].systems[0].traverse) + "<span class=";

		if (d > 0){
			html += "'red'>";
		} else html += "'green'>";
		
		return html + " (" + Math.ceil(100 * (100 - (d*20))/100) + "%)</span>";
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

Salvo.prototype.getSpeedString = function(){
	if (this.structures[0].missile){
		return (this.getCurSpeed() + "px (+" + Math.floor(this.getBaseImpulse()) + "px per Turn)");
	} else return ("fixed " + this.getCurSpeed() + "px / Turn");
}

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
	var dist = Math.ceil(getDistance(this.getPlannedPos(), target.getPlannedPos()));

	var table = $("<table>")
		.append($("<tr>")
			.append($("<th>").html(this.structures.length + "x '" + this.structures[0].name + "' #" + this.id).attr("colSpan", 4).addClass(headerC)))
		.append($("<tr>")
			.append($("<th>").html(this.structures[0].display).attr("colSpan", 4)))
		.append($("<tr>")
			.append($("<td>").html("Type (Size)"))
			.append($("<td>").html(game.getUnitType(this.traverse) + " (" + this.traverse + ")").attr("colSpan", 3)))
		.append($("<tr>")
			.append($("<td>").html("Target"))
			.append($("<td>").html("<span class='red'>" + target.name + " #" + target.id + "</span> - Dist: " + dist + "px").attr("colSpan", 3)))
		.append($("<tr>")
			.append($("<td>").html("Speed"))
			.append($("<td>").html(this.getSpeedString()).addClass("Thrust").attr("colSpan", 3)))
		.append($("<tr>")
    		.append($("<td>").html("Tracking up to"))
			.append($("<td>").html(this.getTrackingString()).attr("colSpan", 3)))
		.append($("<tr>")
    		.append($("<td>").html("Damage"))
    		.append($("<td>").html(this.getDamage()).attr("colSpan", 3)))
		.append($("<tr>")
			.append($("<td>").html("To-Hit Profile"))
			.append($("<td>").html(this.getProfileString()).attr("colSpan", 3)))
		.append($("<tr>")
    		.append($("<td>").html("Armour"))
    		.append($("<td>").html(this.structures[0].negation).attr("colSpan", 3)))

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


	var table = document.createElement("table");
		table.style.borderCollapse = "collapse";
		table.style.margin = "auto";
	var tr = document.createElement("tr");

	var max = Math.min(6, this.structures.length);

	/*var impact = false;
	if (this.actions.length && this.actions[this.actions.length-1].type == "impact"){
		impact = true;
	}*/

	for (var i = 0; i < this.structures.length; i++){
		if (i % max === 0){
		    var tbody = table.appendChild(document.createElement("tbody"));
		    var tr1 = tbody.insertRow(-1);
		    var tr2 = tbody.insertRow(-1);
		}

		var td = document.createElement("td");
			td.className = "iconContainer"; 
			$(td).data("id", this.structures[i].id);
			td.addEventListener("click", function(){
				console.log(game.getUnit(aUnit).getSystem($(this).data("id")));
			})

			if (this.structures[i].destroyed || this.structures[i].disabled){
				var img = new Image();
					img.className = "ammoOverlay";
					img.src = "varIcons/destroyed.png";
					td.appendChild(img);
			}
			/*else if (impact){
				if (true){
					img.src = "varIcons/ammoHit.png";
				} else img.src = "varIcons/ammoMiss.png";
			}*/
			$(td).append($(this.structures[i].getBaseImage().cloneNode(true)).addClass("rotate270 size40"));

		tr1.appendChild(td);

		var td = document.createElement("td");
			td.className = "iconIntegrity";

		var rem = this.structures[i].getRemIntegrity();

		var bgDiv = document.createElement("div");
			bgDiv.className = "integrityAmount"; bgDiv.style.top = 2;
			bgDiv.style.fontSize = "12px";
			bgDiv.innerHTML = rem + " / " + this.structures[i].integrity;
			td.appendChild(bgDiv);

		var lowerDiv = document.createElement("div");
			lowerDiv.className = "integrityNow"; lowerDiv.style.top = 0; lowerDiv.style.height = "100%";
			lowerDiv.style.width = rem/this.structures[i].integrity * 100 + "%";
			td.appendChild(lowerDiv);
			
		var upperDiv = document.createElement("div");
			upperDiv.className = "integrityFull"; upperDiv.style.top = 0;
			td.appendChild(upperDiv);

		tr2.appendChild(td);
	}
	div.appendChild(table);

	$(div).contextmenu(function(e){
		e.stopPropagation();
		e.preventDefault();
		if (!aUnit ||aUnit != $(this).data("shipId")){
			$(this).addClass("disabled");
		};
	}).drag();

	document.body.appendChild(div);
	//document.getElementById("game").appendChild(div);
}

Salvo.prototype.supplyAttachDiv = function(div){
	var color = "red";
	if (this.friendly){color = "green";}

	//console.log(this.getTarget().getMaskEffect(this))

	var attachDiv = $("<div>").addClass("attachDiv")
		.append($("<div>").css("display", "block").addClass("center15 " + color)
			.html("Salvo #" + this.id + (" (click to select)"))
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
						$("#weaponAimTableWrapper").hide()
					}
				}
			},
			function(e){
				var vessel = game.getUnit($(this).data("id"));
					vessel.highlight = 0;
				game.redraw();
			}
		)
		

	for (var j = 0; j < this.structures.length; j++){
		if (this.structures[j].destroyed || this.structures[j].disabled){continue;}
		attachDiv.append($("<div>")
			.append($(this.structures[j].getBaseImage().cloneNode(true))
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
	var ele = game.ui.shortInfo;
	if (this.userid == game.userid){
		$(ele).attr("class", "friendly");
	} else $(ele).attr("class", "hostile");

	var table = document.createElement("table");
		table.insertRow(-1).insertCell(-1).innerHTML = ("Salvo #" + this.id);
		table.insertRow(-1).insertCell(-1).innerHTML = this.structures.length + "x " + this.structures[0].name;
		table.insertRow(-1).insertCell(-1).innerHTML =  "Speed: " + this.getCurSpeed();
		table.insertRow(-1).insertCell(-1).innerHTML = "Base To-Hit: " + this.getStringHitChance();

	if (!this.mission.arrived && game.phase < 1 && this.inRange()){
		table.insertRow(-1).insertCell(-1).innerHTML = "<span class='red'>contact imminent</span>";
	}

	return table;
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
		if (!this.structures[i].isDestroyedThisTurn()){
			shots++;
		}
	}
	return shots;
}

Salvo.prototype.hasNoFireOrders = function(){
	return false;
}

Salvo.prototype.createDeployEntry = function(){
	this.attachLogEntry("<td><span><font color='" + this.getCodeColor()+ "'>Salvo #" + this.id + "</font> is launched (" + this.structures.length + " units).</span></td>");
}