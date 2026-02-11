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
    switch (ship.length) {
      case 1:
        newBoard.board.get(ship.coords[0][0])[ship.coords[0][1]] = "X";
        break;
      case 2:
        newBoard.board.get(ship.coords[0][0])[ship.coords[0][1]] = "X";
        newBoard.board.get(ship.coords[1][0])[ship.coords[1][1]] = "X";
        break;
      case 3:
        newBoard.board.get(ship.coords[0][0])[ship.coords[0][1]] = "X";
        newBoard.board.get(ship.coords[1][0])[ship.coords[1][1]] = "X";
        newBoard.board.get(ship.coords[2][0])[ship.coords[2][1]] = "X";
        break;
      case 4:
        newBoard.board.get(ship.coords[0][0])[ship.coords[0][1]] = "X";
        newBoard.board.get(ship.coords[1][0])[ship.coords[1][1]] = "X";
        newBoard.board.get(ship.coords[2][0])[ship.coords[2][1]] = "X";
        newBoard.board.get(ship.coords[3][0])[ship.coords[3][1]] = "X";
        break;
    }
  }

  receiveAttack(coords, board) {
    for (const ship of board.shipMap) {
      for (const [H, V] of ship.coords) {
        if (H === coords[0] && V === coords[1]) {
          ship.hitCount++;
          // ship.coords.splice([H, V], 1);
          return ship;
        }
      }
    }
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
