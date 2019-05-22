class Right {
  constructor(val) { this.__val = val; }
  map(fn) { return new Right(fn(this.__val)); }
  bind(fn) { return fn(this.__val); }
  apply(e) { return this.map(e.getValue()) }
  static of(val) { return new Right(val); }
  toString() { return `Right(${this.__val})`; }
  getValue() { return this.__val; }
}

class Left {
  constructor(val) { this.__val = val; }
  map(fn) { return this; }
  bind(fn) { return this; }
  apply() { return this; }
  static of(val) { return new Left(val); }
  toString() { return `Left(${val})`; }
  getValue() { return this.__val; }
}

const right = x => Right.of(x);
const left = x => Left.of(x);
const Either = (leftFunc, rightFunc, e) => (
  (e instanceof Left) ? leftFunc(e.__val) : rightFunc(e.__val)
)

// TODO: write proper tests and move to separate module

const getUserId = ({ id = null}) => id;
const getUserName = ({ name = null }) => name;
const getUserAge  = ({ age = null }) => age;

const registeredUserIds = [1, 2, 3, 4];
const isUserIdRegistered = registry => id => registry.includes(id);
const validUserNames = ['a', 'b', 'c', 'd'];
const isUserNameValid = names => name => names.includes(name);
const isValidAge = age => age > 30;

const validateId = user => (
  isUserIdRegistered(registeredUserIds)(getUserId(user))
    ? right(user)
    : left(['invalid user id'])
);

const validateName = user => (
  isUserNameValid(validUserNames)(getUserName(user))
    ? right(user)
    : left(['invalid user name'])
);

const validateAge = user => (
  isValidAge(getUserAge(user))
    ? right(user)
    : left(['invalid user age'])
);

const validateUser = user => right(user).bind(validateId).bind(validateName).bind(validateAge);

const invalidUserId = validateUser({ id: 100, name: 'a', age: 42 });
const invalidUserName = validateUser({ id: 1, name: 'x', age: 42 });
const invalidUserAge = validateUser({ id: 1, name: 'a', age: 0 });
const validUser = validateUser({ id: 1, name: 'a', age: 42 });

const doAction = e => Either(console.error, console.log, e);

[invalidUserId, invalidUserName, invalidUserAge, validUser].forEach(doAction);
doAction(right(2).apply(right(x => x + 40)))
