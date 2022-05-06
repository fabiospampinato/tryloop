
/* IMPORT */

import Abstract from './abstract';
import type {PartialOptions, RAFOptions} from '../types';

/* MAIN */

class RAF<Options extends RAFOptions, POptions extends PartialOptions<Options>> extends Abstract<Options, POptions> {

  /* API */

  schedule ( fn: Function ): void {

    requestAnimationFrame ( () => fn () );

  }

}

/* EXPORT */

export default RAF;
