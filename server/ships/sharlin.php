<?php

class Sharlin extends SuperHeavy {
	public $name = "Sharlin";
	public $display = "Sharlin";
	public $faction = "Minbari Federation";
	public $size =  95;
	public static $value = 1700;
	public $profile = array(0.93, 1.07);
	public $mass = 14000;

	public $integrity = 1600;
	public $vitalHP = 180;
	public $ep = 60;
	public $ew = 1000;

	public $modFocusRate = 2;

	function __construct($data = false){
        parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 1200, 27, 4);
			$front->systems[] = new LightEMNeedler($this->getId(), $this->id, 270, 90);
			$front->systems[] = new HeavyAntimatterBeamProjector($this->getId(), $this->id, 330, 30, 0, 2);
			$front->systems[] = new LightEMNeedler($this->getId(), $this->id, 270, 90);
			$front->systems[] = new HeavyFusionCannon($this->getId(), $this->id, 315, 45);
			$front->systems[] = new HeavyFusionCannon($this->getId(), $this->id, 315, 45);
			$front->systems[] = new HeavyFusionCannon($this->getId(), $this->id, 315, 45);
			$front->systems[] = new HeavyFusionCannon($this->getId(), $this->id, 315, 45);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 2450, 27);
			$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
			$right->systems[] = new LightEMNeedler($this->getId(), $this->id, 0, 180);
			$right->systems[] = new LightEMNeedler($this->getId(), $this->id, 0, 180);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 30, 150);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 30, 150);
			$right->systems[] = new NeutronLaser($this->getId(), $this->id, 30, 150);
			$right->systems[] = new NeutronLaser($this->getId(), $this->id, 30, 150);
		$structs[] = $right;
		
		$aft = new Structure($this->getId(), $this->id, 150, 210, 2100, 22, 4);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 180, 0);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 0, 180);
			$aft->systems[] = new NeutronLaser($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new Hangar($this->getId(), $this->id, 12, array("Nial", "Tishat"), 24, 2);
			$aft->systems[] = new NeutronLaser($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 2450, 27);
			$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
			$left->systems[] = new LightEMNeedler($this->getId(), $this->id, 180, 0);
			$left->systems[] = new LightEMNeedler($this->getId(), $this->id, 180, 0);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 210, 330);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 210, 330);
			$left->systems[] = new NeutronLaser($this->getId(), $this->id, 210, 330);
			$left->systems[] = new NeutronLaser($this->getId(), $this->id, 210, 330);
		$structs[] = $left;
	

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>