class Maze {

    constructor(view, gridSize) {
        this.view = view;
        this.grid = new Map()
        this.gridSize = gridSize;
        this.playerPosition = new point(0, 0);
    }

    isVisited(gridKey) {
        let grid = this.grid;
        let object = grid.get(gridKey.toString());
        let isVisited = object.visited;
        return isVisited;
    }




    getDirection(rpoint, npoint) {
        let rx = rpoint.getX();
        let ry = rpoint.getY();
        let nx = npoint.getX();
        let ny = npoint.getY();

        let isUp = rx == nx;
        let isDown = ry == ny;

        if (isUp) {
            let moveUp = ny < ry;
            if (moveUp) {
                return "UP"
            } else {
                return "DOWN"
            }




        } else if (isDown) {
            let moveLeft = nx < rx;
            if (moveLeft) {
                return "LEFT"
            } else {
                return "RIGHT"
            }



        }



    }

    clearCanvas(){
        let draw = this.ctx;
        draw.clearRect(0, 0, view.width, view.height);
    }


    setMapMaze(rpoint, npoint) {
        let grid = this.grid;
        let obj = grid.get(rpoint.toString())
        let moveList = obj.moveList;

        let nobj = grid.get(npoint.toString())
        let nmoveList = nobj.moveList;
        let nr = this.getDirection(npoint, rpoint)
        let rn = this.getDirection(rpoint, npoint)


        if (nmoveList == undefined) {
            nmoveList = new Map();
            nmoveList.set(rpoint.toString(), nr);
            // moveList.set(npoint, nr);
        } else {
            nmoveList.set(rpoint.toString(), nr);
            // moveList.set(npoint, nr);
        }


        if (moveList == undefined) {
            moveList = new Map();

            moveList.set(npoint.toString(), rn);
            // moveList.set(npoint, nr);
        } else {
            moveList.set(npoint.toString(), rn);
            // moveList.set(npoint, nr);
        }
        obj.moveList = moveList;
        nobj.moveList = nmoveList;
        // console.log(moveList)
        grid.set(rpoint.toString(), obj);
        grid.set(npoint.toString(), nobj);
    }

    getUnvistedList() {
        let grid = this.grid;
        let gridIterator = grid.keys();
        let tempGridKey = gridIterator.next().value
        let unvistedList = new Array;
        while (tempGridKey != undefined) {
            let gridObject = grid.get(tempGridKey)
            let isVisited = gridObject.visited
            if (!isVisited) {
                unvistedList.push(tempGridKey)
            }

            tempGridKey = gridIterator.next().value
        }
        return unvistedList;
    }

    breakWall(rpoint, npoint) {
        let rx = rpoint.getX();
        let ry = rpoint.getY();

        let nx = npoint.getX();
        let ny = npoint.getY();
        let view = this.view;
        // check if left
        if (nx < rx) {
            // console.log("removing Left")
            view.removeLine(rpoint, "LEFT");
        }

        if (nx > rx) {
            // console.log("removing right")
            view.removeLine(rpoint, "RIGHT")
        }

        if (ny > ry) {
            // console.log("removing bot")
            view.removeLine(rpoint, "BOTTOM")
        }

        if (ny < ry) {
            // console.log("removing top")
            view.removeLine(rpoint, "TOP")
        }




    }



    visitGrid(spoint) {
        let view = this.view;
        let grid = this.grid;
        let gridKey = spoint.toString();
        let gridObject = grid.get(gridKey)
        gridObject.visited = true;
        grid.set(gridKey, gridObject);
    }

    getRandomUnvistedCell() {
        let cellList = this.getUnvistedList();
        let randomSeed = this.getRandomArbitrary(0, cellList.length);
        let string = cellList[randomSeed];
        let stringSplit = string.split(",");
        let randoPoint = new point(stringSplit[0], stringSplit[1]);
        return randoPoint;
    }

    getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    initGrid() {
        let view = this.view;
        let grid = this.grid
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                let tempPoint = new point(i, j);
                view.drawSquare(tempPoint);
                grid.set(tempPoint.toString(), {
                    visited: false,
                    neighbours: this.getNeighbours(tempPoint)
                })
            }
        }
    }

    getGrid() {
        return this.grid
    }

    getNeighbours(point) {
        //top 
        let neighboursList = [];
        let topNeighbour = this.getTopNeighbour(point);
        let leftNeighbour = this.getLeftNeighbour(point);
        let rightNeighbour = this.getRightNeighbour(point);
        let botNeighbour = this.getBotNeighbour(point);
        neighboursList.push(topNeighbour)
        neighboursList.push(leftNeighbour)
        neighboursList.push(rightNeighbour)
        neighboursList.push(botNeighbour)

        return neighboursList
    }


    getTopNeighbour(startPoint) {
        let x = startPoint.getX();
        let y = startPoint.getY();
        let gridSize = this.gridSize - 1;

        let tY = y - 1;
        if (tY >= 0 && tY <= gridSize) {
            return new point(x, tY);
        } else {
            return -1;
        }
    }

    getBotNeighbour(startPoint) {
        let x = startPoint.getX();
        let y = startPoint.getY();
        let gridSize = this.gridSize - 1;

        let tY = y + 1;
        if (tY >= 0 && tY <= gridSize) {
            return new point(x, tY);
        } else {
            return -1;
        }
    }

    getLeftNeighbour(startPoint) {
        let x = startPoint.getX();
        let y = startPoint.getY();
        let gridSize = this.gridSize - 1;

        let tX = x - 1;
        if (tX >= 0 && tX <= gridSize) {
            return new point(tX, y);
        } else {
            return -1;
        }
    }


    getRightNeighbour(startPoint) {
        let x = startPoint.getX();
        let y = startPoint.getY();
        let gridSize = this.gridSize - 1;

        let tX = x + 1;
        if (tX >= 0 && tX <= gridSize) {
            return new point(tX, y);
        } else {
            return -1;
        }
    }



    pickUnvistedRandomNeighbour(spoint) {
        let grid = this.grid;
        let randomPoint = spoint;
        let neighbourList = grid.get(randomPoint.toString()).neighbours;
        let filterdNeighboursList = neighbourList.filter(
            (x) => {
                return x != -1
            }
        );

        let seed = this.getRandomArbitrary(0, filterdNeighboursList.length);
        return filterdNeighboursList[seed];

    }

    getRandomCell() {
        let grid = this.grid
        let gridIterator = grid.keys();
        let object = gridIterator.next().value
        let cellList = [];
        while (object != undefined) {
            cellList.push(object);
            object = gridIterator.next().value;
        }

        let seed = this.getRandomArbitrary(0, cellList.length);
        let string = cellList[seed];
        let stringSplit = string.split(",");
        let rcellPoint = new point(stringSplit[0], stringSplit[1]);
        return rcellPoint;
    }

    isEnd() {
        let cp = this.playerPosition;
        let ep = this.endPosition;
        return cp.isEqual(ep);
    }


    getRandomCellNotStarter(spoint) {
        let grid = this.grid
        let gridIterator = grid.keys();
        let gridKey = gridIterator.next().value
        let cellList = [];
        while (gridKey != undefined) {
            if (gridKey == spoint.toString()) {
            } else {
                cellList.push(gridKey);
            }
            gridKey = gridIterator.next().value;
        }

        let seed = this.getRandomArbitrary(0, cellList.length);
        let string = cellList[seed];
        let stringSplit = string.split(",");
        let rcellPoint = new point(stringSplit[0], stringSplit[1]);
        return rcellPoint;
    }


    insertPlayer(pPosition, color) {
        this.playerPosition = pPosition;
        this.view.insertPlayer(pPosition, color);
    }

    insertEndPoint(ep, color) {
        this.endPosition = ep;
        this.view.drawCircle(ep, color);
    }

    checkTopWall() {
        let view = this.view;
        let playerPosition = this.playerPosition
        let isTopWall = view.isTopWall(playerPosition);
        return isTopWall
    }


    movePlayer(direction) {
        let grid = this.grid;
        let cPosition = this.playerPosition;
        let view = this.view;
        let gridObj = grid.get(cPosition.toString());
        let moveMap = gridObj.moveList;
        let moveLocation = null;
        console.log("current post: " + cPosition)
        let canMove = false;

        switch (direction) {
            case "LEFT":
                let q = cPosition.getX() - 1;
                let w = cPosition.getY();
                moveLocation = new point(q, w)
                break;

            case "UP":
                let a = cPosition.getX();
                let s = cPosition.getY() - 1;
                moveLocation = new point(a, s)
                break;

            case "DOWN":
                let z = cPosition.getX();
                let x = cPosition.getY() + 1;
                moveLocation = new point(z, x)
                break;

            case "RIGHT":
                let e = cPosition.getX() + 1;
                let r = cPosition.getY();
                moveLocation = new point(e, r)

                break;

            default:
                return;
        }


        // console.log(moveMap)
        canMove = moveMap.has(moveLocation.toString());
        // console.log(canMove)
        if (canMove) {
            view.clearPlayer();
            this.insertPlayer(moveLocation);

            let isEnd = this.isEnd();
            if(isEnd) {
                let a =  confirm("You win")
                if(a){
                    console.log("new game")
                    location.reload();
                }
            };

        } else {
            // view.clearPlayer();
            // this.insertPlayer(moveLocation);

        }

    }


}