let canvas = document.getElementById('myGame');
let ctx = canvas.getContext("2d");
document.getElementById('score').innerHTML = "YOUR SCORE: 000"
document.getElementById('top-score').innerText = `TOP SCORE:`
let localStorageKey = localStorage.getItem("highestScore")
document.getElementById('top-score').innerText = `TOP SCORE: ${localStorageKey}`


let score = 0;
let speed = 150;

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

let snakeArr = [];

snakeArr[0] = {
  x: 300,
  y: 300
}

//event listener stuff

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

  //loop over snake array, to draw snake 

  for (let i = 0; i < snakeArr.length; i++) {
    ctx.fillStyle = "green";
    ctx.fillRect(snakeArr[i].x, snakeArr[i].y, 30, 30);

    ctx.strokeStyle = "black";
    ctx.strokeRect(snakeArr[i].x, snakeArr[i].y, 30, 30);
  }

  //draw banana 

  ctx.drawImage(foodImg, bananaPos.x, bananaPos.y, 30, 30);

  // head position

  let snakeX = snakeArr[0].x
  let snakeY = snakeArr[0].y

  snakeArr.pop();

  // if (dArr.length >= 1) { d = dArr.shift() }

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

  //adds snake head
  snakeArr.unshift(snakeHead)

  eatSelf()

  //checks if snakeHead collides with boundaries

  if (bananaPos.x == snakeX && bananaPos.y == snakeY) {
    snakeArr.push(snakeHead)
    score += 10;

    if (score === 100) {
      speed = 100
      changeInterval()
    }
    if (score === 200) {
      speed = 75
      changeInterval()
    }
    if (score === 300) {
      speed = 50
      changeInterval()
    }
    if (score === 400) {
      speed = 40
      changeInterval()
    }
    if (score === 500) {
      speed = 30
      changeInterval()
    }

    if (typeof (Storage) !== "undefined") {
      // Store
      if (localStorageKey < score)
        localStorage.setItem("highestScore", score);
      // Retrieve
    }
    document.getElementById('score').innerText = `SCORE: ${score}`;

    bananaPos.x = Math.floor(Math.random() * 10) * 30;
    bananaPos.y = Math.floor(Math.random() * 10) * 30;
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

  ctx.drawImage(gameOverImg, 175, 200, 250, 200);
  ctx.font = "25px myFirstFont";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("PRESS SPACEBAR TO RESTART", canvas.width / 2, canvas.height / 4);

  if (score > localStorageKey) {
    alert("Sweet Bananas!!! New Top Score!!!")
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


