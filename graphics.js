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
		/*
		var basePath = ;
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
		*/
		this.EnergyMine = new Image();
		this.EnergyMine.src = "varIcons/explos/EnergyMine.png";
		this.GraviticMine = new Image();
		this.GraviticMine.src = "varIcons/explos/GraviticMine.png";
	},

	preLoadVarious: function(){
		this.images.redVortex = new Image();
		this.images.redVortex.src = "varIcons/redVortex.png";
		this.images.blueVortex = new Image();
		this.images.blueVortex.src = "varIcons/blueVortex.png";

		this.images.vector = new Image();
		this.images.vector.src = "varIcons/vector.png";

		this.images.collision = new Image();
		this.images.collision.src = "varIcons/collision.png";

		this.images.interference = new Image();
		this.images.interference.src = "varIcons/interference.png";

		this.images.rocks = [];

		for (var i = 1; i <= 11; i++){
			var img = new Image();
				img.src = "varIcons/rocks/rock" + i + ".png";
			this.images.rocks.push(img);
		}
	},

	preLoadBallistics: function(){
		this.images.missile = new Image();
		this.images.missile.src = "shipIcons/missile.png";
		this.images.torpedo = new Image();
		this.images.torpedo.src = "shipIcons/torpedo.png";
	},

	preloadShips: function(){

		this.images.squadron = new Image();
		this.images.squadron.src = "shipIcons/squadron.png";

		this.images.omega = new Image();
		this.images.omega.src = "shipIcons/omega.png";

		this.images.omegax = new Image();
		this.images.omegax.src = "shipIcons/omegax.png";

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

		this.images.hermes = new Image();
		this.images.hermes.src = "shipIcons/hermes.png";


		this.images.primus = new Image();
		this.images.primus.src = "shipIcons/primus.png";

		this.images.centurion = new Image();
		this.images.centurion.src = "shipIcons/centurion.png";
		
		this.images.tech = new Image();
		this.images.tech.src = "shipIcons/primus.png";

		this.images.octurion = new Image();
		this.images.octurion.src = "shipIcons/octurion.png";

		this.images.altarian = new Image();
		this.images.altarian.src = "shipIcons/altarian.png";

		this.images.demos = new Image();
		this.images.demos.src = "shipIcons/demos.png";

		this.images.kutai = new Image();
		this.images.kutai.src = "shipIcons/kutai.png";

		this.images.darkner = new Image();
		this.images.darkner.src = "shipIcons/darkner.png";

		this.images.vorchan = new Image();
		this.images.vorchan.src = "shipIcons/vorchan.png";

		this.images.vorchora = new Image();
		this.images.vorchora.src = "shipIcons/vorchan.png";

		this.images.mograth = new Image();
		this.images.mograth.src = "shipIcons/mograth.png";

		this.images.haven = new Image();
		this.images.haven.src = "shipIcons/haven.png";


		this.images.gquan = new Image();
		this.images.gquan.src = "shipIcons/gquan.png";

		this.images.katoc = new Image();
		this.images.katoc.src = "shipIcons/katoc.png";

		this.images.gsten = new Image();
		this.images.gsten.src = "shipIcons/gsten.png";

		this.images.varnic = new Image();
		this.images.varnic.src = "shipIcons/varnic.png";

		this.images.rongoth = new Image();
		this.images.rongoth.src = "shipIcons/rongoth.png";

		this.images.dagkar = new Image();
		this.images.dagkar.src = "shipIcons/dagkar.png";

		this.images.thentus = new Image();
		this.images.thentus.src = "shipIcons/thentus.png";

		this.images.trakk = new Image();
		this.images.trakk.src = "shipIcons/trakk.png";

		this.images.shokos = new Image();
		this.images.shokos.src = "shipIcons/shokos.png";

		this.images.sharlin = new Image();
		this.images.sharlin.src = "shipIcons/sharlin.png";

		this.images.tigara = new Image();
		this.images.tigara.src = "shipIcons/tigara.png";

		this.images.tinashi = new Image();
		this.images.tinashi.src = "shipIcons/tinashi.png";

		this.images.esharan = new Image();
		this.images.esharan.src = "shipIcons/tinashi.png";

		this.images.rolentha = new Image();
		this.images.rolentha.src = "shipIcons/rolentha.png";

		this.images.whitestar = new Image();
		this.images.whitestar.src = "shipIcons/whitestar.png";

		this.images.torotha = new Image();
		this.images.torotha.src = "shipIcons/torotha.png";

		this.images.shaveen = new Image();
		this.images.shaveen.src = "shipIcons/shaveen.png";		

		this.images.xill = new Image();
		this.images.xill.src = "shipIcons/xill.png";
		this.images.xvell = new Image();
		this.images.xvell.src = "shipIcons/xvell.png";
	},

	preLoadFighters: function(){
		this.images.aurora = new Image();
		this.images.aurora.src = "shipIcons/aurora.png";

		this.images.thunderbolt = new Image();
		this.images.thunderbolt.src = "shipIcons/thunderbolt.png";

		this.images.sitara = new Image();
		this.images.sitara.src = "shipIcons/sitara.png";

		this.images.sentri = new Image();
		this.images.sentri.src = "shipIcons/sentri.png";

		this.images.nial = new Image();
		this.images.nial.src = "shipIcons/nial.png";

		this.images.tishat = new Image();
		this.images.tishat.src = "shipIcons/tishat.png";

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
		this.images.vree = new Image();
		this.images.vree.src = "factionIcons/vree.png";
		this.images.shadows = new Image();
		this.images.shadows.src = "factionIcons/shadows.png";
	}
}

function drawVector(unit, origin, target, dist, angle){
	mouseCtx.clearRect(0, 0, res.x, res.y);
	mouseCtx.beginPath();
	mouseCtx.moveTo(origin.x * cam.z + cam.o.x, origin.y * cam.z + cam.o.y);
	mouseCtx.lineTo(target.x, target.y);
	mouseCtx.closePath();
	mouseCtx.strokeStyle = "white";
	mouseCtx.lineWidth = 2;
	mouseCtx.stroke();

	var fireAngle = angle;

	if (angle > 180){
		angle = (360-angle) *-1;
	}

	if (unit.obstacle){
		ui.vector.html("Distance: " + dist + " </br>Angle: " + round(angle, 2));
	} else ui.vector.html("Distance: " + dist + " </br>Angle: " + round(angle, 2) + "</br>Profile: " + game.getUnit(aUnit).getAngledHitChance(fireAngle) + "%");

	ui.vector
	.css("left", target.x - 45 + "px")
	.css("top", target.y + 60 + "px")
	.removeClass("disabled");
}

function drawFlightVector(origin, target, color, speed){

	mouseCtx.clearRect(0, 0, res.x, res.y);
	mouseCtx.beginPath();
	mouseCtx.moveTo(origin.x * cam.z + cam.o.x, origin.y * cam.z + cam.o.y);
	mouseCtx.lineTo(target.x * cam.z + cam.o.x, target.y * cam.z + cam.o.y);
	mouseCtx.closePath();
	mouseCtx.strokeStyle = color;
	mouseCtx.lineWidth = 1;
	mouseCtx.stroke();

	var dist = getDistance(origin, target);

	if (dist <= speed){return;}

	var p = getPointInDir(speed, getAngleFromTo(origin, target), origin.x, origin.y);

	mouseCtx.beginPath();
	mouseCtx.moveTo(p.x * cam.z + cam.o.x, p.y * cam.z + cam.o.y);
	mouseCtx.lineTo(target.x * cam.z + cam.o.x, target.y * cam.z + cam.o.y);
	mouseCtx.closePath();
	mouseCtx.strokeStyle = "white"
	mouseCtx.lineWidth = 2;
	mouseCtx.stroke();
}

function drawAimVector(origin, target){
	mouseCtx.clearRect(0, 0, res.x, res.y);
	mouseCtx.beginPath();
	mouseCtx.moveTo(origin.x * cam.z + cam.o.x, origin.y * cam.z + cam.o.y);
	mouseCtx.lineTo(target.x * cam.z + cam.o.x, target.y * cam.z + cam.o.y);
	mouseCtx.closePath();
	mouseCtx.strokeStyle = "yellow";
	mouseCtx.lineWidth = 2;
	mouseCtx.stroke();
}

function drawProjectile(weapon, anim){

	var x = anim.ox + anim.nx * anim.n;
	var y = anim.oy + anim.ny * anim.n;
	var trailEnd = getPointInDir(weapon.projSize*2.5, anim.f, x, y);
	var w = 1;

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

	if (anim.n >= anim.m && anim.h){
		anim.p = 1;
		anim.n = 0;
		anim.m = 42;
	}
}

function drawAreaProjectile(weapon, anim){

	var x = anim.ox + anim.nx * anim.n;
	var y = anim.oy + anim.ny * anim.n;
	var trailEnd = getPointInDir(weapon.projSize*2.5, anim.f, x, y);
	var w = 1;

	//fxCtx.translate(cam.o.x, cam.o.y);
	//fxCtx.scale(cam.z, cam.z)

	if (anim.n/anim.m > 0.8){
		w -= 2*(anim.n/anim.m - 0.8);
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
	//fxCtx.setTransform(1,0,0,1,0,0);

	if (anim.n >= anim.m){
		anim.p = 1;
		anim.n = 0;
		anim.m = 80;
	}
}

function drawAreaEffect(weapon, anim){
	var fraction = anim.n/anim.m;
	var size = weapon.aoe*2 * fraction;

	//fxCtx.translate(cam.o.x, cam.o.y);
	//fxCtx.scale(cam.z, cam.z)

	//var cos = 0.5 + Math.cos(2*Math.PI*fraction);
	//console.log(cos);

	if (fraction > 0.7){
		fxCtx.globalAlpha = 1 - (fraction-0.7)*3
	} else fxCtx.globalAlpha = 1;

	//drawDamageNumbers(weapon, anim, fraction);
	

	fxCtx.drawImage(graphics[weapon.name], anim.tx -size/2, anim.ty -size/2, size, size);
	fxCtx.globalAlpha = 1;
	//fxCtx.setTransform(1,0,0,1,0,0);

	if (anim.n >= anim.m){
		anim.done = true;
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

function drawExplosion(weapon, anim){  // 150, 150, 30
	var fraction = anim.n/anim.m;
	var sin = weapon.exploSize*1*Math.sin(Math.PI*fraction);
	if (sin < 0){return;}

	//fxCtx.translate(cam.o.x, cam.o.y);
	//fxCtx.scale(cam.z, cam.z)
	fxCtx.globalAlpha = Math.min(1, 1.2 - fraction);

	var outer = "";
	var mid = "";
	var inner = "";

	if (weapon.dmgType[0] == "E"){
		outer = "rgb(95,125,255)";
		mid = "rgb(95,125,255)";
		inner = "rgb(255,255,255)";
	}	
	else if (weapon.dmgType[0] == "P"){
		outer ="rgb(150,255,0)";
		mid = "rgb(255,200,0)";
		inner = "rgb(150,150,0)";
	}
	else {
		outer ="rgb(255,225,75)";
		mid = "rgb(255,200,0)";
		inner = "rgb(255,0,0)";
	}

	fxCtx.beginPath(); fxCtx.arc(anim.tx, anim.ty, sin, 0, 2*Math.PI); fxCtx.closePath(); fxCtx.fillStyle = outer; fxCtx.fill();
	fxCtx.beginPath(); fxCtx.arc(anim.tx, anim.ty, sin*0.66, 0, 2*Math.PI); fxCtx.closePath(); fxCtx.fillStyle = mid; fxCtx.fill();
	fxCtx.beginPath(); fxCtx.arc(anim.tx, anim.ty, sin*0.35, 0, 2*Math.PI); fxCtx.closePath(); fxCtx.fillStyle = inner; fxCtx.fill();

	fxCtx.globalAlpha = 1;
	fxCtx.globalCompositeOperation = "source-over";
}

function drawDamageNumbers(weapon, anim){
	if (anim.done){return;}
	anim.n++;
	if (anim.n <= 0){return;}


	var fraction = anim.n/anim.m;
	//console.log(fraction)

	fxCtx.globalAlpha = Math.min(1, 1.4 - fraction);

	fxCtx.font = "18px Arial";
	fxCtx.textAlign = "center";
	fxCtx.fillStyle = "white";
	fxCtx.fillText(anim.odds, anim.x, anim.y -70 - (30 * fraction));
	fxCtx.fillText(anim.shots, anim.x, anim.y -50 - (30 * fraction));


	fxCtx.fillStyle = "lightBlue";
	fxCtx.fillText(anim.armour, anim.x -35, anim.y -25 - (30 * fraction));
	fxCtx.fillStyle = "yellow";
	fxCtx.fillText(anim.system, anim.x, anim.y -15 - (30 * fraction));
	fxCtx.fillStyle = "red";
	fxCtx.fillText(anim.hull, anim.x +35, anim.y -5 - (30 * fraction));

	fxCtx.globalAlpha = 1;

	if (anim.n >= anim.m){anim.done = 1; return;}

}

function drawUnitExploa(posX, posY, img, s, now, max){
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

function drawUnitExplo(x, y, s, now, max){
	var sin = s*0.5*Math.sin(Math.PI*now/max);
	if (sin < 0){
		return;
	}

	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z)

	fxCtx.globalAlpha = 1.3 - (now/max);

	fxCtx.beginPath(); fxCtx.arc(x, y, sin, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "rgb(255,225,75)"; fxCtx.fill();
	fxCtx.beginPath(); fxCtx.arc(x, y, sin/3*2, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "rgb(255,200,0)"; fxCtx.fill();
	fxCtx.beginPath(); fxCtx.arc(x, y, sin/4, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "rgb(255,0,0)"; fxCtx.fill();

	fxCtx.globalAlpha = 1;
	fxCtx.setTransform(1,0,0,1,0,0);
}

function drawBeam(weapon, anim){
	//fxCtx.translate(cam.o.x, cam.o.y);
	//fxCtx.scale(cam.z, cam.z)

	var fraction = anim.n/anim.m;
	var charge = 0.5 - 0.3*Math.cos(2*Math.PI*fraction);

	fxCtx.globalAlpha = 1;
	fxCtx.beginPath();
	fxCtx.arc(anim.ox, anim.oy, weapon.beamWidth*charge, 0, 2*Math.PI);
	fxCtx.closePath();	
	fxCtx.fillStyle = weapon.animColor;
	fxCtx.fill();

	fxCtx.beginPath();
	fxCtx.arc(anim.ox, anim.oy, weapon.beamWidth/2*charge, 0, 2*Math.PI);
	fxCtx.closePath();
	fxCtx.globalCompositeOperation = "lighter";
	fxCtx.fillStyle = "white";
	fxCtx.fill();	

	var x = anim.tax + anim.nx * anim.n;
	var y = anim.tay + anim.ny * anim.n;

	if (fraction > 0.3){
		anim.p = 1;
		var beamW = 0.5 + 0.5 * Math.cos(2*Math.PI*fraction);
		fxCtx.lineCap = "round";	
		fxCtx.beginPath();
		fxCtx.moveTo(anim.ox, anim.oy);
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
		if (anim.h){
			drawBeamExplosion(weapon, x, y, fraction);
		}
	}
		
	fxCtx.globalCompositeOperation = "source-over";
	fxCtx.lineCap = "butt";
	//fxCtx.setTransform(1,0,0,1,0,0);
}

function drawBeamExplosion(weapon, x, y, fraction){
	fxCtx.globalAlpha = Math.min(1, 1.5 - fraction);
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