import { checkExistingShipMap } from "./gameboard.js";

export class Ship {
  constructor(length, coords = []) {
    this.length = length;
    this.hitCount = 0;
    this.coords = coords;
  }

  assignCoords(H, V, board) {
    if (checkExistingShipMap(board, [H, V])) return "Already exists";

    this.coords.push([H, V]);

    if (board.storedShip.length === board.storedShip.coords.length)
      board.shipMap.push(board.storedShip);
  }

  hit() {
    this.hitCount++;
  }
  get isSunk() {
    return this.hitCount >= this.length;
  }
}
