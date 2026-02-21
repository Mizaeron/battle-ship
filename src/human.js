import { Player } from "./player.js";

export function playerHuman() {
  const playerComputer = new Player();
  const playerBoard = playerComputer.createHuman();

  playerBoard.createShip(4);
  playerBoard.storedShip.assignCoords("H", 3, playerBoard);
  playerBoard.storedShip.assignCoords("H", 4, playerBoard);
  playerBoard.storedShip.assignCoords("H", 5, playerBoard);
  playerBoard.storedShip.assignCoords("H", 6, playerBoard);
  playerBoard.createShip(3);
  playerBoard.storedShip.assignCoords("A", 0, playerBoard);
  playerBoard.storedShip.assignCoords("B", 0, playerBoard);
  playerBoard.storedShip.assignCoords("C", 0, playerBoard);
  playerBoard.createShip(3);
  playerBoard.storedShip.assignCoords("F", 8, playerBoard);
  playerBoard.storedShip.assignCoords("G", 8, playerBoard);
  playerBoard.storedShip.assignCoords("H", 8, playerBoard);
  playerBoard.createShip(2);
  playerBoard.storedShip.assignCoords("B", 5, playerBoard);
  playerBoard.storedShip.assignCoords("B", 6, playerBoard);
  playerBoard.createShip(2);
  playerBoard.storedShip.assignCoords("D", 5, playerBoard);
  playerBoard.storedShip.assignCoords("D", 6, playerBoard);
  playerBoard.createShip(2);
  playerBoard.storedShip.assignCoords("F", 5, playerBoard);
  playerBoard.storedShip.assignCoords("F", 6, playerBoard);
  playerBoard.createShip(1);
  playerBoard.storedShip.assignCoords("A", 9, playerBoard);
  playerBoard.createShip(1);
  playerBoard.storedShip.assignCoords("I", 1, playerBoard);
  playerBoard.createShip(1);
  playerBoard.storedShip.assignCoords("F", 2, playerBoard);
  playerBoard.createShip(1);
  playerBoard.storedShip.assignCoords("C", 2, playerBoard);

  return playerBoard;
}
