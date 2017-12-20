<?php

class Vorchans extends Light {
	public $name = "Vorchans";
	public $display = "Vorchan";
	public $faction = "Centauri Republic";
	public $size =  35;
	public static $value =  320;
	public $cost = 320;
	public $profile = array(0.95, 1.05);
	public $mass = 1150;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addPrimary(){
		$this->primary = new Core(-1, $this->id, 0, 360, 350, 15);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, array(45, 3));
		//$this->primary->systems[] = new Engine($this->getId(), $this->id, array(45, 3), 36);
		//$this->primary->systems[] = new Sensor($this->getId(), $this->id, array(45, 3), 500, 10);
		//$this->primary->systems[] = new Reactor($this->getId(), $this->id, array(45, 3));
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new MediumIon($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new LightPlasma($this->getId(), $this->id, 330, 30);
		$right->systems[] = new LightPlasma($this->getId(), $this->id, 330, 30);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new LightPlasma($this->getId(), $this->id, 330, 30);
		$left->systems[] = new LightPlasma($this->getId(), $this->id, 330, 30);
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