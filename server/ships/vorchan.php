<?php

class Vorchan extends Light {
	public $name = "Vorchan";
	public $display = "Vorchan";
	public $faction = "Centauri Republic";
	public $size = 35;
	public static $value = 360;
	public $profile = array(0.95, 1.05);
	public $mass = 1150;

	function __construct($id, $userid, $available, $status, $destroyed){
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 225, 14);
		$front->systems[] = new MissileLauncher($this->getId(), $this->id, 300, 60,	array(array("Hasta", 8, 4)));
		$front->systems[] = new MediumIon($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 170, 13);
		$right->systems[] = new LightPlasma($this->getId(), $this->id, 330, 30);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 170, 13);
		$left->systems[] = new LightPlasma($this->getId(), $this->id, 330, 30);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 340);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 45);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 45, 46);
		//$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 45);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 45, 650, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 45);
	}
}

?>