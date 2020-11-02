let gameOverText = document.getElementById("gameover")
gameOverText.style.visibility = "hidden"

let levelUpText = document.getElementById("level-up")
levelUpText.style.visibility = "hidden"

let winScreenText = document.getElementById("win-screen")
winScreenText.style.visibility = "hidden"


//------GAME AREA------//

let myGameArea = {
    canvas: document.getElementById("canvas"),
    start: function () {
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
        gameOverText.style.visibility = "visible"
    },
    levelUp: function (){
        clearInterval(this.interval);
        levelUpText.style.visibility = "visible"
        this.clear()
        document.getElementById('continue').onclick = () => {
            startLevel2();
            levelUpText.style.visibility = "hidden"
          };
    }
}


//------MY VARIABLES------//

let player;
let obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
let myBackground;


//------ELEMENTS------//

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;

    this.update = function () {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else if (type == "image") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    this.newPos = function () {
        this.x += this.speedX * 2;
        this.y += this.speedY * 2;
    }

    this.crashWith = function (otherobj) {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);
        let crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }

}


//------FUNCTIONS------//

function movePlayer() {
    player.speedX = 0
    player.speedY = 0
    if (myGameArea.key && myGameArea.key == 37 && player.x > 10) { //---LEFT
        player.speedX = -4; 
        player.image.src = "/images/marioFlyLeft.png"
    } 

    if (myGameArea.key && myGameArea.key == 39 && player.x < 930) { //---RIGHT
        player.speedX = 4; 
        player.image.src = "/images/marioFlyRight.png"
    } 

    if (myGameArea.key && myGameArea.key == 38 && player.y > 10) {player.speedY = -4;} //---UP

    if (myGameArea.key && myGameArea.key == 40 && player.y < 430) {player.speedY = 4; } //---DOWN
}

function moveObstacles(obstacleNum) {
    switch (obstacleNum) {
        case '1': (obstacle1.y > -60) ? (obstacle1.y -= 6) : (obstacle1.y = 540); break;
        case '2': (obstacle2.y < 500) ? (obstacle2.y += 9) : (obstacle2.y = -60); break;
        case '3': (obstacle3.y < 500) ? (obstacle3.y += 5) : (obstacle3.y = -60); break;
        case '4': (obstacle4.y > -60) ? (obstacle4.y -= 7) : (obstacle4.y = 540); break;
        case '5': (obstacle5.y < 500) ? (obstacle5.y += 6) : (obstacle5.y = -60); break;
        case '6': (obstacle6.y < 500) ? (obstacle6.y += 9) : (obstacle6.y = -60);
    }
}

function checkCrash() {
    if (player.crashWith(obstacle1) || player.crashWith(obstacle2) || player.crashWith(obstacle3) || player.crashWith(obstacle4) || player.crashWith(obstacle5) || player.crashWith(obstacle6)) {
        myGameArea.stop();
    } 
}

function checkGoal(){
    if (player.x >= 900){
        myGameArea.levelUp();
    }
}


//------UPDATES------//

function upDateComponents(){
    myBackground.newPos(); myBackground.update()
    player.newPos(); player.update()
    obstacle1.update();
    obstacle2.update();
    obstacle3.update();
    obstacle4.update();
    obstacle5.update();
    obstacle6.update();
}

function upDatePositions (){
    movePlayer(); 
    moveObstacles('1')
    moveObstacles('2')
    moveObstacles('3')
    moveObstacles('4')
    moveObstacles('5')
    moveObstacles('6')
}

function updateGameArea() {
    checkCrash()
    checkGoal()
    myGameArea.clear();
    myGameArea.frameNo += 1; 
    upDatePositions()
    upDateComponents()
}

//------START GAME------//

function startGame() {
    levelUpText.style.visibility = "hidden"
    gameOverText.style.visibility = "hidden"
    winScreenText.style.visibility = "hidden"
    myGameArea.start();
    myBackground = new component(1000, 500, "/images/fondo3.png", 0, 0, "image");
    player = new component(60, 60, "/images/marioFlyRight.png", 10, 210, "image");
    obstacle1 = new component(60, 60, "./images/canonL1Up.png", 125, 400, "image");
    obstacle2 = new component(60, 60, "./images/canonL1Down.png", 250, 0, "image");
    obstacle3 = new component(60, 60, "./images/canonL1Down.png", 375, 0, "image");
    obstacle4 = new component(60, 60, "./images/canonL1Up.png", 500, 0, "image");
    obstacle5 = new component(60, 60, "./images/canonL1Down.png", 625, 0, "image");
    obstacle6 = new component(60, 60, "./images/canonL1Down.png", 750, 0, "image");
}


// startGame()

window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      startGame();
    };
  }


  //------------------------------LEVEL 2--------------------------------//



  //------GAME AREA - Level 2------//

  let myGameArea2 = {
    canvas: document.getElementById("canvas"),
    start: function () {
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea2, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
        gameOverText.style.visibility = "visible"
    },
    win: function (){
        clearInterval(this.interval)
        winScreenText.style.visibility = "visible"
    }
}

//------UPDATES - Level 2------//

function upDateComponents2(){
    myBackground.newPos(); myBackground.update()
    player.newPos()
    player.update()
    obstacle1.update();
    obstacle2.update();
    obstacle3.update();
    obstacle4.update();
    obstacle5.update();
    obstacle6.update();
}

function upDatePositions2 (){
    movePlayer(); 
    moveObstacles2('1')
    moveObstacles2('2')
    moveObstacles2('3')
    moveObstacles2('4')
    moveObstacles2('5')
    moveObstacles2('6')
}

function moveObstacles2(obstacleNum) {
    switch (obstacleNum) {
        case '1': (obstacle1.y > -60) ? (obstacle1.y -= 7) : (obstacle1.y = 540); break;
        case '2': (obstacle2.y < 500) ? (obstacle2.y += 10) : (obstacle2.y = -60); break;
        case '3': (obstacle3.y < 500) ? (obstacle3.y += 6) : (obstacle3.y = -60); break;
        case '4': (obstacle4.y > -60) ? (obstacle4.y -= 8) : (obstacle4.y = 540); break;
        case '5': (obstacle5.y < 500) ? (obstacle5.y += 7) : (obstacle5.y = -60); break;
        case '6': (obstacle6.y < 500) ? (obstacle6.y += 10) : (obstacle6.y = -60);
    }
}

function checkCrash2() {
    if (player.crashWith(obstacle1) || player.crashWith(obstacle2) || player.crashWith(obstacle3) || player.crashWith(obstacle4) || player.crashWith(obstacle5) || player.crashWith(obstacle6)) {
        myGameArea2.stop();
    } 
}


function checkGoal2(){
    if (player.x >= 900){
        myGameArea2.win();
    }
}

function updateGameArea2() {
    checkCrash2()
    checkGoal2()
    myGameArea2.clear();
    myGameArea2.frameNo += 1; 
    upDatePositions2()
    upDateComponents2()
}


function startLevel2() {
    myGameArea2.start();
    myBackground = new component(1000, 500, "/images/fondo3.Level2.png", 0, 0, "image");
    player = new component(60, 60, "/images/marioFlyRight.png", 10, 210, "image");
    obstacle1 = new component(60, 60, "./images/canonL2Up.png", 125, 400, "image");
    obstacle2 = new component(60, 60, "./images/canonL2Down.png", 250, 0, "image");
    obstacle3 = new component(60, 60, "./images/canonL2Down.png", 375, 0, "image");
    obstacle4 = new component(60, 60, "./images/canonL2Up.png", 500, 0, "image");
    obstacle5 = new component(60, 60, "./images/canonL2Down.png", 625, 0, "image");
    obstacle6 = new component(60, 60, "./images/canonL2Down.png", 750, 0, "image");
}





