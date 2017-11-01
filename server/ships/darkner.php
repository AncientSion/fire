<?php

class Darkner extends Light {
	public $name = "Darkner";
	public $display = "Darkner";
	public $faction = "Centauri Republic";
	public $size = 50;
	public static $value = 420;
	public $profile = array(0.93, 1.07);
	public $mass = 2000;

	function __construct($id, $userid, $available, $status, $destroyed){		
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 400, 16);
		$front->systems[] = new HeavyIon($this->getId(), $this->id, 330, 30);
		$front->systems[] = new HeavyIon($this->getId(), $this->id, 330, 30);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 325, 12);
		$right->systems[] = new LightIon($this->getId(), $this->id, 300, 180);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 325, 12);
		$left->systems[] = new LightIon($this->getId(), $this->id, 180, 60);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 550);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 60);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 60, 70);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 60);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 60, 750, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 60, 4);
	}
}

?>