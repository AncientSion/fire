<?php

class Tinashi extends Medium {
	public $name = "Tinashi";
	public $display = "Tinashi";
	public $faction = "Minbari Federation";
	public $size =  70;
	public static $value = 875;
	public $profile = array(0.9, 1.1);
	public $mass = 4250;

	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$left = new Structure($this->getId(), $this->id, 240, 360, 475, 20);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 240, 360);
			$left->systems[] = new EMPulseCannon($this->getId(), $this->id, 180, 0);
			//$left->systems[] = new EMPulseCannon($this->getId(), $this->id, 180, 0);
			$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$structs[] = $left;

		$right = new Structure($this->getId(), $this->id, 0, 120, 475, 20);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 0, 120);
			$right->systems[] = new EMPulseCannon($this->getId(), $this->id, 0, 180);
			$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 120, 240, 400, 16);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;


		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 750);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, array(95, 3));
		$this->primary->systems[] = new Engine($this->getId(), $this->id, array(95, 3), 85);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, array(95, 3), 800);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, array(95, 3), 4);
	}
}

?>