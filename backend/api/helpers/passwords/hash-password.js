const bcrypt = require('bcrypt');

module.exports = {
  friendlyName: 'Hash password',
  moduleDefinitions: true,

  description: 'Hasht ein Passwort mit bcrypt.',

  inputs: {
    password: {
      type: 'string',
      required: true,
      description: 'Das Klartext-Passwort, das gehashed werden soll.',
    },
  },

  exits: {
    success: {
      description: 'Das Passwort wurde erfolgreich gehashed.',
    },
  },

  fn: async function (inputs, exits) {
    const hashedPassword = await bcrypt.hash(inputs.password,10); // Standardmäßig Salt-Rounds = 10
    return exits.success(hashedPassword);
  },
};
