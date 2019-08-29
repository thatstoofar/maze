class point{
    constructor(x,y){
        this.x = parseInt(x);
        this.y = parseInt(y);
    }

    toString(){
        return this.x + "," + this.y
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    isEqual(npoint){
        let nx = npoint.getX();
        let ny = npoint.getY();
        let x = this.x;
        let y = this.y;
        
        return nx == x && ny == y ? true: false;

    }

}