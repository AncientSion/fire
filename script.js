

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
	game.draw();
}

function getFireOrderId(){
	return fireOrders.length+1;
}

function executeAll(){
	if (game){
		game.executeAll();
	}
}

function endPhase(){
	game.endPhase();
}

function endTurn(){
	if (game){
		game.endTurn();
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
				//console.log(angle);
				angle = addAngle(angle, -vessel.getPlannedFacingToMove());
				//console.log(angle);

				var tr = document.createElement("tr");
				var th = document.createElement("th"); th.colSpan = 5; th.style.color = "red";
					th.innerHTML = "<b>Targeting: " + vessel.shipClass + ", #" + vessel.id; tr.appendChild(th); table.appendChild(tr);
			}
				var tr = document.createElement("tr");
				var th = document.createElement("th"); th.innerHTML = "Weapon"; tr.appendChild(th);
				var th = document.createElement("th"); th.innerHTML = "Acc loss"; tr.appendChild(th);
				var th = document.createElement("th"); th.innerHTML = "Dmg loss"; tr.appendChild(th);
			if (vessel){
				var th = document.createElement("th"); th.innerHTML = "End Acc"; tr.appendChild(th);
				var th = document.createElement("th"); th.innerHTML = "End Dmg"; tr.appendChild(th);
			}
			table.appendChild(tr);
			
			var validWeapon = false;
				
			for (var i = 0; i < ship.weapons.length; i++){
				if (ship.weapons[i].selected){
					var tr = document.createElement("tr");
					var td = document.createElement("td");
						td.innerHTML = ship.weapons[i].name + " #" + ship.weapons[i].id; tr.appendChild(td);
					
					var valid = false;
					if (vessel){
						if (ship.weapons[i].posIsOnArc(shipLoc, vessel.getOffsetPos(), facing)) {
							valid = true;
							validWeapon = true;
						}
					}
					else if (!vessel){
						if (ship.weapons[i].posIsOnArc(shipLoc, pos, facing)){
							valid = true;
							validWeapon = true;
						}
					}
					
					if (valid){
						var td = document.createElement("td");
							td.innerHTML = ship.weapons[i].getAccurayDecay(dist) + "%"; tr.appendChild(td);
						var td = document.createElement("td");
							td.innerHTML = ship.weapons[i].getDamageDecay(dist) + "%"; tr.appendChild(td);
						if (vessel){
								//	console.log(vessel.getHitChanceFromAngle(angle));
								//	console.log(ship.weapons[i].getAccurayDecay(dist));

							var td = document.createElement("td");
								td.innerHTML = vessel.getHitChanceFromAngle(angle) /* - ship.weapons[i].getAccurayDecay(dist) */ + "%"; tr.appendChild(td);
							var td = document.createElement("td");
								td.innerHTML = ship.weapons[i].getExpectedDamage(dist); tr.appendChild(td);
						}
						table.appendChild(tr);
					}
					else {
						var td = document.createElement("td");
							if (vessel){td.colSpan = 5;} else {td.colSpan = 3;}
							td.innerHTML = "Not in weapon arc";  tr.appendChild(td); table.appendChild(tr);
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
		$("#deployOverlay").html("Deploy craft </br> at curser position")
		.css("left", pos.x - 30 + "px")
		.css("top", pos.y + 40 + "px")
		.show();
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
			game.ships[i].doDeploy(pos);
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
				else {
					for (var i = 0; i < ship.turns.length; i++){
						var turn = ship.turns[i];
						if (clickedOn(pos, turn)){
							game.ships[index].issueDeploymentTurn(turn);
							return;
						}
					}
				
					game.ships[index].doDeploy(pos);
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


			
			if (ship.undoOrderButton){
				if (clickedOn(pos, ship.undoOrderButton)){
					ship.undoLastOrder();
					return;
				}
			}
			if (ship.impulseAdjust.length){ // adjust speed
				for (var i = 0; i < ship.impulseAdjust.length; i++){
					if (clickedOn(pos, ship.impulseAdjust[i])){
						ship.doAdjustImpulse(ship.impulseAdjust[i]);
						return;
					}
				}
			}
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
			else { // check if click on turn buttons
				for (var i = 0; i < ship.turns.length; i++){
					var turn = ship.turns[i];
					if (turn.thrustUp){
						if (clickedOn(pos, turn.thrustUp)){
							ship.issueShortenTurnDelay(i);
							return;
						}
					}
					if (turn.thrustDown){
						if (clickedOn(pos, turn.thrustDown)){
							ship.cancelShortenTurnDelay(i);
							return
						}
					}
					if (clickedOn(pos, turn)){
						ship.issueTurn(turn);
						return;
					}
				}
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
					
					if (clickShip){
						if (ship.hasWeaponsSelected()){
							for (var i = ship.weapons.length-1; i >= 0; i--){
								if (ship.weapons[i].selected){
									if (ship.weapons[i].posIsOnArc(shipLoc, clickShip.getOffsetPos(), facing)){
									//	fireOrders.push(new FireOrder(ship.id, clickShip.id, ship.weapons[i].id, dist));
										fireOrders.push( {shooterid: ship.id, targetid: clickShip.id, weaponid: ship.weapons[i].id} );
										ship.weapons[i].setFireOrder();
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

function selectWeapon(ele){
	var ship = game.getShipById(aShip);
	var id = $(ele).data("weaponId");

	console.log(ship);
	console.log(id);
	
	if (ele.className == "weapon fireOrder"){
		for (var i = 0; i < ship.weapons.length; i++){
			if (ship.weapons[i].id == id){
				ship.weapons[i].selected = true;
				ele.className = "weapon selected";
				break;
			}
		}
		for (var i = fireOrders.length-1; i >= 0; i--){
			if (fireOrders[i].weaponid == id){
				fireOrders.splice(i, 1);
				break;
			}
		}
	}
	else if (ele.className == "weapon"){
		for (var i = 0; i < ship.weapons.length; i++){
			if (ship.weapons[i].id == id){
				ship.weapons[i].selected = true;
				ele.className = "weapon selected";
				break;
			}
		}
	}
	else {
		for (var i = 0; i < ship.weapons.length; i++){
			if (ship.weapons[i].id == id){
				ship.weapons[i].selected = false;
				ele.className = "weapon";
				break;
			}
		}
	}
	
	if (ship.hasWeaponsSelected()){
		game.mode = 2;
		ship.highlightAllSelectedWeapons();
	}
	else {
		$("#weaponAimTableWrapper").hide();
		game.mode = 1;
		fxCtx.clearRect(0, 0, res.x, res.y);
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