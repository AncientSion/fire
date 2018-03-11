<?php

class GQuan extends Heavy {
	public $name = "GQuan";
	public $display = "GQuan";
	public $faction = "Narn Regime";
	public $size =  85;
	public static $value = 900;
	public $profile = array(0.95, 1.05);
	public $mass = 10000;

	public $integrity = 1150;
	public $vitalHP = 130;
	public $ep = 85;
	public $ew = 775;
	public $power = -6;


	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
		parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 625, 20, 3);
		$front->systems[] = new SuperHeavyLaser($this->getId(), $this->id, 330, 30);
		$front->systems[] = new EnergyMine($this->getId(), $this->id, 330, 30);
		$front->systems[] = new SuperHeavyLaser($this->getId(), $this->id, 330, 30);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 800, 18);
		$right->systems[] = new MediumPlasmaPulse($this->getId(), $this->id, 0, 120);
		$right->systems[] = new MediumPlasmaPulse($this->getId(), $this->id, 0, 120);
		$right->systems[] = new Bulkhead($this->getId(), $this->id, 80);
		$right->systems[] = new MediumLaser($this->getId(), $this->id, 0, 120);
		$right->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 0, 180);
		$right->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 17, 4);
		$aft->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 120, 300);
		$aft->systems[] = new Hangar($this->getId(), $this->id, 10, array("Gorith", "Frazi"), 10, 2);
		$aft->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 60, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 800, 18);
		$left->systems[] = new MediumPlasmaPulse($this->getId(), $this->id, 240, 360);
		$left->systems[] = new MediumPlasmaPulse($this->getId(), $this->id, 240, 360);
		$left->systems[] = new MediumLaser($this->getId(), $this->id, 240, 360);
		$left->systems[] = new Bulkhead($this->getId(), $this->id, 80);
		$left->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 180, 360);
		$left->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 180, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	static function getKit($faction){
		return array(
			"id" => 0,
			"name" => "",
			"cost" => static::$value,
			"gameid" => 0,
			"userid" => 0,
			"upgrades" => 
			array(
				array(
					"active" => 0,
					"chance" => 30,
					"notes" => "Gorith Outfit",
					"cost" => 220,
					"loads" =>
					array(
						array(
							"systemid" => 19,
							"name" => "Gorith",
							"amount" => 10
						),
					)
				),
				array(
					"active" => 0,
					"chance" => 30,
					"notes" => "Frazi Outfit",
					"cost" => 320,
					"loads" =>
					array(
						array(
							"systemid" => 19,
							"name" => "Frazi",
							"amount" => 10
						),
					)
				),
			)
		);
	}
}

?>