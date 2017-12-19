<?php

class PrimarySystem extends System {
	public $name = "PrimarySystem";
	public $display = "PrimarySystem";
	public $powerReq = 0;
	public $internal = 1;

	function __construct($id, $parentId, $subs, $output = 0, $effiency = 0, $destroyed = 0){
		parent::__construct($id, $parentId, $output, $destroyed);
		//$this->maxDmg = round($subs[0] / $subs[1]);
		$this->maxDmg = 25;
		$this->mass = $subs[0];
		$this->integrity = $subs[0];
		$this->effiency = $effiency;

	}

	public function getHitChance(){
		return $this->mass;
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


	public function determineCrit($old, $new, $turn){
		$new = round($new / $this->integrity * 100);
		$old = round($old / $this->integrity * 100);
		$possible = $this->getValidEffects();

		Debug::log("determineCrit for ".$this->display." #".$this->id." on unit #".$this->parentId.", new: ".$new.", old: ".$old);

		$mod = $this->getCritModMax($new + $old);
		//if ($mod < 5){Debug::log("mod < 5: ".$mod.", droppiong"); return;}
		if (!$mod){Debug::log("no positive mod possobile, DONE!"); return;}

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
		return min(25, round($dmg/30)*10);
	}
}

class Bridge extends PrimarySystem {
	public $name = "Bridge";
	public $display = "Command & Control";

	function __construct($id, $parentId, $mass, $output = 0, $effiency = 0, $destroyed = 0){
        parent::__construct($id, $parentId, $mass, $output, $effiency, $destroyed);
	}

	public function determineCrit($old, $new, $turn){
		return;
	}

	public function setArmourMod(){
		$this->armourMod = 1.5;
	}
}

class Reactor extends PrimarySystem {
	public $name = "Reactor";
	public $display = "Reactor & Power Grid";
	public $powerReq = 0;

	function __construct($id, $parentId, $mass, $output = 0, $effiency = 0, $destroyed = 0){
        parent::__construct($id, $parentId, $mass, $output, $effiency, $destroyed);
    }

    public function setOutput($add){
    	$this->output = $this->output + $add;
    }

	public function applyPowerSpike($turn, $overload){
		$mod = round(($overload / $this->output *100), 2);
		//d, $shipid, $systemid, $turn, $type, $duration, $value, $new){
		Debug::log("applyPowerSpike to #".$this->parentId.", spike: ".$overload.", output: ".$this->output."/ mod: ".$mod);
		$this->crits[] = new Crit(sizeof($this->crits)+1, $this->parentId, $this->id, $turn, "Output", 0, $mod, 1);	

	}
}

class Engine extends PrimarySystem {
	public $name = "Engine";
	public $display = "Engine & Drive";

	function __construct($id, $parentId, $mass, $output = 0, $destroyed = 0){
		$this->powerReq = ceil($output / 20);
		$this->boostEffect[] = new Effect("Output", 12);
        parent::__construct($id, $parentId, $mass, $output, ceil($this->powerReq/3), $destroyed);
    }
}

class Sensor extends PrimarySystem {
	public $name = "Sensor";
	public $display = "Sensor & Analyzing";
	public $ew = array();

	function __construct($id, $parentId, $mass, $output = 0, $effiency, $destroyed = 0){
		$this->powerReq = floor($output/60);
		$this->boostEffect[] = new Effect("Output", 10);
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

	function __construct($id, $parentId, $launchRate, $loads, $capacity, $destroyed = false){
		parent::__construct($id, $parentId, 0, $destroyed);
		$this->launchRate = $launchRate;
		$this->capacity = $capacity;
		$this->powerReq = floor($launchRate/3);
		$this->mass = $capacity*5;
		$this->integrity = $this->mass *2;


		for ($i = 0; $i < sizeof($loads); $i++){
			$fighter = new $loads[$i](0,0);
			$this->loads[] = array(
				"name" => $loads[$i],
				"amount" => 0,
				"cost" => $fighter::$value,
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