<?php

class Flight extends Mixed {
	public $flight = true;
	public $unitType = "Flight";
	public $name = "Flight";
	public $display = "Flight";
	public $faction = false;
	public $baseSize = 30;
	public $unitSize = 5;

	public $fSize = 15;
	public $traverse = -3;

	function __construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes){
        parent::__construct($id, $userid, $available, $status, $destroyed, $x, $y, $facing, $delay, $thrust, $rolling, $rolled, $notes);
	}

	public function setMass(){
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->destroyed){
				$this->mass = max($this->mass, $this->structures[$i]->mass);
			}
		}
	}

	public function getMaxSpeed (){
		return $this->baseImpulse*4;
	}

	public function setCurrentImpulse($t, $p){
		//Debug::log("setCurrentImpulse #".$this->id);
		if (!$this->mass){$this->baseImpulse = 0; $this->currentImpulse = 0; return;}
		$this->baseImpulse = floor(pow($this->mass, -2.5)*600000);
		if (!isset($this->mission) || !sizeof($this->mission)){return;}

		$elapsed = 0;

		if ($this->available == $this->mission->turn){
			$elapsed++;
		} else $elapsed += 0.5;
		
		//if ($this->mission->type > 1 || !$this->mission->arrived){
		//var_export($this->mission);
		if (!$this->mission->arrived){
			$elapsed += $t - $this->mission->turn;
		}

		$this->currentImpulse = floor($this->baseImpulse * min(4, $elapsed + ($p > 1)));
	}

	public function setSize(){
		$alive = 0;
		for ($i = 0; $i < sizeof($this->structures); $i++){
			if (!$this->structures[$i]->destroyed){
				$alive++;
			}
		}
		$this->size = $this->baseSize + $this->unitSize * $alive;
	}

	public function getFireAngle($fire){
		return mt_rand(0, 359);
	}

	public function addMission($data, $userid, $turn, $phase){
		if ($this->userid == $userid){
			$this->mission = new Mission($data[sizeof($data)-1]);
		}
		else if ($phase == -1){
			for ($i = sizeof($data)-1; $i >= 0; $i--){
				if ($data[$i]["turn"] == $turn){continue;}
				$this->mission = new Mission($data[$i]);
				return;
			}
		} else $this->mission = new Mission($data[sizeof($data)-1]);
	}

	public function calculateToHit($fire){
		//return 100;
		$multi = 1;
		$req = 0;
		
		$base = $fire->target->getHitChance($fire);
		$traverse = 1-($fire->weapon->getTraverseMod($fire) * 0.2);
		
		$multi += $this->getOffensiveBonus($fire->target->id);
		$multi -= $fire->target->getDefensiveBonus($this->id);
		//Debug::log($multi);

		$req = $base * $multi * $traverse;
		//Debug::log("CALCULATE TO HIT - angle: ".$fire->angle.", base: ".$base.", trav: ".$traverse.", total multi: ".$multi.", dist/range: ".$fire->dist."/".$range.", req: ".$req);

		if ($fire->target->ship && $this->mission->targetid == $fire->target->id && $this->mission->arrived){
			Debug::log("strike flight attackign ship");
		}

		return ceil($req);
	}



	public function getLockEffect($target){
		if ($target->ship || $target->squad){
			return 0;
		}
		else if ($target->flight){
			return 1;
		}
		else if ($target->salvo){
			return 1;
		}
	}

	public function getMaskEffect($shooter){
		if ($shooter->ship || $shooter->squad){
			return 0.5;
		}
	}
}

?>