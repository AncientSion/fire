<?php

class GSten extends Heavy {
	public $name = "GSten";
	public $display = "GSten";
	public $faction = "Narn Regime";
	public $size =  70;
	public static $value = 775;
	public $profile = array(0.95, 1.05);
	public $mass = 8000;

	public $integrity = 900;
	public $vitalHP = 110;
	public $ep = 90;
	public $ew = 750;


	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
		parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 625, 18, 3);
		$front->systems[] = new MediumPlasmaPulse($this->getId(), $this->id, 300, 60);
		$front->systems[] = new TorpedoLauncher($this->getId(), $this->id, 315, 45, array(array("Vran", 18, 6)));
		$front->systems[] = new MediumPlasmaPulse($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 800, 16);
		$right->systems[] = new MediumLaser($this->getId(), $this->id, 345, 105);
		$right->systems[] = new MediumLaser($this->getId(), $this->id, 345, 105);
		$right->systems[] = new Bulkhead($this->getId(), $this->id, 80, 0, 2);
		$right->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 0, 180);
		$right->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 15);
		$aft->systems[] = new TwinParticleBolter($this->getId(), $this->id, 120, 300);
		$aft->systems[] = new TwinParticleBolter($this->getId(), $this->id, 60, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 800, 16);
		$left->systems[] = new MediumLaser($this->getId(), $this->id, 255, 15);
		$left->systems[] = new MediumLaser($this->getId(), $this->id, 255, 15);
		$left->systems[] = new Bulkhead($this->getId(), $this->id, 80, 0, 2);
		$left->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 180, 360);
		$left->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 180, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>