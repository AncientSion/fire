<?php

class Tinashi extends Ship {

	public $shipClass = "Tinashi";
	public $name = "Tinashi";
	public $faction = "Minbari Federation";
	public $size = 80;
	public static $value = 1100;
	public $profile = array(0.9, 1.1);
	public $mass = 9000;
	public $ep = 300;

	function __construct($id, $userid, $x, $y, $facing, $available){		
        parent::__construct($id, $userid, $x, $y, $facing, $available);
	}

	public function addStructures(){
		$structs = [];

		$left = new Structure($this->getId(), $this->id, 240, 360, $this->mass, 70);
		$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
		$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
		$structs[] = $left;

		$right = new Structure($this->getId(), $this->id, 0, 120, $this->mass, 70);
		$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
		$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 120, 240, $this->mass, 65);
		$aft->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
		$aft->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
		$aft->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
		$aft->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
		$structs[] = $aft;

		$primary = new Primary($this->getId(), $this->id, 0, 360, $this->mass, 85);
		$structs[] = $primary;


		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>