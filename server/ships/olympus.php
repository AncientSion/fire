<?php

class Olympus extends Light {
	public $name = "Olympus";
	public $display = "Olympus";
	public $faction = "Earth Alliance";
	public $size = 45;
	public static $value = 525;
	public $profile = array(0.94, 1.06);
	public $mass = 2500;

	function __construct($id, $userid, $available, $status, $destroyed){		
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 350, 19);
		$front->systems[] = new MediumRailGun($this->getId(), $this->id, 300, 60);
		$front->systems[] = new HeavyRailGun($this->getId(), $this->id, 315, 45);
		$front->systems[] = new MediumRailGun($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 300, 17);
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180);
		$right->systems[] = new Dual($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 300, 17);
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360);
		$left->systems[] = new Dual($this->getId(), $this->id, 180, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 650);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 60);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 60, 75);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 60);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 60);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 60, $this->getPowerReq());
	}
}

?>