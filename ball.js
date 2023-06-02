class Ball extends Shapes{
    #radius;
    #vx;
    #vy;
    constructor(x, y, color, radius, vx, vy){
        super(x, y, color);
        this.#radius = radius;
        this.#vx = vx;
        this.#vy = vy;
    }
    update(){
        if(this.y + this.#radius/2 + this.#vy >= canvas.height){
            if (this.color == "red"){
                ded();
                return;
            }
            let tempList = [];
            for(let i = 0; i < ballList.legnth; i++){
                if(ballList[i] != this){
                    tempList.push(ballList[i]);
                }
            }
            ballList = tempList;
        }

        for(let i = 0; i < brick.length; i++){
            for(let n = 0; n < brick[i].length; n++){
                if(brick[i][n].exist){
                    if(this.x - this.#radius/2 + this.#vx <= brick[i][n].x + brick[i][n].width &&
                        this.x + this.#radius/2 + this.#vx + this.#radius >= brick[i][n].x &&
                        this.y - this.#radius/2 + this.#vy <= brick[i][n].y + brick[i][n].height &&
                        this.y + this.#radius/2 + this.#vy + this.#radius >= brick[i][n].y)
                        {
                            playSFX();
                            brick[i][n].destroy();
                            if(this.x >= brick[i][n].x + brick[i][n].width || this.x + this.#radius <= brick[i][n].x){
                                this.#vx *= -1;
                                /*
                                if(this.color == "red"){
                                    let newBall = new Ball(this.x, this.y, "white", 7, this.#vx*-0.7, this.#vy*0.7);
                                    ballList.push(newBall);
                                }
                                */
                            }
                            if(this.y >= brick[i][n].y + brick[i][n].height || this.y + this.#radius <= brick[i][n].y){
                                this.#vy *= -1;
                                /*
                                if(this.color == "red"){
                                    let newBall = new Ball(this.x, this.y, "white", 7, this.#vx*-0.7, this.#vy*0.7);
                                    ballList.push(newBall);
                                }
                                */
                            }
                        }
                }
            } 
        }

        if(this.y + this.#radius/2 + this.#vy >= testPlayer.y){
            if(this.x >= testPlayer.x && this.x <= testPlayer.x + testPlayer.width){
                this.#vy *= -1;
                playSFX();
            }
        }

        if(this.x + this.#radius/2 + this.#vx >= canvas.width || this.x - this.#radius/2 + this.#vx < 0){
            this.#vx *= -1;
            playSFX();
        }
        if(this.y - this.#radius/2 + this.#vy < 0){
            this.#vy *= -1;
            playSFX();
        }
        this.x += this.#vx;
        this.y += this.#vy;
    }
        
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.#radius, 0, Math.PI * 2);
        ctx.fill();
    }
}