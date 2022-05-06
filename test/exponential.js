
/* IMPORT */

import {describe} from 'fava';
import tryloop from '../dist/index.js';

/* MAIN */

describe ( 'Exponential', it => {

  it ( 'works', async t => {

    const tl = tryloop.exponential ({
      factor: 2,
      minInterval: 1,
      maxInterval: 2048,
      tries: 11,
      fn: () => {}
    });

    const result = tl.start ();

    t.is ( await result, undefined );
    t.is ( tl.tries, 11 );

    const elapsed = tl.stopTime - tl.startTime;

    t.true ( elapsed >= 4094 && elapsed < 5000 );

  });

});
