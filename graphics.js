
function drawVector(origin, target, dist, angle){
	mouseCtx.clearRect(0, 0, res.x, res.y);
	mouseCtx.beginPath();
	mouseCtx.moveTo(origin.x * cam.z + cam.o.x, origin.y * cam.z + cam.o.y);
	mouseCtx.lineTo(target.x, target.y);
	mouseCtx.closePath();
	mouseCtx.strokeStyle = "white";
	mouseCtx.stroke();

	if (angle > 180){
		angle = (360-angle) *-1;
	}

	$("#vectorDiv").html("Distance: " + dist + " </br>Angle: " + Math.round(angle))
	.css("left", target.x- 45 + "px")
	.css("top", target.y + 40 + "px")
	.removeClass("disabled");
}

//function drawProjectile(weapon, ox, oy, x, y, now, end){
function drawProjectile(weapon, fire){
	//getPointInDirection(dis, angle, oX, oY){

	var x = fire.ox + fire.nx * fire.n;
	var y = fire.oy + fire.ny * fire.n;
	var trailEnd = getPointInDirection(weapon.projSize*2.5, fire.f, x, y);
	var w = 1;

	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z)

	if (fire.n/fire.m > 0.7){
		w -= 2*(fire.n/fire.m- 0.7);
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

	fxCtx.globalCompositeOperation = "source-over";
	fxCtx.setTransform(1,0,0,1,0,0);
}

function drawExplosion(weapon, x, y, now, max, explo){  // 150, 150, 30
	var fraction = (now-max)/(explo);
	//	console.log(now, max);
	//function drawExplosion(weapon, shooter, ele){
	fxCtx.translate(cam.o.x, cam.o.y);
	fxCtx.scale(cam.z, cam.z)

	var sin = weapon.exploSize*1*Math.sin(Math.PI*fraction);
	if (sin < 0){
		return;
	}
	//console.log(sin);
	fxCtx.globalAlpha = 1.5 - fraction;

	var outer;
	var mid;
	var inner;

	if (weapon instanceof EM){
		outer = "rgb(95,125,255)";
		mid = "rgb(95,125,255)";
		inner = "rgb(255,255,255)";
	}
	else {
		outer ="rgb(255,225,75)";
		mid = "rgb(255,200,0)";
		inner = "rgb(255,0,0)";
	}

	fxCtx.beginPath(); fxCtx.arc(x, y, sin, 0, 2*Math.PI); fxCtx.closePath(); fxCtx.fillStyle = outer; fxCtx.fill();
	fxCtx.beginPath(); fxCtx.arc(x, y, sin*0.66, 0, 2*Math.PI); fxCtx.closePath(); fxCtx.fillStyle = mid; fxCtx.fill();
	fxCtx.beginPath(); fxCtx.arc(x, y, sin*0.35, 0, 2*Math.PI); fxCtx.closePath(); fxCtx.fillStyle = inner; fxCtx.fill();

	fxCtx.globalAlpha = 1;
	fxCtx.setTransform(1,0,0,1,0,0);
}

function drawFighterExplosion(x, y, s, now, max){
	var sin = s*0.5*Math.sin(Math.PI*now/max);
	if (sin < 0){
		return;
	}

	fxCtx.globalAlpha = 1.5 - (now/max);

	fxCtx.beginPath(); fxCtx.arc(x, y, sin, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "rgb(255,225,75)"; fxCtx.fill();
	fxCtx.beginPath(); fxCtx.arc(x, y, sin/3*2, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "rgb(255,200,0)"; fxCtx.fill();
	fxCtx.beginPath(); fxCtx.arc(x, y, sin/4, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "rgb(255,0,0)"; fxCtx.fill();

	fxCtx.globalAlpha = 1;
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

function drawSensorArc(w, d, p, str, len, loc, facing, a){
	mouseCtx.clearRect(0, 0, res.x, res.y);
	mouseCtx.translate(cam.o.x, cam.o.y);
	mouseCtx.scale(cam.z, cam.z);
	
	w = Math.ceil(w);	
	if (w == 180){
		mouseCtx.beginPath();			
		mouseCtx.arc(loc.x, loc.y, d, 0, 2*Math.PI, false);
		mouseCtx.closePath();
	}
	else {
		var start = addAngle(0 + w-facing, a);
		var end = addAngle(360 - w-facing, a);
		var p1 = getPointInDirection(str, start, loc.x, loc.y);
		var rad1 = degreeToRadian(start);
		var rad2 = degreeToRadian(end);
		mouseCtx.beginPath();			
		mouseCtx.moveTo(loc.x, loc.y);
		mouseCtx.lineTo(p1.x, p1.y); 
		mouseCtx.arc(loc.x, loc.y, d, rad1, rad2, false);
		mouseCtx.closePath();
	}

	mouseCtx.globalAlpha = 0.2;
	mouseCtx.fillStyle = "red";
	mouseCtx.fill();
	mouseCtx.globalAlpha = 1;
	mouseCtx.setTransform(1,0,0,1,0,0);
}