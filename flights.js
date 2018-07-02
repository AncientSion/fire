function Fighter(data){
	Single.call(this, data);
	this.ep = 0;
	this.fighter = 1;

	this.create(data);
}
Fighter.prototype = Object.create(Single.prototype);

Fighter.prototype.create = function(data){
	for (var k = 0; k < data.damages.length; k++){
		this.damages.push(new Damage(data.damages[k]));
	}
	for (var k = 0; k < data.crits.length; k++){
		this.crits.push(new Crit(data.crits[k]));
	}
	for (var k = 0; k < data.systems.length; k++){
		var system = new window[data.systems[k].type](data.systems[k]);
		for (var l = 0; l < data.systems[k].fireOrders.length; l++){
			system.fireOrders.push(new FireOrder(data.systems[k].fireOrders[l]));
		}
		system.setState();
		this.systems.push(system);
	}
}



function Flight(data){
	Mixed.call(this, data);
	this.flight = 1;
	this.fSize = data.fSize;
	this.baseSize = data.baseSize;
	this.unitSize = data.unitSize;
	this.oldMission = data.mission;
}

Flight.prototype = Object.create(Mixed.prototype);

Flight.prototype.setSize = function(){
	//console.log("setSize #" + this.id);
	var max = 0;
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}
		max = Math.max(max, Math.abs(this.structures[i].layout.x));
		max = Math.max(max, Math.abs(this.structures[i].layout.y));
	}
	this.size = max + 20;
}

Flight.prototype.setImpulse = function(){
	this.baseImpulse = 1000;
	for (var i = 0; i < this.structures.length; i++){
		this.baseImpulse = Math.min(this.baseImpulse, this.structures[i].baseImpulse)
	}
	this.curImp = this.baseImpulse;
}

Flight.prototype.getEP = function(){
	return this.ep;
}

Flight.prototype.hasWeaponsSelected = function(){
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].weapon){
				if (this.structures[i].systems[j].selected){
					return true;
				}
			}
		}
	}

	return false;
}

Flight.prototype.setCurSpeed = function(){
	var start = game.turn;

	if (this.mission.targetid == this.oldMission.targetid && this.mission.type == this.oldMission.type){
		start = this.oldMission.turn;
	}

	this.curImp = Math.floor(this.baseImpulse * ((game.turn - start)+1));
	return
	

	if (this.mission.turn == game.turn){
		this.curImp = Math.floor(this.baseImpulse * 1);
	} else this.curImp = Math.floor(this.baseImpulse * (game.turn - this.mission.turn + 1));
}

Flight.prototype.getMaxSpeed = function(){
	return this.baseImpulse*4;
}


Flight.prototype.getNewMission = function(){
	if (this.mission.turn == game.turn){
		return this.mission;
	}
}

Flight.prototype.setCallSign = function(){
	var names = ["Blue", "yellow", "Red", "Green", "Silver", "Tiger", "Eagle", "Dragon", "Wyvern", "Phoenix", "Rampage", "Assault", "Onslaught"];
	var signs = ["Alpha", "Beta", "Gamma", "Epsilon", "Sigma", "Phi"];

	this.call = (names[range(0, names.length-1)] + "-" + signs[range(0, signs.length-1)]);
}

Flight.prototype.createBaseDiv = function(){
	var owner = "friendly";
	if (game.phase > -2 && this.userid != game.userid){owner = "hostile";}
	var div = document.createElement("div");
		div.className = "shipDiv " + owner;
		$(div).data("shipId", this.id);

	this.element = div;

	var subDiv = document.createElement("div");
		subDiv.className = "header";
	
	var table = document.createElement("table");
		table.className = "general";

	var header = "red";
	if (this.friendly){header = "green";}

	$(table)
		.append($("<tr>")
			.append($("<th>").html(this.name.toUpperCase() + " #" + this.id).attr("colSpan", 2).addClass(header)))
		.append($("<tr>")
			.append($("<td>").html("Unit Type (Size)"))
			.append($("<td>").html(getUnitType(this.traverse) + " (" + this.traverse + ")")))
		.append($("<tr>")
			.append($("<td>").html("Current Mission"))
			.append($("<td>").addClass("missionType").html(game.getMissionTypeString(this, this.getTarget()))))
		.append($("<tr>")
			.append($("<td>").html("Current Speed"))
			.append($("<td>").html(this.getCurSpeed())))
		.append($("<tr>")
			.append($("<td>").html("Acceleration"))
			.append($("<td>").html(" +" + this.baseImpulse + " per turn, maximum " + (this.getMaxSpeed()))))
		.append($("<tr>")
			.append($("<td>").html("Mission Target"))
			.append($("<td>").addClass("missionTarget").html(game.getMissionTargetString(this.mission))))
		//.append($("<tr>")
		//	.append($("<td>").html("Mission Start"))
		//	.append($("<td>").addClass("missionTurn").html("Turn " + this.mission.turn)))
		
		
			
	subDiv.appendChild(table);
	div.appendChild(subDiv);

	var maxWidth = 300;
	$(div).css("width", maxWidth);
	$(div).find(".header").css("width", "99%");

	$(this.expandDiv(div))
		.addClass("disabled")
		.drag()
		.find(".structContainer")
			.contextmenu(function(e){e.stopPropagation(); e.preventDefault()})
			//.addClass("disabled")
			.end()
		.find(".general")
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

	var missionContainer = $("<div>").addClass("missionContainer");
	$(div).append(missionContainer);


	if (this.friendly && game.phase == -1){
			missionContainer
				.append($("<input>")
					.attr("type", "button")
					.attr("value", "Set new mission")
					.click(function(e){
						if (aUnit == $(this).parent().parent().data("shipId")){
							game.getUnit(aUnit).switchMissionMode();
						}
					}))
				.append($("<div>")
					.addClass("missionOption disabled")
					.append($("<input>")
						.attr("type", "radio")
						.attr("name", "mission")
						.attr("value", 1))
					.append($("<span>").html("Patrol location"))
					)
				.append($("<div>")
					.addClass("missionOption disabled")
					.append($("<input>")
						.attr("type", "radio")
						.attr("name", "mission")
						.attr("value", 2))
					.append($("<span>").html("Strike / Escort / Intercept"))
				)
				.append($("<input>")
					.addClass("missionOption confirm disabled")
					.attr("type", "button")
					.attr("value", "Confirm / Proceed")
					.click(function(e){
						if (aUnit == $(this).parent().parent().data("shipId")){
							game.getUnit(aUnit).confirmMissionMode();
						}
					}))
	}
	else {
		if (game.phase != -1){
			text = "Orders: -Initial Phase only-";
		}
		else if (!this.friendly){
			text = "New orders possible";
		}

		missionContainer
			.append($("<input>")
				.addClass("inactive")
				.attr("type", "button")
				.attr("value", text))
	}
}

Flight.prototype.expandDiv = function(div){
	var structContainer = $("<div>").addClass("structContainer");
	$(div).append(structContainer);
	$(document.body).append(div);
	
	for (var i = 0; i < this.structures.length; i++){
		var singleDiv = this.structures[i].getElement(false);
		structContainer.append(singleDiv);
	}

	var height = 0;

	$(structContainer).find(".singleDiv").each(function(){
		var y = $(this).position().top + $(this).height();
		if (y > height){
			height = y;
		}
	})

	$(structContainer).css("height", height + 30).css("padding-top", 5).css("padding-bottom", 5);

	return div;
}

Flight.prototype.supplyAttachDiv = function(div){
	var color = "red";

	if (this.friendly){color = "green";}
	var attachDiv = $("<div>").addClass("attachDiv")
		.append($("<div>").css("display", "block").addClass("center15 " + color).html(this.getAttachDivTargetString()))
		.data("id", this.id)
		.click(Mixed.prototype.attachDivClickFunction)
		.hover(
			function(e){
				var vessel = game.getUnit($(this).data("id"));
				vessel.doHighlight();
				if (aUnit && aUnit != vessel.id){
					var	ship = game.getUnit(aUnit);
					if (ship.salvo){return;}
					else if (ship.hasWeaponsSelected() && ship.id != vessel.id){
						handleWeaponAimEvent(ship, vessel, e);
					}
					else {
						game.target = 0;
						$("#weaponAimTableWrapper").hide()
					}
				}
			},
			function(e){
				var vessel = game.getUnit($(this).data("id"));
					vessel.highlight = 0;
				game.redraw();
			}
		)

	for (var j = 0; j < this.structures.length; j++){
		if (this.structures[j].destroyed || this.structures[j].disabled){continue;}
		attachDiv.append($("<div>")
			.append($(this.structures[j].getBaseImage().cloneNode(true))
				.addClass("rotate270")
				.css("width", 34)
				.css("height", 34)
			)
		)
	}

	div.append(attachDiv);
	return div;
}

Flight.prototype.getAttachDivTargetString = function(){
	var target = this.getTarget();
	if (this.mission.type == 2){return "Flight #" + this.id + " --------- Target: " + target.name + " #" + target.id;}
	else return " Patrolling ";
}


Flight.prototype.switchMissionMode = function(){
	if (game.flightDeploy){this.disableMissionMode();}
	else this.enableMissionMode();
}

Flight.prototype.confirmMissionMode = function(){
	var checked =  $(this.element).find("input[name=mission]:checked");
	if (!checked.length){return;}
	var value = Math.floor(checked.val());
	game.mission = value;
	if (!game.mission){return;}
	//console.log(value);
	ui.deployOverlay.show().find("#deployType").html( game.getMissionType(value)).end();
}

Flight.prototype.drawMissionArea = function(){
	return;
	if (this.mission.type != 1){
	}

	planCtx.translate(cam.o.x, cam.o.y);
	planCtx.scale(cam.z, cam.z);
	planCtx.beginPath();
	planCtx.moveTo(origin.x, origin.y);
	planCtx.beginPath();			
	planCtx.arc(this.mission.x, this.mission.y, this.size/2, 0, 2*Math.PI, false);
	planCtx.closePath();
	planCtx.fillStyle = "green";
	planCtx.globalAlpha = 0.3;
	planCtx.fill();
	planCtx.globalAlpha = 1;
	planCtx.setTransform(1,0,0,1,0,0);
}

Flight.prototype.getShortInfo = function(){
	var ele = ui.shortInfo;
	if (game.phase > -2 && this.userid == game.userid){
		$(ele).attr("class", "friendly");
	} else $(ele).attr("class", "hostile");

	var baseHit = this.getBaseHitChance();
	var impulse = this.getCurSpeed();
	
	var table = document.createElement("table");
		table.insertRow(-1).insertCell(-1).innerHTML = "Flight #" + this.id + " (" + game.getMissionTypeString(this, this.getTarget()) + ")";
		table.insertRow(-1).insertCell(-1).innerHTML =  "Speed: " + this.getCurSpeed() + " / " + this.getIntactElements() + " units";
		table.insertRow(-1).insertCell(-1).innerHTML = "Base To-Hit: " + this.getStringHitChance();
	
	if (!this.mission.arrived && this.inRange()){
		table.insertRow(-1).insertCell(-1).innerHTML = "<span class='yellow'>contact imminent</span>";
	}

	return table;
}

Flight.prototype.setPreMoveSize = function(){
	this.size = this.baseSize + this.unitSize * this.getIntactElements();
}

Flight.prototype.setPostMoveSize = function(){
	if (this.mission.arrived){
		if (this.mission.type == 2 || this.mission.type == 3){
			//var s = game.getUnit(this.mission.targetid).size;
			//this.size = s+30;
		}
		else if (this.mission.type == 1){
			//this.size = 1.5*(this.baseSize + this.unitSize * this.getIntactElements());
		}
	}
	else this.size = this.baseSize + this.unitSize * this.getIntactElements();
}

Flight.prototype.switchDiv = function(){
	if (this.selected){
		$(this.element).find(".header").find(".general").find(".missionEntry").removeClass("disabled");
	} else $(this.element).find(".header").find(".general").find(".missionEntry").addClass("disabled");

	Ship.prototype.switchDiv.call(this);
}

Flight.prototype.hasNoFireOrders = function(){
	var check = false;
	if (!this.cc.length){
		return false;
	}
	else {
		for (var i = 0; i < this.cc.length; i++){
			var t = game.getUnit(this.cc[i]);
			if (t.userid == this.userid){continue;}
			check = true;
			break;
		}
	}

	if (check){
		for (var j = 0; j < this.structures.length; j++){
			if (this.structures[j].destroyed){continue;}

			for (var k = 0; k < this.structures[j].systems.length; k++){
				if (this.structures[j].systems[k].weapon &&  this.structures[j].systems[k].getLoadLevel() >= 1){
					if (this.structures[j].systems[k].hasFireOrder()){
						return false;
					}
				}
			}
		}
	} else return false;
	
	return true;
}

Flight.prototype.createDeployEntry = function(){
	this.attachLogEntry("<td colSpan=9><span><font color='" + this.getCodeColor()+ "'>Flight #" + this.id + "</font> is being deployed (" + this.structures.length + " units).</span></td>");
}

Flight.prototype.createMissionChangeEntry = function(){
	this.attachLogEntry("<td colSpan=9><span><font color='" + this.getCodeColor()+ "'>Flight #" + this.id + "</font> has been issued a new mission.</span></td>");
}

Flight.prototype.getLoadAdjustment = function(){
	var data = {shipid: this.launch.shipid, systemid: this.launch.systemid, loads: []};
	for (var i = 0; i < this.launch.loads.length; i++){
		if (!this.launch.loads[i].launch){continue;}
		data.loads.push({amount: this.launch.loads[i].launch, name: this.launch.loads[i].name});
	}
	return data;
}

Flight.prototype.getLaunchData = function(){
	var units = []
	for (var i = 0; i < this.launch.loads.length; i++){
		if (!this.launch.loads[i].launch){continue;}
		units.push({amount: this.launch.loads[i].launch, name: this.launch.loads[i].name});
	}
	var data = {active: 1, units: units};
	return [data];
}
