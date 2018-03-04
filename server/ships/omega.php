<?php

class Omega extends SuperHeavy {
	public $name = "Omega";
	public $display = "Omega Destroyer";
	public $faction = "Earth Alliance";
	public $size =  90;
	public static $value = 1200;
	public $profile = array(0.93, 1.07);
	public $mass = 13000;

	public $integrity = 1525;
	public $vitalHP = 180;
	public $ep = 60;
	public $ew = 800;
	public $power = 6;


	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 1200, 21, 5);
		$front->systems[] = new Dual($this->getId(), $this->id, 300, 360, 50, array("HeavyLaser", "HeavyPulse"));
		$front->systems[] = new Dual($this->getId(), $this->id, 300, 360, 50, array("HeavyLaser", "HeavyPulse"));
		$front->systems[] = new Hangar($this->getId(), $this->id, 12, array("Aurora", "Thunderbolt"), 24);
		$front->systems[] = new Dual($this->getId(), $this->id, 0, 60, 50, array("HeavyLaser", "HeavyPulse"));
		$front->systems[] = new Dual($this->getId(), $this->id, 0, 60, 50, array("HeavyLaser", "HeavyPulse"));
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 1500, 19);
		$right->systems[] = new Dual($this->getId(), $this->id, 300, 120, 28, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 300, 120, 28, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180, 28, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180, 28, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 60, 240, 28, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 60, 240, 28, array("LightPulse", "LightParticleBeam"));
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 1050, 17, 4);
		$aft->systems[] = new MediumPulse($this->getId(), $this->id, 180, 240);
		$aft->systems[] = new MediumPulse($this->getId(), $this->id, 180, 240);
		$aft->systems[] = new MediumPulse($this->getId(), $this->id, 120, 180);
		$aft->systems[] = new MediumPulse($this->getId(), $this->id, 120, 180);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 1500, 19);
		$left->systems[] = new Dual($this->getId(), $this->id, 240, 60, 28, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 240, 60, 28, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360, 28, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360, 28, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 120, 300, 28, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 120, 300, 28, array("LightPulse", "LightParticleBeam"));
		$structs[] = $left;		

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
			$this->structures[sizeof($this->structures)-1]->boostEffect[] = new Effect("Armour", 3);
			$this->structures[sizeof($this->structures)-1]->effiency = $this->traverse + 3;
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
					"chance" => 30,
					"notes" => "Patrol (Aurora) Outfit",
					"cost" => 400,
					"loads" =>
					array(
						array(
							"systemid" => 9,
							"name" => "Aurora",
							"amount" => 14
						),
					)
				),
				array(
					"active" => 0,
					"chance" => 30,
					"notes" => "Patrol (T-Bolt) Outfit",
					"cost" => 450,
					"loads" =>
					array(
						array(
							"systemid" => 9,
							"name" => "Thunderbolt",
							"amount" => 14
						),
					)
				),
				array(
					"active" => 0,
					"chance" => 10,
					"notes" => "War (Aurora) Outfit",
					"cost" => 800,
					"loads" =>
					array(
						array(
							"systemid" => 9,
							"name" => "Aurora",
							"amount" => 28
						),
					)
				),
				array(
					"active" => 0,
					"chance" => 10,
					"notes" => "War (T-Bolt) Outfit",
					"cost" => 900,
					"loads" =>
					array(
						array(
							"systemid" => 9,
							"name" => "Thunderbolt",
							"amount" => 28
						),
					),
				)
			)
		);
	}
}

?>