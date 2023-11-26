class MockDataService {
  constructor () {
    this.mockGames = [{ id: 1, name: 'Mock Game 1' }, { id: 2, name: 'Mock Game 2' }, { id: 3, name: 'Mock Game 3' }]
    this.mockPlayers = [{ id: 1, name: 'Mock Player' }]
    this.mockPawns = [{ id: 1, playerId: 1, position: 'A1' }]
  }

  async getAllGames () {
    return this.mockGames
  }

  async addPlayer (gameId, playerData) {
    const newPlayer = { id: this.mockPlayers.length + 1, ...playerData }
    this.mockPlayers.push(newPlayer)
    return newPlayer
  }

  async addPawns (gameId, playerId, pawns) {
    // Mock adding pawns and return the pawns data
    const newPawns = pawns.map(pawn => ({ ...pawn, id: this.mockPawns.length + 1, playerId }))
    this.mockPawns.push(...newPawns)
    return newPawns
  }

  async addGame (name, pawnsData, playerData) {
    // Mock adding a game, player, and pawns
    const newGame = { id: this.mockGames.length + 1, name }
    this.mockGames.push(newGame)

    const player = await this.addPlayer(newGame.id, playerData)
    const pawns = await this.addPawns(newGame.id, player.id, pawnsData)

    return { game: newGame, player, pawns }
  }

  async getGame (gameId) {
    // Return a mock game based on gameId
    return this.mockGames.find(game => game.id === gameId) || null
  }

  async getPlayerPawns (gameId, playerId) {
    // Return mock pawns for a player
    return this.mockPawns.filter(pawn => pawn.playerId === playerId)
  }

  async joinGame (gameId, pawnsData, playerData) {
    // Mock player joining a game
    const game = await this.getGame(gameId)
    if (!game) return null

    const player = await this.addPlayer(gameId, playerData)
    const pawns = await this.addPawns(gameId, player.id, pawnsData)

    return { game, player, pawns }
  }

  async commitTurn (gameId, playerData, pawn) {
    // Mock committing a turn
    return true // Assuming the turn commit is successful
  }

  async fetchGameWithPlayerPawns (gameId) {
    return this.getGame(gameId)
  }

  static async authenticatePlayer (playerName) {
    // Mock player authentication
    return { authenticated: true, player: { name: playerName } }
  }
}

export default MockDataService
