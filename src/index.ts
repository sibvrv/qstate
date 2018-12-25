/**
 * Action Callback Type
 */
type ActionFN<T> = (states: T, ...args: any[]) => any;

/**
 * Actions List
 */
interface StateMachineActions<T> {
  [funcName: string]: ActionFN<T>;
}

/**
 * State Machine
 */
export class StateMachine<States, Actions extends StateMachineActions<States>> {
  listeners: ((states: StateMachine<States, Actions>) => any)[] = [];

  constructor(
    public states: States = {} as States,
    public actions: Actions = {} as Actions
  ) {
  }

  /**
   * Apply a partial state object to the current state, invoking registered listeners.
   * @param state
   */
  set(state: States) {
    this.states = {...this.states, ...state};
    this.listeners.forEach(l => l(this));
  }

  /**
   * Retrieve the current state object.
   */
  get(): States {
    return this.states;
  }

  /**
   * Register a listener function to be called whenever state is changed. Returns an `unsubscribe()` function.
   * @param listener
   */
  observe(listener: (states: StateMachine<States, Actions>) => any) {
    if (this.listeners.indexOf(listener) < 0) {
      this.listeners.push(listener);
    }
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index >= 0) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Dispatch Event
   * @param actionName
   * @param args
   */
  dispatch(actionName: string, ...args: any[]) {
    if (typeof this.actions[actionName] !== 'function') {
      throw new Error(`Missing action: ${actionName}`);
    }
    this.set(this.actions[actionName](this.states, ...args) || {} as States);
  }
}

/**
 * Creates a new store
 * @param initialState
 * @param actions
 */
export const createStore = <InitialState, Actions extends StateMachineActions<InitialState>>(initialState: InitialState, actions?: Actions) => new StateMachine(initialState, actions);
