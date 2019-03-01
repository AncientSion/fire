
function Structure(data){
	this.name = data.name;
	this.display = data.display;
	this.type = data.type;
	this.id = data.id;
	this.parentId = data.parentId;
	this.start = data.start;
	this.end = data.end;
	this.parentIntegrity = data.parentIntegrity;
	this.armourDmg = data.armourDmg;
	this.negation = data.negation;
	this.remNegation = data.remNegation;
	this.powerReq = data.powerReq;
	this.destroyed = data.destroyed || false;
	this.highlight = false;
	this.systems = [];
	this.damages = [];
	this.powers = data.powers;
	this.direction;
	this.element;
	this.effiency = data.effiency;
	this.boostEffect = data.boostEffect;
	this.modes = data.modes;
	this.width = data.width;
}

Structure.prototype = Object.create(System.prototype);

Structure.prototype.setStructState = function(){
	return;
}

Structure.prototype.getRemNegation = function(){
	return this.remNegation;
}

Structure.prototype.getArmourString = function(){
	if (this.boostEffect.length){
		return  "<span>" + this.remNegation + "<span style='color: yellow;'>+" + (this.getBoostEffect("Armour") * this.getBoostLevel()) + "</span> / " + this.negation + "</span>";
	}
	return "<span>" + this.remNegation + " / " + this.negation + "</span>";
}

Structure.prototype.setBonusNegation = function(){
	if (!this.boostEffect.length){this.bonusNegation = 0; return;}
	this.bonusNegation = this.getBoostEffect("Armour") * this.getBoostLevel(); return;
}

Structure.prototype.getTableData = function(){
	var td = $("<td>").addClass("armour").css("height", 25)

	var div = $("<div>")
		.addClass("integrityAmount")
		.html(this.getArmourString())
	td.append(div);

	var lowerDiv = document.createElement("div");
		lowerDiv.className = "integrityNow";
		lowerDiv.style.width =  this.getRemNegation() / this.negation * 100 + "%";
		td.append(lowerDiv);
		
	var upperDiv = document.createElement("div");
		upperDiv.className = "integrityFull";
		td.append(upperDiv);

	$(td)
		.data("shipId", this.parentId)
		.data("systemId", this.id)
		.attr("colSpan", this.width)
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
			game.getUnit(shipId).getSystem(systemId).select(e);
		})

	this.element = td;
	return td;
}

Structure.prototype.select = function(){
	console.log(this);
	var unit;

	if (this.destroyed || this.disabled || this.locked || this.parentId != aUnit || this.parentId < 0 || game.mode == 2){return;}
	else if (game.turn == 0 || game.turn == 1 && game.phase == -1){return;}

	unit = game.getUnit(this.parentId);
	if (unit.ship && unit.hasSystemSelected("Sensor") || unit.hasHangarSelected()){return false;}

	if (this.hasUnresolvedFireOrder()){
		this.unsetFireOrder();
	}
	if (this.selected){
		this.selected = false;
		this.validTarget = 0;
	}
	else if(!game.exclusiveSystem){
		this.selected = true;
	}

	this.setSystemBorder();

	if ((unit.ship || unit.squad) && unit.hasWeaponsSelected()){
		game.mode = 3;
		unit.highlightAllSelectedWeapons();
	}
	else {
		$("#aimDiv").hide();
		game.mode = 1;
		fxCtx.clearRect(0, 0, res.x, res.y);
	}
}

Structure.prototype.hover = function(e){
	var p = game.getUnit(this.parentId);

	if (game.flightDeploy){return false;}
	if (this.highlight){
		this.highlight = false;
		fxCtx.clearRect(0, 0, res.x, res.y);
		game.hideSysDiv();
		this.hideOptions();
		p.highlightAllSelectedWeapons();
	}
	else {
		this.highlight = true;
		this.drawStructArc(p.getPlannedFacing(), p.rolled, p.getPlannedPos());
		game.appendSysDiv($(this.getSysDiv()), e);
		this.showOptions();
	}
}

Structure.prototype.showOptions = function(){
	if (this.locked || game.phase != -1 || !this.effiency || game.getUnit(this.parentId).userid != game.userid ){return;}
	$(this.element).find(".boostDiv").show().end().find(".modeDiv").show();
}

Structure.prototype.hideOptions = function(){
	if (this.locked || game.phase != -1 || !this.effiency || game.getUnit(this.parentId).userid != game.userid ){return;}
	$(this.element).find(".boostDiv").hide().end().find(".modeDiv").hide();
}

Structure.prototype.getSysDiv = function(){
	var div = $("<div>").attr("id", "sysDiv")

	var table = $("<table>")
		.append($("<tr>")
			.append($("<th>").html(this.type + " Armour").attr("colSpan", 2)))
		.append($("<tr>")
			.append($("<td>").html("Armour Strength"))
			.append($("<td>").html(this.getRemNegation() + " / " + this.negation)))
		.append($("<tr>")
			.append($("<td>").html("Relative Durability"))
			.append($("<td>").html(((this.parentIntegrity - this.armourDmg) + " / " + this.parentIntegrity))))

	if (this.boostEffect.length){
		for (var i = 0; i < this.boostEffect.length; i++){
			var boost = this.getBoostEffect(this.boostEffect[i].type);
			if (boost){
				table.append($("<tr>")
						.append($("<th>").html("EA Energy Web").attr("colSpan", 2)))
					.append($("<tr>")
						.append($("<td>").html("Current Extra Armour"))
						.append($("<td>").html(this.getBoostEffect("Armour") * this.getBoostLevel()).addClass("boostEffect")))
					.append($("<tr>")
						.append($("<td>").html("Current Power Usage"))
						.append($("<td>").html(this.getPowerUsage()).addClass("powerUse")))
					.append($("<tr>")
						.append($("<td>").html("Boost Power Cost"))
						.append($("<td>").html(this.getEffiency()).addClass("powerCost")))
			}
		}
	}

	return div.append(table);
}

Structure.prototype.getWeaponPosition = function(size, facing){
	var a = getSystemArcDir(this);
		a = addAngle(a, facing);
	return getPointInDir(size/4, a, range(-10, 10), range(-10, 10));
}

Structure.prototype.update = function(){
	this.updateSysDiv();
	//$(this.element).find(".outputMask").html(this.getOutput());
}

Structure.prototype.updateSysDiv = function(){
	$("#sysDiv")
		.find(".boostEffect").html(this.getBoostEffect("Armour") * this.getBoostLevel()).end()
		.find(".powerUse").html(this.getPowerUsage()).end()
		.find(".powerCost").html(this.getEffiency());
	$(this.element).find(".integrityAmount").html(this.getArmourString());
}

Structure.prototype.getPowerUsage = function(){
	return System.prototype.getPowerUsage.call(this);
}

Structure.prototype.getEffiency = function(){
	return System.prototype.getEffiency.call(this);
}

Structure.prototype.getBoostCostIncrease = function(){
	return 0.5;
}

Structure.prototype.getBoostLevel = function(){
	return System.prototype.getBoostLevel.call(this);
}

Structure.prototype.plus = function(){
	return System.prototype.plus.call(this, false);
}

Structure.prototype.minus = function(){
	return System.prototype.minus.call(this, false);
}

Structure.prototype.doBoost = function(){
	return System.prototype.doBoost.call(this);
}

Structure.prototype.canUnboost = function(){
	return System.prototype.canUnboost.call(this);
}

Structure.prototype.doUnboost = function(){
	return System.prototype.doUnboost.call(this);
}

Structure.prototype.getBoostEffect = function(val){
	return System.prototype.getBoostEffect.call(this, val);
}

Structure.prototype.getRemIntegrity = function(){
	var integrity = this.integrity;
	for (var i = 0; i < this.damages.length; i++){
		integrity -= this.damages[i].armourDmg;
	}
	return Math.floor(integrity);
}

Structure.prototype.drawStructArc = function(facing, rolled, pos){
	if (game.animating){return;}

	fxCtx.clearRect(0, 0, res.x, res.y);
	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z);


	var	start;
	var	end;

	if (rolled){
		start = 360 - this.end;
		end = 360 - this.start;
	}
	else {
		start = this.start;
		end = this.end;
	}

	var p1 = getPointInDir(game.arcRange, start + facing, pos.x, pos.y);
	var p2 = getPointInDir(game.arcRange, end + facing, pos.x, pos.y)
	var dist = getDistance( {x: pos.x, y: pos.y}, p1);
	var rad1 = degreeToRadian(start + facing);
	var rad2 = degreeToRadian(end + facing);

	fxCtx.globalAlpha = 1;
	fxCtx.beginPath();			
	fxCtx.moveTo(pos.x, pos.y);
	fxCtx.arc(pos.x, pos.y, dist, rad1, rad2, false);
	fxCtx.closePath();		
	fxCtx.fillStyle = "white";
	fxCtx.fill();
	fxCtx.globalAlpha = 1;
	fxCtx.setTransform(1, 0, 0, 1, 0, 0);
}

Structure.prototype.getBoostDiv = function(){
	return System.prototype.getBoostDiv.call(this);
}

Structure.prototype.getModeDiv = function(){
	return System.prototype.getModeDiv.call(this);
}



function Primary(data){
	this.name = data.name;
	this.id = data.id;
	this.display = data.display;
	this.parentId = data.parentId;
	this.integrity = data.integrity;
	this.remaining = data.remaining;
	this.recentDmg = data.recentDmg;
	this.newDmg = data.newDmg;
	this.destroyed = data.destroyed;
	this.damages = [];
	this.highlight = false;	
	this.systems = [];
	this.element;
}
	
Primary.prototype.getTableData = function(){
	var tr = document.createElement("tr");
	var td = document.createElement("td");
		td.className = "struct";
		//td.colSpan = 2;

	var span = document.createElement("div");
		span.className = "integrityAmount font18";
		span.innerHTML = this.remaining + " / " + this.integrity;
		td.appendChild(span);

	var lowerDiv = document.createElement("div");
		lowerDiv.className = "integrityNow";
		lowerDiv.style.width =  this.remaining/this.integrity * 100 + "%";
		td.appendChild(lowerDiv);
		
	var upperDiv = document.createElement("div");
		upperDiv.className = "integrityFull";
		td.appendChild(upperDiv);

	$(td)
		.data("shipId", this.parentId)
		.data("systemId", this.id)
		.hover(
			function(e){
				var shipId = $(this).data("shipId");
				var systemId = $(this).data("systemId");
				game.getUnit(shipId).primary.hover(e);
			}
		)
		.mousedown(function(e){e.stopPropagation();})
		.click(function(e){
			var shipId = $(this).data("shipId");
			var systemId = $(this).data("systemId");
			console.log(game.getUnit(shipId).primary);
		})

	tr.appendChild(td);
	this.element = tr;
	return tr;
}

Primary.prototype.setRemainingIntegrity = function(){		
	this.remaining = this.getRemIntegrity();
}

Primary.prototype.hover = function(e){
	if (game.flightDeploy){return false;}
	if (this.highlight){
		this.highlight = false;
		$("#sysDiv").remove();
	}
	else {
		this.highlight = true;
		game.appendSysDiv($(this.getSysDiv()), e);
	}
}

Primary.prototype.getSysDiv = function(){
	return $("<div>").attr("id", "sysDiv")
		.append($("<table>")
			.append($("<tr>")
				.append($("<th>").html("Main Structure").attr("colSpan", 2)))
			.append($("<tr>")
				.append($("<td>").html("Integrity"))
				.append($("<td>").html(this.remaining + " / " + this.integrity)))
			.append($("<tr>")
				.append($("<td>").html("Integrity Remaining"))
				.append($("<td>").html(Math.round(this.remaining / this.integrity * 100) + " %")))
			.append($("<tr>")
				.append($("<td>").html("Recent EM Damage"))
				.append($("<td>").html(this.getEMDmg())))
			.append($("<tr>")
				.append($("<td>").html("Recent Damagemage"))
				.append($("<td>").html(this.recentDmg + " / " + this.getRecentDmgInt() + " %"))));
}

Primary.prototype.getEMDmg = function(){
	return System.prototype.getEMDmg.call(this);
}

Primary.prototype.getRecentDmgInt = function(){
	return System.prototype.getRecentDmgInt.call(this);
}

Primary.prototype.getRemIntegrity = function(){
	var integrity = this.integrity;
	for (var i = 0; i < this.damages.length; i++){
		integrity -= this.damages[i].systemDmg;
		if (this.damages[i].hullDmg){
			console.log("ERROR");
		}
	}
	return integrity;
}