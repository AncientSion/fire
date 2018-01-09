<?php

class GQuan extends Heavy {
	public $name = "GQuan";
	public $display = "GQuan";
	public $faction = "Narn Regime";
	public $size =  80;
	public static $value = 875;
	public $profile = array(0.95, 1.05);
	public $mass = 8750;

	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolled, $notes){
        parent::__construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 625, 24);
		$front->systems[] = new MediumPulse($this->getId(), $this->id, 300, 60);
		$front->systems[] = new SuperHeavyLaser($this->getId(), $this->id, 330, 30);
		$front->systems[] = new SuperHeavyLaser($this->getId(), $this->id, 330, 30);
		$front->systems[] = new MediumPulse($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 800, 22);
		$right->systems[] = new LightPulse($this->getId(), $this->id, 0, 120);
		$right->systems[] = new LightPulse($this->getId(), $this->id, 0, 120);
		$right->systems[] = new LightPulse($this->getId(), $this->id, 60, 180);
		$right->systems[] = new LightPulse($this->getId(), $this->id, 60, 180);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 21);
		$aft->systems[] = new LightIon($this->getId(), $this->id, 90, 270);
		$aft->systems[] = new LightIon($this->getId(), $this->id, 90, 270);
		$aft->systems[] = new Hangar($this->getId(), $this->id, 9, array("Gorith", "Frazi"), 9);
		$aft->systems[] = new LightIon($this->getId(), $this->id, 90, 270);
		$aft->systems[] = new LightIon($this->getId(), $this->id, 90, 270);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 800, 22);
		$left->systems[] = new LightPulse($this->getId(), $this->id, 240, 360);
		$left->systems[] = new LightPulse($this->getId(), $this->id, 240, 360);
		$left->systems[] = new LightPulse($this->getId(), $this->id, 180, 300);
		$left->systems[] = new LightPulse($this->getId(), $this->id, 180, 300);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 1300);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, array(140, 4));
		$this->primary->systems[] = new Engine($this->getId(), $this->id, array(140, 4), 300);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, array(140, 4), 750, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, array(140, 4));
	}
}

?>