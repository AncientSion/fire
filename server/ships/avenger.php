<?php

class Avenger extends Heavy {
	public $name = "Avenger";
	public $display = "Avenger Heavvy Carrier";
	public $faction = "Earth Alliance";
	public $size = 80;
	public static $value = 450;
	public $profile = array(0.92, 1.08);
	public $mass = 10250;

	function __construct($id, $userid, $available, $status, $destroyed){
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 625, 26);
		$front->systems[] = new LightPulseCannon($this->getId(), $this->id, 300, 60);
		$front->systems[] = new MediumRailGun($this->getId(), $this->id, 300, 60);
		$front->systems[] = new MediumRailGun($this->getId(), $this->id, 300, 60);
		$front->systems[] = new LightPulseCannon($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$topRight = new Structure($this->getId(), $this->id, 30, 90, 800, 24);
		$topRight->systems[] = new LightPulseCannon($this->getId(), $this->id, 0, 180);
		$topRight->systems[] = new LightPulseCannon($this->getId(), $this->id, 0, 180);
		$topRight->systems[] = new Hangar($this->getId(), $this->id, 30, 150, 800, 12, array("Aurora"));
		$structs[] = $topRight;

		$bottomRight = new Structure($this->getId(), $this->id, 90, 150, 800, 22);
		$bottomRight->systems[] = new LightPulseCannon($this->getId(), $this->id, 0, 180);
		$bottomRight->systems[] = new LightPulseCannon($this->getId(), $this->id, 0, 180);
		$bottomRight->systems[] = new Hangar($this->getId(), $this->id, 45, 150, 800, 12, array("Aurora"));
		$structs[] = $bottomRight;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 24);
		$aft->systems[] = new LightPulseCannon($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new LightPulseCannon($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;

		$bottomLeft = new Structure($this->getId(), $this->id, 210, 270, 800, 28);
		$bottomLeft->systems[] = new LightPulseCannon($this->getId(), $this->id, 180, 360);
		$bottomLeft->systems[] = new LightPulseCannon($this->getId(), $this->id, 180, 360);
		$bottomLeft->systems[] = new Hangar($this->getId(), $this->id, 210, 330, 800, 12, array("Aurora"));
		$structs[] = $bottomLeft;

		$topLeft = new Structure($this->getId(), $this->id, 270, 330, 800, 28);
		$topLeft->systems[] = new LightPulseCannon($this->getId(), $this->id, 180, 360);
		$topLeft->systems[] = new LightPulseCannon($this->getId(), $this->id, 180, 360);
		$topLeft->systems[] = new Hangar($this->getId(), $this->id, 210, 330, 800, 12, array("Aurora"));
		$structs[] = $topLeft;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 2750);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 125);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 125, 240, 10);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 125);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 125, 10, 8);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 125, $this->getPowerReq() + 12);
	}
}

?>