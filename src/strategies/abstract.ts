
/* IMPORT */

import {Result, PartialOptions, AbstractOptions} from '../types';

/* ABSTRACT */

abstract class Abstract<Options extends AbstractOptions, POptions extends PartialOptions<Options>> {

  options: Options;

  protected result: Promise<Result<POptions>>;
  protected running: boolean = false;
  protected startTime: number = NaN;
  protected stopTime: number = NaN;
  protected tries: number = 0;

  constructor ( options: POptions ) {

    this.options = Object.assign ({
      timeout: Infinity,
      tries: Infinity
    }, options ) as any; //TSC: not sure what to do about the supposed error

    this.options.timeout = Math.min ( 2147483647, this.options.timeout );

  }

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

    return Promise.race ([
      new Promise<undefined> ( resolve => {
        if ( this.options.timeout === Infinity ) return;
        setTimeout ( () => {
          this.stop ();
          resolve ( undefined );
        }, this.options.timeout );
      }),
      new Promise<Result<POptions>> ( res => {
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

    if ( !this.running ) return resolve ();

    if ( ( Date.now () - this.startTime ) >= this.options.timeout ) return resolve ();

    if ( this.tries >= this.options.tries ) return resolve ();

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
