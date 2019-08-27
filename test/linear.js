
/* IMPORT */

import {describe} from 'ava-spec';
import {default as tryloop} from '../dist';

/* LINEAR */

describe ( 'Linear', it => {

  it ( 'works', async t => {

    const tl = tryloop.linear ({
      interval: 10,
      tries: 50,
      fn: () => {}
    });

    const result = tl.start ();

    t.is ( await result, undefined );
    t.is ( tl.tries, 50 );

    const elapsed = tl.stopTime - tl.startTime;

    t.true ( elapsed >= 500 && elapsed < 1000 );

  });

});
