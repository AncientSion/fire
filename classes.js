function Point(x, y){
	this.x = Math.floor(x);
	this.y = Math.floor(y);
	
	this.getOffset = function(){
	//	console.log({x: cam.scale.x(this.x - cam.o.x), y: cam.scale.y(this.y - cam.o.y)});
		return { x: this.x - cam.o.x, y: this.y - cam.o.y };
	}
}

function Move(type, dist, x, y, a, delay, cost, costmod, resolved){
	this.turn = game.turn;
	this.type = type;
	this.dist = dist;
	this.x = x;
	this.y = y;
	this.a = a;
	this.animated = false
	this.s = false;
	this.cost = cost || 0;
	this.delay = delay || 0;
	this.costmod = costmod || 1;
	this.resolved = resolved || 0;
}

function Vector(a, b){
	this.x;
	this.y;
	this.nx;
	this.ny;
	this.m;
	this.t;
	
	this.setup = function(){
		this.x = b.x - a.x;
		this.y = b.y - a.y;
		
		var x = Math.pow(this.x, 2);
		var y = Math.pow(this.y, 2);
		var m = x + y;
		
		this.m = Math.sqrt(m);			
		this.nx = this.x/this.m;
		this.ny = this.y/this.m;
	}
	
	this.setup();

}

function Dot(a, b){
	this.dot = (a.nx * b.nx) + (a.ny * b.ny);
}

function Path (a, b){
	this.a = a;
	this.b = b;
	this.distance;
	this.animated = false;
	
	this.setup = function(){
		var a = this.a.x - this.b.x;
		var b = this.a.y - this.b.y;
		
		var a = Math.pow(a, 2);
		var b = Math.pow(b, 2);
		var c = a + b;
		var c = Math.sqrt(c);
		
		this.distance = Math.floor(c);
	}
	
	this.setup();
}

function Power(id, unitid, systemid, turn, type, cost){
	this.id = id;
	this.unitid = unitid;
	this.systemid = systemid;
	this.turn = turn;
	this.type = type;
	this.cost = cost;
}

function TempAmmo(classname, minDmg, maxDmg, maxDist, impulse, mass, integrity, armour, fc){
	this.classname = classname;
	this.minDmg = minDmg;
	this.maxDmg = maxDmg;
	this.maxDist = maxDist;
	this.impulse = impulse;
	this.mass = mass;
	this.integrity = integrity;
	this.fc = fc;

	this.getDamage = function(){
		var min = this.getMinDmg();
		var max = this.getMaxDmg();

		if (min == max){
			return min;
		}
		else {
			return min + " - " + max;
		}
	}

	this.getMinDmg = function(){
		return this.minDmg;
	}

	this.getMaxDmg = function(){
		return this.maxDmg;
	}

	this.getRemainingIntegrity = function(){
		return this.integrity;
	}
}				

function Ammo(id, classname, minDmg, maxDmg, maxDist, impulse, mass, integrity, armour, fc, damages, crits, destroyed){
	this.id = id;
	this.classname = classname;
	this.minDmg = minDmg;
	this.maxDmg = maxDmg;
	this.maxDist = maxDist;
	this.impulse = impulse;
	this.size = mass*3;
	this.mass = mass;
	this.integrity = integrity;
	this.armour = armour;
	this.fc = fc;
	this.damages = damages;
	this.crits = crits;
	this.destroyed = destroyed;
	this.fireOrders = [];

	this.getRemainingIntegrity = function(){
		var integrity = this.integrity;
		for (var i = 0; i < this.damages.length; i++){
			integrity -= this.damages[i].structDmg;
		}
		return integrity;
	}
}

function Salvo(id, userid, targetid, classname, amount, status, destroyed, actions){
	this.id = id;
	this.userid = userid;
	this.targetid = targetid;
	this.classname = classname;
	this.amount = amount;
	this.status = status;
	this.destroyed = destroyed;
	this.actions = actions;
	this.shortInfo = false;
	this.selected = false;
	this.structures = [];
	this.layout = [];
	this.size;
	this.x;
	this.y;
	this.facing;
	this.img;
	this.highlight = false;
	this.friendly = false;

	this.getSystemById = function(id){
		for (var i = 0; i < this.structures.length; i++){
			if (this.structures[i].id == id){
				return this.structures[i];
			}
		}
	}

	this.getDamageEntriesByFireId = function(fireid){
		var ret = [];
		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].damages.length; j++){
				if (this.structures[i].damages[j].fireid == fireid){
					ret.push(this.structures[i].damages[j]);
				}
			}
		}
		return ret;
	}

	this.doHighlight = function(){
		if (this.highlight){
			this.highlight = false;
			game.draw();
		}
		else {
			this.highlight = true;
			ctx.beginPath();
			ctx.arc(this.x + cam.o.x, this.y + cam.o.y, 9*cam.z, 0, 2*Math.PI, false);
			ctx.closePath();
			ctx.lineWidth = 3;
			ctx.globalAlpha = 1;
			if (this.friendly){ctx.strokeStyle = "green";}
			else {ctx.strokeStyle = "red";}
			ctx.stroke();
		}
		return;
	}

	this.getDamage = function(){
		var min = this.getMinDmg();
		var max = this.getMaxDmg();

		if (min == max){
			return min;
		}
		else {
			return min + " - " + max;
		}
	}

	this.getMinDmg = function(){
		return this.structures[0].minDmg;
	}

	this.getMaxDmg = function(){
		return this.structures[0].maxDmg;
	}

	this.getRemDist = function(){
		var fuel = this.structures[0].maxDist;

		for (var i = 1; i < this.actions.length; i++){
			fuel -= getDistance( {x: this.actions[i-1].x, y: this.actions[i-1].y}, {x: this.actions[i].x, y: this.actions[i].y} )
		}

		return Math.floor(fuel);
	}

	this.createDiv = function(){
		var div = document.createElement("div");
			div.className = "ammoDiv disabled";
			$(div).data("ammoId", this.id);
		
		var table = document.createElement("table");
			table.style.width = "95%"

		var tr = document.createElement("tr");
		var th = document.createElement("th");
		var target = game.getShipById(this.targetid);
			th.innerHTML = this.structures.length + "x " + this.classname + " #" + this.id + " vs " + target.classname + " #" + target.id;
			th.style.fontSize = "16px";
			th.colSpan = 5;
			tr.appendChild(th); table.appendChild(tr);

    	$(table)
			.append($("<tr>")
	    		.append($("<th>").html("Damage"))
	    		.append($("<th>").html("Armour"))
	    		.append($("<th>").html("Impulse"))
	    		.append($("<th>").html("rem. Fuel"))
	    		.append($("<th>").html("Fire Control"))
			)
			.append($("<tr>")
	    		.append($("<td>").html(this.getDamage()))
	    		.append($("<td>").html(this.structures[0].armour))
	    		.append($("<td>").html(this.structures[0].impulse))
	    		.append($("<td>").html(this.getRemDist()))
	    		.append($("<td>").html(this.structures[0].fc[0] + "% / " + this.structures[0].fc[1] + "%"))
			)

		div.appendChild(table);

		var table = document.createElement("table");
			table.style.borderCollapse = "collapse";
			table.style.margin = "auto";
		var tr = document.createElement("tr");

		var max = Math.min(5, this.structures.length);

		for (var i = 0; i < this.structures.length; i++){
			if (i % max === 0){
			    var tbody = table.appendChild(document.createElement("tbody"));
			    var tr1 = tbody.insertRow(-1);
			    var tr2 = tbody.insertRow(-1);
			}

			var status = "";
			if (this.structures[i].getRemainingIntegrity() < 1){
				status = "destroyed";
			}
			else if (this.actions[this.actions.length-1].type == "impact"){
				if (this.structures[i].fireOrders.length && this.structures[i].fireOrders[0].hits){
					status = "impact";
				}
				else {
					status = "lostlock";
				}
			}

			var td = document.createElement("td");
				td.className = "iconContainer"; 
				$(td).data("id", this.structures[i].id);
				td.addEventListener("click", function(){
					console.log(game.getBallById(aBall).getSystemById($(this).data("id")));
				})

				td.appendChild(window.ballImages[this.structures[i].classname.toLowerCase()].cloneNode(true))
				//if (status != ""){td.className += " " + status;}

				if (status == "impact"){
					var img = new Image(); img.className = "ammoImpact"; img.src = "/fire/varIcons/impact.png";
					td.appendChild(img);
				}
				else if (status == "destroyed"){
					var img = new Image(); img.className = "ammoDestroyed"; img.src = "/fire/varIcons/destroyed.png";
					td.appendChild(img);
				}
				else if (status == "lostlock"){
					var img = new Image(); img.className = "ammoDestroyed"; img.src = "/fire/varIcons/destroyed.png";
					td.appendChild(img);
					//var img = new Image(); img.className = "ammoLostLock"; img.src = "/fire/varIcons/lostlock.png";
					//td.appendChild(img);
				}

			tr1.appendChild(td);

			var td = document.createElement("td");
				td.className = "iconIntegrity";

			var rem = this.structures[i].getRemainingIntegrity();

			var bgDiv = document.createElement("div");
				bgDiv.className = "integrityAmount"; bgDiv.style.top = 1;
				bgDiv.innerHTML = rem + " / " + this.structures[i].integrity;
				td.appendChild(bgDiv);

			var lowerDiv = document.createElement("div");
				lowerDiv.className = "integrityNow"; lowerDiv.style.top = 0; lowerDiv.style.height = "100%";
				lowerDiv.style.width = rem/this.structures[i].integrity * 100 + "%";
				td.appendChild(lowerDiv);
				
			var upperDiv = document.createElement("div");
				upperDiv.className = "integrityFull"; upperDiv.style.top = 0;
				td.appendChild(upperDiv);

			tr2.appendChild(td);
		}
		div.appendChild(table);

		$(div).contextmenu(function(e){
			e.stopPropagation();
			//e.preventDefault();
			//$(this).addClass("disabled");
		}).drag();

		//$(div).mousemove(ballisticInterceptionHover);
		//$(div).click(ballisticInterceptionClick);
			
		document.getElementById("game").appendChild(div);
	}

	this.select = function(){
		if (this.selected){
			this.selected = false;
			aBall = false;
			this.disableDiv();
			fxCtx.clearRect(0, 0, res.x, res.y);
		}
		else {
			console.log(this);
			this.selected = true;
			aBall = this.id;
			this.enableDiv();
			this.drawFlightPath();
		}
	}

	this.enableDiv = function(){
		var pos = this.getBaseOffsetPos();
		var id = this.id;

		$(".ammoDiv").each(function(){
			if ($(this).data("ammoId") == id){
				$(this)
					.css("left", pos.x + cam.o.x - $(this).width()/2)
					.css("top", pos.y + cam.o.y + 90 + (($(this).height()+20) * 0))
					.removeClass("disabled");
			}
		})
	}

	this.disableDiv = function(){
		var id = this.id;
		$(".ammoDiv").each(function(){
			if ($(this).data("ammoId") == id){
				$(this).addClass("disabled");
			}
		})
	}

	this.create = function(){
		this.size = Math.ceil(this.structures.length)*8;
		this.x = this.actions[this.actions.length-1].x;
		this.y = this.actions[this.actions.length-1].y;

		this.setImage();
		this.createDiv();
		this.setFacing();
		this.setLayout();
		if (this.userid == game.userid){
			this.friendly = true;
		} else this.friendly = false;
	}

	this.setImage = function(){
		this.img = window.ballImages[this.structures[0].classname.toLowerCase()].cloneNode(true);
	}

	this.setLayout = function(){
		if (this.structures.length == 1){
			this.layout.push({x: range(-3, 3), y: range(-3, 3)});
			return;
		}
		var size = 15;
		var r = 0; // row
		var c = 0; // col
		var d = Math.ceil(this.structures.length/4) // depth
		for (var i = 0; i < d*2; i++){
			this.layout.push(
								{
									x: -size/3 - size*c/2,
				 					y:  (d-1)*size/2 -r*size + range(-4, 4)
				 				}
			 				);
			this.layout.push(
								{
									x: size/3 + size*c/2,
				 					y: (d-1)*size/2 -r*size + range(-4, 4)
				 				}
			 				);
			if (i % 2 == 1){
				r++;
				c = 0;
			}
			c++
		}
	}

	this.setFacing = function(){
		var goal = game.getShipById(this.targetid).getBaseOffsetPos();
		var i;
		if (this.actions[this.actions.length-1].type == "impact"){
			i = this.actions.length-2;
		}
		else {
			i = this.actions.length-1;
		}
		this.facing = Math.floor(getAngleFromTo( this.actions[i], {x: goal.x + cam.o.x, y: goal.y + cam.o.y} ));
	}

	this.draw = function(){
		ctx.save();
		ctx.translate(this.x + cam.o.x, this.y + cam.o.y);
		ctx.rotate((this.facing + 90) * (Math.PI/180));
		this.drawSelf();		
		this.drawIndicator();
		//this.drawCenterPoint();
		ctx.restore();
	}

	this.drawSelf = function(){
		var size = 15 *cam.z;

		ctx.drawImage(
			this.img,
			0 -size/2,
			0 -size/2,
			size, 
			size
		);
		return;
	}

	this.drawIndicator = function(){
		ctx.beginPath();
		ctx.arc(0, 0, 9*cam.z, 0, 2*Math.PI, false);
		ctx.closePath();
		ctx.lineWidth = 1;
		ctx.globalAlpha = 0.9;
		if (this.userid == game.userid){ctx.strokeStyle = "green";}
		else {ctx.strokeStyle = "red";}
		ctx.stroke();
		ctx.lineWidth = 1;
		ctx.globalAlpha = 1;
		ctx.strokeStyle = "black";
		return;
	}

	this.drawCenterPoint = function(){
		ctx.beginPath();
		ctx.arc(0, 0, 2, 0, 2*Math.PI, false);
		ctx.closePath();
		ctx.fillStyle = "red";
		ctx.fill();
	}

	this.drawFlightPath = function(){
		var goal = game.getShipById(this.targetid).getPlannedPosition();

		mouseCtx.beginPath();
		mouseCtx.moveTo(this.actions[this.actions.length-1].x + cam.o.x, this.actions[this.actions.length-1].y + cam.o.y);
		mouseCtx.lineTo(goal.x, goal.y);
		mouseCtx.closePath();

		mouseCtx.globalAlpha = 0.6;
		mouseCtx.strokeStyle = "white";
		mouseCtx.stroke();
		mouseCtx.globalAlpha = 1;

		var dist = getDistance({x: this.x, y: this.y}, {x: goal.x - cam.o.x, y: goal.y - cam.o.y});

		if (this.structures[0].impulse >= dist){
			mouseCtx.beginPath();
			mouseCtx.moveTo(this.actions[this.actions.length-1].x + cam.o.x, this.actions[this.actions.length-1].y + cam.o.y);
			mouseCtx.lineTo(goal.x, goal.y);
			mouseCtx.closePath();
			mouseCtx.globalAlpha = 1;
			mouseCtx.strokeStyle = "red";
			mouseCtx.stroke();

			mouseCtx.strokeStyle = "white";
			mouseCtx.globalAlpha = 1;
		}
		else {
			var a = getAngleFromTo({x: this.x, y: this.y}, {x: goal.x - cam.o.x, y: goal.y - cam.o.y});
			var step = getPointInDirection(this.structures[0].impulse, a, this.x, this.y);
			mouseCtx.beginPath();
			mouseCtx.moveTo(this.actions[this.actions.length-1].x + cam.o.x, this.actions[this.actions.length-1].y + cam.o.y);
			mouseCtx.lineTo(step.x + cam.o.x, step.y + cam.o.y);
			mouseCtx.closePath();
			mouseCtx.globalAlpha = 1;
			mouseCtx.strokeStyle = "red";
			mouseCtx.stroke();

			mouseCtx.strokeStyle = "white";
			mouseCtx.globalAlpha = 1;
		}
		game.flightPath = true;
	}

	/*this.drawFlightPath = function(){
		var target = game.getShipById(this.fire.targetid);
		var goal = target.getBaseOffsetPos();
		var dist = getDistance({x: this.x, y: this.y}, goal);

		ctx.beginPath();
		ctx.moveTo(this.x + cam.o.x, this.y + cam.o.y);
		ctx.lineTo(goal.x + cam.o.x, goal.y + cam.o.y);
		ctx.closePath();
		ctx.globalAlpha = 0.7;
		ctx.strokeStyle = "white";
		ctx.stroke();

		if (! window.anim){
			if (this.impulse < dist){
				var a = getAngleFromTo({x: this.x, y: this.y}, goal);
				var step = getPointInDirection(this.impulse, a, this.x, this.y);

				ctx.beginPath();
				ctx.moveTo(this.x + cam.o.x, this.y + cam.o.y);
				ctx.lineTo(step.x + cam.o.x, step.y + cam.o.y);
				ctx.closePath();
				ctx.globalAlpha = 0.7;
				ctx.strokeStyle = "red";
				ctx.stroke();
			}
		}
		ctx.globalAlpha = 1;
	}*/

	this.getShortInfo = function(){
		if (game.shortInfo){
			game.shortInfo = false;
			$("#shortInfo").html("");
		}
		game.shortInfo = this.id;
		var table = document.createElement("table");

		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = this.structures.length + "x " + this.classname + " # " + this.id;
			tr.appendChild(td); table.appendChild(tr);
		if (this.impactThisTurn()){
			var tr = document.createElement("tr");
			var td = document.createElement("td");
			if (game.phase < 3){
				td.innerHTML += "<font color='red'>IMPACT IMMINENT</font>";
			}
			else if (this.actions[this.actions.length-1].type == "impact"){
				td.innerHTML += "<font color='red'>DID IMPACT</font>";
			}
			tr.appendChild(td); table.appendChild(tr);
		}
		return table;
	}

	this.getIncomingBallistics = function(){
		var inc = [];
		for (var i = 0; i < game.ballistics.length; i++){
			if (game.ballistics[i].targetid == this.id){
				inc.push(game.ballistics[i])
			}
		}
		return inc;
	}

	this.impactThisTurn = function(){
		target = game.getShipById(this.targetid);
		if (getDistance({x: target.x, y: target.y}, {x: this.x, y: this.y}) <= this.structures[0].impulse){
			return true;
		} else return false;
	}

	this.getHitChanceFromAngle = function(){
		return this.structures[0].mass * 5;
	}

	this.getPlannedFacingToMove = function(){
		return this.facing;
	}
	
	this.getOffsetPos = function(){
		return {x: this.actions[this.actions.length-1].x + cam.o.x, y: this.actions[this.actions.length-1].y + cam.o.y};
	}

	this.getBaseOffsetPos = function(){
		return {x: this.actions[this.actions.length-1].x, y: this.actions[this.actions.length-1].y};
	}

	this.getTrajectory = function(){
		
		/*
		if (this.actions.length >= 2){
			return {x: this.actions[this.actions.length-2].x, y: this.actions[this.actions.length-2].y};
		}
		else { 
			return this.getBaseOffsetPos();
		}
		*/
		return this.getBaseOffsetPos();
	}

	this.getFiringPosition = function(){
		return new Point(
			this.x + range(this.size * 0.3 * -1, this.size * 0.3),
			this.y + range(this.size * 0.3 * -1, this.size * 0.3)
		)
	}

	this.getTargettingPos = function(){
		if (this.actions[this.actions.length-1].type == "impact"){
			return new Point(
				this.actions[this.actions.length-2].x + range(-10, 10),
				this.actions[this.actions.length-2].y + range(-10, 10)
			)	
		}
		else {
			return new Point(
				this.actions[this.actions.length-1].x + range(-10, 10),
				this.actions[this.actions.length-1].y + range(-10, 10)
			)
		}
	}
}

function Marker(shooterid, targetid, systemid, turn){
	this.shooterid = shooterid;
	this.targetid = targetid;
	this.systemid = systemid;
	this.turn = turn;
}

function FireOrder(id, turn, shooterid, targetid, weaponid, shots, req, notes, hits, resolved){
	this.id = id;
	this.turn = turn;
	this.shooterid = shooterid;
	this.targetid = targetid;
	this.weaponid = weaponid;
	this.shots = shots;
	this.req = req;
	this.notes = notes;
	this.hits = hits;
	this.resolved = resolved;
	this.dist;
	this.guns = 1;
	this.animated = false;
	this.anim = [];
	this.damages = [];
}

function Damage (id, fireid, gameid, shipid, structureid, systemid, turn, roll, type, totalDmg, shieldDmg, structDmg, armourDmg, mitigation, negation, destroyed, notes){
	this.id = id;
	this.fireid = fireid;
	this.gameid = gameid;
	this.shipid = shipid;
	this.structureid = structureid;
	this.systemid = systemid;
	this.turn = turn;
	this.roll = roll;
	this.type = type;
	this.totalDmg = totalDmg;
	this.shieldDmg = shieldDmg;
	this.structDmg = structDmg;
	this.armourDmg = armourDmg;
	this.mitigation = mitigation;
	this.negation = negation;
	this.destroyed = destroyed;
	this.notes = notes;
}

function Crit (id, shipid, systemid, turn, type, duration){
	this.id = id;
	this.shipid = shipid;
	this.systemid = systemid;
	this.turn = turn;
	this.type = type;
	this.duration = duration;
	this.html = "";
	this.outputMod = 0;

	this.create = function(){
		var html = "";
		var mod = 1;
		if (this.duration > 0){
			html = "Turns " + this.turn + " - " + (this.turn + this.duration) +": ";
		} else {
			html = "Perma: ";
		}

		switch (this.type){
			case "range1":
				html += "Accuracy loss x 1.1"; break;
			case "damage1":
				html += "Damage x 0.9"; break;
			case "range2":
				html += "Accuracy loss x 1.2"; break;
			case "damage2":
				html += "Damage x 0.8"; break;
			case "disabled1":
				html += "Disabled"; break;
			case "launch1":
				html += "Launch Rate x 0.7";
				mod *= 0.7; break;
			case "launch2":
				html += "Launch Rate x 0.5";
				mod *= 0.5; break;
			case "launch3":
				html += "Launch Rate x 0.3";
				mod *= 0.3; break;
			case "bridge_accu-10":
				html += "Weapon to hit x 0.9"; break;
			case "bridge_nomove":
				html += "Unable to manover"; break;
			case "bridge_disabled1":
				html += "Unable to manover or fire."; break;
			case "output_0.9":
				html += "Output x 0.9";
				mod *= 0.9; break;
			case "output_0.85":
				html += "Output x 0.85";
				mod *= 0.85; break;
			case "output_0.8":
				html += "Output x 0.8";
				mod *= 0.8; break;
			case "output_0.7":
				html += "Output x 0.7";
				mod *= 0.7; break;
			case "output_0.5":
				html += "Output x 0.5";
				mod *= 0.5; break;
			case "output_0":
				html += "Disabled";
				mod *= 0; break;
			default: 
				html += this.type; break;
		}

		this.html = html;
		this.outputMod = mod;
	}

	this.inEffect = function(){
		if (this.duration == 0){
			return true;
		}
		else if (game.turn <= this.turn + this.duration){
			return true;
		}
		else return false;
	}


	this.create();
}

function Structure(id, parentId, start, end, integrity, negation, destroyed){
	this.name = "Structure";
	this.display = "Structure";
	this.id = id;
	this.parentId = parentId;
	this.start = start;
	this.end = end;
	this.integrity = integrity;
	this.negation = negation;
	this.destroyed = destroyed || false;
	this.highlight = false;
	this.systems = [];
	this.damages = [];
	this.direction;

	this.getTableRow = function(){
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.className = "struct";

		var rem = this.getRemainingIntegrity();

		var span = document.createElement("div");
			span.className = "integrityAmount";
			span.innerHTML = rem + " / " + this.integrity;
			td.appendChild(span);

		var lowerDiv = document.createElement("div");
			lowerDiv.className = "integrityNow";
			lowerDiv.style.width =  rem/this.integrity * 100 + "%";
			td.appendChild(lowerDiv);
			
		var upperDiv = document.createElement("div");
			upperDiv.className = "integrityFull";
			td.appendChild(upperDiv);

		$(td).data("shipId", this.parentId);
		$(td).data("systemId", this.id);
		$(td).hover(
			function(e){
				var shipId = $(this).data("shipId");
				var systemId = $(this).data("systemId");
				game.getShipById(shipId).getSystemById(systemId).hover(e);
			},
			function(e){
				var shipId = $(this).data("shipId");
				var systemId = $(this).data("systemId");
				game.getShipById(shipId).getSystemById(systemId).hover(e);
			}
		)
		$(td).click(function(e){
			var shipId = $(this).data("shipId");
			var systemId = $(this).data("systemId");
			console.log(game.getShipById(shipId).getSystemById(systemId));
		})

		tr.appendChild(td);
		return tr;
	}

	this.getDirection = function(){
		var a = this.start;
		var b = this.end;

		if (a == 0 && b == 360){
			return 0;
		}
		else if (a > b){
		   c = a + b;
		}
		else {
		   c = (a + b) / 2;
		}

		if (a > 90 && b < -90 && a+b == 0){
			c = 180;
		}

		return c;
	}

	this.hover = function(e){
		if (game.flightDeploy){return false;}
		if (this.highlight){
			this.highlight = false;
			fxCtx.clearRect(0, 0, res.x, res.y);
			$("#systemDetailsDiv").remove();
			game.getShipById(this.parentId).highlightAllSelectedWeapons();
		}
		else {
			this.highlight = true;
			this.showHitAxis();
			this.showInfoDiv(e);
		}
	}

	this.showHitAxis = function(){
		game.getShipById(this.parentId).drawStructureAxis(this);
	}

	this.showInfoDiv = function(e){
		$(document.body).append(
			$(this.getSystemDetailsDiv())
				.css("left", e.clientX + 20)
				.css("top", e.clientY + 20)
			)
	}

	this.getSystemDetailsDiv = function(){
		var div = document.createElement("div");
			div.id = "systemDetailsDiv";
		var table = document.createElement("table");
			
		var tr = document.createElement("tr");
		var th = document.createElement("th"); th.colSpan = 2;
			th.innerHTML = "Outer Armour"; tr.appendChild(th); table.appendChild(tr);

		var tr = document.createElement("tr");
		var td = document.createElement("td"); td.style.width = "40%";
			td.innerHTML = "Amount"; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = this.getRemainingIntegrity() + " / " + this.integrity; tr.appendChild(td); table.appendChild(tr);


	/*	var tr = document.createElement("tr");
		var td = document.createElement("td"); td.style.width = "40%";
			td.innerHTML = "Dmg Mitigation"; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = this.getRemainingMitigation() + "%" + " / " + this.mitigation + "%"; tr.appendChild(td); table.appendChild(tr);
	*/	
		var tr = document.createElement("tr");
		var td = document.createElement("td"); td.style.width = "40%";
			td.innerHTML = "Dmg Negation"; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = this.getRemainingNegation() + " / " + this.negation; tr.appendChild(td); table.appendChild(tr);

		div.appendChild(table);
			
		return div;
	}

	this.getRemainingIntegrity = function(){
		var integrity = this.integrity;
		for (var i = 0; i < this.damages.length; i++){
			integrity -= this.damages[i].armourDmg;
		}
		return Math.floor(integrity);
	}

	this.getRemainingMitigation = function(){
		return Math.round((Math.pow(this.getRemainingIntegrity(), 0.75) / Math.pow(this.integrity, 0.75)) * this.mitigation);
	}

	this.getRemainingNegation = function(){
		return Math.floor((this.getRemainingIntegrity() / this.integrity) * this.negation);
		return Math.round((Math.pow(this.getRemainingIntegrity(), 1) / Math.pow(this.integrity, 1)) * this.negation);
	}
}

function Primary(id, parentId, integrity, damages, destroyed){
	Structure.call(this, id, parentId, 0, 360, integrity, 0, destroyed);
	this.name = "Primary";
	this.display = "Primary";
	this.damages = damages
	this.highlight = false;	
	this.systems = [];
	
	this.getTableRow = function(){
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.className = "struct";
			td.colSpan = 2;

		var rem = this.getRemainingIntegrity();

		var span = document.createElement("div");
			span.className = "integrityAmount";
			span.innerHTML = rem + " / " + this.integrity;
			td.appendChild(span);

		var lowerDiv = document.createElement("div");
			lowerDiv.className = "integrityNow";
			lowerDiv.style.width =  rem/this.integrity * 100 + "%";
			td.appendChild(lowerDiv);
			
		var upperDiv = document.createElement("div");
			upperDiv.className = "integrityFull";
			td.appendChild(upperDiv);

		$(td).data("shipId", this.parentId);
		$(td).data("systemId", this.id);
		$(td).hover(
			function(e){
				var shipId = $(this).data("shipId");
				var systemId = $(this).data("systemId");
				game.getShipById(shipId).primary.hover(e);
			}
		)
		$(td).click(function(e){
			var shipId = $(this).data("shipId");
			var systemId = $(this).data("systemId");
			console.log(game.getShipById(shipId).primary);
		})

			tr.appendChild(td);
			
		return tr;
	}

	this.hover = function(e){
		if (game.flightDeploy){return false;}
		if (this.highlight){
			this.highlight = false;
			$("#systemDetailsDiv").remove();
		}
		else {
			this.highlight = true;
			this.showInfoDiv(e);
		}
	}

	this.getSystemDetailsDiv = function(){
		var div = document.createElement("div");
			div.id = "systemDetailsDiv";
		var table = document.createElement("table");
			
		var tr = document.createElement("tr");
		var th = document.createElement("th"); th.colSpan = 2;
			th.innerHTML = "Main Structure"; tr.appendChild(th); table.appendChild(tr);
			
		var tr = document.createElement("tr");
		var td = document.createElement("td"); td.style.width = "40%";
			td.innerHTML = "Integrity"; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = this.getRemainingIntegrity() + " / " + this.integrity; tr.appendChild(td); table.appendChild(tr);

		div.appendChild(table);
			
		return div;
	}

	this.getRemainingIntegrity = function(){
		var integrity = this.integrity;
		for (var i = 0; i < this.damages.length; i++){
			integrity -= this.damages[i].structDmg;
		}
		return integrity;
	}
}
Primary.prototype = Object.create(Structure.prototype);
