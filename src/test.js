import { Ship } from "./ship";
import { Gameboard } from "./gameboard";

test("hit() icrements hitCount", () => {
  const ship = new Ship(3);
  expect(ship.hitCount).toBe(0);

  ship.hit();
  expect(ship.hitCount).toBe(1);
});

test("Checks if sunk", () => {
  const ship = new Ship(1);
  expect(ship.isSunk).toBe(false);
});

test("Is letter an Array of 10", () => {
  expect(Gameboard.board.get("A")).toBeInstanceOf(Array);
  expect(Gameboard.board.get("A")).toHaveLength(10);
  expect(Gameboard.board.has("B")).toBe(true);
  expect(Gameboard.board.get("B")[5]).toBe(null);
});

test("Setting coordinates on the board", () => {
  Gameboard.board.get("A")[1] = "X";
  expect(Gameboard.board.get("A")[1]).toEqual("X");
});

test("Show created coords of the ship", () => {
  const ship = new Ship(3);
  ship.assignCoords("A", 3);
  expect(ship.coords).toEqual([["A", 3]]);
  const ship2 = new Ship(3);
  ship2.assignCoords("B", 4);
  expect(ship2.coords).toEqual([["B", 4]]);
});

test("Place ship on the board", () => {
  const ship = new Ship(1);
  const board = new Gameboard();
  ship.assignCoords("A", 3);
  board.placeShip(ship);
  expect(Gameboard.board.get(ship.coords[0][0])[ship.coords[0][1]]).toEqual(
    "X",
  );
  const ship2 = new Ship(4);
  ship2.assignCoords("B", 3);
  ship2.assignCoords("B", 4);
  ship2.assignCoords("B", 5);
  ship2.assignCoords("B", 6);

  board.placeShip(ship2);
  expect(Gameboard.board.get(ship2.coords[0][0])[ship2.coords[0][1]]).toEqual(
    "X",
  );
  expect(Gameboard.board.get(ship2.coords[1][0])[ship2.coords[1][1]]).toEqual(
    "X",
  );
  expect(Gameboard.board.get(ship2.coords[2][0])[ship2.coords[2][1]]).toEqual(
    "X",
  );
  expect(Gameboard.board.get(ship2.coords[3][0])[ship2.coords[3][1]]).toEqual(
    "X",
  );
});
