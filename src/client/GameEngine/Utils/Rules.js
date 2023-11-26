import { CellType, PawnType } from '../gameEnums'

class Rules {
  static isEnemyPawnInCell (cell) {
    return cell?.pawn?.type === PawnType.ENEMY
  }

  static isPawnInCell (cell) {
    return cell?.pawn !== null
  }

  static isCellInRange (cell) {
    return cell.inRange
  }

  static isPairOfSeaAndPort (cell, adjacentCell) {
    const type1 = cell.type
    const type2 = adjacentCell.type

    if (type1 === CellType.SEA) {
      return type2 === CellType.PLAYER_ONE_PORT || type2 === CellType.PLAYER_TWO_PORT
    }
    if (type1 === CellType.PLAYER_ONE_PORT || type1 === CellType.PLAYER_TWO_PORT) {
      return type2 === CellType.SEA
    }

    return false
  }
}

export default Rules
