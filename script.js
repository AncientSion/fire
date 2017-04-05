

window.preload();
$(window).on("load", function() {
	init();
});

function init(){
	$("#mouseCanvas").mousemove(canvasMouseMove);
	$("#mouseCanvas").bind('wheel', mouseCanvasZoom)
	$("#mouseCanvas").bind('contextmenu', mouseCanvasScroll)
	$("#mouseCanvas").click(canvasMouseClick);

	$(document).mousedown(function(e){ e.preventDefault(); });
	
	var canv = document.getElementsByTagName("canvas");
	
	for (var i = 0; i < canv.length; i++){
		canv[i].width = res.x;
		canv[i].height = res.y;
		canv[i].style.width = res.x;
		canv[i].style.height = res.y;
		var input = document.createElement("input");
			input.type = "button";
			input.value = canv[i].id;
			input.addEventListener("click", function(){
				var c = document.getElementById(this.value);
				if (c.style.display == "none"){
					c.style.display = "";
				}
				else {
					c.style.display = "none";
				}
					
			});
			
			input = $(input);
			
			$("#buttons").append(input);
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
	
	mouseCanvas = canv[4];
	mouseCtx = mouseCanvas.getContext("2d");

	/*
	$("#game").append($("<canvas>").addClass("cache"));
	$(".cache").attr("id", "cache").drag();
	var ca = $("#cache")[0];
	cache = $(".cache")[0].getContext("2d");
	ca.width = 100; ca.height = 100;
	ca.style.width = 100; ca.style.height = 100;
	*/

	

	game = new Game(gd.id, gd.name, gd.status, userid, gd.turn, gd.phase);
	for (var i = 0; i < window.playerstatus.length; i++){
		if (userid == window.playerstatus[i].userid){
			game.playerindex = i+1;
			break;
		}
	}
	game.create();
}

function executeAll(){
	if (game){
		game.executeAll();
	}
}

function mouseCanvasZoom(e){
	e.preventDefault();	
	var rect = this.getBoundingClientRect();		
	var pos = new Point(e.clientX - rect.left, e.clientY - rect.top);
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
		var rect = this.getBoundingClientRect();
		var pos = new Point(e.clientX - rect.left, e.clientY - rect.top);
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

	var rect = this.getBoundingClientRect();
	var pos = new Point(e.clientX - rect.left, e.clientY - rect.top).getOffset();
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
		var ship = game.getUnitById(aUnit);
		var angle;
		if (!ship){return;}
		var shipLoc = ship.getPlannedPosition();
		var facing = ship.getPlannedFacingToMove();

		if (game.vector){
			var dist = Math.floor(getDistance(shipLoc, pos));
			var a = getAngleFromTo(shipLoc, pos);
				a = addAngle(facing, a);
			drawVector(shipLoc, {x: e.clientX - rect.left, y: e.clientY - rect.top}, dist, a);
		}

		if (ship.salvo){return}
		
		if (ship.hasWeaponsSelected()){
			var dist;
			var valid = false;
			var table = document.getElementById("targetInfo");
				table.innerHTML = "";
			var vessel;

			if (ammo){
				//if (ammo[0].targetid == ship.id || ship instanceof Flight){
					vessel = ammo[0];
				//}
			}
			else if (ships){
				vessel = ships[0]
			}
			else{
				vessel = false;
			}

			if (vessel){
				if (vessel.userid != ship.userid){
					if (vessel instanceof Salvo){ // aiming at SALVO
						if (game.phase <= 2){
							if (vessel.targetid == ship.id){ // direct interception
								dist = Math.max(ship.size/2, Math.floor(getDistance(shipLoc, vessel.getBaseOffsetPos()) - vessel.getImpulse()));
							}
							else if (ship.flight){// indirect interception
								dist = Math.abs(Math.floor(getDistance(shipLoc, vessel.nextStep)));
							}
						} 
						else dist = Math.floor(getDistance(shipLoc, vessel.getBaseOffsetPos()));
					}
					else {
						dist = Math.floor(getDistance(shipLoc, vessel.getBaseOffsetPos()));
					}
					angle = getAngleFromTo(vessel.getBaseOffsetPos(), shipLoc);
					angle = addAngle(vessel.getPlannedFacingToMove(), angle);

					var baseHit = vessel.getHitChanceFromAngle(angle);

					var tr = table.insertRow(-1);
						tr.insertCell(-1).textContent = "Target";
						tr.insertCell(-1).textContent = "Base Chance";
						tr.insertCell(-1).textContent = "Dist";
						tr.className = "weaponAimHeader";
					table.appendChild(tr);

					var tr = table.insertRow(-1);
						tr.insertCell(-1).textContent = vessel.name + " " + vessel.id;
						tr.insertCell(-1).textContent = baseHit + "%";
						tr.insertCell(-1).textContent = dist;
					table.appendChild(tr);
				}
				else return;
			}
			else {
				dist = Math.floor(getDistance(shipLoc, pos));
			}

			var table = document.getElementById("weaponInfo");
			for (var i = table.childNodes.length-1; i > 1; i--){
				table.childNodes[i].remove();
			}

			var validWeapon = false;

			if (vessel){pos = vessel.getBaseOffsetPos();}
				
			for (var i = 0; i < ship.structures.length; i++){
				for (var j = 0; j < ship.structures[i].systems.length; j++){
					if (ship.structures[i].systems[j].weapon && ship.structures[i].systems[j].selected){
						var inArc = false;
						var legalTarget = true;

						var msg = "";
						var tr = document.createElement("tr");
						var td = document.createElement("td");
							td.innerHTML = ship.structures[i].systems[j].name + " #" + ship.structures[i].systems[j].id; tr.appendChild(td);

						if (ship.ship && vessel.salvo && !(ship.structures[i].systems[j] instanceof Launcher) && ship.id != vessel.targetid){
							legalTarget = false;
							msg = "Unable to aquire target";
						}
						else if (ship.flight && vessel.salvo){
							var start = true;
							var end = true;
							if (!ship.structures[i].systems[j].posIsOnArc(shipLoc, pos, facing)){start = false;}
							if (ship.id == vessel.targetid){if(!isInArc(angle, ship.structures[i].systems[j].arc[0][0], ship.structures[i].systems[j].arc[0][1])){end = false;}}
							else if (!ship.structures[i].systems[j].posIsOnArc(shipLoc, vessel.nextStep, facing)){end = false;}
							if (!start || !end){
								msg = "Ballistic trajectory out of scope.";
							} else {
								inArc = true;
								validWeapon = true;
							}
						}
						else if (ship.structures[i].systems[j].posIsOnArc(shipLoc, pos, facing)){
							inArc = true;
							validWeapon = true;
						}
						else msg = "Not in weapon arc";
						
						if (inArc && legalTarget){
							var fc = 0;
							if (vessel){
								fc = ship.structures[i].systems[j].getFireControl(vessel)
								tr.insertCell(-1).innerHTML = fc + "%";
							} else {tr.insertCell(-1).innerHTML = "";}
							tr.insertCell(-1).innerHTML = ship.structures[i].systems[j].getDamageDecay(dist) + "%";
							tr.insertCell(-1).innerHTML = ship.structures[i].systems[j].getAccurayDecay(dist) + "%";
							if (vessel){
								if (ship.structures[i].systems[j] instanceof Launcher){
									tr.insertCell(-1).innerHTML = fc + "%";
								}
								else {
									tr.insertCell(-1).innerHTML = Math.floor((baseHit / 100 * fc) - ship.structures[i].systems[j].getAccurayDecay(dist)) + "%";
								}
							} else {								
								tr.insertCell(-1);
							}

							/*if (vessel){
								var td = document.createElement("td");
									td.innerHTML = baseHit - decay + "%"; tr.appendChild(td);
								var td = document.createElement("td");
									td.innerHTML = ship.structures[i].systems[j].getExpectedDamage(dist); tr.appendChild(td);
							}*/
							table.appendChild(tr);
						}
						else {
							var td = document.createElement("td");
							td.innerHTML = msg; tr.appendChild(td); table.appendChild(tr);
							if (vessel){td.colSpan = 5;} else {td.colSpan = 3;}
						}
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
		moveCtx.clearRect(0, 0, res.x, res.y);
		//moveCtx.drawImage(game.getUnitById(game.deploying).img, pos.x + cam.o.x - 25, pos.y + cam.o.y + 10, 50, 50);
	}
	else if (!game.deploying){
		$("#deployOverlay").hide();
	}
}

function deployPhase(e, rect){
	var pos = new Point(e.clientX - rect.left, e.clientY - rect.top).getOffset();
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
		if (game.ships[index].canDeployHere(pos)){
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
			firePhase(e, rect);
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

function movePhase(e, rect){	
	var pos = new Point(e.clientX - rect.left, e.clientY - rect.top).getOffset();
	var ship;
	var index;
	if (aUnit){
		ship = game.getUnitById(aUnit);
		if (game.getShipByClick(pos) == ship){
			ship.select();
			return;
		}
		else {
			if (game.mode == 1){ //no active weapon but ship active -> MOVE MODE
				pos = new Point(e.clientX - rect.left, e.clientY - rect.top).getOffset();
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

function firePhase(e, rect){
	var pos = new Point(e.clientX - rect.left, e.clientY - rect.top).getOffset();
	var ship;
	var index;
	var vessel;

	if (! aUnit){
		ship = game.getUnitByClick(pos);
		if (ship){ship.select();}
	}
	else {
		vessel = game.getUnitByClick(pos);
		if (vessel){
			if (vessel.id != aUnit && (vessel.userid != game.userid && vessel.userid != game.getUnitById(aUnit).userid)){
				var ship = game.getUnitById(aUnit)
				var shipLoc = ship.getOffsetPos();
				var facing = ship.getPlannedFacingToMove();
				/*
				var dist = Math.floor(getDistance(shipLoc, {x: clickShip.x, y: clickShip.y}));
					a = getAngleFromTo(clickShip.getOffsetPos(), shipLoc);
					a = addAngle(a, -clickShip.getPlannedFacingToMove());
				var baseHit = clickShip.getHitChanceFromAngle(a);
				
				console.log("dist: " + dist + ", sSpeed: " + ship.getTotalImpulse() + ", tSpeed: " + clickShip.getTotalImpulse());
				console.log("sFace: " + ship.facing + ", tFace: " + clickShip.facing + ", a: "+ a);
				console.log("incoming from: " + window.getBearing
				window.getBearing(ship, clickShip);
				console.log(baseHit);
				*/
				if (vessel){
					if (ship.hasWeaponsSelected()){
						for (var i = 0; i < ship.structures.length; i++){
							for (var j = ship.structures[i].systems.length-1; j >= 0; j--){
								if (ship.structures[i].systems[j].weapon && ship.structures[i].systems[j].selected){
									if (vessel.salvo && ship.ship && ship.id != vessel.targetid && ship.structures[i].systems[j].selected instanceof Launcher){continue;}

									if (ship.structures[i].systems[j].canFire()){
										if (ship.structures[i].systems[j].posIsOnArc(shipLoc, pos, facing)){
											// FireOrder(id, turn, shooterid, targetid, weaponid, req, notes, hits, resolved){
											ship.structures[i].systems[j].setFireOrder(vessel.id);
										}
									}
								}
							}
						}
						$("#weaponAimTableWrapper").hide()
						ship.highlightAllSelectedWeapons();
						game.draw();
					}
				}
			}
		}
	}
}

function dmgPhase(e, rect){
	var pos = new Point(e.clientX - rect.left, e.clientY - rect.top).getOffset();
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
	var rect = this.getBoundingClientRect();
	//var pos = new Point(e.clientX - rect.left, e.clientY - rect.top);

	var gamepos = new Point(e.clientX - rect.left, e.clientY - rect.top).getOffset();

	//console.log("canvas pos " + pos.x + " / " + pos.y);
	console.log("game pos " + gamepos.x	+ " / " + gamepos.y);
	switch (game.phase){
		case -1:
			deployPhase(e, rect);
			break;
		case 0: 
			movePhase(e, rect);
			break;
		case 1: 
			movePhase(e, rect);
			break;
		case 2: 
			firePhase(e, rect);
			break;
		case 3: 
			dmgPhase(e, rect);
			break;
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