class view {

    constructor(canvas, width, height, gridSize) {
        this.canvas = canvas
        this.width = width;
        this.height = height;
        this.ctx = canvas.getContext("2d");
        this.gridSize = gridSize;
        this.oneSquareWidth = width / gridSize;
        this.oneSquareHeight = height / gridSize;
    }

    mark(startPoint, color = "black") {
        let draw = this.ctx;
        let oneSquareWidth = this.oneSquareWidth;
        let oneSquareHeight = this.oneSquareHeight;
        let originX = startPoint.getX() * oneSquareWidth;
        let originY = startPoint.getY() * oneSquareHeight;
        let xoffset = oneSquareWidth / 4;
        let yoffset = oneSquareWidth / 4;
        draw.fillStyle = color;
        draw.fillRect(originX + xoffset, originY + yoffset, oneSquareWidth / 2 - xoffset, oneSquareHeight / 2 - yoffset);
    }

    clearCanvas(){
        let draw = this.ctx;
        draw.clearRect(0, 0, this.width, this.height);
    }

    insertPlayer(point, color) {
        this.playerPosition = point;
        this.drawCircle(point, color)
    }

    isTopWall(ppoint){
        let w = this.oneSquareWidth;
        let h = this.oneSquareHeight;
        let x = ppoint.getX()*w;
        let y = ppoint.getY()*h;
        let draw = this.ctx;
        let inStroke = draw.isPointInStroke(x, y);
        return inStroke;
    }

    clearPlayer(){
        let draw = this.ctx;
        let w = this.oneSquareWidth;
        let h = this.oneSquareWidth
        let x = this.playerPosition.getX()*w;
        let y = this.playerPosition.getY()*h;
        let offset = 20;
        draw.clearRect(x + w/4,y + h/4 , (w/2), (h/2) );
    }



    drawCircle(sPoint, color='#ff0000') {
        let w = this.oneSquareWidth;
        let h = this.oneSquareHeight;
        let x = sPoint.getX() * w;
        let y = sPoint.getY() * h;
        let radius = w/4
        let centerX = x + w/2
        let centerY = y + h/2 
        let draw = this.ctx;
        draw.fillStyle= color;
        draw.beginPath();
        draw.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        draw.stroke();
        draw.fill();
    }


    drawSquare(startPoint) {


        let oneSquareWidth = this.oneSquareWidth;
        let oneSquareHeight = this.oneSquareHeight;

        let originX = startPoint.getX() * oneSquareWidth;
        let originY = startPoint.getY() * oneSquareHeight;

        //draw top line 
        this.drawLine(new point(originX, originY), new point(originX + oneSquareWidth, originY));
        //draw bot line
        this.drawLine(new point(originX, originY + oneSquareHeight), new point(originX + oneSquareWidth, originY + oneSquareHeight));
        //draw left line
        this.drawLine(new point(originX, originY), new point(originX, originY + oneSquareHeight));
        //draw right line 
        this.drawLine(new point(originX + oneSquareWidth, originY), new point(originX + oneSquareWidth, originY + oneSquareHeight));

    }

    drawLine(startPoint, endPoint, color = "#000000") {
        let x = startPoint.getX();
        let y = startPoint.getY();
        let endX = endPoint.getX();
        let endY = endPoint.getY();

        let draw = this.ctx;
        draw.strokeStyle = color;
        draw.moveTo(x, y);
        draw.lineTo(endX, endY);
        draw.stroke();
    }


    removeLine(startPoint, direction) {
        let w = this.oneSquareWidth;
        let h = this.oneSquareHeight;
        let draw = this.ctx;
        let eraseW = this.oneSquareWidth;
        let eraseH = this.oneSquareHeight;
        let spx = startPoint.getX() * w;
        let spy = startPoint.getY() * h;

        let xoffset = 1;
        let yoffset = 1;

        switch (direction) {
            case "LEFT":
                // remove left
                draw.clearRect(spx - xoffset, spy + yoffset, eraseW / 10, eraseH - yoffset * 2)
                break;


            case "RIGHT":
                //remove right
                draw.clearRect(spx + (eraseW - xoffset), spy + yoffset, eraseW / 10, eraseH - yoffset * 2)
                break;

            case "TOP":
                // remove top
                draw.clearRect(spx + xoffset, spy - yoffset, eraseW - xoffset * 2, eraseH / 10)
                break;

            case "BOTTOM":
                //remove bot
                draw.clearRect(spx + xoffset, spy + (eraseH - yoffset), eraseW - xoffset * 2, eraseH / 10)
                break;

            default:
                console.log("Error no direction")
                break;

        }




    }




}

//rectangle


//lines
//ctx.moveTo(0, 0);
// ctx.lineTo(200, 100);
// ctx.stroke();

//words
// ctx.font = "30px Arial";
// ctx.fillText("Hello World", 10, 50);