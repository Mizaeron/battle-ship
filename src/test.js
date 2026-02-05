import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { experiments } from "webpack";

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

test("Creates coordinates for the ship", () => {
  const gameBoard = new Gameboard();
  expect(gameBoard.createCoordinates("A", 3)).toEqual(["A", 3]);
});

test("is letter an Array of 10", () => {
  expect(Gameboard.board.get("A")).toBeInstanceOf(Array);
  expect(Gameboard.board.get("A")).toHaveLength(10);
  expect(Gameboard.board.has("B")).toBe(true);
  expect(Gameboard.board.get("B")[5]).toBe(null);
});
