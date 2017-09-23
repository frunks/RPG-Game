var pokeApiBase = "https://pokeapi.co";
var pokeIdBase = "/api/v1/pokemon/";
var urls = [];

function getUrls(monsters) {
    var count = 0;
    while(count < monsters) {
        var url = pokeApiBase + pokeIdBase + Math.floor((Math.random() * 151) + 1) + "/";
        if(!urls.includes(url)) {
            urls.push(url);
            count++;
        }
    }
}

function getMonsters() {
    for(var i = 0; i < urls.length; i++) {
        get(urls[i], createMon);
    }
}

function get(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var result = xhr.responseText;
            callback(JSON.parse(result));
        }
    };
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
}

function createMon(result) {
    var munster = pokemon(result);
    mons.push(munster);
    var div = createCharacterDiv(munster);
    $("#user").append(div);
}

function pokemon(result) {
    return {
        id : result.pkdx_id,
        name : result.name,
        stats : {
            attack : result.attack,
            defense : result.defense,
            speed : result.speed,
            health : result.hp
        },
        imgPath : formatImgSrc(result.pkdx_id)
    };
}

function formatImgSrc(id){
    return "assets/img/pokemon/" + id + ".png";
}