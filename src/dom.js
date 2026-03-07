import { Player } from "./player.js";
import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
import { playerHuman } from "./human.js";
import { playerComputer } from "./computer.js";
import cross from "./images/close.png";
import dotimage from "./images/dot.png";

export function game() {}

const COL_LETTERS = "ABCDEFGHIJ";

let playerBoard = playerHuman();
const computerBoard = playerComputer();

function renderPlayer() {
  const grid = document.querySelector(".player-board");

  const corner = document.createElement("div");
  corner.className = "label corner";
  grid.append(corner);

  for (let l = 0; l < 10; l++) {
    const topL = document.createElement("div");
    topL.className = "label";
    topL.textContent = colIndexToLetter(l);
    grid.append(topL);
  }
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
}

renderPlayer();
renderComputer();

function colIndexToLetter(colIndex) {
  return COL_LETTERS[colIndex] ?? null;
}

function letterToColIndex(letter) {
  return COL_LETTERS.indexOf(letter.toUpperCase());
}

function getPlayerMap(index) {
  return playerBoard.board.get(colIndexToLetter(index));
}
function getComputerMap(index) {
  return computerBoard.board.get(colIndexToLetter(index));
}

function sunkRadius(ship, cell, boards) {
  for (const k of ship.coords) {
    const column = letterToColIndex(k[0]);
    const rowNumber = k[1];

    function set(col, row) {
      if (col < 0) return;
      const target = document.querySelector(
        `.${cell}[data-col="${col}"][data-row="${row}"]`,
      );
      const boardCell = boards.board.get(colIndexToLetter(col))[row];
      if (boardCell === "C" && !target.querySelector("img")) {
        const dot = document.createElement("img");
        dot.src = dotimage;
        dot.className = "dot";
        target.append(dot);
        boards.board.get(colIndexToLetter(col))[row] = "Radius";
      }
    }
    set(column, rowNumber - 1);
    set(column, rowNumber + 1);
    set(column - 1, rowNumber - 1);
    set(column - 1, rowNumber);
    set(column - 1, rowNumber + 1);
    set(column + 1, rowNumber - 1);
    set(column + 1, rowNumber);
    set(column + 1, rowNumber + 1);
  }
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

const computerGrid = document.querySelector(".computer-board");

function playerTurn() {
  computerGrid.addEventListener("click", onPlayerClick);
}

function onPlayerClick(e) {
  const x = document.createElement("img");
  x.src = cross;
  x.className = "cross";
  const dot = document.createElement("img");
  dot.src = dotimage;
  dot.className = "dot";
  dot.style.backgroundColor = "#ccc";

  if (!e.target.classList.contains("cell2")) return;
  if (e.target.querySelector(".cross") || e.target.querySelector(".dot"))
    return;
  const column = colIndexToLetter(e.target.dataset.col);
  const row = Number(e.target.dataset.row);

  const ship = computerBoard.receiveAttack([column, row], computerBoard);
  if (computerBoard.board.get(column)[row] === "Hit") {
    e.target.append(x);
    if (ship.isSunk) sunkRadius(ship, "cell2", computerBoard);
  } else if (computerBoard.board.get(column)[row] === "Miss") {
    e.target.append(dot);
  }

  if (computerBoard.areAllShipSunk(computerBoard.shipMap)) gameOver();
  computerGrid.removeEventListener("click", onPlayerClick);
  computerTurn();
}

function computerTurn() {
  const x = document.createElement("img");
  x.src = cross;
  x.className = "cross";
  const dot = document.createElement("img");
  dot.src = dotimage;
  dot.className = "dot";

  const [col, row] = computerRandomAttack();
  console.log(col, row);
  const ship = playerBoard.receiveAttack([col, row], playerBoard);
  const targets = document.querySelector(
    `.cell[data-col="${letterToColIndex(col)}"][data-row="${row}"]`,
  );
  if (playerBoard.board.get(col)[row] === "Hit") {
    targets.append(x);
    if (ship.isSunk) sunkRadius(ship, "cell", playerBoard);
  } else if (playerBoard.board.get(col)[row] === "Miss") {
    dot.style.backgroundColor = "#ccc";
    targets.append(dot);
  }
  if (playerBoard.areAllShipSunk(playerBoard.shipMap)) gameOver();
  playerTurn();
}

function computerRandomAttack() {
  const colsArray = COL_LETTERS.split("");
  let col, row;

  do {
    col = colsArray[Math.floor(Math.random() * colsArray.length)];
    row = Math.floor(Math.random() * 10);
  } while (
    playerBoard.board.get(col)[row] === "Hit" ||
    playerBoard.board.get(col)[row] === "Miss" ||
    playerBoard.board.get(col)[row] === "Radius"
  );

  return [col, row];
}

function gameOver() {
  if (computerBoard.areAllShipSunk(computerBoard.shipMap)) alert("PLAYER WINS");
  if (playerBoard.areAllShipSunk(playerBoard.shipMap)) alert("Computer Wins");
}

function createPlacement() {
  const button = document.querySelector(".place");
  const grid = document.querySelector(".player-board");

  button.addEventListener("click", () => {
    grid.textContent = "";
    renderPlayer();
    newPlayerBoard();
  });
}
playerTurn();
createPlacement();

async function newPlayerBoard() {
  const newPlayer = new Player();
  playerBoard = newPlayer.createHuman();

  await shipCreation(2);
  await shipCreation(3);
}

function shipCreation(size) {
  return new Promise((resolve) => {
    const form = document.querySelector(".ship-form");
    const shipSize = document.querySelector(".ship-size");
    const createShip = document.querySelector(".create-ship");
    shipSize.textContent = `Ship Size: ${size}`;
    const button = document.createElement("button");
    button.className = "submit-button";
    button.textContent = "Submit";

    for (let i = 0; i < size; i++) {
      const letter = document.createElement("input");
      letter.type = "text";
      letter.id = `letter-${i}`;

      const letterLabel = document.createElement("label");
      letterLabel.className = "letter-label";
      letterLabel.htmlFor = letter.id;
      letterLabel.textContent = "Letter: ";

      const number = document.createElement("input");
      number.type = "number";
      number.id = `number-${i}`;

      const numberLabel = document.createElement("label");
      numberLabel.className = "number-label";
      numberLabel.htmlFor = number.id;
      numberLabel.textContent = "Number: ";
      numberLabel.ariaValueMax = 9;

      letterLabel.append(letter);
      form.append(letterLabel);
      numberLabel.append(number);
      form.append(numberLabel);
    }

    form.append(button);
    createShip.style.visibility = "visible";

    const handler = (e) => {
      e.preventDefault();
      playerBoard.createShip(size);
      for (let i = 0; i < size; i++) {
        const letter = document.querySelector(`#letter-${i}`);
        const number = document.querySelector(`#number-${i}`);
        playerBoard.storedShip.assignCoords(
          letter.value,
          number.value,
          playerBoard,
        );
      }

      displayPlayerBoard();
      // clean up created inputs/buttons so next call starts fresh
      const inputs = form.querySelectorAll(
        ".letter-label, .number-label, .submit-button",
      );
      inputs.forEach((n) => n.remove());
      createShip.style.visibility = "hidden";

      button.removeEventListener("click", handler);
      resolve();
    };

    button.addEventListener("click", handler);
  });
}
