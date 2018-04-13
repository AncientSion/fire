<?php

class VorchanA extends Light {
	public $name = "VorchanA";
	public $display = "VorchanA";
	public $role = "Light Warship";
	public $faction = "Centauri Republic";
	public static $value = 320;
	public $mass = 1250;

	public $integrity = 400;
	public $ep = 120;
	public $ew = 525;
	public $power = 2;
	public $negation = 11;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new MissileLauncher($this->getId(), $this->parentId, 300, 60, array(array("Javelin", 4, 2), array("Hasta", 8, 4)));
		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new LightPlasma($this->getId(), $this->parentId, 315, 45);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new LightPlasma($this->getId(), $this->parentId, 315, 45);
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
					"units" => array(),
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
					"units" => array(),
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