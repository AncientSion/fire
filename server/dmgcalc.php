<?php

class DmgCalc {

	static function critProcedure($unitid, $systemid, $turn, $new, $effects, $magAdd, $internal = 0){
		//Debug::log("critProcedure $unitid, $systemid, $turn, $new, $magAdd, $internal");

		if (!sizeof($effects)){return;}
		if ($new < 0.15){return false;}
		$chance = round((1-((1-$new)*(1-$new)))*100);
		$chanceRoll = mt_rand(1, 100);

		if ($chanceRoll > $chance){
			//Debug::log("_____opening test SUCCESS, chanceRoll: ".$chanceRoll.", chance: ".$chance);
			if ($internal){
				//Debug::log("but internal, +30 magnitude");
				$magAdd -= 30;
			} else return false;
		}
		else {
			//Debug::log("_____opening test FAIL, chanceRoll: ".$chanceRoll.", chance: ".$chance);
		}

		$magRoll = mt_rand(1, 100);
		$totalMag = $magRoll + $magAdd;

		//Debug::log("chance to fail: $chance, rolled $chanceRoll, magRoll $magRoll, magAdd $magAdd, totalMag $totalMag");

		if ($totalMag  < $effects[0][1]){return;}

		for ($i = sizeof($effects)-1; $i >= 0; $i--){
			if ($totalMag < $effects[$i][1]){continue;}	
			//Debug::log("crit: ".$effects[$i][0]);

			//($id, $unitid, $systemid, $turn, $type, $duration, $value, $new){
			$crit = new Crit(
				0, $unitid, $systemid, $turn,
				$effects[$i][0], $effects[$i][2], $effects[$i][3],
				1
			);
			return $crit;
		}
		return false;
	}

	static function moraleCritProcedure($unitid, $systemid, $turn, $new, $effects, $magAdd){
		Debug::log("moraleCritProcedure $unitid / $systemid, $turn, $new, $magAdd");
		//Debug::log("moraleCritProcedure $unitid, $systemid, $turn, $new, $magAdd");

		if (!sizeof($effects) || !$new || ($new < 0.15 && $unitid)){return;}
		$failChance = round((1-((1-$new)*(1-$new)))*100);
		$chanceRoll = mt_rand(1, 100);
		$crit = new Crit(0, $unitid, $systemid, $turn, "", 0, 0, 1);

		if ($chanceRoll <= $failChance){
			$crit->notes = "f;";
			//Debug::log("___opening test FAIL, failChance: ".$failChance.", rolled: ".$chanceRoll);
		}
		else {
			$crit->notes = "p;";
			$magAdd -= 30;
			//Debug::log("___opening test SUCESS, failChance: ".$failChance.", rolled: ".$chanceRoll);
		}

		$crit->notes .= $failChance.";".$chanceRoll;

		$magRoll = mt_rand(1, 100);
		$totalMag = $magRoll + $magAdd;
		$crit->notes .= ";".$magRoll.";".$totalMag;

		Debug::log("chance to fail: $failChance, rolled $chanceRoll, magRoll $magRoll, magAdd $magAdd, totalMag $totalMag");
		if ($totalMag >= $effects[0][1]){

			for ($i = sizeof($effects)-1; $i >= 0; $i--){
				if ($totalMag < $effects[$i][1]){continue;}
		
				//Debug::log("crit: ".$effects[$i][0]);

				//($id, $unitid, $systemid, $turn, $type, $duration, $value, $new){
				$crit->type = $effects[$i][0];
				$crit->duration = $effects[$i][2];
				$crit->value = $effects[$i][3];

				break;
			}
		}

		return $crit;
	}

	public static function getBonusDamage($fire, $baseDmg, $hit){
		if (!$fire->weapon->amBonus){
			return 0;
		}
		return min($baseDmg / 100 * $fire->weapon->amMax, ($fire->req - $fire->rolls[$hit]) * $fire->weapon->amBonus);
	}

	public static function setWeaponPriority(){
		$names = array(
			"SuperHeavyLaser", "HeavyLaser", "MediumLaser", "LightLaser", "LightParticleBeam", "NeutronLaser", "ImprovedNeutronLaser", "HeavyNeutronBeamProjector",
			"SuperHeavyParticle", "HeavyParticle", "MediumParticle", "LightParticle", "TwinParticleBolter", "FusionCannon", "HeavyFusionCannon",
			"HeavyPlasma", "MediumPlasma", "LightPlasma", "LightPlasmaShredder",
			"HeavyAntimatterConverter", "AntimatterConverter",  "MagCompressor",
			"LightPulse", "MediumPulse", "HeavyPulse", "NeutronPulsar",
			"LightPlasmaPulse", "MediumPlasmaPulse", "HeavyPlasmaPulse",
			"MediumRailGun", "HeavyRailGun",
			"AntiMatterCannon", "AntiProtonPulsar"
		);

		$weapons = array();

		for ($i = 0; $i < sizeof($names); $i++){
			$weapons[] = new $names[$i](0, 0, 0, 0, 0, 0);

			$val = ($weapons[$i]->minDmg + $weapons[$i]->maxDmg)/2;

			if (isset($weapons[$i]->rakes)){
				$val /= $weapons[$i]->rakes;
			}

			if (isset($weapons[$i]->melt)){
				$val *= 1 + ($weapons[$i]->melt/100);
			}

			if (isset($weapons[$i]->pulse)){
			}

			if ($weapons[$i]->fireMode == "Flash"){
				$val *= 0.5;
			}

			$val = round($val);
			//Debug::log($i.": ".$val);

			$weapons[$i]::setStaticPriority($val);
		}

		usort($weapons, function($a, $b){
			return $b::$prio - $a::$prio;
		});

		for ($i = 0; $i < sizeof($weapons); $i++){
			$weapons[$i]::setStaticPriority($i);
		}

		//foreach ($weapons as $wpn){echo $wpn->name." / ".$wpn::$prio." / ".ceil(($wpn->minDmg + $wpn->maxDmg)/2)."</br>";}
		return $weapons;
	}

	public static function createAreaFireOrders($manager, $fire){
		Debug::log("createAreaFireOrders");

		$origin = new Point($fire->shooter->x, $fire->shooter->y);
		$target = new Point($fire->x, $fire->y);
		$dist = floor(Math::getDist2($origin, $target));

		//Debug::log("impact: $fire->x / $fire->y");

		if ($fire->weapon->deviate){
			$maxDevi = $dist / 100 * $fire->weapon->accDecay / 10;
			$devi = mt_rand(0, $maxDevi);
			$angle = mt_rand(0, 360);
			$impact = Math::getPointInDirection($devi, $angle, $target->x, $target->y);
			//Debug::log("dist: ".$dist.", maxDevi: ".$maxDevi."px, devi: ".$devi."px, angle: ".$angle);
		}
		else {
			$angle = Math::getAngle2($origin, $target);
			$impact = $target;
			//Debug::log("angle from $origin->x / $origin->y to $impact->x / $impact->y: $angle");
		}

		$fire->notes = $impact->x.";".$impact->y.";";

		//Debug::log("newTarget ".$newTarget->x."/".$newTarget->y);
		

		//$newTarget = new Point(-50, -160);
		//$fire->notes = $newTarget->x.";".$newTarget->y.";";


		$newFires = array();

		for ($i = 0; $i < sizeof($manager->ships); $i++){
			if ($manager->ships[$i]->obstacle){continue;}
			$dist = Math::getDist2($manager->ships[$i]->getCurPos(), $impact);
			//Debug::log("eMine impact distance to ".$manager->ships[$i]->name." #".$manager->ships[$i]->id.": ".$dist);

			if ($dist + $fire->weapon->aoe <= $fire->weapon->aoe*2){
				$angle = round(Math::addAngle($manager->ships[$i]->facing, Math::getAngle2($manager->ships[$i]->getCurPos(), $impact)));
				//var_export($newTarget);var_export($manager->ships[$i]->x);var_export($manager->ships[$i]->y);
				//Debug::log("hitting, dist to impact: ".$dist.", impact from: ".$angle);

				$subFire = new FireOrder(
					$fire->id, $manager->gameid, Manager::$turn, $fire->shooterid, $manager->ships[$i]->id, $impact->x, $impact->y, $fire->weapon->id, 0, 0, $fire->notes, 1, 0
				);

				$subFire->cc = 0;
				$subFire->dist = $dist;
				$subFire->angle = $angle;
				$subFire->shooter = &$fire->shooter;
				$subFire->target = &$gd->ships[$i];
				$subFire->weapon = &$fire->weapon;

				$fire->notes .= $subFire->targetid.";";
				$fire->hits++;

				$newFires[] = $subFire;

			}
		}
		return $newFires;
	}

	public static function calcDmg($weapon, $totalDmg, $negation){
		switch ($weapon->dmgType){
			case "Standard": return static::calcStandardDmg($weapon, $totalDmg, $negation);
			case "Matter": return static::calcMatterDmg($weapon, $totalDmg, $negation);
			case "Phased": return static::calcMatterDmg($weapon, $totalDmg, $negation);
			case "Plasma": return static::calcPlasmaDmg($weapon, $totalDmg, $negation);
			case "Molecular": return static::calcMolecularDmg($weapon, $totalDmg, $negation);
			case "EM": return static::calcEMDmg($weapon, $totalDmg, $negation);
			default: Debug::log("calcDmg ERROR: ".$weapon->dmgType); break;
		}
	}

	public static function doDmg($fire, $hit, $system){
		switch ($fire->weapon->fireMode){
			case "Standard": static::doStandardDmg($fire, $hit, $system); break;
			case "Ballistic": static::doStandardDmg($fire, $hit, $system); break;
			case "Pulse": static::doPulseDmg($fire, $hit, $system); break;
			case "Beam": static::doBeamDmg($fire, $hit, $system); break;
			case "Shockwave": static::doShockDamage($fire, $hit, $system); break;
			case "Flash": static::doFlashDmg($fire, $hit, $system); break;
			case "Special": static::doSpecialDmg($fire, $hit, $system); break;
			default: Debug::log("doDmg ERROR: ".$weapon->fireMode); break;
		}

		$fire->weapon->postDmg($fire);
	}

	public static function doSpecialDmg($fire, $hit, $system){
		$fire->weapon->handleDmg($fire, $hit, $system);
	}

	public static function doStandardDmg($fire, $hit, $system){
		//Debug::log("hitting: ".get_class($system). "# ".$system->id);
		$destroyed = 0;
		$totalDmg = $fire->weapon->getTotalDamage($fire, $hit, $system);
		$okSystem = 0;
		$remInt = $system->getRemIntegrity();
		
		$negation = $fire->target->getArmour($fire, $system);
		
		$dmg = static::calcDmg($fire->weapon, $totalDmg, $negation);
		$dmg = $system->setMaxDmg($fire, $dmg);

		Debug::log("fire #".$fire->id.", doStandardDmg, weapon: ".(get_class($fire->weapon)).", target #".$fire->target->id."/".$system->id."/".get_class($system).", totalDmg: ".$totalDmg.", remaining: ".$remInt.", armour: ".$negation["stock"]."+".$negation["bonus"]);

		if ($remInt <= $dmg->systemDmg){ // destroyed
			//Debug::log("destroying");
			$destroyed = 1;
			$okSystem = $fire->target->getOverkillSystem($fire);

			if ($okSystem){
				$dmg->hullDmg += abs($remInt - $dmg->systemDmg);
				$dmg->systemDmg = $remInt;
				Debug::log(" => OVERKILL ship target system ".$system->name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->systemDmg.", OK for: ".$dmg->hullDmg." dmg");
			}
			else {
				$dmg->systemDmg = $remInt;
				Debug::log(" => destroying non-ship target system ".$system->name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->systemDmg);
			}
		}

		$entry = new Damage(
			-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
			$totalDmg, $dmg->shieldDmg, $dmg->armourDmg, $dmg->systemDmg, $dmg->hullDmg, $dmg->emDmg, array_sum($negation), $destroyed, $dmg->notes, 1
		);

		$fire->damages[] = $entry;
		$fire->target->addTopDamages($entry);	
	}

	public static function doPulseDmg($fire, $hit, $system){
		$destroyed = 0;
		$remInt = $system->getRemIntegrity();
		$okSystem = 0;

		//$totalDmg = $fire->weapon->getTotalDamage($fire, $hit, $system);
		$negation = $fire->target->getArmour($fire, $system);
		//$dmg = DmgCalc::calcDmg($fire->weapon, $totalDmg, $negation);

		$total = 0;
		$shield = 0;
		$struct = 0;
		$armour = 0;
		$em = 0;

		//$name = get_class($system);
		//$hits = $fire->weapon->basePulses + min($fire->weapon->extraPulses, floor(($fire->req - $fire->rolls[sizeof($fire->rolls)-1]) / $fire->weapon->grouping));
		$hits = $fire->weapon->getMultiShotHits($fire, $hit, $system);

		Debug::log("fire #".$fire->id.", doPulseDmg, weapon: ".$fire->weapon->name.", target #".$fire->target->id."/".$system->id."/".$system->name.", hits: ".$hits);

		/*if ($negation["bonus"] > 1){
			Debug::log("PulseDmg:</br>");
			var_export($dmg);
			echo "</br></br>";
		}*/

		for ($i = 1; $i <= $hits; $i++){
			$totalDmg = $fire->weapon->getTotalDamage($fire, $hit, $system);
			$dmg = DmgCalc::calcDmg($fire->weapon, $totalDmg, $negation);

			//Debug::log("hits ".$i.", totalDmg: ".$totalDmg.", remaining: ".$remInt.", armour: ".$negation["stock"]."+".$negation["bonus"].", armourDmg: ".$dmg->armourDmg);

			$total += $totalDmg;
			$shield += $dmg->shieldDmg;
			$armour += $dmg->armourDmg;
			$struct += $dmg->systemDmg;
			$em += $dmg->emDmg;
			//Debug::log("added hit ".$i.", ".$shield."/".$armour."/".$struct);
		}

		$dmg->notes .= ("v".($hits*$fire->weapon->linked).";");
		//Debug::log("notes ".$dmg->notes);
		$dmg->shieldDmg = $shield;
		$dmg->armourDmg = $armour;
		$dmg->systemDmg = $struct;
		$dmg->emDmg = $em;

		$dmg = $system->setMaxDmg($fire, $dmg);

		if ($remInt <= $dmg->systemDmg){ // destroyed
			//Debug::log("destroying");
			$destroyed = 1;
			$okSystem = $fire->target->getOverkillSystem($fire);

			if ($okSystem){
				$dmg->hullDmg += abs($remInt - $struct);
				$dmg->systemDmg -= $dmg->hullDmg;
				Debug::log(" => hit ".($i).", adding ".$dmg->systemDmg."/".$dmg->armourDmg." to overkill which is now: ".$dmg->hullDmg." pts");
			}
			else {
				$dmg->systemDmg = $remInt;
				Debug::log(" => destroying non-ship target system ".$system->name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->systemDmg);
			}
		}

		$entry = new Damage(
			-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
			$total, $dmg->shieldDmg, $dmg->armourDmg, $dmg->systemDmg, $dmg->hullDmg, $dmg->emDmg, array_sum($negation), $destroyed, $dmg->notes, 1
		);

		$fire->damages[] = $entry;
		$fire->target->addTopDamages($entry);
	}


	public static function doPulseDmgO($fire, $hit, $system){
		$destroyed = 0;
		$totalDmg = $fire->weapon->getTotalDamage($fire, $hit, $system);
		$remInt = $system->getRemIntegrity();
		$okSystem = 0;

		$negation = $fire->target->getArmour($fire, $system);
		$dmg = DmgCalc::calcDmg($fire->weapon, $totalDmg, $negation);

		$total = 0;
		$shield = 0;
		$struct = 0;
		$armour = 0;
		$em = 0;

		//$name = get_class($system);
		//$hits = $fire->weapon->basePulses + min($fire->weapon->extraPulses, floor(($fire->req - $fire->rolls[sizeof($fire->rolls)-1]) / $fire->weapon->grouping));
		$hits = $fire->weapon->getMultiShotHits($fire, $hit, $system);
		$dmg->notes .= ("v".$hits.";");

		Debug::log("fire #".$fire->id.", doPulseDmg, weapon: ".$fire->weapon->name.", target #".$fire->target->id."/".$system->id."/".$system->name.", hits: ".$hits.", totalDmg: ".$totalDmg.", remaining: ".$remInt.", armour: ".$negation["stock"]."+".$negation["bonus"].", armourDmg: ".$dmg->armourDmg);

		/*if ($negation["bonus"] > 1){
			Debug::log("PulseDmg:</br>");
			var_export($dmg);
			echo "</br></br>";
		}*/

		for ($i = 0; $i < $hits; $i++){
			$total += $totalDmg;
			$shield += $dmg->shieldDmg;
			$armour += $dmg->armourDmg;
			$struct += $dmg->systemDmg;
			$em += $dmg->emDmg;
			//Debug::log("added hit ".($i+1).", ".$shield."/".$armour."/".$struct);
		}
		$dmg->shieldDmg = $shield;
		$dmg->armourDmg = $armour;
		$dmg->systemDmg = $struct;
		$dmg->emDmg = $em;

		$dmg = $system->setMaxDmg($fire, $dmg);

		if ($remInt <= $dmg->systemDmg){ // destroyed
			//Debug::log("destroying");
			$destroyed = 1;
			$okSystem = $fire->target->getOverkillSystem($fire);

			if ($okSystem){
				$dmg->hullDmg += abs($remInt - $struct);
				$dmg->systemDmg -= $dmg->hullDmg;
				//Debug::log(" => hit ".($i+1).", adding ".$dmg->systemDmg."/".$dmg->armourDmg." to overkill which is now: ".$dmg->hullDmg." pts");
			}
			else {
				$dmg->systemDmg = $remInt;
				Debug::log(" => destroying non-ship target system ".$system->name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->systemDmg);
			}
		}

		$entry = new Damage(
			-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
			$total, $dmg->shieldDmg, $dmg->armourDmg, $dmg->systemDmg, $dmg->hullDmg, $dmg->emDmg, array_sum($negation), $destroyed, $dmg->notes, 1
		);

		$fire->damages[] = $entry;
		$fire->target->addTopDamages($entry);
	}

	public static function doBeamDmg($fire, $hit, $system){
		$totalDmg = $fire->weapon->getTotalDamage($fire, $hit, $system);
		$okSystem = 0;
		$rakes = $fire->weapon->rakes;
		//$reduce = 1 + ($rakes-1) * $fire->target instanceof Mixed;
		$reduce = (($fire->target->flight || $fire->target->salvo) ? $rakes : 1);
		$systems = array();
		$entry;

		$print = "hitting --- ";
		if ($totalDmg <= 0){return;}
			
		$rake = floor($totalDmg / $fire->weapon->rakes);
		Debug::log("fire #".$fire->id.", doBeamDmg, weapon: ".get_class($fire->weapon).", target: ".$fire->target->id." for ".$totalDmg." dmg");

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

			$dmg = DmgCalc::calcDmg($fire->weapon, $rake, $negation);
			$dmg = $system->setMaxDmg($fire, $dmg);
			
			$rakes -= $reduce;

			if ($remInt - $dmg->systemDmg < 1){
				$destroyed = 1;
				$name = get_class($system);
				$okSystem = $fire->target->getOverkillSystem($fire);

				if ($okSystem){
					$dmg->hullDmg += abs($remInt - $dmg->systemDmg);
				}
				else {
					$rakes = 0;
				}
				$dmg->systemDmg = $remInt;
				Debug::log(" => OVERKILL ship target system ".$name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->systemDmg.", OK for: ".$dmg->hullDmg." dmg");
			}


			$entry = new Damage(
				-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
				$totalDmg, $dmg->shieldDmg, $dmg->armourDmg, $dmg->systemDmg, $dmg->hullDmg, $dmg->emDmg, array_sum($negation), $destroyed, $dmg->notes, 1
			);

			$fire->damages[] = $entry;
			$fire->target->addTopDamages($entry);

			if ($destroyed && (!$okSystem || $system->id == 1)){
				Debug::log("target destroyed!, abandon raking");
				break;
			}
		}

		Debug::log($print);
	}

	public static function doFlashDmg($fire, $hit, $ignored){
		$system;

		if ($fire->target->ship){
			$system = $fire->target->primary;
		}
		else {
			$system = $ignored;
		}

		$values = $fire->weapon->dmgs;

		$baseDmg = $fire->weapon->getTotalDamage($fire, $hit, $system);
		$damageMod = $baseDmg / $fire->weapon->getBaseDamage($fire, $system);

		Debug::log("fire #".$fire->id.", doFlashDmg, weapon: ".(get_class($fire->weapon)).", target #".$fire->target->id."/".$system->id."/".get_class($system).", baseDmg: ".$baseDmg.", damageMod: ".$damageMod);

		static::doStandardDmg($fire, $hit, $system);

		if (!$fire->target->ship){return;}

		$secondary = $fire->target->getFlashTargets($fire);
		shuffle($secondary);
		$index = 2;

		for ($i = 0; $i < sizeof($secondary); $i++){
			//$fire->hits++;
			$system = $secondary[$i];
			$remInt = $system->getRemIntegrity();
			$destroyed = 0;
			$negation = $fire->target->getArmour($fire, $system);	
			$subDamage = $values[$index];
			$totalDmg = ceil($values[$index] * $damageMod);
			$dmg = static::calcDmg($fire->weapon, $totalDmg, $negation);
			$dmg = $system->setMaxDmg($fire, $dmg);

			Debug::log("doing: ".$totalDmg." to ".$system->name." #".$system->id.", value: ".$values[$index]);

			if ($remInt <= $dmg->systemDmg){ // destroyed
				//Debug::log("destroying");
				$destroyed = 1;

				$dmg->systemDmg = $remInt;
				//Debug::log(" => destroying non-ship target system ".$system->name." #".$system->id." was destroyed, rem: ".$remInt.", doing: ".$dmg->systemDmg);
			}

			$entry = new Damage(
				-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
				$totalDmg, $dmg->shieldDmg, $dmg->armourDmg, $dmg->systemDmg, $dmg->hullDmg, $dmg->emDmg, array_sum($negation), $destroyed, $dmg->notes, 1
			);

			$fire->damages[] = $entry;
			$fire->target->addTopDamages($entry);
			
			//Debug::log("doing: ".$values[$index]."% to ".$system->name);
			if ($index == sizeof($values)-1){
				$index = 1;
			} else $index++;
		}
	}

	public static function doShockDamage($fire, $hit, $system){
		$totalDmg = $fire->weapon->getTotalDamage($fire, $hit, $system);


		Debug::log("fire #".$fire->id.", doShockDamage, weapon: ".(get_class($fire->weapon)).", target #".$fire->target->id.", baseDmg: ".$totalDmg);
		
		if ($fire->target->ship){
			static::doStandardDmg($fire, $hit, $fire->target->primary);
		}

		$targets = $fire->target->getFlashTargets($fire);

		for ($i = 0; $i < sizeof($targets); $i++){
			static::doStandardDmg($fire, $hit, $targets[$i]);
		}
			
		return true;

	}
	public static function doShockDamag2e($fire, $hit, $system){
		$totalDmg = $fire->weapon->getTotalDamage($fire, $hit, $system);


		Debug::log("fire #".$fire->id.", doShockDamage, weapon: ".(get_class($fire->weapon)).", target #".$fire->target->id.", baseDmg: ".$totalDmg);
		
		if ($fire->target->ship){
			static::doPulseDmg($fire, $hit, $fire->target->primary);
		}

		$targets = $fire->target->getFlashTargets($fire);

		for ($i = 0; $i < sizeof($targets); $i++){
			static::doPulseDmg($fire, $hit, $targets[$i]);
		}
			
		return true;

	}

	public static function doShockDamage1($fire, $hit, $system){
		$totalDmg = $fire->weapon->getTotalDamage($fire, $hit, $system);
		$targets = $fire->target->getFlashTargets($fire);
		$negation;

		Debug::log("shock, sub targets: ".sizeof($targets).", damage: ".$totalDmg);

		$dmgs = array();

		if ($fire->target->ship){
			$fire->hits--;

			$coreDmg = floor($totalDmg / 100 * $fire->weapon->flashDiv[0]); // 160
			$systemDmg = floor($totalDmg / 100 * $fire->weapon->flashDiv[1]); // 80
			$allSystems = sizeof($fire->target->getStruct($fire->section)->systems); // 3

			if (sizeof($targets)){
				$subDmg = floor($systemDmg / $allSystems);
				$overflow = $subDmg * ($allSystems - sizeof($targets));
				$coreDmg += $overflow;

				Debug::log("VS SHIP systems ".$subDmg." dmg ea, overflow to core: ".$overflow);
				for ($i = 0; $i < sizeof($targets); $i++){
					$dmgs[] = $subDmg;
				}
			} 
			else {
				$coreDmg += $systemDmg;
				Debug::log("full overflow");
			}


			$targets[] = $fire->target->primary;
			$dmgs[] = floor($coreDmg);
			Debug::log("VS SHIP, struct: ".$dmgs[sizeof($dmgs)-1]."dmg");
		}
		else {		
			Debug::log("VS NON SHIP");
			$fire->hits = 0;
			for ($i = 0; $i < sizeof($targets); $i++){
				$dmgs[] = $totalDmg;
			}
		}

		Debug::log("flash targets: ".sizeof($targets));
		for ($i = 0; $i < sizeof($targets); $i++){
			$fire->hits++;
			$system = $targets[$i];
			$destroyed = 0;
			$remInt = $system->getRemIntegrity();
			$negation = $fire->target->getArmour($fire, $system);

			$dmg = static::calcDmg($fire->weapon, $dmgs[$i], $negation);

			if ($remInt - $dmg->systemDmg < 1){
				$destroyed = 1;
				$dmg->hullDmg = $dmg->systemDmg - $remInt;
				Debug::log("destroying, rem: ".$remInt.", dmg: ".$dmg->systemDmg.", adding overkill ".$dmg->hullDmg);
				$dmg->systemDmg = $remInt;
			}
			
			Debug::log("dealing ".$dmg->armourDmg."/".$dmg->systemDmg."/".$dmg->hullDmg." to ".$targets[$i]->display);

			$entry = new Damage(
				-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
				$dmgs[$i], $dmg->shieldDmg, $dmg->armourDmg, $dmg->systemDmg, $dmg->hullDmg, $dmg->emDmg, array_sum($negation), $destroyed, $dmg->notes, 1
			);

			$fire->damages[] = $entry;
			$fire->target->addTopDamages($entry);
		}
	}

	public static function doFlashDmg3($fire, $system){ // old flas
		$totalDmg = $fire->weapon->getTotalDamage($fire, $hit, $system);
		$targets = $fire->target->getFlashTargets($fire);
		$negation;

		Debug::log("flash, targets: ".sizeof($targets).", damage: ".$totalDmg);

		for ($i = 0; $i < sizeof($targets); $i++){
			$fire->hits++;
			$system = $targets[$i];
			$destroyed = 0;
			$remInt = $system->getRemIntegrity();
			$negation = $fire->target->getArmour($fire, $system);
			$dmg = static::calcDmg($fire->weapon, $totalDmg, $negation);

			if ($remInt - $dmg->systemDmg < 1){
				$destroyed = 1;
				$dmg->systemDmg = $remInt;
			}
			
			$entry = new Damage(
				-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
				$totalDmg, $dmg->shieldDmg, $dmg->armourDmg, $dmg->systemDmg, $dmg->hullDmg, $dmg->emDmg, array_sum($negation), $destroyed, $dmg->notes, 1
			);

			$fire->damages[] = $entry;
			$fire->target->addTopDamages($entry);

		}
	}
	
	public static function doFlashDmg2($fire, $system){ // old flash
		$totalDmg = $fire->weapon->getTotalDamage($fire, $hit, $system);
		$toDo = $totalDmg;
		if ($fire->target->ship){$system = $fire->target->getFlashOverkillSystem($fire);}

		while ($toDo){
			$push = false;
			$destroyed = 0;
			$remInt = $system->getRemIntegrity();
			$negation = $fire->target->getArmour($fire, $system);
			$dmg = static::calcDmg($fire->weapon, $toDo, $negation);
			$name = get_class($system);

			Debug::log("fire #".$fire->id.", doFlashDmg, weapon: ".(get_class($fire->weapon)).", target #".$fire->target->id."/".$system->id."/".$name.", totalDmg: ".$totalDmg.", remaining: ".$remInt.", armour: ".$negation["stock"]."+".$negation["bonus"]);

			if ($remInt - $dmg->systemDmg < 1){ // destroy system
				Debug::log(" => destroying target system ".$name." #".$system->id.", rem: ".$remInt.", doing: ".$dmg->systemDmg);
				$destroyed = 1;
				$dmg->systemDmg = $remInt;
				$push = true;
			}
			else if ($toDo){ // no dmg left
				Debug::log("dmg depleted");
				$push = true;
			}

			if ($push){
				$toDo -= $dmg->shieldDmg; 
				$toDo -= $dmg->armourDmg; 
				$toDo -= $dmg->systemDmg; 
				$toDo -= $dmg->emDmg;
				$fire->hits++;
				
				$entry = new Damage(
					-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
					$totalDmg, $dmg->shieldDmg, $dmg->armourDmg, $dmg->systemDmg, $dmg->hullDmg, $dmg->emDmg, array_sum($negation), $destroyed, $dmg->notes, 1
				);

				$fire->damages[] = $entry;
				$fire->target->addTopDamages($entry);	

				if ($toDo){
					$system = $fire->target->getFlashOverkillSystem($fire);
					if ($system){Debug::log("next target: ".$system->name);}
					else {Debug::log("FLASH to primary, EXIT"); return;}
				}
			}
		}
	}

	public static function calcEMDmg($weapon, $totalDmg, $negation){
		$shieldDmg = 0;
		$armourDmg = 0;
		$systemDmg = 0;
		$emDmg = 0;
		$notes = "";

		$shieldDmg = round(min($totalDmg, $negation["bonus"]));
		$armourDmg = round(min($totalDmg-$shieldDmg, $negation["stock"]));
		$emDmg = round($totalDmg - $shieldDmg - $armourDmg);
		$armourDmg = 0;

		//Debug::log("EM Damage total: ".$totalDmg. ", armour: ".array_sum($negation)." ___ ".$shieldDmg."/".$armourDmg."/".$systemDmg."/".$emDmg);
		return new Divider($shieldDmg * $weapon->linked, $armourDmg * $weapon->linked, $systemDmg * $weapon->linked, $emDmg * $weapon->linked, $notes);
	}

	public static function calcStandardDmg($weapon, $totalDmg, $negation){
		//Debug::log("calcStandardDmg, negation: ".$negation["stock"]."/".$negation["bonus"]);
		$shieldDmg = 0;
		$armourDmg = 0;
		$systemDmg = 0;
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
			$systemDmg = round($totalDmg - $shieldDmg - $armourDmg);
		}

		return new Divider($shieldDmg * $weapon->linked, $armourDmg * $weapon->linked, $systemDmg * $weapon->linked, $emDmg * $weapon->linked, $notes);
	}

	public static function calcMatterDmg($weapon, $totalDmg, $negation){
		//Debug::log("calcMatterDmg, negation: ".$negation["stock"]."/".$negation["bonus"]);
		$shieldDmg = 0;
		$armourDmg = 0;
		$systemDmg = 0;
		$emDmg = 0;
		$notes = "";

		$skip = 1 - ($weapon->armourSkip / 100);

		if ($totalDmg <= array_sum($negation)){ 
			$notes = "b;";
			$shieldDmg = round(min($totalDmg, $negation["bonus"]));
			$armourDmg = round($totalDmg / 2);
		}
		else {
			$notes = "p;";
			$shieldDmg = round(min($totalDmg, $negation["bonus"] * $skip));
			$armourDmg = round(min($totalDmg-$shieldDmg, $negation["stock"] * $skip));
			$systemDmg = round($totalDmg - $shieldDmg - $armourDmg);
		}
		
		return new Divider($shieldDmg * $weapon->linked, $armourDmg * $weapon->linked, $systemDmg * $weapon->linked, $emDmg * $weapon->linked, $notes);
	}

	public static function calcMolecularDmg($weapon, $totalDmg, $negation){
		$shieldDmg = 0;
		$armourDmg = 0;
		$systemDmg = 0;
		$emDmg = 0;
		$notes = "";

		if ($totalDmg <= array_sum($negation)){ 
			$notes = "b;";
			$armourDmg = round($totalDmg/4);
		}
		else {
			$notes = "p;";
			$shieldDmg = round(min($totalDmg, $negation["bonus"]/4));
			$armourDmg = round(min($totalDmg-$shieldDmg, $negation["stock"]/4));
			$systemDmg = round($totalDmg - $shieldDmg - $armourDmg);
		}
		
		return new Divider($shieldDmg * $weapon->linked, $armourDmg * $weapon->linked, $systemDmg * $weapon->linked, $emDmg * $weapon->linked, $notes);
	}

	public static function calcPlasmaDmg($weapon, $totalDmg, $negation){
		//Debug::log("calcPlasmaDmg, negation: ".$negation["stock"]."/".$negation["bonus"]);
		$shieldDmg = 0;
		$armourDmg = 0;
		$systemDmg = 0;
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
			$systemDmg = round($totalDmg - $shieldDmg - $armourDmg);

		}

		$melt = floor(($totalDmg-$shieldDmg) / 100 * $weapon->melt);

		//Debug::log("Plasma, adding ".$melt);
		$armourDmg += $melt;


		return new Divider($shieldDmg * $weapon->linked, $armourDmg * $weapon->linked, $systemDmg * $weapon->linked, $emDmg * $weapon->linked, $notes);
	}
}





?>