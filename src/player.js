import { Gameboard } from "./gameboard.js";

export class Player {
  constructor() {
    this.human = null;
    this.computer = null;
  }
  createHuman() {
    const playerUser = new Gameboard();
    this.human = playerUser;
    return playerUser;
  }

  createComputer() {
    const computerUser = new Gameboard();
    this.computer = computerUser;
    return computerUser;
  }
}
