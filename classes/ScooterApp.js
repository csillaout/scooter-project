const Scooter = require("./Scooter.js");
const User = require("./User.js");

class ScooterApp {
  constructor() {
    this.stations = {
      Central: [],
      East: [],
      West: [],
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (this.registeredUsers[username] || age < 18) {
      throw new Error("User already registered or too young to register.");
    }
    const user = new User(username, password, age);
    this.registeredUsers[username] = user;
    console.log("User registered.");
    return user;
  }

  loginUser(username, password) {
    const user = this.registeredUsers[username];
    if (!user) {
      throw new Error("Username is incorrect.");
    }
    user.login(password);
  }

  logoutUser(username) {
    const user = this.registeredUsers[username];
    if (!user) {
      throw new Error("No such user is logged in.");
    }
    user.logout();
  }

  createScooter(station) {
    if (!this.stations[station]) {
      throw new Error("No such station.");
    }
    const scooter = new Scooter(station);
    this.stations[station].push(scooter);
    console.log("Created new scooter.");
    return scooter;
  }

  dockScooter(scooter, station) {
    if (!this.stations[station]) {
      throw new Error("No such station.");
    }
    if (scooter.station === station) {
      throw new Error("Scooter already at station.");
    }
    scooter.dock(station);
    this.stations[station].push(scooter);
  }

  rentScooter(scooter, user) {
    if (scooter.user) {
      throw new Error("Scooter already rented.");
    }
    scooter.rent(user);
    for (const station in this.stations) {
      const index = this.stations[station].indexOf(scooter);
      if (index !== -1) {
        this.stations[station].splice(index, 1);
        break;
      }
    }
  }

  print() {
    console.log("Registered Users:");
    console.log(this.registeredUsers);
    console.log("Stations:");
    for (const [station, scooters] of Object.entries(this.stations)) {
      console.log(`${station}: ${scooters.length} scooters`);
    }
  }
}

module.exports = ScooterApp;
