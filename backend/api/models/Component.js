module.exports = {
  attributes: {
    komponentenId: { type: 'number', unique: true, required: true },
    name: { type: 'string', required: true },
    preis: { type: 'number', required: true },
    art: { type: 'string' },

    // Beziehungen
    konfiguration: { model: 'configuration' }
  },
};
