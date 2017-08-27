function Point(x, y){
	this.x = Math.floor(x);
	this.y = Math.floor(y);
	
	this.getOffset = function(){
		return { x: Math.round((this.x - cam.o.x) / cam.z), y: Math.round((this.y - cam.o.y) / cam.z) }
	}
}

function Move(id, type, dist, x, y, a, delay, cost, costmod, resolved){
	this.id = id;
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
	this.rolls = [];

	if (data.turn < game.turn){return;}
	if (typeof data.notes === "string"){
		if (!data.notes.length || data.notes == "add"){
			return;
		}
		else if (data.notes[0] == " "){
			data.notes = data.notes.slice(1, data.notes.length);
		}
		else if (data.notes[data.notes.length-1] == " "){
			data.notes = data.notes.slice(0, data.notes.length-1);
		}

		this.rolls = data.notes.split(' ').map(Number);
	} else this.rolls.push(data.notes);
	//console.log(this.rolls);

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
	this.notes = data.notes;
	this.system = "";
}

function Warhead(data){
	this.id = data.id;
	this.parentId = data.parentId;
	this.minDmg = data.minDmg;
	this.maxDmg = data.maxDmg;
	this.shots = data.shots;
	this.traverse = data.traverse;
	this.fireOrders = [];
}

Warhead.prototype.getShots = function(){
	return 1;
}

Warhead.prototype.getDisplay = function(){
	return "Warhead Impact";
	//return game.getUnitById(this.parentId).display;
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
			.append($("<tr>").append($("<th>").attr("colspan", 2).html(this.name)))
			.append($("<tr>").append($("<td>").html("Mass / Turn Delay").css("width", 120)).append($("<td>").html(this.mass)))
			.append($("<tr>").append($("<td>").html("Engine Power")).append($("<td>").html(this.ep)))
			.append($("<tr>").append($("<td>").html("Armour")).append($("<td>").html(this.negation)))
			//.append($("<tr>").append($("<td>").html("Side Armour")).append($("<td>").html(this.negation[1])))
			//.append($("<tr>").append($("<td>").html("Rear Armour")).append($("<td>").html(this.negation[2])))

	if (this.crits.length){
			$(table)
				.append($("<tr>").append($("<td>").attr("colspan", 2).css("fontSize", 16).css("borderBottom", "1px solid white").css("borderTop", "1px solid white").html("Modifiers")))

		for (var i = 0; i < this.crits.length; i++){
			val = this.crits[i].html;
			$(table)
				.append($("<tr>").append($("<td>").attr("colSpan", 2).addClass("negative").html(val)))
		}
	}
		
	div.appendChild(table[0]);
	return div;
}

function Missile(data){
	Single.call(this, data);
	this.traverse = data.traverse;
}
Missile.prototype = Object.create(Single.prototype);



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
			return  (this.type + " (Incl. Turn " + (this.turn + this.duration + ")"));
		}
		else if (!this.duration){
			return (this.type + ": -" + (this.value*100) + "%" + " (Permanent)");
		} else return (this.type + ": -" + (this.value*100) + "%" + " (Incl. Turn " + (this.turn + this.duration + ")"));
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
	//this.armourDmg = data.armourDmg;
	this.destroyed = data.destroyed || false;
	this.highlight = false;
	this.systems = [];
	this.damages = [];
	this.direction;

	this.getRemainingNegation = function(){
		return this.remainingNegation;
	}

	this.getTableRow = function(){
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.className = "struct";

		var rem = this.getRemainingNegation();

		var span = document.createElement("div");
			span.className = "integrityAmount";
			span.innerHTML = rem + " / " + this.negation;
			td.appendChild(span);

		var lowerDiv = document.createElement("div");
			lowerDiv.className = "integrityNow";
			lowerDiv.style.width =  rem/this.negation * 100 + "%";
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
		return $("<div>").attr("id", "systemDetailsDiv")
			.append($("<table>")
				.append($("<tr>")
					.append($("<th>").html("Outer Armour").attr("colSpan", 2)))
				.append($("<tr>").attr("colSpan", 2)
					.append($("<td>").html("Strength"))
					.append($("<td>").html(this.getRemainingNegation() + " / " + this.negation))));
	}

	this.getRemainingIntegrity = function(){
		var integrity = this.integrity;
		for (var i = 0; i < this.damages.length; i++){
			integrity -= this.damages[i].armourDmg;
		}
		return Math.floor(integrity);
	}
}


function Primary(data){
	this.name = "Primary";
	this.display = "Primary";
	this.id = data.id;
	this.parentId = data.parentId;
	this.integrity = data.integrity;
	this.damages = data.damages
	this.destroyed = data.destroyed || false;
	this.highlight = false;	
	this.systems = [];
	this.remaining = data.remaining;
	
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
			//game.getUnitById(shipId).primary.scan();
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