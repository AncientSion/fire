

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
						td.innerHTML = ship.weapons[i].name; tr.appendChild(td);
					
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
		.css("top", pos.y + 120 + "px")
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
									if (ship.weapons[i].posIsOnArc(shipLoc, {x: clickShip.x, y: clickShip.y}, facing)){
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
	
	if (ele.className == "weapon fireOrder"){
		for (var i = 0; i < ship.weapons.length; i++){
			if (ship.weapons[i].id == id){
				ship.weapons[i].selected = true;
				ele.className = "weapon selected";
				break;
			}
		}
		for (var i = fireOrders.length-1; i >= 0; i--){
			if (fireOrders[i].weaponId == id){
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
	var targetCompassHeading = getCompassHeadingOfPoint(origin.getOffsetPos(), target, facing);	
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

function resolveFire(){

	if (game.phase != 2){
		return;
	}
	else {
		$("#weaponAimTableWrapper").hide();
		if (aShip){
			$("#" + aShip + "shortInfo").addClass("disabled");
			shortInfo = false;
			game.getShipById(aShip).unselect();
			aShip = false;
		}
		
		getShotDetails();
		rollForHit();
		getAnimationDetails();
		//console.log(fire); return;
		animate();
	}
}

function getShotDetails(){
	
	for (var i = 0; i < fireOrders.length; i++){
		fireOrders[i].shooter = game.getShipById(fireOrders[i].shooterId);
		fireOrders[i].weapon = fireOrders[i].shooter.getWeaponById(fireOrders[i].weaponId);
		fireOrders[i].guns = fireOrders[i].weapon.guns;
		fireOrders[i].shots = fireOrders[i].weapon.shots;
	}
	
	for (var i = 0; i < fireOrders.length; i++){
		var a = fireOrders[i];
		
		if (fireOrders[i].guns){
			fireOrders[i].target = game.getShipById(a.targetId);
			
			for (var j = 0; j < fireOrders.length; j++){
				var b = fireOrders[j];
				
				if (a.id != b.id){
					if (fireOrders[j].shots){
						if (a.shooterId == b.shooterId){
							if (a.targetId == b.targetId){
								if (a.weapon.name == b.weapon.name){
									fireOrders[i].guns += fireOrders[j].guns;
									fireOrders[j].guns = 0;
								}
							}
						}
					}
				}
			}
		}
	}
}

function rollForHit(){
	for (var i = 0; i < fireOrders.length; i++){
		if (fireOrders[i].guns){
			var req = fireOrders[i].target.getBaseHitChance() - fireOrders[i].weapon.getAccurayDecay(getDistance(fireOrders[i].shooter, fireOrders[i].target));
	//	console.log(req);
			
			if (req > 0){
				for (j = 0; j < fireOrders[i].guns; j++){
					var hitEle = [];
					
					for (var k = 0; k < fireOrders[i].shots; k++){
						var roll = Math.floor(Math.random()*100);					
						var element = {req: req, roll: roll}					
						hitEle.push(element);
					}
					
					fireOrders[i].gunRolls.push(hitEle);
				}
			
				fire.push(fireOrders[i]);
			}
		}
	}
}


function getAnimationDetails(){
	for (var i = 0; i < fire.length; i++){
		for (var j = 0; j < fire[i].guns; j++){
			var ox = fire[i].shooter.x + Math.random()*30-15; // GUN origin for all proj
			var oy = fire[i].shooter.y + Math.random()*30-15;
			
			var anims = [];
			
			for (var k = 0; k < fire[i].shots; k++){
				var tx = fire[i].target.x + Math.random()*fire[i].target.size/3 - fire[i].target.size/6; // proj destination on HIT
				var ty = fire[i].target.y + Math.random()*fire[i].target.size/3 - fire[i].target.size/3;
				var hit = true;
				var subAbim = {};
				
				if (fire[i].weapon.animation == "projectile"){
					if (fire[i].gunRolls[j][k].roll > fire[i].gunRolls[j][k].req){
						hit = false;
						tx = tx + Math.random()*fire[i].target.size / 1 - fire[i].target.size / 2;
						ty = ty + Math.random()*fire[i].target.size / 1 - fire[i].target.size / 2;
					}
						subAnim = {
							ox: ox,
							oy: oy,
							tx: tx,
							ty: ty,
							t: [0 - (j*10 + k*5), 100],
							hit: hit,
							v: new Vector({x: ox, y: oy}, {x: tx, y: ty}),
							explo: false,
							animated: false
						}
				}
				else if (fire[i].weapon.animation == "laser"){
					if (fire[i].gunRolls[j][k].roll > fire[i].gunRolls[j][k].req){
						hit = false;
						//console.log(fire[i].target.size);
						var stepX = Math.random()*fire[i].target.size * 1.5 - fire[i].target.size * .75;
						var stepY = Math.random()*fire[i].target.size * 1.5 - fire[i].target.size * .75;
						tx += stepX;
						ty += stepY;
						
						//console.log(stepX, stepY);
					}
					
						var tbx = tx + Math.random()*fire[i].target.size / 2 - fire[i].target.size / 4;
						var tby = ty + Math.random()*fire[i].target.size / 2 - fire[i].target.size / 4;
						
						subAnim = {
							ox: ox,
							oy: oy,
							tax: tx,
							tay: ty,
							tbx: tbx,
							tby: tby,
							t: [0, fire[i].weapon.rakeTime],
							hit: hit,
							v: new Vector({x: tx, y: ty}, {x: tbx, y: tby}),
							explo: false,
							animated: false
					}
				}
				
				if (hit){
					subAnim.explo = {t: [0, 100], s: 6};
				}
//				console.log(subAnim);
			
			anims.push(subAnim);
			}
		fire[i].anim.push(anims);
		}
	}
}
		


function animate(){
	
	animation = setInterval(function(){
	
		$("#combatLog").show();
	//	console.log("ding");
		fxCtx.clearRect(0, 0, res.x, res.y);
		for (var i = 0; i  < fire.length; i++){
			if (! fire[i].animated){
			//	console.log("animating fire[" + i + "] for shots: " + fire[i].shots);
				var x, y;
				
		//		console.log("animating " + fire[i].anim.length + " guns with " + fire[i].anim[0].length + " shots each.");
				for (var j = 0; j < fire[i].anim.length; j++){
			//		console.log(fire[i].anim[j]);
					for (var k = 0; k < fire[i].anim[j].length; k++){
						if (fire[i].weapon.animation == "projectile"){
							if (fire[i].anim[j][k].t[0] < fire[i].anim[j][k].t[1]){ // still to animate
								fire[i].anim[j][k].t[0] += 1;
								if (fire[i].anim[j][k].t[0] > 0){ // t valid, now animate
									x = fire[i].anim[j][k].ox + (fire[i].anim[j][k].v.x * fire[i].anim[j][k].t[0] / fire[i].anim[j][k].t[1]);
									y = fire[i].anim[j][k].oy + (fire[i].anim[j][k].v.y * fire[i].anim[j][k].t[0] / fire[i].anim[j][k].t[1]);
									drawProjectile(fire[i].weapon, x, y);  // PROJ
								}
							}
							else {// animate EXPLO
								if (fire[i].anim[j][k].explo){
									if (fire[i].anim[j][k].explo.t[0] < fire[i].anim[j][k].explo.t[1]){
										fire[i].anim[j][k].explo.t[0] += 10;
										x = fire[i].anim[j][k].ox + fire[i].anim[j][k].v.x;
										y = fire[i].anim[j][k].oy + fire[i].anim[j][k].v.y;	
										drawExplosion(x, y, fire[i].anim[j][k].explo.s * fire[i].anim[j][k].explo.t[0] / fire[i].anim[j][k].explo.t[1]); // EXPLO
									}
									else {
										fire[i].anim[j][k].animated = true;
									}
								}
								else {
									fire[i].anim[j][k].animated = true;
								}
							}
						}
						else if (fire[i].weapon.animation == "laser"){
							fire[i].anim[j][k].t[0] += 1;
							x = fire[i].anim[j][k].tax + (fire[i].anim[j][k].v.x * fire[i].anim[j][k].t[0] / fire[i].anim[j][k].t[1]);
							y = fire[i].anim[j][k].tay + (fire[i].anim[j][k].v.y * fire[i].anim[j][k].t[0] / fire[i].anim[j][k].t[1]);
							drawBeam(fire[i].weapon, fire[i].anim[j][k].ox, fire[i].anim[j][k].oy, x, y); // BEAM
							if (fire[i].anim[j][k].explo){
								fire[i].anim[j][k].explo.t[0] = fire[i].anim[j][k].explo.t[1];		
								var size = Math.random() * 3 +4;
							//	drawExplosion(x, y, fire[i].anim[j][k].explo.s); // EXPLO
								drawExplosion(x, y, size) // EXPL
							}
							if (fire[i].anim[j][k].t[0] == fire[i].anim[j][k].t[1]){
								fire[i].anim[j][k].animated = true;
							}
						}
					}
				}
				
				var allAnimated = true;
				for (var j = 0; j < fire[i].anim.length; j++){
					for (var k = 0; k < fire[i].anim[j].length; k++){
					//	console.log(fire[i].anim[j]);
						if (! fire[i].anim[j][k].animated){
							allAnimated = false;
							break;
						}
					}
					if (!allAnimated){
						break;
					}
				}
				
				if (allAnimated){
					fire[i].animated = allAnimated;
					createLogEntry(fire[i]);
				}
			
				break;
			}
		}
		
		
		var done = true
		
		for (var i = 0; i  < fire.length; i++){
			if (! fire[i].animated){
				done = false;
			}
		}
		
		if (done){
			console.log("done");
			clearInterval(animation);
			fxCtx.clearRect(0, 0, res.x, res.y);
		}
		
	}, 30);
}

function createLogEntry(fire){
	
	for (var i = 0; i < fire.guns; i++){
		var hits = 0;
		for (var j = 0; j < fire.shots; j++){
			if(fire.anim[i][j].hit){
				hits++;
			}
		}
	}
	
	var string = "FIRE:";
		string += " shooter: " + fire.shooterId;
		string += ", target: " + fire.targetId;
		string += "Gun " + i + " firing " + fire.shots + " shots, hits: " + hits;
		
	var span = document.createElement("span");
		span.innerHTML = string;
	
	var combatLog = $("#combatLog");
		combatLog.append(span);
		combatLog.append("</br>");
}

function refire(){
	for (var i = 0; i  < fire.length; i++){
		fire[i].animated = false;
	
		for (var j = 0; j  < fire[i].anim.length; j++){
			for (var k = 0; k  < fire[i].anim[j].length; k++){
				fire[i].anim[j][k].t[0] = 0;
				fire[i].anim[j][k].animated = false;
				
				if (fire[i].anim[j][k].explo){
					fire[i].anim[j][k].explo.t[0] = 0;
				}
			}
		}
	}

	animate();
				
}
