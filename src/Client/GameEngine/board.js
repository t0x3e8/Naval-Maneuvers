/* eslint-disable no-magic-numbers */
import settings from './settings.js'
import Cell from './cell.js'
import _ from 'underscore'

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
   * Initialized the intance of Board with an array of cells. The map of the cells is based on settings.js
   * @returns {array} Returns 2-dimentional array of cells
   * @param {boolean} portMode determines whether full Board should be initialized or only Player's port
   */
  initializeCells () {
    const { map, numberOfColumns, numberOfRows } = settings.board

    let colPosition = 0
    let rowPosition = 0
    let cellType = 0
    let row = []

    for (rowPosition = 0; rowPosition < numberOfRows; rowPosition += 1) {
      row = []
      for (colPosition = 0; colPosition < numberOfColumns; colPosition += 1) {
        cellType = map[rowPosition][colPosition]
        row[colPosition] = new Cell({
          type: cellType,
          colIndex: colPosition,
          rowIndex: rowPosition,
          board: this
        })
      }
      this.cells[rowPosition] = row
    }
  }

  /**
   * Function assigned a specified pawn to the cell
   * @param {Cell} cell to which the pawn will be assigned
   * @param {Pawn} pawn which represents the ship
   * @param {Pawn} enemyPawn optional argument, represents enemyPawn
   */
  // eslint-disable-next-line class-methods-use-this
  assignPawn (cell, pawn, enemyPawn = null) {
    cell.pawn = pawn
    cell.enemyPawn = enemyPawn

    // Updates the pawn position only if changes
    if (pawn && (pawn.col !== cell.col || pawn.row !== cell.row)) {
      pawn.updatePosition(cell.col, cell.row)
    }

    // updates the enemy pawn position only if changes
    if (enemyPawn && (enemyPawn.col !== cell.col || enemyPawn.row !== cell.row)) {
      enemyPawn.updatePosition(cell.col, cell.row)
    }
  }

  /**
   * Function returns the array of all pawns on the board
   * @returns {[pawn]} An array of pawns on the board
   */
  toPawnArray () {
    const cellsWithPawns = _.filter(_.flatten(this.cells), (cell) => cell.pawn !== null)
    const pawns = _.map(cellsWithPawns, (cell) => cell.pawn)

    return pawns
  }

  /**
   * Function returns the array of all board pawns misplaced (rotated) by 180 degrees
   * @returns {[pawn]} An array of rotated pawns on the board
   */
  toRotatedPawnsArray () {
    const pawns = this.toPawnArray()
    const { numberOfColumns, numberOfRows } = settings.board
    const lengthToIndex = 1
    const pawnsRotated = _.map(pawns, (pawn) => {
      pawn.col = numberOfColumns - lengthToIndex - pawn.col
      pawn.row = numberOfRows - lengthToIndex - pawn.row

      return pawn
    })

    return pawnsRotated
  }
}

export default Board
