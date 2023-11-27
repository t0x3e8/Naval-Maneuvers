import Cell from '../client/GameEngine/cell.js'
import { CellType, PawnType } from '../client/GameEngine/gameEnums'
import Rules from '../client/GameEngine/Utils/Rules.js'
import Pawn from '../client/GameEngine/pawn.js'
import Board from '../client/GameEngine/board.js'

describe('Rules Class Functionality Tests', () => {
  let seaCell, port1Cell, port2Cell, neutralCell, entrance1Cell, entrance2Cell, board

  beforeEach(() => {
    seaCell = new Cell({ type: CellType.SEA })
    port1Cell = new Cell({ type: CellType.PLAYER_ONE_PORT })
    port2Cell = new Cell({ type: CellType.PLAYER_TWO_PORT })
    neutralCell = new Cell({ type: CellType.NEUTRAL })
    entrance1Cell = new Cell({ type: CellType.PLAYER_ONE_ENTRANCE })
    entrance2Cell = new Cell({ type: CellType.PLAYER_TWO_ENTRANCE })
    board = new Board()
  })

  it('should return false for SEA-SEA cell combination', () => {
    expect(Rules.isPairOfSeaAndPort(seaCell, seaCell)).toBe(false)
  })

  it('should return true for SEA-PLAYER_ONE_PORT cell combination', () => {
    expect(Rules.isPairOfSeaAndPort(seaCell, port1Cell)).toBe(true)
  })

  it('should return true for SEA-PLAYER_TWO_PORT cell combination', () => {
    expect(Rules.isPairOfSeaAndPort(seaCell, port2Cell)).toBe(true)
  })

  it('should return false for SEA-NEUTRAL cell combination', () => {
    expect(Rules.isPairOfSeaAndPort(seaCell, neutralCell)).toBe(false)
  })

  it('should return false for SEA-PLAYER_ONE_ENTRANCE cell combination', () => {
    expect(Rules.isPairOfSeaAndPort(seaCell, entrance1Cell)).toBe(false)
  })

  it('should return false for SEA-PLAYER_TWO_ENTRANCE cell combination', () => {
    expect(Rules.isPairOfSeaAndPort(seaCell, entrance2Cell)).toBe(false)
  })

  it('should return true for PLAYER_ONE_PORT-SEA cell combination', () => {
    expect(Rules.isPairOfSeaAndPort(port1Cell, seaCell)).toBe(true)
  })

  it('should return false for PLAYER_ONE_PORT-PLAYER_ONE_PORT cell combination', () => {
    expect(Rules.isPairOfSeaAndPort(port1Cell, port1Cell)).toBe(false)
  })

  it('should return false for PLAYER_ONE_PORT-PLAYER_TWO_PORT cell combination', () => {
    expect(Rules.isPairOfSeaAndPort(port1Cell, port2Cell)).toBe(false)
  })

  it('should return false for PLAYER_ONE_PORT-NEUTRAL cell combination', () => {
    expect(Rules.isPairOfSeaAndPort(port1Cell, neutralCell)).toBe(false)
  })

  it('should return false for PLAYER_ONE_PORT-PLAYER_ONE_ENTRANCE cell combination', () => {
    expect(Rules.isPairOfSeaAndPort(port1Cell, entrance1Cell)).toBe(false)
  })

  it('should return false for PLAYER_ONE_PORT-PLAYER_TWO_ENTRANCE cell combination', () => {
    expect(Rules.isPairOfSeaAndPort(port1Cell, entrance2Cell)).toBe(false)
  })

  it('should return true for PLAYER_TWO_PORT-SEA cell combination', () => {
    expect(Rules.isPairOfSeaAndPort(port2Cell, seaCell)).toBe(true)
  })

  it('should return false for PLAYER_TWO_PORT-PLAYER_ONE_PORT cell combination', () => {
    expect(Rules.isPairOfSeaAndPort(port2Cell, port1Cell)).toBe(false)
  })

  it('should return false for PLAYER_TWO_PORT-PLAYER_TWO_PORT cell combination', () => {
    expect(Rules.isPairOfSeaAndPort(port2Cell, port2Cell)).toBe(false)
  })

  it('should return false for PLAYER_TWO_PORT-NEUTRAL cell combination', () => {
    expect(Rules.isPairOfSeaAndPort(port2Cell, neutralCell)).toBe(false)
  })

  it('should return false for PLAYER_TWO_PORT-PLAYER_ONE_ENTRANCE cell combination', () => {
    expect(Rules.isPairOfSeaAndPort(port2Cell, entrance1Cell)).toBe(false)
  })
  it('should return false for PLAYER_TWO_PORT-PLAYER_TWO_ENTRANCE cell combination', () => {
    expect(Rules.isPairOfSeaAndPort(port2Cell, entrance2Cell)).toBe(false)
  })

  it('should return true if the cell has been marked as in range', () => {
    seaCell.inRange = true
    expect(Rules.isCellInRange(seaCell)).toBe(true)
  })

  it('should return false if the cell has not been marked as in range', () => {
    seaCell.inRange = false
    expect(Rules.isCellInRange(seaCell)).toBe(false)
  })

  it('should return true for own pawn presence and false for enemy pawn when a battleship pawn is assigned', () => {
    board.assignPawn(board.cells[0][0], new Pawn(PawnType.BATTLESHIP))
    expect(Rules.isEnemyPawnInCell(board.cells[0][0])).toBe(false)
    expect(Rules.isPawnInCell(board.cells[0][0])).toBe(true)
  })

  it('should return true for own pawn presence and false for enemy pawn when a submarine pawn is assigned', () => {
    board.assignPawn(board.cells[0][0], new Pawn(PawnType.SUBMARINE))
    expect(Rules.isEnemyPawnInCell(board.cells[0][0])).toBe(false)
    expect(Rules.isPawnInCell(board.cells[0][0])).toBe(true)
  })

  it('should return true for enemy pawn presence when an enemy pawn is assigned', () => {
    board.assignPawn(board.cells[0][0], new Pawn(PawnType.ENEMY))
    expect(Rules.isEnemyPawnInCell(board.cells[0][0])).toBe(true)
    expect(Rules.isPawnInCell(board.cells[0][0])).toBe(true)
  })
})
