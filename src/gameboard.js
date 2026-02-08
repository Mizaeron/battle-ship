import { Ship } from "./ship";

export class Gameboard {
  static rowLetters = "ABCDEFGHIJ".split("");
  static board = new Map(
    Gameboard.rowLetters.map((l) => [
      l,
      Array.from({ length: 10 }, () => null),
    ]),
  );

  placeShip(ship) {
    switch (ship.length) {
      case 1:
        Gameboard.board.get(ship.coords[0][0])[ship.coords[0][1]] = "X";
        break;
      case 2:
        Gameboard.board.get(ship.coords[0][0])[ship.coords[0][1]] = "X";
        Gameboard.board.get(ship.coords[1][0])[ship.coords[1][1]] = "X";
        break;
      case 3:
        Gameboard.board.get(ship.coords[0][0])[ship.coords[0][1]] = "X";
        Gameboard.board.get(ship.coords[1][0])[ship.coords[1][1]] = "X";
        Gameboard.board.get(ship.coords[2][0])[ship.coords[2][1]] = "X";
        break;
      case 4:
        Gameboard.board.get(ship.coords[0][0])[ship.coords[0][1]] = "X";
        Gameboard.board.get(ship.coords[1][0])[ship.coords[1][1]] = "X";
        Gameboard.board.get(ship.coords[2][0])[ship.coords[2][1]] = "X";
        Gameboard.board.get(ship.coords[3][0])[ship.coords[3][1]] = "X";
        break;
    }
  }
}
