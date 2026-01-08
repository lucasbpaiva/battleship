import { Ship } from "./Ship.js";

test("Ship sinks after getting enough hits", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});