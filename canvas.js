let canvas = document.getElementById('myGame');
let ctx = canvas.getContext("2d");

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

// snakeArr.push({ x: 330, y: 300 })
// snakeArr.push({ x: 360, y: 300 })
// snakeArr.push({ x: 390, y: 300 })
// snakeArr.push({ x: 410, y: 300 })
// snakeArr.push({ x: 440, y: 300 })
// snakeArr.push({ x: 470, y: 300 })
// snakeArr.push({ x: 500, y: 300 })

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

  //DRAW BANANA

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
    document.getElementById('high-score').innerText = `Highest Score: ${score}`;
    bananaPos.x = 90 + Math.floor(Math.random() * 10) * 30
    bananaPos.y = 90 + Math.floor(Math.random() * 10) * 30

  }

  if (snakeX < 0 || snakeY < 0 || snakeX >= 600 || snakeY >= 600) {
    gameOver()
  }


}

let startGame = setInterval(drawGame, 200);

function gameOver() {
  clearInterval(startGame);
  ctx.drawImage(gameOverImg, 190, 200, 250, 200);
}

//collision detection - between head and body 

function collide(a, b) {
  if (a.x == b.x && a.y == b.y) {
    console.log("loser", a.x, b.x, a.y, b.y)
    gameOver()
  }
}

function eatSelf() {
  let head = snakeArr[0];
  console.log("snakeArr", snakeArr)
  //it uses position x=300 and y=300 as defined above. 
  for (let i = 1; i < snakeArr.length; i++) {
    collide(head, snakeArr[i])
  }
}



/* function intersect(a, b) {
 var aLeft = a.x;
 var aTop = a.y;
 var aRight = a.x + a.width;
 var aBottom = a.y + a.height;

 var bLeft = b.x;
 var bTop = b.y;
 var bRight = b.x + b.width;
 var bBottom = b.y + b.height;

 return !(aLeft > bRight ||
   aRight < bLeft ||
   aTop > bBottom ||
   aBottom < bTop)
}

intersect({ x: snakeX, y: snakeY, width: 30, height: 30 }, { x: 0, y: 0, width: 30 , height: 30 * }) */

