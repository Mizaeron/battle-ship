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
  // index = new Map(Gameboard.rowLetters.map((l, b) => [l, b]));

  createShip(length) {
    const ship = new Ship(length);
    this.storedShip = ship;
    return this.storedShip;
  }

  placeShip(newBoard, ship) {
    const map = newBoard.board;
    const index = Gameboard.rowLetters.indexOf(ship.coords[0][0]);
    for (const k of ship.coords) {
      const index = Gameboard.rowLetters.indexOf(k[0]);
      newBoard.board.get(k[0])[k[1]] = "X";
      console.log(index);
    }
  }

  receiveAttack(coords, board) {
    const [H, V] = coords;
    for (const ship of board.shipMap) {
      for (const [H, V] of ship.coords) {
        if (H === coords[0] && V === coords[1]) {
          ship.hitCount++;
          // ship.coords.splice([H, V], 1);
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

// export function assignRadius (board)
