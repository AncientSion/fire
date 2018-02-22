<?php

class Octurion extends UltraHeavy {
	public $name = "Octurion";
	public $display = "Octurion";
	public $faction = "Centauri Republic";
	public $size =  110;
	public static $value = 1600;
	public $profile = array(0.95, 1.05);
	public $mass = 20000;

	public $integrity = 2100;
	public $vitalHP = 250;
	public $ep = 85;
	public $ew = 1000;

	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
		parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 324, 36, 1050, 24);
		$front->systems[] = new LightParticle($this->getId(), $this->id, 300, 60);
		$front->systems[] = new SuperHeavyParticle($this->getId(), $this->id, 315, 45);
		$front->systems[] = new SuperHeavyParticle($this->getId(), $this->id, 315, 45);
		$front->systems[] = new LightParticle($this->getId(), $this->id, 300, 60);
		$front->systems[] = new SuperHeavyParticle($this->getId(), $this->id, 270, 360);
		$front->systems[] = new SuperHeavyParticle($this->getId(), $this->id, 270, 360);
		$front->systems[] = new SuperHeavyParticle($this->getId(), $this->id, 360, 90);
		$front->systems[] = new SuperHeavyParticle($this->getId(), $this->id, 360, 90);
		$structs[] = $front;

		$rightTop = new Structure($this->getId(), $this->id, 36, 120, 800, 22);
		$rightTop->systems[] = new MediumParticle($this->getId(), $this->id, 0, 180);
		$rightTop->systems[] = new LightParticle($this->getId(), $this->id, 30, 150);
		$rightTop->systems[] = new MediumParticle($this->getId(), $this->id, 30, 150);
		$rightTop->systems[] = new MediumParticle($this->getId(), $this->id, 30, 150);
		$rightTop->systems[] = new MediumParticle($this->getId(), $this->id, 30, 150);
		$rightTop->systems[] = new MediumParticle($this->getId(), $this->id, 30, 150);
		$rightTop->systems[] = new MediumParticle($this->getId(), $this->id, 30, 150);
		$rightTop->systems[] = new LightParticle($this->getId(), $this->id, 0, 180);
		$structs[] = $rightTop;

		$rightBottomm = new Structure($this->getId(), $this->id, 120, 180, 800, 22);
		$rightBottomm->systems[] = new LightParticle($this->getId(), $this->id, 54, 234);
		$rightBottomm->systems[] = new LightParticle($this->getId(), $this->id, 54, 234);
		$rightBottomm->systems[] = new Hangar($this->getId(), $this->id, 10, array("Sentri", "SitaraParticle"), 20, 2);
		$structs[] = $rightBottomm;

		$leftBottom = new Structure($this->getId(), $this->id, 180, 240, 800, 22);
		$leftBottom->systems[] = new LightParticle($this->getId(), $this->id, 126, 306);
		$leftBottom->systems[] = new LightParticle($this->getId(), $this->id, 126, 306);
		$leftBottom->systems[] = new Hangar($this->getId(), $this->id, 10, array("Sentri", "SitaraParticle"), 20, 2);
		$structs[] = $leftBottom;

		$leftTop = new Structure($this->getId(), $this->id, 240, 324, 800, 22);
		$leftTop->systems[] = new LightParticle($this->getId(), $this->id, 180, 360);
		$leftTop->systems[] = new MediumParticle($this->getId(), $this->id, 210, 330);
		$leftTop->systems[] = new MediumParticle($this->getId(), $this->id, 210, 330);
		$leftTop->systems[] = new MediumParticle($this->getId(), $this->id, 210, 330);
		$leftTop->systems[] = new MediumParticle($this->getId(), $this->id, 210, 330);
		$leftTop->systems[] = new MediumParticle($this->getId(), $this->id, 210, 330);
		$leftTop->systems[] = new LightParticle($this->getId(), $this->id, 180, 360);
		$leftTop->systems[] = new MediumParticle($this->getId(), $this->id, 210, 330);
		$structs[] = $leftTop;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
			//$this->structures[sizeof($this->structures)-1]->boostEffect[] = new Effect("Armour", 3);
			//$this->structures[sizeof($this->structures)-1]->effiency = $this->traverse + 3;
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
							"systemid" => 25,
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
							"systemid" => 25,
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