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
