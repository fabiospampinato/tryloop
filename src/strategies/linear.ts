
/* IMPORT */

import {RequireAtLeastOne} from 'type-fest';
import {LinearOptions} from '../types';
import Abstract from './abstract';

/* LINEAR */

class Linear extends Abstract<LinearOptions> {

  constructor ( options: RequireAtLeastOne<LinearOptions, 'fn'> ) {

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
