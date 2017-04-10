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
	this.ballAnims = [];

	this.isDone = function(i, j, k){
		var ele = this.ballAnims[i].anims[j];

		if (ele instanceof FireOrder){
			if (ele.anim[k].h && ele.anim[k].n <= ele.anim[k].m*1.25 || !ele.anim[k].h && ele.anim[k].n <= ele.anim[k].m){
				return false;
			}
			return true;
		}
		else if (ele instanceof Salvo){
			if (ele.anim[k].h && ele.anim[k].n <= ele.anim[k].m*1.25 || !ele.anim[k].h && ele.anim[k].n <= ele.anim[k].m){
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
			if (ele.anim[k].h && ele.anim[k].n >= ele.anim[k].m){
				drawExplosion(ele.weapon, ele.anim[k].tx, ele.anim[k].ty, ele.anim[k].n, ele.anim[k].m*1.25);
				//drawExplosion(ele.weapon, ele.shooter, ele.anim[k]);
			}
			else {
				//drawProjectile(ele.weapon, ele.shooter.x, ele.shooter.y, tx, ty, ele.anim[k].n, ele.anim[k].m);
				drawProjectile(ele.weapon, ele.anim[k]);
			}
		}
		else if (ele instanceof Salvo){
			ele.anim[k].n++;
			if (ele.fireOrder != undefined && ele.fireOrder.damages.length && ele.anim[k].n >= ele.anim[k].m){
				for (var i = 0; i < ele.layout.length; i++){
					if (ele.fireOrder.hits[i]){
						drawExplosion(ele.structures[i], ele.x + ele.layout[i].x, ele.y + ele.layout[i].y, ele.anim[k].n, ele.anim[k].m*1.25);
						//drawExplosion(ele.structures[i], ele, ele.anim[k]);
					}
				}
			}
			else {
				var x = ele.actions[ele.actions.length-2].x + (ele.anim[k].nx * ele.anim[k].n);
				var y = ele.actions[ele.actions.length-2].y + (ele.anim[k].ny * ele.anim[k].n);
				ctx.save();
				ctx.translate(x, y);

				ctx.rotate((ele.anim[k].f + 90) * (Math.PI/180));
				ctx.drawImage(ele.img, 0 -ele.size/2, 0 -ele.size/2, ele.size, ele.size);

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
		else if (ele instanceof Salvo && ele.fireOrder != undefined && ele.fireOrder.guns){
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

function initiateShip(i){

	var ship = new window[window.ships[i].shipType](
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
		window.ships[i].available
	)


	if (! ship.flight){
		ship.hitTable = window.ships[i].hitTable
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
				window.ships[i].primary.systems[j].maxBoost,
				window.ships[i].primary.systems[j].boostEffect
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
		var struct;
		if (! ship.flight){
			struct = new Structure(
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
			struct = new Fighter(
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
                    window.ships[i].structures[j].systems[k].boostEffect,
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
			else if (window.ships[i].structures[j].systems[k].type == "Particle"
				|| window.ships[i].structures[j].systems[k].type == "Matter"
				|| window.ships[i].structures[j].systems[k].type == "Pulse"
				|| window.ships[i].structures[j].systems[k].type == "EM"){
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
                    window.ships[i].structures[j].systems[k].boostEffect,
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
					window.ships[i].structures[j].systems[k].ammo,
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

				for (var l = 0; l < window.ships[i].structures[j].systems[k].loads.length; l++){
					system.loads.push(
						new Ammo(
							window.ships[i].structures[j].systems[k].loads[l].id,
							window.ships[i].structures[j].systems[k].loads[l].name,
							window.ships[i].structures[j].systems[k].loads[l].cost,
							window.ships[i].structures[j].systems[k].loads[l].display,
							window.ships[i].structures[j].systems[k].loads[l].exploSize,
							window.ships[i].structures[j].systems[k].loads[l].minDmg,
							window.ships[i].structures[j].systems[k].loads[l].maxDmg,
							window.ships[i].structures[j].systems[k].loads[l].impulse,
							window.ships[i].structures[j].systems[k].loads[l].mass,
							window.ships[i].structures[j].systems[k].loads[l].integrity,
							window.ships[i].structures[j].systems[k].loads[l].armour,
							window.ships[i].structures[j].systems[k].loads[l].fc,
							window.ships[i].structures[j].systems[k].loads[l].damages,
							window.ships[i].structures[j].systems[k].loads[l].crits,
							window.ships[i].structures[j].systems[k].loads[l].destroyed
						)
					)
				}
				system.create();
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
                    window.ships[i].structures[j].systems[k].reload,
					window.ships[i].structures[j].systems[k].output,
                    window.ships[i].structures[j].systems[k].effiency,
                    window.ships[i].structures[j].systems[k].loads
				)
			}

			if (system){
				system.type = window.ships[i].structures[j].systems[k].type;
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

function initiateBallistic(i){
	//(id, userid, targetid, classname, display, amount, status, destroyed, actions){

	var salvo = new Salvo(
			window.ballistics[i].id,
			window.ballistics[i].userid,
			window.ballistics[i].targetid,
			window.ballistics[i].name,
			window.ballistics[i].amount,
			window.ballistics[i].status,
			window.ballistics[i].destroyed,
			window.ballistics[i].actions
			);

	for (var j = 0; j < window.ballistics[i].structures.length; j++){
		salvo.structures.push(
			new Ammo(
				window.ballistics[i].structures[j].id,
				window.ballistics[i].structures[j].name,
				window.ballistics[i].structures[j].cost,
				window.ballistics[i].structures[j].display,
				window.ballistics[i].structures[j].exploSize,
				window.ballistics[i].structures[j].minDmg,
				window.ballistics[i].structures[j].maxDmg,
				window.ballistics[i].structures[j].impulse,
				window.ballistics[i].structures[j].mass,
				window.ballistics[i].structures[j].integrity,
				window.ballistics[i].structures[j].armour,
				window.ballistics[i].structures[j].fc,
				window.ballistics[i].structures[j].damages,
				window.ballistics[i].structures[j].crits,
				window.ballistics[i].structures[j].destroyed
			)
		)
		for (var k = 0; k < window.ballistics[i].structures[j].fireOrders.length; k++){
			salvo.structures[j].fireOrders.push(
				new FireOrder(
					window.ballistics[i].structures[j].fireOrders[k].id,
					window.ballistics[i].structures[j].fireOrders[k].turn,
					window.ballistics[i].structures[j].fireOrders[k].shooterid,
					window.ballistics[i].structures[j].fireOrders[k].targetid,
					window.ballistics[i].structures[j].fireOrders[k].weaponid,
					window.ballistics[i].structures[j].fireOrders[k].shots,
					window.ballistics[i].structures[j].fireOrders[k].req,
					window.ballistics[i].structures[j].fireOrders[k].notes,
					window.ballistics[i].structures[j].fireOrders[k].hits,
					window.ballistics[i].structures[j].fireOrders[k].resolved
				)
			)
		}
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
            });
    };
})(jQuery);