function System(id, parentId, name, display, integrity, powerReq, output){
	this.id = id;
	this.parentId = parentId;
	this.name = name;
	this.display = display;
	this.integrity = integrity;
	this.crits = [];
	this.damages = [];
	this.detailsTable = false;
	this.highlight = false;
	this.selected = false;
	this.destroyed = false;
	this.disabled = false;
	this.weapon = false;
	this.powerReq = powerReq;
	this.output = output;
	this.totalCost = 0;

	this.hover = function(e){
		if (game.flightDeploy){return false;}
		if (this.highlight){
			this.highlight = false;
			this.hideInfoDiv(e);
		}
		else {
			this.highlight = true;
			this.showInfoDiv(e);
		}
	}

	this.showInfoDiv = function(e){
		$(document.body).append(
			$(this.getSystemDetailsDiv())
				.css("left", e.clientX + 20)
				.css("top", e.clientY + 20)
			)
		return;
	}

	this.hideInfoDiv = function(){
			$("#systemDetailsDiv").remove();
	}
	
	this.getTableData = function(){
		var td = document.createElement("td");
			td.className = "system";

		var img = new Image();
			if (this.linked > 1){img.src = "sysIcons/" + this.name + this.linked + ".png";}
			else {img.src = "sysIcons/" + this.name + ".png";}
		//	img.className = "img30";
		td.appendChild(img);

		var div = document.createElement("div");
			div.className = "loadLevel";
			if (this.weapon){div.style.width = this.getLoadLevel() * 100 + "%"}
			else {div.style.width = 100 + "%"};
			td.appendChild(div);

		var div = document.createElement("div");
			div.className = "bgloadlevel";
			div.style.width = 100 + "%";
			td.appendChild(div);

			$(td).data("systemId", this.id);

		var lowerDiv = document.createElement("div");
			lowerDiv.className = "integrityNow";
			lowerDiv.style.width = this.getRemainingIntegrity() / this.integrity * 100 + "%";
			td.appendChild(lowerDiv);

		var div = document.createElement("div");
			div.className = "integrityFull";
			div.style.width = 100 + "%";
			td.appendChild(div);
			
			$(td).data("systemId", this.id);

		return this.setElementStatus(td);
	}

	this.setElementStatus = function(ele){
		if (this.destroyed){
			$(ele).addClass("destroyed");
		}
		else if (this.disabled){
			$(ele).addClass("disabled");
		}
		
		if (this.crits.length){
			$(ele).addClass("hasCritical");
		}

		if (this.hasActiveFireOrder()){
			$(ele).addClass("fireOrder");
		}

		return ele;
	}

	this.hasActiveFireOrder = function(){
		return false;
	}

	this.getRemainingIntegrity = function(){
		var dmg = 0;
		for (var i = 0; i < this.damages.length; i++){
			dmg += this.damages[i].structDmg;
		}
		return this.integrity - dmg;
	}

	this.setState = function(){
		for (var i = 0; i < this.crits.length; i++){
			switch (this.crits[i].type){
				case "destroyed":
					this.destroyed = true;
					break;
				case "disabled":
					this.disabled = true;
					break;
				default:
					continue;
			}
		}
		for (var i = this.damages.length-1; i >= 0; i--){
			if (this.damages[i].destroyed){
				this.destroyed = true;
				break;
			}
		}
	}
}

function PrimarySystem(id, parentId, name, display, integrity, powerReq, output){
	System.call(this, id, parentId, name, display, integrity, powerReq, output);

	this.select = function(e){
		console.log(this);
		return;
	}

	this.getTableData = function(){
		var td = document.createElement("td");
			td.className = "system";

		var img = new Image();
			img.src = "sysIcons/" + this.display + ".png";
		td.appendChild(img);

		var div = document.createElement("div");
			div.className = "loadLevel";
			if (this.weapon){div.style.width = this.getLoadLevel() * 100 + "%"}
			else {div.style.width = 100 + "%"};
			td.appendChild(div);

		var div = document.createElement("div");
			div.className = "bgloadlevel";
			div.style.width = 100 + "%";
			td.appendChild(div);

			$(td).data("systemId", this.id);
		
		var lowerDiv = document.createElement("div");
			lowerDiv.className = "integrityNow";
			lowerDiv.style.width =  this.getRemainingIntegrity() /  this.integrity * 100 + "%";
			td.appendChild(lowerDiv);

		var div = document.createElement("div");
			div.className = "integrityFull";
			div.style.width = 100 + "%";
			td.appendChild(div);

		var output = document.createElement("div");
			output.className = "outputMask";
			//output.innerHTML = "<span>" + this.output + "</span>";
			output.innerHTML = this.output;
			td.appendChild(output);

			$(td).data("systemId", this.id);

		return this.setElementStatus(td);
	}

	this.getSystemDetailsDiv = function(){
		var div = document.createElement("div");
			div.id = "systemDetailsDiv";
			div.className = this.id;
		var table = document.createElement("table");
			
		var tr = table.insertRow(-1);				
		var th = document.createElement("th"); th.colSpan = 2;
			th.innerHTML = this.display; tr.appendChild(th); table.appendChild(tr)

		var tr = table.insertRow(-1);				
		var td = document.createElement("td"); td.style.width = "60%";
			td.innerHTML = "Integrity"; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = this.getRemainingIntegrity() + " / " + this.integrity; tr.appendChild(td); table.appendChild(tr);
		
		if (this.output){
			var tr = table.insertRow(-1);
				tr.insertCell(-1).innerHTML = "Output";
				tr.insertCell(-1).innerHTML = this.output;
		}
		
		if (this.crits.length){
			var tr = document.createElement("tr");
			var td = document.createElement("td");
				td.colSpan = 2; td.style.fontSize = "16px"; td.style.borderBottom = "1px solid white"; td.style.borderTop = "1px solid white"; 
				td.innerHTML = "Modifiers"; tr.appendChild(td); table.appendChild(tr);

			for (var i = 0; i < this.crits.length; i++){
				var tr = table.insertRow(-1);				
				var td = document.createElement("td");
					td.colSpan = 2;
					td.className = "negative";
					td.innerHTML = this.crits[i].getStringValue(); tr.appendChild(td); table.appendChild(tr);
			}
		}
			
		div.appendChild(table);
		return div;
	}

	this.setState = function(){
		return;
	}
}


function Bridge(id, parentId, name, display, integrity, powerReq, output){
	PrimarySystem.call(this, id, parentId, name, display, integrity, powerReq, output);
}
Bridge.prototype = Object.create(PrimarySystem.prototype);
				
function Reactor(id, parentId, name, display, integrity, powerReq, output){
	PrimarySystem.call(this, id, parentId, name, display, integrity, powerReq, output);
}
Reactor.prototype = Object.create(PrimarySystem.prototype);

function Engine(id, parentId, name, display, integrity, powerReq, output){
	PrimarySystem.call(this, id, parentId, name, display, integrity, powerReq, output);
}
Engine.prototype = Object.create(PrimarySystem.prototype);
				
function LifeSupport(id, parentId, name, display, integrity, powerReq, output){
	PrimarySystem.call(this, id, parentId, name, display, integrity, powerReq, output);
	this.display = "Support";
}
LifeSupport.prototype = Object.create(PrimarySystem.prototype);
				
function Sensor(id, parentId, name, display, integrity, powerReq, output){
	PrimarySystem.call(this, id, parentId, name, display, integrity, powerReq, output);
}
Sensor.prototype = Object.create(PrimarySystem.prototype);


function Weapon(id, parentId, name, display, exploSize, integrity, powerReq, output, fc, minDmg, maxDmg, accDecay, linked, shots, reload, arc1, arc2, arc3, arc4){
	System.call(this, id, parentId, name, display, integrity, powerReq, output, parentId, arc1, arc2, arc3, arc4);
	this.exploSize = exploSize;
	this.weapon = true;
	this.fc = fc;
	this.minDmg = minDmg;
	this.maxDmg = maxDmg;
	this.accDecay = accDecay;
	this.linked = linked;
	this.shots = shots;
	this.reload = reload;
	this.arc = [
				[arc1, arc2]
				];
	this.loaded;
	this.fireOrders = [];

	this.hover = function(e){
		if (game.flightDeploy){return false;}
		if (this.highlight){
			this.highlight = false;
			this.hideInfoDiv();
		}
		else {
			this.highlight = true;
			this.showInfoDiv(e);
		}
		game.getShipById(this.parentId).highlightAllSelectedWeapons();
	}

	this.getFireControl = function(target){
		if (target instanceof Flight || target instanceof Salvo){
			return this.fc[1];
		} else return this.fc[0];
	}

	this.posIsOnArc = function(loc, pos, facing){
		//console.log(arguments);
		var targetCompassHeading = getCompassHeadingOfPoint(loc, pos, facing);
	
		for (var i = 0; i < this.arc.length; i++){
			var start = this.arc[i][0];
			var end = this.arc[i][1];
			var inArc = isInArc(targetCompassHeading, start, end);
			return inArc;
		}
	}

	this.hasActiveFireOrder = function(){
		for (var i = 0; i < this.fireOrders.length; i++){
			if (this.fireOrders[i].turn == game.turn && this.fireOrders[i].resolved == -1){
				return true;
			}
		}
		return false;
	}

	this.select = function(e){
		console.log(this);
		var id = this.id;
		var parentId = this.parentId;
		var selected = false;
		var ship;

		if (this.destroyed || this.disabled){
			return false;
		}
		else {
			ship = game.getShipById(parentId);
			if (ship instanceof Flight && (ship.dogfights.length)){
				return false;
			}
			else if (this.canFire()){
				if (this.hasActiveFireOrder()){
					this.unsetFireOrder();
				}
				if (this.selected){
					this.selected = false;
				}
				else if(! ship.hasHangarSelected()){
					this.selected = true;
				}
			}

			this.setTableRow();
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

	this.getArcWidth = function(){
		var w = 0;

		if (this.arc[0][0] < this.arc[0][1]){
			w = this.arc[0][1] - this.arc[0][0];
		}
		else if (this.arc[0][0] > this.arc[0][1]){
			w = 360 - this.arc[0][0] + this.arc[0][1];
		}

		return w;
	}

	this.getMount = function(){
		if (game.getShipById(aShip) instanceof Flight){
			return false;
		}
		var w = this.getArcWidth();
		var a = game.getShipById(aShip).getStructureById(this.structureId).getRemainingNegation();
		if (w <= 60){return "Fixed / " + Math.floor(a * 0.9);
		} else if (w <= 120){return "Embedded / " + Math.floor(a * 0.7)
		} else { return "Turret / " + Math.floor(a * 0.5)
		}
	}

	this.getPowerReq = function(){
		return this.powerReq;
	}

	this.getSystemDetailsDiv = function(){
		var div = document.createElement("div");
			div.id = "systemDetailsDiv";
		var table = document.createElement("table");
			
		var tr = document.createElement("tr");		
		var th = document.createElement("th");
			th.colSpan = 2; th.innerHTML = this.display.toUpperCase(); th.style.width = "40%"; tr.appendChild(th); table.appendChild(tr);

		$(table).append($("<tr>").append($("<td>").html("Weapon Type")).append($("<td>").html(this.type)));
		if (!(game.getShipById(aShip) instanceof Flight)){
			$(table).append($("<tr>").append($("<td>").html("Integrity")).append($("<td>").html(this.getRemainingIntegrity() + " / " + this.integrity)));
			$(table).append($("<tr>").append($("<td>").html("Mount / Armour")).append($("<td>").html(this.getMount())));
			$(table).append($("<tr>").append($("<td>").html("Power need")).append($("<td>").html(this.getPowerReq())));
		}
		$(table).append($("<tr>").append($("<td>").html("Loading")).append($("<td>").html(this.getTimeLoaded() + " / " + this.reload)));
		$(table).append($("<tr>").append($("<td>").html("Fire Control")).append($("<td>").html(this.fc[0] + "% / " + this.fc[1] + "%")));
		$(table).append($("<tr>").append($("<td>").html("Accuracy loss")).append($("<td>").html(this.getAccDecay()/10 + "% per 100px")));

		if (this.linked > 1){
			$(table).append($("<tr>").append($("<td>").html("Linked Shots")).append($("<td>").html(this.linked + " x " + this.shots)));
		} else if (this.type == "laser"){
			$(table).append($("<tr>").append($("<td>").html("Shots")).append($("<td>").html(this.shots + " / " + this.output + " rakes ea.")));
		}
		else {
			$(table).append($("<tr>").append($("<td>").html("Shots")).append($("<td>").html(this.shots)));
		}

		if (this.type == "laser"){
			$(table).append($("<tr>").append($("<td>").html("Focus point")).append($("<td>").html(this.optRange)));
			$(table).append($("<tr>").append($("<td>").html("Damage loss")).append($("<td>").html(this.dmgDecay + "% per 100px")));
		}

		$(table).append($("<tr>").append($("<td>").html("Damage")).append($("<td>").html(this.getDamage())));

		if (this.crits.length){
			var tr = table.insertRow(-1); tr.insertCell(-1).innerHTML = "Modifiers"; tr.childNodes[0].colSpan = 2; tr.childNodes[0].border = "1px solid white";
			for (var i = 0; i < this.crits.length; i++){
				var tr = document.createElement("tr");
				var td = document.createElement("td");
					td.colSpan = 2;
					td.className = "negative"
					td.innerHTML = this.crits[i].getStringValue(); tr.appendChild(td); table.appendChild(tr);
			}
		}
		div.appendChild(table);
			
		return div;
	}
	
	this.setFireOrder = function(fire){
		this.selected = false;
		this.highlight = false;
		this.fireOrders.push(fire);
		this.setTableRow();
	}

	this.unsetFireOrder = function(){
		for (var i = this.fireOrders.length-1; i >= 0; i--){
			if (this.fireOrders[i].turn == game.turn){
				this.fireOrders.splice(i, 1);
			}
		}

		this.setTableRow();
	}

	this.setTableRow = function(){
		var id = this.id;
		var parentId = this.parentId;
		var activeFire = this.hasActiveFireOrder();
		var selected = this.selected;
		var disabled = this.disabled;
		var destroyed = this.destroyed;

		var ele = $(".shipDiv").each(function(){
			if ($(this).data("shipId") == parentId){
				$(this).find(".system").each(function(){
					if ($(this).data("systemId") == id){
						if (selected){
							$(this).addClass("selected");
						}
						else {
							$(this).removeClass("selected");
						}

						if (activeFire){
							$(this).addClass("fireOrder");
						}
						else {
							$(this).removeClass("fireOrder");
						}
						return;
					}
				})
			}
		})
	}

	this.drawArc = function(facing, pos){
		for (var i = 0; i < this.arc.length; i++){
			var p1 = getPointInDirection(res.x, this.arc[i][0] + facing, pos.x, pos.y);
			var p2 = getPointInDirection(res.y, this.arc[i][1] + facing, pos.x, pos.y)
			var dist = getDistance( {x: pos.x, y: pos.y}, p1);
			var rad1 = degreeToRadian(this.arc[i][0] + facing);
			var rad2 = degreeToRadian(this.arc[i][1] + facing);

			fxCtx.beginPath();			
			fxCtx.moveTo(pos.x, pos.y);
			fxCtx.arc(pos.x, pos.y, dist, rad1, rad2, false);
			fxCtx.closePath();		
			fxCtx.fillStyle = this.getFillStyle(pos.x, pos.y, dist);
			fxCtx.fill();
		}
	}
	
	this.getAccurayDecay = function(dist){		
		return Math.ceil(this.getAccDecay() * dist/decayVar);
	}
	
	this.getDamageDecay = function(dist){
		return 0;
	}
	
	this.getExpectedDamage = function(dist){
		var loss = this.getDamageDecay(dist);
		
		return Math.floor(this.damage - (this.damage / 100 * loss));
	}
	
	this.getFillStyle = function(x, y, dist){
		return "green";
	}

	this.canFire = function(){
		if (this.getLoadLevel() >= 1){
			return true;
		}
		else return false;
	}

	this.getLoadLevel = function(){
		var need = this.reload;
		var has = this.getTimeLoaded();
		if (has / need > 1){
			return 1;
		}
		else if (has > 0){
			return has/need;
		}
		else return has;
	}

	this.getTimeLoaded = function(){
		var turnsLoaded = this.reload
		var max = this.reload;
		for (var i = 1; i <= game.turn; i++){
			if (turnsLoaded < max){
				turnsLoaded++;
			}
			for (var j = 0; j < this.fireOrders.length; j++){
				if (this.fireOrders[j].turn == i && this.fireOrders[j].resolved == 1){
					turnsLoaded = 0;
					break;
				}
			}
		}
		return turnsLoaded;
	}

	this.getAccDecay = function(){
		var mod = 1;
		for (var i = 0; i < this.crits.length; i++){
			switch (this.crits[i].type){
				case "range1":
					mod = mod + 0.1;
					break;
				case "range2":
					mod = mod + 0.2;
					break;
			}
		}
		return Math.floor(this.accDecay * mod);
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
		var mod = 1;
		for (var i = 0; i < this.crits.length; i++){
			switch (this.crits[i].type){
				case "damage1":
					mod = mod - 0.1;
					break;
				case "damage2":
					mod = mod - 0.2;
					break;
			}
		}
		return Math.floor(this.minDmg * mod);
	}

	this.getMaxDmg = function(){
		var mod = 1;
		for (var i = 0; i < this.crits.length; i++){
			switch (this.crits[i].type){
				case "damage1":
					mod = mod - 0.1;
					break;
				case "damage2":
					mod = mod - 0.2;
					break;
			}
		}
		return Math.floor(this.maxDmg * mod);
	}
}
Weapon.prototype = Object.create(System.prototype); 

function Particle(id, parentId, name, display, exploSize, animColor, projSize, projSpeed, integrity, powerReq, output, fc, minDmg,maxDmg, accDecay, linked, shots, reload, arc1, arc2, arc3, arc4){
	Weapon.call(this, id, parentId, name, display, exploSize, integrity, powerReq, output, fc, minDmg,maxDmg, accDecay, linked, shots, reload, arc1, arc2, arc3, arc4);	
	this.type = "particle";
	this.animation = "projectile";
	this.animColor = animColor;
	this.projSize = projSize;
	this.projSpeed = projSpeed;
	this.priority = 6;
}
Particle.prototype = Object.create(Weapon.prototype);

function Matter(id, parentId, name, display, exploSize, animColor, projSize, projSpeed, integrity, powerReq, output, fc, minDmg,maxDmg, accDecay, linked, shots, reload, arc1, arc2, arc3, arc4){
	Weapon.call(this, id, parentId, name, display, exploSize, integrity, powerReq, output, fc, minDmg,maxDmg, accDecay, linked, shots, reload, arc1, arc2, arc3, arc4);	
	this.type = "matter";
	this.animation = "projectile";
	this.animColor = animColor;
	this.projSize = projSize;
	this.projSpeed = projSpeed;
	this.priority = 6;
}
Matter.prototype = Object.create(Weapon.prototype);

function Laser(id, parentId, name, display, exploSize, rakeTime, animColor, beamWidth, integrity, powerReq, output, fc, minDmg,maxDmg, optRange, dmgDecay, accDecay, linked, shots, reload, arc1, arc2, arc3, arc4){
	Weapon.call(this, id, parentId, name, display, exploSize, integrity, powerReq, output, fc, minDmg,maxDmg, accDecay, linked, shots, reload, arc1, arc2, arc3, arc4);	
	this.type = "laser";
	this.animation = "beam";
	this.optRange = optRange;
	this.dmgDecay = dmgDecay;
	this.rakeTime = rakeTime;
	this.animColor = animColor;
	this.beamWidth = beamWidth;
	this.priority = 5;
	
	this.getFillStyle = function(x, y, dist){
		var grad = fxCtx.createRadialGradient(x, y, 0, x, y, dist);
		var opt = this.optRange / res.x;

		if (opt > 1){opt = 1;}
	
			grad.addColorStop(0, "red");
			grad.addColorStop(opt/2, "yellow");
			grad.addColorStop(opt, "green");
		//	grad.addColorStop(this.optRange/res.x*1.5, "yellow");
		
			if (opt*1.5 > 1){
				grad.addColorStop(1, "yellow");
			}
			else {
				grad.addColorStop(opt*1.5, "yellow");
				if (opt*2 < 1){	
					grad.addColorStop(opt*2, "red");
				}
			}
				
		return grad;
	}
	
	this.getDamageDecay = function(dist){
	//	var dist = getDistance(ship.getPlannedPos(), pos);
		var decay = this.dmgDecay;
		
		if (dist < this.optRange){
			dist = this.optRange - dist;
		} else dist = dist - this.optRange;
	//	console.log(dist);
		
		return Math.ceil(decay * dist/100);
	}
}
Laser.prototype = Object.create(Weapon.prototype);

function Launcher(id, parentId, name, display, launchRate, integrity, powerReq, output, reload, arc1, arc2, arc3, arc4){
	Weapon.call(this, id, parentId, name, display, false, integrity, powerReq, output, false, false, false, 0, 0, 1, reload, arc1, arc2, arc3, arc4);	
	this.launchRate = launchRate;
	this.type = "ballistic";
	this.animation = "ballistic";
	this.priority = 6;

	this.hover = function(e){
		if (game.flightDeploy){return false;}
		if (this.highlight){
			this.highlight = false;
			this.hideInfoDiv(e);
			this.hideFireButtons();
		}
		else {
			this.highlight = true;
			this.showInfoDiv(e);
			this.showFireButtons();
		}
		game.getShipById(this.parentId).highlightAllSelectedWeapons();
	}

	this.showFireButtons = function(){
		if (game.phase == -1 && this.getLoadLevel() >= 1){
			if (game.getShipById(this.parentId).userid == game.userid){
				var pId = this.parentId;
				var id = this.id;
				$(".shipDiv").not(".disabled").each(function(i){
					if ($(this).data("shipId") == pId){
						$(this).find(".system").each(function(j){
							if ($(this).data("systemId") == id){
								$(this).find(".subDiv").show();
								return;
							}
						});
					}
				});
			}
		}
	}

	this.hideFireButtons = function(){
		if (game.getShipById(this.parentId).userid == game.userid){
			var pId = this.parentId;
			var id = this.id;
			$(".subDiv").hide();
		}
	}

	this.setFireOrder = function(fire){
		this.selected = false;
		this.highlight = false;
		fire.shots = this.shots;
		this.fireOrders.push(fire);
		this.setTableRow();
	}

	this.getMount = function(){
		if (game.getShipById(aShip) instanceof Flight){
			return false;
		}
		var w = this.getArcWidth();
		var a = game.getShipById(aShip).getStructureById(this.structureId).getRemainingNegation();
		if (w <= 180){return "Canister / " + Math.floor(a * 0.7);
		} else return "Arm Rail / " + Math.floor(a * 0.3);
	}

	this.getFireControl = function(target){
		if (target instanceof Flight || target instanceof Salvo){
			return this.ammo.fc[1];
		} else return this.ammo.fc[0];
	}


	this.getOptionsDiv = function(){
		var div = document.createElement("div");
			div.className = "subDiv";
			$(div).data("shipId", this.parentId);
			$(div).data("systemId", this.id);
		var subDiv = document.createElement("div");
			subDiv.className = "plusShot";
			subDiv.innerHTML = "<span>+</span>";
			$(subDiv).bind("click", function(e){
				e.stopPropagation();
				var id = $(this.parentNode).data();
				game.getShipById(id.shipId).getSystemById(id.systemId).plusShot();
			});
			div.appendChild(subDiv);
		var subDiv = document.createElement("div");
			subDiv.className = "minusShot";
			subDiv.innerHTML = "<span>-</span>";
			$(subDiv).bind("click", function(e){
				e.stopPropagation();
				var id = $(this.parentNode).data();
				game.getShipById(id.shipId).getSystemById(id.systemId).minusShot();
			});
			div.appendChild(subDiv);
		return div;
	}

	this.plusShot = function(){
		if (this.shots < this.launchRate){
			//console.log("plusShot");
			this.shots += 1;
		}
	}

	this.minusShot = function(){
		if (this.shots > 1){
			//console.log("minusShot");
			this.shots -= 1;
		}
	}

	this.select = function(e){
		console.log(this);

		if (game.phase != -1){
			return false;
		}
		
		var id = this.id;
		var parentId = this.parentId;
		var selected = false;

		if (this.destroyed || this.disabled){
			return false;
		}
		else if (this.canFire()){
			if (this.hasActiveFireOrder()){
				this.unsetFireOrder();
			}

			if (this.selected){
				this.selected = false;
			}
			else {
				this.selected = true;
			}

			this.setTableRow();
		}
		else return false;

		var ship = game.getShipById(parentId);
	
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

	this.setTableRow = function(){
		var id = this.id;
		var parentId = this.parentId;
		var activeFire = this.hasActiveFireOrder();
		var selected = this.selected;
		var disabled = this.disabled;
		var destroyed = this.destroyed;

		var ele = $(".shipDiv").each(function(){
			if ($(this).data("shipId") == parentId){
				$(this).find(".system").each(function(){
					if ($(this).data("systemId") == id){
						if (selected){
							$(this).addClass("selected");
						}
						else {
							$(this).removeClass("selected");
						}

						if (activeFire){
							$(this).addClass("fireOrder");
						}
						else {
							$(this).removeClass("fireOrder");
						}
						return;
					}
				})
			}
		})
	}

	this.getRemainingAmmo = function(){
		var ammo = this.output;
		for (var i = 0; i < this.fireOrders.length; i++){
			ammo -= this.fireOrders[i].shots;
		}
		return ammo;
	}

	this.getDamage = function(){
		return this.ammo.getDamage();
	}

	this.getMaxDist = function(){
		return this.ammo.maxDist;
	}

	this.getBallImpulse = function(){
		return this.ammo.impulse;
	}

	this.getSystemDetailsDiv = function(){
		var div = document.createElement("div");
			div.id = "systemDetailsDiv";
		var table = document.createElement("table");
			
		var tr = document.createElement("tr");		
		var th = document.createElement("th");
			th.colSpan = 2; th.innerHTML = this.display.toUpperCase(); th.style.width = "40%"; tr.appendChild(th); table.appendChild(tr);

		$(table).append($("<tr>").append($("<td>").html("Weapon Type")).append($("<td>").html(this.type)));
		$(table).append($("<tr>").append($("<td>").html("Integrity")).append($("<td>").html(this.getRemainingIntegrity() + " / " + this.integrity)));
		$(table).append($("<tr>").append($("<td>").html("Mount / Armour")).append($("<td>").html(this.getMount())));
		$(table).append($("<tr>").append($("<td>").html("Loading")).append($("<td>").html(this.getTimeLoaded() + " / " + this.reload)));
		$(table).append($("<tr>").append($("<td>").html("Ammo")).append($("<td>").html(this.getRemainingAmmo() + " / " + this.output)));
		$(table).append($("<tr>").append($("<td>").html("Fire Control")).append($("<td>").html(this.ammo.fc[0] + "% / " + this.ammo.fc[1] + "%")));
		$(table).append($("<tr>").append($("<td>").html("Max Dist")).append($("<td>").html(this.getMaxDist())));
		$(table).append($("<tr>").append($("<td>").html("Impulse")).append($("<td>").html(this.getBallImpulse())));
		$(table).append($("<tr>").append($("<td>").html("Launch Rate")).append($("<td>").html("<font color='red'>" + this.shots + "</font> - max " + this.launchRate)));

		if (this.linked > 1){
			var tr = table.insertRow(-1); tr.insertCell(-1).innerHTML = "Linked Fire"; tr.childNodes[0].colSpan = 2;
		}

		$(table).append($("<td>").html("Damage")).append($("<td>").html(this.getDamage()));

		if (this.type == "laser"){
			$(table).append($("<tr>").append($("<td>").html("Rakes")).append($("<td>").html(this.output)));
			$(table).append($("<tr>").append($("<td>").html("Focus point")).append($("<td>").html(this.optRange)));
			$(table).append($("<tr>").append($("<td>").html("Damage loss")).append($("<td>").html(this.dmgDecay + "% per 100px")));
		}

		if (this.crits.length){
			var tr = table.insertRow(-1); tr.insertCell(-1).innerHTML = "Modifiers"; tr.childNodes[0].colSpan = 2; tr.childNodes[0].border = "1px solid white";

			for (var i = 0; i < this.crits.length; i++){
				var tr = document.createElement("tr");
				var td = document.createElement("td");
					td.colSpan = 2;
					td.className = "negative"
					td.innerHTML = this.crits[i].getStringValue(); tr.appendChild(td); table.appendChild(tr);
			}
		}
		div.appendChild(table);
			
		return div;
	}
}
Launcher.prototype = Object.create(Weapon.prototype);

function Hangar(id, parentId, name, display, start, end, integrity, powerReq, output, launchRate, loads){
	Weapon.call(this, id, parentId, name, display, 0, integrity, powerReq, output, 0, 0, 0, 0, 0, 0, 0, 0);	
	this.start = start;
	this.end = end;
	this.launchRate = launchRate;
	this.loads = loads;
	this.weapon = false;
	this.range = 75;

	this.select = function(e){
		console.log(this);
		var id = this.id;
		var parentId = this.parentId;
		var selected = false;
		var ship = game.getShipById(parentId);

		if (game.phase == -2){
			this.setupHangarLoadout(e);
			return;
		}
		else if (this.destroyed || this.disabled){
			return false;
		}
		else if (! this.selected){
			if (game.getShipById(aShip).actions[0].resolved){
				if (! ship.hasSystemsSelected()){
					this.selected = true;
					this.enableHangarDeployment(e);
				}
			}
		}
		else {
			this.selected = false;
			this.hideHangarDiv();
			if (game.flightDeploy){
				game.flightDeploy = false;
				$("#deployOverlay").hide();
			}
		}

		this.setTableRow();
	}

	this.hover = function(e){
		if (game.flightDeploy){return false;}
		if (this.highlight){
			this.highlight = false;
			this.hideInfoDiv();
			game.getShipById(this.parentId).highlightAllSelectedWeapons();
		}
		else {
			this.highlight = true;
			this.drawArc();
			this.showInfoDiv(e);
		}
	}

	this.getMount = function(){
		return Math.ceil(game.getShipById(aShip).getStructureById(this.structureId).getRemainingNegation() * 0.5);
	}

	this.drawArc = function(){
		game.getShipById(this.parentId).showHangarLaunchAxis(this);
	}

	this.enableHangarDeployment = function(e){
		if (game.getShipById(aShip).userid != game.userid){
			return false;
		}
		var div = document.getElementById("hangarLoadoutDiv");
			$("#launchRate").html(this.launchRate);
			$("#capacity").html(this.output);
		this.showHangarControl();

		if ($(div).hasClass("disabled")){
			$(div).data("systemid", this.id).css("top", e.clientY + 30).css("left", e.clientX - 150).removeClass("disabled");
		}
		else {
			$(div).addClass("disabled");
		}
	}

	this.showHangarControl = function(){
		if (game.getShipById(aShip).userid != game.userid){
			return false;
		}
		var table = document.getElementById("hangarTable");
			table.innerHTML = "";

			var tr = document.createElement("tr");
			var th = document.createElement("th"); th.innerHTML = "Class"; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = "Available"; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = ""; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = ""; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = "To launch"; tr.appendChild(th)
			table.appendChild(tr);

		var id = this.id;

		for (var i = 0; i < this.loads.length; i++){
			var tr = table.insertRow(-1)
				tr.insertCell(-1).innerHTML = this.loads[i].classname;
				tr.insertCell(-1).innerHTML = this.loads[i].amount;
				var td = document.createElement("td");
					td.innerHTML = "<img src='varIcons/plus.png'>"; $(td).data("classname", this.loads[i].classname).data("val", 1); tr.appendChild(td);
					td.addEventListener("click", function(){
						game.getShipById(aShip).getSystemById(id).alterFlight(this);
					});
				var td = document.createElement("td");
					td.innerHTML = "<img src='varIcons/minus.png'>"; $(td).data("classname", this.loads[i].classname).data("val", -1); tr.appendChild(td);
					td.addEventListener("click", function(){
						game.getShipById(aShip).getSystemById(id).alterFlight(this);
					});
				var td = document.createElement("td");
					td.id = this.loads[i].classname + "Amount";
					td.innerHTML = this.loads[i].launch; tr.appendChild(td);

			table.appendChild(tr);
		}

		$("#hangarLoadoutDiv").find("input").unbind().click({systemid: id}, window.sharedLaunchFlight);

		if (this.canLaunchFlight()){
			$("#hangarLoadoutDiv").find("input").removeClass("disabled");
		}
	}

	this.launchFlight = function(){
		for (var i = game.ships.length-1; i >= 0; i--){
			if (game.ships[i].userid == game.userid){
				if (game.ships[i].flight){
					if (game.ships[i].actions[0].resolved == 0){
						if (game.ships[i].launchdata.shipid == window.aShip && game.ships[i].launchdata.systemid == this.id){
							console.log("splice");
							game.ships.splice(i, 1);
							game.draw();
							break;
						}
					}
				}
			}
		}
		instruct("Select a deployment point. The flight's facing will be projected onwards the launching vessel.");
		this.drawArc();
		moveCtx.clearRect(0, 0, res.x, res.y);
		game.flightDeploy = this;
	}

	this.alterFlight = function(ele){
		if (game.phase != -1){return false}
		var classname = $(ele).data("classname");
		var val = $(ele).data("val");

		var total = 0;
		for (var i = 0; i < this.loads.length; i++){
			total += this.loads[i].launch;
		}

		for (var i = 0; i < this.loads.length; i++){
			if (this.loads[i].classname == classname){
				if (this.loads[i].launch + val >= 0 && this.loads[i].launch + val <= this.loads[i].amount && total + val <= this.launchRate){
					this.loads[i].launch += val;
					$("#" + this.loads[i].classname + "Amount").html(this.loads[i].launch);
					break;
				}
			}
		}

		if (this.canLaunchFlight()){
			$("#hangarLoadoutDiv").find("input").removeClass("disabled");
		}
		else {
			$("#hangarLoadoutDiv").find("input").addClass("disabled");
		}
	}

	this.canLaunchFlight = function(){
		for (var i = 0; i < this.loads.length; i++){
			if (this.loads[i].launch >= 1){
				return true;
			}
		}
		return false;
	}

	this.hideHangarDiv = function(){
		$("#hangarLoadoutDiv").addClass("disabled").find("input").addClass("disabled");
	}

	this.addFighter = function(ele){
		tMass = 0;
		tCost = 0;

		for (var i = 0; i < this.loads.length; i++){
			tMass += this.loads[i].amount * this.loads[i].mass;
			tCost += this.loads[i].amount * this.loads[i].cost;
		}

		for (var i = 0; i < this.loads.length; i++){
			if (this.loads[i].classname == ele.childNodes[0].innerHTML){
				if (tMass + this.loads[i].mass <= this.output){
					this.loads[i].amount += 1;
					this.updateTotals();
					break;
				}
				else {
					popup("Insufficient Hangar Space available");
				}
			}
		}
	}

	this.removeFighter = function(ele){
		for (var i = 0; i < this.loads.length; i++){
			if (this.loads[i].classname == ele.childNodes[0].innerHTML){
				if (this.loads[i].amount >= 1){
					this.loads[i].amount -= 1;
					this.updateTotals();
					break;
				}
			}
		}
	}

	this.updateTotals = function(){
		var amount = 0;
		var tMass = 0;
		var tCost = 0;
		var table = document.getElementById("hangarTable");
			table.innerHTML = "";

			var tr = document.createElement("tr");
			var th = document.createElement("th"); th.innerHTML = "Class"; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = "Mass"; th.width = "40px"; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = "Cost"; th.width = "40px"; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = ""; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = ""; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = "Amount"; th.width = "70px"; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = "Total Mass"; th.width = "70px"; tr.appendChild(th)
			var th = document.createElement("th"); th.innerHTML = "Total Cost"; th.width = "70px"; tr.appendChild(th)
			table.appendChild(tr);


		for (var i = 0; i < this.loads.length; i++){
			var tr = table.insertRow(-1);
				tr.insertCell(-1).innerHTML = this.loads[i].classname;
				tr.insertCell(-1).innerHTML = this.loads[i].mass;
				tr.insertCell(-1).innerHTML = this.loads[i].cost;
			var td = document.createElement("td");
				td.innerHTML = "<img src='varIcons/plus.png'>"; tr.appendChild(td);
				td.addEventListener("click", function(e){
					window.game.addFighter(this.parentNode);
				})
			var td = document.createElement("td");
				td.innerHTML = "<img src='varIcons/minus.png'>"; tr.appendChild(td);
				td.addEventListener("click", function(e){
					window.game.removeFighter(this.parentNode);
				})
				tr.insertCell(-1).innerHTML = this.loads[i].amount;
				tr.insertCell(-1).innerHTML = this.loads[i].this.loads[i].amount * this.loads[i].mass;
				tr.insertCell(-1).innerHTML = this.loads[i].this.loads[i].amount * this.loads[i].mass;
				tr.insertCell(-1).innerHTML = this.loads[i].mass;
				tr.insertCell(-1).innerHTML = this.loads[i].amount;
		}

		var tr = document.createElement("tr");
		var th = document.createElement("th"); tr.appendChild(th);
			th.innerHTML = "Grand Total";
			th.colSpan = 5;
		var th = document.createElement("th");th.innerHTML = amount; tr.appendChild(th);
		var th = document.createElement("th");th.innerHTML = tMass; tr.appendChild(th);
		var th = document.createElement("th");th.innerHTML = tCost; tr.appendChild(th);
		table.appendChild(tr);
		this.totalCost = tCost;
	}

	this.setupHangarLoadout = function(e){
		var div = document.getElementById("hangarLoadoutDiv");
		$("#launchRate").html(this.launchRate);
		$("#capacity").html(this.output);
		if ($(div).hasClass("disabled")){
			$(div).data("systemid", this.id).css("top", e.clientY + 30).css("left", e.clientX - 150).removeClass("disabled");
			this.updateTotals();
		}
		else {
			window.game.setShipTotal();
			$(div).addClass("disabled");
		}
	}

	this.getLaunchRate = function(){
		return this.launchRate;
	}
	
	this.getSystemDetailsDiv = function(){
		var div = document.createElement("div");
			div.id = "systemDetailsDiv";
		var table = document.createElement("table");
			
		var tr = document.createElement("tr");		
		var th = document.createElement("th");
			th.colSpan = 2; th.innerHTML = this.display.toUpperCase(); th.style.width = "40%"; tr.appendChild(th); table.appendChild(tr);

		$(table).append($("<tr>").append($("<td>").html("Mass Capacity")).append($("<td>").html(this.output + " metric tons")));
		$(table).append($("<tr>").append($("<td>").html("Integrity")).append($("<td>").html(this.getRemainingIntegrity() + " / " + this.integrity)));
		$(table).append($("<tr>").append($("<td>").html("Armour")).append($("<td>").html(this.getMount())));
		$(table).append($("<tr>").append($("<td>").html("Launch Rate")).append($("<td>").html(this.getLaunchRate() + " per Turn")));

		if (this.crits.length){
			var tr = table.insertRow(-1); tr.insertCell(-1).innerHTML = "Modifiers"; tr.childNodes[0].colSpan = 2; tr.childNodes[0].border = "1px solid white";

			for (var i = 0; i < this.crits.length; i++){
				var tr = document.createElement("tr");
				var td = document.createElement("td");
					td.colSpan = 2;
					td.className = "negative"
					td.innerHTML = this.crits[i].getStringValue(); tr.appendChild(td); table.appendChild(tr);
			}
		}
		div.appendChild(table);
			
		return div;
	}
}
Weapon.prototype = Object.create(Weapon.prototype);
