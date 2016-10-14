function System(parentId, arc1, arc2){
	this.id = getId();
	this.parentId = parentId;
	this.detailsTable = false;
	this.highlight = false;
	this.selected = false;
	this.arc = [
				[arc1, arc2]
				];
	this.guns = 1;
	this.shots = 1;
				
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
			$(td).data("weaponId", this.id);
		//	td.addEventListener("mouseenter", function(e){var shipId = $(this).data("shipId"); var weaponId = $(this).data("weaponId"); game.getShipById(shipId).weaponHoverIn(weaponId, e)});
		//	td.addEventListener("mouseleave", function(){var shipId = $(this).data("shipId"); var weaponId = $(this).data("weaponId"); game.getShipById(shipId).weaponHoverOut(weaponId)});
		//	td.addEventListener("click", function(){selectWeapon(this)});


			$(td).hover(
				function(e){
					var shipId = $(this).data("shipId");
					var weaponId = $(this).data("weaponId");
					game.getShipById(shipId).getWeaponById(weaponId).hover();
					game.getShipById(shipId).highlightAllSelectedWeapons();
				},
				function(e){
					var shipId = $(this).data("shipId");
					var weaponId = $(this).data("weaponId");
					game.getShipById(shipId).getWeaponById(weaponId).hover();
					game.getShipById(shipId).highlightAllSelectedWeapons();
				}
			).click(
				function(){
					var shipId = $(this).data("shipId");
					var weaponId = $(this).data("weaponId");
					game.getShipById(shipId).getWeaponById(weaponId).select();
				});

			tr.appendChild(td);
			
		return tr;
	}

	this.select = function(){
		var id = this.id;
		var parentId = this.parentId;

		var ele = $(".shipDiv").each(function(){
			if ($(this).data("shipId") == parentId){
				$(this).find(".weapon").each(function(){
					if ($(this).data("weaponId") == id){
						if ($(this).hasClass("fireOrder")){
							for (var i = game.fireOrders.length-1; i >= 0; i--){
								if (game.fireOrders[i].weaponid == this.id){
									game.fireOrders.splice(i, 1);
									break;
								}
							}
							$(this).removeClass("fireOrder").addClass("selected");
						}
						else if ($(this).hasClass("selected")){
							$(this).removeClass("selected");
						}
						else {
							$(this).addClass("selected");
						}
					}
				})
			}
		})

		game.getShipById(parentId).highlightAllSelectedWeapons();
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
					if ($(this).data("weaponId") == id){
						var offset = $(this).offset();
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
		var weaponId = this.id;
		this.selected = false;
		this.highlight = false;
		
		var div = $(".shipDiv").each(function(i){
			if ($(this).data("shipId") == parentId){
				$(this).find(".weapon.selected").each(function(j){
					if ($(this).data("weaponId") == weaponId){
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
				
function Weapon(parentId, arc1, arc2, arc3, arc4){
	System.call(this, parentId, arc1, arc2, arc3, arc4);
	this.fireOrders = [];
	this.reload = 1;

}
Weapon.prototype = Object.create(System.prototype);

function Laser(parentId, arc1, arc2, arc3, arc4){
	Weapon.call(this, parentId, arc1, arc2, arc3, arc4);	
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

					
function HeavyLaser(parentId, arc1, arc2, arc3, arc4){
	Laser.call(this, parentId, arc1, arc2, arc3, arc4);
	this.name = "Heavy Laser";
	this.structure = 8;
	this.armour = 2;
	this.damage = 100;
	this.optRange = 800;
	this.dmgDecay = 5;
	this.accDecay = 50;
	this.shots = 1;
	this.reload = 2;
	this.beamColorA = "#EA0000";
	this.beamColorB = "orange";
	this.beamWidth = 3;
	this.rakeTime = 70;
}
HeavyLaser.prototype = Object.create(Laser.prototype);

function MediumLaser(parentId, arc1, arc2, arc3, arc4){
	Laser.call(this, parentId, arc1, arc2, arc3, arc4);
	this.name = "Medium Laser";
	this.structure = 8;
	this.armour = 2;
	this.damage = 100;
	this.optRange = 450;
	this.dmgDecay = 10;
	this.accDecay = 70;
	this.shots = 1;
	this.reload = 2;
	this.beamWidth = 2;
	this.rakeTime = 50;
}
MediumLaser.prototype = Object.create(Laser.prototype);

function NeutronLaser(parentId, arc1, arc2, arc3, arc4){
	HeavyLaser.call(this, parentId, arc1, arc2, arc3, arc4);
	this.name = "Neutron Laser";
	this.structure = 8;
	this.armour = 2;
	this.damage = 100;
	this.optRange = 1000;
	this.dmgDecay = 8;
	this.accDecay = 60;
	this.shots = 1;
	this.reload = 2;
	this.beamColorA = "#FFF700";
	this.beamColorB = "red";
	this.beamWidth = 3;
	this.rakeTime = 80;
}
NeutronLaser.prototype = Object.create(HeavyLaser.prototype);



				
function Particle(parentId, arc1, arc2, arc3, arc4){
	Weapon.call(this, parentId, arc1, arc2, arc3, arc4);
	this.animation = "projectile";
	this.fireOrders = [];

}
Weapon.prototype = Object.create(Weapon.prototype);




function StandardParticleBeam(parentId, arc1, arc2){
	Particle.call(this, parentId, arc1, arc2);
	this.name = "SPB";
	this.damage = 3;
	this.structure = 5;
	this.armour = 1;
	this.accDecay = 100;
	this.shots = 3;
	this.projSize = 2;
	this.projColor = "black";
	
}
StandardParticleBeam.prototype = Object.create(Particle.prototype);

function FusionCannon(parentId, arc1, arc2){
	StandardParticleBeam.call(this, parentId, arc1, arc2);
	this.name = "Fusion Cannon";
	this.damage = 3;
	this.structure = 5;
	this.armour = 1;
	this.accDecay = 70;
	this.shots = 2;
	this.projSize = 3;
	this.projColor = "red";
	
}
FusionCannon.prototype = Object.create(StandardParticleBeam.prototype);

function ParticleCannon(parentId, arc1, arc2){
	StandardParticleBeam.call(this, parentId, arc1, arc2);
	this.name = "Particle Cannon";
	this.damage = 3;
	this.structure = 5;
	this.armour = 1;
	this.accDecay = 55;
	this.shots = 1;
	
}
ParticleCannon.prototype = Object.create(StandardParticleBeam.prototype);
	
	
function ParticleAccelerator(parentId, arc1, arc2, arc3, arc4){
	StandardParticleBeam.call(this, parentId, arc1, arc2, arc3, arc4);	
	this.name = "Particle Accel";
	this.damage = 8
	this.structure = 8;
	this.armour = 2;
	this.accDecay = 65;
	this.shots = 4;
	
	this.getFillStyle = function(x, y, dist){
		return "green";
	}
}
ParticleAccelerator.prototype = Object.create(StandardParticleBeam.prototype);


function LightParticleAccelerator(parentId, arc1, arc2, arc3, arc4){
	ParticleAccelerator.call(this, parentId, arc1, arc2, arc3, arc4);
	this.name = "Lt. Particle Accel";
	this.damage = 8
	this.structure = 8;
	this.armour = 2;
	this.accDecay = 90;
	this.guns = 2;
	this.shots = 2;

	this.getFillStyle = function(x, y, dist){
		return "green";
	}
}
LightParticleAccelerator.prototype = Object.create(ParticleAccelerator.prototype);