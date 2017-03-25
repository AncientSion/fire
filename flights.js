function Fighter(id, name, ep, turns, mass, integrity, value, negation, crits, destroyed){
	this.id = id;
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
	
	this.isDestroyedThisTurn = function(){
		if (this.destroyed){
			for (var j = this.damages.length-1; j >= 0; j--){
				if (this.damages[j].destroyed == 1 && this.damages[j].turn == game.turn){
					return true;
				}
			}					
		}
		else if (this.disabled){
			for (var j = this.crits.length-1; j >= 0; j--){
				if (this.crits[j].type == "disengaged" && this.crits[j].turn == game.turn){
					return true;
				}
			}
		}
		return false;
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

	this.isDestroyed = function(){
		var des = true;
		for (var i = 0; i < this.structures.length; i++){
			if (!this.structures[i].destroyed && !this.structures[i].disabled){
				des = false;
				break;
			}
		}
		return des;
	}

	this.setFighterState = function(){
		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].crits.length; j++){
				if (this.structures[i].crits[j].type == "disengaged"){
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
		ctx.save();
		ctx.translate(this.x, this.y)
		ctx.rotate((this.facing+90) * (Math.PI/180));

		if (game.animateFire){
			for (var i = 0; i < this.structures.length; i++){
				var draw = false;
				if (this.structures[i].destroyed || this.structures[i].disabled){
					if (this.structures[i].isDestroyedThisTurn()){
						this.drawFighter(i);
					}
				}
				else this.drawFighter(i);
			}
		}
		else {
			for (var i = 0; i < this.structures.length; i++){
				if (!this.structures[i].destroyed && !this.structures[i].disabled){
					this.drawFighter(i);
				}
			}
		}
		ctx.restore();
	}

	this.drawFighter = function(i){
		var size = 12;
		ctx.drawImage(
			window.shipImages[this.structures[i].name.toLowerCase()],
			this.layout[i].x -size/2,
			this.layout[i].y -size/2,
			size, 
			size
		);
	}

	this.canShortenTurn = function(){
		return false;
		if (game.phase == 0 || game.phase == 1){
			if (this.getRemainingEP() >= this.getShortenTurnCost()){
				return true;
			}
		}

		return false;
	}
	
	this.canUndoShortenTurn = function(){
		return false;
		if (game.phase == 0 || game.phase == 1){
			if (this.turns.length){
				if (this.turns[0].costmod > 1){
					return true;
				}
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
		return 210;
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

	this.extendDiv = function(div){

		if (this.dogfights.length){
			var iconContainer = document.createElement("div");
				iconContainer.className = "iconContainer";
				$(iconContainer).css("width", 100).append($("<div class='dogFightHeader'>Active Dogfights</div>"));
				for (var j = 0; j < this.dogfights.length; j++){
					$(iconContainer).append($("<div class='dogFightEntry'>").html("VS #" + this.dogfights[j]));
				}
			div.appendChild(iconContainer);
		}
		else {
			$(div).find(".header").css("width", "99%");
		}

		var structDiv = document.createElement("div");
			structDiv.className = "structContainer";

		div.appendChild(structDiv);
			
		document.getElementById("game").appendChild(div);



		var maxWidth = 0;
		if (this.structures.length <= 6){
			maxWidth = 330;
		}
		else if (this.structures.length <= 12){
			maxWidth = 400;
		}

		$(div).css("width", maxWidth);


		// OUTER STRUCTS
		for (var i = 0; i < this.structures.length; i++){
			var active = true;
			if (this.structures[i].destroyed || this.structures[i].disabled){
				active = false;
			}

			var img = new Image()
				img.src = window.shipImages[this.structures[i].name.toLowerCase() + "l"].src;
				img.className = "size40";

				$(img)
					.data("shipId", this.id)
					.data("fighterId", this.structures[i].id)
					.addClass("size40")
					.click(function(e){
						e.stopPropagation();
						console.log(game.getUnitById($(this).data("shipId")).getSystemById($(this).data("fighterId")));
					})


			var fighterDiv = document.createElement("div");
				fighterDiv.className = "fighterDiv";
				fighterDiv.appendChild(img);

			if (!active){
				fighterDiv.appendChild(new Image()).src = "/fire/varIcons/destroyed.png";
				fighterDiv.childNodes[1].className = "overlay size30";
			}
			else {
				$(img).hover(function(e){
					e.stopPropagation();
					game.getUnitById($(this).data("shipId")).getSystemById($(this).data("fighterId")).hover(e);
				});
			}

			structDiv.appendChild(fighterDiv);

			var w = $(fighterDiv).width();
			var h = $(fighterDiv).height();

			var x = $(structDiv).width()/2 + this.layout[i].x*5- w/2;
			var y = $(structDiv).height()/2 + this.layout[i].y*5 - 20;

			$(fighterDiv)
				.css("left", x)
				.css("top", y)

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
				var td = this.structures[i].systems[j].getTableData(true);
					$(td.childNodes[0]).attr("width", s).attr("height", s);
					fighterDiv.appendChild(td);
					$(td)
						.addClass("fighter")
						.css("top", -h -s - 5)
						.css("left", w/2 - s/2)
						.data("shipId", this.id)
						.click(function(e){
							e.stopPropagation();
							game.getUnitById($(this).data("shipId")).getSystemById($(this).data("systemId")).select(e)
						})
						.contextmenu(function(e){
							e.stopPropagation();
							e.preventDefault();
							game.getUnitById($(this).data("shipId")).selectAll(e, $(this).data("systemId"));
						});

				if (active){					
					$(td).hover(function(e){
						e.stopPropagation();
						$("#systemDetailsDiv").remove();
						game.getUnitById($(this).data("shipId")).getSystemById($(this).data("systemId")).hover(e)
					})
				}
			}
		}


		var height = 0;
		$(structDiv).find(".fighterDiv").each(function(){
			var y = $(this).position().top + $(this).height();
			if (y > height){
				height = y;
			}
		})

		$(structDiv).css("height", height + 20);

		var w = $(div).width();
		var h = $(div).height();

		$(div).css("top", 0).css("left", res.x/2 - w/2);

		$(div).contextmenu(function(e){
			e.stopPropagation();
		}).addClass("disabled").drag();
		return div;
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
		if (min == max){return Math.ceil(min/1.5)}
		else return Math.ceil(min/1.5) + " - " + Math.ceil(max/1.5);
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