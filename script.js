window.preload();
$(window).on("load", function() {
	init();
});

function init(){
	$("#mouseCanvas").mousemove(canvasMouseMove);
	$("#mouseCanvas").bind('wheel', mouseCanvasZoom);
	$("#mouseCanvas").contextmenu(function(e){e.preventDefault(); e.stopPropagation();});

	$("#mouseCanvas").mousedown(handleMouseDown);
	$("#mouseCanvas").mouseup(function(e){handleMouseUp(e);});
	$("#mouseCanvas").mouseout(function(e){handleMouseOut(e);});

	//reOffset();
	//window.onscroll=function(e){ reOffset(); }
	//window.onresize=function(e){ reOffset(); }


	//$(document).contextmenu(function(e){e.stopPropagation(); e.preventDefault(); });
	$(document).mousedown(function(e){e.stopPropagation(); e.preventDefault(); });

	var canv = document.getElementsByTagName("canvas");
	

	for (var i = 0; i < canv.length; i++){
		canv[i].width = res.x;
		canv[i].height = res.y;
		canv[i].style.width = res.x;
		canv[i].style.height = res.y;
		canv[i].style.zIndex = i+1;
		canv[i].style.position = "absolute";
	}

	$("#phaseSwitchDiv").css("width", res.x).css("height", res.y);
	
	canvas = canv[0];
	ctx = canvas.getContext("2d");

	fxCanvas = canv[1];
	fxCtx = fxCanvas.getContext("2d");
	
	planCanvas = canv[2];
	planCtx = planCanvas.getContext("2d");

	moveCanvas = canv[3];
	moveCtx = moveCanvas.getContext("2d");

	salvoCanvas = canv[4];
	salvoCtx = salvoCanvas.getContext("2d");	

	mouseCanvas = canv[5];
	mouseCtx = mouseCanvas.getContext("2d");

	drawCanvas = canv[6];
	drawCanvas.style.zIndex = 0;
	drawCtx = drawCanvas.getContext("2d");


	/*
	$("#game").append($("<canvas>").addClass("cache"));
	$(".cache").attr("id", "cache").drag();
	var ca = $("#cache")[0];
	cache = $(".cache")[0].getContext("2d");
	ca.width = 100; ca.height = 100;
	ca.style.width = 100; ca.style.height = 100;
	*/

	console.time("time");
	turn = new Turn();
	game = new Game(game, userid);
	game.create();

	console.timeEnd("time");
}

function executeAll(){
	if (game){
		game.executeAll();
	}
}

function mouseCanvasZoom(e){
	e.preventDefault();		
	var pos = new Point(e.clientX - offset.x, e.clientY - offset.y);
	if (game){
		cam.adjustZoom(e, pos);
		//game.draw();
	}	
}

function mouseCanvasScroll(e){
	e.preventDefault();return;
	if (aUnit && game.turnMode){
		game.getUnitById(aUnit).switchTurnMode();
	} else if (aUnit){
		game.getUnitById(aUnit).doUnselect();
	} else {
		return;
		var rect = this.getBoundingClientRect();
		var pos = new Point(e.clientX - offset.x, e.clientY - offset.y);
		cam.setFocus(pos.x - cam.o.x, pos.y - cam.o.y);
		game.redraw();
	}
}

function handleWeaponAimEvent(ship, vessel, e, pos){

	if (ship.userid == vessel.userid){
		$("#game").find("#weaponAimTableWrapper").hide();
		return;
	}

	var shipLoc = ship.getPlannedPosition();
	var facing = ship.getPlannedFacing();					
	var targetData1 = $("#game").find("#weaponAimTableWrapper").find("#targetInfo").find("#targetData1");
	var targetData2 = $("#game").find("#weaponAimTableWrapper").find("#targetInfo").find("#targetData2");
	var weaponInfo = $("#game").find("#weaponAimTableWrapper").find("#weaponInfo");
	var dist;

	if (vessel){
		var multi = 1;
		if (vessel.userid != ship.userid){
			if (game.target == vessel.id){
				console.log("breaking");
				//return;
			}
			else {
				game.target = vessel.id;
				//console.log("setting");
			}

			var baseHit;
			var impulse;
			var impulseString = "";
			var lock;
			var lockString = "";// = "<span class ='red'>0.0</span>";
			var mask;
			var maskString = "";// = "<span class ='green'>0.0</span>";
			var final;
			var valid = false;
			var targetData = $("#game").find("#weaponAimTableWrapper").find("#targetInfo").find("#targetData");
			var vessel;
			var dogFight = false;
			var section;

			if (ship.flight && vessel.flight && ship.isDogfighting(vessel.id)){
				dogFight = true;
			}

			if (vessel.salvo){ // aiming at SALVO
				if (game.phase <= 2){
					if (vessel.targetid == ship.id){// direct interception
						dist = Math.max(ship.size/2, Math.floor(getDistance(shipLoc, vessel.nextStep)));
					}
					else if (ship.flight){// indirect interception
						dist = Math.abs(Math.floor(getDistance(shipLoc, vessel)));
					}
				}
			}
			if (!dist){
				dist = Math.floor(getDistance(shipLoc, vessel.getPlannedPosition()));
			}

			//angle = getAngleFromTo(vessel.getBaseOffsetPos(), shipLoc);
			//angle = addAngle(vessel.getPlannedFacing(), angle);
			angle = getAngleFromTo(vessel.getPlannedPosition(), shipLoc);
			angle = addAngle(vessel.getPlannedFacing(), angle);
			baseHit = vessel.getHitChanceFromAngle(angle);
			impulse = 1 - vessel.getImpulseMod();
			lock = ship.getOffensiveBonus(vessel);
			mask = vessel.getDefensiveBonus(ship);
			//section = vessel.getHitSectionFromAngle(angle);

			//console.log("armour: "+section.remainingNegation + " / " + section.negation);


			if (dogFight){
				baseHit *= 2;
				dist = 0;
			}

			if (lock){
				multi += lock;
				lockString = "<span class ='green'>+" + lock + "</span>";
			}
			if (mask){
				multi -= mask;
				maskString = "<span class ='red'>-" + mask + "</span>";
			}
			if (impulse){
				multi += impulse / 2;
				if (impulse/2 < 0){
					impulseString = "<span class ='red'>";
				} else impulseString = "<span class ='green'>";
				impulseString += round(impulse/2) + "</span>";
			}



			final = Math.floor(baseHit * multi);
			targetData1
				.empty()
				.append($("<td>").html(vessel.name + " #" + vessel.id))
				.append($("<td>").html(game.getUnitType(vessel.traverse) + " (" + vessel.traverse + ")"))
				.append($("<td>").html(vessel.getArmourString(angle)))
				.append($("<td>").html(""))
				.append($("<td>").html(dist));

			targetData2
				.empty()
				.append($("<td>").html(baseHit + "%"))
				.append($("<td>").html(impulseString))
				.append($("<td>").html(lockString))
				.append($("<td>").html(maskString))
				.append($("<td>").addClass("final").html(final + "%"));
		}
	}
	else {
		game.target = 0;
		dist = Math.round(getDistance(ship.getPlannedPosition(), pos));
		targetData1
		.empty()
		.append($("<td>").html(""))
		.append($("<td>").html(""))
		.append($("<td>").html(""))
		.append($("<td>").html(""))
		.append($("<td>").html(dist));

		targetData2
		.empty()
		.append($("<td>").html(""))
		.append($("<td>").html(""))
		.append($("<td>").html(""))
		.append($("<td>").html(""))
		.append($("<td>").html(""));
	}

	weaponInfo.children().children().each(function(i){
		if (i >= 1){
			$(this).remove();
		}
	})

	var validWeapon = false;

	if (vessel){pos = vessel.getPlannedPosition();}
		
	for (var i = 0; i < ship.structures.length; i++){
		for (var j = 0; j < ship.structures[i].systems.length; j++){
			if (ship.structures[i].systems[j].weapon && ship.structures[i].systems[j].selected){
				var system = ship.structures[i].systems[j].getSystem();
				var inArc = false;
				var legalTarget = true;
				var msg = "";

				var row = $("<tr>");
					row.append($("<td>").html(system.display + " #" + ship.structures[i].systems[j].id))

				if (ship.flight && vessel.flight && ship.isDogfighting(vessel.id)){
					legalTarget = true;
					inArc = true;
				}
				else if (ship.ship && vessel.salvo){
					if (ship.id != vessel.targetid && !(system instanceof Launcher)){ // ship vs salvo indirect
						legalTarget = false;
						msg = "Unable to aquire target (trajectory)";
					}
					else if (ship.id == vessel.targetid && getDistance(ship.getPlannedPosition(), vessel) <= ship.size/2){
						legalTarget = false;
						msg = "Unable to aquire target (reaction time)";
					} 
					else if (system.posIsOnArc(shipLoc, pos, facing)){ // ship vs ship/fighter
						inArc = true;
						validWeapon = true;
					}
				}
				else if (system.posIsOnArc(shipLoc, pos, facing)){ // ship vs ship/fighter
					inArc = true;
					validWeapon = true;
				}
				else msg = "Not in weapon arc";

				if (inArc && legalTarget){
					system.getAimData(vessel, final, dist, row);
				}
				else {
					$(row).append($("<td>").html(msg).attr("colspan", 4))
				}

				weaponInfo.append(row);
			}
		}
	}
				
	var ele = $("#weaponAimTableWrapper");
	var w = $(ele).width()/2;
	var top = (e.clientY) + 100;
	var left = (e.clientX) - w;
	$(ele).css("top", top).css("left", left).show();
}

function canvasMouseMove(e){
	e.preventDefault();
	e.stopPropagation();

	window.iterator++;
	if (window.iterator < 3){
		return;
	}
	window.iterator = 0;

	if (cam.scroll){
		// get the current mouse position
		var mouseX = e.clientX;
		var mouseY = e.clientY;
		// dx & dy are the distance the mouse has moved since
		// the last mousemove event
		var dx = mouseX- cam.sx;
		var dy = mouseY- cam.sy;

		if (dx != 0 || dy != 0){
			// reset the vars for next mousemove
			cam.sx = mouseX;
			cam.sy = mouseY;

			// accumulate the net panning done
			cam.o.x += dx;
			cam.o.y += dy;
			//console.log(dx, dy);
			game.redraw();
		}
	}

	var pos = new Point(e.clientX - offset.x, e.clientY - offset.y).getOffset();
	//$("#currentPos").html(pos.x + " / " + pos.y + "____" + cam.o.x + " / " + cam.o.y+ "___" + (pos.x-cam.o.x) + " / " + (pos.y-cam.o.y));
	var unit = game.getUnitByClick(pos);
	if (unit){
		game.unitHover(unit);
	} else if (game.shortInfo){
		game.resetHover()
	}

	if (game.flightDeploy){
		game.handleFlightDeployMove(e, pos, unit)
	}
	 
	if (aUnit){
		var ship = game.getUnitById(aUnit);
		if (!ship){return;}
		var shipLoc;
		var facing;

		if (game.vector){
				shipLoc = ship.getPlannedPosition();
				facing = ship.getPlannedFacing();
			var dist = Math.floor(getDistance(shipLoc, pos));
			var a = getAngleFromTo(shipLoc, pos);
				a = addAngle(facing, a);
			drawVector(shipLoc, {x: e.clientX - offset.x, y: e.clientY - offset.y}, dist, a);
		}

		if (ship.salvo){return}
		else if (game.sensorMode){
			shipLoc = ship.getPlannedPosition();
			facing = ship.getPlannedFacing();
			sensorEvent(false, ship, shipLoc, facing, Math.floor(getDistance(shipLoc, pos)), addAngle(facing, getAngleFromTo(shipLoc, pos)));
			return;
		}
		else if (game.turnMode){
			shipLoc = ship.getPlannedPosition();
			facing = ship.getPlannedFacing();
			ship.handleTurning(e, shipLoc, facing, pos);
		}
		else if (ship.hasWeaponsSelected()){
			handleWeaponAimEvent(ship, unit, e, pos);
		}
	}
	else if (game.deploying){					
		var ele = $("#deployOverlay");
		var w = $(ele).width()/2;
		var top = (e.clientY)  + 40;
		var left = (e.clientX) - w;
		$(ele).css("top", top).css("left", left).show();
		game.getDeployingUnit().drawDeploymentPreview(pos);
	}
	else if (!game.deploying){
		$("#deployOverlay").hide();
	}
}

function sensorize(ship, pos){
	var facing = ship.getPlannedFacing();
	var shipLoc = ship.getPlannedPosition();
	var a = addAngle(facing, getAngleFromTo(shipLoc, pos));
	sensorEvent(true, ship, shipLoc, facing, Math.floor(getDistance(shipLoc, pos)), a);
}

function deployPhase(e){
	var pos = new Point(e.clientX - offset.x, e.clientY - offset.y).getOffset();
	var ship;
	var ammo;
	var index;
	if (game.deploying){
		ship = game.getUnitById(game.deploying); // ship deploy
		if (game.turnMode){
			ship.handleTurnAttempt(pos);
		}
		else if (ship.canDeployHere(pos)){
			game.doDeployShip(e, ship, pos);
		}
	}
	else if (game.flightDeploy){ // deploy via hangar
		game.doDeployFlight(pos);
	}
	else if (!game.deploying){
		if (aUnit){
			if (game.sensorMode){
				sensorize(game.getUnitById(aUnit), pos);
				return;
			}
			firePhase(e);
		}
		else {
			ammo = game.getAmmoByClick(pos);
			if (ammo){
				$(".ammoDiv").addClass("disabled");
				ammo.select();
				return;
			}
			ship = game.getShipByClick(pos);
			if (ship){
				ship.select(e); 
				if (ship.canDeploy()){
					game.enableDeployment(ship.id);
				}
			}
		}
	}
}

function movePhase(e){	
	var pos = new Point(e.clientX - offset.x, e.clientY - offset.y).getOffset();
	var ship;
	var index;
	if (aUnit){
		ship = game.getUnitById(aUnit);
		if (ship.flight && game.phase == 0 || ship.ship && game.phase == 1){
			return;
		}
		else {
			if (game.mode == 1){ //no active weapon but ship active -> MOVE MODE
				if (game.turnMode){
					ship.handleTurnAttempt(pos);
				}
				else if (isInArc(getCompassHeadingOfPoint(ship.getPlannedPosition(), pos, 0), ship.moveAngles.start, ship.moveAngles.end)){ //check if clicked to move in movement arc
					var dist = Math.floor(getDistance(ship.getPlannedPosition(), pos));
					if (dist < ship.getRemainingImpulse()){
						ship.issueMove(pos, dist);
					}
				}
			}
		}
	}
	else {
		ammo = game.getAmmoByClick(pos);
		if (ammo){
			ammo.select(e);
			return
		}
		ship = game.getShipByClick(pos);	
		if (ship){
			ship.select(e);
			return
		}
	}
}

window.getBearing = function(shooter, target){
	var tStart = target.getTurnStartPosition();
	var tEnd = target.getTurnfinalStepition();
	var tFaceStart = tStart.a;
	var tFaceEnd = target.facing;
	var tFacePro = tFaceEnd - tFaceStart;

	var startBearing = getAngleFromTo(shooter.getTurnfinalStepition(), tStart)
	var endBearing = getAngleFromTo(shooter.getTurnfinalStepition(), tEnd)
	var aDif = endBearing - startBearing;

	return;
}

function firePhase(e){
	var pos = new Point(e.clientX - offset.x, e.clientY - offset.y).getOffset();
	var ship;
	var index;
	var vessel;

	if (! aUnit){
		ship = game.getUnitByClick(pos);
		if (ship){ship.select();}
	}
	else {
		vessel = game.getUnitByClick(pos);
		ship = game.getUnitById(aUnit)
		if (vessel){
			if (vessel.id != ship.id && (vessel.userid != game.userid && vessel.userid != ship.userid)){
				handleFireClick(ship, vessel);
			} else vessel.switchDiv();
		}
	}
}

function dmgPhase(e){
	var pos = new Point(e.clientX - offset.x, e.clientY - offset.y).getOffset();
	var ship;
	var index;
	if (aUnit){
		ship = game.getUnitById(aUnit);
		var clickShip = game.getShipByClick(pos);
		if (ship == clickShip){
			ship.select();
		} else if (clickShip){
			clickShip.switchDiv();
		}
	}
	else {
		ammo = game.getAmmoByClick(pos);
		ship = game.getShipByClick(pos);		
		if (ammo){
			ammo.select(e);
		}
		else if (ship){
			ship.select(e);
		}
	}
}

function canvasMouseClick(e){
	//var rect = this.getBoundingClientRect();
	//var pos = new Point(e.clientX - rect.left, e.clientY - rect.top);
	var gamepos = new Point(e.clientX - offset.x, e.clientY - offset.y).getOffset();
	//console.log("canvas pos " + pos.x + " / " + pos.y);
	console.log("game pos " + gamepos.x	+ " / " + gamepos.y);
	
	switch (game.phase){
		case -1:
			deployPhase(e); break;
		case 0: 
			movePhase(e); break;
		case 1: 
			movePhase(e); break;
		case 2: 
			firePhase(e); break;
		case 3: 
			dmgPhase(e); break;
	}
}

function handleFireClick(ship, vessel){
	if (vessel){
		if (vessel.id != ship.id && (vessel.userid != game.userid && vessel.userid != ship.userid)){
			if (ship.hasWeaponsSelected()){
				var shipLoc = ship.getPlannedPosition();
				var facing = ship.getPlannedFacing();
				var pos = vessel.getBaseOffsetPos();
				for (var i = 0; i < ship.structures.length; i++){
					for (var j = ship.structures[i].systems.length-1; j >= 0; j--){
						if (ship.structures[i].systems[j].selected && ship.structures[i].systems[j].weapon){
							if (ship.structures[i].systems[j].canFire()){
								var inArc = false;
								var validWeapon = false;

								if (ship.ship || ship.flight){
									if (vessel.ship || vessel.flight){
										validWeapon = true;
									}
								}

								if (!validWeapon){
									if (ship.flight && vessel.flight && ship.isDogfighting(vessel.id)){
										inArc = true;
										validWeapon = true;
									}
									else if (ship.ship && vessel.salvo){
										if (ship.id == vessel.targetid && getDistance(ship.getPlannedPosition(), vessel) >= ship.size/2){
											validWeapon = true;
										}
									}
									else if (ship.flight && vessel.salvo){ // fighter vs salvo
											validWeapon = true;
									}
								}

								if (validWeapon && !inArc){
									if (ship.flight && vessel.flight && ship.isDogfighting(vessel.id)){
										inArc = true;
									}
									else if (ship.structures[i].systems[j].posIsOnArc(shipLoc, pos, facing)){ // ship vs ship/fighter
										inArc = true;
									}
								}

								if (inArc && validWeapon){
									// FireOrder(id, turn, shooterid, targetid, weaponid, req, notes, hits, resolved){
									ship.structures[i].systems[j].setFireOrder(vessel.id);
								}
							}
						}
					}
				}
			}

			$("#weaponAimTableWrapper").hide()
			ship.highlightAllSelectedWeapons();
			//game.draw();
		}
		else vessel.switchDiv();
	}
}

function checkWeaponHighlight(ele, weaponid){
	if (ele.className == "weapon"){
		for (var i = 0; i < game.ships.length; i++){
			for (var j = 0; j < game.ships[i].weapons.length; j++){
				if (game.ships[i].weapons[j].id == weaponid){
					game.ships[i].weaponHighlight(game.ships[i].weapons[j]);
					return;
				}
			}
		}
	}
}