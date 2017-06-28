<?php

class PrimarySystem extends System {
	public $name = "PrimarySystem";
	public $display = "PrimarySystem";
	public $powerReq = 0;
	
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
		return floor(($this->output + $this->getExtraOutput($turn) * $this->getOutputCrits($turn)) - $this->getOutputUsage($turn));
	}

	public function getExtraOutput($turn){
		$extra = 0;
		$boost = 0;

		for ($i = 0; $i < sizeof($this->boostEffect); $i++){
			if ($this->boostEffect[$i]->type == "Output"){
				$boost = $this->boostEffect[$i]->type;
				break;
			}
		}

		if ($boost){
			for ($i = sizeof($this->powers)-1; $i >= 0; $i--){
				if ($this->powers[$i]->turn > $turn){
					break;
				}
				else if ($this->powers[$i]->turn == $turn && $this->powers[$i]->type == 1){
					$extra += $this->output * $boost /100 * $this->powers[$i]->type;
				}
			}
		}
		if ($extra){
			Debug::log($this->parentId."/".$this->id.", extra: ".$extra);
		}
		return floor($extra);
	}

	public function getOutputCrits($turn){
		$mod = 1;
		return $mod;
		for ($i = 0; $i < sizeof($this->crits); $i++){
			switch ($this->crits[$i]->type){
				case "damage1": 
					$mod -= 0.1;
					break;
				case "damage2":
					$mod -= 0.2;
					break;
			}
		}
		return $mod;
	}

	public function getOutputUsage($turn){
		return 0;
	}

	public function getValidEffects(){
		return array(
			array("Output", 10, 1, 0) // attr, %-tresh, duration, modifier
		);
	}
}

class Bridge extends PrimarySystem {
	public $name = "Bridge";
	public $display = "Bridge";

	function __construct($id, $parentId, $mass, $output = 0, $effiency = 0, $destroyed = 0){
        parent::__construct($id, $parentId, $mass, $output, $effiency, $destroyed);
	}
}

class Engine extends PrimarySystem {
	public $name = "Engine";
	public $display = "Engine";

	function __construct($id, $parentId, $mass, $output = 0, $destroyed = 0){
		$this->powerReq = ceil($output / 5);
		$this->boostEffect[] = new Effect("Output", 0.15);
        parent::__construct($id, $parentId, $mass, $output, ceil($this->powerReq/5), $destroyed);
    }
}

class Reactor extends PrimarySystem {
	public $name = "Reactor";
	public $display = "Reactor";
	public $powerReq = 0;

	function __construct($id, $parentId, $mass, $output = 0, $effiency = 0, $destroyed = 0){
        parent::__construct($id, $parentId, $mass, $output, $effiency, $destroyed);
    }
}

class LifeSupport extends PrimarySystem {
	public $name = "LifeSupport";
	public $display = "Life Support";

	function __construct($id, $parentId, $mass, $output = 0, $effiency = 0, $destroyed = 0){
        parent::__construct($id, $parentId, $mass, $output, $effiency, $destroyed);
    }
}

class Sensor extends PrimarySystem {
	public $name = "Sensor";
	public $display = "Sensor";
	public $ew = array();

	function __construct($id, $parentId, $mass, $output = 0, $effiency, $destroyed = 0){
		$this->powerReq = floor($output/20);
		$this->boostEffect[] = new Effect("Output", 0.10);
		$this->modes = array("Lock", "Mask");
		//$this->states = array(1, 0);
        parent::__construct($id, $parentId, $mass, $output, $effiency, $destroyed);
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
		$this->mass = $output / 2;
		$this->integrity = $output / 4;

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
		return array(
			array("Output", 20, 0, 0) // attr, %-tresh, duration, modifier
		);
	}
}
?>