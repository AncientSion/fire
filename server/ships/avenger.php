<?php

class Avenger extends Heavy {
	public $name = "Avenger";
	public $display = "Avenger Heavvy Carrier";
	public $faction = "Earth Alliance";
	public $size =  80;
	public static $value = 450;
	public $profile = array(0.9, 1.1);
	public $mass = 12500;

	public $integrity = 1200;
	public $vitalHP = 140;
	public $ep = 55;
	public $ew = 600;
	public $power = 0;

	function __construct($data = false){
        parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 625, 16);
		$front->systems[] = new Dual($this->getId(), $this->id, 270, 90, 28, array("LightPulse", "LightParticleBeam"));
		$front->systems[] = new Dual($this->getId(), $this->id, 270, 90, 28, array("LightPulse", "LightParticleBeam"));
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 800, 15);
		$right->systems[] = new Dual($this->getId(), $this->id, 330, 150, 28, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 330, 150, 28, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Hangar($this->getId(), $this->id, 12, array("Aurora"), 24, 2);
		$right->systems[] = new Dual($this->getId(), $this->id, 30, 210, 28, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 30, 210, 28, array("LightPulse", "LightParticleBeam"));
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 12);
		$aft->systems[] = new Dual($this->getId(), $this->id, 90, 270, 28, array("LightPulse", "LightParticleBeam"));
		$aft->systems[] = new Dual($this->getId(), $this->id, 90, 270, 28, array("LightPulse", "LightParticleBeam"));
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 800, 15);
		$left->systems[] = new Dual($this->getId(), $this->id, 210, 30, 28, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 210, 30, 28, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Hangar($this->getId(), $this->id, 12, array("Aurora"), 24, 2);
		$left->systems[] = new Dual($this->getId(), $this->id, 150, 330, 28, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 150, 330, 28, array("LightPulse", "LightParticleBeam"));
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
			$this->structures[sizeof($this->structures)-1]->boostEffect[] = new Effect("Armour", 3);
			$this->structures[sizeof($this->structures)-1]->effiency = $this->traverse-1;
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
					"notes" => "PATROL (Half Load) Outfit",
					"cost" => 800,
					"loads" =>
					array(
						array(
							"systemid" => 12,
							"name" => "Aurora",
							"amount" => 12
						),
						array(
							"systemid" => 21,
							"name" => "Aurora",
							"amount" => 12
						),
					)
				),
				array(
					"active" => 0,
					"chance" => 50,
					"notes" => "ASSAULT (Full Load) Oufit",
					"cost" => 1600,
					"loads" =>
					array(
						array(
							"systemid" => 12,
							"name" => "Aurora",
							"amount" => 24
						),
						array(
							"systemid" => 21,
							"name" => "Aurora",
							"amount" => 24
						),
					)
				)
			)
		);
	}
}

?>