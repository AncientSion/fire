<?php

class Vorchan extends Light {
	public $name = "Vorchan";
	public $display = "Vorchan";
	public $faction = "Centauri Republic";
	public $size =  35;
	public static $value = 360;
	public $profile = array(0.95, 1.05);
	public $mass = 1150;

	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes){
        parent::__construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 225, 14);
		$front->systems[] = new MissileLauncher($this->getId(), $this->id, 300, 60,	array(array("Hasta", 8, 4)));
		$front->systems[] = new MediumIon($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 170, 13);
		$right->systems[] = new LightPlasma($this->getId(), $this->id, 330, 30);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 170, 13);
		$left->systems[] = new LightPlasma($this->getId(), $this->id, 330, 30);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 325);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, array(45, 3));
		$this->primary->systems[] = new Engine($this->getId(), $this->id, array(45, 3), 46);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, array(45, 3), 650, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, array(45, 3));
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