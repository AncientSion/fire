<?php

class Launcher extends Weapon {
	public $type = "Launcher";
	public $animation = "projectile";
	public $priority = 8;
	public $loads = array();
	public $reload = 2;
	public $launchRate;
	public $ammo;

	function __construct($id, $parentId, $start, $end, $output, $launchRate, $loads, $destroyed = false){
		$this->mass = $launchRate * 10;
		$this->launchRate = $launchRate;
		$this->powerReq = $launchRate;

		for ($i = 0; $i < sizeof($loads); $i++){
			$this->loads[] = new $loads[$i]($this->id, -1);
		}

        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}

	public function getWarhead(){
		return $this->ammo->name;
	}

	public function getShots($turn){
		return 1 + $this->getBoostLevel($turn);
	}

	public function getBaseDamage($fire){
		return 0;
	}

	public function adjustLoad($dbLoad){
		$this->loads = array();
		$this->ammo = new $dbLoad[0]["name"]($this->id, 0);
		$this->ammo->output = $dbLoad[0]["amount"];
	}

	public function setArmourMod(){
		$w = $this->getArcWidth();

		if ($w <= 120){$this->armourMod = 0.8;}
		else if ($w <= 180){$this->armourMod =  0.6;}
		else $this->armourMod =  0.3;
	}
}

class MissileLauncher extends Launcher {
	public $name = "MissileLauncher";
	public $display = "Missile Launcher";
	public $animColor = "black";

	function __construct($id, $parentId, $start, $end, $output = 0, $launchRate, $loads, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $launchRate, $loads, $destroyed);
	}
}