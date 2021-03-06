/**
* is.js a small es6 type testing toolkit
* for the web and node
* @author github.com/@SaulDoesCode
* @copyright MIT Licence (c) 2016 Saul van der Walt
*/
(function (root) {
    "use strict";
    const slice = (ctx,i) => Array.prototype.slice.call(ctx,i || 0);

    function curry(fn, ctx) {
        const arity = fn.length;
        function curried() {
            const args = slice(arguments);
            return args.length < arity ? function () {
                const more = slice(arguments);
                return curried.apply(null, args.concat(more))
            } : fn.apply(ctx || this, args);
        }
        return curried;
    }
    // tests arguments with Array.prototype.every;
    function ta(test) {
        return (...args) => args.length == 1 ? test : args.length && args.every(test);
    }

    // get the string form of any object
    // then compare it to a given string
    function type(obj, str) {
        return toString.call(obj) === str;
    }

    function len(val) {
        try {
            return is.Object(val) ? Object.keys(val).length : is.Map(val) || is.Set(val) ? val.size : val.length;
        } catch (e) {}
        return -1;
    }

    const def = ta(o => typeof o !== 'undefined'),
        nil = ta(o => o === null),
        RegExps = {
            email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
            timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
            dateString: /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/,
            hexadecimal: /^[0-9a-fA-F]+$/,
            hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
        };

        /**
         * is - Type Testing / Assertion
         * main object with all the methods
         */
        const is = {
          /**
           * Test if something is a boolean type
           * @param val - value to test
           */
            Bool: ta(o => typeof o === 'boolean'),
            /**
             * Test if something is a String
             * @param args - value/values to test
             */
            String: ta(o => typeof o === 'string'),
            /**
             * Test if something is an Array
             * @param args - value/values to test
             */
            Arr: ta(Array.isArray),
            /**
             * Array.isArray alias for convenience and performance when only one argument is present
             * @param {*} val - value to test
             */
            Array: Array.isArray,
            /**
             * Test if something is an Array-Like
             * @param args - value/values to test
             */
            Arraylike: ta(o => {
                try {
                    return def(o.length)
                } catch (e) {}
                return false;
            }),
            /**
             * Determine whether a variable is undefined
             * @param args - value/values to test
             */
            Undef() {
                return !def.apply(this, arguments);
            },
            /**
             * Determine whether a variable is in fact defined
             * @param args - value/values to test
             */
            Def: def,
            /**
             * Determine whether a variable is null
             * @param args - value/values to test
             */
            Null: ta(o => o === null),
            /**
             * Determine whether a variable is a DOM Node
             * @param args - value/values to test
             */
            Node: ta(o => o instanceof Node),
            /**
             * Test an element's tagname
             * @param {Node} element - node to test
             * @param {string} tag - tag to test node for
             */
            Tag: curry((element, tag) => is.Node(element) ? element.tagName === tag.toUpperCase() : false),
            /**
             * Determine whether a variable is a DOM NodeList or Collection of Nodes
             * @param args - value/values to test
             */
            NodeList: ta(nl => nl instanceof NodeList || is.Arraylike(nl) ? ta(n => n instanceof Node).apply(null, nl) : false),
            /**
             * Determine if a variable is a Number
             * @param {...*} args - value/values to test
             */
            Num: ta(o => !isNaN(Number(o))),
            /**
             * Determine if a variable is an Object
             * @param args - value/values to test
             */
            Object: ta(o => toString.call(o) === '[object Object]'),
            /**
             * Determine if a sring is JSON
             * @param args - value/values to test
             */
            Json: ta(str => {
                try {
                    JSON.parse(str);
                    return !0;
                } catch (e) {}
                return !1;
            }),
            /**
             * Determine if a variable is a HTMLElement
             * @param args - value/values to test
             */
            Element: ta(o => type(o, '[object HTMLElement]')),
            /**
             * Determine if a variable is a File Object
             * @param args - value/values to test
             */
            File: ta(o => type(o, '[object File]')),
            /**
             * Determine if a variable is of a FormData type
             * @param args - value/values to test
             */
            FormData: ta(o => type(o, '[object FormData]')),
            /**
             * Determine if a variable is a Map
             * @param args - value/values to test
             */
            Map: ta(o => type(o, '[object Map]')),
            /**
             * Determine if a variable is a function
             * @param args - value/values to test
             */
            Func: ta(o => typeof o === 'function'),
            /**
             * Determine if a variable/s are true
             * @param args - value/values to test
             */
            True: ta(o => o === true),
            /**
             * Determine if a variable/s are false
             * @param args - value/values to test
             */
            False: ta(o => o !== true),
            /**
             * Determine if a variable is of Blob type
             * @param obj - variable to test
             */
            Blob: ta(o => type(o, '[object Blob]')),
            /**
             * Determine if a variable is a Regular Expression
             * @param obj - variable to test
             */
            RegExp: ta(o => type(o, '[object RegExp]')),
            /**
             * Determine if a variable is a Date type
             * @param {...*} variable to test
             */
            Date: ta(o => type(o, '[object Date]')),
            /**
             * Determine if a variable is a Set
             * @param obj - variable to test
             */
            Set: ta(o => type(o, '[object Set]')),
            /**
             * Tests if a value is an arguments object
             * @param {...*} variable to test
             */
            Args: ta(val => !nil(val) && type(val, '[object Arguments]')),
            /**
             * Determine if a variable is a Symbol
             * @param obj - variable to test
             */
            Symbol: ta(obj => type(obj, '[object Symbol]')),
            char: ta(val => is.String(val) && val.length === 1),
            space: val => is.char(val) && (val.charCodeAt(0) > 8 && val.charCodeAt(0) < 14) || val.charCodeAt(0) === 32,
            /**
             * Determine if a String is UPPERCASE
             * @param {string} char - variable to test
             */
            Uppercase: str => is.String(str) && !is.Num(str) && str === str.toUpperCase(),
            /**
             * Determine if a String is LOWERCASE
             * @param {string} char - variable to test
             */
            Lowercase: str => is.String(str) && str === str.toLowerCase(),
            /**
             * Determine if a String contains only characters and numbers (alphanumeric)
             * @param {string} str - variable to test
             */
            Alphanumeric: str => /^[0-9a-zA-Z]+$/.test(str),
            /**
             * Determines whether a String is a valid Email
             * @param {string} email - variable to test
             */
            Email: email => RegExps.email.test(email),
            /**
             * Determines whether a String is a URL
             * @param {string} url - variable to test
             */
            URL(url) {
                try {
                    new URL(url);
                    return true;
                } catch (e) {}
                return false;
            },
            /**
             * Determines whether a String is a HEX-COLOR (#fff123)
             * @param {string} HexColor - variable to test
             */
            HexColor: hexColor => RegExps.hexColor.test(hexColor),
            /**
             * Determines whether a String is hexadecimal
             * @param {string} hexadecimal - variable to test
             */
            hexadecimal: hexadecimal => RegExps.hexadecimal.test(hexadecimal),
            /**
             * checks wether a date is today
             * @param obj - Date to test
             */
            today: obj => is.Date(obj) && obj.toDateString() === new Date().toDateString(),
            /**
             * checks wether a date is yesterday
             * @param obj - Date to test
             */
            yesterday(obj) {
                let now = new Date();
                return is.Date(obj) && obj.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();
            },
            /**
             * checks wether a date is tommorow
             * @param obj - Date to test
             */
            tomorrow(obj) {
                let now = new Date();
                return is.Date(obj) && obj.toDateString() === new Date(now.setDate(now.getDate() + 1)).toDateString();
            },
            /**
             * Determines if a date is in the past
             * @param obj - Date to test
             */
            past(obj) {
                try {
                    if (!is.Date(obj)) obj = is.String(obj) ? new Date(is.Num(obj) ? Number(obj) : obj) : new Date(obj);
                } catch (e) {}
                return is.Date(obj) && obj.getTime() < new Date().getTime();
            },
            /**
             * Determines if a date is in the future
             * @param obj - Date to test
             */
            future: obj => !is.past(obj),
            /**
             * Determines whether a String is a timeString
             * @param time - variable to test
             */
            time: time => RegExps.timeString.test(time),
            /**
             * Determines whether a String is a dateString
             * @param {string} dateString - variable to test
             */
            dateString: dateString => RegExps.dateString.test(dateString),
            /**
             * Determines whether a Number is between a maximum and a minimum
             * @param {Number} val - number value to test
             * @param {Number} max - maximum to compare the value with
             * @param {Number} min - minimum to compare the value with
             * @returns {Boolean} wether or not the value is between the max and min
             */
            Between: curry((val, max, min) => (val <= max && val >= min)),
            /**
             * checks if a number is an integer
             * @param val - variable / value to test
             */
            int: val => is.Num(val) && val % 1 === 0,
            /**
             * checks if a number is an even number
             * @param val - variable / value to test
             */
            even: val => is.Num(val) && val % 2 === 0,
            /**
             * checks if a number is an odd number
             * @param val - variable / value to test
             */
            odd: val => is.Num(val) && val % 2 !== 0,
            /**
             * checks if a number is positive
             * @param val - variable / value to test
             */
            positive: val => is.Num(val) && val > 0,
            /**
             * checks if a number is positive
             * @param val - variable / value to test
             */
            negative: val => is.Num(val) && val < 0,
            neither(value) {
                return slice(arguments, 1).every(value !== val);
            },
            /**
             * Determines if two variables are equal
             * @param a - first value to compare
             * @param b - second value to compare
             */
            eq: curry((a, b) => a === b),
            /**
             * Determines if two variables are equal
             * @param a - first value to compare
             * @param b - second value to compare
             */
            not:curry((o,b) => o !== b),
            /**
             * Determines if a number is LOWER than another
             * @param {Number} val - value to test
             * @param {Number} other - num to test with value
             */
            lt: curry((val, other) => val < other),
            /**
             * Determines if a number is LOWER than or equal to another
             * @param {Number} val - value to test
             * @param {Number} other - num to test with value
             */
            lte: curry((val, other) => val <= other),
            /**
             * Determines if a number is BIGGER than another
             * @param {Number} val - value to test
             * @param {Number} other - num to test with value
             */
            bt: curry((val, other) => val > other),
            /**
             * Determines if a number is BIGGER than or equal to another
             * @param {Number} val - value to test
             * @param {Number} other - num to test with value
             */
            bte: curry((val, other) => val >= other),
            /**
             * Determine if a given collection or string is empty
             * @param {Object|Array|string} val - value to test if empty
             */
            empty: ta(val => len(val) === 0 || val === ''),
            /**
             * Test if something is a Native JavaScript feature
             * @param val - value to test
             */
            Native(val) {
                let type = typeof val;
                return is.Func(val) ? RegExp('^' + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&').replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$').test(Function.prototype.toString.call(val)) : (val && type == 'object' && /^\[object .+?Constructor\]$/.test(val.toString)) || false;
            },
            Input: element => ['INPUT', 'TEXTAREA'].some(i => element.tagName === i),
            curry,
        };

    if (typeof define === 'function' && define.amd) define(['is'], is);
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    else if (typeof module === 'object' && module.exports) module.exports = is;
    // Browser globals (root is window)
    else root.is = is;
})(this);
