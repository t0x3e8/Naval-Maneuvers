/* eslint-disable max-statements */
import settings from './settings.js'
import _ from 'underscore'

/**
 * A class representing a Pawn object.
 * @returns {void}
 */
class Pawn {
  constructor (pawnType) {
    if (_.isNull(pawnType) || _.isUndefined(pawnType)) {
      throw new Error('Pawn Type must be specified')
    }

    const pawnSetting = _.find(settings.pawns, (p) => p.typeId === pawnType)

    if (!pawnSetting) {
      throw new Error(`No Pawn of ${pawnType} in Settings`)
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

  update (pawnData) {
    if (this.pawnId !== null) {
      throw new Error('Pawn is already updated')
    }

    if (this.type !== pawnData.type) {
      throw new Error("Type of Pawn don't match the pawnData")
    }

    this.pawnId = pawnData.id
    this.col = pawnData.col
    this.oldCol = pawnData.oldCol
    this.row = pawnData.row
    this.oldRow = pawnData.oldRow
    this.playerId = pawnData.playerId
    this.damageLevel = pawnData.damageLevel
  }

  updatePosition (newCol, newRow) {
    this.oldCol = this.col
    this.oldRow = this.row
    this.col = newCol
    this.row = newRow
  }
}

export default Pawn
