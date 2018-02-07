<?php

class Saggitarius extends Medium {
	public $name = "Saggitarius";
	public $display = "Saggitarius Missile Destroyer";
	public $faction = "Earth Alliance";
	public $size =  60;
	public static $value = 400;
	public $profile = array(0.90, 1.10);
	public $mass = 4500;

	public $integrity = 800;
	public $intInt = 95;
	public $ep = 65;
	public $ew = 650;
	public $power = 3;

	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
		parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();
		
		$front = new Structure($this->getId(), $this->id, 330, 30, 375, 14);
		$front->systems[] = new Dual($this->getId(), $this->id, 180, 360, 28, array("LightPulse", "LightParticleBeam"));
		//$front->systems[] = new MissileLauncher($this->getId(), $this->id, 300, 60, array(array("Cyclops", 20, 4), array("Titan", 15, 3)), 4);
		$front->systems[] = new Dual($this->getId(), $this->id, 0, 180, 28, array("LightPulse", "LightParticleBeam"));
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 450, 14);
		$right->systems[] = new MissileLauncher($this->getId(), $this->id, 0, 180, array(array("Naga", 15, 3), array("Cyclops", 12, 2), array("Titan", 8, 2)));
		$right->systems[] = new MissileLauncher($this->getId(), $this->id, 0, 180, array(array("Naga", 15, 3), array("Cyclops", 12, 2), array("Titan", 8, 2)));
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 325, 12);
		$aft->systems[] = new Dual($this->getId(), $this->id, 0, 180, 28, array("LightPulse", "LightParticleBeam"));
		$aft->systems[] = new Dual($this->getId(), $this->id, 180, 360, 28, array("LightPulse", "LightParticleBeam"));
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 450, 14);
		$left->systems[] = new MissileLauncher($this->getId(), $this->id, 180, 360, array(array("Naga", 15, 3), array("Cyclops", 12, 2), array("Titan", 8, 2)));
		$left->systems[] = new MissileLauncher($this->getId(), $this->id, 180, 360, array(array("Naga", 15, 3), array("Cyclops", 12, 2), array("Titan", 8, 2)));
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
			$this->structures[sizeof($this->structures)-1]->boostEffect[] = new Effect("Armour", 2);
			$this->structures[sizeof($this->structures)-1]->effiency = 3;
		}
	}
}

?>