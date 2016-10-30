function System(id, parentId, name, display){
	this.id = id;
	this.parentId = parentId;
	this.name = name;
	this.display = display;
	this.detailsTable = false;
	this.highlight = false;
	this.selected = false;
	this.destroyed = false;
	this.tr = false;
	this.weapon = false;
				
	this.posIsOnArc = function(loc, pos, facing){
		//console.log(arguments);
		var targetCompassHeading = getCompassHeadingOfPoint(loc, pos, facing);
	
		for (var i = 0; i < this.arc.length; i++){
			var start = this.arc[i][0];
			var end = this.arc[i][1];
			var inArc = isInArc(targetCompassHeading, start, end);
			
			if (inArc){
				return true;
			} else return false;
		}
	}
	
	this.getTableRow = function(){
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.className = "weapon";
			td.innerHTML = this.name + " #" + (this.id);

			if (this.hasActiveFireOrder()){
				td.className = "weapon fireOrder";
			}

		var div = document.createElement("div");
			div.className = "loadLevel";
			var load = this.getLoadLevel();
			div.style.width = load * 100 + "%";
			td.appendChild(div);

			$(td).data("shipId", this.parentId);
			$(td).data("systemId", this.id);
			$(td).hover(
				function(e){
					var shipId = $(this).data("shipId");
					var systemId = $(this).data("systemId");
					game.getShipById(shipId).getSystemById(systemId).hover();
					game.getShipById(shipId).highlightAllSelectedWeapons();
				},
				function(e){
					var shipId = $(this).data("shipId");
					var systemId = $(this).data("systemId");
					game.getShipById(shipId).getSystemById(systemId).hover();
					game.getShipById(shipId).highlightAllSelectedWeapons();
				}
			).click(
				function(){
					var shipId = $(this).data("shipId");
					var systemId = $(this).data("systemId");
					game.getShipById(shipId).getSystemById(systemId).select();
				}
			);

			tr.appendChild(td);

			this.tr = tr;
			
		return tr;
	}

	this.hasActiveFireOrder = function(){
		for (var i = 0; i < this.fireOrders.length; i++){
			if (this.fireOrders[i].turn == game.turn){
				return true;
				break;
			}
		}

		return false;
	}

	this.select = function(){
		var id = this.id;
		var parentId = this.parentId;
		var selected = false;

		if (this.hasActiveFireOrder()){
			this.unsetFireOrder();
		}

		if (this.selected){
			this.selected = false;
		}
		else {
			this.selected = true;
		}


		this.setTableRow();

		var ship = game.getShipById(parentId);
	
		if (ship.hasWeaponsSelected()){
			game.mode = 2;
			ship.highlightAllSelectedWeapons();
		}
		else {
			$("#weaponAimTableWrapper").hide();
			game.mode = 1;
			fxCtx.clearRect(0, 0, res.x, res.y);
		}
	}
	
	this.getSystemDetailsDiv = function(){
		var div = document.createElement("div");
			div.id = "systemDetailsDiv";
		var table = document.createElement("table");
			
		var tr = document.createElement("tr");
		var td = document.createElement("td"); td.style.width = "40%";
			td.innerHTML = "Type"; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = this.animation.toUpperCase(0, 1); tr.appendChild(td); table.appendChild(tr);

		var tr = document.createElement("tr");
		var td = document.createElement("td"); td.style.width = "40%";
			td.innerHTML = "Loading"; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = this.getTimeLoaded() + " / " + this.reload; tr.appendChild(td); table.appendChild(tr);
			
		var tr = document.createElement("tr");
		var td = document.createElement("td"); td.style.width = "60%";
			td.innerHTML = "Accuracy loss"; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = this.accDecay; tr.appendChild(td); table.appendChild(tr);
			
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "Shots"; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = this.shots; tr.appendChild(td); table.appendChild(tr);
			
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "Damage"; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = this.getDamage(); tr.appendChild(td); table.appendChild(tr);

		if (this.animation == "laser"){
			var tr = document.createElement("tr");
			var td = document.createElement("td");
				td.innerHTML = "Focus point"; tr.appendChild(td);
			var td = document.createElement("td");
				td.innerHTML = this.optRange; tr.appendChild(td); table.appendChild(tr);

			var tr = document.createElement("tr");
			var td = document.createElement("td");
				td.innerHTML = "Damage loss"; tr.appendChild(td);
			var td = document.createElement("td");
				td.innerHTML = this.dmgDecay; tr.appendChild(td); table.appendChild(tr);
		}
			
		div.appendChild(table);
			
		return div;
	}

	this.hover = function(){
		if (this.highlight){
			this.highlight = false;
			this.hideInfoDiv();
		}
		else {
			this.highlight = true;
			this.showInfoDiv();
		}
	}

	this.showInfoDiv = function(){
		var div = this.getSystemDetailsDiv();
		var parentId = this.parentId;
		var id = this.id;
		
		var div = $(".shipDiv").each(function(i){
			if ($(this).data("shipId") == parentId){
				$(this).find(".weapon").each(function(j){
					//console.log($(this).data("systemId"));
					if ($(this).data("systemId") == id){
						var offset = $(this).offset();
						//console.log(offset);
						div.style.top = offset.top + 0 + "px";
						div.style.left = offset.left + 125 + "px";
						$("#game").append(div);
						return;
					}
				})
			}
		})
	}
	
	this.hideInfoDiv = function(){
		var div = document.getElementById("systemDetailsDiv");
			$(div).remove();
	}
	
	this.setFireOrder = function(fire){
		var parentId = this.parentId;
		var systemId = this.id;
		this.selected = false;
		this.highlight = false;

		this.fireOrders.push(fire);
		this.setTableRow();

	}

	this.unsetFireOrder = function(){
		for (var i = this.fireOrders.length-1; i >= 0; i--){
			if (this.fireOrders[i].turn == game.turn){
				this.fireOrders.splice(i, 1);
			}
		}

		this.setTableRow();
	}

	this.setTableRow = function(){
		var id = this.id;
		var parentId = this.parentId;
		var fire = this.hasActiveFireOrder();
		var selected = this.selected;


		var ele = $(".shipDiv").each(function(){
			if ($(this).data("shipId") == parentId){
				$(this).find(".weapon").each(function(){
					if ($(this).data("systemId") == id){
						if (selected){
							$(this).addClass("selected");
						}
						else {
							$(this).removeClass("selected");
						}

						if (fire){
							$(this).addClass("fireOrder");
						}
						else {
							$(this).removeClass("fireOrder");
						}
						return;
					}
				})
			}
		})
	}

	this.drawArc = function(angle, pos){
		for (var i = 0; i < this.arc.length; i++){
			var p1 = getPointInDirection(res.x, this.arc[i][0] + angle, pos.x, pos.y);
			var p2 = getPointInDirection(res.y, this.arc[i][1] + angle, pos.x, pos.y)
			var dist = getDistance( {x: pos.x, y: pos.y}, p1);
			var rad1 = degreeToRadian(this.arc[i][0] + angle);
			var rad2 = degreeToRadian(this.arc[i][1] + angle);
			
			fxCtx.beginPath();			
			fxCtx.moveTo(pos.x, pos.y);
			fxCtx.arc(pos.x, pos.y, dist, rad1, rad2, false);
			fxCtx.closePath();
			fxCtx.globalAlpha = 0.2;			
			fxCtx.fillStyle = this.getFillStyle(pos.x, pos.y, dist);
			fxCtx.fill();
			fxCtx.globalAlpha = 1;
			fxCtx.strokeStyle = "black";
			fxCtx.stroke();
		}
	}		
	
	this.getAccurayDecay = function(dist){		
		//var dist = getDistance(ship.getPlannedPos(), pos);
		var decay = this.accDecay;		
		return Math.ceil(decay * dist/decayVar);
	}
	
	this.getDamageDecay = function(dist){
		return 0;
	}
	
	this.getExpectedDamage = function(dist){
		var loss = this.getDamageDecay(dist);
		
		return Math.floor(this.damage - (this.damage / 100 * loss));
	}
	
	this.getFillStyle = function(x, y, dist){
		return "green";
	}
}
				
function Weapon(id, parentId, name, display, output, minDmg, maxDmg, accDecay, shots, reload, arc1, arc2, arc3, arc4){
	this.minDmg = minDmg;
	this.maxDmg = maxDmg;
	this.shots = shots;
	this.reload = reload;
	this.loaded;
	this.accDecay = accDecay;
	this.fireOrders = [];
	this.arc = [
				[arc1, arc2]
				];

	this.canFire = function(){
		if (this.getLoadLevel() >= 1){
			return true;
		}
	}

	this.getLoadLevel = function(){
		var need = this.reload;
		var has = this.getTimeLoaded();

		if (has / need > 1){
			return 1;
		}
		else return has/need;
	}

	this.getTimeLoaded = function(){

		var load = this.reload;
		var limit;

		if (game.phase == 2){
			limit = game.turn-1;
		}
		else if (game.phase == 3){
			limit = game.turn;
		}


		if (this.fireOrders.length){
			for (var i = 0; i <= limit; i++){
				if (load < this.reload){
					load++;
				}

				for (var j = 0; j < this.fireOrders.length; j++){
					if (this.fireOrders[j].turn == i){
						load = 0;
					}
				}
			}
		}

		return load;
	}

	this.getDamage = function(){
		return this.minDmg + " - " + this.maxDmg;
	}

	System.call(this, id, parentId, name, display, parentId, arc1, arc2, arc3, arc4);
	this.weapon = true;
}
Weapon.prototype = Object.create(System.prototype);


function Particle(id, parentId, name, display, output, minDmg, maxDmg, accDecay, shots, reload, arc1, arc2, arc3, arc4){
	Weapon.call(this, id, parentId, name, display, output, minDmg, maxDmg, accDecay, shots, reload, arc1, arc2, arc3, arc4);	
	this.animation = "particle";
}
Particle.prototype = Object.create(Weapon.prototype);


function Laser(id, parentId, name, display, rakeTime, output, minDmg, maxDmg, optRange, dmgDecay, accDecay, shots, reload, arc1, arc2, arc3, arc4){
	this.optRange = optRange;
	this.dmgDecay = dmgDecay;
	this.rakeTime = rakeTime;

	Weapon.call(this, id, parentId, name, display, output, minDmg, maxDmg, accDecay, shots, reload, arc1, arc2, arc3, arc4);	
	this.animation = "laser";
	
	this.getFillStyle = function(x, y, dist){
		var grad = fxCtx.createRadialGradient(x, y, 0, x, y, dist);
		var opt = this.optRange / res.x;

		if (opt > 1){opt = 1;}
	
			grad.addColorStop(0, "red");
			grad.addColorStop(opt/2, "yellow");
			grad.addColorStop(opt, "green");
		//	grad.addColorStop(this.optRange/res.x*1.5, "yellow");
		
			if (opt*1.5 > 1){
				grad.addColorStop(1, "yellow");
			}
			else {
				grad.addColorStop(opt*1.5, "yellow");
				if (opt*2 < 1){	
					grad.addColorStop(opt*2, "red");
				}
			}
				
		return grad;
	}
	
	this.getDamageDecay = function(dist){
	//	var dist = getDistance(ship.getPlannedPos(), pos);
		var decay = this.dmgDecay;
		
		if (dist < this.optRange){
			dist = this.optRange - dist;
		} else dist = dist - this.optRange;
	//	console.log(dist);
		
		return Math.ceil(decay * dist/100);
	}
}
Laser.prototype = Object.create(Weapon.prototype);