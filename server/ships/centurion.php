<?php

class Centurion extends Heavy {
	public $name = "Centurion";
	public $display = "Centurion";
	public $faction = "Centauri Republic";
	public $size =  80;
	public static $value = 800;
	public $profile = array(0.92, 1.08);
	public $mass = 7500;

	public $integrity = 900;
	public $vitalHP = 100;
	public $ep = 85;
	public $ew = 800;

	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 1050, 20, 4);
		$front->systems[] = new LightParticle($this->getId(), $this->id, 240, 60);
		$front->systems[] = new HeavyParticle($this->getId(), $this->id, 300, 60);
		$front->systems[] = new HeavyParticle($this->getId(), $this->id, 300, 60);
		$front->systems[] = new LightParticle($this->getId(), $this->id, 300, 120);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 1300, 19, 1);
		$right->systems[] = new MediumParticle($this->getId(), $this->id, 0, 120);
		$right->systems[] = new MissileLauncher($this->getId(), $this->id, 0, 120,	array(array("Javelin", 12, 4)));
		$right->systems[] = new MediumParticle($this->getId(), $this->id, 60, 180);
		$right->systems[] = new LightParticle($this->getId(), $this->id, 0, 180);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 1300, 19);
		$aft->systems[] = new LightParticle($this->getId(), $this->id, 120, 300);
		$aft->systems[] = new LightParticle($this->getId(), $this->id, 60, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 1300, 19, 1);
		$left->systems[] = new MediumParticle($this->getId(), $this->id, 240, 360);
		$left->systems[] = new MissileLauncher($this->getId(), $this->id, 240, 360,	array(array("Javelin", 12, 4)));
		$left->systems[] = new MediumParticle($this->getId(), $this->id, 180, 300);
		$left->systems[] = new LightParticle($this->getId(), $this->id, 180, 360);
		$structs[] = $left;
		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	static function getKit($faction){
		return array(
			"id" => 0,
			"name" => "",
			"cost" => static::$value,
			"gameid" => 0,
			"userid" => 0,
			"upgrades" => 
			array(
				array(
					"active" => 0,
					"chance" => 100,
					"notes" => "Standard Outfit",
					"loads" =>
					array(
						array(
							"systemid" => 8,
							"name" => "Javelin",
							"amount" => 8,
						),
						array(
							"systemid" => 8,
							"name" => "Javelin",
							"amount" => 8,
						),
					)
				),
			)
		);
	}


}

?>