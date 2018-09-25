<?php

class Primus extends SuperHeavy {
	public $name = "Primus";
	public $display = "Primus";
	public $faction = "Centauri Republic";
	public $size =  90;
	public static $value = 1040;
	public $profile = array(0.9, 1.1);
	public $mass = 12500;

	public $integrity = 1200;
	public $vitalHP = 160;
	public $ep = 70;
	public $ew = 850;

	function __construct($data = false){
        parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 1050, 22, 6);
		$front->systems[] = new LightParticle($this->getId(), $this->id, 240, 60);
		$front->systems[] = new HeavyParticle($this->getId(), $this->id, 300, 60);
		$front->systems[] = new Hangar($this->getId(), $this->id, 14, array("Sentri", "Sitara"), 14, 2);
		$front->systems[] = new HeavyParticle($this->getId(), $this->id, 300, 60);
		$front->systems[] = new LightParticle($this->getId(), $this->id, 300, 120);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 1300, 21);
		$right->systems[] = new HeavyParticle($this->getId(), $this->id, 0, 120);
		$right->systems[] = new LightParticle($this->getId(), $this->id, 300, 120);
		$right->systems[] = new HeavyParticle($this->getId(), $this->id, 0, 120);
		$right->systems[] = new LightParticle($this->getId(), $this->id, 60, 240);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 900, 19, 3);
		$aft->systems[] = new MediumParticle($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new MediumParticle($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new MediumParticle($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 1300, 21);
		$left->systems[] = new LightParticle($this->getId(), $this->id, 240, 60);
		$left->systems[] = new HeavyParticle($this->getId(), $this->id, 240, 0);
		$left->systems[] = new LightParticle($this->getId(), $this->id, 120, 300);
		$left->systems[] = new HeavyParticle($this->getId(), $this->id, 240, 0);
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
			"moraleCost" = >0, 
			"gameid" => 0,
			"userid" => 0,
			"upgrades" => 
			array(
				array(
					"active" => 0,
					"chance" => 33,
					"notes" => "14 Sentri Outfit",
					"loads" =>
					array(
						array(
							"systemid" => 9,
							"name" => "Sentri",
							"amount" => 14,
						),
					)
				),
				array(
					"active" => 0,
					"chance" => 33,
					"notes" => "10/4 Sentri/Sitara Outfit",
					"loads" =>
					array(
						array(
							"systemid" => 9,
							"name" => "Sentri",
							"amount" => 10,
						),
						array(
							"systemid" => 9,
							"name" => "Sitara",
							"amount" => 4,
						),
					)
				),
			)
		);
	}


}

?>