<?php

class Launcher extends Weapon {
	public $type = "Launcher";
	public $animation = "projectile";
	public $priority = 6;
	public $range;
	public $velocity;
	public $ammo;

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}

class BallisticTorpedo {
	public $class = "BallisticTorpedo";
	public $damage = 50;
	public $maxDist = 1400;
	public $impulse = 400;
	public $amount;
	public $actions = array();
	public $fireid;

	function __construct($fireid = 0, $amount = 1){
		$this->fireid = $fireid;
		$this->amount = $amount;
	}
}

class TorpedoLauncher extends Launcher {
	public $name = "TorpedoLauncher";
	public $display = "Torpedo Launcher";
	public $minDmg = 70;
	public $maxDmg = 70;
	public $shots = 2;
	public $animColor = "black";
	public $projSize = 2;
	public $projSpeed = 6;
	public $exploSize = 3;
	public $reload = 1;
	public $maxRange = 1000;

	public function getAmmo(){
		return new BallisticTorpedo();
	}

	function __construct($id, $parentId, $start, $end, $output = 0, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
	}
}