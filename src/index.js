
class StringToObject {
  /**
   * @param {array} objects
   */
  constructor(objects = []) {
    this.objects = objects
  }

  /**
   * @param  {String} subpath
   * @param  {object} pathsAsObj
   * @return {object}
   */
  propFromString(subpath, pathsAsObj) {
    if (!subpath.includes('.'))
      return pathsAsObj[subpath]
    let prev
    subpath.split('.').forEach((prop) => {
      if (prev)
        prev = prev[prop]
      else
        prev = pathsAsObj[prop]
    })
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

    const pathsToObj = path.split('.')
    let currentPosition = ''
    let prev = null
    for (let i = 0; i < pathsToObj.length; i++) {
      if (prev) {
        this.propFromString(currentPosition, pathsAsObj)[pathsToObj[i]] = {}
        prev = pathsToObj[i]
        currentPosition += '.' + prev
      }
      else {
        pathsAsObj[pathsToObj[i]] = {}
        prev = pathsToObj[i]
        currentPosition += prev
      }
    }

    this.objects.push(pathsAsObj)
    return pathsAsObj
  }

  /**
   * @return {object} string as object
   */
  getObject() {
    return this.objects.reduce(function(a, b){
      return Object.assign(a, b)
    })
  }

  /**
   * resets this.objects
   */
  reset() {
    this.objects = []
  }
}

export default {
  StringToObject
}
