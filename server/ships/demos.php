<?php

class Demos extends Medium {
	public $classname = "Demos";
	public $name = "Demos";
	public $faction = "Centauri Republic";
	public $size = 50;
	public static $value = 600;
	public $profile = array(0.9, 1.1);
	public $mass = 2500;

	function __construct($id, $userid, $available){		
        parent::__construct($id, $userid, $available);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 400, 50, 22);
		$front->systems[] = new HeavyAssaultArray($this->getId(), $this->id, 300, 60);
		$front->systems[] = new TorpedoLauncher($this->getId(), $this->id, 300, 60, 14, 4);
		$front->systems[] = new HeavyAssaultArray($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 275, 50, 20);
		$right->systems[] = new MediumAssaultArray($this->getId(), $this->id, 300, 120);
		$right->systems[] = new LightAssaultArray($this->getId(), $this->id, 0, 240);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 275, 50, 20);
		$left->systems[] = new MediumAssaultArray($this->getId(), $this->id, 240, 60);
		$left->systems[] = new LightAssaultArray($this->getId(), $this->id, 120, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$primary = new Primary($this->getId(), $this->id, 0, 360, 650, 70);
		$primary->systems[] = new Bridge($this->getId(), $this->id, 125);
		$primary->systems[] = new Engine($this->getId(), $this->id, 35, 80);
		$primary->systems[] = new Lifesupport($this->getId(), $this->id, 160);
		$primary->systems[] = new Sensor($this->getId(), $this->id, 85);
		$primary->systems[] = new Reactor($this->getId(), $this->id, 85, $this->getPowerReq());
		$this->primary = $primary;
	}
}

?>