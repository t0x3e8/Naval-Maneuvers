import Rules from './Utils/Rules.js'
import Board from './board.js'
import Pawn from './pawn.js'
import settings from './settings.js'
import { GameState } from './gameEnums.js'

/**
 * *
 * The GameBoard class extends the Board class to manage the game state,
 * including pawn movements and interactions.
 */
class GameBoard extends Board {
  /**
   * Creates a new GameBoard instance.
   */
  constructor () {
    super()

    const { movesPerTurn } = settings.board

    this.movedPawns = []
    this.movesPerTurn = movesPerTurn
    this.game = null
  }

  /**
   * Checks if more pawns can move in the current turn
   * @returns a boolean value.
   */
  canMove () {
    return this.movedPawns.length < this.movesPerTurn && this.game && this.game.state === GameState.STARTED
  }

  /**
   * Each pawn is assigned to a representative cell by its col and row properties.
   * @param {*} pawnsData Array of pawns with col and row set
   * @returns {void}
   */
  setPawns (pawnsData) {
    pawnsData.forEach((pawnData) => {
      const pawn = new Pawn(pawnData.type)
      pawn.update(pawnData)

      const cell = this.cells[pawn.row][pawn.col]
      if (cell.pawn !== null) {
        throw new Error(`Pawn already exists at row ${pawn.row} and column ${pawn.col}`)
      }

      this.assignPawn(cell, pawn)
    })
  }

  /**
   * Selects a pawn based on the provided payload if a move is possible
   * @param payload - The `payload` parameter is an object that contains information about the row and
   * column of the cell that needs to be selected.
   */
  select (payload) {
    const pawnToSelect = this.cells[payload.row][payload.col].pawn

    this.unselectAny()
    if (this.canMove() && pawnToSelect) {
      pawnToSelect.selected = true
    }
  }

  /**
   * Unselects any currently selected pawn
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
   * Unselects a pawn based on the provided payload
   * @param payload - The payload parameter is an object that contains information about the row and
   */
  unselect (payload) {
    const pawnToUnselect = this.cells[payload.row][payload.col].pawn
    if (pawnToUnselect) {
      pawnToUnselect.selected = false
    }
  }

  /**
   * Returns the currently selected pawn, if any
   * @returns The function `getSelected()` returns the selected pawn object from the cells array. If no
   * pawn is selected, it returns null.
   */
  getSelected () {
    for (const row of this.cells) {
      for (const cell of row) {
        if (cell.pawn && cell.pawn.selected) {
          return cell.pawn
        }
      }
    }
    return null
  }

  /**
   * Marks cells within range of the given pawn
   * @param pawn - The `pawn` parameter represents an object that has properties `range`, `row`, and
   * `col`. It is used to determine the range of cells to be marked as in range.
   * @returns The function does not explicitly return a value.
   */
  rangeCells (pawn) {
    if (!pawn || pawn.range === 0) {
      return
    }

    const queue = [this.cells[pawn.row][pawn.col]]
    let currentDepth = 1; let elementsToDepthIncrease = 1; let nextElementsToDepthIncrease = 0

    while (queue.length > 0) {
      const cell = queue.shift()
      const adjacentCells = cell.getAdjacentCells()
      nextElementsToDepthIncrease += adjacentCells.length

      adjacentCells.forEach((adjacentCell) => {
        if (this.isValidCellForRange(adjacentCell, cell)) {
          adjacentCell.inRange = true
          queue.push(adjacentCell)
        } else {
          nextElementsToDepthIncrease -= 1
        }
      })

      if (--elementsToDepthIncrease === 0) {
        if (++currentDepth > pawn.range) {
          break
        }
        elementsToDepthIncrease = nextElementsToDepthIncrease
        nextElementsToDepthIncrease = 0
      }
    }
  }

  /**
   * Checks if a cell is valid for range marking
   * @param adjacentCell - The adjacentCell parameter represents a cell that is adjacent to another cell.
   * @param cell - The "cell" parameter represents a specific cell on a game board.
   * @returns a boolean value.
   */
  isValidCellForRange (adjacentCell, cell) {
    return !Rules.isCellInRange(adjacentCell) &&
        (!Rules.isPawnInCell(adjacentCell) || Rules.isEnemyPawnInCell(adjacentCell)) &&
        !Rules.isPairOfSeaAndPort(adjacentCell, cell)
  }

  /**
   * Clears the range marking from all cells
   * @returns {void}
   */
  cleanRange () {
    const { numberOfColumns, numberOfRows } = settings.board
    for (let r = 0; r < numberOfRows; r++) {
      for (let c = 0; c < numberOfColumns; c++) {
        this.cells[r][c].inRange = false
      }
    }
  }

  /**
   * Moves a pawn from the origin cell to the destination cell
   * @param {Cell} originCell must contain assigned pawn
   * @param {Cell} destinationCell it's an empty cell to which the pawn will be assigned
   * @returns {void}
   */
  move (originCell, destinationCell) {
    const pawn = this.cells[originCell.row][originCell.col].pawn
    if (!pawn) {
      throw new Error('Origin cell does not contain a pawn')
    }

    originCell.pawn = null
    this.assignPawn(destinationCell, pawn)

    this.movedPawns.push(pawn)
  }

  /**
   * Attacks a target pawn from the attacker pawn
   * @param {Cell} attackerCell must contain origin pawn
   * @param {Cell} targetCell must contain destination pawn
   * @returns {void}
   */
  attack (attackerCell, targetCell) {
    const attackerPawn = this.cells[attackerCell.row][attackerCell.col].pawn
    const targetPawn = this.cells[targetCell.row][targetCell.col].pawn

    if (!attackerPawn || !targetPawn) {
      throw new Error('Missing pawn argument for the operation')
    }

    attackerCell.pawn = null
    this.assignPawn(targetCell, targetPawn, attackerPawn)

    this.movedPawns.push(attackerPawn)
  }
}

export default GameBoard
