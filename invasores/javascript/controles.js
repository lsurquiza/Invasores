// Função de manipulação de tecla
function handleKeyDown(event) {
    // Adicione aqui a lógica de movimentação do jogador
    switch (event.key){
        case "P":
        case "p":
            if (myGame.mode == PAUSE) myGame.mode = PLAY;
            else if (myGame.mode == PLAY) myGame.mode = PAUSE;				
            break;
        case "R":
        case "r":
            if (myGame.mode == GAMEOVER) location.reload();
            break;
        case "I":
        case "i":
            if (myGame.mode == INICIO) myGame.mode = PLAY; 
            break;
            // O jogador atira com espaço
        case " ":
            myGame.player.atirar();
    }
}

function handleMouseMove(event){
    //alert(player.x);
	myGame.player.setXY(event.clientX, event.clientY);
}

function handleMouseClick(){
    myGame.player.atirar();
}