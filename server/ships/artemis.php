<?php

class Artemis extends Medium {
	public $name = "Artemis";
	public $display = "Artemis";
	public $faction = "Earth Alliance";
	public $size = 50;
	public static $value = 475;
	public $profile = array(0.93, 1.07);
	public $mass = 3500;

	function __construct($id, $userid, $available, $status, $destroyed){		
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 400, 24);
		$front->systems[] = new MediumRailGun($this->getId(), $this->id, 300, 60);
		$front->systems[] = new HeavyRailGun($this->getId(), $this->id, 315, 45);
		$front->systems[] = new MediumRailGun($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 350, 22);
		$right->systems[] = new ParticleBeam($this->getId(), $this->id, 0, 180);
		$right->systems[] = new ParticleBeam($this->getId(), $this->id, 0, 180);
		$right->systems[] = new MissileLauncher($this->getId(), $this->id, 300, 120, 8, 2, array("Barracuda", "Myrmidon"));
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 350, 22);
		$left->systems[] = new ParticleBeam($this->getId(), $this->id, 180, 360);
		$left->systems[] = new ParticleBeam($this->getId(), $this->id, 180, 360);
		$left->systems[] = new MissileLauncher($this->getId(), $this->id, 240, 60, 8, 2, array("Barracuda", "Myrmidon"));
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 925);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 95);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 95, 75, 4);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 95);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 95);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 95, $this->getPowerReq());
	}
}

?>