
/* IMPORT */

import Abstract from './abstract';
import type {PartialOptions, ExponentialOptions} from '../types';

/* MAIN */

class Exponential<Options extends ExponentialOptions, POptions extends PartialOptions<Options>> extends Abstract<Options, POptions> {

  /* CONSTRUCTOR */

  constructor ( options: POptions ) {

    super ( options );

    this.options = Object.assign ({
      factor: 2,
      minInterval: 10,
      maxInterval: 180000
    }, this.options );

  }

  /* API */

  schedule ( fn: Function ): void {

    const interval = Math.max ( this.options.minInterval, Math.min ( this.options.maxInterval, this.options.minInterval * Math.pow ( this.options.factor, this.tries ) ) );

    setTimeout ( () => fn (), interval );

  }

}

/* EXPORT */

export default Exponential;
