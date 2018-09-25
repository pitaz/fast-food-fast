const mock = {
  newUser: {
    firstname: 'John',
    lastname: 'Doe',
    username: 'Jon',
    email: 'pyro@mail.com',
    address: 's2 east/west road choba, PH',
    password: 'pass123'
  },
  sameEmailUser: {
    firstname: 'Paul',
    lastname: 'Finn',
    username: 'pitaz',
    email: 'pitaz@mail.com',
    address: 's2 east/west road choba, PH',
    password: 'much2pka',
  },
  sameUsernameUser: {
    firstname: 'Paul',
    lastname: 'Finn',
    username: 'pitaz',
    email: 'pitaz@mail.com',
    address: 's2 east/west road choba, PH',
    password: 'much2pka',
  },
  invalidUser: {
    firstname: 'John',
    lastname: 'Doe',
    username: 'Jon',
    email: '',
    address: 's2 east/west road choba, PH',
    password: 'pass1'
  },
  invalidUserID: {
    firstname: 'John',
    lastname: 'Doe',
    username: 'fingerLick kithchen',
    email: 'akpstvgmail.com',
    address: '19 bakuru road, Lagos',
    password: 'uch2pka'
  },
  shortPasswordUser: {
    firstname: 'John',
    lastname: 'Doe',
    username: 'fingerLick kithchen',
    email: 'akpstvgmail.com',
    address: '19 bakuru road, Lagos',
    password: 'mucha'
  },
  emptyUserRequest: {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    address: '',
    password: ''
  },
  userLogin: {
    email: 'pitaz@mail.com',
    password: 'pass123'
  },
  userNotFound: {
    email: 'marads@gmail.com',
    password: 'nuch2pka'
  },
  incorrectUserPassword: {
    email: 'stvakp@gmail.com',
    password: 'bagdkksie'
  },
  invalidUserLogin: {
    email: 'hsdjkwei',
    password: 'rey'
  },
  emptyLogin: {
    email: '',
    password: ''
  },
  createMeal: {
    name: 'Oha soup and pounded yam',
    desc: 'Soup',
    price: '500',
    image: 'http://www.image.com'
  },
  placeOrder: {
    meal: 'Jollof Rice with grilled chicken',
    quantity: '3'
  }
};

export default mock;
