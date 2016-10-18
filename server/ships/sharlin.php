<?php

class Sharlin extends Ship {

	public $shipClass = "Sharlin";
	public $name = "Sharlin";
	public $faction = "Minbari Federation";
	public $size = 80;
	public $value = 2000;
	public $profile = array(0.90, 1.15);
	public $mass = 19000;
	public $ep = 850;

	function __construct($id, $userid, $x, $y, $facing){
		$this->shipClass = "Sharlin";
		$this->faction = "Minbari Federation";
		
        parent::__construct($id, $userid, $x, $y, $facing);
	}

	public function addStructures(){
		$structs = [];

		$left = new Structure($this->getId(), $this->id, 300, 60, 7, 150);
		$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
		$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
		$structs[] = $left;

		$right = new Structure($this->getId(), $this->id, 60, 180, 7, 150);
		$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
		$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 180, 300, 7, 150);
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