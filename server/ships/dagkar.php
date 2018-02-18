<?php

class Dagkar extends Medium {
	public $name = "Dagkar";
	public $display = "Dagkar";
	public $faction = "Narn Regime";
	public $size =  50;
	public static $value = 480;
	public $profile = array(0.93, 1.07);
	public $mass = 400;

	public $integrity = 525;
	public $vitalHP = 75;
	public $ep = 80;
	public $ew = 600;

	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 400, 16);
		$front->systems[] = new EnergyMine($this->getId(), $this->id, 330, 30);
		$front->systems[] = new Bulkhead($this->getId(), $this->id, 50, 0, 1);
		$front->systems[] = new EnergyMine($this->getId(), $this->id, 330, 30);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 325, 15);
		$right->systems[] = new ETorpLauncher($this->getId(), $this->id, 315, 45, array(array("EnergyTorpedo", 20, 4)));
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 15);
		$aft->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 180, 360);
		$aft->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 0, 180);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 325, 15);
		$left->systems[] = new ETorpLauncher($this->getId(), $this->id, 315, 45, array(array("EnergyTorpedo", 20, 4)));
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
							"name" => "Sitara (Muon)",
							"amount" => 2
						),
					)
				),
			)
		);
	}
}

?>