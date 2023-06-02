class Shapes{
    x;
    y;
    color;
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.color = color;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 1, 1);
    }
}