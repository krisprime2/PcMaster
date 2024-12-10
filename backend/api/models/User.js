const {ADMIN, USER} = require("../constants/Roles");
const {ACTIVE, LOCKED} = require("../constants/Status");

module.exports = {

  attributes: {
    name: {type: 'string', required: true},
    email: {type: 'string', required: true},
    password: {type: 'string', required: true},
    status: {type: 'number', required: true, isIn: [ACTIVE, LOCKED]},
    role: {type: 'number', required: true, isIn: [ADMIN, USER]},

    inquiries: {
      collection: 'inquiry',
      via: 'user',
    },
  },
};

