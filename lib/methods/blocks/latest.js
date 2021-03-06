const network = require('../../services/network')

module.exports = {
  name: 'blocks.latest',
  method: async (params) => {
    const response = await network.getFromNode('/api/blocks?orderBy=height:desc&limit=1')

    return response.data.blocks[0]
  }
}
