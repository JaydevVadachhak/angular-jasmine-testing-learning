import { fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';
import { delay, of } from 'rxjs';

describe('Async Test Examples', () => {
  it('Asynchronous test example with Jasmine done()', (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      console.log('running assertions');
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it('Asynchronous test example - setTimeout()', fakeAsync(() => {
    let test = false;
    setTimeout(() => {});
    setTimeout(() => {
      console.log('running assertions setTimeout()');
      test = true;
    }, 1000);
    flush();
    tick(1000);
    expect(test).toBeTruthy();
  }));

  it('Asynchronous test example - plain Promise', fakeAsync(() => {
    let test = false;
    console.log('Creating promise');
    Promise.resolve()
      .then(() => {
        console.log('Promise first then() evaluated successfully');
        return Promise.resolve();
      })
      .then(() => {
        console.log('Promise second then() evaluated successfully');
        test = true;
      });
    flushMicrotasks();
    console.log('Running test assertions');
    expect(test).toBeTruthy();
  }));

  it('Asynchronous test example - Observables', fakeAsync(() => {
    let test = false;
    console.log('Creating Observable');
    const test$ = of(test).pipe(delay(1000));
    test$.subscribe(() => {
      test = true;
    });
    tick(1000);
    console.log('Running test assertions');
    expect(test).toBe(true);
  }));
});
