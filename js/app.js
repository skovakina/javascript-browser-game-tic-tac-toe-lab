/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;
let winningSquares;

/*------------------------ Cached Element References ------------------------*/

const squareElements = document.querySelectorAll(".sqr");
const messageElement = document.querySelector("#message");
const resetBtnElement = document.querySelector("#reset");

/*-------------------------------- Functions --------------------------------*/

function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  winner = false;
  tie = false;
  squareElements.forEach((square) => square.classList.remove("winning"));
  render();
}

function render() {
  updateBoard();
  updateMessage();
}

function checkForTie() {
  if (winner) {
    return;
  }

  if (!board.includes("")) {
    tie = true;
  }
}

function checkForWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
      winningSquares = combo;
      return;
    }
  }
}

function switchPlayerTurn() {
  if (winner) {
    return;
  }
  if (turn === "X") {
    turn = "O";
  } else {
    turn = "X";
  }
}

function placePiece(index) {
  board[index] = turn;
}

function updateBoard() {
  board.forEach((cell, index) => {
    if (cell === "X") {
      squareElements[index].textContent = "X";
    } else if (cell === "O") {
      squareElements[index].textContent = "O";
    } else {
      squareElements[index].textContent = "";
    }
  });
  if (winner) {
    winningSquares.forEach((index) =>
      squareElements[index].classList.add("winning")
    );
  }
}

function updateMessage() {
  if (!winner && !tie) {
    if (turn === "X") {
      messageElement.textContent = "It's X's turn";
    } else {
      messageElement.textContent = "It's O's turn";
    }
  } else if (!winner && tie) {
    messageElement.textContent = "Tie game!";
  } else {
    if (turn === "X") {
      messageElement.textContent = "X wins!";
    } else {
      messageElement.textContent = "O wins!";
    }
  }
}

function handleClick(event) {
  const index = event.target.id;
  const squareIsFull = board[index] !== "";
  if (squareIsFull || winner) {
    return;
  }

  placePiece(index);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

init();
/*----------------------------- Event Listeners -----------------------------*/

squareElements.forEach((square) => {
  square.addEventListener("click", handleClick);
});

resetBtnElement.addEventListener("click", init);
