module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    price: { type: 'number', columnType: 'float', required: true },
    type: { type: 'string', required: true },
    description: { type: 'string' },
    imageUrl: { type: 'string' },

    configurations: {
      collection: 'configuration',
      via: 'components'
    }
  }
};
