<?php

class KaToc extends Medium {
	public $name = "KaToc";
	public $display = "KaToc";
	public $faction = "Narn Regime";
	public $size =  55;
	public static $value = 480;
	public $profile = array(0.93, 1.07);
	public $mass = 4000;

	public $integrity = 670;
	public $vitalHP = 85;
	public $ep = 90;
	public $ew = 700;

	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 400, 17, 3);
		$front->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 240, 60);
		$front->systems[] = new MagCompressor($this->getId(), $this->id, 330, 30);
		$front->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 300, 120);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 325, 15, 1);
		$right->systems[] = new MediumLaser($this->getId(), $this->id, 0, 120);
		$right->systems[] = new Bulkhead($this->getId(), $this->id, 60, 0, 1);
		$right->systems[] = new MediumPlasmaPulse($this->getId(), $this->id, 0, 120);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 15);
		$aft->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 120, 300);
		$aft->systems[] = new LightPlasmaPulse($this->getId(), $this->id, 60, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 325, 15, 1);
		$left->systems[] = new MediumLaser($this->getId(), $this->id, 240, 360);
		$left->systems[] = new Bulkhead($this->getId(), $this->id, 60, 0, 1);
		$left->systems[] = new MediumPlasmaPulse($this->getId(), $this->id, 240, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>