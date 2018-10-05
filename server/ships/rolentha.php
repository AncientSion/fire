<?php

class Rolentha extends Medium {
	public $name = "Rolentha";
	public $display = "Rolentha";
	public $faction = "Minbari Federation";
	public $size =  60;
	public static $value = 650;
	public $profile = array(0.9, 1.1);
	public $mass = 3750;

	public $integrity = 575;
	public $vitalHP = 70;
	public $ep = 60;
	public $ew = 800;


	function __construct($data){
        parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 350, 18, 4);
			$front->systems[] = new NeutronLaser($this->getId(), $this->id, 0, 120);
			$front->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$front->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$front->systems[] = new NeutronLaser($this->getId(), $this->id, 240, 360);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 300, 14, 1);
			$right->systems[] = new TwinEMProjector($this->getId(), $this->id, 0, 180);
			$right->systems[] = new TwinEMProjector($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 300, 14, 1);
			$left->systems[] = new TwinEMProjector($this->getId(), $this->id, 180, 0);
			$left->systems[] = new TwinEMProjector($this->getId(), $this->id, 180, 0);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>