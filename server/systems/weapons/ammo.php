<?php

class Ammo extends Weapon {
	public $id;
	public $userid;
	public $classname;
	public $maxLaunch;
	public $impulse;
	public $amount;
	public $actions = array();
	public $fireid;
	public $integrity;
	public $armour;
	public $damages = array();
	public $fire;
	public $mass;
	public $destroyed;
	public $shots;
	public $type;

	function __construct($id, $userid, $fireid, $amount, $destroyed){
		$this->id = $id;
		$this->userid = $userid;
		$this->fireid = $fireid;
		$this->amount = $amount;
		$this->destroyed = $destroyed;
        parent::__construct($id, $parentId, $output, $destroyed);
	}

	public function doDamage($fire){
		Debug::log("BALLISTIC DO DAMAGE");
        parent::doDamage($fire);
	}

	public function getPosition(){
		return new Point($this->actions[sizeof($this->actions)-1]->x, $this->actions[sizeof($this->actions)-1]->y);
	}	

	public function getTrajectory(){
		return new Point($this->actions[sizeof($this->actions)-2]->x, $this->actions[sizeof($this->actions)-2]->y);
	}

	public function resolveFireOrder($fire){
		Debug::log("resolveFireOrder ID ".$fire->id.", shooter: ".$fire->shooterid." vs ".$fire->targetid.", w: ".$fire->weaponid);

		$fire->dist = $this->getHitDist($fire);
		$fire->angleIn = $this->getHitAngle($fire);
		$fire->profile = $this->getHitChance($fire);
		$rangeLoss = $fire->weapon->getAccLoss($fire->dist);
		$fire->req = $fire->profile - $rangeLoss;

		$fire = $fire->weapon->rollForHit($fire);

		if ($fire->hits){
			$fire = $this->getHitSystem($fire);
			$fire = $fire->weapon->doDamage($fire);
		}
		return $fire;
	}

	public function getHitDist($fire){
		$tPos = $this->getPosition();
		$sPos = $fire->shooter->getPosition();		
		return Math::getDist($tPos->x, $tPos->y,  $sPos->x, $sPos->y);
	}

	public function getHitAngle($fire){
		$tPos = $this->getPosition();
		$sPos = $fire->shooter->getPosition();
		$angle = Math::getAngle($tPos->x, $tPos->y, $sPos->x, $sPos->y);
		return $angle;
	}

	public function getHitChance($fire){
		return 70;
	}

	public function getRangeLossMultiplier($dist){
		return sqrt(10-$this->mass);
	}

	public function getHitSystem($fire){
		for ($i = 1; $i <= $fire->hits; $i++){
			$pick = mt_rand(1, $this->amount);
			$fire->hitSystem[$i-1] = $pick;
		}
		return $fire;
	}

	public function willBeDestroyed($i, $amount = 0){
		$left = $this->integrity;
		foreach ($this->damages as $dmg){
			if ($dmg->systemid == $i){
				$left -= $dmg->structDmg;
			}
		}
		//Debug::log("pick: ".$i." rem Health: ".$left." - ".$amount);
		if ($left - $amount > 0){
			return false;
		}
		else return true;
	}

	public function applyDamage($damage){
		if ($this->willBeDestroyed($damage->systemid, $damage->structDmg)){
			//Debug::log("destroyed!");
			$damage->destroyed = true;
		}
		$this->damages[] = $damage;
		return;
	}

	public function getSalvoStatus(){
		Debug::log("getSalvoStatus");
		$status = array();
		$amount = $this->amount;

		for ($i = 0; $i < $amount; $i++){
			$status[] = 0;
		}

		for ($j = sizeof($this->damages)-1; $j >= 0; $j--){
			if ($this->damages[$j]->destroyed){
				$status[$this->damages[$j]->systemid-1] = 1;
			}
		}
		return $status;
	}

	public function resolveImpact($status){
		Debug::log("resolveImpact");
		for ($i = 0; $i < sizeof($status); $i++){
			if ($status[$i] == 0){
				$this->shots++;
			}
		}

		$this->fire->shooter = $this;
		$this->fire->weapon = $this;
		$this->fire->target->resolveBallisticFireOrder($this->fire);
	}

	public function rollForHit($fire){
		$hits = 0;
		$notes = "";

		for ($j = 0; $j < $this->shots; $j++){
			$fire->rolls[] = 1;
			$hits++;
		}

		$fire->hits = $hits;
		return $fire;
	}
}

class BallisticTorpedo extends Ammo {
	public $classname = "BallisticTorpedo";
	public $type = "explosive";
	public $minDmg = 45;
	public $maxDmg = 60;
	public $maxDist = 1200;
	public $impulse = 300;
	public $actions = array();
	public $integrity = 30;
	public $armour = 10;
	public $damages = array();
	public $mass = 3;

	function __construct($id = 0, $userid, $fireid = 0, $amount = 1, $destroyed = 0){
		parent::__construct($id, $userid, $fireid, $amount, $destroyed);
	}


}

?>