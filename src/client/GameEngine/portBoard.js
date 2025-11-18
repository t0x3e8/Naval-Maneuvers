// import { filter, shuffle, flatten, last } from 'underscore'
import { last } from 'underscore'
// import { CellType, PawnType } from './gameEnums.js'
// import BoardHelper from './boardHelper.js'
import Pawn from './pawn.js'
import Board from './board.js'
import settings from './settings.js'

/**
 * *
 * Represents the structure of the port board, including characteristics of cells and pawn setup.
 */
class PortBoard extends Board {
  /**
   * Constructs the PortBoard object.
   */
  constructor () {
    super()
    this.portCells = []
    this.displayPortCells()
  }

  /**
 * Initializes the port with a set of pawns.
 * @param {Pawn[]} pawns - Array of Pawn instances to initialize the port with.
 * @throws {Error} If pawns is null or not provided.
 * @throws {Error} If the provided array does not contain only Pawn instances.
 */
  initializePortWithPawns (pawns) {
    if (!pawns) {
      throw new Error('Invalid input: Expected pawns to not be null')
    }

    if (!Array.isArray(pawns) || !pawns.every(pawn => pawn instanceof Pawn)) {
      throw new Error('Invalid input: Expected an array of Pawn instances')
    }

    this.setPawns(pawns)
  }

  // // Prepare Pawns. Filter out Mine and Battery pawns
  // const allPawns = filter(pawns,
  //   (pawn) => pawn.type !== PawnType.MINE && pawn.type !== PawnType.BATTERY
  // )

  // // Prepere Cells. Filter out port and entrance-port cells
  // const portCells = shuffle(
  //   flatten(this.cells).filter(
  //     (cell) => cell.type === CellType.PLAYER_TWO_PORT || cell.type === CellType.PLAYER_TWO_ENTRANCE
  //   )
  // )
  // initializePawns (pawns) {
  //   // Directly use provided pawns or filter non-battery pawns from default set
  //   const allPawns = pawns || filter(
  //     BoardHelper.getAllPawns(),
  //     (pawn) => pawn.type !== PawnType.MINE && pawn.type !== PawnType.BATTERY
  //   )

  //   // Shuffle and filter port and entrance cells
  //   const portCells = shuffle(
  //     flatten(this.cells).filter(
  //       (cell) => cell.type === CellType.PLAYER_TWO_PORT || cell.type === CellType.PLAYER_TWO_ENTRANCE
  //     )
  //   )

  //   // Assign battery pawns to battery cells if pawns are not provided
  //   if (!pawns) {
  //     const batteryCells = flatten(this.cells).filter(
  //       (cell) => cell.type === CellType.PLAYER_TWO_BATTERY
  //     )

  //     // Place battery pawns in battery cells
  //     batteryCells.forEach((cell) => {
  //       this.assignPawn(cell, new Pawn(PawnType.BATTERY))
  //     })
  //   }

  //   // Assign pawns to port and entrance cells
  //   allPawns.forEach((pawn) => {
  //     const cell = portCells.pop()
  //     if (cell) {
  //       this.assignPawn(cell, pawn)
  //     } else {
  //       // Handle the case where there are more pawns than cells
  //       console.error('Not enough cells to place all pawns')
  //     }
  //   })
  // }

  /**
   * Displays only the port cells of the board.
   */
  displayPortCells () {
    const { portViewNumberOfRows } = settings.board
    this.portCells = last(this.cells, portViewNumberOfRows)
  }
}

export default PortBoard
