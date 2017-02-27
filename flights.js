function Fighter(id, classname, name, ep, turns, mass, integrity, value, negation, crits, destroyed){
	this.id = id;
	this.classname = classname;
	this.name = name;
	this.ep = ep;
	this.turns = turns;
	this.mass = mass;
	this.integrity = integrity;
	this.value = value;
	this.negation = negation;
	this.crits = [];
	this.destroyed = destroyed;
	this.fighter = true;
	this.damages = [];
	this.systems = [];
	this.highlight = false;
	this.disabled = false;

	for (var i = 0; i < crits.length; i++){
		this.crits.push(new Crit(
				crits[i].id,
				crits[i].shipid,
				crits[i].systemid,
				crits[i].turn,
				crits[i].type,
				crits[i].duration
			)
		)
	}

	this.getRemainingIntegrity = function(){
		var integrity = this.integrity;
		for (var i = 0; i < this.damages.length; i++){
			integrity -= this.damages[i].structDmg;
		}
		return integrity;
	}

	this.hover = function(e){
		if (!this.highlight){
			this.highlight = true;
			var ele = this.getDetailsDiv();
			$("#game").append(ele);
			$(ele).css("left", e.clientX).css("top", e.clientY + 20)
		}
		else {
			this.highlight = false;
			$("#systemDetailsDiv").remove();
		}
	}

	this.getDetailsDiv = function(){
		var div = document.createElement("div");
			div.id = "systemDetailsDiv";
			div.className = this.id;

			var table = $("<table>")
				.append($("<tr>").append($("<th>").attr("colspan", 2).html(this.name)))
				.append($("<tr>").append($("<td>").html("Mass / Turn Delay")).append($("<td>").html(this.mass)))
				.append($("<tr>").append($("<td>").html("Engine Power")).append($("<td>").html(this.ep)))
				.append($("<tr>").append($("<td>").html("Frontal Armour")).append($("<td>").html(this.negation[0])))
				.append($("<tr>").append($("<td>").html("Side Armour")).append($("<td>").html(this.negation[1])))
				.append($("<tr>").append($("<td>").html("Rear Armour")).append($("<td>").html(this.negation[2])))

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
}

function Flight(id, classname, shipType, x, y, facing, faction, mass, cost, profile, size, userid, available){
	Ship.call(this, id, classname, shipType, x, y, facing, faction, mass, cost, profile, size, userid, available);
	this.ship = false;
	this.flight = true;
	this.layout = [];
	this.classname = "Flight";
	this.primary = false;
	this.ep = 1000;
	this.turns = 10;
	this.maxTurns = 1;
	this.dogfights = [];
	
	this.create = function(){
		this.size = 32 + this.structures.length*7;
		this.setFighterState();
		this.setMaxMass()
		this.setEP()
		this.setTurns();
		this.setFacing();
		this.setPosition();
		this.setLayout()
	}

	this.setFighterState = function(){
		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].crits.length; j++){
				if (this.structures[i].crits[j].type == "disengaged"){
					this.structures[i].disabled = true;
				}
			}
		}
	}

	this.setLayout = function(){
		var size = 15;

		var toDo = Math.min(4, Math.ceil(this.structures.length/2));
		var done = 0;

		for (var i = 0; i < toDo; i++){
			this.layout.push({
				x: -size/2 - size*i/2,
				y: -toDo*size/2 +size*(i)
 			});
			this.layout.push({
				x: size/2 + size*i/2,
				y: -toDo*size/2 +size*(i)
 			});
 			done += 2;
		}

		if (done < this.structures.length){
			for (var i = 0; i < this.structures.length-done; i++){
				this.layout.push({
					x: -size/2 - size/2*i,
					y: size/2 + size*i
	 			});
				this.layout.push({
					x: size/2 + size/2*i,
					y: size/2 + size*i
	 			});
			}
		}
	}

	this.setMaxMass = function(){
		for (var i = 0; i < this.structures.length; i++){
			if (! this.structures[i].destroyed){
				if (this.structures[i].mass > this.mass){
					this.mass = this.structures[i].mass; 
				}
			}
		}
	}

	this.getEP = function(){
		return this.ep;
	}

	this.setEP = function(){
		for (var i = 0; i < this.structures.length; i++){
			if (! this.structures[i].destroyed){
				this.ep = Math.min(this.ep, this.structures[i].ep);
			}
		}
	}

	this.setTurns = function(){
		for (var i = 0; i < this.structures.length; i++){
			if (! this.structures[i].destroyed){
				this.maxTurns = Math.min(this.turns, this.structures[i].turns);
			}
		}
	}

	this.drawSelf = function(){
		var size = 15;
		ctx.rotate((this.facing+90) * (Math.PI/180));
		for (var i = 0; i < this.structures.length; i++){
			if (this.structures[i].destroyed || this.structures[i].disabled){
				continue;
			}
			else {
				ctx.drawImage(
					window.shipImages[this.structures[i].classname.toLowerCase()],
					this.layout[i].x + -size/2,
					this.layout[i].y + -size/2,
					size, 
					size
				);
			}
		}
	}

	this.getImpulseChangeCost = function(){
		return Math.ceil(this.mass/3*this.getImpulseMod());
	}

	this.getTurnCost = function(){
		return Math.ceil(this.mass/3*this.getImpulseMod());
	}
	
	this.getBaseTurnDelay = function(){
		return this.mass;
	}
	
	this.getBaseImpulse = function(){
		return 250;
	}

	this.getImpulseChangeConst = function(){
		return 25;
	}

	this.getTurnAngle = function(){
		return 30;
	}

	this.hasWeaponsSelected = function(){		
		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].systems.length; j++){
				if (this.structures[i].systems[j].weapon){
					if (this.structures[i].systems[j].selected){
						return true;
					}
				}
			}
		}

		return false;
	}

	this.hasHangarSelected = function(){
		return false;
	}

	this.createDiv = function(){

		var div = document.createElement("div");
			div.className = "shipDiv";
			$(div).data("shipId", this.id);

		var subDiv = document.createElement("div");
			subDiv.className = "header";
		
		var table = document.createElement("table");
			table.className = "general";
			
		var tr = document.createElement("tr");
		var th = document.createElement("th");
			th.innerHTML = "Flight #" + this.id;
			th.colSpan = 2; th.style.textAlign = "center";
			tr.appendChild(th); table.appendChild(tr);

		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "Position: "; tr.appendChild(td);
		var td = document.createElement("td"); td.className = "pos";
			td.innerHTML = this.x + " / " + this.y; tr.appendChild(td); table.appendChild(tr);

		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "Engine Power: "; tr.appendChild(td);
		var td = document.createElement("td"); td.className = "ep";
			td.innerHTML = this.getRemainingEP() + " / " + this.getEP(); tr.appendChild(td); table.appendChild(tr);

		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "Impulse: "; tr.appendChild(td);
		var td = document.createElement("td"); td.className = "impulse";
			td.innerHTML = this.getRemainingImpulse() + " / " + this.getTotalImpulse(); tr.appendChild(td); table.appendChild(tr);
			
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "Active Turn Delay: "; tr.appendChild(td);
		var td = document.createElement("td"); td.className = "delay";
			td.innerHTML = this.getRemainingDelay(); tr.appendChild(td); table.appendChild(tr);

		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.innerHTML = "Impulse Change: "; tr.appendChild(td);
		var td = document.createElement("td"); td.className = "change";
			td.innerHTML = this.getImpulseChangeCost(); tr.appendChild(td); table.appendChild(tr);
				
		subDiv.appendChild(table);
		div.appendChild(subDiv);

		var iconContainer = document.createElement("div");
			iconContainer.className = "iconContainer"; iconContainer.style.width = "auto";
			for (var j = 0; j < this.dogfights.length; j++){
				$(iconContainer).append($("<span class='red font16'>").html("Locked in a dogfight versus #" + this.dogfights[j] + "</br>"));
			}
		div.appendChild(iconContainer);

		var layoutDiv = document.createElement("div");
			layoutDiv.className = "structContainer";

		div.appendChild(layoutDiv);
			
		document.getElementById("game").appendChild(div);


		// OUTER STRUCTS
		for (var i = 0; i < this.structures.length; i++){
			var fighterDiv = document.createElement("div");
				fighterDiv.className = "fighterDiv";
				fighterDiv.appendChild(new Image()).src = window.shipImages[this.structures[i].classname.toLowerCase() + "l"].src;
				fighterDiv.childNodes[0].className = "size40";
			if (this.structures[i].destroyed || this.structures[i].disabled){
				fighterDiv.appendChild(new Image()).src = "/fire/varIcons/destroyed.png";
				fighterDiv.childNodes[1].className = "overlay size30";
			}

			layoutDiv.appendChild(fighterDiv);

			var w = $(fighterDiv).width();
			var h = $(fighterDiv).height();

			var x = $(layoutDiv).width()/2 + this.layout[i].x*5- w/2;
			var y = $(layoutDiv).height()/2 + this.layout[i].y*5;

			$(fighterDiv)
				.data("fighterId", this.structures[i].id)
				.css("left", x)
				.css("top", y)
				.click(function(e){
					e.stopPropagation();
					console.log(game.getShipById($(this).parent().parent().data("shipId")).getSystemById($(this).data("fighterId")));
				})
				.hover(function(e){
					e.stopPropagation();
					game.getShipById($(this).parent().parent().data("shipId")).getSystemById($(this).data("fighterId")).hover(e);
				})

			var wrap = document.createElement("div");
				wrap.className = "iconIntegrity"; wrap.style.height = 12;

			var rem = this.structures[i].getRemainingIntegrity();

			var bgDiv = document.createElement("div");
				bgDiv.className = "integrityAmount"; bgDiv.style.textAlign = "center"; bgDiv.style.fontSize = 12; bgDiv.style.top = 0;
				bgDiv.innerHTML = rem + " / " + this.structures[i].integrity;
				wrap.appendChild(bgDiv);

			var lowerDiv = document.createElement("div");
				lowerDiv.className = "integrityNow"; lowerDiv.style.top = 0; lowerDiv.style.height = "100%";
				lowerDiv.style.width = rem/this.structures[i].integrity * 100 + "%";
				wrap.appendChild(lowerDiv);
				
			var upperDiv = document.createElement("div");
				upperDiv.className = "integrityFull"; upperDiv.style.top = 0;
				wrap.appendChild(upperDiv);

			fighterDiv.appendChild(wrap);

			var s = 20;
			// FIGHTER WEAPONS
			for (var j = 0; j < this.structures[i].systems.length; j++){
				var td = this.structures[i].systems[j].getTableData();
					$(td.childNodes[0]).attr("width", s).attr("height", s);
					$(td.childNodes[td.childNodes.length-1]).remove();
					$(td.childNodes[td.childNodes.length-1]).remove();
					fighterDiv.appendChild(td);
					$(td)
						.addClass("fighter")
						.css("top", -h -s - 5)
						.css("left", w/2 - s/2)
						.data("shipId", this.id)
						.hover(function(e){
							e.stopPropagation();
							$("#systemDetailsDiv").remove();
							game.getShipById($(this).data("shipId")).getSystemById($(this).data("systemId")).hover(e)
						})
						.click(function(e){
							e.stopPropagation();
							game.getShipById($(this).data("shipId")).getSystemById($(this).data("systemId")).select(e)
						})
						.contextmenu(function(e){
							e.stopPropagation();
							e.preventDefault();
							game.getShipById($(this).data("shipId")).selectAll(e, $(this).data("systemId"));
						});

			}
		}

		$(div).contextmenu(function(e){
			e.stopPropagation();
			//e.preventDefault();
			//$(this).addClass("disabled");
		}).addClass("disabled").drag();
	}

	this.selectAll = function(e, id){
		var display = this.getSystemById(id).display;
		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].systems.length; j++){
				if (this.structures[i].systems[j].display == display){
					if (! this.structures[i].systems[j].destroyed){
						this.structures[i].systems[j].select(e);
					}
				}
			}
		}
		return true;
	}

	this.getShortInfo = function(){
		var ele = $("#shortInfo");

		if (game.shortInfo){
			game.shortInfo = false;
			$(ele).html("");
		}
		game.shortInfo = this.id;
		if (this.userid == game.userid){
			$(ele).attr("class", "friendly");
		} else $(ele).attr("class", "hostile");
		
		var table = document.createElement("table");
			table.insertRow(-1).insertCell(-1).innerHTML =  this.structures.length + " Fighters #" + this.id;
			table.insertRow(-1).insertCell(-1).innerHTML =  "Base hit: " + this.getBaseHitChance() + "%";
			if (this.dogfight){
				table.insertRow(-1).insertCell(-1).innerHTML = "<span class='red'>Dogfight-lock vs #" + this.dogfight + "</span>";
			}
		return table;
	}

	this.getBaseHitChance = function(){
		var min = 0; var max = 0;
		for (var i = 0; i < this.structures.length; i++){
			if (!this.structures[i].destroyed){
				min = Math.max(min, this.structures[i].mass);
				max = Math.max(max, this.structures[i].mass);
			}
		}
		if (min == max){return Math.ceil(min/2)}
		else return Math.ceil(min/2) + " - " + Math.ceil(max/2);
	}

	this.getHitSectionFromAngle = function(a){
		for (var i = 0; i < this.structures.length; i++){
			if (isInArc(a, this.structures[i].start, this.structures[i].end)){
				return this.structures[i];
			}
		}
	}

	this.getHitChanceFromAngle = function(angle){
		return this.getBaseHitChance();
	}

	this.getWeaponPosition = function(fire){
		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].systems.length; j++){
				if (this.structures[i].systems[j].id == fire.weaponid){
					return {x: this.layout[i].x, y: this.layout[i].y};
				}
			}
		}
	}
}

Flight.prototype = Object.create(Ship.prototype);