module.exports = {
  attributes: {
    price: { type: 'number', columnType: 'float' },
    user: {
      model: 'user'
    },
    components: {
      collection: 'component',
      via: 'configurations'
    }
  }
};
