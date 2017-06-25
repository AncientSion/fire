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
	this.disabled = system.disabled;
	this.locked = system.locked;
	this.crits = [];
	this.damages = [];
	this.detailsTable = false;
	this.highlight = false;
	this.selected = false;
	this.destroyed = false;
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
	this.loadout = 0;
	this.loaded = 0;
	this.notes = [];
}

System.prototype.attachDetailsMods = function(ele){
	if (this.destroyed){
		return;
	}
	var div = $(ele) || $("#systemDetailsDiv");
		div.find(".modifiers").remove();
	var boost = this.getBoostLevel();
	var table;
	if (boost || this.crits.length){
		table = $("<table>").addClass("modifiers").append($("<tr>").append($("<th>").html("Modifiers").attr("colSpan", 2)));
		if (boost){
			for (var i = 0; i < this.boostEffect.length; i++){
				$(table[0]).append($("<tr>").append($("<td>").html(this.boostEffect[i].type + ": +" + (this.boostEffect[i].value*100 * boost) + "%").attr("colSpan", 2).addClass("positive")));
				//div.find("." + this.boostEffect[i].type.toLowerCase()).addClass("positive");
			}
		}
		if (this.crits.length){
			for (var i = 0; i < this.crits.length; i++){
				if (this.crits[i].inEffect()){
					$(table[0]).append($("<tr>").append($("<td>").html(this.crits[i].getString()).attr("colSpan", 2).addClass("negative")));
				}
			}
		}
		div.append(table);
	}
}

System.prototype.getDisplay = function(){
	return this.display;
}

System.prototype.setState = function(){
	if (this.isDestroyed()){
		this.destroyed = true;
	}
	else {
		this.setTimeLoaded();
		if (game.phase == -1 && game.turn > 1){
			for (var i = this.powers.length-1; i >= 0; i--){
				if (this.powers[i].turn == game.turn-1){
					//if (this.getLoadLevel() >= 1){
						this.copyPowers();
						break;
					//}
				}
				else if (this.powers[i].turn < game.turn -1){
					break;
				}
			}
		}
		if (this.isUnpowered()){
			this.disabled = true;
		}
	}
	this.adjustStateByCritical();
}
System.prototype.getSystem = function(){
	return this;
}
System.prototype.getActiveWeapon = function(){
	return this;
}
System.prototype.hover = function(e){
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

System.prototype.setTableRow = function(){
	var ele = $(this.element);
	if (this.destroyed){
		ele.addClass("destroyed"); 
		return;
	}

	if (this.disabled){
		if (this.highlight){
			ele.addClass("unpowered")
				.find(".boostDiv").hide().end()
				.find(".outputMask").hide().end()
				.find(".powerDiv").find(".power").show().end().find(".unpower").hide().end();
		} else ele.addClass("unpowered").find(".outputMask").hide();
	}
	else {
		if (this.highlight){
			ele.removeClass("unpowered")
				.find(".boostDiv").show().end()
				.find(".outputMask").show().end()
				.find(".powerDiv").find(".power").hide().end().find(".unpower").show().end();
		} else ele.removeClass("unpowered").find(".outputMask").show();
	}

	if (Object.keys(this.modes).length){
		if (this.highlight && this.disabled){
			ele.find(".modeDiv").hide()
		}
		else if (this.highlight && !this.disabled){
			ele.find(".modeDiv").show()
		}
	}
}
System.prototype.setSystemBorder = function(){
	var ele = $(this.element);
	if (this.hasUnresolvedFireOrder()){
		ele.addClass("fireOrder");
	} else ele.removeClass("fireOrder");
	if (this.selected){
		ele.addClass("selected");
	} else ele.removeClass("selected");
}
System.prototype.canFire = function(){
	if (this.destroyed || this.disabled || this.locked){
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
System.prototype.getLoadLevel = function(){
	var need = this.reload;
	var has = this.getTimeLoaded();
	if (has / need > 1){
		return 1;
	}
	else return has/need;
}
System.prototype.setTimeLoaded = function(){
	var turnsLoaded = this.reload
	var max = this.reload;
	//var start = game.getUnitById(this.parentId).available;

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
		if (turnsLoaded){
			for (var j = 0; j < this.powers.length; j++){
				if (this.powers[j].turn == i && this.powers[j].type == 0){
					turnsLoaded = 0;
					break;
				}
			}
		}
	}
	this.loaded = turnsLoaded;
}
System.prototype.getTimeLoaded = function(){
	return this.loaded;
}
System.prototype.getBoostLevel = function(){
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
System.prototype.getTimeLoaded = function(){
	return this.loaded;
}
System.prototype.getBoostEffectElements = function(table){
	var data = $("<tr>").append($("<td>").html("Boost Effect"));
	for (var i = 0; i < this.boostEffect.length; i++){
		if (!i){
			$(table).append($(data).append($("<td>").html(" + " + this.boostEffect[i].value*100 + "% " + this.boostEffect[i].type)));
		} else $(table).append($("<tr>").append($("<td>").html("")).append($("<td>").html((" + " + this.boostEffect[i].value*100 + "% " + this.boostEffect[i].type))));
	}
}
System.prototype.getBoostDiv = function(){
	if (this.destroyed || !this.effiency){return};
	var div = document.createElement("div");
		div.className = "boostDiv disabled";
		$(div).data("shipId", this.parentId);
		$(div).data("systemId", this.id);
	var subDiv = document.createElement("div");
		subDiv.className = "plus";
		subDiv.innerHTML = "<img src='varIcons/plus.png'</img>";
		subDiv.childNodes[0].className = "img100pct";
		$(subDiv).click(function(e){
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
		$(subDiv).click(function(e){
			e.stopPropagation();
			if (game.phase != -1){return;}
			var data = $(this.parentNode).data();
			game.getUnitById(data.shipId).getSystemById(data.systemId).minus();
		});
		div.appendChild(subDiv);
	return div;
}
System.prototype.getPowerDiv = function(){
	if (this.destroyed || !this.powerReq){return};
	var div = document.createElement("div");
		div.className = "powerDiv";
		$(div).data("shipId", this.parentId);
		$(div).data("systemId", this.id);
	var subDiv = document.createElement("div");
		subDiv.className = "power disabled";
		subDiv.innerHTML = "<img src='varIcons/power.png'</img>";
		subDiv.childNodes[0].className = "img100pct";
		$(subDiv)
			.click(function(e){
				e.stopPropagation();
				if (game.phase != -1){return;}
				var data = $(this.parentNode).data();
				game.getUnitById(data.shipId).getSystemById(data.systemId).doPower();
			})
			.contextmenu(function(e){
				e.stopPropagation(); e.preventDefault();
				if (game.phase != -1){return;}
				var data = $(this.parentNode).data();
				game.getUnitById(data.shipId).doPowerAll(data.systemId);
			})
		div.appendChild(subDiv);
	var subDiv = document.createElement("div");
		subDiv.className = "unpower disabled";
		subDiv.innerHTML = "<img src='varIcons/unpower.png'</img>";
		subDiv.childNodes[0].className = "img100pct";
		$(subDiv)
			.click(function(e){
				e.stopPropagation();
				if (game.phase != -1){return;}
				var data = $(this.parentNode).data();
				game.getUnitById(data.shipId).getSystemById(data.systemId).doUnpower();
			})
			.contextmenu(function(e){
				e.stopPropagation(); e.preventDefault();
				if (game.phase != -1){return;}
				var data = $(this.parentNode).data();
				game.getUnitById(data.shipId).doUnpowerAll(data.systemId);
			})
		div.appendChild(subDiv);
	return div;
}
System.prototype.getModeDiv = function(){
	if (this.destroyed || !Object.keys(this.modes).length){return;}
	var div = document.createElement("div");
		div.className = "modeDiv disabled";
		$(div).data("shipId", this.parentId);
		$(div).data("systemId", this.id);
	var subDiv = document.createElement("div");
		subDiv.className = "mode";
		subDiv.innerHTML = "<img src='varIcons/mode.png'</img>";
		subDiv.childNodes[0].className = "img100pct";
		$(subDiv)
			.click(function(e){
				e.stopPropagation(); e.preventDefault();
				var data = $(this.parentNode).data();
				game.getUnitById(data.shipId).getSystemById(data.systemId).switchMode();
			})
			.contextmenu(function(e){
				e.stopPropagation(); e.preventDefault();
				var data = $(this.parentNode).data();
				game.getUnitById(data.shipId).switchModeAll(data.systemId);
			});
		div.appendChild(subDiv);
	return div;
}
System.prototype.canUnboost = function(){
	if (this.powers.length){
		if (this.powers[this.powers.length-1].turn == game.turn){
			if (this.powers[this.powers.length-1].type > 0){
				return true;
			}
		}
	}
	return false;
}
System.prototype.doUnboost = function(){
	this.powers.splice(this.powers.length-1, 1);
	return true;
}
System.prototype.doBoost = function(){
	this.powers.push({
		id: this.powers.length+1, unitid: this.parentId, systemid: this.id,
		turn: game.turn,type: 1, cost: this.getEffiency(), new: 1
	})
}
System.prototype.isPowered = function(){
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
System.prototype.isUnpowered = function(){
	if (!this.isPowered()){
		return true;
	}
	else return false;
}
System.prototype.canUnpower = function(){
	if (this.powerReq && this.isPowered()){
		return true;
	} else return false;
}
System.prototype.canPower = function(){
	if (this.powerReq && !this.isPowered()){
		return true;
	} else return false;
}
System.prototype.forceUnpower = function(){
	if (this.powers.length && this.powers[this.powers.length-1].type == 0){
		this.powers.splice(this.powers.length-1, 1);
		this.disabled = 0;
		this.setTableRow();
		game.getUnitById(this.parentId).updateDivPower(this);
	}
}
System.prototype.doUnpower = function(){
	if (this.selected){
		this.select();
	}
	if (!this.disabled){
		for (var i = this.powers.length-1; i >= 0; i--){
			if (this.powers[i].turn == game.turn && this.powers[i].type > 0){
				this.powers.splice(i, 1);
			} else if (this.powers[i].turn < game.turn){
				break;
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
System.prototype.doPower = function(){
	if (this.powers.length && this.powers[this.powers.length-1].type == 0){
		this.powers.splice(this.powers.length-1, 1);
		this.disabled = 0;
		this.setTableRow();
		game.getUnitById(this.parentId).updateDivPower(this);
	}
}
System.prototype.plus = function(){
	var ship = game.getUnitById(this.parentId);
	if (ship.canBoost(this)){
		this.doBoost();
		ship.updateDivPower(this);
		return true;
	}
	return false;
}
System.prototype.minus = function(){
	if (this.canUnboost()){
		this.doUnboost()
		game.getUnitById(this.parentId).updateDivPower(this);
		return true;
	}
	return false;
}
System.prototype.showOptions = function(){
	if (this.destroyed || this.locked){return;}
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
					canModeChange = false;
			}
			else if (boost){
				if (this.getLoadLevel() != 1){
					boost = false;
					canModeChange = false;
				}
			}

			if (boost){
				ele.find(".boostDiv").show();
			}
			if (canModeChange){
				ele.find(".modeDiv").show();
			}
			if (canPower){
				ele.find(".powerDiv").find(".power").show();
			}
			else if (canUnpower){
				ele.find(".powerDiv").find(".unpower").show();
			}
		}
	}
	/*else if (game.phase == 2){
		if (Object.keys(this.modes).length){
			$(ele).find(".boostDiv").show().end().find(".modeDiv").show().end().find(".powerDiv").show();
		}
	}*/
}
System.prototype.hideOptions = function(){
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
				$(ele)
					.find(".boostDiv").hide().end()
					.find(".modeDiv").hide().end()
					.find(".powerDiv").children().hide();
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
System.prototype.showInfoDiv = function(e){
	$(document.body).append(
		$(this.getSystemDetailsDiv())
			.css("left", e.clientX - 90)
			.css("top", e.clientY + 50)
		)
	return;
}
System.prototype.setFireOrder = function(targetid){
	this.fireOrders.push(
		{id: 0, turn: game.turn, shooterid: this.parentId, targetid: targetid, weaponid: this.id, 
		shots: 0, req: -1, notes: "", hits: -1, resolved: 0}
	);
	this.selected = false;
	this.highlight = false;
	this.setSystemBorder();
}
System.prototype.unsetFireOrder = function(){
	for (var i = this.fireOrders.length-1; i >= 0; i--){
		if (this.fireOrders[i].turn == game.turn){
			this.fireOrders.splice(i, 1);
		}
	}
	this.setSystemBorder();
}
System.prototype.hideInfoDiv = function(){
	$("#systemDetailsDiv").remove();
}
System.prototype.getImageName = function(){
	return this.name;
}
System.prototype.canBeBoosted = function(){
	return this.effiency;
}
System.prototype.getTableData = function(forFighter){
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
		if (this instanceof PrimarySystem && this.exposed){
			div.className = "loadLevel exposed";
		} else div.className = "loadLevel";
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
System.prototype.hasUnresolvedFireOrder = function(){
	return false;
}
System.prototype.update = function(){
	this.updateSystemDetailsDiv();
	game.getUnitById(this.parentId).updateDiv();
}

System.prototype.getRemainingIntegrity = function(){
	var dmg = 0;
	for (var i = 0; i < this.damages.length; i++){
		dmg += this.damages[i].structDmg;
	}
	return this.integrity - dmg;
}
System.prototype.isDestroyed = function(){
	if (this.destroyed){
		return true;
	}
	for (var i = this.damages.length-1; i >= 0; i--){
		if (this.damages[i].destroyed){
			return true;
		}
	}
}
System.prototype.copyPowers = function(){
	var copy = [];

	if (this instanceof PrimarySystem){return;}
	//if (this instanceof EM){console.log("ding");}

	for (var i = 0; i < this.powers.length; i++){
		if (this.powers[i].turn == game.turn-1 && this.powers[i].type <= 0){
			copy.push($.extend(true, {}, this.powers[i]));
		}
	}

	for (var i = 0; i < copy.length; i++){
		//if (this.parentId == 4 && this.id == 16){console.log("ding");}
		copy[i].new = 1;
		copy[i].turn = game.turn;
		this.powers.push(copy[i]);
	}
}

System.prototype.adjustStateByCritical = function(){
	for (var i = 0; i < this.crits.length; i++){
		if (this.crits[i].inEffect()){
			switch (this.crits[i].type){
				case "Disabled":
					this.disabled = true;
					break;
				default:
					continue;
			}
		}
	}
}
System.prototype.getMount = function(){
	if (game.getUnitById(aUnit) instanceof Flight){
		return false;
	}
	if (this.mount.length){
		return this.mount + " / " + this.armour;
	} else return this.armour;
}
System.prototype.getOutput = function(){
	var output = 0;
	for (var i = this.powers.length-1; i >= 0; i--){
		if (this.powers[i].turn == game.turn && this.powers[i].type > 0){
			output += this.powers[i].type;
		}
		else break;
	}
	return output;
}
System.prototype.getExtraOutput = function(){
	var extra = 0;
	var boost = 0;
	for (var i = 0; i < this.boostEffect.length; i++){
		if (this.boostEffect[i].type == "Output"){
			boost = this.boostEffect[i].value;
			break;
		}
	}
	if (boost){
		for (var i = this.powers.length-1; i >= 0; i--){
			if (this.powers[i].turn > game.turn){
				break;
			}
			else if (this.powers[i].turn == game.turn && this.powers[i].type == 1){
				extra += this.output * boost * this.powers[i].type;
			}
		}
	}
	return Math.floor(extra);
}

System.prototype.getEffiency = function(){
	return Math.ceil(this.effiency * (1+(this.getBoostLevel() * this.getBoostCostIncrease())));
}

System.prototype.getBoostCostIncrease = function(){
	return 0;
}

System.prototype.getPowerReq = function(){
	return this.powerReq;
}

System.prototype.getCurrentPowerUsage = function(){
	var usage = this.powerReq;
	for (var i = this.powers.length-1; i >= 0; i--){
		if (this.powers[i].turn == game.turn && this.powers[i].type > 0){
			usage += this.powers[i].cost;
		} else break;
	}
	return usage;
}


function PrimarySystem(system){
	System.call(this, system);
	this.exposed = 0;
}
PrimarySystem.prototype = Object.create(System.prototype);

PrimarySystem.prototype.hover = function(e){
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
}

PrimarySystem.prototype.select = function(e){
	console.log(this);
	return;
}

PrimarySystem.prototype.doUndoActions = function(){
	return;
}

PrimarySystem.prototype.getLoadLevel = function(){
	return 1;
}

PrimarySystem.prototype.getOutput = function(){
	if (this.disabled || this.destroyed){
		return 0;
	}
	var effect = this.getOutputCrits();
	var output = this.output + this.getExtraOutput();
	var usage = this.getOutputUsage();

	return Math.floor((output * effect) - usage);
}

PrimarySystem.prototype.getOutputUsage = function(){
	return 0;
}

PrimarySystem.prototype.getOutputCrits = function(){
	var mod = 1;
	for (var i = 0; i < this.crits.length; i++){
		if (this.crits[i].inEffect()){
			mod -= 1-this.crits[i].value;
		}
	}
	return mod;
}

PrimarySystem.prototype.getOutputString = function(){
	var effect = this.getOutputCrits();
	return Math.floor(this.output*effect) + " + " + Math.floor(this.getExtraOutput()*effect);
}

PrimarySystem.prototype.getBoostCostIncrease = function(){
	return 0.3;
}

PrimarySystem.prototype.getSystemDetailsDiv = function(){
	var div = document.createElement("div");
		div.id = "systemDetailsDiv";
		div.className = this.id;
	var table = document.createElement("table");
	
	$(table).append($("<tr>").append($("<th>").html(this.display).attr("colSpan", 2)));
	$(table).append($("<tr>").append($("<td>").css("width", "60%").html("Integrity")).append($("<td>").html(this.getRemainingIntegrity() + " / " + this.integrity)));

	if (this.output){
		$(table).append($("<tr>").append($("<td>").html("Current Output")).append($("<td>").addClass("output").html(this.getOutputString())));
	}
	if (this.powerReq){
		$(table).append($("<tr>").append($("<td>").html("Base Power Req")).append($("<td>").addClass("powerReq").html(this.getPowerReq())));
	}
	if (this.effiency){
		$(table).append($("<tr>").append($("<td>").html("Boost Power Cost")).append($("<td>").addClass("powerCost").html(this.getEffiency())));
	}
	if (this.modes.length){
		$(table).append($("<tr>").append($("<td>").html("Sensor Mode")).append($("<td>").addClass("sensorMode negative").html(this.getEWMode())));
	}

	div.appendChild(table);
	this.attachDetailsMods(div);
	return div;
}

PrimarySystem.prototype.updateSystemDetailsDiv = function(){
	var output = this.getOutputString();
	var powerReq = this.getPowerReq();
	var boostReq = this.getEffiency();
	var ele = $("#systemDetailsDiv");
	$(ele).find("tr").each(function(i){
		if (this.childNodes.length == 2){
			if (this.childNodes[1].className == "output"){
				this.childNodes[1].innerHTML = output;
			}
			else if (this.childNodes[1].className == "powerReq"){
				this.childNodes[1].innerHTML = powerReq;
			}
			else if (this.childNodes[1].className == "powerCost"){
				this.childNodes[1].innerHTML = boostReq;
			}
		}
	})

	if (this instanceof Sensor){
		$("#systemDetailsDiv").find(".sensorMode").html(this.getEWMode());
	}
	this.attachDetailsMods(ele);
}


function Bridge(system){
	PrimarySystem.call(this, system);
	this.effiency = 0;
	this.powerReq = 0;
}
Bridge.prototype = Object.create(PrimarySystem.prototype);
				
function Reactor(system){
	PrimarySystem.call(this, system);
	this.powerReq = 0;
}
Reactor.prototype = Object.create(PrimarySystem.prototype);

Reactor.prototype.getUnusedPower = function(){
	return this.getOutput();
}

Reactor.prototype.getOutputUsage  = function(){
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

function Engine(system){
	PrimarySystem.call(this, system);
}
Engine.prototype = Object.create(PrimarySystem.prototype);
				
function LifeSupport(system){
	PrimarySystem.call(this, system);
	this.display = "Life Support";
	this.powerReq = 0;
	this.effiency = 0;
}
LifeSupport.prototype = Object.create(PrimarySystem.prototype);
				
function Sensor(system){
	PrimarySystem.call(this, system)
	this.ew = system.ew;
	this.modes = system.modes;
	this.states = system.states;
}
Sensor.prototype = Object.create(PrimarySystem.prototype);

Sensor.prototype.switchMode = function(id){
	if (this.destroyed || this.disabled || this.locked){return;}
	if (this.ew[this.ew.length-1].type == 1){
		this.ew[this.ew.length-1].type = 0;
	} else this.ew[this.ew.length-1].type = 1;
		this.updateSystemDetailsDiv();
		this.drawEW();
}

Sensor.prototype.getEWMode = function(){
	if (this.disabled || game.phase == -2){return "NONE";}
	return this.modes[this.ew[this.ew.length-1].type];
}

Sensor.prototype.setState = function(){
	PrimarySystem.prototype.setState.call(this);
	if (game.phase == -1){
		if (this.disabled){return;}

		this.setEW({
			angle: -1,
			dist: Math.ceil(this.getOutput() / Math.pow(180/20, 1/1.5)),
			turn: game.turn,
			unitid: this.parentId,
			systemid: this.id,
			type: 0
		})
	}
	else if (game.phase != -1){
		this.locked = 1;
	}
}

Sensor.prototype.doUndoActions = function(){
	for (var i = this.ew.length-1; i >= 0; i--){
		if (this.ew[i].turn == game.turn){
			this.ew.splice(i, 1);
			mouseCtx.clearRect(0, 0, res.x, res.y);
		} else break;
	}
}

Sensor.prototype.doPower = function(){
	if (this.powers.length && this.powers[this.powers.length-1].type == 0){
		this.powers.splice(this.powers.length-1, 1);
		this.disabled = 0;
		this.setEW({
			angle: -1,
			dist: Math.ceil(this.getOutput() / Math.pow(180/20, 1/1.5)),
			turn: game.turn,
			unitid: this.parentId,
			systemid: this.id,
			type: 0
		})
		this.drawEW();
		this.setTableRow();
		game.getUnitById(this.parentId).updateDivPower(this);
	}
}

Sensor.prototype.setEW = function(data){
		for (var i = this.ew.length-1; i >= 0; i--){
			if (this.ew[i].turn == game.turn){
				this.ew.splice(i, 1);
			} else break;
		}
		this.ew.push(data);
		if (this.selected){
			this.select();
		//	this.drawEW();
		}
		return;
}

Sensor.prototype.getEW = function(data){
	for (var i = this.ew.length-1; i >= 0; i--){
		if (this.ew[i].turn == game.turn){
			return this.ew[i];
		}
	}
}

Sensor.prototype.drawEW = function(){
	if (this.ew.length && this.ew[this.ew.length-1].turn == game.turn){
		var ship = game.getUnitById(this.parentId);
		var loc = ship.getPlannedPosition();
		var ew = this.ew[this.ew.length-1];
		var str = this.getOutput();
		var len = 20;
		var p = 1.5;
		var facing = ship.getPlannedFacing();
		var w;
		if (ew.angle == -1){
			w = 180;
		} else w = Math.min(180, len * Math.pow(str/ew.dist, p));
		drawSensorArc(w, ew.dist, p, str, len, loc, facing, ew.angle, this);
	}
}

Sensor.prototype.select = function(e){
	console.log(this);
	var id = this.id;
	var parentId = this.parentId;
	var selected = false;
	var unit;

	if (this.destroyed || this.disabled || this.locked){
		return false;
	}
	else {
		unit = game.getUnitById(parentId);
		if (unit.hasWeaponsSelected()){
			return;
		}
		else if (this.selected){
			this.selected = false;
			this.setSystemBorder();
			
			//mouseCtx.clearRect(0, 0, res.x, res.y);
		}
		else {
			this.selected = true;
			this.setSystemBorder();
			this.drawEW();
		}
	}
}

Sensor.prototype.hover = function(e){
	PrimarySystem.prototype.hover.call(this, e);
	if (game.phase == -2){return;}
	if (this.highlight){
		this.drawEW();
	}
	else if (this.selected){
	}
	else if (game.aShip != this.parentId){
		mouseCtx.clearRect(0, 0, res.x, res.y);
	}
}

Sensor.prototype.doBoost = function(){
	System.prototype.doBoost.call(this);
	mouseCtx.clearRect(0, 0, res.x, res.y);
	this.ew[this.ew.length-1].dist = Math.ceil(this.getOutput() / Math.pow(180/20, 1/1.5));
	this.drawEW();
}

Sensor.prototype.doUnboost = function(){
	System.prototype.doUnboost.call(this);
	mouseCtx.clearRect(0, 0, res.x, res.y);
	this.ew[this.ew.length-1].dist = Math.ceil(this.getOutput() / Math.pow(180/20, 1/1.5));
	this.drawEW();
}

function Weapon(system){
	System.call(this, system);
	this.animColor = system.animColor;
	this.weapon = true;
	this.minDmg = system.minDmg;
	this.maxDmg = system.maxDmg;
	this.accDecay = system.accDecay/10;
	this.linked = system.linked;
	this.shots = system.shots;
	this.reload = system.reload;
	this.arc = [
					[system.start, system.end]
				];
	this.priority = system.priority;
	this.traverse = system.traverse;
	this.loaded;
	this.fireOrders = [];
	this.mount;
	this.exploSize = 1+((this.minDmg+this.maxDmg)/30);
}
Weapon.prototype = Object.create(System.prototype);

Weapon.prototype.getAimData = function(target, final, dist, row){
	var dmgLoss = this.getDamageLoss(dist);
	var accLoss = this.getAccuracyLoss(dist);

	if (dmgLoss){
		row.append($("<td>").html(" -" + dmgLoss + "%"));
	} else {
		row.append($("<td>").html(""));
	}

	if (target){
		this.getAimDataTarget(target, final, accLoss, row);
	}
	else {
		this.getAimDataLocation(accLoss, row);
	}
}

Weapon.prototype.getAimDataTarget = function(target, final, accLoss, row){
	var traverseMod = this.getTraverseMod(target);

	if (!traverseMod){
		row.append($("<td>").html("<span class='green'>Full Tracking</span>"));
	} else row.append($("<td>").html("-"+ Math.floor(final / 5 * traverseMod) + "% (<span class='red'>" + traverseMod + '</span>)'));

	if (accLoss){
		row.append($("<td>").html(" -" + accLoss + "%"));
	} else row.append($("<td>").html(""));

	row.append($("<td>").html(Math.floor(final * (1-(traverseMod*0.2)) - accLoss) + "%"));
}

Weapon.prototype.getAimDataLocation = function(accLoss, row){
		row.append($("<td>").html(""));
	if (accLoss){
		row.append($("<td>").html(" -" + accLoss + "%"));
	} else {			
		row.append($("<td>").html(""));
	}

	row.append($("<td>").html(""));
}

Weapon.prototype.doUndoActions = function(){
	for (var i = this.fireOrders.length-1; i >= 0; i--){
		if (this.fireOrders[i].turn == game.turn){
			this.fireOrders.splice(i, 1);
		}
	}
}

Weapon.prototype.getShots = function(){
	return this.shots;
}

Weapon.prototype.posIsOnArc = function(loc, pos, facing){
	for (var i = 0; i < this.arc.length; i++){
		var start = this.arc[i][0];
		var end = this.arc[i][1];
		return isInArc(getCompassHeadingOfPoint(loc, pos, facing), start, end);
	}
}

Weapon.prototype.hasUnresolvedFireOrder = function(){
	for (var i = 0; i < this.fireOrders.length; i++){
		if (this.fireOrders[i].turn == game.turn && this.fireOrders[i].resolved == 0){
			return true;
		}
	}
	return false;
}

Weapon.prototype.select = function(e){
	console.log(this);
	var unit;

	if (this.destroyed || this.disabled || this.locked || this.parentId != aUnit){
		return false;
	}
	else {
		unit = game.getUnitById(this.parentId);
		if (unit.hasSystemSelected("Sensor")){
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

Weapon.prototype.getArcWidth = function(){
	var w = 0;

	if (this.arc[0][0] < this.arc[0][1]){
		w = this.arc[0][1] - this.arc[0][0];
	}
	else if (this.arc[0][0] > this.arc[0][1]){
		w = 360 - this.arc[0][0] + this.arc[0][1];
	}

	return w;
}

Weapon.prototype.setMount = function(amount){
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

Weapon.prototype.getTraverseMod = function(target){
	return Math.max(0, (this.traverse - target.traverse));
}

Weapon.prototype.getTraverseRating = function(){
	return this.traverse;
}

Weapon.prototype.getSystemDetailsDiv = function(){
	var div = document.createElement("div");
		div.id = "systemDetailsDiv";
	var table = document.createElement("table");
	
	$(table).append($("<tr>").append($("<th>").html(this.display).attr("colSpan", 2)));
	$(table).append($("<tr>").append($("<td>").html("Weapon Type")).append($("<td>").html(this.type)));

	if (!(game.getUnitById(aUnit).flight)){
		$(table).append($("<tr>").append($("<td>").html("Integrity")).append($("<td>").html(this.getRemainingIntegrity() + " / " + this.integrity)));
		$(table).append($("<tr>").append($("<td>").html("Mount / Armour")).append($("<td>").html(this.getMount())));
		$(table).append($("<tr>").append($("<td>").html("Base Power Req")).append($("<td>").html(this.getPowerReq())));
		if (this.boostEffect.length && !(this instanceof Launcher)){
			$(table).append($("<tr>").append($("<td>").html("Boost Power Cost")).append($("<td>").html(this.getEffiency())));
			this.getBoostEffectElements(table);
		}
	}

	$(table).append($("<tr>").append($("<td>").html("Loading")).append($("<td>").html(this.getTimeLoaded() + " / " + this.reload)));

	if (this instanceof Launcher){
		if (this.ammo){
			$(table).append($("<tr>").append($("<th>").css("border-top", "1px solid white").attr("colSpan", 2).html(this.ammo.name)));
			$(table).append($("<tr>").append($("<td>").attr("colSpan", 2).html(this.ammo.display)));
			$(table).append($("<tr>").append($("<td>").html("Ammo amount")).append($("<td>").html("<font color='red'>" + this.getRemainingAmmo() + "</font> / " + this.getMaxAmmo()).attr("id", "ammo")));
			$(table).append($("<tr>").append($("<td>").html("Tracking")).append($("<td>").html(this.getTraverseRating() + " / " + game.getUnitType(this.getTraverseRating()))));
			$(table).append($("<tr>").append($("<td>").html("Impulse")).append($("<td>").html(this.getBallImpulse())));
		}
		$(table).append($("<tr>").append($("<td>").html("Launch Rate")).append($("<td>").html("<font color='red'>" + this.getOutput() + "</font> - max " + this.effiency)
				.attr("id", "detailsShots")
			));
	}
	else if (this instanceof Laser){
		$(table).append($("<tr>").append($("<td>").html("Tracking")).append($("<td>").html(this.getTraverseRating() + " / " + game.getUnitType(this.getTraverseRating()))));
		$(table).append($("<tr>").append($("<td>").html("Focus point")).append($("<td>").html(this.optRange + "px")));
		$(table).append($("<tr>").append($("<td>").html("Damage loss")).append($("<td>").html(this.dmgDecay + "% per 100px")));
		$(table).append($("<tr>").append($("<td>").html("Accuracy loss")).append($("<td>").addClass("accuracy").html(this.getAccuracy() + "% per 100px")));
	}
	else {
		$(table).append($("<tr>").append($("<td>").html("Tracking")).append($("<td>").html(this.getTraverseRating() + " / " + game.getUnitType(this.getTraverseRating()))));
		if (this instanceof Plasma){
			$(table).append($("<tr>").append($("<td>").html("Damage loss")).append($("<td>").html(this.dmgDecay + "% per 100px")));
		}
		$(table).append($("<tr>").append($("<td>").html("Accuracy loss")).append($("<td>").html(this.getAccuracy() + "% per 100px")));
	}

	if (this.linked > 1){
		$(table).append($("<tr>").append($("<td>").html("Linked Shots")).append($("<td>").html(this.linked + " x " + this.shots)));
	}
	else if (this instanceof Laser){
		$(table).append($("<tr>").append($("<td>").html("Shots & Rakes")).append($("<td>").html(this.shots + " w/ " + this.output + " rakes")));
	}
	else if (!(this instanceof Launcher)){
		if (this instanceof Pulse){
			$(table).append($("<tr>").append($("<td>").html("Volley")).append($("<td>").html(this.shots + " w/ " + this.basePulses + " pulses")));
			$(table).append($("<tr>").append($("<td>").html("Burst")).append($("<td>").html(" +1 (max " + this.extraPulses + ") per " + this.grouping + "%")));
		} else $(table).append($("<tr>").append($("<td>").html("Shots")).append($("<td>").html(this.shots)));
	}

	$(table).append($("<tr>").append($("<td>").html("Damage")).append($("<td>").addClass("damage").html(this.getDamageString())));

	if (this.notes.length){
		$(table).append($("<tr>").append($("<th>").html("Notes").attr("colSpan", 2)));
		for (var i = 0; i < this.notes.length; i++){
			$(table).append($("<tr>").append($("<td>").html(this.notes[i]).attr("colSpan", 2)));
		}
	}

	div.appendChild(table);
	this.attachDetailsMods(div);
		
	return div;
}

Weapon.prototype.updateSystemDetailsDiv = function(){
	var dmg = this.getDamageString();
	var acc = this.getAccuracy();
	var ele = $("#systemDetailsDiv");

	$(ele).find("tr").each(function(i){
		if (this.childNodes.length == 2){
			if (this.childNodes[1].className == "damage"){
				this.childNodes[1].innerHTML = dmg;
			}
			if (this.childNodes[1].className == "accuracy"){
				this.childNodes[1].innerHTML = acc + "% per 100px";
			}
		}
	})

	this.attachDetailsMods(ele);
}

Weapon.prototype.drawArc = function(facing, pos){
	for (var i = 0; i < this.arc.length; i++){
		var p1 = getPointInDirection(res.x, this.arc[i][0] + facing, pos.x, pos.y);
		var p2 = getPointInDirection(res.y, this.arc[i][1] + facing, pos.x, pos.y)
		var dist = getDistance( {x: pos.x, y: pos.y}, p1);
		var rad1 = degreeToRadian(this.arc[i][0] + facing);
		var rad2 = degreeToRadian(this.arc[i][1] + facing);

		fxCtx.globalAlpha = 0.7;
		fxCtx.beginPath();			
		fxCtx.moveTo(pos.x, pos.y);
		fxCtx.arc(pos.x, pos.y, dist, rad1, rad2, false);
		fxCtx.closePath();		
		fxCtx.fillStyle = this.getFillStyle(pos.x, pos.y, dist);
		fxCtx.fill();
		fxCtx.globalAlpha = 1;
	}
}

Weapon.prototype.getAccuracyLoss = function(dist){		
	return Math.ceil(this.getAccuracy()/100 * dist);
}

Weapon.prototype.getDamageLoss = function(dist){
	return 0;
}

Weapon.prototype.getExpectedDamage = function(dist){
	var loss = this.getDamageLoss(dist);
	
	return Math.floor(this.damage - (this.damage / 100 * loss));
}

Weapon.prototype.getFillStyle = function(x, y, dist){
	return "green";
}

Weapon.prototype.getCritEffect = function(value){
	var mod = 0;

	for (var i = 0; i < this.crits.length; i++){
		switch (this.crits[i].type){
			case value:
				mod += this.crits[i].value; break;
			default: break;
		}
	}
	return mod;
}

Weapon.prototype.getAccuracy = function(){
	var mod = 1;
		mod += this.getCritEffect("Accuracy");
		mod -= this.getBoostEffect("Accuracy") * this.getBoostLevel();

	return Math.floor(this.accDecay * mod);
}

Weapon.prototype.getDamageString = function(){
	var mod = this.getDamage();

	if (this.minDmg == this.maxDmg){
		return Math.floor(this.minDmg * mod);
	} else return (Math.floor(this.minDmg*mod) + " - " + Math.floor(this.maxDmg*mod));
}

Weapon.prototype.getBoostEffect = function(val){
	for (var i = 0; i < this.boostEffect.length; i++){
		if (this.boostEffect[i].type == val){
			return this.boostEffect[i].value;
		}
	}
	return 0;
}

Weapon.prototype.getDamage = function(){
	var mod = 1;
		mod -= this.getCritEffect("Damage");
		mod += this.getBoostEffect("Damage") * this.getBoostLevel();

	return mod;
}

function Particle(system){
	Weapon.call(this, system);	
	this.animation = "projectile";
	this.projSize = system.projSize;
	this.projSpeed = system.projSpeed;
}
Particle.prototype = Object.create(Weapon.prototype);

Particle.prototype.getAnimation = function(fire){
	var allAnims = [];
	var grouping = 2;
	var delay = 30;
	var shotInterval = 6;

	if (fire.shooter.flight){
		grouping = 1;
		delay = 8;
	}
	else if (this.shots >= 4 && fire.guns <= 3){
		grouping = 1;
		delay = 80;
		shotInterval = 10;
	}
	
	for (var j = 0; j < fire.guns; j++){
		var hasHit = 0;
		var gunAnims = [];
		var ox;
		var oy;
		if (fire.shooter.flight){
			var o = fire.shooter.getGunOrigin(j);
			ox = fire.shooter.x + o.x;
			oy = fire.shooter.y + o.y;
		}
		else {
			ox = fire.shooter.x + range(fire.shooter.size * 0.2 * -1, fire.shooter.size * 0.2); // WEAPON origin
			oy = fire.shooter.y + range(fire.shooter.size * 0.2 * -1, fire.shooter.size * 0.2);
		}

		for (var k = 0; k < this.shots; k++){
			if (fire.hits[j] > k){
				hasHit = 1;
				break;
			}
		}

		if (hasHit){
			tx = fire.target.x + range(fire.target.size * 0.2 * -1, fire.target.size * 0.2);
			ty = fire.target.y + range(fire.target.size * 0.2 * -1, fire.target.size * 0.2);
		}
		else {
			tx = fire.target.x + range(fire.target.size * 0.5 * -1, fire.target.size * 0.5);
			ty = fire.target.y + range(fire.target.size * 0.5 * -1, fire.target.size * 0.5);
		}
		
		for (var k = 0; k < this.shots; k++){
			var hit = false;
			var tfx;
			var tfy;

			if (fire.hits[j] > k){
				hit = true;
			}	

			if (hit){ // shot hit
				tfx = tx + range(-8, 8);
				tfy = ty + range(-8, 8);
				dist = getDistance( {x: ox, y: oy}, {x: tfx, y: tfy} );
			}
			else { // shot miss
				tfx = tx + range(-15, 15);
				tfy = ty + range(-15, 15);
			}

			var shotAnim = new BallVector({x: ox, y: oy}, {x: tfx, y: tfy}, this.projSpeed, hit);
			
			if (fire.guns > grouping){
				shotAnim.n = 0 - ((j / grouping) * delay + k*shotInterval);
			}
			else {
				shotAnim.n = 0 - (j*delay + k*shotInterval);
			}


			gunAnims.push(shotAnim);
		}
		allAnims.push(gunAnims)
	}
	return allAnims;
}

function Matter(system){
	Particle.call(this, system);
	this.notes = ["Ignores 50 % of Armour"];
}
Matter.prototype = Object.create(Particle.prototype);

function Plasma(system){
	Particle.call(this, system);
	this.dmgDecay = system.dmgDecay;
	this.notes = ["Adds 50 % damage to Armour"];
}
Plasma.prototype = Object.create(Particle.prototype);

Plasma.prototype.getDamageLoss = function(dist){		
	return Math.ceil(this.dmgDecay * dist/100);
}

Plasma.prototype.getFillStyle = function(x, y, dist){
	var grad = fxCtx.createRadialGradient(x, y, 0, x, y, dist);

	grad.addColorStop(4000 / this.dmgDecay / decayVar, "red");
	grad.addColorStop(2000 / this.dmgDecay / decayVar, "yellow");
	grad.addColorStop(0, "green");
			
	return grad;
}

function EM(system){
	Particle.call(this, system);
	this.notes = ["Does no actual damage", "Cause effects if it penetrates Armour"];
}
EM.prototype = Object.create(Particle.prototype);

function Pulse(system){
	Particle.call(this, system);
	this.basePulses = system.basePulses;
	this.extraPulses = system.extraPulses;
	this.grouping = system.grouping;
	this.notes = ["Volley allocates versus the same subtarget"];
}
Pulse.prototype = Object.create(Particle.prototype);

Pulse.prototype.getShots = function(){
	return this.basePulses + this.extraPulses;
}
	
Pulse.prototype.getAnimation = function(fire){
	//console.log(fire);
	allAnims = [];
	var grouping = 2;
	var delay = 80;
	var shotInterval = 6;

	if (fire.shooter.flight){
		grouping = 4;
		delay = 20;
	}

	for (var j = 0; j < fire.guns; j++){
		var gunHit = false;
		var gunDelay = Math.floor(j / grouping) * delay;
		var rng = range(0, 10)
		var gunAnims = [];
		var ox = fire.shooter.x + range(fire.shooter.size * -0.2, fire.shooter.size * 0.2); // WEAPON origin
		var oy = fire.shooter.y + range(fire.shooter.size * -0.2, fire.shooter.size * 0.2);
		var tx;
		var ty;
		var dist;
		if (fire.hits[j] >= 1){
			gunHit = true;
		}
		else {
			tx = fire.target.x + range(fire.target.size * -0.7, fire.target.size * 0.7); // salvo missed7
			ty = fire.target.y + range(fire.target.size * -0.7, fire.target.size * 0.7);
		}
		
		for (var k = 0; k < this.basePulses + this.extraPulses; k++){
			if (gunHit){
				tx = fire.target.x + range(fire.target.size * -0.07, fire.target.size * 0.07); // salvo hit
				ty = fire.target.y + range(fire.target.size * -0.07, fire.target.size * 0.07);
			}
			//console.log("hit: " + (k < fire.hits[j]));
			var shotAnim = new BallVector({x: ox, y: oy}, {x: tx, y: ty}, this.projSpeed, (k < fire.hits[j]));
				shotAnim.n = 0 - (gunDelay + k*shotInterval + rng);


			gunAnims.push(shotAnim);
		}
		allAnims.push(gunAnims)
	}
	return allAnims;
}

function Laser(system){
	Weapon.call(this, system);	
	this.animation = "beam";
	this.optRange = system.optRange;
	this.dmgDecay = system.dmgDecay;
	this.rakeTime = system.rakeTime;
	this.output = system.rakes;
	this.beamWidth = system.beamWidth || (this.minDmg+this.maxDmg)/system.rakes/35;
	this.exploSize = (this.minDmg+this.maxDmg)/system.rakes/30;
}
Laser.prototype = Object.create(Weapon.prototype);

Laser.prototype.getAnimation = function(fire){
	allAnims = [];
	var grouping = 1;
	var delay = 30;
	var shotInterval = 15;

	if (fire.guns >= 6){
		delay = 15;
	}
	
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
				0 - (range(-5, 5)) - (Math.floor(j / grouping) * delay) - k*shotInterval,
				fire.weapon.rakeTime,
				hit
			);

			gunAnims.push(shotAnim);
		}
		allAnims.push(gunAnims)
	}
	return allAnims;
}
	
Laser.prototype.getFillStyle = function(x, y, dist){
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
	
Laser.prototype.getDamageLoss = function(dist){
	var decay = this.dmgDecay;
	
	if (dist < this.optRange){
		dist = this.optRange - dist;
	} else dist = dist - this.optRange;
	
	return Math.ceil(decay * dist/100);
}

function Dual(system){
	Weapon.call(this, system);
	this.weapons = system.weapons;
	this.modes = system.modes;
	this.states = system.states;
	this.dual = 1;
	this.weapons;
}
Dual.prototype = Object.create(Weapon.prototype);

Dual.prototype.canBeBoosted = function(){
	for (var i = 0; i < this.weapons.length; i++){
		if (this.weapons[i].effiency){
			return 1;
		}
	}
	return 0;
}

Dual.prototype.setFireOrder = function(targetid){
	var w = this.getActiveWeapon();

	this.fireOrders.push(
		{id: 0, turn: game.turn, shooterid: this.parentId, targetid: targetid, weaponid: this.id, 
		shots: 0, req: -1, notes: "", hits: -1, resolved: 0}
	);
	this.selected = false;
	this.highlight = false;
	this.setSystemBorder();
}

Dual.prototype.setState = function(){
	System.prototype.setState.call(this);
	this.initSubWeapons();
	this.initMain();
}

Dual.prototype.getImageName = function(){
	return this.getActiveWeapon().name;
}

Dual.prototype.initSubWeapons = function(){
	for (var i = 0; i < this.weapons.length; i++){
		this.weapons[i] = new window[this.weapons[i].type](this.weapons[i]);
		this.weapons[i].mount = this.mount;
		this.weapons[i].armour = this.armour;
		this.weapons[i].mass = this.mass;
		this.weapons[i].integrity = this.integrity;
		this.weapons[i].damages = this.damages;
		this.weapons[i].crits = this.crits;
		//this.weapons[i].display = "HYBRID - " + this.weapons[i].display;
	}
}

Dual.prototype.initMain = function(){
	var w = this.getActiveWeapon();
	for (var i = 0; i < this.states.length; i++){
		if (this.states[i]){
			for (var j = 0; j < this.powers.length; j++){
				if (this.powers[j].turn == game.turn && this.powers[j].type > 0){
					w.powers.push(this.powers[j]);
				}
				//else if (this.powers[j].turn > game.turn){
				//	break;
				//}
			}
		}
	}

	this.copyProps();
}

Dual.prototype.switchMode = function(id){
	if (this.destroyed || this.disabled || this.locked){return;}
	this.resetPowers();
	this.cycleActiveWeapon();
	this.copyProps();
	this.setSystemImage()
	this.setSystemWindow(id);
	this.resetDetailsDiv();
	game.getUnitById(this.parentId).updateDivPower(this);
}

Dual.prototype.setSystemImage = function(){
	this.element.childNodes[0].src = "sysIcons/" + this.getImageName() + ".png";
}

Dual.prototype.resetPowers = function(){
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

Dual.prototype.cycleActiveWeapon = function(){
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

Dual.prototype.copyProps = function(){
	for (var i = 0; i < this.states.length; i++){
		if (this.states[i]){
			this.effiency = this.weapons[i].effiency;
			this.maxBoost = this.weapons[i].maxBoost;
			this.boostEffect = this.weapons[i].boostEffect;
			this.powerReq = this.weapons[i].powerReq;
			//this.weapons[i];
		}
	}
}

Dual.prototype.setSystemWindow = function(id){
	//if (game.phase == -2){return;}
	if (this.canPower() || !this.effiency){
		$(this.element).find(".boostDiv").hide().end().find(".outputMask").hide();
	}
	else if (this.effiency){
		$(this.element).find(".outputMask").show();
		if (id == undefined || this.id == id){
			$(this.element).find(".boostDiv").show();
		}
	}
}

Dual.prototype.resetDetailsDiv = function(){
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

Dual.prototype.update = function(){
	this.getActiveWeapon().updateSystemDetailsDiv();
	game.getUnitById(this.parentId).updateDiv();
}

Dual.prototype.getSystemDetailsDiv = function(){
	return this.getActiveWeapon().getSystemDetailsDiv();
}

Dual.prototype.drawArc = function(facing, pos){
	this.getActiveWeapon().drawArc(facing, pos);
}

Dual.prototype.getSystem = function(){
	return this.getActiveWeapon();
}

Dual.prototype.getBoostDiv = function(){
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
					$(subDiv).click(function(e){
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
					$(subDiv).click(function(e){
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

Dual.prototype.doUnboost = function(){
	this.powers.splice(this.powers.length-1, 1);
	var w = this.getActiveWeapon();
		w.powers.splice(w.powers.length-1, 1);
}


Dual.prototype.doBoost = function(){
	var p = {id: this.powers.length+1,unitid: this.parentId,systemid: this.id,
				turn: game.turn,type: 1, cost: this.getEffiency(), new: 1};
	this.powers.push(p);
	this.getActiveWeapon().powers.push(p);
}

Dual.prototype.getActiveWeapon = function(){
	for (var i = 0; i < this.states.length; i++){
		if (this.states[i]){return this.weapons[i];}
	}
	return this.weapons[0];
}


function Launcher(system){
	Weapon.call(this, system);	
	//Weapon.call(this, id, parentId, name, display, 0, 0, integrity, powerReq, output, effiency, maxBoost, 0, 0, 0, 0, 0, 0, 1, reload, arc1, arc2, arc3, arc4);	
	         // Weapon(id, parentId, name, display, exploSize, animColor, integrity, powerReq, output, effiency, maxBoost, boostEffect, fc, minDmg, maxDmg, accDecay, linked, shots, reload, arc1, arc2, arc3, arc4){

	this.effiency = system.launchRate;
	this.type = "Ballistic";
	this.animation = "ballistic";
	this.loads = [];
	this.ammo = system.ammo || false;
	this.loadout = 1;

	this.create(system.loads);
}
Launcher.prototype = Object.create(Weapon.prototype);

Launcher.prototype.create = function(loads){
	for (var i = 0; i < loads.length; i++){
		this.loads.push(new Missile(loads[i]));
	}
	if (game.phase == -2){
		for (var i = 0; i < this.loads.length; i++){
			this.loads[i].amount = 0;
		}
	}
	else {
		if (this.ammo  == false || this.getRemainingAmmo() == 0){
			this.shots = 0;
			this.forceUnpower();
		}
	}
}

Launcher.prototype.plus = function(){
	var ship = game.getUnitById(this.parentId);
	if (ship.canBoost(this)){
		this.doBoost();
		this.updateGUI();
		return true;
	}
	return false;
}
Launcher.prototype.minus = function(){
	if (this.canUnboost()){
		this.doUnboost()
		this.updateGUI();
		return true;
	}
	return false;
}

Launcher.prototype.doBoost = function(){
	this.powers.push({
		id: this.powers.length+1, unitid: this.parentId, systemid: this.id,
		turn: game.turn, type: 1, cost: 0, new: 1
	})
}

Launcher.prototype.getShots = function(){
	return this.shots;
}

Launcher.prototype.getTraverseRating = function(){
	return this.ammo.traverse || 0
}

Launcher.prototype.getAimDataTarget = function(target, final, accLoss, row){
	var traverseMod = this.getTraverseMod(target);

	if (!traverseMod){
		row.append($("<td>").html("<span class='green'>Full Tracking</span>"));
	} else row.append($("<td>").html("-"+ Math.floor(final / 5 * traverseMod) + "% (<span class='red'>" + traverseMod + '</span>)'));

	if (accLoss){
		row.append($("<td>").html(" -" + accLoss + "%"));
	} else row.append($("<td>").html(""));

	row.append($("<td>").html(Math.floor(100 * (1-(traverseMod*0.2)) - accLoss) + "%"));
}

Launcher.prototype.getUpgradeData = function(){
	var loads = [];
	for (var i = 0; i < this.loads.length; i++){
		if (this.loads[i].amount > 0){
			loads.push({"amount": this.loads[i].amount, "cost": this.loads[i].cost, name: this.loads[i].name});
		}
	}

	return {name: this.display, systemid: this.id, cost: this.totalCost, loads: loads};
}

Launcher.prototype.getAccuracyLoss = function(dist){		
	return 0;
}

Launcher.prototype.getEffiency = function(){
	return this.effiency;
}

Launcher.prototype.select = function(e){
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

	if (this.destroyed || this.disabled || this.locked){
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

Launcher.prototype.setMount = function(amount){
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

Launcher.prototype.getTraverseMod = function(target){
	if (this.ammo){
		return Math.max(0, (this.ammo.traverse - target.traverse));
	}
}
Launcher.prototype.getDamageString = function(){
	if (this.ammo){
		return this.ammo.minDmg + " - " + this.ammo.maxDmg;
	}
}

Launcher.prototype.getOutput = function(){
	return this.shots + this.getBoostLevel();
}

Launcher.prototype.updateGUI = function(){
	$("#systemDetailsDiv")
		.find("#detailsShots").html("<font color='red'>" + this.getOutput() + "</font> - max " + this.effiency)
			.end()
		.find("#ammo").html("<font color='red'>" + this.getRemainingAmmo() + "</font> / " + this.getMaxAmmo());


	$(this.element).find(".outputMask").html(this.getOutput());
}

Launcher.prototype.setupAmmoLoadout = function(e){
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

Launcher.prototype.addAmmo = function(ele, all){
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

Launcher.prototype.removeAmmo = function(ele, all){
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

Launcher.prototype.updateTotals = function(){
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

Launcher.prototype.getRemainingAmmo = function(){
	var ammo = this.getMaxAmmo();
	for (var i = 0; i < this.fireOrders.length; i++){
		ammo -= this.fireOrders[i].shots;
	}
	return ammo;
}

Launcher.prototype.getMaxAmmo = function(){
	return this.ammo.output;
}

Launcher.prototype.getBallImpulse = function(){
	var val = Math.ceil(Math.pow(this.ammo.mass, -0.75)*200);

	return val*2 + " + " + val + " / Turn";
}

function Hangar(system){
	System.call(this, system);
	this.start = system.start;
	this.end = system.end;
	this.reload = system.reload;
	this.effiency = system.effiency;
	this.loads = system.loads;
	//this.weapon = false;
	this.range = 75;
	this.loadout = 1;
}
Hangar.prototype = Object.create(Weapon.prototype);

Hangar.prototype.getUpgradeData = function(){
	return {
		name: this.display,
		systemid: this.id,
		cost: this.totalCost,
		loads: this.loads
	}
}

Hangar.prototype.setFireOrder = function(targetid){
	this.fireOrders.push(
		{id: 0, turn: game.turn, shooterid: this.parentId, targetid: 0, weaponid: this.id, 
		shots: 0, req: -1, notes: "fighterLaunch", hits: -1, resolved: 1}
	);
	return this;
}

Hangar.prototype.select = function(e){
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
	else if (this.destroyed || this.disabled || this.locked){
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

Hangar.prototype.update = function(){
	game.getUnitById(this.parentId).updateDiv();
}

Hangar.prototype.doUndoActions = function(){
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

Hangar.prototype.getBoostDiv = function(){
	return false;
}

Hangar.prototype.setMount = function(amount){
	if (game.getUnitById(aUnit) instanceof Flight){
		return false;
	}
	this.mount = ""
	this.armour =  Math.floor(amount * this.armourMod);
}

Hangar.prototype.getOutput = function(){
	return this.getLaunchRate();
}

Hangar.prototype.getLaunchRate = function(){
	var rate = this.effiency;

	for (var i = 0; i < this.crits.length; i++){
		rate *= this.crits[i].value;
	}
	return Math.ceil(rate);
}

Hangar.prototype.drawArc = function(){
	game.getUnitById(this.parentId).drawSystemAxis(this);
}

Hangar.prototype.enableHangarDeployment = function(e){
	if (game.getUnitById(aUnit).userid != game.userid){
		return false;
	}
	var div = document.getElementById("hangarLoadoutDiv");
		$("#launchRate").html(this.getLaunchRate());
		$("#capacity").html(this.output);
	this.unsetFireOrder();
	this.doUndoActions();
	this.showHangarControl();

	if ($(div).hasClass("disabled")){
		$(div).data("systemid", this.id).css("top", e.clientY + 150).css("left", e.clientX - 150).removeClass("disabled");
	}
	else {
		$(div).addClass("disabled");
	}
}

Hangar.prototype.showHangarControl = function(){
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

	var button = $("#hangarLoadoutDiv");
		$(button).find("input").off().on("click", {systemid: id}, launchFlight);
	//console.log(button);

	if (this.canLaunchFlight()){
		$(button).find("input").removeClass("disabled");
	} else $(button).find("input").addClass("disabled");
}

Hangar.prototype.doLaunchFlight = function(){
	for (var i = game.ships.length-1; i >= 0; i--){
		if (game.ships[i].userid == game.userid){
			if (game.ships[i].flight){
				if (!game.ships[i].actions[0].resolved){
					if (game.ships[i].launchdata.shipid == window.aUnit && game.ships[i].launchdata.systemid == this.id){
						//console.log("splice");
						//this.unsetFireOrder();
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

Hangar.prototype.alterFlight = function(ele, max){
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

Hangar.prototype.canLaunchFlight = function(){
	if (this.canFire()){
		for (var i = 0; i < this.loads.length; i++){
			if (this.loads[i].launch >= 1){
				return true;
			}
		}
	}
	return false;
}

Hangar.prototype.addFighter = function(ele, all){
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

Hangar.prototype.removeFighter = function(ele, all){
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

Hangar.prototype.updateTotals = function(){
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

Hangar.prototype.setupHangarLoadout = function(e){
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

Hangar.prototype.getSystemDetailsDiv = function(){
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