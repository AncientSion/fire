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
				"display" => "",
				"cost" => 700,
				"launchData" => 
					array(
						"loads" =>
							array(
								array(
									"name" => "Tethys",
									"launch" => 1,
								),
								array(
									"name" => "Tethys",
									"launch" => 1,
								),
								array(
									"name" => "Tethys",
									"launch" => 1,
								),
							),
						),
						"loads" =>
							array(),
			),
			array(
				"active" => 0,
				"chance" => 40,
				"notes" => "2x Crius",
				"display" => "",
				"cost" => 550,
				"launchData" => 
					array(
						"loads" =>
							array(
								array(
									"name" => "Crius",
									"launch" => 1,
								),
								array(
									"name" => "Crius",
									"launch" => 1,
								),
							),
							),
						"loads" =>
							array()
			),
			array(
				"active" => 0,
				"chance" => 20,
				"notes" => "Tethys/Crius patrol unit)",
				"display" => "",
				"cost" => 500,
				"launchData" => 
					array(
						"loads" =>
							array(
								array(
									"name" => "Tethys",
									"launch" => 1,
								),
								array(
									"name" => "Crius",
									"launch" => 1,
								),
							),
							),
						"loads" =>
							array()
			),
		);
	}

	static function getCR(){
		return array(
			array(
				"active" => 0,
				"chance" => 40,
				"notes" => "Vorchan Hunter (Torpedo)",
				"display" => "",
				"cost" => 700,
				"launchData" => 
					array(
						"loads" =>
							array(
								array(
									"name" => "Vorchan",
									"launch" => 1,
								),
								array(
									"name" => "Vorchan",
									"launch" => 1,
								),
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
				"notes" => "Vorchan (Assault)",
				"display" => "",
				"cost" => 1000,
				"launchData" => 
					array(
						"loads" =>
							array(
								array(
									"name" => "Vorchan",
									"launch" => 1,
								),
								array(
									"name" => "Vorchan",
									"launch" => 1,
								),
								array(
									"name" => "Vorchan",
									"launch" => 1,
								),
							),
						),
						"loads" =>
							array()
			),
			array(
				"active" => 0,
				"chance" => 30,
				"notes" => "Haven (Patrol)",
				"display" => "",
				"cost" => 500,
				"launchData" => 
					array(
						"loads" =>
							array(
								array(
									"name" => "Haven",
									"launch" => 1,
								),
								array(
									"name" => "Haven",
									"launch" => 1,
								),
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
				"display" => "",
				"cost" => 800,
				"launchData" => 
					array(
						"loads" =>
							array(
								array(
									"name" => "WhiteStar",
									"launch" => 1,
								),
								array(
									"name" => "WhiteStar",
									"launch" => 1,
								),
							),
						),
						"loads" =>
							array(),
			),
			array(
				"active" => 0,
				"chance" => 70,
				"notes" => "2x Torotha",
				"display" => "",
				"cost" => 700,
				"launchData" => 
					array(
						"loads" =>
							array(
								array(
									"name" => "Torotha",
									"launch" => 1,
								),
								array(
									"name" => "Torotha",
									"launch" => 1,
								),
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
				"display" => "",
				"cost" => 580,
				"launchData" => 
					array(
						"loads" =>
							array(
								array(
									"name" => "Thentus",
									"launch" => 1,
								),
								array(
									"name" => "Thentus",
									"launch" => 1,
								),
							),
						),
						"loads" =>
							array(),
			),
			array(
				"active" => 0,
				"chance" => 30,
				"notes" => "2x Trakk",
				"display" => "",
				"cost" => 580,
				"launchData" => 
					array(
						"loads" =>
							array(
								array(
									"name" => "Trakk",
									"launch" => 1,
								),
								array(
									"name" => "Trakk",
									"launch" => 1,
								),
							),
						),
						"loads" =>
							array(),
			),
			array(
				"active" => 0,
				"chance" => 20,
				"notes" => "3x Shokos",
				"display" => "",
				"cost" => 750,
				"launchData" => 
					array(
						"loads" =>
							array(
								array(
									"name" => "Shokos",
									"launch" => 1,
								),
								array(
									"name" => "Shokos",
									"launch" => 1,
								),
								array(
									"name" => "Shokos",
									"launch" => 1,
								),
							),
						),
						"loads" =>
							array(),
			),
			array(
				"active" => 0,
				"chance" => 20,
				"notes" => "2x Shokov",
				"display" => "",
				"cost" => 560,
				"launchData" => 
					array(
						"loads" =>
							array(
								array(
									"name" => "Shokov",
									"launch" => 1,
								),
								array(
									"name" => "Shokov",
									"launch" => 1,
								),
							),
						),
						"loads" =>
							array(),
			),
		);
	}
}


?>