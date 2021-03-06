<?php

class KaToc extends Medium {
	public $name = "KaToc";
	public $display = "Ka'Toc";
	public $faction = "Narn Regime";
	public $size =  55;
	public static $value = 460;
	public $profile = array(0.9, 1.1);
	public $mass = 4000;

	public $integrity = 670;
	public $vitalHP = 80;
	public $ep = 85;
	public $ew = 700;

	function __construct($data = false){
        parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 400, 17, 3);
		$front->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 240, 60);
		$front->systems[] = new MagCompressor($this->getId(), $this->id, 315, 45);
		//$front->systems[] = new GraviticMine($this->getId(), $this->id, 330, 30);
		$front->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 300, 120);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 325, 15, 1);
		$right->systems[] = new MediumLaser($this->getId(), $this->id, 355, 115);
		$right->systems[] = new Bulkhead($this->getId(), $this->id, 60, 0, 1);
		$right->systems[] = new TwinParticleBolter($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 15, 1);
		//$aft->systems[] = new Hangar($this->getId(), $this->id, 6, array("Gorith"), 6);
		$aft->systems[] = new TwinParticleBolter($this->getId(), $this->id, 90, 270);
		$aft->systems[] = new MediumPlasmaPulse($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 325, 15, 1);
		$left->systems[] = new MediumLaser($this->getId(), $this->id, 245, 5);
		$left->systems[] = new Bulkhead($this->getId(), $this->id, 60, 0, 1);
		$left->systems[] = new TwinParticleBolter($this->getId(), $this->id, 180, 360);
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
					"chance" => 50,
					"notes" => "Gorith Outfit",
					"loads" =>
					array(
						array(
							"systemid" => 15,
							"name" => "Gorith",
							"amount" => 6
						),
					)
				),
			)
		);
	}
}

?>