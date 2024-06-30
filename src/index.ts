
/* IMPORT */

import {Exponential, Idle, Linear, RAF, Random} from './strategies';
import {makeOptions} from './utils';
import type {FN, PartialOptions, InferPartialOptions, ExponentialOptions, IdleOptions, LinearOptions, RAFOptions, RandomOptions} from './types';

/* MAIN */

const tryloop = {

  /* API */

  exponential: <T extends FN | PartialOptions<ExponentialOptions>> ( options: T ): Exponential<ExponentialOptions, InferPartialOptions<T>> => {

    return new Exponential ( makeOptions ( options ) );

  },

  idle: <T extends FN | PartialOptions<IdleOptions>> ( options: T ): Idle<IdleOptions, InferPartialOptions<T>> => {

    return new Idle ( makeOptions ( options ) );

  },

  linear: <T extends FN | PartialOptions<LinearOptions>> ( options: T ): Linear<LinearOptions, InferPartialOptions<T>> => {

    return new Linear ( makeOptions ( options ) );

  },

  raf: <T extends FN | PartialOptions<RAFOptions>> ( options: T ): RAF<RAFOptions, InferPartialOptions<T>> => {

    return new RAF ( makeOptions ( options ) );

  },

  random: <T extends FN | PartialOptions<RandomOptions>> ( options: T ): Random<RandomOptions, InferPartialOptions<T>> => {

    return new Random ( makeOptions ( options ) );

  }

};

/* EXPORT */

export default tryloop;
export type {ExponentialOptions, IdleOptions, LinearOptions, RAFOptions, RandomOptions};
