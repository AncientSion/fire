<?php

class Vorchar extends Light {
	public $name = "Vorchar";
	public $display = "Vorchar";
	public $role = "Recon Frigate";
	public $faction = "Centauri Republic";
	public static $value =  300;
	public $cost = 300;
	public $mass = 1100;

	public $integrity = 400;
	public $ep = 120;
	public $ew = 800;
	public $power = 0;
	public $negation = 12;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addStructures(){
		$structs = array();

		$right = new Section(60, 180);
		$right->systems[] = new LightIon($this->getId(), $this->parentId, 180, 60);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new LightIon($this->getId(), $this->parentId, 300, 180);
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
					"chance" => 80,
					"cost" => 60,
					"name" => "Standard Outfit",
					"loads" => 
					array(
						array(
							"systemid" => 7,
							"display" => "Front Missile Launcher",
							"name" => "Hasta",
							"amount" => 6
						)
					)
				)
			)
		);
	}
}

?>