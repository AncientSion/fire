<?php

class Omega extends SuperHeavy {
	public $name = "Omega";
	public $display = "Omega Destroyer";
	public $faction = "Earth Alliance";
	public $size = 100;
	public static $value = 1200;
	public $profile = array(0.88, 1.12);
	public $mass = 14500;

	function __construct($id, $userid, $available){
        parent::__construct($id, $userid, $available);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 1200, 38);
			$front->systems[] = new HeavyLaser($this->getId(), $this->id, 300, 360);
			$front->systems[] = new HeavyLaser($this->getId(), $this->id, 300, 360);
			$front->systems[] = new Hangar($this->getId(), $this->id, 330, 30, 850, 12, array("Aurora", "Thunderbolt"));
			$front->systems[] = new HeavyLaser($this->getId(), $this->id, 0, 60);
			$front->systems[] = new HeavyLaser($this->getId(), $this->id, 0, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 1500, 34);
			$right->systems[] = new LightPulseCannon($this->getId(), $this->id, 0, 180);
			$right->systems[] = new LightPulseCannon($this->getId(), $this->id, 0, 180);
			$right->systems[] = new LightPulseCannon($this->getId(), $this->id, 0, 180);
			$right->systems[] = new LightPulseCannon($this->getId(), $this->id, 0, 180);
			$right->systems[] = new LightPulseCannon($this->getId(), $this->id, 0, 180);
			$right->systems[] = new LightPulseCannon($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 1050, 30);
			$aft->systems[] = new MediumPulseCannon($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new MediumPulseCannon($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new Hangar($this->getId(), $this->id, 150, 210, 350, 6, array("Aurora", "Thunderbolt"));
			$aft->systems[] = new MediumPulseCannon($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new MediumPulseCannon($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 1500, 34);
			$left->systems[] = new LightPulseCannon($this->getId(), $this->id, 180, 360);
			$left->systems[] = new LightPulseCannon($this->getId(), $this->id, 180, 360);
			$left->systems[] = new LightPulseCannon($this->getId(), $this->id, 180, 360);
			$left->systems[] = new LightPulseCannon($this->getId(), $this->id, 180, 360);
			$left->systems[] = new LightPulseCannon($this->getId(), $this->id, 180, 360);
			$left->systems[] = new LightPulseCannon($this->getId(), $this->id, 180, 360);
		$structs[] = $left;
		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 4500);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 200, 8);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 200, 530, 10);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 200);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 200, 7, 7);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 200, $this->getPowerReq()+10);
	}
}

?>