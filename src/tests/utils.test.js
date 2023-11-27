import Utils from '../client/GameEngine/utils.js'

describe('Utils Class Functionality Tests', () => {
  describe('Random number generation', () => {
    it('should generate a random number between 0 and a given maximum', () => {
      for (let i = 0; i < 20; i += 1) {
        const result = Utils.getRandom(100)
        expect(result).toBeGreaterThanOrEqual(0)
        expect(result).toBeLessThanOrEqual(100)
      }
    })
  })
})
