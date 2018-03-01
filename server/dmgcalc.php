<?php

class DmgCalc {

	public static function createAreaFireOrders($gd, $fire){
		Debug::log("createAreaFireOrders");

		$origin = new Point($fire->shooter->x, $fire->shooter->y);
		$target = new Point($fire->x, $fire->y);
		$dist = floor(Math::getDist2($origin, $target));

		if ($fire->weapon->deviate){
			$maxDevi = $dist / 100 * $fire->weapon->accDecay / 10;
			$devi = mt_rand(0, $maxDevi);
			$angle = mt_rand(0, 360);
			$impact = Math::getPointInDirection($devi, $angle, $target->x, $target->y);
			$fire->notes = $impact->x.";".$impact->y.";";
			Debug::log("dist: ".$dist.", maxDevi: ".$maxDevi."px, devi: ".$devi."px, angle: ".$angle);
		}
		else {
			$impact = $target;
			$angle = getAngle2($origin, $target);
		}

		//Debug::log("newTarget ".$newTarget->x."/".$newTarget->y);
		

		//$newTarget = new Point(-50, -160);
		//$fire->notes = $newTarget->x.";".$newTarget->y.";";


		$newFires = array();

		for ($i = 0; $i < sizeof($gd->ships); $i++){
			$d = Math::getDist2($gd->ships[$i]->getCurPos(), $impact);
			//Debug::log("eMine impact distance to ".$gd->ships[$i]->name." #".$gd->ships[$i]->id.": ".$d);

			if ($d + $fire->weapon->aoe <= $fire->weapon->aoe*2){
				$a = round(Math::addAngle($gd->ships[$i]->getCurFacing() - $gd->ships[$i]->facing, Math::getAngle2($gd->ships[$i]->getCurPos(), $impact)));
				//var_export($newTarget);var_export($gd->ships[$i]->x);var_export($gd->ships[$i]->y);
				//Debug::log("hitting, dist to impact: ".$d.", impact from: ".$a);

				$subFire = new FireOrder(
					$fire->id, 0, $gd->turn, $fire->shooterid, $gd->ships[$i]->id, $impact->x, $impact->y, $fire->weapon->id, $fire->shots, 0, "", 1, 0
				);

				$subFire->cc = 0;
				$subFire->dist = $d;
				$subFire->angle = $a;
				$subFire->target = $gd->ships[$i];
				$subFire->weapon = $fire->weapon;
				$newFires[] = $subFire;
			}
		}
		return $newFires;
	}

	public static function determineDmg($weapon, $totalDmg, $negation){
		switch ($weapon->dmgType){
			case "Standard": return static::determineStandardDmg($weapon, $totalDmg, $negation);
			case "Matter": return static::determineMatterDmg($weapon, $totalDmg, $negation);
			case "Plasma": return static::determinePlasmaDmg($weapon, $totalDmg, $negation);
			case "EM": return static::determineEMDmg($weapon, $totalDmg, $negation);
			default: Debug::log("determineDmg ERROR"); break;
		}
	}

	public static function doDmg($fire, $roll, $system){
		switch ($fire->weapon->fireMode){
			case "Standard": static::doStandardDmg($fire, $roll, $system); break;
			case "Ballistic": static::doStandardDmg($fire, $roll, $system); break;
			case "Pulse": static::doPulseDmg($fire, $roll, $system); break;
			case "Laser": static::doLaserDmg($fire, $roll, $system); break;
			case "Flash": static::doFlashDmg($fire, $roll, $system); break;
			default: Debug::log("doDmg ERROR"); break;
		}

		$fire->weapon->postDmg($fire);
	}


	public static function doFlashDmg($fire, $roll, $system){
		$totalDmg = $fire->weapon->getTotalDamage($fire);
		$toDo = $totalDmg;
		if ($fire->target->ship){$system = $fire->target->getFlashOverkillSystem($fire);}

		while ($toDo){
			$push = false;
			$destroyed = 0;
			$remInt = $system->getRemIntegrity();
			$negation = $fire->target->getArmour($fire, $system);
			$dmg = static::determineDmg($fire->weapon, $toDo, $negation);
			$name = get_class($system);

			Debug::log("fire #".$fire->id.", doFlashDmg, weapon: ".(get_class($fire->weapon)).", target #".$fire->target->id."/".$system->id."/".$name.", totalDmg: ".$totalDmg.", remaining: ".$remInt.", armour: ".$negation["stock"]."+".$negation["bonus"]);

			if ($remInt - $dmg->structDmg < 1){ // destroy system
				Debug::log(" => destroying target system ".$name." #".$system->id.", rem: ".$remInt.", doing: ".$dmg->structDmg);
				$destroyed = 1;
				$dmg->structDmg = $remInt;
				$push = true;
			}
			else if ($toDo){ // no dmg left
				Debug::log("dmg depleted");
				$push = true;
			}

			if ($push){
				$toDo -= $dmg->shieldDmg; 
				$toDo -= $dmg->armourDmg; 
				$toDo -= $dmg->structDmg; 
				$toDo -= $dmg->emDmg;
				$fire->hits++;
				
				$entry = new Damage(
					-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $roll, $fire->weapon->type,
					$totalDmg, $dmg->shieldDmg, $dmg->structDmg, $dmg->armourDmg, $dmg->emDmg, $dmg->overkill, array_sum($negation), $destroyed, $dmg->notes, 1
				);

				$fire->damages[] = $entry;
				$fire->target->applyDamage($entry);	

				if ($toDo){
					$system = $fire->target->getFlashOverkillSystem($fire);
					if ($system){Debug::log("next target: ".$system->name);}
					else {Debug::log("FLASH to primary, EXIT"); return;}
				}
			}
		}
	}

	public static function doStandardDmg($fire, $roll, $system){
		//Debug::log("hitting: ".get_class($system));
		$destroyed = 0;
		$totalDmg = $fire->weapon->getTotalDamage($fire);
		$okSystem = 0;
		$remInt = $system->getRemIntegrity();
		
		$negation = $fire->target->getArmour($fire, $system);
		
		$dmg = static::determineDmg($fire->weapon, $totalDmg, $negation);
		$dmg = $system->setMaxDmg($fire, $dmg);

		Debug::log("fire #".$fire->id.", doStandardDmg, weapon: ".(get_class($fire->weapon)).", target #".$fire->target->id."/".$system->id."/".get_class($system).", totalDmg: ".$totalDmg.", remaining: ".$remInt.", armour: ".$negation["stock"]."+".$negation["bonus"]);

		if ($remInt - $dmg->structDmg < 1){
			$destroyed = 1;
			$name = get_class($system);
			$okSystem = $fire->target->getOverkillSystem($fire);

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
			$totalDmg, $dmg->shieldDmg, $dmg->structDmg, $dmg->armourDmg, $dmg->emDmg, $dmg->overkill, array_sum($negation), $destroyed, $dmg->notes, 1
		);

		$fire->damages[] = $entry;
		$fire->target->applyDamage($entry);	
	}

	public static function doPulseDmg($fire, $roll, $system){
		$destroyed = 0;
		$totalDmg = $fire->weapon->getTotalDamage($fire);
		$remInt = $system->getRemIntegrity();
		$okSystem = 0;

		$negation = $fire->target->getArmour($fire, $system);
		$dmg = DmgCalc::determineDmg($fire->weapon, $totalDmg, $negation);

		$total = 0;
		$shield = 0;
		$struct = 0;
		$armour = 0;
		$em = 0;

		$name = get_class($system);

		$hits = $fire->weapon->basePulses + min($fire->weapon->extraPulses, floor(($fire->req - $fire->rolls[sizeof($fire->rolls)-1]) / $fire->weapon->grouping));

		Debug::log("fire #".$fire->id.", doPulseDmg, weapon: ".(get_class($fire->weapon)).", target #".$fire->target->id."/".$system->id."/".$name.", hits: ".$hits.", totalDmg: ".$totalDmg.", remaining: ".$remInt.", armour: ".$negation["stock"]."+".$negation["bonus"]);

		/*if ($negation["bonus"] > 1){
			Debug::log("PulseDmg:</br>");
			var_export($dmg);
			echo "</br></br>";
		}*/

		for ($i = 0; $i < $hits; $i++){

			if ($destroyed){
				$total += $totalDmg;
				$dmg->overkill += $dmg->structDmg;
				$shield += $dmg->shieldDmg;
				$armour += $dmg->armourDmg;
				$em += $dmg->emDmg;
				//Debug::log(" => hit ".($i+1).", adding ".$dmg->structDmg."/".$dmg->armourDmg." to overkill which is now: ".$dmg->overkill." pts");
				continue;
			}
			else {
				//Debug::log("adding hit ".($i+1).", shieldDmg: ".$dmg->shieldDmg);
				$total += $totalDmg;
				$struct += $dmg->structDmg;
				$shield += $dmg->shieldDmg;
				$armour += $dmg->armourDmg;
				$em += $dmg->emDmg;
			}

			if ($struct >= $remInt){
				$destroyed = 1;
				$okSystem = $fire->target->getOverkillSystem($fire);

				if ($okSystem){
					//$dmg->overkill += abs($remInt - $dmg->structDmg);
					$dmg->overkill += abs($remInt - $struct);
					$struct -= $dmg->overkill;
					$em += $dmg->emDmg;
					//Debug::log(" => hit ".($i+1)." DESTROYING ship target system ".$name." #".$system->id.", rem: ".$remInt.", doing TOTAL: ".$struct."/".$armour.", OK for: ".$dmg->overkill." dmg");
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
		$dmg->emDmg = $em;

		$dmg = $system->setMaxDmg($fire, $dmg);

		$entry = new Damage(
			-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $roll, $fire->weapon->type,
			$total, $dmg->shieldDmg, $dmg->structDmg, $dmg->armourDmg, $dmg->emDmg, $dmg->overkill, array_sum($negation), $destroyed, $dmg->notes, 1
		);

		$fire->damages[] = $entry;
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
		Debug::log("fire #".$fire->id.", doLaserDmg, weapon: ".get_class($fire->weapon).", target: ".$fire->target->id." for ".$totalDmg." dmg");

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
			$remInt = $system->getRemIntegrity();
			$negation = $fire->target->getArmour($fire, $system);

			$dmg = DmgCalc::determineDmg($fire->weapon, $rake, $negation);
			$dmg = $system->setMaxDmg($fire, $dmg);
			
			$rakes -= $counter;

			if ($remInt - $dmg->structDmg < 1){
				$destroyed = 1;
				$name = get_class($system);
				$okSystem = $fire->target->getOverkillSystem($fire);

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
					$totalDmg, $dmg->shieldDmg, $dmg->structDmg, $dmg->armourDmg, $dmg->emDmg, $dmg->overkill, array_sum($negation), $destroyed, $dmg->notes, 1
				);
			}

			if (!$fire->target->squad || !$rakes){
				$fire->damages[] = $entry;
				$fire->target->applyDamage($entry);
			}
			else if ($rakes){
				$entry->shieldDmg += $dmg->shieldDmg; $entry->structDmg += $dmg->structDmg; $entry->armourDmg += $dmg->armourDmg; $entry->destroyed = $destroyed;
			}
		}
		Debug::log($print);
	}

	public static function determineEMDmg($weapon, $totalDmg, $negation){
		$shieldDmg = 0;
		$armourDmg = 0;
		$structDmg = 0;
		$emDmg = 0;
		$notes = "";

		$shieldDmg = round(min($totalDmg, $negation["bonus"]));
		$armourDmg = round(min($totalDmg-$shieldDmg, $negation["stock"]));
		$emDmg = round($totalDmg - $shieldDmg - $armourDmg);
		$armourDmg = 0;

		return new Divider($shieldDmg * $weapon->linked, $armourDmg * $weapon->linked, $structDmg * $weapon->linked, $emDmg * $weapon->linked, $notes);
	}

	public static function determineStandardDmg($weapon, $totalDmg, $negation){
		$shieldDmg = 0;
		$armourDmg = 0;
		$structDmg = 0;
		$emDmg = 0;
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

		return new Divider($shieldDmg * $weapon->linked, $armourDmg * $weapon->linked, $structDmg * $weapon->linked, $emDmg * $weapon->linked, $notes);
	}

	public static function determineMatterDmg($weapon, $totalDmg, $negation){
		$shieldDmg = 0;
		$armourDmg = 0;
		$structDmg = 0;
		$emDmg = 0;
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
		
		return new Divider($shieldDmg * $weapon->linked, $armourDmg * $weapon->linked, $structDmg * $weapon->linked, $emDmg * $weapon->linked, $notes);
	}

	public static function determinePlasmaDmg($weapon, $totalDmg, $negation){
		$shieldDmg = 0;
		$armourDmg = 0;
		$structDmg = 0;
		$emDmg = 0;
		$notes = "";

		if ($totalDmg <= array_sum($negation)){ 
			$notes = "b;";
			$shieldDmg = round(min($totalDmg, $negation["bonus"]));
			$armourDmg = round($totalDmg-$shieldDmg);
		}
		else {
			$notes = "p;";
			$shieldDmg = round(min($totalDmg, $negation["bonus"]));
			$armourDmg = round(min($totalDmg-$shieldDmg, $negation["stock"]));
			$structDmg = round($totalDmg - $shieldDmg - $armourDmg);
			$armourDmg += floor($totalDmg / 100 * $weapon->melt);
		}

		return new Divider($shieldDmg * $weapon->linked, $armourDmg * $weapon->linked, $structDmg * $weapon->linked, $emDmg * $weapon->linked, $notes);
	}
}





?>