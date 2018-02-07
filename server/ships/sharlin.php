<?php

class Sharlin extends UltraHeavy {
	public $name = "Sharlin";
	public $display = "Sharlin";
	public $faction = "Minbari Federation";
	public $size =  120;
	public static $value = 1900;
	public $profile = array(0.90, 1.1);
	public $mass = 20000;

	public $integrity = 2000;
	public $intInt = 225;
	public $ep = 60;
	public $ew = 1050;


	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$left = new Structure($this->getId(), $this->id, 240, 360, 2450, 28);
			$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$left->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
			$left->systems[] = new EMPulseCannon($this->getId(), $this->id, 180, 0);
			$left->systems[] = new EMPulseCannon($this->getId(), $this->id, 180, 0);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 210, 330);
			$left->systems[] = new FusionCannon($this->getId(), $this->id, 210, 330);
			$left->systems[] = new NeutronLaser($this->getId(), $this->id, 210, 330);
			$left->systems[] = new NeutronLaser($this->getId(), $this->id, 210, 330);
		$structs[] = $left;

		$right = new Structure($this->getId(), $this->id, 0, 120, 2450, 28);
			$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$right->systems[] = new NeutronLaser($this->getId(), $this->id, 300, 60);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 300, 60);
			$right->systems[] = new EMPulseCannon($this->getId(), $this->id, 0, 180);
			$right->systems[] = new EMPulseCannon($this->getId(), $this->id, 0, 180);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 30, 150);
			$right->systems[] = new FusionCannon($this->getId(), $this->id, 30, 150);
			$right->systems[] = new NeutronLaser($this->getId(), $this->id, 30, 150);
			$right->systems[] = new NeutronLaser($this->getId(), $this->id, 30, 150);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 120, 240, 2100, 24);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 180, 0);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 180, 0);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 0, 180);
			$aft->systems[] = new FusionCannon($this->getId(), $this->id, 0, 180);
			$aft->systems[] = new NeutronLaser($this->getId(), $this->id, 120, 240);
			$aft->systems[] = new Hangar($this->getId(), $this->id, 12, array("Nial"), 24, 4);
			$aft->systems[] = new NeutronLaser($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;
	

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>