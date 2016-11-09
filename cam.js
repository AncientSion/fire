window.cam = {
	z: 1,
	o: {x: 0, y: 0},
	zoom: {
			scale: 1,
			screen: {x: 0, y: 0},
			world: {x: 0, y: 0}
	},
	mouse: {
		screen: {x: 0, y: 0},
		world: {x: 0, y: 0}
	},
	scale: {
		length : function(number) {
			return Math.floor(number * cam.zoom.scale);
		},
		x : function(number) {
			return Math.floor((number - cam.zoom.world.x) * cam.zoom.scale + cam.zoom.screen.x);
		},
		y : function(number) {
			return Math.floor((number - cam.zoom.world.y) * cam.zoom.scale + cam.zoom.screen.y);
		},
		x_INV : function(number) {
			return Math.floor((number - cam.zoom.screen.x) * (1 / cam.zoom.scale) + cam.zoom.world.x);
		},
		y_INV : function(number) {
			return Math.floor((number - cam.zoom.screen.y) * (1 / cam.zoom.scale) + cam.zoom.world.y);
		},
	},

	setFocus: function(x, y){
		console.log(this.o.x, this.o.y)
		this.o.x = res.x/2 - x;
		this.o.y =  res.y/2 - y;
		console.log(this.o.x, this.o.y)
	},
	
	doScroll: function(pos){
		this.o.x -= pos.x - res.x/2;
		this.o.y -= pos.y - res.y/2;
	},
	
	adjustZoom: function(e){
	//	console.log(e.originalEvent.wheelDelta)
		
		if (e.originalEvent.wheelDelta == 120){
			this.z++;
		}
		else {
			if (this.z > 1){
				this.z--;
			}
		}
	},
	
	
		/*this.trackMouse(pos);
		this.trackWheel(e);
		this.adjustScale();*/
	
	trackMouse: function(pos){
		this.mouse.screen.x	= pos.x;
		this.mouse.screen.y	= pos.y;
		this.mouse.world.x	= this.scale.x_INV(this.mouse.screen.x);
		this.mouse.world.y	= this.scale.y_INV(this.mouse.screen.y);
	},
	
	trackWheel: function(e){
	//	console.log(e.deltaY);
		if (e.deltaY < 0) {
			this.zoom.scale = Math.min(5, this.zoom.scale * 1.1);
		}
		else {
			this.zoom.scale = Math.max(0.1, this.zoom.scale * (1/1.1));
		}
	//	console.log(this.zoom.scale);
	},
	
	adjustScale: function(){
	  this.zoom.screen.x = this.mouse.screen.x;
	  this.zoom.screen.y = this.mouse.screen.y;
	  this.zoom.world.x	= this.mouse.world.x;
	  this.zoom.world.y	= this.mouse.world.y;
	  this.mouse.world.x = this.scale.x_INV(this.mouse.screen.x);
	  this.mouse.world.y = this.scale.y_INV(this.mouse.screen.y);
	},
	
	
	
}