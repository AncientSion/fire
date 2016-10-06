
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
						console.log($(this).data());
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
					var img = toDo[i].img; img.style.width = "50px"; img.style.height = "50px";
				td.appendChild(img); tr.appendChild(td);

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
					});
				var th = document.createElement("th");
					th.colSpan = 4;
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
	}
		
	this.endTurn = function(){
		if (this.phase == 2){
			this.turn = this.turn++;
			this.turn++;
			this.setPhase(1)
			fireOrders = [];
			fire = [];
		}
		
		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].startNewTurn();
		}
	}
	
	this.create = function(){
	/*	this.ships.push( new Artemis( "artemis", 200, 100, 35, 1, "blue") );
		this.ships.push( new Omega( "omega", 200, 225, 0, 1, "blue") );
		this.ships.push( new Artemis( "artemis", 200, 350, -35, 1, "blue") );
		this.ships.push( new Demos( "demos", 1000, 150, 180, 2, "green") );
		this.ships.push( new Sharlin( "sharlin", 1000, 225, 180, 2, "green") );
		this.ships.push( new Haven( "haven", 1000, 300, 180, 2, "green") );
	*/

		for (var i = 0; i < window.ships.length; i++){
			var shipclass = window.ships[i].shipclass;
			var owner = window.ships[i].userid;
			var id = window.ships[i].id;
			var facing = 0;
			var x;
			var y;
			var deployed;
			var friendly;

			if (window.ships[i].status == "deployed"){deployed = true;}else {deployed = false;}
			if (window.ships[i].userid == this.userid){friendly = true;}else {friendly = false;}

			var ship = new window[shipclass](id, shipclass.toLowerCase(), x, y, facing, owner, "blue");
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
					else if (this.phase == 2){
						ship.actions = window.ships[i].actions;
					}
				}
			}
			else {
				for (var j = 0; j < window.ships[i].actions.length; j++){
					ship.actions.push(window.ships[i].actions[j]);
				}
			}


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
	
	this.create();
}

