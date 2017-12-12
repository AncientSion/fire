<?php

class Octurion extends UltraHeavy {
	public $name = "Octurion";
	public $display = "Octurion";
	public $faction = "Centauri Republic";
	public $size =  120;
	public static $value = 1650;
	public $profile = array(0.95, 1.05);
	public $mass = 20000;

	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes){
        parent::__construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $notes);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 324, 36, 1050, 26);
		$front->systems[] = new MediumIon($this->getId(), $this->id, 300, 60);
		$front->systems[] = new MediumIon($this->getId(), $this->id, 300, 60);
		$front->systems[] = new MediumIon($this->getId(), $this->id, 300, 60);
		$front->systems[] = new MediumIon($this->getId(), $this->id, 300, 60);
		$front->systems[] = new MediumIon($this->getId(), $this->id, 240, 360);
		$front->systems[] = new SuperHeavyIon($this->getId(), $this->id, 315, 45);
		$front->systems[] = new SuperHeavyIon($this->getId(), $this->id, 315, 45);
		$front->systems[] = new MediumIon($this->getId(), $this->id, 0, 120);
		$structs[] = $front;

		$rightTop = new Structure($this->getId(), $this->id, 36, 108, 800, 24);
		$rightTop->systems[] = new SuperHeavyIon($this->getId(), $this->id, 45, 135);
		$rightTop->systems[] = new SuperHeavyIon($this->getId(), $this->id, 45, 135);
		$rightTop->systems[] = new MediumIon($this->getId(), $this->id, 30, 150);
		$rightTop->systems[] = new MediumIon($this->getId(), $this->id, 30, 150);
		$rightTop->systems[] = new LightIon($this->getId(), $this->id, 342, 162);
		$rightTop->systems[] = new LightIon($this->getId(), $this->id, 342, 162);
		$structs[] = $rightTop;

		$rightBottomm = new Structure($this->getId(), $this->id, 108, 180, 800, 22);
		$rightBottomm->systems[] = new LightIon($this->getId(), $this->id, 54, 234);
		$rightBottomm->systems[] = new LightIon($this->getId(), $this->id, 54, 234);
		$rightBottomm->systems[] = new Hangar($this->getId(), $this->id, 10, array("Sentri", "Sitara"), 20);
		$structs[] = $rightBottomm;

		$leftBottom = new Structure($this->getId(), $this->id, 180, 252, 800, 22);
		$leftBottom->systems[] = new LightIon($this->getId(), $this->id, 126, 306);
		$leftBottom->systems[] = new LightIon($this->getId(), $this->id, 126, 306);
		$leftBottom->systems[] = new Hangar($this->getId(), $this->id, 10, array("Sentri", "Sitara"), 20);
		$structs[] = $leftBottom;

		$leftTop = new Structure($this->getId(), $this->id, 250, 324, 800, 24);
		$leftTop->systems[] = new SuperHeavyIon($this->getId(), $this->id, 225, 315);
		$leftTop->systems[] = new SuperHeavyIon($this->getId(), $this->id, 225, 315);
		$leftTop->systems[] = new MediumIon($this->getId(), $this->id, 210, 330);
		$leftTop->systems[] = new MediumIon($this->getId(), $this->id, 210, 330);
		$leftTop->systems[] = new LightIon($this->getId(), $this->id, 198, 18);
		$leftTop->systems[] = new LightIon($this->getId(), $this->id, 198, 18);
		$structs[] = $leftTop;
		
		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
		}
	}

	public function addPrimary(){
		$this->primary = new Primary($this->getId(), $this->id, 0, 360, 2100);
		$this->primary->systems[] = new Bridge($this->getId(), $this->id, array(250, 5));
		$this->primary->systems[] = new Engine($this->getId(), $this->id, array(250, 5), 750);
		$this->primary->systems[] = new Sensor($this->getId(), $this->id, array(250, 5), 1100, 10);
		$this->primary->systems[] = new Reactor($this->getId(), $this->id, array(250, 5));
    }

	static function getKit(){
		return array();
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
					"name" => "Patrol (Sentri) Outfit",
					"cost" => 275,
					"loads" =>
					array(
						array(
							"systemid" => 16,
							"name" => "Sentri",
							"amount" => 5
						),
						array(
							"systemid" => 25,
							"name" => "Sentri",
							"amount" => 5
						),
					)
				),
				array(
					"active" => 0,
					"chance" => 20,
					"name" => "War (Combined) Outfit",
					"cost" => 450,
					"loads" =>
					array(
						array(
							"systemid" => 16,
							"name" => "Sentri",
							"amount" => 9
						),
						array(
							"systemid" => 25,
							"name" => "Sitara",
							"amount" => 9
						),
					)
				),
			)
		);
	}


}

?>