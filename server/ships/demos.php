<?php

class Demos extends Medium {
	public $name = "Demos";
	public $display = "Demos";
	public $faction = "Centauri Republic";
	public $size = 50;
	public static $value = 600;
	public $profile = array(0.9, 1.1);
	public $mass = 3250;

	function __construct($id, $userid, $available, $status, $destroyed){		
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 500, 24);
		$front->systems[] = new HeavyIon($this->getId(), $this->id, 315, 45);
		$front->systems[] = new MissileLauncher($this->getId(), $this->id, 300, 60, 14, 4, array("Javelin", "Hasta"));
		$front->systems[] = new HeavyIon($this->getId(), $this->id, 315, 45);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 350, 22);
		$right->systems[] = new MediumIon($this->getId(), $this->id, 300, 120);
		$right->systems[] = new LightIon($this->getId(), $this->id, 0, 240);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 350, 22);
		$left->systems[] = new MediumIon($this->getId(), $this->id, 240, 60);
		$left->systems[] = new LightIon($this->getId(), $this->id, 120, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 800);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 100);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 100, 80, 6);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 100);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 100);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 100, $this->getPowerReq());
	}
}

?>