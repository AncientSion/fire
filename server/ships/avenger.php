<?php

class Avenger extends Heavy {
	public $name = "Avenger";
	public $display = "Avenger Heavvy Carrier";
	public $faction = "Earth Alliance";
	public $size =  80;
	public static $value = 400;
	public $profile = array(0.91, 1.09);
	public $mass = 12500;

	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes){
        parent::__construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 625, 16);
		$front->systems[] = new Dual($this->getId(), $this->id, 270, 90, 14, array("LightPulse", "LightParticleBeam"));
		$front->systems[] = new Dual($this->getId(), $this->id, 270, 90, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $front;

		$rightTop = new Structure($this->getId(), $this->id, 30, 90, 800, 15);
		$rightTop->systems[] = new Dual($this->getId(), $this->id, 330, 150, 14, array("LightPulse", "LightParticleBeam"));
		$rightTop->systems[] = new Dual($this->getId(), $this->id, 330, 150, 14, array("LightPulse", "LightParticleBeam"));
		$rightTop->systems[] = new Hangar($this->getId(), $this->id, 8, array("Aurora"), 16);
		$structs[] = $rightTop;

		$rightBottomm = new Structure($this->getId(), $this->id, 90, 150, 800, 14);
		$rightBottomm->systems[] = new Dual($this->getId(), $this->id, 30, 210, 14, array("LightPulse", "LightParticleBeam"));
		$rightBottomm->systems[] = new Dual($this->getId(), $this->id, 30, 210, 14, array("LightPulse", "LightParticleBeam"));
		$rightBottomm->systems[] = new Hangar($this->getId(), $this->id, 8, array("Aurora"), 16);
		$structs[] = $rightBottomm;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 12);
		$aft->systems[] = new Dual($this->getId(), $this->id, 90, 270, 14, array("LightPulse", "LightParticleBeam"));
		$aft->systems[] = new Dual($this->getId(), $this->id, 90, 270, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $aft;

		$leftBottom = new Structure($this->getId(), $this->id, 210, 270, 800, 14);
		$leftBottom->systems[] = new Dual($this->getId(), $this->id, 150, 330, 14, array("LightPulse", "LightParticleBeam"));
		$leftBottom->systems[] = new Dual($this->getId(), $this->id, 150, 330, 14, array("LightPulse", "LightParticleBeam"));
		$leftBottom->systems[] = new Hangar($this->getId(), $this->id, 8, array("Aurora"), 16);
		$structs[] = $leftBottom;

		$leftTop = new Structure($this->getId(), $this->id, 270, 330, 800, 16);
		$leftTop->systems[] = new Dual($this->getId(), $this->id, 210, 30, 14, array("LightPulse", "LightParticleBeam"));
		$leftTop->systems[] = new Dual($this->getId(), $this->id, 210, 30, 14, array("LightPulse", "LightParticleBeam"));
		$leftTop->systems[] = new Hangar($this->getId(), $this->id, 8, array("Aurora"), 16);
		$structs[] = $leftTop;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
			$this->structures[sizeof($this->structures)-1]->boostEffect[] = new Effect("Armour", 3);
			$this->structures[sizeof($this->structures)-1]->effiency = $this->traverse + 2;
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 1200);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, array(140, 4));
		$this->primary->systems[] = new Engine($this->getId(), $this->id, array(140, 4), 240, 10);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, array(140, 4), 650, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, array(140, 4), 12);
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
					"chance" => 50,
					"name" => "Patrol (Half Load) Outfit",
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
					"name" => "Assault (Full Load) Oufit",
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