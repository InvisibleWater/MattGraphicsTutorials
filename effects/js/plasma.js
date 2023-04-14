var player1 = new EffectPlayer(PlasmaEffect, 256, 256);
var player2 = new EffectPlayer(PlasmaEffect, 256, 256);
var player3 = new EffectPlayer(PlasmaEffect, 256, 256);
var player4 = new EffectPlayer(PlasmaEffect, 256, 256);
var player5 = new EffectPlayer(PlasmaEffect, 256, 256);
var player6 = new EffectPlayer(RGBPlasmaEffect, 256, 256);

player1.fx.init((x, y) => (128.0 + (128.0 * Math.sin(x / 16)) + 128.0 + (128.0 * Math.sin(y / 16))) / 2);
player1.render(document.getElementById("container1"));

player2.fx.init((x, y) => (128.0 + (128.0 * Math.sin(x / 16)) + 128.0 + (128.0 * Math.sin(y / 8)) + 128.0 + (128.0 * Math.sin((x + y) / 16)) + 128.0 + (128.0 * Math.sin(Math.sqrt(x * x + y * y) / 8))) / 4);
player2.render(document.getElementById("container2"));

player3.fx.init((x, y) => (128.0 + (128.0 * Math.sin(x / 16)) + 128.0 + (128.0 * Math.sin(y / 32)) + 128.0 + (128.0 * Math.sin(Math.sqrt(x * x + y * y) / 16)) + 128.0 + (128.0 * Math.cos((x + y) / 8))) / 4);
player3.render(document.getElementById("container3"));

player4.fx.init((x, y) => (128.0 + (128.0 * Math.sin(x / 16)) + 128.0 + (128.0 * Math.sin(y / 32)) + 128.0 + (128.0 * Math.sin(Math.sqrt(x * x + y * y) / 16)) + 128.0 + (128.0 * Math.cos((x + y) / 8))) / 4);

for (let i = 0; i < player4.fx.palette.length; i++) {
    player4.fx.palette[i][0] = Math.floor(128 + (128 * Math.sin(Math.PI * i / 32)));
    player4.fx.palette[i][1] = Math.floor(128 + (128 * Math.sin(Math.PI * i / 64)));
    player4.fx.palette[i][2] = Math.floor(128 + (128 * Math.sin(Math.PI * i / 128)));
}

player4.render(document.getElementById("container4"));

player5.fx.init((x, y) => (128.0 + (128.0 * Math.sin(x / 16)) + 128.0 + (128.0 * Math.sin(y / 32)) + 128.0 + (128.0 * Math.sin(Math.sqrt(x * x + y * y) / 16)) + 128.0 + (128.0 * Math.cos((x + y) / 8))) / 4)

for (let i = 0; i < player5.fx.palette.length; i++) {
    player5.fx.palette[i][0] = Math.floor(128 + (128 * Math.sin(Math.PI * i / 16)));
    player5.fx.palette[i][1] = Math.floor(128 + (128 * Math.sin(Math.PI * i / 128)));
    player5.fx.palette[i][2] = 0;
}

player5.render(document.getElementById("container5"));

player6.render(document.getElementById("container6"));

function generatePalette(length, func) {
    let tab = [];

    for (let i = 0; i < length; i++) {
        tab[i] = func(i);
    }

    return tab;
}