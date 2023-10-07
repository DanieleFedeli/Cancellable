# Cancellable

Easy way to cancel async work in javascript

## How it works

The usage is pretty strightforward:
```js
const Cancellable = require('cancellable');
// const { Cancellable } = require('cancellable');

const aLongRunningPromise = //

const { promise, abortController } = new Cancellable(aLongRunningPromise);

promise.then(console.log).catch(console.error);

if(someCondition) {
  abortController.abort();
}

```
Is it possibile also to pass an abort controller along with the promise as parameters.
```js
const Cancellable = require('cancellable');
// const { Cancellable } = require('cancellable');

const abortController = new AbortController();
const aLongRunningPromise = //
const args = {promise: aLongRunningPromise, abortController}

// If an abortController is passed, then only the promise is returned
const promise = new Cancellable(aLongRunningPromise);

promise.then(console.log).catch(console.error);

if(someCondition) {
  abortController.abort();
}

```