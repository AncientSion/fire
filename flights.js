function Flight(data){
	Mixed.call(this, data);
	this.flight = 1;
	this.fSize = data.fSize;
	this.ep = data.ep;
	this.mass = data.mass;
	this.baseSize = data.baseSize;
	this.unitSize = data.unitSize;
	this.mission = data.mission || {};
	this.traverse = -3;
	this.patrolFacing = [];
	this.drawImg;
	this.doDraw = 1;

	this.create = function(){
		this.img = window.shipImages[this.structures[0].name.toLowerCase() + "l"];
		this.smallImg = window.shipImages[this.structures[0].name.toLowerCase()];
		this.setFighterState();
		this.setLayout();
		this.setDrawData();
		if (this.id < 0){
			this.setMaxMass();
			this.setImpulse();
		}
		//this.setEP();
		//this.setTurns();
		//	this.setPosition();
		this.setSize();
		this.setStatus();
		this.setImage();
	}

	this.setStatus = function(){
		for (var i = 0; i < this.structures.length; i++){
			if (this.structures[i].destroyed || this.structures[i].disabled){
				this.structures[i].draw = false;
			}
		}

		if (this.mission.arrived){
			if (this.mission.type == 1){return;}
			if (this.mission.arrived < game.turn){
				this.doDraw = 0;
			}
			else if (game.phase > 2 && this.mission.arrived == game.turn){
				this.doDraw = 0;
			}
		}
	}

	this.setSize = function(){
		if (!this.mission.arrived){
			this.setPreMoveSize();
		}
		else if (this.mission.arrived < game.turn){
			this.setPostMoveSize();
		}
		else if (this.mission.arrived == game.turn){
			if (game.phase <= 2){
				this.setPreMoveSize();
			} else this.setPostMoveSize();
		}
	}


	this.setPreMoveSize = function(){
		this.size = this.baseSize + this.unitSize * this.structures.length-1;
	}

	this.setPostMoveSize = function(){
		if (this.mission.arrived){
			if (this.mission.type == 2 || this.mission.type == 3){
				var s = game.getUnitById(this.mission.targetid).size;
				this.size = s+30;
			}
			else if (this.mission.type == 1){
				this.size = 1.5*(this.baseSize + this.unitSize * this.structures.length-1);
			}
		}
		else this.size = this.baseSize + this.unitSize * this.structures.length-1;

	}

	this.setDrawData = function(){
		if (this.available > game.turn || !this.available || game.turn == 1 && game.phase == -1){
			return;
		}

		if (game.phase > 1){
			this.drawX = this.actions[this.actions.length-1].x;
			this.drawY = this.actions[this.actions.length-1].y;
		}
		else {
			this.drawX = this.x;
			this.drawY = this.y;
		}
	}

	this.setPreFireImage = function(){
		for (var i = 0; i < this.structures.length; i++){
			if (!this.structures[i].draw){
				if (this.structures[i].isDestroyedThisTurn()){
					this.structures[i].draw = true;
				}
			}
		}
		this.setImage();
	}

	this.setImage = function(){
		if (!this.mission.arrived){
			this.setPreMoveImage();
		}
		else if (this.mission.arrived){
			if (this.mission.arrived < game.turn){
				this.setPostMoveImage();
			} 
			else if (this.mission.arrived == game.turn){
				if (game.phase < 3){
					this.setPreMoveImage();
				} else this.setPostMoveImage();
			}
		}
	}

	this.setPreMoveImage = function(){
		if (this.id == 14){
			console.log("setPreMoveImage");
		}
		var t = document.createElement("canvas");
			t.width = this.size*2;
			t.height = this.size*2;
		var ctx = t.getContext("2d");

		var size = 12;
		ctx.translate(t.width/2, t.height/2);
		ctx.rotate((this.getDrawFacing()+90) * (Math.PI/180));

		for (var i = 0; i < this.structures.length; i++){
			if (this.structures[i].draw){
				ctx.drawImage(
					this.smallImg,
					this.structures[i].layout.x -size/2,
					this.structures[i].layout.y -size/2,
					size, 
					size
				)
			;}
		}	
		//ctx.translate(this.size/2, this.size/2);
		//ctx.rotate((this.getDrawFacing()+90) * (Math.PI/180));
		ctx.setTransform(1,0,0,1,0,0);

		this.drawImg = t;
	}

	this.setPostMoveImage = function(){
		var size = 12;
		var t = document.createElement("canvas");
			t.width = this.size;
			t.height = this.size;
		var ctx = t.getContext("2d");

		if (this.mission.type == 1){ // patrol
			ctx.translate(this.size/2, this.size/2);
			for (var i = 0; i < this.structures.length; i++){
				if (this.structures[i].draw){
					ctx.save();
					var ox = range(-this.size/3, this.size/3);
					var oy = range(-this.size/3, this.size/3);

					ctx.translate(ox, oy);			
					ctx.rotate(range(0, 360) * (Math.PI/180));
					ctx.drawImage(
						this.smallImg,
						0 -size/2,
						0 -size/2,
						size, 
						size
					);
					ctx.restore();
				}
			}
		}
		else if (this.mission.type == 2 || this.mission.type == 3){ // strike escort
			ctx.translate(this.size/2, this.size/2);
			for (var i = 0; i < this.structures.length; i++){
				if (this.structures[i].draw){
					ctx.save();		
					ctx.rotate((((360/this.structures.length-1)*i)+this.getDrawFacing()) * (Math.PI/180));
					ctx.drawImage(
						this.smallImg,
						0 -size/2,
						this.size/2 -size/2 -7,
						size, 
						size
					);
					ctx.restore();
				}
			}
		}
		ctx.setTransform(1,0,0,1,0,0);
		this.drawImg = t;
		//console.log(this.drawImg.toDataURL());
	}


	this.setPostFireImage = function(){
		for (var i = 0; i < this.structures.length; i++){
			if (this.structures[i].draw && this.structures[i].destroyed || this.structures[i].disabled){
				this.structures[i].draw = 0;
			}
		}
		this.setImage();
	}

	this.setPostMoveFacing = function(){
		if (this.mission.arrived){
			for (var i = 0; i < this.structures.length; i++){
				this.patrolFacing.push(range(0, 360));
			}
		}
	}

	this.canDeploy = function(){
		return false;
	}

	this.resetMoveMode = function(){
		return;
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
					dmgs[dmgs.length-1].system = this.structures[i].display;
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

	this.setLayout = function(){
		var size = this.fSize;

		var toDo = Math.min(6, Math.ceil(this.structures.length/2));
		var done = 0;

		for (var i = 0; i < toDo; i++){
			this.structures[i].layout = {
				x: -size/2 - size*i/2,
				y: -toDo*size/2 +size*(i)
 			};
			this.structures[toDo*2-(i+1)].layout = {
				x: size/2 + size*i/2,
				y: -toDo*size/2 +size*(i)
 			};
 			done += 2;
		}

		if (done < this.structures.length){
			for (var i = 0; i < (this.structures.length-done)/2; i++){
				this.structures[i].layout = {
					x: -size/2 - size/2*i,
					y: size/2 + size*i
	 			};
				this.structures[this.structures.length-done/2-(i+1)].layout = {
					x: size/2 + size/2*i,
					y: size/2 + size*i
	 			};
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

	this.setImpulse = function(){
		this.baseImpulse = Math.floor(Math.pow(this.mass, -1.5)*50000);
		this.currentImpulse = this.baseImpulse;
	}

	this.getEP = function(){
		return this.ep;
	}

	this.setTurns = function(){
		for (var i = 0; i < this.structures.length; i++){
			if (! this.structures[i].destroyed){
				this.maxTurns = Math.min(this.turns, this.structures[i].turns);
			}
		}
	}

	this.getGunOrigin = function(j){
		for (var i = j; i < this.structures.length; i++){
			if ( (!this.structures[i].destroyed && !this.structures[i].disabled) || this.structures[i].isDestroyedThisTurn() ) {
				return this.structures[i].layout;
			}
		}
	}

	this.getFireDest = function(j){
		for (var i = j; i < this.structures.length; i++){
			if (this.structures[i].isDamagedThisTurn()){
				return this.structures[i].layout;
			}
		}
		for (var i = 0; i < this.structures.length; i++){
			if (this.structures[i].isDestroyedThisTurn()){
				return this.structures[i].layout;
			}
		}
		return false;
	}

	
	this.getPlannedFacing = function(){
		if (game.phase < 2){
			return this.facing;
			//return getAngleFromTo(this, this.nextStep);
		}
		return this.actions[this.actions.length-1].a;
	}

	this.getDrawFacing = function(){
		return this.getPlannedFacing();
	}

	this.drawSelf = function(){
		//if (this.id == 14){
		//	console.log(this.drawX + "/" + this.drawY + " id: " + this.id);
		//}
		ctx.translate(this.drawX, this.drawY);
		ctx.drawImage(this.drawImg, -this.drawImg.width/2, -this.drawImg.height/2);
		ctx.translate(-this.drawX, -this.drawY);
	}

	this.drawEscort = function(){
		return;
	}


	this.drawSelfa = function(){
		ctx.save();
		ctx.translate(this.drawX, this.drawY);
		ctx.rotate((this.getDrawFacing()+90) * (Math.PI/180));

		if (game.animateFire){
			for (var i = 0; i < this.structures.length; i++){
				if (this.structures[i].draw){
					this.drawFighter(i);
				}
			}
		}
		else if (this.id == 4){
			ctx.drawImage(
				this.drawImg, 0,0
			);
		}
		else {
			var alive = (this.size - this.baseSize) / this.unitSize;
			var index = 0;
			for (var i = 0; i < this.structures.length; i++){
				if (!this.structures[i].destroyed && !this.structures[i].disabled){
					this.drawFighter(index);
					index++
				}
			}
		}
		ctx.restore();
	}

	this.drawFighter = function(i){
		//if (oy == undefined){oy = 0;}
		var size = 12;

		if (this.mission.arrived){
			ctx.save();
			ctx.rotate(this.patrolFacing[i] * (Math.PI/180));
		}
		ctx.drawImage(
			this.smallImg,
			this.layout[i].x -size/2,
			this.layout[i].y -size/2,
			size, 
			size
		);
		 
		if (this.mission.arrived){
			ctx.restore();
		}
	}

	this.canShortenTurn = function(){
		return false;
	}
	
	this.canUndoShortenTurn = function(){
		return false;
	}
	
	this.getBaseImpulse = function(){
		return this.baseImpulse;
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
		if (this.available == game.turn){
			return true;
		}
		return false;
	}

	this.getNewMission = function(){
		if (this.mission.turn == game.turn){
			return this.mission;
		}
	}

	this.createBaseDiv = function(){
		var owner = "friendly";
		if (game.phase > -2 && this.userid != game.userid){owner = "hostile";}
		var div = document.createElement("div");
			div.className = "shipDiv " + owner;
			$(div).data("shipId", this.id);

		var subDiv = document.createElement("div");
			subDiv.className = "header";
		
		var table = document.createElement("table");
			table.className = "general";

		var header = "red";
		if (this.friendly){header = "green";}

		$(table)
			.append($("<tr>")
				.append($("<th>").html(this.name.toUpperCase() + " #" + this.id).attr("colspan", 2).addClass(header)))
			.append($("<tr>")
				.append($("<td>").html("Classification"))
				.append($("<td>").html(game.getUnitType(this.traverse))))
			.append($("<tr>")
				.append($("<td>").html("Current Impulse"))
				.append($("<td>").html(this.getCurrentImpulse())))
			.append($("<tr>")
				.append($("<td>").html("Current Mission"))
				.append($("<td>").html(game.getMissionTypeString(this.mission.type))))
			.append($("<tr>")
				.append($("<td>").html("Mission Target"))
				.append($("<td>").html(game.getMissionTargetString(this.mission))))

		if (this.friendly && game.phase == -1 && this.available < game.turn){
			$(table)
			.append($("<tr>").append("<td>").attr("colSpan", 2).css("height", "10px"))
			.append($("<tr>")
				.append($("<td>")
					.attr("colSpan", 2)
					.css("font-size", "16px")
					.css("border", "1px solid white")
					.html("flight From Mission")
					.data("active", 0)
					.data("mission", this.mission.type)
			/*		.click(function(e){
						var mission = $(this).data("mission");
						if ($(this).data("active") == 0){
							$(this).data("active", 1).html("Select New Mission");
							//$(this).addClass("selected");
							$(this).parent().parent().parent().parent().css("height", "auto").end().end()
							.find("tr").slice(-3).each(function(i){
								$(this).removeClass("disabled");
								if (i == mission-1){
									$(this).addClass("selected");
								}
							})
						} else {
							$(this).data("active", 0).html("Disengage From Mission");
							//$(this).removeClass("selected");
							$(this).parent().parent().parent().parent().css("height", "130px").end().end()
							.find("tr").slice(-3).each(function(i){
								$(this).addClass("disabled");
							})
						}
					})
			*/
					.click(function(e){
						game.getUnitById(aUnit).switchMissionMode();
					})
					.hover(function(e){
						$(this).toggleClass("highlight");
					})))
			.append($("<tr>").click(function(){game.mission.set(1, this)}).addClass("disabled").append($("<td>").attr("colSpan", 2).css("font-size", "14px").html("Patrol Location")))
			.append($("<tr>").click(function(){game.mission.set(2, this)}).addClass("disabled").append($("<td>").attr("colSpan", 2).css("font-size", "14px").html("Strike/ Escort Ship")))
			//.append($("<tr>").click(function(){game.mission.set(3, this)}).addClass("disabled").append($("<td>").attr("colSpan", 2).css("font-size", "14px").html("Intercept Flight / Salvo")));
		}
				
		subDiv.appendChild(table);
		div.appendChild(subDiv);

		var maxWidth = 250;
		$(div).css("width", maxWidth);
		$(div).find(".header").css("width", "99%");

		$(this.expandDiv(div))
			.addClass("disabled")
			.drag()
			.find(".structContainer")
				.contextmenu(function(e){e.stopPropagation;})
				//.addClass("disabled")
				.end()
			.contextmenu(function(e){
				//e.stopImmediatePropagation(); e.preventDefault();
				if ($(this).data("shipId") != aUnit){
					$(this).addClass("disabled");
				}
			})

		if (game.phase == 2){
			$(div).find(".structContainer").show();
		}

		this.element = div;
	}

	this.expandDiv = function(div){
		/*	var iconContainer = document.createElement("div");
				iconContainer.className = "iconContainer";
				$(iconContainer).css("width", 120)//.append($("<div class='dogFightHeader'>Active Dogfights</div>"));
				if (this.launchedThisTurn()){
					$(iconContainer).append($("<div class='dogFightEntry'>").html("Deployed this turn"));
					$(iconContainer).append($("<div class='dogFightEntry'>").html("-60% EP"));
					$(iconContainer).append($("<div class='dogFightEntry'>").html("-40% Impulse"));
				}
				for (var j = 0; j < this.dogfights.length; j++){
					$(iconContainer).append($("<div class='dogFightEntry'>").html("Dogfight VS #" + this.dogfights[j]));
				}
			div.appendChild(iconContainer);
		*/
		var structContainer = document.createElement("div");
			structContainer.className = "structContainer";

		div.appendChild(structContainer);
		document.body.appendChild(div);


		// OUTER STRUCTS

		maxWidth = $(div).width();
		var x = 15;
		var y = 30;
		var h = 50;
		var w = 50;

		for (var i = 0; i < this.structures.length; i++){

			var active = true;
			if (this.structures[i].destroyed || this.structures[i].disabled){
				active = false;
			}

			var img = new Image()
				img.src = window.shipImages[this.structures[i].name.toLowerCase() + "l"].src;
				img.className = "size30";

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
				var overlay = new Image();
				$(overlay)
					.attr("src", "varIcons/destroyed.png")
					.addClass("overlay").addClass("size30")
					.hover(function(e){
						e.stopPropagation();
						var p = $(this).parent().children()[0];
						game.getUnitById($(p).data("shipId")).getSystemById($(p).data("fighterId")).hover(e);
					})
				fighterDiv.appendChild(overlay);
			}
			else {
				$(img).hover(function(e){
					e.stopPropagation();
					game.getUnitById($(this).data("shipId")).getSystemById($(this).data("fighterId")).hover(e);
				});
			}

			structContainer.appendChild(fighterDiv);

			if (x + 50 + 5 > maxWidth){
				x = 15;
				y += h*2;
			}


			$(fighterDiv)
				.css("left", x)
				.css("top", y)

			x += 50 + 5;
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

			if (active){
				var s = 20;
				// FIGHTER WEAPONS
				for (var j = 0; j < this.structures[i].systems.length; j++){
					var td = this.structures[i].systems[j].getTableData(true);
						$(td.childNodes[0]).attr("width", s).attr("height", s);
						fighterDiv.appendChild(td);
						$(td)
							.addClass("fighter")
							.css("top", -h -s - 5)
							.css("left", w/2 - s/2 +1 )
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

	this.launchedFrom = function(){

	}

	this.expandDiva = function(div){
		var iconContainer = document.createElement("div");
			iconContainer.className = "iconContainer";
			$(iconContainer).css("width", 120)//.append($("<div class='dogFightHeader'>Active Dogfights</div>"));
			if (this.launchedThisTurn()){
				$(iconContainer).append($("<div class='dogFightEntry'>").html("Deployed this turn"));
				$(iconContainer).append($("<div class='dogFightEntry'>").html("-60% EP"));
				$(iconContainer).append($("<div class='dogFightEntry'>").html("-40% Impulse"));
			}
			for (var j = 0; j < this.dogfights.length; j++){
				$(iconContainer).append($("<div class='dogFightEntry'>").html("Dogfight VS #" + this.dogfights[j]));
			}
		div.appendChild(iconContainer);

		var structContainer = document.createElement("div");
			structContainer.className = "structContainer";

		div.appendChild(structContainer);
		document.body.appendChild(div);

		var maxWidth = 0;
		if (this.structures.length <= 6){
			maxWidth = 350;
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
				img.className = "size30";

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
				var overlay = new Image();
				$(overlay)
					.attr("src", "varIcons/destroyed.png")
					.addClass("overlay").addClass("size30")
					.hover(function(e){
						e.stopPropagation();
						var p = $(this).parent().children()[0];
						game.getUnitById($(p).data("shipId")).getSystemById($(p).data("fighterId")).hover(e);
					})
				fighterDiv.appendChild(overlay);
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

			var x = $(structContainer).width()/2 + (this.layout[i].x*4)- w/2;
			var y = $(structContainer).height()/2 + (this.layout[i].y*4);

			$(fighterDiv)
				.css("left", x)
				.css("top", y - 20)

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
						.css("left", w/2 - s/2 +1 )
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

	this.getAttachment = function(div){
		var color = "red";

		if (this.friendly){color = "green";}
		var attachDiv = $("<div>").addClass("flightDiv")
			.append($("<div>").css("display", "block").addClass("center15 " + color).html("Flight #" + this.id + (" (click to select)")))
			.data("id", this.id)
			.click(function(){
				if (aUnit){
					var ship = game.getUnitById(aUnit);
					if (ship.hasWeaponsSelected()){
						var target = game.getUnitById($(this).data("id"));
						if (ship.userid != target.userid){
							handleFireClick(ship, target);
						}
					} 
					else {
						ship.doUnselect();
						ship.switchDiv();
						game.getUnitById($(this).data("id")).select();
					}
				}
				else game.getUnitById($(this).data("id")).select();
				
			})
			.hover(function(e){
				var vessel = game.getUnitById($(this).data("id"));
					//vessel.doHighlight();
					//game.doGenericHover(vessel)
				if (aUnit && aUnit != vessel.id){
					var	ship = game.getUnitById(aUnit);
					if (ship.salvo){return;}
					//var shipLoc = ship.getPlannedPosition();
					//var facing = ship.getPlannedFacing();
					if (ship.hasWeaponsSelected()){
						if (ship.id != vessel.id){
							handleWeaponAimEvent(ship, vessel, e);
						}
					} else {
						game.target = 0;
						$("#weaponAimTableWrapper").hide()
					}
				}
			})
			

		for (var j = 0; j < this.structures.length; j++){
			if (this.structures[j].destroyed || this.structures[j].disabled){continue;}
			attachDiv.append($("<div>").append($("<img>").css("width", 34).css("height", 34).attr("src", window.shipImages[this.structures[j].name.toLowerCase() + "l"].src)));
		}

		div.append(attachDiv);
		return div;
	}

	this.selectAllA = function(e, id){
		var s = this.getSystemById(id);
		var w = s.getActiveWeapon();
		var name = w.name;
		var hasFire = s.hasUnresolvedFireOrder();
		if (name == "Hangar"){return;}

		for (var i = 0; i < this.structures.length; i++){
			for (var j = 0; j < this.structures[i].systems.length; j++){
				if (! this.structures[i].systems[j].destroyed){
					if (this.structures[i].systems[j].getActiveWeapon().name == name){
						if (this.structures[i].systems[j].weapon && this.structures[i].systems[j].hasUnresolvedFireOrder() == hasFire){
							this.structures[i].systems[j].select(e);
						}
					}
				}
			}
		}
		return;
	}
	this.getBaseHitChance = function(){
		var min = 0; var max = 0;
		var p = 1.5;
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
		return Math.ceil(this.getBaseHitChance());
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

Flight.prototype = Object.create(Mixed.prototype);

Flight.prototype.setTarget = function(){
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

					//var vector = new Vector(target, target.nextStep);
					//var speedMod = this.getCurrentImpulse() / target.getCurrentImpulse();
					//this.finalStep = getIntercept(this, target, vector, speedMod);

				}

			}
			else if (target.salvo){
			}
		}
	}

	this.facing = getAngleFromTo(this, this.nextStep);
}

function Fighter(data){
	this.id = data.id;
	this.name = data.name;
	this.display = data.display;
	this.ep = data.ep;
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
	this.draw = true;
	this.layout = {};

	for (var i = 0; i < data.crits.length; i++){
		this.crits.push(new Crit(data.crits[i]))
	}
	
	this.isDestroyedThisTurn = function(){
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
	
	this.isDamagedThisTurn = function(){
		for (var i = this.damages.length-1; i >= 0; i--){
			if (this.damages[i].turn == game.turn){
				return true;
			} else if (this.damages[i].turn < game.turn){
				return false;
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
			div.className = this.id + " flight";

			var table = $("<table>")
				.append($("<tr>").append($("<th>").attr("colspan", 2).html(this.name)))
				.append($("<tr>").append($("<td>").html("Mass / Turn Delay").css("width", 120)).append($("<td>").html(this.mass)))
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

Flight.prototype.switchMissionMode = function(){
	if (game.mission){this.disableMissionMode();}
	else this.enableMissionMode();
}

Flight.prototype.disableMissionMode = function(){
	game.mission = 0;
	$(this.element).find(".header").css("height", "130px").find("tr").slice(-3)
	.each(function(i){
		if (!i){
			$(this).children()[0].innerHTML = "Disengage from Mission";
		} else $(this).addClass("disabled").removeClass("selected");
	});
}


Flight.prototype.enableMissionMode = function(){
	game.mission = new Mission(this);
	$(this.element).find(".header").css("height", "auto").find("tr").slice(-3)
	.each(function(i){
		if (!i){
			$(this).children()[0].innerHTML = "Select new Mission";
		} else $(this).removeClass("disabled");
	});
}

Flight.prototype.getArmourString = function(a){
	if (a >= 330 || a <= 30){
		return this.structures[0].negation[0];
	} else if (a > 150 && a < 210){
		return this.structures[0].negation[1];
	} else return this.structures[0].negation[2];
}


Flight.prototype.drawMovePlan = function(){
	Salvo.prototype.drawMovePlan.call(this);
	this.drawMissionArea();
}

Flight.prototype.drawMovePlana = function(){
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
		planCtx.strokeStyle = "white";
		planCtx.stroke();
		planCtx.beginPath();
		planCtx.moveTo(step.x, step.y);
	}

	planCtx.lineTo(target.x, target.y);
	planCtx.closePath();
	planCtx.strokeStyle = "#00ea00";
	if (!this.friendly){
		planCtx.strokeStyle = "red";
	}
	planCtx.stroke();
	planCtx.setTransform(1,0,0,1,0,0);
}

Flight.prototype.drawMissionArea = function(){
	if (this.mission.type != 1){
		return;
	}

	planCtx.translate(cam.o.x, cam.o.y);
	planCtx.scale(cam.z, cam.z);
	planCtx.beginPath();
	planCtx.moveTo(origin.x, origin.y);
	planCtx.beginPath();			
	planCtx.arc(this.mission.x, this.mission.y, this.size/2, 0, 2*Math.PI, false);
	planCtx.closePath();
	planCtx.fillStyle = "green";
	planCtx.globalAlpha = 0.3;
	planCtx.fill();
	planCtx.globalAlpha = 1;
	planCtx.setTransform(1,0,0,1,0,0);
}

Flight.prototype.getShortInfo = function(){
	var ele = $("#shortInfo");
	if (game.phase > -2 && this.userid == game.userid){
		$(ele).attr("class", "friendly");
	} else $(ele).attr("class", "hostile");

	var baseHit = this.getBaseHitChance();
	var impulse = this.getCurrentImpulse();
	
	var table = document.createElement("table");
		table.insertRow(-1).insertCell(-1).innerHTML = "Flight #" + this.id + " (" +game.getUnitType(this.traverse) + ")";
		table.insertRow(-1).insertCell(-1).innerHTML =  "Thrust: " + impulse + " (" + round(impulse / this.getBaseImpulse(), 2) + ")";
		table.insertRow(-1).insertCell(-1).innerHTML = "Base Hit: " +  this.getBaseHitChance() + "% ";
	
	if (!this.mission.arrived && game.phase < 1 && this.inRange()){
		table.insertRow(-1).insertCell(-1).innerHTML = "<span class='red'>ARRIVAL IMMINENT</span>";
	}

	return table;
}


Flight.prototype.getParent = function(){
	if (this.cc.length){
		for (var j = 0; j < this.cc.length; j++){
			for (var i = 0; i < game.ships.length; i++){
				if (this.cc[j] == game.ships[i].id && game.ships[i].ship){
					return game.ships[i];
				}
			}
		}
	}
	return this;	
}

Flight.prototype.getTargetPosition = function(){
	return Salvo.prototype.getTargetPosition.call(this);
}

Flight.prototype.inRange = function(){
	return Salvo.prototype.inRange.call(this);
}

Flight.prototype.getTarget = function(){
	return game.getUnitById(this.mission.targetid);	
}