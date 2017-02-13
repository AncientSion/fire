
window.shipImages = {};
window.ballImages = {};
window.factionImages = {};

window.preload = function(){
	window.preLoadBallistics();
	window.preloadShips();
	window.preLoadFactions();
}

window.preLoadBallistics = function(){
	window.ballImages.ballistictorpedo = new Image();
	window.ballImages.ballistictorpedo.src = "ballIcons/ballistictorpedo.png";

	window.ballImages.ballisticmissile = new Image();
	window.ballImages.ballisticmissile.src = "ballIcons/ballisticmissile.png";
}


window.preloadShips = function(){
	window.shipImages.omega = new Image();
	window.shipImages.omega.src = "shipIcons/omega.png";

	window.shipImages.hyperion = new Image();
	window.shipImages.hyperion.src = "shipIcons/hyperion.png";

	window.shipImages.saggitarius = new Image();
	window.shipImages.saggitarius.src = "shipIcons/saggitarius.png";

	window.shipImages.artemis = new Image();
	window.shipImages.artemis.src = "shipIcons/artemis.png";

	window.shipImages.olympus = new Image();
	window.shipImages.olympus.src = "shipIcons/olympus.png";

	window.shipImages.tethys = new Image();
	window.shipImages.tethys.src = "shipIcons/tethys.png";

	window.shipImages.primus = new Image();
	window.shipImages.primus.src = "shipIcons/primus.png";

	window.shipImages.demos = new Image();
	window.shipImages.demos.src = "shipIcons/demos.png";

	window.shipImages.vorchan = new Image();
	window.shipImages.vorchan.src = "shipIcons/vorchan.png";

	window.shipImages.haven = new Image();
	window.shipImages.haven.src = "shipIcons/haven.png";

	window.shipImages.sharlin = new Image();
	window.shipImages.sharlin.src = "shipIcons/sharlin.png";

	window.shipImages.tinashi = new Image();
	window.shipImages.tinashi.src = "shipIcons/tinashi.png";

	window.shipImages.whitestar = new Image();
	window.shipImages.whitestar.src = "shipIcons/whiteStar.png";

	window.shipImages.aurora = new Image();
	window.shipImages.aurora.src = "shipIcons/aurora.png";
	window.shipImages.auroral = new Image();
	window.shipImages.auroral.src = "shipIcons/auroral.png";

	window.shipImages.thunderbolt = new Image();
	window.shipImages.thunderbolt.src = "shipIcons/thunderbolt.png";
	window.shipImages.thunderboltl = new Image();
	window.shipImages.thunderboltl.src = "shipIcons/thunderboltl.png";

	window.shipImages.sentri = new Image();
	window.shipImages.sentri.src = "shipIcons/sentri.png";
	window.shipImages.sentril = new Image();
	window.shipImages.sentril.src = "shipIcons/sentril.png";

	window.shipImages.nial = new Image();
	window.shipImages.nial.src = "shipIcons/nial.png";
	window.shipImages.niall = new Image();
	window.shipImages.niall.src = "shipIcons/niall.png";
}

window.preLoadFactions = function(){
	window.factionImages.earthFaction = new Image();
	window.factionImages.earthFaction.src = "factionIcons/earth.png";
	window.factionImages.centauriFaction = new Image();
	window.factionImages.centauriFaction.src = "factionIcons/centauri.png";
	window.factionImages.minbariFaction = new Image();
	window.factionImages.minbariFaction.src = "factionIcons/minbari.png";
}