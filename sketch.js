var monkey, monkeyImage;
var banana, bananaImage, foodGroup;
var rock, rockImage, rockGroup;
var ground, groundImage, groundInvisible;;
var gameState="play";
var score=0;

function preload(){
  monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage=loadImage("banana.png");
  rockImage=loadImage("stone.png");
  groundImage=loadImage("jungle.jpg");
}
function setup() {
  
  createCanvas(550, 450);

  ground=createSprite(300,200,1500,20);
  ground.addImage(groundImage);
  ground.scale=1.1;
  
  groundInvisible=createSprite(300,430,1500,20);
  groundInvisible.visible=0;
  
  monkey=createSprite(50,400,20,20);
  monkey.addAnimation("Running",monkeyImage);
  monkey.scale=0.15;
  
  
  foodGroup= new Group();
  rockGroup=new Group();
}

function draw() {
  background(220);
  
  monkey.collide(groundInvisible);
  
  if(gameState=="play"){
    
    food();
    
    create_rock();
    
    ground.velocityX=-(5+5*(score/50));
    
    if(ground.x<0){
      ground.x=ground.width/2;
    }
    
   
    if(keyDown("space") && monkey.y>270){
      monkey.velocityY=-10;
    }
    monkey.velocityY=monkey.velocityY+0.5;
    
    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score=score+5;
      
    }
    
    if(rockGroup.isTouching(monkey)){
      gameState="end";
     
    }
    

  }
  
  drawSprites();
  textSize(20);
  fill("red");
  text("Score: "+score,450,50);
  noFill();
  
      if(gameState=="end"){
        monkey.velocityY=0;
        ground.velocityX=0;
        rockGroup.setVelocityXEach(0);
        foodGroup.setVelocityXEach(0);
        rockGroup.setLifetimeEach(-1);
        foodGroup.setLifetimeEach(-1);
        textSize(18);
        fill("red");
        text("GAME OVER!!",200,180);
        text("PRESS SPACE TO RESTART.",200,200);
        noFill();
    }
  if(keyDown("space") && gameState=="end"){
    score=0;
    gameState="play";
    rockGroup.destroyEach();
    foodGroup.destroyEach();
  }
  
}

function create_rock(){
  
  if(Math.round(random(frameCount)%100)==0){
  rock=createSprite(500,400,20,20);
  rock.addImage(rockImage);
  rock.scale=0.15;
  rock.velocityX=-(8+5*(score/50));
  rock.lifetime=110;
  rockGroup.add(rock);
  }
  
}

function food(){
  
  if (frameCount%100==0){
  banana=createSprite(500,Math.round(random(150,300)),20,20);
  banana.addImage(bananaImage);
  banana.scale=0.06;
  banana.velocityX=-5;
  banana.lifetime=110;
  foodGroup.add(banana);
  }
}