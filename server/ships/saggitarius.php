<?php

class Saggitarius extends Medium {
	public $name = "Saggitarius";
	public $display = "Saggitarius Missile Destroyer";
	public $faction = "Earth Alliance";
	public $size =  60;
	public static $value = 400;
	public $profile = array(0.90, 1.10);
	public $mass = 4500;

	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();
		
		$front = new Structure($this->getId(), $this->id, 330, 30, 375, 14);
		$front->systems[] = new Dual($this->getId(), $this->id, 300, 60, 14, array("LightPulse", "LightParticleBeam"));
		$front->systems[] = new MissileLauncher($this->getId(), $this->id, 300, 60, array(array("Cyclops", 20, 4), array("Titan", 15, 3)));
		$front->systems[] = new Dual($this->getId(), $this->id, 300, 60, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 450, 14);
		$right->systems[] = new MissileLauncher($this->getId(), $this->id, 0, 120, array(array("Naga", 15, 3), array("Cyclops", 12, 2)));
		$right->systems[] = new MissileLauncher($this->getId(), $this->id, 0, 120, array(array("Naga", 15, 3), array("Cyclops", 12, 2)));
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 325, 12);
		$aft->systems[] = new Dual($this->getId(), $this->id, 120, 240, 14, array("LightPulse", "LightParticleBeam"));
		$aft->systems[] = new Dual($this->getId(), $this->id, 120, 240, 14, array("LightPulse", "LightParticleBeam"));
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 450, 14);
		$left->systems[] = new MissileLauncher($this->getId(), $this->id, 240, 360, array(array("Naga", 15, 3), array("Cyclops", 12, 2)));
		$left->systems[] = new MissileLauncher($this->getId(), $this->id, 240, 360, array(array("Naga", 15, 3), array("Cyclops", 12, 2)));
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
			$this->structures[sizeof($this->structures)-1]->boostEffect[] = new Effect("Armour", 2);
			$this->structures[sizeof($this->structures)-1]->effiency = 3;
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 800);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, array(95, 3));
		$this->primary->systems[] = new Engine($this->getId(), $this->id, array(95, 3), 65);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, array(95, 3), 650, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, array(95, 3), 6);
	}
}

?>