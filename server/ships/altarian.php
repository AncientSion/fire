<?php

class Altarian extends Medium {
	public $name = "Altarian";
	public $display = "Altarian";
	public $faction = "Centauri Republic";
	public $size = 55;
	public static $value = 525;
	public $profile = array(0.93, 1.07);
	public $mass = 4250;

	function __construct($id, $userid, $available, $status, $destroyed){		
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 400, 19);
		$front->systems[] = new LightIon($this->getId(), $this->id, 300, 120);
		$front->systems[] = new HeavyIon($this->getId(), $this->id, 300, 60);
		$front->systems[] = new LightIon($this->getId(), $this->id, 240, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 325, 18);
		$right->systems[] = new MediumIon($this->getId(), $this->id, 0, 120);
		$right->systems[] = new MediumIon($this->getId(), $this->id, 0, 120);
		$right->systems[] = new MediumIon($this->getId(), $this->id, 60, 180);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 16);
		$aft->systems[] = new Hangar($this->getId(), $this->id, 330, 30, 260, 8, array("Sentri", "Sitara"), 8);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 325, 18);
		$left->systems[] = new MediumIon($this->getId(), $this->id, 240, 360);
		$left->systems[] = new MediumIon($this->getId(), $this->id, 240, 360);
		$left->systems[] = new MediumIon($this->getId(), $this->id, 180, 300);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 700);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 100);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 100, 150);
		//$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 100);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 100, 750, 10);
		//$this->primary->systems[] = new Sensor($this->getId(), $this->id, 90, 750, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 100);
	}
}

?>