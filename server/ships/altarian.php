<?php

class Altarian extends Medium {
	public $name = "Altarian";
	public $display = "Altarian";
	public $faction = "Centauri Republic";
	public $size = 55;
	public static $value = 525;
	public $profile = array(0.95, 1.05);
	public $mass = 4250;

	function __construct($id, $userid, $available, $status, $destroyed){		
        parent::__construct($id, $userid, $available, $status, $destroyed);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 400, 21);
		$front->systems[] = new LightIon($this->getId(), $this->id, 240, 120);
		$front->systems[] = new MediumTwinIon($this->getId(), $this->id, 300, 60);
		$front->systems[] = new LightIon($this->getId(), $this->id, 240, 120);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 325, 20);
		$right->systems[] = new MediumSingleIon($this->getId(), $this->id, 0, 120);
		$right->systems[] = new MediumSingleIon($this->getId(), $this->id, 0, 120);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 550, 18);
		$aft->systems[] = new Hangar($this->getId(), $this->id, 330, 30, 200, 6, array("Sentri", "Sitara"));
		$aft->systems[] = new MediumTwinIon($this->getId(), $this->id, 60, 300);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 180, 300, 325, 20);
		$left->systems[] = new MediumSingleIon($this->getId(), $this->id, 240, 360);
		$left->systems[] = new MediumSingleIon($this->getId(), $this->id, 240, 360);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 900);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, 110);
		$this->primary->systems[] = new Engine($this->getId(), $this->id, 110, 150);
		$this->primary->systems[] = new Lifesupport($this->getId(), $this->id, 100);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, 110, 750, 10);
		//$this->primary->systems[] = new Sensor($this->getId(), $this->id, 90, 750, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, 110, $this->getPowerReq());
	}
}

?>