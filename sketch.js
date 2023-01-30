const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = [];
var brokenboatanimation = [];
var brokenboatspritedate,brokenballspritesheet;

var boatAnimation = [];
var boatSpriteData, boatSpriteSheet;
var background_music;
var cannon_explosion;
var cannon_water;


function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatSpriteData = loadJSON("assets/boat/boat.json");
  boatSpriteSheet = loadImage("assets/boat/boat.png");
  brokenboatspritedate = loadJSON("assets/boat/broken_boat.json");
brokenboutspritesheet = loadImage("assets/boat/broken_boat.png");
background_music=loadSound ("assets/background_music.mp3");
cannon_explosion=loadSound ("assets/cannon_explosion.mp3");
cannon_water=loadSound("assets/cannon_water.mp3");

}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 100, 50, angle);

  
  var boatFrames = boatSpriteData.frames;
  for(var i = 0; i<boatFrames.length; i++){
   var pos = boatFrames[i].position;
   var img = boatSpriteSheet.get(pos.x,pos.y,pos.w,pos.h);
   boatAnimation.push(img);
  }
  var brokenboatframes = brokenboatspritedate.frames;
  for( var i = 0; i<brokenboatframes.length; i++){
    var pos = brokenboatframes[i].position;
    var img = brokenboatspritesheet. get (pos.x,pos.y,pos.w,pos.h);
brokenboatanimation.push(img);

  }

}

function draw() {
  showBoats()
  background(189);
  image(backgroundImg, 0, 0, width, height);



  Engine.update(engine);
  ground.display();
showBoats();
 

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    for(var j=0; j>boats.length;j++){
      if(balls[i]!== undefined && boats[j]!==undefined){
        var colision = Matter.SAT.collides(balls[i].body,boats[j].body);
        if (colision.collided){
          boats[j].remove(j);
          Matter.World.remove(world,balls[i].body);
          balls.splice(i,1)
          i--;
          


        }
      }
    }
  }

  cannon.display();
  tower.display();

  
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

//función para mostrar la bala
function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}

 

    function showBoats() {
      if (boats.length > 0) {
        if (
          boats.length < 4 &&
          boats[boats.length - 1].body.position.x < width - 300
        ) {
          var positions = [-130, -100, -120, -80];
          var position = random(positions);
          var boat = new Boat(width,height - 100, 200, 200, position,boatAnimation);
          boats.push(boat);
        }
    
        for (var i = 0; i < boats.length; i++) {
          Matter.Body.setVelocity(boats[i].body, {
            x: -0.9,
            y: 0
          });
    
          boats[i].display();
          boats[i].animate();
        }
      } else {
        var boat = new Boat(width, height - 100, 200, 200, -100,boatAnimation);
        boats.push(boat);
      }
    }
function keyReleased() {
  if (keyCode === DOWN_ARROW) { 
    balls[balls.length - 1].shoot();
  }
}



