//////////////////////////////// Global Variables
var canvase = document.querySelector('canvas')
var c = canvase.getContext('2d');

canvase.width = 500;
canvase.height = 500;

var gWidth = 24
var gHight = 24

var xUnit = Math.floor((canvase.width)/gHight)
var yUnit = Math.floor((canvase.height)/gWidth)

var xGr = []
var yGr = []
var gr = []

//////////////////////////////// Functions
function randomTile() {
    var rt = Math.floor(Math.random() * (gWidth - 1 )*(gHight - 1))
    return [gr[rt][0] - xUnit, gr[rt][1] - yUnit]
}

function nextSnack() {
    c.fillStyle = "red"
    c.fillRect(randomTile()[0], randomTile()[1], xUnit, yUnit);
}

function buildGrid() {

    // Frames
    for (i=1; i<(gWidth + 1); i++){
        if (i <= gHight){
            yGr.push(yUnit*i)
        }
        xGr.push(xUnit*i)
    }
    // Actual Grid
    for(x in xGr){
        for(y in yGr){
            gr.push([xGr[x], xGr[y]])
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function direction(event){
    let key = event.keyCode;
    if( key == 37){
        snake.dir = 'l';
    }else if(key == 38){
        snake.dir = 'u';
    }else if(key == 39){
        snake.dir = 'r';
    }else if(key == 40){
        snake.dir = 'd';
    }
}

function makeSnake() {
    snake = {
        headX : randomTile()[0],
        headY : randomTile()[1],
        length : 1,
        dir : 'd',
        gameFinished : false,
        body : [[this.headX, this.headY]],

        drawSnake : function() {
            c.fillStyle = "#00ff00";
            c.fillRect(this.headX, this.headY, xUnit, yUnit);    
        },

        drawUpdateSnake : function() {
            var erase = this.body.shift();
            this.body.push([this.headX, this.headY]);

            c.fillStyle = "black";
            c.fillRect(erase[0], erase[1], xUnit + 1, yUnit + 1);
        },

        move : function() {
            if (this.dir == 'r') {
                this.headX += xUnit;
            } else if (this.dir == 'l') {
                this.headX += -xUnit;
            } else if (this.dir == 'u') {
                this.headY += -yUnit;
            } else if (this.dir == 'd'){
                this.headY += yUnit;
            }
        },

        applyMove : function(nextPos) {
            break
        }

    }
    return snake;
}

async function run() {
    while(snake.gameFinished == false) {
        await sleep(100);
        snake.move();
        snake.drawSnake();
        snake.drawUpdateSnake();   
    }
}

//////////////////////////////// Run
buildGrid();
nextSnack();
snake = makeSnake();

document.addEventListener("keydown", direction);

run();

//////////////////////////////// Game Loop


