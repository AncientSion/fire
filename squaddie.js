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
	this.baseTurnDelay = data.baseTurnDelay;
	this.baseImpulseCost = data.baseImpulseCost;
	this.baseImpulse = data.baseImpulse;
	this.faction = data.faction;
	this.armourElement;
	this.type = "Main ";
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
		this.hideSysDiv(e);
	}
	else {
		this.highlight = true;
		this.showSysDiv(e);
	}
}

Squaddie.prototype.showSysDiv = function(e){
	$(document.body).append(
		$(this.getSysDiv())
			.css("left", e.clientX - 90)
			.css("top", e.clientY + 50)
		)
}

Squaddie.prototype.hideSysDiv = function(){
	$("#sysDiv").remove();
}

Squaddie.prototype.getSysDiv = function(){
	var div = 
		$("<div>").attr("id", "sysDiv")
		.append($("<table>")
			.append($("<tr>")
				.append($("<th>").html(this.display + " #" + this.id).attr("colSpan", 2)))
			.append($("<tr>")
				.append($("<td>").html(this.role).attr("colSpan", 2)))
			.append($("<tr>")
				.append($("<td>").html("Sensor Output"))
				.append($("<td>").html(this.ew)))
			.append($("<tr>")
				.append($("<td>").html("Engine Output"))
				.append($("<td>").html(this.ep)))
			.append($("<tr>")
				.append($("<td>").html("Base Hit Chance"))
				.append($("<td>").html(this.baseHitChance + "%")))
			.append($("<tr>")
				.append($("<td>").attr("colSpan", 2).css("height", 6)))
		)

	this.attachCritTypeInfo(div);
	this.attachSysNotes(div);
	this.attachSysMods(div);
	return div;
}

Squaddie.prototype.expandElement = function(){

	var img = $(this.getBaseImage().cloneNode(true)).addClass("size70 rotate270");
	if (!this.destroyed){
		img
		.click(function(){
			var data = $(this).closest(".unitContainer").data();
			console.log(game.getUnit(data.shipId).getSystem(data.systemId));
		})
		.contextmenu(function(){
			game.doCloneSquaddie($(this).parent().parent().parent().parent().parent().parent().data());
		})
		.hover(
			function(e){
				var data = $(this).closest(".unitContainer").data();
				game.getUnit(data.shipId).getSystem(data.systemId).hover(e);
			}
		)
	}


	var imgCont = $("<div>")
		.addClass("imageContainer")
		.append(img);

	if (this.destroyed){ // RED X
		$(imgCont)
			.append($("<img>")
				.attr("src", "varIcons/destroyed.png")
				.addClass("overlay")//.css("width", cWidth).css("height", cHeight)
				.hover(function(e){
					var data = $(this).closest(".unitContainer").data();
					game.getUnit(data.shipId).getSystem(data.systemId).hover(e);
				})
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
				.append(imgCont)
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

			if (this.destroyed){
				$(ele).append($("<img>")
					.attr("src", "varIcons/destroyed.png")
					.addClass("overlay")
						
			}

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
	)
	.mousedown(function(e){e.stopPropagation();})
	.contextmenu(
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
	this.updatesysDiv();
}

Squaddie.prototype.updatesysDiv = function(){
	$("#sysDiv")
		.find(".boostEffect").html(this.getBoostEffect("Armour") * this.getBoostLevel()).end()
		.find(".powerUse").html(this.getPowerUsage()).end()
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
			.addClass("font16")
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
			.addClass("font16")
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
		$(Structure.prototype.getSysDiv.call(this))
			.css("left", e.clientX - 90)
			.css("top", e.clientY + 40)
		)
	if (game.phase != -1 || !this.effiency || game.getUnit(this.parentId).userid != game.userid){return;}
	$(this.armourElement).find(".boostDiv").show();
}

Squaddie.prototype.armourOut = function(e){
	Structure.prototype.hideSysDiv.call(this, e);
	if (game.phase != -1 || !this.effiency || game.getUnit(this.parentId).userid != game.userid){return;}
	$(this.armourElement).find(".boostDiv").hide();
}

Squaddie.prototype.doDestroy = function(){
	this.doDraw = 0;
	for (var i = 0; i < this.structures.length; i++){
		for (var k = 0; k < this.structures[i].systems.length; k++){
			//this.structures[i].systems[k].destroyed = true;
			this.structures[i].systems[k].locked = true;
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
				$(this.structures[i].systems[j].element).addClass("hasOptions");
			}
		}
	}
}