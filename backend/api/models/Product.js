module.exports = {
  attributes: {
    artikelNr: { type: 'number', unique: true, required: true },
    name: { type: 'string', required: true },
    preis: { type: 'number', required: true },
    kategorie: { type: 'string' },
    beschreibung: { type: 'string' },

    // Beziehungen
    bestellungen: { collection: 'order', via: 'artikel' }
  },
};
