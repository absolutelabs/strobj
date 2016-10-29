function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
   * @param  {String} subpath
   * @param  {object} pathsAsObj
   * @return {object}
   */


  StringToObject.prototype.propFromString = function propFromString(subpath, pathsAsObj) {
    if (!subpath.includes('.')) return pathsAsObj[subpath];
    var prev = void 0;
    subpath.split('.').forEach(function (prop) {
      if (prev) prev = prev[prop];else prev = pathsAsObj[prop];
    });
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

    var pathsToObj = path.split('.');
    var currentPosition = '';
    var prev = null;
    for (var i = 0; i < pathsToObj.length; i++) {
      if (prev) {
        this.propFromString(currentPosition, pathsAsObj)[pathsToObj[i]] = {};
        prev = pathsToObj[i];
        currentPosition += '.' + prev;
      } else {
        pathsAsObj[pathsToObj[i]] = {};
        prev = pathsToObj[i];
        currentPosition += prev;
      }
    }

    this.objects.push(pathsAsObj);
    return pathsAsObj;
  };

  /**
   * @return {object} string as object
   */


  StringToObject.prototype.getObject = function getObject() {
    return this.objects.reduce(function (a, b) {
      return Object.assign(a, b);
    });
  };

  /**
   * resets this.objects
   */


  StringToObject.prototype.reset = function reset() {
    this.objects = [];
  };

  return StringToObject;
}();

export default {
  StringToObject: StringToObject
};