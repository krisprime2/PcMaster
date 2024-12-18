module.exports = {
  attributes: {
    name: { type: 'string' },
    price: { type: 'number', columnType: 'float' },
    type: { type: 'string' },

    configurations: {
      collection: 'configuration',
      via: 'components'
    }
  }
};
