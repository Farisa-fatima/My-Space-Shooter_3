var background;
var player, obstacle4, obstacle1, obstacle2, obstacle3;
var bgImg, plrImg, obstacle4Img, obstacle1Img, obstacle2Img, obstacle3Img;
var gameOver, restart;

var gameState = PLAY;

function preload() {
bgImg = loadImage("background_space.png")
plrImg = loadImage("rocket1.png")
obstacle4Img = loadImage("obstacle4.png")
obstacle1Img = loadImage("obstacle1.png")
obstacle2Img = loadImage("obstacle2.png")
obstacle3Img = loadImage("obstacle3.png")
gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");

}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  player = createSprite(windowWidth / 2, windowHeight / 2 + 200, 10, 30);
  player.addImage("plrImg", plrImg);
  player.scale = 0.5

 
  obstacle1 = createSprite(windowWidth / 2 - 200, windowHeight / 2 - 300, 40, 70);
  obstacle1.addImage("obstacle1Img", obstacle1Img)
  obstacle2 = createSprite(windowWidth / 2 + 200, windowHeight / 2 - 300, 40, 70);
  obstacle2.addImage("obstacle2Img", obstacle2Img)
  obstacle3 = createSprite(windowWidth / 2 - 350, windowHeight / 2 - 250, 40, 70);
  obstacle3.addImage("obstacle3Img", obstacle3Img)
  obstacle4 = createSprite(windowWidth / 2, windowHeight / 2 - 300, 10, 30);
  obstacle4.addImage("obstacle4Img", obstacle4Img)

  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
  
 obstaclesGroup = new Group();

}

function draw() {
background(bgImg);



//player.x = player.mouseX
if(gameState==PLAY) {

  if(keyDown(LEFT)) {
    player.x =- 10
  }
  if(keyDown(RIGHT)) {
    player.x =+ 10
  }

}
else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
  
  obstaclesGroup.setVelocityXEach(0);

  if(touches.length>0 || keyDown("SPACE")) {      
    reset();
    touches = []
  }
}

createEdgeSprites()
drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,height-95,20,30);
    obstacle.setCollider('circle',0,0,45)
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
               
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}
