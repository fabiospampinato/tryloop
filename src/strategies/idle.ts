
/* IMPORT */

import {IdleOptions} from '../types';
import Abstract from './abstract';

/* IDLE */

declare const requestIdleCallback: Function; //TSC

class Idle extends Abstract<IdleOptions> {

  schedule ( fn: Function ): void {

    requestIdleCallback ( () => fn () );

  }

}

/* EXPORT */

export default Idle;
