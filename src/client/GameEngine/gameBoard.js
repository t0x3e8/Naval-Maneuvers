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
