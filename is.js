/**
 * is.js a small es6 type testing toolkit
 * for the web and node
 * @author github.com/@SaulDoesCode
 * @copyright MIT Licence (c) Saul van der Walt - 2016
 */
(function(root) {
  "use strict";
  var slice = Array.prototype.slice.call;

  function curry(fn, ctx) {
    var arity = fn.length;

    function curried() {
      var args = slice(arguments);
      return args.length < arity ? function() {
        var more = slice(arguments);
        return curried.apply(null, args.concat(more));
      } : fn.apply(ctx || this, args);
    }
    return curried;
  } // tests arguments with Array.prototype.every;
  function ta(test) {
    return function() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return args.length == 1 ? test(args[0]) : curry(function() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        return args.length && args.every(test);
      });
    };
  } // get the string form of any object
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
  var def = ta(function(o) {
      return typeof o !== 'undefined';
    }),
    nil = ta(function(o) {
      return o === null;
    }),
    RegExps = {
      email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
      timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
      dateString: /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/,
      hexadecimal: /^[0-9a-fA-F]+$/,
      hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
    },
    /** is - Type Testing / Assertion */ is = {
      /**
       * Test if something is a boolean type
       * @param val - value to test
       */
      Bool: ta(function(o) {
        return typeof o === 'boolean';
      }),
      /**
       * Test if something is a String
       * @param args - value/values to test
       */
      String: ta(function(o) {
        return typeof o === 'string';
      }),
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
      Arraylike: ta(function(o) {
        try {
          return def(o.length);
        } catch (e) {}
        return false;
      }),
      /**
       * Determine whether a variable is undefined
       * @param args - value/values to test
       */
      Undef: function() {
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
      Null: ta(function(o) {
        return o === null;
      }),
      /**
       * Determine whether a variable is a DOM Node
       * @param args - value/values to test
       */
      Node: ta(function(o) {
        return o instanceof Node;
      }),
      /**
       * Test an element's tagname
       * @param {Node} element - node to test
       * @param {string} tag - tag to test node for
       */
      Tag: function(element, tag) {
        return is.Node(element) ? element.tagName === tag.toUpperCase() : false;
      },
      /**
       * Determine whether a variable is a DOM NodeList or Collection of Nodes
       * @param args - value/values to test
       */
      NodeList: ta(function(nl) {
        return nl instanceof NodeList || is.Arraylike(nl) ? ta(function(n) {
          return n instanceof Node;
        }).apply(null, nl) : false;
      }),
      /**
       * Determine if a variable is a Number
       * @param {...*} args - value/values to test
       */
      Num: ta(function(o) {
        return !isNaN(Number(o));
      }),
      /**
       * Determine if a variable is an Object
       * @param args - value/values to test
       */
      Object: ta(function(o) {
        return toString.call(o) === '[object Object]';
      }),
      /**
       * Determine if a sring is JSON
       * @param args - value/values to test
       */
      Json: ta(function(str) {
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
      Element: ta(function(o) {
        return type(o, '[object HTMLElement]');
      }),
      /**
       * Determine if a variable is a File Object
       * @param args - value/values to test
       */
      File: ta(function(o) {
        return type(o, '[object File]');
      }),
      /**
       * Determine if a variable is of a FormData type
       * @param args - value/values to test
       */
      FormData: ta(function(o) {
        return type(o, '[object FormData]');
      }),
      /**
       * Determine if a variable is a Map
       * @param args - value/values to test
       */
      Map: ta(function(o) {
        return type(o, '[object Map]');
      }),
      /**
       * Determine if a variable is a function
       * @param args - value/values to test
       */
      Func: ta(function(o) {
        return typeof o === 'function';
      }),
      /**
       * Determine if a variable/s are true
       * @param args - value/values to test
       */
      True: ta(function(o) {
        return o === true;
      }),
      /**
       * Determine if a variable/s are false
       * @param args - value/values to test
       */
      False: ta(function(o) {
        return o !== true;
      }),
      /**
       * Determine if a variable is of Blob type
       * @param obj - variable to test
       */
      Blob: ta(function(o) {
        return type(o, '[object Blob]');
      }),
      /**
       * Determine if a variable is a Regular Expression
       * @param obj - variable to test
       */
      RegExp: ta(function(o) {
        return type(o, '[object RegExp]');
      }),
      /**
       * Determine if a variable is a Date type
       * @param {...*} variable to test
       */
      Date: ta(function(o) {
        return type(o, '[object Date]');
      }),
      /**
       * Determine if a variable is a Set
       * @param obj - variable to test
       */
      Set: ta(function(o) {
        return type(o, '[object Set]');
      }),
      /**
       * Tests if a value is an arguments object
       * @param {...*} variable to test
       */
      Args: ta(function(val) {
        return !nil(val) && type(val, '[object Arguments]');
      }),
      /**
       * Determine if a variable is a Symbol
       * @param obj - variable to test
       */
      Symbol: ta(function(obj) {
        return type(obj, '[object Symbol]');
      }),
      char: ta(function(val) {
        return is.String(val) && val.length === 1;
      }),
      space: function(val) {
        return is.char(val) && val.charCodeAt(0) > 8 && val.charCodeAt(0) < 14 || val.charCodeAt(0) === 32;
      },
      /**
       * Determine if a String is UPPERCASE
       * @param {string} char - variable to test
       */
      Uppercase: function(str) {
        return is.String(str) && !is.Num(str) && str === str.toUpperCase();
      },
      /**
       * Determine if a String is LOWERCASE
       * @param {string} char - variable to test
       */
      Lowercase: function(str) {
        return is.String(str) && str === str.toLowerCase();
      },
      /**
       * Determine if a String contains only characters and numbers (alphanumeric)
       * @param {string} str - variable to test
       */
      Alphanumeric: function(str) {
        return (/^[0-9a-zA-Z]+$/.test(str));
      },
      /**
       * Determines whether a String is a valid Email
       * @param {string} email - variable to test
       */
      Email: function(email) {
        return RegExps.email.test(email);
      },
      /**
       * Determines whether a String is a URL
       * @param {string} url - variable to test
       */
      URL: function(url) {
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
      HexColor: function(hexColor) {
        return RegExps.hexColor.test(hexColor);
      },
      /**
       * Determines whether a String is hexadecimal
       * @param {string} hexadecimal - variable to test
       */
      hexadecimal: function(hexadecimal) {
        return RegExps.hexadecimal.test(hexadecimal);
      },
      /**
       * checks wether a date is today
       * @param obj - Date to test
       */
      today: function(obj) {
        return is.Date(obj) && obj.toDateString() === new Date().toDateString();
      },
      /**
       * checks wether a date is yesterday
       * @param obj - Date to test
       */
      yesterday: function(obj) {
        var now = new Date();
        return is.Date(obj) && obj.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();
      },
      /**
       * checks wether a date is tommorow
       * @param obj - Date to test
       */
      tomorrow: function(obj) {
        var now = new Date();
        return is.Date(obj) && obj.toDateString() === new Date(now.setDate(now.getDate() + 1)).toDateString();
      },
      /**
       * Determines if a date is in the past
       * @param obj - Date to test
       */
      past: function(obj) {
        try {
          if (!is.Date(obj)) obj = is.String(obj) ? new Date(is.Num(obj) ? Number(obj) : obj) : new Date(obj);
        } catch (e) {}
        return is.Date(obj) && obj.getTime() < new Date().getTime();
      },
      /**
       * Determines if a date is in the future
       * @param obj - Date to test
       */
      future: function(obj) {
        return !is.past(obj);
      },
      /**
       * Determines whether a String is a timeString
       * @param time - variable to test
       */
      time: function(time) {
        return RegExps.timeString.test(time);
      },
      /**
       * Determines whether a String is a dateString
       * @param {string} dateString - variable to test
       */
      dateString: function(dateString) {
        return RegExps.dateString.test(dateString);
      },
      /**
       * Determines whether a Number is between a maximum and a minimum
       * @param {Number} val - number value to test
       * @param {Number} max - maximum to compare the value with
       * @param {Number} min - minimum to compare the value with
       * @returns {Boolean} wether or not the value is between the max and min
       */
      Between: function(val, max, min) {
        return val <= max && val >= min;
      },
      /**
       * checks if a number is an integer
       * @param val - variable / value to test
       */
      int: function(val) {
        return is.Num(val) && val % 1 === 0;
      },
      /**
       * checks if a number is an even number
       * @param val - variable / value to test
       */
      even: function(val) {
        return is.Num(val) && val % 2 === 0;
      },
      /**
       * checks if a number is an odd number
       * @param val - variable / value to test
       */
      odd: function(val) {
        return is.Num(val) && val % 2 !== 0;
      },
      /**
       * checks if a number is positive
       * @param val - variable / value to test
       */
      positive: function(val) {
        return is.Num(val) && val > 0;
      },
      /**
       * checks if a number is positive
       * @param val - variable / value to test
       */
      negative: function(val) {
        return is.Num(val) && val < 0;
      },
      neither: function(value) {
        return slice(arguments, 1).every(value !== val);
      },
      /**
       * Determines if two variables are equal
       * @param a - first value to compare
       * @param b - second value to compare
       */
      eq: ta(function(a, b) {
        return a === b;
      }),
      /**
       * Determines if two variables are equal
       * @param a - first value to compare
       * @param b - second value to compare
       */
      not: ta(function(o, b) {
        return o !== b;
      }),
      /**
       * Determines if a number is LOWER than another
       * @param {Number} val - value to test
       * @param {Number} other - num to test with value
       */
      lt: ta(function(val, other) {
        return val < other;
      }),
      /**
       * Determines if a number is LOWER than or equal to another
       * @param {Number} val - value to test
       * @param {Number} other - num to test with value
       */
      lte: function(val, other) {
        return val <= other;
      },
      /**
       * Determines if a number is BIGGER than another
       * @param {Number} val - value to test
       * @param {Number} other - num to test with value
       */
      bt: function(val, other) {
        return val > other;
      },
      /**
       * Determines if a number is BIGGER than or equal to another
       * @param {Number} val - value to test
       * @param {Number} other - num to test with value
       */
      bte: function(val, other) {
        return val >= other;
      },
      /**
       * Determine if a given collection or string is empty
       * @param {Object|Array|string} val - value to test if empty
       */
      empty: ta(function(val) {
        return len(val) === 0 || val === '';
      }),
      /**
       * Test if something is a Native JavaScript feature
       * @param val - value to test
       */
      Native: function(val) {
        var type = typeof val;
        return is.Func(val) ? RegExp('^' + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&').replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$').test(Function.prototype.toString.call(val)) : val && type == 'object' && /^\[object .+?Constructor\]$/.test(val.toString) || false;
      },
      Input: function(element) {
        return ['INPUT', 'TEXTAREA'].some(function(i) {
          return element.tagName === i;
        });
      }
    };
  if (typeof define === 'function' && define.amd) define(['is'], is); // Node. Does not work with strict CommonJS, but
  // only CommonJS-like environments that support module.exports,
  // like Node.
  else if (typeof module === 'object' && module.exports) module.exports = is; // Browser globals (root is window)
  else root.is = is;
})(this);