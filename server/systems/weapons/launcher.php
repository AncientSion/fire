<?php

class Launcher extends Weapon {
	public $type = "Launcher";
	public $animation = "projectile";
	public $priority = 6;
	public $ammo;
	public $reload = 2;
	public $launchRate;

	function __construct($id, $parentId, $start, $end, $output = 0, $launchRate, $destroyed = false){
		$this->launchRate = $launchRate;
		$ammo = $this->getAmmo();
		if ($ammo){
			$this->ammo = new $ammo(0, 0, 0, 0);
			$this->fc = $this->ammo->fc;
		}
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}

	public function getArmourMod(){
		$w = $this->getArcWidth();

		if ($w <= 180){return 0.7;}
		else return 0.3;
	}

	public function getAmmo(){
		return false;
	}

	public function getCritEffects(){
		return ["disengaged"];
	}

	public function getCritTreshs(){
		return [50];
	}
}

class TorpedoLauncher extends Launcher {
	public $name = "TorpedoLauncher";
	public $display = "Torpedo Launcher";
	public $animColor = "black";
	public $projSize = 2;
	public $projSpeed = 6;
	public $exploSize = 3;
	public $integrity = 70;

	public function getAmmo(){
		return "BallisticTorpedo";
	}

	public function getDamage($fire){
		return 0;
	}

	function __construct($id, $parentId, $start, $end, $output = 0, $launchRate, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $launchRate, $destroyed);
	}
}

class MissileLauncher extends Launcher {
	public $name = "MissileLauncher";
	public $display = "Missile Launcher";
	public $animColor = "black";
	public $projSize = 2;
	public $projSpeed = 6;
	public $exploSize = 3;
	public $launchRate = 2;
	public $integrity = 70;
	
	public function getAmmo(){
		return "BallisticMissile";
	}

	public function getDamage($fire){
		return 0;
	}

	function __construct($id, $parentId, $start, $end, $output = 0, $launchRate, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $launchRate, $destroyed);
	}
}