import Cell from '../client/GameEngine/cell.js'
import GameBoard from '../client/GameEngine/gameboard.js'

describe('CELL requirements', () => {
  it('should initialize with default settings when a new Cell is created', () => {
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

  it('should accurately determine neighbour-cells for cells at different positions on the board', () => {
    const board = new GameBoard()
    const cellTopLeft = board.cells[0][0]
    const cellBottomRight = board.cells[17][11]
    const cellBottomLeft = board.cells[17][0]
    const cellTopRight = board.cells[0][11]
    const cellMiddle = board.cells[9][5]

    expect(cellTopLeft.getAdjacentCells(board).length).toBe(3)
    expect(cellBottomRight.getAdjacentCells(board).length).toBe(3)
    expect(cellBottomLeft.getAdjacentCells(board).length).toBe(3)
    expect(cellTopRight.getAdjacentCells(board).length).toBe(3)
    expect(cellMiddle.getAdjacentCells(board).length).toBe(8)
  })
})
