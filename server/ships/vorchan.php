<?php

class Vorchan extends Light {
	public $name = "Vorchan";
	public $display = "Vorchan";
	public $faction = "Centauri Republic";
	public $size = 40;
	public static $value = 360;
	public $profile = array(0.95, 1.05);
	public $mass = 1150;

	function __construct($id, $userid, $available, $status, $destroyed){
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 225, 16);
		$front->systems[] = new LightIon($this->getId(), $this->id, 240, 120);
		$front->systems[] = new MissileLauncher($this->getId(), $this->id, 300, 60,	array(array("Hasta", 8, 4), array("Patriot", 16, 8)));
		$front->systems[] = new LightIon($this->getId(), $this->id, 240, 120);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 170, 14);
		$right->systems[] = new LightPlasma($this->getId(), $this->id, 300, 120);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 170, 14);
		$left->systems[] = new LightPlasma($this->getId(), $this->id, 240, 60);
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
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 55, 500, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 55, $this->getPowerReq());
	}
}

?>