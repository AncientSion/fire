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

Fighter.prototype.addMainDivEvents = function(div, alive, isBuy){
	if (isBuy){
		div
		.find("img")
		.hover(function(e){
			e.stopPropagation();
			game.getSampleFighter($(this).parent().parent().parent().find("td").first().html()).hover(e);
			return;
			var shipId = $(this).parent().parent().parent().data("shipId");
			var fighterId = $(this).parent().data("fighterId");
			game.getUnit(shipId).getSystem(fighterId).hover(e);
		});
		return;
	}

	if (alive){
		div
		.find("img")
		.hover(function(e){
			e.stopPropagation();
			var shipId = $(this).parent().parent().parent().data("shipId");
			var fighterId = $(this).parent().data("fighterId");
			game.getUnit(shipId).getSystem(fighterId).hover(e);
		})
		.click(function(e){
			e.stopPropagation();
			var shipId = $(this).parent().parent().parent().data("shipId");
			var fighterId = $(this).parent().data("fighterId");
			console.log(game.getUnit(shipId).getSystem(fighterId));
		});
	}
	else {
		div
		.find(".overlay")
		.hover(function(e){
			e.stopPropagation();
			var shipId = $(this).parent().parent().parent().data("shipId");
			var fighterId = $(this).parent().data("fighterId");
			game.getUnit(shipId).getSystem(fighterId).hover(e);
		})
		.click(function(e){
			e.stopPropagation();
			var shipId = $(this).parent().parent().parent().data("shipId");
			var fighterId = $(this).parent().data("fighterId");
			console.log(game.getUnit(shipId).getSystem(fighterId));
		})
	}
}

Fighter.prototype.addSysEvents = function(div, isBuy){
	if (isBuy){
		div
		.css("zIndex", 1)
		.hover(function(e){
			e.stopPropagation();
			//$("#systemDetailsDiv").remove();
			console.log("ding"); 
			game.getSampleFighter($(this).parent().parent().parent().children().first().html()).systems[0].hover(e);

			return;
			var shipId = $(this).parent().parent().parent().data("shipId");
			game.getUnit(shipId).getSystem($(this).data("systemId")).hover(e)
		})
		return;
	}
	
	div
	.click(function(e){
		e.stopPropagation();
		var shipId = $(this).parent().parent().parent().data("shipId");
		game.getUnit(shipId).getSystem($(this).data("systemId")).select(e)
	})
	.contextmenu(function(e){
		e.stopPropagation();
		e.preventDefault();
		var shipId = $(this).parent().parent().parent().data("shipId");
		game.getUnit(shipId).selectAll(e, $(this).data("systemId"));
	})
	.hover(function(e){
		e.stopPropagation();
		$("#systemDetailsDiv").remove();
		var shipId = $(this).parent().parent().parent().data("shipId");
		game.getUnit(shipId).getSystem($(this).data("systemId")).hover(e)
	})
}

Fighter.prototype.getElement = function(isBuy){
	var fighterDiv = $("<div>")
		.addClass("fighterDiv")
		.data("fighterId", this.id)
		.append($(this.getBaseImage().cloneNode(true))
			.addClass("rotate270 img80pct"))

	var alive = 1;
	if (this.destroyed || this.disabled){alive = 0;}
	if (!alive){
		fighterDiv
			.append($("<img>")
				.attr("src", "varIcons/destroyed.png")
				.addClass("overlay"))
	}

	this.addMainDivEvents(fighterDiv, alive, isBuy);

	var wrap = document.createElement("div");
		wrap.className = "iconIntegrity"; wrap.style.height = 12;

	var rem = this.getRemIntegrity();

	var bgDiv = document.createElement("div");
		bgDiv.className = "integrityAmount"; bgDiv.style.textAlign = "center"; bgDiv.style.fontSize = 12; bgDiv.style.top = 0;
		bgDiv.innerHTML = rem + " / " + this.integrity;
		wrap.appendChild(bgDiv);

	var lowerDiv = document.createElement("div");
		lowerDiv.className = "integrityNow"; lowerDiv.style.top = 0; lowerDiv.style.height = "100%";
		lowerDiv.style.width = rem/this.integrity * 100 + "%";
		wrap.appendChild(lowerDiv);
		
	var upperDiv = document.createElement("div");
		upperDiv.className = "integrityFull"; upperDiv.style.top = 0;
		wrap.appendChild(upperDiv);

	fighterDiv.append(wrap);

	var s = 20;
	for (var j = 0; j < this.systems.length; j++){
		var ele = $(this.systems[j].getFighterSystemData(true));
		this.addSysEvents(ele, isBuy)
		fighterDiv.append(ele);
	}

	return fighterDiv;
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
	this.currentImpulse = this.baseImpulse;
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
	if (this.mission.turn == game.turn){
		this.currentImpulse = Math.floor(this.baseImpulse * 1);
	} else this.currentImpulse = Math.floor(this.baseImpulse * (game.turn - this.mission.turn + 1));
}

Flight.prototype.getMaxSpeed = function(){
	return this.baseImpulse*4;
}


Flight.prototype.getNewMission = function(){
	if (this.mission.turn == game.turn){
		return this.mission;
	}
}

Flight.prototype.setImage = function(){
	//console.log("setImage #" + this.id);

	if (!this.mission.arrived){
		this.setPreMoveImage();
	}	
	else if (this.mission.arrived){
		if (this.mission.arrived < game.turn){
			this.setPostMoveImage();
		} 
		else if (this.mission.arrived == game.turn){
			if (game.phase < 3){
				this.setPreMoveImage();
			} else this.setPostMoveImage();
		}
	}
}

Flight.prototype.setCallSign = function(){
	var names = ["Blue", "Yellow", "Red", "Green", "Silver", "Tiger", "Eagle", "Dragon", "Wyvern", "Phoenix", "Rampage", "Assault", "Onslaught"];
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
			.append($("<td>").html("Unit Type / Size"))
			.append($("<td>").html(game.getUnitType(this.traverse) + " (" + this.traverse + ")")))
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
		

		if (this.friendly && game.phase == -1){
			$(table)
			.append($("<tr>").append("<td>").attr("colSpan", 2).css("height", "10px"))
			.append($("<tr>").addClass("missionSwitch")
				.append($("<td>")
					.attr("colSpan", 2)
					.addClass("missionButton active")
					.html("Disengage From Mission")
					.data("active", 0)
					.data("mission", this.mission.type)
					.data("shipid", this.id)
					.click(function(e){
						if (aUnit == $(this).data("shipid")){
							game.getUnit(aUnit).switchMissionMode();
						}
					})))
			.append($("<tr>").addClass("missionOption").click(function(){game.mission.set(1, this)}).addClass("disabled").append($("<td>").attr("colSpan", 2).css("font-size", "14px").html("Patrol location")))
			.append($("<tr>").addClass("missionOption").click(function(){game.mission.set(2, this)}).addClass("disabled").append($("<td>").attr("colSpan", 2).css("font-size", "14px").html("Strike / Escort / Intercept unit")))
		}
		else {
			if (game.phase != -1){
				text = "Orders: -Deployment PHASE-";
			}
			else if (!this.friendly){
				text = "New orders possible";
			}

			$(table)
			.append($("<tr>").append("<td>").attr("colSpan", 2).css("height", "10px"))
			.append($("<tr>").addClass("missionSwitch")
				.append($("<td>")
					.attr("colSpan", 2)
					.addClass("missionButton")
					.html(text)));
		}
		
			
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
}

Flight.prototype.expandDiv = function(div){
	var structContainer = $("<div>").addClass("structContainer");
	$(div).append(structContainer);
	$(document.body).append(div);



	for (var i = 0; i < this.structures.length; i++){
		var fighterDiv = this.structures[i].getElement(false);
		structContainer.append(fighterDiv);
	}

	var height = 0;

	$(structContainer).find(".fighterDiv").each(function(){
		var y = $(this).position().top + $(this).height();
		if (y > height){
			height = y;
		}
	})

	$(structContainer).css("height", height + 50);


	return div;
}

Flight.prototype.supplyAttachDiv = function(div){
	var color = "red";

	var target = this.getTarget();
	if (this.friendly){color = "green";}
	var attachDiv = $("<div>").addClass("attachDiv")
		.append($("<div>").css("display", "block").addClass("center15 " + color).html("Flight #" + this.id + "________Target: " + target.name + " #" + target.id))
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


Flight.prototype.switchMissionMode = function(){
	if (game.mission){this.disableMissionMode();}
	else this.enableMissionMode();
}

Flight.prototype.disableMissionMode = function(){
	game.mission = 0;
	$(this.element).find(".header").css("height", "130px").find("tr").slice(-3)
	.each(function(i){
		if (!i){
			$(this).children()[0].innerHTML = "Disengage from Mission";
		} else $(this).addClass("disabled").removeClass("selected");
	});
}


Flight.prototype.enableMissionMode = function(){
	game.mission = new Mission(this);
	$(this.element).find(".header").css("height", "auto").find("tr").slice(-3)
	.each(function(i){
		if (!i){
			$(this).children()[0].innerHTML = "Select new Mission";
		} else $(this).removeClass("disabled");
	});
}

Flight.prototype.drawMissionArea = function(){
	if (this.mission.type != 1){
		return;
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
	var ele = game.ui.shortInfo;
	if (game.phase > -2 && this.userid == game.userid){
		$(ele).attr("class", "friendly");
	} else $(ele).attr("class", "hostile");

	var baseHit = this.getBaseHitChance();
	var impulse = this.getCurSpeed();
	
	var table = document.createElement("table");
		table.insertRow(-1).insertCell(-1).innerHTML = "Flight #" + this.id + " (" + game.getMissionTypeString(this, this.getTarget()) + ")";
		table.insertRow(-1).insertCell(-1).innerHTML =  "Speed: " + this.getCurSpeed() + " / " + this.getIntactFighters() + " units";
		table.insertRow(-1).insertCell(-1).innerHTML = this.getStringHitChance();
	
	if (!this.mission.arrived && game.phase < 1 && this.inRange()){
		table.insertRow(-1).insertCell(-1).innerHTML = "<span class='red'>contact imminent</span>";
	}

	return table;
}

Flight.prototype.getIntactFighters = function(){
	var alive = 0;
	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].destroyed){
			alive++;
		}
	}
	return alive;
}

Flight.prototype.setPreMoveSize = function(){
	this.size = this.baseSize + this.unitSize * this.getIntactFighters();
}

Flight.prototype.setPostMoveSize = function(){
	if (this.mission.arrived){
		if (this.mission.type == 2 || this.mission.type == 3){
			//var s = game.getUnit(this.mission.targetid).size;
			//this.size = s+30;
		}
		else if (this.mission.type == 1){
			//this.size = 1.5*(this.baseSize + this.unitSize * this.getIntactFighters());
		}
	}
	else this.size = this.baseSize + this.unitSize * this.getIntactFighters();
}

Flight.prototype.switchDiv = function(){
	if (this.selected){
		$(this.element).find(".header").find(".general").find(".missionSwitch").removeClass("disabled");
	} else $(this.element).find(".header").find(".general").find(".missionSwitch").addClass("disabled");

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