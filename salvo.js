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
	this.currentImpulse = data.currentImpulse;
	this.baseHitChance = data.baseHitChance;
	this.fireOrder = data.fireOrder;
	this.available = data.available;
	this.facing = data.facing;
	this.mission = data.mission;
	this.x = data.x;
	this.y = data.y;
	this.drawX = data.x;
	this.drawY = data.y;
	this.traverse = data.traverse;
	this.hold = false;
	this.shortInfo = false;
	this.selected = false;
	this.structures = [];
	this.layout = [];
	this.size;
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
	this.element;
	this.doDraw = 1;

	this.getShots = function(){
		return this.fireOrder.shots;
	}

	this.setImage = function(){
		return;
	}

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

	this.getPlannedPosition = function(){
		return this.getBaseOffsetPos();
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
			ctx.lineWidth = 3;
			ctx.globalAlpha = 1;
			if (this.friendly){ctx.strokeStyle = "white";}
			else {ctx.strokeStyle = "white";}
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

	this.getCurrentImpulse = function(){
		if (game.phase >= 3){
			return this.currentImpulse + this.baseImpulse*(1-this.destroyed);
		} else return this.currentImpulse;
	}

	this.getTrackingString = function(){
		var t = game.getUnitById(this.targetid).traverse;
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
			td.innerHTML = this.display; td.colSpan = 4;

		var target = game.getUnitById(this.targetid);
		var tr = table.insertRow(-1);
		var td = tr.insertCell(-1);
			td.className = "subHeader";
			td.innerHTML = "Targeting: <span class='red size15'>" + target.name + " #" + target.id + "</span> -- Distance: "+ Math.ceil(getDistance({x: this.x, y: this.y}, {x: target.x, y: target.y})) + "px"; td.colSpan = 4;
		div.appendChild(table);

		var table = document.createElement("table");
			table.style.width = "95%"; table.style.marginTop = "20px";
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
					console.log(game.getBallById(aUnit).getSystemById($(this).data("id")));
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
			e.preventDefault();
			$(this).addClass("disabled");
		}).drag();
		
		this.element = div;
		document.getElementById("game").appendChild(div);
	}

	this.create = function(){
		this.size = 18;
		this.img = window.ballImages[this.name.toLowerCase()].cloneNode(true);
		this.setDisplay();
		//this.setFacing();
		this.createBaseDiv();
		this.setLayout();

		if (this.userid == game.userid){
			this.friendly = true;
		} else this.friendly = false;
	}

	this.setTargea = function(){
		this.setFinalStep();
		this.setNextStep();
	}

	this.setTarget = function(){
		var i = this.getCurrentImpulse();
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

				//var vector = new Vector(target, target.nextStep);
				//var speedMod = this.getCurrentImpulse() / target.getCurrentImpulse();
				//this.finalStep = getIntercept(this, target, vector, speedMod);

			}

		}
		else if (target.salvo){
		}
	}

	this.setDisplay = function(){
		this.display = this.structures[0].display;
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

	this.setPostMovePosition = function(){
		this.x = this.actions[this.actions.length-1].x;
		this.y = this.actions[this.actions.length-1].y;
	}
	
	this.draw = function(){
		if (game.animateFire && !this.animated){return;}
		this.setTransform()
		this.drawSelf();		
		this.drawPositionMarker();
		this.resetTransform()
	}

	this.drawMove = function(){

		ctx.save();
		ctx.translate(this.drawX, this.drawY);
		ctx.rotate((this.facing + 90) * (Math.PI/180));

		this.drawSelf();
		this.drawPositionMarker();

		ctx.restore();

		ctx.beginPath();
		ctx.moveTo(this.drawX, this.drawY);
		ctx.lineTo(this.finalStep.x, this.finalStep.y);
		ctx.closePath();

		ctx.globalAlpha = 0.2;
		ctx.strokeStyle = "white";
		ctx.stroke();
		ctx.globalAlpha = 1;
	}

	this.setTransform = function(){
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate((this.facing + 90) * (Math.PI/180));
	}

	this.resetTransform = function(){
		ctx.restore();
	}

	this.drawSelf = function(){
		ctx.drawImage(this.img, 0 -this.size/2, 0 -this.size/2, this.size, this.size);
	}

	this.drawPositionMarker = function(){
		ctx.beginPath();
		ctx.arc(0, 0, this.size/2, 0, 2*Math.PI, false);
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

	this.getHitChanceFromAngle = function(){
		return this.baseHitChance;
	}

	this.getPlannedFacing = function(){
		return this.facing;
	}

	this.getBaseOffsetPos = function(){
		if (this.actions.length){
			for (var i = this.actions.length-1; i >= 0; i--){
				if (this.actions[i].resolved == 1){
					return {x: this.actions[i].x, y: this.actions[i].y};
				}
			}
		}
		return {x: this.x, y: this.y};
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

Salvo.prototype.getTarget = function(){
	return game.getUnitById(this.targetid);	
}

Salvo.prototype.hasLockOnUnit = function(){
	return false;
}

Salvo.prototype.isMaskedFromUnit = function(){
	return false;
}

Salvo.prototype.getImpulseMod = function(){
	return 1;
}

Salvo.prototype.switchDiv = function(){
	Ship.prototype.switchDiv.call(this);
}

Salvo.prototype.select = function(){
	if (!this.selected){
		this.selected = 1;
		console.log(this);
	} else this.selected = 0;

	this.switchDiv();
}

Salvo.prototype.setUnitGUI = function(){
	var id = this.id;
	$("#unitGUI").find("img").each(function(){
		if ($(this).data("id") == id){
			$(this).toggleClass("selected"); return;
		}
	});
	$(this.element).toggleClass("selection");
}

Salvo.prototype.getArmourString = function(a){
	return this.structures[0].negation;
}

Salvo.prototype.getTargetPosition = function(){
	if (this.mission.targetid){
		return this.getTarget().getPlannedPosition();
	} else return this.mission;
}

Salvo.prototype.inRange = function(){
	if (getDistance(this.getTargetPosition(), this.getBaseOffsetPos()) <= this.getCurrentImpulse()){
		return true;
	} else return false;
}

Salvo.prototype.setFinalStep = function(){
	if (this.finalStep != undefined){
	//	return;
	}

	var target = this.getTarget();

	if (this.salvo && target.salvo || this.flight && target.flight){
		if (target.finalStep == undefined){
			target.setFinalStep();
		}
		var vector = new Vector(target, target.getTarget());
		var speedMod = this.getCurrentImpulse() / target.getCurrentImpulse();
		this.finalStep = getIntercept(this.getPlannedPosition(), target, vector, speedMod);
		//this.finalStep = target.nextStep;
	}
	else {
		this.finalStep = target.getPlannedPosition();
	}
}

Salvo.prototype.setNextStep = function(){
	var target = this.getTarget();
	var dist = getDistance(this.getPlannedPosition(), this.finalStep);
	var impulse = this.getCurrentImpulse();
	if (impulse < dist){
		var a = getAngleFromTo(this, target.getPlannedPosition());
		this.nextStep = getPointInDirection(impulse, a, this.x, this.y);
	}
	else {
		this.nextStep = this.finalStep;
	}
}

Salvo.prototype.drawMovePlan = function(){
	if (!this.doDraw){return;}
	if (game.phase < 2){
		planCtx.translate(cam.o.x, cam.o.y);
		planCtx.scale(cam.z, cam.z)
		planCtx.translate(this.x, this.y);
		planCtx.beginPath();
		planCtx.moveTo(0, 0);
		planCtx.translate(-this.x + this.nextStep.x, -this.y + this.nextStep.y);
		planCtx.lineTo(0, 0);
		planCtx.closePath();

		planCtx.globalAlpha = 1;
		planCtx.strokeStyle = "red";
		planCtx.lineWidth = 1;
		planCtx.stroke();
		planCtx.setTransform(1,0,0,1,0,0);
	}

	if (this.nextStep != this.finalStep){
		planCtx.translate(cam.o.x, cam.o.y);
		planCtx.scale(cam.z, cam.z)
		planCtx.translate(this.nextStep.x, this.nextStep.y);
		planCtx.beginPath();
		planCtx.moveTo(0, 0);
		planCtx.translate(-this.nextStep.x + this.finalStep.x, -this.nextStep.y + this.finalStep.y);
		planCtx.lineTo(0, 0);
		planCtx.closePath();

		planCtx.globalAlpha = 1;
		planCtx.strokeStyle = "white";
		planCtx.stroke();
		planCtx.setTransform(1,0,0,1,0,0);
	}
	game.flightPath = true;
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