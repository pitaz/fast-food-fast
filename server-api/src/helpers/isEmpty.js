/* eslint-disable class-methods-use-this */
class IsEmpty {
  static isEmpty(obj) {
    for (let key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

}

export default IsEmpty;
