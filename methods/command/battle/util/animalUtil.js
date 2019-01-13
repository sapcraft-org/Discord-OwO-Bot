exports.stats = function(animal){

	/* Parse animal stats */
	let lvl = this.toLvl(animal.xp);
	/* Parse base animal stat*/
	let stats = this.parseStats(animal.animal,lvl.lvl);
	
	stats.lvl = lvl.lvl;
	stats.xp = [lvl.currentXp,lvl.maxXp];

	this.weaponStats(stats,animal.weapon);

	animal.stats = stats;
}

exports.weaponStats = function(stats,weapon){
	/* Add Bonus Stats */
	if(weapon) weapon.alterStats(stats);
}

/* Parse animal stats based on level */
exports.parseStats = function(animal,lvl){
	let stats = {};
	let baseHp = 500+lvl*animal.hpr;
	stats.hp = [baseHp,baseHp,baseHp,0];
	let baseWp = 500+lvl*animal.wpr;
	stats.wp = [baseWp,baseWp,baseWp,0];
	let baseAtt = 100+lvl*animal.attr;
	stats.att = [baseAtt,0];
	let baseMag = 100+lvl*animal.magr;
	stats.mag = [baseMag,0];
	let basePr = 25+lvl*animal.prr;
	stats.pr = [basePr,0];
	let baseMr = 25+lvl*animal.mrr;
	stats.mr = [baseMr,0]
	return stats;
}

/* Converts xp to lvl */
exports.toLvl = function(xp){
	let lvl = 1;
	while(xp>=getXP(lvl)){
		xp -= getXP(lvl);
		lvl++;
	}
	return {lvl,currentXp:xp,maxXp:getXP(lvl+1)}
}

/* converts lvl to xp */
function getXP(lvl){
	return lvl*lvl + 100;
}

/* Returns sql for giving xp to animal */
exports.giveXP = function(pid,xp){
	let sql = `UPDATE IGNORE animal SET xp = xp + ${xp} WHERE pid = ${pid};`;
	return sql;

}
