import Pawn from '../client/GameEngine/pawn.js'
import settings from '../client/GameEngine/settings'
import { createGameResponseData } from './serverResponses'

describe('Pawn Class Functionality Tests', () => {
  it('should throw an error if no type is specified or if the type is invalid', () => {
    expect(() => new Pawn()).toThrow('Pawn Type must be specified')
    expect(() => new Pawn(999999)).toThrow('No Pawn of type 999999 found in Settings')
  })

  it('should initialize with default settings for a valid type', () => {
    const [firstPawnSetting] = settings.pawns
    const pawn = new Pawn(firstPawnSetting.typeId)

    expect(pawn).not.toBeNull()
    expect(pawn.pawnId).toBeNull()
    expect(pawn.type).toBe(firstPawnSetting.typeId)
    expect(pawn.col).toBe(0)
    expect(pawn.row).toBe(0)
    expect(pawn.oldCol).toBe(0)
    expect(pawn.oldRow).toBe(0)
    expect(pawn.playerId).toBeNull()
    expect(pawn.selected).toBeFalsy()
    expect(pawn.range).toBe(firstPawnSetting.range)
    expect(pawn.svgName).toBe(firstPawnSetting.svgName)
    expect(pawn.name).toBe(firstPawnSetting.name)
  })

  it('should update the Pawn instance correctly with data received from the server', () => {
    const [firstPawnDataFromServer] = createGameResponseData.pawns
    const pawn = new Pawn(firstPawnDataFromServer.type)

    pawn.update(firstPawnDataFromServer)

    expect(pawn).not.toBeNull()
    expect(pawn.type).toBe(firstPawnDataFromServer.type)
    expect(pawn.col).toBe(firstPawnDataFromServer.col)
    expect(pawn.row).toBe(firstPawnDataFromServer.row)
    expect(pawn.oldCol).toBe(firstPawnDataFromServer.oldCol)
    expect(pawn.oldRow).toBe(firstPawnDataFromServer.oldRow)
    expect(pawn.playerId).toBe(firstPawnDataFromServer.playerId)
  }
  )

  it('should throw an error if an already updated Pawn is updated again', () => {
    const [firstPawnDataFromServer] = createGameResponseData.pawns
    const pawn = new Pawn(firstPawnDataFromServer.type)

    pawn.update(firstPawnDataFromServer) // First update should not throw error
    expect(() => pawn.update(firstPawnDataFromServer)).toThrow('Pawn has already been updated')
  })

  it('should throw an error if the Pawn type does not match the provided data type', () => {
    const notMatchingPawnType = 9
    const [firstPawnDataFromServer] = createGameResponseData.pawns
    const pawn = new Pawn(notMatchingPawnType)

    expect(() => pawn.update(firstPawnDataFromServer)).toThrow('Type of Pawn does not match the pawnData')
  })

  it('should reflect the change in position properties when the Pawn changes its position', () => {
    const [firstPawnSetting] = settings.pawns
    const pawn = new Pawn(firstPawnSetting.typeId)
    const newCol = pawn.col + 2
    const newRow = pawn.row + 3
    const oldCol = pawn.col
    const oldRow = pawn.row

    pawn.updatePosition(newCol, newRow)
    expect(pawn.col).toBe(newCol)
    expect(pawn.row).toBe(newRow)
    expect(pawn.oldCol).toBe(oldCol)
    expect(pawn.oldRow).toBe(oldRow)
  })
})
