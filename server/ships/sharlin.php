<?php

class Sharlin extends SuperHeavy {

	public $classname = "Sharlin";
	public $name = "Sharlin";
	public $faction = "Minbari Federation";
	public $size = 120;
	public static $value = 2000;
	public $profile = array(0.80, 1.20);
	public $mass = 19000;

	function __construct($id, $userid, $available){
        parent::__construct($id, $userid, $available);
	}

	public function addStructures(){
		$structs = [];

		$left = new Structure($this->getId(), $this->id, 240, 360, 3750, 75, 48);
			$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$left->systems[] = new NeutronLaser($this->getId(), $this->id, 210, 330);
			$left->systems[] = new NeutronLaser($this->getId(), $this->id, 210, 330);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
		$structs[] = $left;

		$right = new Structure($this->getId(), $this->id, 0, 120, 3750, 75, 48);
			$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$right->systems[] = new NeutronLaser($this->getId(), $this->id, 30, 150);
			$right->systems[] = new NeutronLaser($this->getId(), $this->id, 30, 150);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 120, 240, 3250, 65, 43);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
			$aft->systems[] = new Hangar($this->getId(), $this->id, 150, 210, 1200, 12, ["Nial"]);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
		$structs[] = $aft;
	

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$primary = new Primary($this->getId(), $this->id, 0, 360, 6750, 70);
		$primary->systems[] = new Bridge($this->getId(), $this->id, 300);
		$primary->systems[] = new Engine($this->getId(), $this->id, 300, 850);
		$primary->systems[] = new Reactor($this->getId(), $this->id, 300, 20);
		$primary->systems[] = new Lifesupport($this->getId(), $this->id, 300);
		$primary->systems[] = new Sensor($this->getId(), $this->id, 300);
		$this->primary = $primary;
	}
}

?>