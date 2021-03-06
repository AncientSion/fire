<?php

class Octurion extends SuperHeavy {
	public $name = "Octurion";
	public $display = "Octurion";
	public $faction = "Centauri Republic";
	public $size =  110;
	public static $value = 1600;
	public $profile = array(0.9, 1.1);
	public $mass = 18000;

	public $integrity = 1950;
	public $vitalHP = 225;
	public $ep = 60;
	public $ew = 1000;

	function __construct($data = false){
        parent::__construct($data);
	}

	public function addStructures(){
		$structs = array();

		$front = new Structure($this->getId(), $this->id, 324, 36, 1050, 24, 6);
		$front->systems[] = new LightParticle($this->getId(), $this->id, 270, 90);
		$front->systems[] = new MediumParticle($this->getId(), $this->id, 300, 60);
		$front->systems[] = new SuperHeavyParticle($this->getId(), $this->id, 315, 45);
		$front->systems[] = new SuperHeavyParticle($this->getId(), $this->id, 315, 45);
		$front->systems[] = new MediumParticle($this->getId(), $this->id, 300, 60);
		$front->systems[] = new LightParticle($this->getId(), $this->id, 270, 90);
		$structs[] = $front;

		$rightTop = new Structure($this->getId(), $this->id, 36, 120, 800, 22, 2);
		$rightTop->systems[] = new LightParticle($this->getId(), $this->id, 0, 180);
		$rightTop->systems[] = new LightParticle($this->getId(), $this->id, 0, 180);
		$rightTop->systems[] = new SuperHeavyParticle($this->getId(), $this->id, 360, 90, 0, 2);
		$rightTop->systems[] = new SuperHeavyParticle($this->getId(), $this->id, 360, 90, 0, 2);
		$rightTop->systems[] = new MediumParticle($this->getId(), $this->id, 30, 150);
		$rightTop->systems[] = new MediumParticle($this->getId(), $this->id, 30, 150);
		$structs[] = $rightTop;

		$rightBottomm = new Structure($this->getId(), $this->id, 120, 180, 800, 22, 4);
		$rightBottomm->systems[] = new LightParticle($this->getId(), $this->id, 54, 234);
		$rightBottomm->systems[] = new Hangar($this->getId(), $this->id, 120, 625, 325, array("Sentri", "Sitara"), 2);
		$rightBottomm->systems[] = new LightParticle($this->getId(), $this->id, 54, 234);
		$structs[] = $rightBottomm;

		$leftBottom = new Structure($this->getId(), $this->id, 180, 240, 800, 22, 4);
		$leftBottom->systems[] = new LightParticle($this->getId(), $this->id, 126, 306);
		$leftBottom->systems[] = new Hangar($this->getId(), $this->id, 120, 625, 325, array("Sentri", "Sitara"), 2);
		$leftBottom->systems[] = new LightParticle($this->getId(), $this->id, 126, 306);
		$structs[] = $leftBottom;

		$leftTop = new Structure($this->getId(), $this->id, 240, 324, 800, 22, 2);
		$leftTop->systems[] = new LightParticle($this->getId(), $this->id, 180, 360);
		$leftTop->systems[] = new LightParticle($this->getId(), $this->id, 180, 360);
		$leftTop->systems[] = new SuperHeavyParticle($this->getId(), $this->id, 270, 360, 0, 2);
		$leftTop->systems[] = new SuperHeavyParticle($this->getId(), $this->id, 270, 360, 0, 2);
		$leftTop->systems[] = new MediumParticle($this->getId(), $this->id, 210, 330);
		$leftTop->systems[] = new MediumParticle($this->getId(), $this->id, 210, 330);
		$structs[] = $leftTop;

		for ($i = 0; $i < sizeof($structs); $i++){
			$this->structures[] = $structs[$i];
			//$this->structures[sizeof($this->structures)-1]->boostEffect[] = new Effect("Armour", 3);
			//$this->structures[sizeof($this->structures)-1]->effiency = $this->traverse-1;
		}
	}}

?>