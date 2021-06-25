var backImage,backgr;
var player, player_running;
var ground,ground_img,go;
var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;
var END =0;
var PLAY =1;
var gameState = PLAY;
var gameOver; 
var score=0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  player = createSprite(80,300,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.08; 
  ground = createSprite(400,360,800,10);
  ground.x=ground.width/2;
  ground.visible=false;  
  go = createSprite(400,200,50,50);
  go.addImage(gameOverImg);
  go.scale = 1;
  go.visible = false; 
  FoodGroup = new Group();
  obstaclesGroup = new Group();  
  score = 0;
}

function draw() { 
  background(0);
  drawSprites();  
  stroke("red");
  textSize(30);
  fill("red");
  text("Score: "+ score, 650,50); 
  if(gameState===PLAY){ 
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
      if(FoodGroup.isTouching(player)){
      FoodGroup[0].destroy();
      player.scale += 0.01
      score = score + 2;
    }  
    if(keyDown("space")&& player.y>200 ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;  
    player.collide(ground);
    go.visible = false;
    spawnFood();
    spawnObstacles();   
    if(obstaclesGroup.isTouching(player)){ 
        gameState = END;
    }
  }else if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;   
    FoodGroup.destroyEach();
    obstaclesGroup.destroyEach();
    go.visible = true;
  }
}

function spawnFood() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,250);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX= -5;     
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(800,340,10,40);
    obstacle.velocityX=-(4 + 2*score/15); 
    obstacle.addImage(obstacle_img);   
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}