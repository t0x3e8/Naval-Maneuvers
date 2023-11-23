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
