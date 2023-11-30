import settings from './settings.js'
import Cell from './cell.js'
import Pawn from './pawn.js'

/**
 * The Board object represents the structure of the board, including characteristics  of board eg.
 * cells of ports and the neutral cells. In addition, it shows the setup of pawns on the board of players.
 * @returns {void}
 */
class Board {
  /**
   * Constructs the Board object
   */
  constructor () {
    this.cells = []
    this.boardId = null

    this.initializeCells()
  }

  /**
 * Initializes the instance of Board with an array of cells.
 * The layout of the cells is determined based on the configuration provided in settings.js.
 */
  initializeCells () {
    const { map: boardLayout, numberOfColumns, numberOfRows } = settings.board

    this.cells = []

    for (let rowPosition = 0; rowPosition < numberOfRows; rowPosition++) {
      const row = []
      for (let colPosition = 0; colPosition < numberOfColumns; colPosition++) {
        const cellType = boardLayout[rowPosition][colPosition]
        row.push(new Cell({
          type: cellType,
          colIndex: colPosition,
          rowIndex: rowPosition,
          board: this
        }))
      }
      this.cells.push(row)
    }
  }

  /**
 * Assigns a specified pawn and optionally an enemy pawn to the cell.
 * @param {Cell} cell - The cell to which the pawn will be assigned.
 * @param {Pawn} pawn - The pawn representing the ship.
 * @param {Pawn} [enemyPawn=null] - Optional, represents the enemy pawn.
 */
  assignPawn (cell, pawn, enemyPawn = null) {
    if (!cell || !(cell instanceof Cell)) {
      throw new Error('Invalid cell provided')
    }

    if (pawn && !(pawn instanceof Pawn)) {
      throw new Error('Invalid pawn provided')
    }

    if (enemyPawn && !(enemyPawn instanceof Pawn)) {
      throw new Error('Invalid enemy pawn provided')
    }

    cell.pawn = pawn
    cell.enemyPawn = enemyPawn

    // Updates pawn position if it has changed
    if (pawn && (pawn.col !== cell.col || pawn.row !== cell.row)) {
      pawn.updatePosition(cell.col, cell.row)
    }

    // Updates enemy pawn position if it has changed
    if (enemyPawn && (enemyPawn.col !== cell.col || enemyPawn.row !== cell.row)) {
      enemyPawn.updatePosition(cell.col, cell.row)
    }
  }

  /**
 * Function returns the array of all pawns on the board.
 * @returns {Pawn[]} An array of pawns on the board.
 */
  preservePawns () {
    return this.cells
      .flat() // Flattens 2D => 1D array
      .filter(cell => cell.pawn !== null)
      .map(cell => cell.pawn)
  }

  /**
   * Set up pawns on the board according to their specified positions.
   *
   * @param {Pawn[]} pawns - An array of pawns to be placed on the board.
   */
  setupPawns (pawns) {
    const self = this

    pawns.forEach(pawn => {
      const { col, row } = pawn

      // a row value out of the board range
      if (row < 0 || row >= self.cells.length) {
        throw new Error(`Pawn ${pawn.pawnId} is out of row range`)
      }
      // a row value out of the board range
      if (col < 0 || col >= self.cells[row].length) {
        throw new Error(`Pawn ${pawn.pawnId} is out of column range`)
      }

      // the target cell is already occupied by another pawn
      if (self.cells[row][col].pawn !== null) {
        throw new Error(`Cell: [${row}][${col}] has pawn already assigne`)
      }

      self.cells[row][col].pawn = pawn
    })
  }

  /**
 * Function returns the array of all board pawns misplaced (rotated) by 180 degrees.
 * @returns {Pawn[]} An array of rotated pawns on the board.
 */
  toRotatedPawnsArray () {
    const pawns = this.preservePawns()
    const { numberOfColumns, numberOfRows } = settings.board
    const offset = 1

    return pawns.map(pawn => ({
      ...pawn,
      col: numberOfColumns - pawn.col - offset,
      row: numberOfRows - pawn.row - offset
    }))
  }
}

export default Board
