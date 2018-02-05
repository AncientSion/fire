<?php

class Olympus extends Medium {
	public $name = "Olympus";
	public $display = "Olympus";
	public $faction = "Earth Alliance";
	public $size =  45;
	public static $value = 400;
	public $profile = array(0.94, 1.06);
	public $mass = 2500;

	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 350, 13);
		$front->systems[] = new MediumPulse($this->getId(), $this->id, 240, 360);
		$front->systems[] = new MediumLaser($this->getId(), $this->id, 315, 45);
		$front->systems[] = new MediumPulse($this->getId(), $this->id, 0, 120);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 300, 12);
		$right->systems[] = new LightPulse($this->getId(), $this->id, 0, 180);
		$right->systems[] = new MissileLauncher($this->getId(), $this->id, 270, 90, array(array("Needle", 6, 3), array("Naga", 6, 2)));

		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 300, 12);
		$left->systems[] = new LightPulse($this->getId(), $this->id, 180, 360);
		$left->systems[] = new MissileLauncher($this->getId(), $this->id, 270, 90, array(array("Needle", 6, 3), array("Naga", 6, 2)));
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
			$this->structures[sizeof($this->structures)-1]->boostEffect[] = new Effect("Armour", 3);
			$this->structures[sizeof($this->structures)-1]->effiency = $this->traverse + 3;
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 500);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, array(70, 3));
		$this->primary->systems[] = new Engine($this->getId(), $this->id, array(70, 3), 80);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, array(70, 3), 600);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, array(70, 3), 3);
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
					"chance" => 60,
					"cost" => 80,
					"notes" => "PATROL Outfit",
					"loads" => 
					array(
						array(
							"systemid" => 12,
							"display" => "Port Missile Launcher",
							"name" => "Naga",
							"amount" => 4
						),
						array(
							"systemid" => 15,
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
					"notes" => "ESCORT Outfit",
					"loads" => 
					array(
						array(
							"systemid" => 12,
							"display" => "Port Missile Launcher",
							"name" => "Needle",
							"amount" => 6
						),
						array(
							"systemid" => 15,
							"display" => "Starboard Missile Launcher",
							"name" => "Needle",
							"amount" => 6
						)
					)
				)
			)
		);
	}
}

?>