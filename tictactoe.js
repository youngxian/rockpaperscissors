const humanplayer = 'o';
let origboard;
const aiplayer = 'x';
const wincombos = [
    [0, 1, 2],
    [0, 3, 6],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]
const declare = document.getElementById('declare');

const cells = document.querySelectorAll('.cell');
const startbtn = document.querySelector('.start-btn');

function startgame() {

    origboard = Array.from(Array(9).keys());
    startbtn.classList.add('d-none');
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.addEventListener(('click'), turnclick, false)
    })
}

function turnclick(e) {
    declare.classList.add('d-none');
    cells.forEach((cell) => {
        cell.style.color = 'black';
    })
    if (typeof origboard[e.target.id] == 'number') {
        turn(e.target.id, humanplayer);
        if (!checkTie()) { turn(bestSpot(), aiplayer) };
    }
}

function turn(squareid, player) {
    origboard[squareid] = player;
    document.getElementById(squareid).textContent = player;
    let gameWon = checkWin(origboard, player);
    if (gameWon) {
        gameOver(gameWon)
    }
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of wincombos.entries()) {
        // console.log('index ' + index + ' ind ' + wincombos.every(elem => plays.indexOf(elem) > -1));
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {
                index: index,
                player: player
            };
            break;
        }

    }
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of wincombos[gameWon.index]) {
        document.getElementById(index).style.color = gameWon.player == humanplayer ? "tomato" : "tomato";
    }
    cells.forEach((cell) => {
        cell.removeEventListener(('click'), turnclick, false);
    })
    startbtn.classList.remove('d-none');
    startbtn.textContent = 'Replay'
    declareWinner(gameWon == humanplayer ? "YOU WIN!" : 'YOU LOSE')
};

function bestSpot() {
    return minimax(origboard, aiplayer).index;
}

function emptySquares() {
    return origboard.filter(s => typeof s == 'number');
}

function checkTie() {
    if (emptySquares().length == 0) {
        cells.forEach((cell) => {
            cell.removeEventListener(('click'), turnclick, false)
        })
        startbtn.classList.remove('d-none');
        startbtn.textContent = "Replay";
        declareWinner("Tie Game!");
        return true;
    }
    return false
}

function declareWinner(who) {

    //display message
    declare.classList.remove('d-none');
    declare.textContent = who;

}

function minimax(newBoard, player) {
    var availSpots = emptySquares(newBoard);
    if (checkWin(newBoard, player)) {
        return { score: -10 };
    } else if (checkWin(newBoard, aiplayer)) {
        return { score: 10 }
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }

    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;
        if (player == aiplayer) {
            var result = minimax(newBoard, humanplayer);
            move.score = result.score;
        } else {
            var result = minimax(newBoard, aiplayer)
            move.score = result.score;
        }
        newBoard[availSpots[i]] = move.index;
        moves.push(move);
    }
    var bestMove;
    if (player === aiplayer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}