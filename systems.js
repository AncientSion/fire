function System(id, parentId, name, display, integrity, powerReq, output, effiency){
	this.id = id;
	this.parentId = parentId;
	this.name = name;
	this.display = display;
	this.integrity = integrity;
	this.crits = [];
	this.damages = [];
	this.detailsTable = false;
	this.highlight = false;
	this.selected = false;
	this.destroyed = false;
	this.disabled = false;
	this.weapon = false;
	this.powerReq = powerReq;
	this.output = output;
	this.effiency = effiency;
	this.totalCost = 0;
	this.hasOptions = 0;
	this.powers = [];

	this.hover = function(e){
		if (game.flightDeploy){return false;}
		if (this.highlight){
			this.highlight = false;
			this.hideInfoDiv(e);
			this.hideOptions();
		}
		else {
			this.highlight = true;
			this.showInfoDiv(e);
			this.showOptions();
		}
		game.getShipById(this.parentId).highlightAllSelectedWeapons();
	}

	this.getBoostEffect = function(){
		switch (this.name){
			case "HeavyLaser": return "+ 25 % Damage";
			case "NeutronLaser": return "+ 25 % Damage";
			case "Engine": return "+ 10 % Output";
			case "Sensor": return "+ 10 % Output";
		}
	}

	this.getBoostDiv = function(){
		if (!this.destroyed){
			if (this.effiency){
				this.hasOptions = 1;

				var div = document.createElement("div");
					div.className = "boostDiv disabled";
					$(div).data("shipId", this.parentId);
					$(div).data("systemId", this.id);
				var subDiv = document.createElement("div");
					subDiv.className = "plus";
					subDiv.innerHTML = "<img src='varIcons/plus.png'</img>";
					subDiv.childNodes[0].className = "img100pct";
					$(subDiv).bind("click", function(e){
						if (game.phase != -1){return;}
						e.stopPropagation();
						var data = $(this.parentNode).data();
						game.getShipById(data.shipId).getSystemById(data.systemId).plus();
					});
					div.appendChild(subDiv);
				var subDiv = document.createElement("div");
					subDiv.className = "minus";
					subDiv.innerHTML = "<img src='varIcons/minus.png'</img>";
					subDiv.childNodes[0].className = "img100pct";
					$(subDiv).bind("click", function(e){
						e.stopPropagation();
						if (game.phase != -1){return;}
						var data = $(this.parentNode).data();
						game.getShipById(data.shipId).getSystemById(data.systemId).minus();
					});
					div.appendChild(subDiv);
				return div;
			}
			else return false;
		}
	}

	this.getPowerDiv = function(){
		if (!this.destroyed){
			if (this.powerReq){
				var div = document.createElement("div");
					div.className = "powerDiv disabled";
					$(div).data("shipId", this.parentId);
					$(div).data("systemId", this.id);
				var subDiv = document.createElement("div");
					subDiv.className = "plus";
					subDiv.innerHTML = "<img src='varIcons/power.png'</img>";
					subDiv.childNodes[0].className = "img100pct";
					$(subDiv).bind("click", function(e){
						if (game.phase != -1){return;}
						e.stopPropagation();
						var data = $(this.parentNode).data();
						game.getShipById(data.shipId).getSystemById(data.systemId).doPower();
					});
					div.appendChild(subDiv);
				var subDiv = document.createElement("div");
					subDiv.className = "minus";
					subDiv.innerHTML = "<img src='varIcons/unpower.png'</img>";
					subDiv.childNodes[0].className = "img100pct";
					$(subDiv).bind("click", function(e){
						e.stopPropagation();
						if (game.phase != -1){return;}
						var data = $(this.parentNode).data();
						game.getShipById(data.shipId).getSystemById(data.systemId).doUnpower();
					});
					div.appendChild(subDiv);
				return div;
			}
			else return false;
		}
	}

	this.canUnboost = function(){
		if (this.powers.length){
			if (this.powers[this.powers.length-1].turn == game.turn){
				if (this.powers[this.powers.length-1].type == 1){
					return true;
				}
			}
		}
		return false;
	}

	this.doUnboost = function(){
		this.powers.splice(this.powers.lenght-1, 1);
		return true;
	}

	this.doBoost = function(){
		this.powers.push(
			new Power(
				this.powers.length+1,
				this.parentId,
				this.id,
				game.turn,
				1,
				this.getEffiency()
			)
		)
	}

	this.isPowered = function(){
		if (this.destroyed || this.disabled){
			return false;
		}
		else if (this.powers.length){
			if (this.powers[this.powers.length-1].turn == game.turn){
				if (this.powers[this.powers.length-1].type == 0){
					return false;
				}
			}
		}
		return true;
	}

	this.isUnpowered = function(){
		if (!this.isPowered()){
			return true;
		}
		else return false;
	}

	this.canUnpower = function(){
		if (this.powerReq && this.isPowered()){
			return true;
		} else return false;
	}

	this.canPower = function(){
		if (this.powerReq && !this.isPowered()){
			return true;
		} else return false;
	}

	this.doUnpower = function(){
		if (!this.disabled){
			for (var i = this.powers.length-1; i >= 0; i--){
				if (this.powers[i].turn == game.turn){
					this.powers.splice(i, 1);
				}
			}
			this.powers.push(
				new Power(
					this.powers.length+1,
					this.parentId,
					this.id,
					game.turn,
					0,
					0
				)
			)
			this.disabled = true;
			var pId = this.parentId;
			var id = this.id;
			$(".shipDiv").not(".disabled").each(function(i){
				if ($(this).data("shipId") == pId){
					$(this).find(".system").each(function(j){
						if ($(this).data("systemId") == id){
							$(this).addClass("unpowered");
							return;
						}
					});
				}
			});
			game.getUnitById(this.parentId).updateDivPower(this);
		}
	}

	this.doPower = function(){
		if (this.powers.length && this.powers[this.powers.length-1].type == 0){
			this.powers.splice(this.powers.length-1, 1);
			this.disabled = false;
			var pId = this.parentId;
			var id = this.id;
			$(".shipDiv").not(".disabled").each(function(i){
				if ($(this).data("shipId") == pId){
					$(this).find(".system").each(function(j){
						if ($(this).data("systemId") == id){
							$(this).removeClass("unpowered");
							return;
						}
					});
				}
			});
			game.getUnitById(this.parentId).updateDivPower(this);
		}
	}

	this.plus = function(){
		var ship = game.getShipById(this.parentId);
		if (ship.canBoost(this)){
			this.doBoost();
			ship.updateDivPower(this);
			return true;
		}
		return false;
	}

	this.minus = function(){
		if (this.canUnboost()){
			this.doUnboost()
			game.getShipById(this.parentId).updateDivPower(this);
			return true;
		}
		return false;
	}

	this.showOptions = function(){
		if (game.phase == -1){
			if (game.getShipById(this.parentId).userid == game.userid){
				var canPower = this.canPower();
				var canUnpower = this.canUnpower();
				var hasOptions = this.hasOptions;
				if (hasOptions){
					if (this.getLoadLevel() != 1){
						hasOptions = false;
					}
				}

				if (hasOptions || canPower || canUnpower){
					var pId = this.parentId;
					var id = this.id;
					$(".shipDiv").not(".disabled").each(function(i){
						if ($(this).data("shipId") == pId){
							$(this).find(".system").each(function(j){
								if ($(this).data("systemId") == id){
									if (hasOptions){
										$(this).find(".boostDiv").show();
									}
									if (canPower){
										$(this).find(".powerDiv").show();
									}
									else if (canUnpower){
										$(this).find(".powerDiv").show();
									}
									return;
								}
							});
						}
					});
				}
			}
		}
		else return false;
	}

	this.hideOptions = function(){
		if (game.phase == -1){
			if (game.getShipById(this.parentId).userid == game.userid){
				var canPower = this.canPower();
				var canUnpower = this.canUnpower();
				var hasOptions = this.hasOptions;

				if (hasOptions || canPower || canUnpower){
					if (game.getShipById(this.parentId).userid == game.userid){
						var pId = this.parentId;
						var id = this.id;
						$(".shipDiv").not(".disabled").each(function(i){
							if ($(this).data("shipId") == pId){
								$(this).find(".system").each(function(j){
									if ($(this).data("systemId") == id){
										$(this).find(".boostDiv").hide();
										$(this).find(".powerDiv").hide();
										return
									}
								});
							}
						});
					}
				}
			}
		}
		else return false;
	}

	this.showInfoDiv = function(e){
		$(document.body).append(
			$(this.getSystemDetailsDiv())
				.css("left", e.clientX + 20)
				.css("top", e.clientY + 20)
			)
		return;
	}

	this.hideInfoDiv = function(){
			$("#systemDetailsDiv").remove();
	}



	this.getTableData = function(){
		var td = document.createElement("td");
			td.className = "system";

		var img = new Image();
			img.src = "sysIcons/" + this.name + ".png";
			img.className = "sysIcon";
		td.appendChild(img);

		var div = document.createElement("div");
			div.className = "loadLevel";
			if (this.weapon){div.style.width = this.getLoadLevel() * 100 + "%"}
			else {div.style.width = 100 + "%"};
			td.appendChild(div);

		var div = document.createElement("div");
			div.className = "bgloadlevel";
			td.appendChild(div);

			$(td).data("systemId", this.id);
		
		var lowerDiv = document.createElement("div");
			lowerDiv.className = "integrityNow";
			lowerDiv.style.width = this.getRemainingIntegrity() /  this.integrity * 100 + "%";
			td.appendChild(lowerDiv);

		var div = document.createElement("div");
			div.className = "integrityFull";
			td.appendChild(div);

		if (!this.destroyed){
			if (this instanceof PrimarySystem || this.effiency){
				var outputDiv = document.createElement("div");
					outputDiv.className = "outputMask";
					//output.innerHTML = "<span>" + this.output + "</span>";
					outputDiv.innerHTML = this.getOutput();
					td.appendChild(outputDiv);
			}
		}

		var powerDiv = this.getPowerDiv();
		if (powerDiv){td.appendChild(powerDiv)};
		var boostDiv = this.getBoostDiv();
		if (boostDiv){td.appendChild(boostDiv)};

		$(td).data("systemId", this.id);
		return this.setElementStatus(td);
	}

	this.setElementStatus = function(ele){
		if (this.destroyed){
			$(ele).addClass("destroyed");
			return ele;
		}
		else if (this.isUnpowered()){
			$(ele).addClass("unpowered");
			return ele;
		}
		
		//if (this.crits.length){
		//	$(ele).addClass("hasCritical");
		//}

		if (this.hasActiveFireOrder()){
			$(ele).addClass("fireOrder");
		}
		return ele;
	}

	this.hasActiveFireOrder = function(){
		return false;
	}

	this.update = function(){
		this.updateSystemDetailsDiv();
		game.getShipById(this.parentId).updateDiv();
	}

	this.getRemainingIntegrity = function(){
		var dmg = 0;
		for (var i = 0; i < this.damages.length; i++){
			dmg += this.damages[i].structDmg;
		}
		return this.integrity - dmg;
	}

	this.isDestroyed = function(){
		if (this.destroyed){
			return true;
		}
		for (var i = this.damages.length-1; i >= 0; i--){
			if (this.damages[i].destroyed){
				return true;
			}
		}
	}

	this.setState = function(){
		if (this.isDestroyed()){
			this.destroyed = true;
		}
		else if (this.isUnpowered()){
			this.disabled = true;
		}
		this.adjustStateByCritical();
	}

	this.adjustStateByCritical = function(){
		for (var i = 0; i < this.crits.length; i++){
			if (this.crits[i].inEffect()){
				switch (this.crits[i].type){
					case "disabled":
						this.disabled = true;
						break;
					default:
						continue;
				}
			}
		}
	}

	this.getOutput = function(){
		var base = 0;
		for (var i = 0; i < this.powers.length; i++){
			if (this.powers[i].turn == game.turn){
				base += this.powers[i].type;
			}
		}
		return base;
	}

	this.getExtraOutput = function(){
		var extra = 0;
		for (var i = this.powers.length-1; i >= 0; i--){
			if (this.powers[i].turn == game.turn){
				extra += this.output * 0.1 * this.powers[i].type;
			} else break;
		}
		return Math.floor(extra);
	}

	this.getEffiency = function(){
		return this.effiency;
	}

	this.getPowerReq = function(){
		return this.powerReq;
	}

	this.getCurrentPowerUsage = function(){
		var usage = this.powerReq;
		for (var i = this.powers.length-1; i >= 0; i--){
			if (this.powers[i].turn == game.turn){
				usage += this.powers[i].cost;
			} else break;
		}
		return usage;
	}
}

function PrimarySystem(id, parentId, name, display, integrity, powerReq, output, effiency){
	System.call(this, id, parentId, name, display, integrity, powerReq, output, effiency);

	this.select = function(e){
		console.log(this);
		return;
	}

	this.getLoadLevel = function(){
		return 1;
	}

	this.getOutput = function(){
		if (this.disabled){
			return 0;
		}
		var output = this.output;
		for (var i = this.powers.length-1; i >= 0; i--){
			if (this.powers[i].turn == game.turn){
				output += this.powers[i].type * this.output/10;
			}
			else break;
		}
		return Math.floor(output);
	}

	this.getOutputMod = function(){
		var mod = 1;
		for (var i = 0; i < this.crits.length; i++){
			if (this.crits[i].outputMod != 1){
				if (this.crits[i].inEffect()){
					mod *= this.crits[i].outputMod;
				}
			}
		}
		return mod;
	}

	this.getOutputString = function(){
		var mod = this.getOutputMod();
		return (this.output * mod + " + " + this.getExtraOutput() * mod);
	}

	this.getSystemDetailsDiv = function(){
		var div = document.createElement("div");
			div.id = "systemDetailsDiv";
			div.className = this.id;
		var table = document.createElement("table");
			
		var tr = table.insertRow(-1);				
		var th = document.createElement("th"); th.colSpan = 2;
			th.innerHTML = this.display; tr.appendChild(th); table.appendChild(tr)

		var tr = table.insertRow(-1);
		var td = document.createElement("td"); td.style.width = "60%";
			td.innerHTML = "Integrity"; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = this.getRemainingIntegrity() + " / " + this.integrity; tr.appendChild(td); table.appendChild(tr);

		if (this.output){
			var tr = table.insertRow(-1);
				tr.insertCell(-1).innerHTML = "Current Output";
				tr.insertCell(-1).innerHTML = this.getOutputString();
				tr.childNodes[1].className = "output";
		}
		if (this.powerReq){
			var tr = table.insertRow(-1);
				tr.insertCell(-1).innerHTML = "Base Power Req";
				tr.insertCell(-1).innerHTML = this.getPowerReq();
				tr.childNodes[1].className = "powerReq";
		}
		if (this.effiency){
			var tr = table.insertRow(-1);
				tr.insertCell(-1).innerHTML = "Boost Power Cost";
				tr.insertCell(-1).innerHTML = this.getEffiency();
				tr.childNodes[1].className = "boostReq";
			var tr = table.insertRow(-1);
				tr.insertCell(-1).innerHTML = "Boost Effect";
				tr.insertCell(-1).innerHTML = this.getBoostEffect();
		}
		
		if (this.crits.length){
			var tr = document.createElement("tr");
			var td = document.createElement("td");
				td.colSpan = 2; td.style.fontSize = "16px"; td.style.borderBottom = "1px solid white"; td.style.borderTop = "1px solid white"; 
				td.innerHTML = "Modifiers"; tr.appendChild(td); table.appendChild(tr);

			for (var i = 0; i < this.crits.length; i++){
				var tr = table.insertRow(-1);				
				var td = document.createElement("td");
					td.colSpan = 2;
					td.className = "negative";
					td.innerHTML = this.crits[i].html; tr.appendChild(td); table.appendChild(tr);
			}
		}
			
		div.appendChild(table);
		return div;
	}

	this.updateSystemDetailsDiv = function(){
		var output = this.getOutputString();
		var powerReq = this.getPowerReq();
		var boostReq = this.getEffiency();
		$("#systemDetailsDiv").find("tr").each(function(i){
			if (this.childNodes.length == 2){
				if (this.childNodes[1].className == "output"){
					this.childNodes[1].innerHTML = output;
				}
				else if (this.childNodes[1].className == "powerReq"){
					this.childNodes[1].innerHTML = powerReq;
				}
				else if (this.childNodes[1].className == "boostReq"){
					this.childNodes[1].innerHTML = boostReq;
				}
			}
		})
	}
}
PrimarySystem.prototype = Object.create(System.prototype);

function Bridge(id, parentId, name, display, integrity, powerReq, output, effiency){
	PrimarySystem.call(this, id, parentId, name, display, integrity, powerReq, output, effiency);

	this.getBoostDiv = function(){
		return false;
	}
}

Bridge.prototype = Object.create(PrimarySystem.prototype);
				
function Reactor(id, parentId, name, display, integrity, powerReq, output, effiency){
	PrimarySystem.call(this, id, parentId, name, display, integrity, powerReq, output, effiency);

	this.getOutput = function(){
		if (this.disabled){
			return 0;
		}
		return this.output * this.getOutputMod() - this.getOutputUsage();
	}

	this.getUnusedPower = function(){
		return this.getOutput();
	}

	this.getOutputUsage = function(){
		var use = 0;
		var ship = game.getShipById(this.parentId);
		for (var i = 0; i < ship.structures.length; i++){
			for (var j = 0; j < ship.structures[i].systems.length; j++){
				if (ship.structures[i].systems[j].isPowered()){
					use += ship.structures[i].systems[j].getCurrentPowerUsage();
				}
			}
		}
		for (var i = 0; i < ship.primary.systems.length; i++){
			if (ship.primary.systems[i].isPowered()){
				use += ship.primary.systems[i].getCurrentPowerUsage();
			}
		}
		return use;
	}

}
Reactor.prototype = Object.create(PrimarySystem.prototype);

function Engine(id, parentId, name, display, integrity, powerReq, output, effiency){
	PrimarySystem.call(this, id, parentId, name, display, integrity, powerReq, output, effiency);
}
Engine.prototype = Object.create(PrimarySystem.prototype);
				
function LifeSupport(id, parentId, name, display, integrity, powerReq, output, effiency){
	PrimarySystem.call(this, id, parentId, name, display, integrity, powerReq, output, effiency);
	this.display = "Life Support";
	
	this.getBoostDiv = function(){
		return false;
	}
}
LifeSupport.prototype = Object.create(PrimarySystem.prototype);
				
function Sensor(id, parentId, name, display, integrity, powerReq, output, effiency){
	PrimarySystem.call(this, id, parentId, name, display, integrity, powerReq, output, effiency);
}
Sensor.prototype = Object.create(PrimarySystem.prototype);


function Weapon(id, parentId, name, display, exploSize, integrity, powerReq, output, effiency, fc, minDmg, maxDmg, accDecay, linked, shots, reload, arc1, arc2, arc3, arc4){
	System.call(this, id, parentId, name, display, integrity, powerReq, output, effiency, parentId, arc1, arc2, arc3, arc4);
	this.exploSize = exploSize;
	this.weapon = true;
	this.fc = fc;
	this.minDmg = minDmg;
	this.maxDmg = maxDmg;
	this.accDecay = accDecay;
	this.linked = linked;
	this.shots = shots;
	this.reload = reload;
	this.arc = [
				[arc1, arc2]
				];
	this.loaded;
	this.fireOrders = [];

	this.getFireControl = function(target){
		if (target instanceof Flight || target instanceof Salvo){
			return this.fc[1];
		} else return this.fc[0];
	}

	this.posIsOnArc = function(loc, pos, facing){
		//console.log(arguments);
		var targetCompassHeading = getCompassHeadingOfPoint(loc, pos, facing);
	
		for (var i = 0; i < this.arc.length; i++){
			var start = this.arc[i][0];
			var end = this.arc[i][1];
			var inArc = isInArc(targetCompassHeading, start, end);
			return inArc;
		}
	}

	this.hasActiveFireOrder = function(){
		for (var i = 0; i < this.fireOrders.length; i++){
			if (this.fireOrders[i].turn == game.turn && this.fireOrders[i].resolved == -1){
				return true;
			}
		}
		return false;
	}

	this.select = function(e){
		console.log(this);
		var id = this.id;
		var parentId = this.parentId;
		var selected = false;
		var ship;

		if (this.destroyed || this.disabled){
			return false;
		}
		else {
			ship = game.getShipById(parentId);
			if (ship instanceof Flight && (ship.dogfights.length)){
				return false;
			}
			else if (this.canFire()){
				if (this.hasActiveFireOrder()){
					this.unsetFireOrder();
				}
				if (this.selected){
					this.selected = false;
				}
				else if(! ship.hasHangarSelected()){
					this.selected = true;
				}
			}

			this.setTableRow();
		}
	
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

	this.getArcWidth = function(){
		var w = 0;

		if (this.arc[0][0] < this.arc[0][1]){
			w = this.arc[0][1] - this.arc[0][0];
		}
		else if (this.arc[0][0] > this.arc[0][1]){
			w = 360 - this.arc[0][0] + this.arc[0][1];
		}

		return w;
	}

	this.getMount = function(){
		if (game.getShipById(aShip) instanceof Flight){
			return false;
		}
		var w = this.getArcWidth();
		var a = game.getShipById(aShip).getStructureById(this.structureId).getRemainingNegation();
		if (w <= 60){return "Fixed / " + Math.floor(a * 0.9);
		} else if (w <= 120){return "Embedded / " + Math.floor(a * 0.7)
		} else { return "Turret / " + Math.floor(a * 0.5)
		}
	}

	this.getFireControlString = function(){
		return this.fc[0] + "% / " + this.fc[1] + "%";
	}

	this.getSystemDetailsDiv = function(){
		var div = document.createElement("div");
			div.id = "systemDetailsDiv";
		var table = document.createElement("table");
			
		var tr = document.createElement("tr");		
		var th = document.createElement("th");
			th.colSpan = 2; th.innerHTML = this.display.toUpperCase(); th.style.width = "40%"; tr.appendChild(th); table.appendChild(tr);

		$(table).append($("<tr>").append($("<td>").html("Weapon Type")).append($("<td>").html(this.type)));

		if (!(game.getShipById(aShip) instanceof Flight)){
			$(table).append($("<tr>").append($("<td>").html("Integrity")).append($("<td>").html(this.getRemainingIntegrity() + " / " + this.integrity)));
			$(table).append($("<tr>").append($("<td>").html("Mount / Armour")).append($("<td>").html(this.getMount())));
			$(table).append($("<tr>").append($("<td>").html("Base Power Req")).append($("<td>").html(this.getPowerReq())));
			if (this.effiency && !(this instanceof Launcher)){
				$(table).append($("<tr>").append($("<td>").html("Boost Power Cost")).append($("<td>").html(this.getEffiency())));
				$(table).append($("<tr>").append($("<td>").html("Boost Effect")).append($("<td>").html(this.getBoostEffect())));
			}
		}

		$(table).append($("<tr>").append($("<td>").html("Loading")).append($("<td>").html(this.getTimeLoaded() + " / " + this.reload)));
		$(table).append($("<tr>").append($("<td>").html("Fire Control")).append($("<td>").html(this.getFireControlString())));

		if (this instanceof Launcher){
			$(table).append($("<tr>").append($("<td>").html("Ammo")).append($("<td>").html(this.getRemainingAmmo() + " / " + this.output)));
			//$(table).append($("<tr>").append($("<td>").html("Max Dist")).append($("<td>").html(this.getMaxDist())));
			$(table).append($("<tr>").append($("<td>").html("Impulse")).append($("<td>").html(this.getBallImpulse())));
			$(table)
			.append($("<tr>")
				.append($("<td>")
					.html("Launch Rate")
				)
				.append($("<td>")
					.html("<font color='red'>" + this.shots + "</font> - max " + this.effiency)
					.attr("id", "detailsShots")
				));
		}
		else if (this instanceof Laser){
			$(table).append($("<tr>").append($("<td>").html("Focus point")).append($("<td>").html(this.optRange + "px")));
			$(table).append($("<tr>").append($("<td>").html("Damage loss")).append($("<td>").html(this.dmgDecay + "% per 100px")));
			$(table).append($("<tr>").append($("<td>").html("Accuracy loss")).append($("<td>").html(this.getAccDecay()/10 + "% per 100px")));
		}
		else {
			$(table).append($("<tr>").append($("<td>").html("Accuracy loss")).append($("<td>").html(this.getAccDecay()/10 + "% per 100px")));
		}

		if (this.linked > 1){
			$(table).append($("<tr>").append($("<td>").html("Linked Shots")).append($("<td>").html(this.linked + " x " + this.shots)));
		}
		else if (this instanceof Laser){
			$(table).append($("<tr>").append($("<td>").html("Shots & Rakes")).append($("<td>").html(this.shots + " w/ " + this.output + " rakes")));
		}
		else if (!(this instanceof Launcher)){
			$(table).append($("<tr>").append($("<td>").html("Shots")).append($("<td>").html(this.shots)));
		}

		$(table).append($("<tr>").append($("<td>").html("Damage")).append($("<td>").addClass("damage").html(this.getDamage())));

		if (this.crits.length){
			var tr = table.insertRow(-1); tr.insertCell(-1).innerHTML = "Modifiers"; tr.childNodes[0].colSpan = 2; tr.childNodes[0].border = "1px solid white";
			for (var i = 0; i < this.crits.length; i++){
				var tr = document.createElement("tr");
				var td = document.createElement("td");
					td.colSpan = 2;
					td.className = "negative"
					td.innerHTML = this.crits[i].html; tr.appendChild(td); table.appendChild(tr);
			}
		}
		div.appendChild(table);
			
		return div;
	}

	this.updateSystemDetailsDiv = function(){
		var dmg = this.getDamage();
		$("#systemDetailsDiv").find("tr").each(function(i){
			if (this.childNodes.length == 2){
				if (this.childNodes[1].className == "damage"){
					this.childNodes[1].innerHTML = dmg;
				}
			}
		})
	}
	
	this.setFireOrder = function(fire){
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
		var activeFire = this.hasActiveFireOrder();
		var selected = this.selected;
		var disabled = this.disabled;
		var destroyed = this.destroyed;

		var ele = $(".shipDiv").each(function(){
			if ($(this).data("shipId") == parentId){
				$(this).find(".system").each(function(){
					if ($(this).data("systemId") == id){
						if (selected){
							$(this).addClass("selected");
						}
						else {
							$(this).removeClass("selected");
						}

						if (activeFire){
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

	this.drawArc = function(facing, pos){
		for (var i = 0; i < this.arc.length; i++){
			var p1 = getPointInDirection(res.x, this.arc[i][0] + facing, pos.x, pos.y);
			var p2 = getPointInDirection(res.y, this.arc[i][1] + facing, pos.x, pos.y)
			var dist = getDistance( {x: pos.x, y: pos.y}, p1);
			var rad1 = degreeToRadian(this.arc[i][0] + facing);
			var rad2 = degreeToRadian(this.arc[i][1] + facing);

			fxCtx.beginPath();			
			fxCtx.moveTo(pos.x, pos.y);
			fxCtx.arc(pos.x, pos.y, dist, rad1, rad2, false);
			fxCtx.closePath();		
			fxCtx.fillStyle = this.getFillStyle(pos.x, pos.y, dist);
			fxCtx.fill();
		}
	}
	
	this.getAccurayDecay = function(dist){		
		return Math.ceil(this.getAccDecay() * dist/decayVar);
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

	this.canFire = function(){
		if (this.destroyed || this.disabled){
			return false;
		}
		else if (this.getLoadLevel() >= 1){
			return true;
		}
		else return false;
	}

	this.getLoadLevel = function(){
		var need = this.reload;
		var has = this.getTimeLoaded();
		if (has / need > 1){
			return 1;
		}
		else if (has > 0){
			return has/need;
		}
		else return has;
	}

	this.getTimeLoaded = function(){
		var turnsLoaded = this.reload
		var max = this.reload;
		for (var i = 1; i <= game.turn; i++){
			if (turnsLoaded < max){
				turnsLoaded++;
			}
			for (var j = 0; j < this.fireOrders.length; j++){
				if (this.fireOrders[j].turn == i && this.fireOrders[j].resolved == 1){
					turnsLoaded = 0;
					break;
				}
			}
		}
		return turnsLoaded;
	}

	this.getAccDecay = function(){
		var mod = 1;
		for (var i = 0; i < this.crits.length; i++){
			switch (this.crits[i].type){
				case "range1":
					mod = mod + 0.1;
					break;
				case "range2":
					mod = mod + 0.2;
					break;
			}
		}
		return Math.floor(this.accDecay * mod);
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
		var mod = 1;
		for (var i = 0; i < this.crits.length; i++){
			switch (this.crits[i].type){
				case "damage1":
					mod = mod - 0.1;
					break;
				case "damage2":
					mod = mod - 0.2;
					break;
			}
		}

		for (var i = this.powers.length-1; i >= 0; i--){
			if (this.powers[i].turn == game.turn){
				switch (this.powers[i].type){
					case 1:
						mod = mod + 0.25;
						break;
					default:
						break; 
				}
			}
		}
		return Math.floor(this.minDmg * mod);
	}

	this.getMaxDmg = function(){
		var mod = 1;
		for (var i = 0; i < this.crits.length; i++){
			switch (this.crits[i].type){
				case "damage1":
					mod = mod - 0.1;
					break;
				case "damage2":
					mod = mod - 0.2;
					break;
			}
		}

		for (var i = this.powers.length-1; i >= 0; i--){
			if (this.powers[i].turn == game.turn){
				switch (this.powers[i].type){
					case 1:
						mod = mod + 0.25;
						break;
					default:
						break; 
				}
			}
		}
		return Math.floor(this.maxDmg * mod);
	}
}
Weapon.prototype = Object.create(System.prototype); 

function Particle(id, parentId, name, display, exploSize, animColor, projSize, projSpeed, integrity, powerReq, output, effiency, fc, minDmg,maxDmg, accDecay, linked, shots, reload, arc1, arc2, arc3, arc4){
	Weapon.call(this, id, parentId, name, display, exploSize, integrity, powerReq, output, effiency, fc, minDmg,maxDmg, accDecay, linked, shots, reload, arc1, arc2, arc3, arc4);	
	this.type = "particle";
	this.animation = "projectile";
	this.animColor = animColor;
	this.projSize = projSize;
	this.projSpeed = projSpeed;
	this.priority = 6;
}
Particle.prototype = Object.create(Weapon.prototype);

function Matter(id, parentId, name, display, exploSize, animColor, projSize, projSpeed, integrity, powerReq, output, effiency, fc, minDmg,maxDmg, accDecay, linked, shots, reload, arc1, arc2, arc3, arc4){
	Weapon.call(this, id, parentId, name, display, exploSize, integrity, powerReq, output, effiency, fc, minDmg,maxDmg, accDecay, linked, shots, reload, arc1, arc2, arc3, arc4);	
	this.type = "matter";
	this.animation = "projectile";
	this.animColor = animColor;
	this.projSize = projSize;
	this.projSpeed = projSpeed;
	this.priority = 6;
}
Matter.prototype = Object.create(Weapon.prototype);

function Laser(id, parentId, name, display, exploSize, rakeTime, animColor, beamWidth, integrity, powerReq, output, effiency, fc, minDmg,maxDmg, optRange, dmgDecay, accDecay, linked, shots, reload, arc1, arc2, arc3, arc4){
	Weapon.call(this, id, parentId, name, display, exploSize, integrity, powerReq, output, effiency, fc, minDmg,maxDmg, accDecay, linked, shots, reload, arc1, arc2, arc3, arc4);	
	this.type = "laser";
	this.animation = "beam";
	this.optRange = optRange;
	this.dmgDecay = dmgDecay;
	this.rakeTime = rakeTime;
	this.animColor = animColor;
	this.beamWidth = beamWidth;
	this.priority = 5;
	
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

function Launcher(id, parentId, name, display, launchRate, integrity, powerReq, output, effiency, reload, arc1, arc2, arc3, arc4){
	Weapon.call(this, id, parentId, name, display, 0, integrity, powerReq, output, effiency, 0, 0, 0, 0, 0, 1, reload, arc1, arc2, arc3, arc4);	
	this.effiency = launchRate;
	this.type = "ballistic";
	this.animation = "ballistic";
	this.priority = 6;

	this.setFireOrder = function(fire){
		this.selected = false;
		this.highlight = false;
		fire.shots = this.shots;
		this.fireOrders.push(fire);
		this.setTableRow();
	}

	this.getMount = function(){
		if (game.getShipById(aShip) instanceof Flight){
			return false;
		}
		var w = this.getArcWidth();
		var a = game.getShipById(aShip).getStructureById(this.structureId).getRemainingNegation();


		if (w <= 120){return "Tube / " + Math.floor(a * 0.8)}
		else if (w <= 180){return "Canister / " + Math.floor(a * 0.6)}
		else return "Arm Rail / " + Math.floor(a * 0.3);
	}

	this.getFireControlString = function(){
		return this.ammo.fc[0] + "% / " + this.ammo.fc[1] + "%";
	}

	this.getFireControl = function(target){
		if (target instanceof Flight || target instanceof Salvo){
			return this.ammo.fc[1];
		} else return this.ammo.fc[0];
	}

	this.plus = function(){
		if (this.shots < this.effiency){
			this.shots += 1;
			$("#systemDetailsDiv").find("#detailsShots").html("<font color='red'>" + this.shots + "</font> - max " + this.effiency);
		}
	}

	this.minus = function(){
		if (this.shots > 1){
			this.shots -= 1;
			$("#systemDetailsDiv").find("#detailsShots").html("<font color='red'>" + this.shots + "</font> - max " + this.effiency);
		}
	}

	this.select = function(e){
		console.log(this);

		if (game.phase != -1){
			return false;
		}
		
		var id = this.id;
		var parentId = this.parentId;
		var selected = false;

		if (this.destroyed || this.disabled){
			return false;
		}
		else if (this.canFire()){
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
		}
		else return false;

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

	this.setTableRow = function(){
		var id = this.id;
		var parentId = this.parentId;
		var activeFire = this.hasActiveFireOrder();
		var selected = this.selected;
		var disabled = this.disabled;
		var destroyed = this.destroyed;

		var ele = $(".shipDiv").each(function(){
			if ($(this).data("shipId") == parentId){
				$(this).find(".system").each(function(){
					if ($(this).data("systemId") == id){
						if (selected){
							$(this).addClass("selected");
						}
						else {
							$(this).removeClass("selected");
						}

						if (activeFire){
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

	this.getRemainingAmmo = function(){
		var ammo = this.output;
		for (var i = 0; i < this.fireOrders.length; i++){
			ammo -= this.fireOrders[i].shots;
		}
		return ammo;
	}

	this.getDamage = function(){
		return this.ammo.getDamage();
	}

	this.getMaxDist = function(){
		return this.ammo.maxDist;
	}

	this.getBallImpulse = function(){
		return this.ammo.impulse;
	}
}
Launcher.prototype = Object.create(Weapon.prototype);

function Hangar(id, parentId, name, display, start, end, integrity, powerReq, output, effiency, loads){
	Weapon.call(this, id, parentId, name, display, 0, integrity, powerReq, output, 0, 0, 0, 0, 0, 0, 0, 0, 0);	
	this.start = start;
	this.end = end;
	this.effiency = effiency;
	this.loads = loads;
	//this.weapon = false;
	this.range = 75;

	this.select = function(e){
		console.log(this);

		var id = this.id;
		var parentId = this.parentId;
		var selected = false;
		var ship = game.getShipById(parentId);

		if (game.phase == -2){
			this.setupHangarLoadout(e);
			return;
		}
		else if (this.destroyed || this.disabled){
			return false;
		}
		else if (! this.selected){
			if (game.getShipById(aShip).actions[0].resolved){
				if (! ship.hasSystemsSelected()){
					this.selected = true;
					this.enableHangarDeployment(e);
					this.drawArc();
				}
			}
		}
		else {
			this.selected = false;
			this.hideHangarDiv();
			if (game.flightDeploy){
				game.flightDeploy = false;
				$("#deployOverlay").hide();
			}
		}

		this.setTableRow();
	}

	this.getBoostDiv = function(){
		return false;
	}

	this.getMount = function(){
		return Math.ceil(game.getShipById(aShip).getStructureById(this.structureId).getRemainingNegation() * 0.5);
	}

	this.drawArc = function(){
		game.getShipById(this.parentId).showHangarLaunchAxis(this);
	}

	this.enableHangarDeployment = function(e){
		if (game.getShipById(aShip).userid != game.userid){
			return false;
		}
		var div = document.getElementById("hangarLoadoutDiv");
			$("#launchRate").html(this.getLaunchRate());
			$("#capacity").html(this.output);
		this.showHangarControl();

		if ($(div).hasClass("disabled")){
			$(div).data("systemid", this.id).css("top", e.clientY + 30).css("left", e.clientX - 150).removeClass("disabled");
		}
		else {
			$(div).addClass("disabled");
		}
	}

	this.showHangarControl = function(){
		if (game.getShipById(aShip).userid != game.userid){
			return false;
		}
		var table = document.getElementById("hangarTable");
			table.innerHTML = "";

			var tr = document.createElement("tr");
			var th = document.createElement("th"); th.innerHTML = "Class"; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = "Available"; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = ""; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = ""; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = "To launch"; tr.appendChild(th)
			table.appendChild(tr);

		var id = this.id;

		for (var i = 0; i < this.loads.length; i++){
			var tr = table.insertRow(-1)
				tr.insertCell(-1).innerHTML = this.loads[i].classname;
				tr.insertCell(-1).innerHTML = this.loads[i].amount;
				var td = document.createElement("td");
					td.innerHTML = "<img src='varIcons/plus.png'>"; $(td).data("classname", this.loads[i].classname).data("val", 1); tr.appendChild(td);
					td.addEventListener("click", function(){
						game.getShipById(aShip).getSystemById(id).alterFlight(this);
					});
				var td = document.createElement("td");
					td.innerHTML = "<img src='varIcons/minus.png'>"; $(td).data("classname", this.loads[i].classname).data("val", -1); tr.appendChild(td);
					td.addEventListener("click", function(){
						game.getShipById(aShip).getSystemById(id).alterFlight(this);
					});
				var td = document.createElement("td");
					td.id = this.loads[i].classname + "Amount";
					td.innerHTML = this.loads[i].launch; tr.appendChild(td);

			table.appendChild(tr);
		}

		$("#hangarLoadoutDiv").find("input").unbind().click({systemid: id}, window.sharedLaunchFlight);

		if (this.canLaunchFlight()){
			$("#hangarLoadoutDiv").find("input").removeClass("disabled");
		}
	}

	this.launchFlight = function(){
		for (var i = game.ships.length-1; i >= 0; i--){
			if (game.ships[i].userid == game.userid){
				if (game.ships[i].flight){
					if (game.ships[i].actions[0].resolved == 0){
						if (game.ships[i].launchdata.shipid == window.aShip && game.ships[i].launchdata.systemid == this.id){
							console.log("splice");
							game.ships.splice(i, 1);
							game.draw();
							break;
						}
					}
				}
			}
		}
		instruct("Select a deployment point. The flight's facing will be projected onwards the launching vessel.");
		this.drawArc();
		moveCtx.clearRect(0, 0, res.x, res.y);
		game.flightDeploy = this;
	}

	this.alterFlight = function(ele){
		if (game.phase != -1){return false}
		var classname = $(ele).data("classname");
		var val = $(ele).data("val");
		var launchRate = $("#hangarLoadoutDiv").find("#launchRate").html();
		var total = 0;
		for (var i = 0; i < this.loads.length; i++){
			total += this.loads[i].launch;
		}

		for (var i = 0; i < this.loads.length; i++){
			if (this.loads[i].classname == classname){
				if (this.loads[i].launch + val >= 0 && this.loads[i].launch + val <= this.loads[i].amount && total + val <= Math.ceil(launchRate)){
					this.loads[i].launch += val;
					$("#" + this.loads[i].classname + "Amount").html(this.loads[i].launch);
					break;
				}
			}
		}

		if (this.canLaunchFlight()){
			$("#hangarLoadoutDiv").find("input").removeClass("disabled");
		}
		else {
			$("#hangarLoadoutDiv").find("input").addClass("disabled");
		}
	}

	this.canLaunchFlight = function(){
		for (var i = 0; i < this.loads.length; i++){
			if (this.loads[i].launch >= 1){
				return true;
			}
		}
		return false;
	}

	this.getLoadLevel = function(){
		return 1;
	}

	this.hideHangarDiv = function(){
		$("#hangarLoadoutDiv").addClass("disabled").find("input").addClass("disabled");
	}

	this.addFighter = function(ele){
		tMass = 0;
		tCost = 0;

		for (var i = 0; i < this.loads.length; i++){
			tMass += this.loads[i].amount * this.loads[i].mass;
			tCost += this.loads[i].amount * this.loads[i].cost;
		}

		for (var i = 0; i < this.loads.length; i++){
			if (this.loads[i].classname == ele.childNodes[0].innerHTML){
				if (tMass + this.loads[i].mass <= this.output){
					this.loads[i].amount += 1;
					this.updateTotals();
					break;
				}
				else {
					popup("Insufficient Hangar Space available");
				}
			}
		}
	}

	this.removeFighter = function(ele){
		for (var i = 0; i < this.loads.length; i++){
			if (this.loads[i].classname == ele.childNodes[0].innerHTML){
				if (this.loads[i].amount >= 1){
					this.loads[i].amount -= 1;
					this.updateTotals();
					break;
				}
			}
		}
	}

	this.updateTotals = function(){
		var amount = 0;
		var tMass = 0;
		var tCost = 0;
		var table = document.getElementById("hangarTable");
			table.innerHTML = "";

			var tr = document.createElement("tr");
			var th = document.createElement("th"); th.innerHTML = "Class"; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = "Mass"; th.width = "40px"; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = "Cost"; th.width = "40px"; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = ""; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = ""; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = "Amount"; th.width = "70px"; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = "Total Mass"; th.width = "70px"; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = "Total Cost"; th.width = "70px"; tr.appendChild(th)
			table.appendChild(tr);


		for (var i = 0; i < this.loads.length; i++){
			var tr = table.insertRow(-1);
				tr.insertCell(-1).innerHTML = this.loads[i].classname;
				tr.insertCell(-1).innerHTML = this.loads[i].mass;
				tr.insertCell(-1).innerHTML = this.loads[i].cost;
			var td = document.createElement("td");
				td.innerHTML = "<img src='varIcons/plus.png'>"; tr.appendChild(td);
				td.addEventListener("click", function(e){
					window.game.addFighter(this.parentNode);
				})
			var td = document.createElement("td");
				td.innerHTML = "<img src='varIcons/minus.png'>"; tr.appendChild(td);
				td.addEventListener("click", function(e){
					window.game.removeFighter(this.parentNode);
				})
				amount += this.loads[i].amount
				tMass += this.loads[i].amount * this.loads[i].mass
				tCost += this.loads[i].amount * this.loads[i].cost
				tr.insertCell(-1).innerHTML = this.loads[i].amount
				tr.insertCell(-1).innerHTML = this.loads[i].amount * this.loads[i].mass
				tr.insertCell(-1).innerHTML = this.loads[i].amount * this.loads[i].cost
		}

		var tr = document.createElement("tr");
		var th = document.createElement("th"); tr.appendChild(th);
			th.innerHTML = "Grand Total";
			th.colSpan = 5;
		var th = document.createElement("th"); th.innerHTML = amount; tr.appendChild(th);
		var th = document.createElement("th"); th.innerHTML = tMass; tr.appendChild(th);
		var th = document.createElement("th"); th.innerHTML = tCost; tr.appendChild(th);
		table.appendChild(tr);
		this.totalCost = tCost;
	}

	this.setupHangarLoadout = function(e){
		var div = document.getElementById("hangarLoadoutDiv");
		$("#launchRate").html(this.effiency);
		$("#capacity").html(this.output);
		if ($(div).hasClass("disabled")){
			$(div).data("systemid", this.id).css("top", e.clientY + 30).css("left", e.clientX - 150).removeClass("disabled");
			this.updateTotals();
		}
		else {
			window.game.setShipTotal();
			$(div).addClass("disabled");
		}
	}

	this.getLaunchRate = function(){
		var rate = this.effiency;
		var mod = 1;
		for (var i = 0; i < this.crits.length; i++){
			switch (this.crits[i].type){
				case "launch1":
					mod *= 0.7;
					break;
				case "launch2":
					mod *= 0.5;
					break;
				case "launch3":
					mod *= 0.3;
					break;
				default: break;
			}
		}
		return Math.ceil(rate*mod);
	}
	
	this.getSystemDetailsDiv = function(){
		var div = document.createElement("div");
			div.id = "systemDetailsDiv";
		var table = document.createElement("table");
			
		var tr = document.createElement("tr");		
		var th = document.createElement("th");
			th.colSpan = 2; th.innerHTML = this.display.toUpperCase(); th.style.width = "40%"; tr.appendChild(th); table.appendChild(tr);

		$(table).append($("<tr>").append($("<td>").html("Mass Capacity")).append($("<td>").html(this.output + " metric tons")));
		$(table).append($("<tr>").append($("<td>").html("Integrity")).append($("<td>").html(this.getRemainingIntegrity() + " / " + this.integrity)));
		$(table).append($("<tr>").append($("<td>").html("Armour")).append($("<td>").html(this.getMount())));
		$(table).append($("<tr>").append($("<td>").html("Launch Rate")).append($("<td>").html(this.effiency + " per Turn")));
		$(table).append($("<tr>").append($("<td>").html("Base Power Req")).append($("<td>").html(this.effiency)));

		if (this.crits.length){
			var tr = table.insertRow(-1); tr.insertCell(-1).innerHTML = "Modifiers"; tr.childNodes[0].colSpan = 2; tr.childNodes[0].border = "1px solid white";

			for (var i = 0; i < this.crits.length; i++){
				var tr = document.createElement("tr");
				var td = document.createElement("td");
					td.colSpan = 2;
					td.className = "negative"
					td.innerHTML = this.crits[i].html; tr.appendChild(td); table.appendChild(tr);
			}
		}
		div.appendChild(table);
			
		return div;
	}
}
Hangar.prototype = Object.create(Weapon.prototype);
