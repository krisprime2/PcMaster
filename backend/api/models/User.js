const {ADMIN, USER} = require("../constants/Roles");
const {ACTIVE, LOCKED} = require("../constants/Status");

module.exports = {

  attributes: {
    name: {type: 'string', required: true},
    email: {type: 'string', required: true},
    password: {type: 'string', required: true},
    status: {type: 'number', required: true, isIn: [ACTIVE, LOCKED]},
    role: {type: 'number', required: true, isIn: [ADMIN, USER]},
    firstName: {type: 'string', required: false},
    lastName: {type: 'string', required: false},
    street: {type: 'string', required: false},
    streetNumber: {type: 'number', required: false},
    city: {type: 'string', required: false},
    postalNumber: {type: 'number', required: false},
    country: {type: 'string', required: false},

    orders: {
      collection: 'order',
      via: 'user'
    },
    configurations: {
      collection: 'configuration',
      via: 'user'
    },
    inquiries: {
      collection: 'inquiry',
      via: 'user',
    },
  },
};

