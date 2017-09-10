function Salvo(data){
	Mixed.call(this, data);
	this.salvo = 1;

	this.setSize = function(){
		this.size = 18;
	}

	this.getAttachment = function(div){
		var color = "red";

		if (this.friendly){color = "green";}
		var attachDiv = $("<div>").addClass("attachDiv")
			.append($("<div>").css("display", "block").addClass("center15 " + color)
				.html("Salvo #" + this.id + (" (click to select)"))
			.append($("<div>").css("display", "block").addClass("center15 " + color)
				.html("Auto-Targetting: " + this.getTarget().name + " #" + this.mission.targetid)))
			.data("id", this.id)
			.click(function(){
				if (aUnit){
					var ship = game.getUnitById(aUnit);
					if (ship.hasWeaponsSelected()){
						var target = game.getUnitById($(this).data("id"));
						if (ship.userid != target.userid){
							handleFireClick(ship, target);
						}
					} 
					else {
						ship.doUnselect();
						ship.switchDiv();
						game.getUnitById($(this).data("id")).select();
					}
				}
				else game.getUnitById($(this).data("id")).select();
				
			})
			.hover(function(e){
				var vessel = game.getUnitById($(this).data("id"));
				if (aUnit && aUnit != vessel.id){
					var	ship = game.getUnitById(aUnit);
					if (ship.salvo){return;}
					if (ship.hasWeaponsSelected()){
						if (ship.id != vessel.id){
							handleWeaponAimEvent(ship, vessel, e);
						}
					} else {
						game.target = 0;
						$("#weaponAimTableWrapper").hide()
					}
				}
			})
			

		for (var j = 0; j < this.structures.length; j++){
			if (this.structures[j].destroyed || this.structures[j].disabled){continue;}
			attachDiv.append($("<div>").append($("<img>").css("width", 34).css("height", 34).attr("src", window.shipImages[this.structures[j].name.toLowerCase()].src)));
		}

		div.append(attachDiv);
		return div;
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

	this.getCurrentImpulse = function(){
		if (game.phase >= 3){
			return this.currentImpulse + this.baseImpulse*(1-this.destroyed);
		} else return this.currentImpulse;
	}

	this.getTrackingString = function(){
		var t = this.getTarget().traverse;
		var html = "";
		var d = Math.max(0, (this.structures[0].traverse - t));
		html += game.getUnitType(this.structures[0].traverse) + "<span class=";

		if (d > 0){
			html += "'red'>";
		} else html += "'green'>";
		
		return html + " (" + Math.floor(100-d*20) + "%)</span>";
	}
	
	this.getDefensiveBonus = function(s){
		return 0;
	}

	this.createBaseDiv = function(){
		var owner = "friendly";
		if (this.userid != game.userid){owner = "hostile";}
		var div = document.createElement("div");
			div.className = "ammoDiv " + owner + " disabled";
			$(div).data("ammoId", this.id);
		
		var table = document.createElement("table");
			table.style.width = "95%"

		var tr = table.insertRow(-1);
		var td = tr.insertCell(-1); td.className = "header";	
			td.innerHTML = this.structures.length + "x '" + this.structures[0].name + "' #" + this.id; td.colSpan = 4;

		var tr = table.insertRow(-1);
		var td = tr.insertCell(-1); td.className = "subHeader";
			td.innerHTML = this.structures[0].display; td.colSpan = 4;

		var target = this.getTarget();
		var dist = Math.ceil(getDistance(this.getPlannedPosition(), target.getPlannedPosition()));
		var tr = table.insertRow(-1);
		var td = tr.insertCell(-1);
			td.className = "subHeader"; td.colSpan = 4;
			td.innerHTML = "Target: <span class='red font15'>" + target.name + " #" + target.id + "</span>,  distance: " + dist + "px";
		div.appendChild(table);

		var table = document.createElement("table");
			table.style.width = "95%"; table.style.marginTop = "10px";
    	$(table)
			.append($("<tr>")
	    		.append($("<th>").html("Thrust / Accel"))
	    		.append($("<th>").html("Armour"))
	    		.append($("<th>").html("Damage"))
	    		.append($("<th>").html("Tracking up to"))
			)
			.append($("<tr>")
	    		.append($("<td>").html(this.getCurrentImpulse() + " (+" + Math.floor(this.getBaseImpulse()) + " per Turn)"))
	    		.append($("<td>").html(this.structures[0].negation))
	    		.append($("<td>").html(this.getDamage()))
	    		.append($("<td>").html(this.getTrackingString()))
			)

		div.appendChild(table);

		var table = document.createElement("table");
			table.style.borderCollapse = "collapse";
			table.style.margin = "auto";
		var tr = document.createElement("tr");

		var max = Math.min(6, this.structures.length);

		var impact = false;
		if (this.actions.lenght && this.actions[this.actions.length-1].type == "impact"){
			impact = true;
		}

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
					console.log(game.getUnitById(aUnit).getSystemById($(this).data("id")));
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
				$(td).append($(this.img.cloneNode(true)).addClass("size40"));

			tr1.appendChild(td);

			var td = document.createElement("td");
				td.className = "iconIntegrity";

			var rem = this.structures[i].getRemainingIntegrity();

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
		//	e.preventDefault();
		//	$(this).addClass("disabled");
		}).drag();
		
		this.element = div;
		document.getElementById("game").appendChild(div);
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

Salvo.prototype.getArmourString = function(a){
	return this.structures[0].negation;
}

Salvo.prototype.getShortInfo = function(){
	var ele = $("#shortInfo");
	if (this.userid == game.userid){
		$(ele).attr("class", "friendly");
	} else $(ele).attr("class", "hostile");

	var table = document.createElement("table");
		table.insertRow(-1).insertCell(-1).innerHTML = "Salvo #" + this.id + " (" + this.structures.length + "x " + this.structures[0].name + ")";
		table.insertRow(-1).insertCell(-1).innerHTML =  "Thrust: " + this.getCurrentImpulse();
		table.insertRow(-1).insertCell(-1).innerHTML = this.getStringHitChance();

	if (!this.mission.arrived && game.phase < 1 && this.inRange()){
		table.insertRow(-1).insertCell(-1).innerHTML = "<span class='red'>ARRIVAL IMMINENT</span>";
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
		this.img,
		0 -this.size/2,
		0 -this.size/2,
		this.size, 
		this.size
	)
	//ctx.translate(this.size/2, this.size/2);
	//ctx.rotate((this.getDrawFacing()+90) * (Math.PI/180));
	ctx.setTransform(1,0,0,1,0,0);

	this.drawImg = t;
}

Salvo.prototype.setRawImage = function(){
	this.img = window.shipImages[this.structures[0].name.toLowerCase()].cloneNode(true);
}

Salvo.prototype.setLayout = function(){
	for (var i = 0; i < this.structures.length; i++){
		this.structures[i].layout = {x: range(-10, 10), y: range(-10, 10)};
	}
}	