
/* IMPORT */

import {describe} from 'fava';
import {setTimeout as delay} from 'node:timers/promises';
import tryloop from '../dist/index.js';

/* HELPERS */

const makeTryloop = () => {
  return tryloop.linear ({
    fn: async () => {
      await delay ( 1000 );
      return 123;
    }
  });
};

/* MAIN */

describe ( 'Abstract', () => {

  describe ( 'constructor', it => {

    it ( 'initializes the options', t => {

      const tl = makeTryloop ();

      t.is ( tl.options.tries, Infinity );

    });

    it ( 'initializes the state', t => {

      const tl = makeTryloop ();

      t.is ( tl.running, false );
      t.is ( tl.tries, 0 );

    });

    it ( 'support getting passed a function', async t => {

      const tl = tryloop.linear ( () => 123 );
      const value = tl.start ();

      t.is ( await value, 123 );

    });

  });

  describe ( 'start', it => {

    it ( 'starts the loop', async t => {

      const tl = makeTryloop ();
      const result = tl.start ();

      t.is ( tl.running, true );
      t.is ( tl.tries, 1 );
      t.is ( await result, 123 );
      t.is ( tl.running, false );

    });

    it ( 'returns undefined after the timeout', async t => {

      const tl = makeTryloop ();

      tl.options.timeout = 100;

      const result = tl.start ();

      t.is ( await result, undefined );

    });

    it ( 'returns undefined after enough retries', async t => {

      const tl = makeTryloop ();

      tl.options.tries = 0;

      const result = tl.start ();

      t.is ( await result, undefined );

    });

    it ( 'retries if fn returns undefined', async t => {

      const tl = makeTryloop ();

      tl.options.fn = () => {};
      tl.options.tries = 10;

      const result = tl.start ();

      t.is ( await result, undefined );
      t.is ( tl.tries, 10 );

    });

    it ( 'retries if fn returns a promise which resolves to undefined', async t => {

      const tl = makeTryloop ();

      tl.options.fn = () => Promise.resolve ();
      tl.options.tries = 10;

      const result = tl.start ();

      t.is ( await result, undefined );
      t.is ( tl.tries, 10 );

    });

  });

  describe ( 'stop', it => {

    it ( 'stops the loop', async t => {

      const tl = makeTryloop ();
      const result = tl.start ();

      tl.stop ();

      t.is ( tl.running, false );
      t.is ( await result, 123 );

    });

  });

});
