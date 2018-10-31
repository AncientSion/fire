<?php

class WhiteStar extends Light {
	public $name = "WhiteStar";
	public $display = "White Star";
	public $role = "Adv. Superiority Frigate";
	public $faction = "Minbari Federation";
	public static $value = 400;
	public $mass = 1800;

	public $integrity = 420;
	public $ep = 140;
	public $ew = 700;
	public $negation = 16;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->addSubSystem(new PhasedNeutronLaser($this->getId(), $this->parentId, 330, 30), 0);
		$this->addSubSystem(new Dual($this->getId(), $this->parentId, 355, 55, 0, array("FusionPulseCannonAS", "FusionPulseCannonAF")), 120);
		$this->addSubSystem(new Dual($this->getId(), $this->parentId, 305, 5, 0, array("FusionPulseCannonAS", "FusionPulseCannonAF")), 240);
		$this->addSubSystem(new Jammer($this->getId(), $this->parentId, 0), 180);
	}

	public function addSubSystem($system, $align){
		$system->align = $align;
		$this->systems[] = $system;
	}

	public function addStructures(){
		$structs = array();

		$front = new Section(300, 60);
		$front->systems[] = new PhasedNeutronLaser($this->getId(), $this->parentId, 330, 30);
		$structs[] = $front;

		$right = new Section(60, 180);

		$right->systems[] = 

		$structs[] = $right;

		$left = new Section(180, 300);
		$left->systems[] = 

		$structs[] = $left;


		$jammer = new Jammer($this->getId(), $this->parentId, 0);
		$jammer->powerReq = 4;
		$intern = new Section(210, 210);
		$intern->systems[] = $jammer;
		$structs[] = $intern;

		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}
}