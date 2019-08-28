
/* IMPORT */

import {PartialOptions, ExponentialOptions} from '../types';
import Abstract from './abstract';

/* EXPONENTIAL */

class Exponential<Options extends ExponentialOptions, POptions extends PartialOptions<Options>> extends Abstract<Options, POptions> {

  constructor ( options: POptions ) {

    super ( options );

    this.options = Object.assign ({
      factor: 2,
      minInterval: 10,
      maxInterval: 180000
    }, this.options );

  }

  schedule ( fn: Function ): void {

    const interval = Math.max ( this.options.minInterval, Math.min ( this.options.maxInterval, this.options.minInterval * Math.pow ( this.options.factor, this.tries ) ) );

    setTimeout ( () => fn (), interval );

  }

}

/* EXPORT */

export default Exponential;
