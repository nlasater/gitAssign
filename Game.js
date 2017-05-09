// Game.js
// This is where gameplay occurs

var InfiniteScroller = InfiniteScroller || {};
 
InfiniteScroller.Game = function(){};
 
InfiniteScroller.Game.prototype = {
  preload: function() {
      this.game.time.advancedTiming = true;
    },
  create: function() {
	//set up background and ground layer
    this.game.world.setBounds(0, 0, 3500, this.game.height);
	game.add.sprite(0, 0, 'sky');
    this.grass = this.add.tileSprite(0,this.game.height-100,this.game.world.width,70,'grass');
    //this.ground = this.add.tileSprite(0,this.game.height-70,this.game.world.width,70,'ground');
    
    //create player and walk animation
    this.player = this.game.add.sprite(this.game.width/2, this.game.height-90, 'player');
    this.player.animations.add('flap', [0, 1, 2], 10, true);
    
    //create the fleas
    //this.generateFleas();
    //and the toy mounds
    //this.generateMounds();
    
    //put everything in the correct order (the grass will be camoflauge),
    //but the toy mounds have to be above that to be seen, but behind the
    //ground so they barely stick up
	//this.game.world.bringToTop(this.ground);
    this.game.world.bringToTop(this.grass);
    this.game.world.bringToTop(this.mounds);
    //this.game.world.bringToTop(this.ground);
    
	  
	  //enable physics on the player and ground
    this.game.physics.arcade.enable(this.player);
    this.game.physics.arcade.enable(this.ground);
 
    //player gravity
    this.player.body.gravity.y = 1000;
    
    //so player can walk on ground
    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;
 
    //properties when the player is digging, scratching and standing, so we can use in update()
    //var playerDigImg = this.game.cache.getImage('playerDig');
    //this.player.animations.add('dig');
    //this.player.digDimensions = {width: playerDigImg.width, height: playerDigImg.height};
    
    //var playerScratchImg = this.game.cache.getImage('playerScratch');
    //this.player.animations.add('scratch');
    //this.player.scratchDimensions = {width: playerScratchImg.width, height: playerScratchImg.height};
    
    //this.player.standDimensions = {width: this.player.width, height: this.player.height};
    //this.player.anchor.setTo(0.5, 1);
    
    //the camera will follow the player in the world
    this.game.camera.follow(this.player);
    
    //play the walking animation
    this.player.animations.play('walk', 3, true);
 
    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();
    
    //...or by swiping
    this.swipe = this.game.input.activePointer;
	
  },
  
  update: function() {
 	
	this.game.physics.arcade.collide(this.player, this.ground, this.playerHit, null, this);
    this.game.physics.arcade.collide(this.player, this.fleas, this.playerBit, null, this);
    this.game.physics.arcade.overlap(this.player, this.mounds, this.collect, this.checkDig, this);
	if(this.player.alive && !this.stopped) {
      
      this.player.body.velocity.x = 300;
      
      //We do a little math to determine whether the game world has wrapped around.
      //If so, we want to destroy everything and regenerate, so the game will remain random
      if(!this.wrapping && this.player.x < this.game.width) {
        //Not used yet, but may be useful to know how many times we've wrapped
        this.wraps++;
        
        //We only want to destroy and regenerate once per wrap, so we test with wrapping var
        this.wrapping = true;
        this.fleas.destroy();
        this.generateFleas();
        this.mounds.destroy();
        this.generateMounds();
        
        //put everything back in the proper order
        this.game.world.bringToTop(this.grass);
        this.game.world.bringToTop(this.stars);
        //this.game.world.bringToTop(this.ground);
      }
      else if(this.player.x >= this.game.width) {
        this.wrapping = false;
      }
      
      //take the appropriate action for swiping up or pressing up arrow on keyboard
      //we don't wait until the swipe is finished (this.swipe.isUp),
      //  because of latency problems (it takes too long to jump before hitting a flea)
      if (this.swipe.isDown && (this.swipe.positionDown.y > this.swipe.position.y)) {
        this.playerJump();
      }
      else if (this.cursors.up.isDown) {
        this.playerJump();
      }
    
      //The game world is infinite in the x-direction, so we wrap around.
      //We subtract padding so the player will remain in the middle of the screen when
      //wrapping, rather than going to the end of the screen first.
      this.game.world.wrap(this.player, -(this.game.width/2), false, true, false);
    }
  },
	
  playerJump: function() {
    //when the ground is a sprite, we need to test for "touching" instead of "blocked"
    if(this.player.body.touching.down) {
      this.player.body.velocity.y -= 700;
    }    
  },
  render: function()
    {
        //this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");   
    }
};