const request = require('./__support__/request')
const arkjs = require('arkjs')

jest.setTimeout(60000)

describe('Transactions', () => {
  describe('POST /mainnet/transactions', () => {
    let transaction
    it('should create tx on mainnet and tx should verify', async () => {
      const response = await request('transactions.create', {
        network: 'mainnet',
        amount: 100000000,
        recipientId: 'AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv',
        passphrase: 'This is a test'
      })

      await expect(response.data.result.recipientId).toBe('AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv')
      await expect(arkjs.crypto.verify(response.data.result)).toBeTruthy()

      transaction = response.data.result
    })

    it('should broadcast tx on mainnet using the old method', async () => {
      const response = await request('transactions.broadcast', {
        network: 'mainnet',
        transactions: [transaction]
      })

      await expect(arkjs.crypto.verify(response.data.result[0])).toBeTruthy()
    })

    it('should broadcast tx on mainnet using the new method', async () => {
      const response = await request('transactions.broadcast', {
        network: 'mainnet',
        id: transaction.id
      })

      await expect(arkjs.crypto.verify(response.data.result)).toBeTruthy()
    })
  })
})
