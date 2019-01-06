<?php

class Olympus extends Medium {
	public $name = "Olympus";
	public $display = "Olympus";
	public $faction = "Earth Alliance";
	public $size =  45;
	public static $value = 415;
	public $profile = array(0.9, 1.1);
	public $mass = 2750;

	public $integrity = 550;
	public $vitalHP = 70;
	public $ep = 80;
	public $ew = 600;
	public $power = 4;

	function __construct($data = false){
        parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 350, 14, 2);
		$front->systems[] = new MediumLaser($this->getId(), $this->id, 325, 35);
		$front->systems[] = new MediumLaser($this->getId(), $this->id, 325, 35);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 300, 13, 1);
		$right->systems[] = new MediumPulseCannon($this->getId(), $this->id, 0, 120);
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180, 28, array("LightPulseCannon", "LightParticleBeam"));
		$right->systems[] = new MissileLauncher($this->getId(), $this->id, 270, 90, 44, array(array("Needle", 8, 4), array("Naga", 6, 2)));
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 300, 13, 1);
		$left->systems[] = new MediumPulseCannon($this->getId(), $this->id, 240, 360);
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360, 28, array("LightPulseCannon", "LightParticleBeam"));
		$left->systems[] = new MissileLauncher($this->getId(), $this->id, 270, 90, 44, array(array("Needle", 8, 4), array("Naga", 6, 2)));
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
			$this->structures[sizeof($this->structures)-1]->boostEffect[] = new Effect("Armour", 3);
			$this->structures[sizeof($this->structures)-1]->effiency = $this->traverse-1;
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
					"chance" => 60,
					"cost" => 80,
					"notes" => "Naga Outfit",
					"units" => array(),
					"loads" => 
					array(
						array(
							"systemid" => 12,
							"display" => "Port Missile Launcher",
							"name" => "Naga",
							"amount" => 4
						),
						array(
							"systemid" => 16,
							"display" => "Starboard Missile Launcher",
							"name" => "Naga",
							"amount" => 4
						)
					)
				),
				array(
					"active" => 0,
					"chance" => 30,
					"cost" => 70,
					"notes" => "Needle Outfit",
					"units" => array(),
					"loads" => 
					array(
						array(
							"systemid" => 12,
							"display" => "Port Missile Launcher",
							"name" => "Needle",
							"amount" => 10
						),
						array(
							"systemid" => 16,
							"display" => "Starboard Missile Launcher",
							"name" => "Needle",
							"amount" => 10
						)
					)
				)
			)
		);
	}
}

?>