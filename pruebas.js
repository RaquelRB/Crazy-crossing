
var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
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
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}

var myGamePiece;
var block1, block2, block3, block4, block5, block6
var myScore;

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
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }

}

function movePlayer() {
    myGamePiece.speedX = 0
    myGamePiece.speedY = 0
    if (myGameArea.key && myGameArea.key == 37) { myGamePiece.speedX = -4; }
    if (myGameArea.key && myGameArea.key == 39) { myGamePiece.speedX = 4; }
    if (myGameArea.key && myGameArea.key == 38) { myGamePiece.speedY = -4; }
    if (myGameArea.key && myGameArea.key == 40) { myGamePiece.speedY = 4; }
}

function moveBlocks(x) {
    switch (x) {
        case '1': (block1.y < 500) ? (block1.y += 5) : (block1.y = -60); break;
        case '2': (block2.y < 500) ? (block2.y += 1) : (block2.y = -60); break;
        case '3': (block3.y < 500) ? (block3.y += 7) : (block3.y = -60); break;
        case '4': (block4.y < 500) ? (block4.y += 2) : (block4.y = -60); break;
        case '5': (block5.y < 500) ? (block5.y += 4) : (block5.y = -60); break;
        case '6': (block6.y < 500) ? (block6.y += 4) : (block6.y = -60);
    }
}

function updateGameArea() {
    if (myGamePiece.crashWith(block1) || myGamePiece.crashWith(block2) || myGamePiece.crashWith(block3) || myGamePiece.crashWith(block4) || myGamePiece.crashWith(block5) || myGamePiece.crashWith(block6)) {
        myGameArea.stop();
    } else {
        myGameArea.clear();
        myGameArea.frameNo += 1;
        movePlayer()
        myScore.text = "SCORE: " + myGameArea.frameNo;
        myScore.update();
        myGamePiece.newPos()
        myGamePiece.update()

        moveBlocks('1')
        moveBlocks('2')
        moveBlocks('3')
        moveBlocks('4')
        moveBlocks('5')
        moveBlocks('6')

        block1.update();
        block2.update();
        block3.update();
        block4.update();
        block5.update();
        block6.update();
    }
}


function startGame() {
    myGameArea.start();
    myGamePiece = new component(60, 60, "red", 10, 120);
    block1 = new component(60, 60, "brown", 125, 0);
    block2 = new component(60, 60, "yellow", 250, 0);
    block3 = new component(60, 60, "orange", 375, 0);
    block4 = new component(60, 60, "grey", 500, 0);
    block5 = new component(60, 60, "aqua", 625, 0);
    block6 = new component(60, 60, "black", 750, 0);
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
}


startGame()


//.......FOR SPEED.....
// function moveUp() {
//     myGamePiece.speedY -= 1;
// }

// function moveDown() {
//     myGamePiece.speedY += 1;
// }

// function moveLeft() {
//     myGamePiece.speedX -= 1;
// }

// function moveRight() {
//     myGamePiece.speedX += 1;
// }

// 


// function movePlayer(){
//     switch (direction) {
//         case 'left':
//             if (this.x <= 75){
//                 return this.x -= 20
//             } else {
//                 this.x--
//             }
//             break;
//         case 'right':
//             if (this.x >= 900){
//                 return this.x += 20
//             }else {
//                 this.x++ 
//             }
//             break;
//         case 'up':
//             if (this.y <= 75){
//                 this.y -= 20
//             } else {
//                 this.y--
//             }
//             break;
//         case 'down':
//             if (this.y >= 500){
//                 this.y -= 20
//             } else {
//                 this.y++
//             }
//         default:
//             throw new Error('Invalid direction')
//     }
//     }


// document.addEventListener('keydown', (event) => {
//     switch (event.key) {
//         case 'ArrowLeft':
//             movePlayer('left')
//             break;
//         case 'ArrowRight':
//             movePlayer('right')
//             break;
//         case 'ArrowUp':
//             movePlayer('up')
//             break;
//         case 'ArrowDown':
//             movePlayer('down')
//     }
// });







