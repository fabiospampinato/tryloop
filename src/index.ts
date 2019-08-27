
/* IMPORT */

import {ExponentialOptions, IdleOptions, LinearOptions, RAFOptions} from './types';
import Exponential from './strategies/exponential';
import Idle from './strategies/idle';
import Linear from './strategies/linear';
import RAF from './strategies/raf';

/* TRYLOOP */

const tryloop = {
  exponential ( options: ExponentialOptions ): Exponential {
    return new Exponential ( options );
  },
  idle ( options: IdleOptions ): Idle {
    return new Idle ( options );
  },
  linear ( options: LinearOptions ): Linear {
    return new Linear ( options );
  },
  raf ( options: RAFOptions ): RAF {
    return new RAF ( options );
  }
};

/* EXPORT */

export default tryloop;
