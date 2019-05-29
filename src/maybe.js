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

module.exports = { Just, just, None, none, Maybe };
