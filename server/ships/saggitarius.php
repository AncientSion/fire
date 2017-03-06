<?php

class Saggitarius extends Medium {
	public $classname = "Saggitarius";
	public $name = "Saggitarius Missile Destroyer";
	public $faction = "Earth Alliance";
	public $size = 75;
	public static $value = 700;
	public $profile = array(0.90, 1.10);
	public $mass = 6500;

	function __construct($id, $userid, $available){
        parent::__construct($id, $userid, $available);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 550, 26);
			$front->systems[] = new ParticleBeam($this->getId(), $this->id, 240, 120);
			$front->systems[] = new MissileLauncher($this->getId(), $this->id, 300, 60, 20, 3);
			$front->systems[] = new MissileLauncher($this->getId(), $this->id, 300, 60, 20, 3);
			$front->systems[] = new ParticleBeam($this->getId(), $this->id, 240, 120);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 650, 21);
			$right->systems[] = new MissileLauncher($this->getId(), $this->id, 0, 180, 20, 2);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 425, 21);
			$aft->systems[] = new ParticleBeam($this->getId(), $this->id, 60, 300);
			$aft->systems[] = new ParticleBeam($this->getId(), $this->id, 60, 300);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 650, 21);
			$left->systems[] = new MissileLauncher($this->getId(), $this->id, 180, 360, 20, 2);
		$structs[] = $left;
		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 1650);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 125);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 125, 180);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 125);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 125);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 125);
	}
}

?>