export class Ship {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
  }

  hit() {
    this.hitCount++;
  }
  get isSunk() {
    return this.hitCount >= this.length;
  }
}
