let gameOverText = document.getElementById("gameover")
gameOverText.style.visibility = "hidden"

let levelUpText = document.getElementById("level-up")
levelUpText.style.visibility = "hidden"

let winScreenText = document.getElementById("win-screen")
winScreenText.style.visibility = "hidden"

//----SOUNDS----//
let backgroundSound;
let gameOverSound;
let levelUpSound;
let winnerSound;

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.volume = 0.05;
    this.sound.muted = false;
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
    this.muted = function(){
        this.sound.muted = true
      }
    this.unmuted = function(){
        this.sound.muted = false
      }
  }

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
        this.clear()
        document.getElementById('tryagain').onclick = () => {
            gameOverSound.stop();
            startGame();
            gameOverText.style.visibility = "hidden"
          };
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

let playerImg = new Image()
playerImg.src = "./images/marioFlyRight.png"

let obstacle1Img = new Image()
obstacle1Img.src = "./images/canonL1Up.png"

let obstacle2Img = new Image()
obstacle2Img.src = "./images/canonL1Down.png"

let obstacle3Img = new Image()
obstacle3Img.src = "./images/canonL1Down.png"

let obstacle4Img = new Image()
obstacle4Img.src = "./images/canonL1Up.png"

let obstacle5Img = new Image()
obstacle5Img.src = "./images/canonL1Down.png"

let obstacle6Img = new Image()
obstacle6Img.src = "./images/canonL1Down.png"

let obstacle7Img = new Image()
obstacle7Img.src = "./images/canonL1Up.png"

let myBackgroundImg = new Image()
myBackgroundImg.src = "./images/GameWallpaper.png"


//------ELEMENTS------//

function component(image, x, y, width, height) {
    this.image = image
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;

    this.update = function () {
        ctx = myGameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    this.newPos = function () {
        this.x += this.speedX * 2;
        this.y += this.speedY * 2;
    }

    this.crashWith = function (otherobj) {
        let myleft = this.x;
        let myright = this.x + (this.width -5);
        let mytop = this.y;
        let mybottom = this.y + (this.height -5);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width -5);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height -5);
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
        // playerLeft = new component(playerLeftImg, 10, 400, 60, 60);
    } 

    if (myGameArea.key && myGameArea.key == 39 && player.x < 930) { //---RIGHT
        player.speedX = 4; 
        // player.image.src = "/images/marioFlyRight.png"
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
        case '6': (obstacle6.y < 500) ? (obstacle6.y += 9) : (obstacle6.y = -60); break;
        case '7': (obstacle7.y > -60) ? (obstacle7.y -= 9) : (obstacle7.y = 540);
    }
}

function checkCrash() {
    if (player.crashWith(obstacle1) || player.crashWith(obstacle2) || player.crashWith(obstacle3) || player.crashWith(obstacle4) || player.crashWith(obstacle5) || player.crashWith(obstacle6) || player.crashWith(obstacle7)) {
        backgroundSound.stop();
        gameOverSound.play();
        myGameArea.stop();
    } 
}

function checkGoal(){
    if (player.x >= 870){
        backgroundSound.stop();
        levelUpSound.play()
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
    obstacle7.update();
}

function upDatePositions (){
    movePlayer(); 
    moveObstacles('1')
    moveObstacles('2')
    moveObstacles('3')
    moveObstacles('4')
    moveObstacles('5')
    moveObstacles('6')
    moveObstacles('7')

}

function updateGameArea() {
    checkCrash()
    checkGoal()
    myGameArea.clear();
    myGameArea.frameNo += 1; 
    upDatePositions()
    upDateComponents()
}

backgroundSound = new sound("./sounds/background-sound.mp3");
winnerSound = new sound("./sounds/winner-sound.mp3");

//------START GAME------//

function startGame() {
    levelUpText.style.visibility = "hidden"
    gameOverText.style.visibility = "hidden"
    winScreenText.style.visibility = "hidden"
    clearInterval(myGameArea.interval);
    gameOverSound = new sound("./sounds/game-over-sound.mp3");
    levelUpSound = new sound("./sounds/level-up-sound.mp3");
    
    backgroundSound.currentTime = 0;
    if (backgroundSound.sound.muted){
        backgroundSound.muted()
    } else {
        backgroundSound.play()
    }
    myGameArea.start();
    myBackground = new component(myBackgroundImg, 0, 0, 1000, 500);
    player = new component(playerImg, 10, 400, 60, 60);
    obstacle1 = new component(obstacle1Img, 160, 0, 50, 60);
    obstacle2 = new component(obstacle2Img, 265, 0, 50, 60);
    obstacle3 = new component(obstacle3Img, 370, 0, 50, 60);
    obstacle4 = new component(obstacle4Img, 475, 0, 50, 60);
    obstacle5 = new component(obstacle5Img, 580, 0, 50, 60);
    obstacle6 = new component(obstacle6Img, 685, 0, 50, 60);
    obstacle7 = new component(obstacle7Img, 790, 0, 50, 60);
}

  document.getElementById('mute-button').onclick = () => {
    if (backgroundSound.sound.muted){
        backgroundSound.unmuted()
    } else if (!backgroundSound.sound.muted){
        backgroundSound.muted()
    }
  }

window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        startGame()
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
        this.clear()
        document.getElementById('tryagain').onclick = () => {
            gameOverSound.stop();
            startLevel2();
            gameOverText.style.visibility = "hidden"
          };
    },
    levelUp: function (){
        clearInterval(this.interval);
        levelUpText.style.visibility = "visible"
        document.getElementById('continue').onclick = () => {
            levelUpSound.stop()
            startLevel3();
            levelUpText.style.visibility = "hidden"
          };
    }
}

let L2obstacle1Img = new Image()
L2obstacle1Img.src = "./images/canonL2Up.png"

let L2obstacle2Img = new Image()
L2obstacle2Img.src = "./images/canonL2Down.png"

let L2obstacle3Img = new Image()
L2obstacle3Img.src = "./images/canonL2Down.png"

let L2obstacle4Img = new Image()
L2obstacle4Img.src = "./images/canonL2Up.png"

let L2obstacle5Img = new Image()
L2obstacle5Img.src = "./images/canonL2Down.png"

let L2obstacle6Img = new Image()
L2obstacle6Img.src = "./images/canonL2Down.png"

let L2obstacle7Img = new Image()
L2obstacle7Img.src = "./images/canonL2Up.png"


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
    obstacle7.update();
}

function upDatePositions2 (){
    movePlayer(); 
    moveObstacles2('1')
    moveObstacles2('2')
    moveObstacles2('3')
    moveObstacles2('4')
    moveObstacles2('5')
    moveObstacles2('6')
    moveObstacles2('7')
}

function moveObstacles2(obstacleNum) {
    switch (obstacleNum) {
        case '1': (obstacle1.y > -60) ? (obstacle1.y -= 7) : (obstacle1.y = 540); break;
        case '2': (obstacle2.y < 500) ? (obstacle2.y += 10) : (obstacle2.y = -60); break;
        case '3': (obstacle3.y < 500) ? (obstacle3.y += 6) : (obstacle3.y = -60); break;
        case '4': (obstacle4.y > -60) ? (obstacle4.y -= 8) : (obstacle4.y = 540); break;
        case '5': (obstacle5.y < 500) ? (obstacle5.y += 7) : (obstacle5.y = -60); break;
        case '6': (obstacle6.y < 500) ? (obstacle6.y += 10) : (obstacle6.y = -60); break;
        case '7': (obstacle7.y > -60) ? (obstacle7.y -= 10) : (obstacle7.y = 540);
    }
}

function checkCrash2() {
    if (player.crashWith(obstacle1) || player.crashWith(obstacle2) || player.crashWith(obstacle3) || player.crashWith(obstacle4) || player.crashWith(obstacle5) || player.crashWith(obstacle6) || player.crashWith(obstacle7)) {
        backgroundSound.stop()
        gameOverSound.play()
        myGameArea2.stop();
    } 
}


function checkGoal2(){
    if (player.x >= 870){
        backgroundSound.stop()
        levelUpSound.play()
        myGameArea2.levelUp();
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
    backgroundSound = new sound("./sounds/background-sound.mp3");
    gameOverSound = new sound("./sounds/game-over-sound.mp3");
    levelUpSound = new sound("./sounds/level-up-sound.mp3");
    backgroundSound.currentTime = 0; 
    backgroundSound.play()
    myGameArea2.start();
    myBackground = new component(myBackgroundImg, 0, 0, 1000, 500);
    player = new component(playerImg, 10, 400, 60, 60);
    obstacle1 = new component(L2obstacle1Img, 160, 0, 50, 60);
    obstacle2 = new component(L2obstacle2Img, 265, 0, 50, 60);
    obstacle3 = new component(L2obstacle3Img, 370, 0, 50, 60);
    obstacle4 = new component(L2obstacle4Img, 475, 0, 50, 60);
    obstacle5 = new component(L2obstacle5Img, 580, 0, 50, 60);
    obstacle6 = new component(L2obstacle6Img, 685, 0, 50, 60);
    obstacle7 = new component(L2obstacle7Img, 790, 0, 50, 60);
}

  //------------------------------LEVEL 3--------------------------------//


  //------GAME AREA - Level 3------//

  let myGameArea3 = {
    canvas: document.getElementById("canvas"),
    start: function () {
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea3, 20);
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
        this.clear()
        document.getElementById('tryagain').onclick = () => {
            gameOverSound.stop();
            startLevel3();
            gameOverText.style.visibility = "hidden"
          };
    },
    levelUp: function (){
        clearInterval(this.interval);
        levelUpText.style.visibility = "visible"
        this.clear()
        document.getElementById('continue').onclick = () => {
            levelUpSound.stop()
            startLevelFinal();
            levelUpText.style.visibility = "hidden"
          };
    }
}

let L3obstacle1Img = new Image()
L3obstacle1Img.src = "./images/plantUp.png"

let L3obstacle2Img = new Image()
L3obstacle2Img.src = "./images/plantDown.png"

let L3obstacle3Img = new Image()
L3obstacle3Img.src = "./images/plantDown.png"

let L3obstacle4Img = new Image()
L3obstacle4Img.src = "./images/plantUp.png"

let L3obstacle5Img = new Image()
L3obstacle5Img.src = "./images/plantDown.png"

let L3obstacle6Img = new Image()
L3obstacle6Img.src = "./images/plantDown.png"

let L3obstacle7Img = new Image()
L3obstacle7Img.src = "./images/plantUp.png"


//------UPDATES - Level 3------//

function upDateComponents3(){
    myBackground.newPos(); myBackground.update()
    player.newPos()
    player.update()
    obstacle1.update();
    obstacle2.update();
    obstacle3.update();
    obstacle4.update();
    obstacle5.update();
    obstacle6.update();
    obstacle7.update();
}

function upDatePositions3 (){
    movePlayer(); 
    moveObstacles3('1')
    moveObstacles3('2')
    moveObstacles3('3')
    moveObstacles3('4')
    moveObstacles3('5')
    moveObstacles3('6')
    moveObstacles3('7')
}

function moveObstacles3(obstacleNum) {
    switch (obstacleNum) {
        case '1': (obstacle1.y > -150) ? (obstacle1.y -= 7) : (obstacle1.y = 450); break;
        case '2': (obstacle2.y < 500) ? (obstacle2.y += 9) : (obstacle2.y = -150); break;
        case '3': (obstacle3.y < 500) ? (obstacle3.y += 6) : (obstacle3.y = -150); break;
        case '4': (obstacle4.y > -150) ? (obstacle4.y -= 9) : (obstacle4.y = 450); break;
        case '5': (obstacle5.y < 500) ? (obstacle5.y += 7) : (obstacle5.y = -150); break;
        case '6': (obstacle6.y < 500) ? (obstacle6.y += 10) : (obstacle6.y = -150); break;
        case '7': (obstacle7.y > -150) ? (obstacle7.y -= 10) : (obstacle7.y = 450);
    }
}

function checkCrash3() {
    if (player.crashWith(obstacle1) || player.crashWith(obstacle2) || player.crashWith(obstacle3) || player.crashWith(obstacle4) || player.crashWith(obstacle5) || player.crashWith(obstacle6) || player.crashWith(obstacle7)) {
        backgroundSound.stop();
        gameOverSound.play();
        myGameArea3.stop();
    } 
}


function checkGoal3(){
    if (player.x >= 870){
        backgroundSound.stop();
        levelUpSound.play()
        myGameArea3.levelUp();
    }
}

function updateGameArea3() {
    checkCrash3()
    checkGoal3()
    myGameArea3.clear();
    myGameArea3.frameNo += 1; 
    upDatePositions3()
    upDateComponents3()
}


function startLevel3() {
    backgroundSound = new sound("./sounds/background-sound.mp3");
    gameOverSound = new sound("./sounds/game-over-sound.mp3");
    levelUpSound = new sound("./sounds/level-up-sound.mp3");
    backgroundSound.currentTime = 0; 
    backgroundSound.play()
    myGameArea3.start();
    myBackground = new component(myBackgroundImg, 0, 0, 1000, 500);
    player = new component(playerImg, 10, 400, 60, 60);
    obstacle1 = new component(L3obstacle1Img, 160, 0, 60, 150);
    obstacle2 = new component(L3obstacle2Img, 265, 0, 60, 150);
    obstacle3 = new component(L3obstacle3Img, 370, 0, 60, 150);
    obstacle4 = new component(L3obstacle4Img, 475, 0, 60, 150);
    obstacle5 = new component(L3obstacle5Img, 580, 0, 60, 150);
    obstacle6 = new component(L3obstacle6Img, 685, 0, 60, 150);
    obstacle7 = new component(L3obstacle7Img, 790, 0, 60, 150);
}


//------------------------------FINAL LEVEL--------------------------------//

let myGameAreaFinal = {
    canvas: document.getElementById("canvas"),
    start: function () {
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameAreaFinal, 20);
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
        this.clear()
        document.getElementById('tryagain').onclick = () => {
            gameOverSound.stop()
            startLevelFinal();
            gameOverText.style.visibility = "hidden"
          };
    },
    win: function (){
        clearInterval(this.interval)
        this.clear()
        winScreenText.style.visibility = "visible"
    }
}

let finalBackGroundImg = new Image()
finalBackGroundImg.src = "./images/fondoFinal.png"

let L4obstacle1Img = new Image()
L4obstacle1Img.src = "./images/fireUp2.png"

let L4obstacle2Img = new Image()
L4obstacle2Img.src = "./images/fireDown2.png"

let L4obstacle2bImg = new Image()
L4obstacle2bImg.src = "./images/fireDown2.png"

let L4obstacle3Img = new Image()
L4obstacle3Img.src = "./images/fireDown2.png"

let L4obstacle4Img = new Image()
L4obstacle4Img.src = "./images/fireUp2.png"

let L4obstacle4bImg = new Image()
L4obstacle4bImg.src = "./images/fireUp2.png"

let L4obstacle5Img = new Image()
L4obstacle5Img.src = "./images/fireDown2.png"

let L4obstacle6Img = new Image()
L4obstacle6Img.src = "./images/fireDown2.png"

let L4obstacle7Img = new Image()
L4obstacle7Img.src = "./images/fireUp2.png"

let L4obstacle7bImg = new Image()
L4obstacle7bImg.src = "./images/fireUp2.png"


//------UPDATES - FINAL LEVEL------//

function upDateComponentsFinal(){
    myBackground.newPos();
    myBackground.update();
    player.newPos()
    player.update()
    obstacle1.update();
    obstacle2.update();
    obstacle2b.update();
    obstacle3.update();
    obstacle4.update();
    obstacle4b.update();
    obstacle5.update();
    obstacle6.update();
    obstacle7.update();
    obstacle7b.update();
}

function upDatePositionsFinal (){
    movePlayer(); 
    moveObstaclesFinal('1')
    moveObstaclesFinal('2')
    moveObstaclesFinal('2b')
    moveObstaclesFinal('3')
    moveObstaclesFinal('4')
    moveObstaclesFinal('4b')
    moveObstaclesFinal('5')
    moveObstaclesFinal('6')
    moveObstaclesFinal('7')
    moveObstaclesFinal('7b')
}

function moveObstaclesFinal(obstacleNum) {
    switch (obstacleNum) {
        case '1': (obstacle1.y > -50) ? (obstacle1.y -= 7) : (obstacle1.y = 540); break;
        case '2': (obstacle2.y < 500) ? (obstacle2.y += 10) : (obstacle2.y = -50); break;
        case '2b': (obstacle2b.y < 500) ? (obstacle2b.y += 10) : (obstacle2b.y = -50); break;
        case '3': (obstacle3.y < 500) ? (obstacle3.y += 6) : (obstacle3.y = -50); break;
        case '4': (obstacle4.y > -50) ? (obstacle4.y -= 8) : (obstacle4.y = 540); break;
        case '4b': (obstacle4b.y > -50) ? (obstacle4b.y -= 8) : (obstacle4b.y = 540); break;
        case '5': (obstacle5.y < 500) ? (obstacle5.y += 7) : (obstacle5.y = -50); break;
        case '6': (obstacle6.y < 500) ? (obstacle6.y += 10) : (obstacle6.y = -50); break;
        case '7': (obstacle7.y > -50) ? (obstacle7.y -= 10) : (obstacle7.y = 540); break;
        case '7b': (obstacle7b.y > -50) ? (obstacle7b.y -= 10) : (obstacle7b.y = 540);
    }
}

function checkCrashFinal() {
    if (player.crashWith(obstacle1) || player.crashWith(obstacle2) || player.crashWith(obstacle2b) || player.crashWith(obstacle3) || player.crashWith(obstacle4) || player.crashWith(obstacle4b) || player.crashWith(obstacle5) || player.crashWith(obstacle6) || player.crashWith(obstacle7) || player.crashWith(obstacle7b)) {
        backgroundSound.stop();
        gameOverSound.play();
        myGameAreaFinal.stop();
    } 
}


function checkGoalFinal(){
    if (player.x >= 870){
        backgroundSound.stop();
        winnerSound.play()
        myGameAreaFinal.win();
    }
}

function updateGameAreaFinal() {
    checkCrashFinal()
    checkGoalFinal()
    myGameAreaFinal.clear();
    myGameAreaFinal.frameNo += 1; 
    upDatePositionsFinal()
    upDateComponentsFinal()
}


function startLevelFinal() {
    backgroundSound = new sound("./sounds/background-sound.mp3");
    gameOverSound = new sound("./sounds/game-over-sound.mp3");
    levelUpSound = new sound("./sounds/level-up-sound.mp3");
    winnerSound = new sound("./sounds/winner-sound.mp3")
    backgroundSound.currentTime = 0; 
    backgroundSound.play()
    myGameAreaFinal.start();
    myBackground = new component(finalBackGroundImg, 0, 0, 1000, 500);
    player = new component(playerImg, 10, 400, 60, 60);
    obstacle1 = new component(L4obstacle1Img, 160, 0, 50, 60);
    obstacle2 = new component(L4obstacle2Img, 265, 0, 50, 60);
    obstacle2b = new component(L4obstacle2bImg, 265, 250, 50, 60)
    obstacle3 = new component(L4obstacle3Img, 370, 0, 50, 60);
    obstacle4 = new component(L4obstacle4Img, 475, 0, 50, 60);
    obstacle4b = new component(L4obstacle4bImg, 475, 250, 50, 60);
    obstacle5 = new component(L4obstacle5Img, 580, 0, 50, 60);
    obstacle6 = new component(L4obstacle6Img, 685, 0, 50, 60);
    obstacle7 = new component(L4obstacle7Img, 790, 0, 50, 60);
    obstacle7b = new component(L4obstacle7bImg, 790, 250, 50, 60);
}