<?php

class PrimarySystem extends System {
	public $name = "PrimarySystem";
	public $display = "PrimarySystem";
	public $powerReq = 0;
	public $internal = 1;

	function __construct($id, $parentId, $integrity, $output = 0, $width = 1){
		parent::__construct($id, $parentId, $output, $width);
		$this->maxDmg = 25;
		$this->integrity = floor($integrity*0.85);
	}

	public function getHitChance(){
		return $this->integrity;
	}

	public function setMaxDmg($fire, $dmg){
		if ($dmg->structDmg > $this->maxDmg){
			$dmg->overkill += $dmg->structDmg - $this->maxDmg;
			$dmg->structDmg  = $this->maxDmg;
			$dmg->notes .= "c;";
		}
		return $dmg;
	}

	public function getOutput($turn){
		if ($this->disabled || $this->destroyed){return 0;}

		$mod = 100;
		$mod += $this->getBoostEffect("Output") * $this->getBoostLevel($turn);
		$mod -= $this->getCritMod("Output", $turn);

		//Debug::log("ship: #".$this->parentId.", output: ".floor($this->output*$mod));
		return round($this->output * $mod/100);
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

		$mod = $this->getCritModMax($new + $old/2);
		if ($mod < 5){Debug::log("mod < 5: ".$mod.", dropping"); return;}

		$tresh =  ($new + $old/2)*2;

		for ($i = 0; $i < sizeof($possible); $i++){
			$roll = mt_rand(0, 100);
			if ($roll > $tresh){Debug::log(" NO CRIT - roll: ".$roll. ", tresh: ".$tresh); continue;}
			Debug::log("CRIT: ".$mod.", roll: ".$roll.", tresh: ".$tresh);

			//$id, $shipid, $systemid, $turn, $type, $duration, $value, $new){
			$this->crits[] = new Crit(
				sizeof($this->crits)+1, $this->parentId, $this->id, $turn, $possible[$i][0], 0, $mod, 1
			);
		}
	}

	public function getCritModMax($dmg){
		return min(15, round($dmg/30)*10);
	}
}

class Bridge extends PrimarySystem {
	public $name = "Bridge";
	public $display = "Command & Control";

	function __construct($id, $parentId, $integrity, $output, $width = 1){
        parent::__construct($id, $parentId, $integrity, 0, $width);

        $crew = array("Engine", "Sensor", "Reactor");
        $cost = floor($output/10);
        $mod = array(8, 8, 4);

        for ($i = 0; $i < sizeof($crew); $i++){
			$this->loads[] = array(
				"name" => $crew[$i],
				"amount" => 0,
				"cost" => $cost,
				"mod" => 	$mod[$i]
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
		if ($new < 5){Debug::log("no BRIDGE crit, dmg < 5"); return;}

		$pick = array("Engine", "Sensor", "Reactor")[mt_rand(0, 2)];

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

	function __construct($id, $parentId, $integrity, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $integrity, $output, $width);
    }

    public function setOutput($use, $add){
    	$this->output = $this->output + + $use + $add;
    }

	public function applyPowerSpike($turn, $overload, $em){
		$mod = round((($overload + ($em / 10)) / $this->output *100), 2);
		//d, $shipid, $systemid, $turn, $type, $duration, $value, $new){
		Debug::log("applyPowerSpike to #".$this->parentId.", overload: ".$overload.", emDmg: ".$em.", output: ".$this->output."/ mod: ".$mod);
		$this->crits[] = new Crit(sizeof($this->crits)+1, $this->parentId, $this->id, $turn, "Output", 0, $mod, 1);	

	}
}

class Engine extends PrimarySystem {
	public $name = "Engine";
	public $display = "Engine & Drive";

	function __construct($id, $parentId, $integrity, $output = 0, $width = 1){
        parent::__construct($id, $parentId, $integrity, $output, $width);
    }

	public function setPowerReq($mass){
		$this->powerReq = ceil($this->output * Math::getEnginePowerNeed($mass));
		$this->effiency = floor($this->powerReq/10)+2;
		$this->boostEffect[] = new Effect("Output", 15);
	}
}

class Sensor extends PrimarySystem {
	public $name = "Sensor";
	public $display = "Sensor & Analyzing";
	public $ew = array();
	public $effiency = 10;

	function __construct($id, $parentId, $integrity, $output = 0, $width = 1){
		$this->powerReq = floor($output/50);
		$this->effiency = floor($this->powerReq/10)+2;
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
		$this->integrity = $capacity*10;


		for ($i = 0; $i < sizeof($loads); $i++){
			$fighter = new $loads[$i](0,0);
			$this->loads[] = array(
				"name" => $loads[$i],
				"display" => $fighter->display,
				"amount" => 0,
				"cost" => $fighter::$value,
				"mass" => $fighter->mass,
				"integrity" => $fighter->integrity,
				"launch" => 0
			);
		}
	}

	public function setArmourData($rem){
		$this->armourMod = 0.5;
		$this->armour = floor($rem * $this->armourMod);
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