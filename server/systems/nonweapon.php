<?php

class PrimarySystem extends System {
	public $name = "PrimarySystem";
	public $display = "PrimarySystem";
	public $powerReq = 0;
	public $internal = 1;
	public $crewEffect = 0;
	public $maxDmg = 20;
	public $hitMod = 4;
	public $hitChance = 0;
	public $hitPct = 0;
	public $critEffects =  array( // type, mag, dura, effect
		array("Output", 0, 0, 0)
	);

	public function getCritModMax($relDmg){
		return (min(15, round($relDmg*100/5) * 5)*-1);
	}

	function __construct($id, $parentId, $integrity, $output = 0, $width = 1){
		parent::__construct($id, $parentId, $output, $width);
		$this->integrity = floor($integrity*0.85);
	}

	public function setHitChanceValue(){
		$this->hitChance = ($this->integrity / $this->hitMod);

	}

	public function getHitChance(){
		return $this->hitChance;
	}

	public function setMaxDmg($fire, $dmg){
		if ($dmg->systemDmg > $this->maxDmg){
			$dmg->hullDmg += $dmg->systemDmg - $this->maxDmg;
			$dmg->systemDmg = $this->maxDmg;
			$dmg->notes .= "c;";
		}
		return $dmg;
	}

	public function getCrewLevel(){
		$lvl = 0;
		for ($i = 0; $i < sizeof($this->powers); $i++){
			if ($this->powers[$i]->type == 2){
				$lvl++;
			}
		}
		return $lvl;
	}

	public function getCrewEffect(){
		return $this->crewEffect;
	}

	public function getOutput($turn){
		if ($this->disabled || $this->destroyed){return 0;}

		$mod = 100;
		$mod += $this->getBoostEffect("Output") * $this->getBoostLevel($turn);
		$mod += $this->getCrewEffect() * $this->getCrewLevel();
		$mod -= $this->getCritMod("Output", $turn);

		//Debug::log("ship: #".$this->parentId.", output: ".floor($this->output*$mod));
		return floor($this->output * $mod/100);
	}
}

class Command extends PrimarySystem {
	public $name = "Command";
	public $display = "Command & Control";
	public $loadout = 1;
	public $crewEffect = 5;

	function __construct($id, $parentId, $integrity, $output, $forShip){
        parent::__construct($id, $parentId, $integrity, 0, 1);

        $options;
    	if ($forShip){
			$options = array("Command", "Engine", "Sensor", "Reactor");
    	} else $options = array("Command", "Sensor");
        $baseCost = floor($output/12);

        for ($i = 0; $i < sizeof($options); $i++){
			$this->loads[] = array(
				"name" => $options[$i],
				"amount" => 0,
				"baseCost" => $baseCost,
				"cost" => 0,
			);
        }
	}

	public function adjustLoad($dbLoad){
		//Debug::log("ding");
		for ($i = 0; $i < sizeof($dbLoad); $i++){
			for ($j = 0; $j < sizeof($this->loads); $j++){
				if ($dbLoad[$i]["name"] == $this->loads[$j]["name"]){
					$this->loads[$j]["amount"] = $dbLoad[$i]["amount"];
					break; 
				}
			}
		}
	}

	public function determineCrit($rel, $turn, $squad){
		if ($this->destroyed){return;}
		if ($rel->new <= 0.05){return;}

		Debug::log("determineCrit ".get_class($this)." #".$this->id.", new: ".$rel->new.", old: ".$rel->old.", rel: ".$rel->new.", Squad: ".$squad);


        $options = array("Morale", "Focus", "Engine", "Sensor", "Reactor");
        $multi = array(1, 1, 0.75, 1, 0.75);
		$roll = mt_rand(0, sizeof($options)-1);
		//$roll = 0;
		$pick = $options[$roll];
		$value = round(10 * $multi[$roll], 2)*-1;

		Debug::log("BRIDGE CRIT: on ".$pick." for :".$value."%");

		$this->crits[] = new Crit(
			sizeof($this->crits)+1, $this->parentId, $this->id, $turn, $pick, 0, $value, 1
		);
	}
}

class Reactor extends PrimarySystem {
	public $name = "Reactor";
	public $display = "Reactor & Power Grid";
	public $powerReq = 0;
	public $crewEffect = 4;

	function __construct($id, $parentId, $integrity, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $integrity, $output, $width);
    }

    public function setOutput($use, $add){
    	$this->output = $this->output + $use + $add;
    }

	public function getCritModMax($relDmg){
		return (min(10, round($relDmg*100/5) * 5)*-1);
	}

	public function applyPowerSpike($turn, $potential, $em){
		Debug::log("applyPowerSpike to #".$this->parentId);

		if (sizeof($potential)){
			$overload = 0.00;
			$all = 0;

			for ($i = 0; $i < sizeof($potential); $i++){
				$all += $potential[$i];
				$roll = mt_rand(0, 100);
				$overload += round($potential[$i] / 100 * $roll, 2);
			}

			$modifier = round($overload / $this->output * 100, 2);
			if (!$modifier){return;}
			Debug::log("POTENTIAL: ".$all.", output: ".$this->output.", result: ".$overload." overload, value: ".$modifier."%");

			$this->crits[] = new Crit(sizeof($this->crits)+1, $this->parentId, $this->id, $turn, "Overload", 0, -$modifier, 1);
		}
	}
}

class Engine extends PrimarySystem {
	public $name = "Engine";
	public $display = "Engine & Drive";
	public $crewEffect = 12;
	public $hitMod = 2.5;

	function __construct($id, $parentId, $integrity, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $integrity, $output, $width);
    }

	public function setPowerReq($mass){
		$this->powerReq = ceil($this->output * Math::getEnginePowerNeed($mass));
		$this->effiency = floor($this->powerReq/10)+3;
		$this->boostEffect[] = new Effect("Output", 12);
	}
}

class Sensor extends PrimarySystem {
	public $name = "Sensor";
	public $display = "Sensor & Analyzing";
	public $ew = array();
	public $effiency = 10;
	public $crewEffect = 12;
	public $hitMod = 2;
	public $modes = array("Lock", "Mask");
	public $states = array(0, 0);

	function __construct($id, $parentId, $integrity, $output = 0, $width = 1){
		$this->powerReq = floor($output/60);
		$this->effiency = floor($this->powerReq/9)+2;
		$this->boostEffect[] = new Effect("Output", 10);
        parent::__construct($id, $parentId, $integrity, $output, $width);
    }

    public function hideEW($turn){
		//Debug::log($this->parentId);
		$this->states = array(1, 0, 0, 0);
		$this->locked = 0;
		for ($k = sizeof($this->ew)-1; $k >= 0; $k--){
			if ($this->ew[$k]->turn == $turn){
				array_splice($this->ew, $k, 1);
			} else break;
		}
    }

	public function setState($turn, $phase){
		parent::setState($turn, $phase);
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

class Hangar extends Weapon {
	public $type = "Hangar";
	public $name = "Hangar";
	public $display = "Hangar";
	public $loads = array();
	public $reload = 2;
	public $utility = 1;
	public $capacity;
	public $launchRate;
	public $usage = -1;
	public $loadout = 1;

	function __construct($id, $parentId, $launchRate, $loads, $capacity, $width = 1){
		parent::__construct($id, $parentId, 0, 0, 0, $width);
		$this->launchRate = $launchRate;
		$this->capacity = $capacity;
		$this->powerReq = 0;
		//$this->powerReq = floor($launchRate/3);
		$this->integrity = $capacity*8;


		for ($i = 0; $i < sizeof($loads); $i++){
			$fighter = new $loads[$i](0, 0);
			$this->loads[] = $fighter;
			//$this->loads[$i]->amount = 10;
		}
	}

	public function setArmourData($rem){
		$this->armourMod = 0.5;
		$this->armour = floor($rem * $this->armourMod);
	}
	
	public function adjustLoad($dbLoad){
		for ($i = 0; $i < sizeof($dbLoad); $i++){
			for ($j = 0; $j < sizeof($this->loads); $j++){
				if ($dbLoad[$i]["name"] == $this->loads[$j]->name){
					$this->loads[$j]->amount = $dbLoad[$i]["amount"];
					break; 
				}
			}
		}
	}

	public function doCritTestSelf($turn, $extra){
		return;
	}
}

class Bulkhead extends System {
	public $type = "Bulkhead";
	public $name = "Bulkhead";
	public $display = "Bulkhead";
	public $fireOrders = array();
	public $powerReq = 0;

	function __construct($id, $parentId, $integrity, $output = 0, $width = 1){
		$this->integrity = $integrity;
        parent::__construct($id, $parentId, $output, $width);
	}

	public function getHitChance(){
		return $this->integrity*4;
	}

	public function determineCrit($rel, $turn, $squad){
		return;
	}
}

class Interceptor {
	public $modes = array("Offensive", "Defensive");
	public $states = array(0, 0);
	public $powers = array();
	public $turrets = array(4, 4);
	public $id;
	public $parentId;
	public $name = "Interceptor";
	public $display = "Interceptor Grid";

	function __construct($id, $parentId){
		$this->id = $id;
		$this->parentId = $parentId;
	}
}

class Cyber extends Sensor {
	public $name = "Cyber";
	public $display = "Cyber Warfare";
	public $ew = array();

	function __construct($id, $parentId, $mass, $output = 0, $width = 0){
        parent::__construct($id, $parentId, $mass, $output, $width);
    }
}

?>