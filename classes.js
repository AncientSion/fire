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
	this.emDmg = data.emDmg;
	this.overkill = data.overkill;
	this.negation = data.negation;
	this.destroyed = data.destroyed;
	this.notes = data.notes.slice(0, data.notes.length-1).split(";");
	this.system = "";
	this.loc = {x: 0, y: 0};
}

function Crit(data){
	this.id = data.id;
	this.shipid = data.shipid;
	this.systemid = data.systemid;
	this.turn = data.turn;
	this.type = data.type;
	this.duration = data.duration;
	this.display = data.display;
	this.value = data.value;

	this.getString = function(){
		if (this.type == "Disabled"){
			if (this.duration){return (this.type + " (Incl. Turn " + (this.turn + this.duration) + ")" + " (Turn " + this.turn + ")");
			} return this.type + " (Turn " + this.turn + ")";
		}
		else if (this.type == "Destroyed"){return this.type + " (Turn " + this.turn + ")";}
		else return (this.type + " -" + (this.value) + "% (Turn " + this.turn + ")");
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

function Structure(data){
	this.name = "Structure";
	this.display = "Structure";
	this.type = data.type;
	this.parentIntegrity = data.parentIntegrity;
	this.armourDmg = data.armourDmg;
	this.id = data.id;
	this.parentId = data.parentId;
	this.start = data.start;
	this.end = data.end;
	this.negation = data.negation;
	this.remNegation = data.remNegation;
	this.bonusNegation = 0;
	this.destroyed = data.destroyed || false;
	this.highlight = false;
	this.systems = [];
	this.damages = [];
	this.powers = data.powers;
	this.direction;
	this.element;
	this.effiency = data.effiency;
	this.boostEffect = data.boostEffect;
	this.width = data.width;
}

Structure.prototype.getRemNegation = function(){
	return this.remNegation;
}

Structure.prototype.getArmourString = function(){
	if (this.boostEffect.length){
		return  "<span>" + this.remNegation + "<span style='color: yellow;'>+" + (this.getBoostEffect("Armour") * this.getBoostLevel()) + "</span> / " + this.negation + "</span>";
	}
	return "<span>" + this.remNegation + " / " + this.negation + "</span>";
}

Structure.prototype.setBonusNegation = function(){
	if (!this.boostEffect.length){this.bonusNegation = 0; return;}
	this.bonusNegation = this.getBoostEffect("Armour") * this.getBoostLevel(); return;
}

Structure.prototype.getTableData = function(){
	var td = $("<td>").addClass("armour").css("height", 25)

	var div = $("<div>")
		.addClass("integrityAmount")
		.html(this.getArmourString())
	td.append(div);

	var lowerDiv = document.createElement("div");
		lowerDiv.className = "integrityNow";
		lowerDiv.style.width =  this.getRemNegation()/this.negation * 100 + "%";
		td.append(lowerDiv);
		
	var upperDiv = document.createElement("div");
		upperDiv.className = "integrityFull";
		td.append(upperDiv);

	$(td)
		.data("shipId", this.parentId)
		.data("systemId", this.id)
		.attr("colSpan", this.width)
		.hover(
			function(e){
				var shipId = $(this).data("shipId");
				var systemId = $(this).data("systemId");
				game.getUnit(shipId).getSystem(systemId).hover(e);
			}
		)
		.mousedown(function(e){e.stopPropagation();})
		.click(function(e){
			var shipId = $(this).data("shipId");
			var systemId = $(this).data("systemId");
		console.log(game.getUnit(shipId).getSystem(systemId));
		})

	this.element = td;
	return td;
}

Structure.prototype.hover = function(e){
	var p = game.getUnit(this.parentId);

	if (game.flightDeploy){return false;}
	if (this.highlight){
		this.highlight = false;
		fxCtx.clearRect(0, 0, res.x, res.y);
		this.hideSysDiv();
		this.hideOptions();
		p.highlightAllSelectedWeapons();
	}
	else {
		this.highlight = true;
		this.drawStructArc(p.getPlannedFacing(), p.rolled, p.getPlannedPos());
		this.showSysDiv(e);
		this.showOptions();
	}
}

Structure.prototype.showOptions = function(){
	if (this.locked || game.phase != -1 || !this.effiency || game.getUnit(this.parentId).userid != game.userid ){return;}
	$(this.element).find(".boostDiv").show();
}

Structure.prototype.hideOptions = function(){
	if (this.locked || game.phase != -1 || !this.effiency || game.getUnit(this.parentId).userid != game.userid ){return;}
	$(this.element).find(".boostDiv").hide();
}

Structure.prototype.showSysDiv = function(e){
	$(document.body).append(
		$(this.getSysDiv())
			.css("left", e.clientX - 90)
			.css("top", e.clientY + 40)
		)
}

Structure.prototype.hideSysDiv = function(e){
	$("#sysDiv").remove();
}

Structure.prototype.getSysDiv = function(){
	var div = $("<div>").attr("id", "sysDiv")

	var table = $("<table>")
		.append($("<tr>")
			.append($("<th>").html(this.type + " Armour").attr("colSpan", 2)))
		.append($("<tr>")
			.append($("<td>").html("Armour Strength"))
			.append($("<td>").html(this.getRemNegation() + " / " + this.negation)))
		.append($("<tr>")
			.append($("<td>").html("Relative Strength"))
			.append($("<td>").html(((this.parentIntegrity - this.armourDmg) + " / " + this.parentIntegrity))))

	if (this.boostEffect.length){
		var boost = this.getBoostEffect("Armour");
		if (boost){
			table.append($("<tr>")
					.append($("<th>").html("EA Energy Web").attr("colSpan", 2)))
				.append($("<tr>")
					.append($("<td>").html("Current Extra Armour"))
					.append($("<td>").html(this.getBoostEffect("Armour") * this.getBoostLevel()).addClass("boostEffect")))
				.append($("<tr>")
					.append($("<td>").html("Current Power Usage"))
					.append($("<td>").html(this.getPowerUsage()).addClass("powerUse")))
				.append($("<tr>")
					.append($("<td>").html("Boost Power Cost"))
					.append($("<td>").html(this.getEffiency()).addClass("powerCost")));
		}
	}

	return div.append(table);
}

Structure.prototype.update = function(){
	this.updateSysDiv();
	//$(this.element).find(".outputMask").html(this.getOutput());
}

Structure.prototype.updateSysDiv = function(){
	$("#sysDiv")
		.find(".boostEffect").html(this.getBoostEffect("Armour") * this.getBoostLevel()).end()
		.find(".powerUse").html(this.getPowerUsage()).end()
		.find(".powerCost").html(this.getEffiency());
	$(this.element).find(".integrityAmount").html(this.getArmourString());
}

Structure.prototype.getPowerUsage = function(){
	return System.prototype.getPowerUsage.call(this);
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
	return System.prototype.plus.call(this, false);
}

Structure.prototype.minus = function(){
	return System.prototype.minus.call(this, false);
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

Structure.prototype.getRemIntegrity = function(){
	var integrity = this.integrity;
	for (var i = 0; i < this.damages.length; i++){
		integrity -= this.damages[i].armourDmg;
	}
	return Math.floor(integrity);
}

Structure.prototype.drawStructArc = function(facing, rolled, pos){
	if (game.animating){return;}

	fxCtx.clearRect(0, 0, res.x, res.y);
	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z);


	var	start;
	var	end;

	if (rolled){
		start = 360 - this.end;
		end = 360 - this.start;
	}
	else {
		start = this.start;
		end = this.end;
	}

	var p1 = getPointInDir(game.arcRange, start + facing, pos.x, pos.y);
	var p2 = getPointInDir(game.arcRange, end + facing, pos.x, pos.y)
	var dist = getDistance( {x: pos.x, y: pos.y}, p1);
	var rad1 = degreeToRadian(start + facing);
	var rad2 = degreeToRadian(end + facing);

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






function Primary(data){
	this.name = data.name;
	this.id = data.id;
	this.display = data.display;
	this.parentId = data.parentId;
	this.integrity = data.integrity;
	this.remaining = data.remaining;
	this.newDmg = data.newDmg;
	this.destroyed = data.destroyed;
	this.damages = [];
	this.highlight = false;	
	this.systems = [];
	this.element;
}
	
Primary.prototype.getTableData = function(){
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

	$(td)
		.data("shipId", this.parentId)
		.data("systemId", this.id)
		.hover(
			function(e){
				var shipId = $(this).data("shipId");
				var systemId = $(this).data("systemId");
				game.getUnit(shipId).primary.hover(e);
			}
		)
		.mousedown(function(e){e.stopPropagation();})
		.click(function(e){
			var shipId = $(this).data("shipId");
			var systemId = $(this).data("systemId");
			console.log(game.getUnit(shipId).primary);
		})

	tr.appendChild(td);
	this.element = tr;
	return tr;
}

Primary.prototype.setRemainingIntegrity = function(){		
	this.remaining = this.getRemIntegrity();
}

Primary.prototype.hover = function(e){
	if (game.flightDeploy){return false;}
	if (this.highlight){
		this.highlight = false;
		$("#sysDiv").remove();
	}
	else {
		this.highlight = true;
		this.showSysDiv(e);
	}
}	

Primary.prototype.showSysDiv = function(e){
	$(document.body).append(
		$(this.getSysDiv())
			.css("left", e.clientX - 90)
			.css("top", e.clientY + 40)
		)
}

Primary.prototype.getSysDiv = function(){
	return $("<div>").attr("id", "sysDiv")
		.append($("<table>")
			.append($("<tr>")
				.append($("<th>").html("Main Structure").attr("colSpan", 2)))
			.append($("<tr>")
				.append($("<td>").html("Integrity"))
				.append($("<td>").html(this.remaining + " / " + this.integrity)))
			.append($("<tr>")
				.append($("<td>"))
				.append($("<td>").html(Math.floor(this.remaining / this.integrity * 100) + " %"))));
}


Primary.prototype.getRemIntegrity = function(){
	var integrity = this.integrity;
	for (var i = 0; i < this.damages.length; i++){
		integrity -= this.damages[i].structDmg;
		if (this.damages[i].overkill){
			console.log("dnig");
		}
	}
	return integrity;
}

function Section(data){
	this.start = data.start;
	this.end = data.end;
	this.systems = [];
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
	this.integrity = data.integrity;
	this.value = data.value;
	this.negation = data.negation;
	this.baseHitChance = data.baseHitChance;
	this.destroyed = data.destroyed;
	this.disabled = data.disabled;
	this.traverse = data.traverse;
	this.baseImpulse = data.baseImpulse;
	this.dropout = data.dropout;
	this.damages = [];
	this.crits = [];
	this.systems = [];
	this.doDraw = 1;
	this.layout = {};
	this.fighter = 0;
	this.missile = 0;
	this.squaddie = 0;
}

Single.prototype.getBaseImage = function(){
	if (this.variant.length > 2){
		return graphics.images[this.variant.toLowerCase()];
	} else return graphics.images[this.name.toLowerCase()];
}

Single.prototype.isDestroyed = function(){
	if (this.destroyed || this.disabled){return true;}
	return false;
}

Single.prototype.doDestroy = function(){
	this.doDraw = false;
	this.destroyed = true;
	for (var i = 0; i < this.systems.length; i++){
		this.systems[i].destroyed = true;
	}
}

Single.prototype.isDestroyedThisTurn = function(){
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
		integrity -= this.damages[i].structDmg;
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
	//return this.damages.map(x => x.emDmg).reduce((l,r) => l+r, 0);
	var dmg = 0;
	for (var i = this.damages.length-1; i >= 0; i--){
		if (this.damages[i].turn < game.turn){return dmg;}
		dmg += this.damages[i].emDmg;
	}
	return dmg;
}

Single.prototype.getSysDiv = function(){
	var div = 
		$("<div>").attr("id", "sysDiv")
		.append($("<table>")
			.append($("<tr>").append($("<th>").attr("colSpan", 2).html(this.name + " #" + this.id)))
			.append($("<tr>").append($("<td>").attr("colSpan", 2).html(this.role)))
			.append($("<tr>").append($("<td>").attr("colSpan", 2).css("height", 6)))
			.append($("<tr>").append($("<td>").html("Armour").css("width", "70%")).append($("<td>").html(this.negation)))
			.append($("<tr>").append($("<td>").html("Acceleration")).append($("<td>").html(this.baseImpulse)))
			.append($("<tr>").append($("<td>").html("EM Damage")).append($("<td>").html("<span class='yellow'>" + this.getEMDmg() + "<span>")))
			.append($("<tr>").append($("<td>").attr("colSpan", 2).css("height", 6)))
			.append($("<tr>").append($("<td>").attr("colSpan", 2).html("Subject to dropout testing if damaged for more than 15 % of remaining HP in a single turn"))))


	this.attachSysNotes(div);
	this.attachSysMods(div);
	return div;
}

Single.prototype.attachSysNotes = function(ele){
	return;
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
			var subId = $(this).parent().data("subId");
			game.getUnit(shipId).getSystem(subId).hover(e);
		})
		.mousedown(function(e){e.stopPropagation();})
		.click(function(e){
			e.stopPropagation();
			var shipId = $(this).parent().parent().parent().data("shipId");
			var subId = $(this).parent().data("subId");
			console.log(game.getUnit(shipId).getSystem(subId));
		});
	}
	else {
		div
		.find(".overlay")
		.hover(function(e){
			e.stopPropagation();
			var shipId = $(this).parent().parent().parent().data("shipId");
			var subId = $(this).parent().data("subId");
			game.getUnit(shipId).getSystem(subId).hover(e);
		})
		.mousedown(function(e){e.stopPropagation();})
		.click(function(e){
			e.stopPropagation();
			var shipId = $(this).parent().parent().parent().data("shipId");
			var subId = $(this).parent().data("subId");
			console.log(game.getUnit(shipId).getSystem(subId));
		})
	}
}

Single.prototype.addSysEvents = function(div, isBuy){
	if (isBuy){
		div
		.css("zIndex", 1)
		.hover(function(e){
			e.stopPropagation();
			game.getSampleSubUnit($(this).parent().data("class")).systems[0].hover(e);
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
		game.getUnit(shipId).getSystem($(this).data("systemId")).hover(e)
	})
}

Single.prototype.getElement = function(isBuy){
	var div = $("<div>")
		.addClass("singleDiv")
		.data("subId", this.id)
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

	var s = 20;
	for (var j = 0; j < this.systems.length; j++){
		var ele = $(this.systems[j].getFighterSystemData(true));
		this.addSysEvents(ele, isBuy)
		div.append(ele);
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

