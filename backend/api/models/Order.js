const {ACTIVE, LOCKED} = require("../constants/Status");

module.exports = {
  attributes: {
    status: { type: 'number', required: true, isIn: [ACTIVE, LOCKED]},
    price: { type: 'number' },
    firstName: {type: 'string', required: false},
    lastName: {type: 'string', required: false},
    street: {type: 'string', required: false},
    streetNumber: {type: 'number', required: false},
    city: {type: 'string', required: false},
    postalNumber: {type: 'number', required: false},
    country: {type: 'string', required: false},

    user: {
      model: 'user',
    },

    articles: {
      collection: 'article',
      via: 'orders',
    },
  },
};
