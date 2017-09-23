function createCharacterDiv(mon) {
    var div = createDiv("pokemon unselected", mon);
    appendToParent(div, [
        createP("pokeName", mon.name),
        createImg("pokeImg", mon.imgPath),
        createP("pokeHealth pokeStat", "HP: " + mon.stats.health),
        createP("pokeStat", "ATK: " + mon.stats.attack),
        createP("pokeStat", "DEF: " + mon.stats.defense),
        createP("pokeStat", "SPEED: " + mon.stats.health)
    ]);
    return div;
}

function createDiv(className, mon) {
    var div = $("<div>");
    div.addClass(className);

    var id = mon.name + "-" + mon.id;
    monIds.push(id);
    div.attr("id", id);

    return div;
}

function createP(className, html) {
    var p = $("<p>");
    p.addClass(className);
    p.html(html);
    return p;
}

function createImg(className, src) {
    var img = $("<img>");
    img.attr("src", src);
    img.addClass(className);
    return img;
}

function setElementHtml(element, html) {
    $(element).html(html);
}

function setElementClass(element, className) {
    $(element).attr("class", className);
}

function removeElement(element) {
    $(element).remove();
}

function getElementId(element) {
    return $(element).attr('id');
}

function appendToParent(parent, elements)
{
   for(var i = 0; i < elements.length; i++) {
       $(parent).append(elements[i]);
   }
}

function detachAllTo(player) {
    playerId = player;
    for(var i = 0; i < monIds.length; i++) {
        var element = $("#" + monIds[i]);
        if(element.prop("id") !== player) {
            setElementClass(element, "pokemon enemy");
            $(".user").detach(element);
            element.appendTo($("#enemy"));
        }
    }
}

function updatePokeDiv(elementId) {
    var element = $("#" + elementId + "> .pokeHealth");
    element.html(monMap[elementId].stats.health);
}