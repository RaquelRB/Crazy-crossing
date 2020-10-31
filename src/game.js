//------GAME AREA------//

let myGameArea = {
    canvas: document.getElementById("canvas"),
    start: function () {
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        // document.body.insertBefore(this.canvas, document.body.childNodes[0]);
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
        alert('GAME OVER')
    },
    win: function (){
        clearInterval(this.interval)
        alert('YOU WIN')
    }
}


//------MY VARIABLES------//

let myGamePiece;
let block1, block2, block3, block4, block5, block6
// let myScore;
let myBackground;
let gameOver;


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
    myGamePiece.speedX = 0
    myGamePiece.speedY = 0
    if (myGameArea.key && myGameArea.key == 37 && myGamePiece.x > 10) { myGamePiece.speedX = -4; }

    if (myGameArea.key && myGameArea.key == 39 && myGamePiece.x < 930) { myGamePiece.speedX = 4; }

    if (myGameArea.key && myGameArea.key == 38 && myGamePiece.y > 10) { myGamePiece.speedY = -4; }

    if (myGameArea.key && myGameArea.key == 40 && myGamePiece.y < 430) { myGamePiece.speedY = 4; }
}

function moveBlocks(blockNum) {
    switch (blockNum) {
        case '1': (block1.y < 500) ? (block1.y += 5) : (block1.y = -60); break;
        case '2': (block2.y < 500) ? (block2.y += 1) : (block2.y = -60); break;
        case '3': (block3.y < 500) ? (block3.y += 7) : (block3.y = -60); break;
        case '4': (block4.y < 500) ? (block4.y += 2) : (block4.y = -60); break;
        case '5': (block5.y < 500) ? (block5.y += 4) : (block5.y = -60); break;
        case '6': (block6.y < 500) ? (block6.y += 8) : (block6.y = -60);
    }
}

function checkObstacles() {
    if (myGamePiece.crashWith(block1) || myGamePiece.crashWith(block2) || myGamePiece.crashWith(block3) || myGamePiece.crashWith(block4) || myGamePiece.crashWith(block5) || myGamePiece.crashWith(block6)) {
        myGameArea.stop();
    } 
}

function checkWinGame(){
    if (myGamePiece.x >= 900){
        myGameArea.win();
    }
}

//------UPDATES------//
function updateGameArea() {

    checkObstacles()
    checkWinGame()

    myGameArea.clear();
    myGameArea.frameNo += 1;
    
    movePlayer()
    moveBlocks('1')
    moveBlocks('2')
    moveBlocks('3')
    moveBlocks('4')
    moveBlocks('5')
    moveBlocks('6')
    
    myGamePiece.newPos()
    // checkWinGame()
    myBackground.update()
    // myScore.text = "SCORE: " + myGameArea.frameNo;
    // myScore.update();
    myGamePiece.update()
    block1.update();
    block2.update();
    block3.update();
    block4.update();
    block5.update();
    block6.update();
}

//------START GAME------//
function startGame() {
    myGameArea.start();
    myBackground = new component(1000, 500, "#72F59D", 0, 0)
    myGamePiece = new component(60, 60, "./images/yoshi.png", 10, 210, "image");
    block1 = new component(60, 60, "./images/cañon.png", 125, 0, "image");
    block2 = new component(60, 60, "./images/cañon.png", 250, 0, "image");
    block3 = new component(60, 60, "./images/cañon.png", 375, 0, "image");
    block4 = new component(60, 60, "./images/cañon.png", 500, 0, "image");
    block5 = new component(60, 60, "./images/cañon.png", 625, 0, "image");
    block6 = new component(60, 60, "./images/cañon.png", 750, 0, "image");
    // myScore = new component("30px", "Consolas", "black", 800, 40, "text");
}

// startGame()

window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      startGame();
    };
  }




