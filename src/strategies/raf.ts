
/* IMPORT */

import {PartialOptions, RAFOptions} from '../types';
import Abstract from './abstract';

/* REQUEST ANIMATION FRAME */

class RAF<Options extends RAFOptions, POptions extends PartialOptions<Options>> extends Abstract<Options, POptions> {

  schedule ( fn: Function ): void {

    requestAnimationFrame ( () => fn () );

  }

}

/* EXPORT */

export default RAF;
