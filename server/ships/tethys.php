<?php

class Tethys extends Light {
	public $name = "Tethys";
	public $display = "Tethys";
	public $faction = "Earth Alliance";
	public $size = 40;
	public static $value = 300;
	public $profile = array(0.95, 1.05);
	public $mass = 1200;

	function __construct($id, $userid, $available, $status, $destroyed){
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 250, 16);
		$front->systems[] = new LightLaser($this->getId(), $this->id, 300, 60);
		$front->systems[] = new LightLaser($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 200, 14);
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 200, 14);
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 425);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 60);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 60, 28);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 60);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 60, 425, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 60, $this->getPowerReq());
	}
}

?>