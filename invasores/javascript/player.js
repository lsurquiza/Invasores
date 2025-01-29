class Bullet extends Componente{
    
    constructor(x, y){
        /** largura, altura, x, y, speedX, speedY, color */
        super(6, 16, x, y, 0, -12, "lime");
    }

}

class Player extends Componente{

    constructor (x, y){
        super(48, 48, x, y);
        this.bullet = null;
    }
	
	setXY(x, y){
		this.x = (x > 24 && x < myGame.canvas.width - 24)? x: this.x;
		this.y = (x > 24 && y < myGame.canvas.height - 24)? y: this.y;
	}
	
    move(){
        this.update();
        if (this.bullet !== null){
            this.bullet.move();
        }
    }
    
    atirar(){
        if (this.bullet === null){
            this.bullet = new Bullet(this.x, this.y);
        }
        else if (this.bullet.y < 0){
            delete (this.bullet);
            this.bullet = null;
            this.bullet = new Bullet(this.x, this.y);
        }
    }

    colidiu(componente){
        let x = this.x - componente.x;
        let y = this.y - componente.y;
        return (Math.hypot(x, y) <= this.width / 2); 
    }

    acertou (componente){
        if (this.bullet !== null){
            let x = this.bullet.x - componente.x;
            let y = this.bullet.y - componente.y;
            if (Math.hypot(x, y) <= componente.width / 2){
                delete(this.bullet);
                this.bullet = null;
				componente.y = 0;
				componente.x = Math.floor (Math.random() * (myGame.canvas.width - 40)) + 20;
                return true; 
            }
            return false;
        }
    }

	update(){
        /* Canhões */
		this.ctx.fillStyle = "#ff0000";
        this.ctx.fillRect(this.x - 7, this.y - 16, 14, 16);

		/* Bico e Asa Inferior */
		this.ctx.fillStyle = "maroon";
        this.ctx.strokeStyle = "#303030";
        this.ctx.beginPath();

        this.ctx.moveTo(this.x, this.y-24);
        this.ctx.lineTo(this.x-20, this.y+16);
		
        this.ctx.lineTo(this.x, this.y-8);
		
        this.ctx.lineTo(this.x+20, this.y+16);
        this.ctx.lineTo(this.x, this.y-24);

        this.ctx.stroke();
		this.ctx.fill();
		/**/
		
		/* Asas Principais */
		this.ctx.fillStyle = "#c0c0c0";
        this.ctx.beginPath();
        
        this.ctx.moveTo(this.x, this.y-20);
        this.ctx.lineTo(this.x-24, this.y+12);
		
        this.ctx.lineTo(this.x, this.y-4);
		
        this.ctx.lineTo(this.x+24, this.y+12);
        this.ctx.lineTo(this.x, this.y-20);		
		
		this.ctx.fill();		
		this.ctx.stroke();
		/**/
		
		/* Corpo Externo */
		this.ctx.fillStyle = "#808080";
        this.ctx.beginPath();
        
        this.ctx.moveTo(this.x, this.y-18);
        this.ctx.lineTo(this.x-8, this.y+8);
		
        this.ctx.lineTo(this.x, this.y+16);
		
        this.ctx.lineTo(this.x+8, this.y+8);
        this.ctx.lineTo(this.x, this.y-18);		
		
		this.ctx.fill();		
		this.ctx.stroke();
		/**/		
		
		/* Corpo Interno */
		this.ctx.fillStyle = "#404040";
        this.ctx.beginPath();
        
        this.ctx.moveTo(this.x, this.y-12);
        this.ctx.lineTo(this.x-4, this.y+8);
		
        this.ctx.lineTo(this.x, this.y+12);
		
        this.ctx.lineTo(this.x+4, this.y+8);
        this.ctx.lineTo(this.x, this.y-12);		
		
		this.ctx.fill()		
		this.ctx.stroke();
		/**/		
		
		/* Cocpit */
		this.ctx.fillStyle = "#40ffff";
		this.ctx.strokeStyle = "#00ffff";
        this.ctx.beginPath();
        
        this.ctx.moveTo(this.x, this.y-10);
        this.ctx.lineTo(this.x-1, this.y-7);
		
        this.ctx.lineTo(this.x, this.y-4);
		
        this.ctx.lineTo(this.x+1, this.y-7);
        this.ctx.lineTo(this.x, this.y-10);		
		
		this.ctx.fill()		
		this.ctx.stroke();
		/**/
		
		/* Fogo do Motor */
		this.ctx.fillStyle = "gold";
		this.ctx.strokeStyle = "#ff4000";
        this.ctx.beginPath();
        
        this.ctx.moveTo(this.x, this.y+16);
        this.ctx.lineTo(this.x-3, this.y+14);
		
        this.ctx.lineTo(this.x, this.y+24);
		
        this.ctx.lineTo(this.x+3, this.y+14);
        this.ctx.lineTo(this.x, this.y+16);	
		this.ctx.lineTo(this.x, this.y+24);
		
		this.ctx.fill();		
		this.ctx.stroke();
		/**/
	}
}

