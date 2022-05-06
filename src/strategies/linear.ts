
/* IMPORT */

import Abstract from './abstract';
import type {PartialOptions, LinearOptions} from '../types';

/* MAIN */

class Linear<Options extends LinearOptions, POptions extends PartialOptions<Options>> extends Abstract<Options, POptions> {

  /* CONSTRUCTOR */

  constructor ( options: POptions ) {

    super ( options );

    this.options = Object.assign ({
      interval: 100
    }, this.options );

  }

  /* API */

  schedule ( fn: Function ): void {

    setTimeout ( () => fn (), this.options.interval );

  }

}

/* EXPORT */

export default Linear;
