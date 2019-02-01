<?php

class Zaatrr extends Medium {
	public $name = "Zaatrr";
	public $display = "Zaatrr";
	public $faction = "Vree Conglomerate";
	public $size =  45;
	public static $value = 420;
	public $profile = array(1, 1);
	public $mass = 3250;

	public $integrity = 475;
	public $vitalHP = 60;
	public $ep = 95;
	public $ew = 650;
	public $power = 3;

	function __construct($data = false){
        parent::__construct($data);
	}

	public function addSpecials(){
		$this->primary->systems[] = new GravitonSupressor($this->getId(), $this->id, $this->vitalHP, $this->traverse);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 300, 60, 625, 13, 4);
		$front->systems[] = new AntimatterBlaster($this->getId(), $this->id, 300, 60);
		$front->systems[] = new TwinParticleBolter($this->getId(), $this->id, 270, 90);
		$front->systems[] = new AntimatterBlaster($this->getId(), $this->id, 300, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 60, 180, 400, 13, 1);
		$right->systems[] = new AntimatterBlaster($this->getId(), $this->id, 60, 180);
		$right->systems[] = new TwinParticleBolter($this->getId(), $this->id, 30, 210);
		$structs[] = $right;

		$left = new Structure($this->getId(), $this->id, 180, 300, 475, 13, 1);
		$left->systems[] = new AntimatterBlaster($this->getId(), $this->id, 180, 300);
		$left->systems[] = new TwinParticleBolter($this->getId(), $this->id, 150, 330);
		$structs[] = $left;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addTurrets(){
		$turrets = array();
		
		$turretA = new Turret($this->getId(), $this->id, "Large Turret A", 0, 360, 90, 11);
		$turretA->systems[] = new AntimatterConverter($this->getId(), $this->id, 0, 360);
		$turrets[] = $turretA;

		$turretA = new Turret($this->getId(), $this->id, "Large Turret B", 0, 360, 90, 11);
		$turretA->systems[] = new AntimatterConverter($this->getId(), $this->id, 0, 360);
		$turrets[] = $turretA;

		for ($i = 0; $i < sizeof($turrets); $i++){
			$this->structures[] = $turrets[$i];
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