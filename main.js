// main.js

var LittleWitch = LittleWitch || {};
LittleWitch.game = new Phaser.Game(680, 400, Phaser.CANVAS, '');

LittleWitch.game.state.add('Boot', LittleWitch.Boot);
LittleWitch.game.state.add('Preload', LittleWitch.Preload);
LittleWitch.game.state.add('Game', LittleWitch.Game);
LittleWitch.game.state.add('GameOver', LittleWitch.GameOver);

LittleWitch.game.state.start('Boot');