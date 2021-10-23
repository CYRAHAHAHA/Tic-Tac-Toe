//Gameboard - IIFE module style
const gameBoard = (() => {
    const announcer = document.getElementById('announcer');
    const spots = document.querySelectorAll('.spot');
    const logoL = document.getElementById('logoL');
    const logoR = document.getElementById('logoR');
    let nameX = '';
    let nameO = '';
    let count = 0;
    const gameArray = [8];
    let gameState = 0;
    let playerTurn = 0;
    let winner = '';
    gameArray.forEach(element => element = '-');
    playerturn = () => {
        return playerTurn;
    }
    gamestate = () => {
        return gameState;
    }
    start = () => {
        if(gameState == 0){
            playerTurn = 1;
            gameState = 1;
            count = 0;
            announcer.textContent = "Game has begun! " + playerX.pName() + ' goes first!'
            logoL.style.color = 'rgba(0, 0, 0, 1)';
            logoR.style.color = 'rgba(0, 0, 0, 0.3)';
        }
        else console.log("Game has already begun!")
    }
    update = (e) => {
        if(playerTurn != 0){
            if(e.target.textContent != 'X' && e.target.textContent != 'O' ){
                if(playerTurn == 1){
                    e.target.textContent = 'X';
                    announcer.textContent = playerO.pName() + '\'s turn!'
                    logoL.style.color = 'rgba(0, 0, 0, 0.3)';
                    logoR.style.color = 'rgba(0, 0, 0, 1)';   
                    playerX.update(e.target.id);
                    playerX.checkwin();                                  
                }
                else if(playerTurn == -1){
                    e.target.textContent = 'O';
                    announcer.textContent = playerX.pName() + '\'s turn!'
                    logoL.style.color = 'rgba(0, 0, 0, 1)';
                    logoR.style.color = 'rgba(0, 0, 0, 0.3)';   
                    playerO.update(e.target.id);
                    playerO.checkwin();
                }
                count += 1;
                if(count == 9 && gamestate == 1){
                    gamedraw();
                }
                playerTurn *= -1;
                gameArray[e.target.id] = e.target.textContent;
            }
            else console.log('spot has already been marked!');
        }
        else console.log('Game has ended!')
    }
    gameover = (type) => {
        nameX = playerX.pName();
        nameO = playerO.pName();
        gamestate = 0;
        console.log(type +' won!')
        if(type == 'X'){
            winner = nameX;
            logoL.style.color = 'rgba(0, 125, 90, 1)';
            logoR.style.color = 'rgba(125, 0, 0, 0.3)';   
        }
        else if(type == 'O'){
            winner = nameO;
            logoR.style.color = 'rgba(0, 125, 90, 1)';
            logoL.style.color = 'rgba(125, 0, 0, 0.3)'; 
        }
        playerTurn = 0;
        announcer.textContent = `${winner} is the winner!`
    }
    gamedraw = () => {
        console.log('Draw!');
        playerTurn = 0;
        announcer.textContent = `It's a draw!`
    }
    reset = () => {
        playerTurn = 1;
        gamestate = 1;
        spots.forEach((spots) => {
            spots.textContent = ' ';
        })
        count = 0;
        announcer.textContent = 'Restart! ' + playerX.pName() + ' goes first!'
        logoL.style.color = 'rgba(0, 0, 0, 1)';
        logoR.style.color = 'rgba(0, 0, 0, 0.3)';   
    }
    return {
    gameArray,
    update,
    gameover,
    start,
    playerturn,
    gamestate,
    reset
    };
})();
//Players
const player = (type) => {
    let marks = [];
    let pname = 'Unknown'
    victories = [
        ['0','1','2'],
        ['3','4','5'],
        ['6','7','8'],
        ['0','3','6'],
        ['1','4','7'],
        ['2','5','8'],
        ['0','4','8'],
        ['2','4','6'],
    ]
    const update = (id) => {
        marks.push(id);
    }
    const pName = () => {
        return pname;
    }
    const reset = () => {
        marks = [];
    }
    const checkwin = () => {
        victories.forEach( (element) => {
            if(element.every( val => marks.includes(val))) {
                gameBoard.gameover(type);
            }
        })
    }
    const playerName = (e) => {
        pname = prompt("Please key in your name");
        e.target.textContent = pname;
    }
    
    return {
        type,
        update,
        marks,
        checkwin,
        playerName,
        pName,
        reset
    };
}
const playerO = player('O');
const playerX = player('X');
//Game Flow
const gameSpot = document.querySelectorAll('li');
gameSpot.forEach((spot) => {
    spot.addEventListener("click", (e) => {
        gameBoard.update(e);
    });      
})

const names = document.querySelectorAll('.name');
const startbtn = document.getElementById('start');
const resetbtn = document.getElementById('reset');
const nameX = document.getElementById('playerX');
const nameO = document.getElementById('playerO');
nameX.onclick = (e) => {
    playerX.playerName(e);
}
nameO.onclick = (e) => {
    playerO.playerName(e);
}

startbtn.onclick = () => {
    console.log("Game Start!")
    gameBoard.start();
}
resetbtn.onclick = () => {
    playerX.reset();
    playerO.reset();
    gameBoard.reset();
}



