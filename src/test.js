import { Ship } from ".";

test("hit() icrements hitCount", () => {
  const ship = new Ship(3);
  expect(ship.hitCount).toBe(0);

  ship.hit();
  expect(ship.hitCount).toBe(1);
});
