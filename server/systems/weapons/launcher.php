<?php

class Launcher extends Weapon {
	public $type = "Launcher";
	public $animation = "projectile";
	public $priority = 8;
	public $loads = array();
	public $reload = 3;
	public $ammo;
	public $mass = 22;
	public $capacity = array();
	public $launchRate = array();
	public $powerReq = 2;
	public $effiency = 1;
	public $shots = 0;

	function __construct($id, $parentId, $start, $end, $loads, $destroyed = false){
		for ($i = 0; $i < sizeof($loads); $i++){
			$this->loads[] = new $loads[$i][0]($this->id, -1);
			$this->capacity[] = $loads[$i][1];
			$this->launchRate[] = $loads[$i][2];
		}

        parent::__construct($id, $parentId, $start, $end, 0, $destroyed);
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
					break;
				}
			}
		//$this->loads = array();
		//$this->ammo = new $dbLoad[0]["name"]($this->id, 0);
		//$this->ammo->output = $dbLoad[0]["amount"];
		}
	}

	public function setArmourMod(){
		$w = $this->getArcWidth();

		if ($w <= 120){$this->armourMod = 0.8;}
		else if ($w <= 180){$this->armourMod =  0.6;}
		else $this->armourMod =  0.3;
	}	

	public function testCrit($turn){
		return;
		if ($this->destroyed || empty($this->damages)){
			return;
		}

		$old = 0; $new = 0;
		for ($i = 0; $i < sizeof($this->damages); $i++){
			if ($this->damages[$i]->turn > $turn){
				break;
			}
			else if ($this->damages[$i]->turn == $turn){
				$new += $this->damages[$i]->structDmg;
			} else $old += $this->damages[$i]->structDmg;
		}

		if ($new){
			//$this->determineCrit(ceil(($new + ($old/2)) / $this->integrity * 100), $turn);
			$this->determineCrit($old, $new, $turn);
		}
	}

	public function getValidEffects(){
		return array(// attr, %-tresh, duration, modifier
			array("Disabled", 80, 1, 0),
			array("Damage", 30, 0, 0),
			array("Accuracy", 30, 0, 0)
		);
	}

}

class MissileLauncher extends Launcher {
	public $name = "MissileLauncher";
	public $display = "Missile Launcher";
	public $animColor = "black";

	function __construct($id, $parentId, $start, $end, $loads, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $loads, $destroyed);
	}
}