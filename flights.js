function Flight(data){
	Ship.call(this, data);
	this.flight = true;
	this.primary = false;
	this.layout = [];
	this.ep = 1000;
	this.turns = 10;
	this.maxTurns = 1;
	this.dogfights = [];

	this.create = function(){
		this.setFighterState();
		this.setMaxMass();
		this.setEP();
		this.setTurns();
		this.setFacing();
		this.setPosition();
		this.setLayout();
	}

	this.hasSystemSelected = function(name){
		return false;
	}

	this.isDestroyed = function(){
		for (var i = 0; i < this.structures.length; i++){
			if (!this.structures[i].destroyed && !this.structures[i].disabled){
				return false;
			}
		}
		return true;
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
			for (var i = 0; i < (this.structures.length-done)/2; i++){
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
		if (this.actions.length && this.actions[0].turn == game.turn){
			return Math.floor(this.ep/3);
		}
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

	this.getShooterPosition = function(j){
		for (var i = j; i < this.structures.length; i++){
			if (!this.structures[i].destroyed || !this.structures[i].disabled){
				return this.layout[j];
			}
		}
	}

	this.drawHoverElements = function(){
		this.drawMoveLength();
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
			var alive = (this.size - 32) / 5;
			var oy = (this.structures.length-alive)*4;
			var index = 0;
			for (var i = 0; i < this.structures.length; i++){
				if (!this.structures[i].destroyed && !this.structures[i].disabled){
					this.drawFighter(index, oy);
					index++
				}
			}
		}
		ctx.restore();
	}

	this.drawFighter = function(i, oy){
		if (oy == undefined){oy = 0;}
		var size = 12;
		ctx.drawImage(
			window.shipImages[this.structures[i].name.toLowerCase()],
			this.layout[i].x -size/2,
			this.layout[i].y -size/2 + oy,
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
		return Math.ceil(Math.pow(this.mass, 1.15)/3*this.getImpulseMod());
		return Math.ceil(this.mass/3*this.getImpulseMod());
	}

	this.getTurnCost = function(){
		return Math.ceil(Math.pow(this.mass, 1.15)/100*this.getImpulseMod() * this.getTurnAngle());
		return Math.ceil(this.mass/50*this.getImpulseMod() * this.getTurnAngle());
	}
	
	this.getBaseTurnDelay = function(){
		return this.mass/2;
	}
	
	this.getBaseImpulse = function(){
		if (this.actions.length && this.actions[0].turn == game.turn){
			return Math.floor(this.baseImpulse/3*2);
		}
		return this.baseImpulse;
	}

	this.getTurnAngle = function(){
		return 20;
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

	this.launchedThisTurn = function(){
		if (!(this.actions.length) || this.actions[0].turn == game.turn){
			return true;
		} return false;
	}

	this.expandDiv = function(div){
		var iconContainer = document.createElement("div");
			iconContainer.className = "iconContainer";
			$(iconContainer).css("width", 120)//.append($("<div class='dogFightHeader'>Active Dogfights</div>"));
			if (this.launchedThisTurn()){
				$(iconContainer).append($("<div class='dogFightEntry'>").html("50 % EP / Impulse due to launch."));
			}
			for (var j = 0; j < this.dogfights.length; j++){
				$(iconContainer).append($("<div class='dogFightEntry'>").html("Dogfight VS #" + this.dogfights[j]));
			}
		div.appendChild(iconContainer);

		var structContainer = document.createElement("div");
			structContainer.className = "structContainer";

		div.appendChild(structContainer);
			
		////document.getElementById("game").appendChild(div);
		document.body.appendChild(div);



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
				fighterDiv.appendChild(new Image()).src = "varIcons/destroyed.png";
				fighterDiv.childNodes[1].className = "overlay size30";
			}
			else {
				$(img).hover(function(e){
					e.stopPropagation();
					game.getUnitById($(this).data("shipId")).getSystemById($(this).data("fighterId")).hover(e);
				});
			}

			structContainer.appendChild(fighterDiv);

			var w = $(fighterDiv).width();
			var h = $(fighterDiv).height();

			var x = $(structContainer).width()/2 + this.layout[i].x*5- w/2;
			var y = $(structContainer).height()/2 + this.layout[i].y*5 - 20;

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
		$(structContainer).find(".fighterDiv").each(function(){
			var y = $(this).position().top + $(this).height();
			if (y > height){
				height = y;
			}
		})

		$(structContainer).css("height", height + 20);

		/*var w = $(div).width();
		var h = $(div).height();
		var left = 50;
		if (this.facing < 90 || this.facing > 270){
			left = res.x - w - 50;
		}

		$(div).css("top", 100).css("left", left);
		*/return div;
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
		if (this.userid == game.userid){
			$(ele).attr("class", "friendly");
		} else $(ele).attr("class", "hostile");

		var baseHit = this.getBaseHitChance();
		var impulse = this.getTotalImpulse();
		
		var table = document.createElement("table");
			table.insertRow(-1).insertCell(-1).innerHTML = "Flight #" + this.id + " (" +game.getUnitType(this.traverse) + ")";
			table.insertRow(-1).insertCell(-1).innerHTML =  "Impulse: " + impulse + " (" + round(impulse / this.getBaseImpulse(), 2) + ")";
			table.insertRow(-1).insertCell(-1).innerHTML = "Base Hit: " +  this.getBaseHitChance() + "% ";
		var baseHit = this.getBaseHitChance();
		var impulse = this.getTotalImpulse();
		return table;
	}

	this.getBaseHitChance = function(){
		var min = 0; var max = 0;
		var p = 1.25;
		for (var i = 0; i < this.structures.length; i++){
			if (!this.structures[i].destroyed){
				min = Math.max(min, this.structures[i].mass);
				max = Math.max(max, this.structures[i].mass);
			}
		}
		if (min == max){return Math.ceil(min/p)}
		else return Math.ceil(min/p) + " - " + Math.ceil(max/p);
	}

	this.getHitSectionFromAngle = function(a){
		for (var i = 0; i < this.structures.length; i++){
			if (isInArc(a, this.structures[i].start, this.structures[i].end)){
				return this.structures[i];
			}
		}
	}

	this.getHitChanceFromAngle = function(angle){
		return Math.ceil(this.getBaseHitChance() / 100 * this.getProfileMod());
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

function Fighter(data){
	this.id = data.id;
	this.name = data.name;
	this.display = data.display;
	this.ep = data.ep;
	this.turns = data.turns;
	this.mass = data.mass;
	this.integrity = data.integrity;
	this.value = data.value;
	this.negation = data.negation;
	this.destroyed = data.destroyed;
	this.crits = [];
	this.damages = [];
	this.systems = [];
	this.fighter = true;
	this.highlight = false;
	this.disabled = false;

	for (var i = 0; i < data.crits.length; i++){
		this.crits.push(new Crit(
				data.crits[i].id,
				data.crits[i].shipid,
				data.crits[i].systemid,
				data.crits[i].turn,
				data.crits[i].type,
				data.crits[i].duration
			)
		)
	}
	
	this.isDestroyedThisTurn = function(){
		if (this.disabled){
			for (var j = this.crits.length-1; j >= 0; j--){
				if (this.crits[j].type == "disengaged" && this.crits[j].turn == game.turn){
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
			$(document.body).append(ele);
			var w = $(ele).width();
			$(ele).css("left", e.clientX - w/2).css("top", e.clientY + 40)
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