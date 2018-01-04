function Squaddie(data){
	Single.call(this, data);
	this.structures = [];
	this.size = data.size;
	this.index = data.index;
	this.ew = data.ew;
	this.power = data.power;
	this.remainingNegation = data.remainingNegation;
	this.bonusNegation = data.bonusNegation;
	this.boostEffect = data.boostEffect;
	this.effiency = data.effiency;
	this.parentIntegrity = data.parentIntegrity;
	this.armourDmg = data.armourDmg;
	this.armourElement;
	this.powers = data.powers
	this.type = "Main "

	this.baseTurnCost = data.baseTurnCost;
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

Squaddie.prototype.getBaseImage = function(){
	return window.shipImages[this.name.toLowerCase()];	
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
	return $("<div>").attr("id", "systemDetailsDiv")
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
				.append($("<td>").html(this.remainingNegation + " / " + this.negation)))
			.append($("<tr>")
				.append($("<td>").html("Sensor Output"))
				.append($("<td>").html(this.ew)))
			.append($("<tr>")
				.append($("<td>").html("Reactor Output"))
				.append($("<td>").html(this.power)))
			.append($("<tr>")
				.append($("<td>").html("Engine Output"))
				.append($("<td>").html(this.ep)))
		)
}

Squaddie.prototype.expandElement = function(){
	var pDiv = $("<div>")
		.addClass("primaryDiv")
	var cTable = $("<table>")
		.addClass("primaryTable")
		.append(this.getCoreData())
		.append(this.getArmourData())
		.append($("<tr>")
			.append($("<td>").attr("colspan", 3)
				.append($(this.getBaseImage().cloneNode(true))
					.addClass("size70 rotate270")
					.click(function(){
						var data = $(this).closest(".unitContainer").data();
						var	shipId = data.shipId;
						var systemId = data.systemId;
						console.log(game.getUnit(shipId).getSystemById(systemId));
					})
					.hover(
						function(e){
						var data = $(this).closest(".unitContainer").data();
						var	shipId = data.shipId;
						var systemId = data.systemId;
							game.getUnit(shipId).getSystemById(systemId).hover(e);
						}
					)
				)
			)
		)

	$(this.element)
		.append($("<div>").addClass("mainPower").html(this.getUnusedPower()))
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
		var a = getArcDir(this.structures[i]);
		var p = getPointInDirection(pWidth - 15, a-90, primPosX, primPosY);
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
				oY = -s*this.structures[i].systems.length + space;
			}
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
			else if (oY){oY += shiftY + space;}

		}
	}
}

Squaddie.prototype.attachEvent = function(ele){
	$(ele)
	.data("shipId", this.parentId)
	.hover(
		function(e){
			e.stopPropagation();
			game.getUnit($(this).data("shipId")).getSystemById($(this).data("systemId")).hover(e);
		}
	).click(
		function(e){
			e.stopPropagation();
			game.getUnit($(this).data("shipId")).getSystemById($(this).data("systemId")).select(e);
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

Squaddie.prototype.getUpgradeData = function(){
	return {name: this.display, cost: this.cost};
}

Squaddie.prototype.canBoost = function(system){
	return Ship.prototype.canBoost.call(this, system);
}

Squaddie.prototype.getUnusedPower = function(){
	var output = this.power;
	var use = 0;

	use += this.getCurrentPowerUsage();
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].isPowered()){
				use += this.structures[i].systems[j].getCurrentPowerUsage();
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

Squaddie.prototype.doUnpowerAll = function(id){
	var system = this.getSystemById(id);
		$(system.element).find(".powerDiv").find(".unpower").hide().end().find(".power").show();
	var name = system.getActiveSystem().name;

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].isPowered()){
				if (this.structures[i].systems[j].getActiveSystem().name == name){
					this.structures[i].systems[j].doUnpower();
				}
			}
		}
	}
}

Squaddie.prototype.doPowerAll = function(id){
	var system = this.getSystemById(id);
		$(system.element).find(".powerDiv").find(".power").hide().end().find(".unpower").show();
	var name = system.getActiveSystem().name;

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (!this.structures[i].systems[j].isPowered()){
				if (this.structures[i].systems[j].getActiveSystem().name == name){
					//this.structures[i].systems[j].highlight = 1;
					this.structures[i].systems[j].doPower();
					//this.structures[i].systems[j].highlight = 0;
				}
			}
		}
	}
}

Squaddie.prototype.getSystemById = function(id){
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
			.css("width",  (this.getRemainingNegation()/this.negation * 100) + "%")
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
				game.getUnit(data.shipId).getSystemById(data.systemId).armourIn(e);
			},
			function(e){
				var data = $(this).closest(".unitContainer").data();
				game.getUnit(data.shipId).getSystemById(data.systemId).armourOut(e);
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

Squaddie.prototype.drawArc = function(){
	return;
}
Squaddie.prototype.getRemainingNegation = function(){
	return Structure.prototype.getRemainingNegation.call(this);
}

Squaddie.prototype.getCurrentPowerUsage = function(){
	return System.prototype.getCurrentPowerUsage.call(this);
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


























function Squadron(data){
	Ship.call(this, data);
	this.squad = 1;
	this.ship = 0;
	this.index = 2;
	this.primary = {"systems": []};
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
}

Squadron.prototype.getDrawFacing = function(){
	return this.drawFacing+90;
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
			var o = getPointInDirection(115 + (-20*(this.structures.length == 2)) +(10*(this.structures.length == 4)), a-90, 0, 0);

			minX = Math.min(minX, o.x);
			maxX = Math.max(maxX, o.x);
			minY = Math.min(minY, o.y);
			maxY = Math.max(maxY, o.y);

			this.structures[i].layout = {x: o.x, y: o.y};
		}

		w = Math.abs(minX) + Math.abs(maxX) + s/2;
	}
		h = Math.abs(minY) + Math.abs(maxY) + s;


	$(this.element).find(".structContainer").css("height", h +20);
}

Squadron.prototype.previewSetup = function(){
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].loadout){
				$(this.structures[i].systems[j].element).addClass("bgYellow");
			}
		}
	}
}

Squadron.prototype.createBaseDiv = function(){
	var owner = "friendly";
	if (game.phase > -2 && this.userid != game.userid){owner = "hostile";}
	var div = document.createElement("div");
		div.className = "shipDiv squad " + owner;
		$(div).data("shipId", this.id);

	this.element = div;

	var topDiv = document.createElement("div");
		topDiv.className = "topDiv";

	var subDiv = document.createElement("div");
		subDiv.className = "header";
	
	var table = document.createElement("table");

	var headerC = "red";
	if (this.friendly){headerC = "green";}

		$(table)
			.addClass("general")
			.append($("<tr>")
				.append($("<th>").html("Squadron #" + this.id).attr("colSpan", 2).addClass(headerC)))
			.append($("<tr>")
			.append($("<td>").html("Thrust").css("width", "60%"))
				.append($("<td>").html(this.getRemainingImpulse() + " / " + this.getCurrentImpulse()).addClass("Thrust")))
			.append($("<tr>")
				.append($("<td>").html("Engine Power:"))
				.append($("<td>").html(this.getRemainingEP() + " / " + this.getEP()).addClass("ep")))
			.append($("<tr>")
				.append($("<td>").html("Thrust Change:"))
				.append($("<td>").html(this.getImpulseChangeCost() + " EP").addClass("change")))
			.append($("<tr>")
				.append($("<td>").html("Turn Cost per 1"))
				.append($("<td>").html(round(this.getTurnCost(), 2) + " EP")))
			.append($("<tr>")
				.append($("<td>").html("Turn Delay per 1"))
				.append($("<td>").html(round(this.getTurnDelay(), 2) + " px")))
			.append($("<tr>")
				.append($("<td>").html("Active Turn Delay"))
				.append($("<td>").html(this.getRemainingDelay()).addClass("delay")))
			
	subDiv.appendChild(table);
	topDiv.appendChild(subDiv)
	div.appendChild(topDiv);

	$(this.expandDiv(div))
		.drag()
		.find(".structContainer")
			.contextmenu(function(e){e.stopPropagation(); e.preventDefault()})
			.end()
		.find(".header")
			.contextmenu(function(e){
				e.stopImmediatePropagation(); e.preventDefault();
				$(this).parent().find($(".structContainer")).toggle();
			})
			.end()
		.find(".iconContainer")
			.contextmenu(function(e){
				e.stopImmediatePropagation(); e.preventDefault();
				if ($(this).parent().parent().data("shipId") != aUnit){
					game.zIndex--;
					$(this).parent().parent().addClass("disabled");
				}
			})


	if (game.phase == 2){
		$(div).find(".structContainer").show();
	}

	var w = $(this.element).find(".coreContainer").width();
	var h = $(this.element).find(".coreContainer").height();

	//if (game.phase > -2){
		for (var i = 0; i < this.primary.systems.length; i++){

			var div = this.primary.systems[i].getDiv();
				div = this.attachEvent(div);

			if (game.turn > 0){
				var modeDiv = this.primary.systems[i].getModeDiv();
				if (modeDiv){
					div.appendChild(modeDiv);
				}
			}
			$(this.element).find(".coreContainer").append(div)
			$(div).css("margin-top", 20).css("margin-left", 10 + (i*50));
		}
	//}

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
		$(this.structures[i].element)
			.css("left", this.structures[i].layout.x + w/2 - subW/2)
			.css("top", this.structures[i].layout.y + h/2 - subH/2 + offset)
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
					.append($(this.getBaseImage()).css("width", "100%").css("height", "100%"))
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
							if (target.id != shooter.id && (target.userid != game.userid && target.userid != shooter.userid)){
								handleFireClick(shooter, target);
							} else target.switchDiv();
						}
					}));
	//}
		
		
	//document.getElementById("game").appendChild(div);
	document.body.appendChild(div);
	$(div).css("position", "absolute").css("top", 300);

	structContainer = document.createElement("div");
	structContainer.className = "structContainer squad";
	div.appendChild(structContainer);
	
	$(div).addClass("disabled");
	return div;

}

Squadron.prototype.setBuyData = function(){
	for (var i = 0; i < this.structures.length; i++){
		this.upgrades.push(this.structures[i].getUpgradeData());
	}
}

Squadron.prototype.getLaunchData = function(){
	var data = [];
	for (var i = 0; i < this.structures.length; i++){
		data.push({"launch": 1, "name": this.structures[i].name});
	}
	return {loads: data};
}

Squadron.prototype.getDeployImg = function(){
	return window.shipImages[this.name.toLowerCase()].cloneNode(true);
}

Squadron.prototype.getEP = function(){
	return this.getSystemByName("Engine").getOutput();
}

Squadron.prototype.checkSensorHighlight = function(){
	//console.log("checkSensorHighlight")
	return Ship.prototype.checkSensorHighlight.call(this);
}

Squadron.prototype.setTempEW = function(){
	//console.log("setTempEW")
	return Ship.prototype.setTempEW.call(this);
}

Squadron.prototype.drawEW = function(){
	//console.log("drawEW")
	return Ship.prototype.drawEW.call(this);
}

Squadron.prototype.drawImpulseUI = function(){
	var facing = this.getDrawFacing();
	var center = {x: this.drawX, y: this.drawY};
	var p1 = getPointInDirection(this.size/2 + 10 + 15, facing + 90, center.x, center.y);

	if (this.canUndoLastAction()){
		var ox = p1.x * cam.z + cam.o.x - 15;
		var oy = p1.y * cam.z + cam.o.y - 15;
		$("#undoLastAction").css("left", ox).css("top", oy).removeClass("disabled");
	} else $("#undoLastAction").addClass("disabled");

	if (this.disabled){return;}			

	if (this.canIncreaseImpulse()){
		var pPlus = getPointInDirection(50, facing, p1.x, p1.y);
		var ox = pPlus.x * cam.z + cam.o.x - 15;
		var oy = pPlus.y * cam.z + cam.o.y - 15;
		$("#plusImpulse").css("left", ox).css("top", oy).removeClass("disabled");
	} else $("#plusImpulse").addClass("disabled");

	if (this.canDecreaseImpulse()){
		var mMinus = getPointInDirection(50, facing -180, p1.x, p1.y);
		var ox = mMinus.x * cam.z + cam.o.x - 15;
		var oy = mMinus.y * cam.z + cam.o.y - 15;
		$("#minusImpulse").css("left", ox).css("top", oy).removeClass("disabled");
	} else $("#minusImpulse").addClass("disabled");
}

Squadron.prototype.drawTurnUI = function(){
	var center = {x: this.x, y: this.y};
	var angle = this.getDrawFacing();
	var turnEle = $("#turnButton")[0];
	var p1 = getPointInDirection(150/cam.z, addToDirection(angle, 0), center.x, center.y);
	$(turnEle)
		.removeClass("disabled")
		.css("left", p1.x * cam.z + cam.o.x - $(turnEle).width()/2)
		.css("top", p1.y * cam.z + cam.o.y - $(turnEle).height()/2)
		.find("#impulseMod").html("").end()
		//.find("#turnMod").html("").end()
		//.find("#remEP").html(this.getRemainingEP() + " / " + this.getEP()).addClass("green").end()
}

Squadron.prototype.getShortInfo = function(){
	var ele = $("#shortInfo");
	if (this.userid == game.userid){
		$(ele).attr("class", "friendly");
	} else $(ele).attr("class", "hostile");

	var impulse = this.getCurrentImpulse();

	var table = document.createElement("table");
		table.insertRow(-1).insertCell(-1).innerHTML = this.name + " #" + this.id + " (" +game.getUnitType(this.traverse) + ")";
		table.insertRow(-1).insertCell(-1).innerHTML =  "Thrust: " + impulse + " (" + round(impulse / this.getBaseImpulse(), 2) + ")";
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

Squadron.prototype.getSystemById = function(id){
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
				for (var l = 0; l < this.structures[i].structures[j].systems[k].powers.length; l++){
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
							this.structures[i].structures[j].systems[k].drawArc(angle, pos);
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
		ret += this.structures[i].remainingNegation + ", ";
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
	var s = this.getSystemById(id);
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
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}
		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				if (!this.structures[i].structures[j].systems[k].destroyed && this.structures[i].structures[j].systems[k].weapon){
					if (this.structures[i].structures[j].systems[k].isPowered() && this.structures[i].structures[j].systems[k].getLoadLevel() >= 1){
						if (this.structures[i].structures[j].systems[k].hasFireOrder()){
							return false;
						}
					}
				}
			}
		}
	}
	return true;
}

Squadron.prototype.getResolvingFireOrders = function(){
	var fires = [];
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}
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
		if (!this.structures[i].draw){continue;}

		ctx.translate(this.structures[i].layout.x/2, this.structures[i].layout.y/2);
		ctx.rotate(-90 * (Math.PI/180))
		ctx.drawImage(
			window.shipImages[this.structures[i].name.toLowerCase()],
			0 -this.structures[i].size/2,
			0 -this.structures[i].size/2,
			this.structures[i].size, 
			this.structures[i].size
		)
		ctx.rotate(+90 * (Math.PI/180))
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
						var p = getPointInDirection(devi/6, getArcDir(this.structures[i].structures[j])-90, 0, 0);
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
	for (var i = 0; i < this.structures.length; i++){
		this.baseTurnCost = Math.max(this.baseTurnCost, this.structures[i].baseTurnCost);
		this.baseTurnDelay = Math.max(this.baseTurnDelay, this.structures[i].baseTurnDelay);
		this.baseImpulseCost = Math.max(this.baseImpulseCost, this.structures[i].baseImpulseCost);
		this.baseImpulse = Math.min(this.baseImpulse, this.structures[i].baseImpulse);
		this.primary.systems[0].output = Math.max(this.primary.systems[0].output, this.structures[i].ew);
		this.primary.systems[0].update();
		if (this.primary.systems[1].output == 0){this.primary.systems[1].output = this.structures[i].ep;}
		else this.primary.systems[1].output = Math.min(this.primary.systems[1].output, this.structures[i].ep);
		this.primary.systems[1].update();
	}

	var a = this.baseImpulseCost;
	var b = this.baseTurnCost;
	var c = this.baseTurnDelay;

	$(this.element).find(".topDiv").find(".header").find(".general").find("tr").each(function(i){
		if (i == 3){
			$($(this).children()[1]).html(a); return;
		}
		else if (i == 4){
			$($(this).children()[1]).html(b); return;

		}
		else if (i == 5){
			$($(this).children()[1]).html(c); return;
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
	var t = this.getSystemById(fire.damages[num].systemid).layout;
	var x = t.x/2 * 0.5 + range(-8, 8);
	var y = t.y/2 * 0.5 + range(-8, 8);
	return rotate(0, 0, {x: x, y: y}, this.getDrawFacing());
}

Squadron.prototype.getDmgByFire = function(fire){
	var dmgs = [];
	var lookup = 0;

	for (var i = 0; i < fire.hits.length; i++){
		lookup += fire.hits[i]
	}

	if (!lookup){
		return dmgs;
	}

	for (var i = 0; i < this.structures.length; i++){
		for (var j = this.structures[i].damages.length-1; j >= 0; j--){
			if (this.structures[i].damages[j].fireid == fire.id){
				dmgs.push(this.structures[i].damages[j]);
				dmgs[dmgs.length-1].system = (this.structures[i].display + " #" + (i+1));
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
	for (var i = this.structures.length-1; i >= 0; i--){
		if (id > this.structures[i].id){
			this.structures[i].doUnpowerAll(id);
			return;
		}
	}
}

Squadron.prototype.doPowerAll = function(id){
	for (var i = this.structures.length-1; i >= 0; i--){
		if (id > this.structures[i].id){
			this.structures[i].doPowerAll(id);
			return;
		}
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