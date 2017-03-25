<?php

class Haven extends SuperLight {
	public $classname = "Haven";
	public $name = "Haven";
	public $faction = "Centauri Republic";
	public $size = 35;
	public static $value = 270;
	public $profile = array(0.9, 1.1);
	public $mass = 750;

	function __construct($id, $userid, $available){
        parent::__construct($id, $userid, $available);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 130, 14);
		$front->systems[] = new IonBolter($this->getId(), $this->id, 240, 120);
		$front->systems[] = new IonBolter($this->getId(), $this->id, 240, 120);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 120, 13);
		$right->systems[] = new IonBolter($this->getId(), $this->id, 0, 360);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 120, 13);
		$left->systems[] = new IonBolter($this->getId(), $this->id, 0, 360);
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