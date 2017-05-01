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

	public function setArmourMod(){
		$w = $this->getArcWidth();

		if ($w <= 120){$this->armourMod = 0.8;}
		else if ($w <= 180){$this->armourMod =  0.6;}
		else $this->armourMod =  0.3;
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
	public $impulse = 110;
	public $integrity = 12;
	public $armour = 3;
	public $mass = 3;
	public $fc = array(0 => 90, 1 => 90);
	public $cost = 6;
	public $exploSize = 5;
	public $traverse = -3;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Javelin extends Ammo {
	public $name = "Javelin";
	public $display = "Multi-purpose Missiles";
	public $type = "explosive";
	public $minDmg = 36;
	public $maxDmg = 48;
	public $impulse = 90;
	public $integrity = 16;
	public $armour = 5;
	public $mass = 4;
	public $fc = array(0 => 85, 1 => 85);
	public $cost = 10;
	public $exploSize = 6;
	public $traverse = -2;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Patriot extends Ammo {
	public $name = "Patriot";
	public $display = "Light Interceptor Missiles";
	public $type = "explosive";
	public $minDmg = 13;
	public $maxDmg = 18;
	public $impulse = 140;
	public $integrity = 10;
	public $armour = 3;
	public $mass = 2;
	public $fc = array(0 => 85, 1 => 95);
	public $cost = 8;
	public $exploSize = 5;
	public $traverse = -4;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Naga extends Ammo {
	public $name = "Naga";
	public $display = "Multi-purpose Missiles";
	public $type = "explosive";
	public $minDmg = 36;
	public $maxDmg = 48;
	public $impulse = 90;
	public $integrity = 16;
	public $armour = 5;
	public $mass = 4;
	public $fc = array(0 => 85, 1 => 85);
	public $cost = 10;
	public $exploSize = 6;
	public $traverse = -2;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Cyclops extends Ammo {
	public $name = "Cyclops";
	public $display = "Light Antiship Missiles";
	public $type = "explosive";
	public $minDmg = 55;
	public $maxDmg = 76;
	public $impulse = 75;
	public $integrity = 18;
	public $armour = 6;
	public $mass = 5;
	public $fc = array(0 => 90, 1 => 65);
	public $cost = 14;
	public $exploSize = 8;
	public $traverse = 0;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}

class Titan extends Ammo {
	public $name = "Titan";
	public $display = "Heavy Antiship Missiles";
	public $type = "explosive";
	public $minDmg = 78;
	public $maxDmg = 96;
	public $impulse = 65;
	public $integrity = 22;
	public $armour = 7;
	public $mass = 6;
	public $fc = array(0 => 90, 1 => 45);
	public $cost = 20;
	public $exploSize = 10;
	public $traverse = 1;

	function __construct($parentId, $id){
		parent::__construct($parentId, $id);
	}
}