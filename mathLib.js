
function getPointInDirection(dis, angle, oX, oY){
	var x = Math.round(oX + dis * Math.cos(angle* Math.PI / 180));
	var y = Math.round(oY + dis * Math.sin(angle* Math.PI / 180));
	return {x:Math.round(x), y:Math.round(y)}; 
} 

function getDistance(start, end){
	return Math.sqrt((end.x-start.x)*(end.x-start.x) + (end.y-start.y)*(end.y-start.y)); 
}

function degreeToRadian(angle){
	return (angle / (180.0 / Math.PI)); 
}

function radianToDegree(radian){
	var x = radian * (180.0 / Math.PI);
	return x;
}

function getAngleFromTo(a, b){
	return radianToDegree(Math.atan2(b.y-a.y, b.x-a.x));;
}

function getAngle(ax, ay, bx, by){
	return radianToDegree(Math.atan2(by-ay, bx-ax));;
} 

function addAngle(f, a){
	ret = 360 - f + a;
	if (ret > 360){
		ret -= 360;
	}
	else if (ret < 0){
		ret += 360;
	}
	//console.log(ret);
	return ret;
}


function addToDirection(current, add){
    add = add % 360;

	var ret = 0;
	if (current + add > 360){
		ret =  0+(add-(360-current));
			
	}else if (current + add < 0){
		ret = 360 + (current + add);
	}else{	
		ret = current + add;
	}

	return ret;
	}


                       //    150     180
function adjustForFacing(facing, angle){
	//console.log(arguments)
	//console.log(ret);
	return angle - facing;

}
	
function isInArc(direction, start, end){
	//console.log("direction: "+direction + " start: " + start + " end: " + end);	
	//direction: 300 start: 360 end: 240
	
	//$("#curArc").html("vector angle, start, end: " + direction + " - " + start + " - " + end);
	
	if (start == end)
		return true;
		
	if ((direction == 0 && start == 360) || (direction == 0 && end == 360))
		return true;

	if (start > end){
		return (direction >= start || direction <= end);			
	}
	else if (direction >= start && direction <= end){
		return true;
	}
	else {
		return false;
	}$
}

function getCompassHeadingOfPoint(observer, target, facing){
	var dX = target.x - observer.x;
	var dY = target.y - observer.y;
	var heading = 0.0;			
	if (dX == 0){
		if (dY>0){
			heading = 180.0;
		}
		else{
			heading = 0.0;
		}		
	}
	else if (dY == 0){
		if (dX>0){
			heading = 90.0;
		}
		else{
			heading = 270.0;
		}
	}else if (dX>0 && dY<0 ){
		heading = radianToDegree(Math.atan(dX/Math.abs(dY)));
	}else if (dX>0 && dY>0 ){
		heading = radianToDegree(Math.atan(dY/dX)) + 90;
	}else if (dX<0 && dY>0){
		heading = radianToDegree(Math.atan(Math.abs(dX)/dY)) + 180;
	}else if (dX<0 && dY<0){
		heading = radianToDegree(Math.atan(dY/dX)) + 270;
	}
	heading = addToDirection(Math.round(heading), -90);
	heading = addToDirection(heading, -facing);

	return heading;
}

function getIntercept(src, dst, vector, mod){
	var tx = dst.x - src.x;
	var	ty = dst.y - src.y;
	var	tvx = vector.nx;
	var	tvy = vector.ny;

	// Get quadratic equation components
	var a = tvx*tvx + tvy*tvy - mod*mod;
	var b = 2 * (tvx * tx + tvy * ty);
	var c = tx*tx + ty*ty;

	// Solve quadratic
	var ts = quad(a, b, c); // See quad(), below
	// Find smallest positive solution
	var sol = null;

	//if (src instanceof Ship){console.log(ts);}

	if (ts) {
		var t0 = ts[0], t1 = ts[1];
		var t = Math.min(t0, t1);
		if (t < 0) t = Math.max(t0, t1);    
		if (t > 0) {
			sol = {
				x: dst.x + vector.nx * t,
				y: dst.y + vector.ny * t
			};
		}
	}
	return sol;
}

function randomize(pos, x, y){
	pos.x += range(-x, x);
	pos.y += range(-y, y);
	return pos;
}

function round(val){
	return Math.floor(val * 100) / 100; 
}

function getProjIntercept(src, dst, vector, mod){
	var tx = dst.x - src.x;
	var	ty = dst.y - src.y;
	var	tvx = vector.nx;
	var	tvy = vector.ny;

	// Get quadratic equation components
	var a = tvx*tvx + tvy*tvy - mod*mod;
	var b = 2 * (tvx * tx + tvy * ty);
	var c = tx*tx + ty*ty;

	// Solve quadratic
	var ts = quad(a, b, c); // See quad(), below
	// Find smallest positive solution
	var sol = null;


	if (ts) {
		var t0 = ts[0], t1 = ts[1];
		//var t = Math.min(t0, t1);
		var t = Math.min(t0, t1);
		//console.log(ts);
		if (t < 0) t = Math.max(t0, t1);  
		//t = range(1, t);

		if (t > 0) {
			sol = {
				x: dst.x + vector.nx * t,
				y: dst.y + vector.ny * t
			};
		}
	}
	//console.log(t);
	return sol;
}


function getBeamIntercept(src, dst, vector){
	var tx = dst.x - src.x;
	var	ty = dst.y - src.y;
	var	tvx = vector.nx;
	var	tvy = vector.ny;

	// Get quadratic equation components
	var a = tvx*tvx + tvy*tvy - 25;
	var b = 2 * (tvx * tx + tvy * ty);
	var c = tx*tx + ty*ty;

	// Solve quadratic
	var ts = quad(a, b, c); // See quad(), below
	// Find smallest positive solution
	var sol = null;


	if (ts) {
		var t0 = ts[0], t1 = ts[1];
		//var t = Math.min(t0, t1);
		var t = Math.min(t0, t1);
		if (t < 0) t = Math.max(t0, t1);  
		//t = range(1, t);

		if (t > 0) {
			sol = {
				x: dst.x + vector.nx * t,
				y: dst.y + vector.ny * t
			};
		}
	}
	//console.log(t);
	return sol;
}




function quad(a,b,c) {
	var sol = null;
	if (Math.abs(a) < 1e-6) {
		if (Math.abs(b) < 1e-6) {
			sol = Math.abs(c) < 1e-6 ? [0,0] : null;
		} else {
			sol = [-c/b, -c/b];
		}
	} else {
		var disc = b*b - 4*a*c;
		if (disc >= 0) {
			disc = Math.sqrt(disc);
			a = 2*a;
			sol = [(-b-disc)/a, (-b+disc)/a];
		}
	}
	return sol;
}
		
function drawAndRotate(posX, posY, w, h, iw, ih, angle, img){

        var x = Math.round(w/2);
        var y = Math.round(h/2);
        var width = iw/2;
        var height = ih/2;
		
		angle = angle + Math.PI / 180; 
		
		fxCtx.save();
		fxCtx.translate(x, y);
		//fxCtx.translate(10, 10);
		fxCtx.rotate(angle);
		//fxCtx.arc(0, 0, 10, 0, 2*Math.PI, false);
		//fxCtx.fill();
		fxCtx.drawImage(img, 0, 0, width, height);
		fxCtx.restore();
}

function range(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawText(ctx, color, text, size, p){
	ctx.beginPath();
	ctx.font = "bolder " + size + "pt Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
	ctx.textAlign = "center";
	ctx.textBaseline = 'middle';
	ctx.closePath();
	ctx.fillStyle = color;
	ctx.fillText(
					text,
					p.x,
					p.y
					);	
				
	ctx.fillStyle = "black";
}
