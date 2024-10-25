const { describe, expect, it } = require("@jest/globals");
const ScooterApp = require("../classes/ScooterApp.js");
const User = require("../classes/User.js");
const Scooter = require("../classes/Scooter.js");

describe("ScooterApp.registerUser(username, password, age)", () => {
  it("registers a new user if old enough", () => {
    // Arrange
    const app = new ScooterApp();
    // Act
    const user = app.registerUser("newUser", "password123", 20);
    // Assert
    expect(app.registeredUsers["newUser"]).toBe(user);
    expect(user.username).toBe("newUser");
    expect(user.age).toBe(20);
  });

  it("throws an error if too young or already registered", () => {
    // Arrange
    const app = new ScooterApp();
    app.registerUser("existingUser", "password123", 25);
    // Act & Assert
    expect(() => app.registerUser("existingUser", "password123", 25)).toThrow(
      "User already registered or too young to register."
    );
    expect(() => app.registerUser("newUser2", "password123", 17)).toThrow(
      "User already registered or too young to register."
    );
  });
});

describe("ScooterApp.loginUser(username, password)", () => {
  it("logs in a registered user", () => {
    // Arrange
    const app = new ScooterApp();
    app.registerUser("user1", "password123", 22);

    // Act
    app.loginUser("user1", "password123");

    // Assert
    expect(app.registeredUsers["user1"].loggedIn).toBe(true);
  });

  it("throws an error if user not found or password incorrect", () => {
    // Arrange
    const app = new ScooterApp();
    app.registerUser("user2", "password123", 22);
    // Act & Assert
    expect(() => app.loginUser("user3", "password123")).toThrow(
      "Username is incorrect."
    );
    expect(() => app.loginUser("user2", "wrongPassword")).toThrow(
      "Password is incorrect."
    );
  });
});

describe("ScooterApp.logoutUser(username)", () => {
  it("logs out a registered user", () => {
    // Arrange
    const app = new ScooterApp();
    app.registerUser("user3", "password123", 22);
    app.loginUser("user3", "password123");
    // Act
    app.logoutUser("user3");

    // Assert
    expect(app.registeredUsers["user3"].loggedIn).toBe(false);
  });

  it("throws an error if user not found", () => {
    // Arrange
    const app = new ScooterApp();

    // Act & Assert
    expect(() => app.logoutUser("nonExistentUser")).toThrow(
      "No such user is logged in."
    );
  });
});

describe("ScooterApp.createScooter(station)", () => {
  it("creates a new scooter and adds it to ScooterApp.stations", () => {
    // Arrange
    const app = new ScooterApp();

    // Act
    const scooter = app.createScooter("Central");

    // Assert
    expect(app.stations["Central"]).toContain(scooter);
    expect(scooter.station).toBe("Central");
  });

  it("throws an error if a station does not exist", () => {
    // Arrange
    const app = new ScooterApp();

    // Act & Assert
    expect(() => app.createScooter("UnknownStation")).toThrow(
      "No such station."
    );
  });
});

describe("ScooterApp.dockScooter(scooter, station)", () => {
  it("docks a scooter at a station", () => {
    // Arrange
    const app = new ScooterApp();
    const scooter = app.createScooter("Central");

    // Act
    app.dockScooter(scooter, "East");

    // Assert
    expect(app.stations["East"]).toContain(scooter);
  });

  it("throws an error if a station does not exist", () => {
    // Arrange
    const app = new ScooterApp();
    const scooter = new Scooter("Central");

    // Act & Assert
    expect(() => app.dockScooter(scooter, "UnknownStation")).toThrow(
      "No such station."
    );
  });

  it("throws an error if a scooter is already at a station", () => {
    // Arrange
    const app = new ScooterApp();
    const scooter = app.createScooter("Central");

    // Act & Assert
    expect(() => app.dockScooter(scooter, "Central")).toThrow(
      "Scooter already at station."
    );
  });
});

describe("ScooterApp.rentScooter(scooter, user)", () => {
  it("rents a scooter out to a user", () => {
    // Arrange
    const app = new ScooterApp();
    const user = app.registerUser("user4", "password123", 22);
    const scooter = app.createScooter("Central");

    // Act
    app.rentScooter(scooter, user);

    // Assert
    expect(scooter.user).toBe(user);
    expect(app.stations["Central"]).not.toContain(scooter);
  });

  it("throws an error if a scooter is already rented", () => {
    // Arrange
    const app = new ScooterApp();
    const user1 = app.registerUser("user5", "password123", 22);
    const user2 = app.registerUser("user6", "password456", 23);
    const scooter = app.createScooter("Central");

    // Act
    app.rentScooter(scooter, user1);

    // Assert
    expect(() => app.rentScooter(scooter, user2)).toThrow(
      "Scooter already rented."
    );
  });
});
