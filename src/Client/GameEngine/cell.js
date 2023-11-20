/* eslint-disable max-statements */

/**
 * A class representing a Cell object.
 * @param {object} cellData - Object containing cell information as: type, columnIndex, rowIndex,
 * @returns {void}
 */
class Cell {
  constructor (cellData) {
    this.type = cellData.type
    this.col = cellData.colIndex
    this.row = cellData.rowIndex
    this.pawn = null
    this.enemyPawn = null
    this.inRange = false
    this.board = cellData.board
  }

  /**
   * The function creates arrat of adjacent (neighboring) cells.
   * Adjacent cells are those that are located directly on the X and Y axes.
   * @returns {array} The array containing adjacent cells
   */
  getAdjacentCells () {
    const adjacentCells = []
    const { col, row } = this
    const offset = 1

    // R-1, C
    if (this.board.cells[row - offset]) {
      adjacentCells.push(this.board.cells[row - offset][col])
    }
    // R-1, C-1
    if (this.board.cells[row - offset] && this.board.cells[row - offset][col - offset]) {
      adjacentCells.push(this.board.cells[row - offset][col - offset])
    }
    // R+1, C
    if (this.board.cells[row + offset]) {
      adjacentCells.push(this.board.cells[row + offset][col])
    }
    // R-1, C+1
    if (this.board.cells[row - offset] && this.board.cells[row - offset][col + offset]) {
      adjacentCells.push(this.board.cells[row - offset][col + offset])
    }
    // R, C-1
    if (this.board.cells[row][col - offset]) {
      adjacentCells.push(this.board.cells[row][col - offset])
    }
    // R+1, C-1
    if (this.board.cells[row + offset] && this.board.cells[row + offset][col - offset]) {
      adjacentCells.push(this.board.cells[row + offset][col - offset])
    }
    // R, C+1
    if (this.board.cells[row][col + offset]) {
      adjacentCells.push(this.board.cells[row][col + offset])
    }
    // R+1, C+1
    if (this.board.cells[row + offset] && this.board.cells[row + offset][col + offset]) {
      adjacentCells.push(this.board.cells[row + offset][col + offset])
    }

    return adjacentCells
  }
}

export default Cell
