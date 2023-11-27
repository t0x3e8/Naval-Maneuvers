import PortBoard from '../client/GameEngine/portboard.js'
import { CellType, PawnType } from '../client/GameEngine/gameEnums'
import settings from '../client/GameEngine/settings.js'
import _ from 'underscore'

describe('PortBoard Class Functionality Tests', () => {
  let board
  let portCells

  beforeEach(() => {
    board = new PortBoard()
    portCells = _.flatten(board.cells)
  })

  it('should display only 6 rows when a PortBoard is created', () => {
    expect(board.cells.length).toBe(6)
  })

  it('should limit Board to only Port view with random assignment of all pawns except Batteries and Mines', () => {
    const portBatteryCells = _.filter(portCells, (cell) => cell.type === CellType.PLAYER_TWO_BATTERY)
    const nonBatteryPortCells = _.filter(portCells, (cell) => cell.type !== CellType.PLAYER_TWO_BATTERY)
    const pawnTypeCounts = _.countBy(nonBatteryPortCells, (cell) => cell.pawn?.type)

    expect(portBatteryCells.length).toBe(4)
    portBatteryCells.forEach((cell) => {
      expect(cell).toHaveProperty('type', CellType.PLAYER_TWO_BATTERY)
      expect(cell.pawn).not.toBeNull()
    })

    _.each(PawnType, (pawnType) => {
      const expectedCount = (pawnType === PawnType.BATTERY || pawnType === PawnType.MINE) ? 0 : _.find(settings.pawns, (p) => p.typeId === pawnType).fleetSize
      expect(pawnTypeCounts[pawnType] || 0).toBe(expectedCount)
    })
  })
})
