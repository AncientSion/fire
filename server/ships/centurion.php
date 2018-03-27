<?php

class Centurion extends Heavy {
	public $name = "Centurion";
	public $display = "Centurion";
	public $faction = "Centauri Republic";
	public $size =  80;
	public static $value = 825;
	public $profile = array(0.92, 1.08);
	public $mass = 7500;

	public $integrity = 900;
	public $vitalHP = 100;
	public $ep = 85;
	public $ew = 800;

	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 1050, 22, 6);
		$front->systems[] = new SuperHeavyParticle($this->getId(), $this->id, 315, 45);
		$front->systems[] = new SuperHeavyParticle($this->getId(), $this->id, 315, 45);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 1300, 21);
		$right->systems[] = new MediumParticle($this->getId(), $this->id, 0, 120);
		$right->systems[] = new LightParticle($this->getId(), $this->id, 240, 60);
		$right->systems[] = new MediumParticle($this->getId(), $this->id, 0, 120);
		$right->systems[] = new LightParticle($this->getId(), $this->id, 240, 60);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 900, 19, 4);
		$aft->systems[] = new LightParticle($this->getId(), $this->id, 120, 300);
		$aft->systems[] = new MediumParticle($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new MediumParticle($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new LightParticle($this->getId(), $this->id, 60, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 1300, 21);
		$left->systems[] = new LightParticle($this->getId(), $this->id, 300, 120);
		$left->systems[] = new MediumParticle($this->getId(), $this->id, 0, 120);
		$left->systems[] = new LightParticle($this->getId(), $this->id, 300, 120);
		$left->systems[] = new MediumParticle($this->getId(), $this->id, 0, 120);
		$structs[] = $left;
		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	static function getKit($faction){
		return array();
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
							"name" => "SitaraParticle",
							"amount" => 4,
						),
					)
				),
			)
		);
	}


}

?>