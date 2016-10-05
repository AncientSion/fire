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

function FireOrder(shooterId, targetId, weaponId, dist){
	this.id = getFireOrderId();
	this.weaponId = weaponId;
	this.targetId = targetId;
	this.shooterId = shooterId;
	this.dist = dist;
	this.shots;
	this.guns;
	this.animated = false;
	this.anim = [];
	this.gunRolls = [];
}