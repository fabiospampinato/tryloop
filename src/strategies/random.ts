
/* IMPORT */

import Abstract from './abstract';
import type {PartialOptions, RandomOptions} from '../types';

/* MAIN */

class Random<Options extends RandomOptions, POptions extends PartialOptions<Options>> extends Abstract<Options, POptions> {

  /* CONSTRUCTOR */

  constructor ( options: POptions ) {

    super ( options );

    this.options = Object.assign ({
      minInterval: 0,
      maxInterval: 1000
    }, this.options );

  }

  /* API */

  schedule ( fn: Function ): void {

    const {minInterval, maxInterval} = this.options;
    const interval = Math.round ( minInterval + ( ( maxInterval - minInterval ) * Math.random () ) );

    setTimeout ( () => fn (), interval );

  }

}

/* EXPORT */

export default Random;
