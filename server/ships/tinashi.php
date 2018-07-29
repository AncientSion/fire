<?php

class Tinashi extends Medium {
	public $name = "Tinashi";
	public $display = "Tinashi";
	public $faction = "Minbari Federation";
	public $size =  70;
	public static $value = 600;
	public $profile = array(0.9, 1.1);
	public $mass = 4250;

	public $integrity = 700;
	public $vitalHP = 85;
	public $ep = 85;
	public $ew = 750;


	function __construct($data = false){
        parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 475, 20, 3);
			$front->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
			$front->systems[] = new TwinEMProjector($this->getId(), $this->id, 270, 90);
			$front->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 400, 17, 1);
			$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 60, 180);
			$right->systems[] = new TwinEMProjector($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 475, 17, 1);
			$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 180, 300);
			$left->systems[] = new TwinEMProjector($this->getId(), $this->id, 180, 360);
		$structs[] = $left;


		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>