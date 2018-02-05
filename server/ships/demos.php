<?php

class Demos extends Medium {
	public $name = "Demos";
	public $display = "Demos";
	public $faction = "Centauri Republic";
	public $size =  45;
	public static $value = 450;
	public $profile = array(0.92, 1.08);
	public $mass = 3000;

	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 400, 17);
		$front->systems[] = new MediumPlasma($this->getId(), $this->id, 315, 45);
		$front->systems[] = new MissileLauncher($this->getId(), $this->id, 300, 60,	array(array("Triarii", 9, 3), array("Javelin", 9, 3)));
		$front->systems[] = new MediumPlasma($this->getId(), $this->id, 315, 45);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 325, 15);
		$right->systems[] = new MediumIon($this->getId(), $this->id, 300, 120);
		$right->systems[] = new LightIon($this->getId(), $this->id, 300, 180);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 325, 15);
		$left->systems[] = new MediumIon($this->getId(), $this->id, 240, 60);
		$left->systems[] = new LightIon($this->getId(), $this->id, 180, 60);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 575);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, array(90, 3));
		$this->primary->systems[] = new Engine($this->getId(), $this->id, array(90, 3), 100);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, array(90, 3), 750);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, array(90, 3));
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
					"notes" => "Standard Outfit",
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