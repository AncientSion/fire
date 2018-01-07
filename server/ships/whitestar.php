<?php

class WhiteStar extends Light {
	public $name = "WhiteStar";
	public $display = "White Star";
	public $role = "Fast Superiority Frigate";
	public $faction = "Minbari Federation";
	public static $value = 500;
	public $cost = 500;
	public $mass = 1880;

	public $integrity = 575;
	public $ep = 110;
	public $ew = 650;
	public $power = 4;
	public $negation = 18;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new NeutronAccelerator($this->getId(), $this->id, 330, 30);
		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new FusionPulsar($this->getId(), $this->id, 0, 60);
		$right->systems[] = new FusionPulsar($this->getId(), $this->id, 0, 60);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new FusionPulsar($this->getId(), $this->id, 300, 360);
		$left->systems[] = new FusionPulsar($this->getId(), $this->id, 300, 360);
		$structs[] = $left;
		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}