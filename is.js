  "use strict";
(() => {
    let type = (obj, str) => toString.call(obj) === str,
    isT = (val, str) => typeof val === str,
    nT = (val, str) => !isT(val, str);

  self.is = {
    Bool: val => typeof val === 'boolean',
    Arr: val => Array.isArray(val),
    Arraylike: val => {
      if ('length' in val && isT(val.length, 'number')) return true;
      return false;
    },
    String: val => isT(val, 'string'),
    Num: val => isT(val, 'number'),
    Undef: (...args) => args.every(o => isT(o, 'undefined')),
    Def: (...args) => args.every(o => nT(o, 'undefined')),
    Null: (...args) => args.every(o => o === null),
    Node: (...args) => args.every(o => o instanceof Node),
    NodeList: (...args) => {
      for (let i = 0; i < args.length; i++)
        if (Array.from(args[i]).every(n => is.Node(n))) return true;
      return false;
    },
    Object: (...args) => args.every(o => type(o, '[object Object]')),
    Element: (...args) => args.every(o => type(o, '[object HTMLElement]')),
    File: (...args) => args.every(o => type(o, '[object File]')),
    FormData: (...args) => args.every(o => type(o, '[object FormData]')),
    Map: (...args) => args.every(o => type(o, '[object Map]')),
    Func: (...args) => args.every(o => typeof o === 'function'),
    Blob: obj => type(obj, '[object Blob]'),
    RegExp: obj => type(obj, '[object RegExp]'),
    Date: obj => type(obj, '[object Date]'),
    Set: obj => type(obj, '[object Set]'),
    Symbol: obj => type(obj, '[object Symbol]'),
    UpperCase: char => (char >= 'A') && (char <= 'Z'),
    Email: email => /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(email),
    Between: (val, max, min) => (val <= max && val >= min),
    lt: (val, other) => val < other,
    lte: (val, other) => val <= other,
    bt: (val, other) => val > other,
    bte: (val, other) => val >= other,
    Native: val => {
      let type = typeof val;
      return type === 'function' ? RegExp('^' + String(Object.prototype.toString).replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&').replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$').test(Function.prototype.toString.call(val)) : (val && type == 'object' && /^\[object .+?Constructor\]$/.test(val.toString)) || false;
    },
  }
})();
