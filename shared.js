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


function getUnitType(val){
	switch (val){
		case 3: return "Ultra Heavy";
		case 2: return "Super Heavy";
		case 1: return "Heavy";
		case 0: return "Medium";
		case -1: return "Squadron";
		case -2: return "";
		case -3: return "Flight";
		case -4: return "Salvo";
	}
}


function initChat(){
	$(".chatWrapper").removeClass("disabled").find(".chatBox").scrollTop(function(){return this.scrollHeight});
	//if (game.userid){
		var checkChat = setInterval(
			function(){
				ajax.checkChat();
			},
		7000);
	//}

	if (window.game){
		$chat = $(".chatWrapper");
		var w = $chat.width();
		var h = $chat.height();

		var top = (res.y - h-3);

		$chat
			.css("top", top)
			.css("left", 3)
			.data("s", 1)
			.data("pos", top)
			.contextmenu(function(e){
				e.preventDefault(); e.stopPropagation();
				if ($(this).data("s") == 0){
					$(this).data("s", 1).css("width", 600);
				}
				else if ($(this).data("s") == 1){
					$(this).data("s", 2).css("width", Math.min(res.x - 50, 1000)).css("top", res.y - 325)
						.find(".chatBox").addClass("widen");
				}
				else {
					$(this).data("s", 0).css("width", 150).css("top", $(this).data("pos"))
						.find(".chatBox").removeClass("widen")
							.scrollTop(function(){return this.scrollHeight});
				}
			})//.drag();
		}

		if (!game.userid){
			$chat.find(".sendWrapper").remove();
		}
}

function getPhaseString(val){
	switch (val){
		case -1: return "Initial Orders";
		case 0: return "Default Movement";
		case 1: return "Focus Movement";
		case 2: return "Firing Orders";
		case 3: return "Damage Control";
		default: return "ERROR";
	}
}

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

window.fpsTicks;
window.speedMod = 1;

window.startTime, window.now, window.then, window.elapsed;


window.iterator = 0;

function setFPS(fps){
	console.log("setting fps to: " + fps);
	window.fpsTicks = 1000 / fps;
}



function initUnit(data){
	if (data.ship){return window.initShip(data);}
	else if (data.squad){return window.initSquadron(data);}
	else if (data.flight){return window.initFlight(data);}
	else if (data.salvo){return window.initSalvo(data);}
}

function initSalvo(data){
	var salvo = new Salvo(data);
	for (var i = 0; i < data.structures.length; i++){
		salvo.structures.push(initBallistic(data.structures[i]));
	}
	return salvo;
}

function initFlight(data){
	var flight = new Flight(data);
	for (var i = 0; i < data.structures.length; i++){
		flight.structures.push(initFighter(data.structures[i]));
	}
	return flight;	
}

function initFighter(data){return new Fighter(data);}
function initBallistic(data){return new Ballistic(data);}

function initSquadron(data){
	var squadron = new Squadron(data);
	for (var i = 0; i < data.primary.systems.length; i++){
		var primSystem = new window[data.primary.systems[i].name](data.primary.systems[i]);
		squadron.primary.systems.push(primSystem);
	}
	for (var i = 0; i < data.structures.length; i++){
		var sub = initSquaddie(data.structures[i]);
			sub.create()
		squadron.structures.push(sub)
		//squadron.addSubElement(sub);
	}
	return squadron;
}

function initSquaddie(data){
	var unit = new Squaddie(data);

	for (var i = 0; i < data.damages.length; i++){
		if (data.damages[i].turn == game.turn){
			unit.damages.push(new Damage(data.damages[i]));
		} else unit.damages.push(data.damages[i]);
	}

	for (var i = 0; i < data.crits.length; i++){
		//if (data.crits[i].turn == game.turn){
			unit.crits.push(new Crit(data.crits[i]));
		//}
	}

	for (var j = 0; j < data.structures.length; j++){
		var struct = new Section(data.structures[j]);

		for (var k = 0; k < data.structures[j].systems.length; k++){
			var system = new window[data.structures[j].systems[k].type](data.structures[j].systems[k]);				
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
			struct.systems.push(system);
		}
		unit.structures.push(struct);
	}
	return unit;
}

function initShip(data){
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
				//system.setMount(struct.remNegation);
				
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
            	if (e.button == 2){return;}
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
	//console.log("handleMouseDown");
	e.preventDefault();
	e.stopPropagation();
	var rect = this.getBoundingClientRect();
	var pos = new Point(e.clientX - offset.x, e.clientY - offset.y).getOffset();
	console.log("game pos " + pos.x	+ " / " + pos.y);

	var unit;	
	if (aUnit){unit = game.getUnit(aUnit);}

	$(":focus").blur();

	if (e.originalEvent.button == 0){

		window.downTime = new Date();
		cam.scroll = 1;
		cam.sx = e.clientX;
		cam.sy = e.clientY;

		switch (game.phase){
			case -1:
				planPhase(e, pos, unit); break;
			case 0: 
				planPhase(e, pos, unit); break;
			case 1: 
				planPhase(e, pos, unit); break;
			case 2: 
				firePhase(pos, unit, 0); break;
			case 3: 
				dmgPhase(e, pos, unit); break;
		}
	}
	else if (e.originalEvent.button == 2){
		if (game.deploying && !game.turnMode){
			$("#deployWrapper").find("#reinforceTable").find(".selected").each(function(){
				if ($(this).data("id") == game.deploying){
					$(this).removeClass("selected");
					game.disableDeploy();
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
	var sensor = ship.getSystemByName("Sensor");
	var str = sensor.getOutput();
		d = Math.min(str*2, d);
	var	w = Math.min(180, round(game.const.ew.len * Math.pow(str/d, game.const.ew.p), 2));
	if (w == 180){
		a = -1;
		d = str/Math.pow(w/game.const.ew.len, 1/game.const.ew.p);
	}

	//console.log(w);
	//console.log(Math.floor(d));
	//console.log("angle from facing: " + a + ", dist: " + dist + ", strength: "+str + ", FINAL: " + newidth);

	if (isClick && ship.canSetSensor(sensor)){
		//console.log("setting sensor to w: "+w*2+", dist: "+d+", angle: "+a);
		sensor.setEW({
			angle: a,
			dist: Math.floor(d),
			turn: game.turn,
			unitid: ship.id,
			systemid: sensor.id,
			type: sensor.ew[sensor.ew.length-1].type
		});
		salvoCtx.clearRect(0, 0, res.x, res.y);
		sensor.setTempEW();
	}
	drawSensorArc(w, d, str, loc, facing, a, sensor);
}