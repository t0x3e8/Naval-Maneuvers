import { createGameResponseData } from './serverResponses.js'
import { PawnType } from '../client/GameEngine/gameEnums'
import GameBoard from '../client/GameEngine/gameBoard.js'
import Pawn from '../client/GameEngine/pawn.js'
import _ from 'underscore'
import settings from '../client/GameEngine/settings.js'

describe('GAMEBOARD requirements', () => {
  let board

  beforeEach(() => {
    board = new GameBoard()
  })

  it('should have the correct number of rows and columns as specified in settings and a null boardId when created', () => {
    const { numberOfColumns, numberOfRows } = settings.board

    expect(board.cells.length).toBe(numberOfRows)
    expect(board.cells[0].length).toBe(numberOfColumns)
    expect(board.boardId).toBeNull()
  })

  it('should match all Cell properties with the map from Settings and defaults when a Board is created', () => {
    const boardCells = _.flatten(board.cells)
    const { map } = settings.board
    const mapSettingsCells = _.flatten(map)

    expect(boardCells.length).toBe(mapSettingsCells.length)
    boardCells.forEach((cell, i) => {
      expect(cell.type).toBe(mapSettingsCells[i])
      expect(cell.pawn).toBeNull()
      expect(cell.inRange).toBeFalsy()
    })
  })

  it('should update Cell information when a Pawn is assigned to a newly created Board', () => {
    const pawn = new Pawn(PawnType.SUBMARINE)
    const colIndex = 10
    const rowIndex = 10
    const boardCell = board.cells[rowIndex][colIndex]

    board.assignPawn(boardCell, pawn)

    expect(boardCell.pawn).not.toBeNull()
    expect(pawn.col).toBe(boardCell.col)
    expect(pawn.row).toBe(boardCell.row)
    expect(pawn.oldCol).toBe(0)
    expect(pawn.oldRow).toBe(0)

    board.assignPawn(boardCell, pawn)
    expect(pawn.col).toBe(boardCell.col)
    expect(pawn.row).toBe(boardCell.row)
    expect(pawn.oldCol).toBe(0)
    expect(pawn.oldRow).toBe(0)
  })

  it('should return a list of all Pawns with their type and position when Pawns are arranged in the port', () => {
    const pawn1 = new Pawn(PawnType.SUBMARINE)
    const pawn2 = new Pawn(PawnType.BATTLESHIP)

    board.assignPawn(board.cells[1][1], pawn1)
    board.assignPawn(board.cells[5][5], pawn2)
    const pawnsOnBoard = board.toPawnArray()

    expect(pawnsOnBoard.length).toBe(2)

    pawnsOnBoard.forEach(pawn => {
      const cell = board.cells[pawn.row][pawn.col]

      expect(pawn.type).not.toBe(0)
      expect(pawn.col).toBe(cell.col)
      expect(pawn.row).toBe(cell.row)
    })
  })

  it('should allow determining the selected Pawn after a Board is created and a Pawn is selected by a user', () => {
    const pawnSubmarine = new Pawn(PawnType.SUBMARINE)

    // mock of function, when game is not initialized
    board.canMove = () => true

    board.assignPawn(board.cells[5][5], pawnSubmarine)
    board.select({ col: 5, row: 5 })
    const selectedPawn = board.getSelected()

    expect(board.cells[5][5]).not.toEqual({})
    expect(board.cells[5][5].pawn).not.toBeNull()
    expect(selectedPawn).not.toBeNull()
    expect(selectedPawn.col).toBe(5)
    expect(selectedPawn.row).toBe(5)
    expect(selectedPawn.oldCol).toBe(0)
    expect(selectedPawn.oldRow).toBe(0)
    expect(selectedPawn.type).toBe(pawnSubmarine.type)
  })

  it('should allow viewing the range of possible moves after a Board is created and a Cell or Pawn is clicked', () => {
    const pawnSubmarine = new Pawn(PawnType.SUBMARINE)
    const pawnBattleship = new Pawn(PawnType.BATTLESHIP)

    board.assignPawn(board.cells[5][5], pawnSubmarine)
    board.assignPawn(board.cells[5][4], pawnBattleship)
    board.select({ col: 5, row: 5 })
    board.rangeCells(pawnSubmarine)

    expect(board.cells[5][5]).not.toEqual({})
    expect(board.cells[5][5].pawn).not.toBeNull()
    expect(board.cells[3][3].inRange).toBe(true)
    expect(board.cells[5][4].inRange).toBe(false)
  })

  it('should allow cleaning the range of previous selection after a Board is created and a Cell or Pawn is selected', () => {
    const pawnSubmarine = new Pawn(PawnType.SUBMARINE)

    board.assignPawn(board.cells[1][1], pawnSubmarine)
    board.select({ col: 1, row: 1 })
    board.rangeCells(pawnSubmarine)

    expect(pawnSubmarine.range).toBeGreaterThanOrEqual(2)
    expect(board.cells[1][1]).not.toEqual({})
    expect(board.cells[1][1].pawn).not.toBeNull()
    expect(board.cells[0][0].inRange).toBe(true)
  })

  it('should update the status of origin and destination cells when a Pawn is moved on the Board', () => {
    const pawnSubmarine = new Pawn(PawnType.SUBMARINE)

    expect(pawnSubmarine.range).toBeGreaterThanOrEqual(2)

    board.assignPawn(board.cells[1][1], pawnSubmarine)
    expect(board.cells[1][1].pawn).not.toBeNull()
    expect(board.cells[1][2].pawn).toBeNull()

    board.move(board.cells[1][1], board.cells[1][2])
    expect(board.cells[1][1].pawn).toBeNull()
    expect(board.cells[1][2].pawn).not.toBeNull()
    expect(board.movedPawns.length).toBe(1)
  })

  it('should update the positions of pawns and their target cells when a Submarine attacks an enemy ship', () => {
    const pawnSubmarine = new Pawn(PawnType.SUBMARINE)
    const pawnEnemy = new Pawn(PawnType.ENEMY)

    board.assignPawn(board.cells[1][1], pawnSubmarine)
    board.assignPawn(board.cells[2][2], pawnEnemy)
    expect(board.cells[1][1].pawn).not.toBeNull()
    expect(board.cells[1][1].enemyPawn).toBeNull()
    expect(board.cells[2][2].pawn).not.toBeNull()
    expect(board.cells[2][2].enemyPawn).toBeNull()

    board.attack(board.cells[1][1], board.cells[2][2])
    expect(board.cells[1][1].pawn).toBeNull()
    expect(board.cells[2][2].pawn).not.toBeNull()
    expect(board.cells[2][2].pawn.col).toBe(2)
    expect(board.cells[2][2].pawn.row).toBe(2)
    expect(board.cells[2][2].pawn.oldCol).toBe(0)
    expect(board.cells[2][2].pawn.oldRow).toBe(0)
    expect(board.cells[2][2].enemyPawn).not.toBeNull()
    expect(board.cells[2][2].enemyPawn.col).toBe(2)
    expect(board.cells[2][2].enemyPawn.row).toBe(2)
    expect(board.cells[2][2].enemyPawn.oldCol).toBe(1)
    expect(board.cells[2][2].enemyPawn.oldRow).toBe(1)

    expect(board.movedPawns.length).toBe(1)
  })

  it('should allow adding Pawns from PortSetup to the Board', () => {
    const pawns = createGameResponseData.pawns

    expect(board.toPawnArray().length).toBe(0)

    board.setPawns(pawns)
    expect(board.toPawnArray().length).toBe(pawns.length)
  })

  it('should return a list of all Pawns rotated by 180 degrees when Pawns are arranged in the port', () => {
    const pawn1 = new Pawn(PawnType.SUBMARINE)
    const pawn2 = new Pawn(PawnType.BATTLESHIP)

    board.assignPawn(board.cells[1][1], pawn1)
    board.assignPawn(board.cells[5][5], pawn2)
    const pawnsOnBoard = board.toRotatedPawnsArray()

    expect(pawnsOnBoard.length).toBe(2)
    expect(pawnsOnBoard[0].col).toBe(10)
    expect(pawnsOnBoard[0].row).toBe(16)
    expect(pawnsOnBoard[1].col).toBe(6)
    expect(pawnsOnBoard[1].row).toBe(12)
  })
})
