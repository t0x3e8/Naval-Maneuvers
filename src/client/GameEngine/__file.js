/* eslint-disable no-magic-numbers */
import settings from './settings.js'
import Cell from './cell.js'
import _ from 'underscore'

/**
 * The Board object represents the structure of the board, including characteristics  of board eg.
 * cells of ports and the neutral cells. In addition, it shows the setup of pawns on the board of players.
 * @returns {void}
 */
class Board {
  /**
   * Constructs the Board object
   */
  constructor () {
    this.cells = []
    this.boardId = null

    this.initializeCells()
  }

  /**
   * Initialized the intance of Board with an array of cells. The map of the cells is based on settings.js
   * @returns {array} Returns 2-dimentional array of cells
   * @param {boolean} portMode determines whether full Board should be initialized or only Player's port
   */
  initializeCells () {
    const { map, numberOfColumns, numberOfRows } = settings.board

    let colPosition = 0
    let rowPosition = 0
    let cellType = 0
    let row = []

    for (rowPosition = 0; rowPosition < numberOfRows; rowPosition += 1) {
      row = []
      for (colPosition = 0; colPosition < numberOfColumns; colPosition += 1) {
        cellType = map[rowPosition][colPosition]
        row[colPosition] = new Cell({
          type: cellType,
          colIndex: colPosition,
          rowIndex: rowPosition,
          board: this
        })
      }
      this.cells[rowPosition] = row
    }
  }

  /**
   * Function assigned a specified pawn to the cell
   * @param {Cell} cell to which the pawn will be assigned
   * @param {Pawn} pawn which represents the ship
   * @param {Pawn} enemyPawn optional argument, represents enemyPawn
   */
  // eslint-disable-next-line class-methods-use-this
  assignPawn (cell, pawn, enemyPawn = null) {
    cell.pawn = pawn
    cell.enemyPawn = enemyPawn

    // Updates the pawn position only if changes
    if (pawn && (pawn.col !== cell.col || pawn.row !== cell.row)) {
      pawn.updatePosition(cell.col, cell.row)
    }

    // updates the enemy pawn position only if changes
    if (enemyPawn && (enemyPawn.col !== cell.col || enemyPawn.row !== cell.row)) {
      enemyPawn.updatePosition(cell.col, cell.row)
    }
  }

  /**
   * Function returns the array of all pawns on the board
   * @returns {[pawn]} An array of pawns on the board
   */
  toPawnArray () {
    const cellsWithPawns = _.filter(_.flatten(this.cells), (cell) => cell.pawn !== null)
    const pawns = _.map(cellsWithPawns, (cell) => cell.pawn)

    return pawns
  }

  /**
   * Function returns the array of all board pawns misplaced (rotated) by 180 degrees
   * @returns {[pawn]} An array of rotated pawns on the board
   */
  toRotatedPawnsArray () {
    const pawns = this.toPawnArray()
    const { numberOfColumns, numberOfRows } = settings.board
    const lengthToIndex = 1
    const pawnsRotated = _.map(pawns, (pawn) => {
      pawn.col = numberOfColumns - lengthToIndex - pawn.col
      pawn.row = numberOfRows - lengthToIndex - pawn.row

      return pawn
    })

    return pawnsRotated
  }
}

export default Board
/* eslint-disable no-magic-numbers */
import settings from './settings.js'
import _ from 'underscore'
import Pawn from './pawn.js'

class BoardHelper {
  /**
   * The method returns all player pawns available at the beginning of the game.
   * The collection of pawns is generated on settings.
   * @returns {Pawn[]} The collection of all pawns
   */
  static getAllPawns () {
    const pawnsMap = settings.pawns
    const pawnsCollection = []

    let step = 0
    let pawn = null

    _.forEach(pawnsMap, (pawnSetting) => {
      for (step = 0; step < pawnSetting.fleetSize; step += 1) {
        pawn = new Pawn(pawnSetting.typeId)

        pawnsCollection.push(pawn)
      }
    })

    return pawnsCollection
  }
}

export default BoardHelper
/* eslint-disable max-statements */

/**
 * A class representing a Cell object.
 * @param {object} cellData - Object containing cell information as: type, columnIndex, rowIndex,
 * @returns {void}
 */
class Cell {
  constructor (cellData) {
    this.type = cellData.type
    this.col = cellData.colIndex
    this.row = cellData.rowIndex
    this.pawn = null
    this.enemyPawn = null
    this.inRange = false
    this.board = cellData.board
  }

  /**
   * The function creates arrat of adjacent (neighboring) cells.
   * Adjacent cells are those that are located directly on the X and Y axes.
   * @returns {array} The array containing adjacent cells
   */
  getAdjacentCells () {
    const adjacentCells = []
    const { col, row } = this
    const offset = 1

    // R-1, C
    if (this.board.cells[row - offset]) {
      adjacentCells.push(this.board.cells[row - offset][col])
    }
    // R-1, C-1
    if (this.board.cells[row - offset] && this.board.cells[row - offset][col - offset]) {
      adjacentCells.push(this.board.cells[row - offset][col - offset])
    }
    // R+1, C
    if (this.board.cells[row + offset]) {
      adjacentCells.push(this.board.cells[row + offset][col])
    }
    // R-1, C+1
    if (this.board.cells[row - offset] && this.board.cells[row - offset][col + offset]) {
      adjacentCells.push(this.board.cells[row - offset][col + offset])
    }
    // R, C-1
    if (this.board.cells[row][col - offset]) {
      adjacentCells.push(this.board.cells[row][col - offset])
    }
    // R+1, C-1
    if (this.board.cells[row + offset] && this.board.cells[row + offset][col - offset]) {
      adjacentCells.push(this.board.cells[row + offset][col - offset])
    }
    // R, C+1
    if (this.board.cells[row][col + offset]) {
      adjacentCells.push(this.board.cells[row][col + offset])
    }
    // R+1, C+1
    if (this.board.cells[row + offset] && this.board.cells[row + offset][col + offset]) {
      adjacentCells.push(this.board.cells[row + offset][col + offset])
    }

    return adjacentCells
  }
}

export default Cell
import settings from './settings'
import { find, contains } from 'underscore'
import { CombatResult } from './gameEnums.js'

/**
 * Object processes combats based on provided oponents.
 * @return {void}
 */
class Combat {
  /**
   * Functions processes the result of the combat.
   * @param {number} attackerUnitType The number which represents attacker unit type.
   * @param {number} defenderUnitType The number which represents attacker unit type.
   * @returns {number} Number which represents result of combat: 1 attacker wins,
   * 0 attacker and defender lose, 1 defender wins
   */
  static process (attackerUnitType, defenderUnitType) {
    const attPawn = find(settings, element => element.typeId === attackerUnitType)
    const defPawn = find(settings, element => element.typeId === defenderUnitType)

    if (contains(attPawn.destroy, defPawn.typeId) && contains(defPawn.destroy, attPawn.typeId)) {
      return CombatResult.DefenderAndAttackerLose
    } else if (contains(attPawn.destroy, defPawn.typeId)) {
      return CombatResult.AttackerWins
    } else if (contains(defPawn.destroy, attPawn.typeId)) {
      return CombatResult.DefenderWins
    }

    return CombatResult.DefenderAndAttackerLose
  }
}

export default Combat
/* eslint-disable no-magic-numbers */
import settings from './settings.js'
import Cell from './cell.js'
import _ from 'underscore'

/**
 * The Board object represents the structure of the board, including characteristics  of board eg.
 * cells of ports and the neutral cells. In addition, it shows the setup of pawns on the board of players.
 * @returns {void}
 */
class Board {
  /**
   * Constructs the Board object
   */
  constructor () {
    this.cells = []
    this.boardId = null

    this.initializeCells()
  }

  /**
   * Initialized the intance of Board with an array of cells. The map of the cells is based on settings.js
   * @returns {array} Returns 2-dimentional array of cells
   * @param {boolean} portMode determines whether full Board should be initialized or only Player's port
   */
  initializeCells () {
    const { map, numberOfColumns, numberOfRows } = settings.board

    let colPosition = 0
    let rowPosition = 0
    let cellType = 0
    let row = []

    for (rowPosition = 0; rowPosition < numberOfRows; rowPosition += 1) {
      row = []
      for (colPosition = 0; colPosition < numberOfColumns; colPosition += 1) {
        cellType = map[rowPosition][colPosition]
        row[colPosition] = new Cell({
          type: cellType,
          colIndex: colPosition,
          rowIndex: rowPosition,
          board: this
        })
      }
      this.cells[rowPosition] = row
    }
  }

  /**
   * Function assigned a specified pawn to the cell
   * @param {Cell} cell to which the pawn will be assigned
   * @param {Pawn} pawn which represents the ship
   * @param {Pawn} enemyPawn optional argument, represents enemyPawn
   */
  // eslint-disable-next-line class-methods-use-this
  assignPawn (cell, pawn, enemyPawn = null) {
    cell.pawn = pawn
    cell.enemyPawn = enemyPawn

    // Updates the pawn position only if changes
    if (pawn && (pawn.col !== cell.col || pawn.row !== cell.row)) {
      pawn.updatePosition(cell.col, cell.row)
    }

    // updates the enemy pawn position only if changes
    if (enemyPawn && (enemyPawn.col !== cell.col || enemyPawn.row !== cell.row)) {
      enemyPawn.updatePosition(cell.col, cell.row)
    }
  }

  /**
   * Function returns the array of all pawns on the board
   * @returns {[pawn]} An array of pawns on the board
   */
  toPawnArray () {
    const cellsWithPawns = _.filter(_.flatten(this.cells), (cell) => cell.pawn !== null)
    const pawns = _.map(cellsWithPawns, (cell) => cell.pawn)

    return pawns
  }

  /**
   * Function returns the array of all board pawns misplaced (rotated) by 180 degrees
   * @returns {[pawn]} An array of rotated pawns on the board
   */
  toRotatedPawnsArray () {
    const pawns = this.toPawnArray()
    const { numberOfColumns, numberOfRows } = settings.board
    const lengthToIndex = 1
    const pawnsRotated = _.map(pawns, (pawn) => {
      pawn.col = numberOfColumns - lengthToIndex - pawn.col
      pawn.row = numberOfRows - lengthToIndex - pawn.row

      return pawn
    })

    return pawnsRotated
  }
}

export default Board
/* eslint-disable no-magic-numbers */
import settings from './settings.js'
import _ from 'underscore'
import Pawn from './pawn.js'

class BoardHelper {
  /**
   * The method returns all player pawns available at the beginning of the game.
   * The collection of pawns is generated on settings.
   * @returns {Pawn[]} The collection of all pawns
   */
  static getAllPawns () {
    const pawnsMap = settings.pawns
    const pawnsCollection = []

    let step = 0
    let pawn = null

    _.forEach(pawnsMap, (pawnSetting) => {
      for (step = 0; step < pawnSetting.fleetSize; step += 1) {
        pawn = new Pawn(pawnSetting.typeId)

        pawnsCollection.push(pawn)
      }
    })

    return pawnsCollection
  }
}

export default BoardHelper
/* eslint-disable max-statements */

/**
 * A class representing a Cell object.
 * @param {object} cellData - Object containing cell information as: type, columnIndex, rowIndex,
 * @returns {void}
 */
class Cell {
  constructor (cellData) {
    this.type = cellData.type
    this.col = cellData.colIndex
    this.row = cellData.rowIndex
    this.pawn = null
    this.enemyPawn = null
    this.inRange = false
    this.board = cellData.board
  }

  /**
   * The function creates arrat of adjacent (neighboring) cells.
   * Adjacent cells are those that are located directly on the X and Y axes.
   * @returns {array} The array containing adjacent cells
   */
  getAdjacentCells () {
    const adjacentCells = []
    const { col, row } = this
    const offset = 1

    // R-1, C
    if (this.board.cells[row - offset]) {
      adjacentCells.push(this.board.cells[row - offset][col])
    }
    // R-1, C-1
    if (this.board.cells[row - offset] && this.board.cells[row - offset][col - offset]) {
      adjacentCells.push(this.board.cells[row - offset][col - offset])
    }
    // R+1, C
    if (this.board.cells[row + offset]) {
      adjacentCells.push(this.board.cells[row + offset][col])
    }
    // R-1, C+1
    if (this.board.cells[row - offset] && this.board.cells[row - offset][col + offset]) {
      adjacentCells.push(this.board.cells[row - offset][col + offset])
    }
    // R, C-1
    if (this.board.cells[row][col - offset]) {
      adjacentCells.push(this.board.cells[row][col - offset])
    }
    // R+1, C-1
    if (this.board.cells[row + offset] && this.board.cells[row + offset][col - offset]) {
      adjacentCells.push(this.board.cells[row + offset][col - offset])
    }
    // R, C+1
    if (this.board.cells[row][col + offset]) {
      adjacentCells.push(this.board.cells[row][col + offset])
    }
    // R+1, C+1
    if (this.board.cells[row + offset] && this.board.cells[row + offset][col + offset]) {
      adjacentCells.push(this.board.cells[row + offset][col + offset])
    }

    return adjacentCells
  }
}

export default Cell
import settings from './settings'
import { find, contains } from 'underscore'
import { CombatResult } from './gameEnums.js'

/**
 * Object processes combats based on provided oponents.
 * @return {void}
 */
class Combat {
  /**
   * Functions processes the result of the combat.
   * @param {number} attackerUnitType The number which represents attacker unit type.
   * @param {number} defenderUnitType The number which represents attacker unit type.
   * @returns {number} Number which represents result of combat: 1 attacker wins,
   * 0 attacker and defender lose, 1 defender wins
   */
  static process (attackerUnitType, defenderUnitType) {
    const attPawn = find(settings, element => element.typeId === attackerUnitType)
    const defPawn = find(settings, element => element.typeId === defenderUnitType)

    if (contains(attPawn.destroy, defPawn.typeId) && contains(defPawn.destroy, attPawn.typeId)) {
      return CombatResult.DefenderAndAttackerLose
    } else if (contains(attPawn.destroy, defPawn.typeId)) {
      return CombatResult.AttackerWins
    } else if (contains(defPawn.destroy, attPawn.typeId)) {
      return CombatResult.DefenderWins
    }

    return CombatResult.DefenderAndAttackerLose
  }
}

export default Combat
/* eslint-disable no-magic-numbers */
import settings from './settings.js'
import Cell from './cell.js'
import _ from 'underscore'

/**
 * The Board object represents the structure of the board, including characteristics  of board eg.
 * cells of ports and the neutral cells. In addition, it shows the setup of pawns on the board of players.
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
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */

import Rules from './Utils/Rules.js'
import _ from 'underscore'
import Board from './board.js'
import Pawn from './pawn.js'
import settings from './settings.js'
import { GameState } from './gameEnums.js'

/**
 * The Board object represents the structure of the board, including characteristics  of board eg.
 * cells of ports and the neutral cells. In addition, it shows the setup of pawns on the board of players.
 * @returns {void}
 */
class GameBoard extends Board {
  constructor () {
    super()

    const { movesPerTurn } = settings.board

    this.movedPawns = []
    this.movesPerTurn = movesPerTurn
    this.game = null

    // eslint-disable-next-line max-len
    this.canMove = () => this.movedPawns.length < this.movesPerTurn && this.game && this.game.state === GameState.STARTED
  }

  /**
   * Each pawn is assigned to a representative cell by its col and row properties.
   * @param {*} pawnsData Array of pawns with col and row set
   * @returns {void}
   */
  setPawns (pawnsData) {
    // _.forEach(pawnsData, (pawnData) => {
    for (const pawnData of pawnsData) {
      const pawn = new Pawn(pawnData.type)

      pawn.update(pawnData)

      if (this.cells[pawn.row][pawn.col].pawn !== null) {
        throw new Error('Pawn already exist')
      }

      this.assignPawn(this.cells[pawn.row][pawn.col], pawn)
    }
  }

  /**
   * Select a pawn at specific cell
   * @param {*} payload - object with: col, row
   * @returns {void}
   */
  select (payload) {
    const pawnToSelect = this.cells[payload.row][payload.col].pawn

    this.unselectAny()
    if (this.canMove() && pawnToSelect) {
      console.log(`pawnToSelect: ${JSON.stringify(pawnToSelect)}`)
      pawnToSelect.selected = true
    }
  }

  /**
   * Unselect any pawn if selected
   * @returns {void}
   */
  unselectAny () {
    const pawnSelected = this.getSelected()

    if (pawnSelected) {
      this.unselect({
        col: pawnSelected.col,
        row: pawnSelected.row
      })
    }
  }

  /**
   * Unselect a pawn at specific cell
   * @param {*} payload - object with: col, row
   * @returns {void}
   */
  unselect (payload) {
    const pawnToUnselect = this.cells[payload.row][payload.col].pawn

    console.log(`pawnToUnselect: ${JSON.stringify(pawnToUnselect)}`)

    if (pawnToUnselect) {
      pawnToUnselect.selected = false
    }
  }

  /**
   * Loop through all cells to find a pawn which is selected
   * @returns {pawn} or null if not found
   */
  getSelected () {
    const allCells = _.flatten(this.cells)
    const selectedCell = _.find(allCells, (cell) => cell.pawn && cell.pawn.selected)

    if (selectedCell) {
      return selectedCell.pawn
    }

    return null
  }

  /**
   * The function selects cells that are within the Pawn's range.
   * The selected cells change the inRange property to true.
   * The algorithm used: Breadth First Search
   * @param {pawn} pawn The pawn for which selection is conducted
   * @returns {void}
   */
  rangeCells (pawn) {
    if (!pawn || pawn.range === 0) {
      return
    }

    const queue = []

    let currentDepth = 1
    let elementsToDepthIncrease = 1
    let nextElementsToDepthIncrease = 0
    let cell = this.cells[pawn.row][pawn.col]
    let adjacentCells = []
    let i = 0

    queue.push(cell)

    while (queue.length > 0) {
      cell = queue.shift(1)
      adjacentCells = cell.getAdjacentCells()

      nextElementsToDepthIncrease += adjacentCells.length

      // eslint-disable-next-line no-loop-func
      for (i = 0; i < adjacentCells.length; i += 1) {
        const adjacentCell = adjacentCells[i]

        /*
         * Adjacent Cell cannot be alredy "inRange" meaning not being already visited,
         * Adjacent Cell cannot have a Pawn assigned unless it's enemy Pawn
         * Adjacent Cell and Main Cell cannot be pair of Sea and Port
         */
        if (
          Rules.isCellInRange(adjacentCell) ||
          // eslint-disable-next-line no-extra-parens
          (Rules.isPawnInCell(adjacentCell) && !Rules.isEnemyPawnInCell(adjacentCell)) ||
          Rules.isPairOfSeaAndPort(adjacentCell, cell)
        ) {
          nextElementsToDepthIncrease -= 1
        } else {
          adjacentCell.inRange = true
          queue.push(adjacentCell)
        }
      }

      elementsToDepthIncrease -= 1
      if (elementsToDepthIncrease === 0) {
        currentDepth += 1
        if (currentDepth > pawn.range) {
          return
        }

        elementsToDepthIncrease = nextElementsToDepthIncrease
        nextElementsToDepthIncrease = 0
      }
    }
  }

  /**
   * Cleans the range of the selection
   * @returns {void}
   */
  cleanRange () {
    const { numberOfColumns, numberOfRows } = settings.board

    for (let r = 0; r < numberOfRows; r += 1) {
      for (let c = 0; c < numberOfColumns; c += 1) {
        this.cells[r][c].inRange = false
      }
    }
  }

  /**
   * Function to move the pawn from the origin cell to destination cell
   * @param {Cell} originCell must contain assigned pawn
   * @param {Cell} destinationCell it's an empty cell to which the pawn will be assigned
   * @returns {void}
   */
  move (originCell, destinationCell) {
    const { pawn } = this.cells[originCell.row][originCell.col]

    originCell.pawn = null
    this.assignPawn(destinationCell, pawn)

    this.movedPawns.push(pawn)
  }

  /**
   * Function to attack the destination pawn from the origin pawn
   * @param {Cell} attackerCell must contain origin pawn
   * @param {Cell} targetCell must contain destination pawn
   * @returns {void}
   */
  attack (attackerCell, targetCell) {
    const attackerPawn = this.cells[attackerCell.row][attackerCell.col].pawn
    const targetPawn = this.cells[targetCell.row][targetCell.col].pawn

    if (attackerPawn && targetPawn) {
      attackerCell.pawn = null
      this.assignPawn(targetCell, targetPawn, attackerPawn)

      this.movedPawns.push(attackerPawn)
    } else {
      console.log('Missing pawn argument for the operation')
    }
  }
}

export default GameBoard
export const CombatResult = {
  DEFENDER_AND_ATTACKER_LOSE: 0,
  ATTACKER_WINS: 1,
  DEFENDER_WINS: -1
}
export const GameState = {
  NOT_STARTED: 0,
  STARTED: 1,
  WAITING: 2,
  TURN: 3,
  ENDED: 4
}
export const CellType = {
  PLAYER_ONE_PORT: 1,
  PLAYER_TWO_PORT: 2,
  PLAYER_ONE_ENTRANCE: 3,
  PLAYER_TWO_ENTRANCE: 4,
  PLAYER_ONE_BATTERY: 5,
  PLAYER_TWO_BATTERY: 6,
  NEUTRAL: 7,
  SEA: 0,
  HIDDEN: 666
}
export const PawnType = {
  ENEMY: 99,
  BATTLESHIP: 1,
  MISSILE: 2,
  CRUISER: 3,
  DESTROYER: 4,
  SUBMARINE: 5,
  ESCORT: 6,
  MINESWEEPER: 7,
  LANDINGSHIP: 8,
  BATTERY: 9,
  MINE: 10
}
export const HistoryType = {
  PLAYER_JOINS: 1,
  PLAYER_LEAVES: 2,
  GAME_STARTED: 10,
  GAME_STOPPED: 11,
  GAME_CREATED: 20,
  GAME_DESTOYED: 21
}
import uuid from 'uuid/v1'

/**
 * Representing History of the Game
 * @returns {void}
 */
class History {
  constructor () {
    const historyId = uuid()

    this.records = []
    this.recordNumber = 0

    /**
     * @returns {uuid} gets unique history id
     */
    this.getHistoryId = function () {
      return historyId
    }

    /**
     * @returns {uuid} Gets the current record number
     */
    this.getRecordNumber = function () {
      return this.recordNumber
    }

    /**
     * Increases and sets the record number
     * @returns {void}
     */
    this.increaseRecordNumber = function () {
      this.recordNumber += 1
    }
  }

  /**
   * Should be called to record a turn setup
   * @param {payload} payload represents playerID, type (HistoryType)
   * @returns {void}
   */
  record (payload) {
    const record = {
      type: payload.type,
      playerID: payload.playerId,
      id: this.getRecordNumber()
    }

    this.records.push(record)
    this.increaseRecordNumber()
  }
}

export default History
/* eslint-disable max-statements */
import settings from './settings.js'
import _ from 'underscore'

/**
 * A class representing a Pawn object.
 * @returns {void}
 */
class Pawn {
  constructor (pawnType) {
    if (_.isNull(pawnType) || _.isUndefined(pawnType)) {
      throw new Error('Pawn Type must be specified')
    }

    const pawnSetting = _.find(settings.pawns, (p) => p.typeId === pawnType)

    if (!pawnSetting) {
      throw new Error(`No Pawn of ${pawnType} in Settings`)
    }

    this.type = pawnType
    this.col = 0
    this.oldCol = 0
    this.row = 0
    this.oldRow = 0
    this.playerId = null
    this.selected = false
    this.range = pawnSetting.range
    this.name = pawnSetting.name
    this.svgName = pawnSetting.svgName
    this.pawnId = null
    this.damageLevel = 0
  }

  update (pawnData) {
    if (this.pawnId !== null) {
      throw new Error('Pawn is already updated')
    }

    if (this.type !== pawnData.type) {
      throw new Error("Type of Pawn don't match the pawnData")
    }

    this.pawnId = pawnData.id
    this.col = pawnData.col
    this.oldCol = pawnData.oldCol
    this.row = pawnData.row
    this.oldRow = pawnData.oldRow
    this.playerId = pawnData.playerId
    this.damageLevel = pawnData.damageLevel
  }

  updatePosition (newCol, newRow) {
    this.oldCol = this.col
    this.oldRow = this.row
    this.col = newCol
    this.row = newRow
  }
}

export default Pawn
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
import _ from 'underscore'
import { CellType, PawnType } from './gameEnums.js'
import BoardHelper from './boardHelper.js'
import Pawn from './pawn.js'
import Board from './board.js'

/**
 * The Board object represents the structure of the board, including characteristics  of board eg.
 * cells of ports and the neutral cells. In addition, it shows the setup of pawns on the board of players.
 * @returns {void}
 */
class PortBoard extends Board {
  /**
   * Constructs the PortBoard object
   */
  constructor () {
    super()
    this.displayPortCells()
    this.initializePawns()
  }

  /**
   * Initialized the intance of Board with the random placement of pawns.
   * @param {GUID} playerID client Player ID received by server
   * @returns {void}
   */
  initializePawns () {
    const allPawns = _.filter(
      BoardHelper.getAllPawns(),
      (pawn) => pawn.type !== PawnType.MINE && pawn.type !== PawnType.BATTERY
    )
    const portCells = _.shuffle(
      _.flatten(this.cells).filter(
        (cell) => cell.type === CellType.PLAYER_TWO_PORT || cell.type === CellType.PLAYER_TWO_ENTRANCE
      )
    )
    const batteryCells = _.flatten(this.cells).filter((cell) => cell.type === CellType.PLAYER_TWO_BATTERY)

    batteryCells.forEach((cell) => {
      this.assignPawn(cell, new Pawn(PawnType.BATTERY))
    })

    allPawns.forEach((pawn) => {
      this.assignPawn(portCells.pop(), pawn)
    })
  }

  /**
   * Changes the full board view into only port view
   * @returns {void}
   */
  displayPortCells () {
    // ToDo: Hardcoded, as the cells are limitted to the last 6 rows. In future it needs more dynamic approach.
    const showBoardRows = 6

    this.cells = _.last(this.cells, showBoardRows)
  }
}

export default PortBoard
/* eslint-disable max-len */
/* eslint-disable array-element-newline */
/* eslint-disable no-magic-numbers */

import { PawnType } from './gameEnums.js'

export default {
  board: {
    numberOfColumns: 12,
    numberOfRows: 18,
    movesPerTurn: 1,
    map: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 3, 5, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 5, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 1, 5, 3, 5, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 7, 7, 7, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 0],
      [0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 7, 7, 7, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 6, 4, 6, 2, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 6, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 6, 4, 2, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    ]
  },
  pawns: [
    {
      typeId: PawnType.ENEMY,
      name: 'Enemy ship',
      svgName: 'none.svg',
      range: 0,
      destroys: [],
      destroyed: [],
      fleetSize: 0
    },
    {
      typeId: PawnType.BATTLESHIP,
      name: 'Battleship',
      svgName: 'battleship.svg',
      range: 2,
      destroys: [
        PawnType.BATTLESHIP,
        PawnType.MISSILE,
        PawnType.CRUISER,
        PawnType.DESTROYER,
        PawnType.ESCORT,
        PawnType.MINESWEEPER,
        PawnType.LANDINGSHIP
      ],
      destroyed: [
        PawnType.BATTLESHIP,
        PawnType.SUBMARINE,
        PawnType.BATTERY,
        PawnType.MINE
      ],
      fleetSize: 3
    },
    {
      typeId: PawnType.MISSILE,
      name: 'Missile Ship',
      svgName: 'missileship.svg',
      range: 1,
      destroys: [
        PawnType.MISSILE,
        PawnType.CRUISER,
        PawnType.DESTROYER,
        PawnType.ESCORT,
        PawnType.MINESWEEPER,
        PawnType.LANDINGSHIP,
        PawnType.BATTERY
      ],
      destroyed: [
        PawnType.MISSILE,
        PawnType.BATTLESHIP,
        PawnType.SUBMARINE,
        PawnType.MINE
      ],
      fleetSize: 3
    },
    {
      typeId: PawnType.CRUISER,
      name: 'Cruiser',
      svgName: 'cruiser.svg',
      range: 2,
      destroys: [
        PawnType.CRUISER,
        PawnType.DESTROYER,
        PawnType.ESCORT,
        PawnType.MINESWEEPER,
        PawnType.LANDINGSHIP
      ],
      destroyed: [
        PawnType.CRUISER,
        PawnType.BATTLESHIP,
        PawnType.MISSILE,
        PawnType.SUBMARINE,
        PawnType.BATTERY,
        PawnType.MINE
      ],
      fleetSize: 3
    },
    {
      typeId: PawnType.DESTROYER,
      name: 'Destroyer',
      svgName: 'destroyer.svg',
      range: 4,
      destroys: [
        PawnType.DESTROYER,
        PawnType.SUBMARINE,
        PawnType.ESCORT,
        PawnType.MINESWEEPER,
        PawnType.LANDINGSHIP
      ],
      destroyed: [
        PawnType.DESTROYER,
        PawnType.BATTLESHIP,
        PawnType.MISSILE,
        PawnType.CRUISER,
        PawnType.SUBMARINE,
        PawnType.BATTERY,
        PawnType.MINE
      ],
      fleetSize: 4
    },
    {
      typeId: PawnType.SUBMARINE,
      name: 'Submarine',
      svgName: 'submarine.svg',
      range: 2,
      destroys: [
        PawnType.SUBMARINE,
        PawnType.BATTLESHIP,
        PawnType.MISSILE,
        PawnType.CRUISER,
        PawnType.DESTROYER,
        PawnType.MINESWEEPER,
        PawnType.LANDINGSHIP
      ],
      destroyed: [
        PawnType.SUBMARINE,
        PawnType.ESCORT,
        PawnType.DESTROYER,
        PawnType.BATTERY,
        PawnType.MINE
      ],
      fleetSize: 4
    },
    {
      typeId: PawnType.ESCORT,
      name: 'Escort',
      svgName: 'escort.svg',
      range: 3,
      destroys: [
        PawnType.ESCORT,
        PawnType.SUBMARINE,
        PawnType.MINESWEEPER,
        PawnType.LANDINGSHIP
      ],
      destroyed: [
        PawnType.ESCORT,
        PawnType.BATTLESHIP,
        PawnType.MISSILE,
        PawnType.CRUISER,
        PawnType.DESTROYER,
        PawnType.BATTERY,
        PawnType.MINE
      ],
      fleetSize: 4
    },
    {
      typeId: PawnType.MINESWEEPER,
      name: 'Minesweeper',
      svgName: 'minesweeper.svg',
      range: 2,
      destroys: [PawnType.MINESWEEPER, PawnType.LANDINGSHIP],
      destroyed: [
        PawnType.MINESWEEPER,
        PawnType.BATTLESHIP,
        PawnType.MISSILE,
        PawnType.CRUISER,
        PawnType.DESTROYER,
        PawnType.SUBMARINE,
        PawnType.ESCORT,
        PawnType.BATTERY,
        PawnType.MINE
      ],
      fleetSize: 4
    },
    {
      typeId: PawnType.LANDINGSHIP,
      name: 'Landing Ship',
      svgName: 'landingship.svg',
      range: 2,
      destroys: [],
      destroyed: [
        PawnType.BATTLESHIP,
        PawnType.MISSILE,
        PawnType.CRUISER,
        PawnType.DESTROYER,
        PawnType.SUBMARINE,
        PawnType.ESCORT,
        PawnType.MINESWEEPER,
        PawnType.BATTERY,
        PawnType.MINE
      ],
      fleetSize: 1
    },
    {
      typeId: PawnType.BATTERY,
      name: 'Shore Battery',
      svgName: 'battery.svg',
      range: 0,
      destroys: [
        PawnType.BATTLESHIP,
        PawnType.CRUISER,
        PawnType.DESTROYER,
        PawnType.SUBMARINE,
        PawnType.ESCORT,
        PawnType.MINESWEEPER,
        PawnType.LANDINGSHIP
      ],
      destroyed: [PawnType.MISSILE],
      fleetSize: 4
    },
    {
      typeId: PawnType.MINE,
      name: 'Mine',
      svgName: 'mine.svg',
      range: 0,
      destroys: [
        PawnType.BATTLESHIP,
        PawnType.MISSILE,
        PawnType.CRUISER,
        PawnType.DESTROYER,
        PawnType.SUBMARINE,
        PawnType.ESCORT,
        PawnType.LANDINGSHIP
      ],
      destroyed: [PawnType.MINESWEEPER],
      fleetSize: 6
    }
  ]
}
class Utils {
  static getRandom (max) {
    const max1 = Math.floor(max)

    return Math.floor(Math.random() * max1)
  }
}

export default Utils
