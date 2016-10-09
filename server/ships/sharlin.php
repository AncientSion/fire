<?php

class Sharlin extends Ship {

	public $mass = 19000;
	public $profile = array(0.9, 1.15);

	function __construct($id, $userid, $shipClass, $x, $y, $facing){
		$this->name = "Sharlin";
		$this->faction = "Minbari Federation";

        parent::__construct($id, $userid, $shipClass, $x, $y, $facing);
	}

	function addSystems(){
		$this->addSystem(new NeutronLaser(0, 0, 10, 5, 5));
	/*	$this->addSystem(new NeutronLaser(0, 0, 10, 5, 5));
		$this->addSystem(new NeutronLaser(0, 0, 10, 5, 5));
		$this->addSystem(new FusionCannon(0, 0, 8, 4, 4));
		$this->addSystem(new FusionCannon(0, 0, 8, 4, 4));
		$this->addSystem(new FusionCannon(0, 0, 8, 4, 4));
	*/	$this->addSystem(new FusionCannon(0, 0, 8, 4, 4));
	}
}

?>