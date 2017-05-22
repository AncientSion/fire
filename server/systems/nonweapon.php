<?php

class PrimarySystem extends System {
	public $name = "PrimarySystem";
	public $display = "PrimarySystem";
	
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
		return floor($this->output * $this->getOutputMods($turn) - $this->getOutputUsage($turn));
	}

	public function getOutputMods($turn){
		$mod = 1;
		$mod += $this->getOutputPowerMods($turn);
		$mod *= $this->getOutputCritMods($turn);
		return $mod;
	}

	public function getOutputPowerMods($turn){
		$mod = 0;
		for ($i = sizeof($this->powers)-1; $i >= 0; $i--){
			if ($this->powers[$i]->turn > $turn){
				break;
			}
			else if ($this->powers[$i]->turn == $turn && $this->powers[$i]->type == 1){
				$mod += $this->boostEffect->value/100 * $this->powers[$i]->type;
			}
		}
		return $mod;
	}

	public function getOutputCritMods($turn){
		$mod = 1;
		return $mod;
	}

	public function getOutputUsage($turn){
		return 0;
	}
}

class Bridge extends PrimarySystem {
	public $name = "Bridge";
	public $display = "Bridge";

	function __construct($id, $parentId, $mass, $output = 0, $effiency = 0, $destroyed = 0){
        parent::__construct($id, $parentId, $mass, $output, $effiency, $destroyed);
	}

	public function getCritEffects(){
		return array("bridge_accu-10", "bridge_nomove", "disabled");
	}

	public function getCritTreshs(){
		return array(10, 20, 35);
	}

	public function getCritDuration(){
		return array(2, 1, 1);
	}
}

class Engine extends PrimarySystem {
	public $name = "Engine";
	public $display = "Engine";

	function __construct($id, $parentId, $mass, $output = 0, $effiency = 0, $destroyed = 0){
		$this->powerReq = ceil($output / 5);
		$this->boostEffect = new Effect("Output", 15);
        parent::__construct($id, $parentId, $mass, $output, $effiency, $destroyed);
    }

	public function getCritEffects(){
		return array("output_0.9", "output_0.5", "output_0.9", "disabled");
	}

	public function getCritTreshs(){
		return array(10, 25, 40, 55);
	}

	public function getCritDuration(){
		return array(0, 1, 0, 1);
	}
}

class Reactor extends PrimarySystem {
	public $name = "Reactor";
	public $display = "Reactor";
	public $powerReq = 0;

	function __construct($id, $parentId, $mass, $output = 0, $effiency = 0, $destroyed = 0){
        parent::__construct($id, $parentId, $mass, $output, $effiency, $destroyed);
    }

	public function getCritEffects(){
		return array("output_0.95", "output_0.7", "output_0.5", "meltdown");
	}

	public function getCritTreshs(){
		return array(15, 40, 55, 80);
	}

	public function getCritDuration(){
		return array(0, 1, 1, 0);
	}
}

class LifeSupport extends PrimarySystem {
	public $name = "LifeSupport";
	public $display = "Life Support";

	function __construct($id, $parentId, $mass, $output = 0, $effiency = 0, $destroyed = 0){
        parent::__construct($id, $parentId, $mass, $output, $effiency, $destroyed);
    }

	public function getCritEffects(){
		return array("dmg05", "dmg15", "dmg25", "dmg35");
	}

	public function getCritTreshs(){
		return array(5, 15, 25, 35);
	}
	public function getCritDuration(){
		return array(1, 1, 1, 1);
	}
}

class Sensor extends PrimarySystem {
	public $name = "Sensor";
	public $display = "Sensor";
	public $ew = array();

	function __construct($id, $parentId, $mass, $output = 0, $effiency = 0, $destroyed = 0){
		$this->powerReq = floor($output/20);
		$this->boostEffect = new Effect("Output", 10);
		$this->modes = array("Lock", "Mask");
		$this->states = array(1, 0);
        parent::__construct($id, $parentId, $mass, $output, $effiency, $destroyed);
    }
	public function getCritEffects(){
		return array("output_0.85", "output_0.7", "disabled");
	}

	public function getCritTreshs(){
		return array(10, 25, 40);
	}
	public function getCritDuration(){
		return array(0, 0, 1);
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

class Hangar extends Weapon {
	public $type = "Hangar";
	public $name = "Hangar";
	public $display = "Hangar";
	public $loads = array();
	public $reload = 2;

	function __construct($id, $parentId, $start, $end, $output, $effiency, $loads, $destroyed = false){
        parent::__construct($id, $parentId, $start, $end, $output, $destroyed);
		$this->powerReq = floor($effiency/2);
		$this->effiency = $effiency;
		$this->mass = $output;
		$this->integrity = $output / 2;

		for ($i = 0; $i < sizeof($loads); $i++){
			$fighter = new $loads[$i](0,0);
			$this->loads[] = array(
				"name" => $loads[$i],
				"amount" => 0,
				"cost" => $fighter->value,
				"mass" => $fighter->mass,
				"launch" => 0
			);
		}
	}

	public function setArmourMod(){
		$this->armourMod = 0.5;
	}

	public function getHitChance(){
		return $this->mass * 2;
	}

	public function getCritEffects(){
		return array("launch1", "launch2", "launch3");
	}

	public function getCritTreshs(){
		return array(15, 35, 55);
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
}
?>