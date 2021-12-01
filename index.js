window.onload = function() {
    let elements = document.querySelectorAll(".cell")
    let label = document.getElementById("winnerLabel")
    turnBoardOn(elements)
}

function resetBoardByButton() {
    let elements = document.querySelectorAll(".cell")
    let label = document.getElementById("winnerLabel")
    board.resetBoard()
    turnBoardOn(elements)
    label.innerText = "Winner:"
    player1.isWinner = false
    player2.isWinner = false
}

function cellClicked(currCell) {
    let elements = document.querySelectorAll(".cell")
    let label = document.getElementById("winnerLabel")
    let currentCellRowIndex = currCell.target.parentNode.getAttribute("data-row-index")
    let currentCellColumnIndex = currCell.target.getAttribute("data-cell-index")
    currCell.target.innerText = board.updateBoard(currentCellRowIndex, currentCellColumnIndex)
    currCell.target.removeEventListener("click", cellClicked)
    let isEndGame = board.checkForEndGame()
    if (isEndGame) {
        turnBoardOff(elements)
        if (player1.isWinner === false && player2.isWinner === false) {
            label.innerText = "Winner: Tie!"
        } else {
            for (let i = 0; i < board.winningSquares.length; i++) {
                let square = board.winningSquares[i]
                let loc = square[0] + (square[1] * 3)
                let cellToLight = elements[loc]
                cellToLight.style.backgroundColor = 'red'
            }
            if (player1.isWinner === true) {
                label.innerText = "Winner: Player1!"
            } else {
                label.innerText = "Winner: Player2!"
            }
        }
    } else {
        board.increaseTurn()
    }
}

const player1 = {
    isWinner: false
}

const player2 = {
    isWinner: false
}

function turnBoardOff(boardElements) {
    for (let i = 0; i < boardElements.length; i++) {
        boardElements[i].removeEventListener("click", cellClicked)
    }
}

function turnBoardOn(boardElements) {
    for (let i = 0; i < boardElements.length; i++) {
        boardElements[i].addEventListener("click", cellClicked)
        boardElements[i].innerText = ""
        boardElements[i].style.backgroundColor = "#90EE90"
    }
}


const board = {
    boardState: [[-9, -9, -9], [-9, -9, -9], [-9, -9, -9]],
    turn: 0,
    winningSquares: [[]],

    increaseTurn: function() {
        this.turn += 1
    },

    updateBoard: function(row, col) {
        if (this.turn % 2 === 0) {
            this.boardState[col % 3][row] = 0
            return "X"
        } else {
            this.boardState[col % 3][row] = 1
            return "O"
        }
    },

    checkForEndGame: function() {
        for (let i = 0; i < this.boardState.length; i++) {
            let rowSum = this.boardState[i].reduce((a, b) => a + b, 0)
            if (rowSum === 0) {
                player1.isWinner = true
                this.winningSquares = [[i, 0], [i, 1], [i, 2]]
                return true
            } else if (rowSum === 3) {
                this.winningSquares = [[i, 0], [i, 1], [i, 2]]
                player2.isWinner = true
                return true
            }

            let wc2Sum = this.boardState[0][i] + this.boardState[1][i] + this.boardState[2][i]

            if (wc2Sum === 0) {
                player1.isWinner = true
                this.winningSquares = [[0, i], [1, i], [2, i]]
                return true
            } else if (wc2Sum === 3) {
                player2.isWinner = true
                this.winningSquares = [[0, i], [1, i], [2, i]]
                return true
            }   
        }

        let wc3Sum = this.boardState[0][0] + this.boardState[1][1] + this.boardState[2][2]
        let wc4Sum = this.boardState[0][2] + this.boardState[1][1] + this.boardState[2][0]

        if (wc3Sum === 0) {
            player1.isWinner = true
            this.winningSquares = [[0, 0], [1, 1], [2, 2]]
            return true
        } else if (wc3Sum === 3) {
            player2.isWinner = true
            this.winningSquares = [[0, 0], [1, 1], [2, 2]]
            return true 
        }

        if (wc4Sum === 0) {
            player1.isWinner = true
            this.winningSquares = [[0, 2], [1, 1], [2, 0]]
            return true
        } else if (wc4Sum === 3) {
            player2.isWinner = true
            this.winningSquares = [[0, 2], [1, 1], [2, 0]]
            return true 
        }

        if (!this.boardState[0].includes(-9) && !this.boardState[1].includes(-9) && !this.boardState[2].includes(-9)) {
            return true
        }
        return false
    },

    resetBoard: function() {
        this.boardState = [[-9, -9, -9], [-9, -9, -9], [-9, -9, -9]]
        this.turn = 0
        this.winningSquares = [[]]
    }
}