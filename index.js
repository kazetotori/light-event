/*!
 * LightEvent v1.0.0
 * Author: Kazetotori/fxqn
 * Date: 2017-08-25
 */


; +function () {
    "use strict";



    /**---------------------------------------------------------------------------------------------------------
     * Define properties.The commonOpt will effect any property defined such as 'writeable:false'.
     * @param { Object } obj           Target object.
     * @param { Object } props         Properties defined.
     * @param { Object } commonOpt     The common options of properties defined.
     * @return { Array }               The target object and the object that used by the function Object.defineProperties.
     */
    function defineProps(obj, props, commonOpt) {
        props = Object.assign({}, props);
        if (Object.prototype.toString.call(commonOpt) == '[object Object]') {
            for (var k in props) {
                var prop = props[k];
                Object.assign(prop, commonOpt);
            }
        }
        Object.defineProperties(obj, props);
        return [obj, props];
    }
    /**---------------------------------------------------------------------------------------------------------*/




    /**---------------------------------------------------------------------------------------------------------
     * Verify a variable is a function or not.
     * @param {any} fn The variable to verify.
     * @return {Boolean} Result.
     */
    function isFunc(fn) {
        return Object.prototype.toString.call(fn) == '[object Function]';
    }
    /**---------------------------------------------------------------------------------------------------------*/




    /**---------------------------------------------------------------------------------------------------------
     * Constructor LightEvent. You can think of it as an eventEmitter that has only one event.
     * Private:
     *     __callbacks__:                     Listener function list.
     *     __waitings__:                      Functions waiting to add or remove from __callbacks__.
     * Public:
     *     add/addListener(callback):         Add listener functions to the emitter.
     *     remove/removeListener(callback):   Remove listener functions from the emitter.
     *     once(callback):                    Add listener functions that only called one time.
     *     emit(...args)                      Emit the event. return the results' array that returned by any listener function.
     *     listeners():                       Get __callbacks__ .
     */
    function LightEvent() {
        defineProps(this, {
            __callbacks__: { value: [] },
            __waitings__: { value: [] }
        }, { configurable: false, writeable: false });
    }


    LightEvent.prototype.add = function (callback) {
        if (arguments.length > 1) {
            for (let i = 0; i < arguments.length; i++) {
                this.add(arguments[i]);
            }
        }
        else if (Array.isArray(callback)) {
            this.add.apply(this, callback);
        }
        else if (isFunc(callback)) {
            this.__waitings__.push({
                fn: callback,
                oprt: 'add'
            });
        }
    }


    LightEvent.prototype.remove = function (callback) {
        if (arguments.length > 1) {
            for (let i = 0; i < arguments.length; i++) {
                this.remove(arguments[i]);
            }
        }
        else if (Array.isArray(callback)) {
            return this.remove.apply(this, callback);
        }
        else if (this.__callbacks__.indexOf(callback) != -1) {
            this.__waitings__.push({
                fn: callback,
                oprt: 'remove'
            });
        }
    }


    LightEvent.prototype.emit = function () {
        let len = this.__waitings__.length;
        let i;
        let result = [];

        for (i = 0; i < len; i++) {
            let waiting = this.__waitings__[i];
            let oprt = waiting.oprt;
            let fn = waiting.fn;

            if (oprt === 'add') {
                this.__callbacks__.push(fn);
            }
            else if (oprt === 'remove') {
                this.__callbacks__.splice(this.__callbacks__.indexOf(fn), 1);
            }
        }
        this.__waitings__.length = 0;

        len = this.__callbacks__.length;
        for (i = 0; i < len; i++) {
            let fn = this.__callbacks__[i];
            result.push(fn.apply(this, arguments));
        }

        return result;
    }


    LightEvent.prototype.once = function (callback) {
        if (arguments.length > 1) {
            for (let i = 0; i < arguments.length; i++) {
                this.once(arguments[i]);
            }
        }
        else if (Array.isArray(callback)) {
            this.once.apply(this, callback);
        }
        else if (isFunc(callback)) {
            let tempFn = function () {
                callback.apply(this, arguments);
                this.remove(tempFn);
            }.bind(this)
            this.add(tempFn);
        }
    }


    LightEvent.prototype.listeners = function () {
        return this.__callbacks__;
    }


    LightEvent.prototype.interface = function () {
        return {
            add: this.add.bind(this),
            remove: this.remove.bind(this),
            once: this.once.bind(this)
        }
    }

    LightEvent.prototype.addListener = LightEvent.prototype.add;
    LightEvent.prototype.removeListener = LightEvent.prototype.remove;
    /**---------------------------------------------------------------------------------------------------------*/



    //out the module

    const _module = LightEvent.LightEvent = LightEvent;
    const libName = 'LightEvent';

    if (typeof define == Function) {
        define(libName, function () { return _module; });
    }
    else if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = _module;
    }
    else if (typeof window != undefined) {
        window[libName] = _module;
    }
}()