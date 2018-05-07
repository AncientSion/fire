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
	this.armour = system.armour;
	this.mount = system.mount;
	this.disabled = system.disabled;
	this.locked = system.locked;
	this.maxRange = system.maxRange;
	this.loads = system.loads || [];
	this.crits = [];
	this.damages = [];
	this.detailsTable = false;
	this.highlight = false;
	this.selected = false;
	this.destroyed = false;
	this.weapon = false;
	this.cost = 0;
	this.powers = [];
	this.fireOrders = [];
	this.type = "";
	this.modes = {};
	this.element;
	this.type = system.type || "Internal";
	this.dual = 0;
	this.loadout = system.loadout;
	this.loaded = 0;
	this.notes = system.notes;
	this.launcher = 0;
	this.hangar = 0;
	this.validTarget = 0;
	this.internal = system.internal;
	this.tiny = system.tiny;
	this.img;
	this.usage = system.usage;
	this.freeAim = system.freeAim;
	this.width = system.width;
	this.monoSystem = false;
}

System.prototype.getDisplay = function(){
	return this.display;
}

System.prototype.getResolvingFireOrders = function(){
	if (game.phase != 3){return false;}
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
	//if (this.destroyed){return;}
	
	var div = $(ele) || $("#systemDetailsDiv");
		div.find(".modifiers").remove();
	var boost = this.getBoostLevel();
	var crew = this.getCrewLevel();
	var table;
	if ((boost && !this.launcher) || this.crits.length || crew){
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
		if (crew){
			$(table[0]).append($("<tr>").append($("<td>").html("Tier " + crew +" crew: +" + (this.getCrewEffect() * crew) + "% Output").attr("colSpan", 2).addClass("positive")));
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
	//if (this.id == 8 && this.parentId == 4){console.log("omega");}
	this.setTimeLoaded();
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

	this.init();
}

System.prototype.init = function(){
	return;
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
		if (p){p.highlightAllSelectedWeapons();}
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
	//if (this.id == 8 && this.parentId == 4){console.log("omega");}
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
		//if (this.getLoadLevel() != 1){return;}
		if (this.highlight && this.disabled){
			ele.find(".modeDiv").hide()
		}
		else if (this.highlight && !this.disabled){
			ele.find(".modeDiv").show()
		}
	}

	ele.find(".loadLevel").css("width", this.getLoadLevel() * 100 + "%");
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
	if (this.element != undefined){$(this.element).find(".loadLevel").css("width", this.getLoadLevel() * 100 + "%");}
	if (this.highlight){$("#systemDetailsDiv").find(".loading").html(this.getTimeLoaded() + " / " + this.reload);}
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

System.prototype.getCrewLevel = function(){
	return false;
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
	if (!this.powers.length){return false;}	
	if (this.powers[this.powers.length-1].turn == game.turn){
		if (this.powers[this.powers.length-1].type > 0){
			return true;
		}
	}
	return false;
}

System.prototype.doBoost = function(){
	this.powers.push({
		id: this.powers.length+1, unitid: this.parentId, systemid: this.id,
		turn: game.turn,type: 1, cost: this.getEffiency(), new: 1
	})
	if (this.getBoostEffect("Reload")){this.setTimeLoaded();}
	if (this.weapon && this.dmgType == "Plasma"){
		if (this.selected || this.highlight){
			this.redrawSystemArc();
		}
	}
}

System.prototype.doUnboost = function(){
	if (this.powers[this.powers.length-1].turn == game.turn){
		this.powers.splice(this.powers.length-1, 1);
	}
	if (this.getBoostEffect("Reload")){this.setTimeLoaded();}
	if (this.weapon && this.dmgType == "Plasma"){
		if (this.selected || this.highlight){
			this.redrawSystemArc();
		}
	}
}

System.prototype.redrawSystemArc = function(){
	fxCtx.clearRect(0, 0, res.x, res.y);
	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z);

	var p = game.getUnit(this.parentId);
	this.drawSystemArc(p.getPlannedFacing(), p.rolled, p.getPlannedPos());
	fxCtx.setTransform(1, 0, 0, 1, 0, 0);
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
	}
	this.doUnpower();
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
	//if (game.phase == -1){
		//var boost = this.effiency;
		//var canPower = this.canPower();
		//var canUnpower = this.canUnpower();

		///if (boost || canPower || canUnpower){
			$(ele)
				.find(".boostDiv").hide().end()
				.find(".modeDiv").hide().end()
				.find(".powerDiv").children().hide();
			return;
		//}
	//}
}

System.prototype.showInfoDiv = function(e){
	$(document.body).append(
		$(this.getSysDiv())
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

System.prototype.getFighterSystemData = function(){
	var file = "sysIcons/" + this.getImageName() + this.linked + ".png";
	var sysDiv = $("<div>").addClass("system");
		sysDiv
		.data("systemId", this.id)
		.append(
			$("<img>").attr("src", file)
		)
		.append(
			$("<div>").addClass("loadLevel")
		)
		.append(
			$("<div>").addClass("bgloadlevel")
		)

	this.element = sysDiv;
	this.setTableRow();
	this.setSystemBorder();
	return this.element;
}

System.prototype.getTableData = function(forFighter){
	td = $("<td>")
	.addClass("system")
	.attr("colSpan", this.width)
	.data("systemid", this.id)

	var img = new Image();
		img.className = "sysIcon"
	var file = "sysIcons/" + this.getImageName();
	
		file += ".png";
		img.src = file;
	td.append(img);

	var div = document.createElement("div");
		if (this instanceof PrimarySystem && this.exposed){
			div.className = "loadLevel exposed";
		} else div.className = "loadLevel";
	td.append(div);

	var div = document.createElement("div");
		div.className = "bgloadlevel";
	td.append(div);

		$(td).data("systemId", this.id);

	var lowerDiv = document.createElement("div");
		lowerDiv.className = "integrityNow";
		lowerDiv.style.width = this.getRemIntegrity() /  this.integrity * 100 + "%";
	td.append(lowerDiv);

	var div = document.createElement("div");
		div.className = "integrityFull";
	td.append(div);

	if (!this.destroyed){
			var outputDiv = document.createElement("div");
				outputDiv.className = "outputMask";
				if (this.internal || this.getActiveSystem().canBeBoosted()){
					outputDiv.innerHTML = this.getActualOutput();
				}
				else $(outputDiv).hide();
	td.append(outputDiv);
		//}
	}

	$(td).data("systemId", this.id);
	this.element = td[0];

	//this.setTimeLoaded();
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
		lowerDiv.style.width = this.getRemIntegrity() /  this.integrity * 100 + "%";
		returnDiv.appendChild(lowerDiv);

	var div = document.createElement("div");
		div.className = "integrityFull";
		returnDiv.appendChild(div);
	*/
	if (1){		
		var outputDiv = $("<div>")
		if (this instanceof PrimarySystem){
			outputDiv.addClass("outputMask top")
		} else outputDiv.addClass("outputMask")
		if (this.internal || this.getActiveSystem().canBeBoosted()){
			outputDiv.html(this.getOutput());
		} else outputDiv.hide();
	}	
	
	$(returnDiv).append(outputDiv).data("systemId", this.id);
	this.element = returnDiv;

	//this.setTimeLoaded();
	this.setTableRow();
	this.setSystemBorder();
	return this.element;
}

System.prototype.hasUnresolvedFireOrder = function(){
	return false;
}

System.prototype.update = function(){
	if (this.highlight){this.updateSystemDetailsDiv();}
	$(this.element).find(".outputMask").html(this.getOutput());
}

System.prototype.getRemIntegrity = function(){
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
	if (this.launcher || this instanceof PrimarySystem && !(this instanceof Hangar)){return;}
	var copy = [];

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
	return this.getBoostLevel();
}

System.prototype.getBoostOutput = function(){
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
	return (this.powerReq + " + " + (this.getPowerUsage() - this.powerReq));
}

System.prototype.getPowerUsage = function(){
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
		
		var p1 = getPointInDir(game.arcRange, start+facing, pos.x, pos.y);
		var p2 = getPointInDir(game.arcRange, end+facing, pos.x, pos.y)
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
	this.crewEffect = system.crewEffect;
	this.maxDmg = system.maxDmg;
	this.hitPct = system.hitPct;
}
PrimarySystem.prototype = Object.create(System.prototype);

PrimarySystem.prototype.getEffiency = function(){
	var boost = this.getBoostLevel();
	return Math.max(this.effiency+boost, Math.ceil(this.effiency * (1+(boost * this.getBoostCostIncrease()))));
}

PrimarySystem.prototype.setTimeLoaded = function(){
	this.loaded = 1;
	$(this.element).find(".loadLevel").css("width", this.getLoadLevel() * 100 + "%");
}

PrimarySystem.prototype.getCritLogString = function(){
	var html = "";
	for (let i = 0; i < this.crits.length; i++){
		if (this.crits[i].turn != game.turn){continue;}
		if (this.crits[i].type.length > 6){continue;}
		return html += (this.display + ": " + this.crits[i].value + "% efficiency loss.</br>");
	}
	return html;
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

PrimarySystem.prototype.canUnboost = function(){
	if (!this.powers.length){return false;}	
	if (this.powers[this.powers.length-1].turn == game.turn){
		if (this.powers[this.powers.length-1].type && this.powers[this.powers.length-1].cost){
			return true;
		}
	}
	return false;
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
	var usage = this.getOutputUsage();

	if (this.disabled || this.destroyed){
		return -usage;
	}

	var mod = 100;
		mod += this.getBoostEffect("Output") * this.getBoostLevel();
		mod += this.getCrewEffect() * this.getCrewLevel();
		mod += this.getOutputCrits();

	return Math.floor(this.output / 100 * mod) - usage;
}

System.prototype.getCrewLevel = function(){
	var lvl = 0;
	for (var i = 0; i < this.powers.length; i++){
		if (this.powers[i].type == 2){
			lvl++;
		}
	}
	return lvl;
}

PrimarySystem.prototype.getCrewOutput = function(){
	return Math.floor(this.output * (this.getCrewLevel() * this.getCrewEffect()/100));
}

PrimarySystem.prototype.getCrewEffect = function(){
	return this.crewEffect;
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
	else return Math.ceil(Math.abs(this.output / 100 * mod));
}

PrimarySystem.prototype.getOutputString = function(){
	//var effect = 100 + this.getOutputCrits();
	var effect = 100;
	return this.output + " +" + Math.floor(this.getBoostOutput()/100*effect) + " +" + Math.floor(this.getCrewOutput()/100*effect) + " -" + this.getOutputReduction();
}

PrimarySystem.prototype.getBoostCostIncrease = function(){
	return 0.35;
}

PrimarySystem.prototype.getSysDiv = function(){
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
		$(table).append($("<tr>").append($("<td>").css("width", "60%").html("Integrity")).append($("<td>").html(this.getRemIntegrity() + " / " + this.integrity)));
		$(table).append($("<tr>").append($("<td>").css("width", "60%").html("Hit Chance")).append($("<td>").html(this.hitPct + "%")));
		$(table).append($("<tr>").append($("<td>").html("Max Damage / hit")).append($("<td>").html(this.maxDmg)));

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

Bridge.prototype.select = function(e){
	console.log(this);
	var id = this.id;
	var parentId = this.parentId;
	var selected = false;
	var ship = game.getUnit(parentId);

	if (this.destroyed || this.disabled || this.locked || this.parentId != aUnit){
		return false;
	}
	else ship.handleCrew(e, this);
	if (game.phase != -2){
		$("#crewDiv")
			.find(".header").html("Crew specialists on board").end()
			.find("#crewTable").find("img").each(function(){$(this).remove();});
	}
}

Bridge.prototype.getCritLogString = function(){
	var html = "";
	for (let i = 0; i < this.crits.length; i++){
		if (this.crits[i].turn != game.turn){continue;}
		return html += (this.display + " - " + this.crits[i].type + ": " + this.crits[i].value + "% efficiency loss.</br>");
	}
	return html;
}

Bridge.prototype.getUpgradeData = function(){
	var loads = [];
	var units = [];
	var text = this.display + ":</br>";
	var cost = 0;
	for (var i = 0; i < this.loads.length; i++){
		if (!this.loads[i].amount){continue;}
		loads.push({
			"amount": this.loads[i].amount,
			"cost": this.loads[i].cost,
			"name": this.loads[i].name,
			"systemid": this.id
		});
		text += this.loads[i].name + " crew level " + this.loads[i].amount + "</br>";
		cost += this.loads[i].cost;
	}
	return {systemid: this.id, active: 1, units: units, loads: loads, text: text, cost: cost};
}
				
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
		use += ship.structures[i].getPowerUsage();
		for (var j = 0; j < ship.structures[i].systems.length; j++){
			if (ship.structures[i].systems[j].isPowered()){
				use += ship.structures[i].systems[j].getPowerUsage();
			}
		}
	}
	for (var i = 0; i < ship.primary.systems.length; i++){
		if (ship.primary.systems[i].isPowered()){
			use += ship.primary.systems[i].getPowerUsage();
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
			this.setEWMode();
			game.drawEvents();
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
	if (!this.ew.length || this.destroyed || this.isUnpowered()){return;}
	else if (this.img == undefined){
		//console.log("NO EW DEFINED!");
		this.setTempEW();
		this.drawEW();
	}
	else {
		//console.log("drawing EW!");
		var ship = game.getUnit(this.parentId);
		var loc = ship.getPlannedPos();
		salvoCtx.translate(cam.o.x, cam.o.y);
		salvoCtx.scale(cam.z, cam.z);
		salvoCtx.translate(loc.x, loc.y);
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
		var color = "";
		ctx.globalAlpha = 0.25;

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
			var p1 = getPointInDir(str, start, loc.x, loc.y);
			var rad1 = degreeToRadian(start);
			var rad2 = degreeToRadian(end);
			ctx.beginPath();			
			ctx.moveTo(loc.x, loc.y);
			ctx.lineTo(p1.x, p1.y); 
			ctx.arc(loc.x, loc.y, ew.dist, rad1, rad2, false);
			ctx.closePath();
		}

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

	if (game.phase == -2 || this.destroyed || this.disabled || this.locked || this.parentId != aUnit || aUnit < 0 || game.turnMode){
		return false;
	}
	else if (game.system && game.system != this.id && !this.selected){return false;}
	else if (this.selected){
		this.selected = false;
		game.sensorMode = 0;
		this.setSystemBorder();
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

	if (game.phase == -2){return;}
	mouseCtx.clearRect(0, 0, res.x, res.y);
	if (this.ew[this.ew.length-1].angle == -1){
		this.ew[this.ew.length-1].dist = Math.floor(this.ew[this.ew.length-1].dist * 1.1);
	}
	game.sensorMode = 1;
	this.setTempEW();
	salvoCtx.clearRect(0, 0, res.x, res.y);
	this.drawEW();
	game.sensorMode = 0;

}

Sensor.prototype.doUnboost = function(){
	System.prototype.doUnboost.call(this);

	if (game.phase == -2){return;}
	mouseCtx.clearRect(0, 0, res.x, res.y);
	if (this.ew[this.ew.length-1].angle == -1){
		this.ew[this.ew.length-1].dist = Math.floor(this.ew[this.ew.length-1].dist / 1.1);
	}
	game.sensorMode = 1;
	this.setTempEW();
	salvoCtx.clearRect(0, 0, res.x, res.y);
	this.drawEW();
	game.sensorMode = 0;
}

function Weapon(system){
	System.call(this, system);
	this.animColor = system.animColor;
	this.priority = system.priority;
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
	this.fireMode = system.fireMode;
	this.dmgType = system.dmgType;
	this.dmgLoss = system.dmgLoss;
	this.melt = system.melt;
	this.animation = system.animation;
	this.loaded;
	this.fireOrders = [];
	this.mount;
	this.exploSize = 2+((this.minDmg+this.maxDmg)/30) * (1+(3*(this.fireMode == "Flash")));
	this.odds = 0;
}
Weapon.prototype = Object.create(System.prototype);



Weapon.prototype.assembleDmgData = function(fire){
	var dmgs = {};
	for (var i = 0; i < fire.damages.length; i++){
		if (dmgs.hasOwnProperty(fire.damages[i].system)){ // hit
			dmgs[fire.damages[i].system][2]++
		}
		else dmgs[fire.damages[i].system] = [0, 0, 1, 0, 0, 0, ""]; // new system entry

		if (this.grouping && fire.damages[i].notes[1][0] == "v"){ // pulse volley 
			dmgs[fire.damages[i].system][6] += Math.floor(fire.damages[i].notes[1].slice(1, fire.damages[i].notes[1].length)) + ", ";
		}
		
		if (fire.damages[i].destroyed){ // kill
			dmgs[fire.damages[i].system][0]++;
		}
		if (fire.damages[i].notes[fire.damages[i].notes.length-1][0] == "o"){ // overload
				dmgs[fire.damages[i].system][1] += Math.floor(fire.damages[i].notes[fire.damages[i].notes.length-1].slice(1, fire.damages[i].notes[fire.damages[i].notes.length-1].length));
			}

		dmgs[fire.damages[i].system][3] += fire.damages[i].armourDmg;
		dmgs[fire.damages[i].system][4] += fire.damages[i].structDmg;
		dmgs[fire.damages[i].system][4] += fire.damages[i].emDmg;
		dmgs[fire.damages[i].system][5] += fire.damages[i].overkill;

	}

	if (this.grouping){
		for (var i in dmgs){
			dmgs[i][6] = " (" + (dmgs[i][6].slice(0, dmgs[i][6].length-2)) + ")";
		}
	}
	return dmgs;
}

Weapon.prototype.getRollsString = function(rolls, req){
	var string = "";
	for (var i = 0; i < rolls.length; i++){
		if (rolls[i] <= req){
			string += "<u>" + rolls[i] + "</u>";
		} else string += rolls[i];

		string += " / ";
	}
	return string;
}

Weapon.prototype.getReqString = function(req){
	var string = req[0];

	if (req.length > 1 && req[0] != req[req.length-1]){
		string = req[0] + " - " + req[req.length-1] + " %";
	} else string += " %";
	return string;
}

Weapon.prototype.createCombatLogEntry = function(fire){
	var log = $($("#combatLog").find("tbody")[0]);
	var shots = 0;
	var hits = 0;
	var armour = 0;
	var em = 0;
	var system = 0;
	var struct = 0;
	var shield = 0;

	var req = fire.req.slice();
		req.sort(function(a, b){return a-b});
	var reqString = this.getReqString(req);

	var rolls = fire.rolls.slice().sort((a, b) => a-b);
	var rollString = this.getRollsString(rolls, req[0]);
	
	if (fire.shooter.salvo){
		shots = fire.shooter.getShots();
		hits = fire.hits.reduce((a, b) => a+b, 0);
	}
	else {
		for (var i = 0; i < fire.guns; i++){
			shots += fire.weapon.getShots();
			hits += fire.hits[i];
		}
	}

	for (var i = 0; i < fire.damages.length; i++){
		armour += fire.damages[i].armourDmg;
		em += fire.damages[i].emDmg
		system += fire.damages[i].structDmg;
		struct += fire.damages[i].overkill;
		shield += fire.damages[i].shieldDmg;
	}

	var tr = $("<tr>");
	var index = $(log).children().length;

	tr
		.data("shooterid", fire.shooter.id)
		.data("targetid", fire.target.id)
		.data("fireid", fire.id)
		.data("row", index)
		//.data("hasDetails", 0)
		.data("expanded", 0)
		.contextmenu(function(){
			for (var i = 0; i < game.fireOrders.length; i++){
				if (game.fireOrders[i].id == $(this).data("fireid")){
					game.fireOrders[i].animating = 0;
					break;
				}
			}

			game.redraw();
			game.fireOrders[i].anim = game.fireOrders[i].weapon.getAnimation(game.fireOrders[i]);
			$(fxCanvas).css("opacity", 1);
			game.animateSingleFireOrder(i, 0)
		})
		.hover(function(){
			var data = $(this).data();
			if (data.targetid == ""){return;}
			game.getUnit(data.shooterid).doHighlight();
			game.getUnit(data.targetid).doHighlight();
		})
		.click(function(){
				var startRow = $(this).data("start");
				var endRow = $(this).data("end");
				var rows = $("#combatLog").find("tbody").children();

				if ($(this).data("expanded") == 1){
					$(this).data("expanded", 0).removeClass("selected");
					for (var i = startRow; i <= endRow; i++){
						$(rows[i]).hide().removeClass("selected");
					}
				}
				else {
					$(this).data("expanded", 1).addClass("selected");
					for (var i = startRow; i <= endRow; i++){
						$(rows[i]).show().addClass("selected");
					}
				}	
		})
		.append($("<td>").html(fire.type))
		.append($("<th>").html("<font color='" + fire.shooter.getCodeColor() + "'>" + fire.shooter.name + " #" + fire.shooter.id + "</font>"))
		.append($("<th>").html("<font color='" + fire.target.getCodeColor() + "'>" + fire.target.name + " #" + fire.target.id + "</font>"))
		.append($("<td>").html(fire.weapon.getDisplay()))
		.append($("<td>").html(reqString))
		.append($("<td>").html(hits + " / " + shots))

	if (!hits){
		$(tr)
			.append($("<td>").html(""))
			.append($("<td>").html(""))
			.append($("<td>").html(""))
	}
	else {
		$(tr)
			.append($("<td>").html(armour ? armour : ""))
			.append($("<td>").html(system || em || ""))
			.append($("<td>").html(struct ? struct : ""))
	}

	$(log).append(tr);

	var dmgs = this.assembleDmgData(fire);
	var start = index+1;
	var depth = Object.keys(dmgs).length;

	$(log).append(
		$("<tr>")
		.hide()
		.append($("<td>")
		)
		.append($("<td>")
			.html("Rolls:")
		)
	.append($("<td>")
			.attr("colSpan", 2)
			.css("textAlign", "left")
			.html(rollString.slice(0, rollString.length-3))
		)
		.append($("<td>")
			.attr("colSpan", 5)
		)
	)

	// e-web
	if (shield){
		depth++;
		$(log).append(
			$("<tr>")
			.hide()
			.append($("<td>"))
			.append($("<td>")
				.attr("colSpan", 5)
				.html("The Energy-Web nullified a grand total of " + shield + " damage points")
			)
			.append($("<td>"))
			.append($("<td>"))
			.append($("<td>"))
		)
	}

	//dmg Details
	$(tr)
		.data("hasDetails", 1)
		.data("expanded", 0)
		.data("start", start)
		.data("end", start + depth)

	//console.log(dmgs);

	for (var i in dmgs){
		start++;
		var sub = $("<tr>")
			.hide()
			.data("row", start)
			.append($("<td>")
			)
			.append($("<td>")
				.attr("colSpan", 2)
				.html(i + dmgs[i][6]) // system name
			)

		var string = "";

		if (dmgs[i][0]){string += "Kills: " + dmgs[i][0]};
		if (string.length > 2 && dmgs[i][1]){string += ", "};
		if (dmgs[i][1]){string += "potential Overload: " + dmgs[i][1]}

		$(sub) 
		.append($("<td>").attr("colSpan", 2).html(string)
		)

		for (var j = 2; j < dmgs[i].length-1; j++){
			$(sub) 
			.append($("<td>")
				.html(dmgs[i][j] ? dmgs[i][j] : "")
			)
		}

		$(log).append(sub);
	}

	game.ui.logWrapper.find("#combatlogInnerWrapper").scrollTop(function(){return this.scrollHeight});
}

Weapon.prototype.getDmgsPerShot = function(fire){
	return 1;
}

Weapon.prototype.getUsageString = function(){
	var unit = game.getUnit(this.parentId);
	//if (this.usage == game.phase-1){
	if (this.usage == -1){
		if (unit.friendly){
			return ("<span><font color='" + unit.getCodeColor()+ "'> " + unit.name + " #" + unit.id +" </font></span> fires " + this.display);
		}
		else 
			return ("<span><font color='" + unit.getCodeColor()+ "'> " + unit.name + " #" + unit.id +" </font></span> fires " + this.display + ". Target unknown.");
		
	}
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
	if (this.fireMode == "Laser" || this.dmgType == "Plasma"){
		mod += this.getCritEffect("Damage loss");
		mod += this.getBoostEffect("Damage loss") * this.getBoostLevel();
	}
	return mod / 100;
}
	
Weapon.prototype.getDmgLoss = function(dist){
	if (this.fireMode == "Laser"){
		if (dist <= this.optRange){
			dist = 0;
		} else dist = dist - this.optRange;
	}
	else if (this.dmgType == "Plasma"){
	}
	else return 0;

	return Math.ceil(this.dmgLoss * dist / 100 * this.getRangeDmgMod());
}

Weapon.prototype.getAimData = function(target, final, dist, row){
	var dmgLoss = this.getDmgLoss(dist);
	var accLoss = this.getAccuracyLoss(dist);

	if (this.maxRange && dist > this.maxRange){
		row.append($("<td>").attr("colSpan", 4).addClass("red").html("Insufficient Range, max: " + this.maxRange));
		return;
	}

	if (dmgLoss){
		row.append($("<td>").addClass("red").html(" -" + dmgLoss + "%"));
	} else {
		row.append($("<td>").html(""));
	}

	if (target){
		this.getAimDetailsUnit(target, final, accLoss, row);
	}
	else {
		this.getAimDetailsLoc(accLoss, row);
	}

	//this.odds = 100;
}

Weapon.prototype.getAimDetailsUnit = function(target, final, accLoss, row){
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

Weapon.prototype.getAimDetailsLoc = function(accLoss, row){
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

Weapon.prototype.posJSONArc = function(loc, pos, facing){
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
		var center = getSystemArcDir({start: this.arc[0][0], end: this.arc[0][1]});
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
		sensor.setTempEW();
		game.getUnit(this.parentId).drawEW();
		return;
	}
	else if (game.phase == -2 || game.turn == 1 && game.phase == -1){return;}
	else if (this.destroyed || this.disabled || this.locked || this.parentId != aUnit || this.parentId < 0 || game.turnMode){
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
			else if(!unit.hasHangarSelected() && !game.monoSystem){
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

Weapon.prototype.getSysDiv = function(){
	var div = document.createElement("div");
		div.id = "systemDetailsDiv";
	var table = document.createElement("table");
	
	$(table).append($("<tr>").append($("<th>").html(this.display).attr("colSpan", 2)));
	$(table).append($("<tr>").append($("<td>").html("Firing Mode").css("width", "50%")).append($("<td>").html(this.fireMode)));
	$(table).append($("<tr>").append($("<td>").html("Damage Type").css("width", "50%")).append($("<td>").html(this.dmgType)));


	if (!this.tiny){
		if (game.getUnit(this.parentId).ship){
			$(table).append($("<tr>").append($("<td>").html("Integrity")).append($("<td>").html(this.getRemIntegrity() + " / " + this.integrity)));
			$(table).append($("<tr>").append($("<td>").html("Mount / Armour")).append($("<td>").html(this.getMount())));
		}
		$(table).append($("<tr>").append($("<td>").html("Power Req")).append($("<td>").addClass("powerReq").html(this.getPowerReqString())));
		if (this.boostEffect.length && !(this instanceof Launcher)){
			$(table).append($("<tr>").css("border-top", "2px solid white").append($("<td>").html("Boost Power Cost")).append($("<td>").addClass("powerCost").html(this.getEffiency() + " (max: " + this.maxBoost + ")")));
			this.getBoostEffectElements(table);
		}
	}
	
	$(table).append($("<tr>").append($("<td>").html("Loading")).append($("<td>").addClass("loading").html(this.getTimeLoaded() + " / " + this.reload)));

	if (this instanceof Launcher){
		if (this.ammo != -1){
			$(table).append($("<tr>").append($("<td>").html("Max Range")).append($("<td>").html(this.maxRange)));
			$(table).append($("<tr>").append($("<th>").css("border-top", "1px solid white").attr("colSpan", 2).html(this.loads[this.ammo].name)));
			$(table).append($("<tr>").append($("<th>").attr("colSpan", 2).html(this.loads[this.ammo].display)));
			$(table).append($("<tr>").append($("<td>").html("Ammo amount")).append($("<td>").html("<span class='red'>" + this.getRemAmmo() + "</span> / " + this.getMaxAmmo()).attr("id", "ammo")));
			$(table).append($("<tr>").append($("<td>").html("Tracking")).append($("<td>").html(this.getTraverseRating() + " / " + game.getUnitType(this.getTraverseRating()))));
			$(table).append($("<tr>").append($("<td>").html("Thrust")).append($("<td>").html(this.getImpulseString())));
			//$(table).append($("<tr>").append($("<td>").html("Launch Rate")).append($("<td>").html("<span class='red' id='detailShots'>" + this.getOutput() + "</span> / " + this.launchRate[this.ammo])));
			$(table).append($("<tr>").append($("<td>").html("Launch Rate")).append($("<td>").html("Up to <span class='red'>" + this.launchRate[this.ammo] + "</span> / cycle")));
		}
	}
	else if (this.fireMode == "Laser"){
		$(table).append($("<tr>").append($("<td>").html("Tracking")).append($("<td>").html(this.getTraverseRating() + " / " + game.getUnitType(this.getTraverseRating()))));
		$(table).append($("<tr>").append($("<td>").html("Focus point")).append($("<td>").html(this.optRange + "px")));
		$(table).append($("<tr>").append($("<td>").html("Damage loss")).append($("<td>").html(this.getDmgLoss(this.optRange+100) + "% per 100px")));
		$(table).append($("<tr>").append($("<td>").html("Accuracy loss")).append($("<td>").addClass("accuracy").html(this.getAccuracy() + "% per 100px")));
	}
	else {
		$(table).append($("<tr>").append($("<td>").html("Tracking")).append($("<td>").html(this.getTraverseRating() + " / " + game.getUnitType(this.getTraverseRating()))));

		if (!this.tiny){
			if (this.dmgType == "Plasma"){
				$(table).append($("<tr>").append($("<td>").html("Damage loss")).append($("<td>").html(this.getDmgLoss(100) + "% per 100px")));
			}
			$(table).append($("<tr>").append($("<td>").html("Accuracy loss")).append($("<td>").html(this.getAccuracy() + "% per 100px")));
		}
	}

	if (this.linked > 1){
		//$(table).append($("<tr>").append($("<td>").html("Linked Shots")).append($("<td>").html(this.linked + " x " + this.shots)));
		$(table).append($("<tr>").append($("<td>").html("Linked Mounts")).append($("<td>").html(this.linked)));
	}
	
	if (this.fireMode == "Laser"){
		$(table).append($("<tr>").append($("<td>").html("Shots & Rakes")).append($("<td>").html(this.shots + " w/ " + this.output + " rakes")));
	}
	else if (!(this instanceof Launcher)){
		if (this.fireMode == "Pulse"){
			$(table).append($("<tr>").append($("<td>").html("Shots")).append($("<td>").html(this.shots)));
			$(table).append($("<tr>").append($("<td>").html("Base / Max Hits")).append($("<td>").html(this.basePulses + " / " + (this.basePulses + this.extraPulses))));
			$(table).append($("<tr>").append($("<td>").html("Bonus Hits")).append($("<td>").html(" +1 per " + this.grouping + "%")));
		} else $(table).append($("<tr>").append($("<td>").html("Shots")).append($("<td>").html(this.shots)));
	}

	$(table).append($("<tr>").append($("<td>").html("Damage")).append($("<td>").addClass("damage").html(this.getDmgString())));
	if (!this.tiny){$(table).append($("<tr>").append($("<td>").html("Priority (low->early)")).append($("<td>").html(this.priority)));}

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
	if (this.dmgType == "Plasma"){
		var grad = fxCtx.createRadialGradient(x, y, 0, x, y, dist);
		var loss = this.dmgLoss * this.getRangeDmgMod();
		var	red = 0.7/loss*10000/dist;
		var	yellow = 0.3/loss*10000/dist;
		var green = 0;
		grad.addColorStop(Math.min(1, red), "red");
		grad.addColorStop((Math.min(1, red) + Math.max(0, green))/2, "yellow");
		grad.addColorStop(Math.max(0, green), "green");
		grad.addColorStop(green, "green");	
		return grad;
	}
	else if (this.fireMode == "Laser" && this.dmgLoss){
		var grad = fxCtx.createRadialGradient(x, y, 0, x, y, dist);
		grad.addColorStop(0, "green");
		grad.addColorStop((this.optRange/1200*dist) / dist, "green");
		grad.addColorStop(((this.optRange/1200*dist)+dist) / 2 / dist, "yellow");
		grad.addColorStop(1, "red");
		return grad;
	}
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

function Warhead(data){
	this.id = data.id;
	this.parentId = data.parentId;
	this.minDmg = data.minDmg;
	this.maxDmg = data.maxDmg;
	this.shots = data.shots;
	this.traverse = data.traverse;
	this.animation = data.animation;
	this.name = data.name;
	this.display = data.display;
	this.fireMode = data.fireMode;
	this.linked = data.linked;
	this.dmgType = data.dmgType;
	this.loaded = 1;
	this.reload = 1;
	this.fireOrders = [];
	this.guns = 1;
	this.tiny = 1;
	this.exploSize = (this.minDmg + this.maxDmg)/15;
	this.powers = [];
	this.modes = {};
	this.boostEffect = [];
	this.crits = [];

	for (var i = 0; i < data.fireOrders.length; i++){
		this.fireOrders.push(new FireOrder(data.fireOrders[i]));
	}
}

Warhead.prototype = Object.create(Weapon.prototype)

Warhead.prototype.hasEvent = function(){return false;}
Warhead.prototype.hasOutput = function(){return false;}
Warhead.prototype.getShots = function(){return 1;}
Warhead.prototype.getDmgsPerShot = function(fire){return 1;}
Warhead.prototype.getActiveSystem = function(){return this;}


Warhead.prototype.getSysDiv = function(){
	var div = $("<div>").attr("id", "systemDetailsDiv")
		.append($("<table>")
			.append($("<tr>")
				.append($("<th>").html(this.display).attr("colSpan", 2)))
			.append($("<tr>")
				.append($("<td>").html("Firing Mode").css("width", "50%"))
				.append($("<td>").html(this.fireMode)))
			.append($("<tr>")
				.append($("<td>").html("Damage Type"))
				.append($("<td>").html(this.dmgType)))
			.append($("<tr>")
				.append($("<td>").html("Tracking"))
				.append($("<td>").html(this.getTraverseRating() + " / " + game.getUnitType(this.getTraverseRating()))))
			.append($("<tr>")
				.append($("<td>").html("Damage"))
				.append($("<td>").html(this.getDmgString()))))
	return div;
}


Warhead.prototype.getResolvingFireOrders = function(){
	return System.prototype.getResolvingFireOrders.call(this);
}

Warhead.prototype.getDisplay = function(){
	return "Ballistic Warhead Impact";
}

Warhead.prototype.createCombatLogEntry = function(fire){
	return Weapon.prototype.createCombatLogEntry.call(this, fire);
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

			var traj = getPointInDir(t.size/4, a, p.x, p.y);
			var tx = traj.x + range(-t.size/8, t.size/8);
			var ty = traj.y + range(-t.size/8, t.size/8);

			if (fire.target.flight){
				var t = fire.target.getFireDest(fire, hit, hits-1);
					tx = p.x + t.x;
					ty = p.y + t.y;
			}
			var shotAnim = {tx: tx, ty: ty, m: 35, n: 0 - ((j / grouping) * delay + k*shotInterval)};

			gunAnims.push(shotAnim);
		}
		allAnims.push(gunAnims)
	}
	return allAnims;
}



function Flash(){}
Flash.prototype.getAnimation = function(fire){
	var allAnims = [];
	var grouping = 2;
	var speed = this.projSpeed;
	var delay = 25 * this.shots;
	var shotInterval = 25;
	var cc = 0;
	var hits = 0;
	var fraction = 1;
	var t = fire.target.getDrawPos();

	if (fire.dist < 200){
		fraction = Math.min(3, 200 / fire.dist);
	}
	else if (fire.dist > 600){
		fraction = Math.max(0.5, 600 / fire.dist);
	}

	speed /= fraction;
	delay *= fraction;
	shotInterval *= fraction;

	if (fire.shooter.flight && fire.target.flight){
		a = JSON.parse(JSON.stringify(fire.target.structures[1].layout));
	}
	
	for (var i = 0; i < fire.guns; i++){
		var o = fire.shooter.getWeaponOrigin(fire.systems[i]);
		var ox = fire.shooter.drawX + o.x;
		var oy = fire.shooter.drawY + o.y;
		var hit = false;

		if (fire.hits[i]){
			hit = true;
		}
		
		var dest = fire.target.getFlasHitSection(fire);
		
		var tx = t.x + dest.x;
		var ty = t.y + dest.y;

		var gunAnims = new BallVector({x: ox, y: oy}, {x: tx, y: ty}, speed, hit);
			gunAnims.n = 0 - ((i / grouping) * delay + i*shotInterval);

		allAnims.push([gunAnims])
	}
	return allAnims;
}

function Particle(system){
	Weapon.call(this, system);	
	this.projSize = system.projSize;
	this.projSpeed = system.projSpeed;
}
Particle.prototype = Object.create(Weapon.prototype);

Particle.prototype.getAnimation = function(fire){
	if (this.fireMode == "Flash"){return Flash.prototype.getAnimation.call(this, fire);}
	var allAnims = [];
	var grouping = 2;
	var speed = this.projSpeed;
	var delay = 25 * this.shots;
	var shotInterval = 25 - (this.shots *4);
	if (this.name == "MediumParticle"){shotInterval = 10;}
	else if (this.name == "LightParticle"){delay = 15;}
	else if (this.name == "SuperHeavyParticle"){shotInterval = 3; delay = 35;}
	var cc = 0;
	var hits = 0;
	var fraction = 1;
	var t = fire.target.getDrawPos();

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

	if (fire.shooter.flight && fire.target.flight){
		a = JSON.parse(JSON.stringify(fire.target.structures[1].layout));
	}
	
	var linked = this.linked * !fire.shooter.flight-1;
	//console.log(linked);
	
	for (var i = 0; i < fire.guns; i++){
		var gunAnims = [];
		var o = fire.shooter.getWeaponOrigin(fire.systems[i]);

		var ox = fire.shooter.drawX + o.x;
		var oy = fire.shooter.drawY + o.y;

		for (var j = 0; j < this.shots; j++){
			var hit = 0;
			if (fire.hits[i] > j){
				hit = 1;
				hits++;
			}
			
			var dest = fire.target.getFireDest(fire, hit, hits-1);
			
			var tx = t.x + dest.x;
			var ty = t.y + dest.y;

			var shotAnim = new BallVector({x: ox, y: oy}, {x: tx, y: ty}, speed, hit);
				shotAnim.n = 0 - ((i / grouping) * delay + j*shotInterval);
			gunAnims.push(shotAnim);


			if (linked){
				ox += range(3, 6) * range(0, 1) * -1;
				oy += range(3, 6) * range(0, 1) * -1;
				tx += range(3, 6) * range(0, 1) * -1;
				ty += range(3, 6) * range(0, 1) * -1;
				var shotAnim = new BallVector({x: ox, y: oy}, {x: tx, y: ty}, speed, hit);
					shotAnim.n = 0 - ((i / grouping) * delay + j*shotInterval);
				gunAnims.push(shotAnim);
			}
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
	var t = fire.target.getPlannedPos();
		t = fire.target.getDrawPos();
		
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

				if ( isNaN(shotAnim.n) ||isNaN(shotAnim.m) ||isNaN(shotAnim.n) ){
					console.log("ERROR");
				}

			gunAnims.push(shotAnim);
		}
		allAnims.push(gunAnims)
	}
	return allAnims;
}

function Laser(system){
	Weapon.call(this, system);	
	this.optRange = system.optRange;
	this.dmgLoss = system.dmgLoss;
	this.rakeTime = system.rakeTime;
	this.output = system.rakes;
	this.beamWidth = system.beamWidth || (this.minDmg+this.maxDmg)/system.rakes/35;
	this.exploSize = (this.minDmg+this.maxDmg)/system.rakes/30;
}
Laser.prototype = Object.create(Weapon.prototype);

Laser.prototype.getDmgsPerShot = function(fire){
	if (fire.target.ship){return this.output;}
	return 1
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
		t = fire.target.getDrawPos();

	if (fire.shooter.squad){
		delay = 40; shotInterval = 5;
	}
	else if (fire.guns >= 6){
		delay = 15;
	}
	
	for (var j = 0; j < fire.guns; j++){
		var gunAnims = [];
		var o = fire.shooter.getWeaponOrigin(fire.systems[j]);
		//console.log(o.display);
		
		for (var k = 0; k < this.shots; k++){
			var tx; var ty; var tb; var a;
			var hit = 0;
			var dest;

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
				tb = getPointInDir(fire.weapon.rakeTime/4, a, tx, ty); // BEAM swipe END on HIT	
			}
			*/
			if (hit){ // shot hit
				if (fire.target.ship){dest = fire.target.getHitSection(fire);}
				else {dest = fire.target.getFireDest(fire, hit, hits-1);}

				//if (range(0, 1)){ // swipe outwards
					tx = t.x + dest.x;
					ty = t.y + dest.y;
					tb = getPointInDir(fire.weapon.output*5, range(0, 360), tx, ty);
				//}
				/*else { // swipe inwards
					tx = t.x + dest.x + (range(-20, 20));
					ty = t.y + dest.y + (range(-20, 20));
					tb = {x:  t.x + dest.x + range(-10, 10), y: t.y + dest.y + range(-10, 10)}
				}*/
			}
			else { // shot miss
				tx = fire.target.drawX + range(fire.target.size/2, fire.target.size/2) * (1-(range(0, 1)*2))
				ty = fire.target.drawY + range(fire.target.size/2, fire.target.size/2) * (1-(range(0, 1)*2))
				a = getAngleFromTo( {x: fire.target.drawX, y: fire.target.drawY}, {x: tx, y: ty} );
				//a = addToDirection(a, range(-40, 40));
				tb = getPointInDir(fire.target.size/10*fire.weapon.output, a, tx, ty); // BEAM swipe END on MISS	
				//tx = fire.target.drawX + range(-fire.target.size * 0.7, fire.target.size * 0.7); // BEAM swipe begin on MISS
				//ty = fire.target.drawY + range(-fire.target.size * 0.7, fire.target.size * 0.7);
				//a = getAngleFromTo( {x: tx, y: ty}, {x: fire.target.drawX, y: fire.target.drawY} );
				//a = addToDirection(a, range(-40, 40));
				//tb = getPointInDir(fire.weapon.rakeTime/3, a, tx, ty); // BEAM swipe END on MISS	
			}

			var shotAnim = new BeamVector(
				{x: fire.shooter.drawX + o.x, y: fire.shooter.drawY + o.y},
				//{x: fire.shooter.drawX + range(fire.shooter.size * 0.2 * -1, fire.shooter.size * 0.2), 
				//y: fire.shooter.drawY + range(fire.shooter.size * 0.2 * -1, fire.shooter.size * 0.2)},
				{x: tx, y: ty},
				{x: tb.x, y: tb.y}, 
				0 - (range(-5, 5)) - (Math.floor(j / grouping) * delay) - k*shotInterval,
				fire.weapon.output*20,
				hit
			);
			//console.log(shotAnim);

			gunAnims.push(shotAnim);
		}
		allAnims.push(gunAnims)
	}
	return allAnims;
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

Dual.prototype.getImageName = function(){
	return this.getActiveSystem().name;
}

Dual.prototype.initSubWeapons = function(weapons){
	for (var i = 0; i < weapons.length; i++){
		this.weapons[i] = new window[weapons[i].type](weapons[i]);

		//this.weapons[i].display = "HYBRID - " + this.weapons[i].display;
	}
}

Dual.prototype.init = function(){
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
	this.redrawSystemArc();
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
		$(this.getSysDiv())
		.css("left", x)
		.css("top", y)
	)
}

Dual.prototype.getSysDiv = function(){
	var d = this.getActiveSystem().getSysDiv();
	var b = ($(d).find("tbody").first())

	//b.prepend($("<tr>").append($("<td>").attr("colSpan", 2).html("Active Mode")));

	b.prepend($("<tr>").append($("<td>").attr("colSpan", 2)));
	for (var i = 0; i < this.weapons.length; i++){
		b.prepend($("<tr>").append($("<td>").attr("colSpan", 2).html("Mode: " + this.weapons[i].display)));
	}
	return d;
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
	var p = {id: this.powers.length+1,unitid: this.parentId, systemid: this.id,
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
	this.capacity = system.capacity;
	this.launchRate = system.launchRate;
	this.ammo = system.ammo;
	this.launcher = 1;
}
Launcher.prototype = Object.create(Weapon.prototype);

Launcher.prototype.init = function(){
	for (var i = 0; i < this.loads.length; i++){
		this.loads[i] = new Ballistic(this.loads[i]);
	}
	if (game.phase == -2){
	}
	else if (this.getRemAmmo() == 0 && !this.hasFireOrder()){
		this.shots = 0;
		this.forceUnpower();
	}
	else if (game.phase == -1){
		this.setBaseOutput();
	}
}

Launcher.prototype.setAmmo = function(){
	for (var i = 0; i < this.loads.length; i++){
		if (this.loads[i].amount > 0){
			this.ammo = i;
			this.output = this.loads[i].amount;
			return;
		}
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
	if (!this.canFire()){return;}
	var rem = this.getRemAmmo();
	var max = this.getMaxoutput();

	var boost = Math.min(rem, max);

	for (var i = 0; i < boost; i++){
		this.doBoost(false);
	}

	this.update();
}

Launcher.prototype.getEffiency = function(){
	return 0;
}

Launcher.prototype.getRemAmmo = function(){
	return this.output;
	return this.getMaxAmmo() - this.fireOrders.map(x => x.shots).reduce((l,r) => l+r, []);
}

Launcher.prototype.getMaxAmmo = function(){
	return this.capacity[this.ammo];
}

Launcher.prototype.getBoostDiv = function(){
	if (!this.getRemAmmo()){
		return;
	}
	return System.prototype.getBoostDiv.call(this);
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

Launcher.prototype.setFireOrder = function(){
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

Launcher.prototype.getAimDetailsUnit = function(target, final, accLoss, row){
	var final = 100;
	var traverseMod = this.getTraverseMod(target);
	
	if (!traverseMod){
		row.append($("<td>").html("<span class='green'>Full Tracking</span>"));
	} else row.append($("<td>").html("<span class='red'>-"+ Math.floor(final / 5 * traverseMod) + "% </span> (-" + traverseMod + ")"))

	if (accLoss){
		row.append($("<td>").html(" -" + accLoss + "%"));
	} else row.append($("<td>").html(""));

	final = Math.floor(final * (1-(traverseMod*0.2)) - accLoss);
	
	this.validTarget = 1;
	this.odds = final;
	row.append($("<td>").html(final + "%"));
}

Launcher.prototype.getUpgradeData = function(){
	var loads = [];
	var units = [];
	var text = this.display + ": ";
	var cost = 0;
	for (var i = 0; i < this.loads.length; i++){
		if (!this.loads[i].amount){continue;}
		loads.push({
			"amount": this.loads[i].amount,
			"cost": this.loads[i].cost,
			"name": this.loads[i].name,
			"systemid": this.id
		});
		text += this.loads[i].amount + "x " + this.loads[i].name;
		cost += this.loads[i].cost * this.loads[i].amount;
	}
	if (loads.length && this.name == "TorpedoLauncher"){cost += 1;}
	return {systemid: this.id, active: 1, units: units, loads: loads, text: text, cost: cost};
}

Launcher.prototype.getAccuracyLoss = function(dist){		
	return 0;
}

Launcher.prototype.getEffiency = function(){
	return 0;
}

Launcher.prototype.select = function(e){

	if (this.destroyed || this.disabled || this.locked || game.turnMode){return false;}

	if (game.phase == -2){
		if (!this.loadout || game.system && game.system != this.id){return;}
		if (this.selected){
			game.system = 0;
			this.selected = false;
			this.validTarget = 0;
		}
		else {this.selected = true; game.system = this.id;}
		this.setSystemBorder();
		this.setupLauncherLoadout(e);
	}
	else if (game.turn == 1 || game.phase != -1  || game.deploying || this.getOutput() == 0){
		return false;
	}
	else if (game.phase == -1 && game.getUnit(aUnit).hasPlannedMoves()){popup("This system can only be used BEFORE planning movement</br>Please reverse movement plan.");return;}

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
	this.armour = Math.floor(amount * this.armourMod);
}

Launcher.prototype.getTraverseMod = function(target){
	if (this.ammo != -1){
		return Math.max(0, (this.loads[this.ammo].traverse - target.traverse));
	}
}
Launcher.prototype.getDmgString = function(){
	if (this.ammo != -1){
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
		.find("#ammo").html("<font color='red'>" + this.getRemAmmo() + "</font> / " + this.getMaxAmmo());
}

Launcher.prototype.setupLauncherLoadout = function(e){
	var div = $("#weaponDiv");
	if (div.hasClass("disabled")){
		$(div).find("#launchRate").html(this.getOutput());
		$(div).find("#capacity").html(this.capacity);
		$(div).data("systemid", this.id).css("left", 750).css("top", 400).removeClass("disabled");
		this.initLauncherDiv();
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
			if (this.loads[index].cost == 0){ // torpedo, no cost
				this.loads[index].amount = this.capacity[index];
			}
			else { // missiles, cost
				var rate = this.launchRate[index];
				var multi = this.loads[index].amount / rate;
				if (multi % 1 == 0){multi++;}
				else multi = Math.ceil(multi);
				this.loads[index].amount = rate * multi
			}
		}
		else {
			this.loads[index].amount++;
		}
		this.updateLauncherDiv(index);
		this.canConfirm();
	}
}

Launcher.prototype.removeAmmo = function(ele, all){
	var index = 0;
	for (var i = 0; i < this.loads.length; i++){
		if (this.loads[i].name == ele.childNodes[0].innerHTML){
			index = i;
			if (this.loads[i].amount >= 1){
				if (all){
					if (this.loads[i].cost == 0){ // torpedo, no cost
						this.loads[i].amount = 0;
					}
					else {// missiles, cost
						var rate = this.launchRate[i];
						var multi = this.loads[i].amount / rate;
						if (multi % 1 == 0){multi--;}
						else multi = Math.floor(multi);
						this.loads[i].amount = rate * multi
					}
				}
				else {
					this.loads[i].amount -= 1;
				}
				this.updateLauncherDiv(index);
				return;
			}
		}
	}
}

Launcher.prototype.canConfirm = function(){
	//if (this.hasLoad()){
		$("#weaponDiv").find(".buttonTD").removeClass("disabled");
	//} else $("#weaponDiv").find(".buttonTD").addClass("disabled");
}






Launcher.prototype.initLauncherDiv = function(){
	var table = $("#weaponTable");
		table.data("systemid", this.id);

	table
		.empty()
		.append($("<tr>")
			.append($("<th>").html("Class"))
			.append($("<th>").html(""))
			.append($("<th>").html("Tracking"))
			.append($("<th>").html("Shots / Cycle"))
			.append($("<th>").html("Cost"))
			.append($("<th>").html(""))
			.append($("<th>").html("Amount"))
			.append($("<th>").html(""))
			.append($("<th>").html("Total Cost")))

	for (var i = 0; i < this.loads.length; i++){
		table
			.append($("<tr>")
				.append($("<td>").html(this.loads[i].name))
				.append($("<td>")
					.append($(this.loads[i].getElement(true)))
				)
				.append($("<td>").html(this.loads[i].systems[0].getTraverseRating() + "</br>(" + (game.getUnitType(this.loads[i].systems[0].getTraverseRating()) + ")")))
				.append($("<td>").html(this.launchRate[i]))
				.append($("<td>").html(this.loads[i].cost))
				.append($("<td>")
					.append($("<img>").addClass("size30").attr("src", "varIcons/plus.png"))
					.click(function(e){
						e.preventDefault(); e.stopPropagation();
						window.game.ships[0].getSystem($("#weaponTable").data("systemid")).addAmmo(this.parentNode, false);
					})
					.contextmenu(function(e){
						e.preventDefault(); e.stopPropagation();
						window.game.ships[0].getSystem($("#weaponTable").data("systemid")).addAmmo(this.parentNode, true);
					})
				)
				.append($("<td>").html(this.loads[i].amount))
				.append($("<td>")
					.append($("<img>").addClass("size30").attr("src", "varIcons/minus.png"))
					.click(function(e){
						e.preventDefault(); e.stopPropagation();
						window.game.ships[0].getSystem($("#weaponTable").data("systemid")).removeAmmo(this.parentNode, false);
					})
					.contextmenu(function(e){
						e.preventDefault(); e.stopPropagation();
						window.game.ships[0].getSystem($("#weaponTable").data("systemid")).removeAmmo(this.parentNode, true);
					})
				)
				.append($("<td>").html(this.loads[i].amount * this.loads[i].cost))
			)
	}

	table
		.append($("<tr>")
			.css("fontSize", 18)
			.append($("<th>").attr("colSpan", 6).css("fontSize", 18).html("Grand Total"))
			.append($("<th>"))
			.append($("<th>"))
			.append($("<th>")))

	this.setTotalBuyData();
}

Launcher.prototype.setTotalBuyData = function(){
	var table = $("#weaponTable");
	var tAmount = 0;
	var tCost = 0;

	for (let i = 0; i < this.loads.length; i++){
		tAmount += this.loads[i].amount;
		tCost += this.loads[i].amount * this.loads[i].cost;
		if (this.loads[i].amount && this.loads[i].torpedo){
			tCost = 1;
		}
	}

	table.find("tr").last().children().each(function(i){
		if (!i){return;}
		else if (i == 1){$(this).html(tAmount);}
		else if (i == 3){$(this).html(tCost);}
	});

	this.cost = tCost;
}

Launcher.prototype.updateLauncherDiv = function(index){
	var amount = this.loads[index].amount;
	var cost = this.loads[index].cost * amount;
	var tr = $($("#weaponTable").find("tr")[index+1]);
	var tds = tr.find("td");
		$(tds[6]).html(amount);
		$(tds[8]).html(cost);

	this.setTotalBuyData();
	this.canConfirm();
}

Launcher.prototype.getImpulseString = function(){
	if (this.loads[this.ammo].missile){
		return ("adds " + this.loads[this.ammo].baseImpulse + "px / Turn");
	}
	else return ("flat " + this.loads[this.ammo].baseImpulse + "px / Turn");
}

function Area(system){
	Particle.call(this, system);
	this.dmgLoss = system.dmgLoss;
	this.aoe = system.aoe;
	this.shots = system.shots;
	this.maxShots = system.maxShots;
}

Area.prototype = Object.create(Particle.prototype);

Area.prototype.select = function(){
	if (aUnit != this.parentId){return;}
	if (game.phase == -1 && game.getUnit(aUnit).hasPlannedMoves()){popup("This system can only be used BEFORE planning movement</br>Please reverse movement plan.");return;}
	if (!game.monoSystem && game.getUnit(aUnit).hasWeaponsSelected()){return;}
	Weapon.prototype.select.call(this);
	game.monoSystem = this.selected;
}

Area.prototype.createCombatLogEntry = function(fire){
	var log = $($("#combatLog").find("tbody")[0]);
	var shots = 0;
	var hits = 0;
	var armour = 0;
	var system = 0;
	var struct = 0;
	var req;
	var chance = "";

	for (var i = 0; i < fire.damages.length; i++){
		armour += fire.damages[i].armourDmg;
		system += fire.damages[i].structDmg;
		struct += fire.damages[i].overkill;
	}

	var tr = document.createElement("tr");
	var index = $(log).children().length;

	$(tr)
		.data("shooterid", fire.shooter.id)
		.data("fireid", fire.id)
		.data("row", index)
		.data("expanded", 0)
		.contextmenu(function(){
			for (var i = 0; i < game.fireOrders.length; i++){
				if (game.fireOrders[i].id == $(this).data("fireid")){
					game.fireOrders[i].animating = 0;
					break;
				}
			}

			game.redraw();
			game.fireOrders[i].anim = game.fireOrders[i].weapon.getAnimation(game.fireOrders[i]);
			$(fxCanvas).css("opacity", 1);
			game.animateSingleFireOrder(i, 0)
		})
		.click(function(){
				var startRow = $(this).data("start");
				var endRow = $(this).data("end");
				var rows = $("#combatLog").find("tbody").children();

				if ($(this).data("expanded") == 1){
					$(this).data("expanded", 0).removeClass("selected");
					for (var i = startRow; i <= endRow; i++){
						$(rows[i]).hide().removeClass("selected");
					}
				}
				else {
					$(this).data("expanded", 1).addClass("selected");
					for (var i = startRow; i <= endRow; i++){
						$(rows[i]).show().addClass("selected");
					}
				}	
		})
		.append($("<td>").html("Interrupt"))
		.append($("<th>").attr("colSpan", 4).html("<font color='" + fire.shooter.getCodeColor() + "'>" + fire.shooter.name + " #" + fire.shooter.id + "</font> firing " + fire.weapon.getDisplay()))

	$(tr)
		.append($("<td>").html(armour))
		.append($("<td>").html(system ? system : ""))
		.append($("<td>").html(struct))

	$(log).append(tr);

	var dmgs = {};
	var start = index+1;
	var depth = -1;

	for (var i = 0; i < fire.damages.length; i++){
		if (dmgs.hasOwnProperty(fire.damages[i].system)){ // hit
			dmgs[fire.damages[i].system][2]++;
		}
		else {
			depth++;
			dmgs[fire.damages[i].system] = [0, 0, 1, 0, 0, 0]; // new system entry
		}
		if (fire.damages[i].destroyed){ // kill
			dmgs[fire.damages[i].system][0]++;
		}
		if (fire.damages[i].notes[fire.damages[i].notes.length-1][0] == "o"){ //%
			dmgs[fire.damages[i].system][1] += Math.floor(fire.damages[i].notes[fire.damages[i].notes.length-1].slice(1, fire.damages[i].notes[fire.damages[i].notes.length-1].length));
		}

		dmgs[fire.damages[i].system][3] += fire.damages[i].armourDmg
		dmgs[fire.damages[i].system][4] += fire.damages[i].structDmg
		dmgs[fire.damages[i].system][5] += fire.damages[i].overkill
	}

	for (var i in dmgs){
		dmgs[i][0] = dmgs[i][0] ? "Kills: "  + dmgs[i][0] : "" 
		dmgs[i][1] = dmgs[i][1] ? "Overl.: "  + dmgs[i][1] : "" 
	}

	//dmg Details
	if (fire.damages.length){
		$(tr)
			.data("hasDetails", 1)
			.data("expanded", 0)
			.data("start", start)
			.data("end", start + depth)

		for (var i in dmgs){
			start++;
			var sub = $("<tr>")
				.hide()
				.data("row", start)
				.append($("<td>")
				)
				.append($("<td>")
					.attr("colSpan", 4)
					.html(i + " / " +dmgs[i][2] + " hits") // system name
				)

			for (var j = 3; j < dmgs[i].length; j++){
				$(sub) 
				.append($("<td>")
					.html(dmgs[i][j])
				)
			}

			$(log).append(sub);
		}
	}

	game.ui.logWrapper.find("#combatlogInnerWrapper").scrollTop(function(){return this.scrollHeight});
}

Area.prototype.setMount = function(amount){
	//if (this.name == "EnergyMine"){
		this.mount = "Catapult"; 
	//}
	this.armour = Math.floor(amount * this.armourMod);
	return;
}

Area.prototype.getAnimation = function(fire){
	var allAnims = [];
	var grouping = 2;
	var speed = this.projSpeed;
	var delay = 30;
	var shotInterval = 10;
	var cc = 0;
	var hits = 0;
	var fraction = 1;
	var t = {x: fire.rolls[0], y: fire.rolls[1]};

	if (fire.dist < 200){
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
		var ox = fire.shooter.x;
		var oy = fire.shooter.y;

		for (var k = 0; k < this.shots; k++){
			var hit = 0;
			if (fire.hits[j] > k){
				hit = 1;
				hits++;
			}
			
			var dest = {x: 0, y: 0};
			
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

Area.prototype.getAimData = function(target, final, dist, row){
	if (target){		
		if (this.freeAim){
			row
			.append($("<td>").attr("colSpan", 4).html("<span>Unable to target specific unit.</span>"))
			this.validTarget = 0;
			this.odds = 0;
		} else return Weapon.prototype.getAimData.call(this, target, final, dist, row);
	}
	else {
		if (this.maxRange && dist > this.maxRange){
			row.append($("<td>").attr("colSpan", 4).addClass("red").html("Insufficient Range, max: " + this.maxRange));
			this.validTarget = 0;
			this.odds = 0;
		}
		else {
			row
			.append($("<td>"))
			.append($("<td>").attr("colSpan", 2).html("</span>Maximal deviation:</span>"))
			.append($("<td>").attr("colSpan", 1).html(Math.floor(dist/100 * this.getAccuracy()) + "<span> px</span>"));
			this.validTarget = 1;
			this.odds = 1;
		}
	}
}

Area.prototype.setFireOrder = function(targetid, pos){
	if (this.odds <= 0){return;}
	this.fireOrders.push(
		{id: 0, turn: game.turn, shooterid: this.parentId, targetid: targetid, x: pos.x, y: pos.y, weaponid: this.id, 
		shots: 0, req: -1, notes: "", hits: -1, resolved: 0}
	);
	this.selected = 0;
	game.monoSystem = 0;
	this.validTarget = 0;
	this.highlight = 0;
	this.setSystemBorder();
	game.addEvent(this);
}

Area.prototype.unsetFireOrder = function(){
	System.prototype.unsetFireOrder.call(this);
	game.removeEvent(this);
}

Area.prototype.highlightFireOrder = function(){
	return;
}

Area.prototype.handleAimEvent = function(o, t){
	var dist = getDistance(o, t);

	salvoCtx.translate(cam.o.x, cam.o.y);
	salvoCtx.scale(cam.z, cam.z)
	salvoCtx.translate(o.x, o.y);

	salvoCtx.beginPath();
	salvoCtx.moveTo(0, 0);
	salvoCtx.translate(-o.x + t.x, -o.y + t.y);
	salvoCtx.lineTo(0, 0);
	salvoCtx.closePath();
	salvoCtx.strokeStyle = "white";
	salvoCtx.lineWidth = 1;
	salvoCtx.globalAlpha = 0.4;
	salvoCtx.stroke();

	salvoCtx.beginPath();
	salvoCtx.arc(0, 0, dist/100*this.getAccuracy(), 0, 2*Math.PI, false);
	salvoCtx.closePath();
	salvoCtx.fillStyle = "white";
	salvoCtx.globalAlpha = 0.2;
	salvoCtx.fill();

	salvoCtx.beginPath();
	salvoCtx.arc(0, 0, this.aoe, 0, 2*Math.PI, false);
	salvoCtx.closePath();
	//salvoCtx.globalCompositeOperation = "source-over";
	//salvoCtx.fillStyle = this.getEffectFillStyle(0, 0, dist);
	//salvoCtx.fillStyle = "red";
	//salvoCtx.globalAlpha = 0.4;
	//salvoCtx.fill();

	salvoCtx.strokeStyle = "red";
	salvoCtx.globalAlpha = 0.5;
	salvoCtx.lineWidth = 3;
	salvoCtx.stroke();
	salvoCtx.lineWidth = 1;

	salvoCtx.fillStyle = "white";
	salvoCtx.globalAlpha = 1;
	salvoCtx.setTransform(1, 0, 0, 1, 0, 0);
}

Area.prototype.highlightEvent = function(){
	var o = game.getUnit(this.parentId);
	if (!o.friendly && game.phase != 2){return;}
	var t = this.fireOrders[this.fireOrders.length-1];
	var dist = getDistance(o, t);

	if (game.phase != 2 && !o.friendly){
		//t = getPointInDir(this.maxRange, getAngleFromTo(o, t), o.x, o.y);
		t = getPointInDir(game.arcRange, getAngleFromTo(o, t), o.x, o.y);
	}

	if (!o.friendly && game.phase != 2){return;}

	salvoCtx.translate(cam.o.x, cam.o.y);
	salvoCtx.scale(cam.z, cam.z)
	salvoCtx.translate(o.x, o.y);

	salvoCtx.beginPath(); // vector
	salvoCtx.moveTo(0, 0);
	salvoCtx.translate(-o.x + t.x, -o.y + t.y);
	salvoCtx.lineTo(0, 0);
	salvoCtx.closePath();
	salvoCtx.strokeStyle = "white";
	salvoCtx.globalAlpha = 0.25;
	salvoCtx.stroke();

	salvoCtx.beginPath(); // devi
	salvoCtx.arc(0, 0, dist/100*this.getAccuracy(), 0, 2*Math.PI, false);
	salvoCtx.closePath();
	salvoCtx.fill();

	salvoCtx.globalAlpha = 0.5;

	/*
		if (game.phase == 2){ // devi vector
			salvoCtx.beginPath();
			salvoCtx.moveTo(0, 0);
			salvoCtx.translate(o.x - t.x, o.y - t.y);
			salvoCtx.translate(-o.x + t.rolls[0], -o.y + t.rolls[1]);
			salvoCtx.lineTo(0, 0);
			salvoCtx.closePath();
			salvoCtx.strokeStyle = "yellow";
			salvoCtx.stroke();
			//salvoCtx.drawImage(this.img, -this.img.width/2 , -this.img.height/2, this.img.width, this.img.height
		}
	*/

	salvoCtx.beginPath();
	salvoCtx.arc(0, 0, this.aoe, 0, 2*Math.PI, false);
	salvoCtx.closePath();
	salvoCtx.lineWidth = 3;
	salvoCtx.strokeStyle = "red";
	salvoCtx.stroke();

	salvoCtx.lineWidth = 1;
	salvoCtx.fillStyle = "white";
	salvoCtx.strokeStyle = "white";
	salvoCtx.globalAlpha = 1;
	salvoCtx.setTransform(1,0,0,1,0,0);
}

Area.prototype.initEvent = function(){
	return;
	var o = game.getUnit(this.parentId);
	var t = this.fireOrders[this.fireOrders.length-1];
	var dist = getDistance(o, t);

	var c = document.createElement("canvas");
		c.width = dist*2;
		c.height = dist*2;		
	var ctx = c.getContext("2d");
		ctx.translate(c.width/2, c.height/2);

	ctx.globalAlpha = 1;
	ctx.beginPath();
	ctx.arc(0, 0, this.aoe, 0, 2*Math.PI, false);
	ctx.closePath();
	//ctx.globalCompositeOperation = "source-over";
	//ctx.fillStyle = this.getEffectFillStyle(0, 0, dist);

	//ctx.strokeStyle = "red";
	//ctx.lineWidth = 3;
	//ctx.stroke();
	ctx.lineWidth = 1;

	ctx.fillStyle = "white";
	ctx.setTransform(1, 0, 0, 1, 0, 0);

	this.img = c;
}

Area.prototype.getEffectFillStyle = function(x, y, dist){
	var grad = fxCtx.createRadialGradient(x, y, 0, x, y, this.aoe);
	var loss = this.dmgLoss * this.getRangeDmgMod();

	//grad.addColorStop(1, "red");
	grad.addColorStop(1, "rgba(255, 0, 0, 0)");
	grad.addColorStop(0.9, "rgba(255, 0, 0, 255)");
	grad.addColorStop(0.5, "yellow");
	grad.addColorStop(0.0, "green");
			
	return grad;
}

Area.prototype.hasEvent = function(){
	if (game.phase == 3){return false;}
	for (var i = this.fireOrders.length-1; i >= 0; i--){
		if (this.fireOrders[i].turn == game.turn){
			this.initEvent();
			return true;
		}
	}
	return false;
}


Area.prototype.getSysDiv = function(){
	var div = document.createElement("div");
		div.id = "systemDetailsDiv";
	var table = document.createElement("table");
	
	$(table).append($("<tr>").append($("<th>").html(this.display).attr("colSpan", 2)));
	$(table).append($("<tr>").append($("<td>").html("Firing Mode").css("width", "60%")).append($("<td>").html(this.fireMode)));
	$(table).append($("<tr>").append($("<td>").html("Damage Type").css("width", "60%")).append($("<td>").html(this.dmgType)));


	if (game.getUnit(this.parentId).ship){
		$(table).append($("<tr>").append($("<td>").html("Integrity")).append($("<td>").html(this.getRemIntegrity() + " / " + this.integrity)));
		$(table).append($("<tr>").append($("<td>").html("Mount / Armour")).append($("<td>").html(this.getMount())));
	}

	$(table).append($("<tr>").append($("<td>").html("Power Req")).append($("<td>").addClass("powerReq").html(this.getPowerReqString())));
	$(table).append($("<tr>").append($("<td>").html("Loading")).append($("<td>").addClass("loading").html(this.getTimeLoaded() + " / " + this.reload)));

	if (this.boostEffect.length && !(this instanceof Launcher)){
		$(table).append($("<tr>").css("border-top", "2px solid white").append($("<td>").html("Boost Power Cost")).append($("<td>").addClass("powerCost").html(this.getEffiency() + " (max: " + this.maxBoost + ")")));
		this.getBoostEffectElements(table);
	}

	//$(table).append($("<tr>").append($("<td>").html("Max Range")).append($("<td>").html(this.maxRange)));
	$(table).append($("<tr>").append($("<td>").html("Area of Effect")).append($("<td>").html(this.aoe + "px")));
		$(table).append($("<tr>").append($("<td>").html("Max Range")).append($("<td>").html(this.maxRange)));
	//$(table).append($("<tr>").append($("<td>").html("Accuracy loss")).append($("<td>").addClass("accuracy").html(this.getAccuracy() + "px / 100px")));
	$(table).append($("<tr>").append($("<td>").html("Accuracy loss")).append($("<td>").addClass("accuracy").html(this.getAccuracy() + "px / 100px")));
	$(table).append($("<tr>").append($("<td>").html("Launch Rate")).append($("<td>").html("Up to <span class='red'>" + this.maxShots + "</span> / cycle")));

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

Area.prototype.drawSystemArc = function(facing, rolled, pos){
	//var oldRange = game.arcRange;
	//game.arcRange = this.maxRange;
	System.prototype.drawSystemArc.call(this, facing, rolled, pos);
	//game.arcRange = oldRange;
}

Area.prototype.getResolvingFireOrders = function(){
	if (game.phase != 2){return false;}
	for (var i = this.fireOrders.length-1; i >= 0; i--){
		if (this.fireOrders[i].turn == game.turn){
			return this.fireOrders[i];
		}
	}
	return false;
}

function Bulkhead(system){
	PrimarySystem.call(this, system);
	this.loaded = 1;
}
Bulkhead.prototype = Object.create(PrimarySystem.prototype);

Bulkhead.prototype.setMount = function(amount){
	this.mount = "";
	this.armour =  Math.floor(amount * this.armourMod);
}

Bulkhead.prototype.drawSystemArc = function(){
	console.log(this);
	return;
}

Bulkhead.prototype.select = function(){
	return;
}

Bulkhead.prototype.getSysDiv = function(){
	var div = document.createElement("div");
		div.id = "systemDetailsDiv";
	var table = document.createElement("table");
		
	var tr = document.createElement("tr");		
	var th = document.createElement("th");
		th.colSpan = 2; th.innerHTML = this.display; th.style.width = "40%"; tr.appendChild(th); table.appendChild(tr);

	$(table).append($("<tr>").append($("<td>").html("Integrity")).append($("<td>").html(this.getRemIntegrity() + " / " + this.integrity)));
	$(table).append($("<tr>").append($("<td>").html("Armour")).append($("<td>").html(this.getMount())));
	div.appendChild(table);		
	return div;
}

function Hangar(system){
	PrimarySystem.call(this, system);
	this.start = 0;
	this.end = 0;
	this.reload = system.reload;
	this.launchRate = system.launchRate;
	this.capacity = system.capacity;
	this.mission = 0;
	this.hangar = 1;
}
Hangar.prototype = Object.create(PrimarySystem.prototype);


Hangar.prototype.init = function(){
	for (var i = 0; i < this.loads.length; i++){
		this.loads[i] = new Fighter(this.loads[i]);
		let add = 1;

		for (let j = 0; j < game.fighters.length; j++){
			if (game.fighters[j].name == this.loads[i].name){
				add = 0; break;
			}
		}

		if (add){
			game.fighters.push(new Fighter(this.loads[i]));
		}
	}

}

Hangar.prototype.setTimeLoaded = function(){
	return System.prototype.setTimeLoaded.call(this)
}

Hangar.prototype.getResolvingFireOrders = function(){
	return false;
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
	var loads = [];
	var units = [];
	var text = this.display + ": ";
	var cost = 0;
	for (var i = 0; i < this.loads.length; i++){
		if (!this.loads[i].amount){continue;}
		loads.push({
			"amount": this.loads[i].amount,
			"cost": this.loads[i].cost,
			"name": this.loads[i].name,
			"systemid": this.id
		});
		cost += this.loads[i].cost * this.loads[i].amount;
	}
	text += this.loads.map(x => x.amount).reduce((l, r) => l+r, 0) + " fighters";
	return {systemid: this.id, active: 1, units: units, loads: loads, text: text, cost: cost};
}

Hangar.prototype.setFireOrder = function(targetid, pos){
	this.fireOrders.push(
		{id: 0, turn: game.turn, shooterid: this.parentId, targetid: 0, x: pos.x, y: pos.y, weaponid: this.id, 
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

	if (this.destroyed || this.disabled || this.locked || this.parentId != aUnit || game.turnMode){
		return false;
	}
	else if (game.phase == -2){
		if (game.system && game.system != this.id){return;}
		if (this.selected){
			game.system = 0;
			this.selected = false;
		} else {this.selected = true; game.system = this.id;}
		this.setupHangarLoadout(e);
	}
	else if (!this.selected && game.getUnit(this.parentId).userid == game.userid && !ship.hasSystemsSelected()){
		this.selected = true;
		this.switchHangarDiv(e);
	}
	else {
		this.selected = false;
		this.mission = 0;
		$("#hangarDiv")
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
			if (game.ships[i].launch.shipid == this.parentId && game.ships[i].launch.systemid == this.id){
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
	this.mount = "";
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

Hangar.prototype.switchHangarDiv = function(e){
	var div = $("#hangarDiv");
		$("#launchRate").html(this.getLaunchRate());
		$("#capacity").html(this.capacity);
	this.unsetFireOrder();
	this.doUndoActions();
	this.showHangarLaunchControl(e);

	if (div.hasClass("disabled")){
		var h = (div.height());
		if (e.clientY + h > window.res.y){
			div.data("systemid", this.id).css("left", e.clientX +100).css("top", window.res.y - h - 30).removeClass("disabled");
		} else div.data("systemid", this.id).css("left", e.clientX +200).css("top", e.clientY - 100).removeClass("disabled");
	}
	else {
		div.addClass("disabled");
	}

	
	if (game.phase != -1 || this.parentId < 0 || game.getUnit(this.parentId).available == game.turn){
		div.find("#missionType").hide();
	} else div.find("#missionType").show();
}

Hangar.prototype.showHangarLaunchControl = function(){
	var table = $("#hangarTable");
		table
			.empty()
			.append($("<tr>")
				.append($("<th>").html("Class"))
				.append($("<th>").html(""))
				.append($("<th>").html("Available"))
				.append($("<th>").html(""))
				.append($("<th>").html(""))
				.append($("<th>").html("to Launch")))


	var id = this.id;

	for (var i = 0; i < this.loads.length; i++){
		table
			.append($("<tr>")
				.append($("<td>").html(this.loads[i].name))
				.append($("<td>")
					.append($(this.loads[i].getElement(true)))
				)
				.append($("<td>").html(this.loads[i].amount))
				.append($("<td>")
					.append($("<img>").addClass("size30").attr("src", "varIcons/plus.png").data("name", this.loads[i].name).data("val", 1)
					.click(function(e){
						e.preventDefault(); e.stopPropagation();
						game.getUnit(aUnit).getSystem(id).alterFlight(this, false);
					})
					.contextmenu(function(e){
						e.preventDefault(); e.stopPropagation();
						game.getUnit(aUnit).getSystem(id).alterFlight(this, true);
					})
				))
				.append($("<td>")
					.append($("<img>").addClass("size30").attr("src", "varIcons/minus.png").data("name", this.loads[i].name).data("val", -1)
					.click(function(e){
						e.preventDefault(); e.stopPropagation();
						game.getUnit(aUnit).getSystem(id).alterFlight(this, false);
					})
					.contextmenu(function(e){
						e.preventDefault(); e.stopPropagation();
						game.getUnit(aUnit).getSystem(id).alterFlight(this, true);
					})
				))
				.append($("<td>").html(this.loads[i].launch).attr("id", this.loads[i].name + "Amount")));
	}


	var mission = this.getMission();
	var element = $("#hangarDiv");
		$(element)
			.data("mission", mission)
			.data("systemid", id)
			.find("#missionType")
				.find("tr").each(function(i){
					if (i){
						$(this).off("click");
						$(this).click(function(){
							game.getUnit(aUnit).getSystem($("#hangarDiv").data("systemid")).setMission(i);
						})
					}
				})

	this.triggerLaunchButton();
}

Hangar.prototype.triggerLaunchButton = function(){
	if (this.canLaunchFlight()){
		$("#hangarDiv").find(".buttonTD").removeClass("disabled");
	}
	else {
		game.flightDeploy = 0;
		$("#deployOverlay").hide();
		$("#hangarDiv").find(".buttonTD").addClass("disabled");
	}
}

Hangar.prototype.setMission = function(val){
	this.mission = val;

	$("#hangarDiv").find("#missionType").find("tr").each(function(i){
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
			if (game.ships[i].flight && game.ships[i].available == game.turn && game.ships[i].actions[0].resolved){
				if (game.ships[i].launch.shipid == window.aUnit && game.ships[i].launch.systemid == this.id){
					game.ships.splice(i, 1);
					game.draw();
					break;
				}
			}
		}
	}
	instruct("Select a Deploy point. The flight's facing will be projected onwards the launching vessel.");
	game.setupDeployDiv();
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
			this.loads[i].amount += add;
			this.updateHangarDiv(i);
			return;
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
		if (this.loads[i].display == display){
			if (tMass + this.loads[i].mass <= this.output){
				this.loads[i].amount += add;
				this.updateHangarDiv(i);
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
				this.updateHangarDiv(i);
				return;
			}
		}
	}
}

Hangar.prototype.canConfirm = function(){
	//if (this.hasLoad()){
		$("#hangarDiv").find(".buttonTD").removeClass("disabled");
	//} else $("#hangarDiv").find(".buttonTD").addClass("disabled");
}

Hangar.prototype.initHangarPurchaseDiv = function(){
	var table = $("#hangarTable");

	table
		.empty()
		.append($("<tr>")
			.append($("<th>").html("Class"))
			.append($("<th>").html(""))
			.append($("<th>").html("Cost").css("width", 40))
			.append($("<th>").html(""))
			.append($("<th>").html("Amount").css("width", 70))
			.append($("<th>").html(""))
			.append($("<th>").html("Total Cost").css("width", 70)))

	for (var i = 0; i < this.loads.length; i++){
		table
			.append($("<tr>")
				.append($("<td>").html(this.loads[i].name))
				.append($("<td>")
					.append($(this.loads[i].getElement(true)))
				)
				.append($("<td>").html(this.loads[i].cost))
				.append($("<td>")
					.append($("<img>").addClass("size30").attr("src", "varIcons/plus.png"))
					.click(function(e){
						e.preventDefault(); e.stopPropagation();
						window.game.ships[0].getSystem($("#hangarDiv").data("systemid")).addFighter(this.parentNode, false);
					})
					.contextmenu(function(e){
						e.preventDefault(); e.stopPropagation();
						window.game.ships[0].getSystem($("#hangarDiv").data("systemid")).addFighter(this.parentNode, true);
					})
				)
				.append($("<td>").html(this.loads[i].amount))
				.append($("<td>")
					.append($("<img>").addClass("size30").attr("src", "varIcons/minus.png"))
					.click(function(e){
						e.preventDefault(); e.stopPropagation();
						window.game.ships[0].getSystem($("#hangarDiv").data("systemid")).removeFighter(this.parentNode, false);
					})
					.contextmenu(function(e){
						e.preventDefault(); e.stopPropagation();
						window.game.ships[0].getSystem($("#hangarDiv").data("systemid")).removeFighter(this.parentNode, true);
					})
				)
				.append($("<td>").html(this.loads[i].amount * this.loads[i].cost))
			)
	}

	table
		.append($("<tr>")
			.css("fontSize", 18)
			.append($("<th>").attr("colSpan", 4).css("fontSize", 18).html("Grand Total"))
			.append($("<th>"))
			.append($("<th>"))
			.append($("<th>")))

	this.setTotalBuyData();
}

Hangar.prototype.setTotalBuyData = function(){
	var table = $("#hangarTable");
	var tAmount = 0;
	var tCost = 0;

	for (let i = 0; i < this.loads.length; i++){
		tAmount += this.loads[i].amount;
		tCost += this.loads[i].amount * this.loads[i].cost;
	}

	table.find("tr").last().children().each(function(i){
		if (!i){return;}
		else if (i == 1){$(this).html(tAmount);}
		else if (i == 3){$(this).html(tCost);}
	});

	this.cost = tCost;
}

Hangar.prototype.updateHangarDiv = function(index){
	var amount = this.loads[index].amount;
	var cost = this.loads[index].cost * amount;
	var tr = $($("#hangarTable").find("tr")[index+1]);
	var tds = tr.find("td");
		$(tds[4]).html(amount);
		$(tds[6]).html(cost);

	this.setTotalBuyData();
	this.canConfirm();
}

Hangar.prototype.setupHangarLoadout = function(e){
	var div = document.getElementById("hangarDiv");
	if ($(div).hasClass("disabled")){
		$(div).find("#launchRate").html(this.getOutput());
		$(div).find("#capacity").html(this.capacity);
		$(div).data("systemid", this.id).css("left", 750).css("top", 400).removeClass("disabled");
		this.initHangarPurchaseDiv();
	}
	else {
		window.game.setUnitTotal();
		$(div).addClass("disabled");
	}
}

Hangar.prototype.getSysDiv = function(){
	var div = $("<div>")
		.attr("id", "systemDetailsDiv")
		.append($("<table>")
			.append($("<tr>").append($("<th>").attr("colSpan", 2).html(this.display).css("width", "40%")))
			.append($("<tr>").append($("<td>").html("Integrity")).append($("<td>").html(this.getRemIntegrity() + " / " + this.integrity)))
			.append($("<tr>").append($("<td>").html("Armour")).append($("<td>").html(this.getMount())))
			.append($("<tr>").append($("<td>").html("Capacity")).append($("<td>").html("up to " + this.capacity + " units")))
			.append($("<tr>").append($("<td>").html("Launch Rate")).append($("<td>").html(this.getLaunchRate() + " each " + this.reload + " turns"))))
	this.attachDetailsMods(div);
		
	return div;
}

