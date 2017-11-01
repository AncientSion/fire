<?php

class PrimarySystem extends System {
	public $name = "PrimarySystem";
	public $display = "PrimarySystem";
	public $powerReq = 0;
	public $internal = 1;
	
	function __construct($id, $parentId, $mass, $output = 0, $effiency = 0, $destroyed = 0){
		parent::__construct($id, $parentId, $output, $destroyed);
		$this->mass = $mass;
		$this->integrity = $mass;
		$this->effiency = $effiency;
	}

	public function getHitChance(){
		return $this->mass;
	}

	public function getOutput($turn){
		if ($this->disabled || $this->destroyed){
			return 0;
		}

		$mod = 1;
		$mod += $this->getBoostEffect("Output") * $this->getBoostLevel($turn);
		$mod -= $this->getCritMod("Output", $turn);

		//Debug::log("ship: #".$this->parentId.", output: ".floor($this->output*$mod));
		return round($this->output * $mod);
	}

	public function getCritModMax($dmg){
		return min(0.15, round($dmg/30)/10); // round to 0.05
	}

	public function determineCrit($old, $new, $turn){
		$dmg = round($new / $this->integrity * 100);
		//$possible = $this->getValidEffects();

		Debug::log("determineCrit for ".$this->display." #".$this->id." on unit #".$this->parentId.", dmg: ".$dmg);

		if ($dmg > 50 && mt_rand(0, 1)){
			Debug::log("critical hit, disabling primary system ".get_class($this));
			$this->crits[] = new Crit(
				sizeof($this->crits)+1, $this->parentId, $this->id, $turn, "Disabled", 1, 0, 1
			);
		}

		$mod = $this->getCritModMax($dmg);
		if ($mod < 0.05){return;}
		if (mt_rand(0, 100) > ($new + $old/2)*3){return;}

		//$id, $shipid, $systemid, $turn, $type, $duration, $value, $new){
		$this->crits[] = new Crit(
			sizeof($this->crits)+1, $this->parentId, $this->id, $turn, "Output", 0, $mod, 1
		);
	}
}

class Bridge extends PrimarySystem {
	public $name = "Bridge";
	public $display = "Bridge";

	function __construct($id, $parentId, $mass, $output = 0, $effiency = 0, $destroyed = 0){
        parent::__construct($id, $parentId, $mass, $output, $effiency, $destroyed);
	}

	public function getValidEffects(){
		return array();
	}

	public function getArmourMod(){
		return 1.5;
	}
}

class Reactor extends PrimarySystem {
	public $name = "Reactor";
	public $display = "Reactor";
	public $powerReq = 0;

	function __construct($id, $parentId, $mass, $output = 0, $effiency = 0, $destroyed = 0){
        parent::__construct($id, $parentId, $mass, $output, $effiency, $destroyed);
    }

    public function setOutput($add){
    	$this->output = $this->output + $add;
    }

	public function applyPowerSpike($spike, $turn){
		//Debug::log("applyPowerSpike, crit length: ".sizeof($this->crits));
		$mod = round($spike / $this->output, 2);
		//$id, $shipid, $systemid, $turn, $type, $duration, $value, $new){
		$this->crits[] = new Crit(sizeof($this->crits)+1, $this->parentId, $this->id, $turn, "Output", 0, $mod, 1);	

		//Debug::log("applied power spike, crit length: ".sizeof($this->crits));

	}
}

class Engine extends PrimarySystem {
	public $name = "Engine";
	public $display = "Engine";

	function __construct($id, $parentId, $mass, $output = 0, $destroyed = 0){
		$this->powerReq = ceil($output / 20);
		$this->boostEffect[] = new Effect("Output", 0.08);
        parent::__construct($id, $parentId, $mass, $output, ceil($this->powerReq/3), $destroyed);
    }
}

class Sensor extends PrimarySystem {
	public $name = "Sensor";
	public $display = "Sensor";
	public $ew = array();

	function __construct($id, $parentId, $mass, $output = 0, $effiency, $destroyed = 0){
		$this->powerReq = floor($output/60);
		$this->boostEffect[] = new Effect("Output", 0.10);
		//$this->modes = array("Lock", "Scramble", "Sweep", "Mask");
		//$this->states = array(0, 0, 0, 0);
		$this->modes = array("Lock", "Scramble");
		$this->states = array(0, 0);
        parent::__construct($id, $parentId, $mass, $output, ceil($this->powerReq/3), $destroyed);
    }

    public function hideEW($turn){
		$this->states = array(1, 0, 0, 0);
		$this->locked = 0;
		for ($k = sizeof($this->ew)-1; $k >= 0; $k--){
			if ($this->ew[$k]->turn == $turn){
				array_splice($this->ew, $k, 1);
			} else break;
		}
    }

	public function setState($turn){
		parent::setState($turn);
		$this->setEW($turn);
	}

	public function setEW($turn){
		for ($i = sizeof($this->ew)-1; $i >= 0; $i--){
			if ($this->ew[$i]->turn == $turn){
				$this->states[$this->ew[$i]->type] = 1;
				$this->locked = 1;
				return;
			}
		}
		$this->states[0] = 1;
	}

	public function getEW($turn){
		for ($i = sizeof($this->ew)-1; $i >= 0; $i--){
			if ($this->ew[$i]->turn == $turn){
				return $this->ew[$i];
			} else if ($this->ew[$i]->turn < $turn){
				break;
			}
		}
		return false;
	}
}

class LifeSupport extends PrimarySystem {
	public $name = "LifeSupport";
	public $display = "Life Support";

	function __construct($id, $parentId, $mass, $output = 0, $effiency = 0, $destroyed = 0){
        parent::__construct($id, $parentId, $mass, $output, $effiency, $destroyed);
    }
}

class Hangar extends Weapon {
	public $type = "Hangar";
	public $name = "Hangar";
	public $display = "Hangar";
	public $loads = array();
	public $reload = 1;
	public $utility = 1;

	function __construct($id, $parentId, $start, $end, $output, $effiency, $loads, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
		$this->powerReq = floor($effiency/3);
		$this->effiency = $effiency;
		$this->mass = $output;
		$this->integrity = floor($output / 3);

		for ($i = 0; $i < sizeof($loads); $i++){
			$fighter = new $loads[$i](0,0);
			$this->loads[] = array(
				"name" => $loads[$i],
				"amount" => 0,
				"cost" => $fighter->value,
				"mass" => $fighter->mass,
				"integrity" => $fighter->integrity,
				"launch" => 0
			);
		}
	}

	public function setArmourMod(){
		$this->armourMod = 0.5;
	}

	public function getHitChance(){
		return $this->mass/2;
	}
	
	public function adjustLoad($dbLoad){
		for ($i = 0; $i < sizeof($dbLoad); $i++){
			for ($j = 0; $j < sizeof($this->loads); $j++){
				if ($dbLoad[$i]["name"] == $this->loads[$j]["name"]){
					$this->loads[$j]["amount"] = $dbLoad[$i]["amount"];
					break; 
				}
			}
		}
	}

	public function getValidEffects(){
		return array();
	}
}
?>