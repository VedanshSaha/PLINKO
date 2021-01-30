var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var particles = [];
var plinkos = [];
var divisions = [];
var particle;
var count = 0;
const PLAY = 1;
const END = 0;
var gameState = PLAY;

var divisionHeight = 300;
var score = 0;

function preload() {
  meme = loadSound("ooh.mp3");
}
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height, width, 20);
  meme.loop();

  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(
      new Divisions(k, height - divisionHeight / 2, 10, divisionHeight)
    );
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 75));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 175));
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 275));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 375));
  }
}

function draw() {
  background("black");
  textSize(20);
  Engine.update(engine);

  if(gameState === PLAY){
    text("Score : " + score, 20, 30);

  if (particle != null) {
    particle.display();
    posi = particle.body.position;

    if (posi.y > 760) {
      if ((posi.x < 85 && posi.x > 10) || (posi.x < 565 && posi.x > 490)) {
        score = score + 500;
        //particles=null;
        if (count === 5) {
          gameState = END;
        }
      }

      if ((posi.x < 165 && posi.x > 90) || (posi.x < 720 && posi.x > 650)) {
        score = score + 100;
        //particles=null;
        if (count === 5) {
          gameState = END;
        }
      }

      if ((posi.x < 245 && posi.x > 170) || (posi.x > 410 && posi.x < 485)) {
        score = score + 300;
        //particles=null;
        if (count === 5) {
          gameState = END;
        }
      }

      if (posi.x > 330 && posi.x < 400) {
        score = score + 400;
        //particles=null;
        if (count === 5) {
          gameState = END;
        }
      }

      if (posi.x > 570 && posi.x < 640) {
        score = score + 200;
        //particles=null;
        if (count === 5) {
          gameState = END;
        }
      }

      if ((posi.x > 250 && posi.x < 330) || (posi.x > 730 && posi.x < 805)) {
        let rand = Math.round(random(1, 5));
        switch (rand) {
          case 1:
            score += 100;
            break;

          case 2:
            score += 200;
            break;

          case 3:
            score += 300;
            break;

          case 4:
            score += 400;
            break;

          case 5:
            score += 500;
            break;
        }
        //particles=null;
        if (count === 5) {
          gameState = END;
        }
      }

      // if(particle.body.position.x>301&&particle.body.position.x<600)
      // {
      //    score=score+100;
      //   // particle=null;
      //    if(count===5)
      //    {
      //      gameState=END;
      //    }
      // }

      // if(particle.body.position.x>601&&particle.body.position.x<900)
      // {
      //   score=score+200;
      //  // particle=null;
      //   if(count===5)
      //   {
      //     gameState=END;
      //   }
      // }
      particle = null;
    }
  }

  noStroke();

  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }
  //if(frameCount%60===0){

  //score++;
  //}

  for (var j = 0; j < particles.length; j++) {
    particles[j].display();
  }
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  if (count >= 5) {
    gameState = END;
  }

  console.log("MouseX: " + mouseX, "MouseY: " + mouseY);

  fill(255);
  text("Chances Left: " + (0 - count + 5), 650, 30);
  text("500", 25, 560);
  text("100", 105, 560);
  text("300", 185, 560);
  text("400", 345, 560);
  text("300", 425, 560);
  text("500", 505, 560);
  text("200", 585, 560);
  text("100", 665, 560);
  textSize(18);
  text("Random", 726, 560);
  text("Random", 245, 560);
  ground.display();
  if (particle) {
    particle.display();
  }
  }else{
    fill(255)
    tint(255,60,12,50)
    textSize(60)
    text("GAME OVER",width/2-200,height/2-40)
    textSize(30)
    text("Your Score Is : "+ score,width/2-150,height/2)
  }
}

function mousePressed() {
  if (gameState !== END && particle === null && count >= 1) {
    particle = new Particle(mouseX, 0, 10, 10);
    count += 1;
  } else if (count === 0) {
    particle = new Particle(mouseX, 0, 10, 10);
    count += 1;
  }
}
