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

	public function getValidEffects(){
		return array(
			array("Disabled", 60, 1, 0), // attr, %-tresh, duration, modifier
			array("Output", 5, 0, 0) // attr, %-tresh, duration, modifier
		);
	}

	public function getCritModifier($dmg){
		return min(0.15, round($dmg/5)); // round to 0.xx
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
	public $reload = 2;
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