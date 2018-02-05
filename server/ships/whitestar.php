<?php

class WhiteStar extends Light {
	public $name = "WhiteStar";
	public $display = "White Star";
	public $role = "Adv. Superiority Frigate";
	public $faction = "Minbari Federation";
	public static $value = 450;
	public $cost = 450;
	public $mass = 1800;

	public $integrity = 500;
	public $ep = 140;
	public $ew = 750;
	public $power = 3;
	public $negation = 18;

	function __construct($id, $userid){
		parent::__construct($id, $userid);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new NeutronAccelerator($this->getId(), $this->parentId, 330, 30);
		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new FusionPulsar($this->getId(), $this->parentId, 0, 60);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new FusionPulsar($this->getId(), $this->parentId, 300, 260);
		$structs[] = $left;
		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}