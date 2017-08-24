
window.shipImages = {};
window.factionImages = {};

window.preload = function(){
	window.preLoadBallistics();
	window.preloadShips();
	window.preLoadFactions();
}

window.preLoadBallistics = function(){
	window.shipImages.hasta = new Image();
	window.shipImages.hasta.src = "ballIcons/hasta.png";
	window.shipImages.javelin = new Image();
	window.shipImages.javelin.src = "ballIcons/hasta.png";
	window.shipImages.triarii = new Image();
	window.shipImages.triarii.src = "ballIcons/hasta.png";

	window.shipImages.patriot = new Image();
	window.shipImages.patriot.src = "ballIcons/patriot.png";
	window.shipImages.naga = new Image();
	window.shipImages.naga.src = "ballIcons/naga.png";
	window.shipImages.cyclops = new Image();
	window.shipImages.cyclops.src = "ballIcons/cyclops.png";
	window.shipImages.titan = new Image();
	window.shipImages.titan.src = "ballIcons/titan.png";
}


window.preloadShips = function(){
	window.shipImages.battlecrab = new Image();
	window.shipImages.battlecrab.src = "shipIcons/omega.png";

	window.shipImages.omega = new Image();
	window.shipImages.omega.src = "shipIcons/omega.png";

	window.shipImages.avenger = new Image();
	window.shipImages.avenger.src = "shipIcons/avenger.png";

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

	window.shipImages.gquan = new Image();
	window.shipImages.gquan.src = "shipIcons/gquan.png";

	window.shipImages.primus = new Image();
	window.shipImages.primus.src = "shipIcons/primus.png";

	window.shipImages.altarian = new Image();
	window.shipImages.altarian.src = "shipIcons/altarian.png";

	window.shipImages.demos = new Image();
	window.shipImages.demos.src = "shipIcons/demos.png";

	window.shipImages.darkner = new Image();
	window.shipImages.darkner.src = "shipIcons/darkner.png";

	window.shipImages.vorchan = new Image();
	window.shipImages.vorchan.src = "shipIcons/vorchan.png";

	window.shipImages.haven = new Image();
	window.shipImages.haven.src = "shipIcons/haven.png";

	window.shipImages.sharlin = new Image();
	window.shipImages.sharlin.src = "shipIcons/sharlin.png";

	window.shipImages.tinashi = new Image();
	window.shipImages.tinashi.src = "shipIcons/tinashi.png";

	window.shipImages.whitestar = new Image();
	window.shipImages.whitestar.src = "shipIcons/whitestar.png";

	window.shipImages.aurora = new Image();
	window.shipImages.aurora.src = "shipIcons/aurora.png";
	window.shipImages.auroral = new Image();
	window.shipImages.auroral.src = "shipIcons/auroral.png";

	window.shipImages.thunderbolt = new Image();
	window.shipImages.thunderbolt.src = "shipIcons/thunderbolt.png";
	window.shipImages.thunderboltl = new Image();
	window.shipImages.thunderboltl.src = "shipIcons/thunderboltl.png";

	window.shipImages.sitara = new Image();
	window.shipImages.sitara.src = "shipIcons/sitara.png";
	window.shipImages.sitaral = new Image();
	window.shipImages.sitaral.src = "shipIcons/sitaral.png";

	window.shipImages.sentri = new Image();
	window.shipImages.sentri.src = "shipIcons/sentri.png";
	window.shipImages.sentril = new Image();
	window.shipImages.sentril.src = "shipIcons/sentril.png";

	window.shipImages.nial = new Image();
	window.shipImages.nial.src = "shipIcons/nial.png";
	window.shipImages.niall = new Image();
	window.shipImages.niall.src = "shipIcons/niall.png";

	window.shipImages.gorith = new Image();
	window.shipImages.gorith.src = "shipIcons/gorith.png";
	window.shipImages.gorithl = new Image();
	window.shipImages.gorithl.src = "shipIcons/gorithl.png";

	window.shipImages.frazi = new Image();
	window.shipImages.frazi.src = "shipIcons/frazi.png";
	window.shipImages.frazil = new Image();
	window.shipImages.frazil.src = "shipIcons/frazil.png";
}

window.preLoadFactions = function(){
	window.images.earth = new Image();
	window.images.earth.src = "factionIcons/earth.png";
	window.images.centauri = new Image();
	window.images.centauri.src = "factionIcons/centauri.png";
	window.images.minbari = new Image();
	window.images.minbari.src = "factionIcons/minbari.png";
	window.images.narn = new Image();
	window.images.narn.src = "factionIcons/narn.png";
}