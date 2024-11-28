module.exports = {
  attributes: {
    bestellNr: { type: 'number', unique: true, required: true },
    datum: { type: 'string', columnType: 'date', required: true },
    status: { type: 'string', isIn: ['offen', 'abgeschlossen', 'storniert'], defaultsTo: 'offen' },

    // Beziehungen
    user: { model: 'user', required: true },
    artikel: { collection: 'item', via: 'bestellungen' }
  },
};
