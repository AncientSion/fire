function System(id, parentId, name, display){
	this.id = id;
	this.parentId = parentId;
	this.name = name;
	this.display = display;
	this.detailsTable = false;
	this.highlight = false;
	this.selected = false;
	this.destroyed = false;
				
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
			
		return tr;
	}

	this.select = function(){
		var id = this.id;
		var parentId = this.parentId;
		var selected = false;

		var ele = $(".shipDiv").each(function(){
			if ($(this).data("shipId") == parentId){
				$(this).find(".weapon").each(function(){
					if ($(this).data("systemId") == id){
						if ($(this).hasClass("fireOrder")){
							for (var i = game.fireOrders.length-1; i >= 0; i--){
								if (game.fireOrders[i].weaponid == this.id){
									game.fireOrders.splice(i, 1);
									break;
								}
							}
							$(this).removeClass("fireOrder").addClass("selected");
							selected = true;
						}
						else if ($(this).hasClass("selected")){
							$(this).removeClass("selected");
							selected = false;
						}
						else {
							$(this).addClass("selected");
							selected = true;
						}
					}
				})
			}
		})

		this.selected = selected;

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
	
	this.getWeaponDetailsDiv = function(){
		var div = document.createElement("div");
			div.id = "weaponDetailsDiv";
		var table = document.createElement("table");
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "structure / armour"; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = this.structure + " / " + this.armour; tr.appendChild(td); table.appendChild(tr);
			
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "fire angle"; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = this.arc[0][0] + " - " + this.arc[0][1]; tr.appendChild(td); table.appendChild(tr);
			
		if (this.optRange){
			var tr = document.createElement("tr");
			var td = document.createElement("td");
				td.innerHTML = "opt. range / dmg loss per 100 px"; tr.appendChild(td);
			var td = document.createElement("td");
				td.innerHTML = this.optRange + " / " + this.dmgDecay; tr.appendChild(td); table.appendChild(tr);
		}
			
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "Accurady loss per " + decayVar + "px"; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = this.accDecay; tr.appendChild(td); table.appendChild(tr);
			
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "Guns / Shots"; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = this.guns + " / " + this.shots; tr.appendChild(td); table.appendChild(tr);
			
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "damage"; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = this.damage; tr.appendChild(td); table.appendChild(tr);
			
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
		var div = this.getWeaponDetailsDiv();
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
		var div = document.getElementById("weaponDetailsDiv");
			$(div).remove();
	}
	
	this.setFireOrder = function(){
		var parentId = this.parentId;
		var systemId = this.id;
		this.selected = false;
		this.highlight = false;
		
		var div = $(".shipDiv").each(function(i){
			if ($(this).data("shipId") == parentId){
				$(this).find(".weapon.selected").each(function(j){
					if ($(this).data("systemId") == systemId){
						$(this).removeClass("selected").addClass("fireOrder");
					}
				})
			}
		});
	};

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
				
function Weapon(id, parentId, name, display, output, damage, accDecay, shots, reload, arc1, arc2, arc3, arc4){
	this.damage = damage;
	this.shots = shots;
	this.reload = reload;
	this.accDecay = accDecay;
	this.fireOrders = [];
	this.arc = [
				[arc1, arc2]
				];

	System.call(this, id, parentId, name, display, parentId, arc1, arc2, arc3, arc4);

}


function Particle(id, parentId, name, display, output, damage, accDecay, shots, reload, arc1, arc2, arc3, arc4){

	Weapon.call(this, id, parentId, name, display, output, damage, accDecay, shots, reload, arc1, arc2, arc3, arc4);	
	this.animation = "particle";
	
}


function Laser(id, parentId, name, display, output, damage, optRange, dmgDecay, accDecay, shots, reload, arc1, arc2, arc3, arc4){
	this.optRange = optRange;
	this.dmgDecay = dmgDecay;

	Weapon.call(this, id, parentId, name, display, output, damage, accDecay, shots, reload, arc1, arc2, arc3, arc4);	
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