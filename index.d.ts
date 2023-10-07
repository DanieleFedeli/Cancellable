type CancellableArgs = { promise: Promise<T>, abortController: AbortController }

export function Cancellable(args: Promise<T>): { abortController: AbortController, promise: TPromise<T> }
export function Cancellable(args: CancellableArgs): CancellableArgs['promise'];
export function Cancellable(args: Promise<T> | CancellableArgs): { abortController: AbortController, promise: TPromise<T> } | CancellableArgs['promise']