<?php

class Avenger extends Heavy {
	public $name = "Avenger";
	public $display = "Avenger Heavvy Carrier";
	public $faction = "Earth Alliance";
	public $size = 80;
	public static $value = 400;
	public $profile = array(0.91, 1.09);
	public $mass = 10250;

	function __construct($id, $userid, $available, $status, $destroyed){
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 625, 21);
		$front->systems[] = new Dual($this->getId(), $this->id, 270, 90, 14, array("LightPulse", "LightParticleBeam"));
		$front->systems[] = new Dual($this->getId(), $this->id, 270, 90, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $front;

		$rightTop = new Structure($this->getId(), $this->id, 30, 90, 800, 19);
		$rightTop->systems[] = new Dual($this->getId(), $this->id, 330, 150, 14, array("LightPulse", "LightParticleBeam"));
		$rightTop->systems[] = new Dual($this->getId(), $this->id, 330, 150, 14, array("LightPulse", "LightParticleBeam"));
		$rightTop->systems[] = new Hangar($this->getId(), $this->id, 30, 150, 800, 10, array("Aurora"), 20);
		$structs[] = $rightTop;

		$rightBottomm = new Structure($this->getId(), $this->id, 90, 150, 800, 18);
		$rightBottomm->systems[] = new Dual($this->getId(), $this->id, 30, 210, 14, array("LightPulse", "LightParticleBeam"));
		$rightBottomm->systems[] = new Dual($this->getId(), $this->id, 30, 210, 14, array("LightPulse", "LightParticleBeam"));
		$rightBottomm->systems[] = new Hangar($this->getId(), $this->id, 45, 150, 800, 10, array("Aurora"), 20);
		$structs[] = $rightBottomm;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 16);
		$aft->systems[] = new Dual($this->getId(), $this->id, 90, 270, 14, array("LightPulse", "LightParticleBeam"));
		$aft->systems[] = new Dual($this->getId(), $this->id, 90, 270, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $aft;

		$leftBottom = new Structure($this->getId(), $this->id, 210, 270, 800, 18);
		$leftBottom->systems[] = new Dual($this->getId(), $this->id, 150, 330, 14, array("LightPulse", "LightParticleBeam"));
		$leftBottom->systems[] = new Dual($this->getId(), $this->id, 150, 330, 14, array("LightPulse", "LightParticleBeam"));
		$leftBottom->systems[] = new Hangar($this->getId(), $this->id, 210, 330, 800, 10, array("Aurora"), 20);
		$structs[] = $leftBottom;

		$leftTop = new Structure($this->getId(), $this->id, 270, 330, 800, 19);
		$leftTop->systems[] = new Dual($this->getId(), $this->id, 210, 30, 14, array("LightPulse", "LightParticleBeam"));
		$leftTop->systems[] = new Dual($this->getId(), $this->id, 210, 30, 14, array("LightPulse", "LightParticleBeam"));
		$leftTop->systems[] = new Hangar($this->getId(), $this->id, 210, 330, 800, 10, array("Aurora"), 20);
		$structs[] = $leftTop;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 1200);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 125);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 125, 240, 10);
		//$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 125);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 125, 650, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 125, -4);
	}
}

?>