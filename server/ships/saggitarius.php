<?php

class Saggitarius extends Medium {
	public $name = "Saggitarius";
	public $display = "Saggitarius";
	public $faction = "Earth Alliance";
	public $size =  60;
	public static $value = 400;
	public $profile = array(0.9, 1.1);
	public $mass = 4000;

	public $integrity = 725;
	public $vitalHP = 95;
	public $ep = 65;
	public $ew = 650;
	public $power = 3;

	function __construct($data = false){
        parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();
		
		$front = new Structure($this->getId(), $this->id, 330, 30, 375, 16);
		$front->systems[] = new MediumPulseCannon($this->getId(), $this->id, 300, 60);
		$front->systems[] = new MediumPulseCannon($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 450, 15, 1);
		$right->systems[] = new MissileLauncher($this->getId(), $this->id, 0, 180, 48, array(array("Naga", 20, 4), array("Cyclops", 10, 2), array("Titan", 8, 2)));
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180, 28, array("LightPulseCannon", "LightParticleBeam"));
		$right->systems[] = new MissileLauncher($this->getId(), $this->id, 0, 180, 48, array(array("Naga", 20, 4), array("Cyclops", 10, 2), array("Titan", 8, 2)));
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 325, 13);
		$aft->systems[] = new Dual($this->getId(), $this->id, 270, 90, 28, array("LightPulseCannon", "LightParticleBeam"));
		$aft->systems[] = new Dual($this->getId(), $this->id, 270, 90, 28, array("LightPulseCannon", "LightParticleBeam"));
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 450, 15, 1);
		$left->systems[] = new MissileLauncher($this->getId(), $this->id, 180, 360, 48, array(array("Naga", 20, 4), array("Cyclops", 10, 2), array("Titan", 8, 2)));
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360, 28, array("LightPulseCannon", "LightParticleBeam"));
		$left->systems[] = new MissileLauncher($this->getId(), $this->id, 180, 360, 48, array(array("Naga", 20, 4), array("Cyclops", 10, 2), array("Titan", 8, 2)));
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
			$this->structures[sizeof($this->structures)-1]->boostEffect[] = new Effect("Armour", 2);
			$this->structures[sizeof($this->structures)-1]->effiency = 3;
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
							"systemid" => 10,
							"display" => "Port A Missile Launcher",
							"name" => "Naga",
							"amount" => 12
						),
						array(
							"systemid" => 12,
							"display" => "Port B Missile Launcher",
							"name" => "Naga",
							"amount" => 12
						),
						array(
							"systemid" => 17,
							"display" => "Starboard A Missile Launcher",
							"name" => "Naga",
							"amount" => 12
						),
						array(
							"systemid" => 19,
							"display" => "Starboard B Missile Launcher",
							"name" => "Naga",
							"amount" => 12
						)
					)
				),
				array(
					"active" => 0,
					"chance" => 30,
					"cost" => 70,
					"notes" => "Cyclops Outfit",
					"units" => array(),
					"loads" => 
					array(
						array(
							"systemid" => 10,
							"display" => "Port A Missile Launcher",
							"name" => "Cyclops",
							"amount" => 6
						),
						array(
							"systemid" => 12,
							"display" => "Port B Missile Launcher",
							"name" => "Cyclops",
							"amount" => 6
						),
						array(
							"systemid" => 17,
							"display" => "Starboard A Missile Launcher",
							"name" => "Cyclops",
							"amount" => 6
						),
						array(
							"systemid" => 19,
							"display" => "Starboard B Missile Launcher",
							"name" => "Cyclops",
							"amount" => 6
						)
					)
				)
			)
		);
	}
}

?>