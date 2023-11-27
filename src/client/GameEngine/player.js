/**
 * *
 * Represents a Player object.
 */
class Player {
  /**
  * Creates a new Player instance.
  * @param {object} playerData - Object containing player information as 'name', 'id',
  */
  constructor (playerData) {
    this.name = playerData.name
    this.playerId = playerData.id
    this.lostPawns = []
  }
}

export default Player
