<?php

class Avenger extends Heavy {
	public $name = "Avenger";
	public $display = "Avenger Heavvy Carrier";
	public $faction = "Earth Alliance";
	public $size =  80;
	public static $value = 480;
	public $profile = array(0.91, 1.09);
	public $mass = 12500;

	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
		parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 625, 16);
		$front->systems[] = new Dual($this->getId(), $this->id, 270, 90, 14, array("LightPulse", "LightParticleBeam"));
		$front->systems[] = new Dual($this->getId(), $this->id, 270, 90, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 800, 15);
		$right->systems[] = new Dual($this->getId(), $this->id, 330, 150, 14, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 330, 150, 14, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Hangar($this->getId(), $this->id, 15, array("Aurora"), 30, 2);
		$right->systems[] = new Dual($this->getId(), $this->id, 30, 210, 14, array("LightPulse", "LightParticleBeam"));
		$right->systems[] = new Dual($this->getId(), $this->id, 30, 210, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 12);
		$aft->systems[] = new Dual($this->getId(), $this->id, 90, 270, 14, array("LightPulse", "LightParticleBeam"));
		$aft->systems[] = new Dual($this->getId(), $this->id, 90, 270, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 800, 15);
		$left->systems[] = new Dual($this->getId(), $this->id, 210, 30, 14, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 210, 30, 14, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Hangar($this->getId(), $this->id, 15, array("Aurora"), 30, 2);
		$left->systems[] = new Dual($this->getId(), $this->id, 150, 330, 14, array("LightPulse", "LightParticleBeam"));
		$left->systems[] = new Dual($this->getId(), $this->id, 150, 330, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
			$this->structures[sizeof($this->structures)-1]->boostEffect[] = new Effect("Armour", 3);
			$this->structures[sizeof($this->structures)-1]->effiency = $this->traverse + 3;
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 1200);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, array(140, 4));
		$this->primary->systems[] = new Engine($this->getId(), $this->id, array(140, 4), 55);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, array(140, 4), 600);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, array(140, 4), 4);
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
					"cost" => 750,
					"loads" =>
					array(
						array(
							"systemid" => 12,
							"name" => "Aurora",
							"amount" => 8
						),
						array(
							"systemid" => 16,
							"name" => "Aurora",
							"amount" => 8
						),
						array(
							"systemid" => 23,
							"name" => "Aurora",
							"amount" => 8
						),
						array(
							"systemid" => 27,
							"name" => "Aurora",
							"amount" => 8
						)
					)
				),
				array(
					"active" => 0,
					"chance" => 50,
					"notes" => "ASSAULT (Full Load) Oufit",
					"cost" => 1800,
					"loads" =>
					array(
						array(
							"systemid" => 12,
							"name" => "Aurora",
							"amount" => 16
						),
						array(
							"systemid" => 16,
							"name" => "Aurora",
							"amount" => 16
						),
						array(
							"systemid" => 23,
							"name" => "Aurora",
							"amount" => 16
						),
						array(
							"systemid" => 27,
							"name" => "Aurora",
							"amount" => 16
						)
					)
				)
			)
		);
	}
}

?>