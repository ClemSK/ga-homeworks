const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const scoreElement = document.querySelector("#scoreElement");
const startGameButton = document.querySelector("#startGameButton");
const modalElement = document.querySelector("#modalElement");
const endScoreElement = document.querySelector("#endScoreElement");
const clockElement = document.querySelector("#clock");
const modalClock = document.querySelector("#modalClock");
// const gameSounds = document.querySelectorAll("#player > div");

canvas.width = innerWidth / 2; // this takes up the whole page horizontally
canvas.height = innerHeight / 2; // this takes up the whole page verticallly

class Player {
  constructor(x, y, radius, color, borderColor, lineThickness) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.borderColor = borderColor;
    this.lineThickness = lineThickness;
  }
  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.strokeStyle = this.borderColor;
    context.lineWidth = this.lineThickness;
    context.fill();
    context.stroke();
  }
  moveLeft() {
    this.x -= 50;
    if (this.x <= 0) {
      this.x = 0;
    }
  }
  moveRight() {
    this.x += 50;
    if (this.x >= canvas.width) {
      this.x = canvas.width;
    }
  }
  moveUp() {
    this.y -= 50;
    if (this.y <= 0) {
      this.y = 0;
    }
  }
  moveDown() {
    this.y += 50;
    if (this.y >= canvas.height) {
      this.y = canvas.height;
    }
  }
}
// player position
let newPlayer1 = new Player(
  canvas.width / 2,
  canvas.height / 2,
  10,
  "white"
);

class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
  }
  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

class Enemy {
  constructor(x, y, radius, color, velocity, borderColor, lineThickness) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.borderColor = borderColor;
    this.lineThickness = lineThickness;
  }
  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.strokeStyle = this.borderColor;
    context.lineWidth = this.lineThickness;
    context.fill();
    context.stroke();
  }
  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

let animationID;
let score = 0;

function animate() {
  animationID = requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  newPlayer1.draw();

  projectiles.forEach((projectile) => {
    projectile.update();
  });

  enemies.forEach((enemy, index) => {
    enemy.update();

    const distance = Math.hypot(newPlayer1.x - enemy.x, newPlayer1.y - enemy.y);

    if (distance - enemy.radius - newPlayer1.radius < 1) {
      console.log("end game");
      cancelAnimationFrame(animationID);
      modalElement.style.display = "flex";
      endScoreElement.innerHTML = score;
      modalClock.innerHTML = clockElement.textContent;
      clearInterval(startTimer);
      stopStopwatch();
      // clearInterval(clockInterval);
      losingSound.play();
      gameMusic.pause();
    }

    // projectile touches enemy
    projectiles.forEach((projectile, projectileIndex) => {
      const distance = Math.hypot(
        projectile.x - enemy.x,
        projectile.y - enemy.y
      ); // distance between two points

      // objects touch
      if (distance - enemy.radius - projectile.radius < 1) {
        console.log("remove from screen");
        enemies.splice(index, 1);
        projectiles.splice(projectileIndex, 1);

        // increase score
        score += 100;
        console.log(score);
        scoreElement.innerHTML = score;
      }
    });
  });
}

const projectile = new Projectile(
  canvas.width / 2,
  canvas.height / 2,
  10,
  "red",
  {
    x: -1,
    y: -1,
  }
);

let projectiles = [];
let enemies = [];

function init() {
  newPlayer1 = new Player(
    canvas.width / 2,
    canvas.height / 2,
    10,
    "rgba(255, 255, 255, 0.6)",
    "white",
    3
  );
  projectiles = [];
  enemies = [];
  score = 0;
  scoreElement.innerHTML = score;
  endScoreElement.innerHTML = score;
  modalElement.style.display = "none";
  modalClock.innerHTML = "none";
  startStopwatch();
  gameMusic.play();
}

let startTimer = 0;
let startingInterval = 1000;

function spawnEnemies(interval) {
  startTimer = setInterval(function () {
    const radius = Math.random() * (80 - 10) + 10; // limit the radius of the enemies to specific range
    let x;
    let y;

    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius; // use Math.random to select a value between 0 - 1 if greater than 0.5 then
      y = Math.random() * canvas.height;
      // y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
    }
    const color = "rgba(0, 126, 0, 0.6)";
    const lineThickness = 3;
    const borderColor = "green"
    

    // detemine direction of click
    const enemiesAngle = Math.atan2(canvas.height - y, canvas.width - x);
    console.log(enemiesAngle); // show where is being clicked
    const velocity = {
      // speed and direction of click
      x: Math.cos(enemiesAngle) * 8,
      y: Math.sin(enemiesAngle) * 8,
    };
    enemies.push(new Enemy(x, y, radius, color, velocity, lineThickness, borderColor));
    console.log(enemies);

    generateMoreEnemies();
  }, interval);
}

function generateMoreEnemies() {
  if (score === 500) {
    console.log("score");
    clearInterval(startTimer);
    spawnEnemies(1500);
  } else if (score === 1000) {
    clearInterval(startTimer);
    spawnEnemies(1500);
  } else if (score === 1500) {
    clearInterval(startTimer);
    spawnEnemies(1000);
  } else if (score === 1500) {
    clearInterval(startTimer);
    spawnEnemies(500);
  } else if (score === 2000) {
    clearInterval(startTimer);
    spawnEnemies(300);
  } else if (score === 2500) {
    clearInterval(startTimer);
    spawnEnemies(100);
  } else if (score === 3000) {
    clearInterval(startTimer);
    spawnEnemies(50);
  } else if (score === 4000) {
    clearInterval(startTimer);
    spawnEnemies(30);
  }
}

canvas.addEventListener("click", (event) => {
  console.log(event);
  const angle = Math.atan2(
    event.clientY - canvas.height,
    event.clientX - canvas.width
  ); // detemine direction of click
  const velocity = {
    // speed and direction of click
    x: Math.cos(angle) * 20,
    y: Math.sin(angle) * 20,
  };
  // from original position (in the middle of the screen) move a projectile with velocity
  projectiles.push(
    new Projectile(newPlayer1.x, newPlayer1.y, 10, "white", velocity)
  );
});

const gameMusic = new Audio("581362__bloodpixelhero__unreal-reality.wav");
const shootingSound = new Audio("146725__leszek-szary__laser.wav");
const losingSound = new Audio("350988__cabled-mess__lose-c-04.wav");
canvas.addEventListener("click", () => {
  shootingSound.play();
});

startGameButton.addEventListener("click", () => {
  init();
  animate();
  spawnEnemies(startingInterval);
  startStopwatch();
});

let stopwatchStartTime = null;
let clockInterval = null;

function startStopwatch() {
  // We only want to start the stopwatch when the interval is null
  if (clockInterval === null) {
    stopwatchStartTime = Date.now();
    clockInterval = setInterval(updateDisplay, 10);
  }
}

function stopStopwatch() {
  clearInterval(clockInterval);
  clockInterval = null;
}
function updateDisplay() {
  // We take the difference between now and the start time, and we turn that into a date
  const elapsedTime = new Date(Date.now() - stopwatchStartTime);
  const minutes = elapsedTime.getMinutes().toString().padStart(2, "0");
  const seconds = elapsedTime.getSeconds().toString().padStart(2, "0");
  const milliseconds = elapsedTime
    .getMilliseconds()
    .toString()
    .padStart(3, "0");

  clockElement.textContent = `${minutes}:${seconds}.${milliseconds}`;
}

// movement keys for player 1
window.addEventListener("keydown", handleKeyDown);
function handleKeyDown(event) {
  switch (
    event.keyCode // position of letters might change when on different layouts - same in every language
  ) {
    case 37: // left
      newPlayer1.moveLeft();
      break;

    case 38: // up
      newPlayer1.moveUp();
      break;

    case 39: // right
      newPlayer1.moveRight();
      break;

    case 40: // down
      newPlayer1.moveDown();
      break;

    default:
      console.log("you cannot move player 1 like that");
  }
  console.log(event);
}
