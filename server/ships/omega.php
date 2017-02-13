<?php

class Omega extends Heavy {
	public $classname = "Omega";
	public $name = "Omega Destroyer";
	public $faction = "Earth Alliance";
	public $size = 100;
	public static $value = 1200;
	public $profile = array(0.88, 1.12);
	public $mass = 15000;

	function __construct($id, $userid, $available){
        parent::__construct($id, $userid, $available);
	}

	public function addStructures(){
		$structs = [];

		$front = new Structure($this->getId(), $this->id, 330, 30, 1500, 65, 44);
			$front->systems[] = new HeavyLaser($this->getId(), $this->id, 300, 360);
			$front->systems[] = new HeavyLaser($this->getId(), $this->id, 300, 360);
			$front->systems[] = new Hangar($this->getId(), $this->id, 330, 30, 850, 12, ["Aurora", "Thunderbolt"]);
			$front->systems[] = new HeavyLaser($this->getId(), $this->id, 0, 60);
			$front->systems[] = new HeavyLaser($this->getId(), $this->id, 0, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 1800, 60, 38);
			$right->systems[] = new ParticleBeam($this->getId(), $this->id, 0, 180);
			$right->systems[] = new ParticleBeam($this->getId(), $this->id, 0, 180);
			$right->systems[] = new ParticleBeam($this->getId(), $this->id, 0, 180);
			$right->systems[] = new ParticleBeam($this->getId(), $this->id, 0, 180);
			$right->systems[] = new ParticleBeam($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 1250, 50, 34);
			$aft->systems[] = new ParticleBeam($this->getId(), $this->id, 90, 270);
			$aft->systems[] = new ParticleBeam($this->getId(), $this->id, 90, 270);
			$aft->systems[] = new ParticleBeam($this->getId(), $this->id, 90, 270);
			$aft->systems[] = new Hangar($this->getId(), $this->id, 150, 210, 350, 6, ["Aurora", "Thunderbolt"]);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 1800, 60, 38);
			$left->systems[] = new ParticleBeam($this->getId(), $this->id, 180, 360);
			$left->systems[] = new ParticleBeam($this->getId(), $this->id, 180, 360);
			$left->systems[] = new ParticleBeam($this->getId(), $this->id, 180, 360);
			$left->systems[] = new ParticleBeam($this->getId(), $this->id, 180, 360);
			$left->systems[] = new ParticleBeam($this->getId(), $this->id, 180, 360);
		$structs[] = $left;
		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}


	public function addPrimary(){
		$primary = new Primary($this->getId(), $this->id, 0, 360, 5000, 70);
		$primary->systems[] = new Bridge($this->getId(), $this->id, 250);
		$primary->systems[] = new Engine($this->getId(), $this->id, 250, 550);
		$primary->systems[] = new Lifesupport($this->getId(), $this->id, 250);
		$primary->systems[] = new Sensor($this->getId(), $this->id, 250);
		$primary->systems[] = new Reactor($this->getId(), $this->id, 250, $this->getPowerNeed());
		$this->primary = $primary;
	}
}

?>