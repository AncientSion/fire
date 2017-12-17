<?php

class Omega extends SuperHeavy {
	public $name = "Omega";
	public $display = "Omega Destroyer";
	public $faction = "Earth Alliance";
	public $size =  100;
	public static $value = 1200;
	public $profile = array(0.93, 1.07);
	public $mass = 14000;

	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes){
        parent::__construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 1200, 21);
		$front->systems[] = new Dual($this->getId(), $this->id, 300, 360, 25, array("HeavyLaser", "HeavyPulse"));
		$front->systems[] = new Dual($this->getId(), $this->id, 300, 360, 25, array("HeavyLaser", "HeavyPulse"));
		$front->systems[] = new Hangar($this->getId(), $this->id, 14, array("Aurora", "Thunderbolt"), 28);
		$front->systems[] = new Dual($this->getId(), $this->id, 0, 60, 25, array("HeavyLaser", "HeavyPulse"));
		$front->systems[] = new Dual($this->getId(), $this->id, 0, 60, 25, array("HeavyLaser", "HeavyPulse"));
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 1500, 19);
		$right->systems[] = new Dual($this->getId(), $this->id, 300, 120, 14, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 300, 120, 14, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180, 14, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180, 14, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 60, 240, 14, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 60, 240, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 1050, 17);
		$aft->systems[] = new MediumPulse($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new MediumPulse($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new MediumPulse($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new MediumPulse($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 1500, 19);
		$left->systems[] = new Dual($this->getId(), $this->id, 240, 60, 14, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 240, 60, 14, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360, 14, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360, 14, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 120, 300, 14, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 120, 300, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $left;		

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
			$this->structures[sizeof($this->structures)-1]->boostEffect[] = new Effect("Armour", 3);
			$this->structures[sizeof($this->structures)-1]->effiency = $this->traverse + 4;
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 1600);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, array(180, 4));
		$this->primary->systems[] = new Engine($this->getId(), $this->id, array(180, 4), 480, 10);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, array(180, 4), 800, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, array(180, 4), 10);
	}

	static function getKit(){
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
					"name" => "Patrol (Aurora) Outfit",
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
					"name" => "Patrol (Thunderbolt) Outfit",
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
					"name" => "War (Aurora) Outfit",
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
					"name" => "War (Thunderbolt) Outfit",
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