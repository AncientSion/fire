<?php



class Omega extends Ship {
	public $shipClass = "Omega";
	public $name = "Omega Destroyer";
	public $faction = "Earth Alliance";
	public $size = 60;
	public static $value = 1200;
	public $profile = array(0.85, 1.10);
	public $mass = 15000;
	public $ep = 550;

	function __construct($id, $userid, $x, $y, $facing, $available){
        parent::__construct($id, $userid, $x, $y, $facing, $available);
	}

	public function addStructures(){
		$structs = [];

		$front = new Structure($this->getId(), $this->id, 270, 90, 1500, 1500, 80);
		$front->systems[] = new HeavyLaser($this->getId(), $this->id, 300, 360);
		$front->systems[] = new HeavyLaser($this->getId(), $this->id, 300, 360);
		$front->systems[] = new HeavyLaser($this->getId(), $this->id, 0, 60);
		$front->systems[] = new HeavyLaser($this->getId(), $this->id, 0, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 0, 180, 1800, 1800, 70);
		$right->systems[] = new StandardParticleBeam($this->getId(), $this->id, 0, 180);
		$right->systems[] = new StandardParticleBeam($this->getId(), $this->id, 0, 180);
		$right->systems[] = new StandardParticleBeam($this->getId(), $this->id, 0, 180);
		$right->systems[] = new StandardParticleBeam($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 90, 270, 1400, 1400, 60);
		$aft->systems[] = new StandardParticleBeam($this->getId(), $this->id, 180, 270);
		$aft->systems[] = new StandardParticleBeam($this->getId(), $this->id, 90, 270);
		$aft->systems[] = new StandardParticleBeam($this->getId(), $this->id, 90, 270);
		$aft->systems[] = new StandardParticleBeam($this->getId(), $this->id, 90, 270);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 180, 360, 1800, 1800, 70);
		$left->systems[] = new StandardParticleBeam($this->getId(), $this->id, 180, 360);
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