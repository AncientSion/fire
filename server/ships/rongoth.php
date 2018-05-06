<?php

class Rongoth extends Medium {
	public $name = "Rongoth";
	public $display = "Rongoth";
	public $faction = "Narn Regime";
	public $size =  55;
	public static $value = 420;
	public $profile = array(0.93, 1.07);
	public $mass = 3750;

	public $integrity = 630;
	public $vitalHP = 80;
	public $ep = 90;
	public $ew = 650;
	public $power = 3;

	function __construct($data){
        parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 400, 17);
		$front->systems[] = new HeavyPlasmaPulse($this->getId(), $this->id, 315, 45);
		$front->systems[] = new HeavyPlasmaPulse($this->getId(), $this->id, 315, 45);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 325, 15, 1);
		$right->systems[] = new MediumPlasmaPulse($this->getId(), $this->id, 345, 105);
		$right->systems[] = new Bulkhead($this->getId(), $this->id, 50, 0, 1);
		$right->systems[] = new TwinParticleBolter($this->getId(), $this->id, 60, 240);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 325, 15, 1);
		$left->systems[] = new MediumPlasmaPulse($this->getId(), $this->id, 255, 15);
		$left->systems[] = new Bulkhead($this->getId(), $this->id, 50, 0, 1);
		$left->systems[] = new TwinParticleBolter($this->getId(), $this->id, 120, 300);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>