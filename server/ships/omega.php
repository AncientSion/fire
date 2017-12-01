<?php

class Omega extends SuperHeavy {
	public $name = "Omega";
	public $display = "Omega Destroyer";
	public $faction = "Earth Alliance";
	public $size = 100;
	public static $value = 1200;
	public $profile = array(0.93, 1.07);
	public $mass = 14000;

	function __construct($id, $userid, $available, $status, $destroyed){
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 1200, 19);
		$front->systems[] = new Dual($this->getId(), $this->id, 300, 360, 25, array("HeavyLaser", "HeavyPulse"));
		$front->systems[] = new Dual($this->getId(), $this->id, 300, 360, 25, array("HeavyLaser", "HeavyPulse"));
		$front->systems[] = new Hangar($this->getId(), $this->id, 330, 30, 1100, 14, array("Aurora", "Thunderbolt"), 28);
		$front->systems[] = new Dual($this->getId(), $this->id, 0, 60, 25, array("HeavyLaser", "HeavyPulse"));
		$front->systems[] = new Dual($this->getId(), $this->id, 0, 60, 25, array("HeavyLaser", "HeavyPulse"));
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 1500, 17);
		$right->systems[] = new Dual($this->getId(), $this->id, 300, 120, 14, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 300, 120, 14, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180, 14, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180, 14, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 60, 240, 14, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 60, 240, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 1050, 15);
		$aft->systems[] = new MediumPulse($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new MediumPulse($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new MediumPulse($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new MediumPulse($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 1500, 17);
		$left->systems[] = new Dual($this->getId(), $this->id, 240, 60, 14, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 240, 60, 14, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360, 14, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360, 14, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 120, 300, 14, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 120, 300, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $left;		

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
			$this->structures[sizeof($this->structures)-1]->boostEffect[] = new Effect("Armour", 2);
			$this->structures[sizeof($this->structures)-1]->effiency = 6;
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 1700);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 180);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 180, 480, 10);
		//$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 180);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 180, 800, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 180, 10);
	}


	static function getKit(){
		return array(
					"id" => 0,
					"name" => "",
					"cost" => static::$value,
					"eta" => 3,
					"gameid" => 0,
					"userid" => 0,
					"upgrades" => 
						array(
							array(
								"active" => 0,
								"chance" => 40,
								"name" => "Standard Aurora Outfit",
								"cost" => 400,
								"loads" =>
									array(
										array(
											"systemid" => 9,
											"display" => "Front Main Hangar",
											"name" => "Aurora",
											"amount" => 14
										),
								)
							),
							array(
								"active" => 0,
								"chance" => 40,
								"name" => "Standard Thunderbolt Outfit",
								"cost" => 450,
								"loads" =>
									array(
										array(
											"systemid" => 9,
											"display" => "Front Main Hangar",
											"name" => "Thunderbolt",
											"amount" => 14
										),
									)
							)
					)
				);
	}
}

?>