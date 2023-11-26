import { v4 as uuidv4 } from 'uuid'

/**
 * Represents the history of game events.
 * @returns {void}
 */
class History {
  /**
   * Creates a new History instance.
   */
  constructor () {
    this.historyId = uuidv4()
    this.records = []
  }

  /**
   * Gets the unique ID of this history instance.
   * @returns {string} The unique history ID.
   */
  getHistoryId () {
    return this.historyId
  }

  /**
   * Gets the number of records in the history.
   * @returns {number} The current number of records.
   */
  getRecordNumber () {
    return this.records.length
  }

  /**
   * Records a new event in the history.
   * @param {object} payload - The event data to record, typically includes playerID and event type.
   */
  record (payload) {
    if (!payload || !payload.type) {
      throw new Error('Invalid payload for history record.')
    }

    const record = {
      ...payload,
      id: this.getRecordNumber()
    }

    this.records.push(record)
  }
}

export default History
