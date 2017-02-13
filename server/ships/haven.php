<?php

class Haven extends Light {
	public $classname = "Haven";
	public $name = "Haven";
	public $faction = "Centauri Republic";
	public $size = 35;
	public static $value = 270;
	public $profile = array(0.9, 1.1);
	public $mass = 850;

	function __construct($id, $userid, $available){
        parent::__construct($id, $userid, $available);
	}

	public function addStructures(){
		$structs = [];

		$front = new Structure($this->getId(), $this->id, 300, 60, 160, 30, 18);
		$front->systems[] = new LightAssaultArray($this->getId(), $this->id, 240, 120);
		$front->systems[] = new LightAssaultArray($this->getId(), $this->id, 240, 120);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 140, 25, 15);
		$right->systems[] = new LightAssaultArray($this->getId(), $this->id, 0, 360);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 140, 25, 15);
		$left->systems[] = new LightAssaultArray($this->getId(), $this->id, 0, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$primary = new Primary($this->getId(), $this->id, 0, 360, 100, 70);
		$primary->systems[] =  new Bridge($this->getId(), $this->id, 150);
		$primary->systems[] =  new Engine($this->getId(), $this->id, 100, 22);
		$primary->systems[] =  new Reactor($this->getId(), $this->id, 100, 20);
		$primary->systems[] =  new Lifesupport($this->getId(), $this->id, 200);
		$primary->systems[] =  new Sensor($this->getId(), $this->id, 100);
		$this->primary = $primary;
	}
}

?>