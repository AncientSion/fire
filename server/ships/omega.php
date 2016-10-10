<?php

class Omega extends Ship {

	public $mass = 15000;
	public $profile = array(0.85, 1.10);

	function __construct($id, $userid, $shipClass, $x, $y, $facing){
		$this->name = "Omega";
		$this->faction = "Earth Alliance";
		
        parent::__construct($id, $userid, $shipClass, $x, $y, $facing);
	}

	function addSystems(){
		$this->addSystem(new HeavyLaser($this->id, 10, 5, 5));
	}
}

?>