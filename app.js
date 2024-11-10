// -------------------------------- Constants --------------------------------/
let board = ['', '', '', '', '', '', '', '', '']
let turn = 'X'
let winner = false
let tie = false
// ---------------------------- Variables (state) ----------------------------/
const squareEls = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const messageEl = document.querySelector('#message')
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
]

// ------------------------ Cached Element References ------------------------/
const resetBtnEl = document.querySelector('#reset')

// -------------------------------- Functions --------------------------------/
const init = () => {
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'X'
  winner = false
  tie = false
  render()
  messageEl.textContent = ''
}
const render = () => {
  updateBoard()
  updateMessage()
}

const updateBoard = () => {
  board.forEach((square, index) => {
    document.querySelector(`#a${index}`).textContent = square
  })
}

const updateMessage = () => {
  if (winner === false && tie === false) {
    messageEl.textContent = `The turn is for player ${turn}`
  } else if (winner === false && tie === true) {
    messageEl.textContent = `The game ended tie!!!`
  } else {
    messageEl.textContent = `Congrats ${turn} you won!!!`
  }
}

const placePiece = (index) => {
  board[index] = turn
}

checkForWinner = () => {
  winningCombos.forEach((comp) => {
    if (
      board[comp[0]] === board[comp[1]] &&
      board[comp[1]] === board[comp[2]] &&
      board[comp[0]] !== ''
    ) {
      winner = true
    }
  })
}

const checkForTie = () => {
  let ti = true

  board.forEach((val) => {
    if (val === '') {
      ti = false
    }
  })

  if (ti === true && winner === false) {
    tie = true
  } else {
    tie = false
  }
}

const switchPlayerTurn = () => {
  if (winner === true) {
    return
  }
  if (turn === 'X') {
    turn = 'O'
  } else {
    turn = 'X'
  }
}

const handelClick = (event) => {
  let squareIndex = event.target.id
  if (
    board[squareIndex] === 'X' ||
    board[squareIndex] === 'O' ||
    winner === true
  ) {
    return
  }
  placePiece(squareIndex[1])
  updateBoard()
  checkForWinner()
  checkForTie()
  switchPlayerTurn()
  updateMessage()
}
// ----------------------------- Event Listeners -----------------------------/
squareEls.forEach((square) => {
  document.querySelector(`#a${square}`).addEventListener('click', handelClick)
})

resetBtnEl.addEventListener('click', init)
