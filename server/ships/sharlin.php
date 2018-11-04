<?php

class Sharlin extends SuperHeavy {
	public $name = "Sharlin";
	public $display = "Sharlin";
	public $faction = "Minbari Federation";
	public $size =  95;
	public static $value = 1500;
	public $profile = array(0.9, 1.1);
	public $mass = 14000;

	public $integrity = 1600;
	public $vitalHP = 180;
	public $ep = 50;
	public $ew = 1000;
	public $manual = 0;

	function __construct($data = false){
        parent::__construct($data);
	}	

	public function addSpecials(){
		$this->primary->systems[] = new Jammer($this->getId(), $this->id, $this->vitalHP, $this->traverse*2);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 1200, 23, 4);
			$front->systems[] = new TwinEMProjector($this->getId(), $this->id, 270, 90);
			$front->systems[] = new HeavyNeutronBeamProjector($this->getId(), $this->id, 315, 45, 0, 2);
			$front->systems[] = new TwinEMProjector($this->getId(), $this->id, 270, 90);
			$front->systems[] = new FusionCannon($this->getId(), $this->id, 315, 45);
			$front->systems[] = new FusionCannon($this->getId(), $this->id, 315, 45);
			$front->systems[] = new FusionCannon($this->getId(), $this->id, 315, 45);
			$front->systems[] = new FusionCannon($this->getId(), $this->id, 315, 45);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 2450, 21);
			$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 30, 150);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 30, 150);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 30, 150);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 30, 150);
			$right->systems[] = new TwinEMProjector($this->getId(), $this->id, 0, 180);
			$right->systems[] = new TwinEMProjector($this->getId(), $this->id, 0, 180);
		$structs[] = $right;
		
		$aft = new Structure($this->getId(), $this->id, 150, 210, 2100, 17, 4);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 180, 0);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 0, 180);
			$aft->systems[] = new NeutronLaser($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new Hangar($this->getId(), $this->id, 12, array("Nial", "Tishat"), 24, 2);
			$aft->systems[] = new NeutronLaser($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 2450, 21);
			$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 210, 330);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 210, 330);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 210, 330);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 210, 330);
			$left->systems[] = new TwinEMProjector($this->getId(), $this->id, 180, 0);
			$left->systems[] = new TwinEMProjector($this->getId(), $this->id, 180, 0);
		$structs[] = $left;
	

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>