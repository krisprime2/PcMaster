module.exports = {
  attributes: {
    price: { type: 'number', columnType: 'float' },
    date: { type: 'string', columnType: 'datetime' },
    configurationNumber: { type: 'string' },

    user: {
      model: 'user'
    },
    components: {
      collection: 'component',
      via: 'configurations'
    }
  }
};
