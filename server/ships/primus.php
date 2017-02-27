<?php

class Primus extends Heavy {
	public $classname = "Primus";
	public $name = "Primus";
	public $faction = "Centauri Republic";
	public $size = 100;
	public static $value = 1080;
	public $profile = array(0.87, 1.13);
	public $mass = 12500;

	function __construct($id, $userid, $available){
        parent::__construct($id, $userid, $available);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 1250, 60, 35);
		$front->systems[] = new HeavyAssaultArray($this->getId(), $this->id, 300, 60);
		$front->systems[] = new HeavyAssaultArray($this->getId(), $this->id, 300, 60);
		$front->systems[] = new HeavyAssaultArray($this->getId(), $this->id, 300, 60);
		$front->systems[] = new HeavyAssaultArray($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 1400, 60, 33);
		$right->systems[] = new LightAssaultArray($this->getId(), $this->id, 300, 180);
		$right->systems[] = new LightAssaultArray($this->getId(), $this->id, 300, 180);
		$right->systems[] = new LightAssaultArray($this->getId(), $this->id, 300, 180);
		$right->systems[] = new Hangar($this->getId(), $this->id, 30, 90, 400, 6, ["Sentri"]);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 1000, 50, 30);
		$aft->systems[] = new MediumAssaultArray($this->getId(), $this->id, 45, 315);
		$aft->systems[] = new MediumAssaultArray($this->getId(), $this->id, 45, 315);
		$aft->systems[] = new MediumAssaultArray($this->getId(), $this->id, 45, 315);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 1400, 60, 33);
		$left->systems[] = new LightAssaultArray($this->getId(), $this->id, 180, 60);
		$left->systems[] = new LightAssaultArray($this->getId(), $this->id, 180, 60);
		$left->systems[] = new LightAssaultArray($this->getId(), $this->id, 180, 60);
		$left->systems[] = new Hangar($this->getId(), $this->id, 270, 330, 400, 6, ["Sentri"]);
		$structs[] = $left;
		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}


	public function addPrimary(){
		$primary = new Primary($this->getId(), $this->id, 0, 360, 4000, 70);
		$primary->systems[] = new Bridge($this->getId(), $this->id, 160);
		$primary->systems[] = new Engine($this->getId(), $this->id, 160, 500);
		$primary->systems[] = new Lifesupport($this->getId(), $this->id, 160);
		$primary->systems[] = new Sensor($this->getId(), $this->id, 160);
		$primary->systems[] = new Reactor($this->getId(), $this->id, 250, $this->getPowerReq());

		$this->primary = $primary;
	}
}

?>