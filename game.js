
function Game(id, name, status, userid, turn, phase){
	this.id = id;
	this.name = name;
	this.status = status;
	this.userid = userid;
	this.turn = turn;
	this.phase = phase;
	this.ships = [];
	this.fireOrders = []
	this.mode = false;
	this.deploying = false;
	this.canSubmit = false;
	this.index = 1;
	this.reinforcePoints = 0;
	this.reinforcements = [];
	this.confirmedReinforcments = false;
	this.animating = false;
	this.deployArea = false;
	this.deployBlock = [];
	this.vector = false;
	
	this.endPhase = function(){
		if (this.canSubmit){
			if (this.phase == -1){
				var valid = true;
				for (var i = 0; i < this.ships.length; i++){
					if (this.ships[i].userid == this.userid){
						if (! this.ships[i].deployed){
							if (this.ships[i].available <= this.turn){
								valid = false;
								break;
							}
						}
					}
				}
				if (valid){
					ajax.confirmDeployment(goToLobby);
				}
				else {
					popup("You need to deploy all arriving vessels.");
				}
			}
			if (this.phase == 1){ // MOVEMENT
				for (var i = 0; i < this.ships.length; i++){
					if (this.ships[i].userid == this.userid){
						if (this.ships[i].getRemainingImpulse() > 0){
							console.log(this.ships[i]);
							popup("You have ships with unused impulse.");
							return;
						}
					}
				}
				ajax.confirmMovement(goToLobby);
			}
			else if (this.phase == 2){ // 
				ajax.confirmFiringOrders(goToLobby);
			}
			else if (this.phase == 3){
				ajax.confirmDamageControl(goToLobby);
			}
		}
		else {
			popup("You have already confirmed your orders");
		}
	}

	this.enableDeployment = function(shipid){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].id == shipid){
				this.setupDeploymentZone(this.ships[i]);
				this.deploying = shipid;
				return;
			}
		}
	}

	this.disableDeployment = function(){
		this.deploying = false;
		this.deployArea = false;
		this.deployBlock = false;
		moveCtx.clearRect(0, 0, res.x, res.y);
		fxCtx.clearRect(0, 0, res.x, res.y);
		$("#deployOverlay").hide();
	}

	this.setupDeploymentZone = function(ship){
		if (game.turn == 1){	
			var area = {
				type: "rect",
				x: 0 + (ship.userid-1)*res.x/2 + (ship.userid-1)*350,
				y: 0,
				w: 250,
				h: res.y
			}
		}
		else {
			var area = {
				type: "circle",
				x: range(res.x/2 * (ship.userid-1) + ship.size, res.x/2 * ship.userid - ship.size),
				y: range(0 + ship.size, res.y - ship.size),
				s: ship.size
			}
		}
		this.deployArea = area;
		this.drawDeploymentArea(area)
	}

	this.drawDeploymentArea = function(){
		var area = this.deployArea;
		console.log(area);

		if (area.type == "circle"){
			fxCtx.beginPath();
			fxCtx.arc(area.x+cam.o.x, area.y+cam.o.y, area.s, 0, 2*Math.PI, false);
			fxCtx.closePath();
			fxCtx.fillStyle = "green";
			fxCtx.globalAlpha  = 0.3;
			fxCtx.fill();
			fxCtx.opacity = 1;
		}
		else {
			fxCtx.beginPath();
			fxCtx.rect(area.x+cam.o.x, area.y + cam.o.y, area.w, area.h);
			fxCtx.closePath();
			fxCtx.fillStyle = "green";
			fxCtx.globalAlpha  = 0.3;
			fxCtx.fill();
			fxCtx.opacity = 1;
		}
	}

	this.drawDeploymentBlock = function(x, y, s){
		fxCtx.beginPath();
		fxCtx.arc(x+cam.o.x, y+cam.o.y, s, 0, 2*Math.PI, false);
		fxCtx.closePath();
		fxCtx.fillStyle = "red";
		fxCtx.globalAlpha  = 0.4;
		fxCtx.fill();
		fxCtx.opacity = 1;
	}

	this.createDeploymentTable = function(){
		var toDo = [];
		var table;

		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].deployed == false){
				if (this.ships[i].userid == this.userid){
					toDo.push(this.ships[i]);
				}
			}
		}
		for (var i = 0; i < window.incoming.length; i++){
			if (window.incoming[i].userid == this.userid){
				toDo.push(window.incoming[i]);
			}
		}

		if (toDo.length){
			table = document.getElementById("deployTable");

			for (var i = 0; i < toDo.length; i++){
				var available = false;
				if (toDo[i].available <= this.turn){
					available = true;
				}

				var tr = document.createElement("tr");

				if (available){
					$(tr).data("shipid", toDo[i].id).click(function(e){
						//console.log($(this).data());
						e.preventDefault();
						e.stopPropagation();

						if (game.deploying == $(this).data("shipid")){
							$(this).toggleClass("selected");
							game.disableDeployment();
						}
						else if (!game.deploying){
							$(this).toggleClass("selected");
							game.enableDeployment($(this).data("shipid"));
						}
						else {
							return;
						}
					});
				}

				var td = document.createElement("td");
					td.innerHTML = "<img class='img50' src='shipIcons/"+toDo[i].shipClass.toLowerCase() + ".png'>";
				//	td.appendChild(img);
				tr.appendChild(td);

				var td = document.createElement("td");
					td.innerHTML = toDo[i].shipClass;
				tr.appendChild(td);

				var td = document.createElement("td");
					td.colSpan = 2;
					td.innerHTML = (toDo[i].available - this.turn) + " turn/s";
					if (available){td.className = "shipAvailable";}else{td.className = "shipUnavailable";}
					
				tr.appendChild(td);
				table.appendChild(tr);
			}
		}
	}

	this.initDeployment = function(){
		$("#deployWrapper").removeClass("disabled");
	}

	this.initFiring = function(){
		this.resolveMovement(game.movementResolved);
	}

	this.movementResolved = function(){
		console.log("movementResolved");
	}

	this.initDamageControl = function(){
		this.resolveFire();
	}

	this.fireResolved = function(){
		console.log("fireResolved");
	}
	
	this.initPhase = function(n){

		$("#turnDiv").html("Turn: " + this.turn);
		this.createDeploymentTable();

		if (n == -1){
			this.phase = n;
				$("#phaseDiv").html("Deployment and Initial")
				$("#phaseSwitchDiv").fadeIn(200);
				$("#phaseSwitchDiv").click(function(){
					//game.initDeployment();
					$(this).fadeOut(200);
					$("#deployWrapper").fadeIn(200);
				});
		}
		else if (n == 1){
			this.phase = n;
				$("#deployWrapper").hide();
				$("#phaseDiv").html("Movement")
				$("#phaseSwitchDiv").fadeIn(200);
				$("#phaseSwitchDiv").click(function(){
					$(this).fadeOut(200);
				});
		}
		else if (n == 2){
			this.phase = n;
				$("#deployWrapper").hide();
				$("#phaseDiv").html("Firing")
				$("#phaseSwitchDiv").fadeIn(200);
				$("#phaseSwitchDiv").click(function(){
					game.initFiring();
					$(this).fadeOut(200);
				});
		}
		else if (n == 3){
			this.phase = n;
				$("#deployWrapper").hide();
				$("#phaseDiv").html("Damage Control")
				$("#phaseSwitchDiv").fadeIn(200);
				$("#phaseSwitchDiv").click(function(){
					game.initDamageControl();
					$(this).fadeOut(200);
				});
		}
	}
	
	this.create = function(){
		$("#phaseSwitchDiv").show();

		for (var i = 0; i < window.ships.length; i++){
			var deployed = false;
			var friendly = false;

			if (window.ships[i].userid == this.userid){
				friendly = true;
			}
			for (var j = 0; j < window.ships[i].actions.length; j++){
				if (window.ships[i].actions[j].type == "deploy"){
					deployed = true;
					break;
				}
			}

			//function Ship(id, shipClass, x, y, facing, userid, color){
			var ship = new Ship(
								window.ships[i].id,
								window.ships[i].shipClass,
								0,
								0,
								0,
								window.ships[i].userid
							)
			
			ship.faction = window.ships[i].faction;
			ship.mass = window.ships[i].mass;
			ship.value = window.ships[i].value;
			ship.ep = window.ships[i].ep;
			ship.profile = window.ships[i].profile;
			ship.size = window.ships[i].size;
			ship.shipType = window.ships[i].shipType;
			ship.friendly = friendly;
			ship.deployed = deployed;
			ship.available = window.ships[i].available;
			ship.primary = new Primary(
				window.ships[i].primary.id,
				window.ships[i].primary.parentId,
				window.ships[i].primary.integrity,
				window.ships[i].primary.damages
			)


			//function Structure(parentId, start, end, armour, integrity){
			for (var j = 0; j < window.ships[i].structures.length; j++){
				var struct = new Structure(
					window.ships[i].structures[j].id,
					window.ships[i].structures[j].parentId,
					window.ships[i].structures[j].start,
					window.ships[i].structures[j].end,
					window.ships[i].structures[j].integrity,
					window.ships[i].structures[j].mitigation,
					window.ships[i].structures[j].destroyed
				);

				if (window.ships[i].structures[j].damages.length){
					for (var k = 0; k < window.ships[i].structures[j].damages.length; k++){
						var dmg = new Damage(
							window.ships[i].structures[j].damages[k].id,
							window.ships[i].structures[j].damages[k].fireid,
							window.ships[i].structures[j].damages[k].gameid,
							window.ships[i].structures[j].damages[k].shipid,
							window.ships[i].structures[j].damages[k].structureid,
							window.ships[i].structures[j].damages[k].turn,
							window.ships[i].structures[j].damages[k].roll,
							window.ships[i].structures[j].damages[k].type,
							window.ships[i].structures[j].damages[k].totalDmg,
							window.ships[i].structures[j].damages[k].shieldDmg,
							window.ships[i].structures[j].damages[k].structDmg,
							window.ships[i].structures[j].damages[k].armourDmg,
							window.ships[i].structures[j].damages[k].mitigation,
							window.ships[i].structures[j].damages[k].destroyed,
							window.ships[i].structures[j].damages[k].notes
						)

						struct.damages.push(dmg);
					}
				}

				for (var k = 0; k < window.ships[i].structures[j].systems.length; k++){
					if (window.ships[i].structures[j].systems[k].weapon){
						if (window.ships[i].structures[j].systems[k].type == "Laser"){
							//console.log(window.ships[i].structures[j].systems[k]);
							var system = new Laser(
								window.ships[i].structures[j].systems[k].id,
								window.ships[i].structures[j].systems[k].parentId,
								window.ships[i].structures[j].systems[k].name,
								window.ships[i].structures[j].systems[k].display,
								window.ships[i].structures[j].systems[k].exploSize,
								window.ships[i].structures[j].systems[k].rakeTime,
								window.ships[i].structures[j].systems[k].animColor,
								window.ships[i].structures[j].systems[k].beamWidth,
								window.ships[i].structures[j].systems[k].output,
								window.ships[i].structures[j].systems[k].minDmg,
								window.ships[i].structures[j].systems[k].maxDmg,
								window.ships[i].structures[j].systems[k].optRange,
								window.ships[i].structures[j].systems[k].dmgDecay,
								window.ships[i].structures[j].systems[k].accDecay,
								window.ships[i].structures[j].systems[k].shots,
								window.ships[i].structures[j].systems[k].reload,
								window.ships[i].structures[j].systems[k].start,
								window.ships[i].structures[j].systems[k].end
							)
							//console.log(system);
						}
						else if (window.ships[i].structures[j].systems[k].type == "Particle"){
							//console.log(window.ships[i].structures[j].systems[k]);
							var system = new Particle(
								window.ships[i].structures[j].systems[k].id,
								window.ships[i].structures[j].systems[k].parentId,
								window.ships[i].structures[j].systems[k].name,
								window.ships[i].structures[j].systems[k].display,
								window.ships[i].structures[j].systems[k].exploSize,
								window.ships[i].structures[j].systems[k].animColor,
								window.ships[i].structures[j].systems[k].projSize,
								window.ships[i].structures[j].systems[k].projSpeed,
								window.ships[i].structures[j].systems[k].output,
								window.ships[i].structures[j].systems[k].minDmg,
								window.ships[i].structures[j].systems[k].maxDmg,
								window.ships[i].structures[j].systems[k].accDecay,
								window.ships[i].structures[j].systems[k].shots,
								window.ships[i].structures[j].systems[k].reload,
								window.ships[i].structures[j].systems[k].start,
								window.ships[i].structures[j].systems[k].end
							)
							//console.log(system);
						}


						if (system){
							if (window.ships[i].structures[j].systems[k].fireOrders.length){
								for (var l = 0; l < window.ships[i].structures[j].systems[k].fireOrders.length; l++){
						
									//function FireOrder(id, turn, shooterId, targetId, weaponId, req, notes, hits, resolved){
									system.fireOrders.push(
										new FireOrder(
											window.ships[i].structures[j].systems[k].fireOrders[l].id,
											window.ships[i].structures[j].systems[k].fireOrders[l].turn,
											window.ships[i].structures[j].systems[k].fireOrders[l].shooterid,
											window.ships[i].structures[j].systems[k].fireOrders[l].targetid,
											window.ships[i].structures[j].systems[k].fireOrders[l].weaponid,
											window.ships[i].structures[j].systems[k].fireOrders[l].req,
											window.ships[i].structures[j].systems[k].fireOrders[l].notes,
											window.ships[i].structures[j].systems[k].fireOrders[l].hits,
											window.ships[i].structures[j].systems[k].fireOrders[l].resolved
										)
									)	
								}
							}
							struct.systems.push(system);
						}	
					}
				}
				ship.structures.push(struct);
			}


			if (! friendly){
				if (deployed){
					ship.actions.push(window.ships[i].actions[0]);
					if (this.phase == -1){
						if (ship.actions[0].turn == this.turn){
							continue;
						}
						else {
							for (var j = 1; j < window.ships[i].actions.length; j++){
								if (window.ships[i].actions[j].turn < game.turn){
									ship.actions.push(window.ships[i].actions[j]);
								}
								else {
									break;
								}
							}
						}
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

		//if (window.fireOrders.length){console.log("ding");this.fireOrders = window.fireOrders;}

		var canSubmit = false;
		var isPlaying = false;
		for (var i = 0; i < playerstatus.length; i++){
			if (playerstatus[i].userid == userid){
				isPlaying = true;
				this.reinforcePoints = $("#reinforce").html();
				if (playerstatus[i].status == "waiting"){
					canSubmit = true;
					break;
				}
			}
		}

		this.canSubmit = canSubmit;

		this.initPhase(this.phase);
	}
	
	this.hasShipOnPos = function(pos){
		for (var i = 0; i < this.ships.length; i++){
			if (this.ships[i].deployed){
				var shipPos = this.ships[i].getBaseOffsetPos();
				if (shipPos.x < pos.x + this.ships[i].size/4 && shipPos.x > pos.x - this.ships[i].size/4){
					if (shipPos.y > pos.y - this.ships[i].size/4 && shipPos.y < pos.y + this.ships[i].size/4){
						return this.ships[i];
					}
				}
			}
		}	
		return false;
	}
	
	this.posIsOccupied = function(ship, pos){
		return false;
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

	this.getCurrentReinforceCost = function(){
		var cost = 0;
		if (this.reinforcements.length){
			for (var i = 0; i < this.reinforcements.length; i++){
				cost += this.reinforcements[i].cost;
			}
		}

		return cost;
	}

	this.selectReinforcements = function(id){
		var found = false;

		for (var i = this.reinforcements.length-1; i >= 0; i--){
			if (this.reinforcements[i].id == id){
				found = true;
				this.reinforcements.splice(i, 1);
			}
		}
		if (! found){
			for (var i = 0; i < window.reinforcements.length; i++){
				if (window.reinforcements[i].id == id){
					this.reinforcements.push(window.reinforcements[i]);
					break;
				}
			}
		}

		$("#totalRequestCost").html(this.getCurrentReinforceCost());
	}
	
	this.resolveMovement = function(callback){
	//	return;
		if (aShip){
			game.getShipById(aShip).unselect();
		}

		//console.log(callback);

		//var s = game.ships[1]; game.ships = [s]; console.log("ding");

		//this.ships = [this.ships[0]];
	
		for (var i = 0; i < this.ships.length; i++){

			if (! this.ships[i].deployed){continue;}

			this.ships[i].animationSetup();

			var speed = this.ships[i].getTotalImpulse();
			var frameMod = 100 / speed ;
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

		game.animateMovement(callback);
	}
	
	this.animateMovement = function(callback){
		
		anim = window.requestAnimationFrame(game.animateMovement.bind(this, callback));
		ctx.clearRect(0, 0, res.x, res.y);
		
		for (var i = 0; i < game.ships.length; i++){
			if (game.ships[i].deployed){
				for (var j = 0; j < game.ships[i].actions.length; j++){
					if (game.ships[i].actions[j].turn == game.turn){
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
										game.ships[i].facing = addAngle(game.ships[i].facing, 5);
										game.ships[i].actions[j].angle -= 5;
									}
									else {
										game.ships[i].facing = addAngle(game.ships[i].facing, -5);
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
				if (game.ships[i].actions[j].turn == game.turn){
					if (! game.ships[i].actions[j].animated){
						done = false;
						break;
					}
				}
			}
		}
		
		if (done){
			window.cancelAnimationFrame(anim);
			for (var i = 0; i < game.ships.length; i++){
				if (game.ships[i].deployed){
					game.ships[i].x = Math.floor(game.ships[i].x);
					game.ships[i].y = Math.floor(game.ships[i].y);
				}
			}
			callback();
		}
	}

	this.resolveFire = function(){
		this.getResolvingFireOrders();
		this.getShotDetails();
		this.getAnimationDetails();
		this.animate();
	}

	this.getResolvingFireOrders= function(){
		this.fireOrders = [];

		for (var i = 0; i < this.ships.length; i++){
			for (var j = 0; j < this.ships[i].structures.length; j++){
				for (var k = 0; k < this.ships[i].structures[j].systems.length; k++){
					if (this.ships[i].structures[j].systems[k].weapon){
						for (var l = 0; l < this.ships[i].structures[j].systems[k].fireOrders.length; l++){
							if (this.ships[i].structures[j].systems[k].fireOrders[l].turn == this.turn){
								this.fireOrders.push(this.ships[i].structures[j].systems[k].fireOrders[l]);
							}
						}
					}
				}
			}
		}
	}

	this.getShotDetails = function(){
		//	console.log("getShotDetails");
		//	this.fireOrders = [this.fireOrders[0]];

		for (var i = 0; i < this.ships.length; i++){
		}


		for (var i = 0; i < this.fireOrders.length; i++){
			this.fireOrders[i].shooter = game.getShipById(this.fireOrders[i].shooterId);
			this.fireOrders[i].target = game.getShipById(this.fireOrders[i].targetId);
			this.fireOrders[i].weapon = this.fireOrders[i].shooter.getSystemById(this.fireOrders[i].weaponId);
			this.fireOrders[i].hits = [this.fireOrders[i].hits];
			this.fireOrders[i].damages = this.fireOrders[i].target.getDamageEntriesByFireId(this.fireOrders[i].id);

		}
		
		for (var i = 0; i < this.fireOrders.length; i++){
			var a = this.fireOrders[i];
			if (this.fireOrders[i].guns){
				for (var j = 0; j < this.fireOrders.length; j++){
					var b = this.fireOrders[j];
					if (a.id != b.id){
						if (this.fireOrders[j].guns){
							if (a.shooterId == b.shooterId){
								if (a.targetId == b.targetId){
									if (a.weapon.name == b.weapon.name){
										this.fireOrders[i].guns += this.fireOrders[j].guns;
										for (var k = 0; k < this.fireOrders[j].damages.length; k++){
											this.fireOrders[i].damages.push(this.fireOrders[j].damages[k])
										}
										this.fireOrders[i].hits.push(this.fireOrders[j].hits[0]);
										this.fireOrders[j].guns = 0;
									}
								}
							}
						}
					}
				}
			}
		}



		//console.log(this.fireOrders);
		for (var i = this.fireOrders.length-1; i >= 0; i--){
			if (! this.fireOrders[i].guns){
				this.fireOrders.splice(i, 1);

			}
			else {
				this.fireOrders[i].dist = getDistance(
														{
															x: this.fireOrders[i].shooter.x,
															y: this.fireOrders[i].shooter.y
														},
														{	x: this.fireOrders[i].target.x,
															y: this.fireOrders[i].target.y
														}
													);
			}
		}
	}

	this.getAnimationDetails = function(){
		//console.log("getAnimationDetails");
		//	console.time("start");
		for (var i = 0; i < this.fireOrders.length; i++){
			//	console.log(this.fireOrders[i]);
			for (var j = 0; j < this.fireOrders[i].guns; j++){
				var ox = this.fireOrders[i].shooter.x + range(this.fireOrders[i].target.size * 0.1 * -1, this.fireOrders[i].target.size * 0.1); // WEAPON origin
				var oy = this.fireOrders[i].shooter.y + range(this.fireOrders[i].target.size * 0.1 * -1, this.fireOrders[i].target.size * 0.1); // WEAPON origin
				
				var anims = [];
				
				for (var k = 0; k < this.fireOrders[i].weapon.shots; k++){
					var hit = true;
					var tx = this.fireOrders[i].target.x + range(this.fireOrders[i].target.size * 0.25 * -1, this.fireOrders[i].target.size * 0.25); // WEAPON dest on HIT
					var ty = this.fireOrders[i].target.y + range(this.fireOrders[i].target.size * 0.25 * -1, this.fireOrders[i].target.size * 0.25);
					var subAbim = {};
					
					if (this.fireOrders[i].weapon.animation == "projectile"){
						if (k >= this.fireOrders[i].hits[j]){
							hit = false;
							tx = tx + range(this.fireOrders[i].target.size * 1 * -1, this.fireOrders[i].target.size * 1); // proj dest on MISS
							ty = ty + range(this.fireOrders[i].target.size * 1 * -1, this.fireOrders[i].target.size * 1);
						}
							subAnim = {
								ox: ox,
								oy: oy,
								tx: tx,
								ty: ty,
								t: [0 - (j*20 + k*10), this.fireOrders[i].dist / this.fireOrders[i].weapon.projSpeed],
								hit: hit,
								v: new Vector({x: ox, y: oy}, {x: tx, y: ty}),
								explo: false,
								animated: false
							}
					}
					else if (this.fireOrders[i].weapon.animation == "beam"){
						if (k >= this.fireOrders[i].hits[j]){
							hit = false;
							tx = this.fireOrders[i].target.x + range(this.fireOrders[i].target.size * 1 * -1, this.fireOrders[i].target.size * 1); // BEAM init on MISS
							ty = this.fireOrders[i].target.y + range(this.fireOrders[i].target.size * 1 * -1, this.fireOrders[i].target.size * 1);

							tbx = tx + range(this.fireOrders[i].target.size * 0.3 * -1, this.fireOrders[i].target.size * 0.3); // beam swipe end on MISS
							tby = ty + range(this.fireOrders[i].target.size * 0.3 * -1, this.fireOrders[i].target.size * 0.3);						
							//console.log(stepX, stepY);
						}
						
							//var tbx = tx + range(this.fireOrders[i].target.size * 0.3 * -1, this.fireOrders[i].target.size * 0.3); // beam swipe end on HIT
							//var tby = ty + range(this.fireOrders[i].target.size * 0.3 * -1, this.fireOrders[i].target.size * 0.3);
							var tbx = this.fireOrders[i].target.x + range(this.fireOrders[i].target.size * 0.3 * -1, this.fireOrders[i].target.size * 0.3); // beam swipe end on HIT
							var tby = this.fireOrders[i].target.y + range(this.fireOrders[i].target.size * 0.3 * -1, this.fireOrders[i].target.size * 0.3);
							
							subAnim = {
								ox: ox,
								oy: oy,
								tax: tx,
								tay: ty,
								tbx: tbx,
								tby: tby,
								t: [0, this.fireOrders[i].weapon.rakeTime],
								hit: hit,
								v: new Vector({x: tx, y: ty}, {x: tbx, y: tby}),
								explo: false,
								animated: false
						}
					}
					if (hit){
						subAnim.explo = {t: [0, 130], s: this.fireOrders[i].weapon.exploSize};
					}
					//		console.log(subAnim);
				
				anims.push(subAnim);
				}
			this.fireOrders[i].anim.push(anims);
			}
		}


      this.fireOrders.sort(function(obj1, obj2){
            if(obj1.targetId !== obj2.targetId){
                 return obj1.targetId-obj2.targetId;
            }
            else return obj1.shooterId - obj2.shooterId;
        });

      return true;
	}

	this.animate = function(){
		//return;
		//console.log("animate");
		//console.log(game.fireOrders);
	
		animation = setInterval(function(){

			$("#combatlogWrapper").show();
			fxCtx.clearRect(0, 0, res.x, res.y);

			for (var i = 0; i  < game.fireOrders.length; i++){
				if (! game.fireOrders[i].animated){
					//console.log("animating fire[" + i + "] for shots: " + game.fireOrders[i].shots);
					var x, y;
					
					//console.log("animating " + game.fireOrders[i].anim.length + " guns with " + game.fireOrders[i].anim[0].length + " shots each.");
					for (var j = 0; j < game.fireOrders[i].anim.length; j++){
						//console.log(game.fireOrders[i].anim[j]);
						for (var k = 0; k < game.fireOrders[i].anim[j].length; k++){
							if (game.fireOrders[i].weapon.animation == "projectile"){
								if (game.fireOrders[i].anim[j][k].t[0] < game.fireOrders[i].anim[j][k].t[1]){ // still to animate
									game.fireOrders[i].anim[j][k].t[0] += 1;
									if (game.fireOrders[i].anim[j][k].t[0] > 0){ // t valid, now animate
	x = game.fireOrders[i].anim[j][k].ox + (game.fireOrders[i].anim[j][k].v.x * game.fireOrders[i].anim[j][k].t[0] / game.fireOrders[i].anim[j][k].t[1]);
	y = game.fireOrders[i].anim[j][k].oy + (game.fireOrders[i].anim[j][k].v.y * game.fireOrders[i].anim[j][k].t[0] / game.fireOrders[i].anim[j][k].t[1]);
	drawProjectile(game.fireOrders[i].weapon, game.fireOrders[i].anim[j][k].ox, game.fireOrders[i].anim[j][k].oy, x, y);
									}
								}
								else {// animate EXPLO
									if (game.fireOrders[i].anim[j][k].explo){
										if (game.fireOrders[i].anim[j][k].explo.t[0] < game.fireOrders[i].anim[j][k].explo.t[1]){
											game.fireOrders[i].anim[j][k].explo.t[0] += 5;
	x = game.fireOrders[i].anim[j][k].ox + game.fireOrders[i].anim[j][k].v.x;
	y = game.fireOrders[i].anim[j][k].oy + game.fireOrders[i].anim[j][k].v.y;	
	drawExplosion(x, y, game.fireOrders[i].anim[j][k].explo.s, game.fireOrders[i].anim[j][k].explo.t[0], game.fireOrders[i].anim[j][k].explo.t[1]); // EXPLO
										}
										else {
											game.fireOrders[i].anim[j][k].animated = true;
										}
									}
									else {
										game.fireOrders[i].anim[j][k].animated = true;
									}
								}
							}
							else if (game.fireOrders[i].weapon.animation == "beam"){
								game.fireOrders[i].anim[j][k].t[0] += 1;

								x = game.fireOrders[i].anim[j][k].tax + (game.fireOrders[i].anim[j][k].v.x * game.fireOrders[i].anim[j][k].t[0] / game.fireOrders[i].anim[j][k].t[1]);
								y = game.fireOrders[i].anim[j][k].tay + (game.fireOrders[i].anim[j][k].v.y * game.fireOrders[i].anim[j][k].t[0] / game.fireOrders[i].anim[j][k].t[1]);
								drawBeam(
									game.fireOrders[i].weapon, 
									game.fireOrders[i].anim[j][k].ox, 
									game.fireOrders[i].anim[j][k].oy,
								 	x,
							 		y,
									game.fireOrders[i].anim[j][k].t[0],
									game.fireOrders[i].anim[j][k].t[1]
						 		);
								if (game.fireOrders[i].anim[j][k].explo){
									game.fireOrders[i].anim[j][k].explo.t[0] = game.fireOrders[i].anim[j][k].explo.t[1];		
	drawBeamExplosion(x, y, game.fireOrders[i].anim[j][k].explo.s, game.fireOrders[i].anim[j][k].t[0], game.fireOrders[i].anim[j][k].t[1]); // EXPLO
								}
								if (game.fireOrders[i].anim[j][k].t[0] == game.fireOrders[i].anim[j][k].t[1]){
									game.fireOrders[i].anim[j][k].animated = true;
								}
							}
						}
					}
					
					var allAnimated = true;
					for (var j = 0; j < game.fireOrders[i].anim.length; j++){
						for (var k = 0; k < game.fireOrders[i].anim[j].length; k++){
							if (! game.fireOrders[i].anim[j][k].animated){
								allAnimated = false;
								break;
							}
						}
						if (!allAnimated){
							break;
						}
					}
					
					if (allAnimated){
						game.fireOrders[i].animated = allAnimated;
						game.createLogEntry(game.fireOrders[i]);
					}
				
					break;
				}
			}
			
			
			var done = true
			
			for (var i = 0; i  < game.fireOrders.length; i++){
				if (! game.fireOrders[i].animated){
					done = false;
				}
			}
			
			if (done){
				clearInterval(animation);
				fxCtx.clearRect(0, 0, res.x, res.y);
				game.fireResolved();
			}
			
		}, 30);
	}

	this.createLogEntry = function(fire){
		console.log(fire);

		var shots = 0;
		var hits = 0;
		var struct = 0;
		var armour = 0;

		var rolls = [];
		
		for (var i = 0; i < fire.guns; i++){
			shots += fire.weapon.shots;
			hits += fire.hits[i];
		}
		for (var j = 0; j < fire.damages.length; j++){
			struct += fire.damages[j].structDmg;
			armour += fire.damages[j].armourDmg;
			rolls.push(fire.damages[j].roll);
		}

		rolls.sort(function(a, b){return a-b});

		var log = document.getElementById("combatLog");

		var tr = document.createElement("tr");
			tr.style.borderBottom = "2px solid black";
		var td = document.createElement("td");
			td.innerHTML = "FIRE:"; tr.appendChild(td);

		var td = document.createElement("td");
			td.innerHTML = fire.shooter.shipClass + " #" + fire.shooter.id; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = fire.target.shipClass + " #" + fire.target.id; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = fire.guns + "x " + fire.weapon.name; tr.appendChild(td);


		var td = document.createElement("td");
			td.colSpan = 2;
			td.innerHTML = fire.req + "% "; tr.appendChild(td);

			/*
			if (rolls.length){
				if (rolls.length > 1){
					td.innerHTML = rolls[0] + " - " + rolls[1] + "%";
				}
				else td.innerHTML = rolls[0] + "%";
			} 
			else td.innerHTML = "";

			tr.appendChild(td);
			*/
					var td = document.createElement("td");
			td.innerHTML = hits; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = shots; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = armour; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = struct; tr.appendChild(td);
		
			log.appendChild(tr);
	}
}

