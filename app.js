$(() => {
    const CANVAS = document.getElementById("myCanvas");
    const WIDTH = document.getElementById("myCanvas").getAttribute("width")
    const HEIGHT = document.getElementById("myCanvas").getAttribute("height")

    let GRID_SIZE = 10;

    let masterView = new view(CANVAS, WIDTH, HEIGHT, GRID_SIZE);
    let masterMaze = new Maze(masterView, GRID_SIZE);

    masterMaze.initGrid();
    let randomPoint = masterMaze.getRandomUnvistedCell();
    masterMaze.visitGrid(randomPoint)

    // console.log("starting point is " + randomPoint)
    let rootPoint = randomPoint;
    while (masterMaze.getUnvistedList().length > 0) {
        rootPoint = randomPoint;
        randomPoint = masterMaze.pickUnvistedRandomNeighbour(randomPoint);

        let isVisited = masterMaze.isVisited(randomPoint)
        let dir = masterMaze.getDirection(rootPoint, randomPoint);

        if (isVisited) {
            // console.log(rootPoint + " moving to " + randomPoint + " " + dir);

        } else {
            masterMaze.visitGrid(randomPoint)
            masterMaze.breakWall(rootPoint, randomPoint);
            masterMaze.setMapMaze(rootPoint, randomPoint);
            // console.log(rootPoint + " moving to " + randomPoint + " " + dir + "***");
        }

    }

    // let finishPoint = masterMaze.getRandomCellNotStarter(startPoint);

    let finishPoint = new point(GRID_SIZE - 1, GRID_SIZE - 1)

    masterMaze.insertEndPoint(finishPoint, "#000000")
    masterMaze.insertPlayer(new point(0, 0), "#ff0000");
    // masterMaze.insertPlayer(startPoint);


    let newMaze = () => {
        masterView.clearCanvas()
        masterMaze.initGrid();
        let randomPoint = masterMaze.getRandomUnvistedCell();
        masterMaze.visitGrid(randomPoint)

        // console.log("starting point is " + randomPoint)
        let rootPoint = randomPoint;
        while (masterMaze.getUnvistedList().length > 0) {
            rootPoint = randomPoint;
            randomPoint = masterMaze.pickUnvistedRandomNeighbour(randomPoint);

            let isVisited = masterMaze.isVisited(randomPoint)
            let dir = masterMaze.getDirection(rootPoint, randomPoint);

            if (isVisited) {
                // console.log(rootPoint + " moving to " + randomPoint + " " + dir);

            } else {
                masterMaze.visitGrid(randomPoint)
                masterMaze.breakWall(rootPoint, randomPoint);
                masterMaze.setMapMaze(rootPoint, randomPoint);
                // console.log(rootPoint + " moving to " + randomPoint + " " + dir + "***");
            }

        }

        // let finishPoint = masterMaze.getRandomCellNotStarter(startPoint);

        let finishPoint = new point(GRID_SIZE - 1, GRID_SIZE - 1)

        masterMaze.insertEndPoint(finishPoint, "#FFFF33")
        masterMaze.insertPlayer(new point(0, 0), "#ff0000");
    }

    console.log(masterMaze.getGrid())


    // let origin = new point(1,1);
    // masterMaze.visitGrid(origin);
    // let rightPoint =  new point(0,1)
    // masterMaze.visitGrid(rightPoint);
    // masterMaze.breakWall(origin, rightPoint)
    // console.log(masterMaze.getGrid())

    $(document).keydown(function (e) {
        switch (e.keyCode) {
            case 87: //up
                masterMaze.movePlayer("UP");
                break;

            case 68: //right
                masterMaze.movePlayer("RIGHT");

                break;

            case 65: //left
                masterMaze.movePlayer("LEFT");

                break;

            case 83: //down
                masterMaze.movePlayer("DOWN");

                break;

            case 82: //r
                console.log("RESET")
                newMaze();
            default:
                return;
        }
        // Disable document scrolling.
        e.preventDefault();
    });


    window.moveFunction = function (direction) {
        masterMaze.movePlayer(direction);
    }




})
