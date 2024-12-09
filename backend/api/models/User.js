const {ADMIN, USER} = require("../constants/Roles");
module.exports = {

  attributes: {
    name: {type: 'string', required: true},
    email: {type: 'string', required: true},
    password: {type: 'string', required: true},
    status: {type: 'number', required: true, isIn: [ADMIN, USER]},
    role: {type: 'number', required: true, isIn: [ADMIN, USER]},
  },
};

