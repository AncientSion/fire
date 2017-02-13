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
		$structs = [];

		$front = new Structure($this->getId(), $this->id, 300, 60, 450, 50, 26);
		$front->systems[] = new HeavyAssaultArray($this->getId(), $this->id, 300, 60);
		$front->systems[] = new TorpedoLauncher($this->getId(), $this->id, 300, 60, 14, 4);
		$front->systems[] = new HeavyAssaultArray($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 325, 50, 24);
		$right->systems[] = new MediumAssaultArray($this->getId(), $this->id, 300, 120);
		$right->systems[] = new LightAssaultArray($this->getId(), $this->id, 0, 240);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 325, 50, 24);
		$left->systems[] = new MediumAssaultArray($this->getId(), $this->id, 240, 60);
		$left->systems[] = new LightAssaultArray($this->getId(), $this->id, 120, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$primary = new Primary($this->getId(), $this->id, 0, 360, 750, 70);
		$primary->systems[] = new Bridge($this->getId(), $this->id, 35);
		$primary->systems[] = new Engine($this->getId(), $this->id, 35, 80);
		$primary->systems[] = new Reactor($this->getId(), $this->id, 35);
		$primary->systems[] = new Lifesupport($this->getId(), $this->id, 35);
		$primary->systems[] = new Sensor($this->getId(), $this->id, 35);
		$this->primary = $primary;
	}
}

?>