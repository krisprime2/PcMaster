module.exports = {
  attributes: {
    adressId: { type: 'number', unique: true, required: true },
    strasse: { type: 'string', required: true },
    ort: { type: 'string', required: true },
    plz: { type: 'string', required: true },
    land: { type: 'string', required: true },

    // Beziehungen
    user: { model: 'user' }
  },
};
