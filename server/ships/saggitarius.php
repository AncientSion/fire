<?php

class Saggitarius extends Medium {
	public $classname = "Saggitarius";
	public $name = "Saggitarius Missile Destroyer";
	public $faction = "Earth Alliance";
	public $size = 75;
	public static $value = 700;
	public $profile = array(0.90, 1.10);
	public $mass = 4500;

	function __construct($id, $userid, $available){
        parent::__construct($id, $userid, $available);
	}

	public function addStructures(){
		$structs = array();
		
		$front = new Structure($this->getId(), $this->id, 330, 30, 375, 20);
			$front->systems[] = new ParticleBeam($this->getId(), $this->id, 240, 120);
			$front->systems[] = new ParticleBeam($this->getId(), $this->id, 240, 120);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 450, 18);
			$right->systems[] = new EAMissileLauncher($this->getId(), $this->id, 0, 180, 20, 4);
			$right->systems[] = new EAMissileLauncher($this->getId(), $this->id, 0, 180, 20, 4);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 325, 16);
			$aft->systems[] = new ParticleBeam($this->getId(), $this->id, 60, 300);
			$aft->systems[] = new ParticleBeam($this->getId(), $this->id, 60, 300);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 450, 18);
			$left->systems[] = new EAMissileLauncher($this->getId(), $this->id, 180, 360, 20, 4);
			$left->systems[] = new EAMissileLauncher($this->getId(), $this->id, 180, 360, 20, 4);
		$structs[] = $left;
		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 1350);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 100);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 100, 85);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 100);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 100);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 100, $this->getPowerReq()-4);
	}
}

?>