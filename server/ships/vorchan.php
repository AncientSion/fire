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
		$structs = [];

		$front = new Structure($this->getId(), $this->id, 300, 60, 225, 30, 19);
		$front->systems[] = new MediumAssaultArray($this->getId(), $this->id, 270, 90);
		$front->systems[] = new TorpedoLauncher($this->getId(), $this->id, 300, 60, 8, 2);
		$front->systems[] = new MediumAssaultArray($this->getId(), $this->id, 270, 90);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 170, 25, 17);
		$right->systems[] = new LightAssaultArray($this->getId(), $this->id, 300, 180);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 170, 25, 17);
		$left->systems[] = new LightAssaultArray($this->getId(), $this->id, 180, 60);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$primary = new Primary($this->getId(), $this->id, 0, 360, 350, 70);
		$primary->systems[] = new Bridge($this->getId(), $this->id, 20);
		$primary->systems[] = new Engine($this->getId(), $this->id, 20, 28);
		$primary->systems[] = new Reactor($this->getId(), $this->id, 20, 20);
		$primary->systems[] = new Lifesupport($this->getId(), $this->id, 20);
		$primary->systems[] = new Sensor($this->getId(), $this->id, 20);
		$this->primary = $primary;
	}
}

?>