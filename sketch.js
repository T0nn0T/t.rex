var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud
var cloudimage
var cacto

var inicio=1
var jogando=2
var fim=3
var gamestate=inicio
var groupcacto

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  cloudimage = loadImage("cloud.png")
  
  groundImage = loadImage("ground2.png");


  cacto1=loadImage("obstacle1.png")
  cacto2=loadImage("obstacle2.png")
  cacto3=loadImage("obstacle3.png")
  cacto4=loadImage("obstacle4.png")
  cacto5=loadImage("obstacle5.png")
  cacto6=loadImage("obstacle6.png")
  

 
  
}

function setup() {

  createCanvas(600,200)
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //crie sprite ground (solo)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -7;
  
  //crie um solo invisível
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;


  groupcacto=createGroup()
  
  
  



}

function draw() {
  //definir cor do plano de fundo
  background(250);
   
  //estado de jogo


  if(gamestate==jogando){

    // pulando o trex ao pressionar a tecla de espaço
  if(keyDown("space")&& trex.y >= 150) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //impedir que o trex caia
  trex.collide(invisibleGround);
  
  //Gerar Nuvens
  spawnClouds()

  criarcactos()

  if(trex.isTouching(groupcacto)){

    gamestate=fim
  



  }
  }


  if(gamestate==fim){

    ground.velocityX=0
    groupcacto.velocityX=0
    cloud.velocityX=0
    trex.velocityX=0



  }
  

  
  


  // pulando o trex ao pressionar a tecla de espaço
  if(keyDown("space")&& trex.y >= 150) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //impedir que o trex caia
  trex.collide(invisibleGround);
  
  //Gerar Nuvens
  spawnClouds()

  criarcactos()
  
  drawSprites();
}

//função para gerar as nuvens
function spawnClouds(){
  
  if(frameCount%100==0){

  var y = random(30,100)
  cloud=createSprite(600,y,30,10)
  cloud.addImage("nuvem",cloudimage)
  cloud.velocityX=-5 
  cloud.depth = trex.depth
  trex.depth = trex.depth+1
  cloud.lifetime=300
  }

  
  
}




function criarcactos(){
  
  if(frameCount%50==0){

  cacto=createSprite(600,160,30,10)
  cacto.scale=0.6
  cacto.velocityX=-7
  cacto.depth=ground.depth
  cacto.lifetime=600
    var r=(round(random(1,6)))
  
  switch(r){
    case 1:cacto.addImage(cacto1)
    break
    case 2:cacto.addImage(cacto2)
    break
    case 3:cacto.addImage(cacto3)
    break
    case 4:cacto.addImage(cacto4)
    break
    case 5:cacto.addImage(cacto5)
    break
    case 6:cacto.addImage(cacto6)
    break

    default:break
    
  }
    
  groupcacto.add(cacto)

}
}