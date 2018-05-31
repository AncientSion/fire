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

	function __construct($id, $parentId, $integrity, $output = 0, $width = 1){
		parent::__construct($id, $parentId, $output, $width);
		$this->integrity = floor($integrity*0.85);
	}

	public function setHitChanceValue(){
		$this->hitChance = ($this->integrity / $this->hitMod)*1.2;

	}

	public function getHitChance(){
		return $this->hitChance;
	}

	public function setMaxDmg($fire, $dmg){
		if ($dmg->structDmg > $this->maxDmg){
			$dmg->overkill += $dmg->structDmg - $this->maxDmg;
			$dmg->structDmg = $this->maxDmg;
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
		$mod -= $this->getCritMod("", $turn);

		//Debug::log("ship: #".$this->parentId.", output: ".floor($this->output*$mod));
		return floor($this->output * $mod/100);
	}	

	public function getCritMod($type, $turn){
		$mod = 0;
		for ($i = 0; $i < sizeof($this->crits); $i++){
			$mod =+ $this->crits[$i]->value;
		}
		return $mod;
	}

	public function getValidEffects(){
		return array(
			array("Output", 0, 0, 0)
		);
	}

	public function determineCrit($new, $old, $turn){
		$new = round($new / $this->integrity * 100);
		$old = round($old / $this->integrity * 100);
		$possible = $this->getValidEffects();

		Debug::log("determineCrit for ".$this->display." #".$this->id." on unit #".$this->parentId.", newDmg: ".$new.", oldDmg: ".$old);

		$mod = $this->getCritModMax($new);
		if ($mod < 2){return;}

		$trigger =  ($new*2 + $old/2);

		for ($i = 0; $i < sizeof($possible); $i++){
			$roll = mt_rand(0, 100);
			if ($roll > $trigger){Debug::log(" NO CRIT - roll: ".$roll. ", tresh: ".$trigger); continue;}
			Debug::log("CRIT: ".$mod.", roll: ".$roll.", tresh: ".$trigger);

			//$id, $shipid, $systemid, $turn, $type, $duration, $value, $new){
			$this->crits[] = new Crit(
				sizeof($this->crits)+1, $this->parentId, $this->id, $turn, $possible[$i][0], 0, $mod, 1
			);
		}
	}

	public function getCritModMax($dmg){
		return min(20, round($dmg/2));
	}
}

class Bridge extends PrimarySystem {
	public $name = "Bridge";
	public $display = "Command & Control";
	public $hitMod = 6;
	public $loadout = 1;

	public function getNodes(){
		return array("Morale", "Focus", "Engine", "Sensor", "Reactor");
	}

	function __construct($id, $parentId, $integrity, $output, $width = 1){
        parent::__construct($id, $parentId, $integrity, 0, $width);

        $options = $this->getNodes();
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

	public function determineCrit($new, $old, $turn){
		$new = round($new / $this->integrity * 100);
		Debug::log("determineCrit for ".$this->display." #".$this->id." on unit #".$this->parentId);
		$mod = min(15, $new);
		if ($new <= 3){Debug::log("no BRIDGE crit, dmg < 3"); return;}

        $options = $this->getNodes();
		$roll = mt_rand(0, sizeof($options)-1);
		$pick = $options[$roll];

		if ($roll == 2){$mod = round($mod/2, 2);}

		Debug::log("BRIDGE CRIT: on ".$pick." for :".$mod."%");

		//$id, $shipid, $systemid, $turn, $type, $duration, $value, $new){
		$this->crits[] = new Crit(
			sizeof($this->crits)+1, $this->parentId, $this->id, $turn, $pick, 0, $mod, 1
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
    	$this->output = $this->output + + $use + $add;
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
			Debug::log("POTENTIAL: ".$all.", output: ".$this->output.", result: ".$overload." units, value: ".$modifier."%");

			$this->crits[] = new Crit(sizeof($this->crits)+1, $this->parentId, $this->id, $turn, "Overload", 0, $modifier, 1);
		}
	}
}

class Engine extends PrimarySystem {
	public $name = "Engine";
	public $display = "Engine & Drive";
	public $crewEffect = 10;
	public $hitMod = 3;

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
	public $crewEffect = 8;
	public $hitMod = 2;

	function __construct($id, $parentId, $integrity, $output = 0, $width = 1){
		$this->powerReq = floor($output/60);
		$this->effiency = floor($this->powerReq/9)+2;
		$this->boostEffect[] = new Effect("Output", 10);
		$this->modes = array("Lock", "Scramble");
		$this->states = array(0, 0);
        parent::__construct($id, $parentId, $integrity, $output, $width);
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
			$fighter = new $loads[$i](0,0);
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

	public function singleCritTest($turn, $extra){
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

	public function singleCritTest($turn, $extra){
		return;
	}

	public function getHitChance(){
		return $this->integrity*4;
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