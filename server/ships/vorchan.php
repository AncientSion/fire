<?php

class Vorchan extends Light {
	public $classname = "Vorchan";
	public $name = "Vorchan";
	public $faction = "Centauri Republic";
	public $size = 40;
	public static $value = 370;
	public $profile = array(0.95, 1.05);
	public $mass = 1150;

	function __construct($id, $userid, $available){
        parent::__construct($id, $userid, $available);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 225, 19);
		$front->systems[] = new IonProjector($this->getId(), $this->id, 270, 90);
		$front->systems[] = new CEMissileLauncher($this->getId(), $this->id, 300, 60, 8, 2);
		$front->systems[] = new IonProjector($this->getId(), $this->id, 270, 90);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 170, 17);
		$right->systems[] = new IonBolter($this->getId(), $this->id, 300, 180);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 170, 17);
		$left->systems[] = new IonBolter($this->getId(), $this->id, 180, 60);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 350);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 55);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 55, 28);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 55);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 55);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 55, $this->getPowerReq());
	}
}

?>