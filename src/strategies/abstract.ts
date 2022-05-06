
/* IMPORT */

import {isPromise, isUndefined} from '../utils';
import type {Result, PartialOptions, AbstractOptions} from '../types';

/* MAIN */

class Abstract<Options extends AbstractOptions, POptions extends PartialOptions<Options>> {

  /* VARIABLES */

  protected options: Options;
  protected result: Promise<Result<POptions>>;
  protected running: boolean = false;
  protected startTime: number = NaN;
  protected stopTime: number = NaN;
  protected tries: number = 0;

  /* CONSTRUCTOR */

  constructor ( options: POptions ) {

    this.options = Object.assign ({
      timeout: Infinity,
      tries: Infinity
    }, options ) as any; //TSC: not sure what to do about the supposed error

    this.options.timeout = Math.min ( 2147483647, this.options.timeout );

  }

  /* API */

  start (): Promise<Result<POptions>> {

    if ( this.running ) return this.result;

    this.running = true;
    this.startTime = Date.now ();
    this.tries = 0;
    this.result = this.loop ();

    return this.result;

  }

  stop (): void {

    if ( !this.running ) return;

    this.running = false;
    this.stopTime = Date.now ();

  }

  cancel (): void {

    return this.stop ();

  }

  loop (): Promise<Result<POptions>> {

    let timeoutId: number | undefined;

    return Promise.race ([
      new Promise<undefined> ( resolve => {
        if ( this.options.timeout === Infinity ) return;
        timeoutId = setTimeout ( () => {
          this.stop ();
          resolve ( undefined );
        }, this.options.timeout );
      }),
      new Promise<Result<POptions>> ( res => {
        const resolve = value => {
          clearTimeout ( timeoutId );
          this.stop ();
          res ( value );
        };
        const retry = () => this.schedule ( attempt );
        const attempt = () => this.try ( resolve, retry );
        attempt ();
      })
    ]);

  }

  try ( resolve: Function, retry: Function ): void {

    if ( !this.running ) return resolve ();

    if ( ( Date.now () - this.startTime ) >= this.options.timeout ) return resolve ();

    if ( this.tries >= this.options.tries ) return resolve ();

    this.tries++;

    const onResult = result => isUndefined ( result ) ? retry () : resolve ( result );
    const result = this.options.fn ();

    if ( isPromise ( result ) ) {

      result.then ( onResult );

    } else {

      onResult ( result );

    }

  }

  schedule ( _: Function ): void {

    throw new Error ( 'Missing schedule function' );

  }

}

/* EXPORT */

export default Abstract;
