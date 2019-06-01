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
  toString() { return `Left(${this.__val})`; }
  getValue() { return this.__val; }
}

const right = x => Right.of(x);
const left = x => Left.of(x);
const Either = (leftFunc, rightFunc, e) => (
  (e instanceof Left) ? leftFunc(e.__val) : rightFunc(e.__val)
)

module.exports = { right, Right, left, Left, Either };
