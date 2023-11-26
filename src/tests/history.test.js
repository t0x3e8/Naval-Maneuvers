import History from '../client/GameEngine/history'

describe('History Class Functionality Tests', () => {
  it('should properly initialize a History object with a unique ID and empty records', () => {
    const history = new History()

    expect(history).not.toBeNull()
    expect(history.getHistoryId()).not.toBeUndefined()
    expect(history.getHistoryId()).not.toBeNull()
    expect(history.records.length).toBe(0)
  })
})
