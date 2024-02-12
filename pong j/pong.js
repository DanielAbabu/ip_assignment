/*variable declerations*/
const gameBoard = document.getElementById("gameBoard");
const leftScore = document.getElementById("leftScore");
const rightScore = document.getElementById("rightScore");
const ctx = gameBoard.getContext("2d");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const gameBackground = "white";
const PaddleColor = "brown";
const start= document.getElementsByClassName("gamecon");
const menu= document.getElementsByClassName("menu");
const menuStart = document.getElementById("menuScore");
let scoreL = 0, scoreR = 0, stopGame = false;
ctx.imageSmoothingEnabled = false;
gameBoard.style.backgroundColor = gameBackground;


/*game instance declarations*/
let ball = {
    x: gameWidth / 2,
    y: gameHeight / 2,
    radius: 3,
    speedX: 0.8,
    speedY: 0.8,

    draw: function(ctx){
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
    }
};

let leftpaddle = {
    x: 10,
    y: ((gameHeight / 2) - 15),
    width: 4.5,
    height: 30,
    speed: 3,

    draw: function(ctx){
        ctx.fillStyle = "brown";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.fill();
    }
}

let rightpaddle = {
    x: (gameWidth - 14.5),
    y: ((gameHeight / 2) - 15),
    width: 4.5,
    height: 30,
    speed: 3,

    draw: function(ctx){
        ctx.fillStyle = "darkblue";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 0.5;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.fill();
    }
}


/*function definitions*/
function gameLoop(){
    //clear the canvas
    ctx.clearRect(0, 0, gameWidth, gameHeight);

    /*moving the ball*/
    moveTo();

    /*drawing the left paddle and right paddle*/
    leftpaddle.draw(ctx)
    rightpaddle.draw(ctx);

    /*checking collision b/n ball and paddle*/
    checkCollision();

    /*updating the score*/
    scoreCounter();

    /*drawing the ball*/
    ball.draw(ctx);

    /*looping if stopgame is false*/
    if (!stopGame){
        requestAnimationFrame(gameLoop);
    }
    else{
        displayGame();
    }
};

function moveTo(){
    /*increasing the x and y position of the ball */
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    /*bounce the ball at the bottom of the canvas*/
    if(ball.y > gameHeight){
        ball.y = gameHeight;
        ball.speedY *= -1;
    }
    
    /*bounce the ball at the top of the canvas*/
    if(ball.y < 0){
        ball.y = 0;
        ball.speedY *= -1;
    }
}

function changeDirection(event){
    if(event.key == "w"){
        leftpaddle.y -= leftpaddle.speed;
    }
    if(event.key == "s"){
      leftpaddle.y += leftpaddle.speed;
    }
    if(event.key == "ArrowUp"){
      rightpaddle.y -= rightpaddle.speed;
    }
    if(event.key == "ArrowDown"){
      rightpaddle.y += rightpaddle.speed;
    }
    if(event.code == "Space"){
        createGame();
        stopGame = false;
        scoreL = 0;
        scoreR = 0;
        leftScore.innerText = 0;
        rightScore.innerText = 0;
        gameLoop();
    }
}

function checkCollision(){
    /*checking collision and bounce of accordingly*/
    if(ball.x < gameWidth && ball.x >= rightpaddle.x - ball.radius){
        if (ball.y >= rightpaddle.y && ball.y <= rightpaddle.y + rightpaddle.height){
            ball.x = rightpaddle.x - ball.radius;
            ball.speedX *= -1.1;
        }
    }

    if (ball.x > 0 && ball.x <= leftpaddle.x + leftpaddle.width + ball.radius){
        if (ball.y >= leftpaddle.y && ball.y <= leftpaddle.y + leftpaddle.height){
            ball.x = leftpaddle.x + leftpaddle.width + ball.radius;
            ball.speedX *= -1.1;
        }
    }

}

function createGame(){
    ball.x = gameWidth / 2;
    ball.y = gameHeight / 2;
    ball.radius = 3;

    if (Math.random() > 0.5)
    ball.speedX = 0.8;
    else
    ball.speedX = -0.8;

    ball.speedY = 0.8;
    leftpaddle.x = 10;
    leftpaddle.y = ((gameHeight / 2) - 15);
    rightpaddle.x = (gameWidth - 14.5);
    rightpaddle.y = ((gameHeight / 2) - 15);
}

function scoreCounter(){
    /**updating the score of both left and right paddle*/
    if(ball.x > gameWidth  + 100){
        leftScore.innerText = ++scoreL;
        createGame();
    }

    if(ball.x < -100){
        rightScore.innerText = ++scoreR;
        createGame();
    }

    /**checking the winner outof 10*/
    if (scoreL >= 5 || scoreR >= 5)
    {
        stopGame = true;
    }
}

function displayGame(){

    if (menu[0].style.display == "none"){
        menu[0].style.display = "flex";
        start[0].style.display = "none";
        menuStart.innerHTML = "<p>Score <br/> " + scoreL +" : " + scoreR + "</p>";
    }
    else {
        menu[0].style.display = "none";
        start[0].style.display = "block";
    }
}


/*event Listener for activities*/
document.addEventListener("keydown", changeDirection);



/*beginning of game execution*/
createGame();
gameLoop();
