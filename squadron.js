function Squaddie(data){
	Single.call(this, data);
	this.structures = [];
	this.size = data.size;
}

Squaddie.prototype = Object.create(Single.prototype);

Squaddie.prototype.create = function(){
	this.setElement();
}

Squaddie.prototype.setElement = function(){
	this.element = $("<div>").addClass("unitContainer").data("subId", this.id);
}

Squaddie.prototype.expandElement = function(){
	var pDiv = $("<div>")
		.addClass("primaryDiv")
		.data("subId", this.id)
		.data("shipId", this.parentId)
		.click(function(){
			console.log(game.getUnit($(this).data("shipId")).getStructureById($(this).data("subId")));
		})
	var cTable = $("<table>")
		.addClass("primaryTable")
		.append(this.primary.getCoreData())
		.append(this.primary.getArmourData())
		.append($("<tr>")
			.append($("<td>").addClass("emptySystem"))
			.append(
				$(this.primary.systems[0].getTableData(false))
					.click(function(){
						console.log("click");
					}
				)
			)
			.append($("<td>").addClass("emptySystem"))
		)


	$(this.element).append($(pDiv).append(cTable));

	var cWidth = $(this.element).width();
	var cHeight = $(this.element).height();

	var pWidth = $(pDiv).width();
	var pHeight = $(pDiv).height();

	var primPosX = cWidth/2 - pWidth/2;
	var primPosY = cHeight/2 - pHeight/2 + 15;


	$(pDiv)
		.css("left", primPosX)
		.css("top", primPosY)

	for (var i = 0; i < this.structures.length; i++){
		var a = this.structures[i].getDirection();
		var p = getPointInDirection(pWidth - 30, a-90, primPosX, primPosY);
		var s = 24;

		var oX = 0;
		var oY = 0;

		var shiftX = s;
		var shiftY = s;

		var space = 10;

		if (a == 0 || a == 360 || a == 180){
			if (this.structures[i].systems.length == 2){
				oX = -s/2 - space/2;
			}
			else if (this.structures[i].systems.length == 3){
				oX = -s - space;
			}
		}
		else {
			if (this.structures[i].systems.length > 1){
				oY = -s*this.structures[i].systems.length + space;
			}
		}

		for (var j = 0; j < this.structures[i].systems.length; j++){
			var ele = this.attachEvent(this.structures[i].systems[j].getDiv());

			$(this.element)
			.append(
				$(ele)
					.css("left", p.x - s/2 + pWidth/2 + oX)
					.css("top", p.y - s/2 + pWidth/2 + oY)
				)

			if (oX){oX += shiftX + space +1;}
			else if (oY){oY += shiftY + space;}

		}
	}
}

Squaddie.prototype.attachEvent = function(ele){
	$(ele)
	.data("shipId", this.parentId)
	.data("subId", this.id)
	.hover(
		function(e){
			e.stopPropagation();
			game.getUnit($(this).data("shipId")).getSystemById($(this).data("systemId")).hover(e);
		}
	).click(
		function(e){
			e.stopPropagation();
			game.getUnit($(this).data("shipId")).getSystemById($(this).data("systemId")).select(e);
		}
	).
	contextmenu(
		function(e){
			e.preventDefault();
			if (!game.sensorMode){game.getUnit($(this).data("shipId")).selectAll(e, $(this).data("systemId"));}
		}
	);
	return ele;
}

Squaddie.prototype.getUpgradeData = function(){
	return {name: this.display, cost: this.cost};
}

















function Squadron(data){
	Ship.call(this, data);
	this.squad = 1;
	this.ship = 0;
	this.primary = {systems: []};

	this.baseEP = data.baseEP;
}
Squadron.prototype = Object.create(Ship.prototype);


Squadron.prototype.create = function(){
	if (game.turn > 1 && game.phase == -1 && this.available == game.turn){
		this.x = this.actions[0].x;
		this.y = this.actions[0].y;
		this.drawX = this.actions[0].x;
		this.drawY = this.actions[0].y;
	}
}

Squadron.prototype.setImage = function(){
	var t = document.createElement("canvas");
		t.width = this.size*2;
		t.height = this.size*2;
	var ctx = t.getContext("2d");
		ctx.translate(t.width/2, t.height/2);

	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].draw){continue;}

		ctx.translate(this.structures[i].layout.x/2, this.structures[i].layout.y/2);
		ctx.rotate(-90 * (Math.PI/180))
		ctx.drawImage(
			window.shipImages[this.structures[i].name.toLowerCase()],
			0 -this.structures[i].size/2,
			0 -this.structures[i].size/2,
			this.structures[i].size, 
			this.structures[i].size
		)
		ctx.rotate(+90 * (Math.PI/180))
		ctx.translate(-this.structures[i].layout.x/2, -this.structures[i].layout.y/2);
	}		
	ctx.setTransform(1,0,0,1,0,0);
	this.img = t;
	//console.log(this.img.toDataURL());
}

Squadron.prototype.getDrawFacing = function(){
	return this.drawFacing+90;
}

Squadron.prototype.setLayout = function(){
	if (!this.structures.length){return;}
	else if (this.structures.length == 1){
		for (var i = 0; i < this.structures.length; i++){
			this.structures[i].layout = {x: 0, y: 0};
			$(this.element).find(".structContainer").css("height", 200);
		}
	}
	else if (this.structures.length == 2){
		for (var i = 0; i < this.structures.length; i++){
			this.structures[i].layout = {x: -100 + (i*200), y: 0};
			$(this.element).find(".structContainer").css("height", 200);
		}
	}
	else if (this.structures.length == 3){
		for (var i = 0; i < this.structures.length; i++){
			var a = 360 / 3 * i;
			var o = getPointInDirection(115, a-90, 0, 0);
			this.structures[i].layout = {x: o.x, y: o.y};
			$(this.element).find(".structContainer").css("height", 350);
		}
	}
}

Squadron.prototype.getStructureById = function(id){
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].id == id){
			return this.structures[i];
		}
	}
}

Squadron.prototype.previewSetup = function(){
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].loadout){
				$(this.structures[i].systems[j].element).addClass("bgYellow");
			}
		}
	}
}

Squadron.prototype.createBaseDiv = function(){
	var owner = "friendly";
	if (game.phase > -2 && this.userid != game.userid){owner = "hostile";}
	var div = document.createElement("div");
		div.className = "shipDiv " + owner;
		$(div).data("shipId", this.id);

	this.element = div;

	var subDiv = document.createElement("div");
		subDiv.className = "header";
	
	var table = document.createElement("table");
		table.className = "general";

	var header = "red";
	if (this.friendly){header = "green";}
		$(table)
			.append($("<tr>")
				.append($("<th>").html("Squadron #" + this.id).attr("colSpan", 2).addClass(header)))
			
	subDiv.appendChild(table);
	div.appendChild(subDiv);

	$(this.expandDiv(div))
		//.addClass("disabled")
		.drag()
		.find(".structContainer")
			.contextmenu(function(e){e.stopPropagation(); e.preventDefault()})
			.end()
		.find(".header")
			.contextmenu(function(e){
				e.stopImmediatePropagation(); e.preventDefault();
				$(this).parent().find($(".structContainer")).toggle();
			})
			.end()
		.find(".iconContainer")
			.contextmenu(function(e){
				e.stopImmediatePropagation(); e.preventDefault();
				if ($(this).parent().data("shipId") != aUnit){
					game.zIndex--;
					$(this).parent().addClass("disabled");
				}
			})


	if (game.phase == 2){
		$(div).find(".structContainer").show();
	}

	if (this.structures.length){
		$(div).removeClass("disabled");
		this.setLayout();
		this.setSubElements();
		for (var i = 0; i < this.structures.length; i++){
			this.structures[i].expandElement();
		}
		$(div).addClass("disabled");
	}
}

Squadron.prototype.setSubElements = function(){
	var w = $($(this.element).find(".structContainer")).width();
	var h = $($(this.element).find(".structContainer")).height();

	var offset = 0;
	if (this.structures.length == 3){offset = 30;}

	for (var i = 0; i < this.structures.length; i++){
		$(this.element).find(".structContainer").append(this.structures[i].element);
		var subW = $(this.structures[i].element).width();
		var subH = $(this.structures[i].element).height();
		$(this.structures[i].element)
			.css("left", this.structures[i].layout.x + w/2 - subW/2)
			.css("top", this.structures[i].layout.y + h/2 - subH/2 + offset)
	}
}


Squadron.prototype.expandDiv = function(div){
	$(div)
	.append($("<div>")
		.addClass("iconContainer")
			//.append($(window.shipImages[this.name.toLowerCase()].cloneNode(true)).addClass("rotate270").addClass("size90"))
			.hover(function(e){
				if (aUnit){
					var shooter = game.getUnit(aUnit);
					var target = game.getUnit($(this).parent().data("shipId"));
					if (shooter.id != target.id && shooter.hasWeaponsSelected()){
						handleWeaponAimEvent(shooter, target, e);
					}
				}
			}).
			click(function(e){
				var shooter = game.getUnit(aUnit);
				var target = game.getUnit($(this).parent().data("shipId"));
				if (shooter && target){
					if (target.id != shooter.id && (target.userid != game.userid && target.userid != shooter.userid)){
						handleFireClick(shooter, target);
					} else target.switchDiv();
				}
			}));
			
		
	//document.getElementById("game").appendChild(div);
	document.body.appendChild(div);
	$(div).css("position", "absolute").css("top", 300);

	structContainer = document.createElement("div");
	structContainer.className = "structContainer squad";
	div.appendChild(structContainer);
	
	$(div).addClass("disabled");
	return div;

}

Squadron.prototype.setBuyData = function(){
	for (var i = 0; i < this.structures.length; i++){
		this.upgrades.push(this.structures[i].getUpgradeData());
	}
}

Squadron.prototype.getLaunchData = function(){
	var data = [];

	for (var i = 0; i < this.structures.length; i++){
		data.push({"launch": 1, "name": this.structures[i].name});
	}

	return {loads: data};
}


Squadron.prototype.getDeployImg = function(){
	return window.shipImages[this.name.toLowerCase()].cloneNode(true);
}


Squadron.prototype.getEP = function(){
	return this.baseEP;
}

Squadron.prototype.checkSensorHighlight = function(){
	//console.log("checkSensorHighlight")
	return Ship.prototype.checkSensorHighlight.call(this);
}

Squadron.prototype.setTempEW = function(){
	//console.log("setTempEW")
	return Ship.prototype.setTempEW.call(this);
}

Squadron.prototype.drawEW = function(){
	//console.log("drawEW")
	return Ship.prototype.drawEW.call(this);
}

Squadron.prototype.drawImpulseUI = function(){
	if (this.canUndoLastAction()){
		var center = {x: this.x, y: this.y};
		var p1 = getPointInDirection(this.size/2 + 10 + 15, this.getDrawFacing() + 180, center.x, center.y);
		var ox = p1.x * cam.z + cam.o.x - 15;
		var oy = p1.y * cam.z + cam.o.y - 15;
		$("#undoLastAction").css("left", ox).css("top", oy).removeClass("disabled");
	} else $("#undoLastAction").addClass("disabled");
}	

Squadron.prototype.drawTurnUI = function(){
	var center = {x: this.x, y: this.y};
	var angle = this.getDrawFacing();
	var turnEle = $("#turnButton")[0];
	var p1 = getPointInDirection(150/cam.z, addToDirection(angle, 0), center.x, center.y);
	$(turnEle)
		.removeClass("disabled")
		.css("left", p1.x * cam.z + cam.o.x - $(turnEle).width()/2)
		.css("top", p1.y * cam.z + cam.o.y - $(turnEle).height()/2)
		.find("#impulseMod").html("").end()
		//.find("#turnMod").html("").end()
		//.find("#remEP").html(this.getRemainingEP() + " / " + this.getEP()).addClass("green").end()
}

Squadron.prototype.getShortInfo = function(){
	var ele = $("#shortInfo");
	if (this.userid == game.userid){
		$(ele).attr("class", "friendly");
	} else $(ele).attr("class", "hostile");

	var impulse = this.getCurrentImpulse();

	var table = document.createElement("table");
		table.insertRow(-1).insertCell(-1).innerHTML = this.name + " #" + this.id + " (" +game.getUnitType(this.traverse) + ")";
		table.insertRow(-1).insertCell(-1).innerHTML =  "Thrust: " + impulse + " (" + round(impulse / this.getBaseImpulse(), 2) + ")";
		table.insertRow(-1).insertCell(-1).innerHTML = this.getStringHitChance();
	return table;
}

Squadron.prototype.getStringHitChance = function(){
	return Mixed.prototype.getStringHitChance.call(this);
	//var baseHit = this.getBaseHitChance();
	//return ("Base Hit: " + Math.floor(this.profile[0] * baseHit) + "% - " + Math.floor(this.profile[1] * baseHit) + "%");
}

Squadron.prototype.hasHangarSelected = function(){		
	return false;
}

Squadron.prototype.getSystemById = function(id){
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].id == id){
			return this.structures[i];
		}
		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				if (this.structures[i].structures[j].systems[k].id == id){
					return this.structures[i].structures[j].systems[k];
				}
			}
		}
	}
}

Squadron.prototype.hasSystemsSelected = function(){	
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				if (this.structures[i].structures[j].systems[k].selected){return true;}
			}
		}
	}
	return false;
}

Squadron.prototype.hasWeaponsSelected = function(){		
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				if (this.structures[i].structures[j].systems[k].selected){
					if (this.structures[i].structures[j].systems[k].weapon){
						return true;
					}
				}
			}
		}
	}
	return false;
}

Squadron.prototype.unselectSystems = function(){
	fxCtx.clearRect(0, 0, res.x, res.y);
	$("#weaponAimTableWrapper").hide();

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				if (this.structures[i].structures[j].systems[k].selected){
					this.structures[i].structures[j].systems[k].select()
				}
			}
		}
	}
	for (var i = 0; i < this.primary.systems.length; i++){
		if (this.primary.systems[i].selected){
			this.primary.systems[i].select();
		}
	}
}

Squadron.prototype.getFireOrders = function(){
	var fires = [];

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				for (var l = this.structures[i].structures[j].systems[k].fireOrders.length-1; l >= 0; l--){
					if (!this.structures[i].structures[j].systems[k].fireOrders[l].id){
						fires.push(this.structures[i].structures[j].systems[k].fireOrders[l]);
					} else break;
				}
			}
		}
	}

	return fires;
}


Squadron.prototype.highlightAllSelectedWeapons = function(){
	console.log("Squadron highlightAllSelectedWeapons");
	//mouseCtx.clearRect(0, 0, res.x, res.y);
	fxCtx.clearRect(0, 0, res.x, res.y);
	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z);

	//$(fxCanvas).css("opacity", 1);
	var angle = this.getPlannedFacing();
	var pos = this.getPlannedPos();

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].structures.length; j++){
			for (var k = 0; k < this.structures[i].structures[j].systems.length; k++){
				if (this.structures[i].structures[j].systems[k].weapon){
					if (this.structures[i].structures[j].systems[k].highlight || this.structures[i].structures[j].systems[k].selected){
						if (this.structures[i].structures[j].systems[k].weapon){
							this.structures[i].structures[j].systems[k].drawArc(angle, pos);
						}
					}
				}
			}
		}
	}
	fxCtx.setTransform(1,0,0,1,0,0);
}