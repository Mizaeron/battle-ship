import { Player } from "./player.js";
import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
import { playerHuman } from "./human.js";
import { playerComputer } from "./computer.js";
import cross from "./images/close.png";
import dotimage from "./images/dot.png";

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
      cell.className = "cell2";
      cell.dataset.row = r;
      cell.dataset.col = c;
      grid.appendChild(cell);
    }
  }

  grid.addEventListener("click", (e) => {
    const x = document.createElement("img");
    x.src = cross;
    const dot = document.createElement("img");
    dot.src = dotimage;

    if (e.target.className == "cell2") {
      const column = colIndexToLetter(e.target.dataset.col);
      const row = Number(e.target.dataset.row);

      const ship = computerBoard.receiveAttack([column, row], computerBoard);
      if (computerBoard.board.get(column)[row] === "Hit") {
        x.className = "cross";
        e.target.append(x);
        if (ship.isSunk) {
          console.log(ship.coords);
        }
      } else if (computerBoard.board.get(column)[row] === "Miss") {
        dot.className = "dot";
        dot.style.backgroundColor = "#ccc";
        e.target.append(dot);
      }
    }
  });
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

function getPlayerMap(index) {
  return playerBoard.board.get(colIndexToLetter(index));
}
function getComputerMap(index) {
  return computerBoard.board.get(colIndexToLetter(index));
}

function displayPlayerBoard() {
  const grid = document.querySelectorAll(".cell");

  grid.forEach((cell) => {
    cell.textContent = getPlayerMap(cell.dataset.col)[cell.dataset.row];
    if (cell.textContent === "C") cell.textContent = "";
    if (cell.textContent === "X") {
      cell.textContent = "";
      cell.style.backgroundColor = "oklch(60.9% 0.126 221.723)";
    }
  });
}

function displayComputerBoard() {
  const grid = document.querySelectorAll(".cell2");

  grid.forEach((cell) => {
    cell.textContent = getComputerMap(cell.dataset.col)[cell.dataset.row];
    if (cell.textContent === "C") cell.textContent = "";
    if (cell.textContent === "X") {
      cell.textContent = "";
      cell.style.backgroundColor = "oklch(60.9% 0.126 221.723)";
    }
  });
}

displayPlayerBoard();
displayComputerBoard();
