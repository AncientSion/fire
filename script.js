graphics.preload();
$(window).on("load", function() {
	init();
});

function init(){
	console.time("time");
	window.res.x = window.innerWidth-1;
	window.res.y = window.innerHeight-1;

	$("#mouseCanvas").mousemove(canvasMouseMove);
	$("#mouseCanvas").bind('wheel', mouseCanvasZoom);
	$("#mouseCanvas").contextmenu(function(e){e.preventDefault(); e.stopPropagation();});

	$("#mouseCanvas").mousedown(handleMouseDown);
	$("#mouseCanvas").mouseup(function(e){handleMouseUp(e);});
	$("#mouseCanvas").mouseout(function(e){handleMouseOut(e);});

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
	var h = $("#phaseSwitchInnerDiv").height();
	var w = $("#phaseSwitchInnerDiv").width();
	$("#phaseSwitchInnerDiv").css("top", res.y/2 - h).css("left", res.x/2 - w/2).removeClass("disabled");


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

	showUI();
	window.initChat();
	
	window.initiateKeyDowns();

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
		game.getUnit(aUnit).switchTurnMode();
	} else if (aUnit){
		game.getUnit(aUnit).doUnselect();
	} else {
		return;
		var rect = this.getBoundingClientRect();
		var pos = new Point(e.clientX - offset.x, e.clientY - offset.y);
		cam.setFocus(pos.x - cam.o.x, pos.y - cam.o.y);
		game.redraw();
	}
}

function handleWeaponAimEvent(shooter, target, e, pos){

	if (shooter.userid == target.userid){
		$("#weaponAimTableWrapper").hide();
		return;
	}
	//else if (shooter.flight && !game.isCloseCombat(shooter, target)){
	//	return;
	//}

	var shooterLoc = shooter.getPlannedPos();
	var facing = shooter.getPlannedFacing();					
	var targetData1 = $("#weaponAimTableWrapper").find("#targetInfo").find("#targetData1");
	var targetData2 = $("#weaponAimTableWrapper").find("#targetInfo").find("#targetData2");
	var weaponInfo = $("#weaponAimTableWrapper").find("#weaponInfo");
	var dist;
	var drop = 0;
	var cc = game.isCloseCombat(shooter, target);
	var pos;

	if (shooter.flight){
		drop = 0;
		if (target && !cc){
			drop = 1;
		} else if (!target){
			drop = 1;
		}
	}

	if (target && !drop){
		var multi = 1;
		if (target.userid != shooter.userid){
			if (game.target == target.id){
				//console.log("breaking");
				return;
			}
			else {
				game.target = target.id;
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
			var target;
			var section;
			var angle;

			//dist = Math.max(50, game.getFireDistance(shooter, target));
			dist = game.getFireDistance(shooter, target);
			if (shooter.ship || shooter.squad){
				if (target.salvo){
					angle = getAngleFromTo(target.getTrajectory(), shooterLoc);
					angle = addAngle(-shooter.getPlannedFacing(), angle);
				}
				else {
					angle = getAngleFromTo(target.getPlannedPos(), shooterLoc);
					angle = addAngle(target.getPlannedFacing(), angle);
				}
			} else angle = range(0, 359);
			
			baseHit = target.getAngledHitChance(angle);

			impulse = 1 - target.getImpulseMod();
			lock = shooter.getLockEffect(target);
			mask = target.getMaskEffect(shooter);

			if (lock){
				multi += lock;
				lockString = "<span class ='green'>+" + lock + "</span>";
			}
			if (mask){
				multi -= mask;
				maskString = "<span class ='red'>-" + mask + "</span>";
			}
			if (impulse){
				if (shooter.flight){
					impulseString = "<span>Ineffective</span>";
				}
				else {
					multi += impulse / 2;
					if (impulse/2 < 0){
						impulseString = "<span class ='red'>";
					} else impulseString = "<span class ='green'>";
					impulseString += round(impulse/2) + "</span>";
				}
			}

			final = Math.floor(baseHit * multi);
			targetData1
				.empty()
				.append($("<td>").html(target.name + " #" + target.id))
				.append($("<td>").html(game.getUnitType(target.traverse) + " (" + target.traverse + ")"))
				.append($("<td>").html(target.getArmourString(angle)))
				.append($("<td>").html(target.getSectionString(angle)))
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
		if (target){
			pos = target.getPlannedPos();
		}
		dist = Math.round(getDistance(shooter.getPlannedPos(), pos));
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

	if (target){
		if (target.salvo){
			pos = target.getTrajectory();
		} else pos = target.getPlannedPos();
	}
	
	if (!drop){	
		var active = shooter.getSelectedWeapons();

		for (var i = 0; i < active.length; i++){
			var system = active[i].getSystem();
			var inArc = 1;
			var legalTarget = 1;
			var msg = "";

			var row = $("<tr>");
				row.append($("<td>").html(system.getDisplay() + " #" +active[i].id))

			if (shooter.ship || shooter.squad){
				if (cc){
					if (system instanceof Launcher){
						legalTarget = 0;
					}
					else if (target.salvo && !shooter.posIsOnSystemArc(shooterLoc, pos, facing, system)){
						legalTarget = 0;
					}
				}
				else if (!shooter.posIsOnSystemArc(shooterLoc, pos, facing, system)){
					inArc = 0;
				}
			}
			else if (shooter.flight){
				if (!cc){
					legalTarget = 0;
				}
			}



			if (inArc && legalTarget){
				system.getAimData(target, final, dist, row);
				system.validTarget = 1;
			}
			else {
				$(row).append($("<td>").html("Illegal Target").attr("colSpan", 4))
				system.validTarget = 0;
			}

			weaponInfo.append(row);
		}
	}
				
	var ele = $("#weaponAimTableWrapper");
	var w = $(ele).width()/2;
	var top = (e.clientY) + 100;
	var left = (e.clientX) - w;
	$(ele).css("top", top).css("left", left).show();
}

function handleScroll(e){
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

function canvasMouseMove(e){
	e.preventDefault();
	e.stopPropagation();

	window.iterator++;
	if (window.iterator < 2){return;}
	else window.iterator = 0;

	if (cam.scroll){handleScroll(e);}

	var pos = new Point(e.clientX - offset.x, e.clientY - offset.y).getOffset();
	//$("#currentPos").html(pos.x + " / " + pos.y + "____" + cam.o.x + " / " + cam.o.y+ "___" + (pos.x-cam.o.x) + " / " + (pos.y-cam.o.y));
	var unit = game.getUnitByClick(pos);

	if (game.flightDeploy){
		game.handleFlightDeployMouseMove(e, pos, unit)
	}
	else if (game.mission && game.mission.new){
		game.handleFlightDeployMouseMove(e, pos, unit)
	}
	 
	if (aUnit){
		var ship = game.getUnit(aUnit);
		if (!ship){return;}

		var shipLoc = ship.getPlannedPos();
		var	facing = ship.getPlannedFacing();

		if (game.vector){
			var dist = Math.floor(getDistance(shipLoc, pos));
			var a = getAngleFromTo(shipLoc, pos);
				a = addAngle(facing, a);
			drawVector(shipLoc, {x: e.clientX - offset.x, y: e.clientY - offset.y}, dist, a);
		}

		if (ship.salvo){return;}
		else if (game.sensorMode){
			sensorEvent(false, ship, shipLoc, facing, Math.floor(getDistance(shipLoc, pos)), addAngle(facing, getAngleFromTo(shipLoc, pos)));
		}
		else if (game.turnMode){
			ship.handleTurning(e, shipLoc, facing, pos);
		}
		else if (ship.hasWeaponsSelected()){
			handleWeaponAimEvent(ship, unit, e, pos);
		}
	}
	else if (game.deploying){					
		var ele = $("#deployOverlay");
		var w = $(ele).width()/2;
		var top = (e.clientY)  + 80;
		var left = (e.clientX) - w;
		$(ele).css("top", top).css("left", left).show();
		game.getDeployingUnit().drawDeploymentPreview(pos);
	}
	else if (!game.deploying){
		$("#deployOverlay").hide();
	}

	if (unit){game.handleHoverEvent(unit);
	} else if (game.shortInfo){game.resetHover(e, shipLoc, facing, pos);}
}

function sensorize(ship, pos){
	var facing = ship.getPlannedFacing();
	var shipLoc = ship.getPlannedPos();
	var a = addAngle(facing, getAngleFromTo(shipLoc, pos));
	sensorEvent(true, ship, shipLoc, facing, Math.floor(getDistance(shipLoc, pos)), a);
}

function deployPhase(e, pos){
	var unit;
	var ammo;
	var index;
	if (game.deploying){
		unit = game.getUnit(game.deploying); // ship deploy
		if (game.turnMode){
			unit.handleTurnAttempt(pos);
		}
		else if (unit.canDeployHere(pos)){
			game.doDeployShip(e, unit, pos);
		}
	}
	else if (game.flightDeploy){ // deploy via hangar
		game.doDeployFlight(pos);
	}
	else if (game.mission && game.mission.new){
		game.issueMission(pos);
	}
	else if (!game.deploying){
		if (aUnit){
			unit = game.getUnit(aUnit);
			if (unit.canDeploy()){
				game.enableDeployment(unit.id);
				return;
			}
			else if (game.sensorMode){
				sensorize(unit, pos);
				return;
			}
			firePhase(e, pos, unit);
		}
		else {
			unit = game.getUnitByClick(pos);
			if (unit){
				unit.select(e); 
				if (unit.canDeploy()){
					game.enableDeployment(unit.id);
				}
			}
		}
	}
}

function movePhase(e, pos, unit){
	if (unit){
		if (game.mode == 1){ //no active weapon but ship active -> MOVE MODE
			if (game.turnMode){
				unit.handleTurnAttempt(pos);
			}
			else if (isInArc(getCompassHeadingOfPoint(unit.getPlannedPos(), pos, 0), unit.moveAngles.start, unit.moveAngles.end)){ //check if clicked to move in movement arc
				var dist = Math.floor(getDistance(unit.getPlannedPos(), pos));
				if (dist < unit.getRemainingImpulse()){
					unit.issueMove(pos, dist);
				}
			}
		}
	}
	else {
		unit = game.getUnitByClick(pos);	
		if (unit){unit.select();}
	}
}

function firePhase(e, pos, unit){
	var target;

	if (unit){
		target = game.getUnitByClick(pos);
		if (target){
			if (target.id != unit.id && (target.userid != game.userid && target.userid != unit.userid)){
				handleFireClick(unit, target);
			} else target.switchDiv();
		}
	}
	else {
		unit = game.getUnitByClick(pos);
		if (unit){unit.select();}
	}
}

function dmgPhase(e, pos, unit){
	var pos = new Point(e.clientX - offset.x, e.clientY - offset.y).getOffset();
	var index;

	if (unit){
		var clickShip = game.getUnitByClick(pos);
		if (unit == clickShip){
			unit.select();
		} else if (clickShip){
			clickShip.switchDiv();
		}
	}
	else {
		unit = game.getUnitByClick(pos);	
		if (unit){unit.select();}
	}
}

function handleFireClick(shooter, target){
	if (target){
		if (target.id != shooter.id && (target.userid != game.userid && target.userid != shooter.userid)){
			
			if (shooter.salvo){return;}
			if (shooter.flight && !game.isCloseCombat(shooter, target)){return;}
			
			if (shooter.hasWeaponsSelected()){
				var active = shooter.getSelectedWeapons();

				for (var i = 0; i < active.length; i++){
					if (active[i].canFire()){
						if (active[i].hasValidTarget()){
							// FireOrder(id, turn, shooterid, targetid, weaponid, req, notes, hits, resolved){
							active[i].setFireOrder(target.id);
						}
					}
				}
			}

			$("#weaponAimTableWrapper").hide()
			shooter.highlightAllSelectedWeapons();
			//game.draw();
		}
		else target.switchDiv();
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