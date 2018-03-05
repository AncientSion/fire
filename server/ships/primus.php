<?php

class Primus extends SuperHeavy {
	public $name = "Primus";
	public $display = "Primus";
	public $faction = "Centauri Republic";
	public $size =  90;
	public static $value = 1080;
	public $profile = array(0.92, 1.08);
	public $mass = 12500;

	public $integrity = 1300;
	public $vitalHP = 160;
	public $ep = 70;
	public $ew = 850;

	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 1050, 22, 4);
		$front->systems[] = new LightParticle($this->getId(), $this->id, 300, 120);
		$front->systems[] = new HeavyParticle($this->getId(), $this->id, 300, 60);
		$front->systems[] = new HeavyParticle($this->getId(), $this->id, 300, 60);
		$front->systems[] = new LightParticle($this->getId(), $this->id, 240, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 1300, 21);
		$right->systems[] = new HeavyParticle($this->getId(), $this->id, 330, 90);
		$right->systems[] = new LightParticle($this->getId(), $this->id, 300, 120);
		$right->systems[] = new HeavyParticle($this->getId(), $this->id, 330, 90);
		$right->systems[] = new LightParticle($this->getId(), $this->id, 300, 120);
		$right->systems[] = new Hangar($this->getId(), $this->id, 9, array("Sentri", "SitaraParticle"), 9, 2);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 900, 19, 3);
		$aft->systems[] = new MediumParticle($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new MediumParticle($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new MediumParticle($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 1300, 21);
		$left->systems[] = new LightParticle($this->getId(), $this->id, 240, 60);
		$left->systems[] = new HeavyParticle($this->getId(), $this->id, 270, 30);
		$left->systems[] = new LightParticle($this->getId(), $this->id, 240, 60);
		$left->systems[] = new HeavyParticle($this->getId(), $this->id, 270, 30);
		$left->systems[] = new Hangar($this->getId(), $this->id, 9, array("Sentri", "SitaraParticle"), 9, 2);
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
					"chance" => 40,
					"notes" => "PATROL (Sentri) Outfit",
					"cost" => 275,
					"loads" =>
					array(
						array(
							"systemid" => 16,
							"name" => "Sentri",
							"amount" => 5
						),
						array(
							"systemid" => 26,
							"name" => "Sentri",
							"amount" => 5
						),
					)
				),
				array(
					"active" => 0,
					"chance" => 20,
					"notes" => "WAR (Combined) Outfit",
					"cost" => 450,
					"loads" =>
					array(
						array(
							"systemid" => 16,
							"name" => "Sentri",
							"amount" => 9
						),
						array(
							"systemid" => 26,
							"name" => "Sitara (Particle)",
							"amount" => 9
						),
					)
				),
			)
		);
	}


}

?>