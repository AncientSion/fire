graphics.preload();
window.isError = 0;

$(window).on("load", function(){
	ajax.getGameData(window.gameid, window.userid);
});

function init(data){
	if (data.turn == 0){window.location = "lobby.php"; return;}

	console.time("time");

	res.x = window.innerWidth-1;
	res.y = window.innerHeight-1;

	$(window).on('resize', function(){
		res.x = window.innerWidth-1;
		res.y = window.innerHeight-1;
		sizeCanvas();
		game.doPositionChat();
		game.draw();
	});

	scopeCanvas();
	sizeCanvas();

	$("#mouseCanvas").mousemove(canvasMouseMove);
	$("#mouseCanvas").bind('wheel', mouseCanvasZoom);
	$("#mouseCanvas").contextmenu(function(e){e.preventDefault(); e.stopPropagation();});

	$("#mouseCanvas").mousedown(handleMouseDown);
	$("#mouseCanvas").mouseup(function(e){handleMouseUp(e);});
	$("#mouseCanvas").mouseout(function(e){handleMouseOut(e);});

	$("#phaseInfoDiv").css("width", res.x).css("height", res.y);
	var h = $("#phaseInfoInnerDiv").height();
	var w = $("#phaseInfoInnerDiv").width();
	$("#phaseInfoInnerDiv").css("top", res.y/2 - h-400).css("left", res.x/2 - w/2).removeClass("disabled");

	turn = new Turn();
	game = new Game(data);
	game.create(data);
	window.initChat();
	window.initiateKeyDowns();

	console.timeEnd("time");
}

function sizeCanvas(){
	//console.log("sizeCanvas");
	var canv = document.getElementsByClassName("gameCanvas");

	for (var i = 0; i < canv.length; i++){
		canv[i].width = res.x;
		canv[i].height = res.y;
		canv[i].style.width = res.x;
		canv[i].style.height = res.y;
		canv[i].style.zIndex = i+1;
		canv[i].style.position = "absolute";
	}

	drawCanvas.style.zIndex = 0;
}

function scopeCanvas(){
	var canv = document.getElementsByClassName("gameCanvas");

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

	fxCtx.font = "18px Arial";
	fxCtx.textAlign = "center";
}

function mouseCanvasZoom(e){
	e.preventDefault();
	if (game){cam.adjustZoom(e);}
}

function handleWeaponAimEvent(shooter, target, e, pos){

	if (shooter.userid == target.userid || shooter.userid == target.userid || target && target.isDestroyed()){
		ui.aimDiv.hide();
		return;
	}
	
	//var shooterPos = (shooter.flight ? shooter.getGamePos() : shooter.getPlannedPos());
	var shooterPos = (game.phase == 2 ? shooter.getGamePos() : shooter.getPlannedPos());
	var facing = shooter.getPlannedFacing();
	var dist;
	var drop = 0;
	var cc = game.isCloseCombat(shooter, target);
	var pos;
	var final = 0;
	
	if (target && !drop && !target.obstacle){
		var multi = 1;
		if (target.userid != shooter.userid){
			if (game.target == target.id){return;}
			else game.target = target.id;			

			var baseHit;
			var impulse;
			var impulseString = "";
			var lock;
			var lockString = "";// = "<span class ='red'>0.0</span>";
			var mask;
			var maskString = "";// = "<span class ='green'>0.0</span>";
			var valid = false;
			var target;
			var section;
			var angle;
			var targetPos = (game.phase == 2 ? target.getGamePos() : target.getPlannedPos())
			var shooterAngle = addAngle(facing, getAngleFromTo(shooterPos, targetPos));
			var dist = Math.floor(getDistance(shooterPos, targetPos));

			if (shooter.ship || shooter.squad){
				if (target.salvo){
					angle = getAngleFromTo(target.getTrajectory(), shooterPos);
					angle = addAngle(-shooter.getPlannedFacing(), angle);
				}
				else {
					angle = getAngleFromTo(target.getPlannedPos(), shooterPos);
					angle = addAngle(target.getPlannedFacing(), angle);
				}
			} else angle = range(0, 359);
			
			baseHit = target.getAngledHitChance(angle);

			impulse = 1 - target.getImpulseMod();

			lock = round(shooter.getLockEffect(target, targetPos, shooterPos, dist), 2);
			mask = round(target.getMaskEffect(shooter, shooterPos, targetPos, dist), 2);


			if (lock){
				multi += lock;
				lockString = "<span class ='green'>+" + lock;
				if ((shooter.ship || shooter.squad)){
					if (target.flight || target.salvo){
						lockString += " (Sensor)";
					}
				}
				else if (shooter.flight){
					if (target.id == shooter.mission.targetid){
						lockString += " (Mission)";
					} else if (shooter.mission.type == 1 && shooter.mission.arrived){lockString += " (Patrol)"};
				}
				lockString += "</span>";
			}
			if (mask){
				multi -= mask;
				maskString = "<span class ='red'>-" + mask;
				if (target.flight || target.salvo){
					maskString += " (Mission)";
				}
				else if (shooter.flight){
					if (target.flight || target.salvo){
						maskString += " ERROR 666";
					}
				}
				maskString += "</span>";
			}
			if (impulse){
				if (shooter.flight && (target.ship || target.squad)){
					impulseString = "<span> No effect on flight<span>";
				}
				else {
					multi += impulse / 2;
					if (impulse/2 < 0){
						impulseString = "<span class ='red'>";
					} else impulseString = "<span class ='green'>";
					impulseString += round(impulse/2) + "</span>";
				}
			}

			multi = round(multi, 2);
			final = Math.floor(baseHit * multi);
			ui.targetDataA
				.empty()
				.append($("<td>").addClass("red").html(target.name))
				.append($("<td>").html(getUnitType(target.traverse) + " (" + target.traverse + ")"))
				.append($("<td>").html(target.getArmourString(angle)))
				.append($("<td>").html(target.getSectionString(angle)))
				.append($("<td>").html(dist));

			ui.targetDataB
				.empty()
				.append($("<td>").html(impulseString))
				.append($("<td>").html(lockString))
				.append($("<td>").html(maskString))
				.append($("<td>").addClass("green").html(baseHit + "%"))
				.append($("<td>"))
				.append($("<td>").addClass("final").html("<div>x" + multi + "</div><div>" + final + "%</div>"));

			var jamming = target.hasPassiveJamming();
		
			if (jamming){ui.targetDatatC.html(target.getJammingString());}
		}
	}
	else {
		game.target = 0;
		if (target){
			pos = target.getPlannedPos();
		}
		dist = Math.round(getDistance(shooterPos, pos));
		ui.targetDataA
		.empty()
		.append($("<td>").html(""))
		.append($("<td>").html(""))
		.append($("<td>").html(""))
		.append($("<td>").html(""))
		.append($("<td>").html(dist));

		ui.targetDataB
		.empty()
		.append($("<td>").html(""))
		.append($("<td>").html(""))
		.append($("<td>").html(""))
		.append($("<td>").html(""))
		.append($("<td>").html(""));

		ui.targetDataC.empty();
	}

	ui.weaponInfo.children().children().each(function(i){
		if (i >= 1){
			$(this).remove();
		}
	})

	var validWeapon = false;
	var snap = false;

	if (target){
		if (target.salvo){
			pos = target.getTrajectory();
		} else pos = targetPos;
	}
	
	if (!drop){	
		var active = shooter.getSelectedWeapons();
		var onlyArea = 1;

		for (var i = 0; i < active.length; i++){
			if (active[i].type != "Area"){onlyArea = 0;}
		}

		if (onlyArea){
			salvoCtx.clearRect(0, 0, res.x, res.y);
			for (var i = 0; i < active.length; i++){
				active[i].handleAimEvent(shooter.getGamePos(), pos);
			}
			shooter.drawEW();
		}

		if (target){snap = game.hasSnapCenterline(shooter, shooterAngle, target);}

		if ((target.squad || target.flight) && target.getStringHitChance().length > 5){
			ui.weaponInfo.append(
				$("<tr>").append(
					$("<td>")
						.attr("colSpan", 5)
						.css("color", "yellow")
						.css("font-size", 14)
						.html("- Targeting a mixed unit, chance to hit will slightly difer -")));
		}

		var obstacles = game.hasObstacleInVector(shooterPos, pos, target);

		if (1 && obstacles.length){
			var html = "";
			for (var i = 0; i < obstacles.length; i++){
				html += obstacles[i].display + " #" + obstacles[i].obstacleId + ", penetration depth: " + obstacles[i].dist + " --- ";
				html += "<span class='yellow'>" + obstacles[i].EffInterference + "% chance to miss</span></br>";
			}
			ui.targetDataC.html(html)
		}

		for (var i = 0; i < active.length; i++){
			var system = active[i].getSystem();
			var inArc = 1;
			var legalTarget = 1;
			var msg = "";

			var row = $("<tr>");
				row.append($("<td>").html(system.getDisplay()))

			var relevantPos = pos;
			if (target && system.launcher && game.phase == -1){
				relevantPos = target.getGamePos();
			}

			if (shooter.ship || shooter.squad){
				if (cc){
					if (system.launcher){
						legalTarget = 0;
					}
					else if (target.salvo && !targetInArc(shooter, shooterPos, relevantPos, facing, system)){
						legalTarget = 0;
					}
				}

				else if (!targetInArc(shooter, shooterPos, relevantPos, facing, system)){
					if (snap && (active[i].arc[0][0] == 0 || active[i].arc[0][1] == 360)){
					} else inArc = 0;
				}	
			}
			if (inArc && legalTarget){
				system.getAimData(target, final, dist, row);
			}
			else {
				$(row).append($("<td>").html("Illegal Target").attr("colSpan", 4))
				system.validTarget = 0;
			}

			ui.weaponInfo.append(row);
		}
	}		

	drawAimVector(shooterPos, targetPos || pos);
	game.showHoverElement($(ui.aimDiv), e);
}

function handleScroll(e){
	// get the current mouse position
	var mouseX = e.clientX;
	var mouseY = e.clientY;
	// dx & dy are the distance the mouse has moved since
	// the last moumove event
	var dx = mouseX - cam.sx;
	var dy = mouseY - cam.sy;

	if (dx != 0 || dy != 0){
		// reset the vars for next mousemove
		cam.sx = mouseX;
		cam.sy = mouseY;

		// accumulate the net panning done
		cam.o.x += dx;
		cam.o.y += dy;
		
		game.redraw();
	}
}

function canvasMouseMove(e){
	e.preventDefault();
	e.stopPropagation();

	window.iterator++;
	if (window.iterator < 2){return;}
	if (cam.scroll){handleScroll(e); return;}
	window.iterator = 0;
	game.movePos = false;

	var mousePos = new Point(e.clientX, e.clientY).getOffset();
	//$("#currentPos").html(pos.x + " / " + pos.y + "____" + cam.o.x + " / " + cam.o.y+ "___" + (pos.x-cam.o.x) + " / " + (pos.y-cam.o.y));
	var unit = game.getUnitByClick(mousePos);

	if (game.flightDeploy && game.mission){
		game.handleFlightDeployMouseMove(e, game.getUnit(aUnit).getGamePos(), mousePos, game.getUnit(aUnit).getColor(), game.deploySpeed);
	}
	else {
		if (aUnit){
			var ship = game.getUnit(aUnit);
			if (!ship){return;}

			var shipLoc = ((ship.flight || ship.salvo || ship.obstacle) ? ship.getGamePos() : ship.getPlannedPos());
			var	heading = ship.getPlannedHeading();

			if (game.vector){
				var dist = Math.floor(getDistance(shipLoc, mousePos));
				var a = getAngleFromTo(shipLoc, mousePos);
					a = addAngle(heading, a);
				drawVector(ship, shipLoc, {x: e.clientX, y: e.clientY}, dist, a);
			}

			if (ship.salvo){}
			else if (game.sensorMode){
				sensorEvent(false, ship, shipLoc, heading, Math.floor(getDistance(shipLoc, mousePos)), addAngle(heading, getAngleFromTo(shipLoc, mousePos)));
			}
			else if (game.mode == 2){
				ship.handleTurning(e, shipLoc, heading, mousePos);
			}
			else if (game.mode == 3){
				handleWeaponAimEvent(ship, unit, e, mousePos);
			}
			else if (game.mode == 1 && game.phase < 2 && !game.shortInfo && (game.available < game.turn || game.available == game.turn && game.phase >= -1)){
				handleMouseMoveVector(ship, shipLoc, heading, e, mousePos);
			}			
		}
		else if (game.deploying){
			game.handleShipDeployMouseMove(e, mousePos);
		}
		else if (!game.deploying){
			ui.deployOverlay.hide();
		}
	}
	 
	if (unit){game.handleHoverEvent(e, 1, unit);
	} else if (game.shortInfo){game.resetHover()}
}

function handleMouseMoveVector(unit, unitLoc, heading, e, mousePos){
	var c = moveCtx.getImageData(e.clientX, e.clientY, 1, 1).data[3] == 64;
	if (!c){
		mouseCtx.clearRect(0, 0, res.x, res.y);
		return;
	}

	var dist = getDistance(unitLoc, mousePos);
	var vector = getPointInDir(dist, heading, unitLoc.x, unitLoc.y);

	mouseCtx.clearRect(0, 0, res.x, res.y);
	mouseCtx.translate(cam.o.x, cam.o.y);
	mouseCtx.scale(cam.z, cam.z);

	mouseCtx.lineWidth = 2;
	mouseCtx.strokeStyle = "yellow";

	mouseCtx.beginPath();
	mouseCtx.arc(vector.x, vector.y, 10, 0, 2*Math.PI, false);
	mouseCtx.closePath();
	mouseCtx.stroke();

	mouseCtx.setTransform(1,0,0,1,0,0);

	game.movePos = vector;
}

function ahandleMouseMoveVector(unit, unitLoc, heading, e, mousePos){
	//console.log("handleMouseMoveVector");
	var a = addAngle(heading, getAngleFromTo(unit.getPlannedPos(), mousePos));
	var dist = getDistance(unit.getPlannedPos(), mousePos);

	if (dist > unit.getRemSpeed()){return;}
	if (a < 10 || a > 350){
		//console.log(a);

		var vector = getPointInDir(dist, heading, unitLoc.x, unitLoc.y);


	//	var left = getPointInDir(heading-45, 50, vector.x, vector.y);
	//	var right = getPointInDir(heading+45, 50, vector.x, vector.y);

		mouseCtx.clearRect(0, 0, res.x, res.y);
		mouseCtx.translate(cam.o.x, cam.o.y);
		mouseCtx.scale(cam.z, cam.z);

		mouseCtx.lineWidth = 3;
		mouseCtx.strokeStyle = "yellow";

		mouseCtx.beginPath();
		mouseCtx.arc(vector.x, vector.y, 12, 0, 2*Math.PI, false);
		mouseCtx.closePath();
		mouseCtx.stroke();
	/*
		mouseCtx.beginPath();
		mouseCtx.arc(left.x, left.y, 10, 0, 2*Math.PI, false);
		mouseCtx.closePath();
		mouseCtx.stroke();

		mouseCtx.beginPath();
		mouseCtx.arc(right.x, right.y, 10, 0, 2*Math.PI, false);
		mouseCtx.closePath();
		mouseCtx.stroke();
	*/
		mouseCtx.setTransform(1,0,0,1,0,0);

		game.movePos = vector;

	}
}

function sensorize(ship, pos){
	var facing = ship.getPlannedHeading();
	var shipLoc = ship.getPlannedPos();
	var a = addAngle(facing, getAngleFromTo(shipLoc, pos));
	sensorEvent(true, ship, shipLoc, facing, Math.floor(getDistance(shipLoc, pos)), a);
}

function planPhase(e, pos, unit){
	if (game.deploying){
		if (game.sensorMode){
			sensorize(game.deploying, pos);
		}
		else if (game.mode == 2){
			game.deploying.handleTurnAttempt(pos);
		}
		else if (game.deploying.canDeployHere(e, pos)){
			game.doDeployShip(pos);
		}
	}
	else if (game.flightDeploy && game.mission){
		if (unit.flight){game.issueMission(pos);}
		else game.doDeployFlight(pos);
	}
	else if (!game.deploying){
		if (unit){
			if (game.mode == 2){ // turn mode
				unit.handleTurnAttempt(pos);
			}
			else if (game.mode == 1){ //  PLAN MOVE MODE
				if (game.sensorMode){
					sensorize(unit, pos);
				}
				else {
					unit.handleMoveAttempt(e, pos);
				}
			/*	else if (isInArc(getCompassHeadingOfPoint(unit.getPlannedPos(), pos, 0), unit.moveAngles.start, unit.moveAngles.end)){ //check if clicked to move in movement arc
					var dist = Math.floor(getDistance(unit.getPlannedPos(), pos));
					if (dist < unit.getRemSpeed()){
						unit.doIssueMove(pos, dist);
					}
				}
			*/}
			else if (unit.canDeploy()){
				game.enableDeployment(unit.id);
			}
			else firePhase(e, pos, unit, 0);
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

function firePhase(e, pos, unit, targetid){
	if (unit){
		game.handleFireClick(pos, unit, targetid);
	}
	else unit = game.getUnitByClick(pos);
	if (unit){unit.select(e);}
}

function dmgPhase(e, pos, unit){
	var pos = new Point(e.clientX, e.clientY).getOffset();
	var index;

	if (unit){
		var clickShip = game.getUnitByClick(pos);
		if (unit == clickShip){
			unit.select();
		} else if (clickShip){
			clickShip.switchDiv(e);
		}
	}
	else {
		unit = game.getUnitByClick(pos);	
		if (unit){unit.select(e);}
	}
}