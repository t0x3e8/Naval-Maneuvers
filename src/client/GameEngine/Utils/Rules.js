import { CellType, PawnType } from '../gameEnums'

/**
 * *
 * Represents a Rules object.
 */
class Rules {
  /**
   * Determines if the cell contains an enemy pawn.
   * @param {object} cell - The cell to check.
   * @returns {boolean} - True if the cell contains an enemy pawn, false otherwise.
   */
  static isEnemyPawnInCell (cell) {
    return cell?.pawn?.type === PawnType.ENEMY
  }

  /**
   * Checks if there is any pawn in the given cell.
   * @param {object} cell - The cell to check.
   * @returns {boolean} - True if a pawn is present, false if not or if the cell or pawn is undefined.
   */
  static isPawnInCell (cell) {
    return cell?.pawn != null // Handles both null and undefined
  }

  /**
   * Checks if a cell is within a certain range.
   * @param {object} cell - The cell to check.
   * @returns {boolean} - True if the cell is in range, false otherwise.
   */
  static isCellInRange (cell) {
    return !!cell.inRange // Ensures the return value is always a boolean
  }

  /**
  * Determines if a cell and its adjacent cell are a sea cell and a port cell.
  * @param cell - Represents a grid cell with a `type` property indicating its type.
  * @param adjacentCell - The cell next to the current cell.
  * @returns True if one cell is a sea cell and the other is a port cell, else false.
  */
  static isPairOfSeaAndPort (cell, adjacentCell) {
    const isSeaPortPair = (type1, type2) =>
      (type1 === CellType.SEA && (type2 === CellType.PLAYER_ONE_PORT || type2 === CellType.PLAYER_TWO_PORT)) ||
      ((type1 === CellType.PLAYER_ONE_PORT || type1 === CellType.PLAYER_TWO_PORT) && type2 === CellType.SEA)

    return isSeaPortPair(cell.type, adjacentCell.type)
  }
}

export default Rules
