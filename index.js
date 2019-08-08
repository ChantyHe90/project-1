
// let minHeight = 20;
// let maxHeight = 120;
// let minWidth = 10;
// let maxWidth = 40;

let minGap = 300;
let maxGap = 600;
let myObstacles = [];
let xflyingObs = [];
let enemies = [];
var flyImg = new Image();
flyImg.src = "images/flyingObs.png";
var eneMy = new Image();
eneMy.src = "images/gegner.png"
let gap = randomGap();
let myScore = 0;
let time = 0;
let coin = [];
let myCoins = 0;
// let myAudioUp = new Sound();
// myAudioUp.src = "/../NFF-rolling-b.wav";

let context;
//ducken
let crouching = false;
let intersected = false;
let active = true;

var img = new Image();
img.src = "images/chantycharacter.png";
var imgDown = new Image()
imgDown.src = "images/charchantycrouch.png";

//intersectIMG
var intersectImg = new Image();
intersectImg.src = "images/intersect.png";


document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyW') {
        jump()
    }
    if (e.code === 'KeyS') {
        crouching = true;
        player.y = 470;
    }
});
document.addEventListener('keyup', (e) => {
    if (e.code === 'KeyS') {
        crouching = false;
        player.y = 450;
    }
});


function intersect(a, b) {
    var aLeft = a.x;
    var aTop = a.y;
    var aRight = a.x + a.width;
    var aBottom = a.y + a.height;
    var bLeft = b.x;
    var bTop = b.y;
    var bRight = b.x + b.width;
    var bBottom = b.y + b.height;
    return !(aLeft > bRight ||
        aRight < bLeft ||
        aTop > bBottom ||
        aBottom < bTop)
}
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
//randomGap for Obstacles and fly
function randomGap() {
    return Math.floor(minGap + Math.random() * (maxGap - minGap + 1))
}
var player = {
    x: 50,
    //changed y from 470 to 450
    y: 450,
    width: 50,
    height: 50,
    speedY: 0,

    //loop move player
    draw: function () {
        // context.fillRect(this.img, this.y, 30, 30);
        if (intersected) {
            context.drawImage(intersectImg, this.x, this.y);
        } else if (crouching) {
            context.drawImage(imgDown, this.x, this.y);
        } else {
            context.drawImage(img, this.x, this.y);
        }
    },
    newPos: function () {
        if (this.y < 180) {
            this.speedY = 2;
        }
        this.y = this.y + this.speedY;
        if (this.speedY == 2 && this.y === 450) {
            this.speedY = 0;
        }
    },

}



// class Coin {
//     constructor() {
//         this.height = 16;
//         this.width = 8;
//         this.x = Math.random() * 320;
//         this.y = 460;

//     }
//     draw() {
//         context.fillStyle = "yellow";
//         context.fillRect(this.x, this.y, this.width, this.height);
//     }
// }


class Obstacle {
    constructor() {
        this.height = eneMy.height;
        this.width = eneMy.width;
        // this.height = Math.floor(minHeight + Math.random() * (maxHeight - minHeight));
        // this.width = Math.floor(minWidth + Math.random() * (maxWidth - minWidth));
        this.x = 1200;
        this.y = 500 - this.height;
    }
    //draw the obstacles
    draw() {
        context.drawImage(eneMy, this.x, this.y, this.width, this.height)
        //    context.fillRect(this.x, this.y, this.width, this.height)
    }
}
//flyingObs100 × 44

console.log(flyImg)
class flyingObs {
    constructor() {
        this.height = 55;
        this.width = 100;
        this.x = canvas.width;
        this.y = 410;
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
        //this.time++;
        //execute "updateGameArea" every 5 miliseconds
        this.interval = setInterval(this.updateGameArea.bind(this), 5)
    },
    //update the drawings in the gamearea

    updateGameArea: function () {
        //clear the gameArea just 1 very long obs
        gameArea.clear();
        time++;
        myScore = time;
        document.getElementById('score').innerHTML = `Your score: ${myScore}`;
        //everyTime a gap comes a new obs will be pushed to the obs array
        if (this.frame === gap) {
            if (Math.random() <= 0.5) {
                myObstacles.push(new flyingObs())

            } else {
                //flyObs as soon as Obs > 2
                if (myObstacles.length > 2)
                    xflyingObs.push(new flyingObs())
            }
            gap += randomGap();
        }
        if (myScore = 500) {
            document.getElementById("canvas").innerHTML = "Level2"
        }
        for (i = 0; i < myObstacles.length; i++) {
            //to make obs move subtract every time -1 of the x position
            myObstacles[i].x -= 1;
            myObstacles[i].draw();
            //it expects you to call it with objects like this intersect
            // //({ x: 10, y: 10, width: 100, height: 100}, { x: 10, y: 10, width: 100, height: 100})
            //myObstacles.push(new Obstacle()) ==> myOb =[] new ClassName,let xflyingObs=[] xflyingObs.push(new flyingObs)
        }
        for (i = 0; i < xflyingObs.length; i++) {
            xflyingObs[i].x -= 1;
            xflyingObs[i].draw();
        }

        for (i = 0; i < coin.length; i++) {
            coin[i].x -= 1;
            coin[i].draw();
        }

        for (i = 0; i < myObstacles.length; i++) {
            let intersecting = intersect(player, myObstacles[i])
            //console.log(enemies[i])
            if (intersecting) {
                intersected = true;
                gameArea.stop();
                setTimeout(() => {
                    alert(`Game over – But honey, you did very well: Your score is: ${myScore}`);
                    document.location.reload();
                }, 1)
            }
        }
        for (i = 0; i < xflyingObs.length; i++) {
            let intersecting = intersect(player, xflyingObs[i])
            //console.log(enemies[i])
            if (intersecting) {
                intersected = true;
                gameArea.stop();
                setTimeout(() => {
                    alert(`Game over – But honey, you did very well: Your score is: ${myScore}`);
                    document.location.reload();
                }, 1)
            }
        }
        for (i = 0; i < coin.length; i++) {
            let intersecting = intersect(player, coin[i])
            if (intersecting) {
                intersected = true;
                myCoins++;
                document.getElementById('coin').innerHTML = `Your coins: ${myCoins}`;
                coin.active = false;

            }
        }

        player.newPos();
        player.draw();
        this.frame += 1;
    },
    //clear drawings
    clear: function () {
        //context.width, and .height
        context.clearRect(0, 0, canvas.width, canvas.height)
    },
    //end the game
    stop: function () {
        player.draw(); // draw player to show intersecting pic
        clearInterval(this.interval);
    }
}

//score board

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