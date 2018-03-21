<?php

class Rongoth extends Medium {
	public $name = "Rongoth";
	public $display = "Rongoth";
	public $faction = "Narn Regime";
	public $size =  55;
	public static $value = 420;
	public $profile = array(0.93, 1.07);
	public $mass = 3750;

	public $integrity = 630;
	public $vitalHP = 80;
	public $ep = 85;
	public $ew = 675;

	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 400, 17);
		$front->systems[] = new HeavyPlasmaPulse($this->getId(), $this->id, 315, 45);
		$front->systems[] = new HeavyPlasmaPulse($this->getId(), $this->id, 315, 45);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 325, 15, 1);
		$right->systems[] = new MediumPlasmaPulse($this->getId(), $this->id, 0, 120);
		$right->systems[] = new Bulkhead($this->getId(), $this->id, 50, 0, 1);
		$right->systems[] = new TwinParticleBolter($this->getId(), $this->id, 60, 240);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 15, 1);
		$aft->systems[] = new Hangar($this->getId(), $this->id, 6, array("Gorith", "Frazi"), 6);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 325, 15, 1);
		$left->systems[] = new MediumPlasmaPulse($this->getId(), $this->id, 240, 360);
		$left->systems[] = new Bulkhead($this->getId(), $this->id, 50, 0, 1);
		$left->systems[] = new TwinParticleBolter($this->getId(), $this->id, 120, 300);
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
					"notes" => "Gorith Outfit",
					"cost" => 130,
					"loads" =>
					array(
						array(
							"systemid" => 14,
							"name" => "Gorith",
							"amount" => 6
						),
					)
				),
				array(
					"active" => 0,
					"chance" => 50,
					"notes" => "Frazi Outfit",
					"cost" => 200,
					"loads" =>
					array(
						array(
							"systemid" => 14,
							"name" => "Frazi",
							"amount" => 6
						),
					)
				),
			)
		);
	}
}

?>