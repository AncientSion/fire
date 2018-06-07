


window.cam = {
	o: {x: 0, y: 0},
	z: 1,
	scroll: 0,
	sx: 0,
	sy: 0,
	tx: 0,
	ty: 0,
	
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

	setFocusToPos(pos){
		this.o.x = res.x/2 - (pos.x*cam.z);
		this.o.y = res.y/2 - (pos.y*cam.z);
	},

	setZoom: function(val){
		this.z = val;

		if (game.phase == 3 && game.animating){
			for (var i = 0; i < game.fireOrders.length; i++){
				if (!game.fireOrders[i].animated && game.fireOrders[i].animating){
					this.setFocusToPos(game.fireOrders[i].target.getPlannedPos());
					game.draw();
					break;
				}
			}
		}
		//game.draw();
	},
	
	adjustZoom: function(e, pos){
		if (e.originalEvent.wheelDelta == 120 || e.originalEvent.deltaY < 0){
			this.z = Math.min(2, this.z + 0.2);
		}
		else {
			this.z = Math.max(0.4, this.z - 0.2);
		}
		game.redraw();
	},

	setFireFocus: function(fire){
		if (fire.dist == 0){
			this.z = 2.5
		}
		else if (fire.dist <= 100){
			this.z = 2;
		}
		else if (fire.dist > res.x / 2 || fire.dist > res.y){
			this.z = Math.floor( (res.x / 2) / fire.dist * 15)/10;
		}
		else this.z = 1;

		var origin = fire.shooter.getPlannedPos();
		var target = fire.target.getPlannedPos();

		var centerX = (target.x + origin.x) / 2;
		var centerY = (target.y + origin.y) / 2;

		this.setFocusToPos({x: centerX, y: centerY}); return;

		if (fire.targetid == -1){this.setFocusToPos({x: fire.x, y: fire.y});}
		else this.setFocusToPos(fire.target.getPlannedPos());
		//game.draw();
	}
}

function Turn(){
	this.id;
	this.a;
	this.mod;
	this.cost;
	this.delay;
	this.step = 0.2;
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
		this.mod = 1;
		this.cost = 1;
		this.delay = unit.baseTurnDelay;
		this.max = unit.getMaxTurnAngle();
		this.dif = round(unit.getCurSpeed() / unit.getBaseImpulse(), 1);
	}

	this.alter = function(unit, turn){
		this.id = unit.id;
		this.a = Math.abs(turn.a);
		this.mod = turn.costmod;
		this.cost = 1;
		this.delay = unit.baseTurnDelay;
		this.max = unit.getMaxTurnAngle();
		this.dif = round(unit.getCurSpeed() / unit.getBaseImpulse(), 1);
	}
}