<?php

class Saggitarius extends Medium {
	public $name = "Saggitarius";
	public $display = "Saggitarius Missile Destroyer";
	public $faction = "Earth Alliance";
	public $size = 60;
	public static $value = 400;
	public $profile = array(0.90, 1.10);
	public $mass = 4500;

	function __construct($id, $userid, $available, $status, $destroyed){
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function addStructures(){
		$structs = array();
		
		$front = new Structure($this->getId(), $this->id, 330, 30, 375, 23);
		$front->systems[] = new Dual($this->getId(), $this->id, 300, 60, 14, array("LightPulse", "LightParticleBeam"));
		$front->systems[] = new MissileLauncher($this->getId(), $this->id, 300, 60, 20, 4, array("Cyclops", "Titan"));
		$front->systems[] = new Dual($this->getId(), $this->id, 300, 60, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 450, 19);
		$right->systems[] = new MissileLauncher($this->getId(), $this->id, 0, 180, 15, 3, array("Naga", "Cyclops"));
		$right->systems[] = new MissileLauncher($this->getId(), $this->id, 0, 180, 15, 3, array("Naga", "Cyclops"));
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 325, 16);
		$aft->systems[] = new Dual($this->getId(), $this->id, 120, 240, 14, array("LightPulse", "LightParticleBeam"));
		$aft->systems[] = new Dual($this->getId(), $this->id, 120, 240, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 450, 19);
		$left->systems[] = new MissileLauncher($this->getId(), $this->id, 180, 360, 15, 3, array("Naga", "Cyclops"));
		$left->systems[] = new MissileLauncher($this->getId(), $this->id, 180, 360, 15, 3, array("Naga", "Cyclops"));
		$structs[] = $left;
		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 1000);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 100);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 100, 70);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 100);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 100, 600, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 100, $this->getPowerReq());
	}
}

?>