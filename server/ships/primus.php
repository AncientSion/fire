<?php

class Primus extends SuperHeavy {
	public $name = "Primus";
	public $display = "Primus";
	public $faction = "Centauri Republic";
	public $size =  100;
	public static $value = 1080;
	public $profile = array(0.92, 1.08);
	public $mass = 12500;

	public $integrity = 1300;
	public $intInt = 160;
	public $ep = 70;
	public $ew = 900;

	function __construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $call, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 330, 30, 1050, 22);
		$front->systems[] = new LightIon($this->getId(), $this->id, 300, 120);
		$front->systems[] = new HeavyIon($this->getId(), $this->id, 300, 60);
		$front->systems[] = new HeavyIon($this->getId(), $this->id, 300, 60);
		$front->systems[] = new LightIon($this->getId(), $this->id, 240, 60);
		$structs[] = $front;

		$right = new Structure($this->getId(), $this->id, 30, 150, 1300, 21);
		$right->systems[] = new HeavyIon($this->getId(), $this->id, 0, 120);
		$right->systems[] = new LightIon($this->getId(), $this->id, 300, 120);
		$right->systems[] = new HeavyIon($this->getId(), $this->id, 0, 120);
		$right->systems[] = new LightIon($this->getId(), $this->id, 300, 120);
		$right->systems[] = new Hangar($this->getId(), $this->id, 9, array("Sentri", "SitaraIon"), 9, 2);
		$structs[] = $right;

		$aft = new Structure($this->getId(), $this->id, 150, 210, 900, 19);
		$aft->systems[] = new MediumIon($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new MediumIon($this->getId(), $this->id, 120, 240);
		$aft->systems[] = new MediumIon($this->getId(), $this->id, 120, 240);
		$structs[] = $aft;

		$left = new Structure($this->getId(), $this->id, 210, 330, 1300, 21);
		$left->systems[] = new LightIon($this->getId(), $this->id, 240, 60);
		$left->systems[] = new HeavyIon($this->getId(), $this->id, 240, 360);
		$left->systems[] = new LightIon($this->getId(), $this->id, 240, 60);
		$left->systems[] = new HeavyIon($this->getId(), $this->id, 240, 360);
		$left->systems[] = new Hangar($this->getId(), $this->id, 9, array("Sentri", "SitaraIon"), 9, 2);
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
					"chance" => 40,
					"notes" => "PATROL (Sentri) Outfit",
					"cost" => 275,
					"loads" =>
					array(
						array(
							"systemid" => 16,
							"name" => "Sentri",
							"amount" => 5
						),
						array(
							"systemid" => 26,
							"name" => "Sentri",
							"amount" => 5
						),
					)
				),
				array(
					"active" => 0,
					"chance" => 20,
					"notes" => "WAR (Combined) Outfit",
					"cost" => 450,
					"loads" =>
					array(
						array(
							"systemid" => 16,
							"name" => "Sentri",
							"amount" => 9
						),
						array(
							"systemid" => 26,
							"name" => "Sitara (Ion)",
							"amount" => 9
						),
					)
				),
			)
		);
	}


}

?>