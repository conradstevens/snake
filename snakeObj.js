//Snake Object
function makeSnake2() {
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