
/* IMPORT */

import {Result, AbstractOptions} from '../types';
import {RequireAtLeastOne} from 'type-fest';
import resolveTimeout from 'promise-resolve-timeout';

/* ABSTRACT */

abstract class Abstract<Options extends AbstractOptions> {

  options: Options;

  protected result: Result<Options>;
  protected running: boolean = false;
  protected startTime: number = NaN;
  protected stopTime: number = NaN;
  protected tries: number = 0;

  constructor ( options: RequireAtLeastOne<Options, 'fn'> ) {

    this.options = Object.assign ({
      fallback: undefined,
      timeout: Infinity,
      tries: Infinity
    }, options ) as any; //TSC: not sure what to do about the supposed error

    this.options.timeout = Math.min ( 2147483647, this.options.timeout );

  }

  start (): Result<Options> {

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

  loop (): Result<Options> {

    return Promise.race ([
      resolveTimeout ( this.options.timeout, () => {
        this.stop ();
        return this.options.fallback;
      }),
      new Promise ( res => {
        const resolve = value => {
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

    if ( !this.running ) return resolve ( this.options.fallback );

    if ( ( Date.now () - this.startTime ) >= this.options.timeout ) return resolve ( this.options.fallback );

    if ( this.tries >= this.options.tries ) return resolve ( this.options.fallback );

    this.tries++;

    const onResult = result => ( typeof result === 'undefined' ) ? retry () : resolve ( result ),
          result = this.options.fn ();

    if ( result instanceof Promise ) {

      result.then ( onResult );

    } else {
      onResult ( result );

    }

  }

  abstract schedule ( fn: Function ): void;

}

/* EXPORT */

export default Abstract;
