<?php

class Tinashi extends Medium {

	public $classname = "Tinashi";
	public $name = "Tinashi";
	public $faction = "Minbari Federation";
	public $size = 70;
	public static $value = 1000;
	public $profile = array(0.9, 1.1);
	public $mass = 7000;

	function __construct($id, $userid, $available){		
        parent::__construct($id, $userid, $available);
	}

	public function addStructures(){
		$structs = [];

		$left = new Structure($this->getId(), $this->id, 240, 360, 1500, 60, 38);
			$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
		$structs[] = $left;

		$right = new Structure($this->getId(), $this->id, 0, 120, 1250, 60, 38);
			$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 120, 240, 1250, 55, 34);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
			$aft->systems[] = new NeutronLaser($this->getId(), $this->id, 240, 360);
			$aft->systems[] = new Hangar($this->getId(), $this->id, 150, 210, 500, 6, ["Nial"]);
			$aft->systems[] = new NeutronLaser($this->getId(), $this->id, 0, 120);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
		$structs[] = $aft;


		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$primary = new Primary($this->getId(), $this->id, 0, 360, 2250, 70);
		$primary->systems[] = new Bridge($this->getId(), $this->id, 125);
		$primary->systems[] = new Engine($this->getId(), $this->id, 125, 250);
		$primary->systems[] = new Reactor($this->getId(), $this->id, 125, 20);
		$primary->systems[] = new Lifesupport($this->getId(), $this->id, 125);
		$primary->systems[] = new Sensor($this->getId(), $this->id, 125);
		$this->primary = $primary;
	}
}

?>