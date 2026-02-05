export class Gameboard {
  static rowLetters = "ABCDEFGHIJ".split("");
  static board = new Map(
    Gameboard.rowLetters.map((l) => [
      l,
      Array.from({ length: 10 }, () => null),
    ]),
  );
  createCoordinates(horizontal, vertical) {
    return [horizontal, vertical];
  }
}
