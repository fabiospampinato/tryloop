
/* IMPORT */

import Abstract from './abstract';
import type {PartialOptions, IdleOptions} from '../types';

/* MAIN */

class Idle<Options extends IdleOptions, POptions extends PartialOptions<Options>> extends Abstract<Options, POptions> {

  /* API */

  schedule ( fn: Function ): void {

    requestIdleCallback ( () => fn () );

  }

}

/* EXPORT */

export default Idle;
