
/* HELPERS */

type PartialExcept<Object, Keys extends keyof Object> = Partial<Object> & {
  [Key in Keys]: Required<Pick<Object, Key>>[Key]
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

/* MAIN */

type FN = () => unknown;

type Result<Options extends PartialOptions<AbstractOptions>> = UnwrapPromise<ReturnType<Options['fn']> | undefined>;

type PartialOptions<Options extends AbstractOptions> = PartialExcept<Options, 'fn'>;

type InferPartialOptions<T extends FN | PartialOptions<AbstractOptions>> = T extends FN ? { fn: T } : T;

type AbstractOptions = {
  fn: FN,
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

export type {FN, Result, PartialOptions, InferPartialOptions, AbstractOptions, ExponentialOptions, IdleOptions, LinearOptions, RAFOptions};
