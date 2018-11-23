<?php

class GSten extends Heavy {
	public $name = "GSten";
	public $display = "G'Sten";
	public $faction = "Narn Regime";
	public $size =  70;
	public static $value = 750;
	public $profile = array(0.9, 1.1);
	public $mass = 8000;

	public $integrity = 900;
	public $vitalHP = 110;
	public $ep = 80;
	public $ew = 750;


	function __construct($data = false){
        parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 625, 18, 3);
		$front->systems[] = new TorpedoLauncher($this->getId(), $this->id, 315, 45, 60, array(array("Vran", 16, 4), array("Vranoth", 12, 3)));
		$front->systems[] = new Bulkhead($this->getId(), $this->id, 80);
		$front->systems[] = new TorpedoLauncher($this->getId(), $this->id, 315, 45, 60, array(array("Vran", 16, 4), array("Vranoth", 12, 3)));
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 800, 16);
		//$right->systems[] = new MagCompressor($this->getId(), $this->id, 355, 115);
		//$right->systems[] = new MediumShock($this->getId(), $this->id, 355, 115);
		$right->systems[] = new MediumLaser($this->getId(), $this->id, 355, 115);
		$right->systems[] = new MediumLaser($this->getId(), $this->id, 355, 115);
		$right->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 0, 180);
		$right->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 15);
		$aft->systems[] = new TwinParticleBolter($this->getId(), $this->id, 90, 270);
		$aft->systems[] = new TwinParticleBolter($this->getId(), $this->id, 90, 270);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 800, 16);
		$left->systems[] = new MediumLaser($this->getId(), $this->id, 245, 5);
		$left->systems[] = new MediumLaser($this->getId(), $this->id, 245, 5);
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
			"totalCost" => 0,
			"moraleCost" => 0, 
			"gameid" => 0,
			"userid" => 0,
			"upgrades" => 
			array(
				array(
					"active" => 0,
					"chance" => 50,
					"notes" => "Vran Outfit",
					"units" => array(),
					"loads" => 
					array(
						array(
							"systemid" => 7,
							"display" => "Bow Launcher 1",
							"name" => "Vran",
							"amount" => 12
						),
						array(
							"systemid" => 9,
							"display" => "Bow Launcher 2",
							"name" => "Vran",
							"amount" => 12
						)
					)
				),
				array(
					"active" => 0,
					"chance" => 50,
					"notes" => "Vranoth Outfit",
					"units" => array(),
					"loads" => 
					array(
						array(
							"systemid" => 7,
							"display" => "Bow Launcher 1",
							"name" => "Vranoth",
							"amount" => 9
						),
						array(
							"systemid" => 9,
							"display" => "Bow Launcher 2",
							"name" => "Vranoth",
							"amount" => 9
						)
					)
				)
			)
		);
	}
}

?>