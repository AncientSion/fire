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
	public $power = 0;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->addSubSystem(new ImprovedNeutronLaser($this->getId(), $this->parentId, 330, 30), 0);
		$this->addSubSystem(new NeutronPulsar($this->getId(), $this->parentId, 330, 30), 120);
		$this->addSubSystem(new NeutronPulsar($this->getId(), $this->parentId, 330, 30), 240);
		//$this->addSubSystem(new Dual($this->getId(), $this->parentId, 355, 55, 0, array("FusionCannonA", "FusionCannonB")), 120);
		//$this->addSubSystem(new Dual($this->getId(), $this->parentId, 330, 30, 0, array("FusionPulseCannonAS", "FusionPulseCannonAF")), 120);
		//$this->addSubSystem(new Dual($this->getId(), $this->parentId, 330, 30, 0, array("FusionPulseCannonAS", "FusionPulseCannonAF")), 240);
		$this->addSubSystem(new Jammer($this->getId(), $this->parentId, 0, 4), 210);
	}
}