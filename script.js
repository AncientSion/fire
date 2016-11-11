

preloadShips();
preloadFactions();
$(window).on("load", function() {
	init();
});

function init(){
	$("#mouseCanvas").mousemove(canvasMouseMove);
	$("#mouseCanvas").bind('mousewheel DOMMouseScroll', mouseCanvasZoom)
	$("#mouseCanvas").bind('contextmenu', mouseCanvasScroll)
	$("#mouseCanvas").bind('contextmenu', canvasMouseRightClick)
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
//	console.log("ding");
	e.preventDefault();
	var rect = this.getBoundingClientRect();		
	var pos = new Point(e.clientX - rect.left, e.clientY - rect.top);
	if (game && !aShip){
		cam.doScroll(pos);
		game.draw();
	}	
}

function canvasMouseMove(e){
	e.preventDefault();
	e.stopPropagation();
	var rect = this.getBoundingClientRect();
	var pos = new Point(e.clientX - rect.left, e.clientY - rect.top);
	
//	console.log(pos);
	//$("#currentPos").html( (pos.x + cam.o.x) + " / " + (pos.y + cam.o.y) );
	$("#currentPos").html( pos.x + " / " + pos.y + "________" + cam.o.x + " / " + cam.o.y);
	
	//var vessel = game.hasShipOnPos(pos.getOffset());
	var vessel = game.hasShipOnPos(pos);
	if (vessel){
		if (! aShip){
		vessel.displayShortInfo();
		}
		else if (aShip){
			if (aShip != vessel.id){
				vessel.displayShortInfo();
			}
		}
	}
	else if (shortInfo){
		document.getElementById(shortInfo + "shortInfo").className = "shortInfo disabled";
		shortInfo = false;
	}
	 
	if (aShip){
		var ship = game.getShipById(aShip);
		var shipLoc = ship.getOffsetPos();
		var facing = ship.getPlannedFacingToMove();
		var dist = Math.floor(getDistance(shipLoc, pos));
		var angle = getAngleFromTo(shipLoc, pos);
			angle = addAngle(angle, -facing);

		drawVector(shipLoc, pos.getOffset(), dist, angle);
		
		if (ship.hasWeaponsSelected()){
			//ship.highlightAllSelectedWeapons();
			
			var valid = false;			
			var table = document.getElementById("weaponAimTable");
				table.innerHTML = "";
				
			if (vessel){
				dist = Math.floor(getDistance(shipLoc, vessel.getOffsetPos()));
				angle = getAngleFromTo(vessel.getOffsetPos(), shipLoc);
				angle = addAngle(angle, -vessel.getPlannedFacingToMove());
				//console.log(angle);

				//var section = vessel.getHitSectionFromAngle(angle); console.log(section);
				var baseHit = vessel.getHitChanceFromAngle(angle);

				var tr = document.createElement("tr");
				var th = document.createElement("th"); th.colSpan = 5; th.className ="weaponAimHeader";
					th.innerHTML = "ACTIVE TARGET"; tr.appendChild(th); table.appendChild(tr);
				var tr = document.createElement("tr");
				var th = document.createElement("th"); th.colSpan = 5; th.className ="weaponAimHeader";
					th.innerHTML = vessel.shipClass + " " + vessel.id + " ----- " + baseHit + "%"; tr.appendChild(th); table.appendChild(tr);
			}
				var tr = document.createElement("tr");
				var th = document.createElement("th"); th.innerHTML = "Weapon"; tr.appendChild(th);
				var th = document.createElement("th"); th.innerHTML = "Acc loss"; tr.appendChild(th);
				var th = document.createElement("th"); th.innerHTML = "Dmg loss"; tr.appendChild(th);
			/*if (vessel){
				var th = document.createElement("th"); th.innerHTML = "End Acc"; tr.appendChild(th);
				var th = document.createElement("th"); th.innerHTML = "End Dmg"; tr.appendChild(th);
			}*/
			table.appendChild(tr);
			
			var validWeapon = false;
				
			for (var i = 0; i < ship.structures.length; i++){
				for (var j = 0; j < ship.structures[i].systems.length; j++){
					if (ship.structures[i].systems[j].selected){
						var tr = document.createElement("tr");
						var td = document.createElement("td");
							td.innerHTML = ship.structures[i].systems[j].name + " #" + ship.structures[i].systems[j].id; tr.appendChild(td);
						
						var valid = false;
						if (vessel){
							if (ship.structures[i].systems[j].posIsOnArc(shipLoc, vessel.getOffsetPos(), facing)) {
								valid = true;
								validWeapon = true;
							}
						}
						else if (!vessel){
							if (ship.structures[i].systems[j].posIsOnArc(shipLoc, pos, facing)){
								valid = true;
								validWeapon = true;
							}
						}
						
						if (valid){
							var decay = ship.structures[i].systems[j].getAccurayDecay(dist)

							var td = document.createElement("td");
								td.innerHTML = decay + "%"; tr.appendChild(td);
							var td = document.createElement("td");
								td.innerHTML = ship.structures[i].systems[j].getDamageDecay(dist) + "%"; tr.appendChild(td);
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
				.css("left", pos.x - 140)
				.css("top", pos.y + 70)
				.show();
			}
			else {
				$(wrapper).hide();
			}
		}
	}
	else if (game.deploying){
		$("#deployOverlay").html("Deploy at cursor position")
		.css("left", pos.x - 70 + "px")
		.css("top", pos.y + 60 + "px")
		.show();
		moveCtx.clearRect(0, 0, res.x, res.y);
		moveCtx.drawImage(game.getShipById(game.deploying).img, pos.x - 25, pos.y + 10, 50, 50);
	}
	else if (!game.deploying){
		$("#deployOverlay").hide();
	}
}

function canvasMouseRightClick(e){
	e.preventDefault();
	if (aShip){
		ship = game.getShipById(aShip);
		ship.unselect();
		return;
	}
}





function canvasMouseClick(e){
	var rect = this.getBoundingClientRect();		
	var pos = new Point(e.clientX - rect.left, e.clientY - rect.top);
	var ship;
	var index;

	if (game.phase == -1){ // DEPLOY
		if (game.deploying){
			for (var i = 0; i < game.ships.length; i++){
				if (game.ships[i].id == game.deploying){
					var index = i;
					break;
				}
			}
			if (game.ships[index].canDeploy(pos.getOffset())){
				game.ships[index].doDeploy(pos);
			}
		}
		else if (!game.deploying){
			if (aShip){
				ship = game.getShipById(aShip);
				for (var i = 0; i < game.ships.length; i++){
					if (game.ships[i].id == aShip){
						var index = i;
						break;
					}
				}
				if (game.getShipByClick(pos) == ship){
					ship.unselect();
					return;
				}
			}
			else {
				ship = game.getShipByClick(pos);
				if (ship){
					ship.select();
					if (ship.actions[0].turn == game.turn){
						game.enableDeployment(ship.id);
					}
					return;
				}
			}
		}
	}
	else if (game.phase == 1){// MOVE PHASE
		if (aShip){
			ship = game.getShipById(aShip);
			if (game.getShipByClick(pos) == ship){
				ship.unselect();
				return;
			}
		}
		else {
			ship = game.getShipByClick(pos);
			if (ship){
				ship.select();
				return;
			}
		}
	
		if (game.mode == 1){ //no active weapon but ship active -> MOVE MODE
			//drawVector(ship.getOffsetPos(), pos);
			if (ship.maxVector){ // straight max vector movement
				if (clickedOn(pos, ship.maxVector)){
					ship.moveToMaxVector(pos);
					return;
				}
			}
			if (ship.maxTurnVector){ // move to next turn chance vector
				if (clickedOn(pos, ship.maxTurnVector)){
					ship.moveToMaxTurnVector(pos);
					return;
				}
			}		
			if (checkIfOnMovementArc(ship, pos)){ //check if clicked to move in movement arc
				if (! game.posIsOccupied(ship, pos)){
					var dist = Math.floor(getDistance(ship.getOffsetPos(), pos));
					if (dist < ship.getRemainingImpulse()){
						ship.issueMove(pos, dist);
						return;
					}
				}
				else {console.log("occupied");}
			}
		}
	}
	else if (game.phase == 2){// FIRE PHASE
		if (! aShip){
			ship = game.getShipByClick(pos);
			if (ship){
				ship.select();
				return;
			}
		}
		else {
			var clickShip = game.getShipByClick(pos);
			if (clickShip){
				if (clickShip.id != aShip){
					var ship = game.getShipById(aShip)
					var shipLoc = ship.getOffsetPos();
					var facing = ship.getPlannedFacingToMove();
					var dist = Math.floor(getDistance(shipLoc, {x: clickShip.x, y: clickShip.y}));
						angle = getAngleFromTo(clickShip.getOffsetPos(), shipLoc);
						angle = addAngle(angle, -clickShip.getPlannedFacingToMove());
					var baseHit = clickShip.getHitChanceFromAngle(angle);

					console.log(baseHit);


					
					if (clickShip){
						if (ship.hasWeaponsSelected()){
							for (var i = 0; i < ship.structures.length; i++){
								for (var j = ship.structures[i].systems.length-1; j >= 0; j--){
									if (ship.structures[i].systems[j].selected){
										if (ship.structures[i].systems[j].posIsOnArc(shipLoc, clickShip.getOffsetPos(), facing)){
											// FireOrder(id, turn, shooterId, targetId, weaponId, req, notes, hits, resolved){
											ship.structures[i].systems[j].setFireOrder(
												new FireOrder(
														0,
														game.turn,
														ship.id,
														clickShip.id,
														ship.structures[i].systems[j].id,
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
							$("#weaponAimTableWrapper").hide()
						}
					}
				}
				else {
					clickShip.unselect();
					return;
				}
			}
		}
	}
	else if (game.phase == 3){// FIRE ANIM AND DAMAGE CONTROL
		if (aShip){
			ship = game.getShipById(aShip);
			if (game.getShipByClick(pos) == ship){
				ship.unselect();
				return;
			}
		}
		else {
			ship = game.getShipByClick(pos);
			if (ship){
				ship.select();
				return;
			}
		}
	}
}

function checkWeaponHighlight(ele, weaponId){
	if (ele.className == "weapon"){
		for (var i = 0; i < game.ships.length; i++){
			for (var j = 0; j < game.ships[i].weapons.length; j++){
				if (game.ships[i].weapons[j].id == weaponId){
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

function popup(text){
	$("#popupText").html(text).show();
	$("#popupWrapper").show();
}