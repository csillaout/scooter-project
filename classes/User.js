class User {
  //basic init
  constructor(username, password, age) {
    this.username = username;
    this.password = password;
    this.age = age;
    this.loggedIn = false;
  }

  //login
  login(password) {
    if (this.password === password) {
      this.loggedIn = true;
    } else {
      throw new Error("Password is incorrect.");
    }
  }
  //logout
  logout() {
    this.loggedIn = false;
  }
}

module.exports = User;
