<?php

class Dagkar extends Medium {
	public $name = "Dagkar";
	public $display = "Dagkar";
	public $faction = "Narn Regime";
	public $size =  50;
	public static $value = 480;
	public $profile = array(0.93, 1.07);
	public $mass = 3000;

	public $integrity = 525;
	public $vitalHP = 75;
	public $ep = 80;
	public $ew = 600;
	public $power = -4;

	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 400, 16, 3);
		$front->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 300, 60);
		$front->systems[] = new EnergyMine($this->getId(), $this->id, 330, 30);
		$front->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 325, 15);
		$right->systems[] = new TorpedoLauncher($this->getId(), $this->id, 300, 360, array(array("Vran", 20, 5)));
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 325, 15);
		$left->systems[] = new TorpedoLauncher($this->getId(), $this->id, 0, 60, array(array("Vran", 20, 5)));
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
					"chance" => 40,
					"notes" => "PATROL (Sentri) Outfit",
					"cost" => 175,
					"loads" =>
					array(
						array(
							"systemid" => 15,
							"display" => "Aft Main Hangar",
							"name" => "Sentri",
							"amount" => 8
						),
					)
				),
				array(
					"active" => 0,
					"chance" => 20,
					"notes" => "Raid (Sentri/Sitara) Outfit",
					"cost" => 175,
					"loads" =>
					array(
						array(
							"systemid" => 15,
							"display" => "Aft Main Hangar",
							"name" => "Sentri",
							"amount" => 8
						),
						array(
							"systemid" => 15,
							"display" => "Aft Main Hangar",
							"name" => "Sitara (Particle)",
							"amount" => 2
						),
					)
				),
			)
		);
	}
}

?>