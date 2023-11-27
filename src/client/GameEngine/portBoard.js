import _ from 'underscore'
import { CellType, PawnType } from './gameEnums.js'
import BoardHelper from './boardHelper.js'
import Pawn from './pawn.js'
import Board from './board.js'

/**
 * Represents the structure of the port board, including characteristics of cells and pawn setup.
 */
class PortBoard extends Board {
  /**
   * Constructs the PortBoard object.
   */
  constructor () {
    super()
    this.displayPortCells()
    this.initializePawns()
  }

  /**
   * Initializes the board with the placement of pawns.
   * @param {Pawn[]} pawns - Array of Pawn objects.
   */
  initializePawns (pawns) {
    // Directly use provided pawns or filter non-battery pawns from default set
    const allPawns = pawns || _.filter(
      BoardHelper.getAllPawns(),
      (pawn) => pawn.type !== PawnType.MINE && pawn.type !== PawnType.BATTERY
    )

    // Shuffle and filter port and entrance cells
    const portCells = _.shuffle(
      _.flatten(this.cells).filter(
        (cell) => cell.type === CellType.PLAYER_TWO_PORT || cell.type === CellType.PLAYER_TWO_ENTRANCE
      )
    )

    // Assign battery pawns to battery cells if pawns are not provided
    if (!pawns) {
      const batteryCells = _.flatten(this.cells).filter(
        (cell) => cell.type === CellType.PLAYER_TWO_BATTERY
      )

      // Place battery pawns in battery cells
      batteryCells.forEach((cell) => {
        this.assignPawn(cell, new Pawn(PawnType.BATTERY))
      })
    }

    // Assign pawns to port and entrance cells
    allPawns.forEach((pawn) => {
      const cell = portCells.pop()
      if (cell) {
        this.assignPawn(cell, pawn)
      } else {
        // Handle the case where there are more pawns than cells
        console.error('Not enough cells to place all pawns')
      }
    })
  }

  /**
   * Displays only the port cells of the board.
   */
  displayPortCells () {
    // ToDo: Hardcoded, as the cells are limitted to the last 6 rows. In future it needs more dynamic approach.
    const showBoardRows = 6

    this.cells = _.last(this.cells, showBoardRows)
  }
}

export default PortBoard
