<?php

class Kutai extends Medium {
	public $name = "Kutai";
	public $display = "Kutai";
	public $faction = "Centauri Republic";
	public $size =  40;
	public static $value = 400;
	public $profile = array(0.9, 1.1);
	public $mass = 3800;

	public $integrity = 525;
	public $vitalHP = 70;
	public $ep = 80;
	public $ew = 650;

	function __construct($data = false){
        parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 400, 15, 2);
		$front->systems[] = new LightParticle($this->getId(), $this->id, 240, 60);
		$front->systems[] = new LightParticle($this->getId(), $this->id, 300, 120);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 325, 14, 1);
		$right->systems[] = new LightPlasma($this->getId(), $this->id, 0, 180);
		$right->systems[] = new LightPlasma($this->getId(), $this->id, 0, 180);
		$right->systems[] = new LightPlasma($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 325, 14, 1);
		$left->systems[] = new LightPlasma($this->getId(), $this->id, 180, 360);
		$left->systems[] = new LightPlasma($this->getId(), $this->id, 180, 360);
		$left->systems[] = new LightPlasma($this->getId(), $this->id, 180, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}

?>