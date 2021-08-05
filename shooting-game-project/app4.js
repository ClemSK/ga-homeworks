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

// I created a player class for when I thought I might have more than 1 player and that shooting was going to be done with buttons
// still useful as I used what I learnt in class and will make it easier to expand the game if I wanted to. 
class Player {
  constructor(x, y, radius, color, borderColor, lineThickness) { // border and lineThickness are there to add definition to the player
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.borderColor = borderColor;
    this.lineThickness = lineThickness;
  }
  // draw means to make shapes appear on canvas
  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); // this defines the player as a circle
    context.fillStyle = this.color; // this is the inner area that is coloured in
    context.strokeStyle = this.borderColor; // this is the color of the border
    context.lineWidth = this.lineThickness; // this is the thickness of the line - think of css
    context.fill(); // call function to fill circle
    context.stroke();// call function to draw the edge
  }

  // defining the movements and limits of the player to not go beyond the canvas edge, found this tricky.
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
// starting player position, resets here.
let newPlayer1 = new Player(
  canvas.width / 2,
  canvas.height / 2,
  10,
  "white"
);
// for creating multiple projectiles, definitely need to create a class for this as there will be many instances of a projectile
// which will be fired.
class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  // like with the player, we draw the projectile
  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
    // notice the lack of border, I'm making the distinction
  }
  update() { // here we are updating the position of the projectile to make it move, assigning direction and speed. 
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

class Enemy {
  // like with the player we are adding a border and line thickness, in addition to velocity
  // velocity is needed to move the enemies as they are not directed by the player or an oponent
  // the enemy class is constructed with aspects of the player class for appearance, but wiht the projectile update function
  // for automated movement
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

// animationID is set to 'let' to enable frame changes
let animationID;
// default score, which will be updated
let score = 0;

// bringing the game to life
function animate() {
  animationID = requestAnimationFrame(animate); // here animationID requests a frame, calls animate and creates a loop to change frames
  context.clearRect(0, 0, canvas.width, canvas.height); // essential part of canvas: clearing each frame to draw the next one with updated movement
  newPlayer1.draw();// calling the player function to respond to player actions

  // for each projectile added to the projectiles array, calling the update function in the projectile class, 
  // where we add velocity and update the position of the projectile
  projectiles.forEach((projectile) => { 
    projectile.update();
  });

  // similar to the projectile, with the update function
  enemies.forEach((enemy, index) => {
    enemy.update();

    // calculating the distance between player and enemy
    const distance = Math.hypot(newPlayer1.x - enemy.x, newPlayer1.y - enemy.y);

    // when the enemy touches the plyer => game over function
    if (distance - enemy.radius - newPlayer1.radius < 1) {
      console.log("end game");
      cancelAnimationFrame(animationID);
      modalElement.style.display = "flex";
      endScoreElement.innerHTML = score;
      modalClock.innerHTML = clockElement.textContent;
      clearInterval(startTimer);
      stopStopwatch(); // records the time at which you lost
      losingSound.play(); // plays a 'womp womp' sound
      gameMusic.pause(); // minor bug where the music does not reset when starting a new game. Also it's possible to use the play/pause button on the 
      // keyboard will start and stop the music once a 1st round of the game has been played, regardless of whether you're playing or not
      
    }

    // projectile touches enemy - defining the distance between a projectile and an enemy
    projectiles.forEach((projectile, projectileIndex) => {
      const distance = Math.hypot(
        projectile.x - enemy.x,
        projectile.y - enemy.y
      ); // distance between two points

      // objects touch - if the distance between an enemy radius and a projectile is less than 1, it has touched 
      if (distance - enemy.radius - projectile.radius < 1) {
        console.log("remove from screen");// and remove it from the screen
        enemies.splice(index, 1); // by removing it from the enemies array
        projectiles.splice(projectileIndex, 1); // and also removing the projectile from the projectiles array

        // increase score each time this happens
        score += 100; 
        console.log(score);
        scoreElement.innerHTML = score; // update the score on the screen
      }
    });
  });
}

const projectile = new Projectile( // creating a new projectile
  canvas.width / 2,
  canvas.height / 2,
  10,
  "white",
  {
    x: -1,
    y: -1,
  }
);

let projectiles = []; // where we store projectiles
let enemies = []; // where we store enemies

function init() { // function to start the game
  newPlayer1 = new Player( 
    canvas.width / 2,
    canvas.height / 2,
    10,
    "rgba(255, 255, 255, 0.6)", // player fillstyle - inner area color
    "white", // player strokestyle - boder color
    3 // linethickness in px
  );
  projectiles = []; // starting position of enemies, projectiles and score
  enemies = [];
  score = 0;
  scoreElement.innerHTML = score;
  endScoreElement.innerHTML = score;
  modalElement.style.display = "none"; // here setting the modal score and time to zero when we reset the game
  modalClock.innerHTML = "none";
  startStopwatch();
  gameMusic.play();
}

let startTimer = 0; // confusingly this is not to do wiht the clock stopwatch, 
// but the interval at which enemies enter the screen it's put here as it relates to the section just after enemies

let startingInterval = 1000; // set the initial interval at whihc enenmies appear,
// important for increasing the interval at which teh enemies get created later

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
  }, interval); // setting the 
}

// as score increases, decrease the time at which the enemeies spawn
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
    spawnEnemies(30); // crazytimes
  }
}

// function for clicking and sending a projectile
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
    new Projectile(newPlayer1.x, newPlayer1.y, 5, "white", velocity) // this is where the color and size of the projectile is defined
    // above there may be a possibility to define it, but it's last registered here. 
  );
});

// setting game music
const gameMusic = new Audio("581362__bloodpixelhero__unreal-reality.wav");
const shootingSound = new Audio("146725__leszek-szary__laser.wav");
const losingSound = new Audio("350988__cabled-mess__lose-c-04.wav");
canvas.addEventListener("click", () => {
  shootingSound.play();
});

// initiating the game from click
startGameButton.addEventListener("click", () => {
  init();
  animate();
  spawnEnemies(startingInterval);
  startStopwatch();
});

let stopwatchStartTime = null;
let clockInterval = null;

// stopwatch function
function startStopwatch() {
  // We only want to start the stopwatch when the interval is null
  if (clockInterval === null) {
    stopwatchStartTime = Date.now();
    clockInterval = setInterval(updateDisplay, 10);
  }
}
// stopping the timer when the playe loses
function stopStopwatch() {
  clearInterval(clockInterval);
  clockInterval = null;
}

// updating the stopwatch time
function updateDisplay() {
  const elapsedTime = new Date(Date.now() - stopwatchStartTime);
  const minutes = elapsedTime.getMinutes().toString().padStart(2, "0");
  const seconds = elapsedTime.getSeconds().toString().padStart(2, "0");
  const milliseconds = elapsedTime
    .getMilliseconds()
    .toString()
    .padStart(3, "0");

  clockElement.textContent = `${minutes}:${seconds}.${milliseconds}`; // where the timer updates the text elements for the player on screen
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
