<?php

class Tethys extends Light {
	public $name = "Tethys";
	public $display = "Tethys";
	public $faction = "Earth Alliance";
	public $size =  35;
	public static $value =  260;
	public $cost = 260;
	public $profile = array(0.95, 1.05);
	public $mass = 1200;

	function __construct($id, $parentId){
        parent::__construct($id, $parentId);
	}

	public function addPrimary(){
		$this->primary = new Core(-1, $this->id, 0, 360, 350, 15);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, array(45, 3));
		//$this->primary->systems[] = new Engine($this->getId(), $this->id, array(45, 3), 36);
		//$this->primary->systems[] = new Sensor($this->getId(), $this->id, array(45, 3), 500, 10);
		//$this->primary->systems[] = new Reactor($this->getId(), $this->id, array(45, 3));
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new LightLaser($this->getId(), $this->id, 300, 60);
		$front->systems[] = new LightLaser($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new LightPulse($this->getId(), $this->id, 0, 120);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new LightPulse($this->getId(), $this->id, 240, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>