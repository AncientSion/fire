
function drawVector(loc, pos, dist, angle){
	mouseCtx.clearRect(0, 0, res.x, res.y);
	mouseCtx.beginPath();
	mouseCtx.moveTo(loc.x + cam.o.x, loc.y + cam.o.y);
	mouseCtx.lineTo(pos.x + cam.o.x, pos.y + cam.o.y);
	mouseCtx.closePath();
	mouseCtx.strokeStyle = "white";
	mouseCtx.stroke();

	if (angle > 180){
		angle = (360-angle) *-1;
	}

	$("#vectorDiv").html("Distance: " + dist + " </br>Angle: " + Math.round(angle))
	.css("left", pos.x + cam.o.x- 45 + "px")
	.css("top", pos.y +cam.o.y - 60 + "px")
	.removeClass("disabled");
}


function drawProjectile(weapon, ox, oy, x, y, as, ae){
	var trailEnd = getPointInDirection(weapon.projSize*2, getAngleFromTo({x: ox, y: oy}, {x: x, y: y}), x, y);

	//var w = 0.75 + 0.25 * Math.cos(2*Math.PI*as/ae);

	var w = 1;

	if (as / ae > 0.7){
		w -= 2*(as/ae - 0.7);
	}

	fxCtx.globalAlpha = w
	fxCtx.beginPath();
	fxCtx.moveTo(x+cam.o.x, y+cam.o.y);
	fxCtx.lineTo(trailEnd.x+cam.o.x, trailEnd.y+cam.o.y);
	fxCtx.closePath();	
	fxCtx.strokeStyle = weapon.animColor;
	fxCtx.lineWidth = weapon.projSize;
	fxCtx.stroke();

	fxCtx.globalCompositeOperation = "lighter";
	fxCtx.strokeStyle = "white";
	fxCtx.lineWidth = weapon.projSize/4;
	fxCtx.stroke();

	fxCtx.globalCompositeOperation = "source-over";
}

function drawExplosion(x, y, s, now, max){

	var sin = s*0.5*Math.sin(Math.PI*now/max);
	if (sin < 0){
		return;
	}

	fxCtx.globalAlpha = 1.5 - (now/max);

	fxCtx.beginPath(); fxCtx.arc(x+cam.o.x, y+cam.o.y, sin, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "rgb(255,225,75)"; fxCtx.fill();
	fxCtx.beginPath(); fxCtx.arc(x+cam.o.x, y+cam.o.y, sin/3*2, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "rgb(255,200,0)"; fxCtx.fill();
	fxCtx.beginPath(); fxCtx.arc(x+cam.o.x, y+cam.o.y, sin/4, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "rgb(255,0,0)"; fxCtx.fill();

	/*for (var i = 0; i < 3; i++){
		var step = range
		fxCtx.beginPath(); fxCtx.arc(x+cam.o.x, y+cam.o.y, sin, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "rgb(255,225,75)"; fxCtx.fill();
		fxCtx.beginPath(); fxCtx.arc(x+cam.o.x, y+cam.o.y, sin/3*2, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "rgb(255,200,0)"; fxCtx.fill();
		fxCtx.beginPath(); fxCtx.arc(x+cam.o.x, y+cam.o.y, sin/4, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "rgb(255,0,0)"; fxCtx.fill();
	}*/
	fxCtx.globalAlpha = 1;
}

function drawBeam(weapon, ox, oy, x, y, now, max, hit){
	var fraction = now/max;

	var charge =  0.5 - 0.3*Math.cos(2*Math.PI*fraction);
	fxCtx.fillStyle = weapon.animColor;
	fxCtx.beginPath();
	fxCtx.arc(ox+cam.o.x, oy+cam.o.y, weapon.beamWidth*1.5*charge, 0, 2*Math.PI);
	fxCtx.closePath();
	fxCtx.fill();

	fxCtx.fillStyle = "white";
	fxCtx.globalCompositeOperation = "lighter";
	fxCtx.beginPath();
	fxCtx.arc(ox+cam.o.x, oy+cam.o.y, weapon.beamWidth*charge, 0, 2*Math.PI);
	fxCtx.closePath();
	fxCtx.fillStyle = "white;"
	fxCtx.fill();
	fxCtx.globalCompositeOperation = "source-over";

	if (fraction > 0.3){
		var beamW = 0.5 + 0.5 * Math.cos(2*Math.PI*fraction);
		fxCtx.lineCap = "round";	
		fxCtx.beginPath();
		fxCtx.moveTo(ox+cam.o.x, oy+cam.o.y);
		fxCtx.lineTo(x+cam.o.x, y+cam.o.y);
		fxCtx.closePath();

		fxCtx.globalAlpha = 1 - beamW;
		//console.log(fxCtx.globalAlpha);

		fxCtx.strokeStyle = weapon.animColor;
		fxCtx.lineWidth = weapon.beamWidth * 0.5 + weapon.beamWidth * beamW
		fxCtx.stroke();

		fxCtx.strokeStyle = "white";
		fxCtx.lineWidth = 1 + 1* beamW;
		fxCtx.globalCompositeOperation = "lighter";
		fxCtx.stroke();
		if (hit){
			drawBeamExplosion(weapon, x, y, fraction);
		}
	}
		
		fxCtx.globalCompositeOperation = "source-over";
		fxCtx.lineCap = "butt";
}

function drawBeamExplosion(weapon, x, y, fraction){
	fxCtx.globalAlpha = 1.5 - fraction;
		fxCtx.globalCompositeOperation = "source-over";
	for (var i = 0; i < 1; i++){
		var subX = x + range(-2, 3);
		var subY = y + range(-2, 3);
		var subS = weapon.exploSize + (range(-weapon.exploSize*.15, weapon.exploSize*.15));

		fxCtx.beginPath(); fxCtx.arc(x+cam.o.x, y+cam.o.y, subS, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "rgb(255,255,155)"; fxCtx.fill();
		fxCtx.beginPath(); fxCtx.arc(x+cam.o.x, y+cam.o.y, subS/3*2, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "orange"; fxCtx.fill();
		fxCtx.beginPath(); fxCtx.arc(x+cam.o.x, y+cam.o.y, subS/4, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "red"; fxCtx.fill();
	}
	fxCtx.globalAlpha = 1;	
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