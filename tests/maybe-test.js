const { Just, just, None, none, Maybe } = require('../src/maybe.js');
const assert = require('assert');

describe('Maybe Monad laws', () => {
  const f = n => just(n * 2);
  const g = n => just(n + 1);
  const fnone = n => none();
  const gnone = n => none();
  const x = 42

  it('test left identity', () => {
    assert.equal(
      just(x).bind(f).toString(),
      f(x).toString()
    );
    assert.equal(
      none(x).bind(fnone).toString(),
      fnone(x).toString()
    );
  });

  it('test right identity', () => {
    assert.equal(
      just(x).bind(Just.of).toString(),
      just(x).toString()
    );
    assert.equal(
      none(x).bind(None.of).toString(),
      none(x).toString()
    );
  });

  it('test associativity', () => {
    assert.equal(
      just(x).bind(f).bind(g).toString(),
      just(x).bind(x => f(x).bind(g)).toString()
    );
    assert.equal(
      none(x).bind(fnone).bind(gnone).toString(),
      none(x).bind(x => fnone(x).bind(gnone)).toString()
    );
  });
});

describe('Maybe Monad test', () => {
  const isEven = x => x % 2 === 0;
  const validateIsEven = x => isEven(x) ? just(x) : none();
  const evenDigists = x => String(x).length % 2 === 0;
  const validateEvenDigitsNo = x => evenDigists(x) ? just(x) : none();
  const inRange = (s, e) => x => x > s && x < e;
  const valdiateInRange = x => inRange(1, 200)(x) ? just(x) : none();

  // validateNumber :: Int -> Maybe(Int)
  const validateNumber = x => (
    Maybe.of(x)
      .bind(validateIsEven)
      .bind(validateEvenDigitsNo)
      .bind(valdiateInRange)
  )

  // addOneIfValid :: Maybe(Int) -> Maybe(Int)
  const addOneIfValid = x => validateNumber(x).map(x => x + 1);

  it('test valid number', () => {
    assert.equal(
      addOneIfValid(44).toString(),
      'Just(45)'
    );
  });

  it('test invalid number', () => {
    assert.equal(
      addOneIfValid(45).toString(),
      'None'
    );
  });
});
