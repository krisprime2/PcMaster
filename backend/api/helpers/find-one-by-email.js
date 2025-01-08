module.exports = {
  friendlyName: 'Find one by email',

  description: 'Sucht einen Benutzer anhand der E-Mail-Adresse.',

  inputs: {
    email: {
      type: 'string',
      required: true,
      description: 'Die E-Mail-Adresse des Benutzers, der gesucht werden soll.',
    },
  },

  exits: {
    notFound: {
      description: 'Kein Benutzer mit dieser E-Mail-Adresse gefunden.',
    },
  },

  fn: async function (inputs, exits) {
    try {
      const user = await User.findOne({ email: inputs.email });

      if (!user) {
        throw new Error('Benutzer mit dieser E-Mail-Adresse nicht gefunden.');
      }

      return exits.success(user);
    } catch (error) {
      sails.log.error('Fehler beim Abrufen des Benutzers anhand der E-Mail:', error);
      return exits.notFound(error.message);
    }
  },
};
