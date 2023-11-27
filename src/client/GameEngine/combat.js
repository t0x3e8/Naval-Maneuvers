import settings from './settings'
import { find, contains } from 'underscore'
import { CombatResult } from './gameEnums.js'

/**
 * Object processes combats based on provided opponents.
 */
class Combat {
  /**
   * Processes the result of the combat.
   * @param {number} attackerUnitType The number representing the attacker's unit type.
   * @param {number} defenderUnitType The number representing the defender's unit type.
   * @returns {number} Number representing the result of combat:
   * - `CombatResult.ATTACKER_WINS` if the attacker wins,
   * - `CombatResult.DEFENDER_WINS` if the defender wins,
   * - `CombatResult.DEFENDER_AND_ATTACKER_LOSE` if both lose.
   */
  static process (attackerUnitType, defenderUnitType) {
    const attPawn = find(settings, element => element.typeId === attackerUnitType)
    const defPawn = find(settings, element => element.typeId === defenderUnitType)

    if (!attPawn || !defPawn) {
      // Handle error or return a default value
    }

    if (contains(attPawn.destroy, defPawn.typeId) && contains(defPawn.destroy, attPawn.typeId)) {
      return CombatResult.DEFENDER_AND_ATTACKER_LOSE
    } else if (contains(attPawn.destroy, defPawn.typeId)) {
      return CombatResult.ATTACKER_WINS
    } else if (contains(defPawn.destroy, attPawn.typeId)) {
      return CombatResult.DEFENDER_WINS
    }

    return CombatResult.DEFENDER_AND_ATTACKER_LOSE
  }
}

export default Combat
