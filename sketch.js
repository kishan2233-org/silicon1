//declaring variables

	var backgroundImage;
	var page1;
	var startImage, startB;
	var playAgain, playAgainImage;
	var asteroids;
	var asteroidGroup;
	var shooter, shooterImage, stone, stoneImage;
	var asteroid1, asteroid2, asteroid3, asteroid4, asteroid5;
	var invisibleGround;
	var gameOver, gameOverImage;
	var score;
	var congratulation, congratulationImage;
    var stoneGroup;
	var timer = 180;
//declaring variables for sound

	var firstSound, spaceSound, crashSound, gameOverSound;

//declaring variables for gameSate and initializing its value

	var gameState = "start";
	var destroyed;

 function preload()
{
	//loading images for sprites and background

			backgroundImage = loadImage("4.jpg");
			destroyed = loadImage("destroyed.jpg");
    		page1 = loadImage("page1.jpg");
			asteroid1 = loadImage("asteroid1.png");
			asteroid2 = loadImage("asteroid2.png");
			asteroid3 = loadImage("asteroid3.png");
			asteroid4 = loadImage("asteroid4.png");
			asteroid5 = loadImage("asteroid5.png");
			shooterImage = loadImage("shooter.png");
			stoneImage = loadImage("stone.png");
			gameOverImage = loadImage("gameOver.png");
			startImage = loadImage("start.png");
    		playAgainImage = loadImage("playAgain.png");
			//congratulationImage = loadImage("congratulation8.png");

			//loading sound 
			firstSound= loadSound("startSound.mp3");
			spaceSound = loadSound("spaceSound.mp3");
			//crashSound = loadSound("crash.mp3");
			//gameOverSound = loadSound("gameOver.wav");
}


function setup() {

   // create canvas
		createCanvas(displayWidth, 650);
		
		//firstSound.setVolume(0.09);
  // playing sound in first page
		

	// create sprite for start button
		startB = createSprite(displayWidth-100, 600);
		startB.addImage("play", startImage);
		startB.scale = 0.5;
	
	// create sprite for shooter object
		shooter = createSprite(displayWidth/2,500);
		shooter.addImage(shooterImage);
		shooter.scale = 1.5;

	// create group for asteroids	
		asteroidGroup = new Group();	

	// assigning initial value to score
		score = 0;

		stoneGroup = new Group();

}


function draw() {

  	rectMode(CENTER);
    
	  

	// create if condition for gameSate start

  	if(gameState === "start"){
		background(page1);
		firstSound.play();
  		shooter.visible = false;
  		startB.visible = true;
  		//playAgain.visible = false;

  		textFont("Matura MT Script Capitals");
  		fill(255);
  		textSize(30);
  		text("The Earth is,", 600, 40);
  		text("what we all have in common !!!", 490, 75);

 		textFont("Imprint MT Shadow");
 		text("Defend the earth, from asteroids and save it !!!", 380, 200);

  		text("Your target: shoot all the asteroids and svae the earth....", 30, 600);

		// create if condition for changing gameSate to play when start sprite is pressed	  

  		if(mousePressedOver(startB) && gameState === "start"){
	 			 gameState = "play";
    	}
  }
  // what to happen in gameState play

  else if(gameState === "play"){
	
	  firstSound.stop();
	  spaceSound.play();
	background(backgroundImage);
	textSize(20);
	text("Timer :" + timer, 50, 100);
	if(frameCount % 60 && timer > 0){
		timer--;
	}
	 shooter.visible = true;
	//startSound.stop();
	//spaceSound.loop();
	//playAgain.visible = false;
	
	if(keyDown(LEFT_ARROW)){
		shooter.x = shooter.x-16;
   	}

	if(keyDown(RIGHT_ARROW)){
		shooter.x = shooter.x+16;
	}

	
	textFont("Imprint MT Shadow");
	fill(255);
	textSize(30);
	text("Press up arrow to shoot !!!!", 10, 50);

	text("score : "+ score , 1200, 50);
	

	if(keyDown(UP_ARROW)){
		stone = createSprite(displayWidth/2,500, 10, 10);
		stone.x = shooter.x;
	    stone.y = shooter.y;
		shooter.depth = stone.depth;
	    shooter.depth = stone.depth + 1;
		stone.addImage(stoneImage);
		stone.scale = 0.08;
       	stone.velocityY = -20;
		stoneGroup.add(stone);
	}

	//create invisible ground
	invisibleGround = createSprite(680,400,displayWidth,10);
	invisibleGround.visible = false;
	startB.visible = false;


	// create asteroids randomly		
	if (frameCount % 30 === 0 && gameState === "play") {
		asteroids = createSprite(random(0, 900), 0, 100, 100);
		asteroids.velocityY = 3;
		asteroids.velocityX = 3;
		var rand = Math.round(random(1,3));
		switch(rand){
		case 1: asteroids.addImage(asteroid1);
		asteroids.scale = 0.6;
		break;
		case 2: asteroids.addImage(asteroid2);
		asteroids.scale = 0.3;
		break;
		case 3: asteroids.addImage(asteroid4);
		asteroids.scale = 0.3;
		break;
		}
		//adding steroids to asteroidsGroup	
		asteroidGroup.add(asteroids);			
   	}

	// what will happen when asteroids touches the stone
   	if (asteroidGroup.isTouching(stoneGroup)){
	   	stoneGroup.destroyEach();
	   	asteroidGroup[0].destroy();
		// increment score by 10
		score = score+10;			   
	}

	if(score >= 300){
		asteroidGroup.setVelocityXEach(0);	
		asteroidGroup.setVelocityYEach(0);	
		asteroidGroup.destroyEach();
		shooter.visible = false;

		//congratulation=createSprite(displayWidth/2,180);
     	//congratulation.addImage(congratulationImage);
	 }

		// what will happen when asteroids touches the Earth Surface	
  		if(asteroidGroup.isTouching(invisibleGround) || timer<=0){
		gameState = "end";
		background(destroyed);
		//create playAgain sprite
		playAgain = createSprite(displayWidth/2, 300);
		playAgain.addImage(playAgainImage);
		playAgain.scale = 0.4;	

		// create gameOver sprite	
		gameOver = createSprite(displayWidth/2, 200);
		gameOver.addImage(gameOverImage);
		gameOver.scale = 0.6;

		// destroy asteroids
		//asteroidGroup.setVelocityXEach(0);	
		//asteroidGroup.setVelocityYEach(0);	
		asteroidGroup.destroyEach();
		
	
	   // what should happen when playAgain is pressed
		if(mousePressedOver(playAgain)) {
		   reset();
		}
		// make shooter object disappear	
		shooter.visible = false;
	}

  }		 
				
    drawSprites();
}

   // function reset
	 function reset(){
		gameState = "play";
}