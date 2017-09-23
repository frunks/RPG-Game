var mons = [];
var monIds = [];
var monMap = [];
var selected = false;
var attackMode = false;
var modifier = 1.6;
var enemies = 5;
var playerId;

$(document).ready(function() {
    init();

    $(document).on("click", ".unselected", function() {
        initPlayerCharacter(this);
        selected = true;
        detachAllTo(this.id);
        mapMons();
        console.log(monMap);
        setElementHtml(".playerHeader", "Click your character to attack!");
    });

    $(document).on("click", ".player", function() {
        attackMode = true;
        updatePlayerHeader();
        updateEnemyHeader();
        checkForMons();
    });

    $(document).on("click", ".enemy", function() {
        setElementHtml(".playerHeader", "Click your character!");
        battle(getElementId(this));
        updateEnemyHeader();
        attackMode = false;
        checkForMons();
    });

    $(document).on( {
        mouseenter: function () {
            var name = $('.pokeName', $(this)).html();
            if(attackMode)
                setElementHtml(".enemyHeader", "Attacking " + name + "!");
        },
        mouseleave: function () {
            if(attackMode)
                setElementHtml(".enemyHeader", "Enemies");
        }
    }, ".enemy");
});

function updatePlayerHeader() {
    if(attackMode) {
        setElementHtml(".playerHeader", "Select an enemy to attack!");
    } else {
        setElementHtml(".playerHeader", "Click your character!");
    }
}

function updateEnemyHeader() {
    if(!attackMode) {
        setElementHtml(".enemyHeader", "Click your character!");
    } else {
        //setElementHtml(".enemyHeader", "Enemies");
    }
}

function init() {
    getUrls(enemies);
    getMonsters();
}

function initPlayerCharacter(player) {
    setElementClass(player, "pokemon player");
}

function battle(enemyId) {
    if(attackMode) {
        if(determineFirstAttack(enemyId) ) {
            attack(enemyId, playerId);
        } else {
            attack(playerId, enemyId);
        }
    }
}

function attack(first, second) {
    var dmg1 = getDamage(monMap[second].stats.attack, monMap[first].stats.defense);
    monMap[first].stats.health -= Math.round(dmg1);
    update(first);

    if(monMap[first].stats.health > 0) {
        var dmg2 = getDamage(monMap[first].stats.attack, monMap[second].stats.defense);
        monMap[second].stats.health -= Math.round(dmg2);
        update(second);
    }
}

function getDamage(atk, def) {
    return atk * atk / (atk + def) / 2 + 5;
}

function determineFirstAttack(enemyId) {
    return  monMap[enemyId].stats.speed < monMap[playerId].stats.speed;
}

function mapMons() {
    for(var i = 0; i < monIds.length; i++) {
        monMap[monIds[i]] = mons[i];
    }
}

function update(id) {
    updatePokeDiv(id);
    if(monMap[id].stats.health <= 0) {
        removeElement($("#" + id));
        removeMon(id);
    }
    if($("#" + id).attr("class") === "pokemon player") {
        monMap[id].stats.attack += (10 + (modifier * mons.length));
        modifier++;
    }
}

function removeMon(id) {
    var index = monIds.indexOf(id);
    mons.splice(index, 1);
    monIds.splice(index, 1);
    mapMons();
}

function checkForMons() {
    console.log($("#user").children().length);
    if($("#user").children().length === 1) {
        setElementHtml(".playerHeader", "YOU LOSE!");
        setElementHtml(".enemyHeader", "WIN!");
    }

    console.log($("#enemy").children().length);
    if($("#enemy").children().length === 1) {
        setElementHtml(".playerHeader", "YOU WIN!");
        setElementHtml(".enemyHeader", "LOSE!");
    }
}