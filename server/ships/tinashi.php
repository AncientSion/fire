<?php

class Tinashi extends Medium {
	public $name = "Tinashi";
	public $display = "Tinashi";
	public $faction = "Minbari Federation";
	public $size =  70;
	public static $value = 590;
	public $profile = array(0.9, 1.1);
	public $mass = 4250;

	public $integrity = 675;
	public $vitalHP = 85;
	public $ep = 80;
	public $ew = 750;

	function __construct($data = false){
        parent::__construct($data);
	}

	public function addSpecials(){
		$this->primary->systems[] = new Jammer($this->getId(), $this->id, $this->vitalHP, $this->traverse);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 475, 18, 3);
			$front->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
			$front->systems[] = new EMSubjugator($this->getId(), $this->id, 270, 90);
			$front->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 400, 16, 1);
			$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
			$right->systems[] = new TwinEMProjector($this->getId(), $this->id, 0, 180);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 60, 180);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 475, 16, 1);
			$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
			$left->systems[] = new TwinEMProjector($this->getId(), $this->id, 180, 360);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 180, 300);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>