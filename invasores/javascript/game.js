const WIDTH = 1024;
const HEIGHT = 768;
const DIREITA = 1;
const ESQUERDA = -1;
const CENTRO = 0;

const PLAY = 0;
const PAUSE = 1;
const GAMEOVER = 2;
const INICIO = 3;

/**
 *  myGame é o objeto que controla todo o game.
 * 		Atributos:
 * 	- canvas: a tela do jogo
 *  - mode: indica o modo de jogo (PLAY, PAUSE, GAVEOVER, INICIO)
 *  - mortesInimigas: contabiliza quantos inimigos foram abatidos
 *  - navesInimigas: um array com as naves inimigas do game
 * 
 */

var myGame = {
	canvas : document.createElement("canvas"),
	mode : INICIO,
	mortesInimigas : 0,


	/**
	 * inicializa os objetos do game e é executada assim que 
	 * 		o game é carregado na tela do navegador
	 *  
	 */
	start : function() {
		this.canvas.width = WIDTH;
		this.canvas.height = HEIGHT;
		this.context = this.canvas.getContext("2d");

		this.player = new Player(WIDTH/2 , HEIGHT - 60);
		this.navesInimigas = new Array();

		let tela = document.getElementById("tela");
		tela.style.width = WIDTH + "px";

		// A div#display deve estar dentro da div#tela;
		tela.insertBefore(this.canvas, document.getElementById("display"));

		// Adicionar eventos de controle
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mousedown", handleMouseClick);

		// Rodar o jogo 50 vezes por segundo
		this.interval = setInterval(
			function() {
				if (myGame.mode === PLAY){
					myGame.clear();
					myGame.move();
					myGame.verificarAcertos();
					myGame.verificarColisoes();
				}
				myGame.handleMode();
			}, 
			20
		);
	},

	/**
	 *	limpa a tela do game
	 * 
	 */
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},

	/**
	 *	movementa todos os objetos do game (player, naves inimigas e projéteis)
	 * 
	 */
	move : function() {
		this.player.move();

		this.navesInimigas.forEach(nave => {
		  nave.move();
		});
	},

	/**
	 * 	 adiciona uma nave inimiga no array navesInimigas
	 * 
	 */
	addNave : function(naveInimiga){
		this.navesInimigas.push(naveInimiga);
	},

	/**
	 * 	 verifica se o player conseguiu abater alguma nave inimiga
	 * 
	 */
	verificarAcertos : function(){
		this.navesInimigas.forEach(nave => {
			if (this.player.acertou(nave)){
				document.querySelector("#score").innerHTML = ++this.mortesInimigas;
				if (this.mortesInimigas == 5){
					this.addNave(new NaveAzul(60, 20, DIREITA));
					this.addNave(new NaveAzul(WIDTH-60, 20, ESQUERDA));
				}
				if (this.mortesInimigas == 10){
					this.addNave(new NaveVermelha(60, 20, DIREITA));
					this.addNave(new NaveVermelha(WIDTH-60, 20, ESQUERDA));
				}
				if (this.mortesInimigas == 20){
					this.addNave(new NaveRoxa(60, 20, DIREITA));
					this.addNave(new NaveRoxa(WIDTH-60, 20, ESQUERDA));
				}
				if (this.mortesInimigas == 30){
					this.addNave(new NaveKamikaze(60, 20));
					this.addNave(new NaveKamikaze(WIDTH-60, 20));
				}
			}
		});
	},

	/**
	 * 	 verifica se o player colidiu com alguma nave inimiga ou com algum projétil
	 * 
	 */
	verificarColisoes : function(){
		this.navesInimigas.forEach(nave => {
			if (this.player.colidiu(nave)){ 
				this.mode = GAMEOVER;
				return;
			}
			nave.enemyBullets.forEach(bullet => {
				if (this.player.colidiu(bullet)){
					this.mode = GAMEOVER;
					return;
				}
			});
		});
	},

	/**
	 * 	 Exibe o modo de jogo para o jogador
	 * 
	 */
	handleMode : function(){
		switch(this.mode){
		  case PAUSE:
			document.querySelector("#modeText").innerHTML = "PAUSE<br>Tecle 'P' para continuar";
			document.querySelector("#mode").style.display = "block";
			document.querySelector("#area").style.cursor = "auto";
			break;
		  case GAMEOVER:
			document.querySelector("#modeText").innerHTML = "GAME OVER!!<br>Tecle 'R' para reiniciar";
			document.querySelector("#mode").style.display = "block";
			document.querySelector("#area").style.cursor = "auto";   
			break;
		  case INICIO:
			document.querySelector("#modeText").innerHTML = "INÍCIO<br>Tecle 'I' se tiver coragem";
			document.querySelector("#mode").style.display = "block";
			document.querySelector("#area").style.cursor = "auto";
			break;
		  case PLAY:
			document.querySelector("#mode").style.display = "none";
			document.querySelector("#area").style.cursor = "none";
		  }
	  }
	  
}

/**
 *	Esta função é executada assim que o documento é carregado pelo navegador.
 *	
 *
 * */
function startGame() {
  myGame.start();
  
  // Adicionar as inimigas
  
  myGame.addNave(new NaveVermelha(WIDTH/2, 20, CENTRO));

  document.querySelector('#w').innerHTML = myGame.canvas.width;
  document.querySelector('#h').innerHTML = myGame.canvas.height;
}

