declare type ActionFN<T> = (states: T, ...args: any[]) => any;
interface StateMachineActions<T> {
    [funcName: string]: ActionFN<T>;
}
/**
 * State Machine
 */
export declare class StateMachine<States, Actions extends StateMachineActions<States>> {
    states: States;
    actions: Actions;
    listeners: ((states: StateMachine<States, Actions>) => any)[];
    constructor(states?: States, actions?: Actions);
    /**
     * Apply a partial state object to the current state, invoking registered listeners.
     * @param state
     */
    set(state: States): void;
    /**
     * Retrieve the current state object.
     */
    get(): States;
    /**
     * Register a listener function to be called whenever state is changed. Returns an `unsubscribe()` function.
     * @param listener
     */
    observe(listener: (states: StateMachine<States, Actions>) => any): () => void;
    dispatch(actionName: string, ...args: any[]): void;
}
/**
 * Creates a new store
 * @param initialState
 * @param actions
 */
export declare const createStore: <InitialState, Actions extends StateMachineActions<InitialState>>(initialState: InitialState, actions?: Actions | undefined) => StateMachine<InitialState, Actions>;
export {};
