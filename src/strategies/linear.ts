
/* IMPORT */

import {PartialOptions, LinearOptions} from '../types';
import Abstract from './abstract';

/* LINEAR */

class Linear<Options extends LinearOptions, POptions extends PartialOptions<Options>> extends Abstract<Options, POptions> {

  constructor ( options: POptions ) {

    super ( options );

    this.options = Object.assign ({
      interval: 100
    }, this.options );

  }

  schedule ( fn: Function ): void {

    setTimeout ( () => fn (), this.options.interval );

  }

}

/* EXPORT */

export default Linear;
