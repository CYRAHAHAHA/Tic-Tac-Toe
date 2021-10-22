//Gameboard - IIFE module style
const gameBoard = (() => {
    const gameArray = [8];
    let playerTurn = 1;
    gameArray.forEach(element => element = '-');
    update = (e) => {
        if(playerTurn != 0){
            if(e.target.textContent != 'X' && e.target.textContent != 'O' ){
                if(playerTurn == 1){
                    e.target.textContent = 'X';
                    playerX.update(e.target.id);
                    playerX.checkwin();
                }
                else if(playerTurn == -1){
                    e.target.textContent = 'O';
                    playerO.update(e.target.id);
                    playerO.checkwin();
                }
                playerTurn *= -1;
                gameArray[e.target.id] = e.target.textContent;
            }
            else console.log('spot has already been marked!');
        }
        else console.log('Game has ended!')
    }
    gameover = (type) => {
        console.log(type+' won!')
        playerTurn = 0;
    }
    return {
    gameArray,
    update,
    gameover
    };
})();
//Players
const player = (type) => {
    const marks = [];
    const update = (id) => {
        marks.push(id);
    }
    const checkwin = () => {
        victories.forEach( (element) => {
            if(element.every( val => marks.includes(val))) {
                gameBoard.gameover(type);
            }
        })
    }
    return {
        type,
        update,
        marks,
        checkwin
    };
}
const playerO = player('O');
const playerX = player('X');
//Game Flow
const gameSpot = document.querySelectorAll('li');
gameSpot.forEach((spot) => {
    spot.addEventListener("click", (e) => {
        gameBoard.update(e);
        gameBoard.checkwin;
    });      
})
//List of victory values
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

const array = [0,4,5,6,8,1,7]

