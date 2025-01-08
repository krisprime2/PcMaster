// api/helpers/check-password.js

const bcrypt = require('bcrypt');

module.exports = {
  friendlyName: 'Check password',

  description: 'Vergleicht ein eingegebenes Passwort mit dem gehashten Passwort.',

  inputs: {
    password: {
      type: 'string',
      required: true,
      description: 'Das vom Benutzer eingegebene Passwort.',
    },
    hashedPassword: {
      type: 'string',
      required: true,
      description: 'Das in der Datenbank gespeicherte gehashte Passwort.',
    },
  },

  exits: {
    success: {
      description: 'Das eingegebene Passwort stimmt mit dem gehashten Passwort überein.',
    },
    incorrect: {
      description: 'Das eingegebene Passwort ist falsch.',
    },
  },

  fn: async function (inputs, exits) {
    try {
      const match = await bcrypt.compare(inputs.password, inputs.hashedPassword);

      if (!match) {
        return exits.incorrect();
      }

      return exits.success();
    } catch (err) {
      // Logge den Fehler, falls etwas schiefgeht
      sails.log.error('Fehler beim Vergleich der Passwörter:', err);
      throw err;
    }
  },
};
