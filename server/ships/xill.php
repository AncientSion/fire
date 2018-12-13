<?php

class Xill extends Heavy {
	public $name = "Xill";
	public $display = "Xill";
	public $faction = "Vree Conglomerate";
	public $size =  80;
	public static $value = 775;
	public $profile = array(1, 1);
	public $mass = 7000;

	public $integrity = 800;
	public $vitalHP = 80;
	public $ep = 80;
	public $ew = 775;
	public $power = 0;

	function __construct($data = false){
        parent::__construct($data);
	}

	public function addSpecials(){
		$this->primary->systems[] = new GravitonSupressor($this->getId(), $this->id, $this->vitalHP, $this->traverse);
		$this->primary->systems[] = new Hangar($this->getId(), $this->id, 12, array("Zorth"), 12);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 315, 45, 625, 16, 5);
		$front->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 300, 60);
		$front->systems[] = new AntimatterCannon($this->getId(), $this->id, 315, 45);
		$front->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 300, 60);
		$front->systems[] = new AntimatterCannon($this->getId(), $this->id, 315, 45);
		$front->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 45, 135, 800, 16, 1);
		$right->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 30, 150);
		$right->systems[] = new AntimatterCannon($this->getId(), $this->id, 45, 135);
		$right->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 30, 150);
		$right->systems[] = new AntimatterCannon($this->getId(), $this->id, 45, 135);
		$right->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 30, 150);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 135, 225, 550, 16, 5);
		$aft->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new AntimatterCannon($this->getId(), $this->id, 135, 225);
		$aft->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new AntimatterCannon($this->getId(), $this->id, 135, 225);
		$aft->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 225, 315, 800, 16, 1);
		$left->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 210, 330);
		$left->systems[] = new AntimatterCannon($this->getId(), $this->id, 225, 315);
		$left->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 210, 330);
		$left->systems[] = new AntimatterCannon($this->getId(), $this->id, 225, 315);
		$left->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 210, 330);
		$structs[] = $left;

		$turretA = new Turret($this->getId(), $this->id, 0, 360, 200, 13);
		$turretA->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 0, 360);
		$turretA->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 0, 360);
		$structs[] = $turretA;
		
		$turretB = new Turret($this->getId(), $this->id, 0, 360, 200, 13);
		$turretB->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 0, 360);
		$turretB->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 0, 360);
		$turretB->systems[] = new AntiProtonPulsar($this->getId(), $this->id, 0, 360);
		$structs[] = $turretB;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
			//$this->structures[sizeof($this->structures)-1]->boostEffect[] = new Effect("Armour", 3);
			//$this->structures[sizeof($this->structures)-1]->effiency = $this->traverse-1;
		}
	}

	static function getKit($faction){
		return array(
			"id" => 0,
			"name" => "",
			"cost" => static::$value,
			"totalCost" => 0,
			"moraleCost" => 0, 
			"gameid" => 0,
			"userid" => 0,
			"upgrades" => 
			array(
				array(
					"active" => 0,
					"chance" => 65,
					"notes" => "PATROL (Aurora) Outfit",
					"cost" => 300,
					"loads" =>
					array(
						array(
							"systemid" => 9,
							"display" => "Front Main Hangar",
							"name" => "Aurora",
							"amount" => 10
						),
					)
				),
			)
		);
	}
}

?>