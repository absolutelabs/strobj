// @TODO: optimize, is hot code
// @TODO: document process a little better
// @TODO: examples

/**
 * Simple is object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

/**
 * Deep merge two objects.
 * @param {object} target
 * @param {object} source
 * @return {object} with properties from target & source
 */
function mergeDeep(target, source) {
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, {[key]: {}})
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, {[key]: source[key]})
      }
    }
  }
  return target
}

class StringToObject {
  /**
   * @param {array} objects
   */
  constructor(objects = []) {
    this.objects = objects
  }

  /**
   * @TODO: would be nice to not have to call a fn + loop inside a loop
   *
   * @param  {String} subpath
   * @param  {object} pathsAsObj
   * @return {object}
   */
  propFromString(subpath, pathsAsObj) {
    if (!subpath.includes('.'))
      return pathsAsObj[subpath]

    let prev
    const subpaths = subpath.split('.')
    for (let i = 0; i < subpaths.length; i++) {
      // subpaths[i] === property
      if (prev)
        prev = prev[subpaths[i]]
      else
        prev = pathsAsObj[subpaths[i]]
    }

    return prev
  }

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
  addStr(path) {
    const pathsAsObj = {}

    if (!path.includes('.')) {
      pathsAsObj[path] = {}
      this.objects.push(pathsAsObj)
      return pathsAsObj
    }

    // optimization could be done here with prev
    const pathsToObj = path.split('.')
    let currentPosition = ''
    let prev = null
    for (let i = 0; i < pathsToObj.length; i++) {
      if (prev) {
        // equals itself, or new obj
        this.propFromString(currentPosition, pathsAsObj)[pathsToObj[i]] = {}

        // @NOTE: made this one line
        currentPosition += '.' + (prev = pathsToObj[i])
      }
      else {
        pathsAsObj[pathsToObj[i]] = {}

        // @NOTE: made this one line
        currentPosition += prev = pathsToObj[i]
      }
    }

    this.objects.push(pathsAsObj)
    return pathsAsObj
  }

  /**
   * @see mergeDeep
   * @return {object} string as object
   */
  getObject() {
    return this.objects.reduce(function(a, b) {
      return mergeDeep(a, b)
    })
  }

  /**
   * resets this.objects
   * @chainable
   */
  reset() {
    this.objects = []
    return this
  }
}

export default {
  StringToObject
}
