/* eslint-disable max-statements */
import settings from './settings.js'

/**
 * A class representing a Pawn object.
 * @returns {void}
 */
class Pawn {
  /**
   * Constructs a Pawn instance.
   * @param {number} pawnType - The type of the pawn.
   * @throws Will throw an error if the pawnType is not specified or invalid.
   */
  constructor (pawnType) {
    if (pawnType == null) {
      throw new Error('Pawn Type must be specified')
    }

    const pawnSetting = settings.pawns.find(p => p.typeId === pawnType)

    if (!pawnSetting) {
      throw new Error(`No Pawn of type ${pawnType} found in Settings`)
    }

    this.type = pawnType
    this.col = 0
    this.oldCol = 0
    this.row = 0
    this.oldRow = 0
    this.playerId = null
    this.selected = false
    this.range = pawnSetting.range
    this.name = pawnSetting.name
    this.svgName = pawnSetting.svgName
    this.pawnId = null
    this.damageLevel = 0
  }

  /**
   * Updates the Pawn instance with data from the server.
   * @param {Object} pawnData - The data to update the pawn with.
   * @throws Will throw an error if the pawn is already updated or if the types don't match.
   */
  update (pawnData) {
    if (this.pawnId !== null) {
      throw new Error('Pawn has already been updated')
    }

    if (this.type !== pawnData.type) {
      throw new Error('Type of Pawn does not match the pawnData')
    }

    this.pawnId = pawnData.id
    this.col = pawnData.col
    this.oldCol = pawnData.oldCol
    this.row = pawnData.row
    this.oldRow = pawnData.oldRow
    this.playerId = pawnData.playerId
    this.damageLevel = pawnData.damageLevel
  }

  /**
   * Updates the position of the Pawn.
   * @param {number} newCol - The new column of the pawn.
   * @param {number} newRow - The new row of the pawn.
   */
  updatePosition (newCol, newRow) {
    this.oldCol = this.col
    this.oldRow = this.row
    this.col = newCol
    this.row = newRow
  }
}

export default Pawn
