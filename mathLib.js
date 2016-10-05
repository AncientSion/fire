
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

function radianToDegree(angle){
	return angle * (180.0 / Math.PI);
}

function getAngleFromTo(a, b){
	return radianToDegree(Math.atan2(b.y-a.y, b.x-a.x));
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

function getCompassHeadingOfPoint(observer, target){
	var dX = target.x - observer.x;
	var dY = target.y - observer.y;
	var heading = 0.0;
	//console.log("dX: " +dX+ " dY: " + dY);				
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
		//console.log("h:1");
		heading = radianToDegree(Math.atan(dX/Math.abs(dY)));
	}else if (dX>0 && dY>0 ){
		//console.log("h:2");
		heading = radianToDegree(Math.atan(dY/dX)) + 90;
	}else if (dX<0 && dY>0){
		//console.log("h:3");
		heading = radianToDegree(Math.atan(Math.abs(dX)/dY)) + 180;
	}else if (dX<0 && dY<0){
		//console.log("h:4");
		heading = radianToDegree(Math.atan(dY/dX)) + 270;
	}
	heading = addToDirection(Math.round(heading), -90);

	return heading;
}
		
			

function drawArrow(x, y, a, w, d){        
	var p1, p2, p3;
	
	p = getPointInDirection(d, a, x, y);
	p1 = getPointInDirection(d/2, 0+a , p.x, p.y);
	p2 = getPointInDirection(d/2, 120+a, p.x, p.y);
	p3 = getPointInDirection(d/2, 240+a, p.x, p.y);
	
	moveCtx.lineWidth = w;
	moveCtx.beginPath();
	moveCtx.moveTo(p.x, p.y);
	moveCtx.lineTo(p1.x, p1.y);
	moveCtx.lineTo(p2.x, p2.y);
	moveCtx.lineTo(p3.x, p3.y);
	moveCtx.lineTo(p1.x, p1.y);
	moveCtx.closePath();
	moveCtx.fillStyle = "black";
	moveCtx.fill();
	moveCtx.stroke();
	
	
	moveCtx.beginPath();
//	moveCtx.arc(x, y, 3, 0, 2*Math.PI);
	moveCtx.arc(p.x, p.y, 3, 0, 2*Math.PI);
	moveCtx.closePath();
	moveCtx.fillStyle = "red";
	moveCtx.fill();
	moveCtx.stroke();
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

//		drawAndRotate(pos.x, pos.y, tleft.width, tleft.height, 40, 40, this.facing, tleft);
		
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
