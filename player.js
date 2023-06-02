class Player extends Shapes 
{

    #speed;

    constructor ( x, y, width, height, color, speed )
    {

        super ( x, y, color );

        this.width = width;
        this.height = height;
        this.#speed = speed;
    }

    update ( )
    {
        if(input < 0 && this.x >= 0){
            this.x += this.#speed * input;
        }else if(input > 0 && this.x + this.width <= canvas.width){
            this.x += this.#speed * input
        }
        // Så dette shittet e ikkje ferdigt og bler endra på når me fikse ein input-handler i code.js
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}