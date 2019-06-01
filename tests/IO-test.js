const { IO } = require('../src/IO.js');
const assert = require('assert');

xdescribe('IO Monad laws', () => {})

describe('Either Monad test', () => {
  const window = {
    innerWidth: 42,
    location: {
      href: 'https://example.com/example/one'
    }
  };
  
  const prop = k => o => o[k];
  const split = c => s => s.split(c);
  const head = ([x, ...xs]) => x;
  const ioWindow = IO.of(() => window);

  it('test map', () => {
    assert.equal(42, ioWindow.map(win => win.innerWidth).run());
  });

  it('test bind', () => {
    assert.equal(42, ioWindow.bind(win => IO.of(() => win.innerWidth)).run());
  });

  it('test apply', () => {
    assert.equal(2, IO.of(x => x + 1).apply(IO.of(() => 1)).run());
  });

  it('test map chain', () => {
    assert.equal(
      'https:',
      ioWindow
        .map(prop('location'))
        .map(prop('href'))
        .map(split('/'))
        .map(head)
        .run()
    );
  });
});
