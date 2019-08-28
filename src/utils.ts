
/* IMPORT */

import {FN, PartialOptions, AbstractOptions} from './types';

/* UTILS */

const Utils = {

  makeOptions<T extends PartialOptions<AbstractOptions>> ( options: FN | T ): T | { fn: FN } {

    if ( typeof options === 'function' ) return { fn: options };

    return options;

  }

};

/* EXPORT */

export default Utils;
