function Point(x, y){
	this.x = Math.floor(x);
	this.y = Math.floor(y);
	
	this.getOffset = function(){
		return { x: Math.round((this.x - cam.o.x) / cam.z), y: Math.round((this.y - cam.o.y) / cam.z) }
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

function BallVector(a, b, s, h){
	this.x;
	this.y;
	this.nx;
	this.ny;
	this.n = 0;
	this.m;
	this.done = 0;
	this.f;
	this.h = h;
	
	this.setup = function(){
		this.ox = a.x;
		this.oy = a.y;
		this.tx = b.x;
		this.ty = b.y;
		this.x = b.x - a.x;
		this.y = b.y - a.y;

		this.f = getAngleFromTo(a, b);
		
		var x = Math.pow(this.x, 2);
		var y = Math.pow(this.y, 2);
		var m = (x + y);
		
		this.m = Math.sqrt(m);
		this.nx = this.x/this.m*s;
		this.ny = this.y/this.m*s;
		this.m /= s;
	}
	
	this.setup();
}

function BeamVector(o, a, b, n, m, h){
	this.ox = o.x;
	this.oy = o.y;
	this.n = n;
	this.m = m;
	this.h = h;
	this.done = 0;
	this.x;
	this.y;


	this.setup = function(){
		this.tax = a.x;
		this.tay = a.y;
		this.tbx = b.x;
		this.tby = b.y;
		this.x = b.x - a.x;
		this.y = b.y - a.y;
		
		var x = Math.pow(this.x, 2);
		var y = Math.pow(this.y, 2);
		var m = (x + y);
		
		this.nx = this.x/this.m;
		this.ny = this.y/this.m;
	}
	this.setup();
}


function Vector(a, b){
	this.x;
	this.y;
	this.nx;
	this.ny;
	this.n = 0;
	this.m;
	this.t = [];
	this.s = 0;
	this.done = 0;
	
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

//	type 1 - charge up
//	type 0 - unpower
function Power(data){
	this.id = data.id;
	this.unitid = data.unitid;
	this.systemid = data.systemid;
	this.turn = data.turn;
	this.type = data.type;
	this.cost = data.cost;
	this.new = data.new || 0;
}	

function Marker(shooterid, targetid, systemid, turn){
	this.shooterid = shooterid;
	this.targetid = targetid;
	this.systemid = systemid;
	this.turn = turn;
}

function FireOrder(data){
	this.id = data.id || -1;
	this.turn = data.turn || game.turn;
	this.shooterid = data.shooterid || -1;
	this.targetid = data.targetid || -1;
	this.weaponid = data.weaponid || -1;
	this.shots = data.shots || 0;
	this.req = data.req || 0;
	this.notes = data.notes || "";
	this.hits = data.hits || 0;
	this.resolved = data.resolved || 0;
	this.dist;
	this.guns = 1;
	this.animated = false;
	this.anim = [];
	this.damages = [];
	this.min;
	this.max;
	this.found = false;

	this.drawSelf = function(){
		return;
	}
}

function Damage(data){
	this.id = data.id;
	this.fireid = data.fireid;
	this.gameid = data.gameid;
	this.shipid = data.shipid;
	this.structureid = data.structureid;
	this.systemid = data.systemid;
	this.turn = data.turn;
	this.roll = data.roll;
	this.type = data.type;
	this.totalDmg = data.totalDmg;
	this.shieldDmg = data.shieldDmg;
	this.structDmg = data.structDmg;
	this.armourDmg = data.armourDmg;
	this.mitigation = data.mitigation;
	this.negation = data.negation;
	this.destroyed = data.destroyed;
	this.notes = data.notes;
}

function Ammo(data){
	this.id = data.id;
	this.name = data.name;
	this.cost = data.cost;
	this.display = data.display;
	this.exploSize = data.exploSize;
	this.minDmg = data.minDmg;
	this.maxDmg = data.maxDmg;
	this.impulse = data.impulse;
	this.size = data.mass*3;
	this.mass = data.mass;
	this.integrity = data.integrity;
	this.armour = data.armour;
	this.fc = data.fc;
	this.damages = data.damages || false;
	this.crits = data.crits;
	this.destroyed = data.destroyed;
	this.traverse = data.traverse;
	this.shots = 1;
	this.fireOrders = [];

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

	this.getRemainingIntegrity = function(){
		var integrity = this.integrity;
		for (var i = 0; i < this.damages.length; i++){
			integrity -= this.damages[i].structDmg;
		}
		return integrity;
	}
}

function Salvo(data){
	this.id = data.id;
	this.userid = data.userid;
	this.targetid = data.targetid;
	this.name = data.name;
	this.amount = data.amount;
	this.status = data.status;
	this.destroyed = data.destroyed;
	this.actions = data.actions;
	this.baseImpulse = data.baseImpulse;
	this.baseHitChance = data.baseHitChance;
	this.traverse = -4;
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
	this.display = "";
	this.ship = false;
	this.flight = false;
	this.salvo = true;
	this.nextStep;
	this.finalStep;
	this.anim = [];
	this.animated = false;
	this.layout = [];

	this.hasSystemSelected = function(name){
		return false;
	}

	this.setLayout = function(){
		for (var i = 0; i < this.structurs.length; i++){
			this.layout.push({x: range(-14, 14)});
		}
	}

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

	this.getPlannedPosition = function(){
		return new Point(this.x, this.y);
	}

	this.doHighlight = function(){
		if (this.highlight){
			this.highlight = false;
			game.draw();
		}	
		else {
			this.highlight = true;
			ctx.translate(cam.o.x, cam.o.y);
			ctx.scale(cam.z, cam.z);
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size/2, 0, 2*Math.PI, false);
			ctx.closePath();
			ctx.lineWidth = 5;
			ctx.globalAlpha = 1;
			if (this.friendly){ctx.strokeStyle = "green";}
			else {ctx.strokeStyle = "red";}
			ctx.stroke();
			ctx.setTransform(1,0,0,1,0,0);
		}
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

	this.getBaseImpulse = function(){
		return this.baseImpulse;
	}

	this.getAccelSteps = function(){
		return this.actions.length;
	}

	this.getTotalImpulse = function(){
		return Math.floor(this.getBaseImpulse() * this.getAccelSteps());
	}

	this.getTrackingString = function(){
		var t = game.getUnitById(this.targetid).traverse;
		var html = "Up to: "
		if (this.structures[0].traverse <= t){
			html +="<span class='green'>";
		} else html += "<span class='red'>";	
		return html += game.getUnitType(this.structures[0].traverse) + "</span>";
	}

	this.createDiv = function(){
		var div = document.createElement("div");
			div.className = "ammoDiv disabled";
			$(div).data("ammoId", this.id);
		
		var table = document.createElement("table");
			table.style.width = "95%"

		var tr = table.insertRow(-1);
		var td = tr.insertCell(-1); td.className = "header";	
			td.innerHTML = this.structures.length + "x '" + this.name + "' #" + this.id; td.colSpan = 4;

		var tr = table.insertRow(-1);
		var td = tr.insertCell(-1); td.className = "subHeader";
			td.innerHTML = this.display; td.colSpan = 4;

		var target = game.getUnitById(this.targetid);
		var tr = table.insertRow(-1);
		var td = tr.insertCell(-1);
			td.className = "subHeader";
			td.innerHTML = "Targeting: <font color='red'>" + target.name + " #" + target.id + "</font> -- Distance: "+ Math.ceil(getDistance({x: this.x, y: this.y}, {x: target.x, y: target.y})) + "px"; td.colSpan = 4;
		div.appendChild(table);

		var table = document.createElement("table");
			table.style.width = "95%"; table.style.marginTop = "20px";
    	$(table)
			.append($("<tr>")
	    		.append($("<th>").html("Impulse / Acceleration"))
	    		.append($("<th>").html("Armour"))
	    		.append($("<th>").html("Damage"))
	    		.append($("<th>").html("Tracking"))
			)
			.append($("<tr>")
	    		.append($("<td>").html(this.getTotalImpulse() + " / " + Math.floor(this.getBaseImpulse()) + " per Turn."))
	    		.append($("<td>").html(this.structures[0].armour))
	    		.append($("<td>").html(this.getDamage()))
	    		.append($("<td>").html(this.getTrackingString()))
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
					console.log(game.getBallById(aUnit).getSystemById($(this).data("id")));
				})
				
				if (status == "impact"){
					var img = new Image(); img.className = "ammoImpact"; img.src = "varIcons/impact.png";
					td.appendChild(img);
				}
				else if (status == "destroyed"){
					var img = new Image(); img.className = "ammoDestroyed"; img.src = "varIcons/destroyed.png";
					td.appendChild(img);
				}
				else if (status == "lostlock"){
					var img = new Image(); img.className = "ammoDestroyed"; img.src = "varIcons/destroyed.png";
					td.appendChild(img);
					//var img = new Image(); img.className = "ammoLostLock"; img.src = "/fire/varIcons/lostlock.png";
					//td.appendChild(img);
				}

				td.appendChild(window.ballImages[this.name.toLowerCase()].cloneNode(true))

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
			
		document.getElementById("game").appendChild(div);
	}

	this.select = function(){
		if (this.selected){
			this.doUnselect();
		}
		else {
			//this.intercept();
			console.log(this);
			this.doSelect();
		}
	}

	this.doSelect = function(){
		//console.log(this);
		aUnit = this.id;
		this.selected = true;
		this.enableDiv();
	}
	
	this.doUnselect = function(){
		aUnit = false;
		this.selected = false;
		this.disableDiv();
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
		this.size = 18;
		this.x = this.actions[this.actions.length-1].x;
		this.y = this.actions[this.actions.length-1].y;

		this.setImage();
		this.setDisplay();
		this.createDiv();
		this.setFacing();
		this.setLayout();
		this.setFinalStep();
		this.setNextStep();

		if (this.userid == game.userid){
			this.friendly = true;
		} else this.friendly = false;
	}

	this.setImage = function(){
		this.img = window.ballImages[this.name.toLowerCase()].cloneNode(true);
	}

	this.setDisplay = function(){
		this.display = this.structures[0].display;
	}

	this.setFacing = function(){
		var target = game.getUnitById(this.targetid);
		var start;
		var end;

		if (this.actions[this.actions.length-1].type == "impact"){
			start = this.actions[this.actions.length-2];
		}
		else {
			start = this.actions[this.actions.length-1];
		}

		if (!target.salvo){
			end = game.getUnitById(this.targetid).getBaseOffsetPos();
		}
		else if (this.status == "impact"){
			end = this.actions[this.actions.length-1];
		} 
		this.facing = Math.floor(getAngleFromTo(start, end));
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
	
	this.draw = function(){
		if (game.animateFire){return;}
		this.drawSelf();		
		this.drawIndicator();
		//this.drawCenterPoint();
	}

	this.drawSelf = function(){
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate((this.facing + 90) * (Math.PI/180));
		ctx.drawImage(this.img, 0 -this.size/2, 0 -this.size/2, this.size, this.size);
		ctx.restore();
	}

	this.drawIndicator = function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size/2, 0, 2*Math.PI, false);
		ctx.closePath();

		ctx.lineWidth = 1;
		ctx.globalAlpha = 0.8;
		if (this.userid == game.userid){ctx.strokeStyle = "green";}
		else {ctx.strokeStyle = "red";}
		ctx.stroke();
		ctx.lineWidth = 1;
		ctx.globalAlpha = 1;
		ctx.strokeStyle = "black";
	}

	this.drawCenterPoint = function(){
		ctx.beginPath();
		ctx.arc(0, 0, 2, 0, 2*Math.PI, false);
		ctx.closePath();
		ctx.fillStyle = "red";
		ctx.fill();
	}

	this.setFinalStep = function(){
		if (this.finalStep != undefined){
			return;
		}

		var target = game.getUnitById(this.targetid);

		if (target.salvo){
			if (target.finalStep == undefined){
				target.setFinalStep();
			}
			var vector = new Vector(target, game.getUnitById(target.targetid));
			var speedMod = this.getTotalImpulse() / target.getTotalImpulse();
			this.finalStep = getIntercept(this.getPlannedPosition(), target, vector, speedMod);
		}
		else {
			this.finalStep = target.getPlannedPosition();
		}
	}

	this.setNextStep = function(){
		var target = game.getUnitById(this.targetid);
		if (target.salvo){
			target = target.nextStep;
		}
		var dist = getDistance(this.getPlannedPosition(), this.finalStep);
		var impulse = this.getTotalImpulse();
		if (impulse < dist){
			var a = getAngleFromTo(this, target);
			this.nextStep = getPointInDirection(impulse, a, this.x, this.y);
		}
		else {
			this.nextStep = this.finalStep;
		}
	}

	this.drawFlightPath = function(){
		var goal;
		var target = game.getUnitById(this.targetid);
		if (target.salvo){
			goal = this.finalStep;
		}
		else {
			goal = target.getPlannedPosition();
		}
		var origin = this.actions[this.actions.length-1];

		var inRange = false;
		if (this.nextStep == this.finalStep){
			inRange = true;
		}

		//var t = getPointInDirection(step, a, this.x, this.y);

		salvoCtx.translate(cam.o.x, cam.o.y);
		salvoCtx.scale(cam.z, cam.z)
		salvoCtx.translate(origin.x, origin.y);
		salvoCtx.beginPath();
		salvoCtx.moveTo(0, 0);
		salvoCtx.translate(-origin.x + this.nextStep.x, -origin.y + this.nextStep.y);
		salvoCtx.lineTo(0, 0);
		salvoCtx.closePath();

		salvoCtx.globalAlpha = 1;
		salvoCtx.strokeStyle = "white";
		salvoCtx.lineWidth = 1;
		salvoCtx.stroke();
		salvoCtx.setTransform(1,0,0,1,0,0);

		if (!inRange){
			salvoCtx.translate(cam.o.x, cam.o.y);
			salvoCtx.scale(cam.z, cam.z)
			salvoCtx.translate(this.nextStep.x, this.nextStep.y);
			salvoCtx.beginPath();
			salvoCtx.moveTo(0, 0);
			salvoCtx.translate(-this.nextStep.x + this.finalStep.x, -this.nextStep.y + this.finalStep.y);
			salvoCtx.lineTo(0, 0);
			salvoCtx.closePath();

			salvoCtx.globalAlpha = 1;
			salvoCtx.strokeStyle = "red";
			salvoCtx.stroke();
			salvoCtx.setTransform(1,0,0,1,0,0);
		}

		game.flightPath = true;
	}

	this.getShortInfo = function(){
		var ele = $("#shortInfo");
		if (this.userid == game.userid){
			$(ele).attr("class", "friendly");
		} else $(ele).attr("class", "hostile");

		var table = document.createElement("table");
			table.insertRow(-1).insertCell(-1).innerHTML = this.structures.length + "x " + this.name + " #" + this.id;
			table.insertRow(-1).insertCell(-1).innerHTML =  "Impulse: " + this.getTotalImpulse();
			table.insertRow(-1).insertCell(-1).innerHTML = "Base Hit: " + this.getHitChanceFromAngle() + "%";

		if (this.impactThisTurn()){
			var tr = table.insertRow(-1);
			if (game.phase < 3){
				tr.insertCell(-1).innerHTML = "<font color='red'>IMPACT IMMINENT</font>";
			}
			else if (this.actions[this.actions.length-1].type == "impact"){
				tr.insertCell(-1).innerHTML = "<font color='red'>DID IMPACT</font>";
			}
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
		target = game.getUnitById(this.targetid);
		if (getDistance({x: target.x, y: target.y}, {x: this.x, y: this.y}) <= this.getTotalImpulse()){
			return true;
		} else return false;
	}

	this.getHitChanceFromAngle = function(){
		return this.baseHitChance;
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

function Crit(data){
	this.id = data.id;
	this.shipid = data.shipid;
	this.systemid = data.systemid;
	this.turn = data.turn;
	this.type = data.type;
	this.duration = data.duration;
	this.html = "";
	this.outputMod = 0;

	this.create = function(){
		var html = "";
		var mod = 1;
		if (this.duration > 0){
			html = "Turn " + (this.turn + this.duration) +": ";
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
			case "disabled":
				html += "Disabled"; break;
			case "drain1":
				html += "Output -1"; break;
			case "drain":
				html += "Disabled"; break;
			case "launch1":
				html += "Launch Rate x 0.85";
				mod *= 0.85; break;
			case "launch2":
				html += "Launch Rate x 0.7";
				mod *= 0.7; break;
			case "launch3":
				html += "Launch Rate x 0.55";
				mod *= 0.55; break;
			case "bridge_accu-10":
				html += "Weapon to hit x 0.9"; break;
			case "bridge_nomove":
				html += "Unable to manover"; break;
			case "bridge_disabled1":
				html += "Unable to manover or fire."; break;
			case "output_0.95":
				html += "Output x 0.95";
				mod *= 0.9; break;
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

function Structure(data){
	this.name = "Structure";
	this.display = "Structure";
	this.id = data.id;
	this.parentId = data.parentId;
	this.start = data.start;
	this.end = data.end;
	this.integrity = data.integrity;
	this.negation = data.negation;
	this.destroyed = data.destroyed || false;
	this.highlight = false;
	this.systems = [];
	this.damages = [];
	this.direction;
	this.intBase = Math.floor(Math.pow(data.integrity, 1.5));
	this.remainingNegation;

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
				game.getUnitById(shipId).getSystemById(systemId).hover(e);
			},
			function(e){
				var shipId = $(this).data("shipId");
				var systemId = $(this).data("systemId");
				game.getUnitById(shipId).getSystemById(systemId).hover(e);
			}
		)
		$(td).click(function(e){
			var shipId = $(this).data("shipId");
			var systemId = $(this).data("systemId");
			console.log(game.getUnitById(shipId).getSystemById(systemId));
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
			game.getUnitById(this.parentId).highlightAllSelectedWeapons();
		}
		else {
			this.highlight = true;
			this.showHitAxis();
			this.showInfoDiv(e);
		}
	}

	this.showHitAxis = function(){
		game.getUnitById(this.parentId).drawSystemAxis(this);
	}

	this.showInfoDiv = function(e){
		$(document.body).append(
			$(this.getSystemDetailsDiv())
				.css("left", e.clientX - 90)
				.css("top", e.clientY + 40)			)
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

	this.getRemainingNegation = function(){
		//return Math.floor((this.getRemainingIntegrity() / this.integrity) * this.negation);
		return this.remainingNegation;
	}

	this.setRemainingNegation = function(){
		this.remainingNegation = Math.round((Math.pow(this.getRemainingIntegrity(), 1.5) / this.intBase) * this.negation);
	}
}

function Primary(data){
	Structure.call(this, data);
	this.name = "Primary";
	this.display = "Primary";
	this.damages = data.damages
	this.highlight = false;	
	this.systems = [];
	this.remaining;
	
	this.getTableRow = function(){
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.className = "struct";
			td.colSpan = 2;

		var span = document.createElement("div");
			span.className = "integrityAmount";
			span.innerHTML = this.remaining + " / " + this.integrity;
			td.appendChild(span);

		var lowerDiv = document.createElement("div");
			lowerDiv.className = "integrityNow";
			lowerDiv.style.width =  this.remaining/this.integrity * 100 + "%";
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
				game.getUnitById(shipId).primary.hover(e);
			}
		)
		$(td).click(function(e){
			var shipId = $(this).data("shipId");
			var systemId = $(this).data("systemId");
			console.log(game.getUnitById(shipId).primary);
		})

			tr.appendChild(td);
			
		return tr;
	}

	this.setRemainingIntegrity = function(){		
		this.remaining = this.getRemainingIntegrity();
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
			td.innerHTML = this.remaining + " / " + this.integrity; tr.appendChild(td); table.appendChild(tr);

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
