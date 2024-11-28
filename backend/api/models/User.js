module.exports = {
  attributes: {
    benutzerId: { type: 'number', unique: true, required: true },
    name: { type: 'string', required: true },
    email: { type: 'string', unique: true, required: true },
    passwort: { type: 'string', required: true },
    rolle: { type: 'string', isIn: ['admin', 'kunde', 'mitarbeiter'], defaultsTo: 'kunde' },

    // Beziehungen
    bestellungen: { collection: 'order', via: 'user' },
    adresse: { model: 'address' }
  },
};
