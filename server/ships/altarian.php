<?php

class Altarian extends Medium {
	public $name = "Altarian";
	public $display = "Altarian";
	public $faction = "Centauri Republic";
	public $size =  55;
	public static $value = 525;
	public $profile = array(0.93, 1.07);
	public $mass = 4250;

	public $integrity = 700;
	public $vitalHP = 90;
	public $ep = 95;
	public $ew = 750;

	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 400, 18);
		$front->systems[] = new LightParticle($this->getId(), $this->id, 240, 60);
		$front->systems[] = new HeavyParticle($this->getId(), $this->id, 300, 60);
		$front->systems[] = new LightParticle($this->getId(), $this->id, 300, 120);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 325, 16);
		$right->systems[] = new MediumParticle($this->getId(), $this->id, 0, 120);
		$right->systems[] = new MediumParticle($this->getId(), $this->id, 0, 120);
		$right->systems[] = new MediumParticle($this->getId(), $this->id, 60, 180);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 16);
		$aft->systems[] = new Hangar($this->getId(), $this->id, 8, array("Sentri", "SitaraParticle"), 8);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 325, 16);
		//$left->systems[] = new Hangar($this->getId(), $this->id, 8, array("Sentri", "SitaraParticle"), 8);
		$left->systems[] = new MediumParticle($this->getId(), $this->id, 240, 360);
		$left->systems[] = new MediumParticle($this->getId(), $this->id, 240, 360);
		$left->systems[] = new MediumParticle($this->getId(), $this->id, 180, 300);
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
					"cost" => 175,
					"loads" =>
					array(
						array(
							"systemid" => 15,
							"display" => "Aft Main Hangar",
							"name" => "Sentri",
							"amount" => 8
						),
					)
				),
				array(
					"active" => 0,
					"chance" => 20,
					"notes" => "Raid (Sentri/Sitara) Outfit",
					"cost" => 175,
					"loads" =>
					array(
						array(
							"systemid" => 15,
							"display" => "Aft Main Hangar",
							"name" => "Sentri",
							"amount" => 8
						),
						array(
							"systemid" => 15,
							"display" => "Aft Main Hangar",
							"name" => "Sitara (Particle)",
							"amount" => 2
						),
					)
				),
			)
		);
	}
}

?>