
function getPointInDir(dis, angle, oX, oY){
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
	return radianToDegree(Math.atan2(b.y-a.y, b.x-a.x));
}

function addAngle(f, a){
	ret = 360 - f + a;
	while (ret > 360){
		ret -= 360;
	}
	while (ret < 0){
		ret += 360;
	}
	//console.log(ret);
	return ret;
}

function mag(v){
	return Math.sqrt(v.x * v.x + v.y * v.y);
}

function norm(v){
	var m = mag(v);
	return {x: v.x/m, y: v.y/m};
}

function dot(a, b){
	return (a.x * b.x) + (a.y * b.y); 
}

function isWithinCircle(oPos, tPos, arc){
	var oPosToCenter = getDistance(oPos, arc.getGamePos());
	var tPosToCenter = getDistance(tPos, arc.getGamePos());

	if (oPosToCenter < arc.size/2 && tPosToCenter < arc.size/2){
		return getDistance(oPos, tPos);
	} return false;
}

function isWithinRect(pos, rectPoints) {
    var AB = newV(rectPoints[0], rectPoints[2]);
    var AM = newV(rectPoints[0], pos);
    var BC = newV(rectPoints[1], rectPoints[2]);
    var BM = newV(rectPoints[1], pos);
    var dotABAM = dot(AB, AM);
    var dotABAB = dot(AB, AB);
    var dotBCBM = dot(BC, BM);
    var dotBCBC = dot(BC, BC);
    return 0 <= dotABAM && dotABAM <= dotABAB && 0 <= dotBCBM && dotBCBM <= dotBCBC;
}

function newV(p1, p2) {
    return {
            x: (p2.x - p1.x),
            y: (p2.y - p1.y)
    };
}

function lineRectIntersect(shooter, target, rectPoints){
	var testResult;
	var intersectPoints = [];

	for (var i = 0; i < rectPoints.length-1; i++){
		testResult = lineLineIntersect(shooter, target, rectPoints[i], rectPoints[i+1]);
		if (!testResult){continue;}
		intersectPoints.push(testResult);
	}

	testResult = lineLineIntersect(shooter, target, rectPoints[3], rectPoints[0]);
	if (testResult){intersectPoints.push(testResult);}

	if (intersectPoints.length == 1){
		var isInside = isWithinRect(shooter, rectPoints);
		var shooterToIntersect = getDistance(shooter, intersectPoints[0]);
		var shooterToTarget = getDistance(shooter, target);
		var targetToIntersect = getDistance(target, intersectPoints[0]);
		if (isInside || shooterToIntersect > shooterToTarget){
			intersectPoints[0].type = 1;
		}
		else intersectPoints[0].type = 0;
	}

	return intersectPoints;

}

function lineLineIntersect(a, b, c, d){
	var ua = (d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x);
	var ub = (b.x - a.x) * (a.y - c.y) - (b.y - a.y) * (a.x - c.x);
	var denom = (d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y);

/*	if  (Math.abs(denom) == 0){
		if (Math.abs(ua) == 0 && Math.abs(ub) == 0){
			intersect.x = (a.x + b.x) / 2;
			intersect.y = (a.y + b.y) / 2;
		}
	}
	else {
*/		ua /= denom;
		ub /= denom;

		if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1){
			return {
					x: a.x + ua * (b.x - a.x),
					y: a.y + ua * (b.y - a.y)
			}
		}
//	}

	return false;
}

function lineCircleIntersect(a, b, c, size) {
	// Calculate the euclidean distance between a & b
	var eDistAtoB = Math.sqrt(Math.pow(b.x-a.x, 2) + Math.pow(b.y-a.y, 2));

	// compute the direction vector d from a to b
	var d = {x: (b.x-a.x)/eDistAtoB, y: (b.y-a.y)/eDistAtoB};

	// Now the line equation is x = dx*t + ax, y = dy*t + ay with 0 <= t <= 1.

	// compute the value t of the closest point to the circle center (cx, cy)
	var t = (d.x * (c.x-a.x)) + (d.y * (c.y-a.y));

	// compute the coordinates of the point e on line and closest to c
    var e = {x: 0, y: 0};
		e.x = (t * d.x) + a.x;
		e.y = (t * d.y) + a.y;

	// Calculate the euclidean distance between c & e
	var eDistCtoE = Math.sqrt(Math.pow(e.x-c.x, 2) + Math.pow(e.y-c.y, 2));

	// test if the line intersects the circle
	if (eDistCtoE <= size){
	
		//console.log("eDistCtoE " + eDistCtoE + " below size " + size);
		// compute distance from t to circle intersection point
		var dist = Math.sqrt(Math.pow(size, 2) - Math.pow(eDistCtoE, 2));

		var entry = {
			x: ((t - dist) * d.x) + a.x, 
			y: ((t - dist) * d.y) + a.y,
			type: 0
		};

		var exit = {
			x: ((t + dist) * d.x) + a.x,
			y: ((t + dist) * d.y) + a.y, 
			type: 1
		};

		var data = [];
		if (is_on(a, b, entry)){
			data.push(entry);
		}
		if (is_on(a, b, exit)){
			data.push(exit);
		}

		return data;

	}
	return false;
}

function is_on(a, b, c) {
	return (Math.round(getDistance(a,c) + getDistance(c,b)) == Math.round(getDistance(a,b)));
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

function rotatePoint(cx, cy, point, angle) {
	var radians = (Math.PI / 180) * angle;
		cos = Math.cos(radians);
		sin = Math.sin(radians);
		nx = (cos * (point.x - cx)) - (sin * (point.y - cy)) + cx;
		ny = (cos * (point.y - cy)) + (sin * (point.x - cx)) + cy;
	return {x: nx, y: ny};
}

function adjustForFacing(facing, angle){
	return angle - facing;
}

function targetInArc(shooter, oPos, tPos, oFacing, system){
	for (var i = 0; i < system.arc.length; i++){
		var	start;
		var	end;

		if (shooter.rolled){
			if (system.arc[i][0] < system.arc[i][1]){
				start = 360 - system.arc[i][1];
				end = 360 - system.arc[i][0];
			}
			else {
				end = 360 - system.arc[i][0];
				start = 360 - system.arc[i][1];
			}
		}
		else {
			start = system.arc[i][0];
			end = system.arc[i][1];
		}

		return isInArc(getCompassHeadingOfPoint(oPos, tPos, oFacing), start, end);
	}
}
	
function isInArc(direction, start, end){
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
		if (dY > 0){heading = 180.0;}
		else heading = 0.0;
	}
	else if (dY == 0){
		if (dX > 0){heading = 90.0;}
		else heading = 270.0;
	}
	else if (dX > 0 && dY < 0){heading = radianToDegree(Math.atan(dX/Math.abs(dY)));}
	else if (dX > 0 && dY > 0){heading = radianToDegree(Math.atan(dY/dX)) + 90;}
	else if (dX < 0 && dY > 0){heading = radianToDegree(Math.atan(Math.abs(dX)/dY)) + 180;}
	else if (dX < 0 && dY < 0){heading = radianToDegree(Math.atan(dY/dX)) + 270;}
	
	heading = addToDirection(heading, -90);
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

function roun2(val){
	return Math.floor(val * 10) / 10; 
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

function getSystemArcDir(element){
	var a = 0;
	if (element.turret){return }
	if (element.start > element.end){
		if (element.start < 360 && element.end > 0){
			a = element.start + (360 - element.start + element.end)/2;
		}
		else a = element.start + element.end;
	}
	else {
	   a = (element.start + element.end) / 2;
	}

	if (a > 360){a -= 360;}
	return a;
}

function getLayoutDir(element){
	var a = 0;
	if (element.start > element.end){
	   a = element.start + element.end;
	}
	else {
	   a = (element.start + element.end) / 2;
	}

	if (a > 360){a -= 360;}
	return a;
}