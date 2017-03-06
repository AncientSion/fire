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
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 160, 16);
		$front->systems[] = new LightAssaultArray($this->getId(), $this->id, 240, 120);
		$front->systems[] = new LightAssaultArray($this->getId(), $this->id, 240, 120);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 140, 13);
		$right->systems[] = new LightAssaultArray($this->getId(), $this->id, 0, 360);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 140, 13);
		$left->systems[] = new LightAssaultArray($this->getId(), $this->id, 0, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 280);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 40);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 40, 22);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 40);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 40);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 40, $this->getPowerReq());
	}
}

?>