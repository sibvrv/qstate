"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * State Machine
 */
var StateMachine = /** @class */ (function () {
    function StateMachine(states, actions) {
        if (states === void 0) { states = {}; }
        if (actions === void 0) { actions = {}; }
        this.states = states;
        this.actions = actions;
        this.listeners = [];
    }
    /**
     * Apply a partial state object to the current state, invoking registered listeners.
     * @param state
     */
    StateMachine.prototype.set = function (state) {
        var _this = this;
        this.states = __assign({}, this.states, state);
        this.listeners.forEach(function (l) { return l(_this, state); });
    };
    /**
     * Retrieve the current state object.
     */
    StateMachine.prototype.get = function () {
        return this.states;
    };
    /**
     * Register a listener function to be called whenever state is changed. Returns an `unsubscribe()` function.
     * @param listener
     */
    StateMachine.prototype.observe = function (listener) {
        var _this = this;
        if (this.listeners.indexOf(listener) < 0) {
            this.listeners.push(listener);
        }
        return function () {
            var index = _this.listeners.indexOf(listener);
            if (index >= 0) {
                _this.listeners.splice(index, 1);
            }
        };
    };
    /**
     * Dispatch Event
     * @param actionName
     * @param args
     */
    StateMachine.prototype.dispatch = function (actionName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a;
        if (typeof this.actions[actionName] !== 'function') {
            throw new Error("Missing action: " + actionName);
        }
        this.set((_a = this.actions)[actionName].apply(_a, [this.states].concat(args)) || {});
    };
    return StateMachine;
}());
exports.StateMachine = StateMachine;
/**
 * Creates a new store
 * @param initialState
 * @param actions
 */
exports.createStore = function (initialState, actions) { return new StateMachine(initialState, actions); };
