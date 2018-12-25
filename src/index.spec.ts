import {expect} from 'chai';
import {createStore} from './index';

describe('State Machine tests', function () {

  describe('basic', function () {
    it('set state #1', function () {
      const store = createStore({});
      store.set({test: 1});

      const result = store.get();
      expect(result).to.deep.equal({test: 1});
    });

    it('set state #2', function () {
      const store = createStore({});
      store.set({test: 1});
      store.set({test: 2});

      const result = store.get();
      expect(result).to.deep.equal({test: 2});
    });

    it('set state #3', function () {
      const store = createStore({});
      store.set({test: 1, value: 1});
      store.set({test: 2});

      const result = store.get();
      expect(result).to.deep.equal({test: 2, value: 1});
    });

    it('set state #4', function () {
      const store = createStore({});
      store.set({test: {value: 1}});
      store.set({test: {value: 2}});

      const result = store.get();
      expect(result).to.deep.equal({test: {value: 2}});
    });

    it('set state #5', function () {
      const store = createStore({});
      store.set({test: {value: 1, items: [1, 2, 3]}});
      store.set({test: {value: 2}});

      const result = store.get();
      expect(result).to.deep.equal({test: {value: 2}});
    });

    it('set state #6', function () {

      const store = createStore({
        test: {},
        data: 'none',
        user: 'empty'
      } as { test?: any, data?: string, user?: string }, {
        update(state, value: any) {
          return {test: {...state.test, ...value}};
        }
      });

      store.set({data: 'test'});
      store.dispatch('update', {value: 1, items: [1, 2, 3]});
      store.set({user: 'anonymous'});
      store.dispatch('update', {value: 2});

      const result = store.get();
      expect(result).to.deep.equal({
        test: {value: 2, items: [1, 2, 3]},
        data: 'test',
        user: 'anonymous'
      });
    });
  });

  describe('actions', function () {
    it('simple actions #1', function () {
      const store = createStore({counter: 1}, {
        inc(state, increment) {
          return {counter: state.counter + increment || 1};
        }
      });

      store.dispatch('inc', 5);
      store.dispatch('inc', 12);

      const result = store.get();
      expect(result).to.deep.equal({counter: 18});
    });
  });

  describe('observe', function () {
    it('subscribe', function () {
      const store = createStore({});

      let counter = 0;

      store.observe(() => {
        counter++;
      });

      store.set({test: {value: 1, items: [1, 2, 3]}});
      store.set({test: {value: 2}});

      expect(counter).to.equal(2);
    });
  });

});
