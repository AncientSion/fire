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
window.ticks = 0;

window.fires = 0;


$(document).ready(function(){
	window.ui = {
		upperGUI: $("#upperGUI"),
		popupWrapper: $("#popupWrapper"),
		instructWrapper: $("#instructWrapper"),
		collideWrapper: $("#collideWrapper"),
		combatLogWrapper: $("#combatLogWrapper"),
		deployOverlay:  $("#deployOverlay"),
		reinforceWrapper: $(".reinforceWrapper"),
		shortInfo: $("#shortInfo"),
		doShorten: $("#doShorten"),
		turnButton: $("#turnButton"),
		unitSelector: $("#unitSelector"),
		aimDiv: $("#aimDiv"),
		targetDataA: $("#aimDiv").find("#targetDataA"),
		targetDataB: $("#aimDiv").find("#targetDataB"),
		targetDataC: $("#aimDiv").find("#targetDataC"),
		weaponInfo: $("#aimDiv").find("#weaponInfo"),
		vector: $("#vectorDiv")
	};


$("#hangarDiv").find("input").mousemove(function(e){e.stopPropagation()}).end().drag();
$("#weaponDiv").find("input").mousemove(function(e){e.stopPropagation()}).end().drag();
$("#crewDiv").find("input").mousemove(function(e){e.stopPropagation()}).end().drag();

})


function doSort(a, b){
	if (a.name != b.name){
		return 1;
	} else return 0;
}


function getUnitType(val){
	switch (val){
		case 7: return "Ultra Heavy";
		case 6: return "Super Heavy";
		case 5: return "Heavy";
		case 4: return "Medium";
		case 3: return "Squadron";
		case 2: return "";
		case 1: return "Flight";
		case 0: return "Salvo";
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
	var unit;
	if (data.ship){unit = window.initShip(data);}
	else if (data.squad){unit = window.initSquadron(data);}
	else if (data.flight){unit = window.initFlight(data);}
	else if (data.salvo){unit = window.initSalvo(data);}
	else if (data.obstacle){unit = window.initObstacle(data);}
	return unit;

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
	}
	return squadron;
}

function initObstacle(data){
	var obstacle = new window[data.name](data);
	for (var i = 0; i < data.primary.systems.length; i++){
		var primSystem = new window[data.primary.systems[i].name](data.primary.systems[i]);
		obstacle.primary.systems.push(primSystem);
	}
	for (var i = 0; i < data.structures.length; i++){
		var asteroid = initAsteroid(data.structures[i]);
		obstacle.structures.push(asteroid);
	}
	return obstacle;
}

function initAsteroid(data){
	var asteroid = new Asteroid(data);
	return asteroid;
}

function initSquaddie(data){
	var unit = new Squaddie(data);

	for (var i = 0; i < data.damages.length; i++){
		if (data.damages[i].turn == game.turn){
			unit.damages.push(new Damage(data.damages[i]));
		} else unit.damages.push(data.damages[i]);
	}

	for (var i = 0; i < data.crits.length; i++){
		unit.crits.push(new Crit(data.crits[i]));
	}
	
	for (var i = 0; i < data.systems.length; i++){
		var system = new window[data.systems[i].type](data.systems[i]);		
		unit.systems.push(system);
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
		ship.primary.systems.push(primSystem);
	}

	for (var j = 0; j < data.structures.length; j++){
		var struct = new window[data.structures[j].name](data.structures[j]);
		if (data.structures[j].damages.length){
			for (var k = 0; k < data.structures[j].damages.length; k++){
				struct.damages.push(new Damage(data.structures[j].damages[k]));
			}
		}		

		for (var k = 0; k < data.structures[j].systems.length; k++){
			var system = new window[data.structures[j].systems[k].type](data.structures[j].systems[k]);
			if (system){struct.systems.push(system);}	
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

function goToLobby(data){
    //console.log(data);
    //return;
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

function collide(text){
    ui.collideWrapper
     	.show()
    	.find(".collideText")
    		.html("<div class='popupSingle'>" + text + "</div>")

	var ox = ui.collideWrapper.width()/2;
	//var height = ui.collideWrapper.height();

    ui.collideWrapper
		.css("top", 70)
		.css("left", window.innerWidth / 2 - ox)
}

function popup(text){
    ui.popupWrapper
     	.show()
    	.find(".popupText")
    		.html("<div class='popupSingle'>" + text + "</div>")

	var ox = ui.popupWrapper.width()/2;
		oy = 400;

    ui.popupWrapper
		.css("top", window.innerHeight / 2 - oy)
		.css("left", window.innerWidth / 2 - ox)
}

function instruct(text){
   ui.instructWrapper
    	.show()
  		.find(".instructText")
  			.html("<div class='popupSingle'>" + text + "</div>")

	var ox = ui.instructWrapper.width()/2;
		oy = 400;

    ui.instructWrapper
		.css("top", window.innerHeight / 2 - oy)
		.css("left", window.innerWidth / 2 - ox)
}

(function($) {
    $.fn.drag = function(options) {
        options = $.extend({
            handle: null,
            draggingClass: 'dragging'
        }, options);

        var $handle = this,
            $drag = this;

        if (options.handle){
            $handle = $(options.handle);
        }

        $handle
            .css('cursor', options.cursor)
            .on("mousedown", function(e){
    			//console.log("drag");
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


function handleMouseDown(e){
	//console.log("handleMouseDown");
	e.preventDefault();
	e.stopPropagation();
	var rect = this.getBoundingClientRect();
	var pos = new Point(e.clientX, e.clientY).getOffset();
	if (e.button != 2){console.log("game pos " + pos.x	+ " / " + pos.y);}

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
				firePhase(e, pos, unit, 0); break;
			case 3: 
				dmgPhase(e, pos, unit); break;
		}
	}
	else if (e.originalEvent.button == 2){
		if (game.deploying && !game.turnMode){
			ui.reinforceWrapper.find("#reinforceBody").find(".selected").each(function(){
				if ($(this).data("id") == game.deploying.id){
					$(this).removeClass("selected");
					game.disableDeployment();
					return;
				}
			})
		}

		var clickUnit = game.getUnitByClick(pos);
		if (clickUnit){
			if (unit && unit.id == clickUnit.id){
				game.getUnit(aUnit).doUnselect(e);
			}
			else clickUnit.switchDiv(e);
		}
		else if (unit){
			if (game.turnMode){
				unit.switchTurnMode();
			} else unit.doUnselect(e);
		}
	}
}

function handleMouseUp(e){
	e.preventDefault();
	e.stopPropagation();
	cam.scroll = 0;
}

function handleMouseOut(e){
	e.preventDefault();
	e.stopPropagation();
	cam.scroll = 0;
}

function sensorEvent(isClick, ship, loc, heading, d, a){
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
	//console.log("angle from heading: " + a + ", dist: " + dist + ", strength: "+str + ", FINAL: " + newidth);

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
		game.redraw();
	}
	else drawSensorArc(w, d, str, loc, heading, a, sensor);
}