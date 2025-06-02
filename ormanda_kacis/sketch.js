let bgImage;
let rockImage;

let karakterDur;
let karakterSag = [];
let karakterSol = [];

let kuslar = [];
let kusGorselleri = [];

let characterX;
let characterY;
let characterW;
let characterH;

let rocks = [];
let gameOver = false;

let direction = "none";
let walkFrame = 0;

let score = 0;

let restartButton; 

function preload() {
  bgImage = loadImage('resim/arkaplan.png');
  rockImage = loadImage('resim/tas.png');

  karakterDur = loadImage('resim/karakter_dur.png');
  karakterSag[0] = loadImage('resim/karakter_sag1.png');
  karakterSag[1] = loadImage('resim/karakter_sag2.png');
  karakterSol[0] = loadImage('resim/karakter_sol1.png');
  karakterSol[1] = loadImage('resim/karakter_sol2.png');

  for (let i = 1; i <= 4; i++) {
    kusGorselleri.push(loadImage(`resim/bird_frame_${i}.png`));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  characterW = width * 0.07;
  characterH = height * 0.18;
  characterX = width / 2 - characterW / 2;
  characterY = height - characterH - 20;

  rocks.push({ x: random(0, width - 40), y: -50 });

  kuslar.push({
    x: -100,
    y: 100,
    speed: 2,
    frame: 0
  });

  
  restartButton = createButton("Yeniden Başla");
  restartButton.position(width / 2 - 60, height / 2 + 100);
  restartButton.size(120, 40);
  restartButton.style('font-size', '16px');
  restartButton.style('background-color', '#007BFF');
  restartButton.style('color', 'white');
  restartButton.style('border', 'none');
  restartButton.style('border-radius', '8px');
  restartButton.hide();
  restartButton.mousePressed(restartGame);
}

function draw() {
  image(bgImage, 0, 0, width, height);

  if (!gameOver) {
    restartButton.hide();

    if (keyIsDown(LEFT_ARROW)) {
      characterX -= 3;
      direction = 'left';
    } else if (keyIsDown(RIGHT_ARROW)) {
      characterX += 3;
      direction = 'right';
    } else {
      direction = 'none';
    }

    characterX = constrain(characterX, 0, width - characterW);

    let characterImage = karakterDur;
    if (direction === 'left') {
      if (frameCount % 10 === 0) walkFrame = (walkFrame + 1) % 2;
      characterImage = karakterSol[walkFrame];
    } else if (direction === 'right') {
      if (frameCount % 10 === 0) walkFrame = (walkFrame + 1) % 2;
      characterImage = karakterSag[walkFrame];
    }
    image(characterImage, characterX, characterY, characterW, characterH);

    for (let i = 0; i < kuslar.length; i++) {
      let kus = kuslar[i];
      kus.x += kus.speed;
      if (frameCount % 5 === 0) {
        kus.frame = (kus.frame + 1) % kusGorselleri.length;
      }
      image(kusGorselleri[kus.frame], kus.x, kus.y, 80, 60);
      if (kus.x > width + 100) {
        kus.x = -100;
        kus.y = random(50, height / 2);
      }
    }

    for (let i = 0; i < rocks.length; i++) {
      let rock = rocks[i];
      rock.y += 5;
      image(rockImage, rock.x, rock.y, 40, 40);

      if (
        rock.y + 40 > characterY &&
        rock.x < characterX + characterW &&
        rock.x + 40 > characterX
      ) {
        gameOver = true;
      }

      if (rock.y > height) {
        rocks.splice(i, 1);
        i--;
        score++;
      }
    }

    if (frameCount % 40 === 0) {
      for (let i = 0; i < 2; i++) {
        rocks.push({ x: random(0, width - 40), y: -40 });
      }
    }

    fill(0, 100, 255);
    textSize(24);
    textAlign(LEFT);
    text("Skor: " + score, 20, 40);

  } else {
    fill(0, 100, 255);
    textSize(40);
    textAlign(CENTER);
    text("GAME OVER", width / 2, height / 2);
    textSize(30);
    text("Skor: " + score, width / 2, height / 2 + 50);

    restartButton.show(); 
  }
}

function restartGame() {
  score = 0;
  rocks = [{ x: random(0, width - 40), y: -50 }];
  gameOver = false;
  characterX = width / 2 - characterW / 2;
  characterY = height - characterH - 20;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  characterW = width * 0.07;
  characterH = height * 0.18;
  characterX = constrain(characterX, 0, width - characterW);
  characterY = height - characterH - 20;
  restartButton.position(width / 2 - 60, height / 2 + 100);
}
