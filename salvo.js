function Mixed(data){
	Ship.call(this, data);
	this.ship = false;
	this.primary = false;
	this.mission = data.mission;
	this.nextStep;
	this.finalStep;
	this.layout = [];
}

Mixed.prototype = Object.create(Ship.prototype);

Mixed.prototype.canDeploy = function(){
	return false;
}

Mixed.prototype.hasHangarSelected = function(){
	return false;
}

Mixed.prototype.launchedThisTurn = function(){
		if (this.available == game.turn){
			return true;
		}
		return false;
}

Mixed.prototype.resetMoveMode = function(){
	return;
}


Mixed.prototype.doHighlight = function(){
	if (this.highlight){
		this.highlight = false;
		game.draw();
	}	
	else {
		this.highlight = true;
		ctx.translate(cam.o.x, cam.o.y);
		ctx.scale(cam.z, cam.z);
		ctx.beginPath();
		ctx.arc(this.drawX, this.drawY, this.size/2, 0, 2*Math.PI, false);
		ctx.closePath();
		ctx.lineWidth = 3;
		ctx.globalAlpha = 1;
		ctx.strokeStyle = "white";
		ctx.stroke();
		ctx.setTransform(1,0,0,1,0,0);
		this.drawMovePlan();
	}
}


Mixed.prototype.isDestroyed = function(){
	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].destroyed && !this.structures[i].disabled){
			return false;
		}
	}
	return true;
}

Mixed.prototype.setStatus = function(){
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].crits.length; j++){
			if (this.structures[i].crits[j].type == "Disabled"){
				this.structures[i].disabled = true;
			}
		}

		if (this.structures[i].destroyed){
			for (var k = 0; k < this.structures[i].systems.length; k++){
				this.structures[i].systems[k].destroyed = true;
			}
		}
		else if (this.structures[i].disabled){
			for (var k = 0; k < this.structures[i].systems.length; k++){
				this.structures[i].systems[k].disabled = true;
			}
		}
	}
}

Mixed.prototype.hasLockOnUnit = function(){
	return false;
}

Mixed.prototype.isMaskedFromUnit = function(){
	return false;
}

Mixed.prototype.getImpulseMod = function(){
	return 1;
}

Mixed.prototype.drawMovePlan = function(){
	if (this.mission.arrived){
		return;
	}
	var target;
	var origin = this.getPlannedPosition();
	if (this.mission.type > 1){
		target = game.getUnitById(this.mission.targetid).getPlannedPosition();
	} else target = {x: this.mission.x, y: this.mission.y};


	var dist = getDistance(this.getPlannedPosition(), target);
	var impulse = this.getCurrentImpulse();

	planCtx.globalAlpha = 1;
	planCtx.translate(cam.o.x, cam.o.y);
	planCtx.scale(cam.z, cam.z);
	planCtx.beginPath();
	planCtx.moveTo(origin.x, origin.y);

	if (impulse < dist){
		var a = getAngleFromTo(this, target);
		var step = getPointInDirection(impulse, a, origin.x, origin.y);

		planCtx.lineTo(step.x, step.y);
		planCtx.closePath();
		if (!this.friendly){
		planCtx.strokeStyle = "red";
		} else planCtx.strokeStyle = "#00ea00";
		planCtx.stroke();
		planCtx.beginPath();
		planCtx.moveTo(step.x, step.y);
	}

	planCtx.lineTo(target.x, target.y);
	planCtx.closePath();
	planCtx.strokeStyle = "white";
	planCtx.stroke();
	planCtx.setTransform(1,0,0,1,0,0);
}


Mixed.prototype.getTargetPosition = function(){
	if (this.mission.targetid){
		return this.getTarget().getPlannedPosition();
	} else return this.mission;
}

Mixed.prototype.inRange = function(){
	if (getDistance(this.getTargetPosition(), this.getBaseOffsetPos()) <= this.getCurrentImpulse()){
		return true;
	} else return false;
}

Mixed.prototype.getTarget = function(){
	return game.getUnitById(this.mission.targetid);	
}

Mixed.prototype.setTarget = function(){
	var i = this.getCurrentImpulse();
	if (this.mission.type == 1){  // patrol goal
		this.finalStep = {x: this.mission.x, y: this.mission.y};
		d = getDistance(this, this.finalStep);
		if (d < i){
			this.nextStep = this.finalStep;
		} else this.nextStep = getPointInDirection(i, this.facing, this.x, this.y);
	}
	else {
		if (this.mission.type == 2){
			var target = this.getTarget();
			if (target.ship){
				this.finalStep = target.getPlannedPosition();
				var d = getDistance(this, this.finalStep);
				if (d < i){
					this.nextStep = this.finalStep;
				} else this.nextStep = getPointInDirection(i, getAngleFromTo(this, this.finalStep), this.x, this.y);
			}
			else if (target.flight){
				var i = this.getCurrentImpulse();
				var d;
				if (this.mission.type == 2 || this.mission.type == 3){ // strike intercept goal
					if (target.finalStep == undefined){
						target.setTarget();
					}
					this.finalStep = target.nextStep;
					d = getDistance(this, target.nextStep);
					if (d < i){
						this.nextStep = target.nextStep;
					} else this.nextStep = getPointInDirection(i, getAngleFromTo(this, target.nextStep), this.x, this.y);
				}
			}
			else if (target.salvo){
			}
		}
	}

	this.facing = getAngleFromTo(this, this.nextStep);
}

Mixed.prototype.drawSelf = function(){
	ctx.translate(this.drawX, this.drawY);
	ctx.drawImage(this.drawImg, -this.drawImg.width/2, -this.drawImg.height/2);
	ctx.translate(-this.drawX, -this.drawY);
}

Mixed.prototype.drawEscort = function(){
	return;
}

Mixed.prototype.canShortenTurn = function(){
	return false;
}

Mixed.prototype.canUndoShortenTurn = function(){
	return false;
}

Mixed.prototype.create = function(){
	this.setRawImage();
	this.setStatus();
	this.setLayout();
	this.setDrawData();
	if (this.id < 0){
		this.setMaxMass();
		this.setImpulse();
	}
	this.setSize();
	this.setImage();
}

Mixed.prototype.hasSystemSelected = function(){
	return false;
}

Mixed.prototype.getSystemById = function(){
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].id == id){
			return this.structures[i];
		}
	}
}

function Salvo(data){
	Mixed.call(this, data);
	this.salvo = 1;

	this.setSize = function(){
		this.size = 18;
	}

	this.setLayout = function(){
		for (var i = 0; i < this.structures.length; i++){
			this.layout.push({x: range(-14, 14)});
		}
	}

	this.getDamageEntriesByFireId = function(fire){
		var dmgs = [];
		var lookup = 0;

		for (var i = 0; i < fire.hits.length; i++){
			lookup += fire.hits[i]
		}

		if (!lookup){
			return dmgs;
		}

		for (var i = 0; i < this.structures.length; i++){
			for (var j = this.structures[i].damages.length-1; j >= 0; j--){
				if (this.structures[i].damages[j].fireid == fire.id){
					dmgs.push(this.structures[i].damages[j]);
					dmgs[dmgs.length-1].system = "Missile";
					lookup--;
					if (!lookup){return dmgs};
				}
				else if (this.structures[i].damages[j].turn < fire.turn){
					break;
				}
			}
		}
		return dmgs;
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

	this.getCurrentImpulse = function(){
		if (game.phase >= 3){
			return this.currentImpulse + this.baseImpulse*(1-this.destroyed);
		} else return this.currentImpulse;
	}

	this.getTrackingString = function(){
		var t = this.getTarget().traverse;
		var html = "";
		var d = Math.max(0, (this.structures[0].traverse - t));
		html += game.getUnitType(this.structures[0].traverse) + "<span class=";

		if (d > 0){
			html += "'red'>";
		} else html += "'green'>";
		
		return html + " (" + Math.floor(100-d*20) + "%)</span>";
	}
	
	this.getDefensiveBonus = function(s){
		return 0;
	}

	this.createBaseDiv = function(){
		var owner = "friendly";
		if (this.userid != game.userid){owner = "hostile";}
		var div = document.createElement("div");
			div.className = "ammoDiv " + owner + " disabled";
			$(div).data("ammoId", this.id);
		
		var table = document.createElement("table");
			table.style.width = "95%"

		var tr = table.insertRow(-1);
		var td = tr.insertCell(-1); td.className = "header";	
			td.innerHTML = this.structures.length + "x '" + this.name + "' #" + this.id; td.colSpan = 4;

		var tr = table.insertRow(-1);
		var td = tr.insertCell(-1); td.className = "subHeader";
			td.innerHTML = this.structures[0].display; td.colSpan = 4;

		var tPos = this.getTarget().getPlannedPosition();
		var tr = table.insertRow(-1);
		var td = tr.insertCell(-1);
			td.className = "subHeader";
			td.innerHTML = "Distance to target: "+ Math.ceil(getDistance({x: this.x, y: this.y}, {x: tPos.x, y: tPos.y})) + "px"; td.colSpan = 4;
		div.appendChild(table);

		var table = document.createElement("table");
			table.style.width = "95%"; table.style.marginTop = "10px";
    	$(table)
			.append($("<tr>")
	    		.append($("<th>").html("Thrust / Accel"))
	    		.append($("<th>").html("Armour"))
	    		.append($("<th>").html("Damage"))
	    		.append($("<th>").html("Tracking up to"))
			)
			.append($("<tr>")
	    		.append($("<td>").html(this.getCurrentImpulse() + " (+" + Math.floor(this.getBaseImpulse()) + " per Turn)"))
	    		.append($("<td>").html(this.structures[0].negation))
	    		.append($("<td>").html(this.getDamage()))
	    		.append($("<td>").html(this.getTrackingString()))
			)

		div.appendChild(table);

		var table = document.createElement("table");
			table.style.borderCollapse = "collapse";
			table.style.margin = "auto";
		var tr = document.createElement("tr");

		var max = Math.min(5, this.structures.length);

		var impact = false;
		if (this.actions.lenght && this.actions[this.actions.length-1].type == "impact"){
			impact = true;
		}

		for (var i = 0; i < this.structures.length; i++){
			if (i % max === 0){
			    var tbody = table.appendChild(document.createElement("tbody"));
			    var tr1 = tbody.insertRow(-1);
			    var tr2 = tbody.insertRow(-1);
			}

			var td = document.createElement("td");
				td.className = "iconContainer"; 
				$(td).data("id", this.structures[i].id);
				td.addEventListener("click", function(){
					console.log(game.getUnitById(aUnit).getSystemById($(this).data("id")));
				})

				if (this.structures[i].destroyed || this.structures[i].disabled){
				var img = new Image();
					img.className = "ammoOverlay";
					img.src = "varIcons/destroyed.png";
					td.appendChild(img);
				}
				/*else if (impact){
					if (true){
						img.src = "varIcons/ammoHit.png";
					} else img.src = "varIcons/ammoMiss.png";
				}*/
				$(td).append($(this.img.cloneNode(true)).addClass("size40"));

			tr1.appendChild(td);

			var td = document.createElement("td");
				td.className = "iconIntegrity";

			var rem = this.structures[i].getRemainingIntegrity();

			var bgDiv = document.createElement("div");
				bgDiv.className = "integrityAmount"; bgDiv.style.top = 2;
				bgDiv.style.fontSize = "12px";
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
		//	e.preventDefault();
		//	$(this).addClass("disabled");
		}).drag();
		
		this.element = div;
		document.getElementById("game").appendChild(div);
	}

	this.setDisplay = function(){
		this.display = this.structures[0].display;
	}

	this.setLayouta = function(){
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

	this.getHitChanceFromAngle = function(){
		return Math.floor(Math.sqrt(this.structures[0].mass) * 15);
	}

	this.getTrajectoryStart = function(){
		return {x: this.x, y: this.y};
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

Salvo.prototype = Object.create(Mixed.prototype);

Salvo.prototype.getArmourString = function(a){
	return this.structures[0].negation;
}

Salvo.prototype.getShortInfo = function(){
	var ele = $("#shortInfo");
	if (this.userid == game.userid){
		$(ele).attr("class", "friendly");
	} else $(ele).attr("class", "hostile");

	var table = document.createElement("table");
		table.insertRow(-1).insertCell(-1).innerHTML = this.structures.length + "x " + this.name + " #" + this.id;
		table.insertRow(-1).insertCell(-1).innerHTML =  "Thrust: " + this.getCurrentImpulse();
		table.insertRow(-1).insertCell(-1).innerHTML = "Base Hit: " + this.getHitChanceFromAngle() + "%";

	if (this.inRange()){
		var tr = table.insertRow(-1);
		if (game.phase < 3){
			tr.insertCell(-1).innerHTML = "<span class='red'>IMPACT IMMINENT</span>";
		}
		else if (this.actions[this.actions.length-1].type == "impact"){
			if (this.status == "intercepted"){
				tr.insertCell(-1).innerHTML = "<span class='red'>INTERCEPTED</span>";
			}
			else tr.insertCell(-1).innerHTML = "<span class='red'>DID IMPACT</span>";
		}
	}
	return table;
}

Salvo.prototype.isReady = function(){
	if (this.available < game.turn){
		return true;
	}
	else if (this.available == game.turn && !(game.phase == 0 && game.animating && !this.deployed)){
		if (this.userid == game.userid && this.actions.length || game.phase >= 0){
			return true;
		}
	} else if (this.available > game.turn && this.actions.length == 1 && !this.actions[0].resolved){
		return true;
	}
	return false;
}


Salvo.prototype.setRawImage = function(){
	this.img = window.ballImages[this.structures[0].name.toLowerCase()].cloneNode(true);
}

Salvo.prototype.setImage = function(){
	var t = document.createElement("canvas");
		t.width = this.size*2;
		t.height = this.size*2;
	var ctx = t.getContext("2d");

	ctx.translate(t.width/2, t.height/2);
	ctx.rotate((this.getDrawFacing()+90) * (Math.PI/180));
	ctx.drawImage(
		this.img,
		0 -this.size/2,
		0 -this.size/2,
		this.size, 
		this.size
	)
	//ctx.translate(this.size/2, this.size/2);
	//ctx.rotate((this.getDrawFacing()+90) * (Math.PI/180));
	ctx.setTransform(1,0,0,1,0,0);

	this.drawImg = t;
}