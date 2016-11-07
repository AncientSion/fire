
function drawVector(loc, pos, dist, angle){
	//console.log(angle);
	pos = {x: pos.x + cam.o.x, y: pos.y + cam.o.y};
	mouseCtx.clearRect(0, 0, res.x, res.y);
	mouseCtx.beginPath();
	mouseCtx.moveTo(loc.x, loc.y);
	mouseCtx.lineTo(pos.x, pos.y)
	mouseCtx.closePath();
	mouseCtx.strokeStyle = "black";
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

function drawBeam(weapon, ox, oy, x, y, as, ae){
	var cos = 0.5 + 0.5*Math.cos(2*Math.PI*as/ae);

	fxCtx.lineCap = "round";	
	fxCtx.beginPath();
	fxCtx.moveTo(ox, oy);
	fxCtx.lineTo(x, y);
	fxCtx.closePath();
	fxCtx.strokeStyle = weapon.animColor;
	fxCtx.lineWidth = weapon.beamWidth * cos + 1;
	fxCtx.globalAlpha = 1-cos;
	fxCtx.stroke();
	if (as == ae){console.log("done")}
	fxCtx.lineWidth = 1
	fxCtx.globalAlpha = 1;	
	fxCtx.lineCap = "butt";	
}

function drawExplosion(x, y, s, now, max){
	if (now < max/2){
		s = s/max*now;
	}
	else {
		s = s - s/max*now;
	}
	//console.log(s);

		fxCtx.beginPath(); fxCtx.arc(x, y, s, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "rgb(255,255,155)"; fxCtx.fill();
		fxCtx.beginPath(); fxCtx.arc(x, y, s/3*2, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "orange"; fxCtx.fill();
		fxCtx.beginPath(); fxCtx.arc(x, y, s/4, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "red"; fxCtx.fill();
}

function drawBeamExplosion(x, y, s, now, max){

	//console.log(s);


	fxCtx.globalAlpha = now/max;	

	for (var i = 0; i < 1; i++){
		var subX = x + range(-2, 3);
		var subY = y + range(-2, 3);
		var subS = s + (range(-s*.15, s*.15));


		fxCtx.beginPath(); fxCtx.arc(x, y, subS, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "rgb(255,255,155)"; fxCtx.fill();
		fxCtx.beginPath(); fxCtx.arc(x, y, subS/3*2, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "orange"; fxCtx.fill();
		fxCtx.beginPath(); fxCtx.arc(x, y, subS/4, 0, 2*Math.PI); fxCtx.closePath();	fxCtx.fillStyle = "red"; fxCtx.fill();
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