import Board from '../client/GameEngine/board.js'
import { PawnType } from '../client/GameEngine/gameEnums.js'
import settings from '../client/GameEngine/settings.js'
import Pawn from '../client/GameEngine/pawn.js'

describe('Board Class Functionality Tests', () => {
  let board
  let pawn1, pawn2, enemyPawn, cell1

  beforeEach(() => {
    board = new Board()
    pawn1 = new Pawn(PawnType.BATTLESHIP)
    pawn2 = new Pawn(PawnType.SUBMARINE)
    enemyPawn = new Pawn(PawnType.ENEMY)
  })

  describe('constructor Function tests', () => {
    it('should initialize cells array and boardId', () => {
      const { numberOfColumns, numberOfRows } = settings.board
      expect(board.cells).toHaveLength(numberOfRows)
      expect(board.cells[0]).toHaveLength(numberOfColumns)
      expect(board.boardId).toBeNull()
    })
  })

  describe('preservePawns Function Tests', () => {
    it('should return an empty array when no pawns are present', () => {
      expect(board.preservePawns()).toHaveLength(0)
    })

    it('should return 2 pawns, if 2 pawns has been place on th board', () => {
      board.assignPawn(board.cells[0][1], pawn1)
      board.assignPawn(board.cells[1][5], pawn2)

      const pawns = board.preservePawns()
      expect(pawns.length).toBe(2)
      expect(pawns[0]).toBeInstanceOf(Pawn)
      expect(pawns[1]).toBeInstanceOf(Pawn)
    })

    it('should return all pawns when all cells have pawns', () => {
      for (const row of board.cells) {
        for (const cell of row) {
          cell.pawn = new Pawn(PawnType.BATTLESHIP)
        }
      }

      const pawns = board.preservePawns()
      expect(pawns.length).toBe(board.cells.flat().length)
      pawns.forEach(pawn => expect(pawn).toBeInstanceOf(Pawn))
    })
  })

  describe('assignPawn Function Tests', () => {
    it('should throw an error for an invalid cell', () => {
      expect(() => { board.assignPawn(null, pawn1, enemyPawn) }).toThrow('Invalid cell provided')
    })

    it('should throw an error for an invalid pawn', () => {
      cell1 = board.cells[0][1]

      expect(() => { board.assignPawn(cell1, 'not a pawn', enemyPawn) }).toThrow('Invalid pawn provided')
    })

    it('should throw an error for an invalid enemy pawn', () => {
      cell1 = board.cells[0][1]

      expect(() => { board.assignPawn(cell1, pawn1, 'not a pawn') }).toThrow('Invalid enemy pawn provided')
    })

    it('should update pawn position if it has changed', () => {
      pawn1.col = 1
      pawn1.row = 1
      cell1 = board.cells[10][10]

      board.assignPawn(cell1, pawn1)

      expect(pawn1.col).toBe(cell1.col)
      expect(pawn1.row).toBe(cell1.row)
    })

    it('should update enemy pawn position if it has changed', () => {
      enemyPawn.col = 1
      enemyPawn.row = 1
      cell1 = board.cells[10][10]

      board.assignPawn(cell1, pawn1, enemyPawn)

      expect(enemyPawn.col).toBe(cell1.col)
      expect(enemyPawn.row).toBe(cell1.row)
    })

    it('should assign the pawn and enemy pawn to the cell', () => {
      board.assignPawn(cell1, pawn1, enemyPawn)

      expect(cell1.pawn).toBe(pawn1)
      expect(cell1.enemyPawn).toBe(enemyPawn)
    })
  })

  describe('setupPawns Function Tests', () => {
    it('should throw an error if a pawn has a row value out of the board range', () => {
      pawn1.update({ type: pawn1.type, col: 0, row: -10 })
      pawn2.update({ type: pawn2.type, col: 0, row: 100 })

      expect(() => { board.setupPawns([pawn1]) }).toThrow(Error)
      expect(() => { board.setupPawns([pawn2]) }).toThrow(Error)
    })

    it('should throw an error if a pawn has a column value out of the board range', () => {
      pawn1.update({ type: pawn1.type, col: -10, row: 0 })
      pawn2.update({ type: pawn2.type, col: 100, row: 0 })

      expect(() => { board.setupPawns([pawn1]) }).toThrow(Error)
      expect(() => { board.setupPawns([pawn2]) }).toThrow(Error)
    })

    it('should throw an error if the target cell is already occupied by another pawn', () => {
      pawn1.update({ type: pawn1.type, col: 10, row: 10 })
      pawn2.update({ type: pawn2.type, col: 10, row: 10 })

      board.cells[10][10].pawn = pawn1

      expect(() => { board.setupPawns([pawn2]) }).toThrow(Error)
    })

    it('should correctly place pawns on the board when valid positions are provided', () => {
      pawn1.update({ type: pawn1.type, col: 10, row: 1 })
      pawn2.update({ type: pawn2.type, col: 11, row: 1 })

      board.setupPawns([pawn1, pawn2])

      expect(board.cells[1][10].pawn).toBe(pawn1)
      expect(board.cells[1][11].pawn).toBe(pawn2)
    })

    it('should throw an error if any pawn in the array has invalid position', () => {
      const validPawn = new Pawn(PawnType.CRUISER)
      const invalidPawn = new Pawn(PawnType.CRUISER)

      validPawn.update({ type: validPawn.type, col: 10, row: 1 })
      invalidPawn.update({ type: invalidPawn.type, col: -1, row: 2 })

      expect(() => { board.setupPawns([validPawn, invalidPawn]) }).toThrow(Error)
    })

    it('should not modify the board cells if an error is thrown for any pawn', () => {
      const invalidPawn = new Pawn(PawnType.CRUISER)
      invalidPawn.update({ type: invalidPawn.type, col: -1, row: 2 })

      try {
        board.setupPawns([invalidPawn])
      } catch (error) {
        // Ignoring the error to check the board state
      }

      expect(board.preservePawns().length).toEqual(0)
    })
  })

  describe('toRotatedPawnsArray Function Tests', () => {
    it('should correctly rotate the pawn positions', () => {
      const { numberOfColumns, numberOfRows } = settings.board

      // Initialize half of the board with pawns
      for (let r = 0; r < numberOfRows / 2; r++) {
        for (let c = 0; c < numberOfColumns; c++) {
          const pawn = new Pawn(PawnType.DESTROYER)
          pawn.update({ type: PawnType.DESTROYER })
          board.assignPawn(board.cells[r][c], pawn)
        }
      }

      const pawns = board.preservePawns()
      const rotatedPawns = board.toRotatedPawnsArray()

      // Check the length of the pawns arrays
      expect(pawns.length).toBe(numberOfRows / 2 * numberOfColumns)
      expect(rotatedPawns.length).toBe(numberOfRows / 2 * numberOfColumns)

      // Check if each rotated pawn is in the expected position
      let rotatedPawnsCount = 0
      for (let r = numberOfRows - 1; r >= numberOfRows / 2; r--) {
        for (let c = 0; c < numberOfColumns; c++) {
          const foundPawn = rotatedPawns.find(pawn => pawn.row === r && pawn.col === c)
          expect(foundPawn).not.toBe(undefined)
          rotatedPawnsCount++
        }
      }

      expect(rotatedPawnsCount).toEqual(pawns.length)
    })
  })

  describe('portCells Function Tests', () => {
    it('should display only 6 rows when a PortBoard is created', () => {
      expect(board.portCells.length).toBe(6)
    })
  })

  describe('numberOfColumns Function Tests', () => {
    test('should update portCells with the last N rows from cells', () => {
      const { portViewNumberOfRows, numberOfColumns } = settings.board
      expect(board.portCells.length).toEqual(portViewNumberOfRows)
      expect(board.portCells[0].length).toEqual(numberOfColumns)
    })
  })
})
