function Squaddie(data){
	Single.call(this, data);
	this.structures = [];
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
	var primPosY = cHeight/2 - pHeight/2;

	$(pDiv)
		.css("left", primPosX)
		.css("top", primPosY)


	for (var i = 0; i < this.structures.length; i++){
		var a = this.structures[i].getDirection();
		var p = getPointInDirection(pWidth -10, a-90, primPosX, primPosY);
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
					.css("top", p.y - s/2 + pWidth/2 + 10 + oY)
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
			game.getUnit($(this).data("shipId")).getStructureById($(this).data("subId")).getSystemById($(this).data("systemId")).hover(e);
		}
	).click(
		function(e){
			e.stopPropagation();
			game.getUnit($(this).data("shipId")).getStructureById($(this).data("subId")).getSystemById($(this).data("systemId")).select(e);
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

Squaddie.prototype.getSystemById = function(id){
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

Squaddie.prototype.getUpgradeData = function(){
	return {name: this.display, cost: this.cost};
}



function Squadron(data){
	Ship.call(this, data);
	this.squad = 1;
	this.ship = 0;
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

Squadron.prototype.addSubElement = function(unit){
	console.log("adding unit " + unit.id + ", length: " + this.structures.length);
	this.structures.push(unit);
	this.setLayout();

	$(this.element).find(".structContainer").append(unit.element);
	var w = $($(this.element).find(".structContainer")).width();
	var h = $($(this.element).find(".structContainer")).height();

	for (var i = 0; i < this.structures.length; i++){
		var subW = $(this.structures[i].element).width();
		var subH = $(this.structures[i].element).height();
		$(this.structures[i].element)
			.css("left", this.structures[i].layout.x + w/2 - subW/2)
			.css("top", this.structures[i].layout.y + h/2 - subH/2)
	}

	this.structures[this.structures.length-1].expandElement();
	//console.log(w, h, subW, subH);
	//console.log(unit.layout.x + w/2 - subW/2)
	//console.log(unit.layout.x + w/2 - subW/2)
}

Squadron.prototype.removeSubElement = function(id){
	console.log("deleting id " + id);
	for (var i = this.structures.length-1; i >= 0; i--){
		if (this.structures[i].id == id){
			$(this.element).find(".unitContainer").each(function(){
				if ($(this).data("subId") == id){
					$(this).remove(); return;
				}
			})
			this.structures.splice(i, 1);
			break;
		}
	}
	this.setLayout();

	//$(this.element).find(".structContainer").append(unit.element);
	var w = $($(this.element).find(".structContainer")).width();
	var h = $($(this.element).find(".structContainer")).height();

	for (var i = 0; i < this.structures.length; i++){
		var subW = $(this.structures[i].element).width();
		var subH = $(this.structures[i].element).height();
		$(this.structures[i].element)
			.css("left", this.structures[i].layout.x + w/2 - subW/2)
			.css("top", this.structures[i].layout.y + h/2 - subH/2)
	}

	//this.structures[this.structures.length-1].expandElement();
	//console.log(w, h, subW, subH);
	//console.log(unit.layout.x + w/2 - subW/2)
	//console.log(unit.layout.x + w/2 - subW/2)
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
				.append($("<th>").html("BNAME").attr("colSpan", 2).addClass(header)))
			
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
		this.setLayout();
		this.setSubElements();
		for (var i = 0; i < this.structures.length; i++){
			this.structures[i].expandElement();
		}
	}
}

Squadron.prototype.setLayout = function(){
	if (!this.structures.length){return;}
	else if (this.structures.length == 1){
		for (var i = 0; i < this.structures.length; i++){
			this.structures[i].layout = {x: 0, y: 0};
		}
	}
	else if (this.structures.length == 2){
		for (var i = 0; i < this.structures.length; i++){
			this.structures[i].layout = {x: -100 + (i*200), y: 0};
		}
	}
	else if (this.structures.length == 3){
		for (var i = 0; i < this.structures.length; i++){
			var a = 360 / 3 * i;
			var o = getPointInDirection(115, a-90, 0, 0);
			this.structures[i].layout = {x: o.x, y: o.y + 30};
		}
	}
}

Squadron.prototype.setSubElements = function(){
	var w = $($(this.element).find(".structContainer")).width();
	var h = $($(this.element).find(".structContainer")).height();

	for (var i = 0; i < this.structures.length; i++){
		$(this.element).find(".structContainer").append(this.structures[i].element);
		var subW = $(this.structures[i].element).width();
		var subH = $(this.structures[i].element).height();
		$(this.structures[i].element)
			.css("left", this.structures[i].layout.x + w/2 - subW/2)
			.css("top", this.structures[i].layout.y + h/2 - subH/2)
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



	//for ($j = 0; $j < sizeof($units[$i]["launchData"]["loads"]); $j++){
	//	$stmt->bindValue(":amount", $units[$i]["launchData"]["loads"][$j]["launch"]);
	//	$stmt->bindValue(":name", $units[$i]["launchData"]["loads"][$j]["name"]);
	//	$stmt->execute();