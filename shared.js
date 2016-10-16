window.res = {x: 1200, y: 800};
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

window.shipImages = {};
window.factionImages = {};

window.multi = 1;

window.anim = false;

window.fire = [];
window.aShip = false;
window.aHex = false;
window.mode = false;
window.icon;
window.pickedMoves = [];

window.shortInfo = false;

window.animation;

window.decayVar = 1000;

window.index = 0;

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
	setTimeout(function(){
		window.location.reload(true);
		},
	500);
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
		}, 500);
	}
}

function redirect(url){
	console.log("redirect");
	setTimeout(function(){
		window.location = "lobby.php"
	}, 500);
}
