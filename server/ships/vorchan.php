<?php

class Vorchan extends Light {
	public $name = "Vorchan";
	public $display = "Vorchan";
	public $role = "Strike Frigate";
	public $faction = "Centauri Republic";
	public static $value =  330;
	public $cost = 330;
	public $mass = 1250;

	public $integrity = 550;
	public $ep = 50;
	public $ew = 575;
	public $power = 1;
	public $negation = 15;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new MediumIon($this->getId(), $this->parentId, 300, 60);
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

	static function getKit(){
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