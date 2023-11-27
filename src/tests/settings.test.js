import SettingsHelper from '../client/GameEngine/utils/settingsHelper'
import { PawnType } from '../client/GameEngine/gameEnums'

describe('SettingsHelper Class Functionality Tests', () => {
  describe('when retrieving settings for a specific pawn type', () => {
    const submarineType = PawnType.SUBMARINE
    const submarine = SettingsHelper.getPawnByType(submarineType)

    it('should return the correct typeId', () => {
      expect(submarine.typeId).toBe(submarineType)
    })

    it('should return the correct name', () => {
      expect(submarine.name).toBe('Submarine')
    })

    it('should return the correct SVG name', () => {
      expect(submarine.svgName).toBe('submarine.svg')
    })

    it('should return the correct range', () => {
      expect(submarine.range).toBe(2)
    })

    it('should return the correct fleet size', () => {
      expect(submarine.fleetSize).toBe(4)
    })
  })

  describe('when getting pawns that win against a specific type', () => {
    const submarineType = PawnType.SUBMARINE
    const winsAgainstCollection = SettingsHelper.pawnsWinAgainst(submarineType)

    it('should return a collection with the correct length', () => {
      expect(winsAgainstCollection.length).toBe(5)
    })
  })

  describe('when getting pawns that are defeated by a specific type', () => {
    const submarineType = PawnType.SUBMARINE
    const winsAgainstCollection = SettingsHelper.pawnsDefeatedBy(submarineType)

    it('should return a collection with the correct length', () => {
      expect(winsAgainstCollection.length).toBe(7)
    })
  })
})
