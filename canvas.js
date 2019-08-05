let canvas = document.getElementById('myGame');
let ctx = canvas.getContext("2d");
document.getElementById('score').innerText = "SCORE: 0"
document.getElementById('top-score').innerText = `TOP SCORE:`
let localStorageKey = localStorage.getItem("highestScore")
document.getElementById('top-score').innerText = `TOP SCORE:${localStorageKey}`


let score = 0;

/* let state = {
play: true,
pause: false,
gameOver: false
} */

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

let d;

document.addEventListener("keydown", direction);

function direction(event) {
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

function drawGame() {

  //canvas background

  ctx.drawImage(ground, 0, 0, 600, 600);

  //loop over snake array, to draw snake 

  for (let i = 0; i < snakeArr.length; i++) {
    ctx.fillStyle = "green";
    ctx.fillRect(snakeArr[i].x, snakeArr[i].y, 30, 30);

  }

  //draw banana 

  ctx.drawImage(foodImg, bananaPos.x, bananaPos.y, 30, 30);

  // head position

  let snakeX = snakeArr[0].x
  let snakeY = snakeArr[0].y

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

  //checks if snakeHead collides with boundaries

  if (bananaPos.x == snakeX && bananaPos.y == snakeY) {
    snakeArr.push(snakeHead)
    score += 10;
    if (typeof (Storage) !== "undefined") {
      // Store
      if (localStorageKey < score)
        localStorage.setItem("highestScore", score);
      // Retrieve
    }
    document.getElementById('score').innerText = `SCORE:${score}`;

    bananaPos.x = Math.floor(Math.random() * 10) * 30;
    bananaPos.y = Math.floor(Math.random() * 10) * 30;
  }

  if (snakeX < 0 || snakeY < 0 || snakeX >= 600 || snakeY >= 600) {
    gameOver()
  }
}

let startGame = setInterval(drawGame, 100);

function gameOver() {
  clearInterval(startGame);
  ctx.drawImage(gameOverImg, 190, 200, 250, 200);
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
