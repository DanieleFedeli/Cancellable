const Cancellable = require('.');

const sleep = (ms) => new Promise((res) => setTimeout(() => res(1), ms));

const cancellable = Cancellable(sleep(1000));

setTimeout(() => cancellable.abortController.abort(), 900);
cancellable.promise.then(console.log).catch(console.error);