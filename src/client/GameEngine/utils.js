class Utils {
  static getRandom (max) {
    const max1 = Math.floor(max)

    return Math.floor(Math.random() * max1)
  }
}

export default Utils
