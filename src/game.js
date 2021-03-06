let gameOverText = document.getElementById("gameover")
gameOverText.style.visibility = "hidden"

let levelUpText = document.getElementById("level-up")
levelUpText.style.visibility = "hidden"

let winScreenText = document.getElementById("win-screen")
winScreenText.style.visibility = "hidden"


//-------------------------------SOUNDS-------------------------------//

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.volume = 0.05;
    this.sound.muted = false;
    this.sound.loop = false;

    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
    this.muted = function () {
        this.sound.muted = true
    }
    this.unmuted = function () {
        this.sound.muted = false
    }
}

let backgroundSound = new sound("./sounds/background-sound.mp3");
let winnerSound = new sound("./sounds/winner-sound.mp3");
let gameOverSound = new sound("./sounds/game-over-sound.mp3");
let levelUpSound = new sound("./sounds/level-up-sound.mp3");
let finalLevelSound = new sound("./sounds/final-level-sound.mp3")

backgroundSound.sound.loop = true
finalLevelSound.sound.loop = true

function changeMusicIcon() {
    if (backgroundSound.sound.muted) {
        document.getElementById("unmute").src = "./images/mute.png"
    } else if (!backgroundSound.sound.muted) {
        document.getElementById("unmute").src = "./images/unmute.png"
    }
}

function changeEffectsIcon() {
    if (gameOverSound.sound.muted) {
        document.getElementById("unmuteEffects").src = "./images/mute.png";
    } else if (!gameOverSound.sound.muted) {
        document.getElementById("unmuteEffects").src = "./images/unmute.png";
    }
}

document.getElementById('mute-button').onclick = () => {
    if (backgroundSound.sound.muted && finalLevelSound.sound.muted) {
        backgroundSound.unmuted()
        finalLevelSound.unmuted()
    } else if (!backgroundSound.sound.muted && !finalLevelSound.sound.muted) {
        backgroundSound.muted()
        finalLevelSound.muted()
    }
    changeMusicIcon()
}

document.getElementById('muteEffects-button').onclick = () => {
    if (gameOverSound.sound.muted && levelUpSound.sound.muted) {
        gameOverSound.unmuted()
        levelUpSound.unmuted()
    } else if (!gameOverSound.sound.muted && !levelUpSound.sound.muted) {
        gameOverSound.muted()
        levelUpSound.muted()
    }
    changeEffectsIcon()
}

//--------------MY VARIABLES: Player, Obstacles & Background--------------//

let playerImg = new Image()
playerImg.src = "./images/marioFlyRight.png"

let playerLeftImg = new Image()
playerLeftImg.src = "./images/marioFlyLeft.png"

//------Level 1------//

let myBackgroundImg = new Image()
myBackgroundImg.src = "./images/GameTheme.png"

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

//------Level 2------//

let l2obstacle1Img = new Image()
l2obstacle1Img.src = "./images/canonL2Up.png"

let l2obstacle2Img = new Image()
l2obstacle2Img.src = "./images/canonL2Down.png"

let l2obstacle3Img = new Image()
l2obstacle3Img.src = "./images/canonL2Down.png"

let l2obstacle4Img = new Image()
l2obstacle4Img.src = "./images/canonL2Up.png"

let l2obstacle5Img = new Image()
l2obstacle5Img.src = "./images/canonL2Down.png"

let l2obstacle6Img = new Image()
l2obstacle6Img.src = "./images/canonL2Down.png"

let l2obstacle7Img = new Image()
l2obstacle7Img.src = "./images/canonL2Up.png"

//------Level 3------//

let l3obstacle1Img = new Image()
l3obstacle1Img.src = "./images/plantUp.png"

let l3obstacle2Img = new Image()
l3obstacle2Img.src = "./images/plantDown.png"

let l3obstacle3Img = new Image()
l3obstacle3Img.src = "./images/plantDown.png"

let l3obstacle4Img = new Image()
l3obstacle4Img.src = "./images/plantUp.png"

let l3obstacle5Img = new Image()
l3obstacle5Img.src = "./images/plantDown.png"

let l3obstacle6Img = new Image()
l3obstacle6Img.src = "./images/plantDown.png"

let l3obstacle7Img = new Image()
l3obstacle7Img.src = "./images/plantUp.png"

//------Level 4------//

let finalBackGroundImg = new Image()
finalBackGroundImg.src = "./images/finalTheme.png"

let l4obstacle1Img = new Image()
l4obstacle1Img.src = "./images/fireUp2.png"

let l4obstacle2Img = new Image()
l4obstacle2Img.src = "./images/fireDown2.png"

let l4obstacle2bImg = new Image()
l4obstacle2bImg.src = "./images/fireDown2.png"

let l4obstacle3Img = new Image()
l4obstacle3Img.src = "./images/fireDown2.png"

let l4obstacle4Img = new Image()
l4obstacle4Img.src = "./images/fireUp2.png"

let l4obstacle4bImg = new Image()
l4obstacle4bImg.src = "./images/fireUp2.png"

let l4obstacle5Img = new Image()
l4obstacle5Img.src = "./images/fireDown2.png"

let l4obstacle6Img = new Image()
l4obstacle6Img.src = "./images/fireDown2.png"

let l4obstacle7Img = new Image()
l4obstacle7Img.src = "./images/fireUp2.png"

let l4obstacle7bImg = new Image()
l4obstacle7bImg.src = "./images/fireUp2.png"


//-------------------------------COMPONENTS CREATION-------------------------------//

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
        let myright = this.x + (this.width - 5);
        let mytop = this.y;
        let mybottom = this.y + (this.height - 5);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width - 5);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height - 5);
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

//-------------------------------LEVEL 1-------------------------------//

let myGameArea = {
    canvas: document.getElementById("canvas"),
    start: function () {
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
        this.context.clearRect(0, 0, 1000, 500);
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
    levelUp: function () {
        clearInterval(this.interval);
        levelUpText.style.visibility = "visible"
        this.clear()
        document.getElementById('continue').onclick = () => {
            startLevel2();
            levelUpText.style.visibility = "hidden"
        };
    }
}

//------L1 FUNCTIONS------//

function movePlayer() {

    player.speedX = 0
    player.speedY = 0

    if (myGameArea.key && myGameArea.key == 37 && player.x > 10) { //---Left movement
        player.speedX = -4;
        player.image = playerLeftImg
    }

    if (myGameArea.key && myGameArea.key == 39 && player.x < 930) { //---Right movement
        player.speedX = 4;
        player.image = playerImg
    }

    if (myGameArea.key && myGameArea.key == 38 && player.y > 10) { //---Up movement
        player.speedY = -4;
    }

    if (myGameArea.key && myGameArea.key == 40 && player.y < 430) { //---Down movement
        player.speedY = 4;
    }
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

function checkCrash(myGameArealevel) {
    if (player.crashWith(obstacle1) || player.crashWith(obstacle2) || player.crashWith(obstacle3) || player.crashWith(obstacle4) || player.crashWith(obstacle5) || player.crashWith(obstacle6) || player.crashWith(obstacle7)) {
        backgroundSound.stop();
        gameOverSound.sound.currentTime = 0;
        gameOverSound.play();
        myGameArealevel.stop();
    }
}

function checkGoal(myGameArealevel) {
    if (player.x >= 870) {
        backgroundSound.stop();
        levelUpSound.sound.currentTime = 0;
        levelUpSound.play()
        myGameArealevel.levelUp();
    }
}

//------L1 UPDATES------//

function updateComponents() {
    myBackground.update()
    player.update()
    obstacle1.update();
    obstacle2.update();
    obstacle3.update();
    obstacle4.update();
    obstacle5.update();
    obstacle6.update();
    obstacle7.update();
}

function updatePositions() {
    player.newPos();
    movePlayer();
    for (let i = 0; i <= 7; i++) {
        moveObstacles(`${i}`)
    }
}

function updateGameArea() {
    checkCrash(myGameArea)
    checkGoal(myGameArea)
    myGameArea.clear();
    myGameArea.frameNo += 1;
    updatePositions()
    updateComponents()
}


//------L1 START GAME------//

function startGame() {
    levelUpText.style.visibility = "hidden"
    gameOverText.style.visibility = "hidden"
    winScreenText.style.visibility = "hidden"
    levelUpSound.currentTime = 0;
    backgroundSound.currentTime = 0;
    backgroundSound.play()
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

window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        startGame()
        document.getElementById('start-button').disabled = true;
    };
}


//-------------------------------LEVEL 2-------------------------------//

let myGameArea2 = {
    canvas: document.getElementById("canvas"),
    start: function () {
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
        this.context.clearRect(0, 0, 1000, 500);
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
    levelUp: function () {
        clearInterval(this.interval);
        levelUpText.style.visibility = "visible"
        document.getElementById('continue').onclick = () => {
            startLevel3();
            levelUpText.style.visibility = "hidden"
        };
    }
}

//------L2 FUNCTIONS-UPDATES------//

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

function updatePositions2() {
    player.newPos();
    movePlayer();
    for (let i = 0; i <= 7; i++) {
        moveObstacles2(`${i}`)
    }
}

function updateGameArea2() {
    checkCrash(myGameArea2)
    checkGoal(myGameArea2)
    myGameArea2.clear();
    myGameArea2.frameNo += 1;
    updatePositions2()
    updateComponents()
}

//------L2 START------//

function startLevel2() {
    backgroundSound.currentTime = 0;
    backgroundSound.play()
    myGameArea2.start();
    myBackground = new component(myBackgroundImg, 0, 0, 1000, 500);
    player = new component(playerImg, 10, 400, 60, 60);
    obstacle1 = new component(l2obstacle1Img, 160, 0, 50, 60);
    obstacle2 = new component(l2obstacle2Img, 265, 0, 50, 60);
    obstacle3 = new component(l2obstacle3Img, 370, 0, 50, 60);
    obstacle4 = new component(l2obstacle4Img, 475, 0, 50, 60);
    obstacle5 = new component(l2obstacle5Img, 580, 0, 50, 60);
    obstacle6 = new component(l2obstacle6Img, 685, 0, 50, 60);
    obstacle7 = new component(l2obstacle7Img, 790, 0, 50, 60);
}

//-------------------------------LEVEL 3-------------------------------//

let myGameArea3 = {
    canvas: document.getElementById("canvas"),
    start: function () {
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
        this.context.clearRect(0, 0, 1000, 500);
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
    levelUp: function () {
        clearInterval(this.interval);
        levelUpText.style.visibility = "visible"
        this.clear()
        document.getElementById('continue').onclick = () => {
            startFinalLevel();
            levelUpText.style.visibility = "hidden"
        };
    }
}

//------L3 FUNCTIONS-UPDATES------//

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

function updatePositions3() {
    player.newPos()
    movePlayer();
    for (let i = 0; i <= 7; i++) {
        moveObstacles3(`${i}`)
    }
}

function updateGameArea3() {
    checkCrash(myGameArea3)
    checkGoal(myGameArea3)
    myGameArea3.clear();
    myGameArea3.frameNo += 1;
    updatePositions3()
    updateComponents()
}

//------L3 START------//

function startLevel3() {
    backgroundSound.currentTime = 0;
    backgroundSound.play()
    myGameArea3.start();
    myBackground = new component(myBackgroundImg, 0, 0, 1000, 500);
    player = new component(playerImg, 10, 400, 60, 60);
    obstacle1 = new component(l3obstacle1Img, 160, 0, 60, 150);
    obstacle2 = new component(l3obstacle2Img, 265, 0, 60, 150);
    obstacle3 = new component(l3obstacle3Img, 370, 0, 60, 150);
    obstacle4 = new component(l3obstacle4Img, 475, 0, 60, 150);
    obstacle5 = new component(l3obstacle5Img, 580, 0, 60, 150);
    obstacle6 = new component(l3obstacle6Img, 685, 0, 60, 150);
    obstacle7 = new component(l3obstacle7Img, 790, 0, 60, 150);
}


//-------------------------------FINAL LEVEL-------------------------------//

let myGameAreaFinal = {
    canvas: document.getElementById("canvas"),
    start: function () {
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
        this.context.clearRect(0, 0, 1000, 500);
    },
    stop: function () {
        clearInterval(this.interval);
        gameOverText.style.visibility = "visible"
        this.clear()
        document.getElementById('tryagain').onclick = () => {
            gameOverSound.stop()
            startFinalLevel();
            gameOverText.style.visibility = "hidden"
        };
    },
    win: function () {
        clearInterval(this.interval)
        winScreenText.style.visibility = "visible"
        this.clear()
        winnerSound.play()
    }
}

//------L4 FUNCTIONS------//

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
        finalLevelSound.stop();
        gameOverSound.sound.currentTime = 0;
        gameOverSound.play();
        myGameAreaFinal.stop();
    }
}

function checkGoalFinal() {
    if (player.x >= 870) {
        finalLevelSound.stop();
        myGameAreaFinal.win();
    }
}

//------L4 UPDATES------//

function updateComponentsFinal() {
    myBackground.update();
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

function updatePositionsFinal() {
    player.newPos()
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

function updateGameAreaFinal() {
    checkCrashFinal()
    checkGoalFinal()
    myGameAreaFinal.clear();
    myGameAreaFinal.frameNo += 1;
    updatePositionsFinal()
    updateComponentsFinal()
}

//------L4 START------//

function startFinalLevel() {
    finalLevelSound.currentTime = 0;
    finalLevelSound.play()
    myGameAreaFinal.start();
    myBackground = new component(finalBackGroundImg, 0, 0, 1000, 500);
    player = new component(playerImg, 10, 400, 60, 60);
    obstacle1 = new component(l4obstacle1Img, 160, 0, 50, 60);
    obstacle2 = new component(l4obstacle2Img, 265, 0, 50, 60);
    obstacle2b = new component(l4obstacle2bImg, 265, 250, 50, 60)
    obstacle3 = new component(l4obstacle3Img, 370, 0, 50, 60);
    obstacle4 = new component(l4obstacle4Img, 475, 0, 50, 60);
    obstacle4b = new component(l4obstacle4bImg, 475, 250, 50, 60);
    obstacle5 = new component(l4obstacle5Img, 580, 0, 50, 60);
    obstacle6 = new component(l4obstacle6Img, 685, 0, 50, 60);
    obstacle7 = new component(l4obstacle7Img, 790, 0, 50, 60);
    obstacle7b = new component(l4obstacle7bImg, 790, 250, 50, 60);
}