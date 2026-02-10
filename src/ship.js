import { checkExistingShipMap, newBoard } from "./gameboard.js";

export class Ship {
  constructor(length, coords = []) {
    this.length = length;
    this.hitCount = 0;
    this.coords = coords;
  }

  assignCoords(H, V, board) {
    let i = 0;
    if (checkExistingShipMap(board, [H, V])) return "Already exists";
    while (i < board.storedShip.length) {
      i++;
      console.log(i);
    }

    this.coords.push([H, V]);

    board.shipMap.push(board.storedShip);
  }

  hit() {
    this.hitCount++;
  }
  get isSunk() {
    return this.hitCount >= this.length;
  }
}
