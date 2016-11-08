<?php

class Sharlin extends Ship {

	public $shipClass = "Sharlin";
	public $name = "Sharlin";
	public $faction = "Minbari Federation";
	public $size = 80;
	public static $value = 2000;
	public $profile = array(0.90, 1.15);
	public $mass = 19000;
	public $ep = 850;

	function __construct($id, $userid, $x, $y, $facing, $available){
		$this->shipClass = "Sharlin";
		$this->faction = "Minbari Federation";
		
        parent::__construct($id, $userid, $x, $y, $facing, $available);
	}

	public function addStructures(){
		$structs = [];

		$left = new Structure($this->getId(), $this->id, 240, 330, $this->mass, 85);
		$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
		$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
		$structs[] = $left;

		$front = new Structure($this->getId(), $this->id, 330, 30, $this->mass, 85);
		$front->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$front->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 120, $this->mass, 85);
		$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
		$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 120, 240, $this->mass, 75);
		$aft->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$aft->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$aft->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
		$aft->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
		$structs[] = $aft;		

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, $this->mass, 85);
	}
}

?>