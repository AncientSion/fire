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
							"systemid" => 6,
							"name" => "Needle",
							"amount" => 4,
						),
						array(
							"systemid" => 10,
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
				"notes" => "Vorchan Hunter (Torpedo)",
				"units" =>
					array(
						array(
							"name" => "Vorchan",
							"amount" => 1,
						),
						array(
							"name" => "Vorchan",
							"amount" => 1,
						),
					),
				"loads" =>
					array(
						array(
							"systemid" => 5,
							"name" => "Javelin",
							"amount" => 5,
						),
						array(
							"systemid" => 9,
							"name" => "Javelin",
							"amount" => 5,
						),
					),
			),
			array(
				"active" => 0,
				"chance" => 30,
				"notes" => "Vorchora (Support)",
				"units" =>
					array(
						array(
							"name" => "Vorchora",
							"amount" => 1,
						),
						array(
							"name" => "Vorchora",
							"amount" => 1,
						),
						array(
							"name" => "Vorchora",
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
					array(
						array(
							"systemid" => 6,
							"name" => "Vran",
							"amount" => 6,
						),
						array(
							"systemid" => 7,
							"name" => "Vran",
							"amount" => 6,
						),
						array(
							"systemid" => 10,
							"name" => "Vran",
							"amount" => 6,
						),
						array(
							"systemid" => 11,
							"name" => "Vran",
							"amount" => 6,
						),
					),
			),
		);
	}
}


?>