const {ADMIN, USER} = require("../constants/Roles");
const {ACTIVE, LOCKED} = require("../constants/Status");

module.exports = {

  attributes: {
    name: {type: 'string', required: true},
    email: {type: 'string', required: true},
    password: {type: 'string', required: true},
    status: {type: 'number', required: true, isIn: [ACTIVE, LOCKED]},
    role: {type: 'number', required: true, isIn: [ADMIN, USER]},
    firstName: {type: 'string', required: true},
    lastName: {type: 'string', required: true},
    street: {type: 'string', required: true},
    streetNumber: {type: 'number', required: true},
    city: {type: 'string', required: true},
    postalNumber: {type: 'number', required: true},
    country: {type: 'string', required: true},

    inquiries: {
      collection: 'inquiry',
      via: 'user',
    },
  },
};

