let canvas = document.getElementById('myGame');
let ctx = canvas.getContext("2d");

document.getElementById('score').innerHTML = "YOUR SCORE: 000"
document.getElementById('top-score').innerText = `TOP SCORE:`
let localStorageKey = localStorage.getItem("highestScore")
document.getElementById('top-score').innerText = `TOP SCORE: ${localStorageKey}`


let score = 0;
let speed = 150;

//images 

let ground = new Image();
ground.src = "images/ground.jpg";

let gameOverImg = new Image();
gameOverImg.src = "images/gameover.png";

let foodImg = new Image();
foodImg.src = "images/banana.png";


let bananaPos = {
  x: Math.floor(Math.random() * 20) * 30,
  y: Math.floor(Math.random() * 20) * 30
}

let foodImg2 = new Image();
foodImg2.src = "images/bananabunch.png"

//audio

let eat = new Audio();
eat.src = "Audio/OldSchool45.m4a";

let dies = new Audio();
dies.src = "Audio/OldSchool43.m4a";

let win = new Audio();
win.src = "Audio/Win.mp3";

let ring = new Audio();
ring.src = "Audio/Impact8.m4a";

let snakeArr = [];

snakeArr[0] = {
  x: 300,
  y: 300
}

//event listener 

let d;
let keysEnabled = true;

document.addEventListener("keydown", direction);

function direction(event) {
  if (keysEnabled) {
    if (event.keyCode == 37 && d != "RIGHT") {
      d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
      d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
      d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
      d = "DOWN";
    }
  }
  keysEnabled = false
}

function drawGame() {
  keysEnabled = true

  //canvas background

  ctx.drawImage(ground, 0, 0, 600, 600);

  //loop over snakeArr, to draw snake 

  for (let i = 0; i < snakeArr.length; i++) {
    ctx.fillStyle = "green";
    ctx.fillRect(snakeArr[i].x, snakeArr[i].y, 30, 30);

    ctx.strokeStyle = "black";
    ctx.strokeRect(snakeArr[i].x, snakeArr[i].y, 30, 30);
  }

  //draw bananas

  if (score % 50 == 0 && score != 0) {
    ctx.drawImage(foodImg2, bananaPos.x, bananaPos.y, 30, 30)
  } else {
    ctx.drawImage(foodImg, bananaPos.x, bananaPos.y, 30, 30);
  }

  // head position

  let snakeX = snakeArr[0].x
  let snakeY = snakeArr[0].y

  //removes lost block from snakeArr

  snakeArr.pop();

  if (d == "LEFT") {
    snakeX -= 30;

  } if (d == "UP") {
    snakeY -= 30;

  } if (d == "RIGHT") {
    snakeX += 30;

  } if (d == "DOWN") {
    snakeY += 30;

  }

  //create new snake head

  let snakeHead = {
    x: snakeX,
    y: snakeY
  }

  //add snake head
  snakeArr.unshift(snakeHead)

  eatSelf()

  //eats banana

  if (bananaPos.x == snakeX && bananaPos.y == snakeY) {
    snakeArr.push(snakeHead)
    if (score % 50 == 0 && score != 0) {
      score += 30;
      ring.play();
    } else {
      score += 10;
    }

    eat.play();

    if (score === 100) {
      speed = 120
      changeInterval()
    }
    if (score === 200) {
      speed = 110
      changeInterval()
    }
    if (score === 300) {
      speed = 85
      changeInterval()
    }
    if (score === 400) {
      speed = 70
      changeInterval()
    }
    if (score === 500) {
      speed = 70
      changeInterval()
    }

    bananaPos.x = Math.floor(Math.random() * 10) * 30;
    bananaPos.y = Math.floor(Math.random() * 10) * 30;


    if (typeof (Storage) !== "undefined") {

      // store score
      if (localStorageKey < score)
        localStorage.setItem("highestScore", score);

      // retrieve score
    }
    document.getElementById('score').innerText = `SCORE: ${score}`;

  }

  if (snakeX < 0 || snakeY < 0 || snakeX >= 600 || snakeY >= 600) {
    gameOver()
  }
}

let startGame;
function changeInterval() {
  if (startGame) clearInterval(startGame);
  startGame = setInterval(drawGame, speed);
}
changeInterval()

function gameOver() {
  clearInterval(startGame);
  ctx.font = "25px myFirstFont";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("PRESS \"SPACEBAR\" TO RESTART", canvas.width / 2, canvas.height / 4);

  if (score > localStorageKey) {
    win.play();

    ctx.font = "33px myFirstFont";
    ctx.fillStyle = '#edc244';
    ctx.textAlign = "center";

    ctx.fillText("Sweet Bananas!", canvas.width / 2, canvas.height / 2);
    ctx.fillText("You set a new Top Score!", canvas.width / 2, canvas.height / 1.7)

  } else {
    dies.play();
    ctx.drawImage(gameOverImg, 175, 200, 250, 200);
  }

  document.onkeydown = function (e) {
    if (e.keyCode == 82) {
      alert("Mir Saidi has most score!!!")
    }
    if (e.keyCode == 32) {
      location.reload(); //reloads page 

    }
  }

}

//collision detection - between head and body 

function collide(a, b) {
  if (a.x == b.x && a.y == b.y) {
    gameOver()
  }
}

function eatSelf() {
  let head = snakeArr[0];
  for (let i = 1; i < snakeArr.length; i++) {
    collide(head, snakeArr[i])

  }
}


