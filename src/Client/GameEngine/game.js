/* eslint-disable no-magic-numbers */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */

import GameBoard from './gameBoard.js'
import History from './history.js'
import { HistoryType } from './gameEnums.js'
import Player from './player.js'
import _ from 'underscore'

/**
 * A class representing a Game object.
 * @returns {void}
 */
class Game {
  constructor (gameData) {
    if (_.isNull(gameData) || _.isUndefined(gameData) || _.isNull(gameData.id) || _.isUndefined(gameData.id)) {
      throw new Error('gameData.Id must be specified')
    }

    this.gameId = gameData.id
    this.board = new GameBoard()
    this.board.game = this
    this.history = new History()
    this.history.record({
      type: HistoryType.GAME_CREATED
    })
    this.players = []
    this.state = gameData.gameStatus
    this.activePlayer = gameData.activePlayer
    this.inactivePawns = []
  }

  /**
   * Game will subscribe player.
   * @param {object} player - should represent Player object
   * @param {object} pawnsData - players pawns
   * @return {void}
   */
  join (player, pawnsData) {
    const pawnsDataInParts = _.partition(pawnsData, (pd) => pd.damageLevel === 0)

    this.players.push(player)
    this.board.setPawns(pawnsDataInParts[0])
    this.inactivePawns.push(pawnsDataInParts[1])

    console.log(pawnsDataInParts[1])

    this.history.record({
      type: HistoryType.PLAYER_JOINS,
      playerId: Player.playerId
    })
  }

  /**
   * Game will unsubscribe player.
   * @param {object} player - should represent Player object
   * @return {void}
   */
  leave (player) {
    this.players.splice(
      this.players.findIndex((o) => o.getPlayerId() === player.getPlayerId()),
      1
    )

    this.history.record({
      type: HistoryType.PLAYER_LEAVES,
      playerId: player.getPlayerId()
    })
  }
}

export default Game
