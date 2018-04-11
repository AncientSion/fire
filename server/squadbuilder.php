<?php

class SquadBuilder {

	function __construct(){
	}

	static function getEA(){
		return array(
			array(
				"active" => 0,
				"chance" => 40,
				"notes" => "3x Tethys",
				"units" =>
					array(
						array(
							"name" => "Tethys",
							"amount" => 1,
						),
						array(
							"name" => "Tethys",
							"amount" => 1,
						),
						array(
							"name" => "Tethys",
							"amount" => 1,
						),
					),
				"loads" =>
					array(),
			),
			array(
				"active" => 0,
				"chance" => 40,
				"notes" => "2x Crius",
				"units" =>
					array(
						array(
							"name" => "Crius",
							"amount" => 1,
						),
						array(
							"name" => "Crius",
							"amount" => 1,
						),
					),
				"loads" =>
					array()
			),
			array(
				"active" => 0,
				"chance" => 20,
				"notes" => "2x Hermes (AF)",
				"units" =>
					array(
						array(
							"name" => "Hermes",
							"amount" => 1,
						),
						array(
							"name" => "Hermes",
							"amount" => 1,
						),
					),
				"loads" =>
					array(
						array(
							"systemid" => 4,
							"name" => "Needle",
							"amount" => 4,
						),
						array(
							"systemid" => 8,
							"name" => "Needle",
							"amount" => 4,
						),
					),
			),
		);
	}

	static function getCR(){
		return array(
			array(
				"active" => 0,
				"chance" => 40,
				"notes" => "VorchanA Hunter (Torpedo)",
				"units" =>
					array(
						array(
							"name" => "VorchanA",
							"amount" => 1,
						),
						array(
							"name" => "VorchanA",
							"amount" => 1,
						),
					),
				"loads" =>
					array(
						array(
							"systemid" => 4,
							"name" => "Javelin",
							"amount" => 4,
						),
						array(
							"systemid" => 8,
							"name" => "Javelin",
							"amount" => 4,
						),
					),
			),
			array(
				"active" => 0,
				"chance" => 30,
				"notes" => "VorchanB (Assault)",
				"units" =>
					array(
						array(
							"name" => "VorchanB",
							"amount" => 1,
						),
						array(
							"name" => "VorchanB",
							"amount" => 1,
						),
						array(
							"name" => "VorchanB",
							"amount" => 1,
						),
					),
				"loads" =>
					array()
			),
			array(
				"active" => 0,
				"chance" => 30,
				"notes" => "Haven (Patrol)",
				"units" =>
					array(
						array(
							"name" => "Haven",
							"amount" => 1,
						),
						array(
							"name" => "Haven",
							"amount" => 1,
						),
					),
				"loads" =>
					array()
			),
		);
	}

	static function getMF(){
		return array(
			array(
				"active" => 0,
				"chance" => 30,
				"notes" => "2x White Star",
				"units" =>
					array(
						array(
							"name" => "WhiteStar",
							"amount" => 1,
						),
						array(
							"name" => "WhiteStar",
							"amount" => 1,
						),
					),
				"loads" =>
					array(),
			),
			array(
				"active" => 0,
				"chance" => 70,
				"notes" => "2x Torotha",
				"units" =>
					array(
						array(
							"name" => "Torotha",
							"amount" => 1,
						),
						array(
							"name" => "Torotha",
							"amount" => 1,
						),
					),
				"loads" =>
					array(),
			),
		);
	}

	static function getNR(){
		return array(
			array(
				"active" => 0,
				"chance" => 30,
				"notes" => "2x Thentus",
				"units" =>
					array(
						array(
							"name" => "Thentus",
							"amount" => 1,
						),
						array(
							"name" => "Thentus",
							"amount" => 1,
						),
					),
				"loads" =>
					array(),
			),
			array(
				"active" => 0,
				"chance" => 30,
				"notes" => "2x Trakk",
				"units" =>
					array(
						array(
							"name" => "Trakk",
							"amount" => 1,
						),
						array(
							"name" => "Trakk",
							"amount" => 1,
						),
					),
				"loads" =>
					array(),
			),
			array(
				"active" => 0,
				"chance" => 20,
				"notes" => "3x Shokos",
				"units" =>
					array(
						array(
							"name" => "Shokos",
							"amount" => 1,
						),
						array(
							"name" => "Shokos",
							"amount" => 1,
						),
						array(
							"name" => "Shokos",
							"amount" => 1,
						),
					),
				"loads" =>
					array(),
			),
			array(
				"active" => 0,
				"chance" => 20,
				"notes" => "2x Shokov",
				"units" =>
					array(
						array(
							"name" => "Shokov",
							"amount" => 1,
						),
						array(
							"name" => "Shokov",
							"amount" => 1,
						),
					),
				"loads" =>
					array(),
			),
		);
	}
}


?>