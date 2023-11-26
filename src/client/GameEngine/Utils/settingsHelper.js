/* eslint-disable no-magic-numbers */
import settings from './../settings.js'
import _ from 'underscore'

class SettingsHelper {
  /**
   * The method returns a collection of pawns that dominate / win against the pawn indicated by the argument
   * @param {*} pawnType Specifies pawn type id
   * @returns {Pawn[]} The collection of Winning pawns
   */
  static pawnsWinAgainst (pawnType) {
    const pawnsCollection = []
    const pawn = SettingsHelper.getPawnByType(pawnType)

    _.forEach(pawn.destroyed, (winningPawnType) => {
      pawnsCollection.push(SettingsHelper.getPawnByType(winningPawnType))
    })

    return pawnsCollection
  }

  /**
   * The method returns a collection of pawns that are defeated by the pawn indicated by the argument
   * @param {*} pawnType Specifies pawn type id
   * @returns {Pawn[]} The collection of Winning pawns
   */
  static pawnsDefeatedBy (pawnType) {
    const pawnsCollection = []
    const pawn = SettingsHelper.getPawnByType(pawnType)

    _.forEach(pawn.destroys, (defeatedPawnType) => {
      pawnsCollection.push(SettingsHelper.getPawnByType(defeatedPawnType))
    })

    return pawnsCollection
  }

  static getPawnByType (pawnType) {
    const pawnsMap = settings.pawns

    return _.find(pawnsMap, (pawnMap) => pawnMap.typeId === pawnType)
  }
}

export default SettingsHelper
