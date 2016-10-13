<?php

class Omega extends Ship {

	public $mass = 15000;
	public $profile = array(0.85, 1.10);

	function __construct($id, $userid, $shipClass, $x, $y, $facing){
		$this->name = "Omega";
		$this->faction = "Earth Alliance";
		
        parent::__construct($id, $userid, $shipClass, $x, $y, $facing);
	}

	public function addSystems(){
		$this->addSystem(new HeavyLaser(10, 5, 5));
		$this->addSystem(new HeavyLaser(10, 5, 5));
		$this->addSystem(new StandardParticleBeam(8, 4, 4));
		$this->addSystem(new StandardParticleBeam(8, 4, 4));
		$this->addSystem(new StandardParticleBeam(8, 4, 4));
		$this->addSystem(new StandardParticleBeam(8, 4, 4));
	}

	public function addStructures(){
		$this->addStructures(new Structure(sizeof($this->structures)+1, 0, 180, 5, 100));
		$this->addStructures(new Structure(sizeof($this->structures)+1, 180, 360, 5, 100));
	}
}

?>