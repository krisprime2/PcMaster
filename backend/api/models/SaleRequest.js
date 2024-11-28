module.exports = {
  attributes: {
    anfrageNr: { type: 'number', unique: true, required: true },
    name: { type: 'string', required: true }, // Name der Anfrage
    email: { type: 'string', required: true }, // Kontaktperson
    beschreibung: { type: 'string' }, // Optional: Weitere Details zur Anfrage
    modelnummer: { type: 'string' }, // Produkt- oder Modellnummer
    status: { type: 'string', isIn: ['offen', 'bearbeitet', 'abgelehnt'], defaultsTo: 'offen' }, // Status der Anfrage

    // Beziehungen
    user: { model: 'user', required: true }, // Benutzer, der die Anfrage gestellt hat
    artikel: { model: 'item', required: true }, // Artikel, auf den sich die Anfrage bezieht
  },
};
