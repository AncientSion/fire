<?php

class Primus extends SuperHeavy {
	public $name = "Primus";
	public $display = "Primus";
	public $faction = "Centauri Republic";
	public $size = 100;
	public static $value = 1080;
	public $profile = array(0.92, 1.08);
	public $mass = 12500;

	function __construct($id, $userid, $available, $status, $destroyed){
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 1050, 24);
		$front->systems[] = new LightIon($this->getId(), $this->id, 300, 120);
		$front->systems[] = new HeavyIon($this->getId(), $this->id, 300, 60);
		$front->systems[] = new HeavyIon($this->getId(), $this->id, 300, 60);
		$front->systems[] = new LightIon($this->getId(), $this->id, 240, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 1300, 23);
		$right->systems[] = new HeavyIon($this->getId(), $this->id, 0, 120);
		$right->systems[] = new HeavyIon($this->getId(), $this->id, 0, 120);
		$right->systems[] = new LightIon($this->getId(), $this->id, 300, 120);
		$right->systems[] = new LightIon($this->getId(), $this->id, 300, 120);
		$right->systems[] = new Hangar($this->getId(), $this->id, 30, 90, 300, 9, array("Sentri", "Sitara"));
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 900, 21);
		$aft->systems[] = new MediumSingleIon($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new MediumSingleIon($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 1300, 23);
		$left->systems[] = new HeavyIon($this->getId(), $this->id, 240, 360);
		$left->systems[] = new HeavyIon($this->getId(), $this->id, 240, 360);
		$left->systems[] = new LightIon($this->getId(), $this->id, 240, 60);
		$left->systems[] = new LightIon($this->getId(), $this->id, 240, 60);
		$left->systems[] = new Hangar($this->getId(), $this->id, 270, 330, 300, 9, array("Sentri", "Sitara"));
		$structs[] = $left;
		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 1600);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 160);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 160, 500);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 160);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 160, 900, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 160);
    }
}

?>