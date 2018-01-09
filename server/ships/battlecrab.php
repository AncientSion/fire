<?php

class BattleCrab extends SuperHeavy {
	public $name = "BattleCrab";
	public $display = "Battlecrab";
	public $faction = "The Shadows";
	public $size =  100;
	public static $value = 1200;
	public $profile = array(0.88, 1.12);
	public $mass = 14500;

	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolled, $notes){
        parent::__construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();


		$right = new Structure($this->getId(), $this->id, 30, 90, 1500, 34);
			$right->systems[] = new LightPulse($this->getId(), $this->id, 0, 180);
			$right->systems[] = new LightPulse($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 90, 150, 1050, 30);
			$aft->systems[] = new Hangar($this->getId(), $this->id, 150, 210, 350, 6, array("Aurora", "Thunderbolt"));
		$structs[] = $aft;


		$left = new Structure($this->getId(), $this->id, 210, 270, 1500, 34);
			$left->systems[] = new LightPulse($this->getId(), $this->id, 180, 360);
			$left->systems[] = new LightPulse($this->getId(), $this->id, 180, 360);
		$structs[] = $left;

		$left = new Structure($this->getId(), $this->id, 270, 330, 1500, 34);
			$left->systems[] = new LightPulse($this->getId(), $this->id, 180, 360);
			$left->systems[] = new LightPulse($this->getId(), $this->id, 180, 360);
		$structs[] = $left;

		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 4500);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 200, +10);
	}
}

?>