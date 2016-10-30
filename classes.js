function Point(x, y){
	this.x = Math.floor(x);
	this.y = Math.floor(y);
	
	this.getOffset = function(){
	//	console.log({x: cam.scale.x(this.x - cam.o.x), y: cam.scale.y(this.y - cam.o.y)});
		return { x: this.x - cam.o.x, y: this.y - cam.o.y };
	}
}

function Move(type, dist, x, y, a, delay, cost, costmod){
	this.turn = game.turn;
	this.type = type;
	this.dist = dist;
	this.x = x;
	this.y = y;
	this.a = a;
	this.animated = false
	this.s = false;
	this.cost = cost || 0;
	this.delay = delay || 0;
	this.costmod = costmod || 1;
}

function Vector(a, b){
	this.x;
	this.y;
	this.nx;
	this.ny;
	this.m;
	this.t;
	
	this.setup = function(){
		this.x = b.x - a.x;
		this.y = b.y - a.y;
		
		var x = Math.pow(this.x, 2);
		var y = Math.pow(this.y, 2);
		var m = x + y;
		
		this.m = Math.sqrt(m);			
		this.nx = this.x/this.m;
		this.ny = this.y/this.m;
	}
	
	this.setup();
}

function Path (a, b){
	this.a = a;
	this.b = b;
	this.distance;
	this.animated = false;
	
	this.setup = function(){
		var a = this.a.x - this.b.x;
		var b = this.a.y - this.b.y;
		
		var a = Math.pow(a, 2);
		var b = Math.pow(b, 2);
		var c = a + b;
		var c = Math.sqrt(c);
		
		this.distance = Math.floor(c);
	}
	
	this.setup();
};

function FireOrder(id, shooterId, targetId, weaponId, turn){
	this.id = id;
	this.weaponId = weaponId;
	this.targetId = targetId;
	this.shooterId = shooterId;
	this.dist;
	this.shots;
	this.guns;
	this.animated = false;
	this.anim = [];
	this.turn = turn;
}

function Damage (id, fireid, gameid, shipid, structureid, turn, type, totalDmg, shieldDmg, structDmg, armourDmg, mitigation, destroyed, notes){
	this.id = id;
	this.fireid = fireid;
	this.gameid = gameid;
	this.shipid = shipid;
	this.structureid = structureid;
	this.turn = turn;
	this.type = type;
	this.totalDmg = totalDmg;
	this.shieldDmg = shieldDmg;
	this.structDmg = structDmg;
	this.armourDmg = armourDmg;
	this.mitigation = mitigation;
	this.destroyed = destroyed;
	this.notes = notes;
}

function Structure(id, parentId, start, end, integrity, armour, mitigation, destroyed){
	this.name = "Structure";
	this.display = "Structure";
	this.id = id;
	this.parentId = parentId;
	this.start = start;
	this.end = end;
	this.integrity = integrity;
	this.armour = armour;
	this.mitigation = mitigation;
	this.destroyed = destroyed || false;
	this.systems = [];
	this.highlight = false;
	this.damages = [];

	this.getTableRow = function(){
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.className = "struct";

		var rem = this.getRemainingIntegrity();

		var span = document.createElement("div");
			span.className = "integrityAmount";
			span.innerHTML = rem + " / " + this.integrity;
			td.appendChild(span);

		var lowerDiv = document.createElement("div");
			lowerDiv.className = "integrityNow";
			lowerDiv.style.width =  rem/this.integrity * 100 + "%";
			td.appendChild(lowerDiv);
			
		var upperDiv = document.createElement("div");
			upperDiv.className = "integrityFull";
			td.appendChild(upperDiv);

		$(td).data("shipId", this.parentId);
		$(td).data("systemId", this.id);
		$(td).hover(
			function(e){
				var shipId = $(this).data("shipId");
				var systemId = $(this).data("systemId");
				game.getShipById(shipId).getSystemById(systemId).hover();
			},
			function(e){
				var shipId = $(this).data("shipId");
				var systemId = $(this).data("systemId");
				game.getShipById(shipId).getSystemById(systemId).hover();
			}
		)
		$(td).click(function(e){
			var shipId = $(this).data("shipId");
			var systemId = $(this).data("systemId");
			console.log(game.getShipById(shipId).getSystemById(systemId).damages);
		})

			tr.appendChild(td);
			
		return tr;
	}

	this.getDirection = function(){
		var a = this.start;
		var b = this.end;
		var a;


		if (a > b){
		   c = a + b;
		}
		else {
		   c = (a + b) / 2;
		}

		if (a > 90 && b < -90 && a+b == 0){
			c = 180;
		}

		return c;
	}


	this.hover = function(){
		if (this.highlight){
			this.highlight = false;
			game.getShipById(this.parentId).highlightAllSelectedWeapons();
			this.hideInfoDiv();
		}
		else {
			this.highlight = true;
			this.showHitAxis();
			this.showInfoDiv();
		}
	}

	this.showHitAxis = function(){
		game.getShipById(this.parentId).drawStructureAxis(this);
	}

	this.showInfoDiv = function(){
		var div = this.getSystemDetailsDiv();
		var parentId = this.parentId;
		var id = this.id;
		
		var div = $(".shipDiv").each(function(i){
			if ($(this).data("shipId") == parentId){
				$(this).find(".struct").each(function(j){
					if ($(this).data("systemId") == id){
						var offset = $(this).offset();
						div.style.top = offset.top + 0 + "px";
						div.style.left = offset.left + 125 + "px";
						$("#game").append(div);
						return;
					}
				})
			}
		})
	}
	
	this.hideInfoDiv = function(){
		var div = document.getElementById("systemDetailsDiv");
			$(div).remove();
	}

	this.getSystemDetailsDiv = function(){
		var div = document.createElement("div");
			div.id = "systemDetailsDiv";
		var table = document.createElement("table");
			
		var tr = document.createElement("tr");
		var td = document.createElement("td"); td.style.width = "60%";
			td.innerHTML = "Integrity"; tr.appendChild(td);
		var td = document.createElement("td");

			td.innerHTML = this.getRemainingIntegrity() + " / " + this.integrity; tr.appendChild(td); table.appendChild(tr);
			
		var tr = document.createElement("tr");
		var td = document.createElement("td"); td.style.width = "40%";
			td.innerHTML = "Armour"; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = this.getRemainingArmour() + " / " + this.armour; tr.appendChild(td); table.appendChild(tr);

		var tr = document.createElement("tr");
		var td = document.createElement("td"); td.style.width = "40%";
			td.innerHTML = "Mitigation"; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = this.getRemainingMitigation() + "%" + " / " + this.mitigation + "%"; tr.appendChild(td); table.appendChild(tr);
			
		div.appendChild(table);
			
		return div;
	}

	this.getRemainingIntegrity = function(){
		var integrity = this.integrity;
		for (var i = 0; i < this.damages.length; i++){
			integrity -= this.damages[i].structDmg;
		}
		return integrity;
	}

	this.getRemainingArmour = function(){
		var armour = this.armour;
		for (var i = 0; i < this.damages.length; i++){
			armour -= this.damages[i].armourDmg;
		}
		return armour;
	}

	this.getRemainingMitigation = function(){
		return Math.round((Math.pow(this.getRemainingArmour(), 0.5) / Math.pow(this.armour, 0.5)) * this.mitigation);
	}

}