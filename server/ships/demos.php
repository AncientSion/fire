<?php

class Demos extends Medium {
	public $name = "Demos";
	public $display = "Demos";
	public $faction = "Centauri Republic";
	public $size =  45;
	public static $value = 450;
	public $profile = array(0.9, 1.1);
	public $mass = 2750;

	public $integrity = 550;
	public $vitalHP = 70;
	public $ep = 110;
	public $ew = 700;

	function __construct($data = false){
        parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 400, 17, 3);
		$front->systems[] = new MediumPlasma($this->getId(), $this->id, 315, 45);
		$front->systems[] = new MissileLauncher($this->getId(), $this->id, 300, 60,	44, array(array("Javelin", 9, 3), array("Triarii", 9, 3)));
		$front->systems[] = new MediumPlasma($this->getId(), $this->id, 315, 45);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 325, 15, 1);
		$right->systems[] = new MediumPulse($this->getId(), $this->id, 300, 120);
		$right->systems[] = new LightParticle($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 325, 15, 1);
		$left->systems[] = new MediumPulse($this->getId(), $this->id, 240, 60);
		$left->systems[] = new LightParticle($this->getId(), $this->id, 180, 360);
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
			"totalCost" => 0,
			"moraleCost" => 0, 
			"gameid" => 0,
			"userid" => 0,
			"upgrades" => 
			array(
				array(
					"active" => 0,
					"chance" => 80,
					"cost" => 60,
					"notes" => "Standard Outfit",
					"units" => array(),
					"loads" => 
					array(
						array(
							"systemid" => 8,
							"display" => "Front Missile Launcher",
							"name" => "Javelin",
							"amount" => 6
						)
					)
				)
			)
		);
	}
}

?>