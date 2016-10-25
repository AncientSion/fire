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

function Structure(id, parentId, start, end, armour, integrity, destroyed){
	this.name = "Structure";
	this.display = "Structure";
	this.id = id;
	this.parentId = parentId;
	this.start = start;
	this.end = end;
	this.armour = armour;
	this.integrity = integrity;
	this.destroyed = destroyed || false;
	this.systems = [];
	this.highlight = false;
	this.damages = [];

	this.getTableRow = function(){
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.className = "struct";
			td.innerHTML = this.name + " #" + (this.id);

		var div = document.createElement("div");
			div.className = "integrity";
			td.appendChild(div);

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
			td.innerHTML = this.getRemainingIntegrity(); tr.appendChild(td); table.appendChild(tr);
			
		var tr = document.createElement("tr");
		var td = document.createElement("td"); td.style.width = "40%";
			td.innerHTML = "Armour"; tr.appendChild(td);
		var td = document.createElement("td");
			td.innerHTML = this.armour; tr.appendChild(td); table.appendChild(tr);
			
		div.appendChild(table);
			
		return div;
	}

	this.getRemainingIntegrity = function(){
		var integrity = this.integrity;
		for (var i = 0; i < this.damages.length; i++){
			integrity -= this.damages[i].amount;
		}
		return integrity;
	}

}