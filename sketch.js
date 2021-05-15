var bike, bikeImg;
var coinGrp, coin, coinImg;
var bg, bgImg;
var track, trackImg;
var track2, track3;
var score, survivalTime;
var obstaclesGrp, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5;

var PLAY = 0;
var END = 1;
var gameState = PLAY;



function preload(){
    bikeImg = loadImage("bike.png");
    bike2 = loadImage("bike2.png");
    trackImg = loadImage("track.png");
    coinImg = loadAnimation("coin1.png", "coin2.png", "coin3.png", "coin4.png", "coin5.png", "coin6.png");
    bgImg = loadImage("bg.jpg");

    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.gif");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
}

function setup(){
    canvas = createCanvas(800, 800);
    
    score = 0;
    survivalTime = 0;  

    track = createSprite(500, 630, 100, 100);
    track.addImage("track", trackImg);
    track.velocityX = -(4 + 3* score/100);

    track2 = createSprite(500, 770, 1000, 60);
    track2.shapeColor = "#484848";

    track3 = createSprite(500, 500, 1000, 40);
    track3.shapeColor = "#484848";

    bg = createSprite(500, 230, 1000, 1000);
    bg.addImage("background", bgImg);
    bg.scale = 1.5;
    bg.velocityX = -(4 + 3* score/100);
    //bg.visible = false;

    bike = createSprite(100, 600, 100, 100);
    bike.addImage("bike1", bikeImg);
    bike.addImage("bike2", bike2);
    bike.scale = 0.8;
    bike.setCollider("rectangle", 0, 0, 150, 150);

    invisibleBlock = createSprite(500, 650, 1000, 20);
    invisibleBlock.visible = false;

    coinGrp = createGroup();
    obstaclesGrp = createGroup();


}

function draw(){
    background("#96D8E8");

    if(gameState===PLAY){

    survivalTime = survivalTime + Math.round(getFrameRate()/60);

    if (track.x < 0){
        track.x = track.width/2;
      }

    if (bg.x < 0){
        bg.x = bg.width/2;
    }

    bike.collide(invisibleBlock);

   
    if(keyDown("space") && bike.y > 300) {
        bike.velocityY = -12;
        bike.changeImage("bike2", bike2);
    }

    if(keyWentUp("space")){
        bike.changeImage("bike1", bikeImg)
    }

    bike.velocityY = bike.velocityY + 0.8;
    
    camera.position.x = canvas.width/2;
    camera.position.y = bike.y - 200;

    spawnCoins();
    spawnObstacles();

    if(bike.isTouching(coinGrp)){
        coinGrp.destroyEach();
        score = score + 1;
     }

     if(bike.isTouching(obstaclesGrp)){
        gameState = END;
     }

    drawSprites();

    
    fill("white");
    textSize(20);
    text("Survival Time : " + survivalTime, 50, 50);
    text("Score : " + score, 500, 50);
    }

    if(gameState === END){
        textSize(50);
        fill("white");
        text("GAME OVER!!", 200, 200);
    }
}

function spawnCoins(){
    if (frameCount % 150 === 0) {

        coin = createSprite(1000, 400, 100, 100);
        coin.y = Math.round(random(180, 600));
        coin.addAnimation("coin", coinImg);
        coin.scale = 0.5;
        coin.velocityX = -5;
        
         //assign lifetime to the variable
        coin.lifetime = 210;

        coinGrp.add(coin);
    }
}

function spawnObstacles(){
    if (frameCount % 200 === 0){
      var obstacle = createSprite(810,600,10,40);
      obstacle.velocityX = -(6 + survivalTime/100);
      obstacle.addImage(obstacle1);
      
       //generate random obstacles
       var rand = Math.round(random(1,6));
       switch(rand) {
         case 1: obstacle.addImage(obstacle2);
                 break;
         case 2: obstacle.addImage(obstacle3);
                 break;
         case 3: obstacle.addImage(obstacle4);
                 break;
         case 4: obstacle.addImage(obstacle5);
                 break;
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.2;
       obstacle.lifetime = 300;
      
      //add each obstacle to the group
       obstaclesGrp.add(obstacle);
    }
   }