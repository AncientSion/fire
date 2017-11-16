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
window.hold = 0;
window.translate = 0;

function doSort(a, b){
	if (a.name != b.name){
		return 1;
	} else return 0;
}

function initChat(){
	
	$(".chatWrapper").find(".chatBox").scrollTop(function(){return this.scrollHeight});
	var checkChat = setInterval(
		function(){
			ajax.getChat();
		},
	7000);

	if (window.game){
		$chat = $(".chatWrapper");
		var w = $chat.width();
		var h = $chat.height();

		$chat.css("top", res.y - h-3).css("left", 3).removeClass("disabled").data("on", 1)
			.contextmenu(function(e){
				e.preventDefault(); e.stopPropagation();
				if ($(this).data("on")){
					$(this).css("width", 150).data("on", 0);
				} else $(this).css("width", 600).data("on", 1);

		})
	}
	//	return;
	$(this).keypress(function(e){
		if (e.keyCode == 13){ajax.doChat();} // enter
	})
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
			ele.setPostMovePosition();
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
					drawExplosion(ele.weapon, ele.anim[k], 30);
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
					drawExplosion(ele.structures[i], {n: ele.anim[k].n, m: ele.anim[k].m, tx: ele.actions[0].x + ele.layout[i].x, ty: ele.actions[0].y + ele.layout[i].y}, 30);
				}
			}
			else {
				ele.drawX += ele.anim[k].nx;
				ele.drawY += ele.anim[k].ny;
				ele.drawMove();
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

function initiateUnit(data){
	switch (data.unitType){
		case "Ship": return window.initiateShip(data);
		case "Flight": return window.initiateFlight(data);
		case "Salvo": return window.initiateSalvo(data);
	}
}

function initiateSalvo(data){
	var salvo = new Salvo(data);

	for (var j = 0; j < data.structures.length; j++){
		salvo.structures.push(new Missile(data.structures[j]));
	}

	return salvo;
}


function initiateFlight(data){
	//return

	var flight = new Flight(data);

	for (var j = 0; j < data.structures.length; j++){
		flight.structures.push(new Fighter(data.structures[j]));

		for (var k = 0; k < data.structures[j].systems.length; k++){
			var system = new window[data.structures[j].systems[k].type](data.structures[j].systems[k]);
			for (var l = 0; l < data.structures[j].systems[k].fireOrders.length; l++){
				system.fireOrders.push(new FireOrder(data.structures[j].systems[k].fireOrders[l]));
			}
			system.setState();
			flight.structures[j].systems.push(system);
		}

		for (var k = 0; k < data.structures[j].crits.length; k++){
			flight.structures[j].crits.push(new Crit(data.structures[j].crits[k]));
		}

	}
	return flight;
	
}

function initiateShip(data){


	var ship = new Ship(data);
		ship.hitTable = data.hitTable;
		ship.primary = new Primary(data.primary);
	for (var i = 0; i < data.primary.damages.length; i++){
		if (data.primary.damages[i].turn == game.turn){
			ship.primary.damages.push(new Damage(data.primary.damages[i]));
		} else ship.primary.damages.push(data.primary.damages[i]);
	}

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

	for (var j = 0; j < data.structures.length; j++){
		var struct = new Structure(data.structures[j]);
		if (data.structures[j].damages.length){
			for (var k = 0; k < data.structures[j].damages.length; k++){
				struct.damages.push(new Damage(data.structures[j].damages[k]));
			}
		}		

		for (var k = 0; k < data.structures[j].systems.length; k++){
			var system = new window[data.structures[j].systems[k].type](data.structures[j].systems[k]);
			if (system){
				system.setMount(struct.remainingNegation);
				
				for (var l = 0; l < data.structures[j].systems[k].fireOrders.length; l++){
					system.fireOrders.push(new FireOrder(data.structures[j].systems[k].fireOrders[l]));
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
    }, 600);
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
	game.getUnit(aUnit).getSystemById(e.data.systemid).doLaunchFlight();
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

//window.dragging = false;


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
            .on("mousedown", function(e){

                e.preventDefault();
                e.stopPropagation();

                var x = $drag.offset().left - e.pageX;
                var y = $drag.offset().top - e.pageY;
                   // z = $drag.css('z-index');

                $(document.documentElement)
                    .on('mousemove.drag', function(e){
                        $drag.offset({
                            left: x + e.pageX,
                            top: y + e.pageY
                        });
                    })
                    .on('mouseup', function(e){
                    	$(this).off('mousemove.drag');
                    })
            })
            .on("mouseleave", function(e){
            	$(document.documentElement).off("mousemove.drag");
            });
            return this;
    };
})(jQuery);

function reOffset(){
	var s = mouseCanvas.getBoundingClientRect();
	offset.x = s.left;
	offset.y = s.top;        
}

function handleMouseDown(e){
	e.preventDefault();
	e.stopPropagation();
	var unit;
	var rect = this.getBoundingClientRect();
	var pos = new Point(e.clientX - offset.x, e.clientY - offset.y).getOffset();
	console.log("game pos " + pos.x	+ " / " + pos.y);

	if (aUnit){
		unit = game.getUnit(aUnit);
	}

	if (e.originalEvent.button == 0){
		if (game.sensorMode){
			salvoCtx.clearRect(0, 0, res.x, res.y);
			sensorize(game.getUnit(aUnit), pos);
			return;
		}
		window.downTime = new Date();
		cam.scroll = 1;
		cam.sx = e.clientX;
		cam.sy = e.clientY;

		switch (game.phase){
			case -1:
				deployPhase(e, pos); break;
			case 0: 
				movePhase(e, pos, unit); break;
			case 2: 
				firePhase(e, pos, unit); break;
			case 3: 
				dmgPhase(e, pos, unit); break;
		}
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

		var clickUnit = game.getUnitByClick(pos);
		if (clickUnit){
			if (unit && unit.id == clickUnit.id){
				game.getUnit(aUnit).doUnselect();
			}
			else clickUnit.switchDiv();
		}
		else if (unit){
			if (game.turnMode){
				unit.switchTurnMode();
			} else unit.doUnselect();
		}
	}
}

function handleMouseUp(e){
	e.preventDefault();
	e.stopPropagation();

	/*if (e.originalEvent.button == 0){
		var t = (new Date().getTime() - window.downTime.getTime());
		if (t < 166){
			canvasMouseClick(e);
		}
	}*/
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
		d = Math.min(str*1.25, d);
	var	w = Math.min(180, Math.round(game.const.ew.len * Math.pow(str/d, game.const.ew.p)));
	if (w == 180){
		a = -1;
		d = str/Math.pow(w/game.const.ew.len, 1/game.const.ew.p);
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
	}
	drawSensorArc(w, d, str, loc, facing, a, sensor);
}