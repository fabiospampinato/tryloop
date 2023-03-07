# TryLoop

Simple library for retrying operations, it supports multiple backoff strategies.

## Install

```sh
npm install --save tryloop
```

## Usage

You'll have to provide the `options.fn` function, which will be the operation to retry.

- If the function throws, TryLoop will throw.
- If the function returns `undefined`, or a `Promise` which resolves to `undefined`, the operation will be retried.
- If the function returns any other value, or a `Promise` which resolves to any other value, TryLoop will return a `Promise` to that value.
- If the function can't be retried any longer, e.g. maybe the timeout run out or we hit the max retries limit, TryLoop will return `undefined`.

There are multiple backoff/retry strategies implemented, each with its own particular retry logic.

In general you're going to use the library like this:

```ts
import tryloop from 'tryloop';

const instance = tryloop.__strategy_name__ ({
  fn: () => {}, // Operation to retry
  // Other options...
});

const result = await instance.start ();

// instance.stop (); // Stops retrying the operation
// instance.cancel (); // Just an alias for "stop"
```

## Strategies

### Linear

The linear strategy retries the operation after a fixed interval.

These are the accepted options:

```ts
type Options = {
  fn: () => any, // Operation to retry
  timeout: number, // Return undefined after this timeout
  tries: number, // Return undefined after this number of tries
  interval: number // Fixed interval between retries
};
```

You can use it like so:

```ts
import tryloop from 'tryloop';

const instance = tryloop.linear ({
  fn: () => {}, // Operation to retry
  timeout: 10000, // Time out after 10s
  tries: 100, // Not more than 100 tries
  interval: 100 // Wait 100ms between retries
});

const value = await instance.start ();
```

### Idle

The idle strategy retries the operation by calling `requestIdleCallback`.

These are the accepted options:

```ts
type Options = {
  fn: () => any, // Operation to retry
  timeout: number, // Return undefined after this timeout
  tries: number // Return undefined after this number of tries
};
```

You can use it like so:

```ts
import tryloop from 'tryloop';

const instance = tryloop.idle ({
  fn: () => {}, // Operation to retry
  timeout: 10000, // Time out after 10s
  tries: 100 // Not more than 100 tries
});

const value = await instance.start ();
```

### Exponential

The exponential strategy retries the operation with exponentially increasing intervals.

These are the accepted options:

```ts
type Options = {
  fn: () => any, // Operation to retry
  timeout: number, // Return undefined after this timeout
  tries: number, // Return undefined after this number of tries
  factor: number, // Base factor which will be exponentiated after each try
  minInterval: number, // Minimum interval between retries, also starting interval
  maxInterval: number // Maximum interval between retries
};
```

You can use it like so:

```ts
import tryloop from 'tryloop';

const instance = tryloop.exponential ({
  fn: () => {}, // Operation to retry
  timeout: 10000, // Time out after 10s
  tries: 100, // Not more than 100 tries
  factor: 2, // Base factor
  minInterval: 1, // Start with 1ms
  maxInterval: 1000 // No more than 1s between retries
});

const value = await instance.start ();
```

### requestAnimationFrame

The idle strategy retries the operation by calling `requestAnimationFrame`.

These are the accepted options:

```ts
type Options = {
  fn: () => any, // Operation to retry
  timeout: number, // Return undefined after this timeout
  tries: number // Return undefined after this number of tries
};
```

You can use it like so:

```ts
import tryloop from 'tryloop';

const instance = tryloop.raf ({
  fn: () => {}, // Operation to retry
  timeout: 10000, // Time out after 10s
  tries: 100 // Not more than 100 tries
});

const value = await instance.start ();
```

## License

MIT © Fabio Spampinato
