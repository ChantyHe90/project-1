let minHeight = 20;
let maxHeight = 120;
let minWidth = 10;
let maxWidth = 40;
let minGap = 200;
let maxGap = 500;
let myObstacles = [];
let xflyingObs = [];
var flyImg = new Image();
flyImg.src = "images/flyingObs.png";
let gap = randomGap();
let myScore;
let context;
//ducken
let crouching = false;

//flyingObs
// var myflyingObs = new Image();
// myflyingObs.src = "images/flyingObs.png";
// class flyingObs {
//     constructor() {
//         this.height = 380;
//         this.width = 100;
//         this.x = Math.floor(Math.random() * x);
//         this.y = 380;
//     }
// this.position = new Position: function () {
// if (this.y)

var img = new Image();
img.src = "images/chantycharacter.png";
var imgDown = new Image()
imgDown.src = "images/charchantycrouch.png";
//clouds BEGIN
var clouds1 = new Image();
clouds1.src = "images/cloud_1.png";
var clouds2 = new Image();
clouds2.src = "images/cloud_2.png";


document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyW') {
        jump()
    }
    if (e.code === 'KeyS') {
        crouching = true;
    }
});
document.addEventListener('keyup', (e) => {
    if (e.code === 'KeyS') {
        crouching = false;
    }
});

// function intersect(a, b) {
//     var aLeft = a.x;
//     var aTop = a.y;
//     var aRight = a.x + a.width;
//     var aBottom = a.y + a.height;
//     var bLeft = b.x;
//     var bTop = b.y;
//     var bRight = b.x + b.width;
//     var bBottom = b.y + b.height;
//     return !(aLeft > bRight ||
//         aRight < bLeft ||
//         aTop > bBottom ||
//         aBottom < bTop)
// }
//frame = how many times we run (updateGameArea)> as often as it is a multi of n will interval be true
function everyinterval(n) {
    if (gameArea.frame % n === 0) {
        return true
    } else {
        return false
    }
}
function jump() {
    player.speedY = -4;
}
function randomGap() {
    return Math.floor(minGap + Math.random() * (maxGap - minGap + 1))
}
var player = {
    x: 50,
    //changed y from 470 to 450
    y: 450,
    width: 30,
    height: 30,
    speedY: 0,
    //loop move player
    draw: function () {
        // context.fillRect(this.img, this.y, 30, 30);
        if (crouching) {
            context.drawImage(imgDown, this.x, 470);
        } else {
            context.drawImage(img, this.x, this.y);
        }
    },
    newPos: function () {
        if (this.y < 200) {
            this.speedY = 2;
        }
        this.y = this.y + this.speedY;
        if (this.speedY == 2 && this.y === 450) {
            this.speedY = 0;
        }
    },

}

class Obstacle {
    constructor() {
        this.height = Math.floor(minHeight + Math.random() * (maxHeight - minHeight + 1));
        this.width = Math.floor(minWidth + Math.random() * (maxWidth - minWidth + 1));
        this.x = 1200;
        this.y = 500 - this.height;
    }
    //draw the obstacles
    draw() {
        context.fillRect(this.x, this.y, this.width, this.height)
    }
}
//flyingObs

console.log(flyImg)
class flyingObs {
    constructor() {
        this.height = Math.floor(minHeight + Math.random() * (maxHeight - minHeight + 1));
        this.width = Math.floor(minWidth + Math.random() * (maxWidth - minWidth + 1));
        this.x = canvas.width;
        this.y = 380;
    }

    draw() {
        context.drawImage(flyImg, this.x, this.y, this.width, this.height)
    }
}
console.log(flyingObs)
var gameArea = {
    //gamearea.start are initial actions
    start: function () {
        //frame counts how many times we run a function
        this.frame = 0;
        //execute "updateGameArea" every 5 miliseconds
        this.interval = setInterval(this.updateGameArea, 5)
    },
    //update the drawings in the gamearea

    updateGameArea: function () {
        //clear the gameArea just 1 very long obs
        gameArea.clear();
        //everyTime a gap comes a new obs will be pushed to the obs array
        if (everyinterval(gap)) {
            myObstacles.push(new Obstacle())
            gap = randomGap()
            gameArea.frame = 0;
        }
        for (i = 0; i < myObstacles.length; i++) {
            //to make obs move subtract every time -1 of the x position
            myObstacles[i].x -= 1;
            myObstacles[i].draw();
            //it expects you to call it with objects like this intersect
            // //({ x: 10, y: 10, width: 100, height: 100}, { x: 10, y: 10, width: 100, height: 100})
            // let intersecting = intersect(player, myObstacles[i])
            // if (intersecting) {
            //     console.log('hi');
            // }//myObstacles.push(new Obstacle()) ==> myOb =[] new ClassName,let xflyingObs=[] xflyingObs.push(new flyingObs)
            if (everyinterval(gap * 2)) {
                xflyingObs.push(new flyingObs())
                gap = randomGap()
                gameArea.frame = 0;
            }
            for (i = 0; i < xflyingObs.length; i++) {
                xflyingObs[i].x -= 1;
                xflyingObs[i].draw();
            }
        }
        player.newPos();
        player.draw();

        gameArea.frame += 1;
    },
    //clear drawings
    clear: function () {
        //context.width, and .height
        context.clearRect(0, 0, canvas.width, canvas.height)
    },
    //end the game
    stop: function () {
    }
}

function removeButton() {
    var elem = document.getElementById("start-button");
    elem.parentNode.removeChild(elem);
}

window.onload = function () {
    let canvas = document.getElementsByTagName("canvas")[0];
    canvas.height = 500;
    canvas.width = 960;
    context = this.canvas.getContext("2d");
    document.getElementById("start-button").onclick = function () {
        gameArea.start();
        removeButton();
    }
}
