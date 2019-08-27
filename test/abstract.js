
/* IMPORT */

import {describe} from 'ava-spec';
import delay from 'promise-resolve-timeout';
import {default as tryloop} from '../dist';

/* ABSTRACT */

describe ( 'Abstract', it => {

  it.beforeEach ( t => {

    t.context.tl = tryloop.linear ({
      fallback: 321,
      fn: async () => {
        await delay ( 1000 );
        return 123;
      }
    });

  });

  describe ( 'constructor', it => {

    it ( 'initializes the options', t => {

      t.is ( t.context.tl.options.tries, Infinity );

    });

    it ( 'initializes the state', t => {

      t.is ( t.context.tl.running, false );
      t.is ( t.context.tl.tries, 0 );

    });

  });

  describe ( 'start', it => {

    it ( 'starts the loop', async t => {

      const result = t.context.tl.start ();

      t.is ( t.context.tl.running, true );
      t.is ( t.context.tl.tries, 1 );
      t.is ( await result, 123 );
      t.is ( t.context.tl.running, false );

    });

    it ( 'falls back after the timeout', async t => {

      t.context.tl.options.timeout = 100;

      const result = t.context.tl.start ();

      t.is ( await result, 321 );

    });

    it ( 'falls back after enough retries', async t => {

      t.context.tl.options.tries = 0;

      const result = t.context.tl.start ();

      t.is ( await result, 321 );

    });

    it.only ( 'retries if fn returns undefined', async t => {

      t.context.tl.options.fn = () => {};
      t.context.tl.options.tries = 10;

      const result = t.context.tl.start ();

      t.is ( await result, 321 );
      t.is ( t.context.tl.tries, 10 );

    });

    it.only ( 'retries if fn returns a promise which resolves to undefined', async t => {

      t.context.tl.options.fn = () => Promise.resolve ();
      t.context.tl.options.tries = 10;

      const result = t.context.tl.start ();

      t.is ( await result, 321 );
      t.is ( t.context.tl.tries, 10 );

    });

  });

  describe ( 'stop', it => {

    it ( 'stops the loop', async t => {

      const result = t.context.tl.start ();

      t.context.tl.stop ();

      t.is ( t.context.tl.running, false );
      t.is ( await result, 123 );

    });

  });

});
