window.graphics = {

	images: [],
	explos: [],
	eMine: [],

	preload: function(){
		this.preLoadBallistics();
		this.preloadShips();
		this.preLoadFighters();
		this.preLoadFactions();
		this.preLoadVarious();
		this.preloadExplos();
	},

	preloadExplos: function(){
		var basePath = "varIcons/explos/";
		var alt = [1, 2, 3, 4, 5];

		for (var i = 0; i < alt.length; i++){
			var img = new Image();
				img.src = basePath + alt[i] + ".png";
			this.explos.push(img);
		}

		var img = new Image();
			img.src = basePath + "eMine_1.png";
		this.eMine.push(img);
		var img = new Image();
			img.src = basePath + "eMine_2.png";
		this.eMine.push(img);
	},

	preLoadVarious: function(){
		this.images.redVortex = new Image();
		this.images.redVortex.src = "varIcons/redVortex.png";
		this.images.blueVortex = new Image();
		this.images.blueVortex.src = "varIcons/blueVortex.png";
	},

	preLoadBallistics: function(){
		this.images.missile = new Image();
		this.images.missile.src = "shipIcons/missile.png";
		this.images.torpedo = new Image();
		this.images.torpedo.src = "shipIcons/torpedo.png";
	},

	preloadShips: function(){
		this.images.battlecrab = new Image();
		this.images.battlecrab.src = "shipIcons/omega.png";

		this.images.squadron = new Image();
		this.images.squadron.src = "shipIcons/squadron.png";

		this.images.omega = new Image();
		this.images.omega.src = "shipIcons/omega.png";

		this.images.avenger = new Image();
		this.images.avenger.src = "shipIcons/avenger.png";

		this.images.hyperion = new Image();
		this.images.hyperion.src = "shipIcons/hyperion.png";

		this.images.saggitarius = new Image();
		this.images.saggitarius.src = "shipIcons/saggitarius.png";

		this.images.artemis = new Image();
		this.images.artemis.src = "shipIcons/artemis.png";

		this.images.olympus = new Image();
		this.images.olympus.src = "shipIcons/olympus.png";

		this.images.crius = new Image();
		this.images.crius.src = "shipIcons/crius.png";

		this.images.tethys = new Image();
		this.images.tethys.src = "shipIcons/tethys.png";


		this.images.primus = new Image();
		this.images.primus.src = "shipIcons/primus.png";
		
		this.images.tech = new Image();
		this.images.tech.src = "shipIcons/primus.png";

		this.images.octurion = new Image();
		this.images.octurion.src = "shipIcons/octurion.png";

		this.images.altarian = new Image();
		this.images.altarian.src = "shipIcons/altarian.png";

		this.images.demos = new Image();
		this.images.demos.src = "shipIcons/demos.png";

		this.images.darkner = new Image();
		this.images.darkner.src = "shipIcons/darkner.png";

		this.images.vorchar = new Image();
		this.images.vorchar.src = "shipIcons/vorchar.png";

		this.images.vorchan = new Image();
		this.images.vorchan.src = "shipIcons/vorchan.png";

		this.images.mograth = new Image();
		this.images.mograth.src = "shipIcons/mograth.png";

		this.images.haven = new Image();
		this.images.haven.src = "shipIcons/haven.png";


		this.images.gquan = new Image();
		this.images.gquan.src = "shipIcons/gquan.png";

		this.images.katoc = new Image();
		this.images.katoc.src = "shipIcons/katoc.png";

		this.images.dagkar = new Image();
		this.images.dagkar.src = "shipIcons/dagkar.png";

		this.images.thentus = new Image();
		this.images.thentus.src = "shipIcons/thentus.png";

		this.images.shokos = new Image();
		this.images.shokos.src = "shipIcons/shokos.png";


		this.images.sharlin = new Image();
		this.images.sharlin.src = "shipIcons/sharlin.png";

		this.images.tinashi = new Image();
		this.images.tinashi.src = "shipIcons/tinashi.png";

		this.images.whitestar = new Image();
		this.images.whitestar.src = "shipIcons/whitestar.png";
	},

	preLoadFighters: function(){
		this.images.aurora = new Image();
		this.images.aurora.src = "shipIcons/aurora.png";

		this.images.thunderbolt = new Image();
		this.images.thunderbolt.src = "shipIcons/thunderbolt.png";

		this.images.sitaraion = new Image();
		this.images.sitaraion.src = "shipIcons/sitaraion.png";

		this.images.sitaraplasma = new Image();
		this.images.sitaraplasma.src = "shipIcons/sitaraplasma.png";

		this.images.sentri = new Image();
		this.images.sentri.src = "shipIcons/sentri.png";

		this.images.nial = new Image();
		this.images.nial.src = "shipIcons/nial.png";

		this.images.gorith = new Image();
		this.images.gorith.src = "shipIcons/gorith.png";

		this.images.frazi = new Image();
		this.images.frazi.src = "shipIcons/frazi.png";
	},

	preLoadFactions: function(){
		this.images.earth = new Image();
		this.images.earth.src = "factionIcons/earth.png";
		this.images.centauri = new Image();
		this.images.centauri.src = "factionIcons/centauri.png";
		this.images.minbari = new Image();
		this.images.minbari.src = "factionIcons/minbari.png";
		this.images.narn = new Image();
		this.images.narn.src = "factionIcons/narn.png";
	}
}

function drawVector(origin, target, dist, angle){
	mouseCtx.clearRect(0, 0, res.x, res.y);
	mouseCtx.beginPath();
	mouseCtx.moveTo(origin.x * cam.z + cam.o.x, origin.y * cam.z + cam.o.y);
	mouseCtx.lineTo(target.x, target.y);
	mouseCtx.closePath();
	mouseCtx.strokeStyle = "white";
	mouseCtx.lineWidth = 2;
	mouseCtx.stroke();

	if (angle > 180){
		angle = (360-angle) *-1;
	}

	$("#vectorDiv").html("Distance: " + dist + " </br>Angle: " + Math.round(angle))
	.css("left", target.x- 45 + "px")
	.css("top", target.y + 40 + "px")
	.removeClass("disabled");
}

function drawProjectile(weapon, anim){

	var x = anim.ox + anim.nx * anim.n;
	var y = anim.oy + anim.ny * anim.n;
	var trailEnd = getPointInDir(weapon.projSize*2.5, anim.f, x, y);
	var w = 1;

	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z)

	if (anim.n/anim.m > 0.7){
		w -= 2*(anim.n/anim.m- 0.7);
	}

	fxCtx.globalAlpha = w
	fxCtx.beginPath();
	fxCtx.moveTo(x, y);
	fxCtx.lineTo(trailEnd.x, trailEnd.y);
	fxCtx.closePath();
	fxCtx.strokeStyle = weapon.animColor;
	fxCtx.lineWidth = weapon.projSize/2;
	fxCtx.stroke();

	fxCtx.globalCompositeOperation = "lighter";
	fxCtx.strokeStyle = "white";
	fxCtx.lineWidth = weapon.projSize/4;
	fxCtx.stroke();
	fxCtx.closePath();
	fxCtx.globalCompositeOperation = "source-over";
	fxCtx.setTransform(1,0,0,1,0,0);

	if (anim.n >= anim.m && anim.h){
		anim.p = 1;
		anim.n = 0;
		anim.m = 36;
	}
}

function drawAreaProjectile(weapon, anim){

	var x = anim.ox + anim.nx * anim.n;
	var y = anim.oy + anim.ny * anim.n;
	var trailEnd = getPointInDir(weapon.projSize*2.5, anim.f, x, y);
	var w = 1;

	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z)

	if (anim.n/anim.m > 0.7){
		w -= 2*(anim.n/anim.m- 0.7);
	}

	fxCtx.globalAlpha = w
	fxCtx.beginPath();
	fxCtx.moveTo(x, y);
	fxCtx.lineTo(trailEnd.x, trailEnd.y);
	fxCtx.closePath();
	fxCtx.strokeStyle = weapon.animColor;
	fxCtx.lineWidth = weapon.projSize/2;
	fxCtx.stroke();

	fxCtx.globalCompositeOperation = "lighter";
	fxCtx.strokeStyle = "white";
	fxCtx.lineWidth = weapon.projSize/4;
	fxCtx.stroke();
	fxCtx.closePath();
	fxCtx.globalCompositeOperation = "source-over";
	fxCtx.setTransform(1,0,0,1,0,0);

	if (anim.n >= anim.m){
		anim.p = 1;
		anim.n = 0;
		anim.m = 36;
	}
}

function drawEMSpriteExplo(wpn, anim){
	var posX = anim.tx;
	var posY = anim.ty;
	var img = graphics.explos[4];
	var s = wpn.exploSize*10;
	var now = anim.n;
	var max = anim.m;

	now -= 1;
	var sin = s*0.5*Math.sin(Math.PI*now/max);
	if (sin < 0){return;}

	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z)

	var res = 1024;
	var rows = 6;
	var cols = 6;
	var w = res/rows;
	var h = res/cols;

	var x = ((now/rows) - Math.floor(now/rows)) * res;
	var y = res / cols * Math.floor(now/cols) 

	fxCtx.globalAlpha = 1.5 - (now/max);
	fxCtx.drawImage(img, x, y, w, h, posX-s/2, posY-s/2, s, s);
	fxCtx.globalAlpha = 1;

	fxCtx.setTransform(1,0,0,1,0,0);
}	

function drawBaseSpriteExplo(wpn, anim){
	var posX = anim.tx;
	var posY = anim.ty;
	var img = graphics.explos[0];
	var s = wpn.exploSize*5;
	var now = anim.n;
	var max = anim.m;

	now -= 1;
	var sin = s*0.5*Math.sin(Math.PI*now/max);
	if (sin < 0){return;}

	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z)

	var res = 512
	var rows = 8;
	var cols = 8;
	var w = res/rows;
	var h = res/cols;

	var x = ((now/rows) - Math.floor(now/rows)) * res;
	var y = res / cols * Math.floor(now/cols) 

	fxCtx.globalAlpha = 1.5 - (now/max);
	fxCtx.drawImage(img, x, y, w, h, posX-s/2, posY-s/2, s, s);
	fxCtx.globalAlpha = 1;

	fxCtx.setTransform(1,0,0,1,0,0);
}					
//function drawExplosion(weapon, x, y, now, max, explo){  // 150, 150, 30
function drawExplosion(weapon, anim, frames){  // 150, 150, 30
	var fraction = (anim.n-anim.m)/(frames);
	var sin = weapon.exploSize*1*Math.sin(Math.PI*fraction);
	if (sin < 0){
		return;
	}

	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z)
	fxCtx.globalAlpha = 1.5 - fraction;

	var outer = "";
	var mid = "";
	var inner = "";

	/*if (weapon instanceof EM){
		outer = "rgb(95,125,255)";
		mid = "rgb(95,125,255)";
		inner = "rgb(255,255,255)";
	}
	else if (weapon instanceof Plasma){
		outer ="rgb(150,255,0)";
		mid = "rgb(255,200,0)";
		inner = "rgb(150,150,0)";
	}
	else {*/
		outer ="rgb(255,225,75)";
		mid = "rgb(255,200,0)";
		inner = "rgb(255,0,0)";
	//}

	fxCtx.beginPath(); fxCtx.arc(anim.tx, anim.ty, sin, 0, 2*Math.PI); fxCtx.closePath(); fxCtx.fillStyle = outer; fxCtx.fill();
	fxCtx.beginPath(); fxCtx.arc(anim.tx, anim.ty, sin*0.66, 0, 2*Math.PI); fxCtx.closePath(); fxCtx.fillStyle = mid; fxCtx.fill();
	fxCtx.beginPath(); fxCtx.arc(anim.tx, anim.ty, sin*0.35, 0, 2*Math.PI); fxCtx.closePath(); fxCtx.fillStyle = inner; fxCtx.fill();

	/*if (weapon instanceof Plasma){
		for (i = 0; i < 6; i++){
			var d = getPointInDir(2*sin, 360/6*i + range(-15, 15), x, y)

			fxCtx.beginPath();
			fxCtx.moveTo(x, y);
			fxCtx.lineTo(d.x, d.y);
			fxCtx.strokeStyle = "orange";
			fxCtx.lineWidth = 1;
			fxCtx.stroke();
			fxCtx.closePath()
		}
	}
	if (weapon instanceof Plasma){
		for (i = 0; i < 4; i++){
			var d = getPointInDir((3 + range(-1, 1))*sin, (getAngle(anim.ox, anim.oy, anim.tx, anim.ty)+(180-(4/2*10) + i*10)), anim.tx, anim.ty)

			fxCtx.beginPath();
			fxCtx.moveTo(anim.tx, anim.ty);
			fxCtx.lineTo(d.x, d.y);
			fxCtx.strokeStyle = "orange";
			fxCtx.lineWidth = 1;
			fxCtx.stroke();
			fxCtx.closePath()
		}
	}*/

	fxCtx.globalAlpha = 1;
	fxCtx.setTransform(1,0,0,1,0,0);
}

function drawUnitExplo(posX, posY, img, s, now, max){
	now -= 1;
	var sin = s*0.5*Math.sin(Math.PI*now/max);
	if (sin < 0){return;}	

	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z)

	var res = 512
	var rows = 8;
	var cols = 8;
	var w = res/rows;
	var h = res/cols;

	var x = ((now/rows) - Math.floor(now/rows)) * res;
	var y = res / cols * Math.floor(now/cols) 

	fxCtx.globalAlpha = 1.5 - (now/max);
	fxCtx.drawImage(img, x, y, w, h, posX-s/2, posY-s/2, s, s);
	fxCtx.globalAlpha = 1;

	fxCtx.setTransform(1,0,0,1,0,0);
}

function drawAreaEffect(anim){
	var size = 110 / anim.m * anim.n;

	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z)
	fxCtx.globalAlpha = 1.3- anim.n / anim.m;
	fxCtx.drawImage(graphics.eMine[1], anim.tx -size/2, anim.ty -size/2, size, size);
	fxCtx.globalAlpha = 1;
	fxCtx.setTransform(1,0,0,1,0,0);

	if (anim.n >= anim.m){
		anim.done = true;
	}
}

function drawUnitExploa(x, y, s, now, max){
	var sin = s*0.5*Math.sin(Math.PI*now/max);
	if (sin < 0){
		return;
	}

	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z)

	fxCtx.globalAlpha = 1.5 - (now/max);

	fxCtx.beginPath(); fxCtx.arc(x, y, sin, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "rgb(255,225,75)"; fxCtx.fill();
	fxCtx.beginPath(); fxCtx.arc(x, y, sin/3*2, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "rgb(255,200,0)"; fxCtx.fill();
	fxCtx.beginPath(); fxCtx.arc(x, y, sin/4, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "rgb(255,0,0)"; fxCtx.fill();

	fxCtx.globalAlpha = 1;
	fxCtx.setTransform(1,0,0,1,0,0);
}

function drawBeam(weapon, fire){
	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z)

	var fraction = fire.n/fire.m;
	var charge =  0.5 - 0.3*Math.cos(2*Math.PI*fraction);

	fxCtx.globalAlpha = 1;
	fxCtx.beginPath();
	fxCtx.arc(fire.ox, fire.oy, weapon.beamWidth*charge, 0, 2*Math.PI);
	fxCtx.closePath();	
	fxCtx.fillStyle = weapon.animColor;
	fxCtx.fill();

	fxCtx.beginPath();
	fxCtx.arc(fire.ox, fire.oy, weapon.beamWidth/2*charge, 0, 2*Math.PI);
	fxCtx.closePath();
	fxCtx.globalCompositeOperation = "lighter";
	fxCtx.fillStyle = "white";
	fxCtx.fill();	

	var x = fire.tax + fire.nx * fire.n;
	var y = fire.tay + fire.ny * fire.n;

	if (fraction > 0.3){
		var beamW = 0.5 + 0.5 * Math.cos(2*Math.PI*fraction);
		fxCtx.lineCap = "round";	
		fxCtx.beginPath();
		fxCtx.moveTo(fire.ox, fire.oy);
		fxCtx.lineTo(x, y);
		fxCtx.closePath();

		fxCtx.globalAlpha = 1 - beamW;
		fxCtx.globalCompositeOperation = "source-over";
		fxCtx.lineWidth = weapon.beamWidth * 0.5 + weapon.beamWidth * beamW;
		fxCtx.strokeStyle = weapon.animColor;
		fxCtx.stroke();

		fxCtx.globalCompositeOperation = "lighter";
		fxCtx.lineWidth = 1 + 1* beamW;
		fxCtx.strokeStyle = "white";
		fxCtx.stroke();
		if (fire.h){
			drawBeamExplosion(weapon, x, y, fraction);
		}
	}
		
	fxCtx.globalCompositeOperation = "source-over";
	fxCtx.lineCap = "butt";
	fxCtx.setTransform(1,0,0,1,0,0);
}

function drawBeamExplosion(weapon, x, y, fraction){
	fxCtx.globalAlpha = 1.5 - fraction;
	fxCtx.globalCompositeOperation = "source-over";

	for (var i = 0; i < 1; i++){
		var subX = x + range(-2, 3);
		var subY = y + range(-2, 3);
		var subS = weapon.exploSize + (range(-weapon.exploSize*.15, weapon.exploSize*.15));

		fxCtx.beginPath(); fxCtx.arc(x, y, subS, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "rgb(255,255,155)"; fxCtx.fill();
		fxCtx.beginPath(); fxCtx.arc(x, y, subS/3*2, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "orange"; fxCtx.fill();
		fxCtx.beginPath(); fxCtx.arc(x, y, subS/4, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "red"; fxCtx.fill();
	}
	fxCtx.globalAlpha = 1;
}

function drawCircle(x, y, s, op, color){
	ctx.globalCompositeOperation = op;
	ctx.beginPath();
	ctx.arc(x, y, s, 0, 2*Math.PI, false);
	ctx.closePath();
	ctx.fillStyle = color;
	ctx.fill();
}


function getRadialGradient(x, y, s){
	var grad = fxCtx.createRadialGradient(x, y, 0, x, y, s);
		/*
		grad.addColorStop(0, "white");
		grad.addColorStop(0.3, "yellow");
		grad.addColorStop(0.8, "orange");
		grad.addColorStop(1, "red");
		*/

		grad.addColorStop(0.25, "red");
		grad.addColorStop(0.4, "orange");
		grad.addColorStop(1, "rgba(255,255,0,0)");
	return grad;
}	

function drawSensorArc(w, d, str, loc, facing, a, sensor){
	//console.log("drawSensorArc");
	if (game.sensorMode){salvoCtx.clearRect(0, 0, res.x, res.y);}
	salvoCtx.translate(cam.o.x, cam.o.y);
	salvoCtx.scale(cam.z, cam.z);
	var color = "";
	var opacity = 0.2;
	switch (sensor.ew[sensor.ew.length-1].type){
		case 0: color = "red"; break;
		case 1: color = "blue"; break;
		case 2: color = "blue"; opacity = 0.1; break;
		case 3: color = "blue"; opacity = 0.1; break;
	}

	//salvoCtx.clearRect(0, 0, res.x, res.y);
	//salvoCtx.translate(cam.o.x, cam.o.y);
	//salvoCtx.scale(cam.z, cam.z);

	//w = Math.ceil(w);	
	//console.log(w);
	if (w == 180){
		salvoCtx.beginPath();
		salvoCtx.arc(loc.x, loc.y, d, 0, 2*Math.PI, false);
		salvoCtx.closePath();
	}
	else {
		var start = addAngle(0 + w-facing, a);
		var end = addAngle(360 - w-facing, a);
		var p1 = getPointInDir(str, start, loc.x, loc.y);
		var rad1 = degreeToRadian(start);
		var rad2 = degreeToRadian(end);
		salvoCtx.beginPath();			
		salvoCtx.moveTo(loc.x, loc.y);
		salvoCtx.lineTo(p1.x, p1.y); 
		salvoCtx.arc(loc.x, loc.y, d, rad1, rad2, false);
		salvoCtx.closePath();
	}

	salvoCtx.globalAlpha = opacity;
	salvoCtx.fillStyle = color;
	salvoCtx.fill();
	salvoCtx.globalAlpha = 1;
	salvoCtx.setTransform(1,0,0,1,0,0);

	if (game.shortInfo){
		game.getUnit(game.shortInfo).drawEW();
	}
	game.drawEvents()
}