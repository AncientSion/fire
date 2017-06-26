window.res = {x: 0, y: 0};
window.ml;
window.game;
window.canvas;
window.ctx;
window.fxCanvas;
window.fxCtx;
window.planCanvas;
window.planCtx;
window.moveCanvas;
window.moveCtx;
window.salvoCanvas;
window.salvoCtx;
window.mouseCanvas;
window.mouseCtx;
window.cache;
window.downTime = 0;
window.timout = 0;

function doSort(a, b){
	if (a.name != b.name){
		return 1;
	} else return 0;
}

window.shipImages = {};
window.images = {};

window.multi = 1;

window.anim = false;

window.fire = [];
window.aUnit = false;
window.mode = false;
window.icon;
window.pickedMoves = [];

window.shortInfo = false;
window.ballInfo = false;

window.animation;

window.decayVar = 1000;
window.index = 0;

window.offset = {x: 0, y: 0};

function Animate(){
	this.intercepts = [];
	this.ballAnims = [];

	this.isDone = function(i, j, k){
		var ele = this.ballAnims[i].anims[j];

		if (ele instanceof FireOrder){
			if (ele.anim[k].h && ele.anim[k].n <= ele.anim[k].m+30 || !ele.anim[k].h && ele.anim[k].n <= ele.anim[k].m){
				return false;
			}
			return true;
		}
		else if (ele instanceof Salvo){
			if (ele.anim[k].h && ele.anim[k].n <= ele.anim[k].m+30 || !ele.anim[k].h && ele.anim[k].n <= ele.anim[k].m){
				return false;
			}
			return true;
		}
	}

	this.isReady = function(i, j, k){
		var ele = this.ballAnims[i].anims[j];
		if (ele instanceof FireOrder){
			if (ele.anim[k].n >= 0){
				return true;
			} else return false;
		}

		else if (ele instanceof Salvo){
			if (ele.anim[0].n >= 0){
				return true;
			} else return false;
		}
	}

	this.doAdvance = function(i, j, k){
		var ele = this.ballAnims[i].anims[j];
		if (ele instanceof FireOrder){
			ele.anim[k].n++;
		}
		else if (ele instanceof Salvo){
			ele.anim[k].n++;
		}
	}

	this.doAnimate = function(i, j, k){
		var ele = this.ballAnims[i].anims[j];

		if (ele instanceof FireOrder){
			ele.anim[k].n++;
			if (ele.weapon instanceof Laser){
				if (ele.anim[k].n > 0){
					drawBeam(ele.weapon, ele.anim[k]);
				}
			}
			else {
				if (ele.anim[k].h && ele.anim[k].n >= ele.anim[k].m){
					drawExplosion(ele.weapon, ele.anim[k].tx, ele.anim[k].ty, ele.anim[k].n, ele.anim[k].m, 30);
					//drawExplosion(ele.weapon, ele.shooter, ele.anim[k]);
				}
				else {
					//drawProjectile(ele.weapon, ele.shooter.x, ele.shooter.y, tx, ty, ele.anim[k].n, ele.anim[k].m);
					drawProjectile(ele.weapon, ele.anim[k]);
				}
			}
		}
		else if (ele instanceof Salvo){
			ele.anim[k].n++;
			if (ele.fireOrder != undefined && ele.fireOrder.damages.length && ele.anim[k].n >= ele.anim[k].m){
				for (var i = 0; i < ele.fireOrder.hits[0]; i++){
					drawExplosion(ele.structures[i], ele.x + ele.layout[i].x, ele.y + ele.layout[i].y, ele.anim[k].n, ele.anim[k].m, 30);
				}
			}
			else {
				var x = ele.actions[ele.actions.length-2].x + (ele.anim[k].nx * ele.anim[k].n);
				var y = ele.actions[ele.actions.length-2].y + (ele.anim[k].ny * ele.anim[k].n);
				ctx.save();
				ctx.translate(x, y);
				ctx.rotate((ele.anim[k].f + 90) * (Math.PI/180));

				ele.drawSelf();
				ele.drawPositionMarker();

				ctx.restore();

				ctx.beginPath();
				ctx.moveTo(x, y);
				ctx.lineTo(ele.actions[ele.actions.length-1].x, ele.actions[ele.actions.length-1].y);
				ctx.closePath();

				ctx.globalAlpha = 0.2;
				ctx.strokeStyle = "white";
				ctx.stroke();
				ctx.globalAlpha = 1;
			}
		}
	}

	this.doLog = function(i, j){
		var ele = this.ballAnims[i].anims[j];

		if (ele instanceof FireOrder){
			game.createCombatLogEntry(ele);
		}
		else if (ele instanceof Salvo && ele.fireOrder != undefined){
			game.createCombatLogEntry(ele.fireOrder);
		}
	}
}

window.animate = new Animate();

window.fps;
window.fpsInterval;
window.speedMod = 1;

window.startTime, window.now, window.then, window.elapsed;


window.iterator = 0;

function setFPS(fps){
	window.fps = fps;
	window.fpsInterval = 1000 / window.fps;
}

function initiateShip(data){

	/*var ship = new window[window.ships[i].shipType](
		window.ships[i].id,
		window.ships[i].name,
		window.ships[i].shipType,
		0,
		0,
		0,
		window.ships[i].faction,
		window.ships[i].mass,
		window.ships[i].cost,
		window.ships[i].profile,
		window.ships[i].size,
		window.ships[i].userid,
		window.ships[i].available,
		window.ships[i].baseHitChance,
		window.ships[i].baseImpulse
	)*/

	var ship = new window[data.shipType](data);
	//console.log(data.facing + " / "  + ship.facing);

	if (! ship.flight){
		ship.hitTable = data.hitTable
		ship.primary = new Primary(data.primary);
		for (var j = 0; j < data.primary.systems.length; j++){
			var primSystem = new window[data.primary.systems[j].name](data.primary.systems[j]);

			for (var l = 0; l < data.primary.systems[j].damages.length; l++){
				primSystem.damages.push(new Damage(data.primary.systems[j].damages[l]));
			}

			for (var l = 0; l < data.primary.systems[j].powers.length; l++){
				primSystem.powers.push(new Power(data.primary.systems[j].powers[l]));
			}

			for (var l = 0; l < data.primary.systems[j].crits.length; l++){
				primSystem.crits.push(new Crit(data.primary.systems[j].crits[l]));
			}

			primSystem.setState();
			ship.primary.systems.push(primSystem);
		}
	}
	else {
		ship.dogfights = data.dogfights;
	}

	for (var j = 0; j < data.structures.length; j++){
		var struct;
		if (!ship.flight){
			struct = new Structure(data.structures[j]);
			//if (ship.name == "Primus"){console.log(data.structures[j]);}
		}
		else {
			struct = new Fighter(data.structures[j]);
		}

		if (data.structures[j].damages.length){
			for (var k = 0; k < data.structures[j].damages.length; k++){
				struct.damages.push(new Damage(data.structures[j].damages[k]));
			}
		}
		//if (!ship.flight){struct.setRemainingNegation();}

		for (var k = 0; k < data.structures[j].systems.length; k++){
			var system = new window[data.structures[j].systems[k].type](data.structures[j].systems[k]);
			if (system){
				system.setMount(struct.remainingNegation);
				
				if (system.fireOrders){
					for (var l = 0; l < data.structures[j].systems[k].fireOrders.length; l++){
						system.fireOrders.push(new FireOrder(data.structures[j].systems[k].fireOrders[l]));
					}
				}

				for (var l = 0; l < data.structures[j].systems[k].damages.length; l++){
					system.damages.push(new Damage(data.structures[j].systems[k].damages[l]));
				}

				for (var l = 0; l < data.structures[j].systems[k].powers.length; l++){
					system.powers.push(new Power(data.structures[j].systems[k].powers[l]));
				}

				for (var l = 0; l < data.structures[j].systems[k].crits.length; l++){
					system.crits.push(new Crit(data.structures[j].systems[k].crits[l]));
				}
				system.setState();
				struct.systems.push(system);
			}	
		}
		ship.structures.push(struct);
	}

	return ship;
}

function initiateBallistic(i){
	//(id, userid, targetid, classname, display, amount, status, destroyed, actions){

	var salvo = new Salvo(window.ballistics[i]);

	for (var j = 0; j < window.ballistics[i].structures.length; j++){
		salvo.structures.push(new Missile(window.ballistics[i].structures[j]));
		
		//console.log(window.ballistics[i].structures[j]);

		for (var k = 0; k < window.ballistics[i].structures[j].systems.length; k++){
			salvo.structures[j].systems.push(new Warhead(window.ballistics[i].structures[j].systems[k]));
		}

		//for (var k = 0; k < window.ballistics[i].structures[j].fireOrders.length; k++){
		//	salvo.structures[j].fireOrders.push(window.ballistics[i].structures[j].fireOrders[k]);
		//}
	}
	salvo.create();
	return salvo;
}

function getShipId(){
	return (game.ships.length+1);
}

function resetIndex(){
	window.index = 0;
}

function getId(){
	window.index++;
	return window.index;
}

function refresh(data){
	console.log("refresh");
	console.log(data);
	setTimeout(function(){
		window.location.reload(true);
	}, 300);
}

function goToLobby(){
    console.log("goToLobby");
    setTimeout(function(){
        window.location = "lobby.php";
    }, 300);
}

function processEcho(echo){
	console.log("echo");
	console.log(echo);

	if (echo == "PlayerReady"){
		refresh();
	}
	else if (echo == "gameStart"){
		setTimeout(function(){
			window.location = "game.php?gameid=" + gameid
		}, 300);
	}
}

function launchFlight(e){
	game.getUnitById(aUnit).getSystemById(e.data.systemid).doLaunchFlight();
}

function redirect(url){
	console.log("redirect");
	setTimeout(function(){
		window.location = "lobby.php"
	}, 300);
}

function popup(text){
    $("#popupWrapper").show().find("#popupText").html(text);
}

function instruct(text){
    $("#instructWrapper").show().find("#instructText").html(text);
}

$(document).ready(function(){
    $("#popupWrapper").contextmenu(function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).hide();
	});
    $("#instructWrapper").contextmenu(function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).hide();
	});
    $("#hangarLoadoutDiv").drag()
    $("#weaponLoadoutDiv").drag()
});


var selected = null, // Object of the element to be moved
    x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
    x_elem = 0, y_elem = 0; // Stores top, left values (edge) of the element

// Will be called when user starts dragging an element
function _drag_init(elem) {
    // Store the object of the element which needs to be moved
    selected = elem;
    x_elem = x_pos - selected.offsetLeft;
    y_elem = y_pos - selected.offsetTop;
}

// Will be called when user dragging an element
function _move_elem(e) {
    x_pos = document.all ? window.event.clientX : e.pageX;
    y_pos = document.all ? window.event.clientY : e.pageY;
    if (selected !== null) {
        selected.style.left = (x_pos - x_elem) + 'px';
        selected.style.top = (y_pos - y_elem) + 'px';
    }
}

// Destroy the object when we are done
function _destroy() {
    selected = null;
}


document.onmousemove = _move_elem;
document.onmouseup = _destroy;

// Draggable plugin
(function($) {
    $.fn.drag = function(options) {
        options = $.extend({
            handle: null,
            draggingClass: 'dragging'
        }, options);

        var $handle = this,
            $drag = this;

        if( options.handle ) {
            $handle = $(options.handle);
        }

        $handle
            .css('cursor', options.cursor)
            .on("mousedown", function(e) {
                var x = $drag.offset().left - e.pageX,
                    y = $drag.offset().top - e.pageY,
                    z = $drag.css('z-index');

                $(document.documentElement)
                    .on('mousemove.drag', function(e) {
                        $drag.offset({
                            left: x + e.pageX,
                            top: y + e.pageY
                        });
                    })
                    .one('mouseup', function() {
                        $(this).off('mousemove.drag');
                        $drag.css('z-index', z);
                    });

                // disable selection
                e.preventDefault();
                e.stopPropagation();
            });
            return this;
    };
})(jQuery);



function reOffset(){
	var s = mouseCanvas.getBoundingClientRect();
	offset.x = s.left;
	offset.y = s.top;        
}
/*
var hold

var timeoutId = 0;

$('#myElement').on('mousedown', function() {
    timeoutId = setTimeout(myFunction, 1000);
}).on('mouseup mouseleave', function() {
    clearTimeout(timeoutId);
});

*/
function handleMouseDown(e){
	//console.log("DOWN");
	//console.log(e)
	e.preventDefault();
	e.stopPropagation();
	var rect = this.getBoundingClientRect();
	var pos = new Point(e.clientX - rect.left, e.clientY - rect.top).getOffset();

	if (e.originalEvent.button == 0){
		if (aUnit && game.getUnitById(aUnit).hasSystemSelected("Sensor")){
			sensorize(game.getUnitById(aUnit), pos);
			return;
		}
		window.downTime = new Date();
		cam.scroll = 1;
		cam.sx = e.clientX;
		cam.sy = e.clientY;
	}
	else if (e.originalEvent.button == 2){
		if (game.deploying){
			$("#deployWrapper").find("#reinforceTable").find(".selected").each(function(){
				if ($(this).data("id") == game.deploying){
					$(this).removeClass("selected");
					game.disableDeployment();
					return;
				}
			})
		}
		unit = game.getUnitByClick(pos);
		if (unit){
			if (aUnit == unit.id){
				game.getUnitById(aUnit).doUnselect();
			} else unit.switchDiv();
		}
		else if (aUnit){
			game.getUnitById(aUnit).doUnselect();
		}
	}
}

function handleMouseUp(e){
	//console.log("UP");
	e.preventDefault();
	e.stopPropagation();
	if (e.originalEvent.button == 0){
		var t = (new Date().getTime() - window.downTime.getTime());
		if (t < 166){
			canvasMouseClick(e);
		}
	}
	else if (e.originalEvent.button == 2){
		if (aUnit){
			var t = (new Date().getTime() - window.downTime.getTime());
			if (t < 166){
				console.log(t);
				game.getUnitById(aUnit).doUnselect();
			}
		}
	}
	cam.scroll = 0;
}

function handleMouseOut(e){
	e.preventDefault();
	e.stopPropagation();
	cam.scroll = 0;
}

function sensorEvent(isClick, ship, loc, facing, d, a){
	var sensor = ship.getActiveSensor();
	var str = sensor.getOutput();
		d = Math.min(str, d);
	var p = 1.5;
	var len = 20;
	var	w = Math.min(180, len * Math.pow(str/d, p));
	if (w == 180){
		a = 0;
		d = str/Math.pow(w/len, 1/p);
	}
	//console.log("angle from facing: " + a + ", dist: " + dist + ", strength: "+str + ", FINAL: " + newidth);

	if (isClick && ship.canSetSensor(sensor)){
		//console.log("setting sensor to w: "+w*2+", dist: "+d+", angle: "+a);
		sensor.setEW({
			angle: Math.floor(a),
			dist: Math.floor(d),
			turn: game.turn,
			unitid: ship.id,
			systemid: sensor.id,
			type: sensor.ew[sensor.ew.length-1].type
		});
	} else drawSensorArc(w, d, p, str, len, loc, facing, a, sensor);
}