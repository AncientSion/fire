<?php

class Tinashi extends Medium {

	public $classname = "Tinashi";
	public $name = "Tinashi";
	public $faction = "Minbari Federation";
	public $size = 70;
	public static $value = 1000;
	public $profile = array(0.9, 1.1);
	public $mass = 4000;

	function __construct($id, $userid, $available){		
        parent::__construct($id, $userid, $available);
	}

	public function addStructures(){
		$structs = array();

		$left = new Structure($this->getId(), $this->id, 240, 360, 475, 25);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
			$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$structs[] = $left;

		$right = new Structure($this->getId(), $this->id, 0, 120, 475, 25);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
			$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 120, 240, 400, 22);
			$aft->systems[] = new NeutronLaser($this->getId(), $this->id, 240, 360);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new Hangar($this->getId(), $this->id, 150, 210, 500, 6, array("Nial"));
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new NeutronLaser($this->getId(), $this->id, 0, 120);
		$structs[] = $aft;


		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		//id, $parentId, $integrity, $output = 0, $effiency = 0, $destroyed = 0){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 1325);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 125);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 125, 110, 6);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 125);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 125);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 125, $this->getPowerReq());
	}
}

?>