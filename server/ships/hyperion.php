<?php

class Hyperion extends Ship {
	public $shipClass = "Hyperion";
	public $name = "Hyperion Light Cruiser";
	public $faction = "Earth Alliance";
	public $size = 45;
	public static $value = 850;
	public $profile = array(0.70, 0.85);
	public $mass = 8000;
	public $ep = 260;

	function __construct($id, $userid, $x, $y, $facing, $available){
        parent::__construct($id, $userid, $x, $y, $facing, $available);
	}

	public function addStructures(){
		$structs = [];

		$front = new Structure($this->getId(), $this->id, 330, 30, 175, 125, 70);
		$front->systems[] = new HeavyLaser($this->getId(), $this->id, 300, 360);
		$front->systems[] = new HeavyLaser($this->getId(), $this->id, 0, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 150, 125, 60);
		$right->systems[] = new StandardParticleBeam($this->getId(), $this->id, 0, 180);
		$right->systems[] = new StandardParticleBeam($this->getId(), $this->id, 0, 180);
		$right->systems[] = new StandardParticleBeam($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 100, 75, 60);
		$aft->systems[] = new HeavyLaser($this->getId(), $this->id, 120, 180);
		$aft->systems[] = new HeavyLaser($this->getId(), $this->id, 180, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 150, 125, 60);
		$left->systems[] = new StandardParticleBeam($this->getId(), $this->id, 180, 360);
		$left->systems[] = new StandardParticleBeam($this->getId(), $this->id, 180, 360);
		$left->systems[] = new StandardParticleBeam($this->getId(), $this->id, 180, 360);
		$structs[] = $left;



		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>