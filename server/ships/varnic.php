<?php

class Varnic extends Heavy {
	public $name = "Varnic";
	public $display = "Varnic";
	public $faction = "Narn Regime";
	public $size =  70;
	public static $value = 650;
	public $profile = array(0.9, 1.1);
	public $mass = 6500;

	public $integrity = 800;
	public $vitalHP = 90;
	public $ep = 85;
	public $ew = 700;


	function __construct($data){
		parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 625, 18, 1);
		//$front->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 240, 60);
		$front->systems[] = new LightEnergyMine($this->getId(), $this->id, 330, 30);
		//$front->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 300, 120);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 800, 16, 1);
		$right->systems[] = new TwinParticleBolter($this->getId(), $this->id, 300, 120);
		$right->systems[] = new TorpedoLauncher($this->getId(), $this->id, 0, 180, 44, array(array("Vran", 12, 4), array("Vranoth", 12, 4)));
		$right->systems[] = new TwinParticleBolter($this->getId(), $this->id, 60, 240);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 15);
		$aft->systems[] = new MediumPlasmaPulse($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new MediumPlasmaPulse($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 800, 16, 1);
		$left->systems[] = new MediumLaser($this->getId(), $this->id, 240, 360);
		$left->systems[] = new MediumLaser($this->getId(), $this->id, 240, 360);
		$left->systems[] = new Bulkhead($this->getId(), $this->id, 60);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>