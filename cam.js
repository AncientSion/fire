


window.cam = {
	o: {x: 0, y: 0},
	c: {x: 0, y: 0},
	z: 1,
	scroll: 0,
	sx: 0,
	sy: 0,
	doing: 0,
	tx: 0,
	ty: 0,
	vx: 0,
	vy: 0,
	steps: 0,
	state: 0,
	
	getOffset: function(){
		return {x: this.o.x * this.z, y: this.o.y * this.z};
	},

	setCamFocus(focus, instant){

		this.tx = Math.floor(res.x/2 - (focus.x*cam.z));
		this.ty = Math.floor(res.y/2 - (focus.y*cam.z));

		if (instant){
			this.o.x = this.tx;
			this.o.y = this.ty;
			game.redraw();
			game.getCallback(); 
			return;
		}

		this.vx = this.tx - this.o.x;
		this.vy = this.ty - this.o.y;

		this.steps = Math.ceil(Math.max(Math.abs(this.vx), Math.abs(this.vy))/10)

		this.state = (this.steps <= 5 ? 2 : 1); // 1 pan // 2 pause, 3 done
		window.then = Date.now();
		game.shiftCam();
	},

	doProgress: function(){
		this.doing++;

		if (this.state == 1){
			this.o.x += (this.vx/this.steps);
			this.o.y += (this.vy/this.steps);
		}

		game.redraw();

		if (this.doing == this.steps){
			this.doing = 0;
			this.steps = 30;
			this.state++;
		}
	},

	isDone: function(){
		if (this.state == 3){
			this.stopMove();
			return true;
		}
		return false;
	},

	setFocusToPos(pos){
		console.log("------setFocusToPos");
		console.log(this.c);
		console.log(this.o);
		this.o.x = Math.floor(res.x/2 - (pos.x*cam.z));
		this.o.y = Math.floor(res.y/2 - (pos.y*cam.z));
		this.c = pos;
		game.redraw();
	},

	setZoom: function(fire){
		var a = fire.anim[0].length ? Math.abs(fire.anim[0][0].f) : 0;

		if (fire.dist == 0){
			this.z = 2.5
		}
		else if (fire.dist <= 150){
			this.z = 2;
		}
		else if (a >= 135 || a <= 45){
			this.z = Math.min(2, Math.floor( (res.x / 1.25) / fire.dist * 10)/10);
		}
		else if (a > 45 || a <= 135){
			this.z = Math.min(2, Math.floor( (res.y / 1.25) / fire.dist * 10)/10);
		}
		else this.z = 1.5;
	},

	stopMove: function(){
		this.state = 0;
		this.doing = 0;
		this.tx = 0;
		this.ty = 0;
		this.vx = 0;
		this.vy = 0;
	},
	
	adjustZoom: function(e){
		if (e.originalEvent.wheelDelta == 120 || e.originalEvent.deltaY < 0){
			this.z = Math.min(3, this.z + 0.2);
		}
		else {
			this.z = Math.max(0.2, this.z - 0.2);
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