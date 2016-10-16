<?php


class Particle extends Weapon {
	public $type = "Particle";

	function __construct($id, $parentId, $start, $end, $output = 0){
        parent::__construct($id, $parentId, $start, $end, $output);
	}
}

class FusionCannon extends Particle {
	public $name = "FusionCannon";
	public $damage = 3;
	public $accDecay = 70;
	public $shots = 2;

	function __construct($id, $parentId, $start, $end, $output = 0){
        parent::__construct($id, $parentId, $start, $end, $output);
	}
}

?>