var playerG = "G";
var playerO = "O";

var currPlayer = playerG;
var gameOver = false;

var board;
var rows = 6;
var columns = 7;
var currColumns = [];



window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            // HTML <div class="tile">0-0</div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);

    }


}


function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    
    r = currColumns[c]; 

    if (r < 0) { 
        return;
    }

    board[r][c] = currPlayer; //update JS board
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerG) {
        tile.classList.add("greenpiece");
        currPlayer = playerO;
    }
    else {
        tile.classList.add("orangepiece");
        currPlayer = playerG;
    }

    r -= 1; 
    currColumns[c] = r; 

    checkWinner();
}

//check winner
function checkWinner() {
     // horizontal
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // other diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}


function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerG) {
        winner.innerText = "Green Wins";  
        bodyChangeGreen();
    } 
    else {
        winner.innerText = "Orange Wins";
        bodyChangeOrange();
    }
    gameOver = true;
}

//changes body depending on winner
function bodyChangeGreen() {
    const greBod = document.getElementsByClassName("bodyy");
for (let i = 0; i < greBod.length; i++) {
    greBod[i].style.backgroundColor = 'rgb(5, 244, 72)';
}
}

function bodyChangeOrange() {
    const oraBod = document.getElementsByClassName("bodyy");
for (let i = 0; i < oraBod.length; i++) {
    oraBod[i].style.backgroundColor = 'rgb(251, 164, 3)';
}
}

