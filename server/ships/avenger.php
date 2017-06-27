<?php

class Avenger extends Heavy {
	public $name = "Avenger";
	public $display = "Avenger Heavvy Carrier";
	public $faction = "Earth Alliance";
	public $size = 80;
	public static $value = 450;
	public $profile = array(0.91, 1.09);
	public $mass = 10250;

	function __construct($id, $userid, $available, $status, $destroyed){
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 625, 25);
		$front->systems[] = new Dual($this->getId(), $this->id, 300, 60, 14, array("LightPulse", "LightParticleBeam"));
		$front->systems[] = new Dual($this->getId(), $this->id, 300, 60, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $front;

		$rightTop = new Structure($this->getId(), $this->id, 30, 90, 800, 23);
		$rightTop->systems[] = new Dual($this->getId(), $this->id, 0, 180, 14, array("LightPulse", "LightParticleBeam"));
		$rightTop->systems[] = new Dual($this->getId(), $this->id, 0, 180, 14, array("LightPulse", "LightParticleBeam"));
		$rightTop->systems[] = new Hangar($this->getId(), $this->id, 30, 150, 800, 12, array("Aurora"));
		$structs[] = $rightTop;

		$rightBottomm = new Structure($this->getId(), $this->id, 90, 150, 800, 22);
		$rightBottomm->systems[] = new Dual($this->getId(), $this->id, 0, 180, 14, array("LightPulse", "LightParticleBeam"));
		$rightBottomm->systems[] = new Dual($this->getId(), $this->id, 0, 180, 14, array("LightPulse", "LightParticleBeam"));
		$rightBottomm->systems[] = new Hangar($this->getId(), $this->id, 45, 150, 800, 12, array("Aurora"));
		$structs[] = $rightBottomm;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 20);
		$aft->systems[] = new Dual($this->getId(), $this->id, 120, 240, 14, array("LightPulse", "LightParticleBeam"));
		$aft->systems[] = new Dual($this->getId(), $this->id, 120, 240, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $aft;

		$leftBottom = new Structure($this->getId(), $this->id, 210, 270, 800, 22);
		$leftBottom->systems[] = new Dual($this->getId(), $this->id, 180, 360, 14, array("LightPulse", "LightParticleBeam"));
		$leftBottom->systems[] = new Dual($this->getId(), $this->id, 180, 360, 14, array("LightPulse", "LightParticleBeam"));
		$leftBottom->systems[] = new Hangar($this->getId(), $this->id, 210, 330, 800, 12, array("Aurora"));
		$structs[] = $leftBottom;

		$leftTop = new Structure($this->getId(), $this->id, 270, 330, 800, 23);
		$leftTop->systems[] = new Dual($this->getId(), $this->id, 180, 360, 14, array("LightPulse", "LightParticleBeam"));
		$leftTop->systems[] = new Dual($this->getId(), $this->id, 180, 360, 14, array("LightPulse", "LightParticleBeam"));
		$leftTop->systems[] = new Hangar($this->getId(), $this->id, 210, 330, 800, 12, array("Aurora"));
		$structs[] = $leftTop;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 2000);
		$this->prisagmary->systems[] = new Bridge($this->getId(), $this->id, 125);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 125, 240, 10);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 125);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 125, 550, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 125, $this->getPowerReq());
	}
}

?>