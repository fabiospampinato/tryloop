
/* IMPORT */

import {RAFOptions} from '../types';
import Abstract from './abstract';

/* REQUEST ANIMATION FRAME */

class RAF extends Abstract<RAFOptions> {

  schedule ( fn: Function ): void {

    requestAnimationFrame ( () => fn () );

  }

}

/* EXPORT */

export default RAF;
