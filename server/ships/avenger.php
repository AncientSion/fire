<?php

class Avenger extends Heavy {
	public $name = "Avenger";
	public $display = "Avenger Heavvy Carrier";
	public $faction = "Earth Alliance";
	public $size =  80;
	public static $value = 400;
	public $profile = array(0.91, 1.09);
	public $mass = 1250;

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
		$rightTop->systems[] = new Hangar($this->getId(), $this->id, 30, 150, 800, 9, array("Aurora"), 18);
		$structs[] = $rightTop;

		$rightBottomm = new Structure($this->getId(), $this->id, 90, 150, 800, 14);
		$rightBottomm->systems[] = new Dual($this->getId(), $this->id, 30, 210, 14, array("LightPulse", "LightParticleBeam"));
		$rightBottomm->systems[] = new Dual($this->getId(), $this->id, 30, 210, 14, array("LightPulse", "LightParticleBeam"));
		$rightBottomm->systems[] = new Hangar($this->getId(), $this->id, 45, 150, 800, 9, array("Aurora"), 18);
		$structs[] = $rightBottomm;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 12);
		$aft->systems[] = new Dual($this->getId(), $this->id, 90, 270, 14, array("LightPulse", "LightParticleBeam"));
		$aft->systems[] = new Dual($this->getId(), $this->id, 90, 270, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $aft;

		$leftBottom = new Structure($this->getId(), $this->id, 210, 270, 800, 14);
		$leftBottom->systems[] = new Dual($this->getId(), $this->id, 150, 330, 14, array("LightPulse", "LightParticleBeam"));
		$leftBottom->systems[] = new Dual($this->getId(), $this->id, 150, 330, 14, array("LightPulse", "LightParticleBeam"));
		$leftBottom->systems[] = new Hangar($this->getId(), $this->id, 210, 330, 800, 9, array("Aurora"), 18);
		$structs[] = $leftBottom;

		$leftTop = new Structure($this->getId(), $this->id, 270, 330, 800, 16);
		$leftTop->systems[] = new Dual($this->getId(), $this->id, 210, 30, 14, array("LightPulse", "LightParticleBeam"));
		$leftTop->systems[] = new Dual($this->getId(), $this->id, 210, 30, 14, array("LightPulse", "LightParticleBeam"));
		$leftTop->systems[] = new Hangar($this->getId(), $this->id, 210, 330, 800, 9, array("Aurora"), 18);
		$structs[] = $leftTop;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
			$this->structures[sizeof($this->structures)-1]->boostEffect[] = new Effect("Armour", 2);
			$this->structures[sizeof($this->structures)-1]->effiency = 6;
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 1200);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 125);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 125, 240, 10);
		//$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 125);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 125, 650, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 125, 12);
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
					"cost" => 1000,
					"loads" =>
					array(
						array(
							"systemid" => 12,
							"name" => "Aurora",
							"amount" => 9
						),
						array(
							"systemid" => 16,
							"name" => "Aurora",
							"amount" => 9
						),
						array(
							"systemid" => 23,
							"name" => "Aurora",
							"amount" => 9
						),
						array(
							"systemid" => 27,
							"name" => "Aurora",
							"amount" => 9
						)
					)
				),
				array(
					"active" => 0,
					"chance" => 50,
					"name" => "Assault (Full Load) Oufit",
					"cost" => 2000,
					"loads" =>
					array(
						array(
							"systemid" => 12,
							"name" => "Aurora",
							"amount" => 18
						),
						array(
							"systemid" => 16,
							"name" => "Aurora",
							"amount" => 18
						),
						array(
							"systemid" => 23,
							"name" => "Aurora",
							"amount" => 18
						),
						array(
							"systemid" => 27,
							"name" => "Aurora",
							"amount" => 18
						)
					)
				)
			)
		);
	}
}

?>