/**
 * A class representing a Cell object.
 * @returns {void}
 */
class Cell {
  /**
   * Creates a new Cell instance.
   * @param {object} cellData - Object containing cell information as: type, columnIndex, rowIndex,
   */
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
   * The function creates array of adjacent (neighboring) cells.
   * Adjacent cells are those that are located directly on the X and Y axes.
   * @returns {array} The array containing adjacent cells
   */
  getAdjacentCells () {
    const adjacentCells = []
    const { col, row } = this
    const directions = [
      [-1, 0], // Up
      [-1, -1], // Up-left
      [1, 0], // Down
      [-1, 1], // Up-right
      [0, -1], // Left
      [1, -1], // Down-left
      [0, 1], // Right
      [1, 1] // Down-right
    ]

    directions.forEach(([dRow, dCol]) => {
      const newRow = row + dRow
      const newCol = col + dCol

      if (this.board.cells[newRow] && this.board.cells[newRow][newCol]) {
        adjacentCells.push(this.board.cells[newRow][newCol])
      }
    })

    return adjacentCells
  }
}

export default Cell
