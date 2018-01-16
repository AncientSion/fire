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
					"chance" => 80,
					"name" => "Vorchan Hunter (Torpedo)",
					"cost" => 650,
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
					"chance" => 10,
					"name" => "Vorchan (Assault)",
					"cost" => 800,
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
					"chance" => 10,
					"name" => "Haven (Patrol)",
					"cost" => 200,
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