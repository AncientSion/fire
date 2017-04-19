function System(system){
	this.id = system.id;
	this.parentId = system.parentId;
	this.name = system.name;
	this.display = system.display;
	this.integrity = system.integrity;
	this.powerReq = system.powerReq;
	this.output = system.output;
	this.effiency = system.effiency;
	this.maxBoost = system.maxBoost;
	this.boostEffect = system.boostEffect;
	this.armourMod = system.armourMod;
	this.crits = [];
	this.damages = [];
	this.detailsTable = false;
	this.highlight = false;
	this.selected = false;
	this.destroyed = false;
	this.disabled = false;
	this.weapon = false;
	this.totalCost = 0;
	this.powers = [];
	this.fireOrders = [];
	this.type = "";
	this.modes = {};
	this.element;
	this.armour;
	this.type = system.type || "Internal";
	this.dual = 0;

	this.getSystem = function(){
		return this;
	}

	this.getActiveWeapon = function(){
		return this;
	}
	
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
		if (this instanceof Hangar){
			if (game.getUnitById(this.parentId).hasWeaponsSelected()){
				return;
			}
			else if (this.highlight){
				this.drawArc();
			}
			else fxCtx.clearRect(0, 0, res.x, res.y);
		}
		else if (!game.getUnitById(this.parentId).hasHangarSelected()){
			game.getUnitById(this.parentId).highlightAllSelectedWeapons();
		}
	}

	this.setTableRow = function(){
		var ele = $(this.element);
		if (this.destroyed){
			ele.addClass("destroyed");
		} else ele.removeClass("destroyed");

		if (this.disabled){
			ele.addClass("unpowered").find(".boostDiv").hide().end().find(".outputMask").hide();
		} else if (this.effiency){
			ele.removeClass("unpowered").find(".boostDiv").show().end().find(".outputMask").show();
		} else {			
			ele.removeClass("unpowered");
		}
	}

	this.setSystemBorder = function(){
		var ele = $(this.element);
		if (this.hasUnresolvedFireOrder()){
			ele.addClass("fireOrder");
		} else ele.removeClass("fireOrder");
		if (this.selected){
			ele.addClass("selected");
		} else ele.removeClass("selected");
	}

	this.canFire = function(){
		if (this.destroyed || this.disabled){
			return false;
		}
		else if (game.phase == -2){
			return false;
		}
		if (this instanceof Launcher && game.phase == -1 || this instanceof Hangar && game.phase == -1 || this instanceof Weapon && game.phase == 2){
			if (this.getLoadLevel() >= 1){
				return true;
			}
		}
		return false;
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

	this.getBoostLevel = function(){
		var level = 0;
		for (var i = this.powers.length-1; i >= 0; i--){
			if (this.powers[i].turn == game.turn && this.powers[i].type == 1){
				level++;
			}
			else if (this.powers[i].turn != game.turn){
				return level;
			}
		}
		return level;
	}

	this.getBoostEffect = function(){
		if (this.boostEffect){
			return "+" + this.boostEffect.value + "% " + this.boostEffect.type;
		}
		else return "MISSING";
	}

	this.getBoostDiv = function(){
		if (!this.destroyed){
			if (this.effiency){
				var div = document.createElement("div");
					div.className = "boostDiv disabled";
					$(div).data("shipId", this.parentId);
					$(div).data("systemId", this.id);
				var subDiv = document.createElement("div");
					subDiv.className = "plus";
					subDiv.innerHTML = "<img src='varIcons/plus.png'</img>";
					subDiv.childNodes[0].className = "img100pct";
					$(subDiv).bind("click", function(e){
						e.stopPropagation();
						if (game.phase != -1){return;}
						var data = $(this.parentNode).data();
						game.getUnitById(data.shipId).getSystemById(data.systemId).plus();
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
						game.getUnitById(data.shipId).getSystemById(data.systemId).minus();
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
						e.stopPropagation();
						if (game.phase != -1){return;}
						var data = $(this.parentNode).data();
						game.getUnitById(data.shipId).getSystemById(data.systemId).doPower();
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
						game.getUnitById(data.shipId).getSystemById(data.systemId).doUnpower();
					});
					div.appendChild(subDiv);
				return div;
			}
			else return false;
		}
	}

	this.getModeDiv = function(){
		if (!Object.keys(this.modes).length){return;}
		var div = document.createElement("div");
			div.className = "modeDiv disabled";
			$(div).data("shipId", this.parentId);
			$(div).data("systemId", this.id);
		var subDiv = document.createElement("div");
			subDiv.className = "mode";
			subDiv.innerHTML = "<img src='varIcons/mode.png'</img>";
			subDiv.childNodes[0].className = "img100pct";
			$(subDiv).bind("click", function(e){
				e.stopPropagation();
				//if (game.phase != -1){return;}
				var data = $(this.parentNode).data();
				game.getUnitById(data.shipId).getSystemById(data.systemId).switchMode();
			});
			div.appendChild(subDiv);
		return div;
	}

	this.canUnboost = function(){
		if (this.powers.length){
			if (this.powers[this.powers.length-1].turn == game.turn){
				if (this.powers[this.powers.length-1].type > 0){
					return true;
				}
			}
		}
		return false;
	}

	this.doUnboost = function(){
		this.powers.splice(this.powers.length-1, 1);
		return true;
	}

	this.doBoost = function(){
		this.powers.push({
			id: this.powers.length+1, unitid: this.parentId, systemid: this.id,
			turn: game.turn,type: 1, cost: this.getEffiency(), new: 1
		})
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
		if (this.selected){
			this.select();
		}
		if (!this.disabled){
			for (var i = this.powers.length-1; i >= 0; i--){
				if (this.powers[i].turn == game.turn){
					this.powers.splice(i, 1);
				}
			}

			this.powers.push({
				id: this.powers.length+1, unitid: this.parentId, systemid: this.id,
				turn: game.turn, type: 0, cost: 0, new: 1
			})
			this.disabled = 1;
			this.doUndoActions();
			this.setTableRow();
			this.setSystemBorder();
			game.getUnitById(this.parentId).updateDivPower(this);
		}
	}

	this.doPower = function(){
		if (this.powers.length && this.powers[this.powers.length-1].type == 0){
			this.powers.splice(this.powers.length-1, 1);
			this.disabled = 0;
			this.setTableRow();
			game.getUnitById(this.parentId).updateDivPower(this);
		}
	}

	this.plus = function(){
		var ship = game.getUnitById(this.parentId);
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
			game.getUnitById(this.parentId).updateDivPower(this);
			return true;
		}
		return false;
	}

	this.showOptions = function(){
		if (this.destroyed || this.dual && this.locked){return;}
		var ele = $(this.element);
		
		/*if (game.phase == -2 &&
			if (Object.keys(this.modes).length){
				ele.find(".modeDiv").show();
			}
		}*/
		if (game.phase == -1){
			if (game.getUnitById(this.parentId).userid == game.userid){
				var boost = this.effiency;
				var canModeChange = Object.keys(this.modes).length;
				var canPower = this.canPower();
				var canUnpower = this.canUnpower();
				if (canPower){
					boost = false;
				}
				else if (boost){
					if (this.getLoadLevel() != 1){
						boost = false;
					}
				}

				if (boost || canModeChange || canPower || canUnpower){
					if (boost){
						ele.find(".boostDiv").show();
					}
					if (canModeChange){
						ele.find(".modeDiv").show();
					}
					if (canPower || canUnpower){
						ele.find(".powerDiv").show();
					}
				}
			}
		}
		/*else if (game.phase == 2){
			if (Object.keys(this.modes).length){
				$(ele).find(".boostDiv").show().end().find(".modeDiv").show().end().find(".powerDiv").show();
			}
		}*/
	}

	this.hideOptions = function(){
		if (this.destroyed){return;}
		var ele = $(this.element);

		if (game.phase == -2){
			if (Object.keys(this.modes).length){
				ele.find(".modeDiv").hide();
			}
		}
		if (game.phase == -1){
			if (game.getUnitById(this.parentId).userid == game.userid){
				var boost = this.effiency;
				var canPower = this.canPower();
				var canUnpower = this.canUnpower();

				if (boost || canPower || canUnpower){
					$(ele).find(".boostDiv").hide().end().find(".modeDiv").hide().end().find(".powerDiv").hide();
					return;
				}
			}
		}
		/*else if (game.phase == 2){
			if (Object.keys(this.modes).length){
				$(ele).find(".boostDiv").hide().end().find(".modeDiv").hide().end().find(".powerDiv").hide();
			}
		}*/
	}

	this.showInfoDiv = function(e){
		$(document.body).append(
			$(this.getSystemDetailsDiv())
				.css("left", e.clientX - 90)
				.css("top", e.clientY + 50)
			)
		return;
	}
	
	this.setFireOrder = function(targetid){
		this.fireOrders.push(
			{id: 0, turn: game.turn, shooterid: this.parentId, targetid: targetid, weaponid: this.id, 
			shots: this.getShots(), req: -1, notes: "", hits: -1, resolved: 0}
		);
		this.selected = false;
		this.highlight = false;
		this.setSystemBorder();
	}

	this.unsetFireOrder = function(){
		for (var i = this.fireOrders.length-1; i >= 0; i--){
			if (this.fireOrders[i].turn == game.turn){
				this.fireOrders.splice(i, 1);
			}
		}
		this.setSystemBorder();
	}

	this.hideInfoDiv = function(){
		$("#systemDetailsDiv").remove();
	}

	this.getImageName = function(){
		return this.name;
	}

	this.canBeBoosted = function(){
		return this.effiency;
	}

	this.getTableData = function(forFighter){
		var td = document.createElement("td");
			td.className = "system";

		var img = new Image();
		var file = "sysIcons/" + this.getImageName();
		if (forFighter){file += this.linked;}
		else {img.className = "sysIcon";}
			file += ".png";
			img.src = file;
		td.appendChild(img);

		var div = document.createElement("div");
			div.className = "loadLevel";
		//	if (this.weapon){div.style.width = this.getLoadLevel() * 100 + "%"}
		//	else {div.style.width = 100 + "%"};
			div.style.width = this.getLoadLevel() * 100 + "%";
			td.appendChild(div);

		var div = document.createElement("div");
			div.className = "bgloadlevel";
			td.appendChild(div);

			$(td).data("systemId", this.id);

		if (!forFighter){
			var lowerDiv = document.createElement("div");
				lowerDiv.className = "integrityNow";
				lowerDiv.style.width = this.getRemainingIntegrity() /  this.integrity * 100 + "%";
				td.appendChild(lowerDiv);

			var div = document.createElement("div");
				div.className = "integrityFull";
				td.appendChild(div);

			if (!this.destroyed){
				if (this instanceof PrimarySystem || this.canBeBoosted()){
					var outputDiv = document.createElement("div");
						outputDiv.className = "outputMask";
						//output.innerHTML = "<span>" + this.outputp + "</span>";
						outputDiv.innerHTML = this.getOutput();
						td.appendChild(outputDiv);
				}
			}
		}

		$(td).data("systemId", this.id);
		this.element = td;

		this.setTableRow();
		this.setSystemBorder();
		return this.element;
	}

	this.hasUnresolvedFireOrder = function(){
		return false;
	}

	this.update = function(){
		this.updateSystemDetailsDiv();
		game.getUnitById(this.parentId).updateDiv();
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

	this.getMount = function(){
		if (game.getUnitById(aUnit) instanceof Flight){
			return false;
		}
		if (this.mount.length){
			return this.mount + " / " + this.armour;
		} else return this.armour;
	}


	this.getOutput = function(){
		var output = 0;

		for (var i = this.powers.length-1; i >= 0; i--){
			if (this.powers[i].turn == game.turn && this.powers[i].type > 0){
				output += this.powers[i].type;
			}
			else break;
		}
		return output;
	}

	this.getExtraOutput = function(){
		var extra = 0;
		for (var i = this.powers.length-1; i >= 0; i--){
			if (this.powers[i].turn == game.turn){
				extra += this.output * this.boostEffect.value / 100 * this.powers[i].type;
			} else break;
		}
		return Math.floor(extra);
	}

	this.getEffiency = function(){
		return Math.ceil(this.effiency * (1+(this.getBoostLevel() * this.getBoostCostIncrease())));
	}

	this.getBoostCostIncrease = function(){
		return 0;
	}

	this.getPowerReq = function(){
		return this.powerReq;
	}

	this.getCurrentPowerUsage = function(){
		var usage = this.powerReq;
		for (var i = this.powers.length-1; i >= 0; i--){
			if (this.powers[i].turn == game.turn && this.powers[i].type > 0){
				usage += this.powers[i].cost;
			} else break;
		}
		return usage;
	}
}

function PrimarySystem(system){
	System.call(this, system);
	this.exposed = 0;

	this.select = function(e){
		console.log(this);
		return;
	}

	this.doUndoActions = function(){
		return;
	}

	this.getLoadLevel = function(){
		return 1;
	}

	this.getOutput = function(){
		if (this.disabled || this.destroyed){
			return 0;
		}
		return Math.floor(this.output * this.getOutputMods() - this.getOutputUsage());
	}

	this.getOutputUsage = function(){
		return 0;
	}

	this.getOutputMods = function(){
		var mod = 1;

		for (var i = this.powers.length-1; i >= 0; i--){
			if (this.powers[i].turn == game.turn){
				mod += this.boostEffect.value/100 * this.powers[i].type;
			} else break;
		}
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
		return this.output + " + " + this.getExtraOutput();
	}

	this.getBoostCostIncrease = function(){
		return 0.2;
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

function Bridge(system){
	PrimarySystem.call(this, system);

	this.getBoostDiv = function(){
		return false;
	}
}

Bridge.prototype = Object.create(PrimarySystem.prototype);
				
function Reactor(system){
	PrimarySystem.call(this, system);

	this.getUnusedPower = function(){
		return this.getOutput();
	}

	this.getOutputUsage = function(){
		var use = 0;
		var ship = game.getUnitById(this.parentId);
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

function Engine(system){
	PrimarySystem.call(this, system);
}
Engine.prototype = Object.create(PrimarySystem.prototype);
				
function LifeSupport(system){
	PrimarySystem.call(this, system);
	this.display = "Life Support";
	
	this.getBoostDiv = function(){
		return false;
	}
}
LifeSupport.prototype = Object.create(PrimarySystem.prototype);
				
function Sensor(id, parentId, name, display, integrity, powerReq, output, effiency, maxBoost, boostEffect){
	PrimarySystem.call(this, id, parentId, name, display, integrity, powerReq, output, effiency, maxBoost, boostEffect);
}
Sensor.prototype = Object.create(PrimarySystem.prototype);

function Weapon(system){
	System.call(this, system);
	this.exploSize = system.exploSize;
	this.animColor = system.animColor;
	this.weapon = true;
	this.fc = system.fc;
	this.minDmg = system.minDmg;
	this.maxDmg = system.maxDmg;
	this.accDecay = system.accDecay;
	this.linked = system.linked;
	this.shots = system.shots;
	this.reload = system.reload;
	this.arc = [
					[system.start, system.end]
				];
	this.priority = system.priority;
	this.loaded;
	this.fireOrders = [];
	this.mount;

	this.doUndoActions = function(){
		for (var i = this.fireOrders.length-1; i >= 0; i--){
			if (this.fireOrders[i].turn == game.turn){
				this.fireOrders.splice(i, 1);
			}
		}
	}

	this.getFireControl = function(target){
		if (target instanceof Flight || target instanceof Salvo){
			return this.fc[1];
		} else return this.fc[0];
	}

	this.getShots = function(){
		return this.shots;
	}

	this.posIsOnArc = function(loc, pos, facing){
		for (var i = 0; i < this.arc.length; i++){
			var start = this.arc[i][0];
			var end = this.arc[i][1];
			return isInArc(getCompassHeadingOfPoint(loc, pos, facing), start, end);
		}
	}

	this.hasUnresolvedFireOrder = function(){
		for (var i = 0; i < this.fireOrders.length; i++){
			if (this.fireOrders[i].turn == game.turn && this.fireOrders[i].resolved == 0){
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
		var unit;

		if (this.destroyed || this.disabled){
			return false;
		}
		else {
			unit = game.getUnitById(parentId);
			if (unit instanceof Flight && (unit.dogfights.length)){
				return false;
			}
			else if (this.getLoadLevel() >= 1){
				if (this.hasUnresolvedFireOrder()){
					this.unsetFireOrder();
				}
				if (this.selected){
					this.selected = false;
				}
				else if(! unit.hasHangarSelected()){
					this.selected = true;
				}
			}

			this.setSystemBorder();
		}
	
		if (unit.hasWeaponsSelected()){
			game.mode = 2;
			unit.highlightAllSelectedWeapons();
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

	this.setMount = function(amount){
		if (game.getUnitById(aUnit) instanceof Flight){
			this.negation = 0;
		}

		var w = this.getArcWidth();

		if (w <= 60){
			this.mount = "Fixed";
		} else if (w <= 120){
			this.mount = "Embedded";
		} else {
			this.mount = "Turret";
		}
		this.armour =  Math.floor(amount * this.armourMod);
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
			th.colSpan = 2; th.innerHTML = this.display; th.style.width = "40%"; tr.appendChild(th); table.appendChild(tr);

		$(table).append($("<tr>").append($("<td>").html("Weapon Type")).append($("<td>").html(this.type)));

		if (!(game.getUnitById(aUnit) instanceof Flight)){
			$(table).append($("<tr>").append($("<td>").html("Integrity")).append($("<td>").html(this.getRemainingIntegrity() + " / " + this.integrity)));
			$(table).append($("<tr>").append($("<td>").html("Mount / Armour")).append($("<td>").html(this.getMount())));
			$(table).append($("<tr>").append($("<td>").html("Base Power Req")).append($("<td>").html(this.getPowerReq())));
			if (this.effiency && !(this instanceof Launcher)){
				$(table).append($("<tr>").append($("<td>").html("Boost Power Cost")).append($("<td>").html(this.getEffiency())));
				$(table).append($("<tr>").append($("<td>").html("Boost Effect")).append($("<td>").html(this.getBoostEffect())));
			}
		}

		$(table).append($("<tr>").append($("<td>").html("Loading")).append($("<td>").html(this.getTimeLoaded() + " / " + this.reload)));

		if (this instanceof Launcher){
			if (this.ammo){
				$(table).append($("<tr>").append($("<th>").css("border-top", "1px solid white").attr("colSpan", 2).html(this.ammo.name)));
				$(table).append($("<tr>").append($("<td>").attr("colSpan", 2).html(this.ammo.display)));
				$(table).append($("<tr>").append($("<td>").html("Ammo amount")).append($("<td>").html("<font color='red'>" + this.getRemainingAmmo() + "</font> / " + this.getMaxAmmo()).attr("id", "ammo")));
				$(table).append($("<tr>").append($("<td>").html("Fire Control")).append($("<td>").html(this.getFireControlString())));
				$(table).append($("<tr>").append($("<td>").html("Impulse")).append($("<td>").html(this.getBallImpulse())));
			}
			$(table).append($("<tr>").append($("<td>").html("Launch Rate")).append($("<td>").html("<font color='red'>" + this.getOutput() + "</font> - max " + this.effiency)
					.attr("id", "detailsShots")
				));
		}
		else if (this instanceof Laser){
			$(table).append($("<tr>").append($("<td>").html("Fire Control")).append($("<td>").html(this.getFireControlString())));
			$(table).append($("<tr>").append($("<td>").html("Focus point")).append($("<td>").html(this.optRange + "px")));
			$(table).append($("<tr>").append($("<td>").html("Damage loss")).append($("<td>").html(this.dmgDecay + "% per 100px")));
			$(table).append($("<tr>").append($("<td>").html("Accuracy loss")).append($("<td>").html(this.getAccDecay()/10 + "% per 100px")));
		}
		else {
			$(table).append($("<tr>").append($("<td>").html("Fire Control")).append($("<td>").html(this.getFireControlString())));
			if (this instanceof Plasma){
				$(table).append($("<tr>").append($("<td>").html("Damage loss")).append($("<td>").html(this.dmgDecay + "% per 100px")));
			}
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

		if (this.boostEffect){
			for (var i = this.powers.length-1; i >= 0; i--){
				if (this.powers[i].turn == game.turn){
					switch (this.powers[i].type){
						case 1:
							mod = mod + this.boostEffect.value / 100;
							break;
						default:
							break; 
					}
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

		if (this.boostEffect){
			for (var i = this.powers.length-1; i >= 0; i--){
				if (this.powers[i].turn == game.turn){
					switch (this.powers[i].type){
						case 1:
							mod = mod + this.boostEffect.value / 100;
							break;
						default:
							break; 
					}
				}
			}
		}
		return Math.floor(this.maxDmg * mod);
	}
}
Weapon.prototype = Object.create(System.prototype);

function Particle(system){
	Weapon.call(this, system);	
	this.animation = "projectile";
	this.projSize = system.projSize;
	this.projSpeed = system.projSpeed;

	this.getAnimation = function(fire){
		allAnims = [];
		var gunInterval = this.shots * 13;
		var shotInterval = 10;

		if (fire.shooter.flight){
			gunInterval = 10;
		}
		
		for (var j = 0; j < fire.guns; j++){
			var gunAnims = [];
			var ox = fire.shooter.x + range(fire.shooter.size * 0.2 * -1, fire.shooter.size * 0.2); // WEAPON origin
			var oy = fire.shooter.y + range(fire.shooter.size * 0.2 * -1, fire.shooter.size * 0.2);
			
			for (var k = 0; k < this.shots; k++){
				var hit = false;
				var explo = false;
				var dist;

				if (fire.hits[j] > k){
					hit = true;
				}	

				if (hit){ // shot hit
					tx = fire.target.x + range(fire.target.size * 0.2 * -1, fire.target.size * 0.2);
					ty = fire.target.y + range(fire.target.size * 0.2 * -1, fire.target.size * 0.2);
					dist = getDistance( {x: ox, y: oy}, {x: tx, y: ty} );
					explo = {t: [0, 80], s: this.exploSize};
				}
				else { // shot miss
					tx = fire.target.x + range(fire.target.size * 0.5 * -1, fire.target.size * 0.5);
					ty = fire.target.y + range(fire.target.size * 0.5 * -1, fire.target.size * 0.5);
				}
				var shotAnim = new BallVector({x: ox, y: oy}, {x: tx, y: ty}, this.projSpeed, hit);
					shotAnim.n = 0 - (j*gunInterval + k*shotInterval);

				/*shotAnim = {
					ox: ox,
					oy: oy,
					tx: tx,
					ty: ty,
					t: [0 - (j*gunInterval + k*shotInterval), getDistance({x: ox, y: oy}, {x: tx, y: ty}) / this.projSpeed / speedMod],
					hit: hit,
					v: new Vector({x: ox, y: oy}, {x: tx, y: ty}),
					explo: explo,
					animated: false
				}*/
				gunAnims.push(shotAnim);
			}
			allAnims.push(gunAnims)
		}
		return allAnims;
	}
}
Particle.prototype = Object.create(Weapon.prototype);

function Matter(system){
	Particle.call(this, system);
}
Matter.prototype = Object.create(Particle.prototype);

function Plasma(system){
	Particle.call(this, system);
	this.dmgDecay = system.dmgDecay;

	this.getDamageDecay = function(dist){		
		return Math.ceil(this.dmgDecay * dist/100);
	}

	this.getFillStyle = function(x, y, dist){
		var grad = fxCtx.createRadialGradient(x, y, 0, x, y, dist);

		grad.addColorStop(5000 / this.dmgDecay / decayVar, "red");
		grad.addColorStop(3000 / this.dmgDecay / decayVar, "yellow");
		grad.addColorStop(0, "green");
				
		return grad;
	}
}
Plasma.prototype = Object.create(Particle.prototype);

function EM(system){
	Particle.call(this, system);	
}
EM.prototype = Object.create(Particle.prototype);

function Pulse(system){
	Particle.call(this, system);	
	
	this.getAnimation = function(fire){
		allAnims = [];
		var gunInterval = 50;
		var shotInterval = 5;

		for (var j = 0; j < fire.guns; j++){
			var gunAnims = [];
			var ox = fire.shooter.x + range(fire.shooter.size * -0.2, fire.shooter.size * 0.2); // WEAPON origin
			var oy = fire.shooter.y + range(fire.shooter.size * -0.2, fire.shooter.size * 0.2);
			var tx;
			var ty;
			var dist;
			var explo = false;
			var hit = false;
			if (fire.hits[j] >= 1){
				hit = true;
			}
			else {
				tx = fire.target.x + range(fire.target.size * -0.7, fire.target.size * 0.7); // salvo missed7
				ty = fire.target.y + range(fire.target.size * -0.7, fire.target.size * 0.7);
			}
			
			for (var k = 0; k < this.shots; k++){
				if (hit){
					tx = fire.target.x + range(fire.target.size * -0.07, fire.target.size * 0.07); // salvo hit
					ty = fire.target.y + range(fire.target.size * -0.07, fire.target.size * 0.07);
				}
				var shotAnim = new BallVector({x: ox, y: oy}, {x: tx, y: ty}, this.projSpeed/2, hit);
					shotAnim.n = 0 - (j*gunInterval + k*shotInterval);

				/*}
				shotAnim = {
					ox: ox,
					oy: oy,
					tx: tx,
					ty: ty,
					t: [0 - (j*gunInterval + k*shotInterval), getDistance({x: ox, y: oy}, {x: tx, y: ty}) / this.projSpeed / speedMod],
					hit: hit,
					v: new Vector({x: ox, y: oy}, {x: tx, y: ty}),
					explo: explo,
					animated: false
				}*/
				gunAnims.push(shotAnim);
			}
			allAnims.push(gunAnims)
		}
		return allAnims;
	}
}
Pulse.prototype = Object.create(Particle.prototype);

function Laser(system){
	Weapon.call(this, system);	
	this.animation = "beam";
	this.optRange = system.optRange;
	this.dmgDecay = system.dmgDecay;
	this.rakeTime = system.rakeTime;
	this.output = system.rakes;
	this.beamWidth = system.beamWidth;

	this.getAnimation = function(fire){
		allAnims = [];
		var grouping = 1;
		var delay = 30;
		
		for (var j = 0; j < fire.guns; j++){
			var gunAnims = [];
			
			for (var k = 0; k < this.shots; k++){
				var tx; var ty; var tb;
				var hit = false;

				if (fire.hits[j] > k){
					hit = true;
				}	

				if (hit){ // shot hit
					tx = fire.target.x + range(-fire.target.size * 0.45, fire.target.size * 0.45); // BEAM swipe begin on HIT
					ty = fire.target.y + range(-fire.target.size * 0.45, fire.target.size * 0.45);
					var a = getAngleFromTo( {x: tx, y: ty}, {x: fire.target.x, y: fire.target.y} );
					a = addToDirection(a, range(-10, 10));
					tb = getPointInDirection(fire.weapon.rakeTime/4, a, tx, ty); // BEAM swipe END on HIT	
				}
				else { // shot miss
					tx = fire.target.x + range(-fire.target.size * 0.7, fire.target.size * 0.7); // BEAM swipe begin on MISS
					ty = fire.target.y + range(-fire.target.size * 0.7, fire.target.size * 0.7);
					var a = getAngleFromTo( {x: tx, y: ty}, {x: fire.target.x, y: fire.target.y} );
					a = addToDirection(a, range(-40, 40));
					tb = getPointInDirection(fire.weapon.rakeTime/3, a, tx, ty); // BEAM swipe END on MISS	
				}

				var shotAnim = new BeamVector(
					{x: fire.shooter.x + range(fire.shooter.size * 0.2 * -1, fire.shooter.size * 0.2), 
					y: fire.shooter.y + range(fire.shooter.size * 0.2 * -1, fire.shooter.size * 0.2)},
					{x: tx, y: ty},
					{x: tb.x, y: tb.y}, 
					0 - (range(-5, 5)) - (Math.floor(j / grouping) * delay),
					fire.weapon.rakeTime,
					hit
				);

				gunAnims.push(shotAnim);
			}
			allAnims.push(gunAnims)
		}
		return allAnims;
	}
	
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
		var decay = this.dmgDecay;
		
		if (dist < this.optRange){
			dist = this.optRange - dist;
		} else dist = dist - this.optRange;
		
		return Math.ceil(decay * dist/100);
	}
}
Laser.prototype = Object.create(Weapon.prototype);

function Dual(system){
	Weapon.call(this, system);
	this.weapons = system.weapons;
	this.modes = system.modes;
	this.states = system.states;
	this.dual = 1;
	this.locked = 0;

	this.canBeBoosted = function(){
		for (var i = 0; i < this.weapons.length; i++){
			if (this.weapons[i].effiency){
				return 1;
			}
		}
		return 0;
	}
	
	this.setFireOrder = function(targetid){
		var w = this.getActiveWeapon();

		this.fireOrders.push(
			{id: 0, turn: game.turn, shooterid: this.parentId, targetid: targetid, weaponid: this.id, 
			shots: w.getShots(), req: -1, notes: "", hits: -1, resolved: 0}
		);
		this.selected = false;
		this.highlight = false;
		this.setSystemBorder();
	}


	this.setState = function(){
		if (this.isDestroyed()){
			this.destroyed = true;
		}
		else if (this.isUnpowered()){
			this.disabled = true;
		}

		this.adjustStateByCritical();
		this.initSubWeapons();
		this.initMain();
	}

	this.getImageName = function(){
		return this.getActiveWeapon().name;
	}

	this.initSubWeapons = function(){
		for (var i = 0; i < this.weapons.length; i++){
			this.weapons[i] = new window[this.weapons[i].type](this.weapons[i]);
			this.weapons[i].mount = this.mount;
			this.weapons[i].armour = this.armour;
			this.weapons[i].mass = this.mass;
			this.weapons[i].integrity = this.integrity;
			//this.weapons[i].display = "HYBRID - " + this.weapons[i].display;
		}
	}

	this.initMain = function(){
		var set = 0;

		for (var i = 0; i < this.powers.length; i++){
			if (this.powers[i].turn == game.turn && !this.powers[i].new){
				if (this.powers[i].type < 0){
					set = 1;
					this.locked = 1;
					this.states[-(this.powers[i].type+1)] = 1;
				}
				else if (this.powers[i].type > 0){
					this.getActiveWeapon().powers.push(this.powers[i]);
				}
			}
		}

		if (!set){
			this.states[this.states.length-1] = 1;
			this.powers.push({id: this.powers.length, unitid: this.parentId, systemid: this.id, cost: 0, turn: game.turn, type: -1, new: 1})
			this.cycleActiveWeapon();
		}

		this.copyProps();
	}

	this.switchMode = function(){
		this.resetPowers();
		this.cycleActiveWeapon();
		this.copyProps();
		this.setSystemImage()
		this.setSystemWindow();
		this.resetDetailsDiv();
		game.getUnitById(this.parentId).updateDivPower(this);

		console.log(this.powers);
	}

	this.setSystemImage = function(){
		this.element.childNodes[0].src = "sysIcons/" + this.getImageName() + ".png";
	}

	this.cycleActiveWeapon = function(){
		var index = 0;
		for (var i = 0; i < this.states.length; i++){
			if (this.states[i]){
				this.states[i] = 0;
				index = i
				if (index+1 >= this.states.length){
					index = 0;
				} else index++;

				this.states[index] = 1;
				this.powers[this.powers.length-1].type = -(index+1);
				return;
			}
		}
	}

	this.resetPowers = function(){
		for (var i = this.powers.length-1; i >= 0; i--){
			if (this.powers[i].turn == game.turn && this.powers[i].type == 1){
				this.powers.splice(i, 1);
			} else break;
		}
		for (var j = 0; j < this.weapons.length; j++){
			for (var i = this.weapons[j].powers.length-1; i >= 0; i--){
				if (this.weapons[j].powers[i].turn == game.turn && this.weapons[j].powers[i].type == 1){
					this.weapons[j].powers.splice(i, 1);
				} else break;
			}
		}
	}

	this.copyProps = function(){
		for (var i = 0; i < this.states.length; i++){
			if (this.states[i]){
				this.effiency = this.weapons[i].effiency;
				this.maxBoost = this.weapons[i].maxBoost;
				this.boostEffect = this.weapons[i].boostEffect;
				this.powerReq = this.weapons[i].powerReq;
				this.weapons[i];
			}
		}
	}

	this.setSystemWindow = function(){
		//if (game.phase == -2){return;}
		if (this.canPower() || !this.effiency){
			$(this.element).find(".boostDiv").hide().end().find(".outputMask").hide();
		}
		else if (this.effiency){
			$(this.element).find(".boostDiv").show().end().find(".outputMask").show();
		}
	}

	this.resetDetailsDiv = function(){
		var old = $("#systemDetailsDiv");
		var y = $(old).css("top")
		var x = $(old).css("left")
			old.remove();

		$(document.body).append(
			$(this.getSystemDetailsDiv())
			.css("left", x)
			.css("top", y)
		)
	}

	this.update = function(){
		this.getActiveWeapon().updateSystemDetailsDiv();
		game.getUnitById(this.parentId).updateDiv();
	}

	this.getSystemDetailsDiv = function(){
		return this.getActiveWeapon().getSystemDetailsDiv();
	}

	this.drawArc = function(facing, pos){
		this.getActiveWeapon().drawArc(facing, pos);
	}

	this.getSystem = function(){
		return this.getActiveWeapon();
	}

	this.getBoostDiv = function(){
		if (!this.destroyed){
			for (var i = 0; i < this.weapons.length; i++){
				if (this.weapons[i].effiency){
					var div = document.createElement("div");
						div.className = "boostDiv disabled";
						$(div).data("shipId", this.parentId);
						$(div).data("systemId", this.id);
					var subDiv = document.createElement("div");
						subDiv.className = "plus";
						subDiv.innerHTML = "<img src='varIcons/plus.png'</img>";
						subDiv.childNodes[0].className = "img100pct";
						$(subDiv).bind("click", function(e){
							e.stopPropagation();
							if (game.phase != -1){return;}
							var data = $(this.parentNode).data();
							game.getUnitById(data.shipId).getSystemById(data.systemId).plus();
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
							game.getUnitById(data.shipId).getSystemById(data.systemId).minus();
						});
					div.appendChild(subDiv);	
					return div;
				}
			}
		}
		return false;
	}

	this.doUnboost = function(){
		this.powers.splice(this.powers.length-1, 1);
		var w = this.getActiveWeapon();
			w.powers.splice(w.powers.length-1, 1);
	}


	this.doBoost = function(){
		var p = {id: this.powers.length+1,unitid: this.parentId,systemid: this.id,
					turn: game.turn,type: 1, cost: this.getEffiency(), new: 1};
		this.powers.push(p);
		this.getActiveWeapon().powers.push(p);
	}

	this.getActiveWeapon = function(){
		for (var i = 0; i < this.states.length; i++){
			if (this.states[i]){
				return this.weapons[i];
			}
		}
	}
}
Dual.prototype = Object.create(Weapon.prototype);


function Launcher(system){
	Weapon.call(this, system);	
	//Weapon.call(this, id, parentId, name, display, 0, 0, integrity, powerReq, output, effiency, maxBoost, 0, 0, 0, 0, 0, 0, 1, reload, arc1, arc2, arc3, arc4);	
	         // Weapon(id, parentId, name, display, exploSize, animColor, integrity, powerReq, output, effiency, maxBoost, boostEffect, fc, minDmg, maxDmg, accDecay, linked, shots, reload, arc1, arc2, arc3, arc4){

	this.effiency = system.launchRate;
	this.type = "Ballistic";
	this.animation = "ballistic";
	this.loads = [];
	this.ammo = system.ammo || false;

	this.getUpgradeData = function(){
		var loads = [];
		for (var i = 0; i < this.loads.length; i++){
			if (this.loads[i].amount > 0){
				loads.push({"amount": this.loads[i].amount, "cost": this.loads[i].cost, name: this.loads[i].name});
			}
		}

		return {name: this.display, systemid: this.id, cost: this.totalCost, loads: loads};
	}

	this.getAccurayDecay = function(dist){		
		return 0;
	}

	this.create = function(){
		for (var i = 0; i < system.loads.length; i++){
			this.loads.push(new Ammo(system.loads[i]));
		}
		if (game.phase == -2){
			for (var i = 0; i < this.loads.length; i++){
				this.loads[i].amount = 0;
			}
		}
		else {
			if (this.ammo  == false || this.getRemainingAmmo() == 0){
				this.shots = 0;
			}
		}
	}

	this.getEffiency = function(){
		return this.effiency;
	}

	this.select = function(e){
		console.log(this);

		if (game.phase == -2){
			if (this.selected){
				this.selected = false;
			}
			else {
				this.selected = true;
			}
			this.setSystemBorder();
			this.setupAmmoLoadout(e);
		}
		else if (game.phase != -1 || this.shots == 0){
			return false;
		}
		
		var id = this.id;
		var parentId = this.parentId;
		var selected = false;

		if (this.destroyed || this.disabled){
			return false;
		}
		else if (this.canFire()){
			if (this.hasUnresolvedFireOrder()){
				this.unsetFireOrder();
			}

			if (this.selected){
				this.selected = false;
			}
			else {
				this.selected = true;
			}
			this.setSystemBorder();
		}
		else return false;

		var ship = game.getUnitById(parentId);
	
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

	this.setMount = function(amount){
		if (game.getUnitById(aUnit) instanceof Flight){
			this.negation = 0;
		}
		var w = this.getArcWidth();

		if (w <= 60){
			this.mount = "Tube";
		} else if (w <= 120){
			this.mount = "Canister";
		} else {
			this.mount = "Arm Rail";
		}
		this.armour =  Math.floor(amount * this.armourMod);
	}

	this.getFireControlString = function(){
		if (this.ammo){
			return this.ammo.fc[0] + "% / " + this.ammo.fc[1] + "%";
		}
	}

	this.getFireControl = function(target){
		if (target instanceof Flight || target instanceof Salvo){
			return this.ammo.fc[1];
		} else return this.ammo.fc[0];
	}

	this.getDamage = function(){
		if (this.ammo){
			return this.ammo.minDmg + " - " + this.ammo.maxDmg;
		}
	}

	this.getOutput = function(){
		return this.shots;
	}

	this.plus = function(){
		if (this.shots < this.effiency){
			this.shots++;
			this.adjustFireOrder();
			this.updateGUI();
		}
	}

	this.minus = function(){
		if (this.shots > 1){
			this.shots--;
			this.adjustFireOrder();
			this.updateGUI();
		}
	}

	this.adjustFireOrder = function(){
		if (!this.fireOrders.length){return;}
		if (this.fireOrders[this.fireOrders.length-1].turn == game.turn && !this.fireOrders[this.fireOrders.length-1].resolved){
			this.fireOrders[this.fireOrders.length-1].shots = this.getOutput();
		}
	}

	this.updateGUI = function(){
		$("#systemDetailsDiv")
			.find("#detailsShots").html("<font color='red'>" + this.getOutput() + "</font> - max " + this.effiency)
				.end()
			.find("#ammo").html("<font color='red'>" + this.getRemainingAmmo() + "</font> / " + this.getMaxAmmo());


		$(this.element).find(".outputMask").html(this.getOutput());
	}

	this.setupAmmoLoadout = function(e){
		var div = document.getElementById("weaponLoadoutDiv");

		if ($(div).hasClass("disabled")){
			$(div).find("#launchRate").html(this.effiency);
			$(div).find("#reload").html(this.reload);
			$(div).find("#capacity").html(this.output);
			$(div).data("systemid", this.id).css("top", e.clientY + 30).css("left", e.clientX - 150).removeClass("disabled");
			this.updateTotals();
		}
		else {
			window.game.setShipTotal();
			$(div).addClass("disabled");
		}
	}

	this.addAmmo = function(ele, all){
		var tMass = 0;
		var tCost = 0;
		var add = 1;
		var name = ele.childNodes[0].innerHTML;
		var sMass = 0;

		var canAdd = true;
		var index = 0;
		for (var i = 0; i < this.loads.length; i++){
			if (this.loads[i].name == name){
				index = i;
			}

			if (this.loads[i].amount > 0 && this.loads[i].name != name){
				canAdd = false
				break;
			}
			else if (this.loads[i].amount == this.loads[i].name){
				canAdd = false;
				break;
			}
		}

		if (canAdd){
			if (all){
				this.loads[index].amount = this.output;
			}
			else {
				this.loads[index].amount++;
			}
			this.updateTotals();
		}
	}

	this.removeAmmo = function(ele, all){
		for (var i = 0; i < this.loads.length; i++){
			if (this.loads[i].name == ele.childNodes[0].innerHTML){
				if (this.loads[i].amount >= 1){
					if (all){
						this.loads[i].amount = 0;
					}
					else {
						this.loads[i].amount -= 1;
					}
					this.updateTotals();
					return;
				}
			}
		}
	}

	this.updateTotals = function(){
		var amount = 0;
		var tCost = 0;
		var table = document.getElementById("weaponTable");
			table.innerHTML = "";

			var tr = document.createElement("tr");
			var th = document.createElement("th"); th.innerHTML = "Class"; th.width = "80px"; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = "Type"; th.width = "200px"; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = "Cost"; th.width = "40px"; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = ""; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = ""; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = "Amount"; th.width = "70px"; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = "Total Cost"; th.width = "70px"; tr.appendChild(th)
			table.appendChild(tr);

		for (var i = 0; i < this.loads.length; i++){
			var tr = table.insertRow(-1);
				tr.insertCell(-1).innerHTML = this.loads[i].name;
				tr.insertCell(-1).innerHTML = this.loads[i].display;
				tr.insertCell(-1).innerHTML = this.loads[i].cost;
			var td = document.createElement("td");
				td.innerHTML = "<img src='varIcons/plus.png'>"; tr.appendChild(td);
				td.addEventListener("click", function(e){
					e.preventDefault(); e.stopPropagation();
					window.game.ships[0].getSystemById($("#weaponLoadoutDiv").data("systemid")).addAmmo(this.parentNode, false);
				})
				td.addEventListener("contextmenu", function(e){
					e.preventDefault(); e.stopPropagation();
					window.game.ships[0].getSystemById($("#weaponLoadoutDiv").data("systemid")).addAmmo(this.parentNode, true);
				})
			var td = document.createElement("td");
				td.innerHTML = "<img src='varIcons/minus.png'>"; tr.appendChild(td);
				td.addEventListener("click", function(e){
					e.preventDefault(); e.stopPropagation();
					window.game.ships[0].getSystemById($("#weaponLoadoutDiv").data("systemid")).removeAmmo(this.parentNode, false);
				})
				td.addEventListener("contextmenu", function(e){
					e.preventDefault(); e.stopPropagation();
					window.game.ships[0].getSystemById($("#weaponLoadoutDiv").data("systemid")).removeAmmo(this.parentNode, true);
				})

				amount += this.loads[i].amount
				tCost += this.loads[i].amount * this.loads[i].cost
				tr.insertCell(-1).innerHTML = this.loads[i].amount
				tr.insertCell(-1).innerHTML = this.loads[i].amount * this.loads[i].cost
		}

		var tr = document.createElement("tr");
		var th = document.createElement("th"); tr.appendChild(th);
			th.innerHTML = "Grand Total";
			th.colSpan = 5;
		var th = document.createElement("th"); th.innerHTML = amount; tr.appendChild(th);
		var th = document.createElement("th"); th.innerHTML = tCost; tr.appendChild(th);
		table.appendChild(tr);
		this.totalCost = tCost;
	}

	this.getRemainingAmmo = function(){
		var ammo = this.getMaxAmmo();
		for (var i = 0; i < this.fireOrders.length; i++){
			ammo -= this.fireOrders[i].shots;
		}
		return ammo;
	}

	this.getMaxAmmo = function(){
		return this.ammo.output;
	}

	this.getBallImpulse = function(){
		return this.ammo.impulse;
	}

	this.create();
}
Launcher.prototype = Object.create(Weapon.prototype);

function Hangar(system){
	System.call(this, system);
	this.start = system.start;
	this.end = system.end;
	this.reload = system.reload;
	this.effiency = system.effiency;
	this.loads = system.loads;
	//this.weapon = false;
	this.range = 75;

	this.getUpgradeData = function(){
		return {
			name: this.display,
			systemid: this.id,
			cost: this.totalCost,
			loads: this.loads
		}
	}

	this.setFireOrder = function(targetid){
		this.fireOrders.push(
			{id: 0, turn: game.turn, shooterid: this.parentId, targetid: 0, weaponid: this.id, 
			shots: 0, req: -1, notes: "fighterLaunch", hits: -1, resolved: 1}
		);
		return this;
	}

	this.select = function(e){
		console.log(this);
		var id = this.id;
		var parentId = this.parentId;
		var selected = false;
		var ship = game.getUnitById(parentId);

		if (game.phase == -2){
			if (!this.selected && ship.hasHangarSelected()){
				return false;
			}
			else {
				this.setupHangarLoadout(e);
				if (this.selected){this.selected = false;}else{this.selected = true;}
			}
		}
		else if (this.destroyed || this.disabled){
			return false;
		}
		else if (! this.selected){
			if (game.getUnitById(aUnit).actions[0].resolved){
				if (! ship.hasSystemsSelected()){
					this.selected = true;
					this.enableHangarDeployment(e);
					this.drawArc();
				}
			}
		}
		else {
			this.selected = false;
			$("#hangarLoadoutDiv").addClass("disabled");
			if (game.flightDeploy){
				game.flightDeploy = false;
				$("#deployOverlay").hide();
			}
		}

		this.setSystemBorder();
	}

	this.update = function(){
		game.getUnitById(this.parentId).updateDiv();
	}

	this.doUndoActions = function(){
		for (var i = game.ships.length-1; i >= 0; i--){
			if (game.ships[i] instanceof Flight){
				if (game.ships[i].id < 0){
					if (game.ships[i].launchdata.shipid == this.parentId && game.ships[i].launchdata.systemid == this.id){
						var ele = $(".shipDiv").each(function(){
							if ($(this).data("shipId") == game.ships[i].id){
								$(this).remove();
								return;
								}
							})
						game.ships.splice(i, 1);
						this.fireOrders.splice(this.fireOrders.length-1, 1);
						for (var j = 0; j < this.loads.length; j++){
							this.loads[j].launch = 0;
						}
						break;
					}
				}
			}
		}
		game.draw();
	}

	this.getBoostDiv = function(){
		return false;
	}

	this.setMount = function(amount){
		if (game.getUnitById(aUnit) instanceof Flight){
			return false;
		}
		this.mount = ""
		this.armour =  Math.floor(amount * this.armourMod);
	}

	this.getOutput = function(){
		return this.getLaunchRate();
	}

	this.getLaunchRate = function(){
		var rate = this.effiency;

		for (var i = 0; i < this.crits.length; i++){
			rate *= this.crits[i].outputMod;
		}
		return Math.ceil(rate);
	}

	this.drawArc = function(){
		game.getUnitById(this.parentId).drawSystemAxis(this);
	}

	this.enableHangarDeployment = function(e){
		if (game.getUnitById(aUnit).userid != game.userid){
			return false;
		}
		var div = document.getElementById("hangarLoadoutDiv");
			$("#launchRate").html(this.getLaunchRate());
			$("#capacity").html(this.output);
		this.showHangarControl();

		if ($(div).hasClass("disabled")){
			$(div).data("systemid", this.id).css("top", e.clientY + 150).css("left", e.clientX - 150).removeClass("disabled");
		}
		else {
			$(div).addClass("disabled");
		}
	}

	this.showHangarControl = function(){
		if (game.getUnitById(aUnit).userid != game.userid){
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
				tr.insertCell(-1).innerHTML = this.loads[i].name;
				tr.insertCell(-1).innerHTML = this.loads[i].amount;
				var td = document.createElement("td");
					td.innerHTML = "<img src='varIcons/plus.png'>"; $(td).data("name", this.loads[i].name).data("val", 1); tr.appendChild(td);
					td.addEventListener("click", function(){
						game.getUnitById(aUnit).getSystemById(id).alterFlight(this, false);
					});
					td.addEventListener("contextmenu", function(e){
						e.preventDefault();
						game.getUnitById(aUnit).getSystemById(id).alterFlight(this, true);
					});
				var td = document.createElement("td");
					td.innerHTML = "<img src='varIcons/minus.png'>"; $(td).data("name", this.loads[i].name).data("val", -1); tr.appendChild(td);
					td.addEventListener("click", function(){
						game.getUnitById(aUnit).getSystemById(id).alterFlight(this, false);
					});
					td.addEventListener("contextmenu", function(e){
						e.preventDefault();
						game.getUnitById(aUnit).getSystemById(id).alterFlight(this, true);
					});
				var td = document.createElement("td");
					td.id = this.loads[i].name + "Amount";
					td.innerHTML = this.loads[i].launch; tr.appendChild(td);

			table.appendChild(tr);
		}

		$("#hangarLoadoutDiv").find("input").unbind().click({systemid: id}, window.sharedLaunchFlight);

		if (this.canLaunchFlight()){
			$("#hangarLoadoutDiv").find("input").removeClass("disabled");
		} else $("#hangarLoadoutDiv").find("input").addClass("disabled");
	}

	this.launchFlight = function(){
		for (var i = game.ships.length-1; i >= 0; i--){
			if (game.ships[i].userid == game.userid){
				if (game.ships[i].flight){
					if (game.ships[i].actions[0].resolved == 0){
						if (game.ships[i].launchdata.shipid == window.aUnit && game.ships[i].launchdata.systemid == this.id){
							console.log("splice");
							this.unsetFireOrder();
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
		game.setupDeploymentDiv();
		game.flightDeploy = this;
	}

	this.alterFlight = function(ele, max){
		if (game.phase != -1 || !this.canFire()){return false}
		var name = $(ele).data("name");
		var add = $(ele).data("val");
		var launchRate = this.getLaunchRate();
		var current = 0;

		if (add > 0){
			for (var i = 0; i < this.loads.length; i++){
				current += this.loads[i].launch;
			}
			if (max){
				add = launchRate - current;
			}
		}
		else {
			if (max){
				for (var i = 0; i < this.loads.length; i++){
					if (this.loads[i].name == name){
						add = -this.loads[i].launch;
						break;
					}
				}
			}
		}

		for (var i = 0; i < this.loads.length; i++){
			if (this.loads[i].name == name){
				if (add > 0){
					add = Math.min(add, this.loads[i].amount - this.loads[i].launch);
					if (current + add <= launchRate && this.loads[i].launch + add <= this.loads[i].amount && this.loads[i].launch + add >= 0){
						this.loads[i].launch += add;
					}
				}
				else {
					this.loads[i].launch += add;
				}
				$("#" + this.loads[i].name + "Amount").html(this.loads[i].launch);
				break;
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
		if (this.canFire()){
			for (var i = 0; i < this.loads.length; i++){
				if (this.loads[i].launch >= 1){
					return true;
				}
			}
		}
		return false;
	}

	this.addFighter = function(ele, all){
		var tMass = 0;
		var tCost = 0;
		var add = 1;
		var name = ele.childNodes[0].innerHTML;
		var sMass = 0;

		for (var i = 0; i < this.loads.length; i++){
			tMass += this.loads[i].amount * this.loads[i].mass;
			tCost += this.loads[i].amount * this.loads[i].cost;
			if (this.loads[i].name == name){
				sMass = this.loads[i].mass;
			}
		}

		if (all){
			add = Math.floor((this.output - tMass) / sMass);
		}

		for (var i = 0; i < this.loads.length; i++){
			if (this.loads[i].name == name){
				if (tMass + this.loads[i].mass <= this.output){
					this.loads[i].amount += add;
					this.updateTotals();
					return;
				}
				else {
					popup("Insufficient Hangar Space available");
				}
			}
		}
	}

	this.removeFighter = function(ele, all){
		for (var i = 0; i < this.loads.length; i++){
			if (this.loads[i].name == ele.childNodes[0].innerHTML){
				if (this.loads[i].amount >= 1){
					if (all){
						this.loads[i].amount = 0;
					} else {
						this.loads[i].amount -= 1;
					}
					this.updateTotals();
					return;
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
				tr.insertCell(-1).innerHTML = this.loads[i].name;
				tr.insertCell(-1).innerHTML = this.loads[i].mass;
				tr.insertCell(-1).innerHTML = this.loads[i].cost;
			var td = document.createElement("td");
				td.innerHTML = "<img src='varIcons/plus.png'>"; tr.appendChild(td);
				td.addEventListener("click", function(e){
					e.preventDefault(); e.stopPropagation();
					window.game.ships[0].getSystemById($("#hangarLoadoutDiv").data("systemid")).addFighter(this.parentNode, false);
				})
				td.addEventListener("contextmenu", function(e){
					e.preventDefault(); e.stopPropagation();
					window.game.ships[0].getSystemById($("#hangarLoadoutDiv").data("systemid")).addFighter(this.parentNode, true);
				})
			var td = document.createElement("td");
				td.innerHTML = "<img src='varIcons/minus.png'>"; tr.appendChild(td);
				td.addEventListener("click", function(e){
					e.preventDefault(); e.stopPropagation();
					window.game.ships[0].getSystemById($("#hangarLoadoutDiv").data("systemid")).removeFighter(this.parentNode, false);
				})
				td.addEventListener("contextmenu", function(e){
					e.preventDefault(); e.stopPropagation();
					window.game.ships[0].getSystemById($("#hangarLoadoutDiv").data("systemid")).removeFighter(this.parentNode, true);
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
		if ($(div).hasClass("disabled")){
			$(div).find("#launchRate").html(this.getOutput());
			$(div).find("#capacity").html(this.output);
			$(div).data("systemid", this.id).css("top", e.clientY + 30).css("left", e.clientX - 150).removeClass("disabled");
			this.updateTotals();
		}
		else {
			window.game.setShipTotal();
			$(div).addClass("disabled");
		}
	}
	
	this.getSystemDetailsDiv = function(){
		var div = document.createElement("div");
			div.id = "systemDetailsDiv";
		var table = document.createElement("table");
			
		var tr = document.createElement("tr");		
		var th = document.createElement("th");
			th.colSpan = 2; th.innerHTML = this.display; th.style.width = "40%"; tr.appendChild(th); table.appendChild(tr);

		$(table).append($("<tr>").append($("<td>").html("Mass Capacity")).append($("<td>").html(this.output + " metric tons")));
		$(table).append($("<tr>").append($("<td>").html("Integrity")).append($("<td>").html(this.getRemainingIntegrity() + " / " + this.integrity)));
		$(table).append($("<tr>").append($("<td>").html("Armour")).append($("<td>").html(this.getMount())));
		$(table).append($("<tr>").append($("<td>").html("Launch Rate")).append($("<td>").html(this.effiency + " per cycle")));
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