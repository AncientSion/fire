<?php

class Tigara extends Heavy {
	public $name = "Tigara";
	public $display = "Tigara";
	public $faction = "Minbari Federation";
	public $size =  85;
	public static $value = 1150;
	public $profile = array(0.9, 1.1);
	public $mass = 10500;

	public $integrity = 1150;
	public $vitalHP = 130;
	public $ep = 75;
	public $ew = 900;


	function __construct($data = false){
        parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();
		
		$right = new Structure($this->getId(), $this->id, 0, 120, 2450, 23, 2);
			$right->systems[] = new AntimatterConverter($this->getId(), $this->id, 315, 45, 0, 2);
			$right->systems[] = new HeavyFusionCannon($this->getId(), $this->id, 0, 120);
			$right->systems[] = new HeavyFusionCannon($this->getId(), $this->id, 0, 120);
			$right->systems[] = new HeavyFusionCannon($this->getId(), $this->id, 0, 120);
			$right->systems[] = new HeavyFusionCannon($this->getId(), $this->id, 0, 120);
			$right->systems[] = new TwinEMProjector($this->getId(), $this->id, 0, 180);
			$right->systems[] = new TwinEMProjector($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 120, 240, 2100, 19, 6);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new AntimatterConverter($this->getId(), $this->id, 135, 225, 0, 2);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 240, 360, 2450, 23, 2);
			$left->systems[] = new AntimatterConverter($this->getId(), $this->id, 315, 45, 0, 2);
			$left->systems[] = new HeavyFusionCannon($this->getId(), $this->id, 240, 360);
			$left->systems[] = new HeavyFusionCannon($this->getId(), $this->id, 240, 360);
			$left->systems[] = new HeavyFusionCannon($this->getId(), $this->id, 240, 360);
			$left->systems[] = new HeavyFusionCannon($this->getId(), $this->id, 240, 360);
			$left->systems[] = new TwinEMProjector($this->getId(), $this->id, 180, 360);
			$left->systems[] = new TwinEMProjector($this->getId(), $this->id, 180, 360);
		$structs[] = $left;

	

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>