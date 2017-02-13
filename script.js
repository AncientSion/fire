

window.preload();
$(window).on("load", function() {
	init();
});

function init(){
	$("#mouseCanvas").mousemove(canvasMouseMove);
	$("#mouseCanvas").bind('mousewheel DOMMouseScroll', mouseCanvasZoom)
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

	planCanvas = canv[1];
	planCtx = planCanvas.getContext("2d");
	
	fxCanvas = canv[2];
	fxCtx = fxCanvas.getContext("2d");

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
	game.create();
	game.draw();
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
	if (aShip || aBall){
		if (aShip){
			game.getShipById(aShip).unselect();
		}
		if (aBall){
			game.getBallById(aBall).select(e);
		}
		return;
	}
	else {
		var rect = this.getBoundingClientRect();
		var pos = new Point(e.clientX - rect.left, e.clientY - rect.top);
		cam.doScroll(pos);
		game.draw();
	}
}

function canvasMouseMove(e){
	e.preventDefault();
	e.stopPropagation();
	var rect = this.getBoundingClientRect();
	var pos = new Point(e.clientX - rect.left, e.clientY - rect.top).getOffset();
	//console.log(pos);
	//$("#currentPos").html(pos.x + " / " + pos.y + "____" + cam.o.x + " / " + cam.o.y+ "___" + (pos.x-cam.o.x) + " / " + (pos.y-cam.o.y));

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
	 
	if (aShip){
		var ship = game.getShipById(aShip);
		var shipLoc = ship.getBaseOffsetPos();
		var facing = ship.getPlannedFacingToMove();

		if (game.vector){
			var dist = Math.floor(getDistance(shipLoc, pos));
			var a = getAngleFromTo(shipLoc, pos);
				a = addAngle(facing, a);
			drawVector(shipLoc, pos, dist, a);
		}
		
		if (ship.hasWeaponsSelected()){
			var dist = Math.floor(getDistance(shipLoc, pos));
			var valid = false;
			var table = document.getElementById("targetInfo");
				table.innerHTML = "";
			var vessel;

			if (ammo){
				vessel = ammo[0];
			}
			else if (ships){
				vessel = ships[0]
			}
			else{
				vessel = false;
			}
			if (vessel){
				if (vessel.userid != ship.userid){
					dist = Math.floor(getDistance(shipLoc, vessel.getBaseOffsetPos()));
					a = getAngleFromTo(vessel.getBaseOffsetPos(), shipLoc);
					a = addAngle(vessel.getPlannedFacingToMove(), a);

					var baseHit = vessel.getHitChanceFromAngle(a);

				/*
					var tr = document.createElement("tr");
					var th = document.createElement("th"); th.colSpan = 5; th.className ="weaponAimHeader";
						th.innerHTML = "ACTIVE TARGET"; tr.appendChild(th); table.appendChild(tr);
				*/
					var tr = table.insertRow(-1);
						tr.insertCell(-1).textContent = "Target";
						tr.insertCell(-1).textContent = "Base Chance";
						tr.insertCell(-1).textContent = "Dist";
						tr.className = "weaponAimHeader";
					table.appendChild(tr);

					var tr = table.insertRow(-1);
						tr.insertCell(-1).textContent = vessel.classname + " " + vessel.id;
						tr.insertCell(-1).textContent = baseHit + "%";
						tr.insertCell(-1).textContent = dist;
					table.appendChild(tr);
				}
				else vessel = false;
			}

			var table = document.getElementById("weaponInfo");
				for (var i = table.childNodes.length-1; i > 1; i--){
					table.childNodes[i].remove();
				}
			
			/*var tr = table.insertRow(-1);
				tr.className = "weaponAimHeader";
				tr.insertCell(-1).textContent = "Weapon";
				tr.insertCell(-1).textContent = "Dmg loss";
				tr.insertCell(-1).textContent = "Acc loss";
				tr.insertCell(-1).textContent = "Final est.";
			table.appendChild(tr);
			*/

			var validWeapon = false;
				
			for (var i = 0; i < ship.structures.length; i++){
				for (var j = 0; j < ship.structures[i].systems.length; j++){
					if (ship.structures[i].systems[j].weapon && ship.structures[i].systems[j].selected){
						var tr = document.createElement("tr");
						var td = document.createElement("td");
							td.innerHTML = ship.structures[i].systems[j].name + " #" + ship.structures[i].systems[j].id; tr.appendChild(td);

						
						var valid = false;
						if (vessel){
							if (ship.structures[i].systems[j].posIsOnArc(shipLoc, vessel.getBaseOffsetPos(), facing)) {
								valid = true;
								validWeapon = true;
							}
						}
						else {
							if (ship.structures[i].systems[j].posIsOnArc(shipLoc, pos, facing)){
								valid = true;
								validWeapon = true;
							}
						}
						
						if (valid){
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
								if (vessel){td.colSpan = 5;} else {td.colSpan = 3;}
								td.innerHTML = "Not in weapon arc";  tr.appendChild(td); table.appendChild(tr);
						}
					}
				}
			}
					
			var wrapper = document.getElementById("weaponAimTableWrapper");
			if (validWeapon){
				$(wrapper)
				.css("left", pos.x + cam.o.x - 170)
				.css("top", pos.y + cam.o.y + 80)
				.show();
			}
			else {
				$(wrapper).hide();
			}
		}
		else if (game.flightDeploy){
			$("#deployOverlay").html("Deploy Flight at cursor position")
			.css("left", pos.x + cam.o.x - 80 + "px")
			.css("top", pos.y + cam.o.y + 60 + "px")
			.show();
		}
	}
	else if (game.deploying){
		$("#deployOverlay").html("Deploy Ship at cursor position")
		.css("left", pos.x + cam.o.x - 80 + "px")
		.css("top", pos.y + cam.o.y + 60 + "px")
		.show();
		moveCtx.clearRect(0, 0, res.x, res.y);
		moveCtx.drawImage(game.getShipById(game.deploying).img, pos.x + cam.o.x - 25, pos.y + cam.o.y + 10, 50, 50);
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
	if (game.deploying){
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
	else if (game.flightDeploy){
		if (game.getShipById(aShip).canDeployFlightHere(pos)){
			game.doDeployFlight(e, pos);
		}
		else {
			$("#instructWrapper").hide();
			popup("Flight can not be deployed there");
		}
	}
	else if (!game.deploying){
		if (aShip){
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
	if (aShip){
		ship = game.getShipById(aShip);
		if (game.getShipByClick(pos) == ship){
			ship.unselect();
			return;
		}
		else {
			if (game.mode == 1){ //no active weapon but ship active -> MOVE MODE
				click = new Point(e.clientX - rect.left, e.clientY - rect.top);
				if (checkIfOnMovementArc(ship, click)){ //check if clicked to move in movement arc
					if (! game.posIsOccupied(ship, click)){
						var dist = Math.floor(getDistance(ship.getOffsetPos(), click));
						if (dist < ship.getRemainingImpulse()){
							ship.issueMove(click, dist);
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
	var tEnd = target.getTurnEndPosition();
	var tFaceStart = tStart.a;
	var tFaceEnd = target.facing;
	var tFacePro = tFaceEnd - tFaceStart;

	var startBearing = getAngleFromTo(shooter.getTurnEndPosition(), tStart)
	var endBearing = getAngleFromTo(shooter.getTurnEndPosition(), tEnd)
	var aDif = endBearing - startBearing;

	return;
}

function firePhase(e, rect){
	var pos = new Point(e.clientX - rect.left, e.clientY - rect.top).getOffset();
	var ship;
	var index;
	if (! aShip){
		ammo = game.getAmmoByClick(pos);
		ship = game.getShipByClick(pos);		
		if (ammo){
			ammo.select(e);
		}
		else if (ship){
			ship.select(e);
		}
	}
	else {
		var clickAmmo = game.getAmmoByClick(pos);
		var clickShip = game.getShipByClick(pos);

		var vessel;
		if (clickAmmo){
			vessel = clickAmmo;
		}
		else if (clickShip){
			vessel = clickShip;
		}
		else vessel = false;

		if (vessel){
			if (vessel.id != aShip && (vessel.userid != game.userid && vessel.userid != game.getShipById(aShip).userid)){
				var ship = game.getShipById(aShip)
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
									if (game.phase == 2 && ship.structures[i].systems[j].type != "ballistic"
										||
										game.phase == -1 && ship.structures[i].systems[j].type == "ballistic"
									){
									if (ship.structures[i].systems[j].posIsOnArc(shipLoc, vessel.getOffsetPos(), facing)){
											// FireOrder(id, turn, shooterid, targetid, weaponid, req, notes, hits, resolved){
											ship.structures[i].systems[j].setFireOrder(
												new FireOrder(
														0,
														game.turn,
														ship.id,
														vessel.id,
														ship.structures[i].systems[j].id,
														ship.structures[i].systems[j].shots,
														-1,
														"",
														-1,
														-1
												)
											);
										}
									}
								}
							}
						}
						$("#weaponAimTableWrapper").hide()
						game.draw();
					}
				}
			}
		}
	}
}

function ballisticInterceptionClick(e){
	if (game.getShipById(aShip).userid == game.userid){
		if (game.phase == 2 && aShip){
		var ship = game.getShipById(aShip);
			if (ship.hasWeaponsSelected()){
				var ammo = game.getBallById($(this).data("ammoId"));
				var ammoLoc = ammo.getBaseOffsetPos();
				var ammoTraj = ammo.getTrajectory();
				var shipLoc = ship.getBaseOffsetPos();

				for (var i = 0; i < ship.structures.length; i++){
					for (var j = 0; j < ship.structures[i].systems.length; j++){
						if (ship.structures[i].systems[j].weapon && ship.structures[i].systems[j].selected){
							if (ship.structures[i].systems[j].type != "ballistic"){
								if (ship.structures[i].systems[j].posIsOnArc(shipLoc, ammoTraj, ship.facing)) {
									ship.structures[i].systems[j].setFireOrder(
										new FireOrder(
												0,
												game.turn,
												ship.id,
												ammo.id,
												ship.structures[i].systems[j].id,
												ship.structures[i].systems[j].shots,
												-1,
												"ballIntercept",
												-1,
												-1
										)
									);
								}
							}
						}
					}
				}
				$("#weaponAimTableWrapper").hide()
				game.draw();
			}
		}
	}
}

function ballisticInterceptionHover(e){
	$("#weaponInfo").html("");
	if (aShip){
		e.preventDefault();
		e.stopPropagation();
		//var rect = this.getBoundingClientRect();
		//var pos = new Point(e.clientX - rect.left, e.clientY - rect.top).getOffset();
		var ship = game.getShipById(aShip)
		if (ship.hasWeaponsSelected()){
			var ammo = game.getBallById($(this).data("ammoId"));
			var ammoLoc = ammo.getBaseOffsetPos();
			var ammoTraj = ammo.getTrajectory();
			var shipLoc = ship.getBaseOffsetPos();

			var dist = Math.floor(getDistance(shipLoc, ammoLoc));

			var table = document.getElementById("targetInfo");
				table.innerHTML = "";
			var tr = document.createElement("tr");
			var th = document.createElement("th"); th.colSpan = 2; th.className ="weaponAimHeader";
				th.innerHTML = "Intercepting Ballistic Salvo #" + ammo.id; tr.appendChild(th); table.appendChild(tr);
			var tr = table.insertRow(-1);
				tr.insertCell(-1).textContent = "Base Hit Chance:";
				tr.insertCell(-1).textContent = ammo.getHitChance() + " %";


			var table = document.getElementById("weaponInfo");
				table.innerHTML = "";
			
			var tr = table.insertRow(-1);
				tr.insertCell(-1).textContent = "Weapon";
				tr.insertCell(-1).textContent = "Acc loss";
				tr.insertCell(-1).textContent = "Dmg loss";
				tr.className = "weaponAimHeader";
			table.appendChild(tr);
			
			var validWeapon = false;
				
			for (var i = 0; i < ship.structures.length; i++){
				for (var j = 0; j < ship.structures[i].systems.length; j++){
					if (ship.structures[i].systems[j].weapon && ship.structures[i].systems[j].selected){
						var tr = document.createElement("tr");
						var td = document.createElement("td");
							td.innerHTML = ship.structures[i].systems[j].name + " #" + ship.structures[i].systems[j].id; tr.appendChild(td);
												
						if (ship.structures[i].systems[j].posIsOnArc(shipLoc, ammoLoc, ship.facing)){
							var decay = ship.structures[i].systems[j].getAccurayDecay(dist)

							var td = document.createElement("td");
								td.innerHTML = decay + "%"; tr.appendChild(td);
							var td = document.createElement("td");
								td.innerHTML = ship.structures[i].systems[j].getDamageDecay(dist) + "%"; tr.appendChild(td);
							table.appendChild(tr);
						}
						else {
							var td = document.createElement("td");
								td.colSpan = 5;
								td.innerHTML = "Not in weapon arc";  tr.appendChild(td); table.appendChild(tr);
						}
					}
				}
			}
					
			$("#weaponAimTableWrapper").show()
		}
	}
}

function dmgPhase(e, rect){
	var pos = new Point(e.clientX - rect.left, e.clientY - rect.top).getOffset();
	var ship;
	var index;
	if (aShip){
		ship = game.getShipById(aShip);
		if (game.getShipByClick(pos) == ship){
			ship.unselect();
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
	var pos = new Point(e.clientX - rect.left, e.clientY - rect.top).getOffset();
	console.log("click on " + pos.x + "/" + pos.y);
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

function checkIfOnMovementArc(origin, target){
	var targetCompassHeading = getCompassHeadingOfPoint(origin.getOffsetPos(), target, origin.getPlannedFacingToMove());	
	var start = origin.validMoveArcs.start;
	var end = origin.validMoveArcs.end;
		
	if (isInArc(targetCompassHeading, start, end)){
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