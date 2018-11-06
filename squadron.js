


function Squadron(data){
	Ship.call(this, data);
	this.squad = 1;
	this.ship = 0;
	this.primary = {"systems": []};
	this.slots = data.slots;
}

Squadron.prototype = Object.create(Ship.prototype);


Squadron.prototype.create = function(){
	//console.log("create "+this.id);
	if (!this.structures.length){
		//this.curImp = 0;
		this.primary.systems[0].output = 0;
		this.primary.systems[1].output = 0;
	} else if (this.id < 0){this.curImp = this.baseImpulse;}
	Ship.prototype.create.call(this);
}

Squadron.prototype.setSubSystemState = function(){
	for (var i = 0; i < this.primary.systems.length; i++){
		this.primary.systems[i].setState();
	}
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){
			this.structures[i].doDestroy();
		}
		for (var j = 0; j < this.structures[i].systems.length; j++){
			this.structures[i].systems[j].setState()
		}
	}
}

Squadron.prototype.setPreFireImage = function(){
	//console.log("Squadron setPreFireImage");
	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].doDraw){
			if (this.structures[i].isDestroyedThisTurn()){
				this.structures[i].doDraw = true;
			}
		}
	}
	this.resetImage();
}

Squadron.prototype.getDrawFacing = function(){
	return this.drawFacing;
}

Squadron.prototype.setLayout = function(){
	var minX = 0;
	var minY = 0;
	var maxX = 0;
	var maxY = 0;
	var w;
	var h;
	var s = 160;

	if (this.structures.length == 1){
		this.structures[0].layout = {x: 0, y: 0};
		h = s;
	}
	else {
		for (var i = 0; i < this.structures.length; i++){
			var a = -45*(this.structures.length == 4) + -90*(this.structures.length == 2) + 360 /  this.structures.length * i;
			var o = getPointInDir(60 + (-5*(this.structures.length == 2)) + (5*(this.structures.length == 4)), a-90, 0, 0);

			minX = Math.min(minX, o.x);
			maxX = Math.max(maxX, o.x);
			minY = Math.min(minY, o.y);
			maxY = Math.max(maxY, o.y);

			o = rotate(0, 0, o, 90);

			this.structures[i].layout = {x: o.x, y: o.y};

		}

		w = Math.abs(minX) + Math.abs(maxX) + s/2;
	}
		h = Math.abs(minY) + Math.abs(maxY) + s;


	//$(this.element).find(".structContainer").css("height", h + 20 + ((this.structures.length > 2) * 70));
}

Squadron.prototype.setStringHitChance = function(){
	//console.log("setStringHitChance #" + this.id);
	var string = "";
	var chances = [];
	var shared = 1;

	if (!this.structures.length){return "";}

	for (let i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}
		chances.push(this.structures[i].baseHitChance);
	}

	for (var i = 1; i < chances.length; i++){
		if (chances[0] == chances[i]){continue;}
		shared = 0; break;
	}

	if (shared){
		string = chances[0];
		this.stringHitChance = string + "%";
	}
	else {
		for (var i = 0; i < chances.length; i++){
			string += chances[i] + "%, ";
		}
		this.stringHitChance = string.slice(0, string.length-2);
	}
}

Squadron.prototype.createBaseDiv = function(){
	Ship.prototype.createBaseDiv.call(this);

	var w = $(this.element).find(".coreContainer").width();
	var h = $(this.element).find(".coreContainer").height();

	var x = 60;
	var y = 10;

	// JUMP OUT
	$(this.element).find(".coreContainer").append(this.getJumpDiv().css("top", y).css("left", 8));


	for (var i = 0; i < this.primary.systems.length; i++){
		this.index++;
		var div = this.primary.systems[i].getDiv();
			div = this.attachEvent(div);

		if (game.turn > 0){
			var modeDiv = this.primary.systems[i].getModeDiv();
			if (modeDiv){
				div.appendChild(modeDiv)
			}
		}
		$(this.element).find(".coreContainer").append(div)
		$(div).css("left", x).css("top", y);

		if (i == 0){
			x = 8;
			y += 80;
		} else x += 50;

	}

	if (this.structures.length){
		$(div).removeClass("disabled");
		this.setLayout();
		this.addSubContainers();
		for (var i = 0; i < this.structures.length; i++){
			this.structures[i].fillSelfContainer();
		}
		$(div).addClass("disabled");
	}
}

Squadron.prototype.addSubContainers = function(){

	var contW = 160;

	var w = this.structures.length == 4 ? 390 : Math.max(390, Math.min(3, Math.max(2, this.structures.length))*contW);
	//console.log(w);

	$(this.element).css("width", w);

	for (var i = 0; i < this.structures.length; i++){
		$(this.element).find(".structContainer").append(this.structures[i].element);
	}

	if (this.structures.length == 4){
		for (var i = 0; i < this.structures.length; i++){
			//$(this.structures[i].element).css("width", 194)
		}
	} else {
		for (var i = 0; i < this.structures.length; i++){
			$(this.structures[i].element).css("width", 160)
		}
	}

	if (this.structures.length == 2){
		$(this.structures[1].element).css("float", "right")
	}
	else if (this.structures.length == 4){
		$(this.structures[1].element).css("float", "right")
		$(this.structures[3].element).css("float", "right")
	}
	else {
		for (var i = 0; i < this.structures.length; i++){
			$(this.structures[i].element).css("float", "unset")
		}
	}
}

Squadron.prototype.expandDiv = function(div){
	$(div)
	.find(".topDiv")
		.append($("<div>")
			.addClass("coreContainer"))
		.append($("<div>")
			.addClass("iconContainer")					
				.append(
					$(this.getBaseImage()).addClass("rotate270").css("width", "100%")//.css("border-left", "1px solid white")
				)
				.append($("<div>")
					.addClass("notes")
						//.hide()
				)
				.data("shipId", this.id)
				.hover(function(e){
					if (aUnit){
						var shooter = game.getUnit(aUnit);
						var target = game.getUnit($(this).parent().parent().data("shipId"));
						if (shooter.id != target.id && shooter.hasWeaponsSelected()){
							handleWeaponAimEvent(shooter, target, e);
						}
					}
				}).
				click(function(e){
					var shooter = game.getUnit(aUnit);
					var target = game.getUnit($(this).parent().parent().data("shipId"));
					if (shooter && target){
						firePhase({x: 0, y: 0}, shooter, target.id);
					}
				}));
		

	$(document.body).append(div);
	$(div).css("position", "absolute").css("top", 300);

	structContainer = $("<div>").addClass("structContainer squad");
	$(div).append(structContainer);
	
	$(div).addClass("disabled");
	return div;
}

Squadron.prototype.getDeployImg = function(){
	return false;
	return graphics.images[this.name.toLowerCase()].cloneNode(true);
}

Squadron.prototype.checkSensorHighlight = function(){
	//console.log("checkSensorHighlight")
	return Ship.prototype.checkSensorHighlight.call(this);
}

Squadron.prototype.hasHangarSelected = function(){		
	return false;
}

Squadron.prototype.getSystemByName = function(name){
	for (var i = 0; i < this.primary.systems.length; i++){
		if (this.primary.systems[i].name == name){
			return this.primary.systems[i]
		}
	}
}

Squadron.prototype.getSystem = function(id){
	for (var i = 0; i < this.primary.systems.length; i++){
		if (this.primary.systems[i].id == id){
			return this.primary.systems[i];
		}
	}
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].id == id){
			return this.structures[i];
		}
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].id == id){
				return this.structures[i].systems[j];
			}
		}
	}
}

Squadron.prototype.hasSystemsSelected = function(){	
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].selected){return true;}
		}
	}
	return false;
}

Squadron.prototype.hasWeaponsSelected = function(){		
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].selected){
				if (this.structures[i].systems[j].weapon){
					return true;
				}
			}
		}
	}
	return false;
}

Squadron.prototype.getSelectedWeapons = function(){
	var systems = [];

	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}

		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].weapon){
				if (this.structures[i].systems[j].selected){
					systems.push(this.structures[i].systems[j]);
				}
			}
		}
	}
	return systems;
}

Squadron.prototype.unselectSystems = function(){
	fxCtx.clearRect(0, 0, res.x, res.y);
	$("#aimDiv").hide();

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].selected){
				this.structures[i].systems[j].select()
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
		for (var j = 0; j < this.structures[i].systems.length; j++){
			for (var k = this.structures[i].systems[j].fireOrders.length-1; k >= 0; k--){
				if (!this.structures[i].systems[j].fireOrders[k].id){
					fires.push(this.structures[i].systems[j].fireOrders[k]);
				} else break;
			}
		}
	}
	return fires;
}

Squadron.prototype.getEvents = function(){
	var data = [];
	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].hasEvent()){
				data.push(this.structures[i].systems[j]);
			}
		}
	}
	return data;
}

Squadron.prototype.getAllPowerOrders = function(){
	var powers = [];

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].powers.length; j++){
			if (this.structures[i].powers[j].new){
				powers.push(this.structures[i].powers[j]);
			}
		}
		for (var j = 0; j < this.structures[i].systems.length; j++){
			powers = powers.concat(this.structures[i].systems[j].getPowerOrders());
		}
	}
	return powers;
}

Squadron.prototype.highlightAllSelectedWeapons = function(){
	//mouseCtx.clearRect(0, 0, res.x, res.y);
	fxCtx.clearRect(0, 0, res.x, res.y);
	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z);

	//$(fxCanvas).css("opacity", 1);
	var angle = this.getPlannedFacing();
	var pos = this.getPlannedPos();

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].weapon){
				if (this.structures[i].systems[j].highlight || this.structures[i].systems[j].selected){
					if (this.structures[i].systems[j].weapon){
						this.structures[i].systems[j].drawSystemArc(angle, this.rolled, pos);
					}
				}
			}
		}
	}
	fxCtx.setTransform(1,0,0,1,0,0);
}

Squadron.prototype.getArmourString = function(a){
	var ret = "";
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}
		ret += this.structures[i].remNegation + ", ";
	}

	return ret.slice(ret, ret.length-2);
}

Squadron.prototype.getAngledHitChance = function(angle){
	return Math.ceil(this.getBaseHitChance());
}

Squadron.prototype.getBaseHitChance = function(){
	var chance = 0;
	var amount = 0;

	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}
		amount++;
		chance += this.structures[i].baseHitChance;
	}

	return Math.ceil(chance/amount);
}

Squadron.prototype.selectAll = function(e, id){
	var s = this.getSystem(id);
	if (!s.weapon){return;}
	var w = s.getActiveSystem();
	var name = w.name;
	var hasFire = s.hasUnresolvedFireOrder();
	if (name == "Hangar"){return;}

	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].getActiveSystem().name == name){
				if (this.structures[i].systems[j].hasUnresolvedFireOrder() == hasFire){
					this.structures[i].systems[j].select(e);
				}
			}
		}
	}
	return;
}

Squadron.prototype.hasNoFireOrders = function(){
	var charged = 0;

	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (!this.structures[i].systems[j].destroyed && this.structures[i].systems[j].weapon){
				if (this.structures[i].systems[j].isPowered() && this.structures[i].systems[j].getLoadLevel() >= 1){
					charged = 1;
					if (this.structures[i].systems[j].hasFireOrder()){
						return false;
					}
				}
			}
		}
	}

	if (charged){return true;}
	else return false;
}

Squadron.prototype.unitGetAllResolvingFireOrders = function(){
	var fires = [];
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed && !this.structures[i].isDestroyedThisTurn()){continue;}
		for (var j = 0; j < this.structures[i].systems.length; j++){
				var fire = this.structures[i].systems[j].getResolvingFireOrders();
			if (fire){fires.push(fire);}
		}
	}
	return fires;
}

Squadron.prototype.setImage = function(){
	//console.log("Squad setImage");
	var t = document.createElement("canvas");
		t.width = this.size*2;
		t.height = this.size*2;
		//console.log("s: " +this.size);
	var ctx = t.getContext("2d");
		ctx.translate(t.width/2, t.height/2);
		//ctx.scale(0.8, 0.8)

	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].doDraw){continue;}

		ctx.translate(this.structures[i].layout.x/2, this.structures[i].layout.y/2);
		//ctx.rotate(-90 * (Math.PI/180))
		ctx.drawImage(
			this.structures[i].getBaseImage(),
			0 -this.structures[i].size/2,
			0 -this.structures[i].size/2,
			this.structures[i].size, 
			this.structures[i].size
		)
		//ctx.rotate(+90 * (Math.PI/180))
		ctx.translate(-this.structures[i].layout.x/2, -this.structures[i].layout.y/2);
	}		
	ctx.setTransform(1,0,0,1,0,0);
	this.img = t;
}

Squadron.prototype.updateImage = function(){
	this.setImage();
	$(this.element).find(".iconContainer").empty()
		.append($(this.getBaseImage()).addClass("rotate270").css("width", "100%")//.css("border-left", "1px solid white")
	)
}

Squadron.prototype.getWeaponOrigin = function(id){
	for (i = this.structures.length-1; i >= 0; i--){
		if (id > this.structures[i].id){
			for (j = 0; j < this.structures[i].systems.length; j++){
				if (this.structures[i].systems[j].id == id){
					var devi = this.structures[i].size;
					var p = getPointInDir(devi/6, this.structures[i].systems[j].align, 0, 0);
					var x = this.structures[i].layout.x/4 + p.x;
					var y = this.structures[i].layout.y/4 + p.y;
					return rotate(0, 0, {x: x, y: y}, this.getDrawFacing());
				}
			}
		}
	}
}


Squadron.prototype.getUnitPos = function(unit){
	var x = unit.layout.x * 1 / 2 * 0.5;
	var y = unit.layout.y * 1 / 2 * 0.5;
	return rotate(0, 0, {x: x, y: y}, this.getDrawFacing());
}

Squadron.prototype.getFireDest = function(fire, isHit, num){
	if (!isHit){
		return {
			x: range(10, 25) * (1-range(0, 1)*2),
			y: range(10, 25) * (1-range(0, 1)*2)
		}
	}
	else if (fire.weapon.fireMode == "Shockwave"){
		return {x: 0, y: 0};
	}
	else {
		var t = this.getUnitPos(this.getSystem(fire.damages[num].systemid));
		return {x: t.x + range(-7, 7), y: t.y + range(-7, 7)}
	}
}

Squadron.prototype.getDmgByFire = function(fire){
	var dmgs = [];
	var lookup = 0;
	
	for (var i = 0; i < fire.hits.length; i++){
		lookup += fire.hits[i] * fire.weapon.getDmgsPerShot(fire);
	}

	if (!lookup){return dmgs;}

	for (var i = 0; i < this.structures.length; i++){
		for (var j = this.structures[i].damages.length-1; j >= 0; j--){
			if (this.structures[i].damages[j].fireid == fire.id){
				dmgs.push(this.structures[i].damages[j]);
				//dmgs[dmgs.length-1].system = (this.structures[i].display + " #" + (this.structures[i].id));
				dmgs[dmgs.length-1].system = (this.structures[i].display + " #" + (i+1));
				dmgs[dmgs.length-1].loc = this.structures[i].layout;
				lookup--;
				if (!lookup){return dmgs};
			}
			else if (this.structures[i].damages[j].turn < fire.turn){
				break;
			}
		}
	}
	console.log("ERROR getDmgByFire");
	return dmgs;
}

Squadron.prototype.setFaction = function(){
	var ea = 1; var cr = 1; var nr = 1; var mf = 1;

	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].faction != "Earth Alliance"){ea = 0;}
		if (this.structures[i].faction != "Centauri Republic"){cr = 0;}
		if (this.structures[i].faction != "Narn Regime"){nr = 0;}
		if (this.structures[i].faction != "Minbari Federation"){mf = 0;}
	}

	if (ea){this.faction = "Earth Alliance";}
	else if (cr){this.faction = "Centauri Republic";}
	else if (nr){this.faction = "Narn Regime";}
	else if (mf){this.faction = "Minbari Federation";}
	else this.faction = "Mixed";
}

Squadron.prototype.setStats = function(){
	this.setFaction();
	this.slots = 0;

	var ew = 0;
	var ep = 1000;

	for (var i = 0; i < this.structures.length; i++){
		this.baseImpulseCost = Math.max(this.baseImpulseCost, this.structures[i].baseImpulseCost);
		this.baseTurnDelay = Math.max(this.baseTurnDelay, this.structures[i].baseTurnDelay);
		this.baseImpulse = Math.min(this.baseImpulse, this.structures[i].baseImpulse);
		this.curImp = this.baseImpulse;

		ew = Math.max(ew, this.structures[i].ew);
		ep = Math.min(ep, this.structures[i].ep);
	}

	this.morale.baseMorale = 100;
	this.slots = 10;

	switch (this.faction){
		case "Earth Alliance":
			this.slots = 12;
			this.morale.baseMorale += Math.max(0, 5*(this.structures.length-2));
			break;
		case "Centauri Republic":
			this.baseImpulseCost = Math.floor(this.baseImpulseCost * 0.8);
			break;
		case "Narn Regime":
			this.morale.baseMorale = 125;
			break;
		case "Minbari Federation":
			this.morale.baseMorale = 105;
			break;
		default: break;
	}

	this.primary.systems[1].output = ew;
	this.primary.systems[1].update();
	this.primary.systems[2].output = ep;
	this.primary.systems[2].update();

	$(this.element).find(".curMorale").html(this.morale.baseMorale);

	this.setStringHitChance();

	$(this.element)
		.find(".header")
			.find(".profile").html(this.getStringHitChance()).end()
			.find(".Thrust").html(this.getBaseImpulse()).end()
			.find(".ep").html(this.getEngineOutput()).end()
			.find(".change").html(this.getImpulseChangeCost() + ", " + this.getActionCost(0) + ", " + this.getActionCost(1)).end()
}

Squadron.prototype.getSectionString = function(angle){
	return "";
}

Squadron.prototype.canBoost = function(system){
	for (var i = this.structures.length-1; i >= 0; i--){
		if (system.id >= this.structures[i].id){
			return this.structures[i].canBoost(system);
		}
	}
	console.log("squad boost error");
	return false;
}

Squadron.prototype.updateShipPower = function(system){
	for (var i = this.structures.length-1; i >= 0; i--){
		if (system.id >= this.structures[i].id){
			this.structures[i].updateShipPower(system);
			return;
		}
	}
}

Squadron.prototype.doUnpowerAll = function(id){
	var system = this.getSystem(id);
		//	$(system.element).find(".powerDiv").find(".unpower").hide().end().find(".power").show();
	var name = system.getActiveSystem().name;

	for (let i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}
		this.structures[i].unpowerSystemsByName(name);
	}
}

Squadron.prototype.doPowerAll = function(id){
	var system = this.getSystem(id);
		//$(system.element).find(".powerDiv").find(".power").hide().end().find(".unpower").show();
	var name = system.getActiveSystem().name;

	for (let i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}
		this.structures[i].powerSystemsByName(name);
	}
}

Squadron.prototype.switchModeAll = function(id){
	var system = this.getSystem(id);
	var name = system.getActiveSystem().name;

	for (let i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}
		this.structures[i].switchSystemsByName(name);
	}
}

Squadron.prototype.hasInvalidPower = function(){
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].getUnusedPower() < 0){
			return true;
		}
	}
}

Squadron.prototype.getBaseImage = function(){
	return this.img;
}

Squadron.prototype.getUnitSelectorIcon = function(){
	return this.structures[0].getBaseImage();
}

Squadron.prototype.isDestroyed = function(){
	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].destroyed){
			return false;
		}
	}
	return true;
}

Squadron.prototype.recalcCommandUpgrades = function(){
	var command = this.getSystemByName("Command");

	for (var i = 0; i < command.loads.length; i++){
		if (command.loads[i].amount){
			this.minusCrewLevel(i);
			this.plusCrewLevel(i);
		}
	}
	//command.updateCrewTotals(); return;
}

Squadron.prototype.doConfirmSystemLoadout = function(){
	var system = this.getSystem(game.system);
	if (system.launcher){system.setAmmo();}
	system.select();

	for (var i = 0; i < this.structures.length; i++){
		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (this.structures[i].systems[j].systems[k].selected){
				if (this.structures[i].systems[j].systems[k].launcher){this.structures[i].systems[j].systems[k].setAmmo();}
				this.structures[i].systems[j].systems[k].select();
				return;
			}
		}
	}
}

Squadron.prototype.setBuyData = function(){
	this.totalCost = this.cost;
	this.moraleCost = this.cost;

	for (var i = 0; i < this.primary.systems.length; i++){
		if (!this.primary.systems[i].cost){continue;}
		this.upgrades.push(this.primary.systems[i].getUpgradeData());
	}

	var units = [];
	var loads = [];
	var cost = 0;

	for (var i = 0; i < this.structures.length; i++){
		units.push({
			"amount": 1,
			"cost": this.structures[i].cost,
			"name": this.structures[i].name,
		});


		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (!this.structures[i].systems[j].cost){continue;}
			this.upgrades.push(this.structures[i].systems[j].getUpgradeData());
		}
	}

	if (!this.structures.length){return;}
	this.upgrades.push({systemid: this.id, active: 1, units: units, loads: loads, text: "", cost: cost});
}

Squadron.prototype.getBuyTableData = function(table){
	var command =  this.primary.systems[0].getUpgradeData();
	if (command.cost){
		this.totalCost += command.cost;
		this.moraleCost += command.cost;
		$(table)
		.append
			($("<tr>")
			.append($("<td>").addClass("font14").html(command.text))
			.append($("<td>").html(command.cost))
		)
	}


	for (var i = 0; i < this.structures.length; i++){

		this.totalCost += this.structures[i].cost;
		this.moraleCost += this.structures[i].cost;

		$(table)
		.append
			($("<tr>")
			.append($("<td>").html(this.structures[i].name))
			.append($("<td>").html(this.structures[i].cost))
			.data("systemid", this.structures[i].id)
			.hover(function(){
				$(this).toggleClass("rowHighlight");
				$(game.getUnit(aUnit).getSystem($(this).data("systemid")).element).toggleClass("borderHighlight");
			})
		)

		for (var j = 0; j < this.structures[i].systems.length; j++){
			if (!this.structures[i].systems[j].cost){continue;}
			this.totalCost += this.structures[i].systems[j].cost;
			var data = this.structures[i].systems[j].getUpgradeData();
			$(table)
			.append(
				$("<tr>")
				.append($("<td>").addClass("font14").html(data.text))
				.append($("<td>").html(data.cost))
				.data("systemid", this.structures[i].systems[j].id)
				.hover(function(){
					$(this).toggleClass("rowHighlight");
					$(game.getUnit(aUnit).getSystem($(this).data("systemid")).element).toggleClass("borderHighlight");
				})
			)
		}
	}

	if (this.faction == "Centauri Republic" && this.structures.length >= 3){ //wolfpack
		$(table)
		.append(
			$("<tr>")
			.append($("<td>").addClass("font16").html("Wolfpack"))
			.append($("<td>").html(Math.floor(this.totalCost * -0.15))));

		this.totalCost = Math.ceil(this.totalCost *0.85);
		this.moraleCost = Math.ceil(this.moraleCost *0.85);
			
	}
}

Squadron.prototype.getUnusedPower = function(){
	var highest = 0;
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue;}
		var unused =  this.structures[i].getUnusedPower();
		power = Math.max(highest, unused);
	}

	return power;
}

Squadron.prototype.getSelfExplo = function(){

	var base = this.getDrawPos();

	var data = {
		entries: [],
		animated: 0,
		animating: 0,
		id: this.id,
		pos: base,
		html: ""
	}

	var color = "#ff3d00";
	if (this.friendly){
		color = "#27e627";
	}

	var counter = 0;
	for (var i = 0; i < this.structures.length; i++){
		if (!this.structures[i].isDestroyedThisTurn()){continue;}

		var explo = {u: this.structures[i], anims: []};

		counter++;
		var real = this.getUnitPos(this.structures[i]);
		for (var j = 0; j < 4; j++){
			explo.anims.push({
				t: [0 - j*6 - counter*20, 50],
				s: this.getExploSize(i) + (range(-1, 1) *  this.getExploSize(i)/3),
				x: base.x + real.x + (range(-1, 1) * 5),
				y: base.y + real.y + (range(-1, 1) * 5),
			});
		}
		data.entries.push(explo);
	}

	data.html += "A total of <font color='" + "yellow" + "'>" + counter + "</font> elements from <font weight='bold' color='" + color + "'>Unit #" + this.id + "</font> were destroyed or disengaged.";
	if (this.isDestroyed()){data.html += " The unit is completly wiped."}

	return data;
}

Squadron.prototype.getDamageMoraleMalus = function(){
	return this.morale.damage;
	var dmg = 100;
	if (this.structures.length){
		var integrity = 0;
		var remaining = 0;

		for (var i = 0; i < this.structures.length; i++){
			integrity += this.structures[i].integrity;

			if (this.structures[i].isDestroyed()){continue;}
			remaining += Math.max(0, this.structures[i].remaining);
		}
		return (100 - Math.floor(remaining / integrity *100))*-1;
	}
}

Squadron.prototype.getCrewBaseCost = function(i){
	return Math.ceil((this.structures.map(x => x.cost).reduce((l,r) => l+r, 0)/12) * (this.faction == "Minbari Federation" ? 0.7 : 1));
}

Squadron.prototype.getPurchaseHeader = function(){
	var names = [];
	var amount = [];

	for (var i = 0; i < this.structures.length; i++){
		var found = 0;

		for (var j = 0; j < names.length; j++){
			if (this.structures[i].name == names[j]){
				found = 1;
				amount[j]++;
				break;
			}
		}

		if (!found){
			names.push(this.structures[i].name);
			amount.push(1);
		}
	}

	var	ret = "</br><span style='font-size: 12px'>";
	for (var j = 0; j < names.length; j++){
		ret += (amount[j] + "x " + names[j] + "</br>");
	}

	ret = ret.substr(0, ret.length-3) + ")</span>";

	return "<span style='font-size: 16px;'>Squadron</span>" + (this.display ? "<span class='green'> -- " + this.display + " -- </span>" : "") + ret;
}

Squadron.prototype.getSlotsUsed = function(){
	return Math.floor(this.structures.map(x => x.space).reduce((l,r) => l+r, 0));
}

Squadron.prototype.getMaxSlots = function(){
	return this.slots;
}

Squadron.prototype.getRemainingSlots = function(){
	return this.getMaxSlots() - this.getSlotsUsed();
}

Squadron.prototype.setSlotUsage = function(){
	$(this.element).find(".squadSlots").html("Remaining Slots: " + this.getSlotsUsed() + " / " + this.getMaxSlots());
}

Squadron.prototype.getFocusCost = function(){
	var cost = 0;
	var recalculate = 0;
	var centauri = 1;
	var alive = 0;
	for (var i = 0; i < this.structures.length; i++){
		cost += this.structures[i].cost;
		if (this.structures[i].destroyed){
			cost -= this.structures[i].cost;
			recalculate = 1;
		} else alive++;

		if (this.structures[i].faction != "Centauri Republic"){
			centauri = 0;
		}
	}

	if (recalculate){
		return Math.round(cost / 100 * ((centauri && alive > 2) ? 85 : 100));
	}
	else return Math.round(this.moraleCost);
}

Squadron.prototype.hasPassiveJamming = function(){
	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed){continue}

		if (this.structures[i].hasPassiveJamming()){
			return true;
		}
	}
	return false;
}

Squadron.prototype.getJammingString = function(){
	var values = this.getJammerStrength();

	return ("---- Passing jamming detected (<span class='yellow'>" + values.join(", ") + "% chance to miss</span>) ----");
}

Squadron.prototype.getJammerStrength = function(){
	var values = [];

	for (var i = 0; i < this.structures.length; i++){
		if (this.structures[i].destroyed || !this.structures[i].hasPassiveJamming()){continue}
		var jammer = this.structures[i].getSystemByName("Jammer");
		values.push(jammer.getOutput());
	}

	return values;
}