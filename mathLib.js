
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
	
	$("#curArc").html("vector angle, start, end: " + direction + " - " + start + " - " + end);
	
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
	}
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
