const { describe, expect, it } = require("@jest/globals");
const User = require("../classes/User.js");

describe("user.login(password)", () => {
  it("logs a user in if the password is correct", () => {
    // Arrange
    const user = new User("testUser", "correctPassword", 25);
    // Act
    user.login("correctPassword");
    // Assert
    expect(user.loggedIn).toBe(true);
  });

  it("throws an error if the password is incorrect", () => {
    // Arrange
    const user = new User("testUser", "correctPassword", 25);
    // Act &Assert
    expect(() => user.login("wrongPassword")).toThrow("Password is incorrect.");
  });
});

describe("user.logout()", () => {
  it("logs a userout", () => {
    // Arrange
    const user = new User("testUser", "correctPassword", 25);
    user.login("correctPassword"); // Log in the user first

    // Act
    user.logout();
    // Assert
    expect(user.loggedIn).toBe(false);
  });
});
