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


	function __construct($data){
        parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();

		$right = new Structure($this->getId(), $this->id, 0, 120, 2450, 23);
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
		
		$aft = new Structure($this->getId(), $this->id, 120, 240, 2100, 18, 6);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 180, 0);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 180, 0);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 0, 180);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 0, 180);
			$aft->systems[] = new NeutronLaser($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new Hangar($this->getId(), $this->id, 12, array("Nial", "Tishat"), 24, 4);
			$aft->systems[] = new NeutronLaser($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 240, 360, 2450, 23);
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