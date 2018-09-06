<?php

class WhiteStar extends Light {
	public $name = "WhiteStar";
	public $display = "White Star";
	public $role = "Adv. Superiority Frigate";
	public $faction = "Minbari Federation";
	public static $value = 390;
	public $mass = 1800;

	public $integrity = 420;
	public $ep = 140;
	public $ew = 700;
	public $power = 3;
	public $negation = 16;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new AssaultNeutronlaser($this->getId(), $this->parentId, 330, 30);
		$front->systems[] = new TwinEMProjector($this->getId(), $this->parentId, 270, 90);
		$structs[] = $front;

		$right = new Section(60, 180);
		$right->systems[] = new PulseFusionCannon($this->getId(), $this->parentId, 315, 45);
		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = new PulseFusionCannon($this->getId(), $this->parentId, 315, 45);
		$structs[] = $left;
		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}