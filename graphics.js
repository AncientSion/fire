
function drawVector(loc, pos, dist, facing){
	pos = {x: pos.x + cam.o.x, y: pos.y + cam.o.y};
	mouseCtx.clearRect(0, 0, res.x, res.y);
	mouseCtx.beginPath();
	mouseCtx.moveTo(loc.x, loc.y);
	mouseCtx.lineTo(pos.x, pos.y)
	mouseCtx.closePath();	
	mouseCtx.stroke();
	
	var angle = getAngleFromTo(loc, pos);
		angle = addToDirection(angle, - facing);

		if (angle > 180){
			angle = (360-angle) *-1;
		}


	$("#vectorDiv").html("Distance: " + dist + ", angle: " + Math.floor(angle))
	.css("top", pos.y + "px")
	.css("left", pos.x + "px")
	.removeClass("disabled");
}

function drawProjectile(weapon, x, y){
	fxCtx.beginPath();
	fxCtx.arc(x, y, weapon.projSize, 0, 2*Math.PI);
	fxCtx.closePath();
	fxCtx.fillStyle = weapon.projColor;
	fxCtx.fill();
}

function drawBeam(weapon, ox, oy, x, y){

	fxCtx.lineCap = "round";
	
	fxCtx.beginPath();
	fxCtx.moveTo(ox, oy);
	fxCtx.lineTo(x, y);
	fxCtx.closePath();
	fxCtx.strokeStyle = weapon.beamColorA;
	fxCtx.lineWidth = weapon.beamWidth;
	fxCtx.stroke();
	
	fxCtx.globalAlpha = 0.6;
	fxCtx.beginPath();
	fxCtx.moveTo(ox, oy);
	fxCtx.lineTo(x, y);
	fxCtx.closePath();
	fxCtx.strokeStyle = weapon.beamColorB;
	fxCtx.lineWidth = weapon.beamWidth*0.3;
	fxCtx.stroke();
	
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

function drawExplosion(x, y, s){
	var s = [s, s*0.7, s*0.25];
	var c = ["yellow", "orange", "red"];
	
	for (var i = 0; i <= s.length-1; i++){
	//console.log(i);
		fxCtx.beginPath();
		fxCtx.arc(x, y, s[i], 0, 2*Math.PI);
		fxCtx.closePath();
		fxCtx.fillStyle = c[i];
	//	fxCtx.globalAlpha  = 1;
		fxCtx.fill();
	}

	fxCtx.fillStyle = "blue";
	fxCtx.globalAlpha  = 1;
}
	

function getRadialGradient(x, y, s){
	var grad = fxCtx.createRadialGradient(x, y, 0, x, y, s);
		grad.addColorStop(0, "red");
		grad.addColorStop(0.5, "orange");
		grad.addColorStop(1, "yellow");
	return grad;
}	