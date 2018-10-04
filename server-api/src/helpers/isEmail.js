/* eslint-disable class-methods-use-this */
class IsEmail {
  static validateEmail(email) {
    const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]+?/;

    if (re.test(email)) {
      return true;
    }

    return false;
  }
}

export default IsEmail;
