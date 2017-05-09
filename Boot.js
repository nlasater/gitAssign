// Boot.js
// this file handles the game booting, so players don't get bored while the game loads

var InfiniteScroller = InfiniteScroller || {};
 
InfiniteScroller.Boot = function(){};
 
//setting game configuration and loading the assets for the loading screen
InfiniteScroller.Boot.prototype = {
  preload: function() {
    //assets we'll use in the loading screen
    this.load.image('preloadbar', 'assets/img/loading_bar.png');
  },
  create: function() {
    //the game will have a Nathan-pink background
    this.game.stage.backgroundColor = '#facade';
 
    //scaling options - we choose to expand to browser window while keeping aspect ratio
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    
    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
 
    //physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
  
    this.state.start('Preload');
  }
};