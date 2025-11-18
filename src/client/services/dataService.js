/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import axios from 'axios'

class DataService {
  constructor () {
    this.okPostStatus = 201
    this.okGetStatus = 200
    this.okPatchStatus = 204
    this.getAxiosInstance = () => {
      // TODO: Implement proper authentication token handling
      const instance = axios.create({
        headers: {
          // Authorization: `Bearer ${token}`
        }
      })

      instance.interceptors.request.use((request) => {
        console.log(request)

        return request
      })

      instance.interceptors.response.use((response) => {
        console.log(response)

        return response
      })

      return instance
    }
  }

  async getAllGames () {
    try {
      const axiosInstance = this.getAxiosInstance()
      const response = await axiosInstance.get('/api/games')

      if (response.status === this.okGetStatus) {
        return response.data
      }

      return null
    } catch (error) {
      const errMessage = `Get games error: ${error}`

      console.error(errMessage)

      return null
    }
  }

  async addPlayer (gameId, playerData) {
    try {
      const axiosInstance = this.getAxiosInstance()
      const response = await axiosInstance.post(`/api/games/${gameId}/players`, playerData)

      if (response.status === this.okPostStatus) {
        return response.data
      }

      return null
    } catch (error) {
      const errMessage = `Add player error: ${error}`

      console.error(errMessage)

      return null
    }
  }

  async addPawns (gameId, playerId, pawns) {
    try {
      const axiosInstance = this.getAxiosInstance()
      const response = await axiosInstance.post(`/api/games/${gameId}/players/${playerId}/pawns`, pawns)

      if (response.status === this.okPostStatus) {
        return response.data
      }

      return null
    } catch (error) {
      const errMessage = `Add pawns error: ${error}`

      console.error(errMessage)

      return null
    }
  }

  async addGame (name, pawnsData, playerData) {
    try {
      const axiosInstance = this.getAxiosInstance()
      const responseNewGame = await axiosInstance.post('/api/games', { name })

      if (responseNewGame.status === this.okPostStatus) {
        const gameId = responseNewGame.data.id
        const player = await this.addPlayer(gameId, playerData)

        if (player !== null) {
          const pawns = await this.addPawns(gameId, player.id, pawnsData)

          if (pawns !== null) {
            return {
              game: responseNewGame.data,
              player,
              pawns
            }
          }
        }
      }

      return null
    } catch (error) {
      // TODO: must find better way to log these
      const errMessage = `Add new game error: ${error}`

      console.error(errMessage)

      return null
    }
  }

  async getGame (gameId) {
    try {
      const axiosInstance = this.getAxiosInstance()
      const response = await axiosInstance.get(`/api/games/${gameId}`)

      if (response.status === this.okGetStatus) {
        return response.data
      }

      return null
    } catch (error) {
      // TODO: must find better way to log these
      const errMessage = `Get game error: ${error}`

      console.error(errMessage)

      return null
    }
  }

  async getGameIncludingPawns (gameId) {
    try {
      const game = await this.getGame(gameId)

      if (game !== null) {
        // for (const player of game.players) {
        for (let i = 0; i < game.players.length; i++) {
          // eslint-disable-next-line no-await-in-loop
          const pawns = await this.getPlayerPawns(game.id, game.players[i].id)

          game.players[i].pawns = pawns
        }

        /*
         *const promises = [];
         *
         *for (let i = 0; i < game.players.length; i++) {
         *  const newPromise = new Promise((resolve) => {
         *    const pawns = this.getPlayerPawns(game.id, game.players[i].id);
         *
         *    resolve(pawns);
         *  });
         *
         *  promises.push(newPromise);
         *}
         *
         *await Promise.all(promises).then((results) => {
         *  for (let i = 0; i < game.players.length; i++) {
         *    game.players[i].pawns = results[i];
         *  }
         *});
         */

        return game
      }

      return null
    } catch (error) {
      // TODO: must find better way to log these
      const errMessage = `Get game including pawns error: ${error}`

      console.error(errMessage)

      return null
    }
  }

  async getPlayerPawns (gameId, playerId) {
    try {
      const axiosInstance = this.getAxiosInstance()
      const response = await axiosInstance.get(`/api/games/${gameId}/players/${playerId}/pawns`)

      if (response !== null) {
        return response.data
      }

      return null
    } catch (error) {
      // TODO: must find better way to log these
      const errMessage = `Get pawns error: ${error}`

      console.error(errMessage)

      return null
    }
  }

  async joinGame (gameId, pawnsData, playerData) {
    try {
      const game = await this.getGame(gameId)

      if (game !== null) {
        const player = await this.addPlayer(gameId, playerData)

        if (player !== null) {
          const pawns = await this.addPawns(gameId, player.id, pawnsData)

          if (pawns !== null) {
            return {
              game,
              player,
              pawns
            }
          }
        }
      }

      return null
    } catch (error) {
      // TODO: must find better way to log these
      const errMessage = `Join game error: ${error}`

      console.error(errMessage)

      return null
    }
  }

  async commitTurn (gameId, playerData, pawn) {
    try {
      const url = `/api/games/${gameId}/players/${playerData.id}/pawns/${pawn.pawnId}`
      const axiosInstance = this.getAxiosInstance()
      const response = await axiosInstance.patch(url,
        [
          {
            op: 'add',
            path: 'oldrow',
            value: `${pawn.oldRow}`
          },
          {
            op: 'add',
            path: 'oldcol',
            value: `${pawn.oldCol}`
          },
          {
            op: 'add',
            path: 'row',
            value: `${pawn.row}`
          },
          {
            op: 'add',
            path: 'col',
            value: `${pawn.col}`
          }
        ])

      if (response.status === this.okPatchStatus) {
        return true
      }
    } catch (error) {
      // TODO: must find better way to log these
      const errMessage = `Patch Pawn error: ${error}`

      console.error(errMessage)
    }

    return false
  }

  static async authenticatePlayer (playerName) {
    try {
      const response = await axios.post('/api/players/authenticate', {
        name: playerName
      })

      return response
    } catch (error) {
      const errMessage = `Player authentication error: ${error}`

      console.error(errMessage)

      return null
    }
  }
}

export default DataService
