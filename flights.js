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
	//console.log("setSize #" + this.id + ", size " + this.size);
	this.size = max + 20;
}

Flight.prototype.setPreFireSize = function(){
	//console.log("setPreFireSize #" + this.id);
	var max = 0;
	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].doDraw){continue;}
		max = Math.max(max, Math.abs(this.structures[i].layout.x));
		max = Math.max(max, Math.abs(this.structures[i].layout.y));
	}
	this.size = max + 20;
}

Flight.prototype.getEffEP = function(){
	return this.ep;
}

Flight.prototype.getLaunchAction = function(){
	var launch = this.actions[0];
		launch.resolved = 0;
	return [launch];
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

Flight.prototype.getBaseSpeed = function(){
	return this.baseImpulse;
}

Flight.prototype.getNewMission = function(){
	if (this.mission.turn == game.turn){
		return this.mission;
	}
}

Flight.prototype.setCallSign = function(){
	var names = ["Blue", "yellow", "Red", "Green", "Silver", "Tiger", "Eagle", "Dragon", "Wyvern", "Phoenix", "Rampage", "Assault", "Onslaught"];
	var signs = ["Alpha", "Beta", "Gamma", "Epsilon", "Sigma", "Phi"];

	this.callsign = (names[range(0, names.length-1)] + "-" + signs[range(0, signs.length-1)]);
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
			.append($("<td>").html("Type / Size"))
			.append($("<td>").html(getUnitType(this.traverse) + " / " + this.traverse)))
		.append($("<tr>")
			.append($("<td>").html("Current Mission"))
			.append($("<td>").addClass("missionType").html(game.getMissionTypeString(this, this.getTarget()))))
		.append($("<tr>")
			.append($("<td>").html("Current Speed"))
			.append($("<td>").addClass("speedStats").html(this.getCurSpeed() + " (max: " + this.getMaxSpeed() + ")")))
		.append($("<tr>")
			.append($("<td>").html("Acceleration"))
			.append($("<td>").html(" +" + this.baseImpulse + " per turn")))
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


	//if (this.friendly && game.phase == -1){
	if (game.phase == -1){
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
	else if (game.phase == 1 && !(this.mission.type == 1 && this.mission.arrived)){
		missionContainer
			.append($("<input>")
				.attr("type", "button")
				.attr("value", "Abort current mission")
				.click(function(e){
					if (aUnit == $(this).parent().parent().data("shipId")){
						game.doAbortMission();
					}
				}))
	}
	else {
		missionContainer
			.append($("<input>")
				.addClass("inactive")
				.attr("type", "button")
				.attr("value", "No action possible"))
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
						$("#aimDiv").hide()
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

	ele
	.append($("<div>").html("Flight #" + this.id + " (" + game.getMissionTypeString(this, this.getTarget()) + ")"))
	.append($("<div>").html("Speed: " + this.getCurSpeed() + " / " + this.getIntactElements() + " units"))
	.append($("<div>").html("Base To-Hit: " + this.getStringHitChance()))

	if (!this.mission.arrived && this.contactImminent()){
		ele.append($("<div>").html("<span class='yellow'>contact imminent</span>"));
	}

	this.appendCollisions(ele);
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

Flight.prototype.createMissionChangeEntry = function(){
	this.attachLogEntry("<th colSpan=9><span><font color='" + this.getCodeColor()+ "'>Flight #" + this.id + "</font> has been issued a new mission.</span></th>");
	$("#combatLog").find("tbody tr").last()
		.hover(
			function(){game.getUnit($(this).data("shipid")).handleHovering();},
			function(){game.resetHover()}
		)
}

Flight.prototype.createMissionAbortEntry = function(){
	this.attachLogEntry("<th colSpan=9><span><font color='" + this.getCodeColor()+ "'>Flight #" + this.id + "</font> has emergeny-aborted its mission.</span></th>");
	$("#combatLog").find("tbody tr").last()
		.hover(
			function(){game.getUnit($(this).data("shipid")).handleHovering();},
			function(){game.resetHover()}
		)
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

Flight.prototype.hasAbortedMission = function(){
	if (this.patrolLayout && this.mission.type == 1 && this.mission.turn == game.turn && this.mission.arrived == game.turn){
		if (this.mission.x == this.x && this.mission.y == this.y){
			return true;
		}
	}
	return false;
}

Flight.prototype.setImage = function(){
	if (this.hasPatrolLayout()){this.setPatrolImage(); return;}
	//console.log("setImage " + this.id);
	var t = document.createElement("canvas");
		t.width = this.size*2;
		t.height = this.size*2;
	var ctx = t.getContext("2d");
		ctx.translate(t.width/2, t.height/2);

	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].doDraw){continue;}

		ctx.translate(this.structures[i].layout.x, this.structures[i].layout.y);
		ctx.drawImage(
			this.structures[i].getBaseImage(),
			0 -this.structures[i].size/2,
			0 -this.structures[i].size/2,
			this.structures[i].size, 
			this.structures[i].size
		)
		ctx.translate(-this.structures[i].layout.x, -this.structures[i].layout.y);
	}

	ctx.arc(0, 0, 5, 0, 2*Math.PI, false);
	ctx.fillStyle = (this.friendly ? "#00ea00" : "red");
	ctx.fill();
	ctx.setTransform(1,0,0,1,0,0);
	this.img = t;
	//console.log(this.img.toDataURL());
}

Flight.prototype.setPatrolImage = function(){
	//console.log("setPatrolImage " + this.id);
	var t = document.createElement("canvas");
		t.width = this.size*2;
		t.height = this.size*2;
	var ctx = t.getContext("2d");
		ctx.translate(t.width/2, t.height/2);

	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].doDraw){continue;}

		ctx.save();
		ctx.translate(this.structures[i].layout.x, this.structures[i].layout.y);
		ctx.rotate((360/this.structures.length*i) * (Math.PI/180));
		ctx.drawImage(
		this.structures[i].getBaseImage(),
			0 -this.structures[i].size/2,
			0 -this.structures[i].size/2,
			this.structures[i].size, 
			this.structures[i].size
		);
		ctx.restore();
	}
	ctx.setTransform(1,0,0,1,0,0);
	this.img = t;
	//console.log(this.drawImg.toDataURL());
}

Flight.prototype.setBaseLayout = function(){
	var osx = 16;
	var osy = 12;

	//var num = Math.ceil(this.structures.length/3);
	//this.size = num*10;

	var reach = 15 + Math.max(0, (Math.floor(this.structures.length-3)/3)*12);

	for (var i = 0; i < this.structures.length/3; i++){

		var a = 360/Math.ceil(this.structures.length/3)*i;
		//var o = getPointInDir(0 + this.unitSize*15, a-90, 0, 0);
		var o = getPointInDir(reach, a, 0, 0);

		for (var j = 0; j < Math.min(this.structures.length-i*3, 3); j++){
			var ox = o.x;
			var oy = o.y;

			switch (j){
				case 0: oy -= osy; break;
				case 1: ox -= osx; oy += osy; break;
				case 2: ox += osx; oy += osy; break;
				default: break;
			}
			this.structures[(i*3)+j].layout = {x: ox, y: oy};
		}
	}
	this.patrolLayout = 0;
}