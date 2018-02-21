<?php

class Launcher extends Weapon {
	public $type = "Launcher";
	public $animation = "projectile";
	public $fireMode = "Ballistic";
	public $priority = 8;
	public $usage = -1;

	public $loads = array();
	public $reload = 3;
	public $ammo = -1;
	public $integrity = 44;
	public $capacity = array();
	public $launchRate = array();
	public $powerReq = 2;
	public $effiency = 1;
	public $shots = 0;
	public $accDecay = 0;

	function __construct($id, $parentId, $start, $end, $width){
        parent::__construct($id, $parentId, $start, $end);
	}

	public function getAmmo(){
		return $this->loads[$this->ammo];
	}

	public function adjustLoad($dbLoad){
		for ($i = 0; $i < sizeof($dbLoad); $i++){
			for ($j = 0; $j < sizeof($this->loads); $j++){
				if ($dbLoad[$i]["name"] == $this->loads[$j]->name){
					$this->ammo = $j;
					$this->output = $dbLoad[$i]["amount"];
					return;
				}
			}
		}
	}

	public function getShots($turn){
		return $this->getBoostLevel($turn);
	}

	public function setArmourData($rem){
		$w = Math::getArcWidth($this);
		if ($w <= 120){$this->armourMod = 0.8; $this->mount = "Tube";}
		else if ($w <= 180){$this->armourMod =  0.6; $this->mount = "Caninster";}
		else {$this->armourMod =  0.3; $this->mount = "Arm Rail";}
		$this->armour = floor($rem * $this->armourMod);
	}

	public function singleCritTest($turn, $extra){
		return;
	}
}

class MissileLauncher extends Launcher {
	public $name = "MissileLauncher";
	public $display = "Missile Launcher";
	public $loadout = 1;

	function __construct($id, $parentId, $start, $end, $loads, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $loads, $width);
		for ($i = 0; $i < sizeof($loads); $i++){
			$this->loads[] = new $loads[$i][0]($this->id, -1);
			$this->capacity[] = $loads[$i][1];
			$this->launchRate[] = $loads[$i][2];
		}
	}
}

class ETorpLauncher extends Launcher {
	public $name = "ETorpLauncher";
	public $display = "E-Torpedo Launcher";
	public $loadout = 0;
	public $powerReq = 4;

	function __construct($id, $parentId, $start, $end, $loads, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $width);
		for ($i = 0; $i < sizeof($loads); $i++){
			$this->loads[] = new $loads[$i][0]($this->id, -1);
			$this->capacity[] = $loads[$i][1];
			$this->launchRate[] = $loads[$i][2];
			$this->ammo = $i;
			$this->output = $this->capacity[$i];
		}
	}
}