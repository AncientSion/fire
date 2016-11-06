<?php

class Tethys extends Ship {
	public $shipClass = "Tethys";
	public $name = "Tethys";
	public $faction = "Earth Alliance";
	public $size = 30;
	public static $value = 300;
	public $profile = array(0.95, 1.05);
	public $mass = 1500;
	public $ep = 32;

	function __construct($id, $userid, $x, $y, $facing, $available){
        parent::__construct($id, $userid, $x, $y, $facing, $available);
	}

	public function addStructures(){
		$structs = [];

		$front = new Structure($this->getId(), $this->id, 330, 30, 275, 200, 35);
		$front->systems[] = new LightLaser($this->getId(), $this->id, 300, 60);
		$front->systems[] = new LightLaser($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 250, 175, 30);
		$right->systems[] = new StandardParticleBeam($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 210, 330, 250, 175, 30);
		$left->systems[] = new StandardParticleBeam($this->getId(), $this->id, 180, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>