<?php

class Darkner extends Medium {
	public $name = "Darkner";
	public $display = "Darkner";
	public $faction = "Centauri Republic";
	public $size = 50;
	public static $value = 490;
	public $profile = array(0.95, 1.05);
	public $mass = 3750;

	function __construct($id, $userid, $available, $status, $destroyed){		
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 400, 21);
		$front->systems[] = new LightIon($this->getId(), $this->id, 240, 120);
		$front->systems[] = new MediumIon($this->getId(), $this->id, 300, 60);
		$front->systems[] = new LightIon($this->getId(), $this->id, 240, 120);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 325, 18);
		$right->systems[] = new HeavyIon($this->getId(), $this->id, 300, 120);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 325, 18);
		$left->systems[] = new HeavyIon($this->getId(), $this->id, 240, 60);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 750);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 95);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 95, 90);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 95);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 95, 800, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 95, $this->getPowerReq());
	}
}

?>