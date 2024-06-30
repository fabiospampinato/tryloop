
/* IMPORT */

import {describe} from 'fava';
import tryloop from '../dist/index.js';

/* MAIN */

describe ( 'Random', it => {

  it ( 'works', async t => {

    const tl = tryloop.random ({
      minInterval: 10,
      maxInterval: 100,
      tries: 15,
      fn: () => {}
    });

    const result = tl.start ();

    t.is ( await result, undefined );
    t.is ( tl.tries, 15 );

    const elapsed = tl.stopTime - tl.startTime;

    t.true ( elapsed >= 150 && elapsed < 1500 );

  });

});
