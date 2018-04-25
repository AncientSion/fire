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


	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$right = new Structure($this->getId(), $this->id, 0, 120, 475, 18, 1);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
			$right->systems[] = new LightEMNeedler($this->getId(), $this->id, 0, 180);
			$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 120, 240, 400, 15);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 240, 360, 475, 18, 1);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
			$left->systems[] = new LightEMNeedler($this->getId(), $this->id, 180, 0);
			$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$structs[] = $left;


		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>