const t = require("tap");
const { Cancellable } = require("../lib");

t.test("Aborted promise", async (t) => {
  t.plan(1);
  const fn = new Promise((r) => setImmediate(r));

  const { abortController, promise } = Cancellable(fn);
  abortController.abort();

  try {
    await promise;
    t.fail("Should thrown");
  } catch (error) {
    t.pass();
  }
});

t.test("Resolved promise", async (t) => {
  t.plan(1);
  const fn = new Promise((r) => setImmediate(r));

  const { promise } = Cancellable(fn);

  await promise;
  t.pass();
});

t.test("Resolved promise with abortController", async (t) => {
  t.plan(1);
  const fn = new Promise((r) => setImmediate(r));
  const abortController = new AbortController();
  const promise = Cancellable({ promise: fn, abortController });

  await promise;
  t.pass();
});

t.test("Aborted before awaiting", async (t) => {
  t.plan(1);
  const fn = new Promise((r) => setImmediate(r));
  const ac = new AbortController();
  ac.abort("Aborted");

  const promise = Cancellable({ promise: fn, abortController: ac });

  try {
    await promise;
    t.fail("Should thrown");
  } catch (error) {
    t.pass();
  }
});

t.test("Not passing a promise", (t) => {
  t.plan(1);
  try {
    Cancellable({});
    t.fail("Should thrown");
  } catch (error) {
    t.pass();
  }
});
