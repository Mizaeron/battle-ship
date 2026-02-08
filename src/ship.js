export class Ship {
  constructor(length, coords = []) {
    this.length = length;
    this.hitCount = 0;
    this.coords = coords;
  }

  assignCoords(H, V) {
    this.coords.push([H, V]);
  }

  hit() {
    this.hitCount++;
  }
  get isSunk() {
    return this.hitCount >= this.length;
  }
}
