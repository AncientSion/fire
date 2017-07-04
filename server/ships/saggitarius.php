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
		
		$front = new Structure($this->getId(), $this->id, 330, 30, 375, 21);
		$front->systems[] = new Dual($this->getId(), $this->id, 300, 60, 14, array("LightPulse", "LightParticleBeam"));
		$front->systems[] = new MissileLauncher($this->getId(), $this->id, 300, 60, array(array("Cyclops", 40, 4), array("Titan", 30, 3)));
		$front->systems[] = new Dual($this->getId(), $this->id, 300, 60, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 450, 18);
		$right->systems[] = new MissileLauncher($this->getId(), $this->id, 0, 180, array(array("Naga", 15, 3), array("Cyclops", 12, 2)));
		$right->systems[] = new MissileLauncher($this->getId(), $this->id, 0, 180, array(array("Naga", 15, 3), array("Cyclops", 12, 2)));
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 325, 16);
		$aft->systems[] = new Dual($this->getId(), $this->id, 120, 240, 14, array("LightPulse", "LightParticleBeam"));
		$aft->systems[] = new Dual($this->getId(), $this->id, 120, 240, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 450, 18);
		$left->systems[] = new MissileLauncher($this->getId(), $this->id, 180, 360, array(array("Naga", 15, 3), array("Cyclops", 12, 2)));
		$left->systems[] = new MissileLauncher($this->getId(), $this->id, 180, 360, array(array("Naga", 15, 3), array("Cyclops", 12, 2)));
		$structs[] = $left;
		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 950);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 85);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 85, 70);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 85);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 85, 600, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 85, $this->getPowerReq()-1);
	}
}

?>