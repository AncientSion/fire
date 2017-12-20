function Point(x, y){
	this.x = Math.floor(x);
	this.y = Math.floor(y);
	
	this.getOffset = function(){
		return { x: Math.round((this.x - cam.o.x) / cam.z), y: Math.round((this.y - cam.o.y) / cam.z) }
	}
}

function Move(id, type, dist, x, y, a, delay, cost, costmod, manual, resolved){
	this.id = id;
	this.turn = game.turn;
	this.type = type;
	this.dist = dist;
	this.x = x;
	this.y = y;
	this.a = a;
	this.delay = delay;
	this.cost = cost;
	this.costmod = costmod;
	this.manual = manual;
	this.resolved = resolved;
	this.animated = false
	this.s = false;
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
		
		this.m = Math.sqrt((Math.pow(this.x, 2) + Math.pow(this.y, 2)));
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
	this.req = [data.req];
	this.notes = data.notes || "";
	this.hits = [data.hits] || 0;
	this.resolved = data.resolved || 0;
	this.dist;
	this.guns = 1;
	this.animated = 0;
	this.anim = [];
	this.damages = [];
	this.min;
	this.max;
	this.found = false;
	this.rolls = data.notes.slice(0, data.notes.length-1).split(";").map(Number);
	this.systems = [];
	this.animating = 0;
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
	this.overkill = data.overkill;
	this.negation = data.negation;
	this.destroyed = data.destroyed;
	this.notes = data.notes.slice(0, data.notes.length-1).split(";");
	this.system = "";
	this.loc = {x: 0, y: 0};
}

function Single(data){
	this.id = data.id;
	this.parentId = data.parentId;
	this.name = data.name;
	this.cost = data.cost;
	this.display = data.display;
	this.ep = data.ep;
	this.mass = data.mass;
	this.integrity = data.integrity;
	this.value = data.value;
	this.negation = data.negation;
	this.damages = data.damages || [];
	this.crits = [];
	this.baseHitChance = data.baseHitChance;
	this.destroyed = data.destroyed;
	this.disabled = data.disabled;
	this.systems = [];
	this.draw = 1;
	this.layout = {};
	this.fighter = 0;
	this.missile = 0;
	this.squaddie = 0;
}

Single.prototype.isDestroyedThisTurn = function(){
	if (this.disabled){
		for (var j = this.crits.length-1; j >= 0; j--){
			if (this.crits[j].type == "Disabled" && this.crits[j].turn == game.turn){
				return true;
			}
		}
	}
	else if (this.destroyed){
		for (var j = this.damages.length-1; j >= 0; j--){
			if (this.damages[j].destroyed == 1 && this.damages[j].turn == game.turn){
				return true;
			}
		}					
	}
	return false;
}

Single.prototype.isDamagedThisTurn = function(){
	for (var i = this.damages.length-1; i >= 0; i--){
		if (this.damages[i].turn == game.turn){
			return true;
		} else if (this.damages[i].turn < game.turn){
			return false;
		}
	}				
	return false;
}

Single.prototype.getRemainingIntegrity = function(){
	var integrity = this.integrity;
	for (var i = 0; i < this.damages.length; i++){
		integrity -= this.damages[i].structDmg;
	}
	return integrity;
}

Single.prototype.hover = function(e){
	if (!this.highlight){
		this.highlight = true;
		var ele = this.getDetailsDiv();
		$(document.body).append(ele);
		var w = $(ele).width();
		$(ele).css("left", e.clientX - w/2).css("top", e.clientY + 40)
	}
	else {
		this.highlight = false;
		$("#systemDetailsDiv").remove();
	}
}

Single.prototype.getDetailsDiv = function(){
	var div = document.createElement("div");
		div.id = "systemDetailsDiv";
		div.className = this.id + " flight";

		var table = $("<table>")
			.append($("<tr>").append($("<th>").attr("colSpan", 2).html(this.name)))
			.append($("<tr>").append($("<td>").html("Mass").css("width", 120)).append($("<td>").html(this.mass)))
			//.append($("<tr>").append($("<td>").html("Engine Power")).append($("<td>").html(this.ep)))
			.append($("<tr>").append($("<td>").html("Armour")).append($("<td>").html(this.negation)))
			//.append($("<tr>").append($("<td>").html("Side Armour")).append($("<td>").html(this.negation[1])))
			//.append($("<tr>").append($("<td>").html("Rear Armour")).append($("<td>").html(this.negation[2])))

	if (this.crits.length){
			$(table)
				.append($("<tr>").append($("<td>").attr("colSpan", 2).css("fontSize", 16).css("borderBottom", "1px solid white").css("borderTop", "1px solid white").html("Modifiers")))

		for (var i = 0; i < this.crits.length; i++){
			$(table)
				.append($("<tr>").append($("<td>").attr("colSpan", 2).addClass("negative").html(this.crits[i].getString())))
		}
	}
		
	div.appendChild(table[0]);
	return div;
}

function Missile(data){
	Single.call(this, data);
	this.missile = 1;
	this.traverse = data.traverse;
	this.baseImpulse = data.baseImpulse;

	this.create(data);
}

Missile.prototype = Object.create(Single.prototype);

Missile.prototype.create = function(data){
	for (var k = 0; k < data.systems.length; k++){
		this.systems.push(new Warhead(data.systems[k]));
	}
	for (var k = 0; k < data.crits.length; k++){
		this.crits.push(new Crit(data.crits[k]));
	}
}

function Crit(data){
	this.id = data.id;
	this.shipid = data.shipid;
	this.systemid = data.systemid;
	this.turn = data.turn;
	this.type = data.type;
	this.duration = data.duration;
	this.value = data.value;

	//this.html = this.type + ": -" + this.value * 100 + "%"; 

	this.create = function(){
		var html = "";
		var mod = 1;
		if (this.duration > 0){
			html = "Turn " + (this.turn + this.duration) +": ";
		} else html = "Permanent: ";

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

	this.getString = function(){
		var d = "";

		if (this.type == "Disabled"){
			if (this.duration){
				return  (this.type + " (Incl. Turn " + (this.turn + this.duration + ")"));
			} else return ("Disengaged");
		}
		else if (!this.duration){
			return (this.type + ": -" + (this.value) + "%" + " (Permanent)");
		} else return (this.type + ": -" + (this.value) + "%" + " (Incl. Turn " + (this.turn + this.duration + ")"));
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


	//this.create();
}

function Structure(data){
	this.name = "Structure";
	this.display = "Structure";
	this.armourDmg = data.armourDmg;
	this.id = data.id;
	this.parentId = data.parentId;
	this.start = data.start;
	this.end = data.end;
	this.negation = data.negation;
	this.remainingNegation = data.remainingNegation;
	this.destroyed = data.destroyed || false;
	this.highlight = false;
	this.systems = [];
	this.damages = [];
	this.powers = data.powers;
	this.direction;
	this.element;
	this.effiency = data.effiency;
	this.boostEffect = data.boostEffect;
}

Structure.prototype.getRemainingNegation = function(){
	return this.remainingNegation;
}

Structure.prototype.getArmourString = function(){
	if (this.boostEffect.length){
		return this.remainingNegation + "<span style='color: #27e627; font-size: 16px'>+" + (this.getBoostEffect("Armour") * this.getBoostLevel()) + "</span> / " + this.negation;
	}
	return this.remainingNegation + " / " + this.negation;
}

Structure.prototype.getDirection = function(){
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

Structure.prototype.getTableData = function(){
	var td = document.createElement("td");
		td.className = "armour";

	var span = document.createElement("div");
		span.className = "integrityAmount font16";
		span.innerHTML = this.getArmourString();
		td.appendChild(span);

	var lowerDiv = document.createElement("div");
		lowerDiv.className = "integrityNow";
		lowerDiv.style.width =  this.getRemainingNegation()/this.negation * 100 + "%";
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
			game.getUnit(shipId).getSystemById(systemId).hover(e);
		},
		function(e){
			var shipId = $(this).data("shipId");
			var systemId = $(this).data("systemId");
			game.getUnit(shipId).getSystemById(systemId).hover(e);
		}
	)
	$(td).click(function(e){
		var shipId = $(this).data("shipId");
		var systemId = $(this).data("systemId");
		console.log(game.getUnit(shipId).getSystemById(systemId));
	})

	this.element = td;

	return td;
}

Structure.prototype.hover = function(e){
	if (game.flightDeploy){return false;}
	if (this.highlight){
		this.highlight = false;
		fxCtx.clearRect(0, 0, res.x, res.y);
		this.hideInfoDiv();
		this.hideOptions();
		game.getUnit(this.parentId).highlightAllSelectedWeapons();
	}
	else {
		this.highlight = true;
		this.drawArc();
		this.showInfoDiv(e);
		this.showOptions();
	}
}

Structure.prototype.showOptions = function(){
	if (this.locked || game.phase != -1 || game.getUnit(this.parentId).userid != game.userid ){return;}

	var ele = $(this.element);
	var boost = this.effiency;

	if (boost){
		ele.find(".boostDiv").show();
	}
}

Structure.prototype.hideOptions = function(){
	if (this.locked || game.phase != -1 || game.getUnit(this.parentId).userid != game.userid ){return;}
	var ele = $(this.element);

	if (game.phase == -1 && this.effiency){
			$(ele) .find(".boostDiv").hide().end();
	}
}

Structure.prototype.showInfoDiv = function(e){
	$(document.body).append(
		$(this.getSystemDetailsDiv())
			.css("left", e.clientX - 90)
			.css("top", e.clientY + 40)
		)
}

Structure.prototype.hideInfoDiv = function(e){
	$("#systemDetailsDiv").remove();
}

Structure.prototype.getSystemDetailsDiv = function(){
	var div = $("<div>").attr("id", "systemDetailsDiv")

	var table = $("<table>")
		.append($("<tr>")
			.append($("<th>").html("Outer Armour").attr("colSpan", 2)))
		.append($("<tr>")
			.append($("<td>").html("Armour Strength"))
			.append($("<td>").html(this.getRemainingNegation() + " / " + this.negation)));

	if (this.boostEffect.length){
		var boost = this.getBoostEffect("Armour");
		if (boost){
			table.append($("<tr>")
					.append($("<th>").html("EA Energy Web").attr("colSpan", 2)))
				.append($("<tr>")
					.append($("<td>").html("Current Extra Armour"))
					.append($("<td>").html(this.getBoostEffect("Armour") * this.getBoostLevel()).addClass("boostEffect")))
				.append($("<tr>")
					.append($("<td>").html("Boost Power Cost"))
					.append($("<td>").html(this.getEffiency()).addClass("powerCost")));
		}
	}

	return div.append(table);
}

Structure.prototype.update = function(){
	this.updateSystemDetailsDiv();
	//$(this.element).find(".outputMask").html(this.getOutput());
}

Structure.prototype.updateSystemDetailsDiv = function(){
	$("#systemDetailsDiv")
		.find(".boostEffect").html(this.getBoostEffect("Armour") * this.getBoostLevel()).end()
		.find(".powerCost").html(this.getEffiency());
	$(this.element).find(".integrityAmount").html(this.getArmourString());
}

Structure.prototype.getCurrentPowerUsage = function(){
	return System.prototype.getCurrentPowerUsage.call(this);
}

Structure.prototype.getEffiency = function(){
	return System.prototype.getEffiency.call(this);
}

Structure.prototype.getBoostCostIncrease = function(){
	return 0.5;
}

Structure.prototype.getBoostLevel = function(){
	return System.prototype.getBoostLevel.call(this);
}

Structure.prototype.plus = function(){
	return System.prototype.plus.call(this);
}

Structure.prototype.minus = function(){
	return System.prototype.minus.call(this);
}

Structure.prototype.doBoost = function(){
	return System.prototype.doBoost.call(this);
}

Structure.prototype.canUnboost = function(){
	return System.prototype.canUnboost.call(this);
}

Structure.prototype.doUnboost = function(){
	return System.prototype.doUnboost.call(this);
}

Structure.prototype.getBoostEffect = function(val){
	return System.prototype.getBoostEffect.call(this, val);
}

Structure.prototype.getRemainingIntegrity = function(){
	var integrity = this.integrity;
	for (var i = 0; i < this.damages.length; i++){
		integrity -= this.damages[i].armourDmg;
	}
	return Math.floor(integrity);
}

Structure.prototype.drawArc = function(){
	if (game.animating){return;}
	if (this.tiny){return;}

	fxCtx.clearRect(0, 0, res.x, res.y);
	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z);

	var facing = game.getUnit(this.parentId).getPlannedFacing()
	var pos = game.getUnit(this.parentId).getPlannedPos()
	var p1 = getPointInDirection(1000, this.start + facing, pos.x, pos.y);
	var p2 = getPointInDirection(1000, this.end + facing, pos.x, pos.y)
	var dist = getDistance( {x: pos.x, y: pos.y}, p1);
	var rad1 = degreeToRadian(this.start + facing);
	var rad2 = degreeToRadian(this.end + facing);

	fxCtx.globalAlpha = 1;
	fxCtx.beginPath();			
	fxCtx.moveTo(pos.x, pos.y);
	fxCtx.arc(pos.x, pos.y, dist, rad1, rad2, false);
	fxCtx.closePath();		
	fxCtx.fillStyle = "white";
	fxCtx.fill();
	fxCtx.globalAlpha = 1;
	fxCtx.setTransform(1, 0, 0, 1, 0, 0);
}

Structure.prototype.getBoostDiv = function(){
	return System.prototype.getBoostDiv.call(this);
}

function Section(data){
	this.start = data.start;
	this.end = data.end;
	this.systems = [];
}

Section.prototype.getDirection = function(){
	return Structure.prototype.getDirection.call(this);
}



function Core(data){
	this.name = "Core";
	this.display = "Core";
	this.id = data.id;
	this.parentId = data.parentId;
	this.integrity = data.integrity;
	this.remaining = data.remaining;
	this.negation = data.negation;
	this.remainingNegation = data.remainingNegation;
	this.damages = [];
	this.destroyed = data.destroyed || false;
	this.highlight = false;	
	this.systems = [];
	this.coreElement;
	this.armourElement;
}

Core.prototype.getRemainingNegation = function(){
	return this.remainingNegation;
}

Core.prototype.getArmourString = function(){
	return this.remainingNegation + " / " + this.negation;
}

Core.prototype.getCoreData = function(){
	var tr = document.createElement("tr");
	var td = document.createElement("td");
		td.className = "struct"; td.colSpan = 3;

	var span = document.createElement("div");
		span.className = "integrityAmount";
		span.className += " font15";
		span.innerHTML = this.remaining + " / " + this.integrity;
		td.appendChild(span);

	var lowerDiv = document.createElement("div");
		lowerDiv.className = "integrityNow";
		lowerDiv.style.width =  this.remaining/this.integrity * 100 + "%";
		td.appendChild(lowerDiv);
		
	var upperDiv = document.createElement("div");
		upperDiv.className = "integrityFull";
		td.appendChild(upperDiv);

	tr.appendChild(td);	
	this.coreElement = tr;
	return tr;
}

Core.prototype.getArmourData = function(){
	var tr = document.createElement("tr");
	var td = document.createElement("td");
		td.className = "armour"; td.colSpan = 3;

	var span = document.createElement("div");
		span.className = "integrityAmount font16";
		span.innerHTML = this.getArmourString();
		td.appendChild(span);

	var lowerDiv = document.createElement("div");
		lowerDiv.className = "integrityNow";
		lowerDiv.style.width =  this.getRemainingNegation()/this.negation * 100 + "%";
		td.appendChild(lowerDiv);
		
	var upperDiv = document.createElement("div");
		upperDiv.className = "integrityFull";
		td.appendChild(upperDiv);

	tr.appendChild(td);
	this.armourElement = tr;
	return tr;
}


function Primary(data){
	this.name = "Primary";
	this.display = "Primary";
	this.id = data.id;
	this.parentId = data.parentId;
	this.integrity = data.integrity;
	this.damages = [];
	this.destroyed = data.destroyed || false;
	this.highlight = false;	
	this.systems = [];
	this.remaining = data.remaining;
	this.element;
	
	this.getTableData = function(){
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.className = "struct";
			//td.colSpan = 2;

		var span = document.createElement("div");
			span.className = "integrityAmount";
			if (this.integrity > 999){
				span.className += " font15";
			} else span.className += " font18";
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
				game.getUnit(shipId).primary.hover(e);
			}
		)
		$(td).click(function(e){
			var shipId = $(this).data("shipId");
			var systemId = $(this).data("systemId");
			console.log(game.getUnit(shipId).primary);
			//game.getUnit(shipId).primary.scan();
		})

			tr.appendChild(td);
			
		this.element = tr;
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

	this.showInfoDiv = function(e){
		$(document.body).append(
			$(this.getSystemDetailsDiv())
				.css("left", e.clientX - 90)
				.css("top", e.clientY + 40)
			)
	}

	this.getSystemDetailsDiv = function(){
		return $("<div>").attr("id", "systemDetailsDiv")
			.append($("<table>")
				.append($("<tr>")
					.append($("<th>").html("Main Structure").attr("colSpan", 2)))
				.append($("<tr>").attr("colSpan", 2)
					.append($("<td>").html("Strength"))
					.append($("<td>").html(this.remaining + " / " + this.integrity))));
	}


	this.getRemainingIntegrity = function(){
		var integrity = this.integrity;
		for (var i = 0; i < this.damages.length; i++){
			integrity -= this.damages[i].structDmg;
			if (this.damages[i].overkill){
				console.log("dnig");
			}
		}
		return integrity;
	}
}