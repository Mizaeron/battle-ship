import { experiments } from "webpack";
import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

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
  const firstBoard = new Gameboard();
  expect(firstBoard.board.get("A")).toBeInstanceOf(Array);
  expect(firstBoard.board.get("A")).toHaveLength(10);
  expect(firstBoard.board.has("B")).toBe(true);
  expect(firstBoard.board.get("B")[5]).toBe(null);
});

test("Setting coordinates on the board", () => {
  const firstBoard = new Gameboard();
  firstBoard.board.get("A")[1] = "X";
  expect(firstBoard.board.get("A")[1]).toEqual("X");
});

test("Create ship from within gameboard class", () => {
  const firstBoard = new Gameboard();
  firstBoard.createShip(2);
  expect(firstBoard.createShip(2)).toBe(firstBoard.storedShip);
  firstBoard.createShip(3);
  expect(firstBoard.createShip(3)).toBe(firstBoard.storedShip);
});

test("Create a ship and assign coords", () => {
  const firstBoard = new Gameboard();
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
  const firstBoard = new Gameboard();
  firstBoard.createShip(3);
  firstBoard.storedShip.assignCoords("A", 3, firstBoard);
  firstBoard.storedShip.assignCoords("A", 4, firstBoard);
  firstBoard.storedShip.assignCoords("A", 5, firstBoard);
  expect(firstBoard.board.get("A")[3]).toEqual("X");
  expect(firstBoard.board.get("A")[4]).toEqual("X");
  expect(firstBoard.board.get("A")[5]).toEqual("X");
});

test("Throw an error when creating ship with existing coords", () => {
  const firstBoard = new Gameboard();
  firstBoard.createShip(2);
  firstBoard.storedShip.assignCoords("A", 2, firstBoard);
  firstBoard.storedShip.assignCoords("A", 3, firstBoard);
  expect(() => firstBoard.storedShip.assignCoords("A", 3, firstBoard)).toThrow(
    "Can't assign existing coords",
  );
});

test("Determine whether attack hit the ship", () => {
  const firstBoard = new Gameboard();
  firstBoard.createShip(3);
  firstBoard.storedShip.assignCoords("A", 3, firstBoard);
  firstBoard.storedShip.assignCoords("A", 4, firstBoard);
  firstBoard.storedShip.assignCoords("A", 5, firstBoard);
  firstBoard.createShip(2);
  firstBoard.storedShip.assignCoords("A", 7, firstBoard);
  firstBoard.storedShip.assignCoords("A", 8, firstBoard);
  // firstBoard.receiveAttack(["A", 7], firstBoard);
  expect(firstBoard.receiveAttack(["A", 3], firstBoard)).toEqual(
    firstBoard.shipMap[0],
  );
  expect(firstBoard.shipMap[0].hitCount).toEqual(1);
});

test("Check given coordinates to record a missed shot", () => {
  const firstBoard = new Gameboard();
  firstBoard.createShip(3);
  firstBoard.storedShip.assignCoords("A", 3, firstBoard);
  firstBoard.storedShip.assignCoords("A", 4, firstBoard);
  firstBoard.storedShip.assignCoords("A", 5, firstBoard);
  expect(firstBoard.receiveAttack(["A", 7], firstBoard)).toEqual("Miss");
  expect(firstBoard.board.get("A")[7]).toEqual("Miss");
});

test("Report if all ships are sunk", () => {
  const firstBoard = new Gameboard();
  firstBoard.createShip(3);
  firstBoard.storedShip.assignCoords("A", 3, firstBoard);
  firstBoard.storedShip.assignCoords("A", 4, firstBoard);
  firstBoard.storedShip.assignCoords("A", 5, firstBoard);
  firstBoard.receiveAttack(["A", 3], firstBoard);
  firstBoard.receiveAttack(["A", 4], firstBoard);
  firstBoard.receiveAttack(["A", 5], firstBoard);

  firstBoard.createShip(3);
  firstBoard.storedShip.assignCoords("C", 3, firstBoard);
  firstBoard.storedShip.assignCoords("C", 4, firstBoard);
  firstBoard.storedShip.assignCoords("C", 5, firstBoard);
  firstBoard.receiveAttack(["C", 3], firstBoard);
  firstBoard.receiveAttack(["C", 4], firstBoard);
  firstBoard.receiveAttack(["C", 5], firstBoard);

  expect(firstBoard.areAllShipSunk(firstBoard.shipMap)).toBe(true);
});
