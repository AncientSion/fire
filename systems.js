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
	this.mirror = system.mirror;
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
	this.launcher = 0;
	this.hangar = 0;
	this.validTarget = 0;
	this.internal = system.internal;
	this.tiny = system.tiny;
	this.img;
	this.usage = system.usage;
	this.freeAim = system.freeAim;
}

System.prototype.getDisplay = function(){
	return this.display;
}

System.prototype.getResolvingFireOrders = function(){
	for (var i = this.fireOrders.length-1; i >= 0; i--){
		if (this.fireOrders[i].turn == game.turn){
			for (var j = 0; j < this.fireOrders[i].req.length; j++){
				if (this.fireOrders[i].req[j] > 0){
					return this.fireOrders[i];
				}
			}
		} else return false;
	}
	return false;
}

System.prototype.hasLoad = function(){
	for (var i = 0; i < this.loads.length; i++){
		if (this.loads[i].amount){
			return true;
		}
	}
	return false;
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
				if (this.boostEffect[i].type == "Reload" || this.boostEffect[i].type == "Shots"){
					var html = this.boostEffect[i].type + ": " + (this.boostEffect[i].value * boost);
				}		
				else {
					var mod = "";
					if (this.boostEffect[i].value > 0 && this.boostEffect[i].value){
						mod = "+";
					}
					var html = this.boostEffect[i].type + ": " + mod + (this.boostEffect[i].value * boost) + "%";
				}
				$(table[0]).append($("<tr>").append($("<td>").html(html).attr("colSpan", 2).addClass("positive")));
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
	this.adjustStateByCritical();
	
	if (this.isDestroyed()){
		this.destroyed = true;
	}
	else {
		if (game.phase == -1 && game.turn > 1){
			for (var i = this.powers.length-1; i >= 0; i--){
				if (this.powers[i].turn == game.turn-1){
					this.copyPowers();
					break;
				}
				else if (this.powers[i].turn < game.turn -1){
					break;
				}
			}
		}
		if (this.isUnpowered()){
			this.disabled = true;
		}
		//this.setTimeLoaded();
	}
}

System.prototype.getSystem = function(){
	return this;
}

System.prototype.getActiveSystem = function(){
	return this;
}

System.prototype.hover = function(e){
	if (game.flightDeploy){return false;}

	var p = game.getUnit(this.parentId);

	if (this.highlight){
		this.highlight = false;
		this.hideInfoDiv(e);
		this.hideOptions();
		p.highlightAllSelectedWeapons();
		if (this.hasUnresolvedFireOrder()){
			salvoCtx.clearRect(0, 0, res.x, res.y);
			p.drawEW();
			game.drawEvents();
		}
	}
	else {
		this.highlight = true;
		this.showInfoDiv(e);
		this.showOptions();
		if (p.ship || p.squad){
			fxCtx.clearRect(0, 0, res.x, res.y);
			fxCtx.translate(cam.o.x, cam.o.y);
			fxCtx.scale(cam.z, cam.z);
			this.drawSystemArc(p.getPlannedFacing(), p.rolled, p.getPlannedPos());
			fxCtx.setTransform(1,0,0,1,0,0);
		}
		if (this.hasUnresolvedFireOrder()){
			this.highlightFireOrder();
		}
	}
}

System.prototype.highlightFireOrder = function(){
	var o = game.getUnit(this.parentId).getPlannedPos();
	var t = game.getUnit(this.fireOrders[this.fireOrders.length-1].targetid).getPlannedPos();
	if (o.x == t.y && o.y == t.y){return;}
	salvoCtx.translate(cam.o.x, cam.o.y);
	salvoCtx.scale(cam.z, cam.z)
	salvoCtx.translate(o.x, o.y);

	salvoCtx.beginPath();
	salvoCtx.moveTo(0, 0);
	salvoCtx.translate(-o.x + t.x, -o.y + t.y);
	salvoCtx.lineTo(0, 0);
	salvoCtx.closePath();

	salvoCtx.strokeStyle = "white";
	salvoCtx.lineWidth = 2;
	salvoCtx.stroke();
	salvoCtx.lineWidth = 1;
	salvoCtx.setTransform(1, 0, 0, 1, 0, 0);
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
			.find(".powerDiv").find(".power").hide().end().find(".unpower").show().end();

			if (this.getActiveSystem().canBeBoosted()){
				ele.find(".boostDiv").show().end()
			}
		} else ele.removeClass("unpowered").find(".outputMask").show();

		if (this.getActiveSystem().hasOutput()){
			ele.find(".outputMask").show().end();
		}
		else ele.find(".outputMask").hide().end();
	}

	if (Object.keys(this.modes).length){
		if (this.getLoadLevel() != 1){return;}
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
	else if (this.usage == game.phase){
		if (this.getLoadLevel() >= 1){
			return true;
		}
	}
	return false;
}
System.prototype.getLoadLevel = function(){
	if (this.disabled || this.destroyed){return 0;}
	
	var need = this.reload;
	var has = this.getTimeLoaded();
	if (has / need > 1){
		return 1;
	}
	else return has/need;
}
System.prototype.setTimeLoaded = function(){

	if (!this.isPowered()){this.loaded = 0; return;}

	var turnsLoaded = this.reload;
	var max = this.reload;
	var boost = this.getBoostEffect("Reload");

	for (var i = 1; i <= game.turn; i++){
		//console.log("Turn " + i);
		if (turnsLoaded < max){
			//console.log("++")
			turnsLoaded++;
		}

		if (boost){
			for (var j = 0; j < this.powers.length; j++){
				if (this.powers[j].turn == i && this.powers[j].type == 1){
					turnsLoaded += -boost;
					//console.log("charge ++")
				}
			}
		}
		for (var j = 0; j < this.fireOrders.length; j++){
			if (this.fireOrders[j].turn == i && this.fireOrders[j].resolved == 1){
				//console.log("fire")
				turnsLoaded = 0;
				break;
			}
		}
		if (turnsLoaded){
			for (var j = 0; j < this.powers.length; j++){
				if (this.powers[j].turn == i && this.powers[j].type == 0){
					//console.log("disabled")
					turnsLoaded = 0;
					break;
				}
			}
			for (var j = 0; j < this.crits.length; j++){
				if (i <= this.crits[j].turn + this.crits[j].duration && this.crits[j].type == "Disabled"){
				//if (this.crits[j].turn + this.crits[j].duration <= i && this.crits[j].type == "Disabled"){
					//console.log("disabled")
					turnsLoaded = 0;
					break;
				}
			}
		}
	}
	this.loaded = turnsLoaded;
	$(this.element).find(".loadLevel").css("width", this.getLoadLevel() * 100 + "%");
	$("#systemDetailsDiv").find(".loading").html(this.getTimeLoaded() + " / " + this.reload);
}

System.prototype.getTimeLoaded = function(){
	return this.loaded// - this.getBoostEffect("Reload") * this.getBoostLevel();
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

System.prototype.getBoostEffectElements = function(table){

	for (var i = 0; i < this.boostEffect.length; i++){
		if (this.boostEffect[i].type == "Reload" || this.boostEffect[i].type == "Shots"){
			var html = this.boostEffect[i].type + ": " + this.boostEffect[i].value;
		}		
		else {
			var mod = "";
			if (this.boostEffect[i].value > 0){
				mod = "+";
			}
			var html = this.boostEffect[i].type + ": " + mod + (this.boostEffect[i].value) + "%";
		}
		$(table).append($("<tr>").append($("<td>").attr("colSpan", 2).html(html)));
	}

	$(table).find("tr").last().css("border-bottom", "2px solid white");
}

System.prototype.getBoostDiv = function(){
	if (this.destroyed || !this.effiency){return};
	//if (this.boostEffect.length == 1 && this.boostEffect[0].type == "Reload" && this.getLoadLevel() == 1){return;}
	var div = document.createElement("div");
		$(div).addClass("boostDiv").hide()
			.data("shipId", this.parentId)
			.data("systemId", this.id);

	var subDiv = document.createElement("div");
		subDiv.className = "plus";
		subDiv.innerHTML = "<img src='varIcons/plus.png'</img>";
		subDiv.childNodes[0].className = "img100pct";
		$(subDiv).click(function(e){
			e.stopPropagation();
			if (game.phase != -1){return;}
			var data = $(this.parentNode).data();
			game.getUnit(data.shipId).getSystem(data.systemId).plus(false);
		}).contextmenu(function(e){
			e.stopPropagation();
			e.preventDefault();
			if (game.phase != -1){return;}
			var data = $(this.parentNode).data();
			game.getUnit(data.shipId).getSystem(data.systemId).plus(true);
		})
		div.appendChild(subDiv);
	var subDiv = document.createElement("div");
		subDiv.className = "minus";
		subDiv.innerHTML = "<img src='varIcons/minus.png'</img>";
		subDiv.childNodes[0].className = "img100pct";
		$(subDiv).click(function(e){
			e.stopPropagation();
			if (game.phase != -1){return;}
			var data = $(this.parentNode).data();
			game.getUnit(data.shipId).getSystem(data.systemId).minus(false);
		}).contextmenu(function(e){
			e.stopPropagation();
			e.preventDefault();
			if (game.phase != -1){return;}
			var data = $(this.parentNode).data();
			game.getUnit(data.shipId).getSystem(data.systemId).minus(true);
		})
		div.appendChild(subDiv);
	return div;
}

System.prototype.getPowerDiv = function(){
	if (this.destroyed || !this.powerReq){return};
	var div = document.createElement("div");
		$(div).addClass("powerDiv")
		.data("shipId", this.parentId)
		.data("systemId", this.id);

	var subDiv = document.createElement("div");
		subDiv.className = "power";
		subDiv.innerHTML = "<img src='varIcons/power.png'</img>";
		subDiv.childNodes[0].className = "img100pct";
		$(subDiv)
			.hide()
			.click(function(e){
				e.stopPropagation();
				if (game.phase != -1){return;}
				var data = $(this.parentNode).data();
				game.getUnit(data.shipId).getSystem(data.systemId).doPower();
			})
			.contextmenu(function(e){
				e.stopPropagation(); e.preventDefault();
				if (game.phase != -1){return;}
				var data = $(this.parentNode).data();
				game.getUnit(data.shipId).doPowerAll(data.systemId);
			})
		div.appendChild(subDiv);
	var subDiv = document.createElement("div");
		subDiv.className = "unpower";
		subDiv.innerHTML = "<img src='varIcons/unpower.png'</img>";
		subDiv.childNodes[0].className = "img100pct";
		$(subDiv)
			.hide()
			.click(function(e){
				e.stopPropagation();
				if (game.phase != -1){return;}
				var data = $(this.parentNode).data();
				game.getUnit(data.shipId).getSystem(data.systemId).doUnpower();
			})
			.contextmenu(function(e){
				e.stopPropagation(); e.preventDefault();
				if (game.phase != -1){return;}
				var data = $(this.parentNode).data();
				game.getUnit(data.shipId).doUnpowerAll(data.systemId);
			})
		div.appendChild(subDiv);
	return div;
}

System.prototype.getModeDiv = function(){
	if (this.destroyed || !Object.keys(this.modes).length){return;}
	var div = document.createElement("div");
		$(div).addClass("modeDiv").hide()
		.data("shipId", this.parentId)
		.data("systemId", this.id);

	var subDiv = document.createElement("div");
		subDiv.className = "mode";
		subDiv.innerHTML = "<img src='varIcons/mode.png'</img>";
		subDiv.childNodes[0].className = "img100pct";
		$(subDiv)
			.click(function(e){
				e.stopPropagation(); e.preventDefault();
				var data = $(this.parentNode).data();
				game.getUnit(data.shipId).getSystem(data.systemId).switchMode();
			})
			.contextmenu(function(e){
				e.stopPropagation(); e.preventDefault();
				var data = $(this.parentNode).data();
				game.getUnit(data.shipId).switchModeAll(data.systemId);
			});
		div.appendChild(subDiv);
	return div;
}

System.prototype.getPowerOrders = function(){
	var powers  = [];
	for (var i = 0; i < this.powers.length; i++){
		if (this.powers[i].new){
			powers.push(this.powers[i]);
		}
	}
	return powers;
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
	if (this.powers[this.powers.length-1].turn == game.turn){
		this.powers.splice(this.powers.length-1, 1);	
	}
	if (this.getBoostEffect("Reload")){this.setTimeLoaded();}
}

System.prototype.doBoost = function(){
	//console.log("boost");
	this.powers.push({
		id: this.powers.length+1, unitid: this.parentId, systemid: this.id,
		turn: game.turn,type: 1, cost: this.getEffiency(), new: 1
	})

	if (this.getBoostEffect("Reload")){this.setTimeLoaded();}
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
		game.getUnit(this.parentId).updateShipPower(this);
	}
}
System.prototype.doUnpower = function(){
	if (this.selected){
		this.select();
	}
	if (!this.disabled){
		while (this.canUnboost()){
			this.doUnboost();
		}

		this.powers.push({
			id: this.powers.length+1, unitid: this.parentId, systemid: this.id,
			turn: game.turn, type: 0, cost: 0, new: 1
		})
		this.disabled = 1;
		this.doUndoActions();
		this.setTableRow();
		this.setSystemBorder();
		game.getUnit(this.parentId).updateShipPower(this);
	}
}

System.prototype.doPower = function(){
	if (this.powers.length && this.powers[this.powers.length-1].turn == game.turn && this.powers[this.powers.length-1].type == 0){
		this.powers.splice(this.powers.length-1, 1);
		this.disabled = 0;
		this.setTimeLoaded();
		this.setTableRow();
		game.getUnit(this.parentId).updateShipPower(this);
	}
}

System.prototype.plus = function(max){
	var ship = game.getUnit(this.parentId);
	var change = false;

	if (max){
		while (ship.canBoost(this)){
			this.doBoost();
			change = true;
		}
 	   $("#popupWrapper").hide();
	}
	else if (ship.canBoost(this)){
		this.doBoost();
		change = true;
	}

	if (change){ship.updateShipPower(this);}
}

System.prototype.minus = function(max){
	var ship = game.getUnit(this.parentId);
	var change = false;

	if (max){
		while (this.canUnboost()){
			this.doUnboost();
			change = true;
		}
 	   $("#popupWrapper").hide();
	}
	else if (this.canUnboost()){
		this.doUnboost();
		change = true;
	}

	if (change){ship.updateShipPower(this);}
}

System.prototype.canChangeMode = function(){
	if (!(Object.keys(this.modes).length)){
		return false;
	}
	else if (this.getLoadLevel() >= 1){
		return true;
	} else return false;
}

System.prototype.showOptions = function(){
	if (game.phase != -1 || game.getUnit(this.parentId).userid != game.userid || this.destroyed || this.locked){return;}

	var ele = $(this.element);
	var boost = this.effiency;
	var canModeChange = this.canChangeMode();
	var canPower = this.canPower();
	var canUnpower = this.canUnpower();

	if (canPower){
		boost = false;
		canModeChange = false;
	}
	else if (boost && this.weapon){
		if (this.getLoadLevel() != 1){
			if (this.getBoostEffect("Reload")){
				boost = true;
			}
		} else boost = true;
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

System.prototype.hideOptions = function(){

	if (this.destroyed || this.locked || game.getUnit(this.parentId).userid != game.userid){return;}
	var ele = $(this.element);

	if (game.phase == -2){
		if (Object.keys(this.modes).length){
			ele.find(".modeDiv").hide();
		}
	}
	if (game.phase == -1){
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

System.prototype.showInfoDiv = function(e){
	$(document.body).append(
		$(this.getSystemDetailsDiv())
			.css("left", e.clientX - 90)
			.css("top", e.clientY + 50)
		)
	return;
}

System.prototype.setFireOrder = function(targetid, pos){
	if (this.odds <= 0){return;}
	this.fireOrders.push(
		{id: 0, turn: game.turn, shooterid: this.parentId, targetid: targetid, x: pos.x, y: pos.y, weaponid: this.id, 
		shots: 0, req: -1, notes: "", hits: -1, resolved: 0}
	);
	this.selected = 0;
	this.validTarget = 0;
	this.highlight = 0;
	this.setSystemBorder();
}

System.prototype.unsetFireOrder = function(){
	for (var i = this.fireOrders.length-1; i >= 0; i--){
		if (this.fireOrders[i].turn == game.turn){
			this.fireOrders.splice(i, 1);
			this.setSystemBorder();
			return;
		}
	}
}

System.prototype.hideInfoDiv = function(){
	$("#systemDetailsDiv").remove();
}

System.prototype.getImageName = function(){
	return this.name;
}

System.prototype.canBeBoosted = function(){
	return this.boostEffect.length;
}

System.prototype.hasOutput = function(){
	if (this.boostEffect.length || this.output){
		return true;
	}
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
				var outputDiv = document.createElement("div");
					outputDiv.className = "outputMask";
					if (this.internal || this.getActiveSystem().canBeBoosted()){
						outputDiv.innerHTML = this.getActualOutput();
					}
					else $(outputDiv).hide();
					td.appendChild(outputDiv);
			//}
		}
	}

	$(td).data("systemId", this.id);
	this.element = td;

	this.setTimeLoaded();
	this.setTableRow();
	this.setSystemBorder();
	return this.element;
}

System.prototype.getActualOutput = function(){
	return this.getOutput();
}

System.prototype.getDiv = function(){
	var returnDiv = document.createElement("div");
		returnDiv.className = "system";
	var file = "sysIcons/" + this.getImageName() + ".png";

	var img = new Image();
		img.className = "sysIcon";
		img.src = file;
		//img.style.top = "10px";
	returnDiv.appendChild(img);


	var div = document.createElement("div");
		div.className = "loadLevel";
		returnDiv.appendChild(div);

	var div = document.createElement("div");
		div.className = "bgloadlevel";
		returnDiv.appendChild(div);

	/*
	var lowerDiv = document.createElement("div");
		lowerDiv.className = "integrityNow";
		lowerDiv.style.width = this.getRemainingIntegrity() /  this.integrity * 100 + "%";
		returnDiv.appendChild(lowerDiv);

	var div = document.createElement("div");
		div.className = "integrityFull";
		returnDiv.appendChild(div);
	*/
	if (1){		
		var outputDiv = $("<div>").addClass("outputMask");
		if (this.internal || this.getActiveSystem().canBeBoosted()){
			outputDiv.html(this.getOutput());
		} else outputDiv.hide();
	}	
	
	$(returnDiv).append(outputDiv).data("systemId", this.id);
	this.element = returnDiv;

	this.setTimeLoaded();
	this.setTableRow();
	this.setSystemBorder();
	return this.element;
}

System.prototype.hasUnresolvedFireOrder = function(){
	return false;
}

System.prototype.update = function(){
	this.updateSystemDetailsDiv();
	$(this.element).find(".outputMask").html(this.getOutput());
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

	if (this instanceof PrimarySystem && !(this instanceof Hangar)){return;}
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
				case "Destroyed":
					this.destroyed = true;
					break;
				default:
					continue;
			}
		}
	}
}

System.prototype.getMount = function(){
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
	return Math.floor(extra/100);
}

System.prototype.getPowerReq = function(){
	return this.powerReq;
}

System.prototype.getPowerReqString = function(){
	return (this.powerReq + " + " + (this.getCurrentPowerUsage() - this.powerReq));
}

System.prototype.getCurrentPowerUsage = function(){
	var usage = this.powerReq || 0;
	for (var i = this.powers.length-1; i >= 0; i--){
		if (this.powers[i].turn == game.turn && this.powers[i].type > 0){
			usage += this.powers[i].cost;
		} else break;
	}
	return usage;
}

System.prototype.getEffiency = function(){
	var boost = this.getBoostLevel();

	return Math.floor(this.effiency * (1+(boost * this.getBoostCostIncrease())));
}

System.prototype.getBoostCostIncrease = function(){
	return 0;
}

System.prototype.getBoostEffect = function(val){
	for (var i = 0; i < this.boostEffect.length; i++){
		if (this.boostEffect[i].type == val){
			return this.boostEffect[i].value;
		}
	}
	return 0;
}

System.prototype.drawSystemArc = function(facing, rolled, pos){
	if (game.animating ||  this.tiny){return;}

	/*if (rolled){
			var d = this.getArcCenter();
			var w = this.getArcWidth();
			var inverse = 0 - d;
			if (start < end){start = inverse - w/2;end = inverse + w/2;}
			else {start = inverse + w/2;end = inverse - w/2;}
		}*/
	for (var i = 0; i < this.arc.length; i++){
		var	start;
		var	end;

		if (rolled){
			start = 360 - this.arc[i][1];
			end = 360 - this.arc[i][0];
		}
		else {
			start = this.arc[i][0];
			end = this.arc[i][1];
		}
		
		var p1 = getPointInDirection(1200, start+facing, pos.x, pos.y);
		var p2 = getPointInDirection(1200, end+facing, pos.x, pos.y)
		var dist = getDistance( {x: pos.x, y: pos.y}, p1);
		var rad1 = degreeToRadian(start+facing);
		var rad2 = degreeToRadian(end+facing);

		fxCtx.globalAlpha = 1;
		fxCtx.beginPath();			
		fxCtx.moveTo(pos.x, pos.y);
		fxCtx.arc(pos.x, pos.y, dist, rad1, rad2, false);
		fxCtx.closePath();		
		fxCtx.fillStyle = this.getFillStyle(pos.x, pos.y, dist);
		fxCtx.fill();
		fxCtx.globalAlpha = 1;
	}
}

System.prototype.hasEvent = function(){
	return false;
}

function PrimarySystem(system){
	System.call(this, system);
	this.exposed = 0;
	this.maxDmg = system.maxDmg;
}
PrimarySystem.prototype = Object.create(System.prototype);

PrimarySystem.prototype.getEffiency = function(){
	var boost = this.getBoostLevel();

	return Math.max(this.effiency+boost, Math.ceil(this.effiency * (1+(boost * this.getBoostCostIncrease()))));
}

System.prototype.getBoostCostIncrease = function(){
	return 0;
}

PrimarySystem.prototype.setTimeLoaded = function(){
	this.loaded = 1;
	$(this.element).find(".loadLevel").css("width", this.getLoadLevel() * 100 + "%");
}

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
	var output;
	var mod;

	if (this.disabled || this.destroyed){
		output = 0;
		mod = 0;
	}
	else {
		output = this.output + this.getExtraOutput();
		mod = this.getOutputReduction();
	}

	var usage = this.getOutputUsage();

	return output - mod - usage;
}

PrimarySystem.prototype.getOutputUsage = function(){
	return 0;
}

PrimarySystem.prototype.getOutputCrits = function(){
	var mod = 0;
	for (var i = 0; i < this.crits.length; i++){
		if (this.crits[i].inEffect()){
			mod -= this.crits[i].value;
		}
	}
	return mod;
}

System.prototype.getOutputReduction = function(){
	var mod = this.getOutputCrits();

	if (!mod){return 0;}
	else return Math.abs(Math.round(this.output / 100 * mod));
}

PrimarySystem.prototype.getOutputString = function(){
	var effect = 100  + this.getOutputCrits();
	return this.output + " + " + Math.floor(this.getExtraOutput()/100*effect) + " - " + this.getOutputReduction();
}

PrimarySystem.prototype.getBoostCostIncrease = function(){
	return 0.35;
}

PrimarySystem.prototype.getSystemDetailsDiv = function(){
	var unit = game.getUnit(this.parentId);
	var table = $("<table>");
	var div = $("<div>").attr("id", "systemDetailsDiv")
	
	$(table).append($("<tr>").append($("<th>").html(this.display).attr("colSpan", 2)));

	if (unit.squad){
		if (this.output){
			$(table).append($("<tr>").append($("<td>").html("Current Output")).append($("<td>").addClass("output").html(this.getOutputString())));
		}
		if (this.modes.length){
			$(table).append($("<tr>").append($("<td>").html("Sensor Mode")).append($("<td>").addClass("sensorMode negative").html(this.getEWMode())));
			$(table).append($("<tr>").append($("<td>").attr("colSpan", 2).addClass("sensorEffect").html(this.getEWModeEffect())));
		}
	}
	else if (unit.ship){
		$(table).append($("<tr>").append($("<td>").css("width", "60%").html("Integrity")).append($("<td>").html(this.getRemainingIntegrity() + " / " + this.integrity)));
		$(table).append($("<tr>").append($("<td>").html("Max Damage per hit")).append($("<td>").html(this.maxDmg)));

		if (this.output){
			$(table).append($("<tr>").append($("<td>").html("Current Output")).append($("<td>").addClass("output").html(this.getOutputString())));
		}
		if (this.powerReq){
			$(table).append($("<tr>").append($("<td>").html("Power Req")).append($("<td>").addClass("powerReq").html(this.getPowerReqString())));
		}
		if (this.effiency){
			$(table).append($("<tr>").css("border-top", "2px solid white").append($("<td>").html("Boost Power Cost")).append($("<td>").addClass("powerCost").html(this.getEffiency())));
			this.getBoostEffectElements(table);
		}
		if (this.modes.length){
			$(table).append($("<tr>").append($("<td>").html("Sensor Mode")).append($("<td>").addClass("sensorMode negative").html(this.getEWMode())));
			$(table).append($("<tr>").append($("<td>").attr("colSpan", 2).addClass("sensorEffect").html(this.getEWModeEffect())));
		}
	}
	
	this.attachDetailsMods(div.append(table));
	return div;

}

PrimarySystem.prototype.updateSystemDetailsDiv = function(){
	var output = this.getOutputString();
	var powerReq = this.getPowerReqString();
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
		$("#systemDetailsDiv").find(".sensorMode").html(this.getEWMode()).end().find(".sensorEffect").html(this.getEWModeEffect());
	}
	this.attachDetailsMods(ele);
}

function Engine(system){
	PrimarySystem.call(this, system);
}
Engine.prototype = Object.create(PrimarySystem.prototype);

Engine.prototype.getPowerDiv = function(){
	return;
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
	var ship = game.getUnit(this.parentId);
	for (var i = 0; i < ship.structures.length; i++){
		use += ship.structures[i].getCurrentPowerUsage();
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
	this.used = 0;
}
Sensor.prototype = Object.create(PrimarySystem.prototype);

function Cyber(system){
	Sensor.call(this, system)
	this.ew = system.ew;
	this.modes = system.modes;
	this.states = system.states;
	this.used = 0;
}
Cyber.prototype = Object.create(Sensor.prototype);

Sensor.prototype.switchMode = function(id){
	if (this.destroyed || this.disabled || this.locked){return false;}
	this.used = 1;

	var index = 0;
	for (var i = 0; i < this.states.length; i++){
		if (this.states[i]){
			this.states[i] = 0;
			index = i
			if (index+1 >= this.states.length){
				index = 0;
			} else index++;

			this.states[index] = 1;
			this.setEWMode()
			return;
		}
	}
}

Sensor.prototype.setEWMode = function(){
	if (this.disabled || game.phase == -2){return "NONE";}

	var d = 0;
	var w = 0;

	for (var i = 0; i < this.states.length; i++){
		if (this.states[i]){
			this.ew[this.ew.length-1].type = i;
			this.setTempEW();
			salvoCtx.clearRect(0, 0, res.x, res.y);
			this.drawEW();
			break;
		}
	}
	this.updateSystemDetailsDiv();
}

Sensor.prototype.getEWMode = function(){
	if (this.disabled || game.phase == -2){return "NONE";}

	for (var i = 0; i < this.states.length; i++){
		if (this.states[i]){
			return this.modes[i];
		}
	}
}

Sensor.prototype.getEWModeEffect = function(){
	if (!this.ew.length){return;}
	switch (this.ew[this.ew.length-1].type){
		case 0: return ("Increases chance to hit units within sensor arc.");
		case 1: return ("Increases chance to evade incoming weapons-fire.");

		//case 0: return ("Increases chance to hit targets within red sensor arc by " + (game.const.ew.effect[this.ew[this.ew.length-1].type]*100) + "%");
		//case 1: return ("Decreases chance to be hit by starships within blue sensor arc by " + (game.const.ew.effect[this.ew[this.ew.length-1].type]*100) + "%");
	}
}

Sensor.prototype.setState = function(){
	System.prototype.setState.call(this);
	if (game.phase == -1){
		this.setEW({
			angle: -1,
			dist: Math.ceil(this.getOutput() / Math.pow(180/game.const.ew.len, 1/game.const.ew.p)),
			turn: game.turn,
			unitid: this.parentId,
			systemid: this.id,
			type: 0
		});
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
	if (this.powers.length && this.powers[this.powers.length-1].turn == game.turn && this.powers[this.powers.length-1].type == 0){
		this.powers.splice(this.powers.length-1, 1);
		this.disabled = 0;
		this.setEW({
			angle: -1,
			dist: Math.ceil(this.getOutput() / Math.pow(180/game.const.ew.len, 1/game.const.ew.p)),
			turn: game.turn,
			unitid: this.parentId,
			systemid: this.id,
			type: 0
		})
		this.setTempEW();
		salvoCtx.clearRect(0, 0, res.x, res.y);
		this.drawEW();
		this.setTableRow();
		game.getUnit(this.parentId).updateShipPower(this);
	}
}

Sensor.prototype.doUnpower = function(){
	System.prototype.doUnpower.call(this);
	salvoCtx.clearRect(0, 0, res.x, res.y);
	this.drawEW();
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
		}
		return;
}

Sensor.prototype.getEW = function(data){
	for (var i = this.ew.length-1; i >= 0; i--){
		if (this.ew[i].turn == game.turn){
			return this.ew[i];
		}
	}
	return false;
}

Sensor.prototype.drawEW = function(){
	if (!this.ew.length){
		return;
	}
	else if (this.img == undefined){

		console.log("NO EW DEFINED!");
		this.setTempEW();
		this.drawEW();
		/*
		var ship = game.getUnit(this.parentId);
		var loc = ship.getPlannedPos();
		var ew = this.ew[this.ew.length-1];
		var str = this.getOutput();
		var facing = ship.getPlannedFacing();
		var w;
		if (ew.angle == -1){w = 180;}
		else w = Math.min(180, game.const.ew.len * Math.pow(str/ew.dist, game.const.ew.p));

		drawSensorArc(w, ew.dist, str, loc, facing, ew.angle, this);
		*/
	}
	else {
		var ship = game.getUnit(this.parentId);
		var loc = ship.getPlannedPos();

		salvoCtx.translate(cam.o.x, cam.o.y);
		salvoCtx.scale(cam.z, cam.z);
		salvoCtx.translate(loc.x, loc.y);
		//salvoCtx.rotate(a * Math.PI/180);
		salvoCtx.drawImage(this.img, -this.img.width/2 , -this.img.height/2, this.img.width, this.img.height);
		salvoCtx.setTransform(1,0,0,1,0,0);
	}
}

Sensor.prototype.setTempEW = function(){
	if (game.phase == -2){return;}
	if (!this.isPowered()){return;}
	if (!this.ew.length){return;}
	var ship = game.getUnit(this.parentId);
	var loc = {x: 0, y: 0}
	var ew = this.ew[this.ew.length-1];
	var str = this.getOutput();
	var facing = ship.getPlannedFacing();
	var w;
	if (ew.angle == -1){w = 180;}
	else w = Math.min(180, game.const.ew.len * Math.pow(str/ew.dist, game.const.ew.p));

	//drawSensorArc(w, ew.dist, str, loc, facing, ew.angle, this);

	var t = document.createElement("canvas");
		t.width = ew.dist*2;
		t.height = ew.dist*2;		
	var ctx = t.getContext("2d");
		ctx.translate(t.width/2, t.height/2);
		ctx.globalAlpha = 0.8;
		var color = "";
		var opacity = 0.2;

		switch (this.ew[this.ew.length-1].type){
			case 0: color = "red"; break;
			case 1: color = "blue"; break;
		}

		//salvoCtx.clearRect(0, 0, res.x, res.y);
		//salvoCtx.translate(cam.o.x, cam.o.y);
		//salvoCtx.scale(cam.z, cam.z);

		//w = Math.ceil(w);	
		if (w == 180){
			ctx.beginPath();
			ctx.arc(loc.x, loc.y, ew.dist, 0, 2*Math.PI, false);
			ctx.closePath();
		}
		else {
			var start = addAngle(0 + w-facing, ew.angle);
			var end = addAngle(360 - w-facing, ew.angle);
			//console.log(start, end);
			var p1 = getPointInDirection(str, start, loc.x, loc.y);
			var rad1 = degreeToRadian(start);
			var rad2 = degreeToRadian(end);
			ctx.beginPath();			
			ctx.moveTo(loc.x, loc.y);
			ctx.lineTo(p1.x, p1.y); 
			ctx.arc(loc.x, loc.y, ew.dist, rad1, rad2, false);
			ctx.closePath();
		}

		ctx.globalAlpha = opacity;
		ctx.fillStyle = color;
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.setTransform(1,0,0,1,0,0);

		this.img = t;
}

Sensor.prototype.select = function(e){
	console.log(this);
	var id = this.id;
	var parentId = this.parentId;
	var selected = false;
	var unit;

	if (this.selected){
		this.selected = false;
		game.sensorMode = 0;
		this.setSystemBorder();
	}
	else if (this.destroyed || this.disabled || this.locked || this.parentId != aUnit || aUnit < 0 || this.getEWMode() == "Sweep" || this.getEWMode() == "Mask"){
		return false;
	}
	else {
		unit = game.getUnit(parentId);
		if (unit.hasWeaponsSelected()){
			return;
		} else if (!unit.friendly){return;}
		else {
			this.selected = true;
			game.sensorMode = 1;
			this.used = 1;
			this.setSystemBorder();
			//this.drawEW();
		}
	}
}

Sensor.prototype.hover = function(e){
	PrimarySystem.prototype.hover.call(this, e);
	if (game.phase == -2){return;}
	if (this.highlight && aUnit && aUnit != this.parentId){
		this.drawEW();
	}
}

Sensor.prototype.doBoost = function(){
	System.prototype.doBoost.call(this);
	mouseCtx.clearRect(0, 0, res.x, res.y);
	if (this.ew[this.ew.length-1].angle == -1){
		this.ew[this.ew.length-1].dist = Math.floor(this.ew[this.ew.length-1].dist * 1.1);
	}
	//game.drawShipOverlays();
	game.sensorMode = 1;
	this.setTempEW();
	salvoCtx.clearRect(0, 0, res.x, res.y);
	this.drawEW();
	game.sensorMode = 0;
}

Sensor.prototype.doUnboost = function(){
	System.prototype.doUnboost.call(this);
	mouseCtx.clearRect(0, 0, res.x, res.y);
	if (this.ew[this.ew.length-1].angle == -1){
		this.ew[this.ew.length-1].dist = Math.floor(this.ew[this.ew.length-1].dist / 1.1);
	}
	//game.drawShipOverlays();
	game.sensorMode = 1;
	this.setTempEW();
	salvoCtx.clearRect(0, 0, res.x, res.y);
	this.drawEW();
	game.sensorMode = 0;
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
	this.exploSize = 2+((this.minDmg+this.maxDmg)/30);
	this.odds = 0;
}
Weapon.prototype = Object.create(System.prototype);

Weapon.prototype.getDmgsPerShot = function(fire){
	return 1;
}

Weapon.prototype.hasFireOrder = function(){
	for (var i = this.fireOrders.length-1; i >= 0; i--){
		if (this.fireOrders[i].turn == game.turn){
			return true;
		}
	}
	return false;
}

Weapon.prototype.getRangeDmgMod = function(){
	var mod = 100;
	if (this instanceof Laser || this instanceof Plasma){
		mod += this.getCritEffect("Damage loss");
		mod += this.getBoostEffect("Damage loss") * this.getBoostLevel();
	}
	return mod / 100;
}
	
Weapon.prototype.getDmgLoss = function(dist){
	if (this instanceof Laser){
		if (dist < this.optRange){
			dist = this.optRange - dist;
		} else dist = dist - this.optRange;
	}
	else if (this instanceof Plasma){
	}
	else return 0;

	return Math.ceil(this.dmgLoss * dist / 100 * this.getRangeDmgMod());
}

Weapon.prototype.getAimData = function(target, final, dist, row){
	var dmgLoss = this.getDmgLoss(dist);
	var accLoss = this.getAccuracyLoss(dist);

	if (dmgLoss){
		row.append($("<td>").addClass("red").html(" -" + dmgLoss + "%"));
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
	} else row.append($("<td>").html("<span class='red'>-"+ Math.floor(final / 5 * traverseMod) + "% </span> (-" + traverseMod + ")"));

	if (accLoss){
		row.append($("<td>").addClass("red").html(" -" + accLoss + "%"));
	} else row.append($("<td>").html(""));

	final = Math.floor(final * (1-(traverseMod*0.2)) - accLoss);
	this.validTarget = 1;
	this.odds = final;

	row.append($("<td>").html(final + "%"));
}

Weapon.prototype.getAimDataLocation = function(accLoss, row){
	row.append($("<td>").html(""));
	if (accLoss){
		row.append($("<td>").addClass("red").html(" -" + accLoss + "%"));
	} else {			
		row.append($("<td>").html(""));
	}

	row.append($("<td>").html(""));
}

Weapon.prototype.doUndoActions = function(){
	this.unsetFireOrder();
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

	if (game.sensorMode){
		var sensor = game.getUnit(this.parentId).getSystemByName("Sensor");
		var str = sensor.getOutput();
		var center = this.getArcCenter();
		var	w = this.getArcWidth() /2;
		if (w == 180){a = -1;}
		var d = str/Math.pow(w/game.const.ew.len, 1/game.const.ew.p);

		sensor.setEW({
			angle: center,
			dist: Math.floor(d),
			turn: game.turn,
			unitid: this.parentId,
			systemid: sensor.id,
			type: sensor.ew[sensor.ew.length-1].type
		});
		salvoCtx.clearRect(0, 0, res.x, res.y);
		game.getUnit(this.parentId).drawEW();
		return;
	}
	else if (this.destroyed || this.disabled || this.locked || this.parentId != aUnit || this.parentId < 0){
		return false;
	}
	else {
		unit = game.getUnit(this.parentId);
		if (unit.flight && !unit.cc.length || unit.ship && unit.hasSystemSelected("Sensor")){
			return false;
		}
		else if (this.getLoadLevel() >= 1){
			if (this.hasUnresolvedFireOrder()){
				this.unsetFireOrder();
			}
			if (this.selected){
				this.selected = false;
				this.validTarget = 0;
			}
			else if(!unit.hasHangarSelected()){
				this.selected = true;
			}
		}

		this.setSystemBorder();
	}

	if ((unit.ship || unit.squad) && unit.hasWeaponsSelected()){
		game.mode = 2;
		unit.highlightAllSelectedWeapons();
	}
	else {
		$("#weaponAimTableWrapper").hide();
		game.mode = 1;
		fxCtx.clearRect(0, 0, res.x, res.y);
	}
}

Weapon.prototype.getArcCenter = function(){
	var w = (this.arc[0][0] + this.arc[0][1]) / 2;

	if (w == 180){ 
		if (this.arc[0][1] < this.arc[0][0]){
			return 0;
		}
	}
	return w;
}

Weapon.prototype.getArcWidth = function(){
	if (this.arc[0][0] < this.arc[0][1]){
		return this.arc[0][1] - this.arc[0][0];
	}
	else if (this.arc[0][0] > this.arc[0][1]){
		return 360 - this.arc[0][0] + this.arc[0][1];
	}
}

Weapon.prototype.setMount = function(amount){
	this.armour = Math.floor(amount * this.armourMod);
	var w = this.getArcWidth();

	switch (this.armourMod){
		case 0.75: this.mount = "Fixed"; return;
		case 0.6: this.mount = "Embedded"; return;
		case 0.45: this.mount = "Turret"; return;
	}
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
	$(table).append($("<tr>").append($("<td>").html("Weapon Type").css("width", "60%")).append($("<td>").html(this.type)));

	//if (game.getUnit($(this.element).data("shipId")).ship){
	if (game.getUnit(this.parentId).ship){
		$(table).append($("<tr>").append($("<td>").html("Integrity")).append($("<td>").html(this.getRemainingIntegrity() + " / " + this.integrity)));
		$(table).append($("<tr>").append($("<td>").html("Mount / Armour")).append($("<td>").html(this.getMount())));
	}

	$(table).append($("<tr>").append($("<td>").html("Power Req")).append($("<td>").addClass("powerReq").html(this.getPowerReqString())));
	if (this.boostEffect.length && !(this instanceof Launcher)){
		$(table).append($("<tr>").css("border-top", "2px solid white").append($("<td>").html("Boost Power Cost")).append($("<td>").addClass("powerCost").html(this.getEffiency() + " (max: " + this.maxBoost + ")")));
		this.getBoostEffectElements(table);
	}
	$(table).append($("<tr>").append($("<td>").html("Loading")).append($("<td>").addClass("loading").html(this.getTimeLoaded() + " / " + this.reload)));

	if (this instanceof Launcher){
		if (this.ammo != undefined){
			$(table).append($("<tr>").append($("<th>").css("border-top", "1px solid white").attr("colSpan", 2).html(this.loads[this.ammo].name)));
			$(table).append($("<tr>").append($("<th>").attr("colSpan", 2).html(this.loads[this.ammo].display)));
			$(table).append($("<tr>").append($("<td>").html("Ammo amount")).append($("<td>").html("<span class='red'>" + this.getRemainingAmmo() + "</span> / " + this.getMaxAmmo()).attr("id", "ammo")));
			$(table).append($("<tr>").append($("<td>").html("Tracking")).append($("<td>").html(this.getTraverseRating() + " / " + game.getUnitType(this.getTraverseRating()))));
			$(table).append($("<tr>").append($("<td>").html("Thrust")).append($("<td>").html(this.getImpulseString())));
			//$(table).append($("<tr>").append($("<td>").html("Launch Rate")).append($("<td>").html("<span class='red' id='detailShots'>" + this.getOutput() + "</span> / " + this.launchRate[this.ammo])));
			$(table).append($("<tr>").append($("<td>").html("Launch Rate")).append($("<td>").html("Up to <span class='red'>" + this.launchRate[this.ammo] + "</span> per cycle")));
		}
	}
	else if (this instanceof Laser){
		$(table).append($("<tr>").append($("<td>").html("Tracking")).append($("<td>").html(this.getTraverseRating() + " / " + game.getUnitType(this.getTraverseRating()))));
		$(table).append($("<tr>").append($("<td>").html("Focus point")).append($("<td>").html(this.optRange + "px")));
		$(table).append($("<tr>").append($("<td>").html("Damage loss")).append($("<td>").html(this.getDmgLoss(this.optRange+100) + "% per 100px")));
		$(table).append($("<tr>").append($("<td>").html("Accuracy loss")).append($("<td>").addClass("accuracy").html(this.getAccuracy() + "% per 100px")));
	}
	else {
		$(table).append($("<tr>").append($("<td>").html("Tracking")).append($("<td>").html(this.getTraverseRating() + " / " + game.getUnitType(this.getTraverseRating()))));
		if (this instanceof Plasma){
			$(table).append($("<tr>").append($("<td>").html("Damage loss")).append($("<td>").html(this.getDmgLoss(100) + "% per 100px")));
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

	$(table).append($("<tr>").append($("<td>").html("Damage")).append($("<td>").addClass("damage").html(this.getDmgString())));

	if (this.notes.length){
		$(table).append($("<tr>").addClass("notesHeader").css("border-top", "2px solid white").append($("<th>").html("Notes").attr("colSpan", 2)));
		for (var i = 0; i < this.notes.length; i++){
			$(table).append($("<tr>").append($("<td>").addClass("notesEntry").html(this.notes[i]).attr("colSpan", 2)));
		}
	}

	div.appendChild(table);
	this.attachDetailsMods(div);
		
	return div;
}

Weapon.prototype.updateSystemDetailsDiv = function(){
	var dmg = this.getDmgString();
	var acc = this.getAccuracy();
	var power = this.getPowerReqString()
	var ele = $("#systemDetailsDiv");

	$(ele).find("tr").each(function(i){
		if (this.childNodes.length == 2){
			if (this.childNodes[1].className == "damage"){
				this.childNodes[1].innerHTML = dmg;
			}
			else if (this.childNodes[1].className == "accuracy"){
				this.childNodes[1].innerHTML = acc + "% per 100px";
			}
			else if (this.childNodes[1].className == "powerReq"){
				this.childNodes[1].innerHTML = power;
			}
		}
	})

	this.attachDetailsMods(ele);
}

Weapon.prototype.getAccuracyLoss = function(dist){		
	return Math.ceil(this.getAccuracy()/100 * dist);
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
	var mod = 100;
		mod += this.getCritEffect("Accuracy");
		mod -= this.getBoostEffect("Accuracy") * this.getBoostLevel();

	return Math.round(this.accDecay * mod / 100);
}

Weapon.prototype.getDmgString = function(){
	var mod = this.getDamage();

	if (this.minDmg == this.maxDmg){
		return Math.floor(this.minDmg * mod);
	} else return (Math.floor(this.minDmg*mod) + " - " + Math.floor(this.maxDmg*mod));
}

Weapon.prototype.getDamage = function(){
	var mod = 100;
		mod -= this.getCritEffect("Damage");
		mod += this.getBoostEffect("Damage") * this.getBoostLevel();

	return mod / 100;
}

Weapon.prototype.hasValidTarget = function(){
	if (this.getActiveSystem().validTarget){
		return true;
	} return false;
}

function Area(system){
	Weapon.call(this, system);
	this.aoe = system.aoe;
}
Area.prototype = Object.create(Weapon.prototype);


Area.prototype.getAimData = function(target, final, dist, row){
	if (target){
		row
		.append($("<td>").attr("colSpan", 4).html("<span>Unable to target mobile object.</span>"))
		this.odds = 0;
	}
	else {
		row
		.append($("<td>"))
		.append($("<td>").attr("colSpan", 2).html("</span>Maximal deviation:</span>"))
		.append($("<td>").attr("colSpan", 1).html(Math.floor(dist/10 * this.accDecay) + "<span> px</span>"));
		this.validTarget = 1;
		this.odds = 1;
	}
}

Area.prototype.setFireOrder = function(targetid, pos){
	if (this.odds <= 0){return;}
	this.fireOrders.push(
		{id: 0, turn: game.turn, shooterid: this.parentId, targetid: targetid, x: pos.x, y: pos.y, weaponid: this.id, 
		shots: 0, req: -1, notes: "", hits: -1, resolved: 0}
	);
	this.selected = 0;
	this.validTarget = 0;
	this.highlight = 0;
	this.setSystemBorder();
	game.addEvent(this);
}

Area.prototype.unsetFireOrder = function(){
	System.prototype.unsetFireOrder.call(this);
	game.removeEvent(this);
}

Area.prototype.handleAimEvent = function(origin, target){
	this.drawAreaWeapon(origin, target);
}

Area.prototype.highlightFireOrder = function(){
	return;
}

Area.prototype.highlightEvent = function(){
	var o = game.getUnit(this.parentId);
	var t = this.fireOrders[this.fireOrders.length-1];
	this.drawAreaWeapon(o, t);
}

Area.prototype.drawAreaWeapon = function(o, t){
	salvoCtx.translate(cam.o.x, cam.o.y);
	salvoCtx.scale(cam.z, cam.z)
	salvoCtx.translate(o.x, o.y);

	salvoCtx.beginPath();
	salvoCtx.moveTo(0, 0);
	salvoCtx.translate(-o.x + t.x, -o.y + t.y);
	salvoCtx.lineTo(0, 0);
	salvoCtx.closePath();
	salvoCtx.globalAlpha = 0.3;
	salvoCtx.strokeStyle = "white";
	salvoCtx.lineWidth = 1;
	salvoCtx.stroke();
	salvoCtx.lineWidth = 1;

	salvoCtx.beginPath();
	salvoCtx.arc(0, 0, this.aoe, 0, 2*Math.PI, false);
	salvoCtx.closePath();

	salvoCtx.globalAlpha = 0.2;
	salvoCtx.fillStyle = "red";
	salvoCtx.fill();

	salvoCtx.fillStyle = "white";
	salvoCtx.globalAlpha = 1;
	salvoCtx.setTransform(1, 0, 0, 1, 0, 0);
}

Area.prototype.hasEvent = function(){
	for (var i = this.fireOrders.length-1; i >= 0; i--){
		if (this.fireOrders[i].turn == game.turn){
			return true;
		}
	}
	return false;
}

function Warhead(data){
	this.id = data.id;
	this.parentId = data.parentId;
	this.minDmg = data.minDmg;
	this.maxDmg = data.maxDmg;
	this.shots = data.shots;
	this.traverse = data.traverse;
	this.fireOrders = [];
	this.guns = 1;
	this.animation = "explo";
	this.exploSize = (this.minDmg + this.maxDmg)/15;

	for (var i = 0; i < data.fireOrders.length; i++){
		this.fireOrders.push(new FireOrder(data.fireOrders[i]));
	}
}

Warhead.prototype.getShots = function(){
	return 1;
}

Warhead.prototype.getDmgsPerShot = function(fire){
	return 1;
}

Warhead.prototype.getActiveSystem = function(){
	return this;
}

Warhead.prototype.getResolvingFireOrders = function(){
	return System.prototype.getResolvingFireOrders.call(this);
}

Warhead.prototype.getDisplay = function(){
	return "Ballistic Warhead Impact";
}

Warhead.prototype.getAnimation = function(fire){
	//console.log(this.display + " / " + this.projSpeed + " / " + fire.dist);
	//console.log(fire);
	
	var allAnims = [];
	var grouping = 1;
	var delay = 30;
	var shotInterval = 10;
	var hits = 0;

	var o = game.getUnit(this.parentId);
	var t = game.getUnit(o.mission.targetid);
	var p = t.getPlannedPos();
	//var d = getDistance(o, t.getPlannedPos());
	var a = getAngleFromTo(t.getPlannedPos(), o);
	
	for (var j = 0; j < fire.guns; j++){
		var gunAnims = [];

		for (var k = 0; k < fire.shots; k++){
			var hit = 0;
			if (fire.hits[j] > k){
				hit = 1;
				hits++;
			} else continue;

			var traj = getPointInDirection(t.size/4, a, p.x, p.y);
			var tx = traj.x + range(-t.size/8, t.size/8);
			var ty = traj.y + range(-t.size/8, t.size/8);

			if (fire.target.flight){
				var t = fire.target.getFireDest(fire, hit, hits-1);
					tx = p.x + t.x;
					ty = p.y + t.y;
			}
			var shotAnim = {tx: tx, ty: ty, m: 70, n: 0 - ((j / grouping) * delay + k*shotInterval)};

			gunAnims.push(shotAnim);
		}
		allAnims.push(gunAnims)
	}
	return allAnims;
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
	var speed = this.projSpeed;
	var delay = 30;
	var shotInterval = 10;
	var cc = 0;
	var hits = 0;
	var fraction = 1;
	var t = fire.target.getPlannedPos();

	if (this.shots == 2){
		delay = 60;
	}
	else if (this.shots == 4){
		delay = 80;
	}

	if (fire.target.squad){
		grouping = Math.ceil(fire.guns/2);
	}

	if (game.isCloseCombat(fire.shooter, fire.target)){
		cc = 1;
		if (fire.shooter.ship || fire.shooter.squad){
			fraction = 2;
		}
		else if (fire.shooter.flight && (fire.target.ship || fire.target.squad)){
			fraction = 1.5;
		} 
		else if (fire.shooter.flight){
			fraction = 1.5;
		}
	}
	else if (fire.dist < 200){
		fraction = Math.min(3, 200 / fire.dist);
	}
	else if (fire.dist > 600){
		fraction = Math.max(0.5, 600 / fire.dist);
	}

	speed /= fraction;
	delay *= fraction;
	shotInterval *= fraction;
	
	for (var j = 0; j < fire.guns; j++){
		var gunAnims = [];
		var o = fire.shooter.getWeaponOrigin(fire.systems[j]);

		var ox = fire.shooter.drawX + o.x;
		var oy = fire.shooter.drawY + o.y;

		for (var k = 0; k < this.shots; k++){
			var hit = 0;
			if (fire.hits[j] > k){
				hit = 1;
				hits++;
			}
			
			var dest = fire.target.getFireDest(fire, hit, hits-1);
			
			var tx = t.x + dest.x;
			var ty = t.y + dest.y;

			var shotAnim = new BallVector({x: ox, y: oy}, {x: tx, y: ty}, speed, hit);
				shotAnim.n = 0 - ((j / grouping) * delay + k*shotInterval);

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
	this.dmgLoss = system.dmgLoss;
	this.melt = system.melt;
	this.notes = ["<span class='bold green'>" + this.melt + "%</span> of total damage is added as additional damage to armour"];
}
Plasma.prototype = Object.create(Particle.prototype);

Plasma.prototype.doBoost = function(){
	System.prototype.doBoost.call(this);
	if (this.selected || this.highlight){
		this.redrawSystemArc();
	}
}

Plasma.prototype.doUnboost = function(){
	System.prototype.doUnboost.call(this);
	if (this.selected || this.highlight){
		this.redrawSystemArc();
	}
}

Plasma.prototype.redrawSystemArc = function(){
	fxCtx.clearRect(0, 0, res.x, res.y);
	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z);

	var p = game.getUnit(this.parentId);
	this.drawSystemArc(p.getPlannedFacing(), p.rolled, p.getPlannedPos());
	fxCtx.setTransform(1, 0, 0, 1, 0, 0);
}

Plasma.prototype.getFillStyle = function(x, y, dist){
	var grad = fxCtx.createRadialGradient(x, y, 0, x, y, dist);
	var loss = this.dmgLoss * this.getRangeDmgMod();

	var red = 0.7;
		red = red/loss*10000/dist;
	var yellow = 0.3;
		yellow = yellow/loss*10000/dist;
	var green = 0.0;
		green = green/loss*10000/dist;


	//grad.addColorStop(1, "red");
	grad.addColorStop(Math.min(1, red), "red");
	grad.addColorStop((Math.min(1, red) + Math.max(0, green))/2, "yellow");
	grad.addColorStop(Math.max(0, green), "green");
	grad.addColorStop(0, "green");
			
	return grad;
}


function EM(system){
	Particle.call(this, system);
	this.notes = ["Does no actual damage", "Cause effects if it penetrates Armour"];
}
EM.prototype = Object.create(Particle.prototype);


EM.prototype.getAnimation = function(fire){
	var allAnims = [];
	var grouping = 2;
	var speed = this.projSpeed;
	var delay = 30;
	var shotInterval = 10;
	var cc = 0;
	var hits = 0;
	var fraction = 1;

	if (this.shots == 2){
		delay = 60;
	}
	else if (this.shots == 4){
		delay = 80;
	}

	if (game.isCloseCombat(fire.shooter, fire.target)){
		cc = 1;
		if (fire.shooter.ship || fire.shooter.squad){
			fraction = 2;
		}
		else if (fire.shooter.flight && (fire.target.ship || fire.target.squad)){
			fraction = 1.5;
		} 
		else if (fire.shooter.flight){
			fraction = 1.5;
		}
	}
	else if (fire.dist < 200){
		fraction = Math.min(3, 200 / fire.dist);
	}
	else if (fire.dist > 600){
		fraction = Math.max(0.5, 600 / fire.dist);
	}

	speed /= fraction;
	delay *= fraction;
	shotInterval *= fraction;
	
	for (var j = 0; j < fire.guns; j++){
		var gunAnims = [];
		var o = fire.shooter.getWeaponOrigin(fire.systems[j]);

		var ox = fire.shooter.drawX + o.x;
		var oy = fire.shooter.drawY + o.y;
		var t = fire.target.getPlannedPos();

		for (var k = 0; k < this.shots; k++){
			var hit = 0;
			if (fire.hits[j] > k){
				hit = 1;
				hits++;
			}
			
			var dest = fire.target.getPlannedPos();
			
			var tx = t.x + dest.x;
			var ty = t.y + dest.y;

			var shotAnim = new BallVector({x: ox, y: oy}, {x: tx, y: ty}, speed, hit);
				shotAnim.n = 0 - ((j / grouping) * delay + k*shotInterval);

			gunAnims.push(shotAnim);
		}
		allAnims.push(gunAnims)
	}
	return allAnims;
}

function Pulse(system){
	Particle.call(this, system);
	this.basePulses = system.basePulses;
	this.extraPulses = system.extraPulses;
	this.grouping = system.grouping;
	this.notes = ["Full volley allocates versus single system"];
}
Pulse.prototype = Object.create(Particle.prototype);

Pulse.prototype.getShots = function(){
	return this.shots;
	return this.basePulses + this.extraPulses;
}
	
Pulse.prototype.getAnimation = function(fire){
	var allAnims = [];
	var grouping = 2;
	var speed = this.projSpeed;
	var delay = 30;
	var shotInterval = 4;
	var cc = 0;
	var hits = 0;
	var fraction = 1;

	if (game.isCloseCombat(fire.shooter, fire.target)){
		cc = 1;
		if (fire.shooter.ship || fire.shooter.squad){
			fraction = 2;
		}
		else if (fire.shooter.flight && (fire.target.ship || fire.target.squad)){
			fraction = 1.5;
		} 
		else if (fire.shooter.flight){
			fraction = 1.5;
		}
	}
	else if (fire.dist < 200){
		fraction = Math.min(3, 200 / fire.dist);
	}
	else if (fire.dist > 600){
		fraction = Math.max(0.5, 600 / fire.dist);
	}

	speed /= fraction;
	delay *= fraction;
	shotInterval *= fraction;

	for (var j = 0; j < fire.guns; j++){
		var hasHit = 0;
		var gunAnims = [];
		var gunDelay = Math.floor(j / grouping) * delay;
		var o = fire.shooter.getWeaponOrigin(fire.systems[j]);
		var ox = fire.shooter.drawX + o.x;
		var oy = fire.shooter.drawY + o.y;
		var t = fire.target.getPlannedPos();

		if (fire.hits[j]){
			hasHit = 1;
			hits++;
			//hits += this.basePulses + Math.floor((fire.req[j] - fire.rolls[j]) / this.grouping);
		}

		var dest = fire.target.getFireDest(fire, hasHit, hits-1);
		var tx = t.x + dest.x;
		var ty = t.y + dest.y;

		var subHits = hasHit * this.basePulses + Math.floor((fire.req[j] - fire.rolls[j]) / this.grouping);

		for (var k = 0; k < (this.basePulses + this.extraPulses); k++){
			var devi = {x: range(-2, 2), y: range(-2, 2)};
			var shotAnim = new BallVector({x: ox, y: oy}, {x: tx + devi.x, y: ty + devi.y}, speed, (k < subHits));
				shotAnim.n = 0 - ((j / grouping) * delay + k*shotInterval);

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
	this.dmgLoss = system.dmgLoss;
	this.rakeTime = system.rakeTime;
	this.output = system.rakes;
	this.beamWidth = system.beamWidth || (this.minDmg+this.maxDmg)/system.rakes/35;
	this.exploSize = (this.minDmg+this.maxDmg)/system.rakes/30;
	this.notes = ["Damage is evently split into <span class='green'>" + this.output + "</span> rake(s)"];
}
Laser.prototype = Object.create(Weapon.prototype);

Laser.prototype.getDmgsPerShot = function(fire){
	if (fire.target.ship){return this.output;}
	if (fire.target.squad){return this.output;}
	return 1;
}

Laser.prototype.getAnimation = function(fire){
	var allAnims = [];
	var grouping = 1;
	var delay = 30;
	var shotInterval = 15;
	var cc = 0;
	var hits = 0;
	var fraction = 1;
	var t = fire.target.getPlannedPos();

	if (fire.guns >= 6){
		delay = 15;
	}
	else if (fire.shooter.squad){
		delay = 20;
	}
	
	for (var j = 0; j < fire.guns; j++){
		var gunAnims = [];
		var o = fire.shooter.getWeaponOrigin(fire.systems[j]);
		//console.log(o.display);
		
		for (var k = 0; k < this.shots; k++){
			var tx; var ty; var tb; var a;
			var hit = 0;

			if (fire.hits[j] > k){
				hit = 1;
				hits++
			}	

			
			/*
			if (hit){ // shot hit
				tx = fire.target.drawX + range(-fire.target.size * 0.45, fire.target.size * 0.45); // BEAM swipe begin on HIT
				ty = fire.target.drawY + range(-fire.target.size * 0.45, fire.target.size * 0.45);
				a = getAngleFromTo( {x: tx, y: ty}, {x: fire.target.drawX, y: fire.target.drawY} );
				a = addToDirection(a, range(-10, 10));
				tb = getPointInDirection(fire.weapon.rakeTime/4, a, tx, ty); // BEAM swipe END on HIT	
			}
			*/
			if (hit){ // shot hit
				var dest = fire.target.getFireDest(fire, hit, hits-1);

				if (range(0, 1)){ // swipe outwards
					tx = t.x + dest.x;
					ty = t.y + dest.y;
					tb = getPointInDirection(fire.target.size/4, range(0, 360), tx, ty);
				}
				else { // sweipe inwards
					tx = t.x + dest.x + (range(-20, 20));
					ty = t.y + dest.y + (range(-20, 20));
					tb = {x:  t.x + dest.x + range(-10, 10), y: t.y + dest.y + range(-10, 10)}
				}
			}
			else { // shot miss
				tx = fire.target.drawX + range(-fire.target.size * 0.7, fire.target.size * 0.7); // BEAM swipe begin on MISS
				ty = fire.target.drawY + range(-fire.target.size * 0.7, fire.target.size * 0.7);
				a = getAngleFromTo( {x: tx, y: ty}, {x: fire.target.drawX, y: fire.target.drawY} );
				a = addToDirection(a, range(-40, 40));
				tb = getPointInDirection(fire.weapon.rakeTime/3, a, tx, ty); // BEAM swipe END on MISS	
			}

			var shotAnim = new BeamVector(
				{x: fire.shooter.drawX + o.x, y: fire.shooter.drawY + o.y},
				//{x: fire.shooter.drawX + range(fire.shooter.size * 0.2 * -1, fire.shooter.size * 0.2), 
				//y: fire.shooter.drawY + range(fire.shooter.size * 0.2 * -1, fire.shooter.size * 0.2)},
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
	var opt = this.optRange / dist;

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

function Dual(system){
	Weapon.call(this, system);
	//this.weapons = system.weapons;
	this.weapons = [];
	this.modes = system.modes;
	this.states = system.states;
	this.dual = 1;
	this.weapons;

	this.initSubWeapons(system.weapons);
}
Dual.prototype = Object.create(Weapon.prototype);

Dual.prototype.updateSystemDetailsDiv = function(){
	this.getActiveSystem().updateSystemDetailsDiv();
	//game.getUnit(this.parentId).updateDiv();
}

Dual.prototype.setFireOrder = function(targetid, pos){
	this.odds = this.getActiveSystem().odds;
	return System.prototype.setFireOrder.call(this, targetid, pos);
}

Dual.prototype.setState = function(){
	System.prototype.setState.call(this);
	//this.initSubWeapons();
	this.initMain();
}

Dual.prototype.getImageName = function(){
	return this.getActiveSystem().name;
}

Dual.prototype.initSubWeapons = function(weapons){
	for (var i = 0; i < weapons.length; i++){
		this.weapons[i] = new window[weapons[i].type](weapons[i]);

		//this.weapons[i].display = "HYBRID - " + this.weapons[i].display;
	}
}

Dual.prototype.initMain = function(){
	var w = this.getActiveSystem();
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
	game.getUnit(this.parentId).updateShipPower(this);
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

	for (var i = 0; i < this.weapons.length; i++){
		this.weapons[i].mount = this.mount;
		this.weapons[i].armour = this.armour;
		this.weapons[i].integrity = this.integrity;
		this.weapons[i].damages = this.damages;
		this.weapons[i].crits = this.crits;
		this.weapons[i].loaded = this.loaded;
		this.weapons[i].dualParent = this.id;
	}


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

Dual.prototype.getSystemDetailsDiv = function(){
	return this.getActiveSystem().getSystemDetailsDiv();
}

Dual.prototype.drawSystemArc = function(facing, rolled, pos){
	this.getActiveSystem().drawSystemArc(facing, rolled, pos);
}

Dual.prototype.getSystem = function(){
	return this.getActiveSystem();
}

Dual.prototype.getBoostDiv = function(){
	if (!this.destroyed){
		for (var i = 0; i < this.weapons.length; i++){
			if (this.weapons[i].effiency){
				var div = this.weapons[i].getBoostDiv();
					$(div).data("systemId", this.id);
				return div;
			}
		}
	}
}

Dual.prototype.getBoostDiva = function(){
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
						game.getUnit(data.shipId).getSystem(data.systemId).plus();
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
						game.getUnit(data.shipId).getSystem(data.systemId).minus();
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
	var w = this.getActiveSystem();
		w.powers.splice(w.powers.length-1, 1);
}

Dual.prototype.doBoost = function(){
	var p = {id: this.powers.length+1,unitid: this.parentId,systemid: this.id,
				turn: game.turn,type: 1, cost: this.getEffiency(), new: 1};
	this.powers.push(p);
	this.getActiveSystem().powers.push(p);
}

Dual.prototype.getActiveSystem = function(){
	for (var i = 0; i < this.states.length; i++){
		if (this.states[i]){return this.weapons[i];}
	}
	return this.weapons[0];
}


function Launcher(system){
	Weapon.call(this, system);	
	//Weapon.call(this, id, parentId, name, display, 0, 0, integrity, powerReq, output, effiency, maxBoost, 0, 0, 0, 0, 0, 0, 1, reload, arc1, arc2, arc3, arc4);	
	         // Weapon(id, parentId, name, display, exploSize, animColor, integrity, powerReq, output, effiency, maxBoost, boostEffect, fc, minDmg, maxDmg, accDecay, linked, shots, reload, arc1, arc2, arc3, arc4){

	this.capacity = system.capacity;
	this.launchRate = system.launchRate;
	this.animation = "ballistic";
	this.loads = [];
	this.ammo = system.ammo;
	this.loadout = 1;
	this.launcher = 1;

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
	else if (this.getRemainingAmmo() == 0){
		this.shots = 0;
		this.forceUnpower();
	}
	else if (game.phase == -1){
		this.setBaseOutput();
	}
}

Launcher.prototype.getDisplay = function(){
	return (this.display + " (" + this.loads[this.ammo].name +")");
}

Launcher.prototype.getPowerOrders = function(){
	var fired = this.hasUnresolvedFireOrder();
	var powers  = [];
	for (var i = 0; i < this.powers.length; i++){
		if (this.powers[i].new){
			if (this.powers[i].type == 1 && fired){
				powers.push(this.powers[i]);
			} else if (this.powers[i].type == 0){
				powers.push(this.powers[i]);
			}
		}
	}
	return powers;
}

Launcher.prototype.setBaseOutput = function(){
	var rem = this.getRemainingAmmo();
	var max = this.getMaxoutput();

	var boost = Math.min(rem, max);

	for (var i = 0; i < boost; i++){
		this.doBoost(false);
	}

	this.update();
}

Launcher.prototype.getRemainingAmmo = function(){
	return this.output;
}

Launcher.prototype.getMaxAmmo = function(){
	return this.capacity[this.ammo];
}

Launcher.prototype.getBoostDiv = function(){
	if (!this.getRemainingAmmo()){
		return;
	}
	return System.prototype.getBoostDiv.call(this);
}

Launcher.prototype.doBoost = function(){
	this.powers.push({
		id: this.powers.length+1, unitid: this.parentId, systemid: this.id,
		turn: game.turn, type: 1, cost: 0, new: 1
	})
}

Launcher.prototype.canBeBoosted = function(){
	return this.launchRate[this.ammo];
}

Launcher.prototype.getShots = function(){
	return this.getOutput();
}

Launcher.prototype.getTraverseRating = function(){
	return this.loads[this.ammo].traverse;
}

Launcher.prototype.getAimDataTarget = function(target, final, accLoss, row){
	var final = 90;
	var traverseMod = this.getTraverseMod(target);
	
	if (!traverseMod){
		row.append($("<td>").html("<span class='green'>Full Tracking</span>"));
	} else row.append($("<td>").html("<span class='red'>-"+ Math.floor(final / 5 * traverseMod) + "% </span> (-" + traverseMod + ")"))

	if (accLoss){
		row.append($("<td>").html(" -" + accLoss + "%"));
	} else row.append($("<td>").html(""));


	final = Math.floor(final * (1-(traverseMod*0.2)) - accLoss);
	this.odds = final;

	row.append($("<td>").html(final + "%"));
}

Launcher.prototype.getUpgradeData = function(){
	var loads = [];
	for (var i = 0; i < this.loads.length; i++){
		if (this.loads[i].amount > 0){
			loads.push(
				{
				"amount": this.loads[i].amount,
				"cost": this.loads[i].cost,
				"name": this.loads[i].name}
				);
		}
	}

	return {name: this.display, systemid: this.id, cost: this.totalCost, loads: loads};
}

Launcher.prototype.getAccuracyLoss = function(dist){		
	return 0;
}

Launcher.prototype.getEffiency = function(){
	return 0;
}

Launcher.prototype.select = function(e){
	console.log(this);

	if (this.destroyed || this.disabled || this.locked){return false;}

	if (game.phase == -2){
		if (this.selected){
			this.selected = false;
			this.validTarget = 0;
		}
		else {
			this.selected = true;
		}
		this.setSystemBorder();
		this.setupAmmoLoadout(e);
	}
	else if (game.phase != -1 || this.getOutput() == 0){
		return false;
	}
	
	var id = this.id;
	var parentId = this.parentId;
	var selected = false;
	if (this.canFire()){
		if (this.hasUnresolvedFireOrder()){
			this.unsetFireOrder();
		}

		if (this.selected){
			this.selected = false;
			this.validTarget = 0;
		}
		else {
			this.selected = true;
		}
		this.setSystemBorder();
	}
	else return false;

	var ship = game.getUnit(parentId);

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
	if (game.getUnit(aUnit) instanceof Flight){this.negation = 0;}

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
	if (this.ammo != undefined){
		return Math.max(0, (this.loads[this.ammo].traverse - target.traverse));
	}
}
Launcher.prototype.getDmgString = function(){
	if (this.ammo != undefined){
		return this.loads[this.ammo].systems[0].minDmg + " - " + this.loads[this.ammo].systems[0].maxDmg;
	} else return "<span class='red'>NO LOADOUT</span>";
}

Launcher.prototype.getOutput = function(){
	return this.shots + this.getBoostLevel();
}

Launcher.prototype.getMaxoutput = function(){
	return this.launchRate[this.ammo];
}

Launcher.prototype.updateSystemDetailsDiv = function(){
	$("#systemDetailsDiv")
		.find("#ammo").html("<font color='red'>" + this.getRemainingAmmo() + "</font> / " + this.getMaxAmmo());
}

Launcher.prototype.setupAmmoLoadout = function(e){
	var div = document.getElementById("weaponLoadoutDiv");
	if ($(div).hasClass("disabled")){
		$(div).find("#reload").html(this.reload);
		//$(div).data("systemid", this.id).css("top", e.clientY + 30).css("left", e.clientX - 150).removeClass("disabled");
		$(div).data("systemid", this.id).css("left", 800).css("top", 400).removeClass("disabled");
		this.updateTotals();
	}
	else {
		window.game.setUnitTotal();
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
		else if (this.loads[i].amount == this.capacity[i]){
			canAdd = false;
			break;
		}
	}

	if (canAdd){
		if (all){
			//this.loads[index].amount = this.capacity[index];
			var rate = this.launchRate[index];
			var multi = this.loads[index].amount / rate;
			if (multi % 1 == 0){multi++;}
			else multi = Math.ceil(multi);
			this.loads[index].amount = rate * multi
		}
		else {
			this.loads[index].amount++;
		}
		this.updateTotals();
		this.canConfirm();
	}
}

Launcher.prototype.removeAmmo = function(ele, all){
	for (var i = 0; i < this.loads.length; i++){
		if (this.loads[i].name == ele.childNodes[0].innerHTML){
			if (this.loads[i].amount >= 1){
				if (all){
					var rate = this.launchRate[i];
					var multi = this.loads[i].amount / rate;
					if (multi % 1 == 0){multi--;}
					else multi = Math.floor(multi);
					this.loads[i].amount = rate * multi
				}
				else {
					this.loads[i].amount -= 1;
				}
				this.updateTotals();
				this.canConfirm();
				return;
			}
		}
	}
}

Launcher.prototype.canConfirm = function(){
	if (this.hasLoad()){
		$("#weaponLoadoutDiv").find(".buttonTD").removeClass("disabled");
	} else $("#weaponLoadoutDiv").find(".buttonTD").addClass("disabled");
}

Launcher.prototype.updateTotals = function(){
	var amount = 0;
	var tCost = 0;
	var table = document.getElementById("weaponTable");
		table.innerHTML = "";

		var tr = document.createElement("tr");
		var th = document.createElement("th"); th.innerHTML = "Class"; th.width = "80px"; tr.appendChild(th)
		var th = document.createElement("th"); th.innerHTML = "Type"; th.width = "200px"; tr.appendChild(th)
		var th = document.createElement("th"); th.innerHTML = "RoF"; th.width = "40px"; tr.appendChild(th)
		var th = document.createElement("th"); th.innerHTML = "Cost"; th.width = "40px"; tr.appendChild(th)
		var th = document.createElement("th"); th.innerHTML = ""; tr.appendChild(th)
		var th = document.createElement("th"); th.innerHTML = ""; tr.appendChild(th)
		var th = document.createElement("th"); th.innerHTML = "Amount"; th.width = "70px"; tr.appendChild(th)
		var th = document.createElement("th"); th.innerHTML = "Total Cost"; th.width = "70px"; tr.appendChild(th)
		table.appendChild(tr);

	for (var i = 0; i < this.loads.length; i++){
		var tr = table.insertRow(-1);
		//console.log(this.loads[i]);
			tr.insertCell(-1).innerHTML = this.loads[i].name;
			tr.insertCell(-1).innerHTML = this.loads[i].display;
			tr.insertCell(-1).innerHTML = this.launchRate[i];
			tr.insertCell(-1).innerHTML = this.loads[i].cost;
		var td = document.createElement("td");
			td.innerHTML = "<img class='size20' src='varIcons/plus.png'>"; tr.appendChild(td);
			td.addEventListener("click", function(e){
				e.preventDefault(); e.stopPropagation();
				window.game.ships[0].getSystem($("#weaponLoadoutDiv").data("systemid")).addAmmo(this.parentNode, false);
			})
			td.addEventListener("contextmenu", function(e){
				e.preventDefault(); e.stopPropagation();
				window.game.ships[0].getSystem($("#weaponLoadoutDiv").data("systemid")).addAmmo(this.parentNode, true);
			})
		var td = document.createElement("td");
			td.innerHTML = "<img class='size20' src='varIcons/minus.png'>"; tr.appendChild(td);
			td.addEventListener("click", function(e){
				e.preventDefault(); e.stopPropagation();
				window.game.ships[0].getSystem($("#weaponLoadoutDiv").data("systemid")).removeAmmo(this.parentNode, false);
			})
			td.addEventListener("contextmenu", function(e){
				e.preventDefault(); e.stopPropagation();
				window.game.ships[0].getSystem($("#weaponLoadoutDiv").data("systemid")).removeAmmo(this.parentNode, true);
			})

			amount += this.loads[i].amount
			tCost += this.loads[i].amount * this.loads[i].cost
			tr.insertCell(-1).innerHTML = this.loads[i].amount + " / "  + this.capacity[i];
			tr.insertCell(-1).innerHTML = this.loads[i].amount * this.loads[i].cost
	}

	var tr = document.createElement("tr");
	var th = document.createElement("th"); tr.appendChild(th);
		th.innerHTML = "Grand Total";
		th.colSpan = 6; th.style.fontAlign = "right";
	var th = document.createElement("th"); th.innerHTML = amount; tr.appendChild(th);
	var th = document.createElement("th"); th.innerHTML = tCost; tr.appendChild(th);
	table.appendChild(tr);
	this.totalCost = tCost;
}

Launcher.prototype.getImpulseString = function(){
	return ("+" + this.loads[this.ammo].baseImpulse + " per Turn");
}

function Hangar(system){
	PrimarySystem.call(this, system);
	this.start = 0;
	this.end = 0;
	this.reload = system.reload;
	this.launchRate = system.launchRate;
	this.loads = system.loads;
	this.capacity = system.capacity;
	this.loadout = 1;
	this.mission = 0;
	this.hangar = 1;
}
Hangar.prototype = Object.create(PrimarySystem.prototype);

Hangar.prototype.setTimeLoaded = function(){
	return System.prototype.setTimeLoaded.call(this)
}

Hangar.prototype.hover = function(e){
	System.prototype.hover.call(this, e);
}

Hangar.prototype.highlightFireOrder = function(e){
	return;
}

Hangar.prototype.getLoadLevel = function(e){
	return System.prototype.getLoadLevel.call(this);
}

Hangar.prototype.hasUnresolvedFireOrder = function(){
	return Weapon.prototype.hasUnresolvedFireOrder.call(this);
}

Hangar.prototype.getUpgradeData = function(){
	return {
		"name": this.display,
		"systemid": this.id,
		"cost": this.totalCost,
		"loads": this.loads
	}
}

Hangar.prototype.setFireOrder = function(targetid, pos){
	this.fireOrders.push(
		{id: 0, turn: game.turn, shooterid: this.parentId, targetid: targetid, x: pos.x, y: pos.y, weaponid: this.id, 
		shots: 0, req: -1, notes: "fighterLaunch", hits: -1, resolved: 0}
	);
	return this;
}

Hangar.prototype.select = function(e){
	console.log(this);
	var id = this.id;
	var parentId = this.parentId;
	var selected = false;
	var ship = game.getUnit(parentId);

	if (this.destroyed || this.disabled || this.locked || this.parentId != aUnit){
		return false;
	}
	else if (game.phase == -2){
		if (this.selected){
			this.selected = false;
		} else this.selected = true;
		this.setupHangarLoadout(e);
	}
	else if (!this.selected && game.getUnit(this.parentId).userid == game.userid && !ship.hasSystemsSelected()){
		this.selected = true;
		this.enableHangarDeployment(e);
	}
	else {
		this.selected = false;
		this.mission = 0;
		$("#hangarLoadoutDiv")
		.addClass("disabled")
		.find("#missionType")
		.find("tr").removeClass("selected").end().end()
		.find(".buttonTD").addClass("disabled").end().end()

		if (game.flightDeploy){
			game.flightDeploy = false;
			$("#deployOverlay").hide();
		}
	}

	this.setSystemBorder();
}

Hangar.prototype.doUndoActions = function(){
	if (game.phase != -1){return;}
	for (var i = game.ships.length-1; i >= 0; i--){
		if (game.ships[i].flight && game.ships[i].actions.length && game.ships[i].available == game.turn){
			if (game.ships[i].launchData.shipid == this.parentId && game.ships[i].launchData.systemid == this.id){
				if (game.ships[i].cc.length){
					game.getUnit(game.ships[i].cc[0]).detachFlight(game.ships[i].id);
				}

				var ele = $(".shipDiv").each(function(){
					if ($(this).data("shipId") == game.ships[i].id){
						$(this).remove();
						return false;
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
	game.draw();
}

Hangar.prototype.getBoostDiv = function(){
	return false;
}

Hangar.prototype.setMount = function(amount){
	this.mount = ""
	this.armour =  Math.floor(amount * this.armourMod);
}

Hangar.prototype.getOutput = function(){
	return this.getLaunchRate();
}

Hangar.prototype.getLaunchRate = function(){
	return this.launchRate;
	var rate = this.effiency;
	var mod = 1;

	for (var i = 0; i < this.crits.length; i++){
		mod -= this.crits[i].value;
	}
	return Math.ceil(rate * mod);
}

Hangar.prototype.drawSystemArc = function(){
	return;
}

Hangar.prototype.enableHangarDeployment = function(e){
	var div = document.getElementById("hangarLoadoutDiv");
		$("#launchRate").html(this.getLaunchRate());
		$("#capacity").html(this.capacity);
	this.unsetFireOrder();
	this.doUndoActions();
	this.showHangarControl(e);

	if ($(div).hasClass("disabled")){
		var h = ($(div).height());
		if (e.clientY + h > window.res.y){
			$(div).data("systemid", this.id).css("left", e.clientX +100).css("top", window.res.y - h - 30).removeClass("disabled");
		} else $(div).data("systemid", this.id).css("left", e.clientX +100).css("top", e.clientY + 50).removeClass("disabled");
	}
	else {
		$(div).addClass("disabled");
	}

	
	if (game.phase != -1 || this.parentId < 0 || game.getUnit(this.parentId).available == game.turn){
		$(div).find("#missionType").hide();
	} else $(div).find("#missionType").show();
}

Hangar.prototype.showHangarControl = function(){
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
				td.innerHTML = "<img height='20px' width='20px' src='varIcons/plus.png'>"; $(td).data("name", this.loads[i].name).data("val", 1); tr.appendChild(td);
				td.addEventListener("click", function(){
					game.getUnit(aUnit).getSystem(id).alterFlight(this, false);
				});
				td.addEventListener("contextmenu", function(e){
					e.preventDefault();
					game.getUnit(aUnit).getSystem(id).alterFlight(this, true);
				});
			var td = document.createElement("td");
				td.innerHTML = "<img height='20px' width='20px' src='varIcons/minus.png'>"; $(td).data("name", this.loads[i].name).data("val", -1); tr.appendChild(td);
				td.addEventListener("click", function(){
					game.getUnit(aUnit).getSystem(id).alterFlight(this, false);
				});
				td.addEventListener("contextmenu", function(e){
					e.preventDefault();
					game.getUnit(aUnit).getSystem(id).alterFlight(this, true);
				});
			var td = document.createElement("td");
				td.id = this.loads[i].name + "Amount";
				td.innerHTML = this.loads[i].launch; tr.appendChild(td);

		table.appendChild(tr);
	}
	var mission = this.getMission();
	var element = $("#hangarLoadoutDiv");
		$(element)
			.data("mission", mission)
			.data("systemid", id)
			.find("#missionType")
				.find("tr").each(function(i){
					if (i){
						$(this).off("click");
						$(this).click(function(){
							game.getUnit(aUnit).getSystem($("#hangarLoadoutDiv").data("systemid")).setMission(i);
						})
					}
				})

	this.triggerLaunchButton();
}

Hangar.prototype.triggerLaunchButton = function(){
	if (this.canLaunchFlight()){
		$("#hangarLoadoutDiv").find(".buttonTD").removeClass("disabled");
	}
	else {
		game.flightDeploy = 0;
		$("#deployOverlay").hide();
		$("#hangarLoadoutDiv").find(".buttonTD").addClass("disabled");
	}
}

Hangar.prototype.setMission = function(val){
	this.mission = val;

	$("#hangarLoadoutDiv").find("#missionType").find("tr").each(function(i){
		$(this).removeClass("selected");
		if (val == i){
			$(this).addClass("selected");
		}
	});

	this.triggerLaunchButton();
}

Hangar.prototype.getMission = function(){
	return this.mission;
}

Hangar.prototype.doLaunchFlight = function(){
	for (var i = game.ships.length-1; i >= 0; i--){
		if (game.ships[i].userid == game.userid){
			if (game.ships[i].flight && game.ships[i].available == game.turn){
				if (!game.ships[i].actions[0].resolved){
					if (game.ships[i].launchData.shipid == window.aUnit && game.ships[i].launchData.systemid == this.id){
						game.ships.splice(i, 1);
						game.draw();
						break;
					}
				}
			}
		}
	}
	instruct("Select a deployment point. The flight's facing will be projected onwards the launching vessel.");
	game.setupDeploymentDiv();
	game.flightDeploy = this;
}

Hangar.prototype.alterFlight = function(ele, max){
	if (game.phase >= 0 || !this.canFire()){return false}
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
			else if (this.loads[i].launch > 0){
				this.loads[i].launch += add;
			}
			$("#" + this.loads[i].name + "Amount").html(this.loads[i].launch);
			break;
		}
	}

	this.triggerLaunchButton();
}

Hangar.prototype.canLaunchFlight = function(){
	if (this.getMission()){
		if (this.canFire()){
			for (var i = 0; i < this.loads.length; i++){
				if (this.loads[i].launch >= 1){
					return true;
				}
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
	var current = 0;
	var max = this.capacity;

	for (var i = 0; i < this.loads.length; i++){
		tCost += this.loads[i].amount * this.loads[i].cost;
		current += this.loads[i].amount;
	}

	if (current == max){
		popup("Insufficient Hangar Space available");
		return;
	}
	else if (all){
		var multi = current / this.launchRate;
		if (multi % 1 == 0){multi++;}
		else multi = Math.ceil(multi);
		add = Math.min(max, (this.launchRate * multi - current))
	}

	for (var i = 0; i < this.loads.length; i++){
		if (this.loads[i].name == name){
			if (this.loads[i].name == name){
				this.loads[i].amount += add;
				this.updateTotals();
				this.canConfirm();
				return;
			}
			else {
				popup("Insufficient Hangar Space available");
				return;
			}
		}
	}


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
				this.canConfirm();
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
				this.canConfirm();
				return;
			}
		}
	}
}

Hangar.prototype.canConfirm = function(){
	if (this.hasLoad()){
		$("#hangarLoadoutDiv").find(".buttonTD").removeClass("disabled");
	} else $("#hangarLoadoutDiv").find(".buttonTD").addClass("disabled");
}

Hangar.prototype.updateTotals = function(){
	var amount = 0;
	var tMass = 0;
	var tCost = 0;
	var table = document.getElementById("hangarTable");
		table.innerHTML = "";

		var tr = document.createElement("tr");
		var th = document.createElement("th"); th.innerHTML = "Class"; tr.appendChild(th);
		var th = document.createElement("th"); th.innerHTML = "Mass"; th.width = "40px"; tr.appendChild(th);
		var th = document.createElement("th"); th.innerHTML = "Cost"; th.width = "40px"; tr.appendChild(th);
		var th = document.createElement("th"); th.innerHTML = ""; tr.appendChild(th);
		var th = document.createElement("th"); th.innerHTML = ""; tr.appendChild(th);
		var th = document.createElement("th"); th.innerHTML = "Amount"; th.width = "70px"; tr.appendChild(th);
		//var th = document.createElement("th"); th.innerHTML = "Total Mass"; th.width = "70px"; tr.appendChild(th);
		var th = document.createElement("th"); th.innerHTML = "Total Cost"; th.width = "70px"; tr.appendChild(th);
		table.appendChild(tr);


	for (var i = 0; i < this.loads.length; i++){
		var tr = table.insertRow(-1);
			tr.insertCell(-1).innerHTML = this.loads[i].name;
			tr.insertCell(-1).innerHTML = this.loads[i].mass;
			tr.insertCell(-1).innerHTML = this.loads[i].cost;
		var td = document.createElement("td");
			td.innerHTML = "<img class='size20' src='varIcons/plus.png'>"; tr.appendChild(td);
			td.addEventListener("click", function(e){
				e.preventDefault(); e.stopPropagation();
				window.game.ships[0].getSystem($("#hangarLoadoutDiv").data("systemid")).addFighter(this.parentNode, false);
			})
			td.addEventListener("contextmenu", function(e){
				e.preventDefault(); e.stopPropagation();
				window.game.ships[0].getSystem($("#hangarLoadoutDiv").data("systemid")).addFighter(this.parentNode, true);
			})
		var td = document.createElement("td");
			td.innerHTML = "<img class='size20' src='varIcons/minus.png'>"; tr.appendChild(td);
			td.addEventListener("click", function(e){
				e.preventDefault(); e.stopPropagation();
				window.game.ships[0].getSystem($("#hangarLoadoutDiv").data("systemid")).removeFighter(this.parentNode, false);
			})
			td.addEventListener("contextmenu", function(e){
				e.preventDefault(); e.stopPropagation();
				window.game.ships[0].getSystem($("#hangarLoadoutDiv").data("systemid")).removeFighter(this.parentNode, true);
			})

			amount += this.loads[i].amount;
			//tMass += this.loads[i].amount * this.loads[i].mass;
			tCost += this.loads[i].amount * this.loads[i].cost;
			tr.insertCell(-1).innerHTML = this.loads[i].amount;
			//tr.insertCell(-1).innerHTML = this.loads[i].amount * this.loads[i].mass
			tr.insertCell(-1).innerHTML = this.loads[i].amount * this.loads[i].cost
	}

	var tr = document.createElement("tr");
	var th = document.createElement("th"); tr.appendChild(th);
		th.innerHTML = "Grand Total";
		th.colSpan = 5;
	var th = document.createElement("th"); th.innerHTML = amount; tr.appendChild(th);
	//var th = document.createElement("th"); th.innerHTML = tMass; tr.appendChild(th);
	var th = document.createElement("th"); th.innerHTML = tCost; tr.appendChild(th);
	table.appendChild(tr);
	this.totalCost = tCost;
}

Hangar.prototype.setupHangarLoadout = function(e){
	var div = document.getElementById("hangarLoadoutDiv");
	if ($(div).hasClass("disabled")){
		$(div).find("#launchRate").html(this.getOutput());
		$(div).find("#capacity").html(this.capacity);
		//$(div).data("systemid", this.id).css("top", e.clientY + 30).css("left", e.clientX - 150).removeClass("disabled");
		$(div).data("systemid", this.id).css("left", 800).css("top", 400).removeClass("disabled");
		this.updateTotals();
	}
	else {
		window.game.setUnitTotal();
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

	$(table).append($("<tr>").append($("<td>").html("Integrity")).append($("<td>").html(this.getRemainingIntegrity() + " / " + this.integrity)));
	$(table).append($("<tr>").append($("<td>").html("Armour")).append($("<td>").html(this.getMount())));
	$(table).append($("<tr>").append($("<td>").html("Capacity")).append($("<td>").html("up to " + this.capacity + " units")));
	$(table).append($("<tr>").append($("<td>").html("Launch Rate")).append($("<td>").html(this.getLaunchRate() + " per cycle")));
	$(table).append($("<tr>").append($("<td>").html("Power Req")).append($("<td>").html(this.getPowerReqString())));

	div.appendChild(table);
	this.attachDetailsMods(div);
		
	return div;
}