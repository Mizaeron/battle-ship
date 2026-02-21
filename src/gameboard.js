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
  // letterToIndex = new Map(Gameboard.rowLetters.map((l, b) => [l, b]));

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
      map.get(k[0])[k[1]] = "X";
      if (map.get(k[0])[k[1] - 1] === null) map.get(k[0])[k[1] - 1] = "C";
      if (map.get(k[0])[k[1] + 1] === null) map.get(k[0])[k[1] + 1] = "C";

      map.get(letterBefore)[k[1]] = "C";
      if (map.get(letterBefore)[k[1] - 1] === null)
        map.get(letterBefore)[k[1] - 1] = "C";
      if (map.get(letterBefore)[k[1] + 1] === null)
        map.get(letterBefore)[k[1] + 1] = "C";
      map.get(letterAfter)[k[1]] = "C";
      if (map.get(letterAfter)[k[1] - 1] === null)
        map.get(letterAfter)[k[1] - 1] = "C";
      if (map.get(letterAfter)[k[1] + 1] === null)
        map.get(letterAfter)[k[1] + 1] = "C";
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
