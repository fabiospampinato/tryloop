
/* IMPORT */

import {RequireAtLeastOne} from 'type-fest';
import {ExponentialOptions} from '../types';
import Abstract from './abstract';

/* EXPONENTIAL */

class Exponential extends Abstract<ExponentialOptions> {

  constructor ( options: RequireAtLeastOne<ExponentialOptions, 'fn'> ) {

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
