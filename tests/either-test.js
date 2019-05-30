const { right, left, Either } = require('../src/either.js');
const assert = require('assert');

xdescribe('Either Monad laws', () => {})

describe('Either Monad test', () => {
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

  const onError = err => ['error', err];
  const onSuccess = res => ['success', res];

  const doAction = e => Either(onError, onSuccess, e);

  it('test user with invalid id', () => {
    assert.deepEqual(
      ['error', ['invalid user id']],
      doAction(invalidUserId)
    );
  })

  it('test user with invalid name', () => {
    assert.deepEqual(
      ['error', ['invalid user name']],
      doAction(invalidUserName)
    );
  })

  it('test user with invalid age', () => {
    assert.deepEqual(
      ['error', ['invalid user age']],
      doAction(invalidUserAge)
    );
  })

  it('test user with valid user', () => {
    assert.deepEqual(
      ['success', { age: 42, id: 1, name: 'a' }],
      doAction(validUser)
    );
  })

  it('test apply function', () => {
    assert.deepEqual(
      ['success', 42],
      doAction(right(2).apply(right(x => x + 40)))
    );
  })
});
