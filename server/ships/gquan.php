<?php

class GQuan extends Heavy {
	public $name = "GQuan";
	public $display = "GQuan";
	public $faction = "Narn Regime";
	public $size =  80;
	public static $value = 900;
	public $profile = array(0.95, 1.05);
	public $mass = 8750;

	public $integrity = 1100;
	public $vitalHP = 130;
	public $ep = 85;
	public $ew = 750;


	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
		parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 625, 20);
		$front->systems[] = new SuperHeavyLaser($this->getId(), $this->id, 330, 30);
		$front->systems[] = new EnergyMine($this->getId(), $this->id, 330, 30);
		$front->systems[] = new SuperHeavyLaser($this->getId(), $this->id, 330, 30);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 800, 18);
		$right->systems[] = new MediumPlasmaPulse($this->getId(), $this->id, 0, 90, 0, 2);
		$right->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 0, 120);
		$right->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 0, 120);
		$right->systems[] = new Bulkhead($this->getId(), $this->id, 100, 0, 2);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 17);
		$aft->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 120, 300);
		$aft->systems[] = new Hangar($this->getId(), $this->id, 10, array("Gorith", "Frazi"), 10);
		$aft->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 60, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 800, 18);
		$left->systems[] = new MediumPlasmaPulse($this->getId(), $this->id, 270, 360, 0, 2);
		$left->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 240, 360);
		$left->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 240, 360);
		$left->systems[] = new Bulkhead($this->getId(), $this->id, 100, 0, 2);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>