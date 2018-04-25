<?php

class DmgCalc {

	public static function getWeaponPriority(){
		$names = array(
			"SuperHeavyLaser", "HeavyLaser", "MediumLaser", "LightLaser", "LightParticleBeam", "NeutronLaser", "NeutronAccelerator",
			"SuperHeavyParticle", "HeavyParticle", "MediumParticle", "LightParticle", "TwinParticleBolter", "FusionCannon", "HeavyFusionCannon",
			"HeavyPlasma", "MediumPlasma", "LightPlasma", "LightPlasmaShredder",
			"AntimatterConverter", "MagCompressor",
			"LightPulse", "MediumPulse", "HeavyPulse", 
			"LightPlasmaPulse", "MediumPlasmaPulse", "HeavyPlasmaPulse",
			"MediumRailGun", "HeavyRailGun"
		);

		$weapons = array();

	/*	echo "<table>";
		echo "<thead>";
		echo "<tr>";
		echo "<th width=300>Name</th>";
		echo "<th width=100>DPS Value</th>";
		echo "<th width=100>Priority</th>";
		echo "</tr>";
		echo "</thead>";

	*/	for ($i = 0; $i < sizeof($names); $i++){
			$weapons[] = new $names[$i](0, 0, 0, 0, 0, 0);

			$val = ($weapons[$i]->minDmg + $weapons[$i]->maxDmg)/2;

			if (isset($weapons[$i]->rakes)){
				$val /= $weapons[$i]->rakes;
			}

			if (isset($weapons[$i]->melt)){
				$val *= 1 + ($weapons[$i]->melt/100);
			}

			if (isset($weapon[$i]->pulse)){
			}

			$val = round($val);
			//Debug::log($i.": ".$val);

			$weapons[$i]::setStaticPriority($val);
			//Debug::log($weapons[$i]::$prio.": ".$val);

	/*		echo "<tr>";
			echo "<td>".$weapons[$i]->display."</td>";
			echo "<td>".$weapons[$i]->prio."</td>";
			echo "<td>".""."</td>";
			echo "</tr>";
	*/	}

	//	echo "</table>";

		usort($weapons, function($a, $b){
			return $b::$prio - $a::$prio;
		});


	/*	echo "</br></br>";


		echo "<table>";
		echo "<thead>";
		echo "<tr>";
		echo "<th width=300>Name</th>";
		echo "<th width=100>DPS Value</th>";
		echo "<th width=100>Priority</th>";
		echo "</tr>";
		echo "</thead>";
	
	*/	for ($i = 0; $i < sizeof($weapons); $i++){
	/*		echo "<tr>";
			echo "<td>".$weapons[$i]->display."</td>";
			echo "<td>".$weapons[$i]::$prio."</td>";
			echo "<td>".$i."</td>";
			echo "</tr>";
	*/		
			$weapons[$i]::setStaticPriority($i);
		}

		//foreach ($weapons as $wpn){Debug::log($wpn->name."/".$wpn::$prio);}
		return $weapons;
	//	echo "</table>";
	}

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
			Debug::log("dist: ".$dist.", maxDevi: ".$maxDevi."px, devi: ".$devi."px, angle: ".$angle);
		}
		else {
			$angle = Math::getAngle2($origin, $target);
			$impact = $target;
		}

		$fire->notes = $impact->x.";".$impact->y.";";

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
				$subFire->shooter = &$fire->shooter;
				$subFire->target = $gd->ships[$i];
				$subFire->weapon = $fire->weapon;
				$newFires[] = $subFire;
			}
		}
		return $newFires;
	}

	public static function calcDmg($weapon, $totalDmg, $negation){
		switch ($weapon->dmgType){
			case "Standard": return static::calcStandardDmg($weapon, $totalDmg, $negation);
			case "Matter": return static::calcMatterDmg($weapon, $totalDmg, $negation);
			case "Plasma": return static::calcPlasmaDmg($weapon, $totalDmg, $negation);
			case "Molecular": return static::calcMolecularDmg($weapon, $totalDmg, $negation);
			case "EM": return static::calcEMDmg($weapon, $totalDmg, $negation);
			default: Debug::log("calcDmg ERROR"); break;
		}
	}

	public static function doDmg($fire, $system){
		switch ($fire->weapon->fireMode){
			case "Standard": static::doStandardDmg($fire, $system); break;
			case "Ballistic": static::doStandardDmg($fire, $system); break;
			case "Pulse": static::doPulseDmg($fire, $system); break;
			case "Laser": static::doLaserDmg($fire, $system); break;
			case "Flash": static::doFlashDmg($fire, $system); break;
			default: Debug::log("doDmg ERROR"); break;
		}

		$fire->weapon->postDmg($fire);
	}



	public static function doStandardDmg($fire, $system){
		//Debug::log("hitting: ".get_class($system));
		$destroyed = 0;
		$totalDmg = $fire->weapon->getTotalDamage($fire);
		$okSystem = 0;
		$remInt = $system->getRemIntegrity();
		
		$negation = $fire->target->getArmour($fire, $system);
		
		$dmg = static::calcDmg($fire->weapon, $totalDmg, $negation);
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
			-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
			$totalDmg, $dmg->shieldDmg, $dmg->structDmg, $dmg->armourDmg, $dmg->emDmg, $dmg->overkill, array_sum($negation), $destroyed, $dmg->notes, 1
		);

		$fire->damages[] = $entry;
		$fire->target->applyDamage($entry);	
	}

	public static function doPulseDmg($fire, $system){
		$destroyed = 0;
		$totalDmg = $fire->weapon->getTotalDamage($fire);
		$remInt = $system->getRemIntegrity();
		$okSystem = 0;

		$negation = $fire->target->getArmour($fire, $system);
		$dmg = DmgCalc::calcDmg($fire->weapon, $totalDmg, $negation);

		$total = 0;
		$shield = 0;
		$struct = 0;
		$armour = 0;
		$em = 0;

		$name = get_class($system);
		$hits = $fire->weapon->basePulses + min($fire->weapon->extraPulses, floor(($fire->req - $fire->rolls[sizeof($fire->rolls)-1]) / $fire->weapon->grouping));
		$dmg->notes .= ("v".$hits.";");

		Debug::log("fire #".$fire->id.", doPulseDmg, weapon: ".(get_class($fire->weapon)).", target #".$fire->target->id."/".$system->id."/".$name.", hits: ".$hits.", totalDmg: ".$totalDmg.", remaining: ".$remInt.", armour: ".$negation["stock"]."+".$negation["bonus"].", armourDmg: ".$dmg->armourDmg);

		/*if ($negation["bonus"] > 1){
			Debug::log("PulseDmg:</br>");
			var_export($dmg);
			echo "</br></br>";
		}*/

		for ($i = 0; $i < $hits; $i++){
			$total += $totalDmg;
			$shield += $dmg->shieldDmg;
			$armour += $dmg->armourDmg;
			$struct += $dmg->structDmg;
			$em += $dmg->emDmg;
			//Debug::log("added hit ".($i+1).", ".$shield."/".$armour."/".$struct);
		}
		$dmg->shieldDmg = $shield;
		$dmg->armourDmg = $armour;
		$dmg->structDmg = $struct;
		$dmg->emDmg = $em;

		$dmg = $system->setMaxDmg($fire, $dmg);

		if ($remInt <= $dmg->structDmg){ // destroyed
			//Debug::log("destroying");
			$destroyed = 1;
			$okSystem = $fire->target->getOverkillSystem($fire);

			if ($okSystem){
				$dmg->overkill += abs($remInt - $struct);
				$dmg->structDmg -= $dmg->overkill;
				//Debug::log(" => hit ".($i+1).", adding ".$dmg->structDmg."/".$dmg->armourDmg." to overkill which is now: ".$dmg->overkill." pts");
			}
		}

		$entry = new Damage(
			-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
			$total, $dmg->shieldDmg, $dmg->structDmg, $dmg->armourDmg, $dmg->emDmg, $dmg->overkill, array_sum($negation), $destroyed, $dmg->notes, 1
		);

		$fire->damages[] = $entry;
		$fire->target->applyDamage($entry);
	}

	public static function doLaserDmg($fire, $system){
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

			$dmg = DmgCalc::calcDmg($fire->weapon, $rake, $negation);
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
					-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
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

	public static function doFlashDmg($fire, $system){
		//$totalDmg = $fire->weapon->getTotalDamage($fire) * (1 - ($this->ship*0.5));
		$totalDmg = $fire->weapon->getTotalDamage($fire);
		$targets = $fire->target->getFlashTargets($fire);
		$negation;
		$overkill = 0;


		Debug::log("flash, system targets: ".sizeof($targets).", damage: ".$totalDmg);

		$dmgs = array();

		if ($fire->target->ship){
			$fire->hits--;
			$subDmg = floor($totalDmg  / 100 * $fire->weapon->flashDiv[1] / sizeof($targets));
			Debug::log("VS SHIP, subDamage: ".$subDmg);
			for ($i = 0; $i < sizeof($targets); $i++){
				$dmgs[] = $subDmg;
			}
			$targets[] = $fire->target->primary;
			$dmgs[] = floor($totalDmg / 100 * $fire->weapon->flashDiv[0]);
			Debug::log("VS SHIP, struct: ".$dmgs[sizeof($dmgs)-1]);
		}
		else {		
			Debug::log("VS NON SHIP");
			for ($i = 0; $i < sizeof($targets); $i++){
				$dmgs[] = $totalDmg;
			}
		}

		for ($i = 0; $i < sizeof($targets); $i++){
			$fire->hits++;
			$system = $targets[$i];
			$destroyed = 0;
			$remInt = $system->getRemIntegrity();
			$negation = $fire->target->getArmour($fire, $system);

			$dmg = static::calcDmg($fire->weapon, $dmgs[$i], $negation);

			if ($fire->target->ship && $targets[$i]->id == 1){
				Debug::log("hitting structure, accumulated overkill @ ".$overkill);
				$dmg->structDmg += $overkill;
			}

			if ($remInt - $dmg->structDmg < 1){
				$destroyed = 1;
				$overkill += $dmg->structDmg - $remInt;
				Debug::log("destroying, rem: ".$remInt.", dmg: ".$dmg->structDmg.", adding overkill ".($dmg->structDmg - $remInt).", now at: ".$overkill);
				$dmg->structDmg = $remInt;
			}
			
			Debug::log("dealing ".$dmg->armourDmg."/".$dmg->structDmg."/".$dmg->overkill." to ".$targets[$i]->display);

			$entry = new Damage(
				-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
				$dmgs[$i], $dmg->shieldDmg, $dmg->structDmg, $dmg->armourDmg, $dmg->emDmg, $dmg->overkill, array_sum($negation), $destroyed, $dmg->notes, 1
			);

			$fire->damages[] = $entry;
			$fire->target->applyDamage($entry);
		}


	}

	public static function doFlashDmg3($fire, $system){ // old flas
		$totalDmg = $fire->weapon->getTotalDamage($fire);
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

			if ($remInt - $dmg->structDmg < 1){
				$destroyed = 1;
				$dmg->structDmg = $remInt;
			}
			
			$entry = new Damage(
				-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
				$totalDmg, $dmg->shieldDmg, $dmg->structDmg, $dmg->armourDmg, $dmg->emDmg, $dmg->overkill, array_sum($negation), $destroyed, $dmg->notes, 1
			);

			$fire->damages[] = $entry;
			$fire->target->applyDamage($entry);

		}
	}
	public static function doFlashDmg2($fire, $system){ // old flash
		$totalDmg = $fire->weapon->getTotalDamage($fire);
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
					-1, $fire->id, $fire->gameid, $fire->targetid, $fire->section, $system->id, $fire->turn, $fire->weapon->type,
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

	public static function calcEMDmg($weapon, $totalDmg, $negation){
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

	public static function calcStandardDmg($weapon, $totalDmg, $negation){
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

	public static function calcMatterDmg($weapon, $totalDmg, $negation){
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

	public static function calcMolecularDmg($weapon, $totalDmg, $negation){
		$shieldDmg = 0;
		$armourDmg = 0;
		$structDmg = 0;
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
			$structDmg = round($totalDmg - $shieldDmg - $armourDmg);
		}
		
		return new Divider($shieldDmg * $weapon->linked, $armourDmg * $weapon->linked, $structDmg * $weapon->linked, $emDmg * $weapon->linked, $notes);
	}

	public static function calcPlasmaDmg($weapon, $totalDmg, $negation){
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