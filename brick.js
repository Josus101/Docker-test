class Brick extends Shapes 
{
    exist;

    constructor ( x, y, width, height, color, exist, padding, offsetTop, offsetLeft )
    {
        super ( x, y, color );
        this.width = width;
        this.height = height;
        this.exist = exist;
        this.padding = padding;
        this.offsetTop = offsetTop;
        this.offsetLeft = offsetLeft;
    }

    draw ( column, row )
    {
        
        this.x = column * ( this.width + this.padding ) + this.offsetLeft;
        this.y = row * ( this.height + this.padding ) + this.offsetTop;

        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    destroy ()
    {
        this.exist = false;
        // bare tegn boksen hvis hit == false
        brickCount -= 1;
        console.log(brickCount);
        if(brickCount <= 0){
            console.log("ez game");
            
        }

        // Particle effects
    }
}