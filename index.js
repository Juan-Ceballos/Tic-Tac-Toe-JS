document.addEventListener("DOMContentLoaded", () => {console.log("Dom loaded")})
const player1 = {
    isWinner: false
}

const player2 = {
    isWinner: false
}

const board = {
    boardState: [[-9, -9, -9], [-9, -9, -9], [-9, -9, -9]],
    turn: 0,
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
        console.log("fill")
        /*  win conditions: 
            Horizontal = 1 row same value, [] [] [] 
            Vertical = each row has same value on same column,
            Diagonal = each row has same value on column matching row number or reverse (diagonal)
            Tie = 
        */

        for (let i = 0; i < this.boardState.length; i++) {
            let rowSum = this.boardState[i].reduce((a, b) => a + b, 0)
            if (rowSum === 0) {
                player1.isWinner = true
                return true
            } else if (rowSum === 3) {
                player2.isWinner = true
                return true
            }

            let wc2Sum = this.boardState[0][i] + this.boardState[1][i] + this.boardState[2][i]

            if (wc2Sum === 0) {
                player1.isWinner = true
                return true
            } else if (wc2Sum === 3) {
                player2.isWinner = true
                return true
            }   
        }

        let wc3Sum = this.boardState[0][0] + this.boardState[1][1] + this.boardState[2][2]
        let wc4Sum = this.boardState[0][2] + this.boardState[1][1] + this.boardState[2][0]

        if (wc3Sum === 0) {
            player1.isWinner = true
            return true
        } else if (wc3Sum === 3) {
            player2.isWinner = true
            return true 
        }

        if (wc4Sum === 0) {
            player1.isWinner = true
            return true
        } else if (wc4Sum === 3) {
            player2.isWinner = true
            return true 
        }

        if (!this.boardState[0].includes(-9) && !this.boardState[1].includes(-9) && !this.boardState[2].includes(-9)) {
            return true
        }
        return false
    },

    resetTurn: function() {
        this.turn = 0
    },

    resetBoard: function() {
        this.boardState = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    }
}

function cellClicked(currCell) {
    let currentCellRowIndex = currCell.target.parentNode.getAttribute("data-row-index")
    let currentCellColumnIndex = currCell.target.getAttribute("data-cell-index")
    let content = document.createElement("div")
    content.innerText = board.updateBoard(currentCellRowIndex, currentCellColumnIndex)
    currCell.target.appendChild(content)
    currCell.target.removeEventListener("click", cellClicked)
    console.log(board.boardState)
    console.log(board.checkForEndGame())
    board.increaseTurn()
}



// change the state of a div add
let elements = document.querySelectorAll(".cell")
for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", cellClicked)
}
