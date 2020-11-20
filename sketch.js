var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score = 0;
var ground;
var survivalTime = 0;
var PLAY = 1,
  END = 0;
var gameState = PLAY;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");


}



function setup() {
  monkey = createSprite(50, 200, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15;

  ground = createSprite(200, 370, 400, 60);

  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("lightblue");

  if (gameState === PLAY) {
    if (keyDown("space") && monkey.y === 293.95) {
      monkey.velocityY = -15;

    }
    monkey.velocityY += 0.8;
    monkey.collide(ground);
    console.log(monkey.y);

    if (monkey.isTouching(foodGroup)) {
      score++;
      foodGroup.destroyEach();
    }

    stroke("white");
    textSize(20);
    fill("white");
    text("Score: " + score, 100, 25);

    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount / getFrameRate())
    text("Survival Time: " + survivalTime, 100, 50);

    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
      // monkey.velocityX = 0;
    }

    createBanana();
    createObstacles();

    drawSprites();
  }



  if (gameState === END) {
    textSize(30);
    fill("black");
    text("GAME OVER", 100, 210);  
  }

  // score--;
  //obstacleGroup.destroyEach();



}

function createBanana() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400, random(120, 200), 20, 20);
    banana.addImage(bananaImage);
    banana.velocityX = -4;
    banana.lifetime = 250;
    foodGroup.add(banana);
    banana.scale = 0.1;
  }
}

function createObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(400, random(302, 307), 20, 35);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4;
    // obstacle.lifetime = 250;
    obstacleGroup.add(obstacle);
    obstacle.scale = 0.2;

    //obstacleGroup.collide(ground);
  }
}