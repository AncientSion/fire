

window.preload();
$(window).on("load", function() {
	init();
});

function init(){
	$("#mouseCanvas").mousemove(canvasMouseMove);
	$("#mouseCanvas").bind('wheel', mouseCanvasZoom);
	$("#mouseCanvas").contextmenu(mouseCanvasScroll);

	$("#mouseCanvas").mousedown(handleMouseDown);
	$("#mouseCanvas").mousemove(function(e){handleMouseMove(e);});
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

	/*
	$("#game").append($("<canvas>").addClass("cache"));
	$(".cache").attr("id", "cache").drag();
	var ca = $("#cache")[0];
	cache = $(".cache")[0].getContext("2d");
	ca.width = 100; ca.height = 100;
	ca.style.width = 100; ca.style.height = 100;
	*/

	console.time("time");
	game = new Game(gd.id, gd.name, gd.status, userid, gd.turn, gd.phase);
	for (var i = 0; i < window.playerstatus.length; i++){
		if (userid == window.playerstatus[i].userid){
			game.playerindex = i+1;
			break;
		}
	}
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
		game.draw();
	}	
}

function mouseCanvasScroll(e){
	e.preventDefault();
	if (aUnit){
		game.getUnitById(aUnit).select();
	}
	else {
		return;
		var rect = this.getBoundingClientRect();
		var pos = new Point(e.clientX - offset.x, e.clientY - offset.y);
		cam.setFocus(pos.x - cam.o.x, pos.y - cam.o.y);
		game.redraw();
	}
}

function canvasMouseMove(e){
	e.preventDefault();
	e.stopPropagation();

	window.iterator++;
	if (window.iterator != 3){
		return;
	}
	window.iterator = 0;

	var pos = new Point(e.clientX - offset.x, e.clientY - offset.y).getOffset();
	//$("#currentPos").html(pos.x + " / " + pos.y + "____" + cam.o.x + " / " + cam.o.y+ "___" + (pos.x-cam.o.x) + " / " + (pos.y-cam.o.y));

	if (!game.deploying){
		var ammo = game.hasAmmoOnPos(pos);
		var ships = game.hasShipOnPos(pos);
		if (ammo){
			game.unitHover(ammo);
		}
		else if (ships){
			game.unitHover(ships);
		}
		else if (game.shortInfo){		
			game.resetHover();
		}
	}
	 
	if (aUnit){
		var angle;
		var ship = game.getUnitById(aUnit);
		if (!ship){return;}
		var shipLoc = ship.getPlannedPosition();
		var facing = ship.getPlannedFacingToMove();

		if (game.vector){
			var dist = Math.floor(getDistance(shipLoc, pos));
			var a = getAngleFromTo(shipLoc, pos);
				a = addAngle(facing, a);
			drawVector(shipLoc, {x: e.clientX - offset.x, y: e.clientY - offset.y}, dist, a);
		}

		if (ship.salvo){return}

		if (ship.canSetSensor()){
			sensorEvent(false, ship, shipLoc, facing, Math.floor(getDistance(shipLoc, pos)), addAngle(facing, getAngleFromTo(shipLoc, pos)));
			return;
		}
		if (ship.hasWeaponsSelected()){
			var baseHit;
			var lock = false;
			var dist;
			var valid = false;
			var targetData = $("#game").find("#weaponAimTableWrapper").find("#targetInfo").find("#targetData");
			var weaponInfo = $("#game").find("#weaponAimTableWrapper").find("#weaponInfo");
			var vessel;

			if (ammo){vessel = ammo[0];}
			else if (ships){vessel = ships[0]}
			else{vessel = false;}

			if (vessel){
				if (vessel.userid != ship.userid){
					if (vessel instanceof Salvo){ // aiming at SALVO
						if (game.phase <= 2){
							if (vessel.targetid == ship.id){ // direct interception
								dist = Math.max(ship.size/2, Math.floor(getDistance(shipLoc, vessel.getBaseOffsetPos()) - vessel.getTotalImpulse()));
							}
							else if (ship.flight){// indirect interception
								dist = Math.abs(Math.floor(getDistance(shipLoc, vessel)));
							}
						} 
						else dist = Math.floor(getDistance(shipLoc, vessel.getBaseOffsetPos()));
					}
					else {
						dist = Math.floor(getDistance(shipLoc, vessel.getBaseOffsetPos()));
					}
					angle = getAngleFromTo(vessel.getBaseOffsetPos(), shipLoc);
					angle = addAngle(vessel.getPlannedFacingToMove(), angle);

					lock = ship.hasLockOnUnit(vessel);
					baseHit = vessel.getHitChanceFromAngle(angle);
					baseHit *= 1+(lock*0.5);

					targetData
						.empty()
						.append($("<td>").html(vessel.name + " #" + vessel.id))
						.append($("<td>").html(game.getUnitType(vessel.traverse)))
						.append($("<td>").html(ship.getLockString(lock)))
						.append($("<td>").html(Math.floor(baseHit) + "%"))
						.append($("<td>").html(dist))
				}
				else return;
			}
			else {
				dist = Math.floor(getDistance(shipLoc, pos));

				targetData
					.empty()
					.append($("<td>").html(""))
					.append($("<td>").html(""))
					.append($("<td>").html(""))
					.append($("<td>").html(""))
					.append($("<td>").html(dist))
				
			}

			weaponInfo.children().children().each(function(i){
				if (i >= 1){
					$(this).remove();
				}
			})

			var validWeapon = false;

			if (vessel){pos = vessel.getBaseOffsetPos();}
				
			for (var i = 0; i < ship.structures.length; i++){
				for (var j = 0; j < ship.structures[i].systems.length; j++){
					if (ship.structures[i].systems[j].weapon && ship.structures[i].systems[j].selected){
						var system = ship.structures[i].systems[j].getSystem();
						var inArc = false;
						var legalTarget = true;
						var msg = "";

						var row = $("<tr>");
							row.append($("<td>").html(system.display + " #" + system.id))

						if (ship.ship && vessel.salvo && !(system instanceof Launcher) && ship.id != vessel.targetid){ // ship vs salvo indirect
							legalTarget = false;
							msg = "Unable to aquire target";
						}
						else if (ship.flight && vessel.salvo){ // fighter vs salvo, get trajectory
							var start = true;
							var end = true;
							if (!system.posIsOnArc(shipLoc, pos, facing)){start = false;}
							if (ship.id == vessel.targetid){if(!isInArc(angle, system.arc[0][0], system.arc[0][1])){end = false;}}
							//else if (!system.posIsOnArc(shipLoc, vessel.nextStep, facing)){end = false;}
							else if (!system.posIsOnArc(shipLoc, vessel, facing)){end = false;}
							if (!start || !end){
								msg = "Ballistic trajectory out of scope.";
							} else {
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
							system.getAimData(vessel, baseHit, dist, row);
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
			$(ele).css("top", top).css("left", left);

			//if (validWeapon){
				$(ele).show();
			//}
			//else {
			//	$(ele).hide();
			//}
		}
		else if (game.flightDeploy){					
			var ele = $("#deployOverlay");
			var w = $(ele).width()/2;
			var top = (e.clientY) + 40;
			var left = (e.clientX) - w;
			$(ele).css("top", top).css("left", left).show();
		}
	}
	else if (game.deploying){					
		var ele = $("#deployOverlay");
		var w = $(ele).width()/2;
		var top = (e.clientY)  + 40;
		var left = (e.clientX) - w;
		$(ele).css("top", top).css("left", left).show();
	}
	else if (!game.deploying){
		$("#deployOverlay").hide();
	}
}

function sensorize(ship, pos){
	var facing = ship.getPlannedFacingToMove();
	var shipLoc = ship.getPlannedPosition();
	var a = addAngle(facing, getAngleFromTo(shipLoc, pos));
	sensorEvent(true, ship, shipLoc, facing, Math.floor(getDistance(shipLoc, pos)), a);
}

function deployPhase(e){
	var pos = new Point(e.clientX - offset.x, e.clientY - offset.y).getOffset();
	var ship;
	var ammo;
	var index;
	if (game.deploying){ // ship deploy
		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].id == game.deploying){
				var index = i;
				break;
			}
		}
		if (game.ships[index].hasSystemSelected("Sensor")){
			sensorize(game.ships[index], pos);
			return;
		}
		else if (game.ships[index].canDeployHere(pos)){
			game.ships[index].doDeploy(pos);
		}
	}
	else if (game.flightDeploy){ // deploy via hangar
		if (game.getUnitById(aUnit).canDeployFlightHere(pos)){
			game.doDeployFlight(e, pos);
		}
		else {
			$("#instructWrapper").hide();
			popup("Flight can not be deployed there");
		}
	}
	else if (!game.deploying){
		if (aUnit){
			if (game.getUnitById(aUnit).hasSystemSelected("Sensor")){
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
				if (ship.actions[0].turn == game.turn && !ship.flight){
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
		if (game.getShipByClick(pos) == ship){
			ship.select();
			return;
		}
		else if (ship.flight && game.phase == 0 || ship.ship && game.phase == 1){
			return;
		}
		else {
			if (game.mode == 1){ //no active weapon but ship active -> MOVE MODE
				if (checkIfOnMovementArc(ship, pos)){ //check if clicked to move in movement arc
					if (! game.posIsOccupied(ship, pos)){
						var dist = Math.floor(getDistance(ship.getOffsetPos(), pos));
						if (dist < ship.getRemainingImpulse()){
							ship.issueMove(pos, dist);
							return;
						}
					}
					else {
						console.log("occupied");
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
				if (ship.hasWeaponsSelected()){
					var shipLoc = ship.getOffsetPos();
					var facing = ship.getPlannedFacingToMove();
					var pos = vessel.getBaseOffsetPos();
					for (var i = 0; i < ship.structures.length; i++){
						for (var j = ship.structures[i].systems.length-1; j >= 0; j--){
							if (ship.structures[i].systems[j].selected && ship.structures[i].systems[j].weapon){
								if (ship.structures[i].systems[j].canFire()){
									var inArc = false;
									var legalTarget = true;
									
									if (ship.ship && vessel.salvo && !(ship.structures[i].systems[j] instanceof Launcher) && ship.id != vessel.targetid){ // ship vs salvo indirect
										legalTarget = false;
									}
									else if (ship.flight && vessel.salvo){ // fighter vs salvo, get trajectory
										/*var start = true;
										var end = true;
										if (!ship.structures[i].systems[j].posIsOnArc(shipLoc, pos, facing)){start = false;}
										if (ship.id == vessel.targetid){if(!isInArc(angle, ship.structures[i].systems[j].arc[0][0], ship.structures[i].systems[j].arc[0][1])){end = false;}}
										else if (!ship.structures[i].systems[j].posIsOnArc(shipLoc, vessel.nextStep, facing)){end = false;}
										if (start && end){
											inArc = true;
											validWeapon = true;
										}*/
										if (ship.structures[i].systems[j].posIsOnArc(shipLoc, pos, facing)){
											inArc = true;
											validWeapon = true;	
										}
									}
									else if (ship.structures[i].systems[j].posIsOnArc(shipLoc, pos, facing)){ // ship vs ship/fighter
										inArc = true;
										validWeapon = true;	
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
		}
	}
}

function dmgPhase(e){
	var pos = new Point(e.clientX - offset.x, e.clientY - offset.y).getOffset();
	var ship;
	var index;
	if (aUnit){
		ship = game.getUnitById(aUnit);
		if (game.getShipByClick(pos) == ship){
			ship.select();
			return;
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

function checkIfOnMovementArc(unit, target){
	var targetCompassHeading = getCompassHeadingOfPoint(unit.getOffsetPos(), target, unit.getPlannedFacingToMove());
	if (isInArc(targetCompassHeading, unit.validMoveArcs.start, unit.validMoveArcs.end)){
		return true;
	}
	
	return false;
}

function clickedOn(click, btn){
	if (click.x < btn.clickX + 10 && click.x > btn.clickX - 10){
		if (click.y > btn.clickY - 10 && click.y < btn.clickY + 10){
			return true;
		}
	}
	
	return false;
}