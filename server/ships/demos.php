<?php

class Demos extends Medium {
	public $name = "Demos";
	public $display = "Demos";
	public $faction = "Centauri Republic";
	public $size = 50;
	public static $value = 430;
	public $profile = array(0.92, 1.08);
	public $mass = 3000;

	function __construct($id, $userid, $available, $status, $destroyed){		
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 400, 20);
		$front->systems[] = new MediumPlasma($this->getId(), $this->id, 300, 60);
		$front->systems[] = new MissileLauncher($this->getId(), $this->id, 330, 30,	array(array("Triarii", 9, 3), array("Javelin", 9, 3)));
		$front->systems[] = new MediumPlasma($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 325, 18);
		$right->systems[] = new MediumSingleIon($this->getId(), $this->id, 240, 60);
		$right->systems[] = new LightIon($this->getId(), $this->id, 300, 180);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 325, 18);
		$left->systems[] = new MediumSingleIon($this->getId(), $this->id, 300, 120);
		$left->systems[] = new LightIon($this->getId(), $this->id, 180, 60);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 700);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 90);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 90, 120);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 90);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 90, 750, 10);
		//$this->primary->systems[] = new Sensor($this->getId(), $this->id, 90, 750, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 90, $this->getPowerReq());
	}
}

?>