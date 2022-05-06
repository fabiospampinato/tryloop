
/* IMPORT */

import type {FN, PartialOptions, AbstractOptions} from './types';

/* MAIN */

const isFunction = ( value: unknown ): value is Function => {

  return typeof value === 'function';

};

const isPromise = <T = unknown> ( value: unknown ): value is Promise<T> => {

  return value instanceof Promise;

};

const isUndefined = ( value: unknown ): value is undefined => {

  return typeof value === 'undefined';

};

const makeOptions = <T extends PartialOptions<AbstractOptions>> ( options: FN | T ): T | { fn: FN } => {

  if ( isFunction ( options ) ) return { fn: options };

  return options;

};

/* EXPORT */

export {isFunction, isPromise, isUndefined, makeOptions};
