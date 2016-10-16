<?php



class Omega extends Ship {
	public $shipClass = "Omega";
	public $name = "Omega Destroyer";
	public $faction = "Earth Alliance";
	public $size = 60;
	public $value = 1200;
	public $profile = array(0.85, 1.10);
	public $mass = 15000;
	public $ep = 550;

	function __construct($id, $userid, $x, $y, $facing){
        parent::__construct($id, $userid, $x, $y, $facing);
	}

	public function addStructures(){
		$structs = [];

		$left = new Structure($this->getId(), $this->id, 240, 360, 7, 150);
		$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
		$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
		$structs[] = $left;

		$right = new Structure($this->getId(), $this->id, 0, 120, 7, 150);
		$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
		$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 120, 240, 7, 150);
		$aft->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$aft->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$aft->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
		$aft->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
		$structs[] = $aft;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>