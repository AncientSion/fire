<?php

class PrimarySystem extends System {
	public $name = "PrimarySystem";
	public $display = "PrimarySystem";
	public $powerReq = 0;
	public $internal = 1;
	public $crewEffect = 0;
	public $maxDmg = 20;
	public $hitMod = 3;
	public $hitChance = 0;
	public $hitPct = 0;
	public $critEffects =  array( // type, mag, dura, effect
		array("Output", 40, 0, 0)
	);

	public function getCritModMax($relDmg, $hits){
		//Debug::log("PrimarySystem getCritModMax hits: ".$hits);
		//return (min(15, round($relDmg*100/5) * 5)*-1);
		return (min(15, round($relDmg*100/5) * 5)*-1) * (1 + (($hits-1) * 0.5));
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
		$mod += $this->getCritMod("Output", $turn);

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

	public function getCritModMax($relDmg, $hits){
		return (min(10, round($relDmg*100/5) * 5)*-1);
	}

	public function applyPowerSpike($turn, $potential, $em){
		Debug::log("applyPowerSpike to #".$this->parentId);

		if (sizeof($potential)){
			$overload = 0.00;
			$all = 0;

			for ($i = 0; $i < sizeof($potential); $i++){
				$all += $potential[$i];
				$roll = mt_rand(1, 100);
				$overload += round($potential[$i] / 100 * $roll, 2);
			}

			$modifier = round($overload / $this->output * 100, 2);
			if (!$modifier){return;}
			Debug::log("POTENTIAL: ".$all.", output: ".$this->output.", result: ".$overload." overload, value: ".$modifier."%");

			$this->crits[] = new Crit(sizeof($this->crits)+1, $this->parentId, $this->id, $turn, "Overload", 0, -$modifier, 1);
		}
	}
}

class GravitonSupressor extends PrimarySystem {
	public $name = "GravitonSupressor";
	public $display = "Graviton Supressor";
	public $crewEffect = 0;
	public $hitMod = 2.5;

	function __construct($id, $parentId, $integrity, $unitSize){
		$this->boostEffect[] = new Effect("Output", 100);
		$this->powerReq = ceil($unitSize*1);
		$this->effiency = ceil($this->powerReq*1.5);
        parent::__construct($id, $parentId, $integrity/2, 5, 1); //hp, output, width
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

	public function setPowerReq($unitSize, $mass = 0){
		$this->powerReq = ceil($this->output * Math::getEnginePowerNeed($mass));
		$this->effiency = floor($this->powerReq/5);
		$this->boostEffect[] = new Effect("Output", 15);
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
        parent::__construct($id, $parentId, $integrity, $output, $width);
    }

	public function setPowerReq($unitSize, $mass = 0){
		$this->powerReq = ceil($this->output/50);
		$this->effiency = floor($this->powerReq/5) + $unitSize-3;
		$this->boostEffect[] = new Effect("Output", 15);
	}

    public function hideEW($turn){
		//Debug::log($this->parentId);
		$this->locked = 0;
		for ($k = sizeof($this->ew)-1; $k >= 0; $k--){
			if ($this->ew[$k]->turn == $turn){
				array_splice($this->ew, $k, 1);
				$this->states = array(1, 0);
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

class Jammer extends PrimarySystem {
	public $type = "Jammer";
	public $name = "Jammer";
	public $display = "Passive Jamming Suite";
	public $hitMod = 1.5;
	public $effiency = 6;

	function __construct($id, $parentId, $integrity, $unitSize){
		$this->boostEffect[] = new Effect("Output", 50);
		$this->powerReq = $unitSize*2;
		$this->effiency = floor($this->powerReq*2);
        parent::__construct($id, $parentId, $integrity/2, 20, 1); //hp, output, width
    }
}

class Hangar extends Weapon {
	public $type = "Hangar";
	public $name = "Hangar";
	public $display = "Hangar";
	public $loads = array();
	public $reload = 2;
	public $utility = 1;
	public $capacity = 0;
	public $launchRate = 0;
	public $usage = -1;
	public $loadout = 1;
	public $powerReq = 0;
	public $armurMod = 0.5;
	public $critEffects = array();

	function __construct($id, $parentId, $integrity, $capacity, $launchRate, $loads, $width = 1){
		parent::__construct($id, $parentId, 0, 0, 0, $width);
		$this->integrity = $integrity;
		$this->capacity = $capacity;
		$this->launchRate = $launchRate;

		for ($i = 0; $i < sizeof($loads); $i++){
			$fighter = new $loads[$i](0, 0);
			$this->loads[] = $fighter;
		}
	}

	public function setArmourData($rem){
		$this->armour = floor($rem * $this->armurMod);
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
}

class Bulkhead extends System {
	public $type = "Bulkhead";
	public $name = "Bulkhead";
	public $display = "Bulkhead";
	public $fireOrders = array();
	public $powerReq = 0;
	public $critEffects = array();

	function __construct($id, $parentId, $integrity, $output = 0, $width = 1){
		$this->integrity = $integrity;
        parent::__construct($id, $parentId, $output, $width);
	}

	public function getHitChance(){
		return $this->integrity*4;
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