import { Player } from "./player.js";
import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
import { playerHuman } from "./human.js";
import { playerComputer } from "./computer.js";

export function game() {}

const COL_LETTERS = "ABCDEFGHIJ";

const playerBoard = playerHuman();
const computerBoard = playerComputer();

function renderPlayer() {
  const grid = document.querySelector(".player-board");

  for (let r = 0; r < 10; r++) {
    const rl = document.createElement("div");
    rl.className = "label";
    rl.textContent = r;
    grid.appendChild(rl);

    for (let c = 0; c < 10; c++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = r;
      cell.dataset.col = c;
      grid.appendChild(cell);
    }
  }
}

function renderComputer() {
  const grid = document.querySelector(".computer-board");

  for (let r = 0; r < 10; r++) {
    const rl = document.createElement("div");
    rl.className = "label";
    rl.textContent = r;
    grid.appendChild(rl);

    for (let c = 0; c < 10; c++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = r;
      cell.dataset.col = c;
      grid.appendChild(cell);
    }
  }
}

renderPlayer();
renderComputer();

function colIndexToLetter(colIndex) {
  return COL_LETTERS[colIndex] ?? null;
}

function letterToColIndex(letter) {
  return COL_LETTERS.indexOf(letter.toUpperCase());
}

function rowIndexToDisplay(rowIndex) {
  return rowIndex;
}

function getCol(index) {
  return playerBoard.board.get(colIndexToLetter(index));
}

function displayBoard() {
  const grid = document.querySelectorAll(".cell");

  grid.forEach((cell) => {
    cell.textContent = getCol(cell.dataset.row)[cell.dataset.col];
    if (cell.textContent === "C") cell.textContent = "";
    if (cell.textContent === "X") {
      cell.textContent = "";
      cell.style.backgroundColor = "oklch(60.9% 0.126 221.723)";
    }
  });
}

displayBoard();
