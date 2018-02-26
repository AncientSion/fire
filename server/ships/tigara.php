<?php

class Tigara extends Heavy {
	public $name = "Tigara";
	public $display = "Tigara";
	public $faction = "Minbari Federation";
	public $size =  90;
	public static $value = 1350;
	public $profile = array(0.93, 1.07);
	public $mass = 10500;

	public $integrity = 1200;
	public $vitalHP = 140;
	public $ep = 75;
	public $ew = 900;


	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$left = new Structure($this->getId(), $this->id, 240, 360, 2450, 23, 2);
			$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60, 0, 2);
			$left->systems[] = new HeavyFusionCannon($this->getId(), $this->id, 240, 360);
			$left->systems[] = new HeavyFusionCannon($this->getId(), $this->id, 240, 360);
			$left->systems[] = new HeavyFusionCannon($this->getId(), $this->id, 240, 360);
			$left->systems[] = new HeavyFusionCannon($this->getId(), $this->id, 240, 360);
			$left->systems[] = new EMNeedler($this->getId(), $this->id, 180, 360);
			$left->systems[] = new EMNeedler($this->getId(), $this->id, 180, 360);
		$structs[] = $left;

		$right = new Structure($this->getId(), $this->id, 0, 120, 2450, 23, 2);
			$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60, 0, 2);
			$right->systems[] = new HeavyFusionCannon($this->getId(), $this->id, 0, 120);
			$right->systems[] = new HeavyFusionCannon($this->getId(), $this->id, 0, 120);
			$right->systems[] = new HeavyFusionCannon($this->getId(), $this->id, 0, 120);
			$right->systems[] = new HeavyFusionCannon($this->getId(), $this->id, 0, 120);
			$right->systems[] = new EMNeedler($this->getId(), $this->id, 0, 180);
			$right->systems[] = new EMNeedler($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 120, 240, 2100, 20, 6);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new NeutronLaser($this->getId(), $this->id, 120, 240, 0, 2);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;
	

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>