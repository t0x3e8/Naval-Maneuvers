import BoardHelper from '../client/GameEngine/boardHelper.js'
import Pawn from '../client/GameEngine/pawn.js'
import settings from '../client/GameEngine/settings.js'

describe('BoardHelper Class Functionality Tests', () => {
  describe('getAllPawns method', () => {
    it('should return all pawns based on actual settings', () => {
      const pawns = BoardHelper.getAllPawns()
      let expectedTotalPawns = 0

      settings.pawns.forEach(pawnSetting => {
        expectedTotalPawns += pawnSetting.fleetSize
      })

      // Expect the total number of pawns to match the sum of fleetSizes in settings
      expect(pawns).toHaveLength(expectedTotalPawns)

      // Check if pawns are instances of Pawn class
      pawns.forEach(pawn => {
        expect(pawn).toBeInstanceOf(Pawn)
      })

      // Optionally, check for correct distribution of typeId
      settings.pawns.forEach(pawnSetting => {
        expect(pawns.filter(pawn => pawn.type === pawnSetting.typeId)).toHaveLength(pawnSetting.fleetSize)
      })
    })
  })
})
