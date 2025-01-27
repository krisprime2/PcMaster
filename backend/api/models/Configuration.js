module.exports = {
  attributes: {
    price: { type: 'number', columnType: 'float' , required: true},

    user: {
      model: 'user'
    },
    components: {
      collection: 'component',
      via: 'configurations'
    }
  }
};
