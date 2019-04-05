<?php

class Shaveen extends SuperLight {
	public $name = "Shaveen";
	public $display = "Shaveen";
	public $role = "Police Frigate";
	public $faction = "Minbari Federation";
	public static $value = 260;

	public $integrity = 310;
	public $ep = 120;
	public $ew = 550;
	//public $power = -3;
	public $negation = 12;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
		$this->addSubSystem(new FusionCannon($this->getId(), $this->parentId, 270, 90), 0);
		//$this->addSubSystem(new FusionCannon($this->getId(), $this->parentId, 270, 90), 0);
		$this->addSubSystem(new TwinEMProjector($this->getId(), $this->parentId, 300, 120), 120);
		$this->addSubSystem(new TwinEMProjector($this->getId(), $this->parentId, 240, 60), 240);
		$this->addSubSystem(new Jammer($this->getId(), $this->parentId, 0, 4), 210);

	}
}



?>