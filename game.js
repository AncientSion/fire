
function Game(id, name, status, userid, turn, phase){
	this.id = id;
	this.name = name;
	this.status = status;
	this.userid = userid;
	this.turn = turn;
	this.phase = phase;
	this.ships = [];
	this.mode = false;
	this.deploying = false;
	this.canSubmit = false;

	this.confirmDeployment = function(){
		if (! this.canSubmit){
			ajax.confirmDeployment();
		}
	}
	
	this.endPhase = function(){
		if (! this.canSubmit){
			if (this.phase == 1){
				var valid = true;
				for (var i = 0; i < this.ships.length; i++){
					if (this.ships[i].userid == this.userid){
						if (this.ships[i].getRemainingImpulse() > 0){
							valid = false;
							break;
						}
					}
				}

				if (valid){
					ajax.confirmMovement();
				}
				else {
					console.log("not all ships rdy yet");
				}
			}
			else if (this.phase == 2){
				ajax.confirmFiringOrders()
			}
		}
	}

	this.initDeployment = function(){
		$("#deployWrapper").draggable();

		var toDo = [];
		var table;

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].deployed == false){
				if (this.ships[i].userid == this.userid){
					toDo.push(this.ships[i]);
				}
			}
		}

		if (toDo.length){
			table = document.getElementById("deployTable");

			for (var i = 0; i < toDo.length; i++){
				var tr = document.createElement("tr");				
					$(tr).data("shipid", toDo[i].id).click(function(e){
						//console.log($(this).data());
						e.preventDefault();
						e.stopPropagation();

						if (game.deploying == $(this).data("shipid")){
							$(this).toggleClass("selected");
							//game.mode = false;
							game.deploying = false;
						}
						else if (!game.deploying){
							$(this).toggleClass("selected");
							//game.mode = -1;
							game.deploying = $(this).data("shipid");
						}
						else {
							return;
						}
					});

				var td = document.createElement("td");
					td.innerHTML = "<img style='width: 50px; height: 50px;' src='shipIcons/omega.png'>";
				//	td.appendChild(img);
				tr.appendChild(td);

				var td = document.createElement("td");
					td.innerHTML = toDo[i].shipClass;
				tr.appendChild(td);

				var td = document.createElement("td");
					td.innerHTML = toDo[i].shipType;
				tr.appendChild(td);

				var td = document.createElement("td");
					td.innerHTML = "0";
				tr.appendChild(td);
				table.appendChild(tr);
			}


				var tr = document.createElement("tr");
					$(tr).click(function(){
						var valid = true;
						for (var i = 0; i < game.ships.length; i++){
							if (game.ships[i].userid == game.userid){
								if (! game.ships[i].deployed){
								valid = false;
								break;
								}
							}
								
						}

						if (valid){
							ajax.confirmDeployment();
						}
						else console.log("nope");
					}).mouseenter(function(){
						$(this).addClass("selected");
					}).mouseleave(function(){
						$(this).removeClass("selected");
					});
				var th = document.createElement("th");
					th.colSpan = 4; 
					$(th).css("padding", 5).css("fontSize", 15)

					th.innerHTML = "Confirm Deployment";
					tr.appendChild(th);
				table.appendChild(tr);
		}
		else {
			$("#deployWrapper").remove();
		}
	}

	this.initFiring = function(){
		this.executeMovement("rdy");
	}

	this.initDamageControl = function(){
		this.resolveFire("rdy");
	}
	
	this.initPhase = function(n){

		$("#turnDiv").html("Turn: " + this.turn);

		if (n == -1){
			this.phase = n;
				$("#phaseDiv").html("Deployment and Initial")
				$("#phaseSwitchDiv").fadeIn(200);
				$("#phaseSwitchDiv").click(function(){
					game.initDeployment();
					$(this).fadeOut(200);
					$("#deployWrapper").fadeIn(200);
				});
		}
		else if (n == 1){
			this.phase = n;
				$("#phaseDiv").html("Movement")
				$("#phaseSwitchDiv").fadeIn(200);
				$("#phaseSwitchDiv").click(function(){
					//game.initDeployment();
					$(this).fadeOut(200);
				});
		}
		else if (n == 2){
			this.phase = n;
				$("#phaseDiv").html("Firing")
				$("#phaseSwitchDiv").fadeIn(200);
				$("#phaseSwitchDiv").click(function(){
					game.initFiring();
					$(this).fadeOut(200);
				});
		}
		else if (n == 3){
			this.phase = n;
				$("#phaseDiv").html("Damage Control")
				$("#phaseSwitchDiv").fadeIn(200);
				$("#phaseSwitchDiv").click(function(){
					game.initDamageControl();
					$(this).fadeOut(200);
				});
		}
	}
	
	this.create = function(){
		for (var i = 0; i < window.ships.length; i++){
			var shipclass = window.ships[i].shipclass;
			var userid = window.ships[i].userid;
			var id = window.ships[i].id;
			var x;
			var y;
			var deployed;
			var friendly;

			if (window.ships[i].status == "deployed"){deployed = true;}else {deployed = false;}
			if (window.ships[i].userid == this.userid){friendly = true;}else {friendly = false;}

			var ship = new window[shipclass](id, shipclass.toLowerCase(), x, y, 0, userid, "blue");
				ship.deployed = deployed;
				ship.friendly = friendly;
				ship.actions = [];

			//turn 1 - deploy move
			//turn 2 - all moves incl turn 1
			//turn 3 - all moves incl turn 2

			// deploy - move - move - move
			//	 1        1      1     2 


			// turn 1
			// phase 0 - MOVE

			if (! friendly){
				if (deployed){
					ship.actions.push(window.ships[i].actions[0]);
					if (this.phase == -1){
						continue;
					}
					else if (this.phase == 1){
						for (var j = 1; j < window.ships[i].actions.length; j++){
							if (window.ships[i].actions[j].turn < game.turn){
								ship.actions.push(window.ships[i].actions[j]);
							}
							else {
								break;
							}
						}
					}
					else if (this.phase == 2 || this.phase == 3){
						ship.actions = window.ships[i].actions;
					}
				}
			}
			else {
				for (var j = 0; j < window.ships[i].actions.length; j++){
					ship.actions.push(window.ships[i].actions[j]);
				}
			}


			ship.create();
			this.ships.push(ship);
		}

		this.initPhase(this.phase);
	}
	
	this.hasShipOnPos = function(pos){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].deployed){
				var shipPos = this.ships[i].getBaseOffsetPos();
				if (shipPos.x < pos.x + this.ships[i].size/3 && shipPos.x > pos.x - this.ships[i].size/3){
					if (shipPos.y > pos.y - this.ships[i].size/3 && shipPos.y < pos.y + this.ships[i].size/3){
						return this.ships[i];
					}
				}
			}
		}	
		return false;
	}
	
	this.posIsOccupied = function(ship, pos){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].x < pos.x + this.ships[i].size/2 && this.ships[i].x > pos.x - this.ships[i].size/2){
				if (this.ships[i].y > pos.y - this.ships[i].size/2 && this.ships[i].y < pos.y + this.ships[i].size/2){
					if (this.ships[i].id != ship.id);
					return true;
				}
			}
		}	
		return false;
	}

	this.getShipByClick = function(pos){
		for (var i = 0; i < game.ships.length; i++){
			var ship = game.ships[i];
			if (ship.deployed){
				var shipPos = this.ships[i].getBaseOffsetPos();
				if (pos.x < shipPos.x + ship.size/3 && pos.x > shipPos.x - ship.size/3){
					if (pos.y > shipPos.y - ship.size/3 && pos.y < shipPos.y + ship.size/3){
						return ship;
					}
				}
			}
		}
	}
	
	this.draw = function(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		//	ctx.moveTo(0, res/2); ctx.lineTo(res, res/2); ctx.stroke();
		//	ctx.moveTo(res/2, 0); ctx.lineTo(res/2, res); ctx.stroke();
		this.drawShips();		
	}
	
	this.drawShips = function(){	
		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].draw();
		}
	}
	
	this.drawOtherShips = function(id){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].id != id){
				this.ships[i].draw();
			}
		}
	}

	this.getShipById = function(id){	
		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].id == id){
				return game.ships[i];
			}
		}
	}
	
	this.getActiveShip = function(){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].selected){
				return this.ships[i];
			}
		}
	}


	
	this.executeMovement = function(callback){
	//	return;
		if (aShip){
			game.getShipById(aShip).unselect();
		}

		//var s = game.ships[1]; game.ships = [s]; console.log("ding");
		
		var frames = 30;
	
		for (var i = 0; i < this.ships.length; i++){

			if (! this.ships[i].deployed){continue;}

			this.ships[i].animationSetup();

			var speed = this.ships[i].getTotalImpulse();
			var frameMod = frames / speed ;
			var moves = 0;
			
			for (var j = 0; j < this.ships[i].actions.length; j++){				
				if (this.ships[i].actions[j].turn == game.turn && this.ships[i].actions[j].type == "move"){
					moves++;
				}
			}
				
			for (var j = 0; j < this.ships[i].actions.length; j++){
				if (this.ships[i].actions[j].turn == game.turn){
					var action = this.ships[i].actions[j];
					//console.log(move);

					if (action.type == "deploy" || action.type == "speedChange"){
						this.ships[i].actions[j].animated = true;
					}
					
					if (j == 0){
						if (action.type == "move"){
							var v = new Vector(this.ships[i].getBaseOffsetPos(), {x: action.x, y: action.y});
								v.t = [0, action.dist * frameMod];
							this.ships[i].actions[j].v = v;
						}
						else if (action.type == "turn"){
							this.ships[i].actions[j].angle = this.ships[i].actions[j].a;
						}
					}
					else {
						if (action.type == "move"){
							var v = new Vector({x: this.ships[i].actions[j-1].x, y: this.ships[i].actions[j-1].y}, {x: action.x, y: action.y});
								v.t = [0, action.dist * frameMod];
							this.ships[i].actions[j].v = v;
							//console.log(v);
						}
						else if (action.type == "turn"){
							this.ships[i].actions[j].angle = this.ships[i].actions[j].a;
						}
					}
				}
			}
		}

		setTimeout(function(callback){
			game.animateMovement(callback);
		}, 500);
	}
	
	this.animateMovement = function(callback){
		
		anim = window.requestAnimationFrame(game.animateMovement.bind(this, callback));
		ctx.clearRect(0, 0, res.x, res.y);
		
		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].deployed){
				for (var j = 0; j < game.ships[i].actions.length; j++){
					var action = game.ships[i].actions[j];
					if (! action.animated){
						if (action.type == "move"){
							//	console.log(game.ships[i].actions[j].v);
							game.ships[i].actions[j].v.t[0] += 1;
							game.ships[i].x += action.v.x * 1 / game.ships[i].actions[j].v.t[1];
							game.ships[i].y += action.v.y * 1 / game.ships[i].actions[j].v.t[1];
							if (game.ships[i].actions[j].v.t[0] >= game.ships[i].actions[j].v.t[1]){
							//	console.log("anim true");
								game.ships[i].actions[j].animated = true;
							}
						}
						else if (action.type == "turn"){
							//	console.log("turn");
								if (action.a > 0){
									game.ships[i].add(5);
									game.ships[i].actions[j].angle -= 5;
								}
								else {
									game.ships[i].add(-5);
									game.ships[i].actions[j].angle += 5;
								}
								
								if (game.ships[i].actions[j].angle == 0){
									game.ships[i].actions[j].animated = true;
								}
							
						/*	if (action.a > 0){
								game.ships[i].add(action.a);
								game.ships[i].actions[j].a = 0;
							}
							else if (action.a < 0) {
								game.ships[i].add(action.a);
								game.ships[i].actions[j].a = 0;
							}
							if (game.ships[i].actions[j].a == 0){
							//	console.log("turn done")
								game.ships[i].actions[j].animated = true;
							}*/
						}
						else if (action.type == "deploy"){
						}
						else if (action.type == "speedChange"){
						}
						
						break;
					}
				}
				game.ships[i].draw();
			}
		}
		
		var done = true;
		
		for (var i = 0; i < game.ships.length; i++){
			if (! done){
				break;
			}
			
			for (var j = 0; j < game.ships[i].actions.length; j++){
				if (! game.ships[i].actions[j].animated){
					done = false;
					break;
				}
			}
		}
		
		if (done){
		//	console.log("all done");

			window.cancelAnimationFrame(anim);
			for (var i = 0; i < game.ships.length; i++){
				if (game.ships[i].deployed){
					game.ships[i].x = Math.floor(game.ships[i].x);
					game.ships[i].y = Math.floor(game.ships[i].y);
				}
			}
		//	console.log(callback);
		}
	}


	this.resolveFire = function(){
			this.getShotDetails();
			this.getAnimationDetails();
			this.animate();
	}

	this.getShotDetails = function(){

	//	fireOrders = [fireOrders[0]];

		for (var i = 0; i < fireOrders.length; i++){
			fireOrders[i].shooter = game.getShipById(fireOrders[i].shooterid);
			fireOrders[i].weapon = fireOrders[i].shooter.getWeaponById(fireOrders[i].weaponid);
			fireOrders[i].guns = fireOrders[i].weapon.guns;
			fireOrders[i].shots = fireOrders[i].weapon.shots;
			fireOrders[i].anim = [];
		}
		
		for (var i = 0; i < fireOrders.length; i++){
			var a = fireOrders[i];
			
			if (fireOrders[i].guns){
				fireOrders[i].target = game.getShipById(a.targetid);
				
				for (var j = 0; j < fireOrders.length; j++){
					var b = fireOrders[j];
					
					if (a.id != b.id){
						if (fireOrders[j].shots){
							if (a.shooterid == b.shooterid){
								if (a.targetid == b.targetid){
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

	this.getAnimationDetails = function(){
		for (var i = 0; i < fireOrders.length; i++){
		//	console.log(fireOrders[i]);
			for (var j = 0; j < fireOrders[i].guns; j++){
				var ox = fireOrders[i].shooter.x + Math.random()*30-15; // GUN origin for all proj
				var oy = fireOrders[i].shooter.y + Math.random()*30-15;
				
				var anims = [];
				
				for (var k = 0; k < fireOrders[i].shots; k++){
					var tx = fireOrders[i].target.x + Math.random()*fireOrders[i].target.size/3 - fireOrders[i].target.size/6; // proj destination on HIT
					var ty = fireOrders[i].target.y + Math.random()*fireOrders[i].target.size/3 - fireOrders[i].target.size/3;
					var hit = true;
					var subAbim = {};
					
					if (fireOrders[i].weapon.animation == "projectile"){
						if (k > fireOrders[i].hits){
							hit = false;
							tx = tx + Math.random()*fireOrders[i].target.size / 1 - fireOrders[i].target.size / 2;
							ty = ty + Math.random()*fireOrders[i].target.size / 1 - fireOrders[i].target.size / 2;
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
					else if (fireOrders[i].weapon.animation == "laser"){
						if (k > fireOrders[i].hits){
							hit = false;
							//console.log(fireOrders[i].target.size);
							var stepX = Math.random()*fireOrders[i].target.size * 1.5 - fireOrders[i].target.size * .75;
							var stepY = Math.random()*fireOrders[i].target.size * 1.5 - fireOrders[i].target.size * .75;
							tx += stepX;
							ty += stepY;
							
							//console.log(stepX, stepY);
						}
						
							var tbx = tx + Math.random()*fireOrders[i].target.size / 2 - fireOrders[i].target.size / 4;
							var tby = ty + Math.random()*fireOrders[i].target.size / 2 - fireOrders[i].target.size / 4;
							
							subAnim = {
								ox: ox,
								oy: oy,
								tax: tx,
								tay: ty,
								tbx: tbx,
								tby: tby,
								t: [0, fireOrders[i].weapon.rakeTime],
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
			fireOrders[i].anim.push(anims);
			}
		}
	}
			

	this.animate = function(){
	
		animation = setInterval(function(){
		
		//	$("#combatLog").show();
			//console.log("ding");
			fxCtx.clearRect(0, 0, res.x, res.y);
			for (var i = 0; i  < fireOrders.length; i++){
				if (! fireOrders[i].animated){
					//console.log("animating fire[" + i + "] for shots: " + fireOrders[i].shots);
					var x, y;
					
					//console.log("animating " + fireOrders[i].anim.length + " guns with " + fireOrders[i].anim[0].length + " shots each.");
					for (var j = 0; j < fireOrders[i].anim.length; j++){
						//console.log(fireOrders[i].anim[j]);
						for (var k = 0; k < fireOrders[i].anim[j].length; k++){
							if (fireOrders[i].weapon.animation == "projectile"){
								if (fireOrders[i].anim[j][k].t[0] < fireOrders[i].anim[j][k].t[1]){ // still to animate
									fireOrders[i].anim[j][k].t[0] += 1;
									if (fireOrders[i].anim[j][k].t[0] > 0){ // t valid, now animate
										x = fireOrders[i].anim[j][k].ox + (fireOrders[i].anim[j][k].v.x * fireOrders[i].anim[j][k].t[0] / fireOrders[i].anim[j][k].t[1]);
										y = fireOrders[i].anim[j][k].oy + (fireOrders[i].anim[j][k].v.y * fireOrders[i].anim[j][k].t[0] / fireOrders[i].anim[j][k].t[1]);
										drawProjectile(fireOrders[i].weapon, x, y);  // PROJ
									}
								}
								else {// animate EXPLO
									if (fireOrders[i].anim[j][k].explo){
										if (fireOrders[i].anim[j][k].explo.t[0] < fireOrders[i].anim[j][k].explo.t[1]){
											fireOrders[i].anim[j][k].explo.t[0] += 10;
											x = fireOrders[i].anim[j][k].ox + fireOrders[i].anim[j][k].v.x;
											y = fireOrders[i].anim[j][k].oy + fireOrders[i].anim[j][k].v.y;	
											drawExplosion(x, y, fireOrders[i].anim[j][k].explo.s * fireOrders[i].anim[j][k].explo.t[0] / fireOrders[i].anim[j][k].explo.t[1]); // EXPLO
										}
										else {
											fireOrders[i].anim[j][k].animated = true;
										}
									}
									else {
										fireOrders[i].anim[j][k].animated = true;
									}
								}
							}
							else if (fireOrders[i].weapon.animation == "laser"){
							//	console.log("laser");
							//	console.log(fireOrders[i].anim);
								fireOrders[i].anim[j][k].t[0] += 1;
								x = fireOrders[i].anim[j][k].tax + (fireOrders[i].anim[j][k].v.x * fireOrders[i].anim[j][k].t[0] / fireOrders[i].anim[j][k].t[1]);
								y = fireOrders[i].anim[j][k].tay + (fireOrders[i].anim[j][k].v.y * fireOrders[i].anim[j][k].t[0] / fireOrders[i].anim[j][k].t[1]);
								drawBeam(fireOrders[i].weapon, fireOrders[i].anim[j][k].ox, fireOrders[i].anim[j][k].oy, x, y); // BEAM
								if (fireOrders[i].anim[j][k].explo){
									fireOrders[i].anim[j][k].explo.t[0] = fireOrders[i].anim[j][k].explo.t[1];		
									var size = Math.random() * 3 +4;
								//	drawExplosion(x, y, fireOrders[i].anim[j][k].explo.s); // EXPLO
									drawExplosion(x, y, size) // EXPL
								}
								if (fireOrders[i].anim[j][k].t[0] == fireOrders[i].anim[j][k].t[1]){
									fireOrders[i].anim[j][k].animated = true;
								}
							}
						}
					}
					
					var allAnimated = true;
					for (var j = 0; j < fireOrders[i].anim.length; j++){
						for (var k = 0; k < fireOrders[i].anim[j].length; k++){
							if (! fireOrders[i].anim[j][k].animated){
								allAnimated = false;
								break;
							}
						}
						if (!allAnimated){
							break;
						}
					}
					
					if (allAnimated){
						fireOrders[i].animated = allAnimated;
						//createLogEntry(fireOrders[i]);
					}
				
					break;
				}
			}
			
			
			var done = true
			
			for (var i = 0; i  < fireOrders.length; i++){
				if (! fireOrders[i].animated){
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

	this.createLogEntry = function(fire){
		
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

	
	this.create();
}

