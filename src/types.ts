
/* TYPES */

type Result<Options extends AbstractOptions> = Promise<ReturnType<Options['fn']> | Options['fallback']>;

type AbstractOptions = {
  fn: () => any,
  fallback: any,
  timeout: number,
  tries: number
};

type ExponentialOptions = AbstractOptions & {
  factor: number,
  minInterval: number,
  maxInterval: number
};

type IdleOptions = AbstractOptions;

type LinearOptions = AbstractOptions & {
  interval: number
};

type RAFOptions = AbstractOptions;

/* EXPORT */

export {Result, AbstractOptions, ExponentialOptions, IdleOptions, LinearOptions, RAFOptions};
