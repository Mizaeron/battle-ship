import { Ship } from "./ship.js";

export class Gameboard {
  constructor() {
    this.storedShip = null;
    this.shipMap = [];
    this.board = new Map(
      Gameboard.rowLetters.map((l) => [
        l,
        Array.from({ length: 10 }, () => null),
      ]),
    );
  }
  static rowLetters = "ABCDEFGHIJ".split("");

  createShip(length) {
    const ship = new Ship(length);
    this.storedShip = ship;
    return this.storedShip;
  }

  placeShip(newBoard, ship) {
    const map = newBoard.board;
    for (const k of ship.coords) {
      const index = Gameboard.rowLetters.indexOf(k[0]);
      const letterBefore = Gameboard.rowLetters[index - 1];
      const letterAfter = Gameboard.rowLetters[index + 1];
      const col = map.get(k[0]);
      const colBefore = map.get(letterBefore);
      const colAfter = map.get(letterAfter);

      // helper to safely set if index in bounds and value is null (or absent)
      function safeSet(target, idx, val) {
        if (!target) return;
        if (idx < 0 || idx >= target.length) return;
        if (target[idx] === null) target[idx] = val;
      }

      // current cell
      if (col && k[1] >= 0 && k[1] < col.length) col[k[1]] = "X";

      // same col neighbors
      safeSet(col, k[1] - 1, "C");
      safeSet(col, k[1] + 1, "C");

      // previous col neighbors
      safeSet(colBefore, k[1], "C");
      safeSet(colBefore, k[1] - 1, "C");
      safeSet(colBefore, k[1] + 1, "C");

      // next col neighbors
      safeSet(colAfter, k[1], "C");
      safeSet(colAfter, k[1] - 1, "C");
      safeSet(colAfter, k[1] + 1, "C");
    }
  }

  receiveAttack(coords, board) {
    const [H, V] = coords;
    for (const ship of board.shipMap) {
      for (const [H, V] of ship.coords) {
        if (H === coords[0] && V === coords[1]) {
          ship.hitCount++;
          // ship.coords.splice([H, V], 1);
          board.board.get(H)[V] = "Hit";
          return ship;
        }
      }
    }
    return (board.board.get(H)[V] = "Miss");
  }
  areAllShipSunk(shipmap) {
    return shipmap.every((ship) => ship.isSunk === true);
  }
}

export function checkExistingShipMap(board, coordToCheck) {
  for (const ship of board.shipMap) {
    for (const [H, V] of ship.coords) {
      if (H === coordToCheck[0] && V === coordToCheck[1]) {
        return true;
      }
    }
  }
  return false;
}

export function checkBoard(H, V, board) {
  if (board.board.get(`${H}`)[V] === "C") return true;
}
