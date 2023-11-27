import Player from '../client/GameEngine/player'
import { createGameResponseData } from './serverResponses.js'

describe('Player Class Functionality Tests', () => {
  it('should initialize a Player object with an ID and a name', () => {
    const [firstPlayerData] = createGameResponseData.players
    const player = new Player(firstPlayerData)

    expect(player).not.toBeNull()
    expect(player.playerId).toBe(firstPlayerData.id)
    expect(player.name).toBe(firstPlayerData.name)
  })
})
