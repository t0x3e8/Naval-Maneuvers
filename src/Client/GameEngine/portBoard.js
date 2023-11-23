import _ from 'underscore'
import { CellType, PawnType } from './gameEnums.js'
import BoardHelper from './boardHelper.js'
import Pawn from './pawn.js'
import Board from './board.js'

/**
 * The Board object represents the structure of the board, including characteristics  of board eg.
 * cells of ports and the neutral cells. In addition, it shows the setup of pawns on the board of players.
 * @returns {void}
 */
class PortBoard extends Board {
  /**
   * Constructs the PortBoard object
   */
  constructor () {
    super()
    this.displayPortCells()
    this.initializePawns()
  }

  /**
   * Initialized the intance of Board with the random placement of pawns.
   * @param {GUID} playerID client Player ID received by server
   * @returns {void}
   */
  initializePawns () {
    const allPawns = _.filter(
      BoardHelper.getAllPawns(),
      (pawn) => pawn.type !== PawnType.MINE && pawn.type !== PawnType.BATTERY
    )
    const portCells = _.shuffle(
      _.flatten(this.cells).filter(
        (cell) => cell.type === CellType.PLAYER_TWO_PORT || cell.type === CellType.PLAYER_TWO_ENTRANCE
      )
    )
    const batteryCells = _.flatten(this.cells).filter((cell) => cell.type === CellType.PLAYER_TWO_BATTERY)

    batteryCells.forEach((cell) => {
      this.assignPawn(cell, new Pawn(PawnType.BATTERY))
    })

    allPawns.forEach((pawn) => {
      this.assignPawn(portCells.pop(), pawn)
    })
  }

  /**
   * Changes the full board view into only port view
   * @returns {void}
   */
  displayPortCells () {
    // ToDo: Hardcoded, as the cells are limitted to the last 6 rows. In future it needs more dynamic approach.
    const showBoardRows = 6

    this.cells = _.last(this.cells, showBoardRows)
  }
}

export default PortBoard
