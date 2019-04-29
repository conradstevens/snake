//////////////////////////////// Global Variables
var canvase = document.querySelector('canvas');
var c = canvase.getContext('2d');

canvase.width = 500;
canvase.height = 500;

var gWidth = 12;
var gHight = 12;

var gameSpeed = 100;

var xUnit = Math.floor(canvase.width / gHight);
var yUnit = Math.floor(canvase.height / gWidth);

var xGr = [];
var yGr = [];
var gr  = [];

var snaking = false;

//////////////////////////////// Functions
function randomTile() {
    var rt = Math.floor(Math.random() * (gWidth - 1 )*(gHight - 1));
    return [gr[rt][0] - xUnit, gr[rt][1] - yUnit];
    
}

function buildGrid() {

    // Frames
    for (i=1; i<(gWidth + 1); i++){
        if (i <= gHight){
            yGr.push(yUnit*i);
        }
        xGr.push(xUnit*i);
    }
    // Actual Grid
    for(x in xGr){
        for(y in yGr){
            gr.push([xGr[x], xGr[y]]);
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function determineDirection(event){
    let key = event.keyCode;
    switch (key){
        case 37: if (snake.directionQue [snake.directionQue.length - 1] != 'l') snake.directionQue.push('l'); break;
        case 38: if (snake.directionQue [snake.directionQue.length - 1] != 'u') snake.directionQue.push('u'); break;
        case 39: if (snake.directionQue [snake.directionQue.length - 1] != 'r') snake.directionQue.push('r'); break;
        case 40: if (snake.directionQue [snake.directionQue.length - 1] != 'd') snake.directionQue.push('d'); break;
    }
}

function makeApple() {
    apple = {
        x, y,
        
        relocate : function() {            
            var newTile
            do { // Ensures leagal placement of apple
                newTile = randomTile(); 
            } while(newTile[0] == snake.headX && newTile[1] == snake.headY);
            
            c.fillStyle = "red";
            c.fillRect(newTile[0], newTile[1], xUnit, yUnit);
            this.x = newTile[0]; 
            this.y = newTile[1];
        },
        
        checkEaten : function() {            
            if (snake.headX == this.x && snake.headY == this.y){ // Snake Eaten the Apple
                snake.growing = true;
                return true;
            }
            return false;
        }
    }
    return apple;
}

function makeSnake() {
    snake = {
        headX           : randomTile()[0],
        headY           : randomTile()[1],
        length          : 1,
        dir             : 'd',
        directionQue    : ['d'],
        gameFinished    : false,
        body            : [[this.headX, this.headY]],
        growCount       : 0,
        growing         : false,


        drawSnake       : function() {            
            // DRAWS NEW ELEMENTS
            c.fillStyle = "#00ff00";
            this.body.unshift([this.headX, this.headY]) // adds new ellement to the front of the snake
            
            for (i = 0; i < this.body.length - 1; i++) {   
                var block = this.body[i]
                c.fillRect(block[0], block[1], xUnit, yUnit);
            }
            
            //ERRAES OLD ELEMENTS
            c.fillStyle = "black";
            var erase = this.body.pop();               // Deletes the last ellemtne at the end of the snake
            c.fillRect(erase[0], erase[1], xUnit + 1, yUnit + 1);
            
        },
        
        move            : function() {
            (this.directionQue.length > 1) ? this.dir = this.directionQue.shift() : this.dir = this.directionQue[0];

            switch(this.dir){
                case 'r': this.moveHead(1, 0);  break;
                case 'l': this.moveHead(-1, 0); break;
                case 'u': this.moveHead(0, -1); break;
                case 'd': this.moveHead(0, 1);; break;
            }
            
            if (this.growing) this.grow();
        },
        
        moveHead        : function(newx, newy) {
            this.headX += newx * xUnit;
            this.headY += newy * yUnit;
            
            // Checks if laping arround screen is necessary
            if (this.headX >= 500) {
                this.headX = 0;
            } else if (this.headX < 0) {
                this.headX = 500;
            
            } else if (this.headY >= 500) {
                this.headY = 0;
            } else if (this.headY < 0) {
                this.headY = 500;
            }
            
            this.checkSnakeHit();
        },
        
        grow            : function() {
            this.growCount ++;
            if(this.growCount == this.length) {
                this.growing    = false;
                this.growCount  = 0;
                this.length ++;
                this.addLength();
                apple.relocate();            
            }
        },
        
        addLength       : function() {
            this.body.push([apple.x, apple.y]);
        },
        
        checkSnakeHit   : function() {
            for (i = 0; i < this.body.length - 1; i++) {   
                var block = this.body[i];
                
                if (snake.headX == block[0] && snake.headY == block[1]){
                    snaking = false;
                }
            }
        }
    }
        
    return snake;
}

function buildGame() {
    console.log("NEW GAME")
    snake = makeSnake();
    apple = makeApple();
    apple.relocate();
    snaking = true;
    run()
    }

async function run() {
    while (snaking) {
        await sleep(gameSpeed);
        apple.checkEaten();
        snake.move();
        snake.drawSnake();
    } 
    
    c.fillStyle = "black";  c.fillRect(0, 0, 500, 500);
    c.fillStyle = "red";    c.fillRect(0, 0, 500, 500); await sleep(gameSpeed);
    c.fillStyle = "black";  c.fillRect(0, 0, 500, 500);

    buildGame();
}

//////////////////////////////// Initate Game
buildGrid();
document.addEventListener("keydown", determineDirection);
buildGame();









