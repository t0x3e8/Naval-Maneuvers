class Utils {
  /**
   * *
   * Generates a random integer from 0 up to (but not including) a given max.
   * @param {number} max - Upper limit for random number, floored if not an integer.
   * @returns {number} A random integer.
   */
  static getRandom (max) {
    return Math.floor(Math.random() * Math.floor(max))
  }
}

export default Utils
