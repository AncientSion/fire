<?php

class Tethys extends Light {
	public $classname = "Tethys";
	public $name = "Tethys";
	public $faction = "Earth Alliance";
	public $size = 40;
	public static $value = 300;
	public $profile = array(0.95, 1.05);
	public $mass = 1500;

	function __construct($id, $userid, $available){
        parent::__construct($id, $userid, $available);
	}

	public function addStructures(){
		$structs = [];

		$front = new Structure($this->getId(), $this->id, 300, 60, 300, 35, 20);
		$front->systems[] = new LightLaser($this->getId(), $this->id, 300, 60);
		$front->systems[] = new LightLaser($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 250, 30, 18);
		$right->systems[] = new ParticleBeam($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 250, 30, 18);
		$left->systems[] = new ParticleBeam($this->getId(), $this->id, 180, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$primary = new Primary($this->getId(), $this->id, 0, 360, 500, 70);
		$primary->systems[] = new Bridge($this->getId(), $this->id, 30);
		$primary->systems[] = new Engine($this->getId(), $this->id, 30, 32);
		$primary->systems[] = new Reactor($this->getId(), $this->id, 30);
		$primary->systems[] = new Lifesupport($this->getId(), $this->id, 30);
		$primary->systems[] = new Sensor($this->getId(), $this->id, 30);
		$this->primary = $primary;
	}
}

?>