<?php

class Launcher extends Weapon {
	public $type = "Launcher";
	public $animation = "projectile";
	public $priority = 6;
	public $ammo;
	public $reload = 2;
	public $launchRate;

	function __construct($id, $parentId, $start, $end, $output = 0, $launchRate, $destroyed = false){
		$this->mass = $launchRate * 6;
		$this->launchRate = $launchRate;
		$this->powerReq = $launchRate;
		$ammo = $this->getAmmo();
		if ($ammo){
			$this->ammo = new $ammo(0, 0, 0, 0);
			$this->fc = $this->ammo->fc;
		}
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}

	public function getArmourMod(){
		$w = $this->getArcWidth();

		if ($w <= 120){return 0.8;}
		else if ($w <= 180){return 0.6;}
		else return 0.3;
	}

	public function getAmmo(){
		return false;
	}

	public function getCritEffects(){
		return array("disabled1", "ammoLoss", "ammolossDamage");
	}

	public function getCritTreshs(){
		return array(25, 50, 80);
	}
}

class CEMissileLauncher extends Launcher {
	public $name = "MissileLauncher";
	public $display = "Missile Launcher";
	public $animColor = "black";
	public $projSize = 2;
	public $projSpeed = 6;
	public $exploSize = 3;

	public function getAmmo(){
		return "Hasta";
	}

	public function getBaseDamage($fire){
		return 0;
	}

	function __construct($id, $parentId, $start, $end, $output = 0, $launchRate, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $launchRate, $destroyed);
	}
}

class EAMissileLauncher extends Launcher {
	public $name = "MissileLauncher";
	public $display = "Missile Launcher";
	public $animColor = "black";
	public $projSize = 2;
	public $projSpeed = 6;
	public $exploSize = 3;
	public $launchRate = 2;
	
	public function getAmmo(){
		return "Baracuda";
	}

	public function getBaseDamage($fire){
		return 0;
	}

	function __construct($id, $parentId, $start, $end, $output = 0, $launchRate, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $launchRate, $destroyed);
	}
}

class Hasta extends Ammo {
	public $name = "Hasta";
	public $display = "Light Conv. Missiles";
	public $type = "explosive";
	public $minDmg = 32;
	public $maxDmg = 42;
	public $impulse = 280;
	public $integrity = 14;
	public $armour = 4;
	public $mass = 3;
	public $fc = array(0 => 80, 1 => 80);

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Baracuda extends Ammo {
	public $name = "Baracuda";
	public $display = "Medium Fusion Missiles";
	public $type = "explosive";
	public $minDmg = 55;
	public $maxDmg = 76;
	public $impulse = 220;
	public $integrity = 18;
	public $armour = 6;
	public $mass = 4;
	public $fc = array(0 => 90, 1 => 70);

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}