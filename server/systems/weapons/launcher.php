<?php

class Launcher extends Weapon {
	public $type = "Launcher";
	public $animation = "projectile";
	public $fireMode = "Ballistic";
	public $priority = 8;
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
	public $usage = -1;

	function __construct($id, $parentId, $start, $end, $loads, $width = 1){
		for ($i = 0; $i < sizeof($loads); $i++){
			$this->loads[] = new $loads[$i][0]($this->id, -1);
			$this->capacity[] = $loads[$i][1];
			$this->launchRate[] = $loads[$i][2];
		}

        parent::__construct($id, $parentId, $start, $end, 0, $width);
	}

	public function getAmmo(){
		return $this->loads[$this->ammo];
	}

	public function getShots($turn){
		return $this->getBoostLevel($turn);
	}

	public function getBaseDamage($fire){
		return 0;
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

	public function setArmourMod(){
		$w = Math::getArcWidth($this);
		if ($w <= 120){$this->armourMod = 0.8;}
		else if ($w <= 180){$this->armourMod =  0.6;}
		else $this->armourMod =  0.3;
	}

	public function singleCritTest($turn, $extra){
		return;
	}

}

class MissileLauncher extends Launcher {
	public $name = "MissileLauncher";
	public $display = "Missile Launcher";
	public $animColor = "black";

	function __construct($id, $parentId, $start, $end, $loads, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $loads, $width);
	}
}