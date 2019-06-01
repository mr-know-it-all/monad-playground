// const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

class IO {
  constructor(fn) { this.__val = fn; }
  run() { return typeof this.__val === 'function' ? this.__val() : this.__val; }
  map(fn) { return new IO(compose(fn, this.__val)); }
  bind(fn) { return compose(fn, this.__val)(); }
  apply(otherIO) { return otherIO.map(this.__val); }
  static of(x) { return new IO(x); }
}

module.exports = { IO };
