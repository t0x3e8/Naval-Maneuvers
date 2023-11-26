import Cell from '../client/GameEngine/cell.js'
import GameBoard from '../client/GameEngine/gameBoard.js'

describe('Cell Class Functionality Tests', () => {
  it('should properly initialize a Cell object with default values', () => {
    const cellData = {
      type: 1,
      colIndex: 2,
      rowIndex: 4,
      board: new GameBoard()
    }
    const cell = new Cell(cellData)

    expect(cell).not.toBeNull()
    expect(cell.type).toBe(cellData.type)
    expect(cell.col).toBe(cellData.colIndex)
    expect(cell.row).toBe(cellData.rowIndex)
    expect(cell.pawn).toBeNull()
    expect(cell.enemyPawn).toBeNull()
    expect(cell.inRange).toBe(false)
    expect(cell.board).toBe(cellData.board)
  })

  it('should correctly identify adjacent cells for varying cell positions on the game board, including corners, edges, and center', () => {
    const board = new GameBoard()
    const cellTopLeftCornerBoard = board.cells[0][0]
    const cellBottomRightCornerBoard = board.cells[17][11]
    const cellBottomLeftCornerBoard = board.cells[17][0]
    const cellTopRightCornerBoard = board.cells[0][11]
    const cellCenterBoard = board.cells[9][5]

    expect(cellTopLeftCornerBoard.getAdjacentCells(board).length).toBe(3)
    expect(cellBottomRightCornerBoard.getAdjacentCells(board).length).toBe(3)
    expect(cellBottomLeftCornerBoard.getAdjacentCells(board).length).toBe(3)
    expect(cellTopRightCornerBoard.getAdjacentCells(board).length).toBe(3)
    expect(cellCenterBoard.getAdjacentCells(board).length).toBe(8)
  })
})
