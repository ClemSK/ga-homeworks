const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
// let paddleX = (canvas.width - drawPlayerPaddle(xCoordinate))
// - unsure if I need to use this

context.fillStyle = 'green'

function drawPlayerPaddle(xCoordinate, yCoordinate, width, height) {
    context.fillRect(xCoordinate, yCoordinate, width, height)
}
drawPlayerPaddle(280, 290, 100, 10)

function drawComputerPaddle (xCoordinate, yCoordinate, width, height) {
    context.fillRect(xCoordinate, yCoordinate, width, height)
}
drawComputerPaddle(10, 10, 100, 10)

let x = canvas.width / 100;
let y = canvas.height - 280;
let dx = 2;
let dy = 2;
let paddleX = 100
let player2PaddleX = 100
let playerScore = 0
let player2Score = 0

function drawBall () {
    context.fillRect(x, y, 20, 20)
}

function reset() {
    context.clearRect(0, 0, 400, 300)
}

function drawPath() {
    reset()
    drawBall()
    x += dx;
    y += dy;

    drawPlayerPaddle(paddleX, 290, 100, 10)// using the xCoordinate to update the x-axis variable
    drawComputerPaddle(player2PaddleX, 0, 100, 10) // how to make the ai paddle move independently
    if(y + dy < 0 || y + dy > canvas.height) {
        dy = -dy
    }
    // if y value hits paddle then bounce if not then reset

    if(x + dx > canvas.width || x + dx < 0) {
        dx = -dx;
    }
    // update()
    // instead: check if the move key is pressed and add/subtract the coordinates to move it
    // drawScore()
}
setInterval(drawPath, 10)

function isRightKey(event) {
    return event.keyCode === 39
}
function isLeftKey(event) {
    return event.keyCode === 37
}
function isAKey(event) {
    return event.keyCode === 65
}
function isDKey(event) {
    return event.keyCode === 68
}

let arrowRightPressed = false
let arrowLeftPressed = false
let keyAPressed = false
let keyDPressed = false

// change event listener to check what key is being pressed to decide to set move left or right
document.addEventListener('keydown', (event) => { // keydown vs keypress
    // right arrow
    if (isRightKey(event)) {
        arrowRightPressed === true
        paddleX += 40
        if(paddleX + 100 > canvas.width){
            paddleX = canvas.width - 100;
        }
        console.log('Key down',event.code)
    }
    // left arrow
    else if (isLeftKey(event)) {
        arrowLeftPressed === true
        paddleX -= 40
        if (paddleX < 0){
            paddleX = 0
        }
        console.log('Key down', event.code)
    } // A key
    else if (isAKey(event)) {
        keyAPressed === true
        player2PaddleX -= 40
        if (player2PaddleX < 0){
            player2PaddleX = 0
        }
        console.log('Key down', event.code)
    } // D key
    else if (isDKey(event)) {
        keyDPressed === true
        player2PaddleX += 40
        if(player2PaddleX + 100 > canvas.width){
            player2PaddleX = canvas.width - 100;
        }
        console.log('Key down', event.code)
    }

})

    // collision detection

    // if hit paddle bounce off
    // if not on paddle then go off screen AND increment score for user or computer

    function collision(paddle, ball) {
        drawPlayerPaddle.top = drawPlayerPaddle.y;
        drawPlayerPaddle.bottom = drawPlayerPaddle.y + drawPlayerPaddle.height;
        drawPlayerPaddle.left = drawPlayerPaddle.x;
        drawPlayerPaddle.right = drawPlayerPaddle.x + drawPlayerPaddle.width;

        drawBall.top = drawBall.y - drawBall;
        drawBall.bottom = drawBall.y + drawBall;
        drawBall.left = drawBall.x - drawBall;
        drawBall.right = drawBall.x + drawBall;

        return drawPlayerPaddle.left < drawBall.right && drawPlayerPaddle.top < drawBall.bottom && drawPlayerPaddle.right > drawBall.left && drawPlayerPaddle.bottom > drawBall.top;
    }

    // function update(){
    //
    // // change the score of players, if the ball goes to the left "ball.x<0" computer win, else if "ball.x > canvas.width" the user win
    // if( drawBall.y - drawBall.height < 0 ){
    //     player2Score.score++;
    //     player2Score.play(); // not sure what to do here
    //     reset();
    // }else if( drawBallball.y + drawBallball.radius > canvas.width){
    //     playerScore.score++;
    //     playerScore.play();
    //     reset();
    // }

    // check if the paddle hit the player1 or the player2 paddle
    // let player = (drawBall.x + drawBall.radius < canvas.height/2) ? paddleX : player2PaddleX;
    //
    // // if the ball hits a paddle
    // if(collision(ball,player)){
      //     // play sound
      //     hit.play();
      //     // we check where the ball hits the paddle
      //     let collidePoint = (ball.y - (player.y + player.height/2));
      //     // normalize the value of collidePoint, we need to get numbers between -1 and 1.
      //     // -player.height/2 < collide Point < player.height/2
      //     collidePoint = collidePoint / (player.height/2);

    // computer plays for itself, and we must be able to beat it
    // simple AI
    // player2PaddleX += ((drawBall.y - (player2PaddleX + player2PaddleX.height/2)))*0.1;





    // function getDistance(x1, y1, x2, y2) {
    //   let xDistance = x2 - x1
    //   let yDistance = y2 - y1
    //
    //   return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
    // }
    // if (getDistance(x1, y1, x2, y2) < edge1 + edge2) {
    //   object1.color = 'red'
    // }else {
    //   object.color = 'black'
    // }
    // console.log(getDistance(x1, y1, x2, y2))


    // This works if needed

    // function drawScore(text, x, y) {
    //     context.font = "16px Arial";
    //     context.fillText("Score", 100, 200 );
    // }
    // // context.fillText("Score: "+score, 8, 20);
    // drawScore(something, x, y, green)

    // }
