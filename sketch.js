//Create variables here
var dog,foodS,foodStock;
var dogImg,happyDogImg;
function preload()
{
  //load images here
  dogImg = loadImage("images/Dog.png");
  happyDogImg = loadImage("images/happyDog.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,350,10,10);
  dog.addImage(dogImg);
  dog.scale=0.3;

  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value",readStock,showError)

  
}


function draw() {  
background(46, 139, 87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogImg);
}
  drawSprites();
  //add styles here
  fill("white");
  textSize(25);
  stroke("blue")
text("Food Remaining: "+foodS,130,150);
text("Press the up arrow key to feed the dog food",10,50);
}

function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').set({
    food:x
  }
  )
}
function showError(){
  console.log("Error");
}
