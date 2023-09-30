const leftPaddle = document.getElementById("leftPaddle");
const rightPaddle = document.getElementById("rightPaddle");
const ball = document.getElementById("ball");

let ballX = 400; // Initial ball X position
let ballY = 200; // Initial ball Y position
let ballSpeedX = 5; // Initial ball X speed
let ballSpeedY = 2; // Initial ball Y speed
const paddleSpeed = 5; // Paddle speed

function updateGameArea() {
    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Check for collisions with top and bottom walls
    if (ballY < 0 || ballY > 380) {
        ballSpeedY = -ballSpeedY;
    }

    // Check for collisions with paddles
    if (
        (ballX < 40 && ballX > 30 && ballY > leftPaddle.offsetTop && ballY < leftPaddle.offsetTop + 100) ||
        (ballX > 760 && ballX < 770 && ballY > rightPaddle.offsetTop && ballY < rightPaddle.offsetTop + 100)
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Check for scoring
    if (ballX < 0 || ballX > 800) {
        // Ball went out of bounds, reset position
        ballX = 400;
        ballY = 200;
    }

    // Update ball position
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
}

document.addEventListener("keydown", function (event) {
    // Move left paddle
    if (event.key === "ArrowUp" && leftPaddle.offsetTop > 0) {
        leftPaddle.style.top = leftPaddle.offsetTop - paddleSpeed + "px";
    } else if (event.key === "ArrowDown" && leftPaddle.offsetTop < 300) {
        leftPaddle.style.top = leftPaddle.offsetTop + paddleSpeed + "px";
    }

    // Move right paddle
    if (event.key === "w" && rightPaddle.offsetTop > 0) {
        rightPaddle.style.top = rightPaddle.offsetTop - paddleSpeed + "px";
    } else if (event.key === "s" && rightPaddle.offsetTop < 300) {
        rightPaddle.style.top = rightPaddle.offsetTop + paddleSpeed + "px";
    }
});

setInterval(updateGameArea, 20); // Update the game area every 20 milliseconds
