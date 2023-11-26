import GameBoard from './gameBoard.js'
import History from './history.js'
import { HistoryType } from './gameEnums.js'
import Player from './player.js'
import _ from 'underscore'

/**
 * Represents a game with its own board, history, players, and state.
 * @returns {void}
 */
class Game {
  /**
   * Creates a new Game instance.
   * @param {Object} gameData - Data required to initialize the game.
   */
  constructor (gameData) {
    if (_.isEmpty(gameData) || !gameData.id) {
      throw new Error('Game initialization requires valid gameData with an id.')
    }

    this.gameId = gameData.id
    this.board = new GameBoard()
    this.history = new History()
    this.players = []
    this.state = gameData.gameStatus
    this.activePlayer = gameData.activePlayer
    this.inactivePawns = []

    this.board.game = this
    this.history.record({ type: HistoryType.GAME_CREATED })
  }

  /**
   * Adds a player to the game.
   * @param {Player} player - The player to join the game.
   * @param {Array} pawnsData - Data for the player's pawns.
   */
  join (player, pawnsData) {
    if (!(player instanceof Player)) {
      throw new Error('Invalid player object provided.')
    }
    const [activePawns, inactivePawns] = _.partition(pawnsData, pawn => pawn.damageLevel === 0)

    this.players.push(player)
    this.board.setPawns(activePawns)
    this.inactivePawns.push(...inactivePawns)

    this.history.record({
      type: HistoryType.PLAYER_JOINS,
      playerId: Player.playerId
    })
  }

  /**
   * Removes a player from the game.
   * @param {Player} player - The player to be removed from the game.
   */
  leave (player) {
    if (!(player instanceof Player)) {
      throw new Error('Invalid player object provided.')
    }

    const playerIndex = this.players.findIndex(p => p.getPlayerId() === player.getPlayerId())
    if (playerIndex !== -1) {
      this.players.splice(playerIndex, 1)

      this.history.record({
        type: HistoryType.PLAYER_LEAVES,
        playerId: player.getPlayerId()
      })
    }
  }
}

export default Game
