<?php

class Builder {

	function __construct(){
	}

	static function getEA(){
		return array(
			array(
				"active" => 0,
				"chance" => 50,
				"name" => "Tethys (Patrol)",
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
				"chance" => 50,
				"name" => "Crius (Escort)",
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
		);
	}

	static function getCR(){
		return array(
			array(
				"active" => 0,
				"chance" => 40,
				"name" => "Vorchan Hunter (Torpedo)",
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
				"name" => "Vorchan (Assault)",
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
				"name" => "Haven (Patrol)",
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
}


?>