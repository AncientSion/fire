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
	public $points = array();
	public $height = 0;
	public $width = 0;
	public $imageId = 0;
	public $rota= 0;

	function __construct($data = false){
        parent::__construct($data);
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
        $this->density = $arr[1];
        $this->rota = $arr[2];
        $w = $arr[3];
        $h = $arr[4];
        $this->rockSize = $arr[5];
        $this->minDmg = $arr[6];
        $this->maxDmg = round($this->minDmg * 1.3);
        $this->height = $h;
        $this->width = $w;

        $b = Math::getPointInDirection($h, $this->rota, $this->x, $this->y);
        $c = Math::getPointInDirection($w, $this->rota-90, $b->x, $b->y);
        $d = Math::getPointInDirection($h, $this->rota+180, $c->x, $c->y);

		$this->points[] = new Point($this->x, $this->y);
        $this->points[] = $b;
        $this->points[] = $c;
        $this->points[] = $d;

        $this->size = 100;

        $this->x = ($this->points[0]->x + $this->points[2]->x) / 2;
        $this->y = ($this->points[0]->y + $this->points[2]->y) / 2;
	}

	public function addPrimary(){

        $avgRockSize = 3;
        $avgDensity = 20;
      //  $attacks = round($this->density * $avgRockSize / $this->rockSize / 5));

		$attacks = round(6 / 20 * $this->density * (1 + 0.25 * (3 - $this->rockSize)));

      	$this->collision = round(100 / $avgRockSize * $this->rockSize / $avgDensity * $this->density / 10);
		$this->interference = round($this->density / 2);
		
		$this->primary = new Shared($this->getId());
		$this->primary->systems[] = new AsteroidRam($this->getId(), $this->id, $this->minDmg, $this->maxDmg, $attacks);
	}

	public function testObstruction($oPos, $tPos){
		//Debug::log("testObstruction on ".get_class($this)." #".$this->id);
		$test = Math::lineRectIntersect($oPos, $tPos, $this->points);
		$dist = 0;

		if (sizeof($test)){
			if (sizeof($test) == 2){
				$dist = Math::getDist($test[0], $test[1]);
			}
			else {
				if ($test[0]->type == 0){ //in
					$dist = Math::getDist($test[0], $tPos);
				}
				else $dist = Math::getDist($oPos, $test[0]);
			}
		}
		else if (Math::isWithinRect($oPos, $this->points) && Math::isWithinRect($tPos, $this->points)){
			$dist = Math::getDist($oPos, $tPos);
		}

		return $dist;
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
        $this->rota = $arr[2];
        $this->imageId = $arr[3];
      	$this->interference = round($this->density * 1);
	}

	public function addPrimary(){
		$this->primary = new Shared($this->getId());
	}

	public function testObstruction($oPos, $tPos){
		//Debug::log("testObstruction on ".get_class($this)." #".$this->id);
		$test = Math::lineCircleIntersect($oPos, $tPos, $this->getCurPos(), $this->size/2);
		$dist = 0;

		if (sizeof($test)){
			if (sizeof($test) == 2){
				$dist = Math::getDist($test[0], $test[1]);
			}
			else {
				if ($test[0]->type == 0){ //in
					$dist = Math::getDist($test[0], $tPos);
				}
				else $dist = Math::getDist($oPos, $test[0]);
			}
		}
		else $dist = Math::isWithinCircle($oPos, $tPos, $this);
		
		return $dist;
	}
}
?>
