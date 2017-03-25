<?php

class Olympus extends Light {
	public $classname = "Olympus";
	public $name = "Olympus";
	public $faction = "Earth Alliances";
	public $size = 45;
	public static $value = 525;
	public $profile = array(0.94, 1.06);
	public $mass = 2500;

	function __construct($id, $userid, $available){		
        parent::__construct($id, $userid, $available);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 350, 24);
		$front->systems[] = new MediumRailGun($this->getId(), $this->id, 300, 60);
		$front->systems[] = new HeavyRailGun($this->getId(), $this->id, 315, 45);
		$front->systems[] = new MediumRailGun($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 300, 22);
		$right->systems[] = new ParticleBeam($this->getId(), $this->id, 0, 180);
		$right->systems[] = new ParticleBeam($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 300, 22);
		$left->systems[] = new ParticleBeam($this->getId(), $this->id, 180, 360);
		$left->systems[] = new ParticleBeam($this->getId(), $this->id, 180, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 900);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 100);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 100, 75);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 100);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 100);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 100, $this->getPowerReq());
	}
}

?>