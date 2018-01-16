<?php

class Hyperion extends Heavy {
	public $name = "Hyperion";
	public $display = "Hyperion Light Cruiser";
	public $faction = "Earth Alliance";
	public $size =  80;
	public static $value = 850;
	public $profile = array(0.93, 1.07);
	public $mass = 8000;

	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 625, 19);
		$front->systems[] = new MediumRailGun($this->getId(), $this->id, 300, 60);
		$front->systems[] = new Dual($this->getId(), $this->id, 240, 120, 14, array("LightPulse", "LightParticleBeam"));
		$front->systems[] = new Hangar($this->getId(), $this->id, 10, array("Aurora"), 10);
		$front->systems[] = new Dual($this->getId(), $this->id, 240, 120, 14, array("LightPulse", "LightParticleBeam"));
		$front->systems[] = new MediumRailGun($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 800, 18);
		$right->systems[] = new HeavyLaser($this->getId(), $this->id, 0, 60);
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180, 14, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 16);
		$aft->systems[] = new HeavyLaser($this->getId(), $this->id, 180, 240);
		$aft->systems[] = new MediumPulse($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new HeavyLaser($this->getId(), $this->id, 120, 180);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 800, 18);
		$left->systems[] = new HeavyLaser($this->getId(), $this->id, 300, 360);
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360, 14, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
			$this->structures[sizeof($this->structures)-1]->boostEffect[] = new Effect("Armour", 3);
			$this->structures[sizeof($this->structures)-1]->effiency = $this->traverse + 3;
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 1000);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, array(115, 4));
		$this->primary->systems[] = new Engine($this->getId(), $this->id, array(115, 4), 70);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, array(115, 4), 700, 15);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, array(115, 4), 6);
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
					"chance" => 65,
					"name" => "PATROL (Aurora) Outfit",
					"cost" => 300,
					"loads" =>
					array(
						array(
							"systemid" => 9,
							"display" => "Front Main Hangar",
							"name" => "Aurora",
							"amount" => 8
						),
					)
				),
			)
		);
	}
}

?>