window.res = {x: 0, y: 0};
window.ml;
window.game;
window.canvas;
window.ctx;
window.fxCanvas;
window.fxCtx;
window.planCanvas;
window.planCtx;
window.actionCanvas;
window.actionCtx;
window.mouseCanvas;
window.mouseCtx;
window.cache;

function doSort(a, b){
	if (a.name != b.name){
		return 1;
	} else return 0;
}

window.shipImages = {};
window.factionImages = {};

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

function Animate(){
	this.intercepts = [];
}
window.animate = new Animate();

window.fps = 100;
window.fpsInterval = 1000 / window.fps;
window.speedMod = 10;

window.startTime, window.now, window.then, window.elapsed;


window.iterator = 0;

function initiateShip(i){

	var ship = new window[window.ships[i].shipType](
		window.ships[i].id,
		window.ships[i].classname,
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
		window.ships[i].available
	)

	if (! ship.flight){
		ship.primary = new Primary(
			window.ships[i].primary.id,
			window.ships[i].primary.parentId,
			window.ships[i].primary.integrity,
	        window.ships[i].primary.damages,
	        window.ships[i].primary.destroyed
		)

		for (var j = 0; j < window.ships[i].primary.systems.length; j++){
			var primSystem = new window[window.ships[i].primary.systems[j].name](
				window.ships[i].primary.systems[j].id,
				window.ships[i].primary.systems[j].parentId,
				window.ships[i].primary.systems[j].name,
				window.ships[i].primary.systems[j].display,
				window.ships[i].primary.systems[j].integrity,
				window.ships[i].primary.systems[j].powerReq,
				window.ships[i].primary.systems[j].output,
				window.ships[i].primary.systems[j].effiency,
				window.ships[i].primary.systems[j].maxBoost
			)

			for (var k = 0; k < window.ships[i].primary.systems[j].damages.length; k++){
				var dmg = new Damage(
					window.ships[i].primary.systems[j].damages[k].id,
					window.ships[i].primary.systems[j].damages[k].fireid,
					window.ships[i].primary.systems[j].damages[k].gameid,
					window.ships[i].primary.systems[j].damages[k].shipid,
					window.ships[i].primary.systems[j].damages[k].structureid,
					window.ships[i].primary.systems[j].damages[k].systemid,
					window.ships[i].primary.systems[j].damages[k].turn,
					window.ships[i].primary.systems[j].damages[k].roll,
					window.ships[i].primary.systems[j].damages[k].type,
					window.ships[i].primary.systems[j].damages[k].totalDmg,
					window.ships[i].primary.systems[j].damages[k].shieldDmg,
					window.ships[i].primary.systems[j].damages[k].structDmg,
					window.ships[i].primary.systems[j].damages[k].armourDmg,
					window.ships[i].primary.systems[j].damages[k].mitigation,
					window.ships[i].primary.systems[j].damages[k].negation,
					window.ships[i].primary.systems[j].damages[k].destroyed,
					window.ships[i].primary.systems[j].damages[k].notes
				)
				primSystem.damages.push(dmg);
			}

			for (var l = 0; l < window.ships[i].primary.systems[j].powers.length; l++){
				primSystem.powers.push(
					new Power(
						window.ships[i].primary.systems[j].powers[l].id,
						window.ships[i].primary.systems[j].powers[l].unitid,
						window.ships[i].primary.systems[j].powers[l].systemid,
						window.ships[i].primary.systems[j].powers[l].turn,
						window.ships[i].primary.systems[j].powers[l].type,
						window.ships[i].primary.systems[j].powers[l].cost
					)
				)
			}

			for (var l = 0; l < window.ships[i].primary.systems[j].crits.length; l++){
				primSystem.crits.push(
					new Crit(
						window.ships[i].primary.systems[j].crits[l].id,
						window.ships[i].primary.systems[j].crits[l].shipid,
						window.ships[i].primary.systems[j].crits[l].systemid,
						window.ships[i].primary.systems[j].crits[l].turn,
						window.ships[i].primary.systems[j].crits[l].type,
						window.ships[i].primary.systems[j].crits[l].duration
					)
				)
			}

			primSystem.setState();
			ship.primary.systems.push(primSystem);
		}
	}
	else {
		ship.dogfights = window.ships[i].dogfights;
	}

	for (var j = 0; j < window.ships[i].structures.length; j++){
		if (! ship.flight){
			var struct = new Structure(
				window.ships[i].structures[j].id,
				window.ships[i].structures[j].parentId,
				window.ships[i].structures[j].start,
				window.ships[i].structures[j].end,
				window.ships[i].structures[j].integrity,
				window.ships[i].structures[j].negation,
				window.ships[i].structures[j].destroyed
			);
		}
		else {
			var struct = new Fighter(
				window.ships[i].structures[j].id,
				window.ships[i].structures[j].name,
				window.ships[i].structures[j].ep,
				window.ships[i].structures[j].turns,
				window.ships[i].structures[j].mass,
				window.ships[i].structures[j].integrity,
				window.ships[i].structures[j].value,
				window.ships[i].structures[j].negation,
				window.ships[i].structures[j].crits,
				window.ships[i].structures[j].destroyed
			);
		}

		if (window.ships[i].structures[j].damages.length){
			for (var k = 0; k < window.ships[i].structures[j].damages.length; k++){
				var dmg = new Damage(
					window.ships[i].structures[j].damages[k].id,
					window.ships[i].structures[j].damages[k].fireid,
					window.ships[i].structures[j].damages[k].gameid,
					window.ships[i].structures[j].damages[k].shipid,
					window.ships[i].structures[j].damages[k].structureid,
					window.ships[i].structures[j].damages[k].systemid,
					window.ships[i].structures[j].damages[k].turn,
					window.ships[i].structures[j].damages[k].roll,
					window.ships[i].structures[j].damages[k].type,
					window.ships[i].structures[j].damages[k].totalDmg,
					window.ships[i].structures[j].damages[k].shieldDmg,
					window.ships[i].structures[j].damages[k].structDmg,
					window.ships[i].structures[j].damages[k].armourDmg,
					window.ships[i].structures[j].damages[k].mitigation,
					window.ships[i].structures[j].damages[k].negation,
					window.ships[i].structures[j].damages[k].destroyed,
					window.ships[i].structures[j].damages[k].notes
				)

				struct.damages.push(dmg);
			}
		}

		for (var k = 0; k < window.ships[i].structures[j].systems.length; k++){
			if (window.ships[i].structures[j].systems[k].type == "Laser"){
				var system = new window[window.ships[i].structures[j].systems[k].type](
					window.ships[i].structures[j].systems[k].id,
					window.ships[i].structures[j].systems[k].parentId,
					window.ships[i].structures[j].systems[k].name,
					window.ships[i].structures[j].systems[k].display,
					window.ships[i].structures[j].systems[k].exploSize,
					window.ships[i].structures[j].systems[k].rakeTime,
					window.ships[i].structures[j].systems[k].animColor,
					window.ships[i].structures[j].systems[k].beamWidth,
                    window.ships[i].structures[j].systems[k].integrity,
                    window.ships[i].structures[j].systems[k].powerReq,
                    window.ships[i].structures[j].systems[k].rakes,
                    window.ships[i].structures[j].systems[k].effiency,
                    window.ships[i].structures[j].systems[k].maxBoost,
                    window.ships[i].structures[j].systems[k].fc,
					window.ships[i].structures[j].systems[k].minDmg,
					window.ships[i].structures[j].systems[k].maxDmg,
					window.ships[i].structures[j].systems[k].optRange,
					window.ships[i].structures[j].systems[k].dmgDecay,
					window.ships[i].structures[j].systems[k].accDecay,
					window.ships[i].structures[j].systems[k].linked,
					window.ships[i].structures[j].systems[k].shots,
					window.ships[i].structures[j].systems[k].reload,
					window.ships[i].structures[j].systems[k].start,
					window.ships[i].structures[j].systems[k].end
				)
			}
			else if (window.ships[i].structures[j].systems[k].type == "Particle" || window.ships[i].structures[j].systems[k].type == "Matter" || window.ships[i].structures[j].systems[k].type == "EM"){
				var system = new window[window.ships[i].structures[j].systems[k].type](
					window.ships[i].structures[j].systems[k].id,
					window.ships[i].structures[j].systems[k].parentId,
					window.ships[i].structures[j].systems[k].name,
					window.ships[i].structures[j].systems[k].display,
					window.ships[i].structures[j].systems[k].exploSize,
					window.ships[i].structures[j].systems[k].animColor,
					window.ships[i].structures[j].systems[k].projSize,
					window.ships[i].structures[j].systems[k].projSpeed,
                    window.ships[i].structures[j].systems[k].integrity,
                    window.ships[i].structures[j].systems[k].powerReq,
					window.ships[i].structures[j].systems[k].output,
                    window.ships[i].structures[j].systems[k].effiency,
                    window.ships[i].structures[j].systems[k].maxBoost,
                    window.ships[i].structures[j].systems[k].fc,
					window.ships[i].structures[j].systems[k].minDmg,
					window.ships[i].structures[j].systems[k].maxDmg,
					window.ships[i].structures[j].systems[k].accDecay,
					window.ships[i].structures[j].systems[k].linked,
					window.ships[i].structures[j].systems[k].shots,
					window.ships[i].structures[j].systems[k].reload,
					window.ships[i].structures[j].systems[k].start,
					window.ships[i].structures[j].systems[k].end
				)
			}
			else if (window.ships[i].structures[j].systems[k].type == "Launcher"){
				var system = new window[window.ships[i].structures[j].systems[k].type](
					window.ships[i].structures[j].systems[k].id,
					window.ships[i].structures[j].systems[k].parentId,
					window.ships[i].structures[j].systems[k].name,
					window.ships[i].structures[j].systems[k].display,
					window.ships[i].structures[j].systems[k].launchRate,
                    window.ships[i].structures[j].systems[k].integrity,
                    window.ships[i].structures[j].systems[k].powerReq,
					window.ships[i].structures[j].systems[k].output,
                    window.ships[i].structures[j].systems[k].effiency,
                    window.ships[i].structures[j].systems[k].maxBoost,
					window.ships[i].structures[j].systems[k].reload,
					window.ships[i].structures[j].systems[k].start,
					window.ships[i].structures[j].systems[k].end
				)
				system.ammo = new TempAmmo(
					window.ships[i].structures[j].systems[k].ammo.name,
					window.ships[i].structures[j].systems[k].ammo.display,
					window.ships[i].structures[j].systems[k].ammo.minDmg,
					window.ships[i].structures[j].systems[k].ammo.maxDmg,
					window.ships[i].structures[j].systems[k].ammo.impulse,
					window.ships[i].structures[j].systems[k].ammo.mass,
					window.ships[i].structures[j].systems[k].ammo.integrity,
					window.ships[i].structures[j].systems[k].ammo.armour,
					window.ships[i].structures[j].systems[k].ammo.fc
				)
			}
			else if (window.ships[i].structures[j].systems[k].name == "Hangar"){
				var system = new window[window.ships[i].structures[j].systems[k].name](
					window.ships[i].structures[j].systems[k].id,
					window.ships[i].structures[j].systems[k].parentId,
					window.ships[i].structures[j].systems[k].name,
					window.ships[i].structures[j].systems[k].display,
					window.ships[i].structures[j].systems[k].start,
					window.ships[i].structures[j].systems[k].end,
                    window.ships[i].structures[j].systems[k].integrity,
					window.ships[i].structures[j].systems[k].powerReq,
					window.ships[i].structures[j].systems[k].output,
                    window.ships[i].structures[j].systems[k].effiency,                
                    window.ships[i].structures[j].systems[k].loads
				)
			}

			if (system){
				if (system.fireOrders){
					for (var l = 0; l < window.ships[i].structures[j].systems[k].fireOrders.length; l++){
						system.fireOrders.push(
							new FireOrder(
								window.ships[i].structures[j].systems[k].fireOrders[l].id,
								window.ships[i].structures[j].systems[k].fireOrders[l].turn,
								window.ships[i].structures[j].systems[k].fireOrders[l].shooterid,
								window.ships[i].structures[j].systems[k].fireOrders[l].targetid,
								window.ships[i].structures[j].systems[k].fireOrders[l].weaponid,
								window.ships[i].structures[j].systems[k].fireOrders[l].shots,
								window.ships[i].structures[j].systems[k].fireOrders[l].req,
								window.ships[i].structures[j].systems[k].fireOrders[l].notes,
								window.ships[i].structures[j].systems[k].fireOrders[l].hits,
								window.ships[i].structures[j].systems[k].fireOrders[l].resolved
							)
						)	
					}
				}

				for (var l = 0; l < window.ships[i].structures[j].systems[k].damages.length; l++){
					system.damages.push(
						new Damage(
							window.ships[i].structures[j].systems[k].damages[l].id,
							window.ships[i].structures[j].systems[k].damages[l].fireid,
							window.ships[i].structures[j].systems[k].damages[l].gameid,
							window.ships[i].structures[j].systems[k].damages[l].shipid,
							window.ships[i].structures[j].systems[k].damages[l].structureid,
							window.ships[i].structures[j].systems[k].damages[l].systemid,
							window.ships[i].structures[j].systems[k].damages[l].turn,
							window.ships[i].structures[j].systems[k].damages[l].roll,
							window.ships[i].structures[j].systems[k].damages[l].type,
							window.ships[i].structures[j].systems[k].damages[l].totalDmg,
							window.ships[i].structures[j].systems[k].damages[l].shieldDmg,
							window.ships[i].structures[j].systems[k].damages[l].structDmg,
							window.ships[i].structures[j].systems[k].damages[l].armourDmg,
							window.ships[i].structures[j].systems[k].damages[l].mitigation,
							window.ships[i].structures[j].systems[k].damages[l].negation,
							window.ships[i].structures[j].systems[k].damages[l].destroyed,
							window.ships[i].structures[j].systems[k].damages[l].notes
						)
					)
				}

				for (var l = 0; l < window.ships[i].structures[j].systems[k].powers.length; l++){
					system.powers.push(
						new Power(
							window.ships[i].structures[j].systems[k].powers[l].id,
							window.ships[i].structures[j].systems[k].powers[l].unitid,
							window.ships[i].structures[j].systems[k].powers[l].systemid,
							window.ships[i].structures[j].systems[k].powers[l].turn,
							window.ships[i].structures[j].systems[k].powers[l].type,
							window.ships[i].structures[j].systems[k].powers[l].cost
						)
					)
				}

				for (var l = 0; l < window.ships[i].structures[j].systems[k].crits.length; l++){
					system.crits.push(
						new Crit(
							window.ships[i].structures[j].systems[k].crits[l].id,
							window.ships[i].structures[j].systems[k].crits[l].shipid,
							window.ships[i].structures[j].systems[k].crits[l].systemid,
							window.ships[i].structures[j].systems[k].crits[l].turn,
							window.ships[i].structures[j].systems[k].crits[l].type,
							window.ships[i].structures[j].systems[k].crits[l].duration
						)
					)
				}
				system.structureId = window.ships[i].structures[j].id;
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

function sharedLaunchFlight(e){
	game.getUnitById(aUnit).getSystemById(e.data.systemid).launchFlight();
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
            });
    };
})(jQuery);