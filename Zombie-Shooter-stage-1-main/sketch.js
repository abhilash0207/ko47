var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var bg,bgImg;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var bullets=60;

var losingSound;

var gameState="fight"

var zombieGroup;



function preload(){
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bgImg = loadImage("assets/bg.jpeg")

  zombieImg = loadImage("assets/zombie.png")

  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  
  losingsound = loadSound("assets/lose.mp3")


  
}

function setup() {

  //canvas
  createCanvas(windowWidth,windowHeight);

  //background
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  
//player
player = createSprite(displayWidth-1120, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.5
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   heart1=createSprite(displayWidth-170,40,20,20);
   heart1.addImage("heart1",heart1Img)
   heart1.scale=0.25
 
   heart2=createSprite(displayWidth-120,40,20,20);
   heart2.addImage("heart1",heart1Img)
   heart2.scale=0.25
 
   heart3=createSprite(displayWidth-220,40,20,20);
   heart3.addImage("heart1",heart1Img)
   heart3.scale=0.25

   zombieGroup = new Group();
   bulletGroup = new Group();
}

function draw() {
  background(0); 

  
  if(gameState==="fight"){
    //moving up and down

if(keyDown("UP_ARROW")){
  player.y = player.y-20
}
if(keyDown("DOWN_ARROW")){
 player.y = player.y+20
}
//pressing spacebar release bullet and chnging shooterImg to shooting

if(keyWentDown("space")){

   bullet=createSprite(displayWidth-1150,player.y-30,20,10)
   //bullet.addImage(shooter_shooting)
   bullet.VelocityX=20;
   bulletGroup.add(bullet);
   player.depth=bullet.depth
   player.depth=player.depth+2
   player.addImage(shooter_shooting)
   bullets=bullets-1
}
//not pressing space bar
else if(keyWentUp("space")){
  

  player.addImage(shooterImg);

}

//if there are no bulltes gamstate=0

if(bullets==0){
  gameState="bullet";
}
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy()
      bulletGroup.destroyEach()

    }
  }

}
//zombie touches the player, the zombie gets destroyed
if(zombieGroup.isTouching(player)){
 

 for(var i=0;i<zombieGroup.length;i++){
  if(zombieGroup[i].isTouching(player)){

      
       zombieGroup[i].destroy()
       } 
      }

}
  

enemy();
  }
drawSprites();
if(gameState=="lost"){
  text("BETTER LUCK NEXT TIME",400,400);
  fill ("black");
  textSize(20);
  zombieGroup.destroyEach();
  player.destroy()
}

else if(gameState=="win"){
  text("YOU'VE DONE A GREAT JOB",400,400);
  fill ("red");
  textSize(20);
  zombieGroup.destroyEach();
  player.destroy()
}
else if (gameState=="bullet"){
  text("YOU'VE RAN OUT OF BULLETS",460,420);
  fill ("red");
  textSize(20);
  zombieGroup.destroyEach();
  player.destroy()
  bulletGroup.destroyEach()
}
  }




function enemy(){
  if(frameCount%50===0){

    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.2
    zombie.velocityX = -1
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}