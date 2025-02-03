class Componente{

    constructor(width, height, x, y, speedX = 1, speedY = 1, color = "black"){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.xBase = x;         
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
        this.ctx = myGame.context;
    }

    move(){
        this.calculaX();
        this.calculaY();
        this.draw();
    }
    
    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x - (this.width/2), this.y - (this.height/2), this.width, this.height);
    }

    calculaX(){
        this.x += this.speedX;
    }

    calculaY(){
        this.y += this.speedY;
    }
}
