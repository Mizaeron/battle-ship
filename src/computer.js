import { Player } from "./player.js";

export function playerComputer() {
  const playerComputer = new Player();
  const computerBoard = playerComputer.createComputer();

  computerBoard.createShip(4);
  computerBoard.storedShip.assignCoords("F", 8, computerBoard);
  computerBoard.storedShip.assignCoords("G", 8, computerBoard);
  computerBoard.storedShip.assignCoords("H", 8, computerBoard);
  computerBoard.storedShip.assignCoords("I", 8, computerBoard);
  computerBoard.createShip(3);
  computerBoard.storedShip.assignCoords("A", 0, computerBoard);
  computerBoard.storedShip.assignCoords("B", 0, computerBoard);
  computerBoard.storedShip.assignCoords("C", 0, computerBoard);
  computerBoard.createShip(3);
  computerBoard.storedShip.assignCoords("G", 0, computerBoard);
  computerBoard.storedShip.assignCoords("G", 1, computerBoard);
  computerBoard.storedShip.assignCoords("G", 2, computerBoard);
  computerBoard.createShip(2);
  computerBoard.storedShip.assignCoords("A", 2, computerBoard);
  computerBoard.storedShip.assignCoords("B", 2, computerBoard);
  computerBoard.createShip(2);
  computerBoard.storedShip.assignCoords("I", 2, computerBoard);
  computerBoard.storedShip.assignCoords("I", 3, computerBoard);
  computerBoard.createShip(2);
  computerBoard.storedShip.assignCoords("B", 4, computerBoard);
  computerBoard.storedShip.assignCoords("C", 4, computerBoard);
  computerBoard.createShip(1);
  computerBoard.storedShip.assignCoords("E", 2, computerBoard);
  computerBoard.createShip(1);
  computerBoard.storedShip.assignCoords("H", 5, computerBoard);
  computerBoard.createShip(1);
  computerBoard.storedShip.assignCoords("F", 6, computerBoard);
  computerBoard.createShip(1);
  computerBoard.storedShip.assignCoords("B", 9, computerBoard);
  console.log(computerBoard);
}
