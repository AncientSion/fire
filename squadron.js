function Squaddie(data){
	Single.call(this, data);
	this.structures = [];
	this.size = data.size;
	this.index = data.index;
	this.ew = data.ew;
	this.power = data.power;
	this.remNegation = data.remNegation;
	this.bonusNegation = data.bonusNegation;
	this.boostEffect = data.boostEffect;
	this.effiency = data.effiency;
	this.parentIntegrity = data.parentIntegrity;
	this.armourDmg = data.armourDmg;
	this.space = data.space;
	this.powers = data.powers;
	this.armourElement;
	this.type = "Main ";

	this.baseTurnDelay = data.baseTurnDelay;
	this.baseImpulseCost = data.baseImpulseCost;
	this.baseImpulse = data.baseImpulse;

}

Squaddie.prototype = Object.create(Single.prototype);

Squaddie.prototype.create = function(){
	this.setElement();
}

Squaddie.prototype.setElement = function(){
	this.element = $("<div>")
		.addClass("unitContainer")
		.data("shipId", this.parentId)
		.data("systemId", this.id);
}

Squaddie.prototype.hover = function(e){
	if (game.flightDeploy){return false;}

	if (this.highlight){
		this.highlight = false;
		this.hideInfoDiv(e);
	}
	else {
		this.highlight = true;
		this.showInfoDiv(e);
	}
}

Squaddie.prototype.showInfoDiv = function(e){
	$(document.body).append(
		$(this.getSystemDetailsDiv())
			.css("left", e.clientX - 90)
			.css("top", e.clientY + 50)
		)
}

Squaddie.prototype.hideInfoDiv = function(){
	$("#systemDetailsDiv").remove();
}

Squaddie.prototype.getSystemDetailsDiv = function(){
	var div = 
		$("<div>").attr("id", "systemDetailsDiv")
			.append($("<table>")
				.append($("<tr>")
					.append($("<th>").html(this.display).attr("colSpan", 2)))
				.append($("<tr>")
					.append($("<td>").html(this.role).attr("colSpan", 2)))
				.append($("<tr>")
					.append($("<td>").html("Main Structure"))
					.append($("<td>").html(this.remaining + " / " + this.integrity)))
				.append($("<tr>")
					.append($("<td>").html("Main Armour"))
					.append($("<td>").html(this.remNegation + " / " + this.negation)))
				.append($("<tr>")
					.append($("<td>").html("Sensor Output"))
					.append($("<td>").html(this.ew)))
				.append($("<tr>")
					.append($("<td>").html("Reactor Output"))
					.append($("<td>").html(this.power)))
				.append($("<tr>")
					.append($("<td>").html("Engine Output"))
					.append($("<td>").html(this.ep)))
				.append($("<tr>")
					.append($("<td>").html("Base Hit Chance"))
					.append($("<td>").html(this.baseHitChance + " %")))
			)


	if (this.crits.length){
		table = $("<table>").addClass("modifiers").append($("<tr>").append($("<th>").html("Modifiers").attr("colSpan", 2)));
		for (var i = 0; i < this.crits.length; i++){
			if (this.crits[i].inEffect()){
				var html = "Disengaged + T (" + this.crits[i].turn + ")"
				$(table[0]).append($("<tr>").append($("<td>").html(html).attr("colSpan", 2).addClass("negative")));
			}
		}
		div.append(table)
	}
	

	return div;
}

Squaddie.prototype.expandElement = function(){

	var img = $(this.getBaseImage().cloneNode(true)).addClass("size70 rotate270");

	if (this.destroyed){ // RED X
		$(this.element)
			.append($("<img>")
			.attr("src", "varIcons/destroyed.png")
			.addClass("overlay")//.css("width", cWidth).css("height", cHeight)
			.hover(function(e){
				var data = $(this).closest(".unitContainer").data();
				game.getUnit(data.shipId).getSystem(data.systemId).hover(e);
			}))
	}
	else {
		img.click(function(){
			var data = $(this).closest(".unitContainer").data();
			console.log(game.getUnit(data.shipId).getSystem(data.systemId));
		})
		.hover(
			function(e){
				var data = $(this).closest(".unitContainer").data();
				game.getUnit(data.shipId).getSystem(data.systemId).hover(e);
			}
		)
	}


	var pDiv = $("<div>")
		.addClass("primaryDiv")
	var cTable = $("<table>")
		.addClass("primaryTable")
		.append(this.getCoreData())
		.append(this.getArmourData())
		.append($("<tr>")
			.append($("<td>").attr("colspan", 3)
				.append(img)
			)
		)

	// power icon
	if (!this.destroyed){
		$(this.element)
		.append($("<div>").addClass("info")
			.append($("<img>").attr("src", "varIcons/mainPower.png")
				.addClass("mainPowerIcon"))
			.append($("<div>")
				.addClass("mainPower")
				.html(this.getUnusedPower())))
	}

	//core div and core table
	$(this.element)
		.append($(pDiv)
		.append(cTable));

	var cWidth = $(this.element).width();
	var cHeight = $(this.element).height();

	var pWidth = $(pDiv).width();
	var pHeight = $(pDiv).height();

	var primPosX = cWidth/2 - pWidth/2;
	var primPosY = cHeight/2 - pHeight/2 + 5;


	$(pDiv)
		.css("left", primPosX)
		.css("top", primPosY)

	for (var i = 0; i < this.structures.length; i++){
		var a = getLayoutDir(this.structures[i]);
		var p = getPointInDir(pWidth - 15, a-90, primPosX, primPosY);
		var s = 24;

		var oX = 0;
		var oY = 0;

		var shiftX = s;
		var shiftY = s;

		var space = 10;

		if (a == 0 || a == 360 || a == 180){
			if (this.structures[i].systems.length == 2){
				oX = -s/2 - space/2;
			}
			else if (this.structures[i].systems.length == 3){
				oX = -s - space;
			}
			else if (this.structures[i].systems.length == 4){
				oX = -s -space*3;
			}
		}
		else {
			if (this.structures[i].systems.length > 1){
				oY = -s*this.structures[i].systems.length;
			} else oY = -pHeight / 4;
		}

		for (var j = 0; j < this.structures[i].systems.length; j++){
			var ele = this.attachEvent(this.structures[i].systems[j].getDiv());
			if (this.id > 0 && game.phase == -1){
				var boostDiv = this.structures[i].systems[j].getBoostDiv();
				if (boostDiv){ele.appendChild(boostDiv)};
				var powerDiv = this.structures[i].systems[j].getPowerDiv();
				if (powerDiv){ele.appendChild(powerDiv);}
				var modeDiv = this.structures[i].systems[j].getModeDiv();
				if (modeDiv){ele.appendChild(modeDiv);}
			}


			$(this.element)
			.append(
				$(ele)
					.css("left", p.x - s/2 + pWidth/2 + oX)
					.css("top", p.y - s/2 + pWidth/2 + oY)
				)

			if (oX){oX += shiftX + space +1;}
			else if (oY){oY += shiftY + space*2;}

		}
	}
}

Squaddie.prototype.attachEvent = function(ele){
	$(ele)
	.data("shipId", this.parentId)
	.hover(
		function(e){
			e.stopPropagation();
			game.getUnit($(this).data("shipId")).getSystem($(this).data("systemId")).hover(e);
		}
	).click(
		function(e){
			e.stopPropagation();
			game.getUnit($(this).data("shipId")).getSystem($(this).data("systemId")).select(e);
		}
	).
	contextmenu(
		function(e){
			e.preventDefault();
			if (!game.sensorMode){game.getUnit($(this).data("shipId")).selectAll(e, $(this).data("systemId"));}
		}
	);
	return ele;
}

Squaddie.prototype.canBoost = function(system){
	return Ship.prototype.canBoost.call(this, system);
}

Squaddie.prototype.getUnusedPower = function(){
	var output = this.power;
	var use = 0;

	use += this.getPowerUsage();
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].isPowered()){
				use += this.structures[i].systems[j].getPowerUsage();
			}
		}
	}

	return output - use;
}

Squaddie.prototype.updateShipPower = function(system){
	$(this.element).find(".mainPower").html(this.getUnusedPower()).end();
	system.update();
}

Squaddie.prototype.update = function(){
	this.updateSystemDetailsDiv();
}

Squaddie.prototype.updateSystemDetailsDiv = function(){
	$("#systemDetailsDiv")
		.find(".boostEffect").html(this.getBoostEffect("Armour") * this.getBoostLevel()).end()
		.find(".powerCost").html(this.getEffiency());
	$(this.armourElement).find(".integrityAmount").html(this.getArmourString());
}

Squaddie.prototype.unpowerSystemsByName = function(name){
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (!this.structures[i].systems[j].isPowered() || this.structures[i].systems[j].getActiveSystem().name != name){continue;}
			this.structures[i].systems[j].doUnpower();
		}
	}
}

Squaddie.prototype.powerSystemsByName = function(name){
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].isPowered() || this.structures[i].systems[j].getActiveSystem().name != name){continue;}
			this.structures[i].systems[j].doPower();
		}
	}
}

Squaddie.prototype.switchSystemsByName = function(name){
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (!this.structures[i].systems[j].dual || this.structures[i].systems[j].getLoadLevel() != 1){continue;}
			if (this.structures[i].systems[j].getActiveSystem().name == name){
				this.structures[i].systems[j].switchMode();
			}
		}
	}
}

Squaddie.prototype.getSystem = function(id){
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].id == id){
				return this.structures[i].systems[j];
			}
		}
	}
}

Squaddie.prototype.getCoreData = function(){
	var core = $("<tr>")
	.append($("<td>")
		.addClass("struct")
		.attr("colSpan", 3)
		.append($("<div>")
			.addClass("integrityAmount")
			.addClass("font15")
			.html(this.remaining + " / " + this.integrity)
		)
		.append($("<div>")
			.addClass("integrityNow")
			.css("width",  (this.remaining/this.integrity * 100) + "%")
		)
		.append($("<div>")
			.addClass("integrityFull")
		)
	)
	return core;
}

Squaddie.prototype.getArmourData = function(){
	this.armourElement = $("<tr>")
	.append($("<td>")
		.addClass("armour")
		.attr("colSpan", 3)
		.append($("<div>")
			.addClass("integrityAmount")
			.addClass("font15")
			.html(this.getArmourString())
		)
		.append($("<div>")
			.addClass("integrityNow")
			.css("width",  (this.getRemNegation()/this.negation * 100) + "%")
		)
		.append($("<div>")
			.addClass("integrityFull")
		)
	)

	if (game.turn > 0){
		if (game.phase == -1){
			if (this.getBoostEffect("Armour")){
				this.armourElement.find("td")
				.append(this.getBoostDiv())
			}
		}
		
		this.armourElement
		.find("td")
		.hover(
			function(e){
				var data = $(this).closest(".unitContainer").data();
				game.getUnit(data.shipId).getSystem(data.systemId).armourIn(e);
			},
			function(e){
				var data = $(this).closest(".unitContainer").data();
				game.getUnit(data.shipId).getSystem(data.systemId).armourOut(e);
			}
		)
	}

	return this.armourElement;
}

Squaddie.prototype.getArmourString = function(){
	return Structure.prototype.getArmourString.call(this);
}

Squaddie.prototype.armourIn = function(e){
	$(document.body).append(
		$(Structure.prototype.getSystemDetailsDiv.call(this))
			.css("left", e.clientX - 90)
			.css("top", e.clientY + 40)
		)
	if (game.phase != -1 || !this.effiency || game.getUnit(this.parentId).userid != game.userid){return;}
	$(this.armourElement).find(".boostDiv").show();
}

Squaddie.prototype.armourOut = function(e){
	Structure.prototype.hideInfoDiv.call(this, e);
	if (game.phase != -1 || !this.effiency || game.getUnit(this.parentId).userid != game.userid){return;}
	$(this.armourElement).find(".boostDiv").hide();
}

Squaddie.prototype.doDestroy = function(){
	this.doDraw = 0;
	for (var i = 0; i < this.structures.length; i++){
		for (var k = 0; k < this.structures[i].systems.length; k++){
			this.structures[i].systems[k].destroyed = true;
		}
	}
}

Squaddie.prototype.drawSystemArc = function(){
	return;
}

Squaddie.prototype.getRemNegation = function(){
	return Structure.prototype.getRemNegation.call(this);
}

Squaddie.prototype.getPowerUsage = function(){
	return System.prototype.getPowerUsage.call(this);
}

Squaddie.prototype.getEffiency = function(){
	return System.prototype.getEffiency.call(this);
}

Squaddie.prototype.getBoostCostIncrease = function(){
	return 0.5;
}

Squaddie.prototype.getBoostDiv = function(){
	return System.prototype.getBoostDiv.call(this);
}

Squaddie.prototype.getBoostLevel = function(){
	return System.prototype.getBoostLevel.call(this);
}

Squaddie.prototype.plus = function(){
	return System.prototype.plus.call(this, false);
}

Squaddie.prototype.minus = function(){
	return System.prototype.minus.call(this, false);
}

Squaddie.prototype.doBoost = function(){
	return System.prototype.doBoost.call(this);
}

Squaddie.prototype.canUnboost = function(){
	return System.prototype.canUnboost.call(this);
}

Squaddie.prototype.doUnboost = function(){
	return System.prototype.doUnboost.call(this);
}

Squaddie.prototype.getBoostEffect = function(val){
	return System.prototype.getBoostEffect.call(this, val);
}

Squaddie.prototype.previewSetup = function(){
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].loadout){
				$(this.structures[i].systems[j].element).addClass("bgYellow");
			}
		}
	}
}


























function Squadron(data){
	Ship.call(this, data);
	this.squad = 1;
	this.ship = 0;
	this.index = 2;
	this.primary = {"systems": []};
	this.slots = data.slots;
}

Squadron.prototype = Object.create(Ship.prototype);


Squadron.prototype.create = function(){
	if (game.turn > 1 && game.phase == -1 && this.available == game.turn){
		this.x = this.actions[0].x;
		this.y = this.actions[0].y;
		this.drawX = this.actions[0].x;
		this.drawY = this.actions[0].y;
	}
	if (!this.structures.length){
		this.currentImpulse = 0;
		this.primary.systems[0].output = 0;
		this.primary.systems[1].output = 0;
	}

	this.setStatus();
}

Squadron.prototype.setSubSystemState = function(){
	for (var i = 0; i < this.primary.systems.length; i++){
		this.primary.systems[i].setState();
	}
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				this.structures[i].structures[j].systems[k].setState()
			}
		}
	}
}

Squadron.prototype.setStatus = function(){
	//console.log("setStatus CREATE")
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){
			this.structures[i].doDestroy();
		}
		for (var j = 0; j < this.structures[i].crits.length; j++){
			if (this.structures[i].crits[j].type == "Disabled"){
				this.structures[i].disabled = true;
			}
		}
	}
}

Squadron.prototype.setPreFireImage = function(){
	//console.log("Squadron setPreFireImage");
	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].doDraw){
			if (this.structures[i].isDestroyedThisTurn()){
				this.structures[i].doDraw = true;
			}
		}
	}
	this.resetImage();
}

Squadron.prototype.getDrawFacing = function(){
	return this.drawFacing;
}

Squadron.prototype.setLayout = function(){

	var minX = 0;
	var minY = 0;
	var maxX = 0;
	var maxY = 0;
	var w;
	var h;
	var s = 160;

	if (this.structures.length == 1){
		this.structures[0].layout = {x: 0, y: 0};
		h = s;
	}
	else {
		for (var i = 0; i < this.structures.length; i++){
			var a = -45*(this.structures.length == 4) + -90*(this.structures.length == 2) + 360 /  this.structures.length * i;
			var o = getPointInDir(100 + (-20*(this.structures.length == 2)) +(10*(this.structures.length == 4)), a-90, 0, 0);

			minX = Math.min(minX, o.x);
			maxX = Math.max(maxX, o.x);
			minY = Math.min(minY, o.y);
			maxY = Math.max(maxY, o.y);

			o = rotate(0, 0, o, 90);

			this.structures[i].layout = {x: o.x, y: o.y};

		}

		w = Math.abs(minX) + Math.abs(maxX) + s/2;
	}
		h = Math.abs(minY) + Math.abs(maxY) + s;


	$(this.element).find(".structContainer").css("height", h +50);
}

Squadron.prototype.createBaseDiv = function(){
	Ship.prototype.createBaseDiv.call(this);

	var w = $(this.element).find(".coreContainer").width();
	var h = $(this.element).find(".coreContainer").height();

	for (var i = 0; i < this.primary.systems.length; i++){

		var div = this.primary.systems[i].getDiv();
			div = this.attachEvent(div);

		if (game.turn > 0){
			var modeDiv = this.primary.systems[i].getModeDiv();
			if (modeDiv){
				div.appendChild(modeDiv)
			}
		}
		$(this.element).find(".coreContainer").append(div)
		$(div).css("margin-top", 30).css("margin-left", 10 + (i*50));
	}

	// JUMP OUT
	if (game.turn > 1 && game.phase == 3 && this.friendly){
		$(this.element).find(".coreContainer")
		.append($("<div>").addClass("info").css("top", 90).css("margin-left", 27)
		.append($("<img>").addClass("jumpOut")
			.attr("src", "varIcons/redVortex.png")
					.click(function(){game.getUnit($(this).parent().parent().parent().parent().data("shipId")).requestJumpOut();
					})))
	}

	if (this.structures.length){
		$(div).removeClass("disabled");
		this.setLayout();
		this.setSubElements();
		for (var i = 0; i < this.structures.length; i++){
			this.structures[i].expandElement();
		}
		$(div).addClass("disabled");
	}
}

Squadron.prototype.setSubElements = function(){
	var w = $($(this.element).find(".structContainer")).width();
	var h = $($(this.element).find(".structContainer")).height();

	var offset = 0;
	if (this.structures.length == 3){offset = 30;}

	for (var i = 0; i < this.structures.length; i++){
		$(this.element).find(".structContainer").append(this.structures[i].element);
		var subW = $(this.structures[i].element).width();
		var subH = $(this.structures[i].element).height();
		var pos = rotate(0, 0, this.structures[i].layout, -90);
			pos.x *= 1.2;
			pos.y *= 1.2;

		$(this.structures[i].element)
			.css("left", pos.x + w/2 - subW/2)
			.css("top", pos.y + h/2 - subH/2 + offset)
	}
}

Squadron.prototype.expandDiv = function(div){
	//if (game.phase != -2){
		$(div)
		.find(".topDiv")
			.append($("<div>")
				.addClass("coreContainer"))
			.append($("<div>")
				.addClass("iconContainer")					
					.append(
						$(this.getBaseImage()).addClass("rotate270").css("width", "100%").css("border-left", "1px solid white")
					)
					.append($("<div>")
						.addClass("notes")
							.hide())
					.data("shipId", this.id)
					.hover(function(e){
						if (aUnit){
							var shooter = game.getUnit(aUnit);
							var target = game.getUnit($(this).parent().parent().data("shipId"));
							if (shooter.id != target.id && shooter.hasWeaponsSelected()){
								handleWeaponAimEvent(shooter, target, e);
							}
						}
					}).
					click(function(e){
						var shooter = game.getUnit(aUnit);
						var target = game.getUnit($(this).parent().parent().data("shipId"));
						if (shooter && target){
							firePhase({x: 0, y: 0}, shooter, target.id);
						}
					}));
	//}
		
		
	this.setRollState();
	//document.getElementById("game").appendChild(div);
	$(document.body).append(div);
	$(div).css("position", "absolute").css("top", 300);

	structContainer = $("<div>").addClass("structContainer squad");
	$(div).append(structContainer);
	
	$(div).addClass("disabled");
	return div;
}

Squadron.prototype.getDeployImg = function(){
	return false;
	return graphics.images[this.name.toLowerCase()].cloneNode(true);
}

Squadron.prototype.checkSensorHighlight = function(){
	//console.log("checkSensorHighlight")
	return Ship.prototype.checkSensorHighlight.call(this);
}

Squadron.prototype.getShortInfoa = function(){
	var ele = game.ui.shortInfo;
	if (this.userid == game.userid){
		$(ele).attr("class", "friendly");
	} else $(ele).attr("class", "hostile");

	var impulse = this.getCurSpeed();

	var table = document.createElement("table");
		table.insertRow(-1).insertCell(-1).innerHTML = this.name + " #" + this.id + " (" +game.getUnitType(this.traverse) + ")";
		table.insertRow(-1).insertCell(-1).innerHTML =  "Speed: " + impulse + " (" + round(impulse / this.getBaseImpulse(), 2) + ")";
		table.insertRow(-1).insertCell(-1).innerHTML = this.getStringHitChance();
	return table;
}

Squadron.prototype.getStringHitChance = function(){
	return Mixed.prototype.getStringHitChance.call(this);
	//var baseHit = this.getBaseHitChance();
	//return ("Base Hit: " + Math.floor(this.profile[0] * baseHit) + "% - " + Math.floor(this.profile[1] * baseHit) + "%");
}

Squadron.prototype.hasHangarSelected = function(){		
	return false;
}

Squadron.prototype.getSystemByName = function(name){
	for (var i = 0; i < this.primary.systems.length; i++){
		if (this.primary.systems[i].name == name){
			return this.primary.systems[i]
		}
	}
}

Squadron.prototype.getSystem = function(id){
	for (var i = 0; i < this.primary.systems.length; i++){
		if (this.primary.systems[i].id == id){
			return this.primary.systems[i];
		}
	}
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].id == id){
			return this.structures[i];
		}
		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				if (this.structures[i].structures[j].systems[k].id == id){
					return this.structures[i].structures[j].systems[k];
				}
			}
		}
	}
}

Squadron.prototype.hasSystemsSelected = function(){	
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				if (this.structures[i].structures[j].systems[k].selected){return true;}
			}
		}
	}
	return false;
}

Squadron.prototype.hasWeaponsSelected = function(){		
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				if (this.structures[i].structures[j].systems[k].selected){
					if (this.structures[i].structures[j].systems[k].weapon){
						return true;
					}
				}
			}
		}
	}
	return false;
}

Squadron.prototype.getSelectedWeapons = function(){
	var systems = [];

	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}

		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				if (this.structures[i].structures[j].systems[k].weapon){
					if (this.structures[i].structures[j].systems[k].selected){
						systems.push(this.structures[i].structures[j].systems[k]);
					}
				}
			}
		}
	}
	return systems;
}

Squadron.prototype.unselectSystems = function(){
	fxCtx.clearRect(0, 0, res.x, res.y);
	$("#weaponAimTableWrapper").hide();

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				if (this.structures[i].structures[j].systems[k].selected){
					this.structures[i].structures[j].systems[k].select()
				}
			}
		}
	}
	for (var i = 0; i < this.primary.systems.length; i++){
		if (this.primary.systems[i].selected){
			this.primary.systems[i].select();
		}
	}
}

Squadron.prototype.getFireOrders = function(){
	var fires = [];

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				for (var l = this.structures[i].structures[j].systems[k].fireOrders.length-1; l >= 0; l--){
					if (!this.structures[i].structures[j].systems[k].fireOrders[l].id){
						fires.push(this.structures[i].structures[j].systems[k].fireOrders[l]);
					} else break;
				}
			}
		}
	}

	return fires;
}

Squadron.prototype.getPowerOrders = function(){
	var powers = [];

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].powers.length; j++){
			if (this.structures[i].powers[j].new){
				powers.push(this.structures[i].powers[j]);
			}
		}
		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				for (var l = this.structures[i].structures[j].systems[k].powers.length-1; l >= 0; l--){
					if (this.structures[i].structures[j].systems[k].powers[l].new){
						powers.push(this.structures[i].structures[j].systems[k].powers[l]);
					} else break;
				}
			}
		}
	}

	return powers;
}

Squadron.prototype.highlightAllSelectedWeapons = function(){
	//mouseCtx.clearRect(0, 0, res.x, res.y);
	fxCtx.clearRect(0, 0, res.x, res.y);
	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z);

	//$(fxCanvas).css("opacity", 1);
	var angle = this.getPlannedFacing();
	var pos = this.getPlannedPos();

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				if (this.structures[i].structures[j].systems[k].weapon){
					if (this.structures[i].structures[j].systems[k].highlight || this.structures[i].structures[j].systems[k].selected){
						if (this.structures[i].structures[j].systems[k].weapon){
							this.structures[i].structures[j].systems[k].drawSystemArc(angle, this.rolled, pos);
						}
					}
				}
			}
		}
	}
	fxCtx.setTransform(1,0,0,1,0,0);
}

Squadron.prototype.getArmourString = function(a){
	var ret = "";
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}
		ret += this.structures[i].remNegation + ", ";
	}

	return ret.slice(ret, ret.length-2);
}

Squadron.prototype.getAngledHitChance = function(angle){
	return Math.ceil(this.getBaseHitChance());
}

Squadron.prototype.getBaseHitChance = function(){
	var chance = 0;
	var amount = 0;

	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}
		amount++;
		chance += this.structures[i].baseHitChance;
	}

	return Math.ceil(chance/amount);
}

Squadron.prototype.selectAll = function(e, id){
	var s = this.getSystem(id);
	if (!s.weapon){return;}
	var w = s.getActiveSystem();
	var name = w.name;
	var hasFire = s.hasUnresolvedFireOrder();
	if (name == "Hangar"){return;}


	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}
		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				if (this.structures[i].structures[j].systems[k].getActiveSystem().name == name){
					if (this.structures[i].structures[j].systems[k].hasUnresolvedFireOrder() == hasFire){
						this.structures[i].structures[j].systems[k].select(e);
					}
				}
			}
		}
	}
	return;
}

Squadron.prototype.hasNoFireOrders = function(){
	var charged = 0;

	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}
		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				if (!this.structures[i].structures[j].systems[k].destroyed && this.structures[i].structures[j].systems[k].weapon){
					if (this.structures[i].structures[j].systems[k].isPowered() && this.structures[i].structures[j].systems[k].getLoadLevel() >= 1){
						charged = 1;
						if (this.structures[i].structures[j].systems[k].hasFireOrder()){
							return false;
						}
					}
				}
			}
		}
	}

	if (charged){return true;}
	else return false;
}

Squadron.prototype.getAllResolvingFireOrders = function(){
	var fires = [];
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed && !this.structures[i].isDestroyedThisTurn()){continue;}
		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				var fire = this.structures[i].structures[j].systems[k].getResolvingFireOrders();
				if (fire){fires.push(fire);}
			}
		}
	}
	return fires;
}

Squadron.prototype.setImage = function(){
	//console.log("Squad setImage");
	var t = document.createElement("canvas");
		t.width = this.size*2;
		t.height = this.size*2;
	var ctx = t.getContext("2d");
		ctx.translate(t.width/2, t.height/2);

	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].doDraw){continue;}

		ctx.translate(this.structures[i].layout.x/2, this.structures[i].layout.y/2);
		//ctx.rotate(-90 * (Math.PI/180))
		ctx.drawImage(
			this.structures[i].getBaseImage(),
			0 -this.structures[i].size/2,
			0 -this.structures[i].size/2,
			this.structures[i].size, 
			this.structures[i].size
		)
		//ctx.rotate(+90 * (Math.PI/180))
		ctx.translate(-this.structures[i].layout.x/2, -this.structures[i].layout.y/2);
	}		
	ctx.setTransform(1,0,0,1,0,0);
	this.img = t;
}

Squadron.prototype.getWeaponOrigin = function(id){
	for (i = this.structures.length-1; i >= 0; i--){
		if (id > this.structures[i].id){
			for (j = 0; j < this.structures[i].structures.length; j++){
				for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
					if (this.structures[i].structures[j].systems[k].id == id){
						var devi = this.structures[i].size;
						var p = getPointInDir(devi/6, getLayoutDir(this.structures[i].structures[j]), 0, 0);
						var x = this.structures[i].layout.x/4 + p.x;
						var y = this.structures[i].layout.y/4 + p.y;
						return rotate(0, 0, {x: x, y: y}, this.getDrawFacing());
					}
				}
			}
		}
	}
}

Squadron.prototype.setStats = function(){
	this.slots[0] = 0;
	for (var i = 0; i < this.structures.length; i++){
		this.slots[0] += this.structures[i].space;
		this.baseImpulseCost = Math.max(this.baseImpulseCost, this.structures[i].baseImpulseCost);
		this.baseTurnDelay = Math.max(this.baseTurnDelay, this.structures[i].baseTurnDelay);
		this.baseImpulse = Math.min(this.baseImpulse, this.structures[i].baseImpulse);
		this.currentImpulse = this.baseImpulse;
		this.primary.systems[0].output = Math.max(this.primary.systems[0].output, this.structures[i].ew);
		this.primary.systems[0].update();
		if (this.primary.systems[1].output == 0){this.primary.systems[1].output = this.structures[i].ep;}
		else this.primary.systems[1].output = Math.min(this.primary.systems[1].output, this.structures[i].ep);
		this.primary.systems[1].update();
	}

	var a = this.getBaseImpulse();
	var b = this.getBaseEP();
	var c = this.getImpulseChangeCost() + ", " + this.getActionCost(0) + ", " + this.getActionCost(1);
	var d = this.baseTurnDelay;

	$(this.element).find(".topDiv").find(".header").find("tr").each(function(i){
		if (i == 3){
			$($(this).children()[1]).html(a); return;
		}
		if (i == 4){
			$($(this).children()[1]).html(b); return;
		}
		else if (i == 5){
			$($(this).children()[1]).html(c); return;
		}
		else if (i == 6){
			$($(this).children()[1]).html(d); return;
		}
	})
}

Squadron.prototype.getUnitPosition = function(i){
	var x = this.structures[i].layout.x/2 * 0.5;
	var y = this.structures[i].layout.y/2 * 0.5;
	return rotate(0, 0, {x: x, y: y}, this.getDrawFacing());
}

Squadron.prototype.getFireDest = function(fire, isHit, num){
	if (!isHit){
		return {
			x: range(10, 25) * (1-range(0, 1)*2),
			y: range(10, 25) * (1-range(0, 1)*2)
		}
	}
	else if (fire.weapon.fireMode == "Flash"){
		return {x: 0, y: 0};
	}
	else {
		var t = this.getSystem(fire.damages[num].systemid).layout;
		var x = t.x/2 * 0.5 + range(-5, 5);
		var y = t.y/2 * 0.5 + range(-5, 5);
		return rotate(0, 0, {x: x, y: y}, this.getDrawFacing());
	}
}

Squadron.prototype.getDmgByFire = function(fire){
	var dmgs = [];
	var lookup = 0;
	
	for (var i = 0; i < fire.hits.length; i++){
		lookup += fire.hits[i] * fire.weapon.getDmgsPerShot(fire);
	}

	if (!lookup){return dmgs;}

	for (var i = 0; i < this.structures.length; i++){
		for (var j = this.structures[i].damages.length-1; j >= 0; j--){
			if (this.structures[i].damages[j].fireid == fire.id){
				dmgs.push(this.structures[i].damages[j]);
				dmgs[dmgs.length-1].system = (this.structures[i].display + " #" + (i+1));
				dmgs[dmgs.length-1].loc = this.structures[i].layout;
				lookup--;
				if (!lookup){return dmgs};
			}
			else if (this.structures[i].damages[j].turn < fire.turn){
				break;
			}
		}
	}
	console.log("ERROR getDmgByFire");
	return dmgs;
}

Squadron.prototype.getSectionString = function(angle){
	return "";
}

Squadron.prototype.canBoost = function(system){
	for (var i = this.structures.length-1; i >= 0; i--){
		if (system.id >= this.structures[i].id){
			return this.structures[i].canBoost(system);
		}
	}
	console.log("squad boost error");
	return false;
}

Squadron.prototype.updateShipPower = function(system){
	for (var i = this.structures.length-1; i >= 0; i--){
		if (system.id >= this.structures[i].id){
			this.structures[i].updateShipPower(system);
			return;
		}
	}
}

Squadron.prototype.doUnpowerAll = function(id){
	var system = this.getSystem(id);
		//	$(system.element).find(".powerDiv").find(".unpower").hide().end().find(".power").show();
	var name = system.getActiveSystem().name;

	for (let i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}
		this.structures[i].unpowerSystemsByName(name);
	}
}

Squadron.prototype.doPowerAll = function(id){
	var system = this.getSystem(id);
		//$(system.element).find(".powerDiv").find(".power").hide().end().find(".unpower").show();
	var name = system.getActiveSystem().name;

	for (let i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}
		this.structures[i].powerSystemsByName(name);
	}
}

Squadron.prototype.switchModeAll = function(id){
	var system = this.getSystem(id);
	var name = system.getActiveSystem().name;

	for (let i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}
		this.structures[i].switchSystemsByName(name);
	}
}

Squadron.prototype.hasInvalidPower = function(){
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].getUnusedPower() < 0){
			return true;
		}
	}
}

Squadron.prototype.getBaseImage = function(){
	var img = new Image();
		img.src = this.img.toDataURL();
	return img;
}

Squadron.prototype.isDestroyed = function(){
	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].destroyed){
			return false;
		}
	}
	return true;
}

Squadron.prototype.doConfirmSystemLoadout = function(){
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				if (this.structures[i].structures[j].systems[k].selected){
					this.structures[i].structures[j].systems[k].select();
					return;
				}
			}
		}
	}
}


Squadron.prototype.setBuyData = function(){
	var units = [];
	var loads = [];
	var cost = 0;

	for (var i = 0; i < this.structures.length; i++){
		units.push({
			"amount": 1,
			"cost": this.structures[i].cost,
			"name": this.structures[i].name,
		});

		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				if (!this.structures[i].structures[j].systems[k].totalCost){continue;}
				this.upgrades.push(this.structures[i].structures[j].systems[k].getUpgradeData());
			}
		}
	}

	if (!this.structures.length){return;}
	this.upgrades.push({systemid: this.id, active: 1, units: units, loads: loads, text: "", cost: cost});
}

Squadron.prototype.getBuyTableData = function(table){
	for (var i = 0; i < this.structures.length; i++){
		this.totalCost += this.structures[i].cost;
		$(table)
		.append
			($("<tr>")
			.append($("<td>").html(this.structures[i].name))
			.append($("<td>").html(this.structures[i].cost))
			.data("systemid", this.structures[i].id)
			.hover(function(){
				$(this).toggleClass("rowHighlight");
				$(game.getUnit(0).getSystem($(this).data("systemid")).element).toggleClass("borderHighlight");
			})
		)

		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				if (!this.structures[i].structures[j].systems[k].totalCost){continue;}

				$(table)
				.append(
					$("<tr>")
					.append($("<td>").html(this.structures[i].structures[j].systems[k].display))
					.append($("<td>").html(this.structures[i].structures[j].systems[k].totalCost))
					.data("systemid", this.structures[i].structures[j].systems[k].id)
					.hover(function(){
						$(this).toggleClass("rowHighlight");
						$(game.getUnit(0).getSystem($(this).data("systemid")).element).toggleClass("borderHighlight");
					})
				)

			}
		}
	}
}

Ship.prototype.getBuyTableData = function(table){
	for (var i = 0; i < this.upgrades.length; i++){
		this.totalCost += this.upgrades[i].cost;
		$(table)
		.append(
			$("<tr>")
			.append($("<td>").html(this.upgrades[i].text))
			.append($("<td>").html(this.upgrades[i].cost))
			.data("systemid", this.upgrades[i].systemid)
			.hover(function(){
				$(this).toggleClass("rowHighlight");
				$(game.getUnit(0).getSystem($(this).data("systemid")).element).toggleClass("borderHighlight");
			})
		)
	}
}

Squadron.prototype.previewSetup = function(){
	return;
}

Squadron.prototype.getUnusedPower = function(){
	var power = 0;
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}

		power += this.structures[i].getUnusedPower();
	}

	return power;
}