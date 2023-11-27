import settings from './settings.js'
import { forEach } from 'underscore'
import Pawn from './pawn.js'

class BoardHelper {
  /**
   * The method returns all player pawns available at the beginning of the game.
   * The collection of pawns is generated on settings.
   * @returns {Pawn[]} The collection of all pawns
   */
  static getAllPawns () {
    const pawnsMap = settings.pawns
    const pawnsCollection = []

    let step = 0
    let pawn = null

    forEach(pawnsMap, (pawnSetting) => {
      for (step = 0; step < pawnSetting.fleetSize; step += 1) {
        pawn = new Pawn(pawnSetting.typeId)

        pawnsCollection.push(pawn)
      }
    })

    return pawnsCollection
  }
}

export default BoardHelper
