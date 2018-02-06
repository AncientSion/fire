<?php

class DmgCalc {

	public static function doDmg($fire, $roll, $system){
		switch ($fire->weapon->fireMode){
			case "Standard": return static::doStandardDmg($fire, $roll, $system);
			case "Pulse": return static::doPulseDmg($fire, $roll, $system);
			case "Laser": return static::doLaserDmg($fire, $roll, $system);
		}
	}

	public static function doStandardDmg($fire, $roll, $system){
		//Debug::log("hitting: ".get_class($system));
		$destroyed = 0;
		$totalDmg = $fire->weapon->getTotalDamage($fire);
		$okSystem = 0;
		$remInt = $system->getRemainingIntegrity();
		
		$negation = $fire->target->getArmour($fire, $system);
		
		$dmg = static::determineDmg($fire->weapon, $totalDmg, $negation);
		$dmg = $system->setMaxDmg($fire, $dmg);

		Debug::log("fire #".$fire->id.", doDamage, weapon: ".(get_class($fire->weapon)).", target #".$fire->target->id."/".$system->id."/".get_class($system).", totalDmg: ".$totalDmg.", remaining: ".$remInt.", armour: ".$negation["stock"]."+".$negation["bonus"]);

		if ($remInt - $dmg->structDmg < 1){
			$destroyed = 1;
			$name = get_class($system);
			$okSystem = $fire->target->getOverKillSystem($fire);

			if ($okSystem){
				$dmg->overkill += abs($remInt - $dmg->structDmg);
				$dmg->structDmg = $remInt;
				Debug::log(" => OVERKILL ship target system ".$name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->structDmg.", OK for: ".$dmg->overkill." dmg");
			}
			else {
				Debug::log(" => destroying non-ship target system ".$name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->structDmg);
			}
		}

		$entry = new Damage(
			-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $roll, $fire->weapon->type,
			$totalDmg, $dmg->shieldDmg, $dmg->structDmg, $dmg->armourDmg, $dmg->overkill, array_sum($negation), $destroyed, $dmg->notes, 1
		);
		$fire->target->applyDamage($entry);	
	}

	public static function doPulseDmg($fire, $roll, $system){
		$destroyed = 0;
		$totalDmg = $fire->weapon->getTotalDamage($fire);
		$remInt = $system->getRemainingIntegrity();
		$okSystem = 0;

		$negation = $fire->target->getArmour($fire, $system);
		$dmg = DmgCalc::determineDmg($fire->weapon, $totalDmg, $negation);

		$total = 0;
		$shield = 0;
		$struct = 0;
		$armour = 0;

		$name = get_class($system);

		$hits = $fire->weapon->basePulses + min($fire->weapon->extraPulses, floor(($fire->req - $fire->rolls[sizeof($fire->rolls)-1]) / $fire->weapon->grouping));

		Debug::log("fire #".$fire->id.", doDamage, weapon: ".(get_class($fire->weapon)).", target #".$fire->target->id."/".$system->id."/".$name.", hits: ".$hits.", totalDmg: ".$totalDmg.", remaining: ".$remInt.", armour: ".$negation["stock"]."+".$negation["bonus"]);

		for ($i = 0; $i < $hits; $i++){

			if ($destroyed){
				$total += $totalDmg;
				$dmg->overkill += $dmg->structDmg;
				$armour += $dmg->armourDmg;
				//Debug::log(" => hit ".($i+1).", adding ".$dmg->structDmg."/".$dmg->armourDmg." to overkill which is now: ".$dmg->overkill." pts");
				continue;
			}
			else {
				//Debug::log("adding hit ".($i+1));
				$total += $totalDmg;
				$struct += $dmg->structDmg;
				$armour += $dmg->armourDmg;
			}

			if ($struct >= $remInt){
				$destroyed = 1;
				$okSystem = $fire->target->getOverKillSystem($fire);

				if ($okSystem){
					//$dmg->overkill += abs($remInt - $dmg->structDmg);
					$dmg->overkill += abs($remInt - $struct);
					$struct -= $dmg->overkill;
					Debug::log(" => hit ".($i+1)." DESTROYING ship target system ".$name." #".$system->id.", rem: ".$remInt.", doing TOTAL: ".$struct."/".$armour.", OK for: ".$dmg->overkill." dmg");
					//$struct += $remInt;
				}
				else {
					//Debug::log(" => DESTROYING non-ship target system");
					break;
				}
			}
		}

		$dmg->structDmg = $struct;
		$dmg->armourDmg = $armour;
		$dmg->shieldDmg = $shield;

		$dmg = $system->setMaxDmg($fire, $dmg);

		$entry = new Damage(
			-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $roll, $fire->weapon->type,
			$total, $dmg->shieldDmg, $dmg->structDmg, $dmg->armourDmg, $dmg->overkill, array_sum($negation), $destroyed, $dmg->notes, 1
		);
		$fire->target->applyDamage($entry);
	}

	public static function doLaserDmg($fire, $roll, $system){
		$totalDmg = $fire->weapon->getTotalDamage($fire);
		$okSystem = 0;
		$rakes = $fire->weapon->rakes;
		$counter = 1 + (($rakes -1) * $fire->target instanceof Mixed);
		$systems = array();
		$entry;

		$print = "hitting --- ";
		if ($totalDmg <= 0){return;}
			
		$rake = floor($totalDmg / $fire->weapon->rakes);
		Debug::log("fire #".$fire->id.", doDamage, weapon: ".get_class($fire->weapon).", target: ".$fire->target->id." for ".$totalDmg." dmg");

		while ($rakes){
			if ($fire->target->ship){
				if ($rakes < $fire->weapon->rakes){$system = $fire->target->getHitSystem($fire);}

				for ($i = 0; $i < sizeof($systems); $i++){
					if ($systems[$i] == $system->id){Debug::log("Laser DOUBLE HIT, switching to PRIMARY");$system = $fire->target->primary;}
				}
				if ($system->id > 1){$systems[] = $system->id;}
			}

			$print .= " ".get_class($system)."/".$system->id.": ".$rake." dmg, ";
			$destroyed = 0;
			$remInt = $system->getRemainingIntegrity();
			$negation = $fire->target->getArmour($fire, $system);

			$dmg = DmgCalc::determineDmg($fire->weapon, $rake, $negation);
			$dmg = $system->setMaxDmg($fire, $dmg);
			
			$rakes -= $counter;

			if ($remInt - $dmg->structDmg < 1){
				$destroyed = 1;
				$name = get_class($system);
				$okSystem = $fire->target->getOverKillSystem($fire);

				if ($okSystem){
					$dmg->overkill += abs($remInt - $dmg->structDmg);
					$dmg->structDmg = $remInt;
					Debug::log(" => OVERKILL ship target system ".$name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->structDmg.", OK for: ".$dmg->overkill." dmg");
				}
				else {
					Debug::log(" => destroying non-ship target system ".$name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->structDmg);
					$rakes = 0;
				}
			}

			if (!$fire->target->squad || $rakes == $fire->weapon->rakes-1){
				$entry = new Damage(
					-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $roll, $fire->weapon->type,
					$totalDmg, $dmg->shieldDmg, $dmg->structDmg, $dmg->armourDmg, $dmg->overkill, array_sum($negation), $destroyed, $dmg->notes, 1
				);
			}

			if (!$fire->target->squad || !$rakes){
				$fire->target->applyDamage($entry);
			}
			else if ($rakes){
				$entry->shieldDmg += $dmg->shieldDmg; $entry->structDmg += $dmg->structDmg; $entry->armourDmg += $dmg->armourDmg; $entry->destroyed = $destroyed;
			}
		}
		//Debug::log($print);
	}



	public static function determineDmg($weapon, $totalDmg, $negation){
		switch ($weapon->dmgType){
			case "Standard": return static::determineStandardDmg($weapon, $totalDmg, $negation);
			case "Matter": return static::determineMatterDmg($weapon, $totalDmg, $negation);
			case "Plasma": return static::determinePlasmaDmg($weapon, $totalDmg, $negation);
		}
	}

	public static function determineStandardDmg($weapon, $totalDmg, $negation){
		$shieldDmg = 0;
		$armourDmg = 0;
		$structDmg = 0;
		$notes = "";

		if ($totalDmg <= array_sum($negation)){ 
			$notes = "b;";
			$shieldDmg = round(min($totalDmg, $negation["bonus"]));
			$armourDmg = round(min($totalDmg-$shieldDmg, $negation["stock"])/2);
		}
		else {
			$notes = "p;";
			$shieldDmg = round(min($totalDmg, $negation["bonus"]));
			$armourDmg = round(min($totalDmg-$shieldDmg, $negation["stock"]));
			$structDmg = round($totalDmg - $shieldDmg - $armourDmg);
		}

		return new Divider($shieldDmg * $weapon->linked, $armourDmg * $weapon->linked, $structDmg * $weapon->linked, $notes);
	}

	public static function determineMatterDmg($weapon, $totalDmg, $negation){
		$shieldDmg = 0;
		$armourDmg = 0;
		$structDmg = 0;
		$notes = "";

		if ($totalDmg <= array_sum($negation)){ 
			$notes = "b;";
			$armourDmg = round($totalDmg/2);
		}
		else {
			$notes = "p;";
			$shieldDmg = round(min($totalDmg, $negation["bonus"]/2));
			$armourDmg = round(min($totalDmg-$shieldDmg, $negation["stock"]/2));
			$structDmg = round($totalDmg - $shieldDmg - $armourDmg);
		}
		
		return new Divider($shieldDmg * $weapon->linked, $armourDmg * $weapon->linked, $structDmg * $weapon->linked, $notes);
	}

	public static function determinePlasmaDmg($weapon, $totalDmg, $negation){
		$shieldDmg = 0;
		$armourDmg = 0;
		$structDmg = 0;
		$notes = "";

		if ($totalDmg <= array_sum($negation)){ 
			$notes = "block;";
			$armourDmg = round($totalDmg);
		}
		else {
			$notes = "pen;";
			$shieldDmg = round(min($totalDmg, $negation["bonus"]));
			$armourDmg = round(min($totalDmg-$shieldDmg, $negation["stock"]));
			$structDmg = round($totalDmg - $shieldDmg - $armourDmg);
			$armourDmg += floor($totalDmg / 100 * $weapon->melt);
		}

		return new Divider($shieldDmg * $weapon->linked, $armourDmg * $weapon->linked, $structDmg * $weapon->linked, $notes);
	}
}





class Builder {

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
}


?>