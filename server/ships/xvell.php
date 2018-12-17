<?php

class Xvell extends UltraLight {
	public $name = "Xvell";
	public $display = "Xvell";
	public $role = "Light Corvette";
	public $faction = "Vree Conglomerate";
	public static $value = 220;
	public $mass = 1000;

	public $integrity = 330;
	public $ep = 100;
	public $ew = 450;
	public $power = 2;
	public $negation = 8;

	function __construct($id, $parentId){
		parent::__construct($id, $parentId);
	}

	public function addSystems(){
	/*	$this->addSubSystem(new AntiProtonPulsar($this->getId(), $this->parentId, 210, 30), 240);
		$this->addSubSystem(new AntiProtonPulsar($this->getId(), $this->parentId, 270, 90), 0);
		$this->addSubSystem(new AntiProtonPulsar($this->getId(), $this->parentId, 330, 150), 120);
	*/
		$this->addSubSystem(new LightAntiProtonPulsar($this->getId(), $this->parentId, 300, 60), 0);
		$this->addSubSystem(new LightAntiProtonPulsar($this->getId(), $this->parentId, 300, 60), 0);
		$this->addSubSystem(new LightAntiProtonPulsar($this->getId(), $this->parentId, 300, 60), 0);
	}
}

?>