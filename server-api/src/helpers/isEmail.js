/* eslint-disable class-methods-use-this */
class IsEmail {
  static validateEmail(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // return re.test(email);

    if (re.test(email)) {
      return true;
    }

    return false;
  }
}

export default IsEmail;
