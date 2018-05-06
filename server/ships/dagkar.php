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

	function __construct($data){
        parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 400, 16, 1);
		$front->systems[] = new EnergyMine($this->getId(), $this->id, 330, 30);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 325, 15);
		$right->systems[] = new TorpedoLauncher($this->getId(), $this->id, 300, 60, array(array("Vranoth", 30, 6), array("VranothKa", 20, 4)));
		$right->systems[] = new TwinParticleBolter($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 325, 15);
		$left->systems[] = new TwinParticleBolter($this->getId(), $this->id, 180, 360);
		$left->systems[] = new TorpedoLauncher($this->getId(), $this->id, 300, 60, array(array("Vranoth", 30, 6), array("VranothKa", 20, 4)));
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
					"chance" => 100,
					"cost" => 0,
					"notes" => "Standard Outfit",
					"units" => array(),
					"loads" => 
					array(
						array(
							"systemid" => 9,
							"display" => "Port Torpedo Launcher",
							"name" => "Vranoth",
							"amount" => 24
						),
						array(
							"systemid" => 13,
							"display" => "Starboard Torpedo Launcher",
							"name" => "Vranoth",
							"amount" => 24
						)
					)
				)
			)
		);
	}

}

?>