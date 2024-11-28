module.exports = {
  attributes: {
    konfigurationsNr: { type: 'number', unique: true, required: true },
    datum: { type: 'string', columnType: 'date', required: true },
    preis: { type: 'number', required: true },

    // Beziehungen
    komponenten: { collection: 'component', via: 'konfiguration' }
  },
};
