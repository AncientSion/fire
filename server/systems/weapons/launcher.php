<?php

class Launcher extends Weapon {
	public $type = "Launcher";
	public $animation = "projectile";
	public $priority = 6;
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

	public function getAmmo(){
		return $this->ammo->name;
	}

	public function getBaseDamage($fire){
		return 0;
	}

	public function adjustLoad($dbLoad){
		$this->loads = array();
		$this->ammo = new $dbLoad[0]["name"]($this->id, 0);
		$this->ammo->output = $dbLoad[0]["amount"];
	}

	public function getArmourMod(){
		$w = $this->getArcWidth();

		if ($w <= 120){return 0.8;}
		else if ($w <= 180){return 0.6;}
		else return 0.3;
	}

	public function getCritEffects(){
		return array("disabled", "ammoLoss", "ammolossDamage");
	}

	public function getCritTreshs(){
		return array(25, 50, 80);
	}
	public function getCritDuration(){
		return array(1, 0, 0);
	}
}

class MissileLauncher extends Launcher {
	public $name = "MissileLauncher";
	public $display = "Missile Launcher";
	public $animColor = "black";
	public $projSize = 2;
	public $projSpeed = 6;
	public $exploSize = 3;

	function __construct($id, $parentId, $start, $end, $output = 0, $launchRate, $loads, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $launchRate, $loads, $destroyed);
	}
}

class Hasta extends Ammo {
	public $name = "Hasta";
	public $display = "Light Antifighter Missiles";
	public $type = "explosive";
	public $minDmg = 23;
	public $maxDmg = 29;
	public $impulse = 260;
	public $integrity = 12;
	public $armour = 3;
	public $mass = 2;
	public $fc = array(0 => 90, 1 => 90);
	public $cost = 3;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Javelin extends Ammo {
	public $name = "Javelin";
	public $display = "Multi-purpose Missiles";
	public $type = "explosive";
	public $minDmg = 35;
	public $maxDmg = 45;
	public $impulse = 215;
	public $integrity = 16;
	public $armour = 5;
	public $mass = 4;
	public $fc = array(0 => 85, 1 => 85);
	public $cost = 5;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Barracuda extends Ammo {
	public $name = "Barracuda";
	public $display = "Light Interceptor Missiles";
	public $type = "explosive";
	public $minDmg = 16;
	public $maxDmg = 22;
	public $impulse = 300;
	public $integrity = 10;
	public $armour = 3;
	public $mass = 3;
	public $fc = array(0 => 85, 1 => 95);
	public $cost = 4;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Myrmidon extends Ammo {
	public $name = "Myrmidon";
	public $display = "Light Antiship Missiles";
	public $type = "explosive";
	public $minDmg = 55;
	public $maxDmg = 76;
	public $impulse = 190;
	public $integrity = 18;
	public $armour = 6;
	public $mass = 5;
	public $fc = array(0 => 90, 1 => 65);
	public $cost = 7;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Zeus extends Ammo {
	public $name = "Zeus";
	public $display = "Heavy Antiship Missiles";
	public $type = "explosive";
	public $minDmg = 78;
	public $maxDmg = 96;
	public $impulse = 170;
	public $integrity = 22;
	public $armour = 7;
	public $mass = 6;
	public $fc = array(0 => 90, 1 => 45);
	public $cost = 10;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}