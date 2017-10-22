<?php

class Omega extends SuperHeavy {
	public $name = "Omega";
	public $display = "Omega Destroyer";
	public $faction = "Earth Alliance";
	public $size = 100;
	public static $value = 1200;
	public $profile = array(0.91, 1.09);
	public $mass = 14500;

	function __construct($id, $userid, $available, $status, $destroyed){
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 1200, 23);
		$front->systems[] = new Dual($this->getId(), $this->id, 300, 360, 25, array("HeavyLaser", "HeavyPulse"));
		$front->systems[] = new Dual($this->getId(), $this->id, 300, 360, 25, array("HeavyLaser", "HeavyPulse"));
		$front->systems[] = new Hangar($this->getId(), $this->id, 330, 30, 1000, 14, array("Aurora", "Thunderbolt"));
		$front->systems[] = new Dual($this->getId(), $this->id, 0, 60, 25, array("HeavyLaser", "HeavyPulse"));
		$front->systems[] = new Dual($this->getId(), $this->id, 0, 60, 25, array("HeavyLaser", "HeavyPulse"));
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 1500, 21);
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180, 14, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180, 14, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180, 14, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180, 14, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180, 14, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 1050, 19);
		$aft->systems[] = new MediumPulse($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new MediumPulse($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new MediumPulse($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new MediumPulse($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 1500, 21);
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360, 14, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360, 14, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360, 14, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360, 14, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360, 14, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $left;
		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 2000);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 180);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 180, 480, 10);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 180);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 180, 800, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 180, -7);
	}
}

?>