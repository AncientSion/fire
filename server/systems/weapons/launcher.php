<?php

class Launcher extends Weapon {
	public $type = "Launcher";
	public $animation = "projectile";
	public $fireMode = "Ballistic";
	public $usage = -1;

	public $loads = array();
	public $reload = 3;
	public $ammo = -1;
	public $capacity = array();
	public $launchRate = array();
	public $powerReq = 2;
	public $effiency = 1;
	public $shots = 0;
	public $accDecay = 0;

	function __construct($id, $parentId, $start, $end, $integrity, $width){
        parent::__construct($id, $parentId, $start, $end, 0, $width);
        $this->integrity = $integrity;
		$this->notes = array("Unaffected by Offensive EW", "Flat 80% base 
			chance to hit target", "Ballistics follow weapon-level tracking rules", "Ballistics can be spoofed by target DEW");
	}

	public function getAmmo(){
		return $this->loads[$this->ammo];
	}

	public function getShots($turn){
		return $this->getBoostLevel($turn);
	}

	public function setArmourData($rem){
		$w = Math::getArcWidth($this);
		if ($w <= 120){$this->armourMod = 0.8; $this->mount = "Tube";}
		else if ($w <= 180){$this->armourMod =  0.6; $this->mount = "Canister";}
		else {$this->armourMod =  0.3; $this->mount = "Arm Rail";}
		$this->armour = floor($rem * $this->armourMod);
	}
}

class MissileLauncher extends Launcher {
	public $name = "MissileLauncher";
	public $display = "Missile Launcher";
	public $loadout = 1;

	function __construct($id, $parentId, $start, $end, $integrity, $loads, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $integrity, $width);

		for ($i = 0; $i < sizeof($loads); $i++){
			$this->loads[] = new $loads[$i][0]($this->id, -1);
			$this->capacity[] = $loads[$i][1];
			$this->launchRate[] = $loads[$i][2];
		}
	}

	public function getValidEffects(){
		return array(// attr, mag, duration, modifier
			array("Ammo Amount", 120, 0, 0),
			array("Destroyed", 170, 0, 1),
		);
	}

	public function adjustLoad($dbLoad){
		for ($i = 0; $i < sizeof($dbLoad); $i++){
			for ($j = 0; $j < sizeof($this->loads); $j++){
				if ($dbLoad[$i]["name"] == $this->loads[$j]->name){
					$this->ammo = $j;
					$this->output = $dbLoad[$i]["amount"];
					$this->loads[$j]->amount = $dbLoad[$i]["amount"];
       				$this->maxRange = $this->loads[$this->ammo]->maxRange;
       				$this->reload = $this->loads[$this->ammo]->reload;
					return;
				}
			}
		}
	}
}

class TorpedoLauncher extends MissileLauncher {
	public $name = "TorpedoLauncher";
	public $display = "Torpedo Launcher";
	public $powerReq = 4;

	function __construct($id, $parentId, $start, $end, $integrity, $loads, $width = 1){
        parent::__construct($id, $parentId, $start, $end, $integrity, $loads, $width);
	}

	public function getValidEffects(){
		return array(// attr, mag, duration, modifier
			array("Max Range", 80, 0, 0),
			array("Ammo Amount", 120, 0, 0),
			array("Destroyed", 170, 0, 1),
		);
	}
}