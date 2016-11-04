
function drawVector(loc, pos, dist, angle){
	//console.log(angle);
	pos = {x: pos.x + cam.o.x, y: pos.y + cam.o.y};
	mouseCtx.clearRect(0, 0, res.x, res.y);
	mouseCtx.beginPath();
	mouseCtx.moveTo(loc.x, loc.y);
	mouseCtx.lineTo(pos.x, pos.y)
	mouseCtx.closePath();	
	mouseCtx.stroke();

	if (angle > 180){
		angle = (360-angle) *-1;
	}

	$("#vectorDiv").html("Distance: " + dist + " </br>Angle: " + Math.round(angle))
	.css("left", pos.x - 45 + "px")
	.css("top", pos.y - 60 + "px")
	.removeClass("disabled");
}

function drawProjectile(weapon, ox, oy, x, y){

	/*
	fxCtx.beginPath();
	fxCtx.stroke();
	fxCtx.arc(x, y, weapon.projSize, 0, 2*Math.PI);
	fxCtx.closePath();
	fxCtx.fillStyle = weapon.animColor;
	fxCtx.fill();
	*/
	var trailEnd = getPointInDirection(weapon.projSize*-2, getAngleFromTo({x: ox, y: oy}, {x: x, y: y}), x, y);

	fxCtx.beginPath();
	fxCtx.moveTo(x, y);
	fxCtx.lineTo(trailEnd.x, trailEnd.y);
	fxCtx.closePath();
	fxCtx.strokeStyle = weapon.animColor;
	fxCtx.lineWidth = weapon.projSize / 3;
	fxCtx.stroke();
}

function drawBeam(weapon, ox, oy, x, y){
	fxCtx.lineCap = "round";	
	fxCtx.beginPath();
	fxCtx.moveTo(ox, oy);
	fxCtx.lineTo(x, y);
	fxCtx.closePath();
	fxCtx.strokeStyle = weapon.animColor;
	fxCtx.lineWidth = weapon.beamWidth;
	fxCtx.stroke();
	
	/*fxCtx.globalAlpha = 0.6;
	fxCtx.beginPath();
	fxCtx.moveTo(ox, oy);
	fxCtx.lineTo(x, y);
	fxCtx.closePath();
	fxCtx.strokeStyle = "white";
	fxCtx.lineWidth = weapon.width*0.3;
	fxCtx.stroke();*/
	
	fxCtx.lineWidth = 1
	fxCtx.globalCompositeOperation = "source-over";
	
	fxCtx.lineCap = "butt";
	
}

/*function drawBeam(weapon, ox, oy, x, y){

	var gradient = ctx.createLinearGradiant(0, 0, 170, 20)
	fxCtx.beginPath();
	fxCtx.moveTo(ox, oy);
	fxCtx.lineTo(x, y);
	fxCtx.closePath();
	fxCtx.lineWidth = weapon.beamWidth*1.5;
	fxCtx.strokeStyle = 
	fxCtx.stroke();
	
	fxCtx.lineWidth = 1;
}*/

function drawExplosion(x, y, s, now, max){
	if (now < max/2){
		s = s/max*now;
	}
	else {
		s = s - s/max*now;
	}

	fxCtx.beginPath();
	fxCtx.arc(x, y, s*2, 0, 2*Math.PI);
	fxCtx.closePath();
	fxCtx.fillStyle = getRadialGradient(x, y, s);
	fxCtx.fill();
}

function drawBeamExplosion(x, y, s, now, max){

	s = s + (range(-s*.10, s*.10));
	fxCtx.beginPath();
	fxCtx.arc(x, y, s, 0, 2*Math.PI);
	fxCtx.closePath();
	fxCtx.fillStyle = getRadialGradient(x, y, s);
	fxCtx.fill();
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
		grad.addColorStop(0.6, "orange");
		grad.addColorStop(1, "yellow");
	return grad;
}	