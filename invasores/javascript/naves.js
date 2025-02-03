//const { Componente } = require("./componentes");

class EnemyBullet extends Componente{
    
    constructor(x, y, speedX, speedY, color){
        /** largura, altura, x, y, speedX, speedY, color */
        super(6, 16, x, y, speedX, speedY, color);
    }

}

class Nave extends Componente {

    constructor(x, y, speedX, speedY, color) {
        super(48, 48, x, y, speedX, speedY, color);
    }

    enemyBullets = new Array();

    pushBullet (enemyBullet) {
        this.enemyBullets.push(enemyBullet);
    }

    move() {        
        if (this.x < this.width){
            this.x = myGame.canvas.width - this.width;
        } 
        if (this.x > myGame.canvas.width - this.width){
            this.x = this.width;
        }
        
        super.move();

        if (this.y > myGame.canvas.height - this.height){
            this.y = 0;
		    this.x = Math.floor (Math.random() * (myGame.canvas.width - 96)) + 48;
            //delete(this);
        }

        this.enemyBullets.forEach(enemyBullet => {
            if (enemyBullet.y > myGame.canvas.height - 40){
                enemyBullet.x = this.x;
                enemyBullet.y = this.y;
            }
            enemyBullet.move();
        });
    }

    draw(){
        this.ctx.fillStyle  = "#707070";
		this.ctx.fillRect(this.x-14, this.y-12, 28, 8);
		this.ctx.fillRect(this.x-5, this.y+6, 10, 10);
        
		/** Primeiro Poligono (asas) */
        this.ctx.fillStyle  = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y+4);
        this.ctx.lineTo(this.x+24, this.y-16);
        this.ctx.lineTo(this.x, this.y-12);
        this.ctx.lineTo(this.x-24, this.y-16);
        this.ctx.lineTo(this.x, this.y+4);
        this.ctx.fill();

       
        /** Segundo Poligono (corpo) */
        this.ctx.fillStyle  = "#a0a0a0";
        this.ctx.strokeStyle  = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y-20);
        this.ctx.lineTo(this.x+8, this.y-14);
        this.ctx.lineTo(this.x, this.y+24);
        this.ctx.lineTo(this.x-8, this.y-14);
        this.ctx.lineTo(this.x, this.y-20);
        this.ctx.fill();
		this.ctx.stroke();
		
        /** Terceiro Poligono (cockpit) */
        this.ctx.fillStyle  = "cyan"//this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y-6);
        this.ctx.lineTo(this.x+2, this.y-2);
        this.ctx.lineTo(this.x, this.y+8);
        this.ctx.lineTo(this.x-2, this.y-2);
        this.ctx.lineTo(this.x, this.y-6);
        this.ctx.fill();
		
		/** Quarto Poligono (asa traseira) */
        this.ctx.fillStyle  = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y-12);
        this.ctx.lineTo(this.x+16, this.y-24);
        this.ctx.lineTo(this.x, this.y-20);
        this.ctx.lineTo(this.x-16, this.y-24);
        this.ctx.lineTo(this.x, this.y-12);
        this.ctx.fill();
		
		/** Quarto Poligono (asa traseira) */
        this.ctx.fillStyle  = "#707070";
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y-6);
        this.ctx.lineTo(this.x+2, this.y-20);
        this.ctx.lineTo(this.x, this.y-24);
        this.ctx.lineTo(this.x-2, this.y-20);
        this.ctx.lineTo(this.x, this.y-6);
        this.ctx.fill();    
	}
}

class NaveVermelha extends Nave{

    constructor(x, y, direcao){
        // super (x, y, speedX, speedY, color)
        super(x, y, direcao, 3, "#cc1a1a");

        this.calculaX = function (){
            if(this.y == 0) this.xBase = this.x;
            // X é calculado em função de Y
            this.x = this.xBase + this.speedX*(Math.floor(96 * Math.sin(Math.PI * this.y / 256)));
            this.x = this.x < this.width? this.width: this.x;
            this.x = this.x > myGame.canvas.width - this.width? myGame.canvas.width - this.width: this.x;

        }
    }
}

class NaveAzul extends Nave{

    constructor(x, y, direcao){
        // super (x, y, speedX, speedY, color)
        super(x, y, direcao, 2, "#1a1acc");

        this.pushBullet(new EnemyBullet(x, y, 0, 6, "cyan")); 

        this.calculaX = function (){
            if(this.y == 0) this.xBase = this.x;
            // X é calculado em função de Y
            this.x = this.xBase + this.speedX*(Math.floor(128 * Math.sin(Math.PI * this.y / 128)));
            this.x = this.x < this.width? this.width: this.x;
            this.x = this.x > myGame.canvas.width - this.width? myGame.canvas.width - this.width: this.x;

        }
    }
}

class NaveRoxa extends Nave{

    constructor(x, y, direcao){
        // super (x, y, speedX, speedY, color)
        super(x, y, direcao * 1, 3, "#750475");

        this.pushBullet(new EnemyBullet(x, y, 2, 6, "magenta"));        
        this.pushBullet(new EnemyBullet(x, y, -2, 6, "magenta"));
    }
}


class NaveKamikaze extends Nave{

    constructor(x, y){
        // super (x, y, speedX, speedY, color)
        super(x, y, 0, 0, "#DAA520");    
        //this.pushBullet(new EnemyBullet(x, y, 0, 8, "yellow")); 
    }

    move(){
        super.move();

        if (Math.abs(this.x - myGame.player.x) < 6){
            this.speedX = 0;
            this.speedY = 8;           
        }
        else if (this.x - myGame.player.x <= -6){
            this.speedX = 4;
            this.speedY = 1;
        }
        else if (this.x - myGame.player.x >= 6){
            this.speedX = -4;
            this.speedY = 1;
        } 
    }
}