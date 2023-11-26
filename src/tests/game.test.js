import Game from '../client/GameEngine/game.js'
import Player from '../client/GameEngine/player.js'
import { createGameResponseData } from './serverResponses.js'
import { GameState } from '../client/GameEngine/gameEnums.js'

describe('Game Class Functionality Tests', () => {
  it('should properly initialize a Game object with unique ID, history, and initial state', () => {
    const gameData = {
      id: '6eea7a6d-ffda-4038-aea4-6b72f701f17f',
      gameStatus: GameState.NOT_STARTED
    }
    const game = new Game(gameData)

    expect(game.gameId).toBe(gameData.id)
    expect(game.history).not.toBeNull()
    expect(game.history.records.length).toBe(1)
    expect(game.board).not.toBeNull()
    expect(game.players).toEqual([])
    expect(game.state).toBe(GameState.NOT_STARTED)
  })

  it('should update the game state when the first player joins', () => {
    const game = new Game({ id: createGameResponseData.id })
    const player = new Player(createGameResponseData.players)
    const pawnsData = createGameResponseData.pawns

    expect(game.history.getRecordNumber()).toBe(1)
    game.join(player, pawnsData)

    expect(game.players.length).toBe(1)
    expect(game.players[0].playerId).toBe(player.id)
    expect(game.players[0].name).toBe(player.name)
    expect(game.board.toPawnArray().length).toBe(pawnsData.length)
    expect(game.history.getRecordNumber()).toBe(2)
  })

  it('should throw an error when initializing a Game without a gameId', () => {
    expect(() => new Game()).toThrow('Game initialization requires valid gameData with an id.')
  })
})
