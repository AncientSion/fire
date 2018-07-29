<?php

class DagKar extends Medium {
	public $name = "DagKar";
	public $display = "DagKar";
	public $faction = "Narn Regime";
	public $size =  50;
	public static $value = 420;
	public $profile = array(0.93, 1.07);
	public $mass = 3000;

	public $integrity = 500;
	public $vitalHP = 75;
	public $ep = 80;
	public $ew = 600;

	function __construct($data = false){
        parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 400, 16, 3);
		$front->systems[] = new TwinParticleBolter($this->getId(), $this->id, 180, 0);
		$front->systems[] = new EnergyMine($this->getId(), $this->id, 330, 30);
		$front->systems[] = new TwinParticleBolter($this->getId(), $this->id, 0, 180);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 325, 15);
		$right->systems[] = new TorpedoLauncher($this->getId(), $this->id, 300, 60, 44, array(array("Vranoth", 15, 3), array("VranothKa", 10, 2)));
		$right->systems[] = new TorpedoLauncher($this->getId(), $this->id, 300, 60, 44, array(array("Vranoth", 15, 3), array("VranothKa", 10, 2)));
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 325, 15);
		$left->systems[] = new TorpedoLauncher($this->getId(), $this->id, 300, 60, 44, array(array("Vranoth", 15, 3), array("VranothKa", 10, 2)));
		$left->systems[] = new TorpedoLauncher($this->getId(), $this->id, 300, 60, 44, array(array("Vranoth", 15, 3), array("VranothKa", 10, 2)));
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
					"chance" => 50,
					"cost" => 0,
					"notes" => "Vranoth Outfit",
					"units" => array(),
					"loads" => 
					array(
						array(
							"systemid" => 11,
							"display" => "Starboard Torpedo Launcher",
							"name" => "Vranoth",
							"amount" => 15
						),
						array(
							"systemid" => 12,
							"display" => "Starboard Torpedo Launcher",
							"name" => "Vranoth",
							"amount" => 15
						),
						array(
							"systemid" => 14,
							"display" => "Port Torpedo Launcher",
							"name" => "Vranoth",
							"amount" => 15
						),
						array(
							"systemid" => 15,
							"display" => "Port Torpedo Launcher",
							"name" => "Vranoth",
							"amount" => 15
						)
					)
				),
				array(
					"active" => 0,
					"chance" => 50,
					"cost" => 0,
					"notes" => "VranothKa Outfit",
					"units" => array(),
					"loads" => 
					array(
						array(
							"systemid" => 11,
							"display" => "Starboard Torpedo Launcher",
							"name" => "VranothKa",
							"amount" => 10
						),
						array(
							"systemid" => 12,
							"display" => "Starboard Torpedo Launcher",
							"name" => "VranothKa",
							"amount" => 10
						),
						array(
							"systemid" => 14,
							"display" => "Port Torpedo Launcher",
							"name" => "VranothKa",
							"amount" => 10
						),
						array(
							"systemid" => 15,
							"display" => "Port Torpedo Launcher",
							"name" => "VranothKa",
							"amount" => 10
						)
					)
				)
			)
		);
	}

}

?>