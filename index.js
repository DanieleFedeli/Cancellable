function isPromise(maybePromise) {
  return maybePromise && typeof maybePromise.then === "function";
}

function Cancellable(args) {
  if (isPromise(args)) args = { promise: args };
  if (!isPromise(args.promise))
    throw new Error("The argument passed in is not a promise");
  if (!new.target) {
    return new Cancellable(args);
  }

  this.ac = args.abortController || new AbortController();
  const { signal } = this.ac;

  if(signal.aborted) {
    return Promise.reject(signal.reason)
  }

  const abortedPromise = new Promise(
    (_, rj) => signal.addEventListener("abort", () => rj(signal.reason)),
    { once: true }
  );

  const promise = Promise.race([args.promise, abortedPromise]);

  if (args.abortController) return promise;
  return { abortController: this.ac, promise };
}

module.exports = Cancellable;
module.exports.default = Cancellable;
module.exports.Cancellable = Cancellable;
