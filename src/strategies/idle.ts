
/* IMPORT */

import {PartialOptions, IdleOptions} from '../types';
import Abstract from './abstract';

/* IDLE */

declare const requestIdleCallback: Function; //TSC

class Idle<Options extends IdleOptions, POptions extends PartialOptions<Options>> extends Abstract<Options, POptions> {

  schedule ( fn: Function ): void {

    requestIdleCallback ( () => fn () );

  }

}

/* EXPORT */

export default Idle;
