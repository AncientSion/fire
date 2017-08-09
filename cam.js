window.cam = {
	o: {x: 0, y: 0},
	z: 1,
	scroll: 0,
	sx: 0,
	sy: 0,
	
	getOffset: function(){
		return {x: this.o.x * this.z, y: this.o.y * this.z};
	},

	getFocus: function(){
		return {x: res.x/2 - this.o.x, y: res.y/2 - this.o.y};
	},

	setFocus: function(x, y){
		this.o.x = res.x/2 - x;
		this.o.y = res.y/2 - y;
	},

	setZoom: function(val){
		this.z = val;
		//game.draw();
	},
	
	adjustZoom: function(e, pos){
		if (e.originalEvent.wheelDelta == 120) {
			this.z = Math.min(2, this.z + 0.2);
		}
		else {
			this.z = Math.max(0.4, this.z - 0.2);
		}

		game.redraw();
	}	
}

function Turn(){
	this.id;
	this.a;
	this.mod;
	this.cost;
	this.delay;
	this.step = 0.1;
	this.max;
	this.dif

	this.reset = function(){
		//this.id = 0;
		this.a = 0;
		this.mod = 1;
		this.cost = 0;
		this.delay = 0;
	}

	this.set = function(unit){
		this.id = unit.id;
		this.a = 0;
		this.mod = 1;
		this.cost = unit.baseTurnCost;
		this.delay = unit.baseTurnDelay;
		this.max = unit.getMaxTurnAngle();
		this.dif = round(unit.getCurrentImpulse() / unit.getBaseImpulse(), 1);
	}

	this.alter = function(unit, turn){
		this.id = unit.id;
		this.a = Math.abs(turn.a);
		this.mod = turn.costmod;
		this.cost = unit.baseTurnCost;
		this.delay = unit.baseTurnDelay;
		this.max = unit.getMaxTurnAngle();
		this.dif = round(unit.getCurrentImpulse() / unit.getBaseImpulse(), 1);
	}
}