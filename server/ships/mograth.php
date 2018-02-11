<?php

class Mograth extends Light {
	public $name = "Mograth";
	public $display = "Mograth";
	public $role = "Multi-purpose Frigate";
	public $faction = "Centauri Republic";
	public static $value =  360;
	public $cost = 360;
	public $mass = 1400;

	public $integrity = 450;
	public $ep = 100;
	public $ew = 550;
	public $power = 0;
	public $negation = 14;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addStructures(){
		$structs = array();
		
		$front = new Section(300, 60);
		$front->systems[] = new MediumIon($this->getId(), $this->parentId, 315, 45);
		$front->systems[] = new MediumIon($this->getId(), $this->parentId, 315, 45);
		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new LightIon($this->getId(), $this->parentId, 300, 180);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new LightIon($this->getId(), $this->parentId, 180, 60);
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
				),
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