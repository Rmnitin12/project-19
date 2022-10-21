var pineapple, pineappleani, pineapplejumping
var ground
var bugGroup, redbug, greenbug, purplebug, orangebug
var sun, water, goodGroup
var ladybug, ladybugGroup
var upperground
var PLAY = 1
var END = 0
var gameState = PLAY
var score
var restartimg
var resetimg
function preload(){
pineappleani = loadAnimation("pineapple-1.png","pineapple-2.png","pineapple-3.png")
jungle = loadImage("jungle.png")
pineapplejumping = loadAnimation("pineapple-3.png")
redbug = loadImage("red-bug.png")
orangebug = loadImage("orange-bug.png")
purplebug = loadImage("purple-bug.png")
greenbug = loadImage("green-bug.png")
sun = loadImage("sun_emoji.png")
water = loadImage("water_drops.png")
ladybug = loadImage("ladybug.png")
restartimg = loadImage("restart.png")
resetimg = loadImage("resest.png")
}

function setup() {
 createCanvas(windowWidth,windowHeight)
 bg = createSprite(width,height/2,width,height)
 bg.addImage(jungle)
 bg.scale = 0.9
 
 
 
 ground = createSprite(width/2,height-120,width*3,5)
 ground.shapeColor = "pink"
 

 upperground = createSprite(width/2,height-450,width*3,5)
 upperground.shapeColor = "pink"




 pineapple = createSprite(70,height-185)
 pineapple.addAnimation("running",pineappleani)
 pineapple.addAnimation("jumping", pineapplejumping)
 pineapple.scale = 0.5

 bugGroup = new Group();
 goodGroup = new Group();
 ladybugGroup = new Group();


 restarti = createSprite(600,300)
 restarti.addImage(restartimg)

 restarti.visible = false


 reseti = createSprite(40,40)
 reseti.addImage(resetimg)
 reseti.scale = 0.2
 reseti.visible = false
score = 0
  
}

function draw() {
 background("red")
 
if (gameState===PLAY){
   
    
     
    
     if (ground.x < -width+1370){
        ground.x = width
      } 
      ground.visible = false
     
      if (upperground.x < -width+1370){
        upperground.x = width
      } 
     upperground.visible = false 

     ground.velocityX = -10
     upperground.velocityX = -10
     bg.velocityX = -10


     spawnBugs()
  spawnGood()
  

  if(score < 0){
    gameState = END;
}


if (bg.x < -width+1370){
    bg.x = width
  } 

  
  
  
  if (keyDown("space") &&   pineapple.collide(ground) ){
     pineapple.velocityY = -15
     pineapple.changeAnimation("jumping")
  }

  

  if (pineapple.collide(ground)){
    pineapple.changeAnimation("running")
  }


  if (frameCount % 200 === 0){
     ladybugs()
  }
  pineapple.velocityY = pineapple.velocityY + 0.8


  ladybugGroup.bounceOff(upperground)
  ladybugGroup.bounceOff(ground)
  
  goodgone()
  badgone()
  pinebigger()
}

else if (gameState === END){
    restarti.visible = true;
    reseti.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    pineapple.velocityY = 0;
    goodGroup.setVelocityXEach(0);
    bugGroup.setVelocityXEach(0);
    ladybugGroup.setVelocityYEach(0);
    ladybugGroup.setVelocityXEach(0);
    bg.velocityX = 0

    pineapple.changeAnimation("jumping")

    bugGroup.setLifetimeEach(-50)
    goodGroup.setLifetimeEach(-50)
    ladybugGroup.setLifetimeEach(-50)

    if (mousePressedOver(reseti)) {
       restart()
    }
  


}


  
  
 drawSprites()
 textSize(30)
 fill("red")
 text("score:"+score,width-300,50)
}

function keyPressed (){
    if (keyCode == UP_ARROW){
        
        pineapple.velocityY = -25
    }
 }

function spawnBugs(){
    if(frameCount % 150 === 0){
        var bug = createSprite(width, height-150, 100,100)
        bug.velocityX = -(6);
    
        //generate random obstacles
        var rand = Math.round(random(1,4));
        switch(rand) {
          case 1: bug.addImage(redbug);
                  break;
          case 2: bug.addImage(greenbug);
                  break;
          case 3: bug.addImage(purplebug);
                  break;
          case 4: bug.addImage(orangebug);
                  break;
          default: break;
        }
        //assign scale and lifetime to the obstacle           
    bug.scale = 0.1;
    bug.lifetime = 300;
    //add each obstacle to the group
    bugGroup.add(bug);
    }







 }



 function spawnGood(){
    if(frameCount % 150 === 0){
        var good = createSprite(width, Math.round(random(100,500)), 100,100)
        good.velocityX = -(10);
    
        //generate random obstacles
        var rand = Math.round(random(1,2));
        switch(rand) {
          case 1: good.addImage(sun);
                  break;
          case 2: good.addImage(water);
                 
          default: break;
        }
        //assign scale and lifetime to the obstacle           
    good.scale = 0.1;
    good.lifetime = 300;
    //add each obstacle to the group
    goodGroup.add(good);
    }







 }

 
 function ladybugs (){
    var lady = createSprite(Math.round(random(550,width-30)),height- 175, 100,100)
   lady.addImage(ladybug)
   lady.velocityX = -4
   lady.scale = 0.1
   lady.lifetime = 300

   if (lady.y <= 521){
   lady.velocityY = 4
   }

   else if (lady.y < height-120 && lady.y > 520 ) {
    lady.velocityY = -4 


   }


  ladybugGroup.add(lady)
    
 }



 

 
       
    

 function goodgone (){
    pineapple.overlap(goodGroup,function(collector,collected){
        collected.remove()
        score = score + 1 

    })
 }



 function badgone (){
    pineapple.overlap(bugGroup,function(collector,collected){
        collected.remove()
        score = score - 2 

    })
 }


 function pinebigger(){
    pineapple.overlap(ladybugGroup,function(collector,collected){
        collected.remove()
        pineapple.scale = 0.75
    })
 }

function restart (){

    gameState = PLAY;
    
    restarti.visible = false; 
    reseti.visible = false
    
    bugGroup.destroyEach();
    goodGroup.destroyEach();
    ladybugGroup.destroyEach();
    
    
   
    score = 0;
}