class Just {
  constructor(val) { this.__val = val; }
  map(fn) { return new Just(fn(this.__val)); }
  bind(fn) { return fn(this.__val); }
  static of(val) { return new Just(val); }
  toString() { return `Just(${this.__val})`; }
}

class None {
  constructor() {}
  map(fn) { return this; }
  bind(fn) { return this; }
  static of() { return new None(); }
  toString() { return `None`; }
}

const just = x => Just.of(x);
const none = x => None.of(x);
const Maybe = {
  just,
  none,
  of: x => x !== null && x !== undefined && !Number.isNaN(x) ? just(x) : none()
};

// TODO: write proper tests and move to separate module

const f = n => just(n * 2);
const g = n => just(n + 1);
const fnone = n => none();
const gnone = n => none();
const x = 42

// left indetity
const leftIdentity = { just: null, none: null }
leftIdentity.just = just(x).bind(f).toString() === f(x).toString()
leftIdentity.none = none(x).bind(fnone).toString() === fnone(x).toString()

// right identity
const rightIdentity = { just: null, none: null }
rightIdentity.just = just(x).bind(Just.of).toString() === just(x).toString()
rightIdentity.none = none(x).bind(Just.of).toString() === none(x).toString()

// associativity
const associativity = { just: null, none: null}
associativity.just = (
  just(x).bind(f).bind(g).toString() ===
  just(x).bind(x => f(x).bind(g)).toString()
);

associativity.none = (
  none(x).bind(fnone).bind(gnone).toString() ===
  none(x).bind(x => fnone(x).bind(gnone)).toString()
);

console.table('left identity:')
console.table(leftIdentity)

console.table('right identity:')
console.table(rightIdentity)

console.table('associativity:')
console.table(associativity)

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
console.log('valid number: ', addOneIfValid(44).toString() === 'Just(45)')
console.log('invalid number: ', addOneIfValid(45).toString() === 'None')
