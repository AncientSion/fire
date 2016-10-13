<?php

class Sharlin extends Ship {

	public $mass = 19000;
	public $profile = array(0.9, 1.15);


	function __construct($id, $userid, $shipClass, $x, $y, $facing){
		$this->name = "Sharlin";
		$this->faction = "Minbari Federation";
		
        parent::__construct($id, $userid, $shipClass, $x, $y, $facing);
	}

	public function addSystems(){
		$this->addSystem(new NeutronLaser(10, 5, 5));
		$this->addSystem(new NeutronLaser(10, 5, 5));
		$this->addSystem(new NeutronLaser(10, 5, 5));
		$this->addSystem(new FusionCannon(8, 4, 4));
		$this->addSystem(new FusionCannon(8, 4, 4));
		$this->addSystem(new FusionCannon(8, 4, 4));
		$this->addSystem(new FusionCannon(8, 4, 4));
	}

	public function addStructures(){
		$this->addStructures(new Structure(sizeof($this->structures)+1, 300, 60, 7, 150));
		$this->addStructures(new Structure(sizeof($this->structures)+1, 60, 180, 6, 120));
		$this->addStructures(new Structure(sizeof($this->structures)+1, 180, 300, 6, 120));
	}
}

?>