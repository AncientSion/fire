function Flight(data){
	Mixed.call(this, data);
	this.flight = 1;
	this.fSize = data.fSize;
	this.ep = data.ep;
	this.mass = data.mass;
	this.baseSize = data.baseSize;
	this.unitSize = data.unitSize;
	this.mission = data.mission || {};
	this.traverse = -3;
	this.patrolFacing = [];
	this.drawImg;
	this.doDraw = 1;

	this.setSize = function(){
		if (!this.mission.arrived){
			this.setPreMoveSize();
		}
		else if (this.mission.arrived < game.turn){
			this.setPostMoveSize();
		}
		else if (this.mission.arrived == game.turn){
			if (game.phase <= 2){
				this.setPreMoveSize();
			} else this.setPostMoveSize();
		}
	}

	this.setLayout = function(){
		var size = this.fSize;

		var toDo = Math.min(6, Math.ceil(this.structures.length/2));
		var done = 0;

		for (var i = 0; i < toDo; i++){
			this.structures[i].layout = {
				x: -size/2 - size*i/2,
				y: -toDo*size/2 +size*(i)
 			};
			this.structures[toDo*2-(i+1)].layout = {
				x: size/2 + size*i/2,
				y: -toDo*size/2 +size*(i)
 			};
 			done += 2;
		}

		if (done < this.structures.length){
			for (var i = 0; i < (this.structures.length-done)/2; i++){
				this.structures[i].layout = {
					x: -size/2 - size/2*i,
					y: size/2 + size*i
	 			};
				this.structures[this.structures.length-done/2-(i+1)].layout = {
					x: size/2 + size/2*i,
					y: size/2 + size*i
	 			};
			}
		}
	}

	this.setMaxMass = function(){
		for (var i = 0; i < this.structures.length; i++){
			if (! this.structures[i].destroyed){
				if (this.structures[i].mass > this.mass){
					this.mass = this.structures[i].mass; 
				}
			}
		}
	}

	this.setImpulse = function(){
		this.baseImpulse = Math.floor(Math.pow(this.mass, -1.5)*50000);
		this.currentImpulse = this.baseImpulse;
	}

	this.getEP = function(){
		return this.ep;
	}
	
	this.hasWeaponsSelected = function(){		
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

	this.getNewMission = function(){
		if (this.mission.turn == game.turn){
			return this.mission;
		}
	}

	this.createBaseDiv = function(){
		var owner = "friendly";
		if (game.phase > -2 && this.userid != game.userid){owner = "hostile";}
		var div = document.createElement("div");
			div.className = "shipDiv " + owner;
			$(div).data("shipId", this.id);

		var subDiv = document.createElement("div");
			subDiv.className = "header";
		
		var table = document.createElement("table");
			table.className = "general";

		var header = "red";
		if (this.friendly){header = "green";}

		$(table)
			.append($("<tr>")
				.append($("<th>").html(this.name.toUpperCase() + " #" + this.id).attr("colspan", 2).addClass(header)))
			.append($("<tr>")
				.append($("<td>").html("Classification"))
				.append($("<td>").html(game.getUnitType(this.traverse))))
			.append($("<tr>")
				.append($("<td>").html("Current Impulse"))
				.append($("<td>").html(this.getCurrentImpulse())))
			.append($("<tr>")
				.append($("<td>").html("Current Mission"))
				.append($("<td>").html(game.getMissionTypeString(this.mission.type))))
			.append($("<tr>")
				.append($("<td>").html("Mission Target"))
				.append($("<td>").html(game.getMissionTargetString(this.mission))))

		if (this.friendly && game.phase == -1 && this.available < game.turn){
			$(table)
			.append($("<tr>").append("<td>").attr("colSpan", 2).css("height", "10px"))
			.append($("<tr>")
				.append($("<td>")
					.attr("colSpan", 2)
					.css("font-size", "16px")
					.css("border", "1px solid white")
					.html("flight From Mission")
					.data("active", 0)
					.data("mission", this.mission.type)
			/*		.click(function(e){
						var mission = $(this).data("mission");
						if ($(this).data("active") == 0){
							$(this).data("active", 1).html("Select New Mission");
							//$(this).addClass("selected");
							$(this).parent().parent().parent().parent().css("height", "auto").end().end()
							.find("tr").slice(-3).each(function(i){
								$(this).removeClass("disabled");
								if (i == mission-1){
									$(this).addClass("selected");
								}
							})
						} else {
							$(this).data("active", 0).html("Disengage From Mission");
							//$(this).removeClass("selected");
							$(this).parent().parent().parent().parent().css("height", "130px").end().end()
							.find("tr").slice(-3).each(function(i){
								$(this).addClass("disabled");
							})
						}
					})
			*/
					.click(function(e){
						game.getUnitById(aUnit).switchMissionMode();
					})
					.hover(function(e){
						$(this).toggleClass("highlight");
					})))
			.append($("<tr>").click(function(){game.mission.set(1, this)}).addClass("disabled").append($("<td>").attr("colSpan", 2).css("font-size", "14px").html("Patrol Location")))
			.append($("<tr>").click(function(){game.mission.set(2, this)}).addClass("disabled").append($("<td>").attr("colSpan", 2).css("font-size", "14px").html("Strike/ Escort Ship")))
			//.append($("<tr>").click(function(){game.mission.set(3, this)}).addClass("disabled").append($("<td>").attr("colSpan", 2).css("font-size", "14px").html("Intercept Flight / Salvo")));
		}
				
		subDiv.appendChild(table);
		div.appendChild(subDiv);

		var maxWidth = 250;
		$(div).css("width", maxWidth);
		$(div).find(".header").css("width", "99%");

		$(this.expandDiv(div))
			.addClass("disabled")
			.drag()
			.find(".structContainer")
				.contextmenu(function(e){e.stopPropagation;})
				//.addClass("disabled")
				.end()
			.contextmenu(function(e){
				//e.stopImmediatePropagation(); e.preventDefault();
				if ($(this).data("shipId") != aUnit){
					$(this).addClass("disabled");
				}
			})

		if (game.phase == 2){
			$(div).find(".structContainer").show();
		}

		this.element = div;
	}

	this.expandDiv = function(div){
		var structContainer = document.createElement("div");
			structContainer.className = "structContainer";

		div.appendChild(structContainer);
		document.body.appendChild(div);

		// OUTER STRUCTS

		maxWidth = $(div).width();
		var x = 15;
		var y = 30;
		var h = 50;
		var w = 50;

		for (var i = 0; i < this.structures.length; i++){

			var active = true;
			if (this.structures[i].destroyed || this.structures[i].disabled){
				active = false;
			}

			var img = new Image()
				img.src = window.shipImages[this.structures[i].name.toLowerCase() + "l"].src;

				$(img)
					.data("shipId", this.id)
					.data("fighterId", this.structures[i].id)
					.addClass("size40")
					.click(function(e){
						e.stopPropagation();
						console.log(game.getUnitById($(this).data("shipId")).getSystemById($(this).data("fighterId")));
					})


			var fighterDiv = document.createElement("div");
				fighterDiv.className = "fighterDiv";
				fighterDiv.appendChild(img);

			if (!active){
				var overlay = new Image();
				$(overlay)
					.attr("src", "varIcons/destroyed.png")
					.addClass("overlay").addClass("size30")
					.hover(function(e){
						e.stopPropagation();
						var p = $(this).parent().children()[0];
						game.getUnitById($(p).data("shipId")).getSystemById($(p).data("fighterId")).hover(e);
					})
				fighterDiv.appendChild(overlay);
			}
			else {
				$(img).hover(function(e){
					e.stopPropagation();
					game.getUnitById($(this).data("shipId")).getSystemById($(this).data("fighterId")).hover(e);
				});
			}

			structContainer.appendChild(fighterDiv);

			if (x + 50 + 5 > maxWidth){
				x = 15;
				y += h*2;
			}


			$(fighterDiv)
				.css("left", x)
				.css("top", y)

			x += 50 + 5;
			var wrap = document.createElement("div");
				wrap.className = "iconIntegrity"; wrap.style.height = 12;

			var rem = this.structures[i].getRemainingIntegrity();

			var bgDiv = document.createElement("div");
				bgDiv.className = "integrityAmount"; bgDiv.style.textAlign = "center"; bgDiv.style.fontSize = 12; bgDiv.style.top = 0;
				bgDiv.innerHTML = rem + " / " + this.structures[i].integrity;
				wrap.appendChild(bgDiv);

			var lowerDiv = document.createElement("div");
				lowerDiv.className = "integrityNow"; lowerDiv.style.top = 0; lowerDiv.style.height = "100%";
				lowerDiv.style.width = rem/this.structures[i].integrity * 100 + "%";
				wrap.appendChild(lowerDiv);
				
			var upperDiv = document.createElement("div");
				upperDiv.className = "integrityFull"; upperDiv.style.top = 0;
				wrap.appendChild(upperDiv);

			fighterDiv.appendChild(wrap);

			if (active){
				var s = 20;
				// FIGHTER WEAPONS
				for (var j = 0; j < this.structures[i].systems.length; j++){
					var td = this.structures[i].systems[j].getTableData(true);
						$(td.childNodes[0]).attr("width", s).attr("height", s);
						fighterDiv.appendChild(td);
						$(td)
							.addClass("fighter")
							.css("top", -h -s - 5)
							.css("left", w/2 - s/2 +1 )
							.data("shipId", this.id)
							.click(function(e){
								e.stopPropagation();
								game.getUnitById($(this).data("shipId")).getSystemById($(this).data("systemId")).select(e)
							})
							.contextmenu(function(e){
								e.stopPropagation();
								e.preventDefault();
								game.getUnitById($(this).data("shipId")).selectAll(e, $(this).data("systemId"));
							});

					if (active){					
						$(td).hover(function(e){
							e.stopPropagation();
							$("#systemDetailsDiv").remove();
							game.getUnitById($(this).data("shipId")).getSystemById($(this).data("systemId")).hover(e)
						})
					}
				}
			}
		}


		var height = 0;
		$(structContainer).find(".fighterDiv").each(function(){
			var y = $(this).position().top + $(this).height();
			if (y > height){
				height = y;
			}
		})

		$(structContainer).css("height", height + 20);

		/*var w = $(div).width();
		var h = $(div).height();
		var left = 50;
		if (this.facing < 90 || this.facing > 270){
			left = res.x - w - 50;
		}

		$(div).css("top", 100).css("left", left);
		*/return div;
	}

	this.getAttachment = function(div){
		var color = "red";

		if (this.friendly){color = "green";}
		var attachDiv = $("<div>").addClass("attachDiv")
			.append($("<div>").css("display", "block").addClass("center15 " + color).html("Flight #" + this.id + (" (click to select)")))
			.data("id", this.id)
			.click(function(){
				if (aUnit){
					var ship = game.getUnitById(aUnit);
					if (ship.hasWeaponsSelected()){
						var target = game.getUnitById($(this).data("id"));
						if (ship.userid != target.userid){
							handleFireClick(ship, target);
						}
					} 
					else {
						ship.doUnselect();
						ship.switchDiv();
						game.getUnitById($(this).data("id")).select();
					}
				}
				else game.getUnitById($(this).data("id")).select();
				
			})
			.hover(function(e){
				var vessel = game.getUnitById($(this).data("id"));
					//vessel.doHighlight();
					//game.doGenericHover(vessel)
				if (aUnit && aUnit != vessel.id){
					var	ship = game.getUnitById(aUnit);
					if (ship.salvo){return;}
					if (ship.hasWeaponsSelected()){
						if (ship.id != vessel.id){
							handleWeaponAimEvent(ship, vessel, e);
						}
					} else {
						game.target = 0;
						$("#weaponAimTableWrapper").hide()
					}
				}
			})
			

		for (var j = 0; j < this.structures.length; j++){
			if (this.structures[j].destroyed || this.structures[j].disabled){continue;}
			attachDiv.append($("<div>").append($("<img>").css("width", 34).css("height", 34).attr("src", window.shipImages[this.structures[j].name.toLowerCase() + "l"].src)));
		}

		div.append(attachDiv);
		return div;
	}

	this.selectAllA = function(e, id){
		var s = this.getSystemById(id);
		var w = s.getActiveWeapon();
		var name = w.name;
		var hasFire = s.hasUnresolvedFireOrder();
		if (name == "Hangar"){return;}

		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].systems.length; j++){
				if (! this.structures[i].systems[j].destroyed){
					if (this.structures[i].systems[j].getActiveWeapon().name == name){
						if (this.structures[i].systems[j].weapon && this.structures[i].systems[j].hasUnresolvedFireOrder() == hasFire){
							this.structures[i].systems[j].select(e);
						}
					}
				}
			}
		}
		return;
	}
}

Flight.prototype = Object.create(Mixed.prototype);

Flight.prototype.setTarget = function(){
	var i = this.getCurrentImpulse();
	if (this.mission.type == 1){  // patrol goal
		this.finalStep = {x: this.mission.x, y: this.mission.y};
		d = getDistance(this, this.finalStep);
		if (d < i){
			this.nextStep = this.finalStep;
		} else this.nextStep = getPointInDirection(i, this.facing, this.x, this.y);
	}
	else {
		if (this.mission.type == 2){
			var target = this.getTarget();
			if (target.ship){
				this.finalStep = target.getPlannedPosition();
				var d = getDistance(this, this.finalStep);
				if (d < i){
					this.nextStep = this.finalStep;
				} else this.nextStep = getPointInDirection(i, getAngleFromTo(this, this.finalStep), this.x, this.y);
			}
			else if (target.flight){
				var i = this.getCurrentImpulse();
				var d;
				if (this.mission.type == 2 || this.mission.type == 3){ // strike intercept goal
					if (target.finalStep == undefined){
						target.setTarget();
					}
					this.finalStep = target.nextStep;
					d = getDistance(this, target.nextStep);
					if (d < i){
						this.nextStep = target.nextStep;
					} else this.nextStep = getPointInDirection(i, getAngleFromTo(this, target.nextStep), this.x, this.y);

					//var vector = new Vector(target, target.nextStep);
					//var speedMod = this.getCurrentImpulse() / target.getCurrentImpulse();
					//this.finalStep = getIntercept(this, target, vector, speedMod);

				}

			}
			else if (target.salvo){
			}
		}
	}

	this.facing = getAngleFromTo(this, this.nextStep);
}

function Fighter(data){
	Single.call(this, data);
	this.fighter = 1;
}
Fighter.prototype = Object.create(Single.prototype);

	

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

Flight.prototype.getArmourString = function(a){
	if (a >= 330 || a <= 30){
		return this.structures[0].negation[0];
	} else if (a > 150 && a < 210){
		return this.structures[0].negation[1];
	} else return this.structures[0].negation[2];
}


Flight.prototype.drawMovePlan = function(){
	Mixed.prototype.drawMovePlan.call(this);
	this.drawMissionArea();
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
	var ele = $("#shortInfo");
	if (game.phase > -2 && this.userid == game.userid){
		$(ele).attr("class", "friendly");
	} else $(ele).attr("class", "hostile");

	var baseHit = this.getBaseHitChance();
	var impulse = this.getCurrentImpulse();
	
	var table = document.createElement("table");
		table.insertRow(-1).insertCell(-1).innerHTML = "Flight #" + this.id;
		table.insertRow(-1).insertCell(-1).innerHTML =  "Thrust: " + this.getCurrentImpulse();
		table.insertRow(-1).insertCell(-1).innerHTML =this.getStringHitChance();
	
	if (!this.mission.arrived && game.phase < 1 && this.inRange()){
		table.insertRow(-1).insertCell(-1).innerHTML = "<span class='red'>ARRIVAL IMMINENT</span>";
	}

	return table;
}

Flight.prototype.getTargetPosition = function(){
	return Salvo.prototype.getTargetPosition.call(this);
}

Flight.prototype.inRange = function(){
	return Salvo.prototype.inRange.call(this);
}

Flight.prototype.getTarget = function(){
	return game.getUnitById(this.mission.targetid);	
}

Flight.prototype.setPreMoveSize = function(){
	this.size = this.baseSize + this.unitSize * this.structures.length-1;
}

Flight.prototype.setPostMoveSize = function(){
	if (this.mission.arrived){
		if (this.mission.type == 2 || this.mission.type == 3){
			var s = game.getUnitById(this.mission.targetid).size;
			this.size = s+30;
		}
		else if (this.mission.type == 1){
			this.size = 1.5*(this.baseSize + this.unitSize * this.structures.length-1);
		}
	}
	else this.size = this.baseSize + this.unitSize * this.structures.length-1;

}



Flight.prototype.setRawImage = function(){
	this.img = window.shipImages[this.structures[0].name.toLowerCase() + "l"];
	this.smallImg = window.shipImages[this.structures[0].name.toLowerCase()];
}