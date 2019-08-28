
/* IMPORT */

import {FN, PartialOptions, InferPartialOptions, ExponentialOptions, IdleOptions, LinearOptions, RAFOptions} from './types';
import Exponential from './strategies/exponential';
import Idle from './strategies/idle';
import Linear from './strategies/linear';
import RAF from './strategies/raf';
import Utils from './utils';

/* TRYLOOP */

const tryloop = {
  exponential<T extends FN | PartialOptions<ExponentialOptions>> ( options: T ): Exponential<ExponentialOptions, InferPartialOptions<T>> {
    return new Exponential ( Utils.makeOptions ( options ) );
  },
  idle<T extends FN | PartialOptions<IdleOptions>> ( options: T ): Idle<IdleOptions, InferPartialOptions<T>> {
    return new Idle ( Utils.makeOptions ( options ) );
  },
  linear<T extends FN | PartialOptions<LinearOptions>> ( options: T ): Linear<LinearOptions, InferPartialOptions<T>> {
    return new Linear ( Utils.makeOptions ( options ) );
  },
  raf<T extends FN | PartialOptions<RAFOptions>> ( options: T ): RAF<RAFOptions, InferPartialOptions<T>> {
    return new RAF ( Utils.makeOptions ( options ) );
  }
};

/* EXPORT */

export default tryloop;
