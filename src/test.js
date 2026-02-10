import { Ship } from "./ship";
import {
  checkExistingShipMap,
  newBoard as firstBoard,
  newBoard,
} from "./gameboard";

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

test("Is map letter an Array of 10", () => {
  const firstBoard = new newBoard();
  expect(firstBoard.board.get("A")).toBeInstanceOf(Array);
  expect(firstBoard.board.get("A")).toHaveLength(10);
  expect(firstBoard.board.has("B")).toBe(true);
  expect(firstBoard.board.get("B")[5]).toBe(null);
});

test("Setting coordinates on the board", () => {
  const firstBoard = new newBoard();
  firstBoard.board.get("A")[1] = "X";
  expect(firstBoard.board.get("A")[1]).toEqual("X");
});

test("Show created coords of the ship", () => {
  const firstBoard = new newBoard();
  const ship = new Ship(3);
  ship.assignCoords("A", 3, firstBoard);
  expect(ship.coords).toEqual([["A", 3]]);
  const ship2 = new Ship(3);
  ship2.assignCoords("B", 4, firstBoard);
  expect(ship2.coords).toEqual([["B", 4]]);
});

test("Create ship from within gameboard class", () => {
  const firstBoard = new newBoard();
  firstBoard.createShip(2);
  expect(firstBoard.createShip(2)).toBe(firstBoard.storedShip);
  firstBoard.createShip(3);
  expect(firstBoard.createShip(3)).toBe(firstBoard.storedShip);
});

test("Create a ship and assign coords", () => {
  const firstBoard = new newBoard();
  firstBoard.createShip(3);
  firstBoard.storedShip.assignCoords("A", 3, firstBoard);
  firstBoard.storedShip.assignCoords("A", 4, firstBoard);
  firstBoard.storedShip.assignCoords("A", 5, firstBoard);

  expect(firstBoard.storedShip.coords).toEqual([
    ["A", 3],
    ["A", 4],
    ["A", 5],
  ]);
});

test("Place stored ship on the board", () => {
  const firstBoard = new newBoard();
  firstBoard.createShip(3);
  firstBoard.storedShip.assignCoords("A", 3, firstBoard);
  firstBoard.storedShip.assignCoords("A", 4, firstBoard);
  firstBoard.storedShip.assignCoords("A", 5, firstBoard);
  firstBoard.placeShip(firstBoard, firstBoard.storedShip);
  expect(firstBoard.board.get("A")[3]).toEqual("X");
  expect(firstBoard.board.get("A")[4]).toEqual("X");
  expect(firstBoard.board.get("A")[5]).toEqual("X");
  console.log(firstBoard.board);
});

test("Store multiple ships without overwriting", () => {
  const firstBoard = new newBoard();
  firstBoard.createShip(2);
  firstBoard.storedShip.assignCoords("A", 2, firstBoard);
  firstBoard.storedShip.assignCoords("A", 3, firstBoard);
  firstBoard.createShip(3);
  firstBoard.storedShip.assignCoords("A", 4, firstBoard);
  firstBoard.storedShip.assignCoords("A", 5, firstBoard);
  expect(firstBoard.storedShip.assignCoords("A", 3, firstBoard)).toBe(
    "Already exists",
  );
});
