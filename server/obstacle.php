<?php 

class Obstacle extends Minor {
	public $obstacle = 1;
	public $traverse = 10;
	public $density = 0;
	public $interference = 0;
	public $collision = 0;
	public $rockSize = 0;
	public $systems = array();
	public $critEffects = array();
	public $faction = "Neutral";

	function __construct($data = false){
        parent::__construct($data);
	}

		
    /*    $this->size = $data["delay"];
        $this->density = $data["rolling"];
        $this->rockSize = $data["rolled"];
        $this->scale = $data["flipped"];
        $this->interference = round($this->density * 0.8);
        $this->collision = round($this->density / 30 * ($this->curImp ? $this->curImp : 30));
	*/


	public function addPrimary(){
		$this->primary = new Shared($this->getId());
		if ($this->collision){
			$this->primary->systems[] = new AsteroidRam($this->getId(), $this->id, $this->minDmg, $this->maxDmg, 5);
		}
	}

	public function getDeployState($turn){
		//Debug::log("getDeployState for ".$this->id.", destroyed: ".$this->destroyed);
		return $this->getEndState($turn);
	}

	public function getEndState($turn){

		//Debug::log("getEndState for ".$this->id.", destroyed: ".$this->destroyed);

		$x = sizeof($this->actions) ? $this->actions[sizeof($this->actions)-1]->x : $this->x;
		$y = sizeof($this->actions) ? $this->actions[sizeof($this->actions)-1]->y : $this->y;

		return array(
			"id" => $this->id,
			"destroyed" => 0,
			"withdraw" =>  0,
			"manual" =>  0,
			"x" => $x,
			"y" => $y,
			"heading" => 0,
			"facing" =>  0,
			"thrust" => 0,
			"delay" => 0,
			"rolling" => 0,
			"rolled" => 0,
			"flipped" => 0,
			"status" => $this->status,
			"notes" => $this->notes,
		);
	}
	
	public function addAllSystems(){
		$this->addPrimary();
		$this->addStructures();
	}

	public function addStructures(){
		return;
	}

	public function getSystem($id){
		for ($i = 0; $i < sizeof($this->primary->systems); $i++){
			if ($this->primary->systems[$i]->id == $id){
				return $this->primary->systems[$i];
			}
		}
		return false;

		for ($i = 0; $i < sizeof($this->structures); $i++){
			if ($this->structures[$i]->id == $id){
				return $this->structures[$i];
			}
			for ($j = 0; $j < sizeof($this->structures[$i]->systems); $j++){
				if ($this->structures[$i]->systems[$j]->id == $id){
					return $this->structures[$i]->systems[$j]->getActiveSystem();
				}
			}
		}
	}
	
	public function setUnitState($turn, $phase){
		$this->isDestroyed();
	}

	public function isDestroyed(){
		return false;
	}

	public function setMove(){
		Debug::log("**** setMove ".get_class($this)." #".$this->id);
		if ($this->moveSet){return;}

		$origin = $this->getCurPos();
		$speed = $this->getCurSpeed();
		$angle = $this->getActualHeading();
		$target = Math::getPointInDirection($speed, $angle, $origin->x, $origin->y);

		$move = new Move(-1, $this->id, Manager::$turn, "move", 0, $speed, $target->x, $target->y, 0, 0, 0, 0, 0, 1, 1);
		$this->actions[] = $move;
		$this->moveSet = 1;
	}

	public function doTestCrits($turn){
		return;
	}

	public function getNewDamages($turn){
		return array();
	}

	public function getNewCrits($turn){
		return array();
	}
}


class AsteroidField extends Obstacle {	
	public $name = "AsteroidField";
	public $display = "Asteroid Field";

	function __construct($data = false){
		parent::__construct($data);
        $arr = explode(";", $this->notes);
        $this->size = $arr[0];
        $this->density = $arr[1];
        $this->rockSize = $arr[2];
        $this->minDmg = $arr[3];
        $this->maxDmg = round($this->minDmg * 1.3);

      	$this->interference = round($this->density * 1.0);
      	$this->collision = round($this->density * 1.0);
	}
}

class NebulaCloud extends Obstacle {	
	public $name = "NebulaCloud";
	public $display = "Nebula Cloud";

	function __construct($data = false){
		parent::__construct($data);
        $arr = explode(";", $this->notes);
        $this->size = $arr[0];
        $this->density = $arr[1];

      	$this->interference = round($this->density * 1.0);
	}
}
?>