const { describe, expect, it } = require("@jest/globals");
const Scooter = require("../classes/Scooter.js");
const User = require("../classes/User.js");

describe("scooter.rent(user)", () => {
  it("checks a scooter out to a user", () => {
    // Arrange
    const scooter = new Scooter("Central Station");
    scooter.charge = 100; // Ensure scooter has enough charge
    scooter.isBroken = false; // Ensure scooter is in good condition
    const user = new User("csillaout");

    // Act
    scooter.rent(user);

    // Assert
    expect(scooter.user).toBe(user); // The user should now be set as the scooter's user
    expect(scooter.station).toBe(null); // The scooter should no longer be docked at a station
  });

  it("throws an error if battery dead or scooter broken", () => {
    // Arrange - battery dead
    const scooter = new Scooter("Central Station");
    scooter.charge = 10; // Low battery
    scooter.isBroken = false;
    const user = new User("csillaout");

    // Act & Assert
    expect(() => scooter.rent(user)).toThrow("Scooter needs to charge."); // Should throw battery error

    // Arrange - scooter broken
    scooter.charge = 100; // Fully charged
    scooter.isBroken = true; // Set scooter as broken

    // Act & Assert
    expect(() => scooter.rent(user)).toThrow("Scooter needs repair."); // Should throw repair error
  });
});

describe("scooter.dock(station)", () => {
  it("returns a scooter to a station", () => {
    // Arrange
    const scooter = new Scooter("Central Station");
    const user = new User("csillaout");
    scooter.user = user; // Assume scooter was rented by the user
    const newStation = "West Station";

    // Act
    scooter.dock(newStation);
    // Assert
    expect(scooter.station).toBe(newStation); // Scooter should be docked at the new station
    expect(scooter.user).toBe(null); // User should be cleared
  });
});

describe("scooter.charge()", () => {
  it.skip("charges a scooter", () => {
    // Arrange
    // Act
    // Assert
  });
});

describe("scooter.repair()", () => {
  it.skip("repairs a scooter", () => {
    // Arrange
    // Act
    // Assert
  });
});
