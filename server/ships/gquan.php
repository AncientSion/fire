<?php

class GQuan extends Heavy {
	public $name = "GQuan";
	public $display = "GQuan";
	public $faction = "Narn Regime";
	public $size = 80;
	public static $value = 875;
	public $profile = array(0.95, 1.05);
	public $mass = 8750;

	function __construct($id, $userid, $available, $status, $destroyed){
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 625, 26);
		$front->systems[] = new MediumPulse($this->getId(), $this->id, 300, 60);
		$front->systems[] = new SuperHeavyLaser($this->getId(), $this->id, 315, 45);
		$front->systems[] = new SuperHeavyLaser($this->getId(), $this->id, 315, 45);
		$front->systems[] = new MediumPulse($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 800, 24);
		$right->systems[] = new LightPulse($this->getId(), $this->id, 0, 180);
		$right->systems[] = new LightPulse($this->getId(), $this->id, 0, 180);
		$right->systems[] = new LightPulse($this->getId(), $this->id, 0, 180);
		$right->systems[] = new LightPulse($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 24);
		$aft->systems[] = new LightIon($this->getId(), $this->id, 0, 360);
		$aft->systems[] = new LightIon($this->getId(), $this->id, 0, 360);
		$aft->systems[] = new LightIon($this->getId(), $this->id, 0, 360);
		$aft->systems[] = new LightIon($this->getId(), $this->id, 0, 360);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 800, 24);
		$left->systems[] = new LightPulse($this->getId(), $this->id, 180, 360);
		$left->systems[] = new LightPulse($this->getId(), $this->id, 180, 360);
		$left->systems[] = new LightPulse($this->getId(), $this->id, 180, 360);
		$left->systems[] = new LightPulse($this->getId(), $this->id, 180, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 1700);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 140);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 140, 300);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 140);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 140, 750, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 140, $this->getPowerReq());
	}
}

?>