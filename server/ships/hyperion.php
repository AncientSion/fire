<?php

class Hyperion extends Heavy {
	public $name = "Hyperion";
	public $display = "Hyperion Light Cruiser";
	public $faction = "Earth Alliance";
	public $size = 80;
	public static $value = 850;
	public $profile = array(0.90, 1.10);
	public $mass = 8000;

	function __construct($id, $userid, $available, $status, $destroyed){
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 625, 22);
		$front->systems[] = new MediumRailGun($this->getId(), $this->id, 300, 60);
		$front->systems[] = new Dual($this->getId(), $this->id, 240, 120, 14, array("LightPulse", "LightParticleBeam"));
		//$front->systems[] = new Dual($this->getId(), $this->id, 300, 360, 35, array("HeavyLaser", "HeavyPulse"));
		$front->systems[] = new Hangar($this->getId(), $this->id, 330, 30, 425, 12, array("Aurora"));
		$front->systems[] = new Dual($this->getId(), $this->id, 240, 120, 14, array("LightPulse", "LightParticleBeam"));
		$front->systems[] = new MediumRailGun($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 800, 20);
		$right->systems[] = new HeavyLaser($this->getId(), $this->id, 0, 60);
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180, 14, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 18);
		$aft->systems[] = new HeavyLaser($this->getId(), $this->id, 180, 240);
		$aft->systems[] = new HeavyLaser($this->getId(), $this->id, 120, 180);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 800, 20);
		$left->systems[] = new HeavyLaser($this->getId(), $this->id, 300, 360);
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360, 14, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 1200);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 115);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 115, 240);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 115);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 115, 700, 15);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 115, -5);
	}
}

?>