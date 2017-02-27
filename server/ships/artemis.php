<?php

class Artemis extends Medium {
	public $classname = "Artemis";
	public $name = "Artemis";
	public $faction = "Earth Alliances";
	public $size = 50;
	public static $value = 600;
	public $profile = array(0.93, 1.07);
	public $mass = 3000;

	function __construct($id, $userid, $available){		
        parent::__construct($id, $userid, $available);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 550, 50, 24);
		$front->systems[] = new MediumRailGun($this->getId(), $this->id, 300, 60);
		$front->systems[] = new HeavyRailGun($this->getId(), $this->id, 315, 45);
		$front->systems[] = new MediumRailGun($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 400, 50, 20);
		$right->systems[] = new ParticleBeam($this->getId(), $this->id, 0, 180);
		$right->systems[] = new ParticleBeam($this->getId(), $this->id, 0, 180);
		$right->systems[] = new MissileLauncher($this->getId(), $this->id, 300, 120, 8, 2);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 400, 50, 20);
		$left->systems[] = new ParticleBeam($this->getId(), $this->id, 180, 360);
		$left->systems[] = new ParticleBeam($this->getId(), $this->id, 180, 360);
		$left->systems[] = new MissileLauncher($this->getId(), $this->id, 240, 60, 8, 2);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$primary = new Primary($this->getId(), $this->id, 0, 360, $this->mass, 70);
		$primary->systems[] =  new Bridge($this->getId(), $this->id, 150);
		$primary->systems[] =  new Engine($this->getId(), $this->id, 100, 95);
		$primary->systems[] =  new Lifesupport($this->getId(), $this->id, 200);
		$primary->systems[] =  new Sensor($this->getId(), $this->id, 100);
		$primary->systems[] =  new Reactor($this->getId(), $this->id, 100, $this->getPowerReq());
		$this->primary = $primary;
	}
}

?>