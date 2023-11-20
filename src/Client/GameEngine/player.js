/**
 * Representing a Player object.
 * @param {object} playerData - Object containing player information as: name,
 * @returns {void}
 */
class Player {
  constructor (playerData) {
    this.name = playerData.name
    this.playerId = playerData.id
    this.lostPawns = []
  }
}

export default Player
