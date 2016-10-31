'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// @TODO: optimize, is hot code
// @TODO: document process a little better
// @TODO: examples

/**
 * Simple is object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
  return item && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param {object} target
 * @param {object} source
 * @return {object} with properties from target & source
 */
function mergeDeep(target, source) {
  if (isObject(target) && isObject(source)) {
    for (var key in source) {
      if (isObject(source[key])) {
        var _Object$assign;

        if (!target[key]) Object.assign(target, (_Object$assign = {}, _Object$assign[key] = {}, _Object$assign));
        mergeDeep(target[key], source[key]);
      } else {
        var _Object$assign2;

        Object.assign(target, (_Object$assign2 = {}, _Object$assign2[key] = source[key], _Object$assign2));
      }
    }
  }
  return target;
}

var StringToObject = function () {
  /**
   * @param {array} objects
   */
  function StringToObject() {
    var objects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, StringToObject);

    this.objects = objects;
  }

  /**
   * @TODO: would be nice to not have to call a fn + loop inside a loop
   *
   * @param  {String} subpath
   * @param  {object} pathsAsObj
   * @return {object}
   */


  StringToObject.prototype.propFromString = function propFromString(subpath, pathsAsObj) {
    if (!subpath.includes('.')) return pathsAsObj[subpath];

    var prev = void 0;
    var subpaths = subpath.split('.');
    for (var i = 0; i < subpaths.length; i++) {
      // subpaths[i] === property
      if (prev) prev = prev[subpaths[i]];else prev = pathsAsObj[subpaths[i]];
    }

    return prev;
  };

  /**
   * if the path has a `.`, return as simple object
   * else, split it, loop through it and add it to the {}
   *
   * @example
   * path = 'string.to.obj'
   * returns {
   *   string: {
   *     to: {
   *       obj: {}
   *     }
   *   }
   * }
   *
   * @param  {String} path
   * @return {object}
   */


  StringToObject.prototype.addStr = function addStr(path) {
    var pathsAsObj = {};

    if (!path.includes('.')) {
      pathsAsObj[path] = {};
      this.objects.push(pathsAsObj);
      return pathsAsObj;
    }

    // optimization could be done here with prev
    var pathsToObj = path.split('.');
    var currentPosition = '';
    var prev = null;
    for (var i = 0; i < pathsToObj.length; i++) {
      if (prev) {
        // equals itself, or new obj
        this.propFromString(currentPosition, pathsAsObj)[pathsToObj[i]] = {};

        // @NOTE: made this one line
        currentPosition += '.' + (prev = pathsToObj[i]);
      } else {
        pathsAsObj[pathsToObj[i]] = {};

        // @NOTE: made this one line
        currentPosition += prev = pathsToObj[i];
      }
    }

    this.objects.push(pathsAsObj);
    return pathsAsObj;
  };

  /**
   * @see mergeDeep
   * @return {object} string as object
   */


  StringToObject.prototype.getObject = function getObject() {
    return this.objects.reduce(function (a, b) {
      return mergeDeep(a, b);
    });
  };

  /**
   * resets this.objects
   * @chainable
   */


  StringToObject.prototype.reset = function reset() {
    this.objects = [];
    return this;
  };

  return StringToObject;
}();

exports.default = {
  StringToObject: StringToObject
};
module.exports = exports['default'];