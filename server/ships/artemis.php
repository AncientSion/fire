<?php

class Artemis extends Medium {
	public $name = "Artemis";
	public $display = "Artemis";
	public $faction = "Earth Alliance";
	public $size = 50;
	public static $value = 490;
	public $profile = array(0.93, 1.07);
	public $mass = 3500;

	function __construct($id, $userid, $available, $status, $destroyed){		
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 315, 45, 450, 16);
		$front->systems[] = new MediumRailGun($this->getId(), $this->id, 300, 60);
		$front->systems[] = new LightLaser($this->getId(), $this->id, 315, 45);
		$front->systems[] = new MediumRailGun($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 45, 135, 375, 15);
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180, 14, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 135, 225, 240, 13);
		$aft->systems[] = new MediumRailGun($this->getId(), $this->id, 180, 300);
		$aft->systems[] = new MediumRailGun($this->getId(), $this->id, 60, 180);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 225, 315, 375, 15);
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360, 14, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 650);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 95);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 95, 105);
		//$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 95);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 95, 650, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 95, -2);
	}
}

?>