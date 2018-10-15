<?php 

class Obstacle extends Mixed {
	
	public $name = "Obstacle";
	public $display = "Asteroid Swarm";
	public $obstacle = 1;
	public $traverse = 10;
	public $block = 0;
	public $collision = 0;

	function __construct($data = false){
        parent::__construct($data);
        $this->size = $data["delay"];
        $this->block = $data["rolling"];
        $this->collision = $data["rolled"];
	}

	function addAllSystems(){
		$this->addStructures();
	}

	public function addStructures(){
		$amount = ceil(20 * $this->size / 4 * $this->block / 250 * $this->collision) / 100;
		for ($i = 1; $i <= $amount; $i++){
			$this->structures[] = new Asteroid($this->size, $amount);
		}
	}
	
	public function setUnitState($turn, $phase){
		$this->isDestroyed();
	}

	public function isDestroyed(){
		return false;
	}

	public function setMove(&$gd){
		//Debug::log("**** setMove ".$this->id);
		if ($this->moveSet){return;}

		$origin = $this->getCurPos();
		$speed = $this->getCurSpeed();
		$angle = $this->getCurFacing();
		$target = Math::getPointInDirection($speed, $angle, $origin->x, $origin->y);

		$move = new Action(-1, $this->id, $gd->turn, "move", 0, $speed, $target->x, $target->y, 0, 0, 0, 0, 1, 1);
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

	public function getEndState($turn){
		return array(
			"id" => $this->id,
			"destroyed" => $this->destroyed,
			"withdraw" => $this->withdraw,
			"manual" => $this->manual,
			"x" => $this->actions[sizeof($this->actions)-1]->x,
			"y" => $this->actions[sizeof($this->actions)-1]->y,
			"facing" => $this->facing,
			"thrust" => $this->getCurSpeed(),
			"delay" => $this->size,
			"rolling" => $this->block,
			"rolled" => $this->collision,
			"flipped" => $this->flipped,
			"status" => $this->status,
			"notes" => "",
		);
	}
}

class Asteroid {
	public $size;
	public $layout;
	public $systems = array();
	public $crits = array();

	function __construct($parentSize, $amount){
		$this->size = mt_rand(10, 30) / 100 * $parentSize;
	}
}
?>