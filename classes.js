function Point(x, y){
	this.x = Math.floor(x);
	this.y = Math.floor(y);
	
	this.getOffset = function(){
		return { x: Math.round((this.x - cam.o.x) / cam.z), y: Math.round((this.y - cam.o.y) / cam.z) }
	}
}

function Move(id, unitid, turn, type, forced, dist, x, y, h, f, delay, cost, costmod, manual, resolved){
	this.id = id;
	this.unitid = unitid;
	this.turn = game.turn;
	this.type = type;
	this.forced = forced;
	this.dist = dist;
	this.x = x;
	this.y = y;
	this.h = h;
	this.f = f;
	this.delay = delay;
	this.cost = cost;
	this.costmod = costmod;
	this.manual = manual;
	this.resolved = resolved;
	this.animated = false;
	this.s = false;
	this.t = [0, 0]
}

function ShotVector(a, b, s, h){
	this.x;
	this.y;
	this.nx;
	this.ny;
	this.n = 0;
	this.m;
	this.done = 0;
	this.f;
	this.h = h;
	this.p = 0;

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
	this.p = 0;
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

		this.f = getAngleFromTo(o, a);
		
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
	this.m;
	
	this.setup = function(){
		this.x = b.x - a.x;
		this.y = b.y - a.y;
		
		var x = Math.pow(this.x, 2);
		var y = Math.pow(this.y, 2);
		
		this.m = Math.sqrt(x+y);	
		this.nx = this.x/this.m;
		this.ny = this.y/this.m;
	}
	
	this.setup();
}


function MoveVector(a, b){
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


function Damage(data){
	this.id = data.id;
	this.fireid = data.fireid;
	this.gameid = data.gameid;
	this.unitid = data.unitid;
	this.structureid = data.structureid;
	this.systemid = data.systemid;
	this.turn = data.turn;
	this.roll = data.roll;
	this.type = data.type;
	this.totalDmg = data.totalDmg;
	this.shieldDmg = data.shieldDmg;
	this.armourDmg = data.armourDmg;
	this.systemDmg = data.systemDmg;
	this.hullDmg = data.hullDmg;
	this.emDmg = data.emDmg;
	this.negation = data.negation;
	this.destroyed = data.destroyed;
	this.notes = data.notes.slice(0, data.notes.length-1).split(";");
	this.system = "";
	this.loc = {x: 0, y: 0};
}

function Crit(data){
	this.id = data.id;
	this.unitid = data.unitid;
	this.systemid = data.systemid;
	this.turn = data.turn;
	this.type = data.type;
	this.duration = data.duration;
	this.display = data.display;
	this.value = data.value;

	this.getString = function(){
		if (this.duration == -2){return ("Morale Fail: " + this.type + " " + (this.value) + "% (Turn " + this.turn + ")");}
		else if (this.type == "Disabled"){
			if (this.duration){return (this.type + " (Incl. Turn " + (this.turn + this.duration) + ")" + " (Turn " + this.turn + ")");
			} return this.type + " (Turn " + this.turn + ")";
		}
		else if (this.type == "Destroyed"){return this.type + " (Turn " + this.turn + ")";}
		else return (this.type + " " + (this.value) + "% (Turn " + this.turn + ")");
	}

	this.inEffect = function(){
		if (this.type == ""){return false;}
		if (this.duration < 1 || game.turn <= this.turn + this.duration){
			return true;
		}
		return false;
	}


	//this.create();
}

function Single(data){
	this.id = data.id;
	this.parentId = data.parentId;
	this.name = data.name;
	this.display = data.display;
	this.variant = data.variant;
	this.rarity = data.rarity;
	this.role = data.role;
	this.cost = data.cost;
	this.amount = data.amount;
	this.launch = data.launch;
	this.ep = data.ep || 0;
	this.mass = data.mass;
	this.remaining = data.remaining;
	this.recentDmg = data.recentDmg;
	this.newDmg = data.newDmg;
	this.emDmg = data.emDmg;
	this.integrity = data.integrity;
	this.negation = data.negation;
	this.baseHitChance = data.baseHitChance;
	this.destroyed = data.destroyed;
	this.disabled = data.disabled;
	this.baseImpulse = data.baseImpulse;
	this.critEffects = data.critEffects;
	this.powerReq = data.powerReq;
	this.size = data.size;
	this.damages = [];
	this.crits = [];
	this.systems = [];
	this.doDraw = 1;
	this.layout = {};
	this.fighter = 0;
	this.missile = 0;
	this.squaddie = 0;
}

Single.prototype.getSystemByName = function(name){
	for (var i = 0; i < this.systems.length; i++){
		if (this.systems[i].name == name){
			return this.systems[i];
		}
	}
	return false;
}

Single.prototype.hasPassiveJamming = function(){
	var jammer = this.getSystemByName("Jammer");
	if (!jammer || jammer.destroyed || jammer.disabled){
		return false;
	} return true;
}

Single.prototype.getJammerStrength = function(){
	return this.jamming;
}

Single.prototype.getBaseImage = function(){
	if (this.variant.length > 2){
		return graphics.images[this.variant.toLowerCase()];
	} else return graphics.images[this.name.toLowerCase()];
}

Single.prototype.isDestroyed = function(){
	if (this.destroyed || this.disabled){return true;}

	for (var i = 0; i < this.crits.length; i++){
		if (this.crits[i].type == "Disabled"){
			return true;
		}
	}
	return false;
}

Single.prototype.setStructState = function(){
	if (this.isDestroyed()){
		this.doDraw = false;
		this.destroyed = true;
		for (var i = 0; i < this.systems.length; i++){
			this.systems[i].locked = true;
			this.systems[i].destroyed = true;
		}
	}
	for (var i = 0; i < this.systems.length; i++){
		this.systems[i].setState();
	}
}

Single.prototype.doDestroy = function(){
	this.doDraw = false;
	this.destroyed = true;
	for (var i = 0; i < this.systems.length; i++){
		this.systems[i].locked = true;
		this.systems[i].destroyed = true;
	}
}

Single.prototype.isDestroyedThisTurn = function(){
	if (this.disabled || this.destroyed){
		for (var j = this.crits.length-1; j >= 0; j--){
			if (this.crits[j].type == "Disabled" && this.crits[j].turn == game.turn){
				return true;
			}
		}
		for (var j = this.damages.length-1; j >= 0; j--){
			if (this.damages[j].destroyed == 1 && this.damages[j].turn == game.turn){
				return true;
			}
		}					
	}
	return false;

	
	//if (this.parentId == 53 && this.id == 7){return true;}
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

Single.prototype.getRemIntegrity = function(){
	return this.remaining;
	var integrity = this.integrity;
	for (var i = 0; i < this.damages.length; i++){
		integrity -= this.damages[i].systemDmg;
	}
	return integrity;
}

Single.prototype.hover = function(e){
	if (!this.highlight){
		this.highlight = true;
		var ele = this.getSysDiv();
		$(document.body).append(ele);
		var w = $(ele).width();
		$(ele).css("left", e.clientX - w/2).css("top", e.clientY + 40)
	}
	else {
		this.highlight = false;
		$("#sysDiv").remove();
	}
}

Single.prototype.getEMDmg = function(){
	return System.prototype.getEMDmg.call(this);
}

Single.prototype.getRecentDmgInt = function(){
	return System.prototype.getRecentDmgInt.call(this);
}

Single.prototype.getSysDiv = function(){
	var div = 
		$("<div>").attr("id", "sysDiv")
		.append($("<table>")
			.append($("<tr>").append($("<th>").attr("colSpan", 2).html(this.name + " #" + this.id)))
			.append($("<tr>").append($("<td>").attr("colSpan", 2).html(this.role)))
			.append($("<tr>").append($("<td>").attr("colSpan", 2).css("height", 6)))
			.append($("<tr>").append($("<td>").html("Profile").css("width", "70%")).append($("<td>").html(this.baseHitChance + "%")))
			.append($("<tr>").append($("<td>").html("Armour").css("width", "70%")).append($("<td>").html(this.negation)))
			.append($("<tr>").append($("<td>").html("Acceleration")).append($("<td>").html(this.baseImpulse)))
			.append($("<tr>").append($("<td>").html("Recent EM Damage")).append($("<td>").html(this.getEMDmg())))
			//.append($("<tr>").append($("<td>").html("Recent Damagemage")).append($($("<td>").html((this.recentDmg + " / " + this.getRecentDmgInt() + " %")))))
			.append($("<tr>").append($("<td>").attr("colSpan", 2).css("height", 6)))
		)

	this.attachCritTypeInfo(div.find("tbody"));
	this.attachSysNotes(div);
	this.attachSysMods(div);
	return div;
}

Single.prototype.attachSysNotes = function(ele){
	return;
}

Single.prototype.attachCritTypeInfo = function(ele){
	ele
	.append($("<tr>")
		.append($("<td>").attr("colSpan", 2).html("Critical test if damaged for more than 15% of remaining HP.</br>D100 + Damage%.")))
	.append($("<tr>")
		.append($("<td>").attr("colSpan", 2).css("height", 6)))
	.append($("<tr>")
		.append($("<th>").attr("colSpan", 2).html("Possible Effects")))

	for (var i = 0; i < this.critEffects.length; i++){
		ele		
		.append($("<tr>")
			.append($("<td>").html(">= " + this.critEffects[i][1]))
			.append($("<td>").html(this.critEffects[i][0] + " " + (this.critEffects[i][3] ? this.critEffects[i][3] : ""))))
	}
}

Single.prototype.attachSysMods = function(ele){
	var div = $(ele) || $("#sysDiv");
		div.find(".modifiers").remove();
	var table;

	if (this.crits.length){
		table = $("<table>").addClass("modifiers")
		.append($("<tr>").css("height", 7).append($("<td>").attr("colSpan", 2)))
		.append($("<tr>").append($("<th>").html("Modifiers").attr("colSpan", 2)));
		for (var i = 0; i < this.crits.length; i++){
				if (!this.crits[i].inEffect()){continue;}
			$(table)
				.append($("<tr>")
					.append($("<td>")
						.attr("colSpan", 2)
						.addClass("negative")
						.html(this.crits[i].getString())))
		}
	}

	div.append(table);
}

Single.prototype.addMainDivEvents = function(div, alive, isPreview){
	if (isPreview){
		div
		.data("class", this.name)
		.find("img")
		.hover(function(e){
			e.stopPropagation();
			game.getSampleSubUnit($(this).parent().data("class")).hover(e);
			return;
		});
		return;
	}

	if (alive){
		div
		.find("img")
		.hover(function(e){
			e.stopPropagation();
			var shipId = $(this).parent().parent().parent().data("shipId");
			var systemId = $(this).parent().data("systemId");
			game.getUnit(shipId).getSystem(systemId).hover(e);
		})
		.mousedown(function(e){e.stopPropagation();})
		.click(function(e){
			e.stopPropagation();
			var shipId = $(this).parent().parent().parent().data("shipId");
			var systemId = $(this).parent().data("systemId");
			debug(game.getUnit(shipId).getSystem(systemId));
		});
	}
	else {
		div
		.find(".overlay")
		.hover(function(e){
			e.stopPropagation();
			var shipId = $(this).parent().parent().parent().data("shipId");
			var systemId = $(this).parent().data("systemId");
			game.getUnit(shipId).getSystem(systemId).hover(e);
		})
		.mousedown(function(e){e.stopPropagation();})
		.click(function(e){
			e.stopPropagation();
			var shipId = $(this).parent().parent().parent().data("shipId");
			var systemId = $(this).parent().data("systemId");
			debug(game.getUnit(shipId).getSystem(systemId));
		})
	}
}

Single.prototype.addSysEvents = function(div, isBuy){
	if (isBuy){
		div
		.css("zIndex", 1)
		.hover(function(e){
			e.stopPropagation();
			game.getSampleSubUnit($(this).parent().data("class")).systems[$(this).data("systemId")-1].hover(e);
		})
		return;
	}
	
	div
	.mousedown(function(e){e.stopPropagation();})
	.click(function(e){
		e.stopPropagation();
		var shipId = $(this).parent().parent().parent().data("shipId");
		game.getUnit(shipId).getSystem($(this).data("systemId")).select(e)
	})
	.contextmenu(function(e){
		e.stopPropagation();
		e.preventDefault();
		var shipId = $(this).parent().parent().parent().data("shipId");
		game.getUnit(shipId).selectAll(e, $(this).data("systemId"));
	})
	.hover(function(e){
		e.stopPropagation();
		$("#sysDiv").remove();
		var shipId = $(this).parent().parent().parent().data("shipId");
		var systemId = $(this).data("systemId");
		game.getUnit(shipId).getSystem(systemId).hover(e)
	})
}

Single.prototype.getElement = function(isBuy){
	var div = $("<div>")
		.addClass("singleDiv")
		.data("systemId", this.id)
		.append($(this.getBaseImage().cloneNode(true))
			.addClass("rotate270 img80pct"))

	var alive = 1;
	if (this.destroyed || this.disabled){alive = 0;}
	if (!alive){
		div
			.append($("<img>")
				.attr("src", "varIcons/destroyed.png")
				.addClass("overlay"))
	}

	this.addMainDivEvents(div, alive, isBuy);

	var wrap = document.createElement("div");
		wrap.className = "iconIntegrity"; wrap.style.height = 12;

	var rem = this.getRemIntegrity();

	var bgDiv = document.createElement("div");
		bgDiv.className = "integrityAmount"; bgDiv.style.textAlign = "center"; bgDiv.style.fontSize = 12; bgDiv.style.top = 0;
		bgDiv.innerHTML = rem + " / " + this.integrity;
		wrap.appendChild(bgDiv);

	var lowerDiv = document.createElement("div");
		lowerDiv.className = "integrityNow"; lowerDiv.style.top = 0; lowerDiv.style.height = "100%";
		lowerDiv.style.width = rem/this.integrity * 100 + "%";
		wrap.appendChild(lowerDiv);
		
	var upperDiv = document.createElement("div");
		upperDiv.className = "integrityFull"; upperDiv.style.top = 0;
		wrap.appendChild(upperDiv);

	div.append(wrap);

	var divWidth = 50;
	var sysWidth = 20;
	for (var i = 0; i < this.systems.length; i++){
		var ele = $(this.systems[i].getFighterSystemData(true));
		var modeDiv = this.systems[i].getModeDiv();
		if (modeDiv){ele.append(modeDiv);}

		this.addSysEvents(ele, isBuy)
		div.append(ele);
		if (this.systems.length == 1){
			ele.css("left", divWidth / 2 - sysWidth/2);
		}
		else ele.css("left", (i == 0 ? -1 : divWidth - sysWidth -2))
	}

	return div;
}






function Ballistic(data){
	Single.call(this, data);
	this.amount = data.amount;
	this.missile = data.missile;
	this.torpedo = data.torpedo;
	this.maxRange = data.maxRange;
	this.reload = data.reload;
	
	this.create(data);
}

Ballistic.prototype = Object.create(Single.prototype);


Ballistic.prototype.create = function(data){
	for (var k = 0; k < data.systems.length; k++){
		this.systems.push(new Warhead(data.systems[k]));
	}
	for (var k = 0; k < data.damages.length; k++){
		this.damages.push(new Damage(data.damages[k]));
	}
	for (var k = 0; k < data.crits.length; k++){
		this.crits.push(new Crit(data.crits[k]));
	}
}

Ballistic.prototype.getBaseImage = function(){
	if (this.missile){return graphics.images["missile"];}
	return graphics.images["torpedo"];
}




function FireOrder(data){
	this.id = data.id || -1;
	this.gameid = data.gameid;
	this.turn = data.turn || game.turn;
	this.shooterid = data.shooterid || -1;
	this.targetid = data.targetid || -1;
	this.shooter;
	this.target;
	this.weapon;
	this.damages = [];
	this.systems = [];
	this.focus;
	this.x = data.x || 0;
	this.y = data.y || 0;
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
	this.min;
	this.max;
	this.found = false;
	this.rolls = data.notes.slice(0, data.notes.length-1).split(";").map(Number);
	this.animating = 0;
	this.tr = false;
	this.numbers = [];
	this.rows = [];
}

FireOrder.prototype.setShotTarget = function(){
	if (this.targetid > 0){
		this.target = game.getUnit(this.targetid);
	} else this.target = false;
}

FireOrder.prototype.setShooter = function(){
}

FireOrder.prototype.setWeapon = function(){
}

FireOrder.prototype.setDamages = function(){
	if (this.target){
		this.damages = this.target.getDmgsByFire(this);
	} else this.damages = [];
}

FireOrder.prototype.setSystems = function(){
}

FireOrder.prototype.setCamAndAngle = function(){
	var origin = this.shooter.getGamePos();
	var dest;
	if (this.shooter.salvo){
		this.angle = getAngleFromTo(this.target.getGamePos(), this.shooter.getTrajectory());
		this.focus = this.target.getGamePos();
		this.dist = 0; return;
	}


	if (this.weapon.freeAim){
		dest = {x: this.x, y: this.y};
	} else dest = this.target.getGamePos();

	this.angle = getAngleFromTo(origin, dest);
	this.focus = {x:  (dest.x + origin.x) / 2, y:  (dest.y + origin.y) / 2}
	this.dist = getDistance({x: origin.x,	y: origin.y}, {x: dest.x,	y: dest.y});
}

FireOrder.prototype.setShots = function(){
	if (this.shooter.obstacle){return;}
	var shots = 0;
	var hits;
	if (this.shooter.salvo){
		shots = this.shooter.getShots();
	}
	else {
		for (var i = 0; i < this.guns; i++){
			shots += this.weapon.getShots();
		}
	}
	this.shots = shots;
}


FireOrder.prototype.setNumberAnim = function(){

	var last;
	var targets = (this.targetid > 0 ? 1 : 0);
	var data = this.tr.data();
	var index = this.tr.index();
	var rows = $("#combatLog tr");
	this.numbers = [];

	for (var i = 0; i < targets; i++){
		var tr = rows.eq(index+i)
		var drawPos = game.getUnit(tr.data("targetid")).getDrawPos();
		var odds = tr.find("td").eq(4).html();
		var shots = tr.find("td").eq(5).html();
		var armour = tr.find("td").eq(6).html();
		var system = tr.find("td").eq(7).html();
		var hull = tr.find("td").eq(8).html();

		this.numbers.push(
			{
				x: drawPos.x + range(-10, 10),
				y: drawPos.y,
				//n: Math.floor(len*0.4)*-1,
				n: 0,
				m: game.phaseDelay/5,
				shots: shots,
				armour: armour,
				system: system,
				hull: hull,
				odds: odds,
				done: 0
			}
		);

		//debug(this.numbers[0].n + " / " +this.numbers[0].m);
	}
}

FireOrder.prototype.createCombatLogEntry = function(){
	var log = $($("#combatLog").find("tbody")[0]);

	var inflicted = this.addLogStartEntry(log);
	var rowIndex = log.children().length;

	var dmgs = this.assembleDmgData();

	var rolls = this.rolls.slice();

	this.addCollisionEntry(log, rolls);
	this.addLogShieldEntry(log, inflicted.shield);
	this.addLogRollsEntry(log, rolls);

	for (var i in dmgs){
		var sub = $("<tr>")
			.hide()
			.data("targetid", dmgs[i][7])
			.append($("<td>")
			)
			.append($("<td>")
				.attr("colSpan", 2)
				.html(i + dmgs[i][6]) // system name
			)


		var string = "";
		if (dmgs[i][0]){string += "Kills: " + dmgs[i][0]};
		if (string.length > 2 && dmgs[i][1]){string += " / "};
		if (dmgs[i][1]){string += "Overload: " + dmgs[i][1]}
		$(sub).append($("<td>").attr("colSpan", 2).html(string));

		for (var j = 2; j < dmgs[i].length-2; j++){
			$(sub) 
			.append($("<td>")
				.html(dmgs[i][j] ? dmgs[i][j] : "")
			)
		}
		$(log).append(sub);
	}

	var rows = log.children();
	for (var i = rowIndex; i < rows.length; i++){
		this.rows.push($(rows[i]));
	}
}

FireOrder.prototype.addLogStartEntry = function(log){
	var shots = this.shots;
	var hits = 0;
	var armour = 0;
	var em = 0;
	var system = 0;
	var hull = 0;
	var shield = 0;

	if (this.shooter.salvo){
		hits = this.hits.reduce((a, b) => a+b, 0);
	}
	else {
		for (var i = 0; i < this.guns; i++){
			hits += this.hits[i];
		}
	}

	for (var i = 0; i < this.damages.length; i++){
		shield += this.damages[i].shieldDmg;;
		armour += this.damages[i].armourDmg
		system += this.damages[i].systemDmg;
		hull += this.damages[i].hullDmg;
		em += this.damages[i].emDmg
	}

	var tr = $("<tr>");
	var index = $(log).children().length;

	tr
	.data("shooterid", this.shooterid)
	.data("targetid", this.targetid)
	.data("weaponid", this.weapon.id)
	.data("fireid", this.id)
	.hide()
	.contextmenu(function(){
		var fireid = $(this).data("fireid");
		for (var i = 0; i < game.fireOrders.length; i++){
			if (game.fireOrders[i].id == fireid){
				game.fireOrders[i].animating = 0;
				break;
			}
		}

		game.redraw();
		game.fireOrders[i].anim = game.fireOrders[i].weapon.getAnimation(game.fireOrders[i]);
		game.fireOrders[i].setNumberAnim();
		$(fxCanvas).css("opacity", 1);
		game.animateSingleFireOrder(i, 0)
	})
	.click(function(){
		var fireid = $(this).data("fireid");
		for (var i = 0; i < game.fireOrders.length; i++){
			if (game.fireOrders[i].id == fireid){
				game.fireOrders[i].toggleAllRows();
				return;
			}
		}
	})

	this.weapon.attachLogHover(this, tr);


	var targetString = "";
	if (this.target){targetString = "<font color='" + this.target.getCodeColor() + "'>" + this.target.name + " #" + this.target.id + "</font>";}
	else targetString = "";


	var reqString = this.getReqString();

	tr
	.append($("<td>").html(this.type))
	.append($("<td>").html("<font color='" + this.shooter.getCodeColor() + "'>" + this.shooter.name + " #" + this.shooter.id + "</font>"))
	.append($("<td>").html(targetString))
	//.append($("<td>").html("this"))
	.append($("<td>").html(this.weapon.getDisplay()))
	.append($("<td>").html(reqString))
	.append($("<td>").html(hits + " / " + shots))
	.append($("<td>").html(armour ? armour : ""))
	.append($("<td>").html(system || em || ""))
	.append($("<td>").html(hull ? hull : ""))

	$(log).append(tr);
	this.tr = tr;

	return {armour: armour, system: system, hull: hull, shield: shield, em: em};
}

FireOrder.prototype.toggleAllRows = function(){
	if (!this.rows.length){return;}
	this.tr.toggleClass("selected");
	for (var i = 0; i < this.rows.length; i++){
		this.rows[i].addClass("selected").toggle();
	}

	var tableHeight = 10;
	var allRows = ui.combatLogWrapper.find("#combatLog tr").length;
	
	for (var i = 0; i < allRows; i++){
		if ($(allRows[i]).is(":visible")){tableHeight += 22;}
	}
	ui.combatLogWrapper.find("#combatLogInnerWrapper").scrollTop(function(){return tableHeight - 250 + 22});
}

FireOrder.prototype.assembleDmgData = function(){
	var dmgs = {};
	for (var i = 0; i < this.damages.length; i++){
		if (dmgs.hasOwnProperty(this.damages[i].system)){ // hit
			dmgs[this.damages[i].system][2]++;
		}
		else dmgs[this.damages[i].system] = [0, 0, 1, 0, 0, 0, "", this.damages[i].unitid]; // new system entry

		if (this.weapon.grouping /*|| this.weapon.fireMode == "Shockwave"*/){ // multi hit weapons
			for (var j = 0; j < this.damages[i].notes.length; j++){
				if (this.damages[i].notes[j][0] == "v"){
					dmgs[this.damages[i].system][6] += Math.floor(this.damages[i].notes[j].slice(1, this.damages[i].notes[j].length)) + ", ";
				}
			}
		}

		
		if (this.damages[i].destroyed){ // kill
			dmgs[this.damages[i].system][0]++;
		}
		if (this.damages[i].notes[this.damages[i].notes.length-1][0] == "o"){ // overload
			dmgs[this.damages[i].system][1] += Math.floor(this.damages[i].notes[this.damages[i].notes.length-1].slice(1, this.damages[i].notes[this.damages[i].notes.length-1].length));
		}

		dmgs[this.damages[i].system][3] += this.damages[i].armourDmg;
		dmgs[this.damages[i].system][4] += this.damages[i].systemDmg;
		dmgs[this.damages[i].system][4] += this.damages[i].emDmg;
		dmgs[this.damages[i].system][5] += this.damages[i].hullDmg;

	}

	if (this.weapon.grouping /*|| this.weapon.fireMode == "Shockwave"*/){ // multi hit weapons
		for (var i in dmgs){
			dmgs[i][6] = " (" + (dmgs[i][6].slice(0, dmgs[i][6].length-2)) + ")";
		}
	}
	return dmgs;
}

FireOrder.prototype.addLogRollsEntry = function(log, rolls){
	if (this.weapon.aoe){return false;}

	var rollString = this.getRollsString(rolls);

	$(log).append(
		$("<tr>")
		.hide()
		.append($("<td>"))
		//.append($("<td>")
		//	.html("")
		//)
		.append($("<td>")
			.attr("colSpan", 5)
			.css("textAlign", "left")
			.html(rollString)
		)
		.append($("<td>")
			.attr("colSpan", 3)
		)
	)

	return true;
}

FireOrder.prototype.addCollisionEntry = function(log, rolls){
	if (!this.shooter.obstacle){return false;}
	$(log).append(
		$("<tr>")
		.hide()
		.append($("<td>"))
		.append($("<td>")
			.attr("colSpan", 5)
			.html("SERVER DEBUG - Distance "+rolls[0]+"px, base collision "+rolls[1]+"%, adjusted by unit size to " + rolls[2]+"%")
			//.html("Distance "+rolls[0]+"px / " + this.shooter.collision + "% per 100px"
		)
		.append($("<td>"))
		.append($("<td>"))
		.append($("<td>"))
	)
	rolls.splice(0, 3);
	return true;
}

FireOrder.prototype.addLogShieldEntry = function(log, shield){
	if (!shield){return false;}
	$(log).append(
		$("<tr>")
		.hide()
		.append($("<td>"))
		.append($("<td>")
			.attr("colSpan", 5)
			.html("The Energy-Web nullified a grand total of <span class='yellow'>" + shield + "</span> damage points")
		)
		.append($("<td>"))
		.append($("<td>"))
		.append($("<td>"))
	)
	return true;
}

FireOrder.prototype.getRollsString = function(rolls){
	var allReq = this.req.slice();
		allReq = allReq.filter(e => e != 0);
		allReq.sort(function(a, b){return a-b});

	rolls.sort((a, b) => a-b);
	var req = 0;
	if (allReq.length == 1 && allReq[0] == 0){return "";} //area emine auto hit
	for (var i = 0; i < allReq.length; i++){
		if (allReq[i] > 0){
			req = allReq[i]; break;
		}
	}
	var string = "";
	var skipped = 0;
	var hits = "";
	var miss = "";
	var jammed = "";
	var blocked = "";
	var divider = "<div class='rollSeparator yellow'></div>";
	for (var i = 0; i < rolls.length; i++){
		if (rolls[i] == 999){
			skipped++; continue;
		}

		if (rolls[i] < 0){
			if (rolls[i] >= -99){
				blocked += (rolls[i]+100) + ", ";
			}
			else if (rolls[i] >= -199){
				jammed += (rolls[i]+200) + ", ";
			}
		}
		else if (rolls[i] <= req){
			hits += rolls[i] + ", ";
		} else miss += rolls[i] + ", ";
	}

	if (this.shooter.obstacle && !this.target.ship){
		string = "Each subunit was subject to " + this.rolls[3] + " attacks for " + this.shooter.primary.systems[0].getDmgString() + " Damage.  ";
	}
	else {
		if (hits.length){hits = hits.slice(0, hits.length-2); hits = "Hits: " + hits;}
		if (miss.length){miss = miss.slice(0, miss.length-2); miss = "Misses: " + miss;}
		if (jammed.length){jammed = jammed.slice(0, jammed.length-2); jammed = "Jammed: " + jammed;}
		if (blocked.length){blocked = blocked.slice(0, blocked.length-2); blocked = "Blocked: " + blocked;}

		string = "<div class='rollWrapper'><div class='hits'>" + hits + "</div>" + divider + "<div class='miss'>" + miss + "</div>";
		if (jammed){
			string += divider +"<div class='jammed'>" + jammed + "</div>";
		}
		if (blocked){
			string += divider +"<div class='blocked'>" + blocked + "</div>";
		}
		if (skipped){
			string += divider +"<div class='overfire'>" + skipped + "x Overkill</div>"
		}
	}
	return string;
}

FireOrder.prototype.getReqString = function(){
	var req = this.req.slice();
		req = req.filter(e => e != 0);
		req.sort(function(a, b){return a-b});

	//debug(req);
	var string = "";
	if (req.length == 0){
		string = "0";
	}
	else if (req.length == 1){
		string = req[0];
	}
	else {
		if (req[0] != 0){
			if (req[0] == req[req.length-1]){
				string = req[0];
			}
			else string = req[0] + " % - " + req[req.length-1];
		}
		else {
			if (req.length > 2){
				string = req[1] + " % - " + req[req.length-1];
			}
			else string = req[1];
		}
	}

	return (string == "0" ? "" : string + " %"); //area emine auto hit
}