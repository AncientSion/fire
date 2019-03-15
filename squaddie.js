function Squaddie(data){
	Single.call(this, data);
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
	this.createBaseContainer();
}

Squaddie.prototype.createBaseContainer = function(){
	this.element = $("<div>")
		.addClass("unitContainer")
		.data("shipId", this.parentId)
		.data("systemId", this.id);
}

Squaddie.prototype.hover = function(e){
	if (game.flightDeploy){return false;}

	if (this.highlight){
		this.highlight = false;
		game.hideSysDiv(e);
	}
	else {
		this.highlight = true;
		game.appendSysDiv($(this.getSysDiv()), e);
	}
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
				.append($("<td>").html("Base to-Hit"))
				.append($("<td>").html(this.baseHitChance + "%")))
			.append($("<tr>")
				.append($("<td>").html("Recent EM Damage"))
				.append($("<td>").html(this.getEMDmg())))
			.append($("<tr>")
				.append($("<td>").html("Recent Damagemage"))
				.append($("<td>").html(this.recentDmg + " / " + this.getRecentDmgInt() + " %")))
			.append($("<tr>")
				.append($("<td>").attr("colSpan", 2).css("height", 6)))
		)

	this.attachCritTypeInfo(div);
	this.attachSysNotes(div);
	this.attachSysMods(div);
	return div;
}



Squaddie.prototype.fillSelfContainer = function(){

	var img = $(this.getBaseImage().cloneNode(true)).addClass("size60 rotate270");
	if (!this.destroyed){
		img
		.click(function(){
			var data = $(this).closest(".unitContainer").data();
			console.log(game.getUnit(data.shipId).getSystem(data.systemId));
		})
		.contextmenu(function(e){
			e.preventDefault();
			var data = $(this).closest(".unitContainer").data();
			game.doCloneSquaddie(data);
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
	else {
		$(this.element)
		.append($("<div>").addClass("unusedPowerDiv")
			.append($("<img>").attr("src", "varIcons/powerIcon.png")
				.addClass("unusedPowerIcon"))
			.append($("<div>")
				.addClass("unusedPower")
				.html(this.getUnusedPower())))
	}


	var pDiv = $("<div>")
		.addClass("primaryDiv")
	var cTable = $("<table>")
		.addClass("primaryTable")
		.append($("<tr>")
			.append($("<td>").attr("colspan", 3)
				.append(imgCont)
			)
		)
		.append(this.getCoreData())
		.append(this.getArmourData())

	//core div and core table
	$(this.element)
		.append($(pDiv)
		.append(cTable));

	var cWidth = $(this.element).width();
	var cHeight = $(this.element).height();

	var pWidth = $(pDiv).width();
	var pHeight = $(pDiv).height();

	var primPosX = cWidth/2 - pWidth/2;
	var primPosY = cHeight/2 - pHeight/2 + 20;


	$(pDiv)
		.css("left", primPosX)
		.css("top", primPosY)


	var toDo = [];
	if (this.systems.length){toDo.push([this.systems[0]]);}
	else return;

	for (var i = 1; i < this.systems.length; i++){
		if (this.systems[i].align == toDo[toDo.length-1][toDo[toDo.length-1].length-1].align){
			toDo[toDo.length-1].push(this.systems[i]);
		} else toDo.push([this.systems[i]]);
	}


	for (var i = 0; i < toDo.length; i++){
		var a = toDo[i][0].align;
		var dist = (pWidth/2)+25;
		var p = getPointInDir(dist, a-90, primPosX, primPosY);

		if (a == 150){p.x += 30; p.y += 25}
		else if (a == 210){p.x -= 30; p.y += 25;}
		var s = 24;

		var oX = 0;
		var oY = 0;

		var shiftX = s;
		var shiftY = s;

		var space = 10;

		if (a == 0 || a == 360 || a == 180){
			if (toDo[i].length == 2){
				oX = -s/2 - space/2;
			}
			else if (toDo[i].length == 3){
				oX = -s - space;
			}
			else if (toDo[i].length == 4){
				oX = -s -space*3;
			}
		}
		else {
			if (toDo[i].length > 1){
				oY = -s*toDo[i].length - 15;
			} else oY = -pHeight / 4;
		}

		for (var j = 0; j < toDo[i].length; j++){
			var ele = this.attachBaseMouseEvent(toDo[i][j].getDiv());
				ele = toDo[i][j].turret ? this.attachTurretClickEvent(ele) : this.attachBaseClickEvent(ele);

			if (this.id > 0 && game.phase == -1){
				var boostDiv = toDo[i][j].getBoostDiv();
				if (boostDiv){ele.appendChild(boostDiv)};
				var powerDiv = toDo[i][j].getPowerDiv();
				if (powerDiv){ele.appendChild(powerDiv);}
				var modeDiv = toDo[i][j].getModeDiv();
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

Squaddie.prototype.attachBaseClickEvent = function(ele){
	$(ele)
	.click(
		function(e){
			e.stopPropagation();
			game.getUnit($(this).data("shipId")).getSystem($(this).data("systemId")).select(e);
		}
	)
	.contextmenu(
		function(e){
			e.preventDefault();
			if (!game.sensorMode){game.getUnit($(this).data("shipId")).selectAll(e, $(this).data("systemId"));}
		}
	);
	return ele;
}

Squaddie.prototype.attachTurretClickEvent = function(ele){
	$(ele)
	.click(
		function(e){
			e.stopPropagation();
			game.getUnit($(this).data("shipId")).selectTurretSystems($(this).data("systemId"));
		}
	)
	.contextmenu(
		function(e){
			e.preventDefault();
		})
	return ele;
}

Squaddie.prototype.attachBaseMouseEvent = function(ele){
	$(ele)
	.data("shipId", this.parentId)
	.hover(
		function(e){
			e.stopPropagation();
			game.getUnit($(this).data("shipId")).getSystem($(this).data("systemId")).hover(e);
		}
	)
	.mousedown(function(e){e.stopPropagation();})
	return ele;
}

Squaddie.prototype.canBoost = function(system){
	return Ship.prototype.canBoost.call(this, system);
}

Squaddie.prototype.getUnusedPower = function(){
	var output = this.power;
	var use = 0;

	use += this.getPowerUsage();
	for (var i = 0; i < this.systems.length; i++){
		if (this.systems[i].isPowered()){
			use += this.systems[i].getPowerUsage();
		}
	}
	return output - use;
}

Squaddie.prototype.updateShipPower = function(system){
	$(this.element).find(".unusedPower").html(this.getUnusedPower()).end();
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
	for (var i = 0; i < this.systems.length; i++){
		if (!this.systems[i].isPowered() || this.systems[i].getActiveSystem().name != name){continue;}
		this.systems[i].doUnpower();
	}
}

Squaddie.prototype.powerSystemsByName = function(name){
	for (var i = 0; i < this.systems.length; i++){
		if (this.systems[i].isPowered() || this.systems[i].getActiveSystem().name != name){continue;}
		this.systems[i].doPower();
	}
}

Squaddie.prototype.switchSystemsByName = function(name){
	for (var i = 0; i < this.systems.length; i++){
		if (!this.systems[i].dual || this.systems[i].getLoadLevel() != 1){continue;}
		if (this.systems[i].getActiveSystem().name == name){
			this.systems[i].switchMode();
		}
	}
}

Squaddie.prototype.getSystem = function(id){
	for (var i = 0; i < this.systems.length; i++){
		if (this.systems[i].id == id){
			return this.systems[i];
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
			//.css("width",  (this.getRemNegation()/this.negation * 100) + "%")
			.css("width",  (100 - (this.armourDmg / this.parentIntegrity) * 100) + "%")
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
	Game.prototype.hideSysDiv.call(this);
	if (game.phase != -1 || !this.effiency || game.getUnit(this.parentId).userid != game.userid){return;}
	$(this.armourElement).find(".boostDiv").hide();
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




function Turret(data){
	Squaddie.call(this, data);
	this.powerReq = 0;
	this.start = data.start;
	this.end = data.end;
	this.integrity = data.integrity;
	this.remaining = data.remaining;
	this.recentDmg = data.recentDmg;
	this.newDmg = data.newDmg;
	this.destroyed = data.destroyed;
	this.highlight = false;
	this.selected = false;
	this.turret = 1;
}
Turret.prototype = Object.create(Squaddie.prototype);

Turret.prototype.setLayout = function(size){
	var x = range(size/2*0.2, size/2*0.8) * (1-range(0, 1)*2);
	var y = range(size/2*0.2, size/2*0.8) * (1-range(0, 1)*2);
	this.loc = {x: x, y: y};
}

Turret.prototype.setStructState = function(){
	if (this.isDestroyed()){
		this.doDestroy();
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
		if (!this.isPowered()){
			this.disabled = true;
		}
	}
}

Turret.prototype.copyPowers = function(){
	var copy = [];
	for (var i = 0; i < this.powers.length; i++){
		if (this.powers[i].turn == game.turn-1 && this.powers[i].type <= 0){
			copy.push($.extend(true, {}, this.powers[i]));
		}
	}
	for (var i = 0; i < copy.length; i++){
		copy[i].new = 1;
		copy[i].turn = game.turn;
		this.powers.push(copy[i]);
	}
}

Turret.prototype.getWeaponPosition = function(size, facing){
	return rotatePoint(0, 0, this.loc, facing);
}

Turret.prototype.setBonusNegation = function(){
	return Structure.prototype.setBonusNegation.call(this);
}

Turret.prototype.select = function(){
	console.log(this);
	if (this.destroyed || !this.isPowered()){return;}
	
	for (var i = 0; i < this.systems.length; i++){
		this.systems[i].select();
	}
}

Turret.prototype.getCoreData = function(){
	var ele = $("<td>")
		.data("shipId", this.parentId)
		.data("systemId", this.id)
		.addClass("core")
		.hover(
			function(e){
				var shipId = $(this).data("shipId");
				var systemId = $(this).data("systemId");
				game.getUnit(shipId).getSystem(systemId).hover(e);
			}
		)
		.mousedown(function(e){e.stopPropagation();})
		.click(function(e){
			var shipId = $(this).data("shipId");
			var systemId = $(this).data("systemId");
			//game.getUnit(shipId).getSystem(systemId).select(e);
			console.log(game.getUnit(shipId).getSystem(systemId));
		})
		.append($("<div>")
			.addClass("integrityAmount")
			.html("<span>" + this.remaining + " / " + this.integrity + "</span>")
		)
		.append($("<div>")
			.addClass("integrityNow")
			.css("width",  (this.remaining/this.integrity * 100) + "%")
		)
		.append($("<div>")
			.addClass("integrityFull")
		)

	this.element = ele;
	return ele;
}

Turret.prototype.getArmourData = function(){
	return $("<td>")
		.addClass("armour")
		.append($("<div>")
			.addClass("integrityAmount")
			.html(this.getArmourString())
		)
		.append($("<div>")
			.addClass("integrityNow")
			//.css("width",  this.getRemNegation() / this.negation * 100 + "%")
			.css("width",  (100 - (this.armourDmg / this.parentIntegrity) * 100) + "%")
		)
		.append($("<div>")
			.addClass("integrityFull")
		)
}

Turret.prototype.getSysDiv = function(){
	var div = $("<div>").attr("id", "sysDiv")

	var table = $("<table>")
		.append($("<tr>")
			.append($("<th>").html(this.display).attr("colSpan", 2)))
		.append($("<tr>")
			.append($("<td>").html("Integrity"))
			.append($("<td>").html(this.remaining + " / " + this.integrity)))
		.append($("<tr>")
			.append($("<td>").attr("colSpan", 2).css("height", 10)))
		.append($("<tr>")
			.append($("<td>").html("Armour Strength"))
			.append($("<td>").html(this.getRemNegation() + " / " + this.negation)))
		.append($("<tr>")
			.append($("<td>").html("Relative Durability"))
			.append($("<td>").html(((this.parentIntegrity - this.armourDmg) + " / " + this.parentIntegrity))))
		.append($("<tr>").append($("<td>").html("Power Req"))
			.append($("<td>").addClass("powerReq").html(this.getPowerReqString())));

	return div.append(table);
}

Turret.prototype.getPowerReqString = function(){
	var string = "";
	for (var i = 0; i < this.systems.length; i++){
		string += this.systems[i].powerReq + ", ";
	}
	return string.slice(0, string.length-2);
}

Turret.prototype.hover = function(e){
	Structure.prototype.hover.call(this, e);
}

Turret.prototype.drawStructArc = function(facing, rolled, pos){
	Structure.prototype.drawStructArc.call(this, facing, rolled, pos);
}

Turret.prototype.doUnpower = function(){
	this.powers.push({
			id: this.powers.length+1, unitid: this.parentId, systemid: this.id,
			turn: game.turn, type: 0, cost: 0, new: 1
		})
	for (var i = 0; i < this.systems.length; i++){
		this.systems[i].doUnpower();
	}
	this.disabled = 1;
	this.element.find(".powerDiv").find(".power").show().end().find(".unpower").hide().end();
}

Turret.prototype.doPower = function(){
	if (this.powers.length && this.powers[this.powers.length-1].turn == game.turn && this.powers[this.powers.length-1].type == 0){
		this.powers.splice(this.powers.length-1, 1);
		this.disabled = 0;
	}
	for (var i = 0; i < this.systems.length; i++){
		this.systems[i].doPower();
	}
	this.element.find(".powerDiv").find(".unpower").show().end().find(".power").hide().end();
}

Turret.prototype.isPowered = function(){
	return System.prototype.isPowered.call(this);
}

Turret.prototype.showOptions = function(){
	if (this.locked || game.phase != -1 || game.getUnit(this.parentId).userid != game.userid ){return;}
	if (this.isPowered()){this.element.find(".power").hide().end().find(".unpower").show();}
	else this.element.find(".unpower").hide().end().find(".power").show();
}

Turret.prototype.hideOptions = function(){
	if (this.locked || game.phase != -1 || game.getUnit(this.parentId).userid != game.userid ){return;}
	this.element.find(".powerDiv").children().hide();
}

Turret.prototype.getPowerDiv = function(){
	if (this.destroyed){return};

	var div = document.createElement("div");
		$(div).addClass("powerDiv")
		.data("shipId", this.parentId)
		.data("turretId", this.id);

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
				game.getUnit(data.shipId).getSystem(data.turretId).doPower();
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
				game.getUnit(data.shipId).getSystem(data.turretId).doUnpower();
			})
		div.appendChild(subDiv);
	return div;
}
